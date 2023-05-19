 const path=require('path')
const express=require('express'); 
const app=express();
app.use(express.static(path.join(__dirname,'uploads')))

var router=express.Router();
const dboperation=require('../dboperations');
let device=require('../models/device')
const csv = require('csv-parser');
const fs = require('fs'); 




/* router.post('/updatedevice', async (req, res) => {
 
  const { id, warmupTimestamp, alreadyUsedFlag } = req.body;
  console.log(req.body)
  try {
    await dboperation.updatedevice(id, warmupTimestamp, alreadyUsedFlag);
    res.send('Device updated successfully');
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating device');
  }
}); */
router.get('/updatedevice/:id/:warmuptimestamp', async (req, res) => {
  const { id, warmuptimestamp } = req.params;
  try {
    await dboperation.updatedevice(id, warmuptimestamp);
    res.send('Device updated successfully');
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating device');
  }
});
//UPDATE DEVICE=>>>> ALREADYUSEDFLAG
/* router.post('/updatedevice/:device_id', async (req, res) => {
  console.log('in update');
       
       dboperation.getdevice(req.params.device_id)
       .then(async data=>{const Dev=data;
        const alreadyUsedFlag = data[0].ALREADYUSEDFLAG;
        if(alreadyUsedFlag==0){
          await dboperation.updatedeviceflag(req.params.device_id);
        }
        console.log('ALREADYUSEDFLAG:', alreadyUsedFlag);
        res.send(Dev)})
       
        .catch(err=>{console.error(err);
        res.status(500).send('Error retrieving data'); })
    
     // 

    }); */



    router.post('/insert', (req, res) => {
      const {
        deviceid,
        warmuptimestamp,
        alreadyusedflag,
        graceperiod,
        warmuptime,
        nfo_id,
        device_idfk,
        message_en,
        message_de
      } = req.body;
    console.log(req.body);
     device=new device(deviceid,warmuptimestamp,alreadyusedflag,graceperiod,warmuptime);
    // dboperation.insertevice(device);
      // Perform the database insertion queries using the extracted form data
    /*   const deviceQuery = `INSERT INTO Device (DEVICEID, WARMUPTIMESTAMP, ALREADYUSEDFLAG, GRACEPERIOD, WARMUPTIME)
        VALUES ('${deviceid}', '${warmuptimestamp}', '${alreadyusedflag}', '${graceperiod}', '${warmuptime}');`;
    
      const deviceInfoQuery = `INSERT INTO Device_info (NFO_ID, DEVICE_IDFK, MESSAGE_EN, MESSAGE_DE)
        VALUES ('${nfo_id}', LAST_INSERT_ID(), '${message_en}', '${message_de}');`; */
    
      // Execute the database queries using your preferred method (e.g., using a database library or ORM)
    
      // Redirect the user to a success page or display a success message
      res.redirect('/success');
    }); 





/* router.post('/upload',(req,res)=>{
  console.log('Hello')
}) */


router.post('/upload', (req, res) => {
  console.log('Hello from Upload');

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.csvFile;
 // const filePath = ('uploads', file.name);
 const filePath =path.join(__dirname,'../uploads', file.name);
 //const filePath = multer({ dest: path.join(__dirname, 'uploads/') });

/* console.log(file.name)
console.log(file.tempFilePath); */
  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
     fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Process each row of data from the CSV file
        console.log(data);
        const { DEVICEID, graceperiod, warmuptime } = data;

        // Create a device object
        const device = {
          INFO_ID: DEVICEID,
          DEVICE_IDFK: graceperiod,
          MESSAGE_EN: warmuptime
        };

        // Call the adddevices method to insert the device into the database
       dboperation.adddevices(device)
          .then(() => {
            console.log('Data inserted into Device table:', device);
          })
          .catch((error) => {
            console.error('Error inserting data into Device table:', error);
          });
      })
      
      .on('end', () => {
        console.log('CSV file processing complete');
      });
    // File is successfully uploaded, you can process it further
    // and perform the necessary database operations.

    res.redirect('/success');

  });
});




/*     router.post('/upload', (req, res) => {
      console.log(req.files.csvFile);

      const file = req.files.csvFile;
    //  console.log(file.tempFilePath);
      const filePath = 'C:\\Users\\alamawx\\Downloads\\ToDo\\device.csv';
      // Read the uploaded CSV file
      fs.createReadStream(file.tempFilePath)
        .pipe(csv())
        .on('data', (data) => {
          // Extract the necessary data from each row of the CSV file
          const { DEVICEID, graceperiod, warmuptime } = data;
          console.log(data);
    
          // Perform the database insertion query using the extracted data

           const query = `INSERT INTO Device (DEVICEID, GRACEPERIOD, WARMUPTIME)
            VALUES ('${deviceid}', '${graceperiod}', '${warmuptime}');`;  
    
          // Execute the database query using your preferred method (e.g., using a database library or ORM)
          // You can execute the query here or accumulate the queries and execute them in bulk afterwards
    
         // console.log(`Inserted record: ${deviceid}`);
        })
        .on('end', () => {
          // All records have been processed
          console.log('CSV file processing complete');
    
          // Redirect the user to a success page or display a success message
          res.redirect('/success');
        });
    });  */

module.exports=router

