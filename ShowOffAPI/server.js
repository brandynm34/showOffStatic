const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(config.database, (err) => {
  useMongoClient: true;
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + 'showoff');
  }
});
app.set('superSecret', config.secret);

// API ROUTING
// middleware to use for all requests
app.use(function (req, res, next) {
  console.log('using router');
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//var routes = require('./api/routes/user_routes');

// Test route
router.get('/test', function (req, res) {
  res.json({ message: 'api really works!' });
});

// Prefix routes with /api
app.use('/api', router);

//var routes = require('./api/routes/doneRoutes'); //importing route
//routes(app); //register the route


// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
