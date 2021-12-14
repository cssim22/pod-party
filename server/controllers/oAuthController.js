/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handles Google OAuth Authentication 
 *
 * ************************************
 */

// NPM Module Imports
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
// Including our Oauth2 config file
const CONFIG = require('../../config');

const oAuthController = {};

oAuthController.generateAuthUrl = (req, res, next) => {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  // Obtain the google login link to which we'll send our users to give us access
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
  });

  res.locals.loginLink = loginLink;

  return next();
};

oAuthController.getToken = (req, res, next) => {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  if (req.query.error) {
    return res.redirect('/');
  }
  else{
    oauth2Client.getToken(req.query.code, 
      function (err, token) {
        if (err) {
          return res.redirect('/');
        }
        res.locals.token = token.access_token;
        // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
        res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
        
        return next();
      });
  }
};

oAuthController.getUserData = (req, res, next) => {
  const url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${res.locals.token}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.cookie('id', JSON.stringify(data.id));
      res.cookie('email', data.email);
      res.cookie('first_name', data.given_name);
      res.cookie('last_name', data.family_name);
      res.cookie('picture', data.picture);
      res.locals.userData = data;
      return next();
    });
};

module.exports = oAuthController;