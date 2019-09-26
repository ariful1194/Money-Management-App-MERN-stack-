const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: Number,
  expense: Number,
  income: Number,
  transactions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction"
      }
    ]
  }
});

module.exports = User = mongoose.model("users", UserSchema);
