const Common = require('./common');
const mongoose = require('mongoose');
const multer = require('multer');
const PhotoModel = require('./../models/user_photo');

const _UPLOAD_PATH = 'uploads';

const upload = multer({dest: `${_UPLOAD_PATH}/`});
const PhotoDB = mongoose.model('USER_PHOTO', PhotoModel.UserPhotoSchema);


class ImageController {

    constructor(router) {
        router.route('/image/save')
            .post(this.add);
        router.route('/image/test')
            .get(this.test);
    }

    async test(req, res, next) {
        try {
            res.json({message: 'This is a test. End point works!'});
        } catch(err) {
            return Common.resultErr(res, err.message);
        }
    }

    async add(req, res, next) {
        try {
            console.log('Body', req.body);
            console.log('File', req.file);
        } catch (err) {
            return Common.resultErr(res, err.messsage);
        }
    }
}

module.exports = ImageController;