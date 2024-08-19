import { agencyData, branchFood, foodCategory } from "../constants/index.js";
import models from "../models/index.js";

const { BranchModel, FoodModel, CategoryModel } = models;

export const seedAgencyData = async () => {
  try {
    // Insert the new data
    const data = await BranchModel.insertMany(agencyData);

    console.log("Agency data seeded successfully!" + data);
  } catch (error) {
    console.error("Error seeding agency data:", error);
  }
};

export const seedFoodData = async () => {
  try {
    // Insert the new data
    const data = await FoodModel.insertMany(branchFood);

    console.log("food data seeded successfully!" + data);
  } catch (error) {
    console.error("Error seeding food data:", error);
  }
};

export const seedCategoryData = async () => {
  try {
    // Insert the new data
    const data = await CategoryModel.insertMany(foodCategory);

    console.log("category data seeded successfully!" + data);
  } catch (error) {
    console.error("Error seeding category data:", error);
  }
};
