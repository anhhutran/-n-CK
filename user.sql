-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 07, 2023 lúc 01:06 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `user`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exercise`
--

CREATE TABLE `exercise` (
  `ExID` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `LinkV` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ImageV` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `View` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `exercise`
--

INSERT INTO `exercise` (`ExID`, `Name`, `LinkV`, `ImageV`, `View`) VALUES
('E01', 'Mình đã giảm 13 kg! ĂN KIÊNG KETO VÀ CÁC LƯU Ý !', 'https://www.youtube.com/watch?v=j2LuB960MrE&t=1s', 'https://img.youtube.com/vi/j2LuB960MrE/maxresdefault.jpg', 2),
('E02', 'Keto diet là gì? ( lợi ích, tác hại, thực hành ở siêu thị,... ) Hana Giang Anh', 'https://www.youtube.com/watch?v=nC5zJUcjQjE', 'https://img.youtube.com/vi/nC5zJUcjQjE/maxresdefault.jpg', 2),
('E03', 'How To Start Eating Healthy (LIFE CHANGING)', 'https://www.youtube.com/watch?v=2kCOXLkbsKw', 'https://img.youtube.com/vi/2kCOXLkbsKw/maxresdefault.jpg', 1),
('E04', '10 Minutes Yoga For Beginners', 'https://www.youtube.com/embed/j7rKKpwdXNE', 'https://img.youtube.com/vi/j7rKKpwdXNE/0.jpg', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userin`
--

CREATE TABLE `userin` (
  `ID` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `username` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `userin`
--

INSERT INTO `userin` (`ID`, `username`, `password`, `email`) VALUES
('1659533236798', 'Huy', '123', 'anhhuytran2409@gmail.com'),
('1659679493889', 'Huy123', '1123232', 'anhhuytran2409@gmail.com'),
('001', 'name1', '123', 'anhhuytran2409@gmail.com'),
('1659525246513', 'name2', '123', '123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `watchedlist`
--

CREATE TABLE `watchedlist` (
  `name` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `ExID` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `watchedlist`
--

INSERT INTO `watchedlist` (`name`, `ExID`) VALUES
('ahuy', 'E01'),
('ahuy', 'E02'),
('ahuy', 'E03'),
('ahuy', 'E04'),
('name2', 'E01'),
('name2', 'E02');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`ExID`,`Name`);

--
-- Chỉ mục cho bảng `userin`
--
ALTER TABLE `userin`
  ADD PRIMARY KEY (`username`);

--
-- Chỉ mục cho bảng `watchedlist`
--
ALTER TABLE `watchedlist`
  ADD PRIMARY KEY (`name`,`ExID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
