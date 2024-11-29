import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { iwx } from "@ghasemkiani/xdom";

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

class Maker extends cutil.mixin(Obj, maker) {
  static create(host) {
    return new this({ host });
  }
  rel(uri) {
    let maker = this;
    return /^[#]/.test(uri)
      ? uri
      : "makeRelativeUri" in cutil.asObject(maker.host)
        ? maker.host.makeRelativeUri(uri)
        : uri;
  }
}

export { Maker, maker };
