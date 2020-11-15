const http = require('http')

function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            try{
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i+1))
                )
            }catch(err){
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class koa2 {
    constructor() {
        this.middlewareList = []
    }
    use(fn) {
        this.middlewareList.push(fn)
        return this
    }
    callback() {
        return (req, res) => {
            const ctx = {res, res}
            ctx.query = req.query
            compose(this.middlewareList)(ctx)

        }
    }
    listen(...args) {
        const server = http.createServer(this.callback);
        server.listen(...args)
    }
}