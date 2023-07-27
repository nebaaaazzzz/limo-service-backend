"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    postReservation: function() {
        return postReservation;
    },
    getReservations: function() {
        return getReservations;
    },
    getReservation: function() {
        return getReservation;
    },
    deleteReservation: function() {
        return deleteReservation;
    },
    updateReservation: function() {
        return updateReservation;
    }
});
const _bookschema = require("../validation_schemas/book.schema");
const _db = require("../config/db");
const _error = require("../util/error");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const postReservation = (0, _error.catchAsync)(async (req, res, next)=>{
    const value = await _bookschema.BookPostschema.validateAsync(req.body);
    const book = await _db.Book.create({
        data: value
    });
    return res.status(201).send(book);
});
const getReservations = (0, _error.catchAsync)(async (req, res, next)=>{
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 10;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await _db.Book.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(results);
});
const getReservation = (0, _error.catchAsync)(async (req, res, next)=>{
    const bookId = req.params.id;
    const book = await _db.Book.findUnique({
        where: {
            id: bookId
        },
        include: {
            vehicle: true
        }
    });
    if (!book) {
        return next(new _CustomeError.default("reservation not found", 404));
    }
    res.send(book);
});
const deleteReservation = (0, _error.catchAsync)(async (req, res, next)=>{
    const bookId = req.params.id;
    const book = await _db.Book.findUnique({
        where: {
            id: bookId
        }
    });
    if (!book) {
        return next(new _CustomeError.default("reservation not found", 404));
    }
    await _db.Book.delete({
        where: {
            id: bookId
        }
    });
    res.send("reservation deleted");
});
const updateReservation = (0, _error.catchAsync)(async (req, res, next)=>{
    const bookId = req.params.id;
    const book = await _db.Book.findUnique({
        where: {
            id: bookId
        }
    });
    if (!book) {
        return next(new _CustomeError.default("reservation not found", 404));
    }
    const value = await _bookschema.BookUpdateschema.validateAsync(req.body);
    const updatedBook = await _db.Book.update({
        where: {
            id: bookId
        },
        data: value
    });
    res.send(updatedBook);
});
