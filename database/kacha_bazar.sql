-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 05:16 PM
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
(3, 'Ashik Mahmud Raj', '$2b$10$b32UcOi0JS1gPdOqgVUtluDLVbzJ88tj2ZraMKvsORAEQacq6wWSG', '01952978152', 'ashik127020@gmail.com', 'Dighalia, Khulna'),
(4, 'anamul', '$2b$10$SZc./bAWd.YgxQm40YKTZ.JbqnZQmPypm9IvZzbD9nly6QkFO4pkK', '01745837028', 'anamul@gmail.com', 'meherpur');

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

--
-- Dumping data for table `farmer`
--

INSERT INTO `farmer` (`Farmer_ID`, `Farmer_Name`, `Phone_Number`, `Email`, `Password`, `Rating`, `Location_ID`, `Address`) VALUES
(2, 'Md. Anjir Hossain', '01738851118', 'mdanjir3734@gmail.com', '$2b$10$FdZ3RHGIaFlw8FM28hM19e0Lsito/f/u7GMcgvBfw9Y9hVdhw4Huq', NULL, 1, 'Shiromoni, Khulna'),
(3, 'anamul', '01745837028', 'anamul@gmail.com', '$2b$10$qReUY9Xy3.nortKZhsY1KOWM2zre3zUJdSHV2LMllchvF4kFZDFlC', NULL, 6, 'meherpur');

-- --------------------------------------------------------

--
-- Table structure for table `farmer_product_ads`
--

