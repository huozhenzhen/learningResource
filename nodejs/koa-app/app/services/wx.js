const util = require('util')
const axios = require('axios')
const {
    User
} = require('@models/user')
const {
    generateToken
} = require("@root/core/util")
const {
    Auth
} = require('@middlewares/auth')
class WXManager {
    static async codeToToken(code) {
        const {
            loginUrl,
            appId,
            appSecret
        } = global.config.wx;
        const url = util.format(loginUrl, appId, appSecret, code)
        const result = await axios.get(url);
        
        if (result.status !== 200) {
            throw new global.infos.AuthFailed('openid fail')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.infos.AuthFailed(errmsg)
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerUser(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}