var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
    // DB is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "burgers_db"
    });
};

connection.connect(function(err) {
    if (err) {
      console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId + '\n\n');
  });

module.exports = connection;