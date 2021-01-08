const env = process.env.NODE_ENV
let CONFIG

if (env === 'dev') {
    CONFIG = {
        wx: {
            appId: 'wx0aa87d3a1f686831',
            appSecret:'be88fc342bb136d8e532d27709ceb4c1',
            loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
        },
        MYSQL_CONF: {
            dbName: 'yue',
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '291378'
        },
        security: {
            secretKey: 'abcdefg',
            expiresIn: 60*60
        },
        yushu:{
            detailUrl:'http://t.talelin.com/v2/book/id/%s',
            keywordUrl:'http://t.talelin.com/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
        },
        host: 'http://localhost:4000/'
    }

}

module.exports = CONFIG