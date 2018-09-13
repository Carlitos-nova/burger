var connection = require("./connection.js");

// Function for SQL syntax to pass 3 values into the mySQL query.
function createQuest(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
}
  
// Function to convert object key/value pairs to SQL syntax
function convertSql(item) {
    var arr = [];
    
    for (var key in item) {
      var value = item[key];
      if (Object.hasOwnProperty.call(item, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
}

// Making the ORM object and MySQL queries  
var orm = {
    selectAll: function (tableInput, combine) {
        var query = "SELECT * FROM ??";
        connection.query(query, [tableInput], function (err, result) {
            if (err) throw err;
            combine(result);
        });
    },
    insertOne: function (tableInput, Col, val, combine) {
        var queryString = "INSERT INTO " + tableInput;

        queryString += " (";
        queryString += Col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += createQuest(val.length);
        queryString += ") ";
    
        console.log(queryString);

        connection.query(queryString, val, function (err, result) {
            if (err) throw err;
            combine(result);
        });
    },
    updateOne: function (tableInput, itmValofCol, condition, combine) {
		var queryString = "UPDATE " + tableInput;

		queryString += " SET ";
		queryString += convertSql(itmValofCol);
		queryString += " WHERE ";
		queryString += condition;

        console.log(queryString);
        
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            combine(result);
        });
    }
};

module.exports = orm;