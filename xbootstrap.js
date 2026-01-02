import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";

import { Maker } from "./maker.js";

class XBootstrap extends Maker {
  static {
    cutil.extend(this.prototype, {
      version: "5.3.8",
      hashCss0: "sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB",
      hashCss: "sha384-CfCrinSRH2IR6a4e6fy2q6ioOX7O6Mtm1L9vRvFZ1trBncWmMePhzvafv7oIcWiW",
      hashJs: "sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI",
    });
  }
  make0({ node, nhtml, nhead, nbody, rtl = false, onLoaded }) {
    let { x } = this;
    nhtml ||= x.root(x.odoc(node || nhead || nbody));
    if (cutil.na(rtl)) {
      rtl =
        /rtl/i.test(x.attr(nhtml, "dir")) ||
        /^(ar|fa|ur|he)/i.test(x.attr(nhtml, "lang"));
    }
    let nlink;
    let nscript;
    x.chain(node || nhead, (node) => {
      x.ch(
        node,
        `link[rel=stylesheet,href=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap${rtl ? ".rtl" : ""}.min.css]`,
        (node) => {
          nlink = node;
        },
      );
    });
    x.chain(node || nbody, (node) => {
      x.ch(
        node,
        "script[crossorigin=anonymous,src=https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js]",
        (node) => {
          nscript = node;
        },
      );
    });
    let promise = Promise.all([
      new Promise((resolve) => x.on(nlink, "load", resolve)),
      new Promise((resolve) => x.on(nscript, "load", resolve)),
    ]).then(() => {
      x.chain(node || nbody || nhead, onLoaded);
    });
    return { nlink, nscript, promise };
  }
  makeBootstrapIcons({ node }) {
    let maker = this;
    let { x } = maker;
    let nlink;
    x.chain(node, (node) => {
      x.ch(
        node,
        `link[rel=stylesheet,href=https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css]`,
        (node) => {
          nlink = node;
        },
      );
    });
    let promise = new Promise((resolve) => x.on(nlink, "load", resolve));
    return { nlink, promise };
  }
  makeHead({ node, nhtml, nhead, rtl = false, onLoaded }) {
    let { x } = this;
    let { version } = this;
    let { hashCss } = this;
    nhtml ||= x.root(x.odoc(node || nhead));
    if (cutil.na(rtl)) {
      rtl =
        /rtl/i.test(x.attr(nhtml, "dir")) ||
        /^(ar|fa|ur|he)/i.test(x.attr(nhtml, "lang"));
    }
    let nlink;
    x.chain(node || nhead, (node) => {
      x.ch(
        node,
        `link[rel=stylesheet,href=https://cdn.jsdelivr.net/npm/bootstrap@${version}/dist/css/bootstrap${rtl ? ".rtl" : ""}.min.css,integrity=${hashCss},crossorigin=anonymous]`,
        (node) => {
          nlink = node;
        },
      );
    });
    let promise = new Promise((resolve) => x.on(nlink, "load", resolve)).then(
      () => {
        x.chain(node || nhead, onLoaded);
      },
    );
    return { nlink, promise };
  }
  makeBody({ node, nbody, onLoaded }) {
    let { x } = this;
    let { version } = this;
    let { hashJs } = this;
    let nscript;
    x.chain(node || nbody, (node) => {
      x.ch(
        node,
        `script[src=https://cdn.jsdelivr.net/npm/bootstrap@${version}/dist/js/bootstrap.bundle.min.js,integrity=${hashJs},crossorigin=anonymous]`,
        (node) => {
          nscript = node;
        },
      );
    });
    let promise = new Promise((resolve) => x.on(nscript, "load", resolve)).then(
      () => {
        x.chain(node || nbody, onLoaded);
      },
    );
    return { nscript, promise };
  }
  make({ node, nhtml, nhead, nbody, rtl = false, onLoaded }) {
    let { x } = this;
    let { nlink, promise: promiseHead } = this.makeHead({
      node,
      nhtml,
      nhead,
      rtl,
    });
    let { nscript, promise: promiseBody } = this.makeBody({ node, nbody });
    let promise = Promise.all([promiseHead, promiseBody]).then(() => {
      x.chain(node || nbody || nhead, onLoaded);
    });
    return { nlink, nscript, promise };
  }
  makeBootstrapV4Css({ node, rtl }) {
    let { x } = this;
    x.ch(node, "meta[name=viewport]", (node) => {
      x.attr(
        node,
        "content",
        "width=device-width, initial-scale=1, shrink-to-fit=no",
      );
    });
    x.ch(node, "link[rel=stylesheet,crossorigin=anonymous]", (node) => {
      x.attr(
        node,
        "href",
        !rtl
          ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          : "https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css",
      );
      x.attr(
        node,
        "integrity",
        !rtl
          ? "sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          : "sha384-P4uhUIGk/q1gaD/NdgkBIl3a6QywJjlsFJFk7SPRdruoGddvRVSwv5qFnvZ73cpz",
      );
    });
    x.ch(node, "link[rel=stylesheet,crossorigin=anonymous]", (node) => {
      x.attr(
        node,
        "href",
        "https://use.fontawesome.com/releases/v5.7.1/css/all.css",
      );
      x.attr(
        node,
        "integrity",
        "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr",
      );
    });
  }
  makeBootstrapV4Js({ node, rtl }) {
    let { x } = this;
    x.ch(node, "script[crossorigin=anonymous]", (node) => {
      x.attr(node, "src", "https://code.jquery.com/jquery-3.3.1.slim.min.js");
      x.attr(
        node,
        "integrity",
        "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
      );
    });
    x.ch(node, "script[crossorigin=anonymous]", (node) => {
      x.attr(
        node,
        "src",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js",
      );
      x.attr(
        node,
        "integrity",
        "sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut",
      );
    });
    x.ch(node, "script[crossorigin=anonymous]", (node) => {
      x.attr(
        node,
        "src",
        !rtl
          ? "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
          : "https://cdn.rtlcss.com/bootstrap/v4.0.0/js/bootstrap.min.js",
      );
      x.attr(
        node,
        "integrity",
        !rtl
          ? "sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
          : "sha384-54+cucJ4QbVb99v8dcttx/0JRx4FHMmhOWi4W+xrXpKcsKQodCBwAvu3xxkZAwsH",
      );
    });
  }
  makeNavBarV5({
    node,
    appName,
    appUri = "/",
    items,
    active,
    onBrand,
    onItems,
    container = false,
  }) {
    let maker = this;
    let { x } = maker;
    let nnavbar;
    let nbrand;
    let nitems;
    x.ch(node, "nav.navbar.navbar-expand-lg.bg-body-tertiary", (node) => {
      x.ch(
        node,
        `div.${container ? "container" : "container-fluid"}`,
        (node) => {
          x.ch(node, "a.navbar-brand", (node) => {
            nbrand = node;
            x.on(node, "click", () => {
              x.q(x.doc(), ".navbar .navbar-collapse").classList.remove("show");
            });
            onBrand ||= (node) => {
              x.attr(node, "href", maker.rel(appUri));
              x.t(node, appName);
            };
            x.chain(node, onBrand);
          });
          x.ch(
            node,
            "button.navbar-toggler[type=button,data-bs-toggle=collapse,data-bs-target=#navbarSupportedContent,aria-controls=navbarSupportedContent,aria-expanded=false,aria-label=Toggle navigation]",
            (node) => {
              x.ch(node, "span.navbar-toggler-icon");
            },
          );
          x.ch(
            node,
            "div.collapse.navbar-collapse[id=navbarSupportedContent]",
            (node) => {
              nnavbar = node;
              x.ch(node, "ul.navbar-nav.me-auto.mb-2.mb-lg-0", (node) => {
                nitems = node;
                for (let { uri, text, disabled = false } of cutil.asArray(
                  items,
                )) {
                  maker.makeNavBarItemV5({ node, uri, text, disabled, active });
                }
                x.chain(node, onItems);
              });
            },
          );
        },
      );
    });
    return { nnavbar, nbrand, nitems };
  }
  makeNavBarItemV5({
    node,
    uri,
    text,
    disabled = false,
    active,
    onItem,
    onLink,
  }) {
    let maker = this;
    let { x } = maker;
    x.ch(node, "li.nav-item", (node) => {
      x.ch(node, "a.nav-link", (node) => {
        x.t(node, text);
        if (active === true || active === uri) {
          node.classList.add("active");
          x.attr(node, "aria-current", "page");
        }
        x.attr(node, "href", maker.rel(uri));
        if (disabled) {
          node.classList.add("disabled");
          x.attr(node, "aria-disabled", "true");
        }
        x.on(node, "click", (event) => {
          // customize?
          x.q(x.doc(), ".navbar .navbar-collapse").classList.remove("show");
        });
        x.chain(node, onLink);
      });
      x.chain(node, onItem);
    });
  }
  makeNavBarItemDropdownV5({ node, text, onDropdown, onItems }) {
    let maker = this;
    let { x } = maker;
    let ndropdown;
    let nitems;
    x.ch(node, "li.nav-item.dropdown", (node) => {
      ndropdown = node;
      x.chain(node, onDropdown);
      x.ch(
        node,
        "a.nav-link.dropdown-toggle[href=#,role=button,data-bs-toggle=dropdown,aria-expanded=false]",
        (node) => {
          x.t(node, text);
        },
      );
      x.ch(node, "ul.dropdown-menu", (node) => {
        nitems = node;
        x.chain(node, onItems);
      });
    });
    return { ndropdown, nitems };
  }
  makeDropdownItemV5({ node, uri, text, onLink }) {
    let maker = this;
    let { x } = maker;
    x.ch(node, "li", (node) => {
      x.ch(node, "a.dropdown-item", (node) => {
        x.t(node, text);
        x.attr(node, "href", maker.rel(uri));
        x.chain(node, onLink);
      });
    });
  }
  makeDropdownDividerV5({ node }) {
    let maker = this;
    let { x } = maker;
    x.ch(node, "li", (node) => {
      x.ch(node, "hr.dropdown-divider");
    });
  }
  makeNavBar({
    node,
    items,
    fixed,
    active,
    idButtonToggle,
    appName,
    makeRelativeUri = (uri) => uri,
  }) {
    let { x } = this;
    idButtonToggle = idButtonToggle || cutil.srand();
    let nodeNav;
    if (cutil.isNil(fixed)) {
      fixed = false;
    }
    x.chain(node, (node) => {
      x.css(node, {
        "min-height": "75rem",
      });
      if (fixed) {
        x.css(node, {
          "padding-top": "4.5rem",
        });
      }
    });
    x.ch(
      node,
      `nav.navbar navbar-expand-md navbar-dark bg-dark${fixed ? " fixed-top" : " mb-4"}`,
      (node) => {
        nodeNav = node;
        x.ch(node, "div.container", (node) => {
          x.ch(node, "a.navbar-brand", (node) => {
            x.attr(node, "href", makeRelativeUri("/"));
            x.t(node, appName);
          });
          x.ch(
            node,
            `button.navbar-toggler[type=button,data-toggle=collapse,data-target=#${idButtonToggle},aria-controls=${idButtonToggle},aria-expanded=false,aria-label=Toggle navigation]`,
            (node) => {
              x.ch(node, "span.navbar-toggler-icon");
            },
          );
          x.ch(
            node,
            `div.collapse navbar-collapse#${idButtonToggle}`,
            (node) => {
              x.ch(node, "ul.navbar-nav mr-auto", (node) => {
                for (let [uri, text, f] of cutil.asArray(items)) {
                  let isActive = active === uri;
                  x.ch(
                    node,
                    `li.nav-item${isActive ? " active" : ""}`,
                    (node) => {
                      x.ch(node, `a.nav-link`, (node) => {
                        x.attr(node, "href", makeRelativeUri(uri));
                        x.t(node, text);
                        if (isActive) {
                          x.ch(node, `span.sr-only`, (node) => {
                            x.t(node, " (current)");
                          });
                        }
                      });
                    },
                  );
                }
              });
            },
          );
        });
      },
    );
    return { nodeNav, idButtonToggle };
  }
  makePills({ node, items, fixed, active, makeRelativeUri = (uri) => uri }) {
    let { x } = this;
    let nodeNav;
    x.ch(node, "ul.nav nav-pills flex-column", (node) => {
      nodeNav = node;
      for (let [uri, text, f] of cutil.asArray(items)) {
        let isActive = active === uri;
        x.ch(node, `li.nav-item`, (node) => {
          x.ch(node, `a.nav-link${isActive ? " active" : ""}`, (node) => {
            x.attr(node, "href", makeRelativeUri(uri));
            x.t(node, text);
          });
        });
      }
    });
    return { nodeNav };
  }
  makeAlert({ node, kind = "info", f }) {
    let { x } = this;
    let ndiv;
    x.chain(node, (node) => {
      x.ch(node, "div.alert[role=alert]", (node) => {
        ndiv = node;
        node.classList.add(`alert-${kind}`);
        x.chain(node, f);
      });
    });
    return { ndiv };
  }
}

