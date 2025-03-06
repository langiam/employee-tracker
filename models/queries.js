const pool = require ('../db/connection');

class Database {

// Verify that database connection works
    static async testConnection() {
        try {
            const res = await pool.query('SELECT * FROM department LIMIT 1;');
            console.log('✅Database succesfully connected! Sample Department:, res.rows);
        } catch (error) {
            console.error('❌ Database connection error:', error);
        }
    }

// View All Depts.
static async viewRoles()
    const result = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id;
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
        SELECT e.id, e.fist_name, role.title AS job_title, department.name AS department, 
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

// Add employee

// Update employee's role


}
