
const connect  = require('./database/dbConnect');
const express = require('express');
const app = express();
const session = require('express-session');
const config = require("./config/config");
const path = require('path');
require('dotenv').config();
connect();
const cors = require('cors');

app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({ 
    secret: config.sessionSecret,
    resave:false,
    saveUninitialized:true,    
}));

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
  });

app.set('view engine', 'ejs');
// app.set("views", "./views/userViews");
app.use('/public',express.static(path.join(__dirname, './public')));

// MULTER IMAGE PATH FOR FROND END
app.use('/productImages', express.static(path.resolve(__dirname, 'productImages')));
app.get('/', (req, res)=>{
    res.status(200).send('404')
})
//app.use('/', require('./router/userRoutes'));//for user  side requests

app.get('*', (req, res)=>{
    res.status(404).render('404')
})

//middleware auth
const userAuth = require("./middleware/userAuth");

//controllers
const userController = require("./controller/userController");





app.listen(3006,()=>{
    console.log(`server running at http://localhost:3006`);
})
