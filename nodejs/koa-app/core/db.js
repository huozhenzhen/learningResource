const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').MYSQL_CONF
const {
    Sequelize,
    Model
} = require('sequelize')
const {
    clone,
    unset
} = require('lodash')
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        underscored: true,
        scopes: {
            ban: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            }
        }
    }
})

// Model.prototype.toJSON = function () {
//     let data = clone(this.dataValues);
//     unset(data, 'deletedAt')
//     if(Array.isArray(this.exclude)) {
//         this.exclude.forEach(item => {
//             unset(data, item)
//         });
//     }
//     return data   
// }

sequelize.sync({
    // force: true
})

module.exports = {
    db: sequelize
}