class XDialog extends Maker {
  makeAttach({ node, id }) {
    let { x } = this;
    x.chain(node, (node) => {
      x.attr(node, "data-bs-toggle", "modal");
      x.attr(node, "data-bs-target", `#${id}`);
    });
  }
  makeClose({ node }) {
    let { x } = this;
    x.chain(node, (node) => {
      x.attr(node, "data-bs-dismiss", "modal");
    });
  }
  make({ node, id = "dialog", title, onTitle, onHeader, onBody, onFooter }) {
    let { x } = this;
    let nodeDiv;
    let idLabel = `${id}Label`;
    x.ch(node, "div.modal.fade[tabindex=-1,aria-hidden=true]", (node) => {
      nodeDiv = node;
      x.attr(node, "id", id);
      x.attr(node, "aria-labelledby", idLabel);
      x.ch(node, "div.modal-dialog", (node) => {
        x.ch(node, "div.modal-content", (node) => {
          x.ch(node, "div.modal-header", (node) => {
            x.ch(node, "h1.modal-title.fs-5", (node) => {
              x.attr(node, "id", idLabel);
              if (cutil.a(title)) {
                x.t(node, title);
              }
              x.chain(node, onTitle);
            });
            x.ch(node, "button.btn-close", (node) => {
              Dialog.makeClose({ node });
              x.attr(node, "aria-label", "Close");
            });
            x.chain(node, onHeader);
          });
          x.ch(node, "div.modal-body", (node) => {
            x.chain(node, onBody);
          });
          x.ch(node, "div.modal-footer", (node) => {
            x.chain(node, onFooter);
          });
        });
      });
    });
    return { id, nodeDiv };
  }
}

const iwxbootstrap = {
  _xbootstrap: null,
  get xbootstrap() {
    if (cutil.na(this._xbootstrap)) {
      this._xbootstrap = XBootstrap.create(this);
    }
    return this._xbootstrap;
  },
  set xbootstrap(xbootstrap) {
    this._xbootstrap = xbootstrap;
  },
};

const iwxdialog = {
  _xdialog: null,
  get xdialog() {
    if (cutil.na(this._xdialog)) {
      this._xdialog = XDialog.create(this);
    }
    return this._xdialog;
  },
  set xdialog(xdialog) {
    this._xdialog = xdialog;
  },
};

export { XBootstrap, XDialog, iwxbootstrap, iwxdialog };
