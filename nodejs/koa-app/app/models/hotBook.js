const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {
    db
} = require('@root/core/db')
const {
    Favor
} = require('@models/favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: ['index']
        })
        const ids = books.map(item => item.id);

        const favors = await Favor.findAll({
            where: {
                artId: {
                    [Op.in]: ids
                },
                type: 400
            },
            group: ['artId'],
            attributes: ['artId', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        console.log(favors)
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })
        return books
    }
    static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.artId) {
                count = favor.get('count')
            }
        })
        book.setDataValue('favNums', count)
        return book
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,
}, {
    sequelize: db,
    tableName: 'hot_book'
})


module.exports = {
    HotBook
}