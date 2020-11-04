const silce = Array.prototype.slice;
const http = require('http')

class express {
    constructor() {
        this.routes = {
            get: [],
            post: [],
            all: []
        }
    }

    register(path) {
        const info = {};

        if (typeof path === "string") {
            info.path = path
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    get() {
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info)

    }

    post() {
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info)
    }

    use() {
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info)
    }

    match(method, url) {
        let stack = [];

        if (url === '/favicon.ico') {
            return stack;
        }

        const curRoutes = [];
        curRoutes.concat(this.routes.all)
        curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeInfo => {
            if (url.includes(routeInfo)) {
                stack = stack.push(routeInfo.stack)
            }
        })

        return stack;
    }

    handle(res, req, stack) {
        const next = () => {
            const middleware = stack.shift();
            if (middleware) {
                middleware(res, req, next)
            }
        }

        next()
    }

    callback() {
        return (req, res) => {
            const url = req.url;
            const method = req.method;

            const stack = this.match(method, url)

            this.handle(res, req, stack)
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
            }
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback);
        server.listen(...args)
    }
}

module.exports = () => {
    new express()
}