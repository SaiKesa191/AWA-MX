define(['./Inherits','./NativeController','./VoltmxLogger'],function (Inherits,NativeController,voltmxLoggerModule) {
  
  //logger for the paypal ios controller
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = new voltmxLoggerModule("dragandDrop/WEB");

  /**
    * @class  NativeControllerWeb
    * @private
    * @description: Class for the WEB implementation of the Paypa;
    */
  var NativeControllerWeb = function(componentInstance){
    voltmxLog.logger.trace("-- Start constructor NativeControllerWeb --", voltmxLog.logger.FUNCTION_ENTRY);
    self = this;    
    this.componentInstance = componentInstance;
    //inheriting the child objects 
    NativeController.call(this,componentInstance);
    //this._PayPalWrapper.setLoggingAndLogType(true,"debug");
    voltmxLog.logger.trace("-- end  constructor  NativeControllerWeb --", voltmxLog.logger.FUNCTION_EXIT);
  };
  
  //inheritance
  Inherits(NativeControllerWeb,NativeController);
  
  return NativeControllerWeb;

});