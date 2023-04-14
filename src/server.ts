import express, { NextFunction, Request, Response } from "express";
import path from "path";
import {
  deleteBlog,
  getBlogs,
  postBlog,
  getBlog,
  updateBlog,
} from "./controller/blog.controller";
import {
  deleteReservation,
  getReservations,
  postReservation,
  getReservation,
  updateReservation,
} from "./controller/book.controller";
import { MulterError } from "multer";
import { globalErrorHandler } from "./util/error";
import {
  deleteCar,
  getCar,
  getCars,
  postCar,
  updateCar,
} from "./controller/car.controller";

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
const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.route("blog").post(postBlog).get(getBlogs);
app.route("blog/:id").delete(deleteBlog).patch(updateBlog).get(getBlog);

app.route("book").post(postReservation).get(getReservations);
app
  .route("book/:id")
  .delete(deleteReservation)
  .patch(updateReservation)
  .get(getReservation);

app.route("car").post(postCar).get(getCars);
app.route("car/:id").delete(deleteCar).patch(updateCar).get(getCar);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

//global error handler
app.use(globalErrorHandler);
