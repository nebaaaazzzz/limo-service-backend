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
import router from "./routes/index.routes";

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

app.use(router);
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

//global error handler
app.use(globalErrorHandler);
