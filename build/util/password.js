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
    hashPassword: function() {
        return hashPassword;
    },
    comparePassword: function() {
        return comparePassword;
    }
});
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function hashPassword(password) {
    const hash = await _bcrypt.default.hash(password, 10);
    return hash;
}
async function comparePassword(password, hash) {
    const isCorrect = await _bcrypt.default.compare(password, hash);
    return isCorrect;
}
