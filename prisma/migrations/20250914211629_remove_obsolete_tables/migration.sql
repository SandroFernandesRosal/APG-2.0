/*
  Warnings:

  - You are about to drop the `Doacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_userId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_userId_fkey";

-- DropTable
DROP TABLE "Doacao";

-- DropTable
DROP TABLE "Endereco";
