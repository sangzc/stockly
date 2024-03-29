const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const ExpressError = require('../helpers/expressError');

/** Validate Token Middleware */

function authRequired(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.email = token.email;
    req.userId = token.userId;
    return next();
  }
  catch (err) {
    let unauthorized = new ExpressError("You must authenticate first.", 401);
    return next(unauthorized);
  }
}

module.exports = {
  authRequired,
}
