define({ 

  onNavigate: function(){

    this.setData();
    this.view.flxBack.onClick=this.navToProfile.bind(this);
    this.view.flxBack01.onClick=this.backToServiceList.bind(this);
    this.view.preShow = this.preShow();
    
  },


  preShow: function(){
    this.getRequestedServices();
  },

  getRequestedServices: function(){
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var userId = voltmx.store.getItem("userId");
    var userToken = voltmx.store.getItem("getUserAccesstoken");



    function INVOKE_SERVICE_ge6fd98059704deda77d515e530a1920_Callback
    (status, response) {
      var servicesResponse = response.records || [];
      var segmentData = [];

      if (servicesResponse.length === 0) {
        // Show 'No records' message
        self.view.lblNoRecords.setVisibility(true);
        self.view.segBookings.setVisibility(false);
        self.view.segBookings.setData([]);  
      } else {
        // Hide the 'No records' label
        self.view.lblNoRecords.setVisibility(false);
        self.view.segBookings.setVisibility(true);
        // Loop through and prepare segment data
        for (var i = 0; i < servicesResponse.length; i++) {
          var item = servicesResponse[i];

//           segmentData.push({
//             "lblVehicle": item.title || "N/A",
//             "lblDesc"   : item.service_name || "N/A",
//             "flxEyeIcon": {
//               "onClick": self.vehicleDetails.bind(this, item)
//             },
//             "flxSegMyBookings": {
//                  "reverseLayoutDirection": isArabic
//             }
//           });
    
        segmentData.push({
          lblVehicle: {
          "text": item.title || "N/A",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
          },
          lblDesc: {
           "text": item.service_name || "N/A",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
          },
          flxEyeIcon: 
          { 
            onClick: self.vehicleDetails.bind(self, item) 
          },
          flxSegMyBookings:
          {
            reverseLayoutDirection: isArabic 
          }
        });
      

        }

        // Set widgetDataMap only if needed
        self.view.segBookings.widgetDataMap = {
          lblVehicle: "lblVehicle",
          lblDesc: "lblDesc",
          flxEyeIcon: "flxEyeIcon"
        };

        // Assign data to the segment
        self.view.segBookings.setData(segmentData);
      }
    }



    if (get_seller_my_requested_services_inputparam == undefined) {
      var get_seller_my_requested_services_inputparam = {};
    }
    get_seller_my_requested_services_inputparam["serviceID"] = 
      "fry_int_seller$get-seller-my-requested-services";
    get_seller_my_requested_services_inputparam["user_id"] =userId;
    get_seller_my_requested_services_inputparam["requested_on_from"] ="";
    get_seller_my_requested_services_inputparam["requested_on_to"] ="";
    get_seller_my_requested_services_inputparam["auction_name"] ="";
    get_seller_my_requested_services_inputparam["auction_batch_id"] ="";
    get_seller_my_requested_services_inputparam["service_name"] ="";
    get_seller_my_requested_services_inputparam["notes"] ="";
    get_seller_my_requested_services_inputparam["status"] ="";
    get_seller_my_requested_services_inputparam["page_number"] ="1";
    get_seller_my_requested_services_inputparam["page_size"] ="100";

    var get_seller_my_requested_services_httpheaders = {
      "user_token": userToken,
    };
    get_seller_my_requested_services_inputparam["httpheaders"] =
      get_seller_my_requested_services_httpheaders;
    var get_seller_my_requested_services_httpconfigs = {};
    get_seller_my_requested_services_inputparam["httpconfig"] =
      get_seller_my_requested_services_httpconfigs;
    fry_int_seller$get_seller_my_requested_services =
      mfintegrationsecureinvokerasync(get_seller_my_requested_services_inputparam,
                                      "fry_int_seller", "get-seller-my-requested-services",
                                      INVOKE_SERVICE_ge6fd98059704deda77d515e530a1920_Callback);
    // }



  },

  editRequestedServices: function(){
       var self = this;
        var update_my_requested_service_inputparam = update_my_requested_service_inputparam || {};
    
    update_my_requested_service_inputparam["serviceID"] = "ms_fleet$update-my-requested-service";
    var update_my_requested_service_httpheaders = {};
    update_my_requested_service_inputparam["httpheaders"] = update_my_requested_service_httpheaders;
    var update_my_requested_service_httpconfigs = {};
    update_my_requested_service_inputparam["httpconfig"] = update_my_requested_service_httpconfigs;
    ms_fleet$update_my_requested_service =
      mfintegrationsecureinvokerasync(update_my_requested_service_inputparam, 
                                      "ms_fleet", 
                                      "update-my-requested-service",
                                     function(status, response){
      voltmx.print("response"+JSON.stringify(response));
} );
},
 
  vehicleDetails: function(item)
  {

    var self = this;
    
    self.view.segMyBookingDetails.widgetDataMap = {
  "lblAuctionId": "lblAuctionId",
  "lblAuctionIdValue": "lblAuctionIdValue",
  "lblAuctionName": "lblAuctionName",
  "lblAuctionNameValue": "lblAuctionNameValue",
  "lblAuction": "lblAuction",
  "lblAuctionValue": "lblAuctionValue",
  "lblServiceName": "lblServiceName",
  "lblServiceNameValue": "lblServiceNameValue",
  "lblRequestedTime": "lblRequestedTime",
  "lbltargetSellingPriceValue": "lbltargetSellingPriceValue",
  "lblNotes": "lblNotes",
  "lblNotesValue": "lblNotesValue",
  "lblStatus": "lblStatus",
  "lblStatusValue": "lblStatusValue",
  "lblMessages": "lblMessages",
  "txtAreaMessages": "txtAreaMessages",  // 🔹 Add this line
  "btnEdit": "btnEdit",
  "btnDelete": "btnDelete",
      "lblServiceProviderReportValue":"lblServiceProviderReportValue",
      "lblServiceProviderReport":"lblServiceProviderReport",
      "flxDownload":"flxDownload",
      "lblUploadedFiles":"lblUploadedFiles",
      "imgUpload":"imgUpload",
      "lblUploadedFileName":"lblUploadedFileName",
      "btnMessages":"btnMessages",
      "flxUploadFiles":"flxUploadFiles"
      
      
};

    //     self.view.flxSegVehicles.setVisibility(false);
    //    self.view.flxTable.setVisibility(true); 
    //     self.view.flxBookingDetails.setVisibility(true);
    //     self.view.flxSegBookings.setVisibility(false);
    self.view.flxBody.setVisibility(false);
    self.view.flxSegServiceRequestDetails.setVisibility(true);
    var isCompleted =
    item.status && item.status.toLowerCase() === "approved";
    var vehicleDetail=[
      { "lblAuctionId":
       voltmx.i18n.getLocalizedString("ID") ,
       "lblAuctionIdValue": item.request_id || "N/A",

       "lblAuctionName": voltmx.i18n.getLocalizedString("Auction Name"),
       "lblAuctionNameValue": item.title || "N/A",

       "lblAuction": voltmx.i18n.getLocalizedString("Auction"),
       "lblAuctionValue":item.lot_no,

       "lblServiceName": voltmx.i18n.getLocalizedString("Service Name"),
       "lblServiceNameValue": item.service_name,

       "lblRequestedTime":  voltmx.i18n.getLocalizedString("Requested Time"),
       "lbltargetSellingPriceValue": item.requested_time,

       "lblNotes": voltmx.i18n.getLocalizedString("Notes"),
       "lblNotesValue":"-",
      "txtAreaMessages": {
  "text": ""   // initially empty
},

       "flxDownload": {
         "text":voltmx.i18n.getLocalizedString("Delete").toUpperCase(),
         //                    "onClick": this.invokeFleetWFStatus.bind(this,item)
         "onClick": self.openUrlInWeb.bind(self, item)
       },
      
       "lblStatus":voltmx.i18n.getLocalizedString("Status"),
       "lblStatusValue": item.status,

       "lblUploadedFiles": voltmx.i18n.getLocalizedString("Uploaded Files"),
       "imgUpload":{
         "src":"upload.png",
         "isVisible":false
       },   
       "flxUploadFiles":{
          "onClick": self.getFileNameAndUrlByObjectId.bind(self, item)
      },
       "lblUploadedFileName":"File",

       "lblServiceProviderReport": voltmx.i18n.getLocalizedString("Service Provider Report") ,         
//        "lblServiceProviderReportValue": item.service_doc_name || "-",
       "lblServiceProviderReportValue": "SP Report",

       "lblMessages": voltmx.i18n.getLocalizedString("Messages"),
       //           "txtAreaMessages":"Done",
         btnDelete: {
        text: voltmx.i18n.getLocalizedString("Delete").toUpperCase(),
        onClick: isCompleted
          ? null // disabled when completed
          : self.deleteServiceRequest.bind(self, item.request_id),
      
        enable: !isCompleted, // disables interaction
        opacity: isCompleted ? 0.5 : 1
      },
      "btnEdit": {
  "text": voltmx.i18n.getLocalizedString("Send"),
  "onClick": function(widgetRef, context) {
      self.sendMessage(item, context);
  }
},
       "btnMessages":{
         "onClick": function() {
           new voltmx.mvc.Navigation("frmMyBookingMessages").navigate({
     item: item
     });
         },
         "text": "MESSAGES"
       }
       

       
       
      },
    ]

  
//     self.view.segMyBookingDetails.setData(vehicleDetail);
    
    try {
  if (self.view && self.view.segMyBookingDetails && vehicleDetail) {
    self.view.segMyBookingDetails.setData(vehicleDetail);
  } else {
    voltmx.print("Segment or data not available to set.");
  }
} catch (e) {
  voltmx.print("Error setting data to segMyBookingDetails: " + e.message);
//   alert("Something went wrong while loading booking details.");
}


    //     self.view.lblAuctionId.text="Auction Id";
    //     self.view.lblAuctionIdValue= item.request_id || "N/A";
    //     self.view.lblAuctionName= "Auction Name";
    //     self.view.lblAuctionNameValue= item.title || "N/A";
    //     self.view.lblAuction= "Auction";
    //     self.view.lblAuctionValue= item.lot_no;
    //     self.view.lblServiceName= "Service Name";
    //     self.view.lblServiceNameValue= item.service_name;
    //     self.view.lblRequestedTime= "Requested Time";
    //     self.view.lbltargetSellingPriceValue= item.requested_time;
    //     self.view.lblNotes= "Notes";
    //     self.view.lblNotesValue= "-"
    //     self.view.lblStatus= "Status";
    //     self.view.lblStatusValue=  item.status;
    //     self.view.lblUploadedFiles= "Uploaded Files";
    //     self.view.lblUploadedFileName= "patrol_invoce.pdf"
    //     self.view.lblServiceProviderReport= "Service Provider Report"
    //     self.view.lblServiceProviderReportValue= "nissan_report.pdf"
    //     self.view.lblMessages= "Message";


  },


sendMessage: function(item, context) {
  var self = this;

  // Get the message text from the segment row's txtAreaMessages
  var msg = self.view.segMyBookingDetails.data[context.rowIndex].txtAreaMessages.text;

  if (!msg || msg.trim() === "") {
    alert("Enter message");
    return;
  }

  // ---- Call your service as before ----
  function INVOKE_SERVICE_Callback(status, save_message) {
    voltmx.print(save_message);
    if (save_message.httpStatusCode && save_message.httpStatusCode === 200) {
     new voltmx.mvc.Navigation("frmMyBookingMessages").navigate({
     item: item
     });
      self.view.segMyBookingDetails.data[context.rowIndex].txtAreaMessages.text = "";
    }
    else
      {
        if(save_message && save_message.error && save_message.error.message)
          {
            alert(save_message.error.message);
          }
      }
  }

  var userToken = voltmx.store.getItem("getUserAccesstoken");
  var save_message_inputparam = {
    "serviceID": "ms_common$save-message",
    "message": msg,
    "sender_id": item.requested_by,
    "receiver_id": item.client_user_id,
    "module": "",
    "sub_module": "",
    "reference_id": item.object_id,
//     "parent_id": item.request_id,
    "parent_id": "0",
    "httpheaders": { "user_token": userToken },
    "httpconfig": {}
  };

  mfintegrationsecureinvokerasync(
    save_message_inputparam,
    "ms_common",
    "save-message",
    INVOKE_SERVICE_Callback
  );
},
  
openUrlInWeb: function(item)
  {
    
             if(item.service_doc)
               {
                 voltmx.application.openURL(item.service_doc);
               }
             else
               {
                 alert('No Report available');
               }
        
         
      
  },


  navToProfile: function()
  {
    new voltmx.mvc.Navigation("frmProfile").navigate();
  },

  backToServiceList: function(){

    this.view.flxSegServiceRequestDetails.setVisibility(false);
    this.view.flxBody.setVisibility(true);


  },


  deleteServiceRequest: function(requestidFromService){

    //     function AS_FlexContainer_h776d7385d0d472591ad5f0a72880f01(eventobject) {
    var self = this;

    self.requestId=requestidFromService;
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    //        var jwt_token= voltmx.store.getItem("accesstoken");

    function INVOKE_SERVICE_e281b6bbba2d46d3bee7b39b5074f242_Callback(status,
                                                                      delete_service_request) {
      //         alert( "response after deletion :"
      //                             + JSON.stringify(delete_service_request));

      if(delete_service_request && delete_service_request.message==="Service request deleted successfully"){
        alert(delete_service_request.message);
        self.getRequestedServices();
        self.view.flxSegServiceRequestDetails.setVisibility(false);
        self.view.flxBody.setVisibility(true);
      }
    }
    if (delete_service_request_inputparam == undefined) {
      var delete_service_request_inputparam = {};
    }
    delete_service_request_inputparam["serviceID"] = 
      "ms_fleet$delete-service-request";
    delete_service_request_inputparam["request_id"] = self.requestId; 

    var delete_service_request_httpheaders = {
      "user_token": usertoken,
    };
    delete_service_request_inputparam["httpheaders"] =
      delete_service_request_httpheaders;
    var delete_service_request_httpconfigs = { };
    delete_service_request_inputparam["httpconfig"] =
      delete_service_request_httpconfigs;
    ms_fleet$delete_service_request =
      mfintegrationsecureinvokerasync
    (delete_service_request_inputparam, "ms_fleet", "delete-service-request", INVOKE_SERVICE_e281b6bbba2d46d3bee7b39b5074f242_Callback);
    // }



  },

  getFileNameAndUrlByObjectId: function (item, widgetRef, context) {
  var self = this;

  try {
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var segData = self.view.segMyBookingDetails.data;
    var rowData = segData[context.rowIndex];

    function INVOKE_SERVICE_getFile_Callback(status, response) {
      voltmx.print("getFileNameAndUrlByObjectId response: " + JSON.stringify(response));
      rowData.lblUploadedFileName = "File";
      self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);

      if (
        !response ||
        !response.httpresponse ||
        response.httpresponse.responsecode !== 200
      ) {
        alert("Failed to get file details.");
        return;
      }

     
      var records = (response && response.records) || [];
      if (!records.length) {
        alert("No file found for this record.");
        rowData.lblUploadedFileName = "File not available";
        self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);
        return;
      }

      var serviceName = (item.service_name || "").toLowerCase();
      var matchedRecord = null;

      
      if (serviceName.includes("inspection")) {
        matchedRecord = records.find(function (rec) {
          return rec.type && rec.type.toLowerCase() === "car-inspection";
        });
      } else if (serviceName.includes("rsa")) {
        matchedRecord = records.find(function (rec) {
          return rec.type && rec.type === "Possession_Letter";
        });
      } else {
        matchedRecord = records[0]; 
      }

      if (!matchedRecord) {
        alert("No matching file found for this service type.");
        rowData.lblUploadedFileName = "File not available";
        self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);
        return;
      }

      var fileUrl = matchedRecord.file_url || "";
      var fileName = matchedRecord.type || "File";

      if (!fileUrl) {
        alert("No file found for this record.");
        rowData.lblUploadedFileName = "File not available";
        self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);
        return;
      }

      
      rowData.lblUploadedFileName = fileName || "File";
      self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);

      voltmx.application.openURL(fileUrl);
    }

   
    var inputParams = {
      serviceID: "fry_int_common$get-documets-with-file-type",
      object_id: item.object_id || "",
      file_name: "",
      file_description: "",
      file_types: "",
      page: "1",
      pageSize: "10",
      httpheaders: { user_token: usertoken },
      httpconfig: {}
    };

    voltmx.print("Invoking service with params: " + JSON.stringify(inputParams));

    fry_int_common$get_documets_with_file_type = mfintegrationsecureinvokerasync(
      inputParams,
      "fry_int_common",
      "get-documets-with-file-type",
      INVOKE_SERVICE_getFile_Callback
    );
  } catch (error) {
    alert("Error: " + error.message);
  }
},
//  getFileNameAndUrlByObjectId: function (item,widgetRef, context) {
//   var self = this;

