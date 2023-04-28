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
const _db = require("../config/db");
const _multer = /*#__PURE__*/ _interop_require_default(require("../config/multer"));
const _promises = require("fs/promises");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _userschema = require("../validation_schemas/user.schema");
const _password = require("../util/password");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
const uploads = _multer.default.single("img");
const userPropertiestWithPassword = {
    createdAt: true,
    email: true,
    firstName: true,
    id: true,
    img: true,
    lastName: true,
    updatedAt: true
};
router.patch("/update-profile", [
    uploads,
    async (req, res, next)=>{
        try {
            const user = await _db.User.findUnique({
                where: {
                    id: req.user?.id
                }
            });
            if (!user) {
                return res.status(404).send("user not found");
            }
            const body = req.body;
            if (req.file) {
                body["img"] = req.file?.filename;
            }
            const value = await _userschema.userUpdateschema.validateAsync(body);
            const updatedUser = await _db.User.update({
                where: {
                    id: req.user?.id
                },
                select: userPropertiestWithPassword,
                data: value
            });
            res.send(updatedUser);
        } catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, _promises.rm)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    }
]);
router.patch("/change-password", async (req, res, next)=>{
    try {
        const user = await _db.User.findUnique({
            where: {
                id: req?.user?.id
            }
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const body = req.body;
        const value = await _userschema.userChangePasswordSchema.validateAsync(body);
        if (await (0, _password.comparePassword)(value.oldPassword, user.password) === false) {
            return res.status(400).send("Old password is incorrect");
        }
        const updatedUser = await _db.User.update({
            where: {
                id: req?.user?.id
            },
            select: userPropertiestWithPassword,
            data: {
                password: await (0, _password.hashPassword)(value.newPassword)
            }
        });
        res.send(updatedUser);
    } catch (err) {
        next(err);
    }
});
const _default = router;
