const {
    Sequelize,
    Model,
    where
} = require('sequelize')
const {
    db
} = require('@root/core/db')


class Comment extends Model {
    static async addComment(bookId, content) {
        const comment = await Comment.findOne({
            where: {
                bookId,
                content
            }
        })

        if (!comment) {
            return await Comment.create({
                bookId,
                content,
                nums: 1
            })
        } else {
            return await comment.increment('nums', {
                by: 1
            })

        }
    }

    static async getComment(bookId) {
        const comments = await Comment.findAll({
            where:{
                bookId
            }
        })
        return comments
    }
}

Comment.prototype.exclude = ['updatedAt']

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    bookId: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'comment'
})


module.exports = {
    Comment
}