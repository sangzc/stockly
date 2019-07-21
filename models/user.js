const moment = require('moment');
const ExpressError = require('../helpers/expressError');

const db = require('../db');

/** Related functions for users. */

class User {

  /** Find user by ID: */
  static async getById(id) {
    // Query the db for the user by id
    const result = await db.query(
      `SELECT * FROM users WHERE id = $1`, 
      [id]);
    
    // Throw an error if the user can't be found
    if (result.rows.length === 0) {
      throw new ExpressError(`No such user: ${id}`, 404);
    }

    // Grab the first result
    const user = result.rows[0];

    // Return a User class with retrieved values
    return user;
  }

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
    console.log("DATA.FULLNAME", data);
    const result = await db.query(
      `INSERT INTO users
        (full_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, full_name, email, cash_balance`,
        [
          data.full_name,
          data.email,
          data.password,
        ]);

    const user = result.rows[0]

    return user;
  }
}

module.exports = User;