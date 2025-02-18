// Core Modules
//const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const homesController = require('../controllers/homes') //controller giving data to routers

userRouter.get("/", homesController.getHomes); //router and second argument is controller

module.exports = userRouter;