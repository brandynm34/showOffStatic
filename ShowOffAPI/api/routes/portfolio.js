const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const portfolioModel = require('../models/portfolio');

mongoose.connect("mongodb://admin:W18cohort@ds041678.mlab.com:41678/showoff", (err) =>{
    if (err) {
        console.log('There was an error connecting to the database. Bummer.')
    } else {
        console.log('Connected to the database. Huzzah.');
    }
});

const Portfolio = mongoose.model('PORTFOLIO', portfolioModel.portfolioSchema);

router.get('/', function(req, res, next){
    console.log('Base portfolio activated');
    
})
