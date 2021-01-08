const {
    Sequelize,
    Model
} = require('sequelize')
const {
    db
} = require('@root/core/db')

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    favNums:{
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}


class Movie extends Model {}
Movie.init(classicFields, {
    sequelize:db, 
    tableName: 'movie'
})

class Sentence extends Model {}
Sentence.init(classicFields, {
    sequelize:db, 
    tableName: 'sentence'
})

class Music extends Model {}
Music.init({
    ...classicFields,
    url: Sequelize.STRING
}, {
    sequelize:db, 
    tableName: 'music'
})

class Book extends Model {}
Book.init({
    ...classicFields,
    url: Sequelize.STRING
}, {
    sequelize:db, 
    tableName: 'book'
})

module.exports = {
    Movie,
    Sentence,
    Music,
    Book
}