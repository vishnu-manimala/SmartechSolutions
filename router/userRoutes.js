const express = require("express");
const userRoutes = express();
const multer = require('multer');


userRoutes.set("view engine", "ejs");
userRoutes.set("views", "./views/userViews");




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'productImages'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename for each uploaded image
    }
  });
  
  const upload = multer({ storage: storage });

//middleware auth
const authMiddlewares = require('../middleware/userAuth');

//controllers
const userController = require("../controller/userController");




//  ********************************  Routes  ********************************



//login page *****************  Login Routes  ***************

    
    userRoutes.get('/',authMiddlewares.isLoggedOut,userController.loadPasswordLogin);
    userRoutes.post('/',authMiddlewares.isLoggedOut,userController.userLoginPassword);
    userRoutes.get('/home',authMiddlewares.isLoggedIn,userController.loadHome);
    userRoutes.get('/bulk',authMiddlewares.isLoggedIn,userController.loadBulk);
    userRoutes.get('/daily.transaction',authMiddlewares.isLoggedIn,userController.loadDailyTransaction);
    userRoutes.post('/daily.transaction',authMiddlewares.isLoggedIn,userController.saveDailyTransaction);
    userRoutes.get('/formDatas',authMiddlewares.isLoggedIn,userController.fetchDatas);
    



//logout
userRoutes.post("/logout",authMiddlewares.isLoggedIn,userController.logoutUser);







module.exports = userRoutes;
