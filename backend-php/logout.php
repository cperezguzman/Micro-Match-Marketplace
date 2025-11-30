<?php
// logout.php
// Destroys the current PHP session and returns JSON.

header('Content-Type: application/json');
session_start();

// remove all session variables
session_unset();

// destroy the session
session_destroy();

echo json_encode(['success' => true]);
