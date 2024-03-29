const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');

router.post('/', async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;