import express from "express";
import handlebars from "express-handlebars";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { tempData } from "./middlewares/temp-data-middleware.js";
import sequelize from "./config/database.js";
import path from "path";
import { eq, gte } from "./helpers/equalHelper.js";

const app = express();

// Database config
sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Sequelize models synced"))
  .catch((err) => console.error("❌ Error syncing Sequelize models:", err));

// Handlebars configuration
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      eq,
      gte,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Express configuration
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(process.cwd(), "src", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "laskjdlsakjdlaskjdlkasdjska123123easdas",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

// Add custom middlewares
app.use(tempData);
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Export the Express app for Vercel
export default app;
