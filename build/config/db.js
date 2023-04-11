"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const prisma = new client_1.PrismaClient();
const client = new pg_1.Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "renthousetelegrambot",
    password: "example",
    port: 5433,
});
exports.client = client;
(async () => {
    await client.connect();
})();
exports.default = prisma;
