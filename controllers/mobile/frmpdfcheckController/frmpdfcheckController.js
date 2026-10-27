define({ 
onNavigate: function(){
  
},
 //Type your controller code here 

 pdfCheck: function() {
    try {
      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
     var TestPdfNfi = java.import("com.example.pdfuploadnfitest.TestPdfNfi");
     TestPdfNfi.pdfCallback = this.pdfCallback;
     var activityContext = VoltMXMain.getActivityContext();
     var Intent  = java.import("android.content.Intent");
     var intentObj =  new Intent(activityContext, TestPdfNfi.class);
     activityContext.startActivity(intentObj);
 
    } catch (e) {
        alert("Error: " + e.message);
    }
 },
  
  pdfCallback: function ( data) {
    voltmx.print( "selcted pdf callback data:::" + this.data) ;
    alert("Filename selected :::"+this.data);
    
   /// var fileName = data[0];
   // var fileContentOrPath = data[1]; 
//     this.view.Label0a7cc320a541645.text =data;
    
  this.view.Label0j43261d34f8f45.text =  this.data;
  },
  
  btnSubmitOnClickAction: function(){
    var self = this;
     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    this.pdfCheck();
var filename = this.data;
//     var filename = "image1.png";
// var userObj = voltmx.store.getItem("UserObj");
// var base64 =  voltmx.store.getItem("base64");
var type = voltmx.store.getItem("type");

// alert("UserObj :"+userObj);
// alert("UserObj :"+JSON.stringify(userObj));
var moduleName = "CreateItems";
var moduleType = "Customers";
var is_org = 1;
var user_token = voltmx.store.getItem("getUserAccesstoken");
var user_id = voltmx.store.getItem("userId");
// alert("userId :"+user_id);
var fileDetails = 
[{"is_thumbnail": "false",  
  "filename"    : filename, 
//   "base64"      : this.base64MyDocsUpload.replaceAll('+','/plus/'),
  "type"        : type
 }];
var create_dam_items_inputparam = {};
create_dam_items_inputparam["serviceID"] = "fry_collection$create-dam-items";
var create_dam_items_httpheaders = {};
create_dam_items_inputparam["httpheaders"] = create_dam_items_httpheaders;
var create_dam_items_httpconfigs = {};
create_dam_items_inputparam["httpconfig"] = create_dam_items_httpconfigs;
// create_dam_items_inputparam["type"] = type;
 create_dam_items_inputparam["collectionId"] = "";
 create_dam_items_inputparam["moduleType"] = moduleType;
 create_dam_items_inputparam["user_id"] = user_id;
 create_dam_items_inputparam["moduleName"] = moduleName;
 create_dam_items_inputparam["file_details"] = fileDetails;
 create_dam_items_inputparam["user_token"] = user_token;
 create_dam_items_inputparam["is_org"] = is_org;

fry_collection$create_dam_items = 
mfintegrationsecureinvokerasync(
create_dam_items_inputparam, 
"fry_collection", 
"create-dam-items", 
function(status,response){
// alert("create dam items service response :"+JSON.stringify(response));
// alert("status: "+status);
 
  if(response.opstatus === 0){
   
     if(response.message === "Success"){
          voltmx.application.dismissLoadingScreen();
//     alert("Sucess"+response.message);
       alert("Uploaded Successfully");
//     alert("Response for upload : "+JSON.stringify(response));
       self.view.flxUploadPopup.setVisibility(false);
       var ntf = new voltmx.mvc.Navigation("frmGovtIds");
      ntf.navigate({
        "variable_base64": self.base64MyDocsUpload,
        "_meta_": {
            "eventName": "onClick",
            "widgetId": "btnSubmit"
        }
    });
//     alert("request :"+JSON.stringify(create_dam_items_inputparam));
//     voltmx.print("request :"+JSON.stringify(create_dam_items_inputparam));

  }
    else{
       voltmx.application.dismissLoadingScreen();
      alert("file upload failed!!")
    }
  }
  else{
    voltmx.application.dismissLoadingScreen();
    alert("file upload response: "+JSON.stringify(response));
    alert("Backend Request Failed, Please try Again!!");
  }
//  var x = new voltmx.mvc.Navigation("frmDashBoard");
//   x.navigate();
});
  }

 });