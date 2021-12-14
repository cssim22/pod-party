/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user users 
 *
 * ************************************
 */
const db = require('../models/models');
const usersController = {};
  
// GET ALL userS
usersController.getUsers = (req, res, next) => {
   
  const userQuery = 'SELECT * FROM "public"."users" LIMIT 100';
   
  db.query(userQuery)
    .then((data) => {
      res.locals.users = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get users controller: ${err}`,
      message: {err: 'error occured in get users controller'}
    }));
};
 
// POST A user
usersController.addUser = (req, res, next) => {
  const { userData } = res.locals;
  const { email } = userData;
  const first_name = userData.given_name;
  const last_name = userData.family_name;

  // const {email, first_name, last_name} = req.body;
  console.log(email, first_name, last_name);

  const query = 'INSERT INTO users (email, first_name, last_name, created_at) VALUES ($1, $2, $3, current_timestamp) ON CONFLICT("email") DO UPDATE SET first_name=EXCLUDED.first_name RETURNING user_id;';
 
  const params = [email, first_name, last_name];
 
  db.query(query, params)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post users controller: ${err}`,
      message: {err: 'error occured in post users controller'}
    }));
};
 
module.exports = usersController;