var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: 'root',
  password: ' ',
  database: 'chat'
});

connection.connect(function (err) {
  if (!err) {
    console.log('Database connected');
  } else {
    console.log('Error connecting: ', err);
  }
});

connection.query('select * from messages', function(err, rows) {
  if (err) {
    throw err;
  } else {
    console.log('Received data: ', rows);
  }
});

//connection.end();

console.log('Connecting to DB');

module.exports = connection;