import { mongoose_client } from "../utils/mongo.js";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const BranchSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  ownerFullName: {
    type: String,
  },
  ownerNatCode: {
    type: String,
  },
  ownerPhone: {
    type: String,
  },
  ownerState: {
    type: String,
  },
  ownerCity: {
    type: String,
  },
  ownerRegion: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
  ownerType: {
    type: String,
  },
  placeArea: {
    type: String,
  },
  placeAge: {
    type: String,
  },
  verification: {
    type: Boolean,
  },
  kitchen: {
    type: Boolean,
  },
  parking: {
    type: Boolean,
  },
  store: {
    type: Boolean,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  workTime: {
    type: String,
    required: true,
  },
  tel: {
    type: [String],
    default: [],
  },
});

const BranchModel = mongoose_client.model("branch", BranchSchema);

export const BRANCH_SCHEMA = {
  BranchModel,
};
