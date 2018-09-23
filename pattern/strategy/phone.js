const Validator = require("./lib/validator.js");

class PhoneValidator extends Validator {
  validator(value) {
    let error = super.validator(value);
    if (error) return error;
    var match = value.toString().match(/\d/g)
    if (match && match.length >= 10) return "";
    return value + " does not look like a phone number";
  }
}

function main(args) {
  //console.log(args)
  return new PhoneValidator("phone").validate(args);
}

module.exports.main = main;
