const PortfolioController = require('./portfolio_controller');
const AccountController = require('./registration_controller');
const express = require('express');
const router = express.Router();

const portfolioController = new PortfolioController(router);
const registrationController = new AccountController(router);

module.exports = router;