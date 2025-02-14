import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure unique emails
    validate: { isEmail: true }, // Check for valid email format
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
