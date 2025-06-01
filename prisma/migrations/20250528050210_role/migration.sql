/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AgendaCaxias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgendaTomazinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MinisterioCaxias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MinisterioTomazinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewCaxias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewTomazinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Novatabela` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetTokenIgreja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshTokenIgreja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserIgreja` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Ministerio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `New` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBRO');

-- CreateEnum
CREATE TYPE "MinistryRole" AS ENUM ('VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA');

-- DropForeignKey
ALTER TABLE "AgendaCaxias" DROP CONSTRAINT "AgendaCaxias_userId_fkey";

-- DropForeignKey
ALTER TABLE "AgendaTomazinho" DROP CONSTRAINT "AgendaTomazinho_userId_fkey";

-- DropForeignKey
ALTER TABLE "MinisterioCaxias" DROP CONSTRAINT "MinisterioCaxias_userId_fkey";

-- DropForeignKey
ALTER TABLE "MinisterioTomazinho" DROP CONSTRAINT "MinisterioTomazinho_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewCaxias" DROP CONSTRAINT "NewCaxias_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewTomazinho" DROP CONSTRAINT "NewTomazinho_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetTokenIgreja" DROP CONSTRAINT "PasswordResetTokenIgreja_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshTokenIgreja" DROP CONSTRAINT "RefreshTokenIgreja_userId_fkey";

-- DropForeignKey
ALTER TABLE "Testemunho" DROP CONSTRAINT "Testemunho_userId_fkey";

-- AlterTable
ALTER TABLE "Agenda" ADD COLUMN     "role" "MinistryRole" NOT NULL;

-- AlterTable
ALTER TABLE "Ministerio" ADD COLUMN     "role" "MinistryRole" NOT NULL;

-- AlterTable
ALTER TABLE "New" ADD COLUMN     "role" "MinistryRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "passwordResetToken",
DROP COLUMN "token",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MEMBRO';

-- DropTable
DROP TABLE "AgendaCaxias";

-- DropTable
DROP TABLE "AgendaTomazinho";

-- DropTable
DROP TABLE "MinisterioCaxias";

-- DropTable
DROP TABLE "MinisterioTomazinho";

-- DropTable
DROP TABLE "NewCaxias";

-- DropTable
DROP TABLE "NewTomazinho";

-- DropTable
DROP TABLE "Novatabela";

-- DropTable
DROP TABLE "PasswordResetTokenIgreja";

-- DropTable
DROP TABLE "RefreshTokenIgreja";

-- DropTable
DROP TABLE "UserIgreja";

-- AddForeignKey
ALTER TABLE "Testemunho" ADD CONSTRAINT "Testemunho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
