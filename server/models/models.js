/**
 * ************************************
 *
 * @module models.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Initializes a pool to connect application with elephantSQL cloud database and exports a function used to execute queries in the database
 *
 * ************************************
 */

const { Pool } = require('pg');

// Copy postgreSQL database connection URI below
const PG_URI = 'postgres://gmftnkge:bKfvlzi22eyRJRPBko9UhPqWIjWUnOJK@batyr.db.elephantsql.com/gmftnkge';
 
// Initialize pool connection
const pool = new Pool({
  connectionString: PG_URI,
});
 
module.exports = {
  query: function (text, params, callback) {
    console.log('executed query ', text);
    return pool.query(text, params, callback);
  }
};
 