const { createBook, getBooks, getBook, updateBook, deleteBook } = require("../controllers");

const Routers = (server) => {
	server.route({
		method: "GET",
		path: "/",
		handler: (req, res) => {
			const message = `Welcome to Dicoding Bookshelf API`;
			return res.response(message).code(200);
		},
	});

	server.route({
		method: "POST",
		path: "/books",
		handler: createBook,
	});

	server.route({
		method: "GET",
		path: "/books",
		handler: getBooks,
	});

	server.route({
		method: "GET",
		path: "/books/{id}",
		handler: getBook,
	});

	server.route({
		method: "PUT",
		path: "/books/{id}",
		handler: updateBook,
	});

	server.route({
		method: "DELETE",
		path: "/books/{id}",
		handler: deleteBook,
	});
	return server;
};

module.exports = { Routers };
