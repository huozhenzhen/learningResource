const evn = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (evn === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '291378',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}
if (evn === 'production') {

    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '291378',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};