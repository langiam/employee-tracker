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

    // View department managers
    static async viewDepartmentManagers() {
        try {
            const result = await pool.query(`
                SELECT 
                    d.name AS department,
                    e.id AS manager_id,
                    e.first_name || ' ' || e.last_name AS manager_name,
                    r.title AS role
                FROM employee e
                JOIN role r ON e.role_id = r.id
                JOIN department d ON r.department_id = d.id
                WHERE e.manager_id IS NULL 
                ORDER BY d.name ASC;  
            `);
            return result.rows;
        } catch (error) {
            console.error('❌ Error fetching department managers:', error);
        }
    }
    
    // View employees by manager
    static async viewEmployeesByManager() {
        const result = await pool.query(`
        SELECT 
            m.id AS manager_id,
            m.first_name || ' ' || m.last_name AS manager_name,
            e.id AS employee_id,
            e.first_name || ' ' || e.last_name AS employee_name,
            r.title AS role
        FROM employee e
        JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE e.manager_id IS NOT NULL  -- Only employees who have managers
        ORDER BY manager_name, employee_name;
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
