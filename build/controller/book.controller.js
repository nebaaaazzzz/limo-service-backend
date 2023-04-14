"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = exports.postBlog = void 0;
const promises_1 = require("fs/promises");
const blog_schema_1 = __importDefault(require("../schemas/blog.schema"));
const multer_1 = __importDefault(require("../config/multer"));
const db_1 = require("../config/db");
const path_1 = __importDefault(require("path"));
const uploads = multer_1.default.single("img");
const postBlog = async (req, res, next) => {
    try {
        const value = await blog_schema_1.default.validateAsync({
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
};
exports.postBlog = postBlog;
const getBlog = async (req, res, next) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await db_1.Blog.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });
    res.send(results);
};
exports.getBlog = getBlog;
