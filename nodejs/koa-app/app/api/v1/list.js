const router = require('koa-router')()

router.post('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name; // 获取请求参数
    console.log( ctx.params.name)
    console.log( ctx.query.name)
    console.log( ctx.header.token)
    console.log( ctx.request.body)
    ctx.response.body = `<h5>Hello, ${name}!</h5>`;
  });

module.exports = router