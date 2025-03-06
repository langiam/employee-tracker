const pool = require('./connection');

async function testDB() {
    try {
        const res = await pool.query('SELECT * FROM department;');
        console.log('Database successfuly connected! Departments:', res.rows);
    } catch (error) {
        console.error('Database connection error detected:', error);
    } finally {
        pool.end();
    }
}

testDB();