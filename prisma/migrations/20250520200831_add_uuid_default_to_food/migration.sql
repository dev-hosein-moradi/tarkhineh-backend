-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "DeliverType" AS ENUM ('ONE', 'TWO');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('ONE', 'TWO');

-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT DEFAULT '',
    "lastName" TEXT DEFAULT '',
    "password" TEXT NOT NULL,
    "email" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "foods" JSONB NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'ONE',
    "userAddress" TEXT,
    "price" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "deliverType" "DeliverType" NOT NULL DEFAULT 'ONE',
    "paymentType" "PaymentType" NOT NULL DEFAULT 'ONE',
    "branchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "compounds" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "percentOfDiscount" DOUBLE PRECISION NOT NULL,
    "discountPrice" TEXT NOT NULL,
    "mainPrice" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "numOfScore" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "deliverId" TEXT,
    "branchId" TEXT NOT NULL,
    "price" TEXT,
    "payment" BOOLEAN NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'ONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "ownerFullName" TEXT,
    "ownerNatCode" TEXT,
    "ownerPhone" TEXT,
    "ownerState" TEXT,
    "ownerCity" TEXT,
    "ownerRegion" TEXT,
    "ownerAddress" TEXT,
    "ownerType" TEXT,
    "placeArea" TEXT,
    "placeAge" TEXT,
    "verification" BOOLEAN,
    "kitchen" BOOLEAN,
    "parking" BOOLEAN,
    "store" BOOLEAN,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT,
    "workTime" TEXT NOT NULL,
    "tel" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");
