-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2025 at 10:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `micro_match`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_on_bid_accepted` (IN `p_project_id` BIGINT UNSIGNED, IN `p_bid_id` BIGINT UNSIGNED)  MODIFIES SQL DATA BEGIN
  UPDATE bid
     SET status = 'Rejected'
   WHERE project_id = p_project_id
     AND bid_id <> p_bid_id
     AND status <> 'Rejected';

  -- Idempotent insert thanks to unique keys on assignment
  INSERT IGNORE INTO assignment (project_id, bid_id)
  VALUES (p_project_id, p_bid_id);
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_project_deadline` (`a_assignment_id` BIGINT UNSIGNED) RETURNS DATE DETERMINISTIC READS SQL DATA BEGIN
  DECLARE v_deadline DATE;
  SELECT p.deadline INTO v_deadline
  FROM assignment a
  JOIN project p ON p.project_id = a.project_id
  WHERE a.assignment_id = a_assignment_id;
  RETURN v_deadline;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `bid_id` bigint(20) UNSIGNED NOT NULL,
  `start_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`assignment_id`, `project_id`, `bid_id`, `start_at`) VALUES
(1, 1, 2, '2025-11-06 07:35:38'),
(2, 3, 5, '2025-11-06 07:35:38'),
(3, 4, 7, '2025-11-06 07:35:38'),
(4, 6, 9, '2025-11-06 07:35:38'),
(5, 8, 11, '2025-11-06 07:35:38'),
(6, 10, 13, '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE `attachment` (
  `attachment_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED DEFAULT NULL,
  `bid_id` bigint(20) UNSIGNED DEFAULT NULL,
  `milestone_id` bigint(20) UNSIGNED DEFAULT NULL,
  `url` varchar(500) NOT NULL,
  `uploaded_by` bigint(20) UNSIGNED NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachment`
--

INSERT INTO `attachment` (`attachment_id`, `project_id`, `bid_id`, `milestone_id`, `url`, `uploaded_by`, `uploaded_at`) VALUES
(1, 1, NULL, NULL, 'https://files.example.com/brief.pdf', 1, '2025-11-06 07:35:38'),
(2, 3, NULL, NULL, 'https://files.example.com/dashboard-mockup.png', 8, '2025-11-06 07:35:38'),
(3, 4, NULL, NULL, 'https://files.example.com/audit-scope.docx', 6, '2025-11-06 07:35:38'),
(4, NULL, 2, NULL, 'https://files.example.com/proposal-ml.pdf', 3, '2025-11-06 07:35:38'),
(5, NULL, 5, NULL, 'https://files.example.com/proposal-dashboard.pdf', 8, '2025-11-06 07:35:38'),
(6, NULL, NULL, 3, 'https://files.example.com/ms3.zip', 8, '2025-11-06 07:35:38'),
(7, NULL, NULL, 7, 'https://files.example.com/ms7.zip', 2, '2025-11-06 07:35:38'),
(8, NULL, NULL, 11, 'https://files.example.com/ms11.zip', 5, '2025-11-06 07:35:38'),
(9, 6, NULL, NULL, 'https://files.example.com/etl-spec.md', 2, '2025-11-06 07:35:38'),
(10, 8, NULL, NULL, 'https://files.example.com/docker-compose.yml', 10, '2025-11-06 07:35:38');

--
-- Triggers `attachment`
--
DELIMITER $$
CREATE TRIGGER `trg_attachment_scope_ins` BEFORE INSERT ON `attachment` FOR EACH ROW BEGIN
  DECLARE v_count INT;
  SET v_count =
    (NEW.project_id   IS NOT NULL) +
    (NEW.bid_id       IS NOT NULL) +
    (NEW.milestone_id IS NOT NULL);
  IF v_count <> 1 THEN
    SET NEW.url = NULL;  -- url is NOT NULL → built-in error stops the insert
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_attachment_scope_upd` BEFORE UPDATE ON `attachment` FOR EACH ROW BEGIN
  DECLARE v_count INT;
  SET v_count =
    (NEW.project_id   IS NOT NULL) +
    (NEW.bid_id       IS NOT NULL) +
    (NEW.milestone_id IS NOT NULL);
  IF v_count <> 1 THEN
    SET NEW.url = NULL;  -- built-in error stops the update
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bid`
--

CREATE TABLE `bid` (
  `bid_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `contributor_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `timeline_days` int(10) UNSIGNED NOT NULL,
  `proposal_text` text NOT NULL,
  `status` enum('Pending','Accepted','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bid`
--

