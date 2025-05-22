import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import addUserRouter from "./routes/users.route.js";
import addAuthRouter from "./routes/auth.route.js";
import addFoodRouter from "./routes/food.route.js";
import addBranchRouter from "./routes/branch.route.js";
import addCartRouter from "./routes/cart.route.js";
import addCategoryRouter from "./routes/category.route.js";
import addAddressRouter from "./routes/address.route.js";
import addOrderRouter from "./routes/order.route.js";
import addDateRouter from "./routes/date.route.js";

import prisma from "./utils/prisma.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3001",
  "https://tarkhineh.hosseinmoradi.ir",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `دسترسی از مبدأ ${origin} مجاز نیست.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(morgan("combined"));
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

addAuthRouter(app);
addUserRouter(app);
addFoodRouter(app);
addBranchRouter(app);
addCartRouter(app);
addCategoryRouter(app);
addAddressRouter(app);
addOrderRouter(app);
addDateRouter(app);

app.get("/", (req, res) => {
  res.json({ message: "Server Running Successfully." });
});

async function connectDB(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`; // تست اتصال به DB
      logger.info("Successfuly Connect to PostgreSQL");
      break;
    } catch (error) {
      logger.error(
        `Try number ${i + 1} to connect to PostgreSQL failed.`,
        error
      );
      if (i === retries - 1) {
        logger.error("Try many time but connecting to PostgreSQL failed.");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

connectDB();

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server on: ${PORT} is up and running.`);
  console.log(`Server running on port ${PORT}`);
});
