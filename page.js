//	@ghasemkiani/htmlmaker/page

const fs = require("fs");

const {File} = require("@ghasemkiani/htmlmaker/file");
const {renderable} = require("@ghasemkiani/htmlmaker/renderable");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WDocument} = require("@ghasemkiani/wdom/document");
const {Script} = require("@ghasemkiani/wdom/js/script");

class Page extends cutil.mixin(File, renderable) {
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
		if(this.description) {
			wnode.ch("meta[name=description]", wnode => {
				wnode.attr("content", this.description);
			});
		}
		if(this.keywords) {
			wnode.ch("meta[name=keywords]", wnode => {
				wnode.attr("content", this.keywords);
			});
		}
		if(this.author) {
			wnode.ch("meta[name=author]", wnode => {
				wnode.attr("content", this.author);
			});
		}
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
		let kk = this.wdocument.root.node.getAttributeNames();
		for(let k of kk) {
			if(!/^xmlns/i.test(k)) {
				this.wdocument.root.attr(k, null);
			}
		}
		this.render({wnode: this.wdocument.root});
		return this;
	}
	
	toString() {
		this.doRender();
		return this.wdocument.string;
	}
	
	makeRelativeUri(uri, base) {
		return cutil.makeRelativeUri(uri, !cutil.isNil(base) ? base : this.uri);
	}
	
	renderDisqus({wnode, username, title, url, uri}) {
		wnode.ch("div#disqus_thread");
		wnode.ch("script", wnode => {
			wnode.attr("src", new Script().add(
			(
({username, title, url, uri}) => {
	var disqus_config = window.disqus_config = function () {
		this.page.title = title;
		this.page.url = url;
		this.page.identifier = uri;
	};
	(function () {
		var d = window.document,
		s = d.createElement("script");
		s.src = `https://${username}.disqus.com/embed.js`;
		s.setAttribute("data-timestamp", new Date().getTime());
		(d.head || d.body).appendChild(s);
	})();
}
			), {username, title, url, uri}).dataUri);
		});
		wnode.ch("noscript", wnode => {
			wnode.t("Please enable JavaScript to view the ");
			wnode.ch("a[href=https://disqus.com/?ref_noscript]", wnode => {
				wnode.t("comments powered by Disqus.");
			});
			wnode.t(".");
		});
	}
	renderInclude({wnode, fn, cs}) {
		let res = {wnode};
		cs = cs || "UTF-8";
		let text = fs.readFileSync(fn, {encoding: cs});
		this.wdocument.ch("div", div => {
			div.node.innerHTML = text;
			div = this.wdocument.wrap(div.node);
			for(let wn of div.wnodes) {
				wnode.append(wn);
			}
		});
		return {...res};
	}
	renderGoogleAnalytics0({wnode, id, domain}) {
		wnode.ch("script", wnode => {
			wnode.attr("src", new Script().add(
			(
({id, domain}) => {
	(function (i, s, o, g, r, a, m) {
		i["GoogleAnalyticsObject"] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments);
		},
		i[r].l = 1 * new Date();
		a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);
	})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
	ga("create", id, domain);
	ga("send", "pageview");
}
			), {id, domain}).dataUri);
		});
	}
	renderGoogleAnalytics({wnode, id}) {
		wnode.ch("script", wnode => {
			wnode.attr("src", `https://www.googletagmanager.com/gtag/js?id=${id}`);
		});
		wnode.ch("script", wnode => {
			wnode.attr("src", new Script().add(
			(
({id}) => {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag("js", new Date());

	gtag("config", id);
}
			), {id}).dataUri);
		});
	}
}
cutil.extend(Page.prototype, {
	mime: "text/html",
	_window: null,
	_wdocument: null,
	
	title: null,
	description: null,
	keywords: null,
	author: null,
});

module.exports = {Page};
