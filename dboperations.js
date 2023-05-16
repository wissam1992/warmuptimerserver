var config=require('./dbconfig')
const oracledb = require('oracledb');
//oracledb.initOracleClient({libDir: 'C:\\Users\\alamawx\\instantclient_21_9'});


function getdevices(){  
    return new Promise((resolve, reject) => {

  
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
          console.error(err.message);
          return;
        }
     //WHERE device_id= :value    ['SYR23DE001'],
        connection.execute(
         // 'SELECT * FROM device WHERE device_id= :value', 
        //     ['SYR23DE002'],
        'select * from device',
         
          (err, result) => {
            if (err) {
              console.error(err.message);
              return;
            }

            const rows = result.rows;
          
            const data = rows.map(row => {
    
              return {
                DEVICE_ID: row[0],
                WARMUPTIMESTAMP: row[1],
                ALREADYUSEDFLAG: row[2]
              };
            });
            console.log('DATA=>')
            console.log(data)
           
            
            connection.close();
            resolve(data);
           
      
            // Return the data as a JSON object
           // res.json(data);
          }
        );
       
      
      });
    
   
    });
}
function gettime(did){  
  console.log('getime')
  return new Promise((resolve, reject) => {

  oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        return;
      }
   //WHERE device_id= :value    ['SYR23DE001'],
      connection.execute(
    
        ' select warmuptime from device_info where device_idfk= :value',
        [did],
       // 'SELECT * FROM device_info WHERE device_id= :value', 
          
     
      
        (err, result) => {
          if (err) {
            console.error(err.message);
            return;
          }
          const rows = result.rows;

          //  const data = rows.map(row => row[0])[0];
          //  console.log(data);
          //  return data;
          const data = rows.map(row => {
          //   console.log('data:'+row[0])
  
            
              return {WARMUPTIME: row[0]};
          //    // WARMUPTIMESTAMP: row[1],
          //    // ALREADYUSEDFLAG: row[2]
           
           });
        
          console.log('DATA=>')
          console.log(data)
         
          
          connection.close();
          resolve(data);
         
    
          // Return the data as a JSON object
         // res.json(data);
        }
      );
     
    
    });
  
 
  });
}
function getdevice(id){  
  return new Promise((resolve, reject) => {
  oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        return;
      }
   //WHERE device_id= :value    ['SYR23DE001'],
      connection.execute(
        'SELECT * FROM device WHERE device_id= :value', 
          [id],
     
      
        (err, result) => {
          if (err) {
            console.error(err.message);
            return;
          }

          const rows = result.rows;
        
          const data = rows.map(row => {
  
            return {
              DEVICE_ID: row[0],
              WARMUPTIMESTAMP: row[1],
              ALREADYUSEDFLAG: row[2]
            };
          });
          console.log('DATA=>')
          console.log(data)
         
          
          connection.close();
          resolve(data);
         
    
          // Return the data as a JSON object
         // res.json(data);
        }
      );
     
    
    });
  
 
  });
}
function getstring(){  
  return new Promise((resolve, reject) => {
    const data = "Hi"; // set the string to be returned
    resolve(data);
  });
}

