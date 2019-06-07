--Clear out what exists in the database for fresh start
DROP DATABASE IF EXISTS shoe_true_size;

--Create/Recreate database
create database shoe_true_size;

--Connect to created database
\c shoe_true_size; 

--Create the tables

CREATE TABLE brands (
  brand_id SERIAL PRIMARY KEY,
  brand_name VARCHAR (30),
  created_at TIMESTAMP
);

CREATE TABLE shoes (
  shoe_id SERIAL PRIMARY KEY,
  brand_id INT REFERENCES brands(brand_id),
  shoe_name VARCHAR (50) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE true_to_size_entries (
  entry_id SERIAL PRIMARY KEY,
  shoe_id INT REFERENCES shoes(shoe_id),
  true_to_size_entry SMALLINT NOT NULL,
  created_at TIMESTAMP
);

--Create defaults for the created_at columns to be when they are created
ALTER TABLE brands
ALTER COLUMN created_at SET DEFAULT NOW();

ALTER TABLE shoes
ALTER COLUMN created_at SET DEFAULT NOW();

ALTER TABLE true_to_size_entries
ALTER COLUMN created_at SET DEFAULT NOW();

--Insert dummy data into the database
INSERT INTO brands (brand_name) VALUES 
  ('Adidas'),
  ('Nike'),
  ('Under Armour'),
  ('Puma');

INSERT INTO shoes (brand_id, shoe_name) VALUES 
  (1,'Yeezy'),
  (1, 'NMD_R2'),
  (1, 'Ultraboost'),
  (2, 'Lebron 16'),
  (2, 'Kyrie 4'),
  (2, 'Hyperdunk X'),
  (3, 'Forge 96'),
  (3, 'Hovr Havoc'),
  (3, 'Spawn Low'),
  (4, 'Super Liga'),
  (4, 'Mexico 66'),
  (4, 'The Royale');

INSERT INTO true_to_size_entries (shoe_id, true_to_size_entry) VALUES 
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 3),
  (2, 3),
  (2, 3),
  (2, 3),
  (2, 3),
  (2, 2),
  (3, 1),
  (3, 1),
  (3, 1),
  (3, 2),
  (3, 2),
  (4, 1),
  (4, 1),
  (4, 1),
  (4, 2),
  (4, 2),
  (5, 3),
  (5, 3),
  (5, 4),
  (5, 5),
  (5, 3),
  (6, 2),
  (6, 2),
  (6, 1),
  (6, 4),
  (6, 3),
  (7, 2),
  (7, 3),
  (7, 4),
  (7, 4),
  (7, 4),
  (8, 1),
  (8, 1),
  (8, 1),
  (8, 2),
  (9, 3),
  (10, 5),
  (10, 5),
  (10, 4),
  (11, 2),
  (11, 3),
  (11, 3),
  (11, 4),
  (12, 1),
  (12, 1),
  (12, 5);