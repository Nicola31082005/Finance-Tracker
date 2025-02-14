// import Transaction from "../models/Transaction.js";

// export default {
//   async getAll(userId, filter = {}) {
//     return Transaction.findAll({ where: { userId, ...filter } });
//   },
//   async create(data, userId) {
//     return Transaction.create({ ...data, userId });
//   },
//   delete(id, userId) {
//     return Transaction.destroy({ where: { id, userId } });
//   },
//   async calculateRemainingMoney(userId) {
//     const incomes = await this.getAll(userId, { type: "income" });
//     const expenses = await this.getAll(userId, { type: "expense" });

//     const incomeMoney = incomes.reduce(
//       (acc, transaction) => (acc += transaction.amount),
//       0
//     );
//     const expenseMoney = expenses.reduce(
//       (acc, transaction) => (acc += transaction.amount),
//       0
//     );

//     const result = (incomeMoney - expenseMoney).toFixed(2);

//     return result;
//   },
// };
