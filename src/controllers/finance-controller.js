import { Router } from "express";
import financeService from "../services/finance-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const financeController = Router();
// View all transactions
financeController.get("/finance", isAuth, async (req, res) => {
  try {
    const transactions = await financeService.getAll();
    const availableMoney = await financeService.calculateRemainingMoney();
    res.render("finance/transactionView", { transactions, availableMoney });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Server error");
  }
});

financeController.post("/finance", isAuth, async (req, res) => {
  const transactionData = req.body;
  try {
    // create a transaction
    console.log(transactionData);

    const newTransaction = await financeService.create(
      transactionData,
      req.user.id
    );

    res.redirect("/finance");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.setError(errorMessage);
    res.redirect("/finance");
  }
});

financeController.post("/finance/delete/:id", isAuth, async (req, res) => {
  const transactionId = req.params.id;

  try {
    await financeService.delete(transactionId);
    res.redirect("/finance");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.setError(errorMessage);
    res.redirect("/finance");
  }
});

export default financeController;
