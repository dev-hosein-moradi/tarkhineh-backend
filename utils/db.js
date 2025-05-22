// utils/prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // اجرای یک کوئری ساده برای تست اتصال
    await prisma.$queryRaw`SELECT 1`;
    console.log("PostgreSQL connected via Prisma");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConnection();

export default prisma;
