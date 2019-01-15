-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 12, 2019 at 06:34 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itherapy`
--

-- --------------------------------------------------------

--
-- Table structure for table `cake_d_c_users_phinxlog`
--

CREATE TABLE `cake_d_c_users_phinxlog` (
  `version` bigint(20) NOT NULL,
  `migration_name` varchar(100) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `breakpoint` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cake_d_c_users_phinxlog`
--

INSERT INTO `cake_d_c_users_phinxlog` (`version`, `migration_name`, `start_time`, `end_time`, `breakpoint`) VALUES
(20150513201111, 'Initial', '2019-01-11 18:58:35', '2019-01-11 18:58:37', 0),
(20161031101316, 'AddSecretToUsers', '2019-01-11 18:58:37', '2019-01-11 18:58:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` char(36) NOT NULL,
  `therapy_id` char(36) NOT NULL,
  `sessionNum` int(11) NOT NULL,
  `Accuracy` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `onTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `therapy_id`, `sessionNum`, `Accuracy`, `time`, `onTime`) VALUES
('b9ea6663-f7a9-47d8-b9db-fec84494d932', '7d8e3c96-76e0-4ff7-90ba-25a9aa1dcac5', 1, 1, 67, 1);

-- --------------------------------------------------------

--
-- Table structure for table `social_accounts`
--

CREATE TABLE `social_accounts` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `description` text,
  `link` varchar(255) NOT NULL,
  `token` varchar(500) NOT NULL,
  `token_secret` varchar(500) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `data` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `therapy`
--

CREATE TABLE `therapy` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `typeOfInjury` varchar(256) NOT NULL,
  `startingDate` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `DOB` datetime NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `medID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapy`
--

INSERT INTO `therapy` (`id`, `user_id`, `typeOfInjury`, `startingDate`, `name`, `DOB`, `gender`, `age`, `medID`) VALUES
('456f7e45-64d1-4354-b1bb-129e55d3a79b', '76638587-1c74-4c22-9052-2a68c2cb8dbf', 'Arm Injury', '2019-01-12 06:30:00', 'Cosimo Hickford', '2019-01-12 06:30:00', 'Male', 56, '10-667-9159'),
('6c5dc99a-b419-41f0-ad82-14bfeb49ed7a', '76638587-1c74-4c22-9052-2a68c2cb8dbf', 'Arm Injury', '2019-01-12 06:29:00', 'Francesca Davana', '2019-01-12 06:29:00', 'Female', 47, '78-023-2879'),
('7d8e3c96-76e0-4ff7-90ba-25a9aa1dcac5', '76638587-1c74-4c22-9052-2a68c2cb8dbf', 'Anterior Cruciate Ligament', '2019-01-12 05:46:00', 'Matt Dowzell', '2019-01-12 05:46:00', 'Male', 65, '59-337-6629'),
('92f7991a-82e2-42de-8dc3-24552c80262d', '76638587-1c74-4c22-9052-2a68c2cb8dbf', 'Arm Injury', '2019-01-12 06:30:00', 'Clint Cajkler', '2019-01-12 06:30:00', 'Male', 57, '45-735-7754'),
('b5a2f58a-eca9-4ac0-afa0-7c9aea6e20d0', '76638587-1c74-4c22-9052-2a68c2cb8dbf', 'Arm Injury', '2019-01-12 06:24:00', 'Nealon Jossel', '2019-01-12 06:24:00', 'Male', 62, '98-518-6324');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL,
  `api_token` varchar(255) DEFAULT NULL,
  `activation_date` datetime DEFAULT NULL,
  `secret` varchar(32) DEFAULT NULL,
  `secret_verified` tinyint(1) DEFAULT NULL,
  `tos_date` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `is_superuser` tinyint(1) NOT NULL DEFAULT '0',
  `role` varchar(255) DEFAULT 'user',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `token`, `token_expires`, `api_token`, `activation_date`, `secret`, `secret_verified`, `tos_date`, `active`, `is_superuser`, `role`, `created`, `modified`) VALUES
('76638587-1c74-4c22-9052-2a68c2cb8dbf', 'admin', 'admin@gmail.com', '$2y$10$OuCTyM16MKooPYssYjd82ukANBfwJUeYSGtrUmiD2t6ua79rnnT2.', 'admin', 'admin', 'dbbb995699ed709a75bc5f23fd44af67', '2019-01-12 05:02:48', NULL, NULL, NULL, NULL, '2019-01-12 04:02:48', 1, 1, 'admin', '2019-01-12 04:02:48', '2019-01-12 04:02:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cake_d_c_users_phinxlog`
--
ALTER TABLE `cake_d_c_users_phinxlog`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk1` (`therapy_id`);

--
-- Indexes for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `therapy`
--
ALTER TABLE `therapy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1` (`user_id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`therapy_id`) REFERENCES `therapy` (`id`);

--
-- Constraints for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD CONSTRAINT `social_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `therapy`
--
ALTER TABLE `therapy`
  ADD CONSTRAINT `therapy_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
