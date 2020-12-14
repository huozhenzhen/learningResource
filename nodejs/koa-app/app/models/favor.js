const {
    Sequelize,
    Model
} = require('sequelize')
const {
    db
} = require('@root/core/db')
const {
    Art
} = require('./art')


class Favor extends Model {
    static async like(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.infos.LikeError()
        }
        return db.transaction(async t => {
            await Favor.create({
                artId,
                type,
                uid
            }, {
                transaction: t
            })
            const art = await Art.getTypeData(artId, type)
            await art.increment('favNums', {
                by: 1,
                transaction: t
            })
        })
    }
    static async dislike(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.infos.DislikeError()
        }
        return db.transaction(async t => {
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getTypeData(artId, type)
            await art.decrement('favNums', {
                by: 1,
                transaction: t
            })
        })

    }
    static async userLikeIt(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })

        return favor ? true : false
    }

}

Favor.init({
    uid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize: db,
    tableName: 'favor'
})


module.exports = {
    Favor
}