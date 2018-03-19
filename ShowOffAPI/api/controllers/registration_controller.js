const registrationModel = require('../models/user_profile');
const Common = require('./common');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const _JWTSECRET = process.env.JWTSECRET;

class AccountController {
    constructor(router) {
        // router.route('/registration/get')
        //     .get(this.getAll);
        router.route('/registration/add')
            .post(this.add);
        router.route('/registration/update')
            .post(AccountController.tokenCheck, this.update);
        router.route('/registration/login')
            .post(this.login);
        router.route('/registration/search')
            .post(this.search);
        router.route('/registration/getById/:id')
            .get(this.getById);
        router.route('/registration/partialUpdate')
            .post(AccountController.tokenCheck, this.partialUpdate);
        router.route('/registration/advancedSearch')
            .post(this.advancedSearch);
    }

    static tokenCheck( req, res, next ) {
         // check headers and get token
         console.log('Checking for token?!:', req.headers);
         // maker sure theres an authorization header in the first place to avoid a substr error
         if (!req.headers['authorization']) {
             console.log('No authorization header detected, therefore there cannot be a token. Returning forbidden.');
             return Common.resultForbidden(res);
         }
         const token = req.headers['authorization'].substr(7);

         // verify token
         jwt.verify(token, _JWTSECRET, (err, decoded) => {
             if(err) { 
                 console.log('TOKEN FAIL!', err);
                 return Common.resultForbidden(res);
             }

             if(decoded) { 
                console.log('Token pass:', decoded); 
                next();
            } else { console.log('token fail'); }
         })
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

    async partialUpdate(req, res, next) {
        try {
        const listOfField = ['Email', 'FirstName', 'GitHubURL', 'LastName', 'LinkedIn', 'Website'];
        // as of right now, this is a blatant partial update allowing any updates to the database,
        // if (req.body.Password || req.body.Username) {
        //     // we're not allowing a change of username of password, so if its in the body, break immediately
        //     return Common.resultErr(res, {message: 'Invalid data'})
        // } 

        // declare collection
        const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);

        // make sure the profile exists
        await Account.findOne({Username: req.body.Username}, function(err, result) {
            if (!result) {
                // if there is a result, then a portfolio exists. cease and desist
                console.log('Profile does not exist');
                return Common.resultNotFound(res, 'Profile does not exist. I cannot update what I cannot see...')
            }
        });
        const bodyToSend = {}
        listOfField.forEach((attr) => {
            if(req.body[attr]) {bodyToSend[attr] = String(req.body[attr]);}
        }); 
        
        console.log('Initiating partial update on the following user', req.body.Username, ' endpoint with the following body', bodyToSend);
        // perform the update
        await Account.update({Username: req.body.Username}, bodyToSend)
        res.json({message: "Update successful"})
        } catch(err) {
            return Common.resultErr(res, e.message);
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
            const Website = req.body.Website ? req.body.Website : null;

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
                Email: String(req.body.Email),
                SelectedTheme: String(req.body.SelectedTheme),
                GitHubURL: String(GitHubURL),
                LinkedIn: String(LinkedIn),
                Website: String(Website),
                FirstName: String(req.body.FirstName),
                LastName: String(req.body.LastName),
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
            // console.log('secret:', _JWTSECRET);

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
                const token = jwt.sign({Username: req.body.Username, id: usernameCheck._id}, _JWTSECRET);
                res.json({status: 1, token: token, Username: req.body.Username, id: usernameCheck._id});
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

    // async getAll(req, res, next) {
    //     // NOTE: THIS SHOULD NOT GO LIVE AS IT WILL RETURN ALL USERS. THIS IS FOR TESTING PURPOSES ONLY
    //     try {
    //         console.log('Get all GET request activated. NOTE: THIS FUNCTION SHOULD NOT GO LIVE');
    //         const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);
    //         Account.find(function(err, profiles) {
    //             if (err) { return console.error(err); }
    //             res.json({results: profiles});
    //             })
    //         } catch (e) {
    //             console.log('errrror:', e)
    //     }
    // }

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
                Username: String(req.body.Username),
                FirstName: String(req.body.FirstName),
                LastName: String(req.body.LastName),
                Password: hash,
                Email: String(req.body.Email)
            })
            
