const Router = require('koa-router')

const { RegisterValidator } = require('@validators/validator')
const { User } = require('@models/user')

const router = new Router({
    prefix: '/v1/user'
})
router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)

    const user = {
        email: v.get('body.email'),
        password: v.get('body.password'),
        nickname: v.get('body.nickName'),
    }
    const sqlRes = await User.create(user)
    throw new global.infos.Success()
})


module.exports = router