INSERT INTO `bid` (`bid_id`, `project_id`, `contributor_id`, `amount`, `timeline_days`, `proposal_text`, `status`, `created_at`) VALUES
(1, 1, 2, 1200.00, 14, 'I can deliver a robust ML pipeline.', 'Pending', '2025-11-06 07:35:38'),
(2, 1, 3, 1300.00, 12, 'Experienced with TensorFlow and scikit-learn.', 'Accepted', '2025-11-06 07:35:38'),
(3, 2, 5, 900.00, 10, 'Responsive, modern UI with React.', 'Pending', '2025-11-06 07:35:38'),
(4, 2, 7, 1100.00, 8, 'Pixel-perfect components and clean UX.', 'Rejected', '2025-11-06 07:35:38'),
(5, 3, 8, 2500.00, 21, 'Interactive Flask dashboard with Plotly.', 'Accepted', '2025-11-06 07:35:38'),
(6, 3, 2, 2400.00, 20, 'Reliable backend and data charts.', 'Rejected', '2025-11-06 07:35:38'),
(7, 4, 7, 1200.00, 9, 'Full security audit and remediation report.', 'Accepted', '2025-11-06 07:35:38'),
(8, 5, 5, 1000.00, 15, 'Custom Figma UI kit and documentation.', 'Pending', '2025-11-06 07:35:38'),
(9, 6, 2, 1600.00, 12, 'ETL pipeline with Airflow and MySQL.', 'Accepted', '2025-11-06 07:35:38'),
(10, 7, 8, 1500.00, 14, 'OpenGL scene prototype.', 'Pending', '2025-11-06 07:35:38'),
(11, 8, 10, 900.00, 7, 'Docker and docker-compose setup.', 'Accepted', '2025-11-06 07:35:38'),
(12, 9, 3, 1800.00, 18, 'TensorFlow optimization and testing.', 'Pending', '2025-11-06 07:35:38'),
(13, 10, 5, 700.00, 10, 'Moderate and analyze usability tests.', 'Accepted', '2025-11-06 07:35:38'),
(14, 2, 10, 950.00, 9, 'React performance and UI tweaks.', 'Pending', '2025-11-06 07:35:38');

