<?php
header('Content-Type: application/json');
require_once 'db.php';

$body = file_get_contents('php://input');
$data = json_decode($body, true);

$name     = $data['name']         ?? null;
$email    = $data['email']        ?? null;
$password = $data['password']     ?? null;
$role     = $data['primary_role'] ?? 'Client';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT user_id FROM user WHERE email = :email");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already registered']);
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO user (name, email, primary_role, password_hash)
        VALUES (:name, :email, :role, :hash)
    ");
    $stmt->execute([
        ':name'  => $name,
        ':email' => $email,
        ':role'  => $role,
        ':hash'  => $hash
    ]);

    echo json_encode(['success' => true, 'user_id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
