-- phpMyAdmin SQL
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `temparature_lable` (
  `id` int(11) NOT NULL,
  `min_temperature` int(11) NOT NULL,
  `max_temperature:` int(11) NOT NULL,
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `temparature_lable` (`id`, `min_temperature`, `max_temperature:`, `label`) VALUES
(1, -20, 0, 'Very Cold'),
(2, 0, 15, 'Cold'),
(3, 15, 25, 'Moderate'),
(4, 25, 40, 'Hot'),
(5, 40, 100, 'Very Hot');


ALTER TABLE `temparature_lable`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `temparature_lable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;


