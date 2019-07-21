const express = require('express');
const router = express.Router();

const User = require('../models/user');

/** GET users/:id => {users: [user, ...]} */

router.get('/:id', async function(req, res, next) {
  try {
    const users = await User.getById(req.params.username);
    return res.json({user});
  }

  catch (err) {
    return next(err);
  }
});

/** POST users/ {userdata} => {user: user} */

router.post('/', async function(req, res, next) {
  try {
    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch(err) {
    return next(err);
  }
})

module.exports = router;