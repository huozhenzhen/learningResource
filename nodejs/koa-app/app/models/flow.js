const {
    Sequelize,
    Model
} = require('sequelize')
const {
    db
} = require('@root/core/db')


class Flow extends Model {

}

Flow.init({
    index: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    //100 Movie 
    //200 Music 
    //300 Sentence
    //400 book
},{
    sequelize:db, 
    tableName: 'flow'
})


module.exports = {
    Flow
}