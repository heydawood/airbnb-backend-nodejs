const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");





module.exports = class Home {
    constructor(houseName, price, location, ratings, photoUrl, description, _id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.ratings = ratings;
        this.photoUrl = photoUrl;
        this.description = description;
        if (_id) {
            this._id = _id;
        }
    }

    save() {
        const db = getDB();

        if (this._id) {  //updating current home details

            const updtedValues = {
                houseName: this.houseName,
                price: this.price,
                location: this.location,
                ratings: this.ratings,
                photoUrl: this.photoUrl,
                description: this.description
            }

            return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updtedValues })


        } else { //adding new home details
            return db.collection('homes').insertOne(this);
        }
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId) {
        const db = getDB();
        return db.collection('homes')
            .find({ _id: new ObjectId(String(homeId)) })
            .next();
    }

    static deleteById(homeId) {
        const db = getDB();
        return db.collection('homes')
            .deleteOne({ _id: new ObjectId(String(homeId)) })
    }
};
