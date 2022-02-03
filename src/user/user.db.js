const pool = require('../pool');

function login({
    email,
    password
}) {
    return pool.query(
        "SELECT email, firstName, lastName from appuser " +
            " where email=$1 and password=$2",
        [email, password]
    ).then((result) => {
        if (result.rows.length === 0) return null;
        else return result.rows[0];
    });
}

function signup({
    email,
    password,
    firstName,
    lastName
}) {
    return pool.query(
        "INSERT into appuser(email, firstName, lastName, password) " +
            " values($1, $2, $3, $4)",
        [email, password, firstName, lastName]
    );
}

module.exports = {
    login,
    signup,
};
