const PortfolioModel = require('../models/portfolio');
const Common = require('./common');
const mongoose = require('mongoose');
// const router = express.Router();

class PortfolioController {
    constructor(router) {
        router.route('/portfolio/add')
            .post(this.add);
        router.route('/portfolio/get')
            .get(this.getAll);
        router.route('/portfolio/delete')
            .delete(this.delete);
        router.route('/')
            .get(this.test);
    
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
            console.log('GET-ALL ENDPOINT HIT');
            res.json({message: 'getall endpoint hit'});
        } catch (e) {
            console.log('errrror:', e)
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
            Portfolio.findOne({User_ID: req.body.User_ID}, function(err, result) {
                if (result) {
                    // if there is a result, then a portfolio exists. cease and desist
                    console.log('Portfolio already exists, aborting add');
                    res.json({result: `Portfolio not added, there was already one listed`});
                    return;
                }
            });
            // create object that will pushed into the database
            const newPortfolio = new Portfolio({
                Email: req.body.Email,
                User_ID: req.body.User_ID,
                AboutBlurb: `This is text about me. I'm awesome. Let's talk about how awesome I am.`,
                Facebook: `https://www.facebook.com`,
                Twitter: `YourTwitterHandle`,
                Icon: `Keyboard`,
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
            newPortfolio.save(function(err, newPortfolio) {
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
                    Portfolio.remove({Email: req.body.Email}, function(err) {
                        if (err) {
                            res.json({message: err});
                            console.error(err)
                        } else {
                            res.json({result: 'Delete successful'});
                        }
                    })
                }
                
            });

            

        } catch(err) {
            return Common.resultErr(res, err.message);
        }
    } 
}

module.exports = PortfolioController;
