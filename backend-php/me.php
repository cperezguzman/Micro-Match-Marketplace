<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['logged_in' => false]);
} else {
    echo json_encode([
        'logged_in'    => true,
        'user_id'      => $_SESSION['user_id'],
        'name'         => $_SESSION['name'],
        'primary_role' => $_SESSION['primary_role']
    ]);
}
