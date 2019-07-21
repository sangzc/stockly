const db = require('../db');

class Transaction {

  static async getAllByUserId(userId) {
    const result = await db.query(
      `SELECT * 
       FROM transactions
       WHERE user_id = $1`,
       [
         userId,
       ]
    );
    const transactions = result.rows;
    return transactions;
  }

  static async buyStock(data) {
    const result = await db.query(
      `INSERT INTO transactions
        (user_id,
        ticker_symbol,
        shares,
        price,
        total_paid,
        account_balance)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *
      `,
      [
        data.user_id,
        data.ticker_symbol,
        data.shares,
        data.price,
        data.total_paid,
        data.account_balance
      ]);

      return result.rows[0];
  }
}

module.exports = Transaction;