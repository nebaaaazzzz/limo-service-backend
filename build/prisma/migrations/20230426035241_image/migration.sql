/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `phoneNumber`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL DEFAULT '';
