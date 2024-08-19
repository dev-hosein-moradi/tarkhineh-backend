import { mongoose_client } from "../utils/mongo.js";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const FoodSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  compounds: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  percentOfDiscount: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: String,
    required: true,
  },
  mainPrice: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
  numOfScore: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const FoodModel = mongoose_client.model("food", FoodSchema);

export const FOOD_SCHEMA = {
  FoodModel,
};
