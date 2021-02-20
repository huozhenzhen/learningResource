const {
    Movie,
    Sentence,
    Music,
} = require('./classic')

const {
    Op
} = require('sequelize')

class Art {
    constructor(artId, type) {
        this.artId = artId
        this.type = type
    }
    static async getArtList(artInfoArr) {
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        };
        let targetArr = [];
        for (const item of artInfoArr) {
            if (item.type) {
                artInfoObj[item.type].push(item.artId)
            }
        }
        for (const key in artInfoObj) {
            const ids = artInfoObj[key];
            if (ids.length === 0) continue;
            let arr = await Art._getArtListFn(artInfoObj[key], key)
            targetArr = targetArr.concat(arr)
        }
        return targetArr
    }
    static async _getArtListFn(ids, type) {
        let arts = [];
        type = type.toString()
        const findTargetObj = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        switch (type) {
            case '100':
                arts = await Movie.scope('ban').findAll(findTargetObj)
                break;
            case '200':
                arts = await Music.scope('ban').findAll(findTargetObj)
                break;
            case '300':
                arts = await Sentence.scope('ban').findAll(findTargetObj)
                break;
                // case '400':
                //     arts = await Book.findOne(findTargetObj)
                //     break;
            default:
                break;
        }

        // console.log('models---arts', arts)
        // arts.forEach(art => {
        //     if (art && art.image) {
        //         let imgUrl = art.dataValues.image
        //         art.dataValues.image = global.config.host + imgUrl
        //     }
        // })

        return arts

    }
    static async getTypeData(artId, type) {
        const findTargetObj = {
            where: {
                id: artId
            }
        }
        let art = null
        type = type.toString()
        switch (type) {
            case '100':
                art = await Movie.scope('ban').findOne(findTargetObj)
                break;
            case '200':
                art = await Music.scope('ban').findOne(findTargetObj)
                break;
            case '300':
                art = await Sentence.scope('ban').findOne(findTargetObj)
                break;
            case '400':
                const {
                    Book
                } = require('./book')

                art = await Book.scope('ban').findOne(findTargetObj)

                if (!art) {
                    art = await Book.create({
                        id: artId
                    })
                }
                break;
            default:
                break;
        }

        // if (art && art.image) {
        //     let imgUrl = art.dataValues.image
        //     art.dataValues.image = global.config.host + imgUrl
        // }
        return art

    }

    async getDetail(uid) {
        const {
            Favor
        } = require('./favor')
        const art = await Art.getTypeData(this.artId, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }

        const like = await Favor.userLikeIt(
            this.artId, this.type, uid)
        // art.setDataValue('like_status',like)
        return {
            art,
            like_status: like
        }
    }
}

module.exports = {
    Art
}