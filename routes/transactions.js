const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction');
const { authRequired } = require('../middleware/auth');

/** ROUTE TO GET ALL TRANSACTIONS FOR A USER 
 * GET /transactions/:userid => {transactions: [transaction, ...]} */

router.get('/', authRequired, async function(req, res, next) {
  try {
    const transactions = await Transaction.getAllByUserId(req.userId);
    return res.json({ transactions });
  }

  catch (err) {
    return next(err);
  }

});

/** ROUTE TO BUY A STOCK  
 * 
 * POST /transactions/ 
 * { user_id, 
 *   ticker_symbol, 
 *   shares, 
 *   price, 
 *   total_paid, 
 *   account_balance 
 * } => {transaction: [ transaction ] } 
 */
router.post('/', authRequired, async function(req, res, next) {
  try {
    const transaction = await Transaction.buyStock(req);
    return res.json({ transaction });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;