CREATE TABLE `farmer_product_ads` (
  `Farmer_Product_AD_ID` int(11) NOT NULL,
  `Farmer_ID` int(11) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Unit_Name` enum('KG','piece') NOT NULL DEFAULT 'KG',
  `Minimum_Order_Quantity` int(11) NOT NULL,
  `Unit_Price` decimal(10,2) NOT NULL,
  `Delivery_Date` date NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Picture_URL` varchar(255) DEFAULT NULL,
  `Created_Date` date NOT NULL DEFAULT curdate(),
  `Status` enum('on','off') NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmer_product_ads`
--

INSERT INTO `farmer_product_ads` (`Farmer_Product_AD_ID`, `Farmer_ID`, `Product_ID`, `Unit_Name`, `Minimum_Order_Quantity`, `Unit_Price`, `Delivery_Date`, `Phone_Number`, `Description`, `Picture_URL`, `Created_Date`, `Status`) VALUES
(8, 2, 2, 'KG', 48, 200.00, '2024-11-10', '01871352780', 'fresh catla', 'F:\\Kaca Bazar\\frontend\\src\\images', '2024-11-05', 'on'),
(10, 2, 3, 'KG', 20, 500.00, '2024-11-08', '01738851118', 'desi', '\"F:\\Kaca Bazar\\frontend\\src\\images\\chicken.png\"', '2024-11-05', 'on'),
(11, 2, 3, 'KG', 20, 500.00, '2024-11-08', '01738851118', 'desi', '\"F:\\Kaca Bazar\\frontend\\src\\images\\chicken.png\"', '2024-11-05', 'on'),
(12, 3, 3, 'KG', 20, 500.00, '2024-11-08', '01738851118', 'desi', '\"F:\\Kaca Bazar\\frontend\\src\\images\\chicken.png\"', '2024-11-05', 'on'),
(13, 3, 3, 'KG', 20, 500.00, '2024-11-08', '01738851118', 'desi', '\"F:\\Kaca Bazar\\frontend\\src\\images\\chicken.png\"', '2024-11-05', 'on'),
(14, 2, 3, 'KG', 20, 500.00, '2024-11-08', '01738851118', 'desi', '\"F:\\Kaca Bazar\\frontend\\src\\images\\chicken.png\"', '2024-11-05', 'on'),
(15, 2, 4, 'KG', 50, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(16, 2, 4, 'KG', 50, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(17, 2, 4, 'KG', 50, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(18, 2, 5, 'KG', 30, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(19, 2, 4, 'KG', 50, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(20, 2, 5, 'KG', 30, 10.00, '2024-11-13', '01914325908', 'vjbbkjb', '', '2024-11-05', 'on'),
(21, 2, 1, 'piece', 1, 23.00, '2024-11-06', '01738851118', 'egg', 'F:\\Kaca Bazar\\frontend\\src\\images', '2024-11-05', 'on'),
(22, 2, 1, 'piece', 1, 23.00, '2024-11-06', '01738851118', 'egg', 'F:\\Kaca Bazar\\frontend\\src\\images', '2024-11-05', 'on'),
(23, 2, 1, 'piece', 1, 23.00, '2024-11-06', '01738851118', 'egg', 'F:\\Kaca Bazar\\frontend\\src\\images', '2024-11-05', 'on'),
(24, 2, 5, 'KG', 32, 45.00, '2024-11-11', '01738851110', 'rqrq', '', '2024-11-05', 'on'),
(25, 2, 1, 'piece', 43, 4.00, '2024-11-07', '01871352780', 'q4', '', '2024-11-05', 'on'),
(26, 2, 1, 'piece', 43, 4.00, '2024-11-07', '01871352780', 'q4', '', '2024-11-05', 'on'),
(27, 2, 2, 'piece', 424, 324.00, '2024-11-15', '01738851118', 'afdagz', 'F:\\Kaca Bazar\\frontend\\src\\images', '2024-11-05', 'on'),
(28, 2, 5, 'KG', 424, 233.00, '2024-11-13', '01871352780', 'ffafdga', 'affag', '2024-11-05', 'on'),
(29, 2, 2, 'KG', 4444, 1431.00, '2024-11-14', '01738851118', 'gaarah', 'ahrhr', '2024-11-05', 'on'),
(30, 2, 5, 'KG', 321, 44.00, '2024-11-20', '01871352780', 'rqrq', '', '2024-11-05', 'on'),
(31, 2, 5, 'KG', 323, 414.00, '2024-11-07', '01871352780', 'aggag', '', '2024-11-05', 'on'),
(32, 2, 1, 'piece', 323, 414.00, '2024-11-07', '01738851118', 'aggag', '', '2024-11-05', 'on'),
(33, 3, 2, 'KG', 100, 198.00, '2024-11-29', '01745837028', 'Fresh Fish', 'j', '2024-11-20', 'on');

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

--
-- Dumping data for table `product_ad`
--

INSERT INTO `product_ad` (`Product_AD_ID`, `Product_ID`, `Stock`, `Unit_Name`, `Minimum_Order_Quantity`, `Unit_Price`, `Delivery_Date`, `Description`, `Location_ID`) VALUES
(1, 1, 200, 'piece', 5, 3.50, '2024-11-10', 'Farm fresh eggs, perfect for daily consumption and baking needs.', 1),
(2, 2, 150, 'KG', 1, 15.00, '2024-11-10', 'Freshly caught Atlantic salmon, rich in omega-3 fatty acids.', 1),
(3, 3, 100, 'KG', 1, 8.99, '2024-11-10', 'Organic free-range chicken, antibiotic-free and fresh.', 1),
(4, 4, 300, 'KG', 2, 2.50, '2024-11-10', 'A selection of fresh, seasonal vegetables from local farms.', 3),
(5, 5, 250, 'KG', 2, 4.00, '2024-11-10', 'A variety of tropical and seasonal fruits.', 4),
(6, 6, 500, 'KG', 5, 2.20, '2024-11-10', 'Premium quality basmati rice, perfect for biryani and pilaf.', 5),
(7, 7, 80, 'KG', 1, 12.50, '2024-11-10', 'Tender grass-fed beef, ideal for steaks and roasts.', 1),
(8, 8, 100, '', 1, 5.00, '2024-11-10', 'High-quality turmeric powder, rich in color and flavor.', 1),
(9, 1, 100, 'piece', 3, 3.50, '2024-11-30', 'Farm fresh eggs, perfect for daily consumption and baking needs.', 1),
(10, 2, 50, 'KG', 2, 14.00, '2024-11-20', 'Freshly caught Atlantic salmon, rich in omega-3 fatty acids.', 3),
(11, 3, 50, 'KG', 2, 9.99, '2024-12-10', 'Organic free-range chicken, antibiotic-free and fresh.', 1),
(12, 4, 600, 'KG', 3, 3.50, '2024-12-10', 'A selection of fresh, seasonal vegetables from local farms.', 3),
(13, 5, 250, 'KG', 2, 2.00, '2024-12-30', 'A variety of tropical and seasonal fruits.', 4),
(14, 1, 100, 'piece', 3, 3.50, '2024-11-30', 'Farm fresh eggs, perfect for daily consumption and baking needs.', 3),
(15, 2, 50, 'KG', 2, 14.00, '2024-11-20', 'Freshly caught Atlantic salmon, rich in omega-3 fatty acids.', 1),
(16, 3, 50, 'KG', 2, 9.99, '2024-12-10', 'Organic free-range chicken, antibiotic-free and fresh.', 3),
(17, 4, 600, 'KG', 3, 3.50, '2024-12-10', 'A selection of fresh, seasonal vegetables from local farms.', 4),
(18, 5, 250, 'KG', 2, 2.00, '2024-12-10', 'A variety of tropical and seasonal fruits.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(255) NOT NULL,
  `Category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`Product_ID`, `Product_Name`, `Category`) VALUES
