import { Sequelize } from "sequelize";
import "dotenv/config";

// Create Sequelize instance with MySQL connection details
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT, // MySQL dialect
    logging: false, // Set to true to see SQL logs in console
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL database successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL database:", error);
  }
})();

export default sequelize;
