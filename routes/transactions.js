const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction');

/** GET /transactions/:userid => {transactions: [transaction, ...]} */

router.get('/:userid', async function(req, res, next) {
  try {
    const transactions = await Transaction.getAllByUserId(req.params.userid);
    return res.json({ transactions });
  }

  catch (err) {
    return next(err);
  }

});

module.exports = router;