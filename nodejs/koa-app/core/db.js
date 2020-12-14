const { dbName, host, port, user, password } = require('../config/config').MYSQL_CONF
const {Sequelize, Model} = require('sequelize')

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define:{
        timestamps: true,
        paranoid: true,
        underscored:true
    }
})

sequelize.sync({
    // force: true
})

module.exports = {
    db: sequelize
}