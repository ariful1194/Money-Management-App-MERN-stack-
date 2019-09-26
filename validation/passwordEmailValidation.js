const validator = require("validator");
isEmpty = require("./is-empty");
module.exports = function validateEmailInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email!";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
