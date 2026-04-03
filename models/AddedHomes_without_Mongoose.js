const {GETdb} = require('../utils/database');

module.exports = class Home {
    // constructor method 
    constructor(housename, cost, rating, location, description,id=Math.random()) {
        this.housename = housename; //h_name is my property(changed to name on LHS)
        this.cost = cost;
        this.rating = rating;
        this.location = location;
        this.description = description;
        // assigning unique ID to every home
        this.id = id;
    }

    // function for getting entire database
    static getdb(){
        GETdb();
        // return type is an object
    }

    // write records(documents) into collections
    static save(home) {
        const db = GETdb();
        return db.collection("homes").insertOne(home);
        // returns a promise
    }

    // get all records(documents) of collection(homes)
    static fetchAll() {
        const db = GETdb();
        return db.collection("homes").find().toArray();
        // this is an async task and returns a promise
    }

    static findByID(id){
        const db = GETdb();
        return db.collection('homes').findOne({_id : ObjectId(id)});
    }

    AddToFav(callback) {

    }

    // Get All Favourites
    static GetFav(callback) {
    }
}