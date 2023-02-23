

CREATE DATABASE IF NOT EXISTS `social`

CREATE TABLE `railway`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `railway`.`posts` (
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

    CREATE TABLE `railway`.`comments` (
  `commentId` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`commentId`),
  INDEX `commentPost_idx` (`postId` ASC) VISIBLE,
  INDEX `commentUserFK_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `commentPostFK`
    FOREIGN KEY (`postId`)
    REFERENCES `raiway`.`posts` (`postId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `commentUserFK`
    FOREIGN KEY (`userId`)
    REFERENCES `railway`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);