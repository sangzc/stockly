const moment = require('moment');

const db = require('./db');

/** A user in the system */

class User {
  constructor(
    id, 
    full_name, 
    email, 
    password,
    cash_balance,
  ) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.cash_balance = cash_balance;
  }

  /** Queries the db for a user by id
   *  input: id
   *  output: new User(id, full_name, email, password, cash_balance)
   */
  static async getById(id) {
    // Query the db for the user by id
    let result = await db.query(
      `SELECT * FROM users WHERE id = $1`, [id]
      );
    
    // Throw an error if the user can't be found
    if (result.rows.length === 0) {
      throw new Error(`No such user: ${id}`);
    }

    // Grab the first result
    let u = result.rows[0];

    // Return a User class with retrieved values
    return new User(
      id, 
      u.full_name,
      u.email,
      u.password,
      u.cash_balance,
    )
  }

}