const express=require('express');
var router=express.Router();
const dboperation=require('../dboperations');
const device=require('../models/device')




router.post('/updatedevice', async (req, res) => {
 
  const { id, warmupTimestamp, alreadyUsedFlag } = req.body;
  console.log(req.body)
  try {
    await dboperation.updatedevice(id, warmupTimestamp, alreadyUsedFlag);
    res.send('Device updated successfully');
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating device');
  }
});
//UPDATE DEVICE=>>>> ALREADYUSEDFLAG
router.post('/updatedevice/:device_id', async (req, res) => {
       
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

    });
 


module.exports=router