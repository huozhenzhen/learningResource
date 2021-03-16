CommonJS  流行于nodeJS，目标环境在服务端，不存在网络的延迟，全量同步加载代码； 运行时加载，不可以tree Shaking

AMD 按需加载代码，目标环境浏览器的模块化

UMD 兼容CommonJS和AMD写法，在两种规范下都可以运行。

es6 moudule 经过上面得各种时代，官方规范出现，支持度比较好；编译时加载，可以tree Shaking。
