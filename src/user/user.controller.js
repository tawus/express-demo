const express = require("express");
const userDB = require("./user.db");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const {errorToConsole, defaultValidation} = require("../utils");

function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('user/login', {errors: errors.mapped()});
        return;
    }

    return userDB
        .login(req.body)
        .then((user) => {
            if (!user) {
                res.redirect('/login/failure');
            } else {
                res.redirect('/login/success');
            }
        })
        .catch((error) => errorToConsole(error, res));
}

function signup(req, res) {
    return userDB
        .signup(req.body)
        .then(() => res.status(204).send())
        .catch((error) => errorToConsole(error, res));
}

const passwordCheck = body("password")
    .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({min: 5})
      .withMessage("Password must be atleast 5 letters long");

router.post(
    "/login",
    body("email")
        .isEmpty()
        .withMessage("Email is required")
        .isEmail().normalizeEmail().withMessage("Not a valid email"),
    passwordCheck,
    login,
);

router.post(
    "/signup",
    body("email").isEmail().normalizeEmail(),
    passwordCheck,
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    defaultValidation,
    signup,
);

module.exports = router;
