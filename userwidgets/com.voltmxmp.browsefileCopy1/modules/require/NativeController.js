define(['./VoltmxLogger'],function (voltmxLoggerModule){

  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = new voltmxLoggerModule("paypal/NativeController");

  var NativeController=function(componentInstance){
    this.componentInstance=componentInstance;

  };

  
  return NativeController;
});
