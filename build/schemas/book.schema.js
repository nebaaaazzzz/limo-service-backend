"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookUpdateschema = exports.BookPostschema = void 0;
const joi_1 = __importDefault(require("joi"));
const BookPostschema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().required().email(),
    from: joi_1.default.string().min(2).required(),
    to: joi_1.default.string().min(2).required(),
    persons: joi_1.default.number().greater(0).required(),
    luggage: joi_1.default.number().greater(-1).required(),
    description: joi_1.default.string(),
});
exports.BookPostschema = BookPostschema;
const BookUpdateschema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50),
    lastName: joi_1.default.string().min(3).max(50),
    email: joi_1.default.string().email(),
    from: joi_1.default.string().min(2),
    to: joi_1.default.string().min(2),
    persons: joi_1.default.number().greater(0),
    luggage: joi_1.default.number().greater(-1),
    description: joi_1.default.string(),
});
exports.BookUpdateschema = BookUpdateschema;
