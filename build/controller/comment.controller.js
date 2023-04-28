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
    postComment: function() {
        return postComment;
    },
    getComments: function() {
        return getComments;
    },
    getReservation: function() {
        return getReservation;
    },
    deleteReservation: function() {
        return deleteReservation;
    }
});
const _db = require("../config/db");
const _error = require("../util/error");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
const _commentschema = require("../validation_schemas/comment.schema");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const postComment = (0, _error.catchAsync)(async (req, res, next)=>{
    const value = await _commentschema.CommentPostschema.validateAsync(req.body);
    const comment = await _db.Comment.create({
        data: value
    });
    return res.status(201).send(comment);
});
const getComments = (0, _error.catchAsync)(async (req, res, next)=>{
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
    const bookId = Number(req.params.id);
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
    const bookId = Number(req.params.id);
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
