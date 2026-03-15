const path = require('path');
const root = require('../utils/util');
const favPath = path.join(root, 'fake-database', 'fav.json');
const Home = require('../models/AddedHomes');

exports.bookHome = (req, res, next) => {
    res.render('book-home');
};

exports.getHomeDetails = (req, res, next) => {
    console.log(`Requested home details are of : ${req.params.homeID}`);
    // response = object of registeredhome having passed homeID
    let promise = Home.fetchAll();
    promise.then((fileContents) => {
        const reqHome = fileContents.find((element) => {
            return element.id == req.params.homeID;
        })
        // if reqHome is undefined
        if (reqHome == undefined) {
            res.status(404).render('home-details/homeNotFound', { ID: req.params.homeID });
        }
        else {
            console.log(reqHome);
            // render a page with home details
            res.render('home-details/home1', { homeID: req.params.homeID, homeObj: reqHome });
        }
    })
};

exports.addtofav = (req, res, next) => {
    // (i.) get home that is added to fav
    const ID = req.params.homeID;

    // (ii.) get home obj
    let promise = Home.fetchAll();
    promise.then((fileContents) => {
        let reqHome = fileContents.find((el) => {
            return el.id == ID;
        })

        // (iii.) If no such home exists --> show Home Not Found
        if (reqHome == undefined) {
            res.status(404).render('home-details/homeNotFound', { ID: req.params.homeID });
        }
        // (iv.) Else if found, create an obj of Home class for it and call AddToFav()
        else {
            const newHome = new Home(reqHome.housename, reqHome.cost, reqHome.rating, reqHome.location, reqHome.description,reqHome.id)
            // make sure rendering of SUCCESSFULL ADDITION is done only when home gets successfully added
            newHome.AddToFav(()=>{res.render('favAddDone',{homeID : reqHome.id});})
        }        
    })    

}

exports.getFav = (req, res, next) => {
    Home.GetFav((favFileContents) => {
        res.render('fav', { favHomes: favFileContents });
    })
}