function getdeviceinfo(id){  
  return new Promise((resolve, reject) => {


  oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        return;
      }
   //WHERE device_id= :value    ['SYR23DE001'],
      connection.execute(
        'SELECT * FROM device WHERE deviceid= :value', 
          [id],
     
      
        (err, result) => {
          if (err) {
            console.error(err.message);
            return;
          }
          const row = result.rows[0];
          const data = {
            DEVICEID: row[0],
            WARMUPTIMESTAMP: row[1],
            ALREADYUSEDFLAG: row[2],
            GRACEPERIOD: row[3],
            WARMUPTIME: row[4]
          };

          // const rows = result.rows;
        
          // const data = rows.map(row => {
  
          //   return {
          //     DEVICE_ID: row[0],
          //     WARMUPTIMESTAMP: row[1],
          //     ALREADYUSEDFLAG: row[2]
          //   };
          // });
          console.log('DATA=>')
          console.log(data)
         
          
          connection.close();
          resolve(JSON.stringify(data));
          //resolve(JSON.parse(data));
          //resolve(data);
         
    
          // Return the data as a JSON object
         // res.json(data);
        }
      );
     
    
    });
  
 
  });
}
function alldeviceinfo(id){  
  return new Promise((resolve, reject) => {


  oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(
        'SELECT d.DEVICEID, d.WARMUPTIMESTAMP, d.GRACEPERIOD, d.WARMUPTIME, i.MESSAGE_EN, i.MESSAGE_DE FROM Device d INNER JOIN DEVICE_INFO i ON d.DEVICEID = i.DEVICE_IDFK WHERE deviceid= :value', 
        [id],
        //  [id],

        (err, result) => {
          if (err) {
            console.error('ERROR'+ err.message);
            connection.close();
            reject(err);
            return;
          }
          if (result.rows.length === 0) {
            // Device does not exist in the database
            connection.close();
           // resolve(null);
            resolve({ message: 'Device does not exist' });
            return;
          }
          const row = result.rows[0];
          const data = {
            DEVICEID: row[0],
            WARMUPTIMESTAMP: row[1],
            GRACEPERIOD: row[2],
            WARMUPTIME: row[3],
            MESSAGE_EN: row[4],
            MESSAGE_DE: row[5],
          };
          console.log(data)
         
          connection.close();
          resolve(JSON.stringify(data));
         // resolve(data);
        }
      );
     
    
    });
  
 
  });
}
/*
function adddevice(device) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO DEVICE_INFO (INFO_ID, DEVICE_IDFK, MESAAGE_EN,MESAAGE_DE,WARMUPTIME) VALUES (?, ?, ?,?,?)';
    const values = [device.INFO_ID, device.DEVICE_IDFK, device.MESAAGE_EN,device.MESAAGE_DE,device.WARMUPTIME]; 
   
        oracledb.getConnection(config, (err, connection) => {
              if (err) {
                console.error(err.message);
                return;
              }
              connection.query(query, values, (error, results, fields) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              });
      });
      
  });
}
*/

function adddevice(device) {
  console.log(device)
  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      const query = 'INSERT INTO DEVICE_INFO (INFO_ID, DEVICE_IDFK, MESSAGE_EN,MESSAGE_DE,WARMUPTIME) VALUES (:INFO_ID, :DEVICE_IDFK, :MESSAGE_EN, :MESSAGE_DE, :WARMUPTIME)';
      const binds = {
        INFO_ID: device.INFO_ID,
        DEVICE_IDFK: device.DEVICE_IDFK,
        MESSAGE_EN: device.MESSAGE_EN,
        MESSAGE_DE: device.MESSAGE_DE,
        WARMUPTIME: device.WARMUPTIME
       
      };
      const options = {
        autoCommit: true
      };

      connection.execute(query, binds, options, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

        connection.close();
      });
    });
  });
}
function insertevice(device) {
  console.log('insertdevice:');
  console.log(device);
  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

/* 
      const query = 'INSERT INTO device (deviceid, warmuptimestamp, alreadyusedflag, graceperiod, warmuptime)'+
     ' VALUES ('SYR23DE006', '2023-05-15 10:30:00', 0, 15, 60)'; */
      

            const query = 'INSERT INTO Device (DEVICEID, WARMUPTIMESTAMP, ALREADYUSEDFLAG, GRACEPERIOD, WARMUPTIME) VALUES'+
            ' (:deviceid, :warmuptimestamp, :alreadyusedflag, :graceperiod, :warmuptime)';
            const binds = {
              deviceid: device.deviceid,
              warmupTimestamp: device.warmupTimestamp,
              alreadyusedflag:0,
              graceperiod:15,
              warmuptime:20 
            /*   alreadyusedflag: device.alreadyusedflag,
              graceperiod: device.graceperiod,
              warmuptime: device.warmuptime */
             
            };

    /*   const query = 'INSERT INTO DEVICE_INFO (INFO_ID, DEVICE_IDFK, MESSAGE_EN,MESSAGE_DE,WARMUPTIME) VALUES (:INFO_ID, :DEVICE_IDFK, :MESSAGE_EN, :MESSAGE_DE, :WARMUPTIME)';
      const binds = {
        INFO_ID: device.INFO_ID,
        DEVICE_IDFK: device.DEVICE_IDFK,
        MESSAGE_EN: device.MESSAGE_EN,
        MESSAGE_DE: device.MESSAGE_DE,
        WARMUPTIME: device.WARMUPTIME
       
      }; */
      const options = {
        autoCommit: true
      };

      connection.execute(query, binds, options, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

        connection.close();
      });
    });
  });
}







