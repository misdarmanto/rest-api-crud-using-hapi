const { uniqueId } = require("../routers/generateId");

const BookModel = {
	id: uniqueId(),
	name: "",
	year: 0,
	author: "",
	summary: "",
	publisher: "",
	pageCount: 0,
	readPage: 0,
	finished: false,
	reading: false,
	insertedAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

const BooksModels = [];

module.exports = { BookModel, BooksModels };
