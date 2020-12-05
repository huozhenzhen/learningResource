const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static init(app) {
          InitManager.initLoadRouters(app)
    }
    static initLoadRouters(app) {
        const path = `${process.cwd()}/app/api`
        requireDirectory(module, path, {
            visit: function (moduleObj) {
                if (moduleObj instanceof Router) {
                    app.use(moduleObj.routes())
                }
            }
        })
    }
}

module.exports = InitManager