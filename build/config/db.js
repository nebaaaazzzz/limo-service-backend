"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.User = void 0;
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const prisma = new client_1.PrismaClient();
const client = new pg_1.Client();
(async () => {
    await client.connect();
})();
exports.User = prisma.user, exports.Blog = prisma.blog;
exports.default = prisma;
