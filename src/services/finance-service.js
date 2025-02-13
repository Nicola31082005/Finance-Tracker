import Transaction from "../models/Transaction.js";

export default {
  async getAll() {
    return Transaction.findAll({});
  },
};
