const express = require('express');
const app = express();
const cors = require("cors");

const ExpressError = require('./helpers/expressError');

const routes = require('./routes');

/** Parse body into JSON format */
app.use(express.json());

/** Use cors */
app.use(cors());

/** Add routes */
app.use(routes);

/** Handle 404's 
 * If no routes are matched, return 404 error
*/

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  //pass the error to the next piece of middleware
  return next(err);
});

/** Error Handler
 * This catches all the errors that get generated
 * and returns to the user a json message 
*/

app.use(function (err, req, res, next){
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});


module.exports = app;