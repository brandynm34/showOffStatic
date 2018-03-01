const registrationModel = require('../models/registration');
const mongoose = require('mongoose');
// const router = express.Router();

class AccountController {
    constructor(router) {
        router.route('/registration/get')
            .get(this.getAll);
        router.route('/registration/add')
            .post(this.add);
        
    }

    

    async test(req, res, next) {
        try { 
            console.log('THIS IS A TEST');
            res.json({message: 'portfolio endpoint hit!!1'});
        } catch (e) {
            console.log('Error:', e);
            res.json({error: e});
        }
    }

    async getAll(req, res, next) {
        try {
            console.log('Get all GET request activated. NOTE: THIS FUNCTION SHOULD NOT GO LIVE');
            const Account = mongoose.model('REGISTRATION', registrationModel.registrationSchema);
            Account.find(function(err, profiles) {
                if (err) { return console.error(err); }
                res.json({results: profiles});
                })
            } catch (e) {
                console.log('errrror:', e)
        }
    }

    async add(req, res, next) {
        try {
            const Account = mongoose.model('REGISTRATION', registrationModel.registrationSchema);
            console.log('API Endpoint: Register has been activated...');
            // res.json({body: req.body});
            // make sure all required fields are there
            if (!req.body.Username || !req.body.FirstName || !req.body.LastName || !req.body.Password || !req.body.Email) {
                console.log('ERROR: A required field is missing.');
                res.send('ERROR: Required field missing');
            }

            // if we got this far, we have everything necessary
            console.log('Registering user with the following information:', req.body)
            const newProfile = new Account({
                Username: req.body.Username,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Password: req.body.Password,
                Email: req.body.Email
            })
            
            // make sure user name doesnt already exist
            Account.findOne({Username: req.body.Username}, function(err, result) {
                if(result) {
                    console.log('Username already exists, terminating add function..');
                    res.json({result: 'User not added: Username exists'});
                } else {
                    newProfile.save(function(err, newProfile) {
                        if (err) {
                            return console.error(err);
                        } else {
                            console.log('User profile add successful.')
                            res.json({message: 'User profile add successful.'})  
                        }
                    })
                }
            })
        } catch (e) {
            console.log('moar errors:', e)
        }
    }
}

module.exports = AccountController;