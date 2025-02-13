import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about", { pageTitle: "About", layout: false });
});

export default router;
