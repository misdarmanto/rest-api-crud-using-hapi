const { BookModel } = require("../models/books");
const { getDefaultModel } = require("../models/default");

let BooksDB = [];

const createBook = (req, res) => {
	const body = req.payload;
	if (!("name" in body)) {
		const response = {
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		};
		return res.response(response).code(400);
	}

	if (body.readPage > body.pageCount) {
		const response = {
			status: "fail",
			message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		};
		return res.response(response).code(400);
	}

	try {
		Object.assign(BookModel, body);
		const data = { ...getDefaultModel(), ...BookModel };

		if (body.readPage === body.pageCount) {
			data.finished = true;
			data.reading = true;
		}

		BooksDB.push(data);
		const response = {
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: { bookId: data.id },
		};
		return res.response(response).code(201);
	} catch (error) {
		const response = {
			status: "error",
			message: "Buku gagal ditambahkan",
		};
		return res.response(response).code(500);
	}
};

const getBooks = (req, res) => {
	try {
		if ("reading" in req.query) {
			let booksWithReadingStatus = [];
			if (+req.query.reading === 1) {
				booksWithReadingStatus = BooksDB.filter((book) => book.reading === true);
			}

			if (+req.query.reading === 0) {
				booksWithReadingStatus = BooksDB.filter((book) => book.reading === false);
			}

			const response = {
				status: "success",
				data: { books: booksWithReadingStatus },
			};
			return res.response(response).code(200);
		}

		if ("finished" in req.query) {
			let booksWithFinishReading = [];
			if (+req.query.finished === 1) {
				booksWithFinishReading = BooksDB.filter((book) => book.finished === true);
			}

			if (+req.query.finished === 0) {
				booksWithFinishReading = BooksDB.filter((book) => book.finished === false);
			}

			const response = {
				status: "success",
				data: { books: booksWithFinishReading },
			};
			return res.response(response).code(200);
		}

		if ("name" in req.query) {
			const booksWithSpecificName = BooksDB.filter((book) => {
				const bookName = req.query.name.toUpperCase();
				if (book.name.toUpperCase().search(bookName) !== -1) return book;
			});

			const response = {
				status: "success",
				data: {
					books: booksWithSpecificName,
				},
			};
			return res.response(response).code(200);
		}

		const responseData = BooksDB.map((book) => {
			return { id: book.id, name: book.name, publisher: book.publisher };
		});

		const response = {
			status: "success",
			data: { books: responseData },
		};

		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal mengambil buku",
		};
		return res.response(response).code(500);
	}
};

const getBook = (req, res) => {
	try {
		const book = BooksDB.find((book) => book.id === req.params.id);

		if (book === undefined) {
			const response = {
				status: "fail",
				message: "Buku tidak ditemukan",
			};
			return res.response(response).code(404);
		}

		const response = {
			status: "success",
			data: { book: book },
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal mengambil buku",
		};
		return res.response(response).code(500);
	}
};

const updateBook = (req, res) => {
	const body = req.payload;
	if (!("name" in body)) {
		const response = {
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

		const updatedAt = new Date().toISOString();
		body.updatedAt = updatedAt;
		BooksDB[bookId] = { ...BooksDB[bookId], ...body };

		const response = {
			status: "success",
			message: "Buku berhasil diperbarui",
		};
		return res.response(response).code(200);
	} catch (error) {
		const response = {
			status: "error",
			message: "gagal memperbaharui buku",
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
			message: "gagal menghapus buku",
		};
		return res.response(response).code(500);
	}
};

module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };
