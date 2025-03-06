-- Active: 1741267800011@@127.0.0.1@5432@employee_tracker
INSERT INTO department (name) VALUES
    ('Legal'),
    ('Marketing'),
    ('Sales'),
    ('IT'),
    ('HR'),
    ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Corporate Lawyer', 250000, 1),  -- Legal
    ('Brand Strategy', 145000, 2),    -- Marketing
    ('Account Executive', 90000, 3),  -- Sales
    ('IT Specialist', 75000, 4),      -- IT
    ('HR Officer', 145000, 5),        -- HR
    ('Financial Analyst', 200000, 6); -- Finance

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
     ('Ted', 'Roberts', 1, NULL),
    ('Elise', 'Himmel', 1, 1),   
    ('Sally', 'Hill', 1, 1),     
    ('John', 'Doe', 1, 1),       

    ('Zara', 'Brown', 2, NULL),  
    ('Cecilia', 'Ruiz', 2, 5),   
    ('Eva', 'Davis', 2, 5),
    ('Adam', 'Smith', 2, 5),

    ('Sofia', 'Garcia', 3, NULL),
    ('Luis', 'Sanchez', 3, 9),
    ('Fernando', 'Jones', 3, 9),
    ('Sarah', 'Taylor', 3, 9),

    ('Julian', 'Martinez', 4, NULL),
    ('Mateo', 'Gonzalez', 4, 13),
    ('Olivia', 'Brown', 4, 13),
    ('Ethan', 'Miller', 4, 13),

    ('Savannah', 'Rodriguez', 5, NULL),
    ('Ava', 'Hernandez', 5, 17),
    ('Gabriel', 'Williams', 5, 17),
    ('Lily', 'Martin', 5, 17),

    ('Alex', 'Lopez', 6, NULL),
    ('Isabella', 'Gomez', 6, 21),
    ('Elijah', 'Hall', 6, 21),
    ('Charlotte', 'Thomas', 6, 21);

    SELECT pg_encoding_to_char(encoding) FROM pg_database WHERE datname = 'employee_tracker';
