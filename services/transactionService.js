const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const TransactionModel = require('../models/TransactionModel');

async function getTransactionsFrom(period) {
  const transactions = await TransactionModel.find({ yearMonth: period });
  return transactions;
}

async function postTransaction(transaction) {
  const newTransactionMongoDB = await TransactionModel.create(transaction);
  return newTransactionMongoDB;
}

async function updateTransaction(_id, transaction) {
  await TransactionModel.updateOne({ _id: ObjectId(_id) }, transaction);
  return { _id, ...transaction };
}

async function deleteTransaction(_id) {
  const result = await TransactionModel.deleteOne({ _id: ObjectId(_id) });
  return result.deletedCount === 1;
}

module.exports = {
  getTransactionsFrom,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