//   try {
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     var segData = self.view.segMyBookingDetails.data;
//     var rowData = segData[context.rowIndex];

//     // Define service callback
//     function INVOKE_SERVICE_getFile_Callback(status, response) {
//       voltmx.print("getFileNameAndUrlByObjectId response: " + JSON.stringify(response));
//    rowData.lblUploadedFileName = "File";
//     self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);
//    if (
//   !response ||
//   !response.httpresponse ||
//   response.httpresponse.responsecode !== 200
// ) {
//   alert("Failed to get file details.");
//   return;
// }

    
//       // ✅ Safely extract file info (no optional chaining)
//       var fileUrl =
//         (response && response.records && response.records[0] && response.records[0].file_url) ||
//         (response && response.file_url) ||
//         "";

//       var fileName =
//         (response && response.records && response.records[0] && response.records[0].file_name) ||
//         (response && response.file_name) ||
//         "File";

//       if (!fileUrl) {
//         alert("No file found for this record.");
//         return;
//       }

//       // ✅ Update label values inside segment row
//       rowData.lblUploadedFileName = fileName || "File";
// //       rowData.lblServiceProviderReportValue = fileUrl;

//       // ✅ Update row in segment
//       self.view.segMyBookingDetails.setDataAt(rowData, context.rowIndex);

//       // ✅ Open file URL
//       voltmx.application.openURL(fileUrl);
//     }

//     // ✅ Prepare request params
//     var inputParams = {
//       serviceID: "fry_int_common$get-documets-with-file-type",
//       object_id: item.object_id || "",
//       file_name: "",
//       file_description: "",
//       file_types: "",
//       page: "1",
//       pageSize: "10",
// //       service_id: item.request_id || "",
//       httpheaders: { "user_token": usertoken },
//       httpconfig: {}
//     };

//     voltmx.print("Invoking service with params: " + JSON.stringify(inputParams));

//     fry_int_common$get_documets_with_file_type = mfintegrationsecureinvokerasync(
//       inputParams,
//       "fry_int_common",
//       "get-documets-with-file-type",
//       INVOKE_SERVICE_getFile_Callback
//     );
//   } catch (error) {
//     alert("Error: " + error.message);
//   }
// },



  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    // Determine alignment and direction
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
    constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
var direction = isArabic;
if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
    
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
}


    var labelList = [
      "lblMyBookings","CopylblMyBookings0a32e01c62c7744"
    ];


    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }


    var flexList = [
      "FlexGroup0a9f7b0f4dbf544",
      "flxBack",
     "flxMyBookings"
    ];


    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }

    this.view.lblMyBookings.text=voltmx.i18n.getLocalizedString("My Bookings");
 this.view.lblMyBookings.text=
      voltmx.i18n.getLocalizedString("My Bookings");

  }



});