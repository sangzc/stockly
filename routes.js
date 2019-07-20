const express = require('express');
const router = new express.Router();
const db = require('./db');

/** Homepage: show login/signup or homepage
 * depending on if user is logged in
 */

router.get('/', function(req, res, next) {
  return res.render('base.html');
});

/** Form to login */

router.get('/login', function(req, res, next) {
  return res.send('hello world');
});

/** Handle logging in of user */

router.post('/login', function(req, res, next) {
  return res.send('hello world');
});

/** Form to signup */

router.get('/signup', function(req, res, next) {
  return res.send('hello world');
});

/** Handle signing up a new user */

router.post('/portfolio', function(req, res, next) {
  return res.send('hello world');
});

/** Display user's portfolio with current values */

router.get('/portfolio', function(req, res, next) {
  return res.send('hello world');
});

/** Display a list of all the users transactions
 * only if the user is signed in
 */

router.get('/transactions', function(req, res, next) {
  return res.send('hello world');
});

module.exports = router;