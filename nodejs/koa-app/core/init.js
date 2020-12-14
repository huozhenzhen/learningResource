const requireDirectory = require('require-directory')
const Router = require('koa-router')
const infos = require('./httpException')

class InitManager {
    static init(app) {
        InitManager.InitLoadError()
        InitManager.InitLoadRouters(app) 
        InitManager.loadConfig() 
    } 
    static InitLoadRouters(app) {
        const path = `${process.cwd()}/app/api`
        requireDirectory(module, path, {
            visit: function (moduleObj) {
                if (moduleObj instanceof Router) {
                    app.use(moduleObj.routes())
                }
            }
        })
    }
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '\\config\\config.js'
        const CONFIG = require(configPath)
        global.config = CONFIG
    }
    static InitLoadError() {
        global.infos = infos
    }
}

module.exports = InitManager