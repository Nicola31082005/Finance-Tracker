import express from "express";
import handlebars from "express-handlebars";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { tempData } from "./middlewares/temp-data-middleware.js";
import sequelize from "./config/database.js";

const app = express();
// Database config
// Add this to sync Sequelize models after the app is initialized
sequelize
  .sync({ force: false }) // Set to `true` to drop and recreate tables every time
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
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Express configuration
app.use("/static", express.static("src/public"));
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

// Start server **after** database is ready
app.listen(5001, () =>
  console.log("🚀 Server is listening on http://localhost:5001...")
);
