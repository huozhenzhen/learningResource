const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const querystring = require("querystring")
const { getValue, setValue } = require('./src/db/redis')
// const SESSON_DATA = {};
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString();
}


const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            return resolve({})
        }
        // if (req.headers['content-type'] !== 'application/json') {
        //     return resolve({})
        // }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on("end", () => {
            if (!postData) {
                return resolve({})
            }
            resolve(JSON.parse(postData))
        })
    })
}
const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split("?")[0];
    req.query = querystring.parse(url.split("?")[1]);

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(";").forEach(item => {
        const arr = item.split("=");
        if (arr[0]) {
            req.cookie[arr[0].trim()] = arr[1]
        }

    });

    // let userId = req.cookie.userId;
    // let needSetCookie = false;
    // if (userId) {
    //     if (!SESSON_DATA[userId]) {
    //         SESSON_DATA[userId] = {}
    //     }

    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSON_DATA[userId] = {}
    // }
    // req.session = SESSON_DATA[userId]

    let userId = req.cookie.userId;
    let needSetCookie = false;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        setValue(userId, {})
    }
    req.sessionId = userId;
    getValue(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            setValue(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res);
        const userResult = handleUserRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))

            })
            return
        }

        res.writeHead(404, { "Content-type": 'text/plain' })
        res.write('404 Not Found')
        res.end()
    })


}

module.exports = serverHandler

