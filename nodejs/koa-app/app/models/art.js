const {
    Movie,
    Sentence,
    Music,
    Book
} = require('./classic')

class Art {
    static async getTypeData(artId, type) {
        const findTargetObj = {
            where: {
                id: artId
            }
        }
        let art = {}
        switch (type) {
            case 100:
                art =  await Movie.findOne(findTargetObj)
                break;
            case 200:
                art = await Music.findOne(findTargetObj)
                break;
            case 300:
                art = await Sentence.findOne(findTargetObj)
                break;
            case 400:
                art = await Book.findOne(findTargetObj)
                break;
            default:
                break;
        }
        return art

    }
}

module.exports = {
    Art
}