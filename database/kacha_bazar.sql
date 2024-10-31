-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2024 at 05:45 AM
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
-- Database: `kacha_bazar`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `Buyer_ID` int(11) NOT NULL,
  `Buyer_Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone_Number` varchar(20) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Address` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`Buyer_ID`, `Buyer_Name`, `Password`, `Phone_Number`, `Email`, `Address`) VALUES
(2, 'Md. Anjir Hossain', '$2b$10$bmMybvXvsQXSVcx3Wbr.tOeyHcNG8n36E2BmZutad0DubdZnTUqP6', '01738851118', 'mdanjir3734@gmail.com', 'Shiromoni, Khulna'),
(3, 'Ashik Mahmud Raj', '$2b$10$b32UcOi0JS1gPdOqgVUtluDLVbzJ88tj2ZraMKvsORAEQacq6wWSG', '01952978152', 'ashik127020@gmail.com', 'Dighalia, Khulna');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_point`
--

CREATE TABLE `delivery_point` (
  `Delivery_Point_ID` int(11) NOT NULL,
  `Delivery_Point_Name` varchar(255) NOT NULL,
  `Location_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farmer`
--

CREATE TABLE `farmer` (
  `Farmer_ID` int(11) NOT NULL,
  `Farmer_Name` varchar(255) NOT NULL,
  `Phone_Number` varchar(20) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Rating` decimal(3,2) DEFAULT NULL,
  `Location_ID` int(11) NOT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `Location_ID` int(11) NOT NULL,
  `Location_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`Location_ID`, `Location_Name`) VALUES
(1, 'Khulna'),
(3, 'Jashore'),
(4, 'Bagerhat'),
(5, 'Kushtia'),
(6, 'Meherpur'),
(7, 'Satkhira');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `Order_ID` int(11) NOT NULL,
  `Buyer_ID` int(11) DEFAULT NULL,
  `Product_AD_ID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Confirmation` enum('no','yes') NOT NULL DEFAULT 'no',
  `Delivery_Point_ID` int(11) DEFAULT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_ad`
--

CREATE TABLE `product_ad` (
  `Product_AD_ID` int(11) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Stock` int(11) NOT NULL,
  `Unit_Name` enum('KG','piece') NOT NULL DEFAULT 'KG',
  `Minimum_Order_Quantity` int(11) NOT NULL,
  `Unit_Price` decimal(10,2) NOT NULL,
  `Delivery_Date` date NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Location_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(255) NOT NULL,
  `Status` enum('on','off') NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_request`
--

CREATE TABLE `product_request` (
  `Request_ID` int(11) NOT NULL,
  `Seller_ID` int(11) DEFAULT NULL,
  `Zonal_Admin_ID` int(11) DEFAULT NULL,
  `Product_Name` varchar(255) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `Review_ID` int(11) NOT NULL,
  `Comment` varchar(1000) DEFAULT NULL,
  `Rate` int(11) DEFAULT NULL CHECK (`Rate` >= 1 and `Rate` <= 5),
  `Order_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `Seller_ID` int(11) NOT NULL,
  `Seller_Name` varchar(255) NOT NULL,
  `Phone_Number` varchar(20) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Rating` decimal(3,2) DEFAULT NULL,
  `Location_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`Seller_ID`, `Seller_Name`, `Phone_Number`, `Email`, `Password`, `Rating`, `Location_ID`) VALUES
(1, 'Ashik Mahmud Raj', '01952978152', 'ashik127020@gmail.com', '$2b$10$FxMWXT.iCUwuilVL/UINH.4QYPf9j2/3WvJnD2WdxtKNlWTQ9TcmC', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `Admin_ID` int(11) NOT NULL,
  `Admin_Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zonal_admin`
--

CREATE TABLE `zonal_admin` (
  `Zonal_Admin_ID` int(11) NOT NULL,
  `Zonal_Admin_Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Location_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`Buyer_ID`);

--
-- Indexes for table `delivery_point`
--
ALTER TABLE `delivery_point`
  ADD PRIMARY KEY (`Delivery_Point_ID`),
  ADD KEY `Location_ID` (`Location_ID`);

--
-- Indexes for table `farmer`
--
ALTER TABLE `farmer`
  ADD PRIMARY KEY (`Farmer_ID`),
  ADD KEY `Location_ID` (`Location_ID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`Location_ID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Buyer_ID` (`Buyer_ID`),
  ADD KEY `Product_AD_ID` (`Product_AD_ID`),
  ADD KEY `Delivery_Point_ID` (`Delivery_Point_ID`);

--
-- Indexes for table `product_ad`
--
ALTER TABLE `product_ad`
  ADD PRIMARY KEY (`Product_AD_ID`),
  ADD KEY `Location_ID` (`Location_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `product_request`
--
ALTER TABLE `product_request`
  ADD PRIMARY KEY (`Request_ID`),
  ADD KEY `Seller_ID` (`Seller_ID`),
  ADD KEY `Zonal_Admin_ID` (`Zonal_Admin_ID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `Order_ID` (`Order_ID`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`Seller_ID`),
  ADD KEY `Location_ID` (`Location_ID`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`Admin_ID`);

--
-- Indexes for table `zonal_admin`
--
ALTER TABLE `zonal_admin`
  ADD PRIMARY KEY (`Zonal_Admin_ID`),
  ADD KEY `Location_ID` (`Location_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyer`
--
ALTER TABLE `buyer`
  MODIFY `Buyer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `delivery_point`
--
ALTER TABLE `delivery_point`
  MODIFY `Delivery_Point_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmer`
--
ALTER TABLE `farmer`
  MODIFY `Farmer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `Location_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_ad`
--
ALTER TABLE `product_ad`
  MODIFY `Product_AD_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_request`
--
ALTER TABLE `product_request`
  MODIFY `Request_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `Review_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `Seller_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery_point`
--
ALTER TABLE `delivery_point`
  ADD CONSTRAINT `delivery_point_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`);

--
-- Constraints for table `farmer`
--
ALTER TABLE `farmer`
  ADD CONSTRAINT `farmer_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Buyer_ID`) REFERENCES `buyer` (`Buyer_ID`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`Product_AD_ID`) REFERENCES `product_ad` (`Product_AD_ID`),
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`Delivery_Point_ID`) REFERENCES `delivery_point` (`Delivery_Point_ID`);

--
-- Constraints for table `product_ad`
--
ALTER TABLE `product_ad`
  ADD CONSTRAINT `product_ad_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`),
  ADD CONSTRAINT `product_ad_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product_list` (`Product_ID`);

--
-- Constraints for table `product_request`
--
ALTER TABLE `product_request`
  ADD CONSTRAINT `product_request_ibfk_1` FOREIGN KEY (`Seller_ID`) REFERENCES `seller` (`Seller_ID`),
  ADD CONSTRAINT `product_request_ibfk_2` FOREIGN KEY (`Zonal_Admin_ID`) REFERENCES `zonal_admin` (`Zonal_Admin_ID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`);

--
-- Constraints for table `zonal_admin`
--
ALTER TABLE `zonal_admin`
  ADD CONSTRAINT `zonal_admin_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
