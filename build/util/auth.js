"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAuth", {
    enumerable: true,
    get: function() {
        return isAuth;
    }
});
const _db = require("../config/db");
const _token = require("./token");
async function isAuth(req, res, next) {
    const decodedToken = await (0, _token.verifyToken)(req.cookies.token);
    const user = await _db.User.findUniqueOrThrow({
        where: {
            id: decodedToken.sub
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            id: true,
            updatedAt: true,
            img: true,
            createdAt: true
        }
    });
    req.user = user;
    next();
}
