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
const _commentcontroller = require("../controller/comment.controller");
const _error = require("../util/error");
const _auth = require("../util/auth");
const router = (0, _express.Router)();
router.get("/:blogId", _commentcontroller.getComments);
router.post("/", _commentcontroller.postComment);
router.route("/:id").delete((0, _error.catchAsync)(_auth.isAuth), _commentcontroller.deleteComment).get(_commentcontroller.getComment);
const _default = router;
