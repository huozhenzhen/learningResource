const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const querystring = require("querystring")

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            return resolve({})
        }
        if (req.headers['content-type'] !== 'application/json') {
            return resolve({})
        }
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

    getPostData(req).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res);
        const userResult = handleUserRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))

            })
            return
        }
        if (userResult) {
            userResult.then(userData => {
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
