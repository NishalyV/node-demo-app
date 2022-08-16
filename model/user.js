const mongoose = require('mongoose');


const User_schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String, lowercase: true,
        required: true,
        unique: true
    },
    password: { type: String },
    is_admin: { type: Boolean, default: false },
    is_student: { type: Boolean, default: false },
    is_staff: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    is_deleted: { type: Boolean, default: false}

}, { versionKey: false });

module.exports = mongoose.model('users', User_schema);