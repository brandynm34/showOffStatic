const express = require('express');
const router = express.Router();

router.get('/lol', function(req, res, next) {
    res.json({ message: 'You are a winner!!!!11ONE'});
})

router.get('/boo', function(req, res, next) {
    res.json({ message: 'You are NOT a winner!!!!11ONE'});
})

module.exports = router;