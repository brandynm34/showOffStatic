const Common = require('./common');
const mongoose = require('mongoose');
const multer = require('multer');

const _UPLOAD_PATH = 'uploads';

const upload = multer({dest: `${_UPLOAD_PATH}/`});
const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);


class ImageController {

}

module.exports = ImageController;