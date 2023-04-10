/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userId` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `isPhone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `telegramId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_userId_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isPhone" BOOLEAN NOT NULL,
ADD COLUMN     "lastName" TEXT,
DROP COLUMN "telegramId",
ADD COLUMN     "telegramId" INTEGER NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "userName" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
