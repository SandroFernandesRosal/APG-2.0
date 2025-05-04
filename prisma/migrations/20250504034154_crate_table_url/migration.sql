/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `New` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `NewCaxias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `NewTomazinho` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `New` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `NewCaxias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `NewTomazinho` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "New" ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "NewCaxias" ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "NewTomazinho" ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "New_url_key" ON "New"("url");

-- CreateIndex
CREATE UNIQUE INDEX "NewCaxias_url_key" ON "NewCaxias"("url");

-- CreateIndex
CREATE UNIQUE INDEX "NewTomazinho_url_key" ON "NewTomazinho"("url");
