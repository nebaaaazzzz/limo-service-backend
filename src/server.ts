import express, { NextFunction, Request, Response } from "express";
import path from "path";
import router from "./routes/index.routes";
import { globalErrorHandler } from "./util/error";
import rateLimit from "express-rate-limit";
import cors from "cors";
import passportLocal from "./config/passport-local";
import cookieParser from "cookie-parser";
import passport from "passport";
import { verifyToken } from "./util/token";
import { User } from "./config/db";
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.use(
  cors({
    credentials: true,
    origin: [
      "https://limo-admin.onrender.com",
      "https://seattle-limo.onrender.com",
    ],
  })
);
app.use(cookieParser());
app.use(passport.initialize({}));
app.use(router);
app.use(rateLimit());
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
passportLocal(passport);
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
