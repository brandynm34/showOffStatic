const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPhotoSchema = new Schema({
    // _id: { type: String, required: true, unique: true },
    // removed id because its already stored by mongo automatically
    Photo: { type: Buffer, required: true },
    Title: { type: String, required: false },
    Name: { type: String, required: false},
    User_ID: { type: String, required: true}
});

module.exports = mongoose.model('USER_PHOTO', UserPhotoSchema);