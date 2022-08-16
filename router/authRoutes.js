const express = require('express');
const api = express.Router();
const routers = require('./routes/index')
api.use('/api', routers.authRouter)
api.use('/notification', routers.notificationRouter)
module.exports = api;