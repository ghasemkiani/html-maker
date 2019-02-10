//	@ghasemkiani/htmlmaker/page

const {Base} = require("@ghasemkiani/htmlmaker/base");
const {serializable} = require("@ghasemkiani/commonbase/serializable");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WDocument} = require("@ghasemkiani/wdom/document");

class Page extends cutil.mixin(Base, serializable) {
	get window() {
		if(!this._window) {
			this._window = cutil.global().window;
		}
		return this._window;
	}
	set window(window) {
		this._window = window;
	}
	get wdocument() {
		if(!this._wdocument) {
			let window = this.window;
			this._wdocument = new WDocument({window});
			this._wdocument.preamble = "<!DOCTYPE html>";
		}
		return this._wdocument;
	}
	set wdocument(wdocument) {
		this._wdocument = wdocument;
	}
	
	render({wnode}) {
		let wnodeHtml;
		let wnodeHead;
		let wnodeBody;
		wnodeHtml = wnode;
		wnode.ch("head", wnode => {
			wnodeHead = wnode;
			this.renderHead({wnode});
		});
		wnode.ch("body", wnode => {
			wnodeBody = wnode;
			this.renderBody({wnode});
		});
		return {wnode, wnodeHtml, wnodeHead, wnodeBody};
	}
	renderHead({wnode}) {
		let res = {wnode};
		let wnodeTitle;
		wnode.ch("meta[charset=utf-8]");
		wnode.ch("title", wnode => {
			wnodeTitle = wnode;
			this.renderTitle({wnode});
		});
		return {...res, wnodeTitle};
	}
	renderTitle({wnode}) {
		let res = {wnode};
		if(!cutil.isNil(this.title)) {
			wnode.t(this.title);
		}
		return {...res};
	}
	renderBody({wnode}) {
		let res = {wnode};
		return {...res};
	}
	
	doRender() {
		this.wdocument.root.cl();
		this.render({wnode: this.wdocument.root});
		return this;
	}
	
	toString() {
		this.doRender();
		return this.wdocument.string;
	}
	
	makeRelativeUri(uri) {
		return cutil.makeRelativeUri(uri, this.uri);
	}
}
cutil.extend(Page.prototype, {
	mime: "text/html",
	_window: null,
	_wdocument: null,
	
	uri: "/",
	title: null,
});

module.exports = {Page};
