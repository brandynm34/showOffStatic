'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Category = new Schema({
  org_name: String
  , subcategory : {
    item_name: String,
    required: 'For each donation item you have on hand enter the number in the text box to the right of the matching description.'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
