"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentPostschema", {
    enumerable: true,
    get: function() {
        return CommentPostschema;
    }
});
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const CommentPostschema = _joi.default.object({
    fullName: _joi.default.string().required(),
    email: _joi.default.string().email().required(),
    comment: _joi.default.string().required(),
    vehicleId: _joi.default.string()
});
