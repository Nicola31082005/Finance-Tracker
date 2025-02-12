import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  // *First solution - convert documents to objects
  // Convert documents to plain objects
  // const plainMovies = movies.map(m => m.toObject());

  // *Third solution is to use allowProtoPropertiesByDefault runtimeOption in handlebars
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about", { pageTitle: "About" });
});

export default router;
