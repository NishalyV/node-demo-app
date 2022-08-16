const express = require('express');
const router = express.Router();
const controller = require('../../controller/notificationcontroller')
router.post('/add', controller.add_notification)
router.get('/get_all', controller.get_all_notification)
router.get('/get_all_by_userid', controller.get_all_notification_by_userid)
router.patch('/update/:id', controller.update_nfn)
router.patch('/delete/:id', controller.delete_nfn)
module.exports = router;