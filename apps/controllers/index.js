const { BookModel } = require("../models/books");
const { getDefaultModel } = require("../models/default");

let BooksDB = [];

const createBook = (req, res) => {
	const body = req.payload;
	if (!("name" in body)) {
		response = {
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		};
		return res.response(response).code(400);
	}

	try {
		Object.assign(BookModel, body);
		const data = { ...getDefaultModel(), ...BookModel };
		BooksDB.push(data);
		response = {
			bookId: data.id,
			status: "success",
			message: "Buku berhasil ditambahkan",
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "Buku gagal ditambahkan! " + error.message,
		};
		return res.response(response).code(500);
	}
};

const getBooks = (req, res) => {
	try {
		response = {
			status: "success",
			data: BooksDB.map((book) => ({
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			})),
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal mengambil buku !" + error.message,
		};
		return res.response(response).code(500);
	}
};

const getBook = (req, res) => {
	try {
		const book = BooksDB.filter((book) => book.id === req.params.id);

		if (book.length === 0) {
			const response = {
				status: "fail",
				message: "Buku tidak ditemukan",
			};
			return res.response(response).code(404);
		}

		const response = {
			status: "success",
			data: { book },
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal mengambil buku! " + error.message,
		};
		return res.response(response).code(500);
	}
};

const updateBook = (req, res) => {
	const body = req.payload;
	if (!("name" in body)) {
		response = {
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		};
		return res.response(response).code(400);
	}

	if (body.readPage > body.pageCount) {
		const response = {
			status: "fail",
			message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		};

		return res.response(response).code(400);
	}

	try {
		const bookId = BooksDB.findIndex((book) => book.id === req.params.id);

		if (bookId === -1) {
			const response = {
				status: "fail",
				message: "Gagal memperbarui buku. Id tidak ditemukan",
			};

			return res.response(response).code(404);
		}

		BooksDB[bookId] = { ...BooksDB[bookId], ...body };

		const response = {
			status: "success",
			message: "Buku berhasil diperbarui",
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal memperbaharui buku!" + error.message,
		};
		return res.response(response).code(500);
	}
};

const deleteBook = (req, res) => {
	try {
		const checkBook = BooksDB.findIndex((book) => book.id === req.params.id);

		if (checkBook === -1) {
			const response = {
				status: "fail",
				message: "Buku gagal dihapus. Id tidak ditemukan",
			};
			return res.response(response).code(404);
		}
		const newBooks = BooksDB.filter((book) => book.id !== req.params.id);
		BooksDB = newBooks;
		const response = {
			status: "success",
			message: "Buku berhasil dihapus",
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal menghapus buku! " + error.message,
		};
		return res.response(response).code(500);
	}
};

module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };
