/**
 * ************************************
 *
 * @module Server
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Server listens on port 3000 and routes all incoming requests, handles global middleware errors and unknown endpoint errors
 *
 * ************************************
 */
// NPM Module Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;

// Including our Oauth2 config file
const CONFIG = require('../config');

// Router Imports
const db = require('./models/models');
const apiRouter = require('./routes/apiRouter');

// Controller Imports
const oAuthController = require('./controllers/oAuthController');
const userController = require('./controllers/usersController');
const podcastsController = require('./controllers/podcastsController');
const groupsController = require('./controllers/groupsController');
const commentsController = require('./controllers/commentsController');
const votesController = require('./controllers/votesController');

const app = express();
const PORT = 3000;

// Parses incoming requests
app.use(express.json()); // parses request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookie header and populate the property req.cookies
app.use(express.static(path.resolve(__dirname, '../docs')));

// Setting up EJS Views
app.set('view engine', 'ejs');
app.set('views', __dirname);

/** ****************** Server Route Handlers *********************** */

app.use(express.static(path.resolve(__dirname, '../public'))); // potentially unecessary

// Generate the Authentication Link and Render the index.ejs file to client
app.get('/', oAuthController.generateAuthUrl, (req, res) => {
  const { loginLink } = res.locals;
  res.render(path.resolve(__dirname, '../client/index'), { loginLink });
});

app.get(
  '/auth_callback',
  oAuthController.getToken,
  oAuthController.getUserData,
  userController.addUser,
  (req, res, next) => {
    return res.redirect('/home');
  }
);

app.get('/home', (req, res) => {
  if (!req.cookies.jwt) {
    // We haven't logged in
    return res.redirect('/');
  }
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );
  // Add this specific user's credentials to our OAuth2 client
  oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);

  return res.render(path.resolve(__dirname, '../client/home'));
});

app.get('/clubs', groupsController.getGroups, (req, res) => {
  return res.status(200).json(res.locals.groups);
});

app.post('/podcasts', podcastsController.getPodcasts ,(req, res) => {
  console.log('podcasts');
  return res.status(200).json(res.locals.podcasts);
});
app.post('/adduser', userController.addUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  return res.status(200).json('MESSAGES');
});

app.post('/addpodcast', podcastsController.addPodcast, (req, res) => {
  return res.status(200).json(res.locals.podcast);
});

app.delete('/deletepodcast',podcastsController.deletePodcast,(req, res) => {
  return res.status(200).json(res.locals.podcast);
}
);

app.post('/addgroup', groupsController.addGroup, (req, res) => {
  return res.status(200).json(res.locals.group);
});

app.delete('/deletegroup',groupsController.deleteGroup,(req, res) => {
  return res.status(200).json(res.locals.group);
}
);

app.post('/getcomments', commentsController.getComments, (req, res) => {
  return res.status(200).json(res.locals.comments);
});

app.post('/addcomment', commentsController.getUserId, commentsController.addComment, (req, res) => {
  return res.status(200).json(res.locals);
});

app.delete('/deletecomment',commentsController.deleteComment,(req, res) => {
  return res.status(200).json(res.locals.comment);
}
);

app.post('/addupvote', votesController.upvote, (req, res) => {
  return res.status(200).json(res.locals.vote);
});

app.post('/adddownvote', votesController.downvote, (req, res) => {
  return res.status(200).json(res.locals.vote);
});

app.delete('/deletevote',votesController.deleteVote,(req, res) => {
  return res.status(200).json(res.locals.vote);
}
);


/// ///////////////////////////////
// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  return res.status(404).json('404 Endpoint Not Found');
});

// Global Error Handler
app.get('/', (req, res, next, err) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Open up server on PORT
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

module.exports = app;
