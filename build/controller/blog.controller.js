"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.deleteBlog = exports.getBlog = exports.getBlogs = exports.postBlog = void 0;
const promises_1 = require("fs/promises");
const blog_schema_1 = require("../schemas/blog.schema");
const multer_1 = __importDefault(require("../config/multer"));
const db_1 = require("../config/db");
const path_1 = __importDefault(require("path"));
const error_1 = require("../util/error");
const uploads = multer_1.default.single("img");
exports.postBlog = [
    uploads,
    async (req, res, next) => {
        try {
            const value = await blog_schema_1.BlogPostschema.validateAsync({
                ...req.body,
                img: req.file?.filename,
            });
            const blog = await db_1.Blog.create({
                data: {
                    ...value,
                    img: req.file?.filename,
                    authorId: 1, //FIXME: get the author id from the token
                },
            });
            return res.send(blog);
        }
        catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, promises_1.rm)(path_1.default.join(__dirname, "./uploads/", req.file?.filename));
            }
            next(err);
        }
    },
];
exports.getBlogs = (0, error_1.catchAsync)(async (req, res, next) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await db_1.Blog.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });
    res.send(results);
});
exports.getBlog = (0, error_1.catchAsync)(async (req, res, next) => {
    const blogId = Number(req.params.id);
    const blog = await db_1.Blog.findUnique({
        where: {
            id: blogId,
        },
    });
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    res.send(blog);
});
exports.deleteBlog = (0, error_1.catchAsync)(async (req, res, next) => {
    const blogId = Number(req.params.id);
    const blog = await db_1.Blog.findUnique({
        where: {
            id: blogId,
        },
    });
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    await db_1.Blog.delete({
        where: {
            id: blogId,
        },
    });
    res.send("Blog deleted");
});
exports.updateBlog = (0, error_1.catchAsync)(async (req, res, next) => {
    const blogId = Number(req.params.id);
    const blog = await db_1.Blog.findUnique({
        where: {
            id: blogId,
        },
    });
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    //FIXME: add image if uploaded
    const value = await blog_schema_1.BlogUpdateschema.validateAsync(req.body);
    const updatedBlog = await db_1.Blog.update({
        where: {
            id: blogId,
        },
        data: value,
    });
    res.send(updatedBlog);
});
