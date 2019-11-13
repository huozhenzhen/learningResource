var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);  // DOM2
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler); //IE
        } else {
            element["on" + type] = handler;// DOM0
        }
    },
    getEvent: function(event){   
        return event ? event : window.event;  //返回事件对象
    },
    getTarget: function(event){
        return event.target || event.srcElement;  //返回事件的目标
    },
    preventDefault: function(event){ //取消事件的默认行为
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    stopPropagation: function(event) {// 阻止事件流
        if(event.stopPropagation) {
            event.stopPropagation();
        } else{
            event.cancelBubble = true;
        }
    }
};

return EventUtil