<?php
// get_projects.php
// This script reads projects from the database and returns them as JSON.

header('Content-Type: application/json');

require_once 'db.php';

// 1. Write the SQL query.
//    - Change `project` to your table name
//    - Change the column names so they match what you see in phpMyAdmin.
$sql = "
    SELECT
        project_id,
        title,
        description,
        budget_min,
        budget_max,
        deadline,
        status
    FROM project
    ORDER BY created_at DESC
";

// 2. Run the query.
$stmt = $pdo->query($sql);

// 3. Fetch all rows as an associative array.
$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 4. Convert PHP array -> JSON text.
echo json_encode($projects);