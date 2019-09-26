const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetSchema = new Schema({
  userId: {
    type: String
  },
  random: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Reset = mongoose.model("reset", ResetSchema);
