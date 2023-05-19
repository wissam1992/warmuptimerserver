

//var device=require('./models/device');

const path=require('path')
const logger=require('morgan')
 const express=require('express');
 const bodyparser=require('body-parser');
 var cors=require('cors');
 const app=express();
 const hostname = '10.46.221.31';
 // Import necessary modules and set up Express app
 const fileUpload = require('express-fileupload');
 const multer = require('multer');
 const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files
 //var router=express.Router();

 const devicerouter=require('./routes/routeDevice')
 const postrouter=require('./routes/routeDevicepost');

 // Set up middleware to parse request bodies and handle file uploads
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());



 const port = 8000;

  app.use(express.static(path.join(__dirname,'assets')))
 
  app.set('view engine','ejs')
  app.set('views','views')
  app.use(logger('dev'))
  app.use(bodyparser.urlencoded({extended:false}));
  app.use(bodyparser.json());
  app.use(cors());
  app.use('/server',postrouter)
  app.use('/server',devicerouter)
  //app.use('/insert',postrouter)
 // app.all('*',(req,res)=>res.send('This route does not exist'));
  app.all(['/server','/insert'],(req,res)=>res.send('This route does not exist'));

//  const oracledb = require('oracledb');
//  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_9'});
 ////////////////////////////////////////////
 

app.listen(port,()=>{console.log(app.get('env')+'mode  Server is running on port 8000')})

// const express = require('express');
// const app = express();

// // configure server to listen on IP address 10.46.221.31 and port 3000
// app.listen(3000,()=>console.log('Api running on port 5001'))
// app.get('/',(req,res)=>res.json('Api running'))
