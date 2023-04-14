"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("./config/multer"));
const path_1 = __importDefault(require("path"));
const blog_controller_1 = require("./controller/blog.controller");
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
app.use(express_1.default.static(path_1.default.join("uploads")));
app.use(express_1.default.json());
const uploads = multer_1.default.single("img");
app.route("blog").post(blog_controller_1.postBlog).get(blog_controller_1.getBlog);
app.post("/book", async (req, res) => {
    console.log(req.body);
    res.send("hello");
});
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
//global error handler
app.use((err, req, res, next) => {
    res.send("");
});
