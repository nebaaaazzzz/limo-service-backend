/*
  Warnings:

  - You are about to drop the column `published` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `checked` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `published`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `checked`,
    ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Vehicle` MODIFY `type` ENUM('SUV', 'BUS', 'VAN', 'SEDAN') NOT NULL;
