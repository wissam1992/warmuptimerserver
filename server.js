

//var device=require('./models/device');

 
const logger=require('morgan')
 const express=require('express');
 const bodyparser=require('body-parser');
 var cors=require('cors');
 const app=express();
 const path=require('path')
 const hostname = '10.46.221.31';
 //var router=express.Router();

 const devicerouter=require('./routes/routeDevice')
 const postrouter=require('./routes/routeDevicepost')


 const port = 8000;

  app.use(express.static(path.join(__dirname,'assets')))
  app.set('view engine','ejs')
  app.set('views','views')

  app.use(logger('dev'))
  app.use(bodyparser.urlencoded({extended:false}));
  app.use(bodyparser.json());
  app.use(cors());
  app.use('/server',devicerouter)
  app.use('/server',postrouter)
  app.all('*',(req,res)=>res.send('This route does not exist'));

//  const oracledb = require('oracledb');
//  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_9'});
 ////////////////////////////////////////////
 

app.listen(port,'10.46.221.31',()=>{console.log(app.get('env')+'mode  Server is running on port 8000')})

// const express = require('express');
// const app = express();

// // configure server to listen on IP address 10.46.221.31 and port 3000
// app.listen(3000,()=>console.log('Api running on port 5001'))
// app.get('/',(req,res)=>res.json('Api running'))
