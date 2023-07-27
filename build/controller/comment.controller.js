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
    getComment: function() {
        return getComment;
    },
    deleteComment: function() {
        return deleteComment;
    }
});
const _commentschema = require("../validation_schemas/comment.schema");
const _db = require("../config/db");
const _error = require("../util/error");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
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
    const results = await _db.Comment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc"
        },
        where: {
            blogId: req?.params?.blogId
        }
    });
    res.send(results);
});
const getComment = (0, _error.catchAsync)(async (req, res, next)=>{
    const commentId = req.params.id;
    const comment = await _db.Comment.findUnique({
        where: {
            id: commentId
        }
    });
    if (!comment) {
        return next(new _CustomeError.default("Comment not found", 404));
    }
    res.send(comment);
});
const deleteComment = (0, _error.catchAsync)(async (req, res, next)=>{
    const commentID = req.params.id;
    const comment = await _db.Comment.findUnique({
        where: {
            id: commentID
        }
    });
    if (!comment) {
        return next(new _CustomeError.default("Comment not found", 404));
    }
    await _db.Comment.delete({
        where: {
            id: commentID
        }
    });
    res.send("Comment deleted");
});
