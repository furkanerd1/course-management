CREATE DATABASE IF NOT EXISTS `course_management` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `course_management`;

DROP TABLE IF EXISTS `user_courses`;
DROP TABLE IF EXISTS `course`;
DROP TABLE IF EXISTS `users`;

-- Create users table
CREATE TABLE users (
                       `id` INT NOT NULL AUTO_INCREMENT,
                       `name` VARCHAR(255) NOT NULL,
                       `surname` VARCHAR(255) NOT NULL,
                       `identity_no` VARCHAR(11) NOT NULL UNIQUE,
                       `gender` VARCHAR(6) NOT NULL,
                       `urole` VARCHAR(16) NOT NULL,
                       PRIMARY KEY (`id`)
);

-- Create course table
CREATE TABLE course (
                        `id` INT NOT NULL AUTO_INCREMENT,
                        `name` VARCHAR(255) NOT NULL,
                        `teacher_id` INT NOT NULL,
                        CONSTRAINT fk_teacher_id
                            FOREIGN KEY (`teacher_id`)
                                REFERENCES users (`id`) ON DELETE CASCADE,
                        PRIMARY KEY (`id`)
);

-- Create user_courses table
CREATE TABLE user_courses (
                              `user_id` INT NOT NULL,
                              `course_id` INT NOT NULL,
                              CONSTRAINT fk_user_id
                                  FOREIGN KEY (`user_id`)
                                      REFERENCES users (`id`) ON DELETE CASCADE,
                              CONSTRAINT fk_course_id
                                  FOREIGN KEY (`course_id`)
                                      REFERENCES course (`id`) ON DELETE CASCADE,
                              PRIMARY KEY (`user_id`, `course_id`)
);
