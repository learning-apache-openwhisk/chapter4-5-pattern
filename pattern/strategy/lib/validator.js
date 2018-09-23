class Validator {
  constructor(field) {
    this.field = field;
  }

  // simple validator - just check it not empty
  // return an error, or an empty string if ok
  validator(value) {
    if(value)
        return ""
    return "missing "+this.field;
  }

  // validate data, adding messages and values
  validate(data) {
    if (!data.message) data.message = [];
    if (!data.errors) data.errors = [];

    let value = data[this.field];
    let err = this.validator(value);
    if (err) data.errors.push(err);
    else data.message.push(this.field + ": " + value);

    return data;
  }
}

module.exports = Validator;
