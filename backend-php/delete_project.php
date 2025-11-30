<?php
// delete_project.php
// Deletes a project row by id.

header('Content-Type: application/json');
require_once 'db.php';

// 1. Read JSON body from request
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// 2. Get the id from JSON
$project_id = $data['project_id'] ?? null;

// 3. Validate
if (!$project_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing project_id']);
    exit;
}

try {
    // 4. Prepare and run DELETE
    //    (If your table or column name is different, change them here)
    $stmt = $pdo->prepare("DELETE FROM project WHERE project_id = :id");
    $stmt->execute([':id' => $project_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
