<?php
// add_milestone.php
// Adds a milestone for an assignment. Milestone due date is clamped
// by DB triggers that use fn_project_deadline().

header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

require_once 'db.php';

// 1. Read JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// 2. Extract fields
$assignment_id = $data['assignment_id'] ?? null;
$title         = $data['title']         ?? null;
$due_date      = $data['due_date']      ?? null; // 'YYYY-MM-DD'
$status        = $data['status']        ?? 'Open';

if (!$assignment_id || !$title || !$due_date) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    // 3. Simple INSERT. The BEFORE INSERT trigger on milestone will:
    //    - call fn_project_deadline(assignment_id)
    //    - clamp NEW.due_date if needed
    $stmt = $pdo->prepare("
        INSERT INTO milestone (assignment_id, title, due_date, status)
        VALUES (:assignment_id, :title, :due_date, :status)
    ");

    $stmt->execute([
        ':assignment_id' => $assignment_id,
        ':title'         => $title,
        ':due_date'      => $due_date,
        ':status'        => $status
    ]);

    echo json_encode([
        'success'      => true,
        'milestone_id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
