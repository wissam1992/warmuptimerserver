

var device=require('./models/device');

 
const logger=require('morgan')
 const express=require('express');
 const bodyparser=require('body-parser');
 var cors=require('cors');
 const app=express();
 const path=require('path')
 //var router=express.Router();

 const devicerouter=require('./routes/routeDevice')
 const postrouter=require('./routes/routeDevicepost')


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
 

app.listen(3000,()=>{console.log('server is running')})