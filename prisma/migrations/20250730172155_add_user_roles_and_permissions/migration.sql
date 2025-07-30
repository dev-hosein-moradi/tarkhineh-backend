-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'staff', 'branchManager', 'admin', 'superAdmin');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('MANAGE_FOODS', 'VIEW_FOODS', 'MANAGE_BRANCHES', 'VIEW_BRANCHES', 'MANAGE_OWN_BRANCH', 'MANAGE_ORDERS', 'VIEW_ORDERS', 'MANAGE_BRANCH_ORDERS', 'MANAGE_USERS', 'VIEW_USERS', 'MANAGE_BRANCH_STAFF', 'MANAGE_ACCOMPANIMENTS', 'VIEW_ACCOMPANIMENTS', 'MANAGE_CATEGORIES', 'VIEW_CATEGORIES', 'VIEW_REPORTS', 'VIEW_BRANCH_REPORTS', 'MANAGE_SYSTEM_SETTINGS', 'MANAGE_CARTS', 'VIEW_CARTS');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserType" ADD VALUE 'manager';
ALTER TYPE "UserType" ADD VALUE 'staff';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'customer';

-- CreateTable
CREATE TABLE "UserPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" "PermissionType" NOT NULL,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_userId_permission_branchId_key" ON "UserPermission"("userId", "permission", "branchId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
