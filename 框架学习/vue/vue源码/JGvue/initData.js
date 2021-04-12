function defineReactive(target, key, value, enumerable) {
    if (myType(value) === 'Object' || myType(value) === 'Array') {
        observe(value)
    }
    let dep = new Dep()

    dep.__propName__ = key
    Object.defineProperty(target, key, {
        configurable: false,
        enumerable: !!enumerable,
        get() {
            console.log("get----------" + key)
            dep.depend()
            return value
        },
        set(newVal) {
            console.log("set---------" + key + ":" + newVal)
            value = newVal
            if (myType(value) === 'Object' || myType(value) === 'Array') {
                observe(value)
            }
            dep.notify()
        }
    })
}

function myType(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
}

const ARRAY_METHODS = ['push', 'pop', 'unshift', 'shift', 'slice', 'splice', 'reverse', 'sort']
const arrayMethods = Object.create(Array.prototype)

ARRAY_METHODS.forEach(method => {
    arrayMethods[method] = function () {
        console.log('数组变化了')
        let arr = Array.from(arguments)
        arr.forEach(item => {
            observe(item)
        })
        const result = Array.prototype[method].apply(this, arguments)
        app.mountComponent()

        return result
    }
})


function observe(data) {
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods;
        data.forEach(item => {
            observe(item)
        })
    } else {
        let keys = Object.keys(data);
        keys.forEach(key => {
            defineReactive(data, key, data[key], true)
        })

    }
}

function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        get() {
            return target[prop][key]
        },
        set(val) {
            target[prop][key] = val
        }
    })
}


JGVue.prototype.initData = function (vnode) {
    observe(this._data)
    let keys = Object.keys(this._data)
    keys.forEach(key => {
        proxy(this, '_data', key)
    })

}