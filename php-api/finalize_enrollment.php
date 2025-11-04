<?php
declare(strict_types=1);

require_once 'db_config.php';

header('Content-Type: application/json');

$allowedOrigins = ['http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
    exit;
}

function respond(int $statusCode, array $payload, ?mysqli $connection = null): void
{
    if ($connection instanceof mysqli) {
        $connection->close();
    }

    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, [
        'status' => 'error',
        'message' => 'Method not allowed. Use POST.',
    ], isset($conn) ? $conn : null);
}

$rawBody = file_get_contents('php://input');
$input = json_decode($rawBody, true);
if (!is_array($input)) {
    $input = $_POST;
}

$studentUserId = isset($input['studentUserId']) ? (int) $input['studentUserId'] : 0;
$blockNameRaw = $input['blockName'] ?? '';
$blockName = is_string($blockNameRaw) ? trim($blockNameRaw) : '';
$subjectIdsInput = $input['subjectIds'] ?? [];
$applicationId = isset($input['applicationId']) ? (int) $input['applicationId'] : 0;
$mode = isset($input['mode']) ? strtolower((string) $input['mode']) : 'application';

if ($studentUserId <= 0 || $blockName === '') {
    respond(400, [
        'status' => 'error',
        'message' => 'Student and block information are required.',
    ], isset($conn) ? $conn : null);
}

$subjectIds = [];
if (is_array($subjectIdsInput)) {
    foreach ($subjectIdsInput as $subjectId) {
        $id = (int) $subjectId;
        if ($id > 0) {
            $subjectIds[] = $id;
        }
    }
    $subjectIds = array_values(array_unique($subjectIds));
}

try {
    if (!isset($conn) || !($conn instanceof mysqli)) {
        throw new Exception('Database connection is not available.');
    }

    $conn->set_charset('utf8mb4');

    $blockStmt = $conn->prepare('SELECT id, specialization FROM blocks WHERE name = ?');
    if (!$blockStmt) {
        throw new Exception('Failed to prepare block lookup: ' . $conn->error);
    }
    $blockStmt->bind_param('s', $blockName);
    $blockStmt->execute();
    $blockResult = $blockStmt->get_result();
    $block = $blockResult ? $blockResult->fetch_assoc() : null;
    $blockStmt->close();

    if (!$block) {
        respond(404, [
            'status' => 'error',
            'message' => 'Block not found.',
        ], $conn);
    }

    $blockId = (int) $block['id'];
    $blockSpecialization = $block['specialization'];

    $conn->begin_transaction();

    $enrollmentStatus = 'Enrolled';
    $updateProfile = $conn->prepare('UPDATE student_profiles SET enrollment_status = ?, block_id = ?, specialization = ? WHERE user_id = ?');
    if (!$updateProfile) {
        throw new Exception('Failed to prepare student profile update: ' . $conn->error);
    }
    $updateProfile->bind_param('sisi', $enrollmentStatus, $blockId, $blockSpecialization, $studentUserId);
    $updateProfile->execute();
    if ($updateProfile->affected_rows === 0) {
        $updateProfile->close();
        $conn->rollback();
        respond(404, [
            'status' => 'error',
            'message' => 'Student profile not found.',
        ], $conn);
    }
    $updateProfile->close();

    $deleteSubjects = $conn->prepare('DELETE FROM student_subjects WHERE student_user_id = ?');
    if (!$deleteSubjects) {
        throw new Exception('Failed to prepare subject cleanup: ' . $conn->error);
    }
    $deleteSubjects->bind_param('i', $studentUserId);
    $deleteSubjects->execute();
    $deleteSubjects->close();

    if (!empty($subjectIds)) {
        $insertSubject = $conn->prepare('INSERT INTO student_subjects (student_user_id, subject_id) VALUES (?, ?)');
        if (!$insertSubject) {
            throw new Exception('Failed to prepare subject insert: ' . $conn->error);
        }
        foreach ($subjectIds as $subjectId) {
            $insertSubject->bind_param('ii', $studentUserId, $subjectId);
            $insertSubject->execute();
        }
        $insertSubject->close();
    }

    if ($applicationId > 0) {
        $deleteApplication = $conn->prepare('DELETE FROM enrollment_applications WHERE id = ? AND student_user_id = ?');
        if (!$deleteApplication) {
            throw new Exception('Failed to prepare application removal: ' . $conn->error);
        }
        $deleteApplication->bind_param('ii', $applicationId, $studentUserId);
        $deleteApplication->execute();
        if ($deleteApplication->affected_rows === 0) {
            $deleteApplication->close();
            throw new Exception('Failed to remove the enrollment application. Ensure the record exists.');
        }
        $deleteApplication->close();
    }

    $conn->commit();

    respond(200, [
        'status' => 'success',
        'message' => $mode === 'direct' ? 'Student enrolled successfully.' : 'Enrollment finalized successfully.',
    ], $conn);
} catch (Throwable $e) {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->rollback();
    }

    respond(500, [
        'status' => 'error',
        'message' => $e->getMessage(),
    ], isset($conn) ? $conn : null);
}
