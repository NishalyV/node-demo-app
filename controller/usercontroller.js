const User = require('../model/user')
const bcryptjs = require('bcryptjs')


module.exports.create_user = function (req, res) {
    const req_body = req.body;
    let new_user = new User(req_body);
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(new_user.password, salt, (err, hash) => {
            if (err) throw err;
            new_user.password= hash;
            new_user.save().then(data => {
                return res.status(200).json(data);
            }).catch(error => {
                return res.status(400).json({ error: { message: error.message } })
            })
        })
    })
    
}
module.exports.get_all_user = function (req, res) {
    User.find({is_deleted: false}, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ data: doc })
    }).sort({ name: 1 })
}

module.exports.update_user = function (req, res) {
    const id = req.params.user_id;
    const res_data = req.body;
    console.log(id,res_data)
    User.findByIdAndUpdate({_id: id},res_data, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ "message": "User updated successfully" })
    })
}