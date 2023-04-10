/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_userId_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "telegramId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
