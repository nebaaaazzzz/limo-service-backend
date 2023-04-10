import { PrismaClient } from "@prisma/client";
import { Client } from "pg";
const prisma = new PrismaClient();
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "renthousetelegrambot",
  password: "example",
  port: 5433,
});
(async () => {
  await client.connect();
})();
export { client };
export default prisma;
