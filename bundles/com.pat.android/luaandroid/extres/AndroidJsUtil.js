voltmx.ui.defineExtendedWidget = function(chilWdg, baseWidget, protoFuncDict){
    if (chilWdg == undefined || baseWidget == undefined || protoFuncDict == undefined)
     throw {
        code: 4001,
        message: ("Parameter's are undefined in voltmx.ui.defineExtendedWidget")
       };

//    var currentGlobalObj = globalThis;
   var currentGlobalObj = (function() {
        return this;
    }());

    if (typeof(protoFuncDict) !== "object" || (protoFuncDict instanceof Array)) 
    throw {
        code: 4002,
        message: ("protoFuncDict is not a JSON Object in voltmx.ui.defineExtendedWidget")
    };

    if (typeof(chilWdg) !== "string")
     throw {
        code: 4003,
        message: ("chilWdg is not passed as a string in voltmx.ui.defineExtendedWidget")
    };
    
    if (protoFuncDict["preInitializeCall"] == undefined) 
      throw {
        code: 4005,
        message: ("preInitializeCall function is not present in JSON Object of voltmx.ui.defineExtendedWidget")
    };

    var nameSpaceSplice = chilWdg.split(".");
    var i;
    for (i = 0; i < nameSpaceSplice.length - 1; i++) {
        if (currentGlobalObj[nameSpaceSplice[i]] === undefined) {
        currentGlobalObj[nameSpaceSplice[i]] = {} ;
        }
        currentGlobalObj = currentGlobalObj[nameSpaceSplice[i]] ;
    }
        if (currentGlobalObj) {
            currentGlobalObj[nameSpaceSplice[i]] = function() {
                this.preInitializeCall.apply(this, [].slice.call(arguments));
                this.extendedWidgetNameSpace = chilWdg;
            }
            currentGlobalObj[nameSpaceSplice[i]].prototype = Object.create(baseWidget.prototype);
        }
    Object.assign(currentGlobalObj[nameSpaceSplice[i]].prototype, protoFuncDict);
   }

   var __getNameSpaceObj = function __getNameSpaceObj(key) {
       var k;
       var value = this;
       key = key.split('.');
       for(k = 0; k < key.length; k++) {
           if (value[key[k]] === undefined) {
               voltmx.print(" --- Invalid extended widget object - " + key[k]);
               value = null;
               break;
           }
           value = value[key[k]];
       }
       return value;
   };

   function __createExtendedWidgetClone(obj){
       if(obj == null)
           return null;
       var temp = {};
       var kclass = __getNameSpaceObj(obj.extendedWidgetNameSpace);
       return (kclass != null) ? new kclass(temp) : null;
   }