import { mongoose_client } from "../utils/mongo.js";

const Schema = mongoose_client.Schema;

const CategorySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose_client.model("category", CategorySchema);

export const CATEGORY_SCHEMA = {
  CategoryModel,
};
