// 由Htmldom  =>  vnode    待坑的vnode
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vNode = null;
    if (nodeType === 1) {
        let nodeName = node.nodeName;
        let attrs = Array.from(node.attributes)
        let attrsObj = {};
        attrs.forEach(item => {
            attrsObj[item.nodeName] = item.nodeValue
        })
        _vNode = new VNode(nodeName, attrsObj, undefined, 1)

        let childNodes = Array.from(node.childNodes);
        childNodes.forEach(item => {
            _vNode.appendChild(getVNode(item))
        })
    } else if (nodeType === 3) {
        let nodeValue = node.nodeValue
        _vNode = new VNode(undefined, undefined, nodeValue, 3)

    }

    return _vNode
}
// 模拟AST => VNode

function getValueByPath(obj, path) {
    let paths = path.split('.')
    let res = obj
    while (paths.length > 0) {
        let targetPath = paths.shift();
        res = res[targetPath]
    }
    return res
}

function parseNode(vNode) {
    if (vNode.type === 1) {
        let attrsObj = vNode.data
        let node = document.createElement(vNode.tag)
        Object.keys(attrsObj).forEach(key => {
            let attrName = key;
            let attrValue = attrsObj[key]
            node.setAttribute(attrName, attrValue)
        })
        vNode.children.forEach(subVNode => {
            node.appendChild(parseNode(subVNode))
        })
        return node
    } else if (vNode.type === 3) {
        return document.createTextNode(vNode.value)
    }
}


let regTest = /\{\{(.+?)\}\}/g;

function combine(vnode, data) {
    let _type = vnode.type
    let _data = vnode.data
    let _value = vnode.value
    let _tag = vnode.tag
    let _children = vnode.children
    let _vnode = null
    if (_type === 3) {
        _value = _value.replace(regTest, function (_, g) {
            let key = g.trim()
            let value = getValueByPath(data, key)
            return value
        })
        _vnode = new VNode(_tag, _data, _value, _type)
    } else if (_type === 1) {
        _vnode = new VNode(_tag, _data, _value, _type)
        _children.forEach(subItem => {
            _vnode.appendChild(combine(subItem, data))
        });
    }
    return _vnode
}