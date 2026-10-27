define({ 

 //Type your controller code here 
    onNavigate: function(){
    this.view.btnLogin.onClick= this.login.bind(this);
  },
  
  login: function(){
    
    alert("entered into login");
    var self = this;
    
     if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    
    function invSuccess(response) {
      alert("login success");
      var instance = voltmx.sdk.getCurrentInstance();
     if (instance.tokens && instance.tokens.DevAzureB2C && instance.tokens.DevAzureB2C.provider_token && instance.tokens.DevAzureB2C.provider_token.params) {
        var accesstoken = instance.tokens.DevAzureB2C.provider_token.params.access_token;
        var refreshtoken = instance.tokens.DevAzureB2C.provider_token.params.refresh_token;
        var expon = instance.tokens.DevAzureB2C.provider_token.params.expires_on;
        
        voltmx.store.setItem("accesstoken", accesstoken);
        voltmx.store.setItem("refreshtoken", refreshtoken);
        voltmx.store.setItem("expon", expon);
    } else {
        voltmx.print("Provider tokens missing after login!");
    }
 
      voltmx.store.setItem("isLogin",true);
      voltmx.store.setItem("isUserCreated",true);
      
      self.getUserObject();
      
    }
    function invFailure(error) {
      alert("login failed");
    }
    
    login_inputparam["serviceID"] = "DevAzureB2C$login";
    login_inputparam["operation"] = "login";
    login_inputparam["UseDeviceBrowser"] = true;
    //#ifdef preview
    //#ifdef iphone
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#else
    //#ifdef iphone
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#endif
    DevAzureB2C$login = mfidentityserviceinvoker("DevAzureB2C", login_inputparam, invSuccess, invFailure);
 
  },

  
  getUserObject: function()
  {
    
     var self = this;
 
    function invoke_service_callback(status, get_user_object) {
      voltmx.print(status);
//       alert(get_user_object);
//       alert("user object id:"+get_user_object.rawResponse.user_id);
     var getUserAccesstoken =  get_user_object.rawResponse.access_token;
      var userId = get_user_object.rawResponse.user_id;
      var userAccessTokenExp = get_user_object.rawResponse.expires_in;
      var jobtitle = get_user_object.rawResponse.job_title;
      voltmx.store.setItem("userObject",get_user_object);
      voltmx.store.setItem("userId",userId);
      voltmx.store.setItem("getUserAccesstoken",getUserAccesstoken); //getUserAccessToken
      voltmx.store.setItem("userAccessTokenExp",userAccessTokenExp);
      voltmx.store.setItem("jobTitle",jobtitle);
      
//       var x = new voltmx.mvc.Navigation("frmExtractEXcelDAtadone");
//       x.navigate();
      
      voltmx.store.setItem("username",get_user_object.rawResponse.nick);
    }
    if (get_user_object_inputparam == undefined) {
        var get_user_object_inputparam = {};
    }
    get_user_object_inputparam["serviceID"] = "ms_user$get-user-object";
    var get_user_object_httpheaders = {
        "jwt_azure_token": voltmx.store.getItem("accesstoken")
    };
    get_user_object_inputparam["httpheaders"] = get_user_object_httpheaders;
    var get_user_object_httpconfigs = {};
    get_user_object_inputparam["httpconfig"] = get_user_object_httpconfigs;
    ms_user$get_user_object = mfintegrationsecureinvokerasync(get_user_object_inputparam, "ms_user", "get-user-object", invoke_service_callback);
},

  
  excelCheck: function() {
    try {

      
      
      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
     var Testexcel = java.import("com.example.excelfileupload.Testexcel");
     Testexcel.excelCallBack = this.excelCallBack;
     var activityContext = VoltMXMain.getActivityContext();
     var Intent  = java.import("android.content.Intent");
     var intentObj =  new Intent(activityContext, Testexcel.class);
     activityContext.startActivity(intentObj);
 
    } catch (e) {
        alert("Error: " + e.message);
    }
 },
  
  
  excelCallBack: function ( data) {
    

    voltmx.print( "selcted pdf callback data:::" + data) ;
    alert("Filename selected :::"+data);
    
    let pdfData = null;

if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    try {
        const dataJsonStr = JSON.stringify(data);
        pdfData = JSON.parse(dataJsonStr);
       this.view.Label0c87133cdd6494c.text =pdfData.fileName;
    
    this.view.Label0cef3722d379d40.text =  pdfData.pathname;
    
    this.view.Label0f49ecbe269be4c.text= pdfData.base64pdf;
      

      
       var base64 = data.base64pdf;  // <-- define base64 here

  this.parseCSVBase64(base64);
      

    } 
    
    catch (error) {
        alert("Failed to clone data:", error);
        pdfData = null;
    }
}
    
 
    
    
  },
  
  
  
  
 

parseCSVBase64: function(base64) {
  var self = this;
  try {
    voltmx.print("Entered parseCSVBase64");

    var decoded = "";
    
     const userToken = voltmx.store.getItem("getUserAccesstoken");


    if (typeof atob === "function") {
      // Use atob if available
      decoded = atob(base64);
    } else {
      // Use Java Base64 decode (NFI)
      var Base64 = java.import("android.util.Base64");
      var decodedBytes = Base64.decode(base64, Base64.DEFAULT);
      for (var i = 0; i < decodedBytes.length; i++) {
        decoded += String.fromCharCode(decodedBytes[i]);
      }
    }

    voltmx.print("CSV Decoded: " + decoded);

    var lines = decoded.split("\n").filter(line => line.trim() !== "");
    var headers = lines[0].split(",");

    var jsonData = [];

    for (var i = 1; i < lines.length; i++) {
      var data = lines[i].split(",");
      if (data.length === headers.length) {
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = data[j].trim();
        }
        jsonData.push(row);
      }
    }
    voltmx.print(jsonData);
    self.invokeCreateMulipleFleet(jsonData);
    voltmx.print("Parsed JSON: " + JSON.stringify(jsonData));
    alert("Parsed JSON:\n" + JSON.stringify(jsonData));
    
    
   
    
  } catch (ex) {
    alert("Error in parseCSVBase64: " + ex.message);
  }
},
  
