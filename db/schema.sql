-- Active: 1741267800011@@127.0.0.1@5432@employee_tracker
-- 1️⃣ Terminate all active connections
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE datname = 'employee_tracker'
AND pid <> pg_backend_pid();

-- 2️⃣ Switch to another database to avoid "currently open" error
SELECT 'Switching database...' AS message;

-- 3️⃣ Drop the database if it exists
DROP DATABASE IF EXISTS employee_tracker;

-- 4️⃣ Recreate the database with UTF-8 encoding using template0
CREATE DATABASE employee_tracker ENCODING 'UTF8' TEMPLATE template0;

-- 5️⃣ Switch to the new database
\c employee_tracker;

-- Recreate the database with UTF-8 encoding
CREATE DATABASE employee_tracker ENCODING 'UTF8' TEMPLATE template0;
SELECT datname, encoding, pg_encoding_to_char(encoding) FROM pg_database;

-- Connect to the new database
\c employee_tracker;

-- Create department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Create employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
