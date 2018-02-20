'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type:String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    street_address: {type: String, required: false},
    state: {type: String, required: false},
    zip: { type: String, required: true },
    phone-num: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
