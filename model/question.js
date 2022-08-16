const mongoose = require('mongoose');


const Question_schema = new mongoose.Schema({
    question: { type: String , required: true},
    options: [],
    questionType: { type: String },
    correct_answer: [],
    mark:{ type: Number },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    is_deleted: { type: Boolean, default: false},
    created_by:{ type: String, required: true }

}, { versionKey: false });

module.exports = mongoose.model('questions', Question_schema);