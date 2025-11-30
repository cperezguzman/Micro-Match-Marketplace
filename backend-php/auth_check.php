<?php
// auth_check.php
// Central helpers to enforce authentication and authorization

header('Content-Type: application/json');
session_start();

/**
 * Ensure the user is logged in.
 */
function require_login() {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Not logged in']);
        exit;
    }
}

/**
 * Ensure the user is logged in AND has the required role.
 * $requiredRole should be 'Client', 'Contributor', or 'Admin'.
 */
function require_role(string $requiredRole) {
    require_login(); // also checks login

    if (!isset($_SESSION['primary_role']) || $_SESSION['primary_role'] !== $requiredRole) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden: insufficient role']);
        exit;
    }
}
