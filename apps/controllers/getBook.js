const { BookModel } = require("../models/books");
const { responseData } = require("../utilities/responseStatus");

const getBook = (req, res) => {
	responseData.data = BookModel;
	return responseData;
};

module.exports = { getBook };
