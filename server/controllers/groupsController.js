/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user groups 
 *
 * ************************************
 */
const db = require('../models/models');
const groupsController = {};
  
// GET ALL GROUPS
groupsController.getGroups = (req, res, next) => {
  console.log('BODY ', req.body);
  const groupQuery = 'SELECT * FROM groups';
   
  db.query(groupQuery)
    .then((data) => {
      res.locals.groups = data.rows;
      console.log('RES LOCALS: ', res.locals.groups);
      return next();
    })
    .catch((err) => next({
      log:`error in get groups controller: ${err}`,
      message: {err: 'error occured in get groups controller'}
    }));
};
 
// POST A GROUP
groupsController.addGroup = (req, res, next) => {
  const {group_name } = req.body;
  console.log(group_name);
  const groupPost = 'INSERT INTO groups (group_name, created_at) VALUES ($1, current_timestamp) RETURNING *';
 
  const params = [group_name];
 
  db.query(groupPost, params)
    .then((data) => {
      console.log('data ', data.rows[0]);
      res.locals.group = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post groups controller: ${err}`,
      message: {err: 'error occured in post groups controller'}
    }));
};
 
//  DELETE A GROUP
groupsController.deleteGroup = (req, res, next) => {
  const {group_id} = req.body;
     
  const groupDelete = `DELETE FROM groups
   WHERE group_id = $1 RETURNING group_id;`;
 
  const params = [group_id];
 
  db.query(groupDelete, params)
    .then((data) => {
      console.log('successfully deleted group');
      res.locals.group = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post groups controller: ${err}`,
      message: {err: 'error occured in post groups controller'}
    }));
};

// ADD A GROUP USER
groupsController.addGroupUser = (req, res, next) => {
  const {user_id, group_id, created_at} = req.body;
    
  const groupUserPost = `INSERT INTO users_groups (user_id, group_id, created_at)
  VALUES ($1, $2, $3);`;

  const params = [user_id, group_id, created_at];

  db.query(groupUserPost, params)
    .then((data) => {
      res.locals.group = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post groups user controller: ${err}`,
      message: {err: 'error occured in post groups user controller'}
    }));
};
//  DELETE A GROUP USER
groupsController.deleteGroupUser = (req, res, next) => {
  const {user_id, group_id} = req.body;
    
  const groupUserDelete = `DELETE FROM users_groups
  WHERE user_id = $1
  AND group_id = $2;`;

  const params = [user_id, group_id];

  db.query(groupUserDelete, params)
    .then((data) => {
      res.locals.group = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post groups user deletecontroller: ${err}`,
      message: {err: 'error occured in post groups user deletecontroller'}
    }));
};
 
module.exports = groupsController;