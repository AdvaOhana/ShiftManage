CREATE DATABASE IF NOT EXISTS shift_manage;

USE shift_manage;

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL,
	`craetedAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `shifts` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`start` time NOT NULL,
	`end` time NOT NULL,
	`createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `assignments` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`shift_id` int,
	`start` datetime NOT NULL,
	`end` datetime NOT NULL,
	`createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `unavailability` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`start` time NOT NULL,
	`end` time NOT NULL,
	`createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);



ALTER TABLE `assignments` ADD CONSTRAINT `assignments_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `assignments` ADD CONSTRAINT `assignments_fk2` FOREIGN KEY (`shift_id`) REFERENCES `shifts`(`id`);
ALTER TABLE `unavailability` ADD CONSTRAINT `unavailability_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);