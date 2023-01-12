"use strict";

const Hapi = require("@hapi/hapi");
const { Routers } = require("./apps/routers");

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: "localhost",
	});

	const App = Routers(server);
	await App.start();
	console.log("Server running on " + App.info.uri);
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
