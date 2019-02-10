//	@ghasemkiani/htmlmaker/base

const base = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

class Base extends base.Base {
	render({wnode}) {
		//
		return {wnode};
	}
}
cutil.extend(Base.prototype, {
	//
});

module.exports = {Base};
