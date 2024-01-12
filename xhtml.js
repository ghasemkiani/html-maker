import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {Textual} from "@ghasemkiani/base";

import {maker} from "./maker.js";

class XHtml extends cutil.mixin(Obj, maker) {
	static {
		cutil.extend(this.prototype, {
			
		});
	}
	makeDoc(arg) {
		let {x} = this;
		let {document, nhtml, title, description, keywords, author} = cutil.asObject(arg);
		if (cutil.na(document)) {
			if (cutil.a(nhtml)) {
				document = x.odoc(nhtml);
			} else {
				document = x.doc();
			}
		} else if (cutil.na(nhtml)) {
			nhtml = x.root(document);
		}
		let nhead = document.head || x.ch(nhtml, "head");
		let ndescription;
		let nkeywords;
		let nauthor;
		let ntitle;
		x.chain(nhead, node => {
			x.ch(node, "meta[charset=utf-8]");
			ntitle = x.q(node, "title") || x.ch(node, "title");
			x.chain(ntitle, node => {
				if (cutil.a(title)) {
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
		let nbody = document.body || x.ch(nhtml, "body");
		return {document, nhtml, nhead, ntitle, nbody, ndescription, nkeywords, nauthor};
	}
	makeScript({node, url, f, params, asDataUri = false, integrity, crossorigin}) {
		let {x} = this;
		let nscript;
		nscript = x.ch(node, "script", node => {
			if (url) {
				x.attr(node, "src", url);
			} else {
				let script = x.js({f});
				if (asDataUri) {
					x.attr(node, "src", script.dataUri);
				} else {
					x.t(node, script.string);
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
	makeStylesheet({node, url, onStylesheet, asDataUri = false, integrity, crossorigin}) {
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
					x.t(node, ss.string);
				});
			}
		}
		return {nlink, nstyle};
	}
	makeFavicon({nhead, uri = "/favicon.ico"}) {
		let {x} = this;
		let nlink;
		nhead.chain(node => {
			x.ch(node, "link[rel=icon,type=image/x-icon]", node => {
				nlink = node;
				x.attr(node, "href", uri);
			});
		});
		return {nlink};
	}
	makeResponsive({nhead}) {
		let {x} = this;
		nhead.ch("meta", node => {
			x.attr(node, "name", "viewport");
			x.attr(node, "content", "width=device-width,initial-scale=1");
		});
	}
	makeGoogleAnalytics0({node, id, domain}) {
		let {x} = this;
		x.ch(node, "script", node => {
			x.attr(node, "src", new Script().add((({id, domain}) => {
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
					}), {id, domain}).dataUri);
		});
	}
	makeGoogleAnalytics({node, id}) {
		let {x} = this;
		x.ch(node, "script", node => {
			x.attr(node, "src", `https://www.googletagmanager.com/gtag/js?id=${id}`);
		});
		x.ch(node, "script", node => {
			x.attr(node, "src", new Script().add((({id}) => {
						window.dataLayer = window.dataLayer || [];
						function gtag() {
							dataLayer.push(arguments);
						}
						gtag("js", new Date());
						gtag("config", id);
					}), {id}).dataUri);
		});
	}
	static makeDisqus({node, username, title, url, uri}) {
		x.ch(node, "div#disqus_thread");
		x.ch(node, "script", node => {
			x.attr(node, "src", new Script().add(
					(({username, title, url, uri}) => {
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
					}), {username, title, url, uri}).dataUri);
		});
		x.ch(node, "noscript", node => {
			x.t(node, "Please enable JavaScript to view the ");
			x.ch(node, "a[href=https://disqus.com/?ref_noscript]", node => {
				x.t(node, "comments powered by Disqus.");
			});
			x.t(node, ".");
		});
	}
	makeInclude({node, fn, cs}) {
		let {x} = this;
		let {wdocument} = node;
		let res = {node};
		cs = cs || "UTF-8";
		let text = fs.readFileSync(fn, {encoding: cs});
		wdocument.ch("div", div => {
			div.node.innerHTML = text;
			div = wdocument.wrap(div.node);
			for(let wn of div.nodes) {
				node.append(wn);
			}
		});
		return {...res};
	}
	importGoogleFont({ss, name}) {
		let {x} = this;
		ss.instruction(`@import url(https://fonts.googleapis.com/css?family=${encodeURIComponent(name)});`);
	}
}

export {XHtml};
