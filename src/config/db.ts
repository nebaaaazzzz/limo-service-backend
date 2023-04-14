import { PrismaClient } from "@prisma/client";
import { Client } from "pg";
const prisma = new PrismaClient();
const client = new Client();
(async () => {
  await client.connect();
})();
export const { user: User, blog: Blog, book: Book, car: Car } = prisma;
export default prisma;
