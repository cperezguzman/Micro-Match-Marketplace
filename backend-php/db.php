<?php
// db.php - connect to MySQL using PDO

$host = "localhost";          // stays localhost for XAMPP
$dbname = "micro_match_marketplace";     // change to your database/schema name
$username = "root";   // change to the MySQL user you use
$password = "";   // that user's password

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}