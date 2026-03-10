let allRegisteredHomes = [];
// internal memory of class where it stores data 


module.exports = class Home {
    // constructor method 
    constructor(name,cost,rating,location){
        this.name = name; //h_name is my property(changed to name on LHS)
        this.cost = cost;
        this.rating = rating;
        this.location = location;
    }

    // save this 
    save(){
        allRegisteredHomes.push(this);
    }

    // retrieve all
    static fecthAll(){
        return allRegisteredHomes;
    }
}