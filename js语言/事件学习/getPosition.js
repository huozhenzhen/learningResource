(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.getSites = factory();
	}
}(function() {
	/*		function getSites () {
			}*/
	var that = {}

	/*
		鼠标点击位置获取
	 */
	that.mousePosition = function(ev) {

		if(ev.pageX || ev.pageY) {
			return {
				left : ev.pageX,
				top : ev.pageY 
			}
		}

		var scrollPos = that.scrollPos();


		return {
			left : ev.clientX + scrollPos.left - document.body.clientLeft, 
			top : ev.clientY + scrollPos.top- document.body.clientTop 
		};
	}
		/*
		获取滚动条的位置

		也可以传入一个iframe的document对象
		retun { top: 0, left: 0 }
		*/

	that.scrollPos = function(oDocument) {
		oDocument = oDocument || document;
		var dd = oDocument.documentElement;
		var db = oDocument.body;
		return {
			top: Math.max(window.pageYOffset || 0, dd.scrollTop, db.scrollTop),
			left: Math.max(window.pageXOffset || 0, dd.scrollLeft, db.scrollLeft)
		};
	};
	/**
	 * 获取滚动条宽高
		retun {h: 17, v: 17}

		区别一下 offsetHeight （offsetWidth）和 offsetWidth（clientWidth）
	 * 
	*/
	that.getScrollbarSize = function() {
		var div = document.createElement("DIV");
		var _s = div.style;
		_s.overflow = "scroll";
		_s.width = "100px";
		_s.height = "100px";
		_s.left = "-200px";
		_s.top = "-200px";
		_s.position = "absolute";

		document.body.appendChild(div);

		var size = {
			h: div.offsetHeight - div.offsetWidth,
			v: div.offsetWidth - div.clientWidth
		}
		document.body.removeChild(div);

		return size;
	};
	/**
	 * 获取窗口可视范围的大小
	 * 例子：
	 *
	 * size的值为： {width: 1024, height: 768 }
	 */
	that.winSize = function(_target) {
		var w, h;
		var target;
		if (_target) {
			target = _target.document;
		} else {
			target = document;
		}
		// compatMode  CSS1Compat 准兼容模式开启 BackCompat 关闭
		if (target.compatMode === "CSS1Compat") {
			w = target.documentElement["clientWidth"];
			h = target.documentElement["clientHeight"];
		} else if (self.innerHeight) {
			if (_target) {
				target = _target.self;
			} else {
				target = self;
			}

			w = target.innerWidth;
			h = target.innerHeight;
		} else if (target.documentElement && target.documentElement.clientHeight) {
			w = target.documentElement.clientWidth;
			h = target.documentElement.clientHeight;
		} else if (target.body) {
			w = target.body.clientWidth;
			h = target.body.clientHeight;
		}

		return {
			width: w,
			height: h
		};
	};

	/**
	 * 获取节点相对于指定的节点的位置
	 * 如果没有指定节点，则返回相对于document的位置
	 * 例子：
	 * var pos = getPosition(node, pNode);
	 * console.log("left:" + pos.left, "top:" + pos.top);
	 */
	that.getPosition = function(oElement, parent) {
		if(!contains(oElement.ownerDocument.body, oElement)) {
			return {top: NaN, left: NaN};
		}

		if(parent === undefined) {
			return generalPosition(oElement);
		}else {
			oElement = generalPosition(oElement);
			parent = generalPosition(parent);

			return {
				'left': oElement.left - parent.left,
				'top' : oElement.top - parent.top
			}			
		}
	};
	
	

	function generalPosition (el) {
		var box = el.getBoundingClientRect();
		var scrollPos = that.scrollPos();
		var body =el.ownerDocument.body;
		var docElem = el.ownerDocument.documentElement;
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;

		return {
			left : box.left + scrollPos.left - clientLeft,
			top : box.top + scrollPos['top'] - clientTop
		}

	}


	function contains (parent, node) {
	    if (parent === node) {
	        return false;
	    } else if (parent.compareDocumentPosition) {
	        return ((parent.compareDocumentPosition(node) & 16) === 16);
	    } else if (parent.contains && node.nodeType === 1) {
	        return parent.contains(node);
	    } else {
	        while (node = node.parentNode) {
	            if (parent === node) {
	                return true;
	            }
	        }
	    }

	    return false;
	};

	return that;
}));