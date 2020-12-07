const env = process.env.NODE_ENV
let CONFIG

if (env === 'dev') {
    CONFIG = {
        MYSQL_CONF: {
            dbName: 'yue',
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '291378'
        }
    }

}

module.exports = CONFIG