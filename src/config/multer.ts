import multer from "multer";
import { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (file.mimetype.startsWith("image/")) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100000000, //100 MB
    files: 1,
    fields: 20,
  },
});
export default upload;
