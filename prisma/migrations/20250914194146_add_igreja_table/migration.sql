-- AlterTable
ALTER TABLE "Agenda" ADD COLUMN     "igrejaId" TEXT;

-- AlterTable
ALTER TABLE "Ministerio" ADD COLUMN     "igrejaId" TEXT;

-- AlterTable
ALTER TABLE "New" ADD COLUMN     "igrejaId" TEXT;

-- AlterTable
ALTER TABLE "Testemunho" ADD COLUMN     "igrejaId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "igrejaId" TEXT;

-- CreateTable
CREATE TABLE "Igreja" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Igreja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleReadingPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "chaptersPerDay" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleReadingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleReadChapter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BibleReadChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleReadVerse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BibleReadVerse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Igreja_codigo_key" ON "Igreja"("codigo");

-- CreateIndex
CREATE INDEX "BibleReadingPlan_userId_idx" ON "BibleReadingPlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BibleReadingPlan_userId_key" ON "BibleReadingPlan"("userId");

-- CreateIndex
CREATE INDEX "BibleReadChapter_userId_idx" ON "BibleReadChapter"("userId");

-- CreateIndex
CREATE INDEX "BibleReadChapter_readAt_idx" ON "BibleReadChapter"("readAt");

-- CreateIndex
CREATE UNIQUE INDEX "BibleReadChapter_userId_bookName_chapter_key" ON "BibleReadChapter"("userId", "bookName", "chapter");

-- CreateIndex
CREATE INDEX "BibleReadVerse_userId_idx" ON "BibleReadVerse"("userId");

-- CreateIndex
CREATE INDEX "BibleReadVerse_readAt_idx" ON "BibleReadVerse"("readAt");

-- CreateIndex
CREATE UNIQUE INDEX "BibleReadVerse_userId_bookName_chapter_verse_key" ON "BibleReadVerse"("userId", "bookName", "chapter", "verse");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "New" ADD CONSTRAINT "New_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ministerio" ADD CONSTRAINT "Ministerio_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testemunho" ADD CONSTRAINT "Testemunho_igrejaId_fkey" FOREIGN KEY ("igrejaId") REFERENCES "Igreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleReadingPlan" ADD CONSTRAINT "BibleReadingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleReadChapter" ADD CONSTRAINT "BibleReadChapter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleReadVerse" ADD CONSTRAINT "BibleReadVerse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
