const fs = require('fs');
const path = require('path');
const root = require('../utils/util');
const filePath = path.join(root, 'fake-database', 'data.json');
const favPath = path.join(root, 'fake-database', 'fav.json');

// let allRegisteredHomes = [];
// // internal memory of class where it stores data 


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

    // save this 
    save() {
        // file should be written only when previous contents are completely read
        Home.fetchAll((fileContents) => {
            fileContents.push(this);

            fs.writeFile(filePath, JSON.stringify(fileContents), (err) => {
                if (err) {
                    console.log(err);
                    alert('ERROR DURING WRITING FILE!!');
                }
            })
        })
    }

    // fs.writeFile() can write only JSON data and can read what kind of data ?
    // retrieve all data inside the file because file conatins all registered homes
    static fetchAll(taskAfterFileRead) {
        // 1.) Read file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                alert('ERROR DURING READING FILE!!');
            }
            let fileContents = [];

            // initially file is empty and parsing empty file gives ERROR            
            if (data && data.length > 0) { fileContents = JSON.parse(data); }
            // only parsing when file is not empty, we are writing an ARRAY in file --> while reading an ARRAY will be returned, so SIMPLY ASSIGN IT TO FILECONTENTS, making it push in FILECONTENTS WILL CREATE AN ARRAY OF ARRAY

            // 2.) let that function execute that makes some task happen only after file is completely read
            taskAfterFileRead(fileContents);
        })
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