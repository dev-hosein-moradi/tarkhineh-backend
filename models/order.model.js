import { mongoose_client } from "../utils/mongo.js";

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
  foodId: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["1", "2", "3", "4"],
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
  time: {
    type: String,
    required: true,
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
