const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

/** Helper function to return signed
 * JWT from user data.
 */

 function createToken(user) {
   let payload = {
     userId: user.id,
     email: user.email
   };

   return jwt.sign(payload, SECRET);
 }

 module.exports = createToken;