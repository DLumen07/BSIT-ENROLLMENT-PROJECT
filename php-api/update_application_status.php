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

$applicationId = isset($input['applicationId']) ? (int) $input['applicationId'] : 0;
$statusRaw = $input['status'] ?? '';
$status = is_string($statusRaw) ? strtolower($statusRaw) : '';

$validStatuses = ['pending', 'approved', 'rejected'];
if ($applicationId <= 0 || !in_array($status, $validStatuses, true)) {
    respond(400, [
        'status' => 'error',
        'message' => 'Invalid application id or status.',
    ], isset($conn) ? $conn : null);
}

$rejectionReason = isset($input['rejectionReason']) ? trim((string) $input['rejectionReason']) : null;
$blockNameInput = $input['blockName'] ?? null;
$blockName = $blockNameInput !== null ? trim((string) $blockNameInput) : null;

try {
    if (!isset($conn) || !($conn instanceof mysqli)) {
        throw new Exception('Database connection is not available.');
    }

    $conn->set_charset('utf8mb4');
    $conn->begin_transaction();

    $lookup = $conn->prepare('SELECT block_name FROM enrollment_applications WHERE id = ? FOR UPDATE');
    if (!$lookup) {
        throw new Exception('Failed to prepare lookup statement: ' . $conn->error);
    }
    $lookup->bind_param('i', $applicationId);
    $lookup->execute();
    $result = $lookup->get_result();
    $current = $result ? $result->fetch_assoc() : null;
    $lookup->close();

    if (!$current) {
        $conn->rollback();
        respond(404, [
            'status' => 'error',
            'message' => 'Application not found.',
        ], $conn);
    }

    if ($blockName === null) {
        $blockName = $current['block_name'];
    }
    if ($blockName === '') {
        $blockName = null;
    }

    if ($status !== 'rejected') {
        $rejectionReason = null;
    } elseif ($rejectionReason === null || $rejectionReason === '') {
        $rejectionReason = 'No reason provided.';
    }

    $update = $conn->prepare('UPDATE enrollment_applications SET status = ?, rejection_reason = ?, block_name = ? WHERE id = ?');
    if (!$update) {
        throw new Exception('Failed to prepare update statement: ' . $conn->error);
    }
    $update->bind_param('sssi', $status, $rejectionReason, $blockName, $applicationId);
    $update->execute();
    $update->close();

    $conn->commit();

    respond(200, [
        'status' => 'success',
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
