/*
  Warnings:

  - You are about to drop the column `role` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Ministerio` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `New` table. All the data in the column will be lost.
  - You are about to drop the column `ministryRole` on the `Testemunho` table. All the data in the column will be lost.
  - You are about to drop the column `ministryRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Ministerio" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "New" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Testemunho" DROP COLUMN "ministryRole";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ministryRole";
