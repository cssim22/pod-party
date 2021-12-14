/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user votes 
 *
 * ************************************
 */
const db = require('../models/models');
const votesController = {};
  
// GET ALL voteS
votesController.getVotes = (req, res, next) => {
   
  const voteQuery = 'SELECT * FROM "public"."votes" LIMIT 100';
   
  db.query(voteQuery)
    .then((data) => {
      res.locals.votes = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get votes controller: ${err}`,
      message: {err: 'error occured in get votes controller'}
    }));
};
 
// up vote
votesController.upvote = (req, res, next) => {
  const {podcast_id, user_id} = req.body;
     
  const votePost = `INSERT INTO votes (podcast_id, user_id, vote_type)
   VALUES ($1, $2, 'upvote') RETURNING vote_id;`;
 
  const params = [podcast_id, user_id];
 
  db.query(votePost, params)
    .then((data) => {
      console.log(data);
      res.locals.vote = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post votes controller: ${err}`,
      message: {err: 'error occured in post votes controller'}
    }));
};

// up vote
votesController.downvote = (req, res, next) => {
  const {podcast_id, user_id} = req.body;
     
  const votePost = `INSERT INTO votes (podcast_id, user_id, vote_type)
   VALUES ($1, $2, 'downvote') RETURNING vote_id;`;
 
  const params = [podcast_id, user_id];
 
  db.query(votePost, params)
    .then((data) => {
      res.locals.vote = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post votes controller: ${err}`,
      message: {err: 'error occured in post votes controller'}
    }));
};
 
//  Down vote
votesController.deleteVote = (req, res, next) => {
  const {vote_id} = req.body;
    
  const voteDelete = `DELETE FROM votes 
  WHERE vote_id = $1 RETURNING vote_id;`;

  const params = [vote_id];

  db.query(voteDelete, params)
    .then((data) => {
      console.log('successfully deleted vote');
      return next();
    })
    .catch((err) => next({
      log:`error in post votes controller: ${err}`,
      message: {err: 'error occured in post votes controller'}
    }));
};
 
module.exports = votesController;