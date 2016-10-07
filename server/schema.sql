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
  `username` VARCHAR(16) NULL DEFAULT NULL,
  `time` VARCHAR(20) NULL DEFAULT NULL,
  `room` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`text`,`username`,`time`,`room`) VALUES
-- ('','','','','');