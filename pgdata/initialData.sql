-- pre-seeding with dummy data

CREATE TABLE IF NOT EXISTS prisons (
    prison_id SERIAL PRIMARY KEY,
    Name VARCHAR(25) NOT NULL,
    Country VARCHAR(16) NOT NULL CHECK(Country = 'England' OR Country = 'Wales' OR Country = 'Scotland' OR Country = 'Northern Ireland'),
    security_lvl INTEGER CHECK(0 <= security_lvl AND security_lvl < 5),
    max_prisoners INTEGER NOT NULL,
    prisoner_count INTEGER NOT NULL CHECK(prisoner_count <= max_prisoners),
    Gender CHARACTER(2) NOT NULL CHECK(Gender = 'F' OR Gender = 'M')
);

CREATE TABLE IF NOT EXISTS criminals (
    id SERIAL PRIMARY KEY,
    prison_id INTEGER REFERENCES prisons(prison_id),
    Name VARCHAR(20) NOT NULL,
    Age INTEGER NOT NULL CHECK(18 <= Age AND Age <= 100),
    Gender CHARACTER(1) NOT NULL CHECK(Gender = 'F' OR Gender = 'M'),
    Crime VARCHAR(20) NOT NULL,
    danger_lvl INTEGER NOT NULL CHECK(0 < danger_lvl And danger_lvl < 5)
);

INSERT INTO prisons (Name, Country, security_lvl, max_prisoners, prisoner_count, Gender) VALUES 
('Stafford', 'England', 2, 751, 694, 'M'),
('Cardiff', 'Wales', 3, 784, 534, 'M'),
('Barlinnie', 'Scotland', 4, 987, 826, 'M'),
('Burren House', 'Northern Ireland', 1, 25, 12, 'M'),
('Downview', 'England', 0, 356, 275, 'F'),
('Cornton Vale', 'Scotland', 0, 119, 93, 'F'),
('Ash House', 'Northern Ireland', 0, 71, 63, 'F');

INSERT INTO criminals (prison_id, Name, Age, Gender, Crime, danger_lvl) VALUES 
(6, 'Abigail Potts', 23, 'F', 'Burglary', 3),
(4, 'Elliot Smith', 35, 'M', 'Fraud', 1),
(5, 'Samantha Hues', 56, 'F', 'Speeding', 1),
(3, 'John Doe', 18, 'M', 'Murder', 4);
