const router = require('koa-router')()
const {PositiveInterValidator} = require('../../validators/validator')

router.post('/v1/hello/:id', async (ctx, next) => {
  var id = ctx.params.id; // 获取请求参数
  // console.log(ctx.params.name)
  // console.log(ctx.query.name)
  // console.log(ctx.header.token)
  // console.log(ctx.request.body)
  const v = new PositiveInterValidator().validate(ctx)
  ctx.response.body = `<h5>Hello, ${id}!</h5>`;
  // throw new global.errors.NotFoundError()
});

module.exports = router