const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');

//registering routes
const user_profile = require('./api/routes/user_profile');
const main_controller = require('./api/controllers/main_controller');
// const portfolio = require('./api/routes/portfolio');
const port = process.env.PORT || 8100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE
mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// mongoose.Promise = global.Promise;
// mongoose.connect(config.database, (err) => {
//   useMongoClient: true;
//   if (err) {
//     console.log('Could NOT connect to database: ', err);
//   } else {
//     console.log('Connected to database!!!');
//   }
// });
// app.set('superSecret', config.secret);

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

app.use('/api-new', main_controller);
// app.use('../models/user_profile:_id');
// Prefix routes with /api
app.use('/api', router);

//var routes = require('./api/routes/doneRoutes'); //importing route
//routes(app); //register the route


// START THE SERVER
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
