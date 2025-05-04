/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "New" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "NewCaxias" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "NewTomazinho" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ALTER COLUMN "isAdmin" SET DEFAULT true;

-- DropEnum
DROP TYPE "Role";
