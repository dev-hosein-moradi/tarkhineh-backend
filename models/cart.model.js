import { mongoose_client } from "../utils/mongo.js";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const CartSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  foodId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  deliverId: {
    type: String,
  },
  branchId: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  payment: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["1", "2", "3", "4"],
    default: "1",
  },
});

const CartModel = mongoose_client.model("cart", CartSchema);

export const CART_SCHEMA = {
  CartModel,
};
