//	@ghasemkiani/htmlmaker/file

const {Obj: Base} = require("@ghasemkiani/base/obj");
const {cutil} = require("@ghasemkiani/base/cutil");
const {serializable} = require("@ghasemkiani/base/serializable");

class File extends cutil.mixin(Base, serializable) {
	//
}
cutil.extend(File.prototype, {
	uri: "/",
});

module.exports = {File};
