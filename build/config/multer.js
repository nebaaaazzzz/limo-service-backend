"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp/my-uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        //TODO : add file extension
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    },
});
function fileFilter(req, file, callback) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To reject this file pass `false`, like so:
    callback(null, false);
    // To accept the file pass `true`, like so:
    callback(null, true);
    // You can always pass an error if something goes wrong:
    callback(new Error("I don't have a clue!"));
}
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100000000,
        files: 1,
        parts: 1,
        fieldSize: 0, //no fields
    },
});
exports.default = upload;
