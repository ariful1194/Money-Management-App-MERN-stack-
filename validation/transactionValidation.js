const validator = require("validator");
isEmpty = require("./is-empty");
module.exports = function validateTransactionInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount.toString() : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  console.log(data.amount);
  if (!validator.isNumeric(data.amount, { no_symbols: true })) {
    errors.amount = "Amount Must Be A Number";
  }
  if (validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is Required!";
  }
  if (validator.isEmpty(data.type)) {
    errors.type = "Amount Type field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
