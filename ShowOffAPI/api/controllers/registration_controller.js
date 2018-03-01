const registrationModel = require('../models/registration');
const Common = require('./common');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

class AccountController {
    constructor(router) {
        router.route('/registration/get')
            .get(this.getAll);
        router.route('/registration/add')
            .post(this.add);
        router.route('/registration/login')
            .post(this.login);
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

    async login(req, res, next) {
        try {
            // register the proper collection
            const Account = mongoose.model('REGISTRATION', registrationModel.registrationSchema);

            // get the username from request body
            const inputtedUsername = req.body.Username;
            console.log('Attempting to Log in User:', inputtedUsername);

            // find a user matching the username inputted. utilize await to make sure the checks are in progress
            let usernameCheck = await Account.findOne({Username: inputtedUsername});

            // if theres no result, return status 2 - no such username
            if (!usernameCheck) {
                console.log('No such user name found. Returning status 2');
                res.json({status: 2})
                return;
            }

            // use bcrpyt.compare to check the two password
            const result = await bcrypt.compare(req.body.Password, usernameCheck.Password);

            // compare passwords
            if (result) {
                // if passwords match, return status 1 and the username...
                console.log('Login successful');
                res.json({status: 1, Username: req.body.Username});
            } else {
                // ..otherwise, return status 3
                console.log(`Password doesn't match`);
                res.json({status: 3});
                return;
            }
            
            

        } catch (e) {
            return Common.resultErr(res, e.message);
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

            // hash password with bcrypt
            const hash = await bcrypt.hash(req.body.Password, SALT_ROUNDS);

            // if we got this far, we have everything necessary
            console.log('Registering user with the following information:', req.body)
            const newProfile = new Account({
                Username: req.body.Username,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Password: hash,
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