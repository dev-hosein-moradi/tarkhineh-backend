import { mongoose_client } from "../utils/mongo.js";
import { nanoid } from "nanoid";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },
  foods: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
      branchId: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["1", "2", "3", "4", "5"], // 1- preparation | 2-send |‌ 3-Delivered | 4-Absence of customer | 5-Cancellation by the customer
    default: "1",
  },
  userAddress: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  deliverType: {
    type: String,
    enum: ["1", "2"],
    default: "1",
  },
});

/* 
    describe status:
    1=> proccessing the order
    2=> prepare the order
    3=> send the order
    4=> recived order
*/

const OrderModel = mongoose_client.model("order", OrderSchema);

export const ORDER_SCHEMA = {
  OrderModel,
};
