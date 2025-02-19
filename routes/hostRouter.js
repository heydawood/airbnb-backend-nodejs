
// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const hostController = require('../controllers/hostController') //controller giving data to routers


hostRouter.get("/add-home", hostController.getAddHome)   //router
hostRouter.post("/add-home", hostController.postAddHome) //router
hostRouter.get("/host-home-list", hostController.getHostHomes)   //router
hostRouter.get("/edit-home/:homeId", hostController.getEditHome) 
hostRouter.post("/edit-home", hostController.postEditHome) 

module.exports = hostRouter;