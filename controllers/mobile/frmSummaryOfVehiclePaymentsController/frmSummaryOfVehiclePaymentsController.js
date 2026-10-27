
define({ 

  onNavigate: function(){
    this.view.flxSearchContainer.setVisibility(false);
    this.view.flxSummaryOfVehiclePayments2.setVisibility(true);
    this.view.flxPendingPayments.onClick = this.pendingPaymentsOnClick.bind(this);
    //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif

    //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFI;
    //#endif
    this.view.flxPaidVehicles.onClick = this.paidVehicles.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxChooseFromLibrary.onClick = this.chooseFromLibrary.bind(this);
    this.Addingi18nKeys();
    this.view.cam.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
    this.view.flxClose.onClick = this.flxCloseAction;
    this.view.btnLoadMore.onClick = this.btnLoadMoreOnClickAction;
    this.view.flxBackNavigation.onClick = this.backNav.bind(this);
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
    this.view.flxSearch.onClick = this.showSearchbar;
    this.view.btnOk.onClick = this.textboxValue;
   // this.view.tbxSearch.onTextChange = this.textboxValue;
  },
  
  textboxValue: function(){
    this.view.btnLoadMore.setVisibility(false);
   this.view.flxSearchContainer.setVisibility(false);
    this.view.flxSummaryOfVehiclePayments2.setVisibility(true);
    var inputText = (this.view.tbxSearch.text || "").trim();
   if(inputText === ""){
      this.view.btnLoadMore.setVisibility(true);
      this.view.flxSearchContainer.setVisibility(false);
    this.view.flxSummaryOfVehiclePayments2.setVisibility(true);
     this.model = "";
    this.textboxvalueread = "";
//     this.view.tbxSearch.text = "";
   }
    else {
    // Check if input is exactly 5 or 6 digit number
    var isLotNumber = /^\d{5,6}$/.test(inputText);
    var isModel =/^[a-zA-Z0-9 ]+$/.test(inputText);
    if (isLotNumber) {
      // Store lot number search
      this.textboxvalueread = inputText;
      this.model = "";
    } else if(isModel) {
      // Store model/text search
      this.model = inputText;
      this.textboxvalueread = "";
    }
  }
    
//     this.textboxvalueread = this.view.tbxSearch.text;
    var type = voltmx.store.getItem("paidOrPendingStatus") || "pending";
    if (this.view.SegPendingVehicles.isVisible) {
     
      this.getVehiclePayment(this.type,10);
    } else if (this.view.segPaidVehicles.isVisible) {
    
      this.getVehiclePayment(this.type,10);
    }
    this.view.SegPendingVehicles.setData([]);
    this.view.segPaidVehicles.setData([]);
    this.getVehiclePayment();
    
  },

showSearchbar: function(){
  this.view.flxSummaryOfVehiclePayments2.setVisibility(false);
  this.view.flxSearchContainer.setVisibility(true);
},


  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
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
    if(isArabic)
    {

      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgBackNav.transform = flipTransform;
    }
    else
    {
      this.view.imgBackNav.transform = voltmx.ui.makeAffineTransform();
    }
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblTotalApprovedVehicles",
      "lblSummaryOfVehiclePayments",
      "lblSummaryofVehiclePaymentsHeading",
      "lblPaidVehicles1",
      "lblPendingPayments1",
      "lblSummaryOfOtherServicePayments",
    ];

    var calendarList = [
      "",
    ];
    for (var i = 0; i < calendarList.length; i++) {
      if (this.view[calendarList[i]]) {
        this.view[calendarList[i]].contentAlignment = labelAlignment;
      }
    }
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = labelAlignment;
      }
    }
    this.view.flxTotalApprovedVehiclesCount.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxPaidVehiclesCountScroll.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxPendingPayments1.reverseLayoutDirection = isArabic ? true : false;
    this.view.lblPaidVehiclesCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblTotalApprovedVehiclesCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblPendingPaymentsCount.contentAlignment = isArabic ?  constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    var flexList = [
      "flxBack", 
      "flxTotalApproved",
      "flxPaidVehicles1",
      "flxPendingPayments1",
      "flxUnderLineContainer",
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblSummaryofVehiclePaymentsHeading.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Payments");
    this.view.lblTotalApprovedVehicles.text = voltmx.i18n.getLocalizedString("Total approved vehicles");
    this.view.lblPaidVehicles1.text = voltmx.i18n.getLocalizedString("Paid Vehicles");
    this.view.lblPendingPayments1.text = voltmx.i18n.getLocalizedString("pending payments");
    this.view.lblSummaryOfVehiclePayments.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Payments");
    this.view.lblPendingPayments.text =  voltmx.i18n.getLocalizedString("Pending Vehicles");
    this.view.lblPaidVehicles.text =  voltmx.i18n.getLocalizedString("Paid Vehicles");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search");
  },



  testPDFNFI: function(){
    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");
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

          self.selectedPdfBase64 = base64Data;
          self.selectedPdfFileName = fileName;
          self.view.flxHowWouldYouLike.setVisibility(false);
          voltmx.runOnMainThread(function () {
            self.view.flxHowWouldYouLike.setVisibility(false);
            self.invokeUploadFleetDoc();
          }, []);
        });
      }
    }
  },




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
    this.pdfData = null;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        this.pdfData = JSON.parse(dataJsonStr);
        if(this.pdfData && this.pdfData.base64pdf){
          this.selectedPdfBase64 = this.pdfData.base64pdf;
          this.selectedPdfFileName = this.pdfData.fileName;
          this.view.flxHowWouldYouLike.setVisibility(false);
          this.invokeUploadFleetDoc();
        }
      } catch (error) {
//         console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.invokeUploadFleetDoc();
      this.getVehiclePayment();
    } else {
      voltmx.print("Still offline...");
    }
  },



  onPreShow: function() {
    this.toggleFooterIcons();
    this.view.SegPendingVehicles.setVisibility(true);
    this.view.segPaidVehicles.setVisibility(false);
    this.type = "unpaid";
    this.model = "";
    this.textboxvalueread = "";
    this.view.tbxSearch.text = "";
    this.pageSize = this.pageSize || this.pageSize || 2;
    this.getVehiclePayment(this.type, this.pageSize);
  },




  btnLoadMoreOnClickAction: function() {
    var type = voltmx.store.getItem("paidOrPendingStatus") || "pending";
    if (this.view.SegPendingVehicles.isVisible) {
      this.currentPendingPage = (this.currentPendingPage || 1) + 10;
      this.getVehiclePayment(this.type,    this.currentPendingPage);
    } else if (this.view.segPaidVehicles.isVisible) {
      this.currentPaidPage = (this.currentPaidPage || 1) + 10;
      this.getVehiclePayment(this.type, this.currentPaidPage);
    }
  },
  





  getVehiclePayment: function(type,pageSize){
    voltmx.application.showLoadingScreen(
      null,
      "Loading..",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      false,
      true,
      {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
      }
    );
    var self = this;
    var userId = voltmx.store.getItem("userId");
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var buyer_fleet_payments_mobile_inputparam = {};
    buyer_fleet_payments_mobile_inputparam["serviceID"] = "fry_wf$buyer-fleet-payments-mobile";
    buyer_fleet_payments_mobile_inputparam["user_id"] = userId;
    buyer_fleet_payments_mobile_inputparam["page"] = "1";
    buyer_fleet_payments_mobile_inputparam["page_size"] =pageSize ;
    buyer_fleet_payments_mobile_inputparam["type"] =type;
//      buyer_fleet_payments_mobile_inputparam["lot_no"] = this.textboxvalueread || "";
//      buyer_fleet_payments_mobile_inputparam["title"] ="";
    buyer_fleet_payments_mobile_inputparam["lot_no"] = this.textboxvalueread ? this.textboxvalueread : "";
buyer_fleet_payments_mobile_inputparam["title"] = this.model ? this.model : "";

    
    
    var buyer_fleet_payments_mobile_httpheaders = { "user_token": user_token };
    buyer_fleet_payments_mobile_inputparam["httpheaders"] = buyer_fleet_payments_mobile_httpheaders;
    var buyer_fleet_payments_mobile_httpconfigs = {};
    buyer_fleet_payments_mobile_inputparam["httpconfig"] = buyer_fleet_payments_mobile_httpconfigs;
    fry_wf$buyer_fleet_payments_mobile =
      mfintegrationsecureinvokerasync(buyer_fleet_payments_mobile_inputparam,
                                      "fry_wf", 
                                      "buyer-fleet-payments-mobile", 
                                      function(status,response){

      voltmx.print("STATUS: " + status);
      voltmx.print("RESPONSE: " + JSON.stringify(response));

      if (!response) {
        alert("Service call failed!");
        voltmx.application.dismissLoadingScreen();
        return;
      }
      if (response.opstatus && response.opstatus !== 0) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Service failed with opstatus: " + response.opstatus);
        if (response.opstatus === 1011) {
          self.view.flxError.setVisibility(true);
        } else {
          voltmx.print("Something went wrong. Try again later.");
        }
        return;
      }
      var fleet_details = response["fleet_payment_details"];
      if (fleet_details && Array.isArray(fleet_details) && fleet_details.length > 0) {
        var details = fleet_details[0];
        voltmx.application.dismissLoadingScreen();
        self.view.lblTotalApprovedVehiclesCount.text = details["total_no_of_vehicles"] || "0";
        self.view.lblPendingPaymentsCount.text = details["pending_vehicles"] || "0";
        self.view.lblPaidVehiclesCount.text = details["paid_vehicles_fabs"] || "0";
        self.view.lblPaidVehicleAmount.text = details["paid_vehicles_fabs"] || "0";
        self.view.lblPendingAmount.text = details["pending_vehicles"] || "0";
      }else{
        voltmx.application.dismissLoadingScreen();
        alert("no records");
      }
      self.fleetData = response.fleet_payment_summary; 
      if (response && response.fleet_payment_summary && 
          Array.isArray(response.fleet_payment_summary)) {
        self.fleetData = response.fleet_payment_summary;
        self.loadPaginatedData(type);
      }
      else{
        voltmx.print(" No summary data found");
      }
    } );
  },




  loadPaginatedData: function (filterStatus) {
    voltmx.application.dismissLoadingScreen();
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if (!this.fleetData || !Array.isArray(this.fleetData)) return;
    let statusList = [];
    if (filterStatus.toLowerCase() === "unpaid") {
      statusList = ["pending", "unpaid"];
    } else {
      statusList = [filterStatus.toLowerCase()];
    }
    var filteredData = this.fleetData.filter(vehicle =>
                                             statusList.includes((vehicle.status || "").toLowerCase())
                                            );
    var newSegData = [];
    for (var i = 0; i < filteredData.length; i++) {
      var vehicle = filteredData[i];
      var touchHandler = vehicle["status"].toLowerCase() === "paid"
      ? this.toggleRowVisibilityPaid.bind(this, i)
      : this.toggleRowVisibilityPending.bind(this, i);
      var uploaded =  vehicle["status"].toLowerCase() === "pending"
      var status = vehicle["status"].toLowerCase();
      var segWidget = statusList.includes("paid")
      ? this.view.segPaidVehicles
      : this.view.SegPendingVehicles;

      newSegData.push({

        "imgRightArrow": { 
          "src": isArabic ? "back512h.png" : "rightarrow512h.png"
        }, 
        "lblAuctionID":  { 
          "text": voltmx.i18n.getLocalizedString("Auction ID"),
          "skin": "sknlblBlackDuabiold",
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblAuctionIDVal": 
        { "text": vehicle["lot_no"], 
         "skin": "sknLblCronosPro231f2016px",
         "onTouchEnd": touchHandler,
         "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT
        },
        "lblMakeAndModel":  { 
          "text": voltmx.i18n.getLocalizedString("Make & Model"),
          "skin": "sknlblBlackDuabiold",
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblMakeAndModelValue": { 
          "text": vehicle["title"], 
          "skin": "sknLblCronosPro231f2016px" ,
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT  : constants.CONTENT_ALIGN_TOP_RIGHT 
        },
        "lblAmount":  { 
          "text": voltmx.i18n.getLocalizedString("Amount"), 
          "skin": "sknlblBlackDuabiold",
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblAEDAmount": {
          "text": "AED", 
          "skin": "sknlblDubai20pxbold"
        },
        "lblAmountValue": {
          "text": vehicle["buyer_amt"],
          "skin": "sknlblBlackDuabiold"
        },
        "lblStatus":{ 
          "text": voltmx.i18n.getLocalizedString("Status"),  
          "skin": "sknlblBlackDuabiold",
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblStatusValue":
        { "text": vehicle["status"], 
         "skin": "sknlbl61B35C14px",
         "contentAlignment": isArabic ?constants.CONTENT_ALIGN_TOP_LEFT: constants.CONTENT_ALIGN_TOP_RIGHT 

        },
        "lblPaymentSlip": 
        {
          "text": uploaded ? voltmx.i18n.getLocalizedString("paymentUnderReview") : voltmx.i18n.getLocalizedString("Upload Payment Slip"),  
          "skin": "sknlbl61B35C14px",
          "onTouchEnd": uploaded ?  function() {} : this.uploadPopup.bind(this, segWidget, i, vehicle),
          "contentAlignment": isArabic ?constants.CONTENT_ALIGN_TOP_RIGHT  : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "imgUpload": uploaded ? "eyeopen.png" : "lucide_upload_redcolor.png",
        "isHidden": true,
        "flxAuctionDetailsHideData":{ 
          "isVisible": false 
        },
        "flxAuctionID":{
          'onClick': touchHandler,
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxAuctionIdContainer":{
          "reverseLayoutDirection": !isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxAmount":{
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxAmountCount":{
          "reverseLayoutDirection": !isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxStatus" : {
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxUploadContainer":{
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxMakeAndModel": {
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        }
      });
      if (statusList.includes("paid")) {
        this.view.segPaidVehicles.setData(newSegData); 
      } else if(statusList.includes("pending") || statusList.includes("unpaid") ) {
        this.view.SegPendingVehicles.setData(newSegData);	
      }
    }
  },




  showPendingSegment: function () {
    this.currentPendingPage = 1;
    this.loadedPendingData = []; 
    voltmx.store.setItem("paidOrPendingStatus","unpaid"); 
    this.type = voltmx.store.getItem("paidOrPendingStatus");
    this.getVehiclePayment(this.type, this.currentPendingPage);
    this.view.SegPendingVehicles.setVisibility(true);
    this.view.segPaidVehicles.setVisibility(false);
    this.view.flxPendingPayments.skin = "sknflxBgFFE2E5";
    this.view.flxSeperator.skin = "sknflxBgRed";
    this.view.flxPaidVehicles.skin = "slFbox";
    this.view.flxPaidVehiclesSeperator.skin = "sknflxBg9c9c9c";
  },



  pendingPaymentsOnClick: function() {
    this.model = "";
    this.textboxvalueread = "";
    this.view.tbxSearch.text = "";
  
      this.view.btnLoadMore.setVisibility(true);
   
    this.showPendingSegment(); 
  },



  paidVehicles: function(){
    this.currentPendingPage = 1;
    this.model = "";
    this.textboxvalueread = "";
    this.view.tbxSearch.text = "";
     this.view.btnLoadMore.setVisibility(true);
    this.loadedPaidData = [];
    voltmx.store.setItem("paidOrPendingStatus","paid"); 
    this.type = voltmx.store.getItem("paidOrPendingStatus");
    this.getVehiclePayment(this.type, this.currentPendingPage);
    this.view.flxPendingPayments.skin = "slFbox";
    this.view.flxSeperator.skin = "sknflxBg9c9c9c";
    this.view.flxPaidVehicles.skin = "sknflxBgFFE2E5";
    this.view.flxPaidVehiclesSeperator.skin = "sknflxBgRed";
    this.view.SegPendingVehicles.setVisibility(false);
    this.view.segPaidVehicles.setVisibility(true);
  },



  uploadPopup: function(segWidget, rowIndex, vehicle) {
    this.lastUploadedRow = {
      segWidget: segWidget,                
      index: rowIndex,                      
      status: vehicle.status.toLowerCase(), 
      lot_no: vehicle.lot_no,              
      object_id: vehicle.object_id          
    };
    this.view.flxHowWouldYouLike.setVisibility(true);
  },




  camOnCaptureAction: function() {
    var rawBytes = this.view.cam.rawBytes;
    if (rawBytes) {
      console.log("rawBytes: ", rawBytes);
      var filename = "";
      var resourcePath = null;
      try {
        resourcePath = rawBytes.getResourcePath();
        console.log("Resource Path: ", resourcePath);
        if (typeof resourcePath === "string" && resourcePath) {
          filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
        } else {
          console.log("Invalid or missing resourcePath, using fallback filename");
          filename = "camera_image_" + new Date().getTime();
        }
      } catch (err) {
        console.log("Error getting resourcePath: ", err.message);
        filename = "camera_image_" + new Date().getTime();
      }
      var base64Image = voltmx.convertToBase64(rawBytes);
      console.log("Base64 Image: ", base64Image.substring(0, 50) + "...");
      var filetype = detectFileType(base64Image) || ".jpg"; 
      var filefullname = filename + filetype;
      this.filenameCam = filefullname;
      this.selectedPdfFileName = filefullname;
      this.selectedPdfBase64 = base64Image;
      this.view.flxHowWouldYouLike.setVisibility(false);
      this.base64CamImage = base64Image;
      console.log("Calling invokeUploadFleetDoc with filename: ", filefullname);
      this.invokeUploadFleetDoc();
    } else {
      console.log("No image captured from camera.");
      voltmx.print("No image captured from camera.");
    }
  },


  chooseFromLibrary: function() {
    var self = this;
    voltmx.phone.openMediaGallery(function(rawbytes) {
      if (rawbytes) {
        console.log("JsonRawBytes: ", JSON.stringify(rawbytes));
        var filename = "";
        var resourcePath = null;
        try {
          resourcePath = rawbytes.getResourcePath();
          console.log("Resource Path: ", resourcePath);
          if (typeof resourcePath === "string" && resourcePath) {
            filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
          } else {
            // Fallback for iOS: Generate a filename using timestamp
            console.log("Invalid or missing resourcePath, using fallback filename");
            filename = "gallery_image_" + new Date().getTime();
          }
        } catch (err) {
          console.log("Error getting resourcePath: ", err.message);
          filename = "gallery_image_" + new Date().getTime();
        }
        var base64Data = voltmx.convertToBase64(rawbytes);
        console.log("Base64: ", base64Data.substring(0, 50) + "...");
        var filetype = detectFileType(base64Data) || ".jpg"; 
        var filefullname = filename + filetype;
        self.selectedPdfFileName = filefullname;
        self.selectedPdfBase64 = base64Data;
        self.view.flxHowWouldYouLike.setVisibility(false);
        console.log("File Fullname: ", filefullname);
        console.log("Calling invokeUploadFleetDoc with filename: ", filefullname);
        self.invokeUploadFleetDoc();
      } else {
        console.log("No media selected from gallery.");
        voltmx.print("No media selected from gallery.");
      }
    }.bind(this), {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*"
    });
  },



  invokeUploadFleetDoc: function(){
    voltmx.application.showLoadingScreen(null, "Loading..", 
                                         constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                         false, true, 
                                         {shouldShowLabelInBottom: "true",   
                                          separatorHeight: 45,   
                                          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, 
                                          progressIndicatorColor: "Gray"     });
    var self = this;
    var serviceName = "fry_collection";   
    var client = voltmx.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "upload-fleet-documents";
    var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    var rowInfo = this.lastUploadedRow;
    if (!voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      voltmx.application.dismissLoadingScreen();
      this.view.flxError.setVisibility(true);
      return;
    }
    if (!rowInfo) {
      voltmx.application.dismissLoadingScreen();
      return;
    }
    var params = {
      "user_id": userid,
      "moduleName": "UploadFleetDocuments",
      "is_org": "0",
      "category": "payment_slip",
      "object_id": rowInfo.object_id,
      "lot_no": rowInfo.lot_no,
      "file_details": [
        {
          "filename": self.selectedPdfFileName,
          "base64": self.selectedPdfBase64.replaceAll('+','/plus/'), 
        }
      ],
      "user_token": userToken
    };
    var headers = {
    }; 
    integrationSvc.invokeOperation(operationName, headers, params, function(response) {
      voltmx.print("Integration Service Response is: " + JSON.stringify(response));
      if (!response || response.opstatus !== 0) {
        voltmx.print("Upload service failed");
        alert("Upload failed. Please try again.");
        return;
      }
      if( response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
      var message = response.rawResponse && response.rawResponse.message 
      ? response.rawResponse.message 
      : null;
      var message = response.rawResponse.message;
      if(message === "Success"){
        alert("Uploaded Successfully!!");
        var seg = rowInfo.segWidget;
        var data = seg.data;
        if (data && data[rowInfo.index]) {
          data[rowInfo.index].lblPaymentSlip.text = "Payment Under Review";
          data[rowInfo.index].lblPaymentSlip.skin = "sknLblGray14px";
          delete data[rowInfo.index].lblPaymentSlip.onTouchEnd;
          seg.setDataAt(data[rowInfo.index], rowInfo.index);
        }
      }
      voltmx.application.dismissLoadingScreen();
    }, function(error) {
      voltmx.print("Integration Service Failure: " + JSON.stringify(error));
      voltmx.application.dismissLoadingScreen();
    }, {
      "passthrough": true
    });
  },



  toggleRowVisibilityPending: function (rowIndex) {
    var seg = this.view.SegPendingVehicles;
    var allData = seg.data;
    var didChange = false;
    //     if (!seg.selectedRowIndex || seg.selectedRowIndex.length < 2) {
    //       voltmx.print("No row selected yet.");
    //       return;
    //     }
    for (var i = 0; i < allData.length; i++) {
      if (i === rowIndex) {
        var currentVisibility = allData[i].isHidden;
        allData[i].isHidden = !currentVisibility;
        allData[i].flxAuctionDetailsHideData = {
          isVisible: currentVisibility ? true : false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      } else if (!allData[i].isHidden) {
        allData[i].isHidden = true;
        allData[i].flxAuctionDetailsHideData = {
          isVisible: false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      }
    }
    if (!didChange) {
      seg.setData(allData);
    }
    this.view.forceLayout();
  },




  toggleRowVisibilityPaid: function(rowIndex){
    var seg = this.view.segPaidVehicles;
    var allData = seg.data;
    var didChange = false;
     if (rowIndex === undefined || rowIndex === null) {
      voltmx.print("Invalid rowIndex");
      return;
    }
    for (var i = 0; i < allData.length; i++) {
      if (i === rowIndex) {
        var currentVisibility = allData[i].isHidden;
        allData[i].isHidden = !currentVisibility;
        allData[i].flxAuctionDetailsHideData = {
             isVisible: currentVisibility ? true : false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      } else if (!allData[i].isHidden) {
        allData[i].isHidden = true;
        allData[i].flxAuctionDetailsHideData = {
          isVisible: false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      }
    }
    if (!didChange) {
      seg.setData(allData);
    }
    this.view.forceLayout();
  },




  backNav: function(){
    var ntf =   new voltmx.mvc.Navigation("frmOpenMyAccount")
    ntf.navigate();
  },




  toggleFooterIcons: function()
  {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(true);

    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    this.view.Footer2.lblSellCar.skin = "sknLblDubaid3243714pxBold"; 

    var mode = voltmx.store.getItem("mode") || "seller";
    if (mode === "seller") {
      this.view.Footer2.imgMyBids.src = "mylistings.png";
      //       this.view.Footer2.lblMyBids.text = "Listings";
    } else {
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      //       this.view.Footer2.lblMyBids.text = "My Bids";
    }
    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },



  flxCloseAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(false);
  },




});