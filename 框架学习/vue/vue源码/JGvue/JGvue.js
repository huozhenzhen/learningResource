function JGVue(options) {
    this._data = options.data
    this._el = document.querySelector(options.el)
    this._parent = this._el.parentNode;
    this.initData()
    this.mount()
}