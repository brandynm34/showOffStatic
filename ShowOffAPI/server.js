const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
app.disable('x-powered-by');

// test env
console.log('env test', process.env.TEST);

//registering routes
const user_profile = require('./api/routes/user_profile');
const main_controller = require('./api/controllers/main_controller');
// const portfolio = require('./api/routes/portfolio');
const port = process.env.PORT || 8100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cookie-session middleware to enable cookies that will eventually hold login info
app.use(cookieSession({
  name: 'session',
  keys: [ process.env.COOKIESECRET ],
 
  // Cookie Options
  maxAge: 2 * 60 * 60 * 1000 // 2 hours
}))

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

// CORS
// This allows client applications from other domains use the API Server
app.use( function( req, res, next ) {
  var allowedOrigins = ['http://192.168.99.100:4200', 'http://localhost:4200'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.header('Access-Control-Allow-Origin', origin);
  }
  // res.header( "Access-Control-Allow-Origin", "http://192.168.99.100:4200, http://localhost:4200" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-XSRF-TOKEN, Content-Security-Policy, X-Frame-Options" );
  res.header( "Access-Control-Allow-Methods", "GET,POST,PUT,DELETE" );
  res.header( "Content-Security-Policy", "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';" );
  res.header( "X-Frame-Options", "DENY");
  next();
} );

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
  console.log('API hit');
  // console.log('cookie test?: ', req.session);
  // console.log('body', req.body);
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
