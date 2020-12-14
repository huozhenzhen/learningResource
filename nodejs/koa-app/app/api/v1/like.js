const Router = require('koa-router')
const {
    Auth
} = require('@middlewares/auth')
const router = new Router({
    prefix: '/v1/like'
})
const {
    LikeValidator
} = require('@validators/validator')
const {
    Favor
} = require('@models/favor')


router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'artId'
    })
    const favor = await Favor.like(v.get('body.artId'), v.get('body.type'), ctx.auth.uid)
    ctx.body = new global.infos.Success()
});

router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'artId'
    })
    const favor = await Favor.dislike(v.get('body.artId'), v.get('body.type'), ctx.auth.uid)
    ctx.body = new global.infos.Success()
});

module.exports = router