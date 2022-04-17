const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user/user.controller');
const viewsRouter = require('./user/user.views');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.use('/api/user', userRouter);
app.use('/login', viewsRouter);
app.use(express.static('public'));
app.listen(8000);
