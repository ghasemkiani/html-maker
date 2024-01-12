import {cutil} from "@ghasemkiani/base";
import {DOM} from "@ghasemkiani/dom";

const host = {
	_window: null,
	_document: null,
	getWindow() {
		return DOM.get();
	},
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
};

export {host};
