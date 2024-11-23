import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
// import swaggerUI from "swagger-ui-express";
// import swaggerDoc from "./utils/swagger_output.json" assert { type: "json" };

import addUserRouter from "./routes/users.route.js";
import addAuthRouter from "./routes/auth.route.js";
import addFoodRouter from "./routes/food.route.js";
import addBranchRouter from "./routes/branch.route.js";
import addCartRouter from "./routes/cart.route.js";
import addCategoryRouter from "./routes/category.route.js";
import addAddressRouter from "./routes/address.route.js";
import addOrderRouter from "./routes/order.route.js";
import addDateRouter from "./routes/date.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });
// origin: "https://tarkhineh-theta.vercel.app",
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://tarkhineh-theta.vercel.app"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Use an array for methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(".", "public")));

// routes
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
  res.json({ message: "Hello from Vercel!" });
});

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.listen(process.env.PORT || 4000, () => {
  console.log(`runnig on port => ${process.env.PORT || 4000}`);
});