--
-- Triggers `bid`
--
DELIMITER $$
CREATE TRIGGER `trg_bid_after_update` AFTER UPDATE ON `bid` FOR EACH ROW BEGIN
  IF NEW.status = 'Accepted' AND OLD.status <> 'Accepted' THEN
    CALL sp_on_bid_accepted(NEW.project_id, NEW.bid_id);
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `project_id`, `sender_id`, `body`, `created_at`) VALUES
(1, 1, 1, 'Welcome aboard!', '2025-11-06 07:35:38'),
(2, 1, 3, 'Thanks, starting model training today.', '2025-11-06 07:35:38'),
(3, 3, 4, 'Please share data sources.', '2025-11-06 07:35:38'),
(4, 3, 8, 'Uploaded dashboard draft.', '2025-11-06 07:35:38'),
(5, 4, 6, 'Scope document attached.', '2025-11-06 07:35:38'),
(6, 4, 7, 'Got it, starting review.', '2025-11-06 07:35:38'),
(7, 6, 6, 'Please confirm database credentials.', '2025-11-06 07:35:38'),
(8, 6, 2, 'Credentials received.', '2025-11-06 07:35:38'),
(9, 8, 9, 'Any update on container setup?', '2025-11-06 07:35:38'),
(10, 8, 10, 'Deploying by Friday.', '2025-11-06 07:35:38'),
(11, 10, 6, 'Research plan attached.', '2025-11-06 07:35:38'),
(12, 10, 5, 'Looks great, scheduling interviews.', '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `milestone`
--

CREATE TABLE `milestone` (
  `milestone_id` bigint(20) UNSIGNED NOT NULL,
  `assignment_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Open','Submitted','Approved') NOT NULL DEFAULT 'Open',
  `submission_notes` text DEFAULT NULL,
  `submission_url` varchar(500) DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `milestone`
--

INSERT INTO `milestone` (`milestone_id`, `assignment_id`, `title`, `due_date`, `status`, `submission_notes`, `submission_url`, `submitted_at`) VALUES
(1, 1, 'Data ingestion module', '2025-11-13', 'Open', NULL, NULL, NULL),
(2, 1, 'Model training v1', '2025-11-20', 'Open', NULL, NULL, NULL),
(3, 2, 'Dashboard skeleton', '2025-11-16', 'Submitted', 'Initial layout ready', 'https://example.com/ms3', '2025-11-06 07:35:38'),
(4, 2, 'Charts & filters', '2025-11-23', 'Open', NULL, NULL, NULL),
(5, 3, 'Threat model', '2025-11-12', 'Open', NULL, NULL, NULL),
(6, 3, 'Remediation plan', '2025-11-19', 'Open', NULL, NULL, NULL),
(7, 4, 'Extract job', '2025-11-14', 'Submitted', 'ETL draft complete', 'https://example.com/ms7', '2025-11-06 07:35:38'),
(8, 4, 'Load to MySQL', '2025-11-21', 'Open', NULL, NULL, NULL),
(9, 5, 'Dockerfiles', '2025-11-11', 'Open', NULL, NULL, NULL),
(10, 5, 'Compose stack', '2025-11-15', 'Open', NULL, NULL, NULL),
(11, 6, 'Research plan', '2025-11-10', 'Approved', 'Protocol approved', 'https://example.com/ms11', '2025-11-06 07:35:38'),
(12, 6, 'Session scripts', '2025-11-17', 'Open', NULL, NULL, NULL);

--
-- Triggers `milestone`
--
DELIMITER $$
CREATE TRIGGER `trg_milestone_due_check_ins` BEFORE INSERT ON `milestone` FOR EACH ROW BEGIN
  DECLARE v_deadline DATE;
  SET v_deadline = fn_project_deadline(NEW.assignment_id);
  IF NEW.due_date > v_deadline THEN
    SET NEW.due_date = v_deadline;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_milestone_due_check_upd` BEFORE UPDATE ON `milestone` FOR EACH ROW BEGIN
  DECLARE v_deadline DATE;
  SET v_deadline = fn_project_deadline(NEW.assignment_id);
  IF NEW.due_date > v_deadline THEN
    SET NEW.due_date = v_deadline;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(80) NOT NULL,
  `payload_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload_json`)),
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `type`, `payload_json`, `is_read`, `created_at`) VALUES
(1, 3, 'MilestoneSubmitted', '{\"milestone_id\":3}', 0, '2025-11-06 07:35:38'),
(2, 7, 'NewMessage', '{\"project_id\":4}', 0, '2025-11-06 07:35:38'),
(3, 2, 'CredentialsShared', '{\"project_id\":6}', 1, '2025-11-06 07:35:38'),
(4, 10, 'BidAccepted', '{\"bid_id\":11}', 1, '2025-11-06 07:35:38'),
(5, 5, 'BidPending', '{\"bid_id\":8}', 0, '2025-11-06 07:35:38'),
(6, 1, 'AssignmentStarted', '{\"assignment_id\":1}', 1, '2025-11-06 07:35:38'),
(7, 8, 'ReviewReceived', '{\"review_id\":3}', 0, '2025-11-06 07:35:38'),
(8, 6, 'Reminder', '{\"due_in_days\":3}', 0, '2025-11-06 07:35:38'),
(9, 2, 'NewProject', '{\"project_id\":9}', 1, '2025-11-06 07:35:38'),
(10, 5, 'FileUploaded', '{\"attachment_id\":10}', 1, '2025-11-06 07:35:38'),
(11, 7, 'MilestoneApproved', '{\"milestone_id\":11}', 1, '2025-11-06 07:35:38'),
(12, 3, 'Message', '{\"message_id\":4}', 0, '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(160) NOT NULL,
  `description` text NOT NULL,
  `budget_min` decimal(12,2) NOT NULL DEFAULT 0.00,
  `budget_max` decimal(12,2) NOT NULL DEFAULT 0.00,
  `deadline` date NOT NULL,
  `status` enum('Open','InProgress','Delivered','Completed','Canceled') NOT NULL DEFAULT 'Open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `client_id`, `title`, `description`, `budget_min`, `budget_max`, `deadline`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'AI Resume Screener', 'Develop an ML model to evaluate resumes.', 500.00, 1500.00, '2025-12-15', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(2, 1, 'Website Redesign', 'Modernize company landing page using React.', 800.00, 2000.00, '2025-12-05', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(3, 4, 'Data Dashboard', 'Create a KPI dashboard with Flask backend.', 1200.00, 3000.00, '2025-12-20', 'InProgress', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(4, 6, 'Security Audit', 'Perform a full web application security audit.', 700.00, 1600.00, '2025-12-10', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(5, 9, 'Mobile UI Kit', 'Design a reusable UI kit in Figma.', 600.00, 1400.00, '2025-12-18', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(6, 6, 'ETL Pipeline', 'Automate data transfer from CSV to MySQL.', 900.00, 2200.00, '2025-12-25', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(7, 4, '3D Rendering Demo', 'Build a prototype OpenGL rendering engine.', 750.00, 1800.00, '2026-01-05', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(8, 9, 'Dockerization', 'Containerize a legacy application.', 500.00, 1200.00, '2025-12-30', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(9, 1, 'Model Optimization', 'Improve TensorFlow model accuracy.', 1000.00, 2500.00, '2026-01-10', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38'),
