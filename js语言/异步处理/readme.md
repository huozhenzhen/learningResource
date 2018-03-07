# fetch

相关文章[github](https://github.com/github/fetch)、[相关介绍](https://www.w3ctech.com/topic/854) fetch相对于XMLHttpRequest(XHR)优点:改善离线体验，保持可扩展性

## Promise

回调模式:多层回调会使我们陷入回调地狱

Promise追踪多个回调函数并做清理操作， Promise 能大幅度改善这种情况

```
method1(function(err, result) {
    if (err) {
    throw err;
    }
        method2(function(err, result) {
            if (err) {
            throw err;
            }
                method3(function(err, result) {
                    if (err) {
                    throw err;
                    }
                        method4(function(err, result) {
                        if (err) {
                        throw err;
                        }
                        method5(result);
            });
        });
    });
});
```

使用改进则是

```
    new Primise(()=>{
        if(err) {
            reject(err)
            return
        }
        resolve(result)
    }).then(
        ()=>{
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
        ...
        catch(err=>{
            console.log(err)
        })
```

### Promise 的生命周期

"pending"(挂起) 、 "fulfilled"(已完成) "rejected"(已拒绝),且只能从pengding变为fulfilled或rejected.切不能逆向

```
var promise = new Promise(function(resolve, reject) {
console.log("Promise");
resolve();
}).then(()=>{console.log("resolved")});
console.log("Hi!");
//Promise=>Hi!=>resolved
```

完成处理函数与拒绝处理函数总是会在执行器的操作结束后被添加到作业队列的尾部。

### Promise then和catch使用

**then**

then() 方法在所有的 Promise 上都存在，并且接受两个参数。第一个参数是 Promise 被完 成时要调用的函数，与异步操作关联的任何附加数据都会被传入这个完成函数。第二个参数 则是 Promise 被拒绝时要调用的函数，与完成函数相似，拒绝函数会被传入与拒绝相关联的 任何附加数据。

**串联Promise**

每次对 then() 或 catch() 的调用实际上创建并返回了另一个 Promise ，仅当前一个 Promise 被完成或拒绝时，后一个 Promise 才会被决

then(resolveFn(),rejectFn()) 串联then的状态和值变化：

- "pending"(挂起) 挂起不动
- "fulfilled"(已完成) 当then中resolveFn(),rejectFn()不为函数时状态和值传给下一级
- "rejected"(已拒绝) 当then中resolveFn(),rejectFn()不为函数时状态和值传给下一级

  ```
  new Promise(function(resolve, reject){
   resolve(5)
  }).then(null,function(value){
   taskA()
  }).then(function(value){
   console.log("taskB-------------------"+value)
  }).catch(function(reason){
   console.log(reason)
  })
  // taskB-------------------5
  ```

**错误处理**

为了确保能正确处理任意可能发生的错误，应当始终在 Promise 链尾部添加拒绝处理函数。

**catch** Promise catch() 方法，其行为等同于只传递拒绝处理函数给 then()

```
promise.catch(function(err) {
// 拒绝
    console.error(err.message);
});
// 等同于：
promise.then(null, function(err) {
// 拒绝
    console.error(err.message);
});
```

## Promise的静态方法

**Promise.resolve()**

```
    Promise.resolve(5) //以下相同

    new Promise(function(resolve){
        resolve(5)
    })
```

**Promise.reject()**

```
    Promise.reject(new Error('error')) //以下相同

    new Promise(function(resolve, reject){
        reject(new Error('error'))
    })
```

** Promise.all() **
它接收一个promise对象组成的数组作为参数，并返回一个新的promise对象  
若传递给 Promise.all() 的任意 Promise 被拒绝了，那么方法所返回的 Promise 就会立刻被
拒绝，而不必等待其他的 Promise 结束  
全部resolve()会依次放入一个数组里面

```
function timeout(time) {
return new Promise(function (resolve) {
    setTimeout(function () {
        resolve(time);
    }, time);
});b
}
console.time('promise')
Promise.all([
	timeout(10),
	timeout(60),
	timeout(100)
]).then(function (values) {
	console.log(values); [10, 60, 100]
	console.timeEnd('promise');   // 100.965087890625ms
});
```
** Promise.race()**
它接收一个promise对象组成的数组作为参数，并返回一个新的promise对象  
赛跑得出最快resolve的一个!
```
function timeout(time) {
return new Promise(function (resolve) {
    setTimeout(function () {
        resolve(time);
    }, time);
});b
}
console.time('promise')
Promise.race([
	timeout(10),
	timeout(60),
	timeout(100)
]).then(function (values) {
	console.log(values); //10
	console.timeEnd('promise');   // 11.280029296875ms
});
```


# Promise总结

promise then() 与 catch() 背后的意图是让你组合使用它们来正确处理异步操作的结果。此系统要 优于事件与回调函数，因为它让操作是成功还是失败变得完全清晰（事件模式倾向于在出错 时不被触发，而在回调函数模式中你必须始终记得检查错误参数）
