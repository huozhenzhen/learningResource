require('module-alias/register')
const Koa = require('koa');
const InitManager = require('@root/core/init')
const bodyparser = require('koa-bodyparser')
const catchError = require('@middlewares/exception')
const app = new Koa();
// require('./app/models/user')
app.use(catchError)
app.use(bodyparser())
InitManager.init(app)

app.listen(4000)
