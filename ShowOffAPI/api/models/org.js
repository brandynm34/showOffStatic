'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    taxIdNumber: { type: String, required: true },
});

module.exports = mongoose.model('Org', OrgSchema);