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
const _blogcontroller = require("../controller/blog.controller");
const _error = require("../util/error");
const _auth = require("../util/auth");
const router = (0, _express.Router)();
router.route("/").post((0, _error.catchAsync)(_auth.isAuth), _blogcontroller.postBlog).get(_blogcontroller.getBlogs);
router.route("/:id").delete((0, _error.catchAsync)(_auth.isAuth), _blogcontroller.deleteBlog).patch((0, _error.catchAsync)(_auth.isAuth), _blogcontroller.updateBlog).get(_blogcontroller.getBlog);
const _default = router;
