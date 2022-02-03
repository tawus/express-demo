const { validationResult } = require('express-validator');

function errorToConsole(error, response){
    console.error(error);
    response.status(500).send();
};

function defaultValidation(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.mapped() });
    else return next();
}

module.exports = {
    errorToConsole,
    defaultValidation,
};
