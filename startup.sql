

CREATE DATABASE IF NOT EXISTS `social`

CREATE TABLE `social`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `social`.`posts` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `postImg` VARCHAR(255) NULL,
  `userId` INT NULL,
  PRIMARY KEY (`postId`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);