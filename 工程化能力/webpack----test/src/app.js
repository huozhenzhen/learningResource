import Layer from './js/layer/layer';
import './css/common.css';

const App = function() {
	var Dom = document.getElementById('app');
	var layer = new Layer();
	console.log(layer.tpl());
	Dom.innerHTML = layer.tpl();
};

new App();