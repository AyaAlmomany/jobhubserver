const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User" }, //it was true
    job: { type: mongoose.Schema.Types.ObjectId, ref:"Job"},

}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);