'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user_profileModel = require('../models/user_profile');
const user_controller = require('../controllers/user_controller');

module.exports = function(app) {
  app.route('../models/user_profile: _id')
    .get(read_user)
    .put(update_user)
    .post(create_user)
    .delete(delete_user);
};