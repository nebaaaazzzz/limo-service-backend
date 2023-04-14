"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservation = exports.deleteReservation = exports.getReservation = exports.getReservations = exports.postReservation = void 0;
const book_schema_1 = require("../schemas/book.schema");
const db_1 = require("../config/db");
const error_1 = require("../util/error");
exports.postReservation = (0, error_1.catchAsync)(async (req, res, next) => {
    const value = await book_schema_1.BookPostschema.validateAsync(req.body);
    const book = await db_1.Book.create({
        data: value,
    });
    return res.status(201).send(book);
});
exports.getReservations = (0, error_1.catchAsync)(async (req, res, next) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await db_1.Book.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });
    res.send(results);
});
exports.getReservation = (0, error_1.catchAsync)(async (req, res, next) => {
    const bookId = Number(req.params.id);
    const blog = await db_1.Book.findUnique({
        where: {
            id: bookId,
        },
    });
    if (!blog) {
        return res.status(404).send("reservation not found");
    }
    res.send(blog);
});
exports.deleteReservation = (0, error_1.catchAsync)(async (req, res, next) => {
    const bookId = Number(req.params.id);
    const blog = await db_1.Book.findUnique({
        where: {
            id: bookId,
        },
    });
    if (!blog) {
        return res.status(404).send("reservation not found");
    }
    await db_1.Book.delete({
        where: {
            id: bookId,
        },
    });
    res.send("Blog deleted");
});
exports.updateReservation = (0, error_1.catchAsync)(async (req, res, next) => {
    const bookId = Number(req.params.id);
    const blog = await db_1.Book.findUnique({
        where: {
            id: bookId,
        },
    });
    if (!blog) {
        return res.status(404).send("reservation not found");
    }
    const value = await book_schema_1.BookUpdateschema.validateAsync(req.body);
    const updatedBlog = await db_1.Book.update({
        where: {
            id: bookId,
        },
        data: value,
    });
    res.send(updatedBlog);
});
