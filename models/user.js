const moment = require('moment');
const ExpressError = require('../helpers/expressError');

const db = require('./db');

/** Related functions for users. */

class User {

  /** Find user by ID: */
  static async getById(id) {
    // Query the db for the user by id
    let result = await db.query(
      `SELECT * FROM users WHERE id = $1`, 
      [id]);
    
    // Throw an error if the user can't be found
    if (result.rows.length === 0) {
      throw new ExpressError(`No such user: ${id}`, 404);
    }

    // Grab the first result
    let user = result.rows[0];

    // Return a User class with retrieved values
    return user;
  }

}