(1, 'Desi Chicken Egg', 'Egg'),
(2, 'Catla Fish', 'Fish'),
(3, 'Desi Chicken', 'Chicken'),
(4, 'Vegetables', 'Vegetables'),
(5, 'Fruits', 'Fruits'),
(6, 'Rice', 'Rice'),
(7, 'Meat', 'Meat'),
(8, 'Spice', 'Spice'),
(9, 'Duck Egg', 'Egg'),
(10, 'Quail Egg', 'Egg'),
(11, 'Brown Egg', 'Egg'),
(12, 'Rohu Fish', 'Fish'),
(13, 'Tilapia Fish', 'Fish'),
(14, 'Hilsa Fish', 'Fish'),
(15, 'Broiler Chicken', 'Chicken'),
(16, 'Layer Chicken', 'Chicken'),
(17, 'Organic Chicken', 'Chicken'),
(18, 'Potato', 'Vegetables'),
(19, 'Tomato', 'Vegetables'),
(20, 'Spinach', 'Vegetables'),
(21, 'Carrot', 'Vegetables'),
(22, 'Banana', 'Fruits'),
(23, 'Apple', 'Fruits'),
(24, 'Mango', 'Fruits'),
(25, 'Papaya', 'Fruits'),
(26, 'Basmati Rice', 'Rice'),
(27, 'Jasmine Rice', 'Rice'),
(28, 'Brown Rice', 'Rice'),
(29, 'Beef', 'Meat'),
(30, 'Lamb', 'Meat'),
(31, 'Mutton', 'Meat'),
(32, 'Pork', 'Meat'),
(33, 'Turmeric', 'Spice'),
(34, 'Cumin', 'Spice'),
(35, 'Chili Powder', 'Spice'),
(36, 'Coriander Powder', 'Spice');

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
(1, 'Ashik Mahmud Raj', '01952978152', 'ashik127020@gmail.com', '$2b$10$FxMWXT.iCUwuilVL/UINH.4QYPf9j2/3WvJnD2WdxtKNlWTQ9TcmC', NULL, 1),
(2, 'Md. Anjir Hossain', '01738851118', 'mdanjir3734@gmail.com', '$2b$10$tFE7cXtIi2CLEQ5KJKEChuQDJemhANOuQyZKKlYQ/XxJQQ0UEsVt2', NULL, 1),
(3, 'anamul', '01871352780', 'anamul@gmail.com', '$2b$10$SZ9n0EKafLDnoK5q2BJm2O/r5kU4d8dkVuaXZWqtK7DmNO2F4SICe', NULL, 6);

-- --------------------------------------------------------

--
-- Table structure for table `seller_product_ads`
--

