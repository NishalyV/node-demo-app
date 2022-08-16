const express = require('express');
const router = express.Router();
const controller = require('../../auth/auth')
const uController =require('../../controller/usercontroller');
router.post('/login', controller.authentication)
router.post('/admin/login', controller.admin_authentication)
router.post('/staff/login', controller.staff_authentication)
router.post('/token', controller.token)
router.post('/register', uController.create_user)



module.exports = router;