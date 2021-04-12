JGVue.prototype.mount = function () {
    this.render = this.createRenderFn()
    this.mountComponent();
}

JGVue.prototype.mountComponent = function () {
    let mount = () => {
        this.update(this.render())
    }
    new Watcher( this, mount )
}


JGVue.prototype.createRenderFn = function () {
    let ast = getVNode(this._el)
    return function render() {
        let data = combine(ast, this._data)
        return data
    }

}
//渲染 vue使用的是diff算法 
JGVue.prototype.update = function (vnode) {
    let realDom = parseNode(vnode)
    this._parent.replaceChild(realDom, document.querySelector('#app'))
}