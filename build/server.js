"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const blog_controller_1 = require("./controller/blog.controller");
const book_controller_1 = require("./controller/book.controller");
const error_1 = require("./util/error");
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
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use(express_1.default.json());
app.route("blog").post(blog_controller_1.postBlog).get(blog_controller_1.getBlogs);
app.route("blog/:id").delete(blog_controller_1.deleteBlog).patch(blog_controller_1.updateBlog).get(blog_controller_1.getBlog);
app.route("book").post(book_controller_1.postReservation).get(book_controller_1.getReservations);
app
    .route("book/:id")
    .delete(book_controller_1.deleteReservation)
    .patch(book_controller_1.updateReservation)
    .get(book_controller_1.getReservation);
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
//global error handler
app.use(error_1.globalErrorHandler);
