const mongoose = require('mongoose');


const Notification_schema = new mongoose.Schema({
    name: { type: String ,required: true},
    is_deleted: { type: Boolean, default: false},
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    created_by: { type: String }
}, { versionKey: false });

module.exports = mongoose.model('notifications', Notification_schema);