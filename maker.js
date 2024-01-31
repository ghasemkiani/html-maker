import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {iwx} from "@ghasemkiani/xdom";

const maker = cutil.extend({}, iwx, {
	host: null,
	_x: null,
	get x() {
		if (cutil.na(this._x) && cutil.a(this.host)) {
			this._x = this.host.x;
		}
		return this._x;
	},
	set x(x) {
		this._x = x;
	},
});

class Maker extends cutil.mixin(Obj, maker) {
	static create({x}) {
		return new this({x});
	}
}

export {Maker, maker};
