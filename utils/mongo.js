import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedAdmin } from "../models/user.model.js";

dotenv.config();

const db_uri = process.env.ATLAS_URI;

if (!db_uri) {
  console.error("MongoDB connection string is missing.");
  process.exit(1);
}

mongoose
  .connect(db_uri, {
    dbName: "tarkhineh-v1",
  })
  .then(() => {
    console.log(`connected to mongo successfully!`);
    seedAdmin();
  })
  .catch((error) => {
    console.log("error in connect mongo => ", error);
  });

export const mongoose_client = mongoose;
