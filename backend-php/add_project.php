<?php
// add_project.php
// Inserts a new project ONLY if a user is logged in.

header('Content-Type: application/json');

// 1. Start session & enforce login
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

// 2. Connect to DB
require_once 'db.php';

// 3. Get client id from session
$client_id = $_SESSION['user_id'];

// 4. Read JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// 5. Extract and validate fields
$title       = $data['title']       ?? null;
$description = $data['description'] ?? null;
$budget_min  = $data['budget_min']  ?? null;
$budget_max  = $data['budget_max']  ?? null;
$deadline    = $data['deadline']    ?? null;

if (!$title || !$description || !$budget_min || !$budget_max || !$deadline) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!is_numeric($budget_min) || !is_numeric($budget_max)) {
    http_response_code(400);
    echo json_encode(['error' => 'Budget must be numeric']);
    exit;
}

try {
    // 6. Insert row
    $stmt = $pdo->prepare("
        INSERT INTO project
            (client_id, title, description, budget_min, budget_max, deadline)
        VALUES
            (:client_id, :title, :description, :budget_min, :budget_max, :deadline)
    ");

    $stmt->execute([
        ':client_id'   => $client_id,
        ':title'       => $title,
        ':description' => $description,
        ':budget_min'  => $budget_min,
        ':budget_max'  => $budget_max,
        ':deadline'    => $deadline
    ]);

    echo json_encode([
        'success'    => true,
        'project_id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
