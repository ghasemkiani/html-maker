import {cutil} from "@ghasemkiani/base";

const maker = cutil.extend({}, {
	host: null,
	_x: null,
	get x() {
		if (cutil.na(this._x)) {
			this._x = this.host.x;
		}
		return this._x;
	},
	set x(x) {
		this._x = x;
	},
});

export {maker};
