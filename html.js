import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {js} from "@ghasemkiani/wdom";
import {css} from "@ghasemkiani/wdom";

const {Script} = js;
const {Stylesheet} = css;

const html = new class {
	makeDoc({wHtml, title, description, keywords, author}) {
		let html = this;
		let wHead;
		let wTitle;
		let wDescription;
		let wKeywords;
		let wAuthor;
		let wBody;
		wHtml.chain(wnode => {
			wnode.ch("head", wnode => {
				wHead = wnode;
				wnode.ch("meta[charset=utf-8]");
				wnode.ch("title", wnode => {
					wTitle = wnode;
					if (cutil.a(title)) {
						wnode.t(title);
					}
				});
				if (cutil.a(description)) {
					wnode.ch("meta[name=description]", wnode => {
						wDescription = wnode;
						wnode.attr("content", description);
					});
				}
				if (cutil.a(keywords)) {
					wnode.ch("meta[name=keywords]", wnode => {
						wKeywords = wnode;
						wnode.attr("content", keywords);
					});
				}
				if (cutil.a(author)) {
					wnode.ch("meta[name=author]", wnode => {
						wAuthor = wnode;
						wnode.attr("content", author);
					});
				}
			});
			wnode.ch("body", wnode => {
				wBody = wnode;
			});
		});
		return {wHead, wBody, wTitle, wDescription, wKeywords, wAuthor};
	}
	makeScript({wnode, url, f, params, asDataUri = false, integrity, crossorigin}) {
		let html = this;
		let wScript;
		wnode.ch("script", wnode => {
			wScript = wnode;
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
		return {wScript};
	}
	makeStylesheet({wnode, url, onStylesheet, asDataUri = false, integrity, crossorigin}) {
		let html = this;
		let wLink;
		let wStyle;
		if (url) {
			wnode.ch("link[rel=stylesheet,type=text/css]", wnode => {
				wLink = wnode;
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
				return html.makeStylesheet({wnode, url});
			} else {
				wnode.ch("style[type=text/css]", wnode => {
					wnode.t(ss.string);
				});
			}
		}
		return {wLink, wStyle};
	}
	makeDisqus({wnode, username, title, url, uri, asDataUri = true}) {
		let html = this;
		let wNoScript;
		wnode.ch("div#disqus_thread");
		let {wScript} = html.makeScript({
			wnode,
			f: ({username, title, url, uri}) => {
				var disqus_config = window.disqus_config = function () {
					this.page.title = title;
					this.page.url = url;
					this.page.identifier = uri;
				};
				((d, s) => {
					d = window.document,
					s = d.createElement("script");
					s.src = `https://${username}.disqus.com/embed.js`;
					s.setAttribute("data-timestamp", new Date().getTime());
					(d.head || d.body).appendChild(s);
				})();
			},
			params: {username, title, url, uri},
			asDataUri,
		});
		wnode.ch("noscript", wnode => {
			wNoScript = wnode;
			wnode.t("Please enable JavaScript to view the ");
			wnode.ch("a[href=https://disqus.com/?ref_noscript]", wnode => {
				wnode.t("comments powered by Disqus.");
			});
			wnode.t(".");
		});
		return {wScript, wNoScript};
	}
	makeGoogleAnalytics0({wnode, id, domain, asDataUri = true}) {
		let html = this;
		let {wScript} = html.makeScript({
			wnode,
			f: ({id, domain}) => {
				((i, s, o, g, r, a, m) => {
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
			params: {id, domain},
			asDataUri,
		});
		return {wScript};
	}
	makeGoogleAnalytics({wnode, id, asDataUri = true}) {
		let html = this;
		let wScript1;
		wnode.ch("script", wnode => {
			wScript1 = wnode;
			wnode.attr("src", `https://www.googletagmanager.com/gtag/js?id=${id}`);
		});
		let {wScript: wScript2} = html.makeScript({
			wnode,
			f: ({id}) => {
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag("js", new Date());
				gtag("config", id);
			},
			params: {id},
			asDataUri,
		});
		return {wScript1, wScript2};
	}
}();

export {html};
