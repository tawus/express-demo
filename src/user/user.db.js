const pool = require('../pool');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 11;

function login({
    email,
    password
}) {
    return pool.query(
        "SELECT email, firstName, lastName, password from appuser " +
            " where email=$1",
        [email]
    ).then((result) => {
        if (result.rows.length === 0) return Promise.resolve(null);
        else {
            const user = result.rows[0];
            return bcrypt.compare(password, user.password)
                .then((result) => result ? user : null);
        }
    });
}

function signup({
    email,
    password,
    firstName,
    lastName
}) {
    return bcrypt.hash(password, SALT_ROUNDS)
        .then((encryptedPassword) => {
            return pool.query(
                "INSERT into appuser(email, password, firstName, lastName) " +
                    " values($1, $2, $3, $4)",
                [email, encryptedPassword, firstName, lastName]
            );
        });
}

module.exports = {
    login,
    signup,
};
