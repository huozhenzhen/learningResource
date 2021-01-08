const {
    Sequelize,
    Model,
    Op
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
    static async getMyClassicFavors(uid) {
        const artsAllList = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!artsAllList) {
            throw new global.infos.NotFoundError
        }
        const favorLists = await Art.getArtList(artsAllList)

        return favorLists
    }

    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                type: 400,
                uid
            }
        })
        return count
    }

    static async getBookFavorInfo(bookId, uid) {
        const favorNums = await Favor.count({
            where: {
                artId: bookId,
                type: 400
            }
        })

        const myFavor = await Favor.findOne({
            where: {
                artId: bookId,
                type: 400,
                uid
            }
        })

        return {
            favorNums,
            likeStatus: myFavor ? 1 : 0
        }
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