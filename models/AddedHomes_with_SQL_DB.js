const db = require('../utils/database');

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

    // write records into file
    save() {
        db.execute('INSERT INTO homes (id,houseName,location,rating,cost,description) VALUES(?,?,?,?,?,?)',[this.id,this.housename,this.location,this.rating,this.cost,this.description]);
    }

    // get all records
    static fetchAll() {
        return db.execute('SELECT * FROM homes');
        // (returning the promise which will execute this task)
    }

    // already present data is in form of "Array of Objects"

    AddToFav(callback) {
        // (i.) get all existing favourite homes --> read "fav.json"
        Home.GetFav((favHomes) => {
            // (ii.) If home to be added in fav is ALREADY ADDED
            let AddedorNot = favHomes.find((el) => { return el.id == this.id; })

            // (iii.) If already added, raise an alert : undefined --> not Found --> To Be Added
            if (AddedorNot !== undefined) {
                console.log("This home is already in your favourites!");
            }

            else {
                // (iv.) add new FAV home object to it

                favHomes.push(this);

                // (v.) write entire list to "fav.json"
                fs.writeFile(favPath, JSON.stringify(favHomes), (err) => {
                    if (err) {
                        console.log("ERROR IN WRITING TO FAV FILE");
                        console.log(err);
                    }
                })
            }
            callback();
        })

    }

    // Get All Favourites
    static GetFav(callback) {
        // (i.) get all existing favourite homes --> read "fav.json"
        let favHomes = [];
        fs.readFile(favPath, (err, data) => {
            if (!err && data.length > 0) { favHomes = JSON.parse(data); }
            callback(favHomes);
        })
    }
}

// // Old Save Method 
//     save(){
//         // 1.) Get all data currently in file
//         allRegisteredHomes.push(Home.fecthAll());

//         // 2.) Add new home 
//         allRegisteredHomes.push(this);
        
//         // 3.) Write entire thing into file
//         fs.writeFile(filePath,JSON.stringify(allRegisteredHomes),(err,data)=>{
//             if(err) console.log(err);
//         })
        
//     }