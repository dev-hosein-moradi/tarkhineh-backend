import { Sequelize, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { generatePasswordHash } from "../helpers/hash.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await generatePasswordHash(user.password);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await generatePasswordHash(user.password);
        }
      },
    },
  }
);

export const seedAdmin = async () => {
  try {
    const adminMobile = "09025197379";
    const adminExists = await User.findOne({ where: { mobileNumber: adminMobile } });

    if (!adminExists) {
      await User.create({
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        mobileNumber: adminMobile,
        password: "Aa123456", // hashed automatically
        type: "admin",
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("[SEED_ADMIN_ERROR]", error);
  }
};

export { User, sequelize };