            // make sure user name doesnt already exist
            Account.findOne({Username: req.body.Username}, function(err, result) {
                if(result) {
                    console.log('Username already exists, terminating add function..');
                    res.json({result: 'User not added: Username exists'});
                } else {
                    newProfile.save(function(err, newProfile) {
                        if (err) {
                            console.log('mongo error', err);
                            return console.error(err);
                        } else {
                            console.log('User profile add successful.')
                            res.json({message: 'User profile add successful.', id: newProfile.id, Email: newProfile.Email})  
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
            console.log('search endpoint hit');

            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);
            const NameArray = String(req.body.Search).split(" ");
            // var AllNames = new Array;

            if (!req.body.Search) {
                console.log('Missing search input');
                return Common.resultErr(res, {message: 'Missing fields'});
            }
            
            for(let name in NameArray){
                if (NameArray.length === 2){
                    const name_1 = NameArray[0]
                    const name_2 = NameArray[1]
                let CheckWholeName = await Account.find({FirstName: /.*name_1*/ , LastName: /.*name_2*/}, {_id: 1}).collation( { locale: "en", strength: 1 } );
                    if(CheckWholeName.hasOwnProperty(0) === true){
                        res.json(CheckWholeName);
                        break;
                    }
                    else{
                        Account.find({$or: [{FirstName: name_1}, {FirstName: name_2}, {LastName: name_1}, {LastName: name_2}]}, {_id: 1}, function(err, profiles){
                            res.json(profiles)}).collation( { locale: 'en', strength: 1 } )
                        break;
                    }
                }
                else{
                    const nam = String(NameArray[name])
                Account.find({$or: [{FirstName: nam}, {LastName: nam}]}, {_id: 1}, function(err, profiles){
                        res.json(profiles);
                        
                    }).collation( { locale: "en", strength: 1 } );
                    // var OneName = Account.find({$or: [{FirstName: nam}, {LastName: nam}]})
                    // AllNames[name] = OneName.toArray();
                    // console.log(AllNames)
                    // res.json(AllNames);
                   
                    break;
                }
        


            }
        
           
            
        } 
        catch(err) {
            return Common.resultErr(res, err.message);           
        }
    }

    async getById(req, res, next) {
        try {
            // make sure theres an id param supplied
            if (!req.params.id) {
                return Common.resultErr(res, 'No User ID supplied')
            }

            // // check headers and get token
            // console.log('Checking for token?!:', req.headers['authorization']);
            // const token = req.headers['authorization'].substr(7);

            // // verify token
            // jwt.verify(token, _JWTSECRET, (err, decoded) => {
            //     if(err) { 
            //         console.log('TOKEN FAIL!', err);
            //         return Common.resultForbidden(res);
            //     }

            //     if(decoded) {
            //         console.log('Token pass:', decoded);
            //         if ( req.params.id === decoded.id ) {
            //             console.log('Id from token and parameter match, get approved');
            //         } else {
            //             console.log('Token and param ID do not match, failing...');
            //             return Common.resultForbidden(res);
            //         }
            //     } else { console.log('token fail'); }
            // })

            // get user id
            const userId = req.params.id;

            // declare collection
            const Account = mongoose.model('USER_PROFILE', registrationModel.UserProfileSchema);

            // make the database call
            const data = await Account.findOne({_id: userId})

            // make sure there's data
            if (!data) {
                return Common.resultNotFound(res);
            } else {
                // removes username and password
                data.Password = null;
                data.Username = null;
                res.json({data});
            }

        } catch(err) {
            return Common.resultErr(res, err.message);    
        }
    }

    async advancedSearch(req, res, next){
        try {
            let formData = req.body;
            const userId = req.params.id;
            // console.log('Hello boyz', formData);

            const Account = mongoose.model("USER_PROFILE", registrationModel.UserProfileSchema);

            const Portfolio = mongoose.model("USER_PORTFOLIO", portfolioModel.portfolioSchema);

            const accountData = await Account.findOne({_id: userId});

            console.log(formData.minSkills, formData.searchByUser);

            res.json({message: 'Sending JSON'});
        } catch (err){
            return Common.resultErr(res, err.message);
        }
    }
}

module.exports = AccountController;