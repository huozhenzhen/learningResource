const { Sequelize, Model } = require('sequelize')
const {db} = require('../../core/db')

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nick_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize: db
})