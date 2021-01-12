-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th1 12, 2021 lúc 08:20 AM
-- Phiên bản máy phục vụ: 10.4.10-MariaDB
-- Phiên bản PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `app_weather`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `updated`) VALUES
(1, 'Tuổi trẻ', '2021-01-12 06:36:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categories` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `img` text NOT NULL,
  `link` text NOT NULL,
  `author` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `id_categories`, `title`, `content`, `img`, `link`, `author`, `created`) VALUES
(1, 1, 'test', 'test', 'https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg', 'http://congan.com.vn/', 'admin', '2021-01-12 06:41:38'),
(2, 1, 'test2', 'test2', 'https://i.pinimg.com/originals/e2/4f/2d/e24f2d0d2ef2efde9fd55919dfa64a51.png', 'https://vneconomy.vn/', 'admin', '2021-01-12 06:46:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `fullname` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `password`) VALUES
(1, 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `weather`
--

DROP TABLE IF EXISTS `weather`;
CREATE TABLE IF NOT EXISTS `weather` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` int(11) NOT NULL,
  `temperature` int(11) NOT NULL,
  `humidity` int(11) NOT NULL,
  `wind_power` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `img` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `weather`
--

INSERT INTO `weather` (`id`, `address`, `temperature`, `humidity`, `wind_power`, `time`, `img`) VALUES
(1, 1, 20, 20, 21, '2021-01-12 06:53:11', 'https://i.pinimg.com/originals/e2/4f/2d/e24f2d0d2ef2efde9fd55919dfa64a51.png'),
(2, 2, 31, 32, 31, '2021-01-12 06:53:11', 'https://lh3.googleusercontent.com/proxy/71M_heMKkgI5CvSkFJMFRf1S3y6H75-kNcLYOjd06KvowKHELHURTNBXwt47xag-TMETQeQmrKoLucig-qYDiWI0oFGJTSDTF7_Ihll3ByRwJjrhUg9qZ69ZcfqPAwIe9MyBpFbSBujPDOJ16rM0pbUK4hRtsvm6Kw');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
