/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user comments 
 *
 * ************************************
 */
const db = require('../models/models');
const commentsController = {};
 
// GET ALL COMMENTS
commentsController.getComments = (req, res, next) => {
  const {group_id} = req.body;
  const commentQuery = 'SELECT comments.comment, users.first_name FROM comments LEFT JOIN users ON comments.user_id = users.user_id where comments.group_id = $1;';
  
  const params = [group_id];
  db.query(commentQuery,params)
    .then((data) => {
      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get comments controller: ${err}`,
      message: {err: 'error occured in get comments controller'}
    }));
};

commentsController.getUserId = (req, res, next) => {
  const query = 'SELECT user_id, first_name from users WHERE email=$1;';
  const { email } = req.body;
  const parameters = [email];
  db.query(query, parameters)
    .then((data) => {
      console.log(data.rows);
      res.locals.user_id = data.rows[0].user_id;
      res.locals.first_name = data.rows[0].first_name;
      console.log(res.locals.user_id);
      return next();
    })
    .catch((err) => next(err));
};
// POST A COMMENT
commentsController.addComment = (req, res, next) => {
  const {comment, group_id } = req.body;
    
  console.log(req.body);
  const commentPost = 'INSERT INTO comments (comment, group_id, user_id, created_at) VALUES ($1, $2, $3, current_timestamp) RETURNING *;';

  const params = [comment, group_id, res.locals.user_id ];

  console.log('ADD COMMENT ' ,res.locals.user_id);
  db.query(commentPost, params)
    .then((data) => {
      res.locals.comment = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post comments controller: ${err}`,
      message: {err: 'error occured in post comments controller'}
    }));
};

//  DELETE A COMMENT
commentsController.deleteComment = (req, res, next) => {
  const {comment_id} = req.body;
    
  const commentDelete = `DELETE FROM comments
  WHERE comment_id = $1 RETURNING comment_id;`;

  const params = [comment_id];

  db.query(commentDelete, params)
    .then((data) => {
      res.locals.comment = data.rows[0];
      console.log('successfully deleted comment');
      return next();
    })
    .catch((err) => next({
      log:`error in post comments controller: ${err}`,
      message: {err: 'error occured in post comments controller'}
    }));
};


module.exports = commentsController;