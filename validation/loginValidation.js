const validator = require("validator");
isEmpty = require("./is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email!";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is Required!";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
