import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { iwx } from "@ghasemkiani/xdom";
import { iwdom } from "@ghasemkiani/dom";

const host = cutil.extend({}, iwdom, iwx, {
  //
});

const maker = cutil.extend({}, iwx, {
  _host: null,
  get host() {
    return this._host;
  },
  set host(host) {
    this._host = host;
    if (cutil.a(host)) {
      this.x = host.x;
    }
  },
});

const rel = {
  rel(uri) {
    let maker = this;
    return /^[#]/.test(uri)
      ? uri
      : "makeRelativeUri" in cutil.asObject(maker.host)
        ? maker.host.makeRelativeUri(uri)
        : uri;
  },
};

class Maker extends cutil.mixin(Obj, maker, rel) {
  static create(host) {
    return new this({ host });
  }
}

const iwmaker = {
  Maker,
  _maker: null,
  get maker() {
		if (cutil.na(this._maker)) {
			this._maker = this.Maker.create(this);
		}
		return this._maker;
	},
	set maker(maker) {
		this._maker = maker;
	},
};

export { host, maker, rel, Maker, iwmaker };
