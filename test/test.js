import assert from "node:assert";
import test from "node:test";

import {renderable} from "../renderable.js";
import {Component} from "../component.js";
import {Page} from "../page.js";
import {File} from "../file.js";

await test("htmlmaker:Page#makeRelativeUri(): should create the correct relative URI", async (t) => {
	let page = new Page();

    page.uri = "/";
    assert.equal(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
    page.uri = "/translation";
    assert.equal(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
    page.uri = "/translation/";
    assert.equal(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
    page.uri = "/translation/index.html";
    assert.equal(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
});
