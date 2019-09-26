const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactinSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Transaction = mongoose.model("trasactions", TransactinSchema);
