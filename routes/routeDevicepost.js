const path = require('path')
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'uploads')))

var router = express.Router();
const dboperation = require('../dboperations');
let device = require('../models/device')
let deviceinfo = require('../models/deviceinfo')
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

/**
 * @swagger
 * /server/updatedevice/{id}/{warmuptimestamp}:
 *   put:
 *     summary: Update a device with the specified ID and warm-up timestamp
 *     tags: [Device]
 *     description: Endpoint to update a device with the specified ID and warm-up timestamp.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the device to update.
 *         schema:
 *           type: string
 *           example: SYR23DE001
 *       - in: path
 *         name: warmuptimestamp
 *         required: true
 *         description: The warm-up timestamp to update.
 *         schema:
 *           type: string
 *           example: '17.05.23 15:30:45,123456789'
 *     responses:
 *       200:
 *         description: Successful operation. The device was updated successfully.
 *       500:
 *         description: Error updating device.
 */
router.put('/updatedevice/:id/:warmuptimestamp', async (req, res) => {
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
  device = new device(deviceid, warmuptimestamp, alreadyusedflag, graceperiod, warmuptime);
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

/**
 * @swagger
 * tags:
 *  name: Devices
 *  description: add devices and add their infos
 */

/**
 * @swagger
 * /server/upload:
 *   post:
 *     summary: Upload a CSV file
 *     tags: [Devices]
 *     description: Endpoint to upload a CSV file and process the data
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: csvFile
 *         type: file
 *         required: true
 *         description: The CSV file to upload
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: No files were uploaded
 *       500:
 *         description: Error uploading file
 */

router.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.csvFile;
  // const filePath = ('uploads', file.name);
  const filePath = path.join(__dirname, '../uploads', file.name);
  //const filePath = multer({ dest: path.join(__dirname, 'uploads/') });

  /* console.log(file.name)
  console.log(file.tempFilePath); */
  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
    // Read the CSV file and process the data
    // let isFirstRow = true; // Flag to skip the header row

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Skip the header row
        /*    if (isFirstRow) {
             isFirstRow = false;
             return;
           } */

        console.log(data);
        const rowValues = Object.values(data)[0].split(';');
        const [DEVICEID, graceperiod, warmuptime] = rowValues;
        //const { DEVICEID, graceperiod, warmuptime } = data;
        /*    const DEVICEID = data[0];
           const graceperiod = data[1];
           const warmuptime = data[2];
            */

        // Create a device object
        const device = {
          DEVICEID: DEVICEID,
          graceperiod: graceperiod,
          warmuptime: warmuptime
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


/**
 * @swagger
 * /addDeviceInfo:
 *   post:
 *     summary: Upload a CSV file and insert device info into the database
 *     tags: [Device info]
 *     description: Endpoint to upload a CSV file, process the data, and insert device info into the database.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: csvFile
 *         type: file
 *         required: true
 *         description: The CSV file to upload.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation. The device info was successfully inserted into the database.
 *       400:
 *         description: No files were uploaded or the uploaded file is not a valid CSV file.
 *       500:
 *         description: Error uploading file or processing the data.
 */

router.post('/addDeviceInfo', (req, res) => {


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.csvFile;

  const filePath = path.join(__dirname, '../uploads', file.name);

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const rowValues = Object.values(data)[0].split(';');
        const [INFO_ID, DEVICE_IDFK, MESSAGE_EN,MESSAGE_DE,LAST_UPDATED] = rowValues;
        
        const deviceinfo = {
          infoid: INFO_ID,
          deviceidfk: DEVICE_IDFK,
          messageen: MESSAGE_EN,
          messagede:MESSAGE_DE,
          lastupdated:LAST_UPDATED
        };
         dboperation.addmessages(deviceinfo)
          .then(() => {
            console.log('Data inserted into Device_info table');
          })
          .catch((error) => {
            console.error('Error inserting data into Device_info table:', error);
          });  
      })

      .on('end', () => {
        console.log('CSV file processing complete');
      });
    res.redirect('/success');

  });


})





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

module.exports = router

