import { Router } from "express";
import financeService from "../services/finance-service.js";

const financeController = Router();

// View all transactions
financeController.get("/finance", async (req, res) => {
  try {
    const transactions = await financeService.getAll();
    res.render("finance/transactionView", { transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Server error");
  }
});

export default financeController;
