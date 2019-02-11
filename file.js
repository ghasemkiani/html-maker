//	@ghasemkiani/htmlmaker/file

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {serializable} = require("@ghasemkiani/commonbase/serializable");

class File extends cutil.mixin(Base, serializable) {
	//
}
cutil.extend(File.prototype, {
	uri: "/",
});

module.exports = {File};
