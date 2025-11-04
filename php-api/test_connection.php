<?php
require_once 'db_config.php';

$response = array();

if ($conn) {
    $response['status'] = 'success';
    $response['message'] = 'Successfully connected to the database.';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to connect to the database.';
}

echo json_encode($response);
?>
