var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog'
});

connection.connect();

const sql = 'select * from users'
connection.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result)
})

connection.end();