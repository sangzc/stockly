/** Database setup for cats. */
const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///ttp_fs_test";
} else {
  DB_URI = "postgresql:///ttp_fs";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;