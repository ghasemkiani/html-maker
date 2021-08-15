//	@ghasemkiani/htmlmaker/file

import {Obj} from "@ghasemkiani/base";
import {cutil} from "@ghasemkiani/base";
import {serializable} from "@ghasemkiani/base";

class File extends cutil.mixin(Obj, serializable) {
	//
}
cutil.extend(File.prototype, {
	uri: "/",
});

export {File};
