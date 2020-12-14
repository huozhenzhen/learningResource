const bcrypt = require('bcryptjs')
const {
    Sequelize,
    Model
} = require('sequelize')
const {
    db
} = require('@root/core/db')

class User extends Model {
    static async verifyEmailPassword(email, inputPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.infos.AuthFailed('用户不存在')
        }
        const isCorrect = bcrypt.compareSync(inputPassword, user.password)
        if (!isCorrect) {
            throw new global.infos.AuthFailed('密码错误')
        }

        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }
    static async registerUser(openid) {
        const user = await User.create({
            openid
        })
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize: db,
    tableName: 'user'
})

module.exports = {
    User
}