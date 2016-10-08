CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(255) NULL DEFAULT NULL,
  `userID` INTEGER NULL DEFAULT NULL,
  `time` VARCHAR(20) NULL DEFAULT NULL,
  `room` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `username` VARCHAR(16) NULL DEFAULT NULL,
  `color` VARCHAR(20) NOT NULL DEFAULT 'NULL',
  `bold` TINYINT NOT NULL DEFAULT 0,
  `italics` TINYINT NOT NULL DEFAULT 0,
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (userID) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`text`,`userID`,`time`,`room`) VALUES
-- ('','','','','');
-- INSERT INTO `Users` (`username`,`color`,`bold`,`italics`,`id`) VALUES
-- ('','','','','');