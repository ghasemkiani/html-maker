//	@ghasemkiani/htmlmaker/component

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {renderable} = require("@ghasemkiani/htmlmaker/renderable");

class Component extends cutil.mixin(Base, renderable) {
	//
}
cutil.extend(Component.prototype, {
	//
});

module.exports = {Component};
