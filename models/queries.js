const pool = require('../db/connection');

class Database {

    // Verify that database connection works
    static async testConnection() {
        try {
            const res = await pool.query('SELECT * FROM department LIMIT 1;');
            console.log('✅Database successfully connected! Sample Department:', res.rows);
        } catch (error) {
            console.error('❌ Database connection error:', error);
        }
    }

    // View All Depts.
    static async viewDepartments() {
        const result = await pool.query(`
            SELECT * FROM department;
        `);
        return result.rows;
    }

    // View all roles
    static async viewRoles() {
        const result = await pool.query(`
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id;
        `);
        return result.rows;
    }

    // View all employees
    static async viewEmployees() {
        const result = await pool.query(`
            SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, 
                role.salary, COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager
            FROM employee e
            JOIN role ON e.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee m ON e.manager_id = m.id;
        `);
        return result.rows;
    }

    // Add a department
    static async addDepartment(name) {
        await pool.query(`INSERT INTO department (name) VALUES ($1);`, [name]);
    }

    // Add role
    static async addRole(title, salary, department_id) {
        await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);`,
            [title, salary, department_id]);
    }

    // Add employee
    static async addEmployee(first_name, last_name, role_id, manager_id) {
        await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);`,
            [first_name, last_name, role_id, manager_id || null]);
    }

    // Update employee's role
    static async updateEmployeeRole(employee_id, new_role_id) {
        await pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2;`, [new_role_id, employee_id]);
    }
}

module.exports = Database;
