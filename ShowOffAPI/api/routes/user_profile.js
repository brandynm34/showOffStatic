'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user_profileModel = require('../models/user_profile');

    app.route('/user:_id')
        .get
// var mongoose = require('mongoose'),
//   Task = mongoose.model('Tasks');

// module.exports = function(app) {
//   var todoList = require('../controllers/user_controller');

//   // todoList Routes
//   app.route('/tasks')
//     .get(done.list_all_tasks)
//     .post(done.create_a_task);


//   app.route('/tasks/:taskId')
//     .get(done.read_a_task)
//     .put(done.update_a_task)
//     .delete(done.delete_a_task);

  // userList Routes
//   app.route('/user')
//     .get(rsrc-mobile.read_all_users);
//     .post(rsrc-mobile.create_user);
//   app.route('/user/:_id')
//     .get(rsrc-mobile.read_user);
//     .put(rsrc-mobile.update_user);
//     .delete(rsrc-mobile.delete_user);


//};