"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BlogPostschema: function() {
        return BlogPostschema;
    },
    BlogUpdateschema: function() {
        return BlogUpdateschema;
    }
});
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const BlogPostschema = _joi.default.object({
    title: _joi.default.string().required(),
    img: _joi.default.string().required(),
    userId: _joi.default.string(),
    content: _joi.default.any().required()
});
const BlogUpdateschema = _joi.default.object({
    title: _joi.default.string(),
    userId: _joi.default.string(),
    img: _joi.default.string(),
    content: _joi.default.any()
});
