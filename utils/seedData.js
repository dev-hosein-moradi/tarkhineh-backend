import { PrismaClient } from "@prisma/client";
import { generatePasswordHash } from "../helpers/hash.js";

import { agencyData, branchFood, foodCategory } from "../constants/index.js";
import models from "../models/index.js";

const prisma = new PrismaClient();

const { BranchModel, FoodModel, CategoryModel } = models;

export const seedAgencyData = async () => {
  try {
    const data = await BranchModel.insertMany(agencyData);
    console.log(
      `Agency data seeded successfully! Inserted ${data.length} records.`
    );
  } catch (error) {
    console.error("Error seeding agency data:", error);
  }
};

export const seedFoodData = async () => {
  try {
    const data = await FoodModel.insertMany(branchFood);
    console.log(
      `Food data seeded successfully! Inserted ${data.length} records.`
    );
  } catch (error) {
    console.error("Error seeding food data:", error);
  }
};

export const seedCategoryData = async () => {
  try {
    const data = await CategoryModel.insertMany(foodCategory);
    console.log(
      `Category data seeded successfully! Inserted ${data.length} records.`
    );
  } catch (error) {
    console.error("Error seeding category data:", error);
  }
};

// ایجاد کاربر با هش کردن پسورد
async function createUser(data) {
  const hashedPassword = await generatePasswordHash(data.password);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

// بروزرسانی کاربر با هش کردن پسورد در صورت تغییر
async function updateUser(id, data) {
  const updateData = { ...data };
  if (data.password) {
    updateData.password = await generatePasswordHash(data.password);
  }
  return prisma.user.update({
    where: { id },
    data: updateData,
  });
}

// ساخت ادمین در صورت عدم وجود
export async function seedAdmin() {
  try {
    const adminMobile = "09025197379";
    const adminExists = await prisma.user.findUnique({
      where: { mobileNumber: adminMobile },
    });

    if (!adminExists) {
      await createUser({
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        mobileNumber: adminMobile,
        password: "Aa123456", // هش می‌شود داخل createUser
        type: "admin",
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("[SEED_ADMIN_ERROR]", error);
  }
}

export { prisma, createUser, updateUser };
