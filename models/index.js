import { USER_MODELS } from "./user.model.js";
import { FOOD_SCHEMA } from "./food.model.js";
import { BRANCH_SCHEMA } from "./branch.model.js";
import { CART_SCHEMA } from "./cart.model.js";
import { CATEGORY_SCHEMA } from "./category.model.js";
import { ADDRESS_SCHEMA } from "./address.model.js";
import { ORDER_SCHEMA } from "./order.model.js";

const watchModel = (model) => {
  model.watch().on("change", (data) => console.log(new Date(), data));
};

watchModel(USER_MODELS.UserModel);
watchModel(FOOD_SCHEMA.FoodModel);
watchModel(BRANCH_SCHEMA.BranchModel);
watchModel(CART_SCHEMA.CartModel);
watchModel(CATEGORY_SCHEMA.CategoryModel);
watchModel(ADDRESS_SCHEMA.AddressModel);
watchModel(ORDER_SCHEMA.OrderModel);

export default {
  UserModel: USER_MODELS.UserModel,
  FoodModel: FOOD_SCHEMA.FoodModel,
  BranchModel: BRANCH_SCHEMA.BranchModel,
  CartModel: CART_SCHEMA.CartModel,
  CategoryModel: CATEGORY_SCHEMA.CategoryModel,
  AddressModel: ADDRESS_SCHEMA.AddressModel,
  OrderModel: ORDER_SCHEMA.OrderModel,
};
