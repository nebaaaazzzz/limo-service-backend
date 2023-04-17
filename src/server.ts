import express, { NextFunction, Request, Response } from "express";
import path from "path";
import router from "./routes/index.routes";
import { globalErrorHandler } from "./util/error";
import rateLimit from "express-rate-limit";
import { User } from "./config/db";
// (async () => {
//   await User.create({
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
app.use(rateLimit());
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

//global error handler
app.use(globalErrorHandler);
process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
  // app.close(() => {
  //   process.exit(1);
  // }
  // );
});

process.on("uncaughtException", (err: Error) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
  // app.close(() => {
  //   process.exit(1);

  // });
});
