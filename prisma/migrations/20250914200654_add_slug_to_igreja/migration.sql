/*
  Warnings:

  - You are about to drop the column `codigo` on the `Igreja` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Igreja` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Igreja` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Igreja_codigo_key";

-- AlterTable
ALTER TABLE "Igreja" ADD COLUMN "slug" TEXT;

-- Atualizar slugs das igrejas existentes
UPDATE "Igreja" SET "slug" = 'vila-da-penha' WHERE "codigo" = 'VILADAPENHA';
UPDATE "Igreja" SET "slug" = 'tomazinho' WHERE "codigo" = 'TOMAZINHO';
UPDATE "Igreja" SET "slug" = 'vila-maria-helena' WHERE "codigo" = 'MARIAHELENA';

-- AlterTable - remover codigo e tornar slug obrigatório
ALTER TABLE "Igreja" DROP COLUMN "codigo",
ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_slug_key" ON "Igreja"("slug");
