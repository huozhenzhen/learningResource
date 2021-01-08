const {
    Movie,
    Sentence,
    Music,
    Book
} = require('./classic')
const {
    Op
} = require('sequelize')

class Art {
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
            if(ids.length === 0) continue;
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
            case '400':
                arts = await Book.findOne(findTargetObj)
                break;
            default:
                break;
        }

        console.log('arts', arts)
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
                art = await Book.findOne(findTargetObj)
                break;
            default:
                break;
        }

        if(art && art.image) {
            let imgUrl = art.dataValues.image
            art.dataValues.image = global.config.host + imgUrl
        }
        return art

    }
}

module.exports = {
    Art
}