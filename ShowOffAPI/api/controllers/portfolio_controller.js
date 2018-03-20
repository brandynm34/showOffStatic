const PortfolioModel = require('../models/portfolio');
const Common = require('./common');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const _JWTSECRET = process.env.JWTSECRET;
// const router = express.Router();

class PortfolioController {
    constructor(router) {
        router.route('/portfolio/add')
            .post(this.add);
        router.route('/portfolio/get/:id')
            .get(this.getById);
        router.route('/portfolio/update')
            .post(PortfolioController.tokenCheck, this.update);
        router.route('/portfolio/delete')
            .delete(this.delete);
        router.route('/portfolio/updatePhoto/:id')
            .post(PortfolioController.tokenCheck, this.updatePhoto);
        router.route('/')
            .get(this.test);
    
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
            // make sure the token payload matches the user currently logged in
            if(decoded) { 
               console.log('Token decoding pass... checking against id:', decoded);
               console.log(`Comparing ${decoded.id} vs ${req.body.User_ID}`);
               if ( decoded.id !== req.body.User_ID ) {
                   return Common.resultForbidden(res);
               }
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

    async getById(req, res, next) {
        try {
            // make sure a username was supplied
            if(!req.params.id) {
                return Common.resultErr(res, 'No User ID Supplied');
            }

            // get user id
            const userId = String(req.params.id);

            // declare collection
            const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);

            // make the database call
            console.log('Grabbing portfolio update with id ', req.params.id);
            const data = await Portfolio.findOne({User_ID: userId});
            if (!data) {
                return Common.resultNotFound(res)
            } else {
                res.json({data});
            }
        } catch(err) {
            return Common.resultErr(res, err.message);
        }
    }

    async update(req, res, next) {
        try {
            // make sure no required fields are missing
            if(!req.body.Email, !req.body.User_ID, !req.body.Icon, !req.body.SkillsArray) {
                console.log('Missing field, aborting.');
                return Common.resultErr(res, {message: 'Missing fields'});
            }

            // declare collection
            const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);            

            // go over non-required fields to avoid errors
            const AboutBlurb = req.body.AboutBlurb ? req.body.AboutBlurb : null;
            const Facebook = req.body.Facebook ? req.body.Facebook : null;
            const Twitter = req.body.Twitter ? req.body.Twitter : null;
            const Website = req.body.Website ? req.body.Website : null;
            const PhoneNumber = req.body.PhoneNumber ? req.body.PhoneNumber : '5595551234';
            const Projects = req.body.Projects ? req.body.Projects : [];
            const Theme = req.body.Theme ? req.body.Theme : 'Basic';
            const UserPhoto =req.body.UserPhoto ? req.body.UserPhoto: './../../../angular-src/src/assets/img/website/employees.png';

            console.log('Updating portfolio for user:', req.body.Email);

            // make sure the portfolio exists
            Portfolio.findOne({User_ID: req.body.User_ID}, function(err, result) {
                if (!result) {
                    // if there is a result, then a portfolio exists. cease and desist
                    console.log('Portfolio does not exist');
                    // res.json({result: `Portfolio does not exist. I cannot update what I cannot see...`});
                    return Common.resultNotFound(res, 'Portfolio does not exist. I cannot update what I cannot see...')
                }
            });

            // perform the update
            await Portfolio.update({User_ID: req.body.User_ID}, {
                Email: String(req.body.Email),
                AboutBlurb: String(AboutBlurb),
                Facebook: String(Facebook),
                Twitter: String(Twitter),
                Icon: String(req.body.Icon),
                Website: String(req.body.Website),
                SkillsArray: req.body.SkillsArray,
                PhoneNumber: String(PhoneNumber),
                Projects: Projects,
                Theme: String(Theme)
            })

            // success!!!
            console.log('Update successfull.');
            res.json({result: 'Update Successful!!'});

        } catch(err) {
            return Common.resultErr(res, err.message);
        }
    }

