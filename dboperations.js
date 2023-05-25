var config = require('./dbconfig')
const oracledb = require('oracledb');
//oracledb.initOracleClient({libDir: 'C:\\Users\\alamawx\\instantclient_21_9'});


function getdevices() {
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
function gettime(did) {
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


            return { WARMUPTIME: row[0] };
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
function getdevice(id) {
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
function getstring() {
  return new Promise((resolve, reject) => {
    const data = "Hi"; // set the string to be returned
    resolve(data);
  });
}

function getdeviceinfo(id) {
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
            GRACEPERIOD: row[2],
            WARMUPTIME: row[3]
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
function alldeviceinfo(id) {
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
            console.error('ERROR' + err.message);
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



function adddevices(device) {

  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      const regex = /^SYR23DE/;
      const warmuptime = parseInt(device.warmuptime);
      const graceperiod = parseInt(device.graceperiod);
      //  if (regex.test(device.DEVICEID)) {
      if (regex.test(device.DEVICEID) && !isNaN(warmuptime) && !isNaN(graceperiod)) {


        // Check if the device already exists in the database
        const checkQuery = 'SELECT COUNT(*) AS COUNT FROM DEVICE WHERE DEVICEID = :DEVICEID';
        const checkBinds = {
          DEVICEID: device.DEVICEID
        };

        //connection.execute(checkQuery, checkBinds, options, (err, result) => {
        connection.execute(checkQuery, checkBinds, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          const count = result.rows[0];
          if (count == 0) {
            const query = 'INSERT INTO DEVICE (DEVICEID, WARMUPTIMESTAMP,GRACEPERIOD, WARMUPTIME) VALUES (:DEVICEID, NULL,:GRACEPERIOD, :WARMUPTIME)';
            const binds = {
              DEVICEID: device.DEVICEID,
              GRACEPERIOD: device.graceperiod,
              WARMUPTIME: device.warmuptime,
            };
            //const query = "INSERT INTO device (DEVICEID, WARMUPTIMESTAMP, GRACEPERIOD, WARMUPTIME) VALUES ('SYR23DE009', NULL, 10, 15);";
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
            }
            );

          }
          else {
            console.log('Device ' + device.DEVICEID + ' already exists, skipping insertion');
            connection.close();
          }


        });
      }
      else {
        console.log('Device ID does not match the required pattern, skipping insertion');
      }
    });
  });
}

function addmessages(deviceinfo) {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(config, (err, connection) => {
      if (err) {
        reject(err);
        return
      }

      // Check if the device already exists in the database
      const checkQuery = 'SELECT COUNT(*) AS COUNT FROM DEVICE WHERE DEVICEID = :DEVICEIDFK';
      const checkBinds = {
        DEVICEIDFK: deviceinfo.deviceidfk
      };
      //connection.execute(checkQuery, checkBinds, options, (err, result) => {
      connection.execute(checkQuery, checkBinds, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        // Check if the device_info already exists in the database yes ==>update else ==>insert
        const checkQuery1 = 'SELECT COUNT(*) AS COUNT FROM DEVICE_INFO WHERE DEVICE_IDFK = :DEVICEIDFK';
        const checkBinds1 = {
          DEVICEIDFK: deviceinfo.deviceidfk
        };
        //connection.execute(checkQuery, checkBinds, options, (err, result) => {
        connection.execute(checkQuery1, checkBinds1, (err, result1) => {
          if (err) {
            reject(err);
            return;
          }

          const count = result.rows[0];

          const count1 = result1.rows[0];
          console.log(deviceinfo.deviceidfk + '-------' + count + '_____' + count1);
          if (count == 1) {
            if (count1 == 0) {
              const query = `INSERT INTO device_info (INFO_ID,DEVICE_IDFK,LAST_UPDATED, MESSAGE_DE, MESSAGE_EN)
            VALUES (:INFO_ID,:DEVICE_IDFK,  CURRENT_TIMESTAMP, :MESSAGE_DE, :MESSAGE_EN)`;
              const binds = {
                INFO_ID: deviceinfo.infoid,
                DEVICE_IDFK: deviceinfo.deviceidfk,
                MESSAGE_DE: deviceinfo.messagede,
                MESSAGE_EN: deviceinfo.messageen
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
              }
              );

            }
            else {
              console.log('UPDATE')
              const query = `UPDATE device_info
               SET LAST_UPDATED = CURRENT_TIMESTAMP,
                   MESSAGE_DE = :MESSAGE_DE,
                   MESSAGE_EN = :MESSAGE_EN
               WHERE INFO_ID = :INFO_ID AND DEVICE_IDFK = :DEVICE_IDFK`;

              const binds = {
                INFO_ID: deviceinfo.infoid,
                DEVICE_IDFK: deviceinfo.deviceidfk,
                MESSAGE_DE: deviceinfo.messagede,
                MESSAGE_EN: deviceinfo.messageen
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
              }
              );


            }


          }
          else {
            console.log('Device ' + deviceinfo.deviceidfk + ' does not  exists, skipping insertion');
            connection.close();
          }


        });
      })

    })

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


      const query = 'INSERT INTO Device (DEVICEID, WARMUPTIMESTAMP, ALREADYUSEDFLAG, GRACEPERIOD, WARMUPTIME) VALUES' +
        ' (:deviceid, :warmuptimestamp, :alreadyusedflag, :graceperiod, :warmuptime)';
      const binds = {
        deviceid: device.deviceid,
        warmupTimestamp: device.warmupTimestamp,
        alreadyusedflag: 0,
        graceperiod: 15,
        warmuptime: 20
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
        [id],
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

function getDeviceInfo(id) {
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



module.exports = {
  getdevices: getdevices,
  getdevice: getdevice,
  adddevice: adddevice,
  gettime: gettime,
  getdeviceinfo: getdeviceinfo,
  getstring: getstring,
  updatedevice: updatedevice,
  updatedeviceflag: updatedeviceflag,
  getDeviceInfo: getDeviceInfo,
  alldeviceinfo: alldeviceinfo,
  insertevice: insertevice,
  adddevices: adddevices,
  addmessages: addmessages,
}

