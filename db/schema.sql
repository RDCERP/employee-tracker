DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db; 

CREATE TABLE department_mst (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role_mst (
    id INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(11,2) NOT NULL,
    department_id INTEGER not null, 
    FOREIGN key (department_id) REFERENCES department_mst(id));
);

CREATE TABLE employee_mst (
    id INTEGER PRIMARY KEY AUTO_INCREMENT not null,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, 
    manager_id INTEGER,
    FOREIGN key (role_id) REFERENCES role_mst(id),
    FOREIGN key (manager_id) REFERENCES employee_mst(id)
);
