import express from "express";
import upload from "./config/multer";
import { PrismaClient } from "@prisma/client";
import Blogschema from "./schemas/blog.schema";
import { rm } from "fs/promises";
import path from "path";
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

const uploads = upload.single("img");

app.post("/post-blog", uploads, async function (req, res) {
  try {
    const value = await Blogschema.validateAsync({
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
  } catch (err) {
    if (req.file?.filename) {
      await rm(path.join(__dirname, "./uploads/", req.file?.filename));
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