CREATE TABLE `seller_product_ads` (
  `Seller_Product_AD_ID` int(11) NOT NULL,
  `Seller_ID` int(11) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Unit_Name` enum('KG','piece') NOT NULL DEFAULT 'KG',
  `Unit_Price` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Picture_URL` varchar(255) DEFAULT NULL,
  `Created_Date` date NOT NULL DEFAULT curdate(),
  `Status` enum('on','off') NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller_product_ads`
--

INSERT INTO `seller_product_ads` (`Seller_Product_AD_ID`, `Seller_ID`, `Product_ID`, `Unit_Name`, `Unit_Price`, `Stock`, `Description`, `Picture_URL`, `Created_Date`, `Status`) VALUES
(82, 1, 1, 'piece', 0.20, 500, 'Fresh Desi Chicken Eggs from free-range hens.', 'https://example.com/images/desi-chicken-egg.jpg', '2024-11-05', 'on'),
(83, 1, 2, 'KG', 5.50, 200, 'Catla Fish, fresh from the river.', 'https://example.com/images/catla-fish.jpg', '2024-11-05', 'on'),
(84, 1, 4, 'KG', 1.20, 300, 'Organic potatoes grown without pesticides.', 'https://example.com/images/potato.jpg', '2024-11-05', 'on'),
(85, 3, 6, 'KG', 1.00, 400, 'High-quality Basmati Rice with a fragrant aroma.', 'https://example.com/images/basmati-rice.jpg', '2024-11-05', 'on'),
(86, 1, 10, 'piece', 0.15, 300, 'Quail Eggs, rich in nutrients and perfect for gourmet dishes.', 'https://example.com/images/quail-egg.jpg', '2024-11-05', 'on'),
(87, 3, 11, 'piece', 0.25, 400, 'Brown Eggs from healthy, free-range chickens.', 'https://example.com/images/brown-egg.jpg', '2024-11-05', 'on'),
(88, 1, 12, 'KG', 6.00, 180, 'Rohu Fish, sustainably sourced and fresh.', 'https://example.com/images/rohu-fish.jpg', '2024-11-05', 'on'),
(89, 1, 14, 'KG', 1.50, 350, 'Spinach, freshly harvested and packed with vitamins.', 'https://example.com/images/spinach.jpg', '2024-11-05', 'on'),
(90, 1, 15, 'KG', 4.50, 120, 'Broiler Chicken, raised in a healthy environment.', 'https://example.com/images/broiler-chicken.jpg', '2024-11-05', 'on'),
(91, 1, 16, 'KG', 5.00, 100, 'Layer Chicken, excellent for egg production.', 'https://example.com/images/layer-chicken.jpg', '2024-11-05', 'on'),
(92, 1, 19, 'KG', 1.25, 240, 'Tomatoes, ripe and juicy, perfect for salads and sauces.', 'https://example.com/images/fresh-tomatoes.jpg', '2024-11-05', 'on'),
(93, 1, 20, 'KG', 1.20, 250, 'Carrots, crunchy and fresh, ideal for snacks and cooking.', 'https://example.com/images/carrot.jpg', '2024-11-05', 'on'),
(94, 2, 3, 'KG', 4.00, 100, 'Organic Desi Chicken, raised locally.', 'https://example.com/images/desi-chicken.jpg', '2024-11-05', 'on'),
(95, 2, 18, 'KG', 1.10, 250, 'Fresh tomatoes, ripe and juicy.', 'https://example.com/images/tomato.jpg', '2024-11-05', 'on'),
(96, 2, 22, 'KG', 0.80, 200, 'Locally grown bananas, perfect for snacking.', 'https://example.com/images/banana.jpg', '2024-11-05', 'on'),
(97, 3, 4, 'KG', 1.10, 280, 'Fresh Vegetables, including potatoes, onions, and more.', 'https://example.com/images/fresh-vegetables.jpg', '2024-11-05', 'on'),
(98, 2, 5, 'KG', 2.00, 200, 'Assorted Fruits, including apples, mangoes, and bananas.', 'https://example.com/images/assorted-fruits.jpg', '2024-11-05', 'on'),
(99, 3, 7, 'KG', 9.50, 60, 'Premium Lamb, tender and flavorful.', 'https://example.com/images/lamb.jpg', '2024-11-05', 'on'),
(100, 2, 8, 'KG', 2.80, 170, 'Chili Powder, perfect for adding heat to your dishes.', 'https://example.com/images/chili-powder.jpg', '2024-11-05', 'on'),
(101, 3, 13, 'KG', 7.00, 140, 'Tilapia Fish, fresh and high in protein.', 'https://example.com/images/tilapia-fish.jpg', '2024-11-05', 'on'),
(102, 2, 17, 'KG', 5.50, 90, 'Organic Chicken, free from antibiotics and hormones.', 'https://example.com/images/organic-chicken.jpg', '2024-11-05', 'on'),
(103, 2, 21, 'KG', 1.35, 220, 'Potatoes, versatile for various cooking methods.', 'https://example.com/images/potatoes.jpg', '2024-11-05', 'on'),
(104, 3, 23, 'KG', 0.90, 210, 'Apples, crisp and sweet, perfect for snacking.', 'https://example.com/images/apple.jpg', '2024-11-05', 'on'),
(105, 2, 24, 'KG', 1.60, 190, 'Mangoes, juicy and ripe, ideal for desserts and smoothies.', 'https://example.com/images/mango.jpg', '2024-11-05', 'on'),
(106, 2, 25, 'KG', 1.50, 180, 'Papayas, rich in vitamins and perfect for a healthy diet.', 'https://example.com/images/papaya.jpg', '2024-11-05', 'on'),
(107, 2, 26, 'KG', 1.20, 300, 'Jasmine Rice, fragrant and perfect for a variety of dishes.', 'https://example.com/images/jasmine-rice.jpg', '2024-11-05', 'on'),
(108, 2, 27, 'KG', 1.10, 320, 'Brown Rice, a healthy alternative with more fiber.', 'https://example.com/images/brown-rice.jpg', '2024-11-05', 'on'),
(109, 1, 28, 'KG', 1.30, 310, 'White Rice, versatile and a staple in many cuisines.', 'https://example.com/images/white-rice.jpg', '2024-11-05', 'on'),
(110, 2, 29, 'KG', 10.50, 55, 'Beef, high-quality and perfect for steaks and roasts.', 'https://example.com/images/beef.jpg', '2024-11-05', 'on'),
(111, 2, 30, 'KG', 12.00, 45, 'Lamb, tender and flavorful, ideal for special occasions.', 'https://example.com/images/lamb.jpg', '2024-11-05', 'on'),
(112, 2, 31, 'KG', 11.00, 50, 'Mutton, rich in flavor and perfect for hearty dishes.', 'https://example.com/images/mutton.jpg', '2024-11-05', 'on'),
(113, 3, 32, 'KG', 8.00, 70, 'Pork, versatile and great for a variety of recipes.', 'https://example.com/images/pork.jpg', '2024-11-05', 'on'),
(114, 1, 34, 'KG', 2.60, 160, 'Cumin Powder, essential for adding depth to your recipes.', 'https://example.com/images/cumin-powder.jpg', '2024-11-05', 'on'),
(115, 1, 35, 'KG', 3.00, 150, 'Chili Powder, perfect for spicy dishes and seasoning.', 'https://example.com/images/chili-powder.jpg', '2024-11-05', 'on');

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
-- Indexes for table `farmer_product_ads`
--
ALTER TABLE `farmer_product_ads`
  ADD PRIMARY KEY (`Farmer_Product_AD_ID`),
  ADD KEY `Farmer_ID` (`Farmer_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

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
-- Indexes for table `seller_product_ads`
--
ALTER TABLE `seller_product_ads`
  ADD PRIMARY KEY (`Seller_Product_AD_ID`),
  ADD KEY `Seller_ID` (`Seller_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

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
  MODIFY `Buyer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery_point`
--
ALTER TABLE `delivery_point`
  MODIFY `Delivery_Point_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmer`
--
ALTER TABLE `farmer`
  MODIFY `Farmer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `farmer_product_ads`
--
ALTER TABLE `farmer_product_ads`
  MODIFY `Farmer_Product_AD_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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
  MODIFY `Product_AD_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
  MODIFY `Seller_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seller_product_ads`
--
ALTER TABLE `seller_product_ads`
  MODIFY `Seller_Product_AD_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

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
-- Constraints for table `farmer_product_ads`
--
ALTER TABLE `farmer_product_ads`
  ADD CONSTRAINT `farmer_product_ads_ibfk_1` FOREIGN KEY (`Farmer_ID`) REFERENCES `farmer` (`Farmer_ID`),
  ADD CONSTRAINT `farmer_product_ads_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product_list` (`Product_ID`);

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
-- Constraints for table `seller_product_ads`
--
ALTER TABLE `seller_product_ads`
  ADD CONSTRAINT `seller_product_ads_ibfk_1` FOREIGN KEY (`Seller_ID`) REFERENCES `seller` (`Seller_ID`),
  ADD CONSTRAINT `seller_product_ads_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product_list` (`Product_ID`);

--
-- Constraints for table `zonal_admin`
--
ALTER TABLE `zonal_admin`
  ADD CONSTRAINT `zonal_admin_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
