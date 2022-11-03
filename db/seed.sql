USE employee_tracker_db;

INSERT INTO department_mst(name)
VALUES('Sales'),
('Manufacturing'),
('IT'),
('Human Resources');

INSERT INTO role_mst(title, salary, department_id)
VALUES('Outside Sales', 120000.00, 1),
('Inside Sales', 45000.00, 1),
('Foreman', 60000.00, 2),
('Apprentice', 30000.00, 2),
('DB Administrator', 90000.00, 3),
('HR Manager', 35000.00, 4),
('Office Assistant', 25000.00, 1);

INSERT INTO employee_mst(first_name, last_name, role_id, manager_id)
VALUES('Greg', 'Glass', 1, NULL),
('Vazas', 'Theronath', 2, 1),
('Bily', 'Bhambi', 2, 1),
('Ilias', 'Cirillo', 3, NULL),
('Atlas', 'Omni', 4, 4),
('Samra', 'Till', 4, 4),
('Ellsworth', 'Wildingham', 5, NULL),
('Titus', 'Andromedon', 6, 7),
('Kimmy', 'Schmitt', 6, 7);