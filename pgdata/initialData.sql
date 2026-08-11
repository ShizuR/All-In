-- pre-seeding with dummy data

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO customers (name, email) VALUES 
('Abigail Potts', 'aPotts@gmail.com'),
('Elliot Smith', 'eSmith@hotmail.com'),
('Samantha Hues', 'sHues@icloud.com');
