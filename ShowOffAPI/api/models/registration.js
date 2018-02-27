'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    Email: { type:String, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: {type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

module.exports = mongoose.model('REGISTRATION', profileSchema);
