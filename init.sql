CREATE DATABASE IF NOT EXISTS calculator_db;

USE calculator_db;

CREATE TABLE IF NOT EXISTS history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expression VARCHAR(255),
    result VARCHAR(255)
);

