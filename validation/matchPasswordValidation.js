const validator = require("validator");
isEmpty = require("./is-empty");
module.exports = function validateConfirmInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be  6 to 30 characters!";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is Required!";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must be match!";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
