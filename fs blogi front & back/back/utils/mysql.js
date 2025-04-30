
const mysql = require('mysql2');
 
//yhteys
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '?????????',
  database: 'test_db',
});
 
function closeDatabase() {
  pool.end();
}
 
//query funktiot
function query(sql, args) {
  return new Promise((resolve, reject) => {
    pool.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}
 
async function dropTable() {
  const sql = `
    DROP TABLE IF EXISTS test_table
  `;
  await query(sql);
}
 
//luo test_table
async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS test_table (
      id INT(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )
  `;
  await query(sql);
}
 
//populate
async function populateTable() {
  const sql = `
    INSERT INTO test_table (name, email)
    VALUES ('Assi Asynkroninen', 'as.async@example.com'),
           ('Seppo Synkroninen', 'parempi.toiminto@example.com')
  `;
  await query(sql);
}
 
//lue data
async function readTable() {
  const sql = `
    SELECT * FROM test_table
  `;
  return await query(sql);
}
 
module.exports = { dropTable, createTable, populateTable, readTable, closeDatabase };