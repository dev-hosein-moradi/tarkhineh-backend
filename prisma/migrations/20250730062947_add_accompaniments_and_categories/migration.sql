-- CreateTable
CREATE TABLE "Accompaniment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accompaniment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccompanimentCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccompanimentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccompanimentCategory_name_key" ON "AccompanimentCategory"("name");

-- AddForeignKey
ALTER TABLE "Accompaniment" ADD CONSTRAINT "Accompaniment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AccompanimentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
