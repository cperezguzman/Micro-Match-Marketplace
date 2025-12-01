-- ======================================================
-- Micro-Match Marketplace: Database-Level Security Setup
-- ======================================================

-- Use our  project database
USE micro_match;


-- 1. Create MySQL Accounts for Each Role
CREATE USER IF NOT EXISTS 'mm_client'@'localhost'     IDENTIFIED BY 'clientpass';
CREATE USER IF NOT EXISTS 'mm_contributor'@'localhost' IDENTIFIED BY 'contribpass';
CREATE USER IF NOT EXISTS 'mm_admin'@'localhost'       IDENTIFIED BY 'adminpass';
CREATE USER IF NOT EXISTS 'mm_dev'@'localhost'         IDENTIFIED BY 'devpass';


-- 2. Developer Role – Full Control
GRANT ALL PRIVILEGES ON micro_match.* TO 'mm_dev'@'localhost';



-- 3. Client Role – Limited Privileges

-- Projects
GRANT SELECT, INSERT, UPDATE ON micro_match.project TO 'mm_client'@'localhost';

-- Bids
GRANT SELECT ON micro_match.bid TO 'mm_client'@'localhost';

-- Messages + Reviews
GRANT SELECT, INSERT ON micro_match.message TO 'mm_client'@'localhost';
GRANT SELECT, INSERT ON micro_match.review TO 'mm_client'@'localhost';

-- Supporting tables (one per line)
GRANT SELECT ON micro_match.user            TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.notifications   TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.assignment      TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.milestone       TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.attachment      TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.skill           TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.user_skill      TO 'mm_client'@'localhost';
GRANT SELECT ON micro_match.project_skill   TO 'mm_client'@'localhost';


-- 4. Contributor Role – Limited Privileges

-- View projects + users
GRANT SELECT ON micro_match.project TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.user    TO 'mm_contributor'@'localhost';

-- Place & update bids
GRANT SELECT, INSERT, UPDATE ON micro_match.bid TO 'mm_contributor'@'localhost';

-- Messages + Reviews
GRANT SELECT, INSERT ON micro_match.message TO 'mm_contributor'@'localhost';
GRANT SELECT, INSERT ON micro_match.review  TO 'mm_contributor'@'localhost';

-- Supporting tables
GRANT SELECT ON micro_match.notifications TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.assignment    TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.milestone     TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.attachment    TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.skill         TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.user_skill    TO 'mm_contributor'@'localhost';
GRANT SELECT ON micro_match.project_skill TO 'mm_contributor'@'localhost';


-- 5. Admin Role – Full CRUD on Application Data
GRANT
    SELECT, INSERT, UPDATE, DELETE
ON micro_match.*
TO 'mm_admin'@'localhost';


-- 6. Apply Privilege Changes
FLUSH PRIVILEGES;
