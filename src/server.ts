import express, { NextFunction, Request, Response } from "express";
import upload from "./config/multer";
import path from "path";
import { getBlog, postBlog } from "./controller/blog.controller";

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
app.use(express.static(path.join("uploads")));
app.use(express.json());
const uploads = upload.single("img");

app.route("blog").post(postBlog).get(getBlog);
app.post("/book", async (req, res) => {
  console.log(req.body);
  res.send("hello");
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

//global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.send("");
});
