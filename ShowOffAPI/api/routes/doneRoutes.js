'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/doneController');

  // todoList Routes
  app.route('/tasks')
    .get(done.list_all_tasks)
    .post(done.create_a_task);


  app.route('/tasks/:taskId')
    .get(done.read_a_task)
    .put(done.update_a_task)
    .delete(done.delete_a_task);
};
