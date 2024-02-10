import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {Textual} from "@ghasemkiani/base";
import {iwx} from "@ghasemkiani/xdom";

import {Maker} from "./maker.js";

class XHtml extends Maker {
	static {
		cutil.extend(this.prototype, {
			
		});
	}
	makeDoc(arg) {
		let {x} = this;
		let {document, nhtml, title, description, keywords, author, noMetaCharset = false, cs = "UTF-8"} = cutil.asObject(arg);
		if (cutil.na(document)) {
			if (cutil.a(nhtml)) {
				document = x.odoc(nhtml);
			} else {
				document = x.doc();
			}
		}
		if (cutil.na(nhtml)) {
			nhtml = x.root(document);
		}
		let nhead = x.q(document, "head") || x.ch(nhtml, "head");
		let ndescription;
		let nkeywords;
		let nauthor;
		let ntitle;
		x.chain(nhead, node => {
			if (!noMetaCharset) {
				x.ch(node, "meta", node => {
					x.attr(node, "charset", cs);
				});
			}
			ntitle = x.q(node, "title") || x.ch(node, "title");
			x.chain(ntitle, node => {
				if (cutil.a(title)) {
					x.cl(node);
					x.t(node, title);
				}
			});
			if (cutil.a(description)) {
				ndescription = x.ch(node, "meta[name=description]", node => {
					x.attr(node, "content", description);
				});
			}
			if (cutil.a(keywords)) {
				nkeywords = x.ch(node, "meta[name=keywords]", node => {
					x.attr(node, "content", keywords);
				});
			}
			if (cutil.a(author)) {
				nauthor = x.ch(node, "meta[name=author]", node => {
					x.attr(node, "content", author);
				});
			}
		});
		let nbody = x.q(document, "body") || x.ch(nhtml, "body");
		return {document, nhtml, nhead, ntitle, nbody, ndescription, nkeywords, nauthor};
	}
	makeScript({node, url, f, arg, asDataUri = false, integrity, crossorigin, cdata = false, pretty = false}) {
		let {x} = this;
		let nscript;
		nscript = x.ch(node, "script", node => {
			if (url) {
				x.attr(node, "src", url);
			} else {
				let script = x.js(f, arg, pretty);
				if (asDataUri) {
					x.attr(node, "src", script.dataUri);
				} else {
					if (cdata) {
						x.cdata(node, script.string);
					} else {
						x.t(node, script.string);
					}
				}
			}
			if (cutil.a(integrity)) {
				x.attr(node, "integrity", integrity);
			}
			if (cutil.a(crossorigin)) {
				x.attr(node, "crossorigin", crossorigin);
			}
		});
		return {nscript};
	}
	makeStylesheet({node, url, onStylesheet, asDataUri = false, integrity, crossorigin, cdata = false}) {
		let {x} = this;
		let nlink;
		let nstyle;
		if (url) {
			nlink = x.ch(node, "link[rel=stylesheet,type=text/css]", node => {
				x.attr(node, "href", url);
				if (cutil.a(integrity)) {
					x.attr(node, "integrity", integrity);
				}
				if (cutil.a(crossorigin)) {
					x.attr(node, "crossorigin", crossorigin);
				}
			});
		} else {
			let ss = x.ss(onStylesheet);
			if (asDataUri) {
				let url = ss.dataUri;
				return this.makeStylesheet({node, url});
			} else {
				x.ch(node, "style[type=text/css]", node => {
					if (cdata) {
						x.cdata(node, ss.string);
					} else {
						x.t(node, ss.string);
					}
				});
			}
		}
		return {nlink, nstyle};
	}
	makeFavicon({node, nhead, uri = "/favicon.ico"}) {
		let {x} = this;
		node ||= nhead;
		let nlink = x.ch(node, "link[rel=icon]", node => {
			if (/\.ico$/i.test(uri)) {
				x.attr(node, "type", "image/x-icon");
			}
			x.attr(node, "href", uri);
		});
		return {nlink};
	}
	makeResponsive({node, nhead}) {
		let {x} = this;
		node ||= nhead;
		x.ch(node, "meta[name=viewport]", node => {
			x.attr(node, "content", "width=device-width,initial-scale=1");
		});
	}
	makeGoogleAnalytics0({node, id, domain, asDataUri = true, cdata = false}) {
		let {x} = this;
		this.makeScript({
			node,
			f: ({id, domain}) => {
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
			},
			arg: {id, domain},
			asDataUri,
			cdata,
		});
	}
	makeGoogleAnalytics({node, id, asDataUri = true, cdata = false, pretty = true}) {
		let {x} = this;
		this.makeScript({node, url: `https://www.googletagmanager.com/gtag/js?id=${id}`});
		this.makeScript({
			node,
			f: ({id}) => {
				window.dataLayer = window.dataLayer || [];
				function gtag() {
					dataLayer.push(arguments);
				}
				gtag("js", new Date());
				gtag("config", id);
			},
			arg: {id},
			asDataUri,
			cdata,
			pretty,
		});
	}
	makeDisqus({node, username, title, url, uri, asDataUri = true, cdata = false, pretty = true}) {
		let {x} = this;
		x.ch(node, "div#disqus_thread");
		this.makeScript({
			node,
			f: ({username, title, url, uri}) => {
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
			},
			arg: {username, title, url, uri},
			asDataUri,
			cdata,
			pretty,
		});
		x.ch(node, "noscript", node => {
			x.t(node, "Please enable JavaScript to view the ");
			x.ch(node, "a[href=https://disqus.com/?ref_noscript]", node => {
				x.t(node, "comments powered by Disqus");
			});
			x.t(node, ".");
		});
	}
	makeInclude({node, fn, cs = "UTF-8"}) {
		let {x} = this;
		let text = new Textual({fn, cs}).read().string;
		node.innerHTML = text;
		return {text};
	}
	importGoogleFont({ss, name}) {
		let {x} = this;
		ss.instruction(`@import url(https://fonts.googleapis.com/css?family=${encodeURIComponent(name)});`);
	}
}

// needs iwx (and iwdom/iwjsdom)
const iwxhtml = {
	_xhtml: null,
	get xhtml() {
		if (cutil.na(this._xhtml)) {
			this._xhtml = XHtml.create(this);
		}
		return this._xhtml;
	},
	set xhtml(xhtml) {
		this._xhtml = xhtml;
	},
};

export {XHtml, iwxhtml};
