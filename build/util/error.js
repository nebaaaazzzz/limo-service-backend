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
    catchAsync: function() {
        return catchAsync;
    },
    globalErrorHandler: function() {
        return globalErrorHandler;
    }
});
const _jsonwebtoken = require("jsonwebtoken");
const _joi = require("joi");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("./CustomeError"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const catchAsync = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).catch(next);
    };
};
const globalErrorHandler = (err, req, res, next)=>{
    /** errors related to JWT */ if (err instanceof _jsonwebtoken.JsonWebTokenError) {
        /*
      'invalid token' - the header or payload could not be parsed
      'jwt malformed' - the token does not have three components (delimited by a .)
      'jwt signature is required'
      'invalid signature'
      'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
      'jwt issuer invalid. expected: [OPTIONS ISSUER]'
      'jwt id invalid. expected: [OPTIONS JWT ID]'
      'jwt subject invalid. expected: [OPTIONS SUBJECT]'
    */ return res.status(401).send({
            success: false,
            message: err.message
        });
    }
    if (err instanceof _jsonwebtoken.TokenExpiredError) {
        return res.status(401).send({
            success: false,
            message: err.message
        });
    }
    if (err instanceof _jsonwebtoken.NotBeforeError) {
        // Thrown if current time is before the nbf claim.
        return res.status(401).send({
            success: false,
            message: err.message
        });
    }
    if (err instanceof _CustomeError.default) {
        return res.status(err.statusCode).send({
            success: false,
            message: err.message
        });
    }
    if (err instanceof _joi.ValidationError) {
        return res.status(400).send(err.message);
    }
    // console.log();
    return res.status(400).send(err.message);
};
