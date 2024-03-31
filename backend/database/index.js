const { Pool } = require("pg");
require("dotenv").config();
/*
let pool;
if ((process.env.IS_PROD = 1)) {
  console.log("conectando a base de datos en produccion");
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
} else {
  console.log("conectando a base de datos en dev");
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
  });
}
*/
/*
console.log("first");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
*/

pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

module.exports = pool;
