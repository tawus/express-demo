const express = require('express');

function login_form(req, res) {
    res.render('user/login', { errors: {}});
}

function login_failure(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.set('Cache-Control', 'no-store');
    res.set('etag', false);
    res.status(400)
        .send(
            `<!doctype html>
            <html>
               <head><title>Login Failed</title></head>
               <body>
                  <h1>Login Failed</h1>
                  <a href='/login'>Go back to login page</a>
               </body>
             <html>`
        );
}

function login_success(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.set('Cache-Control', 'no-store');
    res.set('etag', false);
    res.status(200)
        .send(
            `<!doctype html>
            <html>
               <head><title>Home Page</title></head>
               <body>
                  <h1>Welcome</h1>
               </body>
             <html>`
        );
}

const router = express.Router();
router.get('/', login_form);
router.get('/success', login_success);
router.get('/failure', login_failure);

module.exports = router;
