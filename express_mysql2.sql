-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2025 at 07:25 AM
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
-- Database: `express_mysql2`
--

-- --------------------------------------------------------

--
-- Table structure for table `mapping_roleuser`
--

CREATE TABLE `mapping_roleuser` (
  `Id` int(11) NOT NULL,
  `UsersId` int(11) NOT NULL,
  `RolesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mapping_roleuser`
--

INSERT INTO `mapping_roleuser` (`Id`, `UsersId`, `RolesId`) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 3, 3),
(4, 5, 1),
(5, 5, 2),
(6, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `roleuser`
--

CREATE TABLE `roleuser` (
  `Id` int(11) NOT NULL,
  `RoleName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roleuser`
--

INSERT INTO `roleuser` (`Id`, `RoleName`) VALUES
(1, 'Admin'),
(2, 'Guru'),
(3, 'Siswa');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah`
--

CREATE TABLE `sekolah` (
  `Id` int(11) NOT NULL,
  `NamaSekolah` varchar(255) NOT NULL,
  `Alamat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sekolah`
--

INSERT INTO `sekolah` (`Id`, `NamaSekolah`, `Alamat`) VALUES
(1, 'SDN 1', 'Jalan Doang Jadian Kaga'),
(2, 'SDN 02', 'Jalan Dulu Aja');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Name` varchar(225) NOT NULL,
  `Email` varchar(225) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Address` varchar(225) DEFAULT NULL,
  `Password` varchar(225) DEFAULT NULL,
  `Token` varchar(225) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `SekolahId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `Username`, `Address`, `Password`, `Token`, `RoleId`, `SekolahId`) VALUES
(2, 'Palmer', 'Palmer@mail.com', 'Palmer', 'Brazil', '$2b$10$lQDssDz5jYRzVrNukLkDwuBC.5zc65iw5Ia4J1m6lfDS7TsYZdpZO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IlBhbG1lckBtYWlsLmNvbSIsImlhdCI6MTczODkwOTQ0NywiZXhwIjoxNzM4OTk1ODQ3fQ.94BbjsZa7pwYZUFuRMBedYdPBACwrJifP2orWV59KBc', 2, 2),
(3, 'Bruno', 'Bruno@mail.com', 'Bruno', 'Brazil', '$2b$10$Q93W2AWZi6Mo.4cHJuaoWuU2MzY9IwV3v44tdNcpPr2TFgXRBijYi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkJydW5vQG1haWwuY29tIiwiaWF0IjoxNzM4NzQ4MTk0LCJleHAiOjE3Mzg4MzQ1OTR9.c-800zP9op3thzLOg1XISNa2rY9UGnRdDFMVyF6AOz0', 2, 2),
(4, 'Ciro', 'Ciro@mail.com', 'Ciro', 'Brazil', '$2b$10$omGvh8IEDnaHifFp398CEONDgE//FdeffeMyTwb96Sjh2KUhvpylS', NULL, 2, 2),
(5, 'andres iniesta', 'andres.iniesta@mail.com', 'andres ', 'Spain', '$2b$10$K7J4.V0tkhXQ9qEYIzP2.u8.u9ai6VjWERCLOv1TsFcJamXewlg6a', NULL, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('ae2a7304-3774-488f-82d4-f1deee3b088e', 'c5d7fdb083d59f9e2da66565680c3cdf0647f6f17989290b39fd8e4ae0e7dde2', '2025-02-05 09:05:46.901', '20250205090546_', NULL, NULL, '2025-02-05 09:05:46.547', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mapping_roleuser`
--
ALTER TABLE `mapping_roleuser`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FKRole` (`RolesId`),
  ADD KEY `FKUser` (`UsersId`);

--
-- Indexes for table `roleuser`
--
ALTER TABLE `roleuser`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `sekolah`
--
ALTER TABLE `sekolah`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleUser` (`RoleId`),
  ADD KEY `UserSekolah` (`SekolahId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mapping_roleuser`
--
ALTER TABLE `mapping_roleuser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roleuser`
--
ALTER TABLE `roleuser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sekolah`
--
ALTER TABLE `sekolah`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mapping_roleuser`
--
ALTER TABLE `mapping_roleuser`
  ADD CONSTRAINT `FKRole` FOREIGN KEY (`RolesId`) REFERENCES `roleuser` (`Id`),
  ADD CONSTRAINT `FKUser` FOREIGN KEY (`UsersId`) REFERENCES `users` (`Id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `RoleUser` FOREIGN KEY (`RoleId`) REFERENCES `roleuser` (`Id`),
  ADD CONSTRAINT `UserSekolah` FOREIGN KEY (`SekolahId`) REFERENCES `sekolah` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
