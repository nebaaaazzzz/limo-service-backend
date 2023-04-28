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
const _express = require("express");
const _passport = /*#__PURE__*/ _interop_require_default(require("passport"));
const _token = require("../util/token");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
router.post("/login", _passport.default.authenticate("local", {
    session: false
}), async function(req, res) {
    const token = await (0, _token.generateToken)(req.user);
    return res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none"
    }).send({
        data: {
            message: "succeeessfuly loggedIn"
        }
    });
});
router.post("/logout", async function(req, res) {
    return res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).send({
        data: {
            message: "succeeessfuly loggedIn"
        }
    });
});
const _default = router;
