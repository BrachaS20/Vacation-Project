-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2021 at 11:01 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationID`, `userID`) VALUES
(2, 4),
(5, 4),
(2, 2),
(6, 1),
(7, 1),
(5, 6),
(3, 6),
(6, 6),
(10, 4),
(6, 4),
(14, 1),
(8, 2),
(13, 2),
(6, 2),
(27, 1),
(28, 1),
(6, 7),
(3, 7),
(10, 7),
(8, 7),
(29, 7),
(30, 7),
(28, 7),
(27, 7),
(14, 7),
(2, 7),
(5, 7),
(6, 9),
(5, 9),
(8, 9),
(12, 9),
(29, 9),
(28, 9),
(30, 9),
(2, 9),
(30, 1),
(13, 1),
(34, 1),
(2, 10),
(10, 10),
(6, 10),
(8, 10),
(5, 10),
(14, 10),
(34, 10),
(13, 10),
(14, 12),
(6, 12),
(14, 11),
(30, 11),
(34, 11),
(28, 11),
(29, 11),
(14, 9),
(14, 6),
(10, 6),
(28, 6),
(14, 4),
(14, 2),
(5, 2),
(10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `uuid` char(36) DEFAULT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `uuid`, `firstName`, `lastName`, `username`, `password`) VALUES
(1, '75ff9f41-7853-4639-a1d7-41f3b3ef14a7', 'Bracha', 'Sabach', 'brachasabach1', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(2, '6e75310b-e351-49dd-bd5d-d14463a17d3f', 'Sara', 'Sabach', 'sarasabach1', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(4, '0fa07368-b1da-48d0-b9ba-5175ce482121', 'Levi', 'Sabach', 'levisabach1', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(5, '740f7a6b-42c5-404e-9393-7cd425f7733b', 'Admin', 'Admin', 'admin', '46e7f1cb50e90ba908cbd384f70a8dd67c38e88eed5d14dfa1cfed1aab466669a3dd275ce946d6fee15963f1245d122fcdcb5883569854deee65a0bd1ce5a377'),
(6, '9fa55dd2-54a0-48a7-8e29-c8d46a33f541', 'Lea', 'Edri', 'leaedri', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(7, '23984a42-da7e-471a-b37b-b5fdcb74cd8a', 'Dvora', 'Bakshi', 'dvorabakshi', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(9, '7a51c88f-4d06-4814-8909-645959626c98', 'Sara', 'Hadad', 'sarahadad', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(10, '35b6e4f0-4116-4c74-83c9-0b253667b4ed', 'Gal', 'Ron', 'galron', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(11, '540036ad-becd-4377-8055-61500d62e617', 'Chen', 'Levi', 'chenlevi', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d'),
(12, 'c27222e5-190d-4473-a721-cac6a27a5701', 'Roni', 'Ziv', 'roniziv', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `arrival` date NOT NULL,
  `departure` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `followersNumber` int(11) NOT NULL,
  `imageName` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `arrival`, `departure`, `price`, `followersNumber`, `imageName`) VALUES
(2, 'London', 'From fantastic culture to urban excitement, London truly has it all.', '2021-08-29', '2021-09-01', '330', 4, '4dbb5cd8-52a4-49e0-818d-9107ebcd8f7c.jpg'),
(3, 'Argentina, BI', 'Buenos Aires got lively cafés spilling onto the sidewalk, a wealth of Belle Epoque architecture, and grand leafy avenues leading to flowering urban parks.', '2021-08-29', '2021-09-07', '2450', 2, 'a6d557b1-0de7-4b85-bce9-a663006705b7.jpg'),
(5, 'Holland', 'Enjoy the bracing wind with a beach walk along the Dutch coast or a cycling tour of the Veluwe', '2021-08-30', '2021-09-02', '550', 6, 'ce5a81d0-6140-431c-b89f-4f63895cf618.jpg'),
(6, 'Switzerland', 'Go on a hot balloon ride and take in Switzerland’s lovely geography from above!', '2021-10-03', '2021-10-07', '345', 8, '33d541c8-4e71-4a57-b321-9f4f0abba210.jpg'),
(7, 'Cyprus', 'Cyprus has one of the warmest climates in the Mediterranean part of the European Union.', '2021-09-12', '2021-09-13', '250', 1, 'b5897de6-8c02-4b18-938a-f7467a8866ba.jpg'),
(8, 'Barcelona', 'Barcelona is one of the most densely populated cities in Europe', '2021-09-26', '2021-09-28', '370', 4, '5e76a742-a2d1-43d8-b3df-10aa9a5cb0a6.jpg'),
(10, 'New York City', 'The city of New York has a complex park system, with various lands.', '2021-09-26', '2021-09-30', '1250', 5, '0accfede-37f6-4750-8420-197fd28f5398.jpg'),
(12, 'Brazil', 'Rio de Janeiro, Salvador da Bahia', '2021-09-27', '2021-09-30', '1190', 1, 'a64e984a-d9fb-4043-8a45-a1d05d99efab.jpg'),
(13, 'Mexico', 'Mexico offers a paradise for every part of your personality, from laid-back beaches and Mayan wonders to rockin nightlife and amped-up adventure.', '2021-09-26', '2021-10-03', '1950', 3, '7fc2db73-f022-4525-ad2b-83535c2eb930.jpg'),
(14, 'Israel', 'Jerusalem, the old city, the western \'WAILING\' wall, Mahane Yehuda.', '2021-10-03', '2021-10-13', '895', 9, '49dfd993-d96c-4a5b-aabc-71c4e70ee0e2.jpg'),
(18, 'Miami', 'Biscayne Bay Cruise and Everglades Airboat Ride,South Beach Cultural Food and Walking Tour.', '2021-10-04', '2021-10-10', '1390', 0, '9b0e1a4d-f65c-473c-8ed5-11f3acef220c.jpg'),
(27, 'Columbia', 'Colombia boasts rainforests, mountains, beaches, and deserts.', '2021-10-05', '2021-10-11', '890', 2, '51c9dc81-7edc-4689-bf14-a154366c72ae.jpg'),
(28, 'Italy', 'San Cassiano, San Gimignano-Tuscany, Isola Bella-Sicily, Praiano..', '2021-10-04', '2021-10-07', '359', 5, 'ade7ccd1-226a-4811-8868-06f39a87c26f.jpg'),
(29, 'France', 'Pariz, Eiffel Tower, Nice, Burgundy, Antibes, Lyon, French Alps..', '2021-10-06', '2021-10-14', '765', 3, '13704185-9e14-4db8-9f7b-b46ae1829d06.jpg'),
(30, 'Costa Rica', 'From beaches to rainforests.\nBe sure to relax at the resorts in Papagayo, surf along the Pacific coast and volunteer to work with sea turtles in the Osa Peninsula.', '2021-10-03', '2021-10-10', '1799', 4, 'dc3d6ff6-585b-4ca0-affa-8414acf908a1.jpg'),
(34, 'Spain', 'Spain\'s dynamic metropolises, breathtaking landscapes and cultural offerings are second to none, making the country an undisputed stop on many travelers\' European vacation itineraries.', '2021-10-10', '2021-10-17', '679', 3, 'b84d6a69-e208-4c5b-a887-b19dc22ee340.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `FK_Followers_Vocations` (`vacationID`),
  ADD KEY `FK_Followers_Users` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `FK_Followers_Users` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_Followers_Vocations` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
