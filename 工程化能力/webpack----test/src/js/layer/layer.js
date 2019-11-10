import tpl  from './layer.ejs';
import './main.scss';

function layer() {
	return {
		name:"layer",
		tpl: tpl
	};
}

export default layer;