const { Pool } = require("pg");
require("dotenv").config();

if ((process.env.IS_PROD = 1)) {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
} else {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
  });
}
module.exports = pool;
