const express = require('express');

const app = express();

// const fs = require('fs');

const path = require('path');

const root = require('./utils/util');

// const bodyParser = require('body-parser');

const { userRouter } = require('./Routers/userRouter');
const { hostRouter } = require('./Routers/hostRouter');
// const { registeredHomes } = require('./controllers/hostController');
const errorController = require('./controllers/errorController');
let Home = require('./models/AddedHomes');

// make public folder static
app.use(express.static(path.join(root,'public')));

// setting templating engine
app.set('view engine','ejs');
app.set('views','pages');

// home page tackling middlewares
app.get('/',(req,res,next)=>{
    // first get the fileContents(registeredhomes) and then render home.ejs
    // Home.fetchAll((fileContents)=>{
    //     res.render('home',{registeredhomes : fileContents});
    // })
    let promise = Home.fetchAll();
    promise.then(([rows,cols_def])=>{
        res.render('home',{registeredhomes : rows});
    })

})


app.use('/user',userRouter); 
app.use('/host',hostRouter);

// Not found page
app.use(errorController.pageNotFfound);

const {func_for_mongo_conn} = require('./utils/database');

func_for_mongo_conn((client) => {
    app.listen(4002, () => {
        console.log("Server started at http://localhost:4002");
    }
    )
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