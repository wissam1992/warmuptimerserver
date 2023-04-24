
const express=require('express');
const app=express();
var router=express.Router();

const dboperation=require('../dboperations');


router.use((req,res,next)=>{
    console.log('warmuptimer');
    next();
  })
   
router.route('/devices').get((req,res)=>{
    dboperation.getdevices()
    .then(data => {
      const myData = data; // save the data in a variable
      res.send(myData); // send a response indicating that the data has been retrieved successfully
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
    });
  
  });

  //get time for timer to count down
  router.route('/timer/:did').get((req,res)=>{
    dboperation.gettime(req.params.did)
    .then(data=>{
      const time=data;
      res.send(time);
    })
  })
  router.route('/device/:id').get((req,res)=>{
    dboperation.getdevice(req.params.id)
    .then(data => {
      const myData = data; // save the data in a variable
      res.send(myData); // send a response indicating that the data has been retrieved successfully
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
    });
  
  });

  router.route('/deviceinfo/:id').get((req,res)=>{
    dboperation.getdeviceinfo(req.params.id)
   // dboperation.getdevice(req.params.id)
    .then(data => {
      const myData = data; // save the data in a variable
      res.send(myData); // send a response indicating that the data has been retrieved successfully
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
    });
  
  });
  router.route('/ip').get((req,res)=>{
    // dboperation.getdeviceinfo(req.params.id)
     dboperation.getstring()
     .then(data => {
       const myData = data; // save the data in a variable
       res.send(myData); // send a response indicating that the data has been retrieved successfully
     })
     .catch(err => {
       console.error(err);
       res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
     });
   
   });
  
  
  router.route('/adddevice').post((req,res)=>{
    console.log(req.body);
    let device={...req.body};
    console.log(device)
      dboperation.adddevice(device)
      .then (data=> {
         // const myData = data; // save the data in a variable
         // console.log(myData.body);
         // res.send(myData); // send a response indicating that the data has been retrieved successfully
         res.status(201).json(data);
        })
      
  
  });

  router.route('/').get((req,res)=>{
    dboperation.getdevices()
    .then(data => {
      const myData = data; // save the data in a variable
      res.send(myData); // send a response indicating that the data has been retrieved successfully
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
    });
    
    
  })


  module.exports=router