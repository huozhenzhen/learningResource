const Router = require('koa-router')
const {
    Auth
} = require('@middlewares/auth')
const router = new Router({
    prefix: '/v1/classic'
})
const {
    Flow
} = require('@models/flow')
const {
    Art
} = require('@models/art')
const {
    Favor
} = require('@models/favor')

router.get('/lastest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getTypeData(flow.artId, flow.type)
    const isLike = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('likeStatus', isLike)
    ctx.body = new global.infos.Success(art)
});

module.exports = router