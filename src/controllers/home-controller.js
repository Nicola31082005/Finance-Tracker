import { Router } from "express";
import financeService from "../services/finance-service.js";

const router = Router();

router.get("/", async (req, res) => {
  await financeService.calculateRemainingMoney();
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about", { pageTitle: "About", layout: false });
});

export default router;
