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
    generateToken: function() {
        return generateToken;
    },
    verifyToken: function() {
        return verifyToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function generateToken(user) {
    return _jsonwebtoken.default.sign({
        sub: user.id,
        exp: Math.floor(Date.now() / 1000) + 6000000 * 60
    }, "secret");
}
async function verifyToken(token) {
    return _jsonwebtoken.default.verify(token, "secret");
}
