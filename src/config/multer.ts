import multer from "multer";
import { FileFilterCallback } from "multer";
import { Request } from "express";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //TODO : add file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  callback(null, false);

  // To accept the file pass `true`, like so:
  callback(null, true);

  // You can always pass an error if something goes wrong:
  callback(new Error("I don't have a clue!"));
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100000000, //100 MB
    files: 1,
    parts: 1, //file + fields
    fieldSize: 0, //no fields
  },
});
export default upload;
