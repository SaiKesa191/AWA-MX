define(['./VoltmxLogger'],function (voltmxLoggerModule){
  //logger for the paypal ios controller
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = new voltmxLoggerModule("dragAndDrop/ControllerImplementation");

  var ControllerImplementation=function(componentInstance,componentName){
    this.componentInstance=componentInstance;
    this.getNativeController=function(){
      if(this.nativeControllerInstance===undefined){
        var deviceInfo=voltmx.os.deviceInfo();
        var platformName=null;
        if(deviceInfo.name.toLowerCase()==='iphone' || deviceInfo.name.toLowerCase()==='ipad')
        {
          platformName='IOS';
        }else if(deviceInfo.name.toLowerCase()==='android'){
          platformName='Android';
        } else if(deviceInfo.name.toLowerCase()==='thinclient'){
          platformName='ThinClient';
        }else{
          platformName=deviceInfo.name.charAt(0).toUpperCase()+deviceInfo.name.slice(1);
        }
        var nativeControllerPath='com/voltmxmp/paypal'+'/NativeController'+platformName;
        var nativeController=require(nativeControllerPath);
        this.nativeControllerInstance=new nativeController(componentInstance);
      }
      return this.nativeControllerInstance;
    };
  };

  return ControllerImplementation;
});
