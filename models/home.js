// Core Modules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/pathUtil')


const homeDataPath = path.join(rootDir, 'data', 'homes.json'); // reading data from local storage


module.exports = class Home {
    constructor(houseName, price, location, ratings, photoUrl) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.ratings = ratings;
        this.photoUrl = photoUrl;
    }

    save() {
        this.id = Math.random().toString();
        Home.fetchAll(registeredHomes => {
            registeredHomes.push(this)
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
                console.log('File writing concluded', error)
            });
        })
    }

    static fetchAll(callback) {                // adding callback because reading file is async function data is coming from controller homes.js/getHomes function
        
        fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? (JSON.parse(data)) : [])
        });
    }

    static findById(homeId, callback){
        this.fetchAll(homes =>{
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound)
        })
    }

}