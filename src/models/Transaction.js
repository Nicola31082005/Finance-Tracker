// id
// type
// amount
// category
// description
// date

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.ENUM("ioncome", "expense"), allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Transaction;
