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

/** POST /transactions/ 
 * { user_id, 
 *   ticker_symbol, 
 *   shares, 
 *   price, 
 *   total_paid, 
 *   account_balance 
 * } => {transaction: [ transaction ] } 
 */
router.post('/', async function(req, res, next) {
  try {
    const transaction = await Transaction.buyStock(req.body);
    return res.json({ transaction });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;