'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user_profileModel = require('../models/user_profile');
const user_controller = require('../controllers/user_controller');
const user_profile = mongoose.model('USER_PROFILE', user_profileModel.UserProfileSchema);

module.exports = function(app) {
  app.route('../models/user_profile:_id')
    .post(create_user)
    .get(read_user)
    .put(update_user)
    .delete(delete_user);
};

module.exports = function(app) {
  app.route('/login')
    .post(AccountController.prototype.logon);
};