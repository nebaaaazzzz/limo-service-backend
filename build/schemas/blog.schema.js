"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Blogschema = joi_1.default.object({
    title: joi_1.default.string().max(50).required(),
    img: joi_1.default.string().required(),
    content: joi_1.default.string().max(1000).required(),
    published: joi_1.default.boolean().required(),
});
exports.default = Blogschema;
