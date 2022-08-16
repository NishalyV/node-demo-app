const express = require('express');
const router = express.Router();
const controller = require('../../controller/usercontroller')
router.get('/get_all_user', controller.get_all_user)
router.patch('/update/:user_id', controller.update_user)
module.exports = router;