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
const _passportlocal = require("passport-local");
const _db = require("./db");
const _bcrypt = require("bcrypt");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _default(passport) {
    passport.use(new _passportlocal.Strategy({
        usernameField: "email",
        session: false
    }, async function verify(email, password, cb) {
        try {
            const user = await _db.User.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                return cb(new _CustomeError.default("user not found.", 404), false, {
                    message: "user not found"
                });
            }
            const valid = await (0, _bcrypt.compare)(password, user.password);
            if (!valid) {
                return cb(new _CustomeError.default("Incorrect username or password.", 400), false);
            }
            let temp = user;
            temp.password = "";
            return cb(null, user);
        } catch (err) {
            cb(err);
        }
    }));
}
