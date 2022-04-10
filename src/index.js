const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user/user.controller');
const viewsRouter = require('./user/user.views');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/login', viewsRouter);

app.listen(8000);
