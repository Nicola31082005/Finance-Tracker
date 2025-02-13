import Transaction from "../models/Transaction.js";

export default {
  async getAll() {
    return Transaction.findAll({});
  },
  async create(data, userId) {
    return Transaction.create({ ...data, userId });
  },
  delete(id) {
    return Transaction.destroy({ where: { id } });
  },
  async calculateRemainingMoney() {
    const incomes = await Transaction.findAll({ where: { type: "income" } });
    const expenses = await Transaction.findAll({ where: { type: "expense" } });

    const incomeMoney = Array.from(incomes).reduce(
      (acc, transaction) => (acc += transaction.amount),
      0
    );
    const expenseMoney = Array.from(expenses).reduce(
      (acc, transaction) => (acc += transaction.amount),
      0
    );

    const result = (incomeMoney - expenseMoney).toFixed(2);

    return result;
  },
};
