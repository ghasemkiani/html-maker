//	@ghasemkiani/htmlmaker/component

const {Obj: Base} = require("@ghasemkiani/base/obj");
const {cutil} = require("@ghasemkiani/base/cutil");
const {renderable} = require("@ghasemkiani/htmlmaker/renderable");

class Component extends cutil.mixin(Base, renderable) {
	//
}
cutil.extend(Component.prototype, {
	//
});

module.exports = {Component};
