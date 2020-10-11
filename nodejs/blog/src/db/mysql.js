const mysql = require('mysql')
const { MYSQL_CONF} = require('../conf/db');

var connection = mysql.createConnection(MYSQL_CONF);

connection.connect();

function exec(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        })
    })
}

module.exports = { exec }

