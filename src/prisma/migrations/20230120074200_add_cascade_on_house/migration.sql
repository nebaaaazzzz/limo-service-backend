-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_userId_fkey";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
