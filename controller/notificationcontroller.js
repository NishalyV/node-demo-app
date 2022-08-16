const Notification = require('../model/notification')


module.exports.add_notification = function (req, res) {
    const req_body = req.body;
    console.log('sdh',req);
    let new_notification = new Notification(req_body)
    new_notification.save().then(data => {
        return res.status(200).json(data);
    }).catch(error => {
        return res.status(400).json({ error: { message: error.message } })
    })
}
module.exports.get_all_notification = function (req, res) {
    Notification.find({ is_deleted: false }, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ data: doc })
    }).sort({ created_at: 1 })
}
module.exports.get_all_notification_by_userid = function (req, res) {
    const user_id = req.query.user_id
    Notification.find({
        $and: [
            { is_deleted: false },
            { created_by: user_id }
        ]
    }, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ data: doc })
    }).sort({ created_at: -1 })
}
module.exports.update_nfn = function (req, res) {
    const id = req.query.id;
    const resData = req.body;
    Notification.findOneAndUpdate({_id:id },resData,function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ "message": "Notification updated successfully" })
    })
}
module.exports.delete_nfn = function (req, res) {
    const id = req.query.id;
    const resData = req.body;
    Notification.findOneAndUpdate({_id:id },resData,function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ "message": "Notification deleted successfully" })
    })
}
