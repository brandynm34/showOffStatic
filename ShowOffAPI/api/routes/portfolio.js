const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const portfolioModel = require('../models/portfolio');

// mongoose.connect("mongodb://admin:W18cohort@ds041678.mlab.com:41678/showoff", (err) =>{
//     if (err) {
//         console.log('There was an error connecting to the database. Bummer.')
//     } else {
//         console.log('Connected to the database. Huzzah.');
//     }
// });

const Portfolio = mongoose.model('USER_PORTFOLIO', portfolioModel.portfolioSchema);

//you can test in postman with this, but get rid of later and don't put info here.
router.get('/', (req, res, next) => {
    console.log('Base portfolio activated');
    
})

router.post('/', (req, res, next) =>{
    console.log('Let this work for once. That is all I ask.');

    //Checks if all required fields are filled out
    if(!req.body.Email || !req.body._id || !req.body.Theme){
        console.log('ERROR: A required field is missing');
        res.send('ERROR: Required field missing');
    }

    let newPortfolio = new Portfolio({
        Email: req.body.Email,
        UserPhoto: req.body.UserPhoto,
        _id: req.body._id,
        AboutBlurb: req.body.AboutBlurb,
        Facebook: req.body.Facebook,
        Twitter: req.body.Twitter,
        Icon: req.body.Icon,
        Website: req.body.Website,
        PhoneNumber: req.body.PhoneNumber,
        Projects: req.body.Projects,
        Theme: req.body.Theme
    });

    //Lets check to see if the profile exists
    Profile.findOne({_id: req.body._id}, (err) =>{
        if (err){
            res.json({success: false, msg: 'Portfolio already exists'});
        } else {
            res.json({success: true, msg: 'Portfolio created'})        
        }
    })


});

router.delete();

router.update();

module.exports = router;