    async add(req, res, next) {
        try {
            console.log(`Profile API endpoint hit with the following body:`, req.body)
            // make sure an Email was sent as well as a user id
            if(!req.body.Email || !req.body.User_ID) {
                console.log('Missing field, aborting. Check your User_ID and email');
                return Common.resultErr(res, {message: 'Missing fields'});
            }

            // declare the collection
            const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);

            // make sure the portfolio doesnt exist so that we're not overwiting info
            await Portfolio.findOne({User_ID: req.body.User_ID}, function(err, result) {
                if (result) {
                    // if there is a result, then a portfolio exists. cease and desist
                    console.log('Portfolio already exists, aborting add');
                    res.json({result: `Portfolio not added, there was already one listed`});
                    return;
                }
            });
            // create object that will pushed into the database
            const newPortfolio = new Portfolio({
                Email: String(req.body.Email),
                UserPhoto: './../../../angular-src/src/assets/img/website/employees.png',
                User_ID: String(req.body.User_ID),
                AboutBlurb: `This is text about me. I'm awesome. Let's talk about how awesome I am.`,
                Facebook: `https://www.facebook.com`,
                Twitter: `YourTwitterHandle`,
                Icon: `coder`,
                Website: 'yourWebsite.com',
                SkillsArray: {
                    angular: false,
                    bootstrap: false,
                    c: false,
                    cSharp: false,
                    cPlusPlus: false,
                    css: false,
                    docker: false,
                    git: false,
                    html: false,
                    java: false,
                    javascript: false,
                    mongodb: false,
                    mySQL: false,
                    nodeJS: false,
                    php: false,
                    postgres: false,
                    python: false,
                    r: false,
                    ruby: false,
                    sas: false,
                    sass: false,
                    selenium: false,
                    sql: false,
                    wordpress: false
                },
                PhoneNumber: '5595551234',
                Projects: [],
                Theme: 'Basic'
            });
            console.log('Saving:', newPortfolio);
            // send object to the database
            await newPortfolio.save(function(err, newPortfolio) {
                if (err) {
                    return console.error(err);
                    res.json({message: err});
                } else {
                console.log('Portfolio add successful.');
                res.json({result: 'Portfolio add successful'});
                }
            })
        } catch (e) {
            return Common.resultErr(res, e.message);
        }
    } // end add

    async delete(req, res, next) {
        try {
            // make sure an Email was sent
            if(!req.body.Email) {
                console.log('No Email specified, aborting.');
                return Common.resultErr(res, {message: 'Email not supplied'});
            }
            //declare collection
            const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);

            // make sure record exists
            await Portfolio.findOne({Email: req.body.Email}, function(err, result) {
                if(err) {
                    return Common.resultErr(res, err.message);
                }
                if (!result) {
                    // if there is a result, then a portfolio exists. cease and desist
                    console.log('No record exists. You cannot delete what does not exist.');
                    return Common.resultErr(res, 'No such user');

                } else {
                    console.log('Deleting portfolio with the username', req.body.Email);
                    // aaaaand delete
                    // Portfolio.remove({Email: req.body.Email}, function(err) {
                    //     if (err) {
                    //         res.json({message: err});
                    //         console.error(err)
                    //     } else {
                    //         res.json({result: 'Delete successful'});
                    //     }
                    // })
                }
                
            });

            

        } catch(err) {
            return Common.resultErr(res, err.message);
        }
    }
    
    async updatePhoto(req, res, next) {
        try {
            console.log('Update photo endpoint hit');

            // make sure photo is included
            if (!req.body.UserPhoto) {
                console.log ('Error: update photo attempted without photo');
                return Common.resultErr(res, 'No photo supplied');
            }
            
            // get id
            const id = req.params.id;

            // declare collections
            const Portfolio = mongoose.model('USER_PORTFOLIO', PortfolioModel.portfolioSchema);

            // update query
            console.log('Initiating photo update.');
            await Portfolio.update({User_ID: id}, {UserPhoto: req.body.UserPhoto});

            res.json({result: 'Photo update success...'});

        } catch (err) {
            return Common.resultErr(res, err.message);
        }
    }
}

module.exports = PortfolioController;
