const Answer = require('../model/answer')


module.exports.add_answer = function (req, res) {
    const req_body = req.body;
        let new_answer = new Answer(req_body)
        new_answer.save().then(data => {
            return res.status(200).json(data);
        }).catch(error => {
            return res.status(400).json({ error: { message: error.message } })
        })
}
module.exports.get_all_ansby_user_id = function (req, res) {
    const user_id = req.query.user_id;
    Answer.find({user_id:user_id}, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ data: doc })
    }).sort({ created_at: -1 })
}