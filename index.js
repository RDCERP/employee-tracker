// Create const 
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker_db',
});

// Connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    start();
});

// Start function
function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'View all roles',
                'Add role',
                'Remove role',
                'View all departments',
                'Add department',
                'Remove department',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'View all employees by department':
                    viewAllEmployeesByDepartment();
                    break;

                case 'View all employees by manager':
                    viewAllEmployeesByManager();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'Update employee manager':
                    updateEmployeeManager();
                    break;

                case 'View all roles':
                    viewAllRoles();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Remove role':
                    removeRole();
                    break;

                case 'View all departments':
                    viewAllDepartments();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Remove department':
                    removeDepartment();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
}

// View all employees
function viewAllEmployees() {
    const query = 'SELECT * FROM employee_mst';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// View all employees by department
function viewAllEmployeesByDepartment() {
    const query = 'select first_name as First, last_name as Last, name as Department from employee_mst e left join role_mst r on e.role_id = r.id left join department_mst d on r.department_id = d.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// View all employees by manager
function viewAllEmployeesByManager() {
    const query = 'select first_name as First, last_name as Last, manager_id as ManagerID from employee_mst e left join role_mst r on e.role_id = r.id order by manager_id desc';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the first name of the employee?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name of the employee?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the role id of the employee?',
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the manager id of the employee?',
            },
        ])
        .then((answer) => {
            const query = `INSERT INTO employee_mst(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
            connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// Remove employee
function removeEmployee() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the employee you would like to remove?',
            },
        ])
        .then((answer) => {
            const query = 'DELETE FROM employee_mst e WHERE e.id = ?';
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// Update employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the employee you would like to update?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the new role id of the employee?',
            },
        ])
        .then((answer) => {
            const query = 'UPDATE employee_mst e SET e.role_id = ? WHERE e.id = ?';
            connection.query(query, [answer.role_id, answer.id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// Update employee manager
function updateEmployeeManager() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the employee you would like to update?',
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the new manager id of the employee?',
            },
        ])
        .then((answer) => {
            const query = 'UPDATE employee_mst e SET e.manager_id = ? WHERE e.id = ?';
            connection.query(query, [answer.manager_id, answer.id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// View all roles
function viewAllRoles() {
    const query = 'SELECT * FROM role_mst';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add role
function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?',
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department id of the role?',
            },
        ])
        .then((answer) => {
            const query = 'INSERT INTO role_mst (title, salary, department_id) values (?,?,?)';
            connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// Remove role
function removeRole() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the role you would like to remove?',
            },
        ])
        .then((answer) => {
            const query = 'DELETE FROM role_mst r WHERE r.id = ?';
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// View all departments
function viewAllDepartments() {
    const query = 'SELECT id, name as department FROM department_mst';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?',
            },
        ])
        .then((answer) => {
            const query = 'INSERT INTO department_mst (name) values (?)';
            connection.query(query, [answer.name], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// Remove department
function removeDepartment() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the department you would like to remove?',
            },
        ])
        .then((answer) => {
            const query = 'DELETE FROM department_mst d WHERE d.id = ?';
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}

// View total utilized budget of a department
function viewTotalUtilizedBudgetOfADepartment() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the id of the department you would like to view the total utilized budget of?',
            },
        ])
        .then((answer) => {
            const query = 'SELECT SUM(salary) FROM role WHERE department_id = ?';
            connection.query(query, answer, (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        });
}








