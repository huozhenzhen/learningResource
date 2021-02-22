const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server;
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});
const server = app.listen(3000);

const wss = new WebSocket.Server({
    server
});

// 服务器被客户端连接
wss.on('connection', (ws) => {
    // 通过 ws 对象，就可以获取到客户端发送过来的信息和主动推送信息给客户端
    var i = 0
    var int = setInterval(function f() {
        ws.send(i++) // 每隔 1 秒给连接方报一次数
    }, 3000)
    console.log('connection')
    ws.on('message', (val) => {
        console.log(val)
        if(val === 'HeartBeat') {
            ws.send('HeartBeat')
        }
    })
})