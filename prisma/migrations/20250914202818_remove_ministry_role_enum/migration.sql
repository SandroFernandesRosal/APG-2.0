/*
  Warnings:

  - The `ministryRole` column on the `Testemunho` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ministryRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role` on the `Agenda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `Ministerio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `New` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ministerio" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "New" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Testemunho" DROP COLUMN "ministryRole",
ADD COLUMN     "ministryRole" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ministryRole",
ADD COLUMN     "ministryRole" TEXT;

-- DropEnum
DROP TYPE "MinistryRole";
