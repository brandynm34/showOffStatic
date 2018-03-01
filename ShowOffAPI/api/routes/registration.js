// THIS IS NOW OBSOLETE, LEAVING IT UP FOR REFERENCE
// THESE FUNCTIONS ARE NOW INSIDE THE REGISTRATIONS CONTROLLER. YOU SHOULD CHECK IT OUT, MAN.

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const registrationModel = require('../models/registration');


mongoose.connect('mongodb://admin:W18cohort@ds041678.mlab.com:41678/showoff', (err) => {
    if (err) {
        console.log('There was an error connecting to the database. Bummer.')
    } else {
        console.log('Connected to database. Huzzah.');
    }
});

const Profile = mongoose.model('REGISTRATION', registrationModel.registrationSchema);

router.get('/', function(req, res, next) {
    console.log('Base profile activated');
    res.json({message: 'and now the profile.js works too?!?!'})
}) 

router.get('/getAll', function(req, res, next) {
    console.log('Get all GET request activated. NOTE: THIS FUNCTION SHOULD NOT GO LIVE');
    Profile.find(function(err, profiles) {
        if (err) { return console.error(err); }
        res.json({results: profiles});
    })
})

router.post('/register', function(req, res, next) {
    console.log('API Endpoint: Register has been activated...');
    
    // make sure all required fields are there
    if (!req.body.Username || !req.body.FirstName || !req.body.LastName || !req.body.Password || !req.body.Email) {
        console.log('ERROR: A required field is missing.');
        res.send('ERROR: Required field missing');
    }

    // if we got this far, we have everything necessary
    console.log('Registering user with the following information:', req.body)
        const newProfile = new Profile({
            Username: req.body.Username,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            Email: req.body.Email
        })
        
        // make sure user name doesnt already exist
        Profile.findOne({Username: req.body.Username}, function(err, result) {
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

        

        //res.json({message: 'Complete'});
})

module.exports = router;