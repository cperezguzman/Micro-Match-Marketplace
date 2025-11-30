<?php
// update_project.php
// Updates an existing project row.

header('Content-Type: application/json');
require_once 'db.php';

// 1. Read JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// 2. Extract fields (adjust names if your columns are different)
$project_id  = $data['project_id']  ?? null;
$title       = $data['title']       ?? null;
$description = $data['description'] ?? null;
$budget_min  = $data['budget_min']  ?? null;
$budget_max  = $data['budget_max']  ?? null;
$deadline    = $data['deadline']    ?? null; // 'YYYY-MM-DD'
$status      = $data['status']      ?? null; // optional, if you have it

// 3. Basic validation
if (!$project_id || !$title || !$description || !$budget_min || !$budget_max || !$deadline) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    // 4. Build UPDATE statement.
    //    Adjust column names to match your project table.
    $sql = "
        UPDATE project
        SET title       = :title,
            description = :description,
            budget_min  = :budget_min,
            budget_max  = :budget_max,
            deadline    = :deadline
    ";

    // If you want to allow updating status too:
    $params = [
        ':title'       => $title,
        ':description' => $description,
        ':budget_min'  => $budget_min,
        ':budget_max'  => $budget_max,
        ':deadline'    => $deadline,
        ':id'          => $project_id
    ];

    if ($status !== null) {
        $sql .= ", status = :status";
        $params[':status'] = $status;
    }

    $sql .= " WHERE project_id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
