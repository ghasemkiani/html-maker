import {cutil} from "@ghasemkiani/base";
import {X, iwx} from "@ghasemkiani/xdom";

const maker = cutil.extend({}, iwx, {
	host: null,
	_x: null,
	get x() {
		if (cutil.na(this._x)) {
			let {window, document} = this.host;
			this._x = new X({window, document});
		}
		return this._x;
	},
	set x(x) {
		this._x = x;
	},
});

export {maker};
