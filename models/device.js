class device{
    constructor(deviceid,warmuptimestamp,graceperiod,warmuptime){
        this.deviceId=deviceid;
        this.warmuptimestamp=warmuptimestamp;
       // this.alreadyusedflag=alreadyusedflag;
        this.graceperiod=graceperiod;
        this.warmuptime=warmuptime;
    }
}
module.exports=device;