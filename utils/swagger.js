import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/auth.route.js",
  "./routes/users.route.js",
  "./routes/food.route.js",
  "./routes/branch.route.js",
  "./routes/cart.route.js",
  "./routes/category.route.js",
  "./main.js",
];

const swaggerConfig = {
  info: {
    title: "Your API Title",
    description: "Description of your API",
  },
  host: "localhost:4000", // Replace with your actual base URL
  schemes: ["http", "https"], // Specify the schemes (http, https)
  basePath: "/", // Base path if your API is prefixed
};

swaggerAutogen(outputFile, endpointsFiles, swaggerConfig);
