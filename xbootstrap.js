import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

import {maker} from "./maker.js";

class XBootstrap extends cutil.mixin(Obj, maker) {
	make({node, nhead, onLoaded}) {
		let {x} = this;
		let nlink;
		let nscript;
		node ||= nhead;
		x.chain(node, node => {
			x.ch(node, "link[rel=stylesheet,href=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css]", node => {
				nlink = node;
			});
			x.ch(node, "script[crossorigin=anonymous,src=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js]", node => {
				nscript = node;
			});
			Promise.all([
				new Promise((resolve) => x.on(nlink, "load", resolve)),
				new Promise((resolve) => x.on(nscript, "load", resolve)),
			]).then(() => {
				x.chain(node, onLoaded);
			});
		});
		return {nlink, nscript};
	}
	makeBootstrapV4Css({node, rtl}) {
		let {x} = this;
		x.ch(node, "meta[name=viewport]", node => {
			x.attr(node, "content", "width=device-width, initial-scale=1, shrink-to-fit=no");
		});
		x.ch(node, "link[rel=stylesheet,crossorigin=anonymous]", node => {
			x.attr(node, "href", !rtl ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" : "https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css");
			x.attr(node, "integrity", !rtl ? "sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" : "sha384-P4uhUIGk/q1gaD/NdgkBIl3a6QywJjlsFJFk7SPRdruoGddvRVSwv5qFnvZ73cpz");
		});
		x.ch(node, "link[rel=stylesheet,crossorigin=anonymous]", node => {
			x.attr(node, "href", "https://use.fontawesome.com/releases/v5.7.1/css/all.css");
			x.attr(node, "integrity", "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr");
		});
	}
	makeBootstrapV4Js({node, rtl}) {
		let {x} = this;
		x.ch(node, "script[crossorigin=anonymous]", node => {
			x.attr(node, "src", "https://code.jquery.com/jquery-3.3.1.slim.min.js");
			x.attr(node, "integrity", "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo");
		});
		x.ch(node, "script[crossorigin=anonymous]", node => {
			x.attr(node, "src", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js");
			x.attr(node, "integrity", "sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut");
		});
		x.ch(node, "script[crossorigin=anonymous]", node => {
			x.attr(node, "src", !rtl ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" : "https://cdn.rtlcss.com/bootstrap/v4.0.0/js/bootstrap.min.js");
			x.attr(node, "integrity", !rtl ? "sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" : "sha384-54+cucJ4QbVb99v8dcttx/0JRx4FHMmhOWi4W+xrXpKcsKQodCBwAvu3xxkZAwsH");
		});
	}
	makeNavBar({node, items, fixed, active, idButtonToggle, appName, makeRelativeUri = uri => uri}) {
		let {x} = this;
		let res = {node};
		idButtonToggle = idButtonToggle || cutil.srand();
		let nodeNav;
		if(cutil.isNil(fixed)) {
			fixed = false;
		}
		x.chain(node, node => {
			x.css(node, {
				"min-height": "75rem",
			});
			if(fixed) {
				x.css(node, {
					"padding-top": "4.5rem",
				});
			}
		});
		x.ch(node, `nav.navbar navbar-expand-md navbar-dark bg-dark${fixed ? " fixed-top" : " mb-4"}`, node => {
			nodeNav = node;
			x.ch(node, "div.container", node => {
				x.ch(node, "a.navbar-brand", node => {
					x.attr(node, "href", makeRelativeUri("/"));
					x.t(node, appName);
				});
				x.ch(node, `button.navbar-toggler[type=button,data-toggle=collapse,data-target=#${idButtonToggle},aria-controls=${idButtonToggle},aria-expanded=false,aria-label=Toggle navigation]`, node => {
					x.ch(node, "span.navbar-toggler-icon");
				});
				x.ch(node, `div.collapse navbar-collapse#${idButtonToggle}`, node => {
					x.ch(node, "ul.navbar-nav mr-auto", node => {
						for(let [uri, text, f] of cutil.asArray(items)) {
							let isActive = active === uri;
							x.ch(node, `li.nav-item${isActive ? " active" : ""}`, node => {
								x.ch(node, `a.nav-link`, node => {
									x.attr(node, "href", makeRelativeUri(uri));
									x.t(node, text);
									if(isActive) {
										x.ch(node, `span.sr-only`, node => {
											x.t(node, " (current)");
										});
									}
								});
							});
						}
					});
				});
			});
		});
		return {...res, nodeNav, idButtonToggle};
	}
	makePills({node, items, fixed, active, makeRelativeUri = uri => uri}) {
		let {x} = this;
		let res = {node};
		let nodeNav;
		x.ch(node, "ul.nav nav-pills flex-column", node => {
			nodeNav = node;
			for(let [uri, text, f] of cutil.asArray(items)) {
				let isActive = active === uri;
				x.ch(node, `li.nav-item`, node => {
					x.ch(node, `a.nav-link${isActive ? " active" : ""}`, node => {
						x.attr(node, "href", makeRelativeUri(uri));
						x.t(node, text);
					});
				});
			}
		});
		return {...res, nodeNav};
	}
}

class XDialog extends cutil.mixin(Obj, maker) {
	makeAttach({node, id}) {
		let {x} = this;
		x.chain(node, node => {
			x.attr(node, "data-bs-toggle", "modal");
			x.attr(node, "data-bs-target", `#${id}`);
		});
	}
	makeClose({node}) {
		let {x} = this;
		x.chain(node, node => {
			x.attr(node, "data-bs-dismiss", "modal");
		});
	}
	make({node, id = "dialog", title, onTitle, onHeader, onBody, onFooter}) {
		let {x} = this;
		let nodeDiv;
		let idLabel = `${id}Label`;
		x.ch(node, "div.modal.fade[tabindex=-1,aria-hidden=true]", node => {
			nodeDiv = node;
			x.attr(node, "id", id);
			x.attr(node, "aria-labelledby", idLabel);
			x.ch(node, "div.modal-dialog", node => {
				x.ch(node, "div.modal-content", node => {
					x.ch(node, "div.modal-header", node => {
						x.ch(node, "h1.modal-title.fs-5", node => {
							x.attr(node, "id", idLabel);
							if (cutil.a(title)) {
								x.t(node, title);
							}
							x.chain(node, onTitle);
						});
						x.ch(node, "button.btn-close", node => {
							Dialog.makeClose({node});
							x.attr(node, "aria-label", "Close");
						});
						x.chain(node, onHeader);
					});
					x.ch(node, "div.modal-body", node => {
						x.chain(node, onBody);
					});
					x.ch(node, "div.modal-footer", node => {
						x.chain(node, onFooter);
					});
				});
			});
		});
		return {id, nodeDiv};
	}
}

export {XBootstrap, XDialog};
