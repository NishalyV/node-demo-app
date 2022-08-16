const express = require('express');
const router = express.Router();
const controller = require('../../controller/questioncontroller')
router.post('/add', controller.add_qn)
router.get('/get_all', controller.get_all_qn)
router.patch('/update/:question_id', controller.update_qn)
router.delete('/delete/:question_id', controller.delete_qn)
module.exports = router;