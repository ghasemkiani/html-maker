import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

class Bootstrap extends Obj {
	static make({whead, app, onLoaded}) {
		let wlink;
		let wscript;
		whead.chain(wnode => {
			wnode.ch("link[rel=stylesheet,href=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css]", wnode => {
				wlink = wnode;
			});
			wnode.ch("script[crossorigin=anonymous,src=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js]", wnode => {
				wscript = wnode;
			});
			Promise.all([
				new Promise((resolve) => wlink.on("load", resolve)),
				new Promise((resolve) => wscript.on("load", resolve)),
			]).then(() => {
				wnode.chain(onLoaded);
			});
		});
		return {wlink, wscript};
	}
	static makeBootstrapV4Css({wnode, rtl}) {
		// let res = super.renderHead({wnode});
		wnode.ch("meta[name=viewport]", wnode => {
			wnode.attr("content", "width=device-width, initial-scale=1, shrink-to-fit=no");
		});
		wnode.ch("link[rel=stylesheet,crossorigin=anonymous]", wnode => {
			wnode.attr("href", !rtl ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" : "https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css");
			wnode.attr("integrity", !rtl ? "sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" : "sha384-P4uhUIGk/q1gaD/NdgkBIl3a6QywJjlsFJFk7SPRdruoGddvRVSwv5qFnvZ73cpz");
		});
		wnode.ch("link[rel=stylesheet,crossorigin=anonymous]", wnode => {
			wnode.attr("href", "https://use.fontawesome.com/releases/v5.7.1/css/all.css");
			wnode.attr("integrity", "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr");
		});
		// return {...res};
	}
	static makeBootstrapV4Js({wnode, rtl}) {
		// let res = super.renderBody({wnode});
		wnode.ch("script[crossorigin=anonymous]", wnode => {
			wnode.attr("src", "https://code.jquery.com/jquery-3.3.1.slim.min.js");
			wnode.attr("integrity", "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo");
		});
		wnode.ch("script[crossorigin=anonymous]", wnode => {
			wnode.attr("src", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js");
			wnode.attr("integrity", "sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut");
		});
		wnode.ch("script[crossorigin=anonymous]", wnode => {
			wnode.attr("src", !rtl ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" : "https://cdn.rtlcss.com/bootstrap/v4.0.0/js/bootstrap.min.js");
			wnode.attr("integrity", !rtl ? "sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" : "sha384-54+cucJ4QbVb99v8dcttx/0JRx4FHMmhOWi4W+xrXpKcsKQodCBwAvu3xxkZAwsH");
		});
		// return {...res};
	}
	static makeNavBar({wnode, items, fixed, active, idButtonToggle, appName, makeRelativeUri = uri => uri}) {
		let res = ({wnode});
		idButtonToggle = idButtonToggle || cutil.srand();
		let wnodeNav;
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
			wnodeNav = wnode;
			wnode.ch("div.container", wnode => {
				wnode.ch("a.navbar-brand", wnode => {
					wnode.attr("href", makeRelativeUri("/"));
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
									wnode.attr("href", makeRelativeUri(uri));
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
		return {...res, wnodeNav, idButtonToggle};
	}
	static makePills({wnode, items, fixed, active, makeRelativeUri = uri => uri}) {
		let res = ({wnode});
		let wnodeNav;
		wnode.ch("ul.nav nav-pills flex-column", wnode => {
			wnodeNav = wnode;
			for(let [uri, text, f] of cutil.asArray(items)) {
				let isActive = active === uri;
				wnode.ch(`li.nav-item`, wnode => {
					wnode.ch(`a.nav-link${isActive ? " active" : ""}`, wnode => {
						wnode.attr("href", makeRelativeUri(uri));
						wnode.t(text);
					});
				});
			}
		});
		return {...res, wnodeNav};
	}
}

class Dialog extends Obj {
	static makeAttach({wnode, id}) {
		wnode.chain(wnode => {
			wnode.attr("data-bs-toggle", "modal");
			wnode.attr("data-bs-target", `#${id}`);
		});
	}
	static makeClose({wnode}) {
		wnode.chain(wnode => {
			wnode.attr("data-bs-dismiss", "modal");
		});
	}
	static make({wnode, app, id = "dialog", title, onTitle, onHeader, onBody, onFooter}) {
		let wnodeDiv;
		let idLabel = `${id}Label`;
		wnode.ch("div.modal.fade[tabindex=-1,aria-hidden=true]", wnode => {
			wnodeDiv = wnode;
			wnode.attr("id", id);
			wnode.attr("aria-labelledby", idLabel);
			wnode.ch("div.modal-dialog", wnode => {
				wnode.ch("div.modal-content", wnode => {
					wnode.ch("div.modal-header", wnode => {
						wnode.ch("h1.modal-title.fs-5", wnode => {
							wnode.attr("id", idLabel);
							if (cutil.a(title)) {
								wnode.t(title);
							}
							wnode.chain(onTitle);
						});
						wnode.ch("button.btn-close", wnode => {
							Dialog.makeClose({wnode});
							wnode.attr("aria-label", "Close");
						});
						wnode.chain(onHeader);
					});
					wnode.ch("div.modal-body", wnode => {
						wnode.chain(onBody);
					});
					wnode.ch("div.modal-footer", wnode => {
						wnode.chain(onFooter);
					});
				});
			});
		});
		return {id, wnodeDiv};
	}
};

export {Bootstrap, Dialog};
