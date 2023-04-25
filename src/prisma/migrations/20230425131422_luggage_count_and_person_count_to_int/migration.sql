/*
  Warnings:

  - You are about to alter the column `luggageCount` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `personCount` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `luggageCount` INTEGER NOT NULL,
    MODIFY `personCount` INTEGER NOT NULL;
