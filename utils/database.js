// For connecting our application with database using MongoDB Driver
const mongodb = require('mongodb');

const mongoclient = mongodb.MongoClient;

const URL = "mongodb+srv://Varya:roMONotin4Godb@cluster0.fum95in.mongodb.net/?appName=Cluster0";

let DB;

const mongoConnect = (callback) =>{
    mongoclient.connect(URL)
    .then(client=>{
        console.log(client);
        DB = client.db("air-bnb");
        callback(client);
    })
    .catch(err=>{
        console.log(`There is an ERROR ${err}`);
    })
}

function GETdb(){
    if(DB){
        return DB;
    }
    else{
        throw new Error('Database NOT CONNECTED');
    }
}

exports.GETdb = GETdb;
exports.func_for_mongo_conn = mongoConnect;
