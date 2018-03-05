'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const portfolioSchema = new Schema({
    Email: { type:String, required: true, unique: true},
//     I think we need the id_ to order the arrays
    AboutBlurb: { type:String, required: false},
    Facebook: { type:String, required: false},
    Twitter: { type:String, required: false},
    // Icon: { data: Buffer, contentType: String},
    Icon: { type:String, required: true},
    PhoneNumber: { type:String, required: false},
    Projects: { type:[String], required: false},
    Theme: { type: String, required: false}
}); 

module.exports = mongoose.model('USER_PORTFOLIO', portfolioSchema);
