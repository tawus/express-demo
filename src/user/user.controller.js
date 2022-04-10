const express = require("express");
const userDB = require("./user.db");
const router = express.Router();
const {body} = require("express-validator");
const {errorToConsole, defaultValidation} = require("../utils");

function login(req, res) {
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
    .isLength({min: 5})
    .withMessage("Password must be atleast 5 letters long");

router.post(
    "/login",
    body("email").isEmail().normalizeEmail(),
    passwordCheck,
    defaultValidation,
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
