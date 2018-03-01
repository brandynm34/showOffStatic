const PortfolioController = require('./portfolio_controller');
const express = require('express');
const router = express.Router();

const portfolioController = new PortfolioController(router);

module.exports = router;