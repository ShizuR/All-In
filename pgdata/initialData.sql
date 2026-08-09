-- pre-seeding with dummy data

CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO customers (id, name, email) VALUES 
(1, 'Abigail Potts', 'aPotts@gmail.com'),
(2, 'Elliot Smith', 'eSmith@hotmail.com'),
(3, 'Samantha Hues', 'sHues@icloud.com');
