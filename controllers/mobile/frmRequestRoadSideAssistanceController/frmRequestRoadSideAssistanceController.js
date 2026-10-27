define({ 

  onNavigate: function(data){
    this.navTarget = null;
    this.setData();
    this.view.segBuyerOrSeller.onRowClick = this.segBuyerOrSellerOnRowClickAction;
    this.view.segVehicleLotID.onRowClick = this.segVehicleLotIDOnRowClickAction;
    this.view.flxBack.onClick = this.navToRoadSideAsst.bind(this);
    this.view.btnAddDeliveryAddress.onClick = this.navTofrmCarDeliveryAddress.bind(this);
    this.view.flxDropDownImgSellerOrBuyer.onClick = this.flxDropDownImgOnClickAction;
    this.view.flxVehicleLotDropDown.onClick = this.flxVehicleLotDropDownOnClickAction;
    this.view.flxUploadDocuments.onClick = () =>{ 
      if(this.view.lblfilename.text === "Upload Possession Letter")
        {
          this.view.flxHowWouldYouLike.setVisibility(true)
        }
      else
        {
          this.deleteFileObjectIfExists();
        }
      
    
    };
    this.view.flxUploadPopupClose.onClick = () =>{this.view.flxHowWouldYouLike.setVisibility(false) };
     //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck;
    //#endif

    
      //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif
    this.view.flxChooseFromLibrary.onClick = this.chooseFromLibrary;
    this.view.cam.onCapture = this.camOnCaptureAction;
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction;
    var prevForm = voltmx.application.getPreviousForm();
    if (data) {
      this.lotId = data.lotId;
      this.objectId1 = data.objectId;
      this.objectid = data.objectId;
      this.prevForm = data.prevForm;
      if (!this.lotId && prevForm) {
        if (this.isDetails) {
          this.navTarget = "frmDetails";
        } 
      }
    }
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;

  },



  onPreShow: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.toggleFooterIcons();
    
    this.selectedPdfFileName = "";
    this.view.lblDocMan.setVisibility(false);
    this.view.lblfilename.text = "Upload Possession Letter";
    this.view.lblErrorBuyerOrSeller.setVisibility(false);  
    this.view.lblLotError.setVisibility(false); 
    this.setSellerOrBuyerWidgetDataMap();
    this.loadOff();
    this.prevFormAction();
    this.getMasterFleetSpecValues();
    var sellerText = isArabic ? voltmx.i18n.getLocalizedString("Seller") : "Seller";
    var buyerText  = isArabic ? voltmx.i18n.getLocalizedString("Buyer")  : "Buyer";
    var mode = (voltmx.store.getItem("mode") || "").toLowerCase();
    if (mode === "seller") {
      this.view.lblSellerOrBuyer.text = sellerText;   // UI: localized
      this.serviceTitle = "Seller";                  // Service: always English
    } else if (mode === "buyer") {
      this.view.lblSellerOrBuyer.text = buyerText;   // UI: localized
      this.serviceTitle = "Buyer";                   // Service: always English
    } else {
      this.view.lblSellerOrBuyer.text = "";
      this.serviceTitle = "";
    }
    voltmx.store.setItem("serviceTitle",this.serviceTitle);
    this.view.lblSellerOrBuyer.contentAlignment =
      isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.setDataToVehicleLotIDSeg();
    if (this.navTarget) {
      new voltmx.mvc.Navigation(this.navTarget).navigate();
      this.navTarget = null; 
    }
    if(!(this.view.segVehicleLotID && this.view.segVehicleLotID.isVisible))
    {
      this.getUploadedData();
    }
   
  },



  flxUploadDocumentsOnClickAction: function(){
   this.view.flxHowWouldYouLike.setVisibility(true);
  },
  
  
  
//----------------------------------------------------------------------------------------------------------
  pdfCheck: function() {

    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");

    try {
 
      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 

      var TestPdfNfi = java.import("com.example.pdfuploadnfitest.TestPdfNfi");

      TestPdfNfi.pdfCallback = this.pdfCallback.bind(this);

      var activityContext = VoltMXMain.getActivityContext();

      var Intent  = java.import("android.content.Intent");

      var intentObj =  new Intent(activityContext, TestPdfNfi.class);

      activityContext.startActivity(intentObj);

    } catch (e) {

      alert("Error: " + e.message);

    }

  },
 
  pdfCallback: function(data) {
 
    voltmx.print( "selcted pdf callback data:::" + data) ;

    //     alert("Filename selected :::"+data);
 
    this.pdfData = null;
 
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {

      try {

        const dataJsonStr = JSON.stringify(data);

        this.pdfData = JSON.parse(dataJsonStr);

        if(this.pdfData && this.pdfData.base64pdf){

          this.selectedPdfBase64 = this.pdfData.base64pdf;

          this.selectedPdfFileName = this.pdfData.fileName;
 
          this.view.lblDocMan.setVisibility(false);
 
          var sizeInBytes = this.estimateBase64Size(this.selectedPdfBase64);

          var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
 
          if (sizeInBytes > 10 * 1024 * 1024) {

            alert(" File too large. Please upload a file smaller than 10 MB.");
 
            return;

          }
 
 
          if (this.pdfData.fileName==="") return;

          //            this.view.lblDocumentUpload.text = this.pdfData.fileName;

          //       this.view.imgupload.setVisibility(false);

          //           this.view.flxBottomFileUpload.setVisibility(false);

          //           this.view.flxOverLay.setVisibility(false);

         // this.view.flxUpload.setVisibility(false);
 
          //            this.fleetDocUpload();

          this.view.flxHowWouldYouLike.setVisibility(false);
 
          this.view.lblfilename.text = this.pdfData.fileName;
 
         // this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";

          // this.view.flxUpload.setVisibility(false);
 
 
          this.fleetDocUpload();

        }
 
 
      } catch (error) {

        console.error("Failed to clone data:", error);

        this.pdfData = null;

      }    

    }

  },
 
 
 
  testPDFNFIIOS: function()

  {
    alert("test");
    var self=this;
 
    voltmx.runOnMainThread(mainthread, []);
 
    function  mainthread() {   

      var PDFNFIUploadIOS = objc.import("PDFNFIUploadIOS");

      var ViewController = objc.import("ViewController");

      if (!ViewController) {

        voltmx.print("Error: Failed to import PDFNFIUploadIOS");

      }

      else{

        var ViewObject = ViewController.alloc().jsinit();

        ViewObject.pickPdfTapped();
 
 
        ViewObject.pdfCallback(function(pdfArrayObj){

          voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]);
 
          var fileName = pdfArrayObj[0];

          var base64Data = pdfArrayObj[1];
 
          self.selectedPdfFileName = fileName;

          self.selectedPdfBase64 = base64Data;
         self.view.lblDocMan.setVisibility(false);
          var sizeInBytes = self.estimateBase64Size(self.selectedPdfBase64);

          var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
 
          if (sizeInBytes > 10 * 1024 * 1024) {

            alert(" File too large. Please upload a file smaller than 10 MB.");
 
            return;

          }
 
 
          voltmx.runOnMainThread(function () {
 
          //  self.view.flxUpload.setVisibility(false);

            //     self.view.flxOverLay.setVisibility(false);

           // self.view.imgDocumnetUpload.setVisibility(false);
            self.view.flxHowWouldYouLike.setVisibility(false);
            self.view.lblfilename.text=fileName;

            self.fleetDocUpload();

          }, []);

        });
 
 
      }

    }
 
 
  },
 
  camOnCaptureAction: function(){
 
    var rawBytes = this.view.cam.rawBytes;
 
    if (rawBytes) {

      // Convert raw bytes to base64

      //        var testfilename = rawBytes.getResourcePath();

      //        alert("testfilename"+testfilename);

      //       

      //       var filename =  rawBytes.getResourcePath().substring(rawBytes.getResourcePath().lastIndexOf("/") + 1);

      var filename = "";

      try {

        var resourcePath = rawBytes.getResourcePath && rawBytes.getResourcePath();
 
        if (resourcePath) {

          var normalizedPath = resourcePath.replace(/\\/g, "/");

          filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
 
          if (!filename || filename.trim() === "") {

            filename = "captured_image_" + new Date().getTime();

          }

        } else {

          // Fallback for iOS or invalid resourcePath

          filename = "captured_image_" + new Date().getTime();

        }

      } catch (e) {

        voltmx.print("Error extracting filename: " + e.message);

        filename = "captured_image_" + new Date().getTime();

      }
 
 
      var base64Image = voltmx.convertToBase64(rawBytes);
 
 
 
      var sizeInBytes = this.estimateBase64Size(base64Image);

      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
 
      if (sizeInBytes > 10 * 1024 * 1024) {

        alert(" Image too large. Please capture an image smaller than 10 MB.");

        return;

      }
 
 
      var filetype =  detectFileType(base64Image);

      //        alert("type"+filetype);

      var filefullname = filename+filetype;
 
      //        alert("fullname"+filefullname);

      this.filenameCam =filefullname;
 
      this.selectedPdfFileName = filefullname;

      this.selectedPdfBase64 = base64Image;
      this.view.lblDocMan.setVisibility(false);
      this.fleetDocUpload();
 
       this.view.flxHowWouldYouLike.setVisibility(false);
      this.view.lblfilename.text = filefullname;

     // this.view.imgDocumnetUpload.setVisibility(false);

      //       this.view.imgupload.setVisibility(false);

     // this.view.flxUpload.setVisibility(false);

     // this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";

      //       this.view.flxOverLay.setVisibility(false);

      //       var base64Image = kony.convertToBase64(rawBytes);

      this.base64CamImage = base64Image;
 
    } 

    else {

      kony.print("No image captured from camera.");

    }

  },
 
 
  estimateBase64Size: function (base64Str) {

    let padding = (base64Str.match(/=*$/) || [""])[0].length;

    return Math.floor((base64Str.length * 3) / 4) - padding;

  },
 
 
  chooseFromLibrary: function()

  {

    var self = this;
 
    voltmx.phone.openMediaGallery(function(rawbytes) {

      if (rawbytes) {

        voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));

        //         var testfilename = rawbytes.getResourcePath();

        //         //        alert("testfilename"+testfilename);

        //         var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);

        //             this.view.flxUploadConfirmationinGsovtID.setVisibility(true);

        //            .text = filename;
 
        var filename = "";

        try {

          var resourcePath = rawbytes.getResourcePath && rawbytes.getResourcePath();

          if (resourcePath) {

            var normalizedPath = resourcePath.replace(/\\/g, "/");

            filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);

            if (!filename || filename.trim() === "") {

              filename = "image_from_gallery_" + new Date().getTime();

            }

          } else {

            filename = "image_from_gallery_" + new Date().getTime();

          }

        } catch (e) {

          voltmx.print("Error getting resource path: " + e.message);

          filename = "image_from_gallery_" + new Date().getTime();

        }
 
 
 
        // Convert to Base64 and store based on file index

        var base64Data = voltmx.convertToBase64(rawbytes);
 
        var sizeInBytes = self.estimateBase64Size(base64Data);

        var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
 
        if (sizeInBytes > 10 * 1024 * 1024) {

          alert("Image too large. Please select an image smaller than 10 MB.");

          return;

        }
 
        var filetype =  detectFileType(base64Data);

        //        alert("type"+filetype);

        var filefullname = filename+filetype;

        //        alert("fullname"+filefullname);

        this.selectedPdfFileName = filefullname;

        this.selectedPdfBase64 = base64Data;
         self.view.lblDocMan.setVisibility(false);
        self.fleetDocUpload();
  this.view.flxHowWouldYouLike.setVisibility(false);
        this.view.lblfilename.text = filefullname;

        //         this.view.lblfilename.left ="0%";

        //       this.view.imgupload.setVisibility(false);

      //  this.view.imgDocumnetUpload.setVisibility(false);
 
       // this.view.flxUpload.setVisibility(false);

        //         this.view.flxOverLay.setVisibility(false);
 
      //  this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
 
 
        voltmx.print("Base64 : "+base64Data);

        //        this.view.flxUploadedBackView
 
        //           self.createDamItems(type,filename,base64Data);

      }

    }.bind(this), {}, {

      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 

      format: voltmx.phone.MEDIA_DOCUMENT_RAW,

      mimetype: "image/*"  // Set the mime type for images

      //       mimetype: "application/*"
 
    }

                                 ); 

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
  
  
  
  fleetDocUpload: function()
  {
    var self = this;
    var userobj = voltmx.store.getItem("userObject");
    var isorg = userobj.rawResponse.is_org;
    // Sample code to fetch the integration service details with passthrough 
    var serviceName = "fry_collection";   
    // Get an instance of SDK
    var lotId = self.view.lblLotId ? self.view.lblLotId.text : "";
    var client = voltmx.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "upload-fleet-documents";
    var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    //        voltmx.store.setItem("lotId", lotIdOnly);
//     var lotId=voltmx.store.getItem("lotId");
    var params = {
      "user_id": userid,
      "moduleName": "UploadFleetDocuments",
      "is_org": isorg,
      "category": "Possession_Letter",
               "object_id": self.objectid ,
      "lot_no": lotId,
     
      "file_details": [
        {
          //                 "is_thumbnail": "true",
          "filename": self.selectedPdfFileName,
          "base64": self.selectedPdfBase64,
           "type":"Possession_Letter",
          "sub_type":"Possession_Letter"// You need to encode file as base64 and insert it here
        }
      ],
      "user_token": userToken
    };
 
  //  this.view.lblDocumentError.setVisibility(false);
    var headers = {
      //     "custom-header-key1": "custom-header-value1"
    }; //If there are no headers, pass null
    // options is an optional parameter that helps in configuring the network layer.
    integrationSvc.invokeOperation(operationName, headers, params, function(response) {
 
     voltmx.print(response);
    }, function(error) {
 
    }, {
      "passthrough": true
    });
  },  
  
  
  
  
  
  
  
  
  
  
  //-----------------------------------------------------------------------------------------------------------------



  
  
 

  

  
  

  
  
  
  
  
  
  
  

  
  

  
  prevFormAction: function(){
    voltmx.application.showLoadingScreen(null, "Loading..", 
                                         constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                         false, true, 
                                         {shouldShowLabelInBottom: "true",   
                                          separatorHeight: 45,   
                                          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, 
                                          progressIndicatorColor: "Gray"     });
    var prevForm = voltmx.store.getItem("prevFormRSA");
    if(prevForm === "DashBoard"){
      this.view.flxVehicleLotDropDown.setVisibility(true);
      this.view.lblVehicleLotId.setVisibility(true); 
      this.view.segVehicleLotID.setVisibility(true);
      voltmx.application.dismissLoadingScreen();
    }
    else if(prevForm === "Services"){
      this.view.segVehicleLotID.setVisibility(false);
      this.view.lblLotId.setVisibility(true);
      this.view.flxVehicleLotDropDown.setVisibility(false);
      this.view.lblVehicleLotId.setVisibility(false);
      if(this.prevForm ){
        this.lot=  this.lotId;
        this.objectID=  this.objectId1
        this.objectid =  this.objectId1;
        if(this.lot){
          this.view.lblLotId.text =this.lot; 
        }
        else{
          this.view.lblLotId.text = "";
        }
        if(this.objectID){
          this.view.lblObjectId.text = this.objectID;
          this.objectid = this.objectID;
        }
        else{
          this.view.lblObjectId.text = "";
        }
      }
      else{
        this.view.lblLotId.setVisibility(true);
        this.lot= voltmx.store.getItem("lotidForVI");
        this.objectID= voltmx.store.getItem("objidForVI");
        this.objectid= voltmx.store.getItem("objidForVI");
        if(this.lot){
          this.view.lblLotId.text =this.lot; 
        }
        else{
          this.view.lblLotId.text = "";
        }
        if(this.objectID){
          this.view.lblObjectId.text = this.objectID;
          this.objectid=this.objectID;
        }
        else{
          this.view.lblObjectId.text = "";
        }
      } }
    voltmx.application.dismissLoadingScreen();
  },




  getMasterFleetSpecValues: function(){
    var self = this;
    var master_fleet_spec_values_inputparam = {};
    master_fleet_spec_values_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    master_fleet_spec_values_inputparam["spec_list"] = "emirates";
    master_fleet_spec_values_inputparam["widget_name"] = "add_request";
    master_fleet_spec_values_inputparam["asset_definitions"] = "false" ;
    master_fleet_spec_values_inputparam["auction_types"] = "false";
    master_fleet_spec_values_inputparam["payment_methods"] = "";
    var master_fleet_spec_values_httpheaders = {};
    master_fleet_spec_values_inputparam["httpheaders"] = master_fleet_spec_values_httpheaders;
    var master_fleet_spec_values_httpconfigs = {};
    master_fleet_spec_values_inputparam["httpconfig"] = master_fleet_spec_values_httpconfigs;
    fry_int_fleet$master_fleet_spec_values =
      mfintegrationsecureinvokerasync(master_fleet_spec_values_inputparam,
                                      "fry_int_fleet",
                                      "master-fleet-spec-values", 
                                      function(status, response){
      voltmx.print(status);
      voltmx.print(response);
      if (!response || !response.data || !Array.isArray(response.data) || !response.data[0]) {
        voltmx.print("No data array found in response");
        return; 
      }
      if(response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
      var data = response.data[0].emirates || [];
      //       alert(JSON.stringify(data));
      if (data.length === 0) {
        voltmx.print("Emirates array is empty");
        return;
      }
      data.forEach (res => {
        var id = res.id;
        voltmx.store.setItem("idFromRSA", id);
        var value = res.value;
      });
    });
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      voltmx.application.showLoadingScreen(null, "Loading..", 
                                           constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                           true, true, 
                                           {shouldShowLabelInBottom: "true",   
                                            separatorHeight: 45,   
                                            progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, 
                                            progressIndicatorColor: "Gray"     });
      this.setDataToVehicleLotIDSeg();
    } else {
      voltmx.print("Still offline...");
    }
  },




  setSellerOrBuyerWidgetDataMap: function() {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.segBuyerOrSeller.widgetDataMap = {
      "lblBuyerOrSeller": "lblBuyerOrSeller",
      "flxbuyerOrSeller": "flxbuyerOrSeller"
    };
    var sellerText = voltmx.i18n.getLocalizedString("Seller") || "Seller";
    var buyerText = voltmx.i18n.getLocalizedString("Buyer") || "Buyer";
    var data = [
      {
        lblBuyerOrSeller: {
          text: sellerText,
          contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
          left: isArabic ? "0%" : "4%",
          right: isArabic ? "4%" : "0%"
        },
        flxbuyerOrSeller: {
          reverseLayoutDirection: isArabic
        }
      },
      {
        lblBuyerOrSeller: {
          text: buyerText,
          contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
          left: isArabic ? "0%" : "4%",
          right: isArabic ? "4%" : "0%"
        },
        flxbuyerOrSeller: {
          reverseLayoutDirection: isArabic
        }
      }
    ];
    this.view.segBuyerOrSeller.setData(data);
  },




  flxDropDownImgOnClickAction: function() {
    var isOpen = this.view.imgDropDown.isVisible;
    this.view.imgDropDown.setVisibility(!isOpen);
    this.view.imgUpArrow.setVisibility(isOpen);
    this.view.flxDropDown.setVisibility(isOpen);
  },




  flxVehicleLotDropDownOnClickAction: function(){
    var isOpen = this.view.imgDropDownLotId.isVisible;
    this.view.imgDropDownLotId.setVisibility(!isOpen);
    this.view.imgUPArrowLotId.setVisibility(isOpen);
    this.view.flxVehicleLotDropDownData.setVisibility(isOpen);
  },




  navToRoadSideAsst: function(){
    new voltmx.mvc.Navigation("frmRoadSideAssistance").navigate();
    this.view.lblBuyerOrSeller.setVisibility(true);
    this.view.lblVehicleLotId.text = voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    this.view.lblLotId.setVisibility(false);
    this.view.lblLotId.text = "";
    this.view.lblVehicleLotId.setVisibility(true);
    this.view.txtNotes.text = "";
  },




  loadOff: function(){
    this.view.flxVehicleLotDropDownData.setVisibility(false);
    this.view.lblSelectedValue.setVisibility(false);
    this.view.lblBuyerOrSeller.setVisibility(true);
    this.view.lblBuyerOrSeller.text= voltmx.i18n.getLocalizedString("I am a");
    this.view.lblVehicleLotId.text = voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    this.view.lblLotId.setVisibility(false);
    this.view.lblLotId.text = "";
    this.view.lblSelectedValue.text = ""
    this.view.lblVehicleLotId.setVisibility(true);
    this.view.txtNotes.text = "";
  },




  segBuyerOrSellerOnRowClickAction: function() {
    this.selectedText = this.view.segBuyerOrSeller.selectedRowItems[0].lblBuyerOrSeller.text;
    this.view.lblSelectedValue.setVisibility(true);
    this.view.lblBuyerOrSeller.setVisibility(false);
    this.view.lblErrorBuyerOrSeller.setVisibility(false);
    this.view.lblSelectedValue.text = this.selectedText;
    var isSellerOrBuyer = this.selectedText === "Seller" || this.selectedText === "Buyer";
    this.view.flxDropDown.setVisibility(!isSellerOrBuyer);
    this.view.imgUpArrow.setVisibility(false);
    this.view.imgDropDown.setVisibility(true);
    this.setDataToVehicleLotIDSeg();
  },




  segVehicleLotIDOnRowClickAction: function() {
    this.view.imgUPArrowLotId.setVisibility(false);
    this.view.imgDropDownLotId.setVisibility(true);
    this.view.lblLotId.setVisibility(true);
    this.view.lblLotError.setVisibility(false);
    this.view.lblVehicleLotId.setVisibility(false);
    this.view.lblLotId.text=
      this.view.segVehicleLotID.selectedRowItems[0].lblLotId;
    this.view.lblObjectId.text =  this.view.segVehicleLotID.selectedRowItems[0].lblOjectID;
    this.objectid =  this.view.segVehicleLotID.selectedRowItems[0].lblOjectID;
    this.setDataToVehicleLotIDSeg(this.view.lblLotId.text);
    if(this.view.flxVehicleLotDropDownData.isVisible === true){
      this.view.flxVehicleLotDropDownData.setVisibility(false);
    }
    else {
      this.view.flxVehicleLotDropDownData.setVisibility(true);
    }
    this.getUploadedData();
  },




  setDataToVehicleLotIDSeg: function(selectedLotId)
  {
    voltmx.application.showLoadingScreen(null, "Loading..", 
                                         constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                         false, true, 
                                         {shouldShowLabelInBottom: "true",   
                                          separatorHeight: 45,   
                                          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, 
                                          progressIndicatorColor: "Gray"     });
    var previousForm = voltmx.application.getPreviousForm().id;
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");
    var mode = voltmx.store.getItem("mode");
    if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
    } else {
      alert("Warning: job_title is missing from user object.");
    }
    var get_user_vechile_list_for_services_inputparam = {};
    get_user_vechile_list_for_services_inputparam["serviceID"] = "fry_int_common$get-user-vechile-list-for-services";
    get_user_vechile_list_for_services_inputparam["user_id"] = userId;
    get_user_vechile_list_for_services_inputparam["service_type"] = "RSA";
    get_user_vechile_list_for_services_inputparam["title"] =  self.serviceTitle;
    var get_user_vechile_list_for_services_httpheaders = {
      "user_token": usertoken
    };
    get_user_vechile_list_for_services_inputparam["httpheaders"] = get_user_vechile_list_for_services_httpheaders;
    var get_user_vechile_list_for_services_httpconfigs = {};
    get_user_vechile_list_for_services_inputparam["httpconfig"] = get_user_vechile_list_for_services_httpconfigs;
    fry_int_common$get_user_vechile_list_for_services =
      mfintegrationsecureinvokerasync(get_user_vechile_list_for_services_inputparam, 
                                      "fry_int_common",
                                      "get-user-vechile-list-for-services", 
                                      function (status, response) {
      voltmx.application.dismissLoadingScreen();
      //       alert(JSON.stringify(response));
      if (!response ) {
        voltmx.print("Invalid or failed response: " + JSON.stringify(response));
        self.view.segVehicleLotID.setData([]);
        self.view.flxNoRecordsFound.setVisibility(true);
        return; 
      }
      if(response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
      var data = response.records;
      //       alert("response"+JSON.stringify(data));
      ///
      if ( Array.isArray(data) && data.length > 0) {
        self.view.flxNoRecordsFound.setVisibility(false);
        var segData = [];
        for (var i = 0; i < data.length; i++) {

          if(data[i].seller_rsa === "0"){
            if(selectedLotId){//buyer
              if(selectedLotId === data[i].lot_no ){
                //receiving to awa-> pickup awa, drop own.
                voltmx.store.setItem("seller_rsa", "receiving to awa");
              }
            }
          }
          else if(data[i].seller_rsa === "1"){
            //sending to awa-> pickup own, drop awa.
            if(selectedLotId){//seller
              if(selectedLotId === data[i].lot_no ){
                voltmx.store.setItem("seller_rsa","sending to awa");
              }
            }
          }
          var item = {
            "lblSellerRsa" : data[i].seller_rsa || "N/A",
            "lblLotId"    : data[i].lot_no || "N/A",
            "lblSeperator": "-",
            "lblName"     : data[i].title || "N/A",
            "lblOjectID"  : data[i].object_id || "N/A",
            "flxVehicleLotID" :{
              "reverseLayoutDirection": isArabic,
              "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
            }
          };
          segData.push(item);
        }
        self.view.segVehicleLotID.setData(segData); 
      } 
      else{
        self.view.segVehicleLotID.setVisibility(false);
        self.view.flxNoRecordsFound.setVisibility(true);
      }
    } );
  },




  navTofrmCarDeliveryAddress: function() {
    var userLotId = '';
    var flag = this.view.lblLotId.isVisible;
    if(flag)
    {
      userLotId = this.view.lblLotId.text;
      voltmx.store.setItem("lotidfromstarting", userLotId);
    }
    var data = {
      "lotId"      : userLotId,
      "lblUserType": this.serviceTitle,
      "lblMsg"     : this.view.txtNotes.text || "",
      "lblObjectId": this.view.lblObjectId.text
    };
    if (!this.view.lblSellerOrBuyer.text && !this.view.lblLotId.text) 
    {
      this.view.lblErrorBuyerOrSeller.setVisibility(true);
      this.view.lblLotError.setVisibility(true);
    } else if (!this.view.lblSellerOrBuyer.text) 
    {
      this.view.lblErrorBuyerOrSeller.setVisibility(true);
    } else if (!this.view.lblLotId.text) 
    {
      this.view.lblLotError.setVisibility(true);
    }
    else if(!this.selectedPdfFileName) 
    {
      this.view.lblDocMan.setVisibility(true);
    }
//     else if(self.view.lblfilename.text = "Upload Possession Letter")
//       {
        
//       }
    else {
      var navObj = new voltmx.mvc.Navigation("frmCarDeliveryAddress");
      navObj.navigate(data);
    }
    voltmx.store.setItem("pickupData", data);
  },




  setData: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if(isArabic)
    {
      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgBackArrow.transform = flipTransform;
    }
    else
    {
      this.view.imgBackArrow.transform = voltmx.ui.makeAffineTransform(); 
    }
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblRequestRoadSideassistance",
      "lblBuyerOrSeller",
      "txtNotes",
      "lblVehicleLotId",
      "lblSellerOrBuyer",
      "lblLotId",
      "lblNoRecordsFound",
      "lblLotError"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxUnderLineContainer",
      "flxBackNav",
      "flxBUyerOrSellerContainer",
      "flxSelectLotIdContainer",
      "flxBUyerOrSellerContainer",
      "flxSellerOrBuyer",
      "flxNoRecordsFound"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }

    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
    this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
    this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
    this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
    var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
      //     this.view.Footer2.imgMyBids.src = "mylistings.png";
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      //         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    this.view.lblRequestRoadSideassistance.text=voltmx.i18n.getLocalizedString("Request Road Side Assistance");
    //     this.view.lblBuyerOrSeller.text=voltmx.i18n.getLocalizedString("Iam_a");
    this.view.lblVehicleLotId.text = voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    this.view.txtNotes.placeholder=voltmx.i18n.getLocalizedString("Optional Notesd");
    //     this.view.lblNoRecordsFound.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnAddDeliveryAddress.text=voltmx.i18n.getLocalizedString("Add Delivery Address");
    //     this.view.lblLotError.text = voltmx.i18n.getLocalizedString("field_required");
  },




  toggleFooterIcons: function(){
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);

    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";

    //     this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    //     this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";

    var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
      this.view.Footer2.imgMyBids.src = "mylistings.png";
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }

    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");

    if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },

  getUploadedData: function() {

     var self = this;

    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    //     this.view.flxLoadingIndicator.setVisibility(true);

    var user_token = voltmx.store.getItem("getUserAccesstoken");

    // "Government_IDs", etc.

    var get_my_documents_inputparam = {

      serviceID: "fry_int_common$get-documets-with-file-type",

      object_id: self.objectid,

      file_types:"Possession_Letter",

      file_name:"",

      file_description:"",

      page:"1",

      pageSize:"20",

      httpheaders: {

        "user_token": user_token

      },

      httpconfig: {}

    };

 
    fry_int_common$get_documets_with_file_type = 

      mfintegrationsecureinvokerasync(get_my_documents_inputparam, 

                                      "fry_int_common", 

                                      "get-documets-with-file-type", 

                                      function(status1,response){

      voltmx.print("Status1 :"+status1);

      voltmx.print("Response: " + JSON.stringify(response));

      voltmx.application.dismissLoadingScreen();

//       alert(JSON.stringify(response));

      //       self.view.flxLoadingIndicator.setVisibility(false);

      if(response.opstatus === 1011){

        //self.view.flxError.setVisibility(true);

      }
 
      if (!response.records || !Array.isArray(response.records) || response.records.length === 0) {
 
        voltmx.print("No documents found or empty response.");

        voltmx.store.setItem("isDatafound", false);
        self.view.lblfilename.text = "Upload Possession Letter";
        return;

      }

      else{

//           voltmx.store.setItem("isUploadedRSA", false);
 
          var data = response.records;

         data.forEach(res=>{
 
          var file_url = res.file_url;
          self.file_url = res.file_url;
//            var status   = res.status;
          
          self.file_Name = res.file_name;
          self.itemId = res.id;
           var type = res.type;

          if(type === "Possession_Letter" ){

            if(file_url&&self.file_Name){

//               voltmx.store.setItem("isUploadedRSA", true);

              self.view.lblfilename.text = self.file_Name;
              self.selectedPdfFileName = self.file_Name;
//               self.isPossAvailable = true;

            }


    else{

       self.view.lblfilename.text = "Upload Possession Letter";
//        self.isPossAvailable = false;

    }


          }
           else
             {
               self.view.lblfilename.text = "Upload Possession Letter";
             }
 
        });

     }

    });

  },

   deleteFileObjectIfExists: function(){
    var self = this;
        voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
   
    
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_True() {
        var user_token = voltmx.store.getItem("getUserAccesstoken");
        var delete_object_item_inputparam = delete_object_item_inputparam || {};

        delete_object_item_inputparam["serviceID"]  = "fry_collection$delete-object-item";
        delete_object_item_inputparam["user_token"] = user_token;
        delete_object_item_inputparam["file_url"]   = self.file_url;
        delete_object_item_inputparam["moduleName"] = "DeleteFile";
        delete_object_item_inputparam["file_id"]    = self.itemId;
        delete_object_item_inputparam["file_cat"]   ="document" ;
        var delete_object_item_httpheaders = {
        };
        delete_object_item_inputparam["httpheaders"] = delete_object_item_httpheaders;
        var delete_object_item_httpconfigs = {};
        delete_object_item_inputparam["httpconfig"] = delete_object_item_httpconfigs;
        fry_collection$delete_object_item = 
          mfintegrationsecureinvokerasync(delete_object_item_inputparam, 
                                          "fry_collection", 
                                          "delete-object-item",
                                          function(status, response){
          voltmx.print(status);
          voltmx.print(response);
          if (!response || Object.keys(response).length === 0) {
            voltmx.print("Empty response received!");
            alert("No response received from delete service.");
            return;
          }
          if (response.opstatus === 0 && response.status === "Success") {
                        voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
            var deletefile = voltmx.i18n.getLocalizedString("File deleted successfully");
            self.view.lblfilename.text = "Upload Possession Letter";
            alert(deletefile);
          } 
          else if(response.opstatus === 1011){
            self.view.flxError.setVisibility(true);
          }
          else {
            alert("Failed to delete file.");
          }
        });
      }
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_False() {
//              self.view.flxLoadingIndicator.setVisibility(false);
        voltmx.application.dismissLoadingScreen();
      }
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_Callback(response) {
        if (response === true) {
          SHOW_ALERT_f1a8129889d74e268f752870d70cb393_True();
        } else {
          SHOW_ALERT_f1a8129889d74e268f752870d70cb393_False();
        }
      }
      
      var alertmsg = voltmx.i18n.getLocalizedString("There is a file which is already uploaded, do you want to replace it?");
      var replace = voltmx.i18n.getLocalizedString("Replace?");
      var cancel = voltmx.i18n.getLocalizedString("cancel");
      voltmx.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
       // "alertTitle": "Replace items?",
        "yesLabel": replace,
        "noLabel": cancel,
        "alertIcon": "exchange.png",
        "message": alertmsg,
        "alertHandler": SHOW_ALERT_f1a8129889d74e268f752870d70cb393_Callback
      }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });

  },
 


});