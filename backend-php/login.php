<?php
header('Content-Type: application/json');
session_start();
require_once 'db.php';

$body = file_get_contents('php://input');
$data = json_decode($body, true);

$email    = $data['email']    ?? null;
$password = $data['password'] ?? null;

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT user_id, name, primary_role, password_hash
        FROM user
        WHERE email = :email
    ");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !$user['password_hash']) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    if (!password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    $_SESSION['user_id']      = $user['user_id'];
    $_SESSION['name']         = $user['name'];
    $_SESSION['primary_role'] = $user['primary_role'];

    echo json_encode([
        'success' => true,
        'user' => [
            'user_id'      => $user['user_id'],
            'name'         => $user['name'],
            'primary_role' => $user['primary_role'],
            'email'        => $email
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
