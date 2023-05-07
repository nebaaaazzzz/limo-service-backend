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
    userUpdateschema: function() {
        return userUpdateschema;
    },
    userChangePasswordSchema: function() {
        return userChangePasswordSchema;
    }
});
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const userUpdateschema = _joi.default.object({
    firstName: _joi.default.string().max(500),
    lastName: _joi.default.string().max(500),
    img: _joi.default.string().max(500),
    email: _joi.default.string().email()
});
const userChangePasswordSchema = _joi.default.object({
    oldPassword: _joi.default.string().required(),
    newPassword: _joi.default.string().required(),
    confirmPassword: _joi.default.string().required().equal(_joi.default.ref("newPassword"))
});
