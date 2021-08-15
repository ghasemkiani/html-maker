import test from "ava";
import {renderable} from "../renderable.js";
import {Component} from "../component.js";
import {Page} from "../page.js";
import {File} from "../file.js";

test("htmlmaker:Page#makeRelativeUri(): should create the correct relative URI", async t => {
	let page = new Page();

    page.uri = "/";
    t.is(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
    page.uri = "/translation";
    t.is(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
    page.uri = "/translation/";
    t.is(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
    page.uri = "/translation/index.html";
    t.is(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
});
