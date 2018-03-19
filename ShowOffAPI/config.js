require('dotenv').config();

module.exports = {
    'secret': 'supersecretsecrets',
    'database': `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ds041678.mlab.com:41678/showoff` // PROD
    //'database': 'mongodb://mongo-database:27017/showoff'
}
