import fs from "node:fs";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {WDocument} from "@ghasemkiani/wjsdom";
import {js} from "@ghasemkiani/wdom";
const {Script} = js;
import {css} from "@ghasemkiani/wdom";
const {Stylesheet} = css;

class Html extends Obj {
	static makeDoc(arg) {
		let {wdocument, whtml, title, description, keywords, author} = cutil.asObject(arg);
		wdocument ||= new WDocument();
		whtml ||= wdocument.root;
		let whead = whtml.wnodes.filter(({kind}) => kind === "element").find(({tag}) => /head/i.test(tag));
		if (!whead) {
			whtml.ch("head", wnode => {
				whead = wnode;
			});
		}
		let wdescription;
		let wkeywords;
		let wauthor;
		whead.chain(wnode => {
			wnode.ch("meta[charset=utf-8]");
			let wtitle = wnode.wnodes.filter(({kind}) => kind === "element").find(({tag}) => /title/i.test(tag));
			if (!wtitle) {
				wnode.ch("title", wnode => {
					wtitle = wnode;
				});
			}
			wtitle.chain(wnode => {
				if (cutil.a(title)) {
					wnode.t(title);
				}
			});
			if (cutil.a(description)) {
				wnode.ch("meta[name=description]", wnode => {
					wdescription = wnode;
					wnode.attr("content", description);
				});
			}
			if (cutil.a(keywords)) {
				wnode.ch("meta[name=keywords]", wnode => {
					wkeywords = wnode;
					wnode.attr("content", keywords);
				});
			}
			if (cutil.a(author)) {
				wnode.ch("meta[name=author]", wnode => {
					wauthor = wnode;
					wnode.attr("content", author);
				});
			}
		});
		let wbody = whtml.wnodes.filter(({kind}) => kind === "element").find(({tag}) => /body/i.test(tag));
		if (!wbody) {
			whtml.ch("body", wnode => {
				wbody = wnode;
			});
		}
		return {wdocument, whtml, whead, wtitle, wbody, wdescription, wkeywords, wauthor};
	}
	static makeScript({wnode, url, f, params, asDataUri = false, integrity, crossorigin}) {
		let wscript;
		wnode.ch("script", wnode => {
			wscript = wnode;
			if (url) {
				wnode.attr("src", url);
			} else {
				let script = new Script().add(f);
				if (asDataUri) {
					wnode.attr("src", script.dataUri);
				} else {
					wnode.t(script.string);
				}
			}
			if (cutil.a(integrity)) {
				wnode.attr("integrity", integrity);
			}
			if (cutil.a(crossorigin)) {
				wnode.attr("crossorigin", crossorigin);
			}
		});
		return {wscript};
	}
	static makeStylesheet({wnode, url, onStylesheet, asDataUri = false, integrity, crossorigin}) {
		let wlink;
		let wstyle;
		if (url) {
			wnode.ch("link[rel=stylesheet,type=text/css]", wnode => {
				wlink = wnode;
				wnode.attr("href", url);
				if (cutil.a(integrity)) {
					wnode.attr("integrity", integrity);
				}
				if (cutil.a(crossorigin)) {
					wnode.attr("crossorigin", crossorigin);
				}
			});
		} else {
			let ss = new Stylesheet().chain(onStylesheet);
			if (asDataUri) {
				let url = ss.dataUri;
				return this.makeStylesheet({wnode, url});
			} else {
				wnode.ch("style[type=text/css]", wnode => {
					wnode.t(ss.string);
				});
			}
		}
		return {wlink, wstyle};
	}
	static makeFavicon({whead, uri = "/favicon.ico"}) {
		let wlink;
		whead.chain(wnode => {
			wnode.ch("link[rel=icon,type=image/x-icon]", wnode => {
				wlink = wnode;
				wnode.attr("href", uri);
			});
		});
		return {wlink};
	}
	static makeResponsive({whead}) {
		whead.ch("meta", wnode => {
			wnode.attr("name", "viewport");
			wnode.attr("content", "width=device-width,initial-scale=1");
		});
	}
	static makeGoogleAnalytics0({wnode, id, domain}) {
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
	static makeGoogleAnalytics({wnode, id}) {
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
	static makeDisqus({wnode, username, title, url, uri}) {
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
	static makeInclude({wnode, fn, cs}) {
		let {wdocument} = wnode;
		let res = {wnode};
		cs = cs || "UTF-8";
		let text = fs.readFileSync(fn, {encoding: cs});
		wdocument.ch("div", div => {
			div.node.innerHTML = text;
			div = wdocument.wrap(div.node);
			for(let wn of div.wnodes) {
				wnode.append(wn);
			}
		});
		return {...res};
	}
	static importGoogleFont({ss, name}) {
		ss.instruction(`@import url(https://fonts.googleapis.com/css?family=${encodeURIComponent(name)});`);
	}
}

export {Html};
