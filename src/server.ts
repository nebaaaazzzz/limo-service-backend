import express from "express";
import upload from "./config/multer";
import { MulterError } from "multer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
const app = express();
app.use(express.json());

const uploads = upload.single("file");

app.post("/post-blog", async function (req, res) {
  // uploads(req, res, function (err) {
  //   if (err instanceof MulterError) {
  //     // A Multer error occurred when uploading.
  //   } else if (err) {
  //     // An unknown error occurred when uploading.
  //   }
  //   // Everything went fine.
  // });
  const blog = await Blog.create({
    data: {
      content: "hello world",
      img: "a",
      title: "dsa",
      published: true,
      authorId: 1,
    },
  });
  return res.send(blog);
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
