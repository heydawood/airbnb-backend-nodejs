// Core Modules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/pathUtil')



const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json'); // reading data from local storage


module.exports = class Favourite {

    static addToFavourite(homeId, callback) {
        Favourite.getFavourites((favourites) => {

            if (favourites.includes(homeId)) {
                callback('Home already exists in favourites');
            } else {
                favourites.push(homeId)
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
            }
        })
    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? (JSON.parse(data)) : [])
        });
    }

    static deleteById(delHomeId, callback) {
        Favourite.getFavourites(homeIds => {
          homeIds = homeIds.filter(homeId => delHomeId !== homeId);
          fs.writeFile(favouriteDataPath, JSON.stringify(homeIds),callback);
        })
      }
    };