import {cutil} from "@ghasemkiani/base";
import {DOM} from "@ghasemkiani/dom";
import {X, iwx} from "@ghasemkiani/xdom";

const host = cutil.extend({}, iwx, {
	_window: null,
	_document: null,
	get window() {
		if (cutil.na(this._window)) {
			this._window = this.getWindow();
		}
		return this._window;
	},
	set window(window) {
		this._window = window;
	},
	get document() {
		if (cutil.na(this._document)) {
			this._document = this.window.document;
		}
		return this._document;
	},
	set document(document) {
		this._document = document;
	},
	getWindow() {
		return DOM.get();
	},
});

export {host};
