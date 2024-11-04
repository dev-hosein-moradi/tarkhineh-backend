import { mongoose_client } from "../utils/mongo.js";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const AddressSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isReciver: {
    type: Boolean,
    required: true,
  },
});

const AddressModel = mongoose_client.model("address", AddressSchema);

export const ADDRESS_SCHEMA = {
  AddressModel,
};
