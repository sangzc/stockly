const ExpressError = require('../helpers/expressError');
const bcrypt = require('bcrypt');
const db = require('../db');

const BCRYPT_WORK_FACTOR = 10;

/** Related functions for users. */

class User {

  /** Find user information  */
  static async getUserInfo(data) {
    // Query the db for the user by id
    const result = await db.query(
      `SELECT * FROM users WHERE id = $1`, 
      [data.id]);
    
    // Throw an error if the user can't be found
    if (result.rows.length === 0) {
      throw new ExpressError(`No such user: ${id}`, 404);
    }

    // Grab the first result
    const user = result.rows[0];

    // Return a User class with retrieved values
    return user;
  }

  /** Register a new User */
  static async register(data) {
    const duplicateCheck = await db.query(
      `SELECT *
          FROM users
          WHERE email = $1`,
      [data.email]
    );

    if (duplicateCheck.rows[0]) {
      const err = new ExpressError(
        `There already exists a user with this email ${data.email}`,
        409
      );
      throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (full_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, full_name, email, cash_balance`,
        [
          data.full_name,
          data.email,
          hashedPassword,
        ]);

    const user = result.rows[0]

    return user;
  }

  /** Authenticate a User */
  static async authenticate(data) {
    // Get user record
    const result = await db.query(
      `SELECT * 
       FROM users 
       WHERE email = $1`, 
      [data.email]);
    
    const user = result.rows[0];
    
    if (user) {
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid){
        return user;
      }
    }

    const invalidPass = new ExpressError('Invalid Credentials', 401);
    throw invalidPass;

  }
}

module.exports = User;