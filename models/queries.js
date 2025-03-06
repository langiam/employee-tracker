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



// View all roles

// View all employees

// Add a department

// Add role

// Add employee

// Update employee's role


}
