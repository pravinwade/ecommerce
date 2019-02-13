var mysql = require('mysql');
var connection = require("../_Dbconnection/connectionString");

var conn = new mysql.createConnection(connection.connectionString);

conn.connect((err) => {
    if (!err) {
        console.log('connection successfully');
    } else {
        console.log(err);
    }
})

exports.loginstatus = function(query, callback) {
    //login = JSON.parse(query);

    // var req = new mysql.Request(conn);
    // conn.connect().then(function() {
    //     req.input('UserId', login.UM_USER_ID);
    //     req.input('Password', login.UM_PASSWORD);
    //     req.execute("Login").then(function(data) {
    //         callback(data.recordset);
    //         conn.close();
    //     }).catch(function(err) {
    //         console.log(err);
    //         callback(null, err);
    //         conn.close();
    //     });
    // }).catch(function(err) {
    //     callback(null, err);
    //     conn.close();
    // });
}

exports.execmysql = function(query, callback) {
    conn.connect(function() {
        conn.query(query, function(err, result) {
            if (err) {
                console.log(err);
                return false;
            } else {
                callback(result);
            }
        })
    })
}

// loginstatus();