invokeCreateMulipleFleet: function(jsonData) {
  var self = this;

  const userToken = voltmx.store.getItem("getUserAccesstoken");

  var create_fleet_batch_inputparam = {
    serviceID  : "ms_fleet$create-fleet-batch",
    httpheaders: {
      "user_token": userToken,
      "jwt_token" : "", // Add actual JWT if needed
      "Content-Type": "application/json"
    },
    httpconfig: {
      method: "POST"  // Ensure method is POST
    }
  };

  // Directly send the array as JSON string (no wrapping)
//   create_fleet_batch_inputparam["data"] = JSON.stringify(jsonData);
create_fleet_batch_inputparam["data"] = JSON.stringify({ data: jsonData });

  function INVOKE_SERVICE_Callback(status, response) {
    if (status === 400 || status === 401 || status === 500) {
      voltmx.print("Fleet batch creation failed. Status: " + status + " Response: " + JSON.stringify(response));
      alert("Error occurred:\n" + JSON.stringify(response));
    } else {
      voltmx.print("Fleet batch created successfully. Response: " + JSON.stringify(response));
      alert("Fleet batch created successfully.");
    }
  }

  mfintegrationsecureinvokerasync(
    create_fleet_batch_inputparam,
    "ms_fleet",
    "create-fleet-batch",
    INVOKE_SERVICE_Callback
  );
}







  
//    parseCSVBase64: function () {
// //     var base64CSV = "TmFtZSxBZ2UKSm9obiwzMApEb2UsMjU="; // "Name,Age\nJohn,30\nDoe,25"
//       var base64CSV=base64
//      var decoded = atob(base64CSV);

//     alert("CSV Decoded:\n" + decoded);

//     var lines = decoded.split("\n");
//     var headers = lines[0].split(",");

//     var jsonData = [];

//     for (var i = 1; i < lines.length; i++) {
//       var data = lines[i].split(",");
//       if (data.length === headers.length) {
//         var row = {};
//         for (var j = 0; j < headers.length; j++) {
//           row[headers[j]] = data[j];
//         }
//         jsonData.push(row);
//       }
//     }

//     alert("Parsed JSON:\n" + JSON.stringify(jsonData));
//   }

  
  
//   pdfUpload: function(data){
//     alert("Upload :::"+data);
//   },
  
//   //         var PdfClass = java.import("com.example.pdffileupload.TestNfi");

// //     //    Get the Android activity context
// // //         var activity = voltmx.os.getActivityContext();
// // //         if (!activity) {
// // //             alert("Error: Activity context is null");
// // //             return;
// // //         }
      
// //       var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
// //       var activitycontext = VoltMXMain.getActivityContext();
      
// //       var Intent  = java.import("android.content.Intent");
// //      var intentObj =  new Intent(activitycontext, PdfClass.class);
// //      activitycontext.startActivity(intentObj);
  
  
  
        
//    // var Instance=  PdfClass.getInstance()
// //        var pdfshow= pdfInstance.openFilePicker(activity);
// //       // pdfInstance.onActivityResult(1,-1,pdfshow);

//      //   alert("PDF selection started"+intentObj);

  
  
  
  
  
//   pdfCheck1: function() {
//     try {
//         var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
//         var Testexcel = java.import("com.example.excelfileupload.Testexcel");
//         var activityContext = VoltMXMain.getActivityContext();

//         // Assume fileUriStr, fileName, and pathname are passed from the Android UI or callback
//         var fileUri = this.fileUri; // You must convert or store it in NFI flow
//         var fileName = "";
//         var pathname = "";

//         var base64String = Testexcel.uploadPdf(fileUri, fileName, pathname);

//         voltmx.print("Base64 PDF: " + base64String);
//         this.view.Label0f0e3db454b3148.text = base64String;

//     } catch (e) {
//         alert("Error in pdfCheck: " + e.message);
//     }
// }

 });