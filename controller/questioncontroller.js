const Question = require('../model/question')
const User = require('../model/user')
const axios = require('axios')


module.exports.add_qn = function (req, res) {
    const req_body = req.body;
    let new_question = new Question(req_body)
    new_question.save().then(data => {
        User.findOne({_id:req_body.created_by},(err,data)=>{
            const body = {
                name: `${data.username} added question successfully`,
                created_by: req_body.created_by
            }
            axios
                .post(process.env.API_URL + 'notification/add', body)
                .then(doc => {
                    return res.status(200).json({"message":"Question added successfully"});
                })
                .catch(error => {
                    console.error(error)
                })
            
        })
    }).catch(error => {
        return res.status(400).json({ error: { message: error.message } })
    })
}
module.exports.get_all_qn = function (req, res) {
    Question.find({ is_deleted: false }, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        return res.status(200).json({ data: doc })
    }).sort({ question: 1 })
}

module.exports.update_qn = function (req, res) {
    const question_id = req.params.question_id;
    const user_id = req.query.user_id;
    const resData = req.body;
    console.log(question_id);
    Question.findOneAndUpdate({ _id: question_id }, resData, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        console.log(doc);
        User.findOne({_id:user_id},(err,data)=>{
            const body = {
                name: `${data.username} updated question successfully`,
                created_by: user_id
            }
            axios
                .post(process.env.API_URL + 'notification/add', body)
                .then(doc => {
                    return res.status(200).json({ "messsage": "update successfully" })
                })
                .catch(error => {
                    console.error(error)
                })
            
        })
        
    });
}
module.exports.delete_qn = function (req, res) {
    const question_id = req.params.question_id;
    const user_id = req.query.user_id;
    const resData = req.body;
    console.log(question_id);
    Question.findOneAndUpdate({ _id: question_id }, resData, function (err, doc) {
        if (err) {
            return res.status(400).json({ error: { message: err.message } })
        }
        User.findOne({_id:user_id},(err,data)=>{
            const body = {
                name: `${data.username} deleted question successfully`,
                created_by: user_id
            }
            axios
                .post(process.env.API_URL + 'notification/add', body)
                .then(doc => {
                    return res.status(200).json({ "messsage": "Deleted successfully" })
                })
                .catch(error => {
                    console.error(error)
                })
            
        })
       
    });
}