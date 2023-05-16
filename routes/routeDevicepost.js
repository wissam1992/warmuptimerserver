const express=require('express');
var router=express.Router();
const dboperation=require('../dboperations');
let device=require('../models/device')




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
     dboperation.insertevice(device);
      // Perform the database insertion queries using the extracted form data
    /*   const deviceQuery = `INSERT INTO Device (DEVICEID, WARMUPTIMESTAMP, ALREADYUSEDFLAG, GRACEPERIOD, WARMUPTIME)
        VALUES ('${deviceid}', '${warmuptimestamp}', '${alreadyusedflag}', '${graceperiod}', '${warmuptime}');`;
    
      const deviceInfoQuery = `INSERT INTO Device_info (NFO_ID, DEVICE_IDFK, MESSAGE_EN, MESSAGE_DE)
        VALUES ('${nfo_id}', LAST_INSERT_ID(), '${message_en}', '${message_de}');`; */
    
      // Execute the database queries using your preferred method (e.g., using a database library or ORM)
    
      // Redirect the user to a success page or display a success message
      res.redirect('/success');
    }); 
module.exports=router