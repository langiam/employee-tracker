require('dotenv').config();
const pool = require('./connection');

const testDB = async () => {
  try {
    const res = await pool.query('SELECT * FROM department;');
    console.log('Database connected! Departments:', res.rows);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    pool.end();
  }
};

testDB();