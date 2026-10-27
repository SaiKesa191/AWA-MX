define(['./ControllerImplementation','./VoltmxLogger'],function(ControllerImplementation,voltmxLoggerModule) {
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = new voltmxLoggerModule("dragandDrop/draganddropuploadController");
  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // var analytics=require("com/voltmxmp/"+"browsefile"+"/analytics");
      // analytics.notifyAnalytics();
      //properties
      this._browseText = "Browse multiple files with the file dialog or by dragging and dropping images onto the dashed region";
      //initialize platformspecific global functions
      this.initializePlatfromSpecificGloabals();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            /**
             * @property : browseText
             * @description : this property set the upload text 
             * @return : string
             * @remarks : your remarks
             */
            defineSetter(this, 'browseText', function (val) {
                voltmxLog.logger.trace('----------Entering browseText Setter---------', voltmxLog.logger.FUNCTION_ENTRY);
                this._browseText = val;
                this.updateComponentOptionsOnWebBrowser();
                voltmxLog.logger.trace('----------Exiting browseText Setter---------', voltmxLog.logger.FUNCTION_EXIT);
            });
            defineGetter(this, 'browseText', function () {
                voltmxLog.logger.trace('----------Entering browseText Getter---------', voltmxLog.logger.FUNCTION_ENTRY);
                voltmxLog.logger.trace('----------Exiting browseText Getter---------', voltmxLog.logger.FUNCTION_EXIT);
                return this._browseText;
            });
            /**
             * @property : buttonText
             * @description : this property set buttonText
             * @return : string
             * @remarks : your remarks
             */
            defineSetter(this, 'buttonText', function (val) {
                voltmxLog.logger.trace('----------Entering buttonText Setter---------', voltmxLog.logger.FUNCTION_ENTRY);
                this._buttonText = val;
                this.updateComponentOptionsOnWebBrowser();
                voltmxLog.logger.trace('----------Exiting buttonText Setter---------', voltmxLog.logger.FUNCTION_EXIT);
            });
            defineGetter(this, 'buttonText', function () {
                voltmxLog.logger.trace('----------Entering buttonText Getter---------', voltmxLog.logger.FUNCTION_ENTRY);
                voltmxLog.logger.trace('----------Exiting buttonText Getter---------', voltmxLog.logger.FUNCTION_EXIT);
                return this._buttonText;
            });
        },

    /**
     * @private Method : initializePlatfromSpecificGloabalVariables
     * @description : to initialize the platfrom specific Gloabal Varaibles    
     * @return : null
     */
    initializePlatfromSpecificGloabals : function(){
      //callback event from the browser that the loading of the browser is done
      _com_voltmxmp_dragandDrop_web_componetontBrowserLoad = function(){
        this._loaded = true;
        this.updateComponentOptionsOnWebBrowser();
      }.bind(this);


      _com_voltmxmp_dragandDrop_web_componetont_filesDrop= function(files){
        // convert dataURL back to Blob
        function dataURLtoBlob(dataUrl, callback) {
          var req = new voltmx.net.HttpRequest();
          req.open('GET', dataUrl);
          req.responseType = 'blob';
          req.onReadyStateChange = function stateChanged() {
            if (req.readyState === 4) {
              var responseContent = req.response;
              callback(responseContent);
            }
          };
          req.send();
        }
        var txtFile = "./"+files.name; //Relative text file path
        const fnDrop = this.onFileDragAndDrop.bind(this);
        dataURLtoBlob(files.content, function (blob) {
          const file = new File([blob], txtFile, {
            lastModified: files.lastModified
          });
          fnDrop(file);
        });
      }.bind(this);
    },

    /**
     * @private Method : updateComponentOptionsOnWebBrowser
     * @description : Update the Web browser Variables with the options configured   
     * @return : JSONObject
     */
    updateComponentOptionsOnWebBrowser : function(){
      var options = this.retrieveComponentOptions();
      if(this.view.brwsrUpload && this._loaded){
        this.view.brwsrUpload.evaluateJavaScript('updateDomElements('+JSON.stringify(options)+')');  
      }
      return options;
    },

    /**
     * @private Method : retrieveComponentOptions
     * @description : create the options configured in the component
     * @return : JSON {options}
     */
    retrieveComponentOptions: function(){
      var options = {};

      //authorizationkey
      if(this.browseText !== undefined || this.browseText !== null){
        options["browseText".toLowerCase()] =  this.browseText;
      }
      if(this.buttonText !== undefined || this.buttonText !== null){
        options["buttonText".toLowerCase()] =  this.buttonText;
      }
      return options;
    }
  };
});