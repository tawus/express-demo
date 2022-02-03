const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user/user.controller');

const app = express();
app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.listen(6001);
