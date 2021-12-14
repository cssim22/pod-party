/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle authentication operations such as encrypting passwords, checking encrypted passwords, etc.
 *
 * ************************************
 */
const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/commentsController');
const groupsController = require('../controllers/groupsController');
const podcastsController = require('../controllers/podcastsController');
const votesController = require('../controllers/votesController');
const userController = require('../controllers/usersController');

