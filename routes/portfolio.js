const express = require('express');
const router = express.Router();

const { authRequired } = require('../middleware/auth');

const Transaction = require('../models/transaction');

router.get('/', authRequired, async function(req, res, next) {
  try {
    const stocks = await Transaction.getStocksByUser(req.userId);
    return res.json({ stocks });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;