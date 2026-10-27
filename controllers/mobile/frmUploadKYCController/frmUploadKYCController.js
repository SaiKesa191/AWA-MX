define({ 

//Type your controller code here 
onNavigate: function(){
// this.view.flxBtnToUploadGovtID.onClick = this.UploadGovtIDPdfFile;
// this.view.flxBtnToUploadContract.onClick = this.UploadContractPdfFile;
// this.view.flxBtnToUploadIbanDetails.onClick = this.UploadIbanPdfFile;
this.view.flxBtnToUploadGovtID.onClick = this.imgGovtUpload.bind(this);
this.view.flxBtnToUploadContract.onClick = this.imgContractUpload.bind(this);
this.view.flxBtnToUploadIbanDetails.onClick = this.imageIbanUpload.bind(this);
this.view.btnUpload.onClick = this.createDamItems.bind(this);
this.view.flxUploadConfirmationinGovtID.setVisibility(false);
 this.view.flxUploadConfirmationInContract.setVisibility(false);
  this.view.flxUploadConfirmationInIban.setVisibility(false);
  this.view.preShow = this.onPreShow.bind(this);


},
  imgGovtUpload: function(){
    var self = this;
//     alert("Entered into Choosefrmgallery function!!");
voltmx.store.setItem("type", "govtIds");
    var type = "govtIds";
     voltmx.phone.openMediaGallery(function(rawbytes) {
     if (rawbytes) {
           voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
       var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);
            this.view.flxUploadConfirmationinGovtID.setVisibility(true);
            this.view.lblFileNameGovtID.text = filename;
            voltmx.store.setItem("filename",filename);
            // Convert to Base64 and store based on file index
            let base64Data = voltmx.convertToBase64(rawbytes);
             voltmx.store.setItem("base64",base64Data);
            voltmx.print("Base64 : "+base64Data);
//           self.createDamItems(type,filename,base64Data);
     }  }.bind(this), {}, {
        action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
        format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      //         mimetype: "image/*"  // Set the mime type for images
      mimetype: "application/*" 

    }
    );





  },

  imgContractUpload: function(){
    var self = this;
//     alert("Entered into Choosefrmgallery function!!");
voltmx.store.setItem("type", "contract");
     voltmx.phone.openMediaGallery(function(rawbytes) {
     if (rawbytes) {
            voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
            // Convert to Base64 and store based on file index
            let base64Data = voltmx.convertToBase64(rawbytes);
              var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);
              voltmx.store.setItem("filename",filename);
             this.view.flxUploadConfirmationInContract.setVisibility(true);
             this.view.lblFileNameUploadContract.text = filename;
  voltmx.store.setItem("base64",base64Data);
            voltmx.print("Base64 : "+base64Data);
//        self.createDamItems(type,filename,base64Data);
     }  }.bind(this), {}, {
        action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
        format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      //         mimetype: "image/*"  // Set the mime type for images
      mimetype: "application/*" 

    }
    );
  },
  imageIbanUpload: function(){
    var self = this;
//     alert("Entered into Choosefrmgallery function!!");
voltmx.store.setItem("type", "iban");
     voltmx.phone.openMediaGallery(function(rawbytes) {
     if (rawbytes) {
            voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
            // Convert to Base64 and store based on file index
            let base64Data = voltmx.convertToBase64(rawbytes);
               var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);
            voltmx.store.setItem("base64",base64Data);
            voltmx.store.setItem("filename",filename);
           this.view.flxUploadConfirmationInIban.setVisibility(true);
          this.view.lblFileNameIbanDetails.text = filename;
            voltmx.print("Base64 : "+base64Data);
//        self.createDamItems(type,filename,base64Data);
     }  }.bind(this), {}, {
        action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
        format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      //         mimetype: "image/*"  // Set the mime type for images
      mimetype: "application/*" 

    }
    );
  },

createDamItems: function(){
  
  var self = this;
var filename =  voltmx.store.getItem("filename");
// var userObj = voltmx.store.getItem("UserObj");
var base64 =  voltmx.store.getItem("base64");
var type = voltmx.store.getItem("type");

// alert("UserObj :"+userObj);
// alert("UserObj :"+JSON.stringify(userObj));
var moduleName = "CreateItems";
var moduleType = "Customers";
var is_org = 1;
var user_token = voltmx.store.getItem("getUserAccesstoken");
var user_id = voltmx.store.getItem("userId");

var fileDetails = 
[{"is_thumbnail": "false",  
  "filename"    : filename, 
  "base64"      : base64
 }];
var create_dam_items_inputparam = {};
create_dam_items_inputparam["serviceID"] = "fry_collection$create-dam-items";
var create_dam_items_httpheaders = {};
create_dam_items_inputparam["httpheaders"] = create_dam_items_httpheaders;
var create_dam_items_httpconfigs = {};
create_dam_items_inputparam["httpconfig"] = create_dam_items_httpconfigs;
create_dam_items_inputparam["type"] = type;
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
alert("Uploaded Successfully");
  }
 var x = new voltmx.mvc.Navigation("frmDashBoard");
  x.navigate();
});
},
  

