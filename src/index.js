import express from "express";
import handlebars from "express-handlebars";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { tempData } from "./middlewares/temp-data-middleware.js";

const app = express();

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
