const router = require('koa-router')()
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck")

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const data = await login(username, password)
  if (data.username) {
    data.roles = eval(data.roles)
    ctx.session = Object.assign(ctx.session, data)
    ctx.body = new SuccessModel({ userId: ctx.sessionID }, "登录成功");
    return
  } else {
    ctx.body = new ErrorModel("登录失败");
  }
});

router.get('/info', loginCheck, async (ctx, next) => {
  ctx.body = new SuccessModel(ctx.session, "获取用户信息成功");
});

module.exports = router
