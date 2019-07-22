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

    const { 
      ticker_symbol, 
      shares, 
      price } = data.body;

    // Get the current cash balance for user
    const user = await db.query(
      `SELECT cash_balance 
      FROM users
      WHERE id = $1`,
      [
        data.userId,
      ]);
    
    const currentCashBalance = user.rows[0].cash_balance;

    // Calculate new cash balance
    const totalPaid = shares * price;
    const newCashBalance = currentCashBalance - totalPaid;

    console.log("CURRENT CASH BALANCE", currentCashBalance);
    
    // Make a new transaction
    const result = await db.query(
      `INSERT INTO transactions
        (user_id,
        ticker_symbol,
        shares,
        price,
        total_paid,
        account_balance)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *;
      `,
      [
        data.userId,
        ticker_symbol,
        shares,
        price,
        totalPaid,
        newCashBalance
      ]);

    // Update the user's cash balance
    await db.query(
      `UPDATE users
      SET cash_balance = $1
      WHERE id = $2;
      `,
      [
        newCashBalance,
        data.userId
      ]
    );

    return result.rows[0];
  }
}

module.exports = Transaction;