// UploadGovtIDPdfFile: function() {
// try {
// var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
// var PdfPickerActivity = java.import("com.example.pdffileupload.TestNfi");
// PdfPickerActivity.pdfCallback = this.pdfCallbackForGovtID;
// var activityContext = VoltMXMain.getActivityContext();
// var Intent  = java.import("android.content.Intent");
// var intentObj =  new Intent(activityContext, PdfPickerActivity.class);
// activityContext.startActivity(intentObj);

// } catch (e) {
// alert("Error: " + e.message);
// }
// },
// pdfCallbackForGovtID: function ( data) {
// voltmx.print( "selcted pdf callback data:::" + data) ;
// alert("Filename selected :::"+data);
// this.view.flxUploadConfirmationinGovtID.setVisibility(true);
// this.view.lblFileNameGovtID.text =data;
// voltmx.store.setItem("UploadedfileName", data);
// },
// UploadContractPdfFile: function() {
// try {
// var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
// var PdfPickerActivity = java.import("com.example.pdffileupload.TestNfi");
// PdfPickerActivity.pdfCallback = this.pdfCallbackForContract;
// var activityContext = VoltMXMain.getActivityContext();
// var Intent  = java.import("android.content.Intent");
// var intentObj =  new Intent(activityContext, PdfPickerActivity.class);
// activityContext.startActivity(intentObj);
// } catch (e) {
// alert("Error: " + e.message);
// }
// },
// pdfCallbackForContract: function ( data) {
// voltmx.print( "selcted pdf callback data:::" + data) ;
// alert("Filename selected :::"+data);
// this.view.flxUploadConfirmationInContract.setVisibility(true);
// this.view.lblFileNameUploadContract.text =data;
// voltmx.store.setItem("UploadedfileName", data);
// },
// UploadIbanPdfFile: function() {
// try {
// var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
// var PdfPickerActivity = java.import("com.example.pdffileupload.TestNfi");
// PdfPickerActivity.pdfCallback = this.pdfCallbackForIban;
// var activityContext = VoltMXMain.getActivityContext();
// var Intent  = java.import("android.content.Intent");
// var intentObj =  new Intent(activityContext, PdfPickerActivity.class);
// activityContext.startActivity(intentObj);

// } catch (e) {
// alert("Error: " + e.message);
// }
// },
// pdfCallbackForIban: function ( data) {
// voltmx.print( "selcted pdf callback data:::" + data) ;
// alert("Filename selected :::"+data);
// this.view.flxUploadConfirmationInIban.setVisibility(true);
// this.view.lblFileNameIbanDetails.text =data;
// voltmx.store.setItem("UploadedfileName", data);
// },

 onPreShow: function(){
    this.loginConfirmation();
  },
loginConfirmation: function(){
var isLogin =voltmx.store.getItem("isLogin");
// alert("isLogin :"+isLogin);
var isUserCreated = voltmx.store.getItem("isUserCreated");
// alert("isusercreateds :"+isUserCreated);
if(isLogin === true && isUserCreated === true){
this.view.Footer2.imgSellCar.setVisibility(false);
this.view.Footer2.flxProfile.setVisibility(true);
}
else{
this.view.Footer2.imgSellCar.setVisibility(true);
this.view.Footer2.flxProfile.setVisibility(false);
}
},
btnUploadOnClickAction: function(){
var self = this;
var filename = voltmx.store.getItem("UploadedfileName");
var userObj = voltmx.store.getItem("UserObj");
var base64 = voltmx.store.getItem("base64");
var type = voltmx.store.getItem("type");
alert("UserObj :"+userObj);
alert("UserObj :"+JSON.stringify(userObj));
var moduleName = "CreateItems";
var moduleType = "Customers";
var is_org = 1;
var user_token = "";
var user_id = "";
var file_name = "image.png";
var fileDetails = 
[{"is_thumbnail": "false",  
  "filename"    : filename, 
  "base64"      : base64
 }];
// var create_dam_items_inputparam = {};
// create_dam_items_inputparam["serviceID"] = "fry_collection$create-dam-items";
// var create_dam_items_httpheaders = {};
// create_dam_items_inputparam["httpheaders"] = create_dam_items_httpheaders;
// var create_dam_items_httpconfigs = {};
// create_dam_items_inputparam["httpconfig"] = create_dam_items_httpconfigs;
// create_dam_items_inputparam["type"] = type;
// create_dam_items_inputparam["collectionId"] = "";
// create_dam_items_inputparam["moduleType"] = moduleType;
// create_dam_items_inputparam["user_id"] = user_id;
// create_dam_items_inputparam["moduleName"] = moduleName;
// create_dam_items_inputparam["file_details"] = fileDetails;
// create_dam_items_inputparam["user_token"] = user_token;
// create_dam_items_inputparam["is_org"] = is_org;

// fry_collection$create_dam_items = 
// mfintegrationsecureinvokerasync(
// create_dam_items_inputparam, 
// "fry_collection", 
// "create-dam-items", 
// function(status,response){
// alert("create dam items service response :"+JSON.stringify(response));
// alert("status: "+status);
// });
},
 



});