INSERT INTO department (name) VALUES
    ('Legal'),
    ('Marketing'),
    ('Sales'),
    ('IT');
    ('HR');
    ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Legal', 250000, 1),
    ('Marketing', 145000, 2),
    ('Sales', 90000, 3),
    ('IT', 75000, 4),
    ('HR', 145000, 5),
    ('Finance', 200000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Ted', 'Roberts', 1, NULL),
    ('Elise', 'Himmel', 1, 1),
    ('Sally', 'Hill', 1, NULL),
    ('John', 'Doe', 1, NULL),
    ('Zara', 'Brown', 2, NULL),
    ('Cecilia', 'Ruiz', 2, 2),
    ('Eva', 'Davis', 2, NULL),
    ('Adam', 'Smith', 2, NULL),
    ('Sofia', 'Garcia', 3, NULL),
    ('Luis', 'Sanchez', 3, 3),
    ('Fernando', 'Jones', 3, NULL),
    ('Sarah', 'Taylor', 3, NULL),
    ('Julian', 'Martinez', 4, NULL),
    ('Mateo', 'Gonzalez', 4, 4),
    ('Olivia', 'Brown', 4, NULL),
    ('Ethan', 'Miller', 4, NULL),
    ('Savannah', 'Rodriguez', 5, NULL),
    ('Ava', 'Hernandez', 5, 5),
    ('Gabriel', 'Williams', 5, NULL),
    ('Lily', 'Martin', 5, NULL),
    ('Alex', 'Lopez', 6, NULL),
    ('Isabella', 'Gomez', 6, 6),
    ('Elijah', 'Hall', 6, NULL),
    ('Charlotte', 'Thomas', 6, NULL),