(10, 6, 'UX Research', 'Conduct usability study sessions.', 400.00, 1000.00, '2025-12-22', 'Open', '2025-11-06 07:35:38', '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `project_skill`
--

CREATE TABLE `project_skill` (
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `skill_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_skill`
--

INSERT INTO `project_skill` (`project_id`, `skill_id`) VALUES
(1, 1),
(1, 8),
(2, 3),
(2, 10),
(3, 2),
(3, 6),
(4, 11),
(5, 4),
(5, 10),
(6, 1),
(6, 2),
(7, 1),
(7, 12),
(8, 7),
(8, 9),
(9, 1),
(9, 8),
(10, 4),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `reviewer_id` bigint(20) UNSIGNED NOT NULL,
  `reviewee_id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('ClientToContributor','ContributorToClient') NOT NULL,
  `stars` tinyint(3) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `project_id`, `reviewer_id`, `reviewee_id`, `role`, `stars`, `comment`, `created_at`) VALUES
(1, 1, 1, 3, 'ClientToContributor', 5, 'Excellent results.', '2025-11-06 07:35:38'),
(2, 1, 3, 1, 'ContributorToClient', 5, 'Clear requirements and feedback.', '2025-11-06 07:35:38'),
(3, 3, 4, 8, 'ClientToContributor', 4, 'Great dashboard design.', '2025-11-06 07:35:38'),
(4, 3, 8, 4, 'ContributorToClient', 5, 'Supportive and communicative client.', '2025-11-06 07:35:38'),
(5, 4, 6, 7, 'ClientToContributor', 5, 'Thorough and professional audit.', '2025-11-06 07:35:38'),
(6, 4, 7, 6, 'ContributorToClient', 4, 'Responsive and easy to work with.', '2025-11-06 07:35:38'),
(7, 6, 6, 2, 'ClientToContributor', 4, 'ETL pipeline progressing smoothly.', '2025-11-06 07:35:38'),
(8, 8, 9, 10, 'ClientToContributor', 5, 'Smooth project delivery.', '2025-11-06 07:35:38'),
(9, 10, 6, 5, 'ClientToContributor', 5, 'Strong research documentation.', '2025-11-06 07:35:38'),
(10, 10, 5, 6, 'ContributorToClient', 5, 'Excellent collaboration.', '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` bigint(20) UNSIGNED NOT NULL,
  `skill_name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `skill_name`) VALUES
(11, 'Cybersecurity'),
(5, 'Data Analysis'),
(9, 'Docker'),
(4, 'Figma'),
(6, 'Flask'),
(7, 'Node.js'),
(12, 'OpenGL'),
(1, 'Python'),
(3, 'React'),
(2, 'SQL'),
(8, 'TensorFlow'),
(10, 'UI/UX');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `primary_role` enum('Client','Contributor','Admin') NOT NULL,
  `rating_avg` decimal(3,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password_hash`, `primary_role`, `rating_avg`, `created_at`) VALUES
(1, 'Emily Johnson', 'emily.johnson@example.com', NULL, 'Client', 4.80, '2025-11-06 07:35:38'),
(2, 'Daniel Carter', 'daniel.carter@example.com', NULL, 'Contributor', 4.60, '2025-11-06 07:35:38'),
(3, 'Sophia Miller', 'sophia.miller@example.com', NULL, 'Contributor', 4.90, '2025-11-06 07:35:38'),
(4, 'Michael Davis', 'michael.davis@example.com', NULL, 'Client', 4.30, '2025-11-06 07:35:38'),
(5, 'Olivia Brown', 'olivia.brown@example.com', NULL, 'Contributor', 4.50, '2025-11-06 07:35:38'),
(6, 'Ethan Wilson', 'ethan.wilson@example.com', NULL, 'Client', 4.10, '2025-11-06 07:35:38'),
(7, 'Ava Thompson', 'ava.thompson@example.com', NULL, 'Contributor', 4.70, '2025-11-06 07:35:38'),
(8, 'Liam Anderson', 'liam.anderson@example.com', NULL, 'Contributor', 4.40, '2025-11-06 07:35:38'),
(9, 'Charlotte Moore', 'charlotte.moore@example.com', NULL, 'Client', 4.60, '2025-11-06 07:35:38'),
(10, 'Noah Martin', 'noah.martin@example.com', NULL, 'Contributor', 4.20, '2025-11-06 07:35:38'),
(11, 'Admin One', 'admin.one@example.com', NULL, 'Admin', NULL, '2025-11-06 07:35:38'),
(12, 'Admin Two', 'admin.two@example.com', NULL, 'Admin', NULL, '2025-11-06 07:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `user_skill`
--

CREATE TABLE `user_skill` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `skill_id` bigint(20) UNSIGNED NOT NULL,
  `level` enum('Beginner','Intermediate','Advanced') NOT NULL DEFAULT 'Beginner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_skill`
--

INSERT INTO `user_skill` (`user_id`, `skill_id`, `level`) VALUES
(2, 1, 'Advanced'),
(2, 2, 'Advanced'),
(2, 6, 'Intermediate'),
(3, 1, 'Advanced'),
(3, 2, 'Advanced'),
(3, 8, 'Intermediate'),
(4, 4, 'Beginner'),
(5, 3, 'Intermediate'),
(5, 4, 'Advanced'),
(5, 10, 'Intermediate'),
(6, 2, 'Beginner'),
(7, 1, 'Advanced'),
(7, 9, 'Intermediate'),
(7, 11, 'Intermediate'),
(8, 2, 'Advanced'),
(8, 7, 'Intermediate'),
(8, 9, 'Beginner'),
(10, 1, 'Intermediate'),
(10, 5, 'Intermediate'),
(10, 6, 'Intermediate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`assignment_id`),
  ADD UNIQUE KEY `uq_assignments_project` (`project_id`),
  ADD UNIQUE KEY `uq_assignments_bid` (`bid_id`);

--
-- Indexes for table `attachment`
--
ALTER TABLE `attachment`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `fk_att_project` (`project_id`),
  ADD KEY `fk_att_bid` (`bid_id`),
  ADD KEY `fk_att_milestone` (`milestone_id`),
  ADD KEY `fk_att_user` (`uploaded_by`);

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`bid_id`),
  ADD UNIQUE KEY `uq_one_bid_per_user_per_project` (`project_id`,`contributor_id`),
  ADD KEY `fk_bids_contributor` (`contributor_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `fk_messages_project` (`project_id`),
  ADD KEY `fk_messages_sender` (`sender_id`);

--
-- Indexes for table `milestone`
--
ALTER TABLE `milestone`
  ADD PRIMARY KEY (`milestone_id`),
  ADD KEY `fk_milestones_assignment` (`assignment_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk_notifications_user` (`user_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `fk_projects_client` (`client_id`);

--
-- Indexes for table `project_skill`
--
ALTER TABLE `project_skill`
  ADD PRIMARY KEY (`project_id`,`skill_id`),
  ADD KEY `fk_project_skills_skill` (`skill_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD UNIQUE KEY `uq_one_review_per_pair` (`project_id`,`reviewer_id`,`reviewee_id`),
  ADD KEY `fk_reviews_reviewer` (`reviewer_id`),
  ADD KEY `fk_reviews_reviewee` (`reviewee_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `uq_skill_name` (`skill_name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `uq_users_email` (`email`);

--
-- Indexes for table `user_skill`
--
ALTER TABLE `user_skill`
  ADD PRIMARY KEY (`user_id`,`skill_id`),
  ADD KEY `fk_user_skills_skill` (`skill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `assignment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `attachment`
--
ALTER TABLE `attachment`
  MODIFY `attachment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bid`
--
ALTER TABLE `bid`
  MODIFY `bid_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `milestone`
--
ALTER TABLE `milestone`
  MODIFY `milestone_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `fk_assignments_bid` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`bid_id`),
  ADD CONSTRAINT `fk_assignments_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE;

--
-- Constraints for table `attachment`
--
ALTER TABLE `attachment`
  ADD CONSTRAINT `fk_att_bid` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`bid_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_att_milestone` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`milestone_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_att_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_att_user` FOREIGN KEY (`uploaded_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `bid`
--
ALTER TABLE `bid`
  ADD CONSTRAINT `fk_bids_contributor` FOREIGN KEY (`contributor_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bids_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_messages_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `milestone`
--
ALTER TABLE `milestone`
  ADD CONSTRAINT `fk_milestones_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_projects_client` FOREIGN KEY (`client_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `project_skill`
--
ALTER TABLE `project_skill`
  ADD CONSTRAINT `fk_project_skills_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_project_skills_skill` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_reviews_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_reviewee` FOREIGN KEY (`reviewee_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
