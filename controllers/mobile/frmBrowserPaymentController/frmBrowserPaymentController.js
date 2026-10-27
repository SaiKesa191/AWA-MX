

  define({
 
  onNavigate: function()
  {
         
      
   this.view.preShow = this.onPreShow.bind(this);
    
    

  },
    
    onPreShow: function()
    {
      this.ontes();
    },
    
    ontes: function () {
    var self = this;
    var link = voltmx.store.getItem("linkdata");
  
      if (link.includes("?")) {
    link += "&ts=" + new Date().getTime();
} else {
    link += "?ts=" + new Date().getTime();
}
    
    // Remove existing browser widget if present
  
  
    var urlConf = {
        URL: link,
        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };

    var webBasic = {
        id: "browserID",
        isVisible: true,
        requestURLConfig: urlConf,
        height: "100%",
        width: "100%"
    };

    var webLayout = {
        height: "100%",
        width: "100%",
        top: "0dp",
        left: "0dp"
    };

    var webPsp = {};
      
      this.view.flxMain.removeAll();

    var browserID = new voltmx.ui.Browser(webBasic, webLayout, webPsp);
   
      
         //#ifdef iphone
     browserID.cacheConfig = {
  cachePolicy: voltmx.net.cache.RELOAD_IGNORING_LOCAL_CACHE_DATA,
  cacheStoragePolicy: voltmx.net.cache.NOT_ALLOWED
};
        //#endif    
    
    this.view.flxMain.add(browserID);
     
   // iOS sometimes needs layout before assigning callbacks

       
    // Re-fetch the instance after it's added
    this.view.browserID = browserID;
 this.view.forceLayout(); 
   

    this.view.browserID.onPageFinished = function (browserWidget, params) {
        var url = params && (params.originalURL || params.url);
        voltmx.print("Page finished loading with URL: " + url);

        if (url && url.startsWith("https://paypage.sandbox.ngenius-payments.com/?code=5efa82b95a7926cb")) {
            voltmx.print("Detected payment callback URL");
           
          

            var previousForm = voltmx.application.getPreviousForm();
            var navData = {
                paymentCompleted: true
            };
             
            if (previousForm && previousForm.id) {
                new voltmx.mvc.Navigation(previousForm.id).navigate(navData);
              
            }
        }
      
    
    };
}

  
 
  
// ontes: function () {
   
//    var link= voltmx.store.getItem("linkdata");
   
//     if (this.view.browserID) {
//     this.view.remove(this.view.browserID);
//     this.view.browserID = null; // Also nullify the reference
//   }
   
   
//     var urlConf = {
//         URL: link,
//         requestMethod: constants.BROWSER_REQUEST_METHOD_GET
//     };
//     var webBasic = {
//         id: "browserID",
//         isVisible: true,
//         requestURLConfig: urlConf ,
//         height:"100%",
//          width:"100%"// Corrected case of 'urlConf'
//     };
//    var webLayout = {
//         height: "500%",
//         width: "100%",
//         top: "0dp",
//         left: "0dp"
//     };
//     var webPsp = {};
//     var browserID = new voltmx.ui.Browser(webBasic, webLayout, webPsp);
//   this.view.flxMain.add(browserID);
//    this.view.browserID.onPageFinished = this.onPageStartedCallback;
//   this.view.forceLayout();
   
 
//   },
 
  
//   onPageStartedCallback: function(eventobject, params) {
//     var url = params["originalURL"];
//     voltmx.print("#### Params are " + url);
 
//     if (url && url.startsWith("https://paypage.sandbox.ngenius-payments.com/?code=5efa82b95a7926cb")) {
//         voltmx.print("#### Clicked on Forgot password or Payment Callback");
 
//         var previousForm = voltmx.application.getPreviousForm();
 
//         var navData = {
//             paymentCompleted: true
//         };
 
//         if (previousForm && previousForm.id) {
//             new voltmx.mvc.Navigation(previousForm.id).navigate(navData);
//         } 
//     }
// },
 
//   ontesIOS: function () {
//   var self = this;
//   var link = voltmx.store.getItem("linkdata");

//   // Remove existing browser instance if present
//   if (this.view.browserID) {
//     this.view.flxMain.remove(this.view.browserID); // Ensure removal from parent
//     this.view.browserID = null;
//   }

//   // Configure browser settings
//   var urlConf = {
//     URL: link,
//     requestMethod: constants.BROWSER_REQUEST_METHOD_GET
//   };

//   var webBasic = {
//     id: "browserID",
//     isVisible: true,
//     requestURLConfig: urlConf,
//     detectTelNumber: false, // For iOS: avoids tel:// links causing app crashes
//     enableZoom: false       // Optional: disable pinch zoom
//   };

//   var webLayout = {
//     height: "100%",
//     width: "100%",
//     top: "0dp",
//     left: "0dp"
//   };

//   var webPsp = {
//     // iOS requires minimum styling to avoid rendering issues
//     browserWidgetZoom: true
//   };

//   // Create browser widget
//   var browser = new voltmx.ui.Browser(webBasic, webLayout, webPsp);
//   this.view.browserID = browser; // Assign to controller scope

//   // Add to the form layout
//   this.view.flxMain.add(browser);

//   // Register callback for when page load finishes
//   browser.onPageFinished = function (widgetRef, params) {
//     self.onPageFinishedCallback(params);
//   };

//   this.view.forceLayout();
// },

// // Page finish callback
// onPageFinishedCallback: function (params) {
//   try {
//     var url = params["originalURL"] || params["url"]; // Some iOS devices use "url"
//     voltmx.print("onPageFinished - URL: " + url);

//     // Detect payment response
//     if (url && url.startsWith("https://paypage.sandbox.ngenius-payments.com/?code=5efa82b95a7926cb")) {
//       voltmx.print("### Payment Callback detected.");

//       var previousForm = voltmx.application.getPreviousForm();

//       if (previousForm && previousForm.id) {
//         var navObj = new voltmx.mvc.Navigation(previousForm.id);
//         navObj.navigate({ paymentCompleted: true });
//       }
//     }
//   } catch (err) {
//     voltmx.print("Error in onPageFinishedCallback: " + err.message);
//   }
// }

 
});
 