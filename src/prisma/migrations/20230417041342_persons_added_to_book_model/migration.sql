/*
  Warnings:

  - Added the required column `personCount` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` ADD COLUMN `personCount` VARCHAR(191) NOT NULL;
