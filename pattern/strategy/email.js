const Validator = require("./lib/validator.js")

class EmailValidator extends Validator {
    validator(value) {
        let error = super.validator(value);
        if (error) return error;
        var re = /\S+@\S+\.\S+/;
        if(re.test(value))
            return "";
        return value+" does not look like an email"        
    }
}

function main(args) {
    //console.log(args)
    return new EmailValidator("email").validate(args)
}

module.exports.main = main
