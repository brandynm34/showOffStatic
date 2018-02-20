'use strict';
module.exports = function(app) {
  var userList = require('../controllers/user_controller');

  // userList Routes
  app.route('/user')
    .get(rsrc-mobile.read_all_users);
    .post(rsrc-mobile.create_user);
  app.route('/user/:_id')
    .get(rsrc-mobile.read_user);
    .put(rsrc-mobile.update_user);
    .delete(rsrc-mobile.delete_user);
};
