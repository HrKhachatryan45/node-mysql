const {createPool} = require("mysql2");

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "admin123",
//     connectionLimit: 5000,
//     database:"employee_db"
// })

// pool.query(`select * from employee_db.employee_table`,(err, res) => {
//     // console.log(res)
//     // console.log(err)
// })

// SQL query to create a table
// const createTableQuery = `
// CREATE TABLE mytable (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   age INT NOT NULL,
//   position VARCHAR(255) NOT NULL,
//   salary DECIMAL(10, 2) NOT NULL
// )`;

// Execute the query to create the table
// pool.query(createTableQuery, (err, result) => {
//     if (err) {
//         console.error("Error creating table:", err);
//         return;
//     }
//     console.log("Table created successfully!");
// });
//

// nermucel informacia
// pool.query(`insert into  employee_db.mytable (id,name,age,position,salary)
// values(1,"lia",55,"x",5)
// `,(err, res) => {
//     console.log(res)
// })
//


// jnjum e
// pool.query(`delete from employee_db.mytable where id = 1 `,(err, res) => {
//     console.log(res)
// })

//update

// pool.query(`update employee_db.mytable
//   set id = 1 ,name = 'liza',age= 550,position = 'fe',salary = 8
//   where id = 1
// `,(err, res) => {})

// pool.query(`select * from employee_db.employee_table where EmoAge = 20 and EmpDept = 4000`,(err, res) => {
//     console.log(res)
// })

// pool.query(`select * from employee_db.employee_table where EmoAge = 20 or EmpDept = 4000`,(err, res) => {
//     console.log(res)
// })

// pool.query(`select * from employee_db.employee_table where not EmoAge = 20`,(err, res) => {
//     console.log(res)
// })
// pool.query(`select * from employee_db.employee_table limit 2`,(err, res) => {
//     console.log(res)
// })

//qanaky
// pool.query(`SELECT COUNT(EmpID) FROM employee_table`, (err, res) => {
//     if (err) {
//         console.error('Error executing query', err);
//
//     }
//     console.log(res)
// })

// mijin tvabanakan
// pool.query(`SELECT AVG(EmpID) FROM employee_table`, (err, res) => {
//     if (err) {
//         console.error('Error executing query', err);
//
//     }
//     console.log(res)
// })
//gumary
// pool.query(`SELECT SUM(EmpID) FROM employee_table`, (err, res) => {
//     if (err) {
//         console.error('Error executing query', err);
//
//     }
//     console.log(res)
// })

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "admin123",
//     connectionLimit: 5000,
//     database:"storedb"
// })


// pool.query(`CREATE DATABASE newDB`,(err,res) => {
//     console.log('database created successfully')
// })
// pool.query('SELECT productName,productPrice FROM products',(err,res) => {
//     console.log(res)
// })