/*
  Warnings:

  - You are about to drop the column `authorId` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `email` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_authorId_fkey`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `authorId`;

-- AlterTable
ALTER TABLE `Book` ADD COLUMN `email` VARCHAR(191) NOT NULL;
