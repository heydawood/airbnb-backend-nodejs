// Core Modules
//const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const storeController = require('../controllers/storeController') //controller giving data to routers

storeRouter.get("/", storeController.getIndex); //router and second argument is controller
storeRouter.get("/homes", storeController.getHomes); //router and second argument is controller
storeRouter.get("/bookings", storeController.getBookings); //router and second argument is controller
storeRouter.get("/favourites", storeController.getFavouriteList); //router and second argument is controller
storeRouter.post("/favourites", storeController.postAddToFavourite); //router and second argument is controller
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite); //router and second argument is controller

storeRouter.get("/homes/:homeId", storeController.getHomeDetails); //router and second argument is controller

module.exports = storeRouter;