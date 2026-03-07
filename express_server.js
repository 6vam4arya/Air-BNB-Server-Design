const express = require('express');

const app = express();

const fs = require('fs');

const path = require('path');

const root = require('./utils/util');

const bodyParser = require('body-parser');

const { userRouter } = require('./Routers/userRouter');
const { hostRouter } = require('./Routers/hostRouter');
const { registeredHomes } = require('./Routers/hostRouter');

// make public folder static
app.use(express.static(path.join(root,'public')));

// setting templating engine
app.set('view engine','ejs');
app.set('views','pages');

// home page tackling middlewares

app.get('/',(req,res)=>{
    console.log("Home Page");
    // res.sendFile(path.join(root,'pages','home.html')); now it's an ejs file
    res.render('home',{registeredhomes : registeredHomes});    
})

app.use(userRouter); 
app.use(hostRouter);

// Not found page
app.use((req,res,next)=>{
    console.log('This is NOT FOUND!');
    res.status(404).render('404');
})

app.listen(4002,()=>{
    console.log("Server started at http://localhost:4002");
})

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