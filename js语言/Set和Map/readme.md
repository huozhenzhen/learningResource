## Set
* Set是ES6提供的一种新的数据类型，它类似与数组，但成员实施唯一的，不会重复；
* Set.prototype.constructor:构造函数
* Set.prototype.size 返回实例的总个数
* 操作方法
    * add 添加一个值返回实例本身
    * delete 删除一个值，返回布尔值表示成功
    * has 返回布尔值，表示是否存在
    * clear 清除所有
* 遍历操作(均使用for...of...)
    * keys
    * values
    * entries
    * forEach
```
 const set = new Set([1,2,3,3,4]);
 [...set] //[1,2,3,4]
 ```
## Map
Map相对于Object，各种类型的值可以作为键（包括Object）
* 它的构造函数如下
``` 
  let map = new Map([
        ['name', 'ckn'],
        ['title', 'book'],
    ])
    map.get('name') //ckn
```
Map构造函数接受数组作为传参，实际上执行下面算法
```
   const arr = [
       ['name', 'ckn'],
        ['title', 'book']
   ]
   const map= new Map()
   arr.forEach((key, value) =>{
       map.set(key, value); 
   })
```
* 实例属性及方法和遍历方法和Set一样，这里不做解释；

## WeakSet和WeakMap
### WeakSet与Set类似，但是有以下区别：
* 成员只能是对象
* WeakSet中的对象是弱引用，即垃圾回收不考虑它当中的引用，成员项会随时消失，故其成员项不确定，无法遍历；
* 有以下三种方法
  * has
  * add 
  * delete
* WeakSet使用时，不用考虑内存泄漏；例如我们可以存储一些DOM节点，而不用担心节点从文档照片那个移除出现内存泄漏；
### WeakMap与Map类似，但是有以下区别：
* WeakMap只接受对象作为键名（不包括null）
* WeakMap键名所指的对象不计入垃圾回收机制（value值不用的时候,key值删除，value自动释放)，故用于他的键所对应的对象可能会在将来消失的场景。

