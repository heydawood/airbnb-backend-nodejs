
// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const homesController = require('../controllers/homes') //controller giving data to routers


hostRouter.get("/add-home", homesController.getAddHome)   //router
hostRouter.post("/add-home", homesController.postAddHome) //router

exports.hostRouter = hostRouter;