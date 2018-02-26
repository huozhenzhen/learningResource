###let
* let 命令声明的变量  加上块级作用域  区别于ES5有顶层作用域和函数作用域
```
    {
        var b = "yes";
        let a = "no";
    }
    console.log(b); //yes
    console.log(a); //stu1.html:16 Uncaught ReferenceError: a is not defined
```


* eg2:不存在变量提升 变量提升即变量可以在声明变量前使用
```
    console.log(c);
    var c = "testC"; //值为underfined
    console.log(d);
    let d = "testD"; //d is not defined
```

* 暂时性死区 ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
```
    if(true) {
        console.log(tmp); //tmp is not defined

        let tmp;
        console.log(tmp);      // tmp = "abc"; 

        tmp = 123;
        console.log(tmp);
    }
```
###块级作用域
* 块级作用域与立即执行表达函数相似 
```
    (function() {
        doSomething
    }())

    {
        let tmp = "";
        doSomething
    }
```

####块级作用域与函数声明

* ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明
```
    function f() { console.log('I am outside!'); }

    (function () {
      if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
      }

      f(); //letAndconst.html:29 Uncaught TypeError: f is not a function
    }());
```
    ES6遵循以下规则：
    - 允许在块级作用域中声明函数。 
    - 函数声明类似于var，将会提升到函数头部或者全局作用域。
    - 函数声明会提升到块级作用域的头部。

此处f函数保存是因为: f = undefined, 块级作用域的缘故。

### const命令

const命令声明一个只读的常量，一旦声明，便不可改变。除此之外和let相似的是： 在所声明的块级作用域中有效 不提升 声明后才可使用 不饿重复声明

const与引用数据类型： 可以增删属性。 const的本质是指针的内存地址不改变， 常量的内存地址就是本身的值， 而引用类型可增删，所以不可控。

### 顶层对象的属性

顶层对象的问题：
    - 没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
    - 程序员很容易不知不觉地就创建了全局变量（比如打字出错）
    - 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
    - window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的
es6为了改变这一点做了调整：
    var命令和function依然是顶层对象的属性。
    let、const与class不属于顶层对象的属性，也就是es6开始说顶层对象与全局对象的属性脱钩。

###global(？？)

