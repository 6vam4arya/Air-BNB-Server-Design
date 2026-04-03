const mongoose = require('mongoose');

// Home Schema
const home = new mongoose.Schema({
    housename : {type : String, required : true},
    cost : {type : Number, required : true},
    location : {type: String, required : true},
    rating : {type: Number, required : true},
    description : {type : String, required : true}
})

// Home Model
module.exports.Home = mongoose.model("Home",home);


// Favourites Schema
const fav = new mongoose.Schema({
    homeID : {type : mongoose.Schema.Types.ObjectId, ref : 'Home', required : true, unique : true}
})

// Favourites Model
module.exports.Favourites = mongoose.model("Favourites",fav);