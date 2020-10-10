const evn = process.env.NODE_ENV

let MYSQL_CONF

if (evn === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '291378',
        database: 'myblog'
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

}

module.exports = {
    MYSQL_CONF
};