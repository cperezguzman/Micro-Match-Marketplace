<?php
// update_bid_status.php
// Updates the status of a bid. When a bid becomes 'Accepted',
// this script calls stored procedure sp_on_bid_accepted()
// which rejects other bids and ensures an assignment row exists.


header('Content-Type: application/json');


require 'db.php';
require 'auth_check.php';

// Only clients can update bid status
require_role('Client');


// 1. Read JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

$bid_id = $data['bid_id'] ?? null;
$status = $data['status'] ?? null;  // 'Accepted', 'Rejected', 'Pending'

$allowed_statuses = ['Accepted', 'Rejected', 'Pending'];

if (!$bid_id || !$status || !in_array($status, $allowed_statuses, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid bid_id or status']);
    exit;
}

try {
    // We'll use a transaction so everything is consistent.
    $pdo->beginTransaction();

    // 2. Look up project_id for this bid
    $stmt = $pdo->prepare("SELECT project_id FROM bid WHERE bid_id = :bid_id");
    $stmt->execute([':bid_id' => $bid_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(['error' => 'Bid not found']);
        exit;
    }

    $project_id = $row['project_id'];

    // 3. Update this bid's status
    $stmt = $pdo->prepare("
        UPDATE bid
        SET status = :status
        WHERE bid_id = :bid_id
    ");
    $stmt->execute([
        ':status' => $status,
        ':bid_id' => $bid_id
    ]);

    // 4. If the new status is 'Accepted', call the stored procedure
    if ($status === 'Accepted') {
        $call = $pdo->prepare("CALL sp_on_bid_accepted(:project_id, :bid_id)");
        $call->execute([
            ':project_id' => $project_id,
            ':bid_id'     => $bid_id
        ]);
    }

    $pdo->commit();

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
