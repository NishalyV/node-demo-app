const express = require('express');
const router = express.Router();
const controller = require('../../controller/answercontroller')
router.post('/add_answer', controller.add_answer)
router.get('/get_all_ansby_user_id', controller.get_all_ansby_user_id);
module.exports = router;