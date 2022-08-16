const express = require('express');
const api = express.Router();
const routers = require('./routes/index');
api.use('/user', routers.userRouter)
api.use('/question', routers.questionRouter)
api.use('/answer', routers.answerRouter)
module.exports = api;