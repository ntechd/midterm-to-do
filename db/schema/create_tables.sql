-- Drop and recreate Users table (Example)
-- drop user table
DROP TABLE IF EXISTS users CASCADE;
-- create new user table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
-- drop categories table
DROP TABLE IF EXISTS categories CASCADE;
-- create new categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
-- drop tasks table
DROP TABLE IF EXISTS tasks CASCADE;
-- create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_time TIMESTAMP,
  is_done BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);