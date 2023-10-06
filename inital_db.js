const mysql = require('mysql2');


try{
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });
  
  // Create the database
   connection.query('CREATE DATABASE IF NOT EXISTS node_pro');
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_pro',
});

  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS temperature_label (
      id int(11) NOT NULL,
      min_temperature int(11) NOT NULL,
      max_temperature int(11) NOT NULL,
      label varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )
  `);

  dbConnection.query(`
  INSERT INTO temperature_label (id, min_temperature, max_temperature, label) VALUES
  (1, -20, 0, 'Very Cold'),
  (2, 0, 15, 'Cold'),
  (3, 15, 25, 'Moderate'),
  (4, 25, 40, 'Hot'),
  (5, 40, 100, 'Very Hot')
`);

console.log('Database and table created, data inserted.');
    }
    catch(err){console.log("error is ",err)}