const mongoose = require('mongoose');


const Answer_schema = new mongoose.Schema({
    question_id:{ type: String},
    user_id:{ type: String},
    answers: [],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    is_deleted: { type: Boolean, default: false}

}, { versionKey: false });

module.exports = mongoose.model('answers', Answer_schema);