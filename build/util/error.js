"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
const globalErrorHandler = (err, // | MulterError,
req, res, next) => {
    if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send("Something went wrong");
    }
};
exports.globalErrorHandler = globalErrorHandler;
