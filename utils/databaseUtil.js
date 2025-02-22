//For MySql

// const mysql = require('mysql2');   //for mysql

// const pool =  mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'airbnb'
// });

// module.exports =pool.promise();



const mongo = require('mongodb')

const MongoClient = mongo.MongoClient;

// const MONGO_URL =   //enter your string 

let _db;

const mongoConnect = (callback) =>{

    MongoClient.connect(MONGO_URL)
    .then(client=>{
        callback()
        _db = client.db('airbnb')
    }).catch(error =>{
        console.log(error)
    })
}

const getDB= () =>{

    if(!_db){
        throw new Error('Mongo not connected')
    }
    return _db
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;