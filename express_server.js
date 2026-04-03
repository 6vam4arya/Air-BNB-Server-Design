const express = require('express');
const app = express();
const path = require('path');
const root = require('./utils/util');
const { userRouter } = require('./Routers/userRouter');
const { hostRouter } = require('./Routers/hostRouter');
const errorController = require('./controllers/errorController');
let {Home} = require('./models/schemas');

// make public folder static
app.use(express.static(path.join(root,'public')));

// setting templating engine
app.set('view engine','ejs');
app.set('views','pages');

// home page tackling middlewares
app.get('/',(req,res,next)=>{
    let promise = Home.find();
    promise.then((all_homes)=>{
        res.render('home_for_user',{registeredhomes : all_homes});
    })

})


app.use('/user',userRouter); 
app.use('/host',hostRouter);

// Not found page
app.use(errorController.pageNotFfound);

const {func_for_mongo_conn} = require('./utils/database');

const data = [{"housename":"Purple Floral Princess Theme Room","cost":"2000","rating":"4.9","location":"UK","id":0.895958837773043,"description":"A charming princess-themed room adorned with lavender walls, floral accents, and a cozy reading nook. Perfect for a fairytale experience."},{"housename":"Golden Sunset Luxury Villa","cost":"5000","rating":"5","location":"India","id":0.9006507756243529,"description":"An opulent villa with sweeping sunset views, golden decor, and spacious living areas, designed for ultimate comfort and elegance."},{"housename":"Ocean Breeze Coastal Retreat","cost":"30000","rating":"4","location":"Australia","id":0.8951454415797693,"description":"A serene coastal house with ocean views, airy interiors, and a relaxing veranda. Ideal for escaping the hustle and reconnecting with nature."}];


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Varya:roMONotin4Godb@cluster0.fum95in.mongodb.net/?appName=Cluster0").then(() => {
    console.log("Mongoose connected to MongoDB");
    func_for_mongo_conn((client) => {
        app.listen(4002, () => {
            console.log("MongoDB Connected to Application");
            console.log("Server started at http://localhost:4002");
        })
    })
})


































// // Old way of home-tackling
// app.get('/',(req,res)=>{
//     console.log("Home Page");
//     // res.sendFile(path.join(root,'pages','home.html')); now it's an ejs file
//     res.render('home',{registeredhomes : Home.fecthAll()});    
// })

// '''Incoming Data Parsing without BodyParser'''

// submit form handling --> ensure to tackle data only if someone brings it here 
// app.post('/submit-form', (req, res, next) => {
//     let buffer = [];
//     req.on("data", (chunk) => {
//         buffer.push(chunk);
//     })
//     // Buffered data is ready 

//     req.on('end', () => {
//         const query_string = Buffer.concat(buffer).toString();
//         // Query String is ready

//         const parsed_obj = new URLSearchParams(query_string);
//         // parsed data is ready

//         const final = Object.fromEntries(parsed_obj);
//         // final contains data in key-value pairs
//         // fs.writeFile(user-details.txt,final);
//         // write method --> overwrite
//         fs.writeFile('user-details.txt',JSON.stringify(final),(err)=>{
//             if(err){console.log(err);}
//         })

//         res.send(`<h2>Your response has been recorded!</h2>`);
//     })
// })

// '''Incoming data parsing with bodyparser'''

// app.post('/submit-form',bodyParser.urlencoded());

// app.post('/submit-form',(req,res,next)=>{
//     fs.writeFile("my.txt",JSON.stringify(req.body),(err)=>{
//         if(err){
//             console.log(err);
//         }
//     })
//     res.sendFile(path.join(root,'pages','submit-form.html'));
// })



// name is an identification for what the entered value represents