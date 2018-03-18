const Common = require('./common');
const mongoose = require('mongoose');
const multer = require('multer');
const PhotoModel = require('./../models/user_photo');
const fs = require('fs');
const crypto = require('crypto');
const mime = require('mime');

const _UPLOAD_PATH = 'uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${_UPLOAD_PATH}`)
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
  });
const upload = multer({ storage: storage });

// const upload = multer({
//     dest: `${_UPLOAD_PATH}/`,
//     filename: 
//         function (req, file, cb) {
//             cb( null, file.originalname)
//          
//         }
// });
const PhotoDB = mongoose.model('USER_PHOTO', PhotoModel.UserPhotoSchema);


class ImageController {

    constructor(router) {
        router.route('/image/save')
            .post(upload.single('image'), this.add);
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
            console.log('Save endpoint hit?? body:', req.body, 'file', req.file );
            const photoToBeSent = new PhotoDB({
                Photo: fs.readFileSync(req.file.path),
                User_ID: req.body.User_ID,
                Name: req.body.fileName
            });
            console.log('object to be sent', photoToBeSent);
            await photoToBeSent.save(function(err, result) {
                if (err) {
                    console.log('Mongo error', err)
                } else {
                    console.log('Mongo success?!');
                }
            });
            res.json({message: 'Endpoint hit'});
        } catch (err) {
            console.log('endpoint hit but error thrown');
            return Common.resultErr(res, err.messsage);
        }
    }
}

module.exports = ImageController;