const PortfolioController = require('./portfolio_controller');
const AccountController = require('./registration_controller');
const ImageController = require('./image_controller');
const express = require('express');
const router = express.Router();

const portfolioController = new PortfolioController(router);
const registrationController = new AccountController(router);
const imageController = new ImageController(router);

module.exports = router;