//@ts-nocheck
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
    postBlog: function() {
        return postBlog;
    },
    getBlogs: function() {
        return getBlogs;
    },
    getBlog: function() {
        return getBlog;
    },
    deleteBlog: function() {
        return deleteBlog;
    },
    updateBlog: function() {
        return updateBlog;
    }
});
const _promises = require("fs/promises");
const _blogschema = require("../validation_schemas/blog.schema");
const _multer = /*#__PURE__*/ _interop_require_default(require("../config/multer"));
const _db = require("../config/db");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _error = require("../util/error");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
const _cloudinary = /*#__PURE__*/ _interop_require_default(require("../config/cloudinary"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const uploads = _multer.default.single("img");
const postBlog = [
    uploads,
    async (req, res, next)=>{
        try {
            const value = await _blogschema.BlogPostschema.validateAsync({
                ...req.body,
                img: req.file?.filename
            });
            const publicId = await (0, _cloudinary.default)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            const blog = await _db.Blog.create({
                data: {
                    userId: req.user?.id,
                    ...value,
                    img: publicId
                }
            });
            return res.send(blog);
        } catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, _promises.rm)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    }
];
const getBlogs = (0, _error.catchAsync)(async (req, res, next)=>{
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 6;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await _db.Blog.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(results);
});
const getBlog = (0, _error.catchAsync)(async (req, res, next)=>{
    const blogId = req.params.id;
    const blog = await _db.Blog.findUnique({
        include: {
            user: true
        },
        where: {
            id: blogId
        }
    });
    if (!blog) {
        return next(new _CustomeError.default("blog not found", 404));
    }
    res.send(blog);
});
const deleteBlog = (0, _error.catchAsync)(async (req, res, next)=>{
    const blogId = req.params.id;
    const blog = await _db.Blog.findUnique({
        where: {
            id: blogId
        }
    });
    if (!blog) {
        return next(new _CustomeError.default("blog not found", 404));
    }
    await _db.Blog.delete({
        //TODO delete file
        where: {
            id: blogId
        }
    });
    res.send("Blog deleted");
});
const updateBlog = [
    uploads,
    async (req, res, next)=>{
        try {
            const blogId = req.params.id;
            const blog = await _db.Blog.findUnique({
                where: {
                    id: blogId
                }
            });
            if (!blog) {
                return next(new _CustomeError.default("blog not found", 404));
            }
            const body = req.body;
            if (req.file) {
                const publicId = await (0, _cloudinary.default)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
                body["img"] = publicId;
            }
            const value = await _blogschema.BlogUpdateschema.validateAsync(body);
            const updatedBlog = await _db.Blog.update({
                where: {
                    id: blogId
                },
                data: value
            });
            res.send(updatedBlog);
        } catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, _promises.rm)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    }
];
