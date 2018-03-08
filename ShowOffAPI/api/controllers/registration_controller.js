const registrationModel = require('../models/user_profile');
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
        router.route('/registration/update')
            .post(this.update);
        router.route('/registration/login')
            .post(this.login);
        router.route('/registration/search')
            .post(this.search);
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

    async update(req, res, next) {
        try {
            // make sure no required fields are missing
            if(!req.body.Email, !req.body.Username, !req.body.FirstName, !req.body.LastName, !req.body.SelectedTheme) {
                console.log('Missing field, aborting.');
                return Common.resultErr(res, {message: 'Missing fields'});
            }

            // declare collection
            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);

            // go over non-required fields to avoid errors
            const GitHubURL = req.body.GitHubURL ? req.body.GitHubURL : null;
            const LinkedIn = req.body.LinkedIn ? req.body.LinkedIn : null;
            const ResumeURL = req.body.ResumeURL ? req.body.ResumeURL : null;

            console.log('Updating profile for user:', req.body.Email);

            // make sure the profile exists
            await Account.findOne({Username: req.body.Username}, function(err, result) {
                if (!result) {
                    // if there is a result, then a portfolio exists. cease and desist
                    console.log('Profile does not exist');
                    return Common.resultNotFound(res, 'Profile does not exist. I cannot update what I cannot see...')
                }
            });

            // perform the update
            await Account.update({Email: req.body.Email}, {
                Email: req.body.Email,
                SelectedTheme: req.body.SelectedTheme,
                GitHubURL: GitHubURL,
                LinkedIn: LinkedIn,
                ResumeURL: ResumeURL,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
            })

            // success!!!
            console.log('Update successfull.');
            res.json({result: 'Update Successful!!'});
        } catch(err) {
            return Common.resultErr(res, e.message);
        }
    }

    async login(req, res, next) {
        try {
            // register the proper collection
            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);

            // get the username from request body
            const inputtedUsername = req.body.Username;
            console.log('Attempting to Log in User:', inputtedUsername);

            if(!inputtedUsername) {
                console.log('Error: Request did not contain a user name.');
                res.json({status: 2});
                return;
            }

            // find a user matching the username inputted. utilize await to make sure the checks are in progress
            let usernameCheck = await Account.findOne({Username: inputtedUsername});

            // if theres no result, return status 2 - no such username
            if (!usernameCheck) {
                console.log('No such user name found. Returning status 2');
                res.json({status: 2});
                return;
            }

            // use bcrpyt.compare to check the two password
            const result = await bcrypt.compare(req.body.Password, usernameCheck.Password);

            // compare passwords
            if (result) {
                // if passwords match, return status 1 and the username...
                console.log('Login successful');
                res.json({status: 1, Username: req.body.Username, id: usernameCheck._id});
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
        // NOTE: THIS SHOULD NOT GO LIVE AS IT WILL RETURN ALL USERS. THIS IS FOR TESTING PURPOSES ONLY
        try {
            console.log('Get all GET request activated. NOTE: THIS FUNCTION SHOULD NOT GO LIVE');
            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);
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
            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);
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
                SelectedTheme: 'base',
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

    async search(req, res, next) {
        try {
            // FUNCTION GOES HERE

            // .. make sure they included a search field in the body

            // declare the database

            // .. execute the search, remember not to return the entire profile object from the database... we dont want people getting the password, even if we screen that out on the front end




        } catch(err) {
            return Common.resultErr(res, err.message);           
        }
    }
}

module.exports = AccountController;