"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _multer = /*#__PURE__*/ _interop_require_default(require("multer"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const storage = _multer.default.diskStorage({
    destination: function(req, file, cb) {
        cb(null, _path.default.join(__dirname, "../uploads/"));
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + _path.default.extname(file.originalname));
    }
});
function fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
}
const upload = (0, _multer.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100000000,
        files: 1,
        fields: 20
    }
});
const _default = upload;
