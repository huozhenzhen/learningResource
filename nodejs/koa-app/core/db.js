const { dbName, host, port, user, password } = require('../config/config').MYSQL_CONF
const {Sequelize, Model} = require('sequelize')

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define:{
     
    }
})

sequelize.sync()

module.exports = {
    db: sequelize
}