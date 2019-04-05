const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!Validator.isEmail(data.email)) {
    errors.loginEmail = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.loginEmail = "Email field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.loginPassword = "Password must be be at least 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.loginPassword = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
