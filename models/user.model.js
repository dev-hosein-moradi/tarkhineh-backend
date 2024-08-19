import { mongoose_client } from "../utils/mongo.js";
import { generatePasswordHash } from "../helpers/hash.js";
import { v4 } from "uuid";

const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose_client.model("user", UserSchema);

const AdminModel = UserModel.discriminator("admin", new Schema({}));

export const seedAdmin = async () => {
  const admin = await AdminModel.findOne({
    mobileNumber: "09025197379",
  }).exec();
  if (!admin) {
    const adminData = new AdminModel({
      firstName: "admin",
      lastName: "admin",
      id: v4(),
      password: await generatePasswordHash("Aa123456"),
      email: "admin@gmail.com",
      mobileNumber: "09025197379",
    });
    await adminData.save();
    console.log("admin added");
  } else {
    console.log("admin exists => ", admin);
  }
};

export const USER_MODELS = {
  UserModel,
};
