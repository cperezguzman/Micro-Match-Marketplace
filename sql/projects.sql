-- Projects table used by API routes at /api/projects
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  budget DECIMAL(12,2) DEFAULT 0,
  status ENUM('draft','open','in_progress','completed') DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_user (user_id)
);
