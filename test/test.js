const assert = require("assert");
const {Page} = require("@ghasemkiani/htmlmaker/page");

describe("htmlmaker:Page", () => {
	describe("#makeRelativeUri()", () => {
		let page = new Page();
		it("should create the correct relative URI", () => {
			page.uri = "/";
			assert.equal(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
		});
		it("should create the correct relative URI", () => {
			page.uri = "/translation";
			assert.equal(page.makeRelativeUri("/books/sblp/"), "books/sblp/");
		});
		it("should create the correct relative URI", () => {
			page.uri = "/translation/";
			assert.equal(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
		});
		it("should create the correct relative URI", () => {
			page.uri = "/translation/index.html";
			assert.equal(page.makeRelativeUri("/books/sblp/"), "../books/sblp/");
		});
	});
});
