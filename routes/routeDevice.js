
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
  /**
 * @swagger
 * /server/alldeviceinfo/{id}:
 *   get:
 *     summary: Get all device information by ID
 *     description: Retrieve all information for a specific device based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the device
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the device information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define the properties of the response object here
 *       '500':
 *         description: Internal server error occurred while retrieving the data
 */
  router.route('/alldeviceinfo/:id').get((req,res)=>{
    dboperation.alldeviceinfo(req.params.id)
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
    res.render('index')
    
   /*  dboperation.getdevices()
    .then(data => {
      const myData = data; // save the data in a variable
      res.send(myData); // send a response indicating that the data has been retrieved successfully
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data'); // send a response indicating that there was an error retrieving the data
    });
     */
    
  })

  module.exports=router