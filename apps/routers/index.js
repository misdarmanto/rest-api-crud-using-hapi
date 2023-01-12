const { getBook } = require("../controllers/getBook");

const Routers = (server) => {
	server.route({
		method: "GET",
		path: "/",
		handler: getBook,
	});

	server.route({
		method: "POST",
		path: "/api/note",
		handler: async (request, h) => {
			let info = request.payload;
			console.log(info);
			return info;
		},
	});

	server.route({
		method: "GET",
		path: "/api/notes",
		handler: async (request, h) => {
			let params = request.query;
			return h.response(params);
		},
	});

	server.route({
		method: "PUT",
		path: "/api/note/{id}",
		handler: async (request, h) => {
			let params = request.params.id;
			let info = request.payload;
			return h.response(info);
		},
	});

	server.route({
		method: "DELETE",
		path: "/api/note/{id}",
		handler: async (request, h) => {
			let params = request.params.id;
			return h.response(params);
		},
	});
	return server;
};

module.exports = { Routers };