function updatedevice(id, warmuptimestamp) {  

  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      connection.execute(
        'UPDATE device SET WARMUPTIMESTAMP = TO_TIMESTAMP(:warmuptimestamp, \'DD.MM.RR HH24:MI:SS,FF9\') WHERE deviceid = :id',
        [warmuptimestamp, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          connection.commit((err) => {
            if (err) {
              console.error(err.message);
              reject(err);
            }
            connection.close();
            resolve();
          });
        }
      );
    });
  });
}
 //UPDATE DEVICE=>>>> ALREADYUSEDFLAG
// function updatedeviceflag(id) {  
//   return new Promise((resolve, reject) => {
//     oracledb.getConnection(config, (err, connection) => {
//       if (err) {
//         console.error(err.message);
//         reject(err);
//       }
//       connection.execute(
//         'UPDATE device SET ALREADYUSEDFLAG = 0 WHERE device_id = :id', 
//         [ id],
//         (err, result) => {
//           if (err) {
//             console.error(err.message);
//             reject(err);
//           }
//           connection.commit((err) => {
//             if (err) {
//               console.error(err.message);
//               reject(err);
//             }
//             console.log('Device updated successfully');
//             console.log(id);
//             connection.close();
//             resolve();
//           });
//         }
//       );
//     });
//   });
// }

 //UPDATE DEVICE=>>>> ALREADYUSEDFLAG & WARMUPTIMESTAMP
function updatedeviceflag(id) {  
  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
   
      connection.execute(
  'UPDATE device SET WARMUPTIMESTAMP = SYSDATE, ALREADYUSEDFLAG = 1 WHERE device_id = :id',
  [ id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          connection.commit((err) => {
            if (err) {
              console.error(err.message);
              reject(err);
            }
            console.log('Device updated successfully');
            console.log(id);
            connection.close();
            resolve();
          });
        }
      );
    });
  });
}
function getDeviceInfo (id){  
  return new Promise((resolve, reject) => {


  oracledb.getConnection(config, (err, connection) => {
      if (err) {
        console.error(err.message);
        return;
      }
   //WHERE device_id= :value    ['SYR23DE001'],
      connection.execute(
        'SELECT * FROM device WHERE device_id= :value', 
          [id],
     
      
        (err, result) => {
          if (err) {
            console.error(err.message);
            return;
          }

          const rows = result.rows;
        
          const data = rows.map(row => {
  
            return {
              DEVICE_ID: row[0],
              WARMUPTIMESTAMP: row[1],
              ALREADYUSEDFLAG: row[2]
            };
          });
          console.log('DATA=>')
          console.log(data)
         
          
          connection.close();
          resolve(data);
         
    
          // Return the data as a JSON object
         // res.json(data);
        }
      );
     
    
    });
  
 
  });
}



      module.exports={
          getdevices:getdevices,
          getdevice:getdevice,
          adddevice:adddevice,
          gettime:gettime,
          getdeviceinfo:getdeviceinfo,
          getstring:getstring,
          updatedevice:updatedevice,
          updatedeviceflag:updatedeviceflag,
          getDeviceInfo:getDeviceInfo,
          alldeviceinfo:alldeviceinfo,
          insertevice:insertevice,
}

