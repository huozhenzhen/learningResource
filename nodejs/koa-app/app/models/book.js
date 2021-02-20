const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {
    db
} = require('@root/core/db')
const util = require('util')
const axios = require('axios')
const {
    Favor
} = require('./favor')

class Book extends Model {
    // constructor(id) {
    //     super()
    //     this.id = id;
    // }
    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async searchFromYuShu(q, start, count, sunmmary = 1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, sunmmary)
        const result = await axios.get(url)
        return result.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    favNums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
}, {
    sequelize: db,
    tableName: 'book'
})


module.exports = {
    Book
}