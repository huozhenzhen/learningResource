# server端需要考虑

- server端考虑的问题：日志，安全，内存和cpu，服务稳定性，集群

## 数据库
- mysql 硬盘数据库 稳定

- redis 内存数据库 断电丢失 速度库 内存比较昂贵
## nodejs的能力
- 脱离浏览器运行
- 文件读取，前端工程化的基础
- 服务端的api
- 中间件

## cookie
- 服务端，客户端可以修改cookie（客户端有限制）；
- 发送http 把请求域的cookie发送给服务端

## nodejs是什么

 - nodejs是基于Chrome V8 引擎的javascript运行环境

## nodejs和js区别
- javascript = ECMAScript + webApi（DOM, BOM, ajax...）
- nodejs = ECMAScript + nodejsAPI(http, ftp, stream...)

- js运行在浏览器
- nodejs运行在服务端，如开发web Server;或者本机webpack等
## nodejs如何让调试
inspect调试 vscode调试

## common.js 和 es6 module的区别
- 语法不同

- common.js 动态引入 执行时引入   es6 module 静态引入 编译时引入

- es module支持tree-shake。 因为其支持tree-shaking

## __filename __dirname

## event loop 在nodejs和浏览器中
- 浏览器中：
    - 宏任务：setTimeout，setInterval和ajax
    - 微任务： promise async/await
    - 特点：先微任务，再宏任务
- nodejs
    - 宏任务：setTimeout,setInterval  `setImmediate` I/O 网络 socket链接
    - 微任务：promise async/await process.nextTick 
    - 特点：先微任务，再宏任务（宏任务比较多，所以分了六个阶段）
## path.join()和path.resolve()
- path.join()相对路径 
- path.resolve()绝对路径

## session如何实现
1. 登录验证通过生成sessionId，把他设置为浏览器的cookie;
2. 查到相应的用户信息，以sessionId为key存在redis中
3. 请求携带cookie；找到用户信息并返回

## Koa2和express的中间件机制
- 中间件本质是一个函数，用于模块拆分，模块流转；有效的组织代码。

## 如何读取1G文件？

使用Stream

## nodejs为何要开启多线程（pm2）

- V8限制了nodejs每个进程的最大内存：64系统1.4G，32位系统0.7G; 可以有效利用内存
- 高效使用多核CPU



 

 


