const Koa = require('koa');
const InitManager = require('./core/init')
const bodyparser = require('koa-bodyparser')
const app = new Koa();

app.use(bodyparser())
InitManager.init(app)

app.listen(4000)
