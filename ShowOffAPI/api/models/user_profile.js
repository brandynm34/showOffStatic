'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    SelectedTheme: { type: String, required: true },
    GitHubURL: { type: String, required: true },
    LinkedIn: { type: String, required: true },
    ResumeURL: { type: String, required: true },
    Email: { type:String, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: {type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

module.exports = mongoose.model('USER_PROFILE', UserProfileSchema);