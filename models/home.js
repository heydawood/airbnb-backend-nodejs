// Core Modules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/pathUtil')


module.exports = class Home {
    constructor(houseName, price, location, ratings, photoUrl) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.ratings = ratings;
        this.photoUrl = photoUrl;
    }

    save() {
        Home.fetchAll(registeredHomes => {
            registeredHomes.push(this)
            const homeDataPath = path.join(rootDir, 'data', 'homes.json'); //saving data into local storage coming from client
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
                console.log('File writing concluded', error)
            });
        })
    }

    static fetchAll(callback) {                // adding callback because reading file is async function data is coming from controller homes.js/getHomes function
        const homeDataPath = path.join(rootDir, 'data', 'homes.json'); // reading data from local storage
        fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? (JSON.parse(data)) : [])
        });
    }
}