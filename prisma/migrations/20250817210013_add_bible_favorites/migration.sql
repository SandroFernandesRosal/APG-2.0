-- CreateTable
CREATE TABLE "BibleFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BibleFavorite_userId_idx" ON "BibleFavorite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BibleFavorite_userId_bookName_chapter_verse_key" ON "BibleFavorite"("userId", "bookName", "chapter", "verse");

-- AddForeignKey
ALTER TABLE "BibleFavorite" ADD CONSTRAINT "BibleFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
