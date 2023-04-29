import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const {
  user: User,
  blog: Blog,
  book: Book,
  vehicle: Vehicle,
  comment: Comment,
} = prisma;

export default prisma;
