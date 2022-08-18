CREATE DATABASE IF NOT EXISTS immall;

USE immall;

CREATE TABLE `test`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(110) NOT NULL,
  `created_time` DATETIME NULL DEFAULT NOW(),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));


