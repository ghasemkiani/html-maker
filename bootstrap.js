import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {js} from "@ghasemkiani/wdom";
import {css} from "@ghasemkiani/wdom";

import {html} from "./html.js";

const {Script} = js;
const {Stylesheet} = css;

const bootstrap = new class {
	makeBootstrap({wHead, wBody}) {
		let bootstrap = this;
		let {wLink} = bootstrap.makeBootstrapCss({wnode: wHead});
		let {wScript} = bootstrap.makeBootstrapJs({wnode: wBody});
		return {wLink, wScript};
	}
	makeBootstrapCss({
		wnode,
		url = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
		integrity = "sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9",
		crossorigin = "anonymous",
	}) {
		let bootstrap = this;
		let {wLink} = html.makeStylesheet({wnode, url: urlCss, integrity, crossorigin});
		return {wLink};
	}
	makeBootstrapJs({
		wnode,
		url = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js",
		integrity = "sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm",
		crossorigin = "anonymous",
	}) {
		let bootstrap = this;
		let {wScript} = html.makeScript({wnode, url: urlJs, integrity, crossorigin});
		return {wScript};
	}
	renderNavBar({wnode, appName, items, fixed, active, idButtonToggle}) {
		idButtonToggle = idButtonToggle || cutil.srand();
		let wNav;
		if(cutil.isNil(fixed)) {
			fixed = false;
		}
		wnode.chain(wnode => {
			wnode.css({
				"min-height": "75rem",
			});
			if(fixed) {
				wnode.css({
					"padding-top": "4.5rem",
				});
			}
		});
		wnode.ch(`nav.navbar navbar-expand-md navbar-dark bg-dark${fixed ? " fixed-top" : " mb-4"}`, wnode => {
			wNav = wnode;
			wnode.ch("div.container", wnode => {
				wnode.ch("a.navbar-brand", wnode => {
					wnode.attr("href", "/");
					wnode.t(appName);
				});
				wnode.ch(`button.navbar-toggler[type=button,data-toggle=collapse,data-target=#${idButtonToggle},aria-controls=${idButtonToggle},aria-expanded=false,aria-label=Toggle navigation]`, wnode => {
					wnode.ch("span.navbar-toggler-icon");
				});
				wnode.ch(`div.collapse navbar-collapse#${idButtonToggle}`, wnode => {
					wnode.ch("ul.navbar-nav mr-auto", wnode => {
						for(let [uri, text, f] of cutil.asArray(items)) {
							let isActive = active === uri;
							wnode.ch(`li.nav-item${isActive ? " active" : ""}`, wnode => {
								wnode.ch(`a.nav-link`, wnode => {
									wnode.attr("href", uri);
									wnode.t(text);
									if(isActive) {
										wnode.ch(`span.sr-only`, wnode => {
											wnode.t(" (current)");
										});
									}
								});
							});
						}
					});
				});
			});
		});
		return {wNav, idButtonToggle};
	}
	renderPills({wnode, items, fixed, active}) {
		let wNav;
		wnode.ch("ul.nav nav-pills flex-column", wnode => {
			wNav = wnode;
			for(let [uri, text, f] of cutil.asArray(items)) {
				let isActive = active === uri;
				wnode.ch(`li.nav-item`, wnode => {
					wnode.ch(`a.nav-link${isActive ? " active" : ""}`, wnode => {
						wnode.attr("href", uri);
						wnode.t(text);
					});
				});
			}
		});
		return {wNav};
	}
}();

export {bootstrap};
