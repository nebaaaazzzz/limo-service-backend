"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("./config/multer"));
const client_1 = require("@prisma/client");
const blog_schema_1 = __importDefault(require("./schemas/blog.schema"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const { user: User, blog: Blog } = prisma;
// (async () => {
//   await prisma.user.create({
//     data: {
//       email: "neba@gmail.com",
//       lastName: "Daniel",
//       firstName: "Nebiyu",
//       userName: "nebaz",
//       phoneNumber: "+251923989471",
//     },
//   });
// })();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const uploads = multer_1.default.single("img");
app.post("/post-blog", uploads, async function (req, res) {
    try {
        const value = await blog_schema_1.default.validateAsync({
            ...req.body,
            img: req.file?.filename,
        });
        const blog = await Blog.create({
            data: {
                ...value,
                img: req.file?.filename,
                authorId: 1,
            },
        });
        return res.send(blog);
    }
    catch (err) {
        if (req.file?.filename) {
            await (0, promises_1.rm)(path_1.default.join(__dirname, "./uploads/", req.file?.filename));
        }
        res.send(err);
    }
});
app.get("/blogs", async (req, res) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const results = await Blog.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });
    res.send(results);
});
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
