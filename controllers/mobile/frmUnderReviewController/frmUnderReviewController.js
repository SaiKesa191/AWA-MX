define({ 

 //Type your controller code here 
  onNavigate: function(){
    loginToDam();
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow;
    this.view.flxBack.onClick = this.BackNavigation;
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
//     this.view.segUnderReview.onRowClick = this.onRowClickAction.bind(this);
//      this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    
        //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif
     //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif
 
    
    this.view.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.cam.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
    this.selectedPdfBase64 = "";
    this.selectedPdfFileName = "";
    this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
      if(this.view.flxError.btnTryAgain){
       this.view.flxError.btnTryAgain.onClick = this.onPreShow.bind(this);
     }
    if(this.view.flxServiceError.btnTryAgain){
      this.view.flxServiceError.btnTryAgain.onClick = () =>
      {
        new voltmx.mvc.Navigation("frmDashBoard").navigate();
      }
    }
  },
  onPreShow: function(){
     if(this.view.flxError){
      this.view.flxError.setVisibility(false);
    }
     if(this.view.flxServiceError){
       this.view.flxServiceError.setVisibility(false);
     }
    if(this.view.flxUploadingProgressBar){
       this.view.flxUploadingProgressBar.setVisibility(false);
     }
    this.view.tbxSearch.text = "";
    this.view.lblNorecords.setVisibility(false);
    this.view.btnLoadMore.setVisibility(false);
    this.view.flxBottomFileUpload.setVisibility(false);
     this.pageSize = 10;
    this.currentOffset = 0;
    this.lot = "";
     this.title = ""; 
    this.view.segUnderReview.setData([]);
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
   this.getUnderReviewCars();
    this.toggleFooterIcons();
  },
  
  onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    if (this.view.flxBottomFileUpload && this.view.flxOverLay) {
     this.view.flxOverLay.onClick = () =>{
       this.view.flxBottomFileUpload.setVisibility(!this.view.flxBottomFileUpload.isVisible);
       this.view.flxOverLay.setVisibility(!this.view.flxOverLay.isVisible);
     }
    }
       if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    if(this.view.Success){
      this.view.Success.setVisibility(false);
    }
    
    if(this.view.Success.btnCloseSuccess){
      this.view.Success.btnCloseSuccess.onClick = () =>{
        this.view.Success.setVisibility(false);
      }
    }
     if (this.view.flxBottomFileUpload) {
     this.view.flxBottomFileUpload.onClick = () =>{
       this.view.flxBottomFileUpload.setVisibility(false);
     }
    }
    
  },
  
  applySearch: function() {
   var self = this;
var hasText = false;

if (self.view.tbxSearch && typeof self.view.tbxSearch.text === "string") {
    hasText = self.view.tbxSearch.text.trim() !== "";
}

if (self.view.btnOk) {
    self.view.btnOk.setVisibility(hasText);
}
     if (!hasText) {
        self.invokeServiceWithSearch();
    }
},
  invokeServiceWithSearch: function()
  {
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segUnderReview.setData([]);
    this.view.btnLoadMore.setVisibility(false);
   var searchText = (self.view.tbxSearch && self.view.tbxSearch.text ? self.view.tbxSearch.text : "").trim();


//     if (!searchText) return;

    // Decide which field to use
    if (!isNaN(searchText)) {
        self.lot = searchText;
        self.title = "";  // clear the other
    } else {
        self.title = searchText;
        self.lot = "";    // clear the other
    }

    self.getUnderReviewCars();
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
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
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
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
  },
  
    onRowClickAction: function()
  {
   var selectedItem = this.view.segUnderReview.selectedRowItems;
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    voltmx.store.setItem("navForm3", "UnderReview")
   
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
        var auctionid = selectedItem[0].aucid;

     
        new voltmx.mvc.Navigation("frmDetails").navigate({
            "objid": objectid,
             "aucid": auctionid,
             "prevForm":"UnderReview"
        });
    } else {
        
        voltmx.print("No row selected in segLiveAuctions.");
    }
  },
  
  onLoadMoreClick: function()
  {
  this.pageSize += 10;
  this.getUnderReviewCars();
  },
  
  setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.lblNorecords.setVisibility(false);
    self.view.segUnderReview.setData(self.originalSegData);
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return (
    item.lblCarName.text.toLowerCase().includes(searchText) ||
    item.lblAuctionIdValue.text.toLowerCase().includes(searchText)
      );
  });

  self.view.segUnderReview.setData(filteredData);
    
   if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
}  
    
  },
  getUnderReviewCars: function(){
     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;
    var self = this;
    
    
    checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    
    var underReviewCars_InputParam = {};
    var user_fleet_my_vehicles_inputparam = {};
//     var currentLocale = voltmx.store.getItem("currentLocale");
      var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    user_fleet_my_vehicles_inputparam["serviceID"] = "fry_int_fleet$user-fleet-my-vehicles";
    user_fleet_my_vehicles_inputparam["user_id"] = userId;
    user_fleet_my_vehicles_inputparam["lot_no"] = self.lot || "";
    user_fleet_my_vehicles_inputparam["title"] = self.title || "";
    user_fleet_my_vehicles_inputparam["chassis_number"] = "";
    user_fleet_my_vehicles_inputparam["created_on"] ="" ;
    user_fleet_my_vehicles_inputparam["branch"] = "";
    user_fleet_my_vehicles_inputparam["asset_id"] = "ALL";
    user_fleet_my_vehicles_inputparam["page_number"] = "1";
    user_fleet_my_vehicles_inputparam["page_size"] = String(self.pageSize);
    user_fleet_my_vehicles_inputparam["is_rejected"]= "0";
    user_fleet_my_vehicles_inputparam["rejectnotes" ]="";
    user_fleet_my_vehicles_inputparam["language"] = currentLocale || "en";

    var user_fleet_my_vehicles_httpheaders = {
      "user_token": usertoken
    };
    user_fleet_my_vehicles_inputparam["httpheaders"] = user_fleet_my_vehicles_httpheaders;
    var user_fleet_my_vehicles_httpconfigs = {};
    user_fleet_my_vehicles_inputparam["httpconfig"] = user_fleet_my_vehicles_httpconfigs;
    fry_int_fleet$user_fleet_my_vehicles =
      mfintegrationsecureinvokerasync(user_fleet_my_vehicles_inputparam, 
                                      "fry_int_fleet", 
                                      "user-fleet-my-vehicles", 
                                     function(status,response){
     voltmx.application.dismissLoadingScreen();
      
      
      
      if( response &&
        response.opstatus === 0 &&
        response.httpresponse &&
        response.httpresponse.responsecode === 200 &&
         Array.isArray(response.records)){

        if (self.view.flxError) self.view.flxError.setVisibility(false);
        if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);

        var data = response.records;
        if(data && data.length > 0){
          self.view.lblNorecords.setVisibility(false);
          self.setDataToUnderReviewSeg(data);
        }
        else
        {
           self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
        }
      }
      else{
       
        if (
            response &&
            response.errcode &&
          Number(response.errcode) === 1011
        ) {
           self.view.flxError.setVisibility(true);
            self.view.flxError.lblNetworkConnectionerror.text =
                "Network issue. Check connection and retry.";
        } else {
            if(self.view.flxServiceError){
       self.view.flxServiceError.setVisibility(true);
     }
        }

        voltmx.print("Invalid response structure or status.");
//         alert("No records found");
      }

    });

    });
  },
  
  setDataToUnderReviewSeg: function(data)
  {
    var self = this;
   var segData = [];
    var damAvailable = voltmx.store.getItem("isDamAvailable");
   self.view.segUnderReview.widgetDataMap = {
  "lblCarName": "lblCarName",
  "lblAuctionId": "lblAuctionId",
  "imgCar":"imgCar",
  "lblAuctionIdValue": "lblAuctionIdValue",
  "lblChassisNo": "lblChassisNo",
  "lblChassisNoValue": "lblChassisNoValue",
  "lblModel": "lblModel",
  "lblModelValue": "lblModelValue",
  "lblAdded": "lblAdded",
  "lblAddedValue": "lblAddedValue",
  "lblTargetSellingPrice": "lblTargetSellingPrice",
  "lblTargetSelling": "lblTargetSelling",
  "lblTargetSellingPriceAED": "lblTargetSellingPriceAED",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
  "lblDocuments": "lblDocuments",
  "lblDocumentsValue": "lblDocumentsValue",
  "lblAddRequest": "lblAddRequest",
  "lblAddRequestValue": "lblAddRequestValue",
  "btnUploadFile": "btnUploadFile",
  "btnAddRequest": "btnAddRequest",
  "btnDone": "btnDone"
};

     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//      self.view.segUnderReview.setData([]);
   var newRecords = data.slice(self.currentOffset); 
   for (var i = 0; i < newRecords.length; i++) {
    var item = newRecords[i];
    var isDocPresent = !!item.documents && item.documents !== "N/A";

    segData.push({
//       "lblAuctionId": voltmx.i18n.getLocalizedString("Auction ID"),
      "lblAuctionId": {
        "text": voltmx.i18n.getLocalizedString("Auction ID"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblChassisNo": voltmx.i18n.getLocalizedString("Chassis Number"),
       "lblChassisNo": {
        "text": voltmx.i18n.getLocalizedString("Chassis Number"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblModel": voltmx.i18n.getLocalizedString("Model"),
        "lblModel": {
        "text": voltmx.i18n.getLocalizedString("Model"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblAdded": voltmx.i18n.getLocalizedString("Added"),
       "lblAdded": {
        "text": voltmx.i18n.getLocalizedString("Added"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "lblTargetSellingPrice": voltmx.i18n.getLocalizedString("Target Selling Price"),  // Highest Bid may be
//       "lblDocuments": voltmx.i18n.getLocalizedString("Documents"),
        "lblDocuments": {
        "text": voltmx.i18n.getLocalizedString("Documents"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblAddRequest": voltmx.i18n.getLocalizedString("ADD REQUEST"),
       "lblAddRequest": {
        "text": voltmx.i18n.getLocalizedString("ADD REQUEST"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "imgCar": {
        "src":(damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif"},
      "objid": item.object_id,
      "aucid": item.auction_id,
      "lotno": item.lot_no,
      "lblCarName": {
        "text": item.title,
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblCarName": item.title || "N/A",
      "lblTargetSellingPriceAED": "AED",
//       "lblAuctionIdValue": "#"+item.lot_no || "N/A",
       "lblAuctionIdValue": {
        "text": "#"+item.lot_no || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//       "lblChassisNoValue": item.chassis_number || "N/A",
        "lblChassisNoValue": {
        "text": item.chassis_number || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
     
//       "lblModelValue": item.year_of_making || "N/A",
       "lblModelValue": {
        "text": item.year_of_making || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//       "lblAddedValue": item.created_on ? item.created_on.split(" ")[0] : "N/A",
      "lblAddedValue": {
        "text": item.created_on ? item.created_on.split(" ")[0] : "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      "lblTargetSelling": item.selling_price || "N/A",
//       "lblLocation": voltmx.i18n.getLocalizedString("Location"),
       "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblLocationValue": item.branch || "N/A",
       "lblLocationValue": {
        "text": item.branch || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      
//       "lblDocumentsValue": item.documents || "N/A",
      "lblDocumentsValue": {
        "text": item.documents || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//       "lblAddRequestValue": item.add_request || "N/A",
       "lblAddRequestValue": {
        "text": item.add_request || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      "btnDone": {
        "text": voltmx.i18n.getLocalizedString("DONE"),
        "onClick": self.onDoneClick.bind(self)
      },
      "btnAddRequest": {
        "text": voltmx.i18n.getLocalizedString("ADD REQUEST"),
        "onClick": self.onAddRequest.bind(self)
      },
      "btnUploadFile": {
//         "isVisible": isDocPresent,
      "opacity": isDocPresent ? 0.75 : 1,
//         "setEnabled": !isDocPresent,
        "text": voltmx.i18n.getLocalizedString("UPLOAD FILE"),
        "onClick":  !isDocPresent ? self.onUploadClick.bind(self) : null
      }
    });
  }
//     self.originalSegData = segData;
    if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
    self.view.segUnderReview.addAll(segData);
    
     if (self.pageSize > data.length) {
     self.view.flxSegUnderReview.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxSegUnderReview.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
    
  },
  
//   onAddRequest: function()
//   {
//      var selIndex = this.view.segUnderReview.selectedRowIndex;

//   if (!selIndex || selIndex.length < 2) {
//     voltmx.print("No row selected in segUnderReview");
//     return;
//   }

   

//   var rowData = this.view.segUnderReview.selectedRowItems[0];
//   var objid = rowData.objid;
//   var lotno = rowData.lotno;
    
//     voltmx.store.setItem("objidForVI",objid);
//     voltmx.store.setItem("lotidForVI",lotno);

//   voltmx.print("objid: " + objid + ", lotno: " + lotno);
    
//     new voltmx.mvc.Navigation("frmServices").navigate();
    
//   },
  
   onAddRequest: function () {
    var selectedItems = this.view.segUnderReview.selectedRowItems;

    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
        voltmx.print("⚠️ No row selected in segUnderReview");
        return;
    }

    var rowData = selectedItems[0];

    var objid = rowData.objid || "";
    var lotno = rowData.lotno || "";

    voltmx.store.setItem("objidForVI", objid);
    voltmx.store.setItem("lotidForVI", lotno);

    voltmx.print(" objid: " + objid + ", lotno: " + lotno);
      voltmx.store.setItem("originForm01", "frmUnderReview");
       voltmx.store.setItem("originForm", "frmUnderReview");
      voltmx.store.setItem("previousFormForServices", "frmUnderReview");
     
     var  currentAuctionNavigation =  voltmx.store.getItem("previousFormForServices");
      var objid = voltmx.store.getItem( "objidForVI");
    var lotId = voltmx.store.getItem("lotidForVI");
 
     
     if(objid&&lotId){
       voltmx.store.setItem("comingFromDashboard", false);
       voltmx.store.setItem("seller_rsa","sending to awa");
    new voltmx.mvc.Navigation("frmServices").navigate(
       {"previousFormID":"frmUnderReview",
//           "previousFormForAction": currentAuctionNavigation,
             "previousFormAction": currentAuctionNavigation,
       "lotIdfromUnderReview" : lotId,
       "objIdfromUnderReview": objid,
         "prevForm":"UnderReview"
       }
    );
     }
     else{
          objid = voltmx.store.getItem("objidForVI" );
         lotId = voltmx.store.getItem("lotidForVI");
          this.view.forceLayout();
     }
},
  
  
  onUploadClick: function()
  {
   var selectedRow = this.view.segUnderReview.selectedRowItems[0];
    var objid = selectedRow.objid;
    var lotid = selectedRow.lotno;
    this.objidforfleet = objid;
    this.lotidforfleet = lotid;
   this.view.flxBottomFileUpload.setVisibility(true);
//    this.view.flxOverLay.setVisibility(true);
    
  },
  
  onDoneClick: function()
  {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;
     var selectedItem = this.view.segUnderReview.selectedRowItems[0];
  if (selectedItem && selectedItem.objid) {
    this.callWfStatusToDone(selectedItem.objid);
  } else {
    voltmx.print("Error: No selected item or missing objid");
  }
  },
  
  callWfStatusToDone: function(objid)
  {
      var self = this;
    checkTokenValidatity(function() {
    function doneCallBack(status, fleet_wfstatus) {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(fleet_wfstatus);
      if(fleet_wfstatus.httpStatusCode === 200 &&
    fleet_wfstatus.opstatus === 0 &&
    fleet_wfstatus.data)
        {
          new voltmx.mvc.Navigation("frmApprovedVehicles").navigate();
        }
      else{
//         alert(fleet_wfstatus.user_message);
        if(fleet_wfstatus && fleet_wfstatus.user_message)
          {
            self.view.SmthngWentWrong.setVisibility(true);
            self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message;
          }
      }
      
    }
    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objid;
    fleet_wfstatus_inputparam["action_name"] = "Done";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);
    });
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
//     alert("Filename selected :::"+data);

    this.pdfData = null;

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        this.pdfData = JSON.parse(dataJsonStr);
        if(this.pdfData && this.pdfData.base64pdf){
          this.selectedPdfBase64 = this.pdfData.base64pdf;
          this.selectedPdfFileName = this.pdfData.fileName;
          
            var sizeInBytes = this.estimateBase64Size(this.selectedPdfBase64);
    var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

    if (sizeInBytes > 10 * 1024 * 1024) {
      alert(" File too large. Please upload a file smaller than 10 MB.");
      
      return;
    }
     
          this.view.flxBottomFileUpload.setVisibility(false);
          this.view.flxOverLay.setVisibility(false);
          this.fleetDocUpload();
//            this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
        }
        
//         alert(this.pdfData.fileName);
     
      } catch (error) {
        console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },
  
   testPDFNFIIOS: function()
  {
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
// 	ViewObject.pdfCallback(function(pdfArrayObj){
//       voltmx.print("Received Callback Object: " +pdfArrayObj[0],pdfArrayObj[1]); 
//       var fileName = pdfArrayObj[0]; // Get the filename
//       var base64Data = pdfArrayObj[1];
      
//       self.selectedPdfFileName = fileName;
//       self.selectedPdfBase64 =base64Data;
     
//       alert("Selected value"+self.selectedPdfBase64);
//       alert("selected file"+self.selectedPdfFileName);
//       self.view.lblfilename.text = self.selectedPdfFileName;
//        self.view.imgupload.setVisibility(false);
//           self.view.flxBottomFileUpload.setVisibility(false);
//           self.view.flxOverLay.setVisibility(false);
         
//     });
    
    ViewObject.pdfCallback(function(pdfArrayObj){
  voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]); 

  var fileName = pdfArrayObj[0];
  var base64Data = pdfArrayObj[1];

  self.selectedPdfFileName = fileName;
  self.selectedPdfBase64 = base64Data;
      
          var sizeInBytes = self.estimateBase64Size(self.selectedPdfBase64);
    var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

    if (sizeInBytes > 10 * 1024 * 1024) {
      alert(" File too large. Please upload a file smaller than 10 MB.");
      
      return;
    }

      
  voltmx.runOnMainThread(function () {
    
    self.view.flxBottomFileUpload.setVisibility(false);
    self.view.flxOverLay.setVisibility(false);
    self.fleetDocUpload();
  }, []);
});

        
      
  }
}
    
         
  },

  
 flxChooseFromLibraryOnClickAction: function () {
  var self = this;

  voltmx.phone.openMediaGallery(function (rawbytes) {
    if (rawbytes) {
      voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));

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

      var base64Data = voltmx.convertToBase64(rawbytes);

      var sizeInBytes = self.estimateBase64Size(base64Data);
      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 10 * 1024 * 1024) {
        alert("Image too large. Please select an image smaller than 10 MB.");
        return;
      }

      var filetype = detectFileType(base64Data) || ".jpg";
      var filefullname = filename + filetype;

      self.selectedPdfFileName = filefullname;
      self.selectedPdfBase64 = base64Data;

      self.fleetDocUpload();

      self.view.flxBottomFileUpload.setVisibility(false);
      self.view.flxOverLay.setVisibility(false);

      voltmx.print(" Base64 Image Uploaded: " + base64Data);
    }
  }.bind(this), {}, {
    action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
    format: voltmx.phone.MEDIA_DOCUMENT_RAW,
    mimetype: "image/*"
  });
},

  
camOnCaptureAction: function () {
  var rawBytes = this.view.cam.rawBytes;

  if (rawBytes) {
    // Convert raw bytes to base64
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

    var filetype = detectFileType(base64Image) || ".jpg";
    var filefullname = filename + filetype;

    this.filenameCam = filefullname;
    this.selectedPdfFileName = filefullname;
    this.selectedPdfBase64 = base64Image;

    this.fleetDocUpload();

    this.view.flxBottomFileUpload.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  } else {
    voltmx.print("No image captured from camera.");
  }
},
  
    startProgressSimulation: function() {
    var self = this;
    var progressValue = 0;
    voltmx.timer.schedule(
        "progressBarTimer",
        function() {
            if (progressValue < 90) {
                progressValue += 10;
                self.view.flxInnerBar.width = progressValue + "%";
            } else {
                voltmx.timer.cancel("progressBarTimer");
            }
        }.bind(this),
        0.5, // Interval in seconds
        true // Repeat
    );
},

  
//   estimateBase64Size: function (base64Str) {
//   let padding = (base64Str.match(/=*$/) || [""])[0].length;
//   return Math.floor((base64Str.length * 3) / 4) - padding;
// },
  estimateBase64Size: function (base64Str) {
  if (!base64Str || typeof base64Str !== "string") {
    return 0; // or handle error gracefully
  }

  let padding = (base64Str.match(/=*$/) || [""])[0].length;
  return Math.floor((base64Str.length * 3) / 4) - padding;
},

  
//   fleetDocUpload: function()
//   {
//      var self = this;
//      voltmx.application.showLoadingScreen(null, "Uploading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

//     var userobj = voltmx.store.getItem("userObject");
//     var isorg = userobj.rawResponse.is_org;
//     // Sample code to fetch the integration service details with passthrough 
// var serviceName = "fry_collection";   
// // Get an instance of SDK
// var client = voltmx.sdk.getCurrentInstance();
// var integrationSvc = client.getIntegrationService(serviceName);
// var operationName = "upload-fleet-documents";
//      var userToken = voltmx.store.getItem("getUserAccesstoken");
//     var userid = voltmx.store.getItem("userId");
    
// var params = {
//     "user_id": userid,
//         "moduleName": "UploadFleetDocuments",
//         "is_org": isorg,
//         "category": "Possion_Letter",
//         "object_id": self.objidforfleet,
//         "lot_no":self.lotidforfleet,
//         "file_details": [
//             {
//                 "is_thumbnail": "true",
//                 "filename": self.selectedPdfFileName,
//                 "base64": self.selectedPdfBase64 // You need to encode file as base64 and insert it here
//             }
//         ],
//         "user_token": userToken
// };
    
// var headers = {
// //     "custom-header-key1": "custom-header-value1"
// }; //If there are no headers, pass null
//     self.view.flxUploadingProgressBar.setVisibility(true);
// self.view.flxInnerBar.width = "0%";
// self.startProgressSimulation();
// // options is an optional parameter that helps in configuring the network layer.
// integrationSvc.invokeOperation(
//     operationName,
//     headers,
//     params,
//     function (response) {
//       voltmx.application.dismissLoadingScreen();
//         voltmx.print("Integration Service Response is: " + JSON.stringify(response));
//         voltmx.timer.cancel("progressBarTimer");
//         try {
//             if (response && response.rawResponse) {
//                 const rawResp = response.rawResponse;
//                 const opStatus = rawResp.opstatus;

//                 if (opStatus === 0 && rawResp.response) {
//                     let parsedResponse = JSON.parse(rawResp.response);

//                     if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
//                         let errorCode = parsedResponse[0].error_code;

//                         if (errorCode === "409") {
//                           if(self.view.SmthngWentWrong){
//                              self.view.flxUploadingProgressBar.setVisibility(false);
//                             self.view.SmthngWentWrong.setVisibility(true);
//                             self.view.SmthngWentWrong.lblSomethingWentWrong.text = "File already exists. Please rename.";
//                           }
// //                             alert("File already exists. Please rename.");
//                             return;
//                         }
//                     }

       
//                     if(self.view.Success){
//                       self.view.flxInnerBar.width = "100%";
//               self.view.flxUploadingProgressBar.setVisibility(false);
//                       self.view.Success.setVisibility(true);
//                       self.view.Success.lblSuccessmsg.text = voltmx.i18n.getLocalizedString("Document uploaded successfully");     
//                     }
//                     return;
//                 }
//             }

//             // Catch all unexpected response cases
//            if(self.view.SmthngWentWrong){
//              self.view.flxUploadingProgressBar.setVisibility(false);
//                             self.view.SmthngWentWrong.setVisibility(true);
//                             self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
//                           }
//         } catch (e) {
          
//             voltmx.print("Exception while processing response: " + e.message);
//           if(self.view.SmthngWentWrong){
//                  self.view.flxUploadingProgressBar.setVisibility(false);
//                             self.view.SmthngWentWrong.setVisibility(true);
//                             self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
//                           }
//         }
//     },
//     function (error) {
//       voltmx.application.dismissLoadingScreen();
//         voltmx.print("Integration Service Failure: " + JSON.stringify(error));
//        if(self.view.SmthngWentWrong){
//          self.view.flxUploadingProgressBar.setVisibility(false);
//                             self.view.SmthngWentWrong.setVisibility(true);
//                             self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
//                           }
//     },
//     {
//         "passthrough": true
//     }
// );

//   },
  
  fleetDocUpload: function() {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Uploading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
    });

    var userobj = voltmx.store.getItem("userObject");
    var isorg = userobj.rawResponse.is_org;

    var serviceName = "fry_collection";
    var client = voltmx.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "upload-fleet-documents";
    var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");

    var params = {
        "user_id": userid,
        "moduleName": "UploadFleetDocuments",
        "is_org": isorg,
//         "category": "Possion_Letter",
        "category": "Possession_Letter",
        "object_id": self.objidforfleet,
        "lot_no": self.lotidforfleet,
        "file_details": [{
//             "is_thumbnail": "true",
            "filename": self.selectedPdfFileName,
            "base64": self.selectedPdfBase64,
             "type":"Possession_Letter",
          "sub_type":"Possession_Letter"
        }],
        "user_token": userToken
    };

    var headers = {};
    self.view.flxUploadingProgressBar.setVisibility(true);
    self.view.flxInnerBar.width = "0%";
    self.startProgressSimulation();

    integrationSvc.invokeOperation(
        operationName,
        headers,
        params,
        function(response) {
            voltmx.application.dismissLoadingScreen();
            voltmx.print("Integration Service Response is: " + JSON.stringify(response));
            voltmx.timer.cancel("progressBarTimer");
            try {
                if (response && response.rawResponse) {
                    const rawResp = response.rawResponse;
                    const opStatus = rawResp.opstatus;

                    // Added logic here — check message first
                    if (opStatus === 0 && rawResp.message) {
                        const msg = rawResp.message.toLowerCase();

                        //  Fail case
                        if (msg === "fail" && rawResp.response) {
                            let parsedResponse = JSON.parse(rawResp.response);
                            if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
                                let errorCode = parsedResponse[0].error_code;
                                if (errorCode === "409") {
                                    if (self.view.SmthngWentWrong) {
                                        self.view.flxUploadingProgressBar.setVisibility(false);
                                        self.view.SmthngWentWrong.setVisibility(true);
                                        self.view.SmthngWentWrong.lblSomethingWentWrong.text = "File already exists. Please rename.";
                                    }
                                    return;
                                }
                            }

                            // Any other fail
                            if (self.view.SmthngWentWrong) {
                                self.view.flxUploadingProgressBar.setVisibility(false);
                                self.view.SmthngWentWrong.setVisibility(true);
                                self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Something went wrong. Try again.";
                            }
                            return;
                        }

                        //  Success case
                        if (msg === "success") {
                            if (self.view.Success) {
                                self.view.flxInnerBar.width = "100%";
                                self.view.flxUploadingProgressBar.setVisibility(false);
                                self.view.Success.setVisibility(true);
                                self.view.Success.lblSuccessmsg.text = voltmx.i18n.getLocalizedString("Document uploaded successfully");
                            }
                            return;
                        }
                    }
                }

                // Catch all unexpected response cases
                if (self.view.SmthngWentWrong) {
                    self.view.flxUploadingProgressBar.setVisibility(false);
                    self.view.SmthngWentWrong.setVisibility(true);
                    self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
                }
            } catch (e) {
                voltmx.print("Exception while processing response: " + e.message);
                if (self.view.SmthngWentWrong) {
                    self.view.flxUploadingProgressBar.setVisibility(false);
                    self.view.SmthngWentWrong.setVisibility(true);
                    self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
                }
            }
        },
        function(error) {
            voltmx.application.dismissLoadingScreen();
            voltmx.print("Integration Service Failure: " + JSON.stringify(error));
            if (self.view.SmthngWentWrong) {
                self.view.flxUploadingProgressBar.setVisibility(false);
                self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
            }
        },
        {
            "passthrough": true
        }
    );
},
  
   adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
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
     this.view.flxSearchContainer.reverseLayoutDirection = isArabic;
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Under Review");
     this.view.lblUnderReview.text = voltmx.i18n.getLocalizedString("Under Review");
     this.view.lblRegisterAs.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
     this.view.lblChooseFromFile.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE"); 
     this.view.lblChooseFromLibrary.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
     this.view.cam.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
     this.view.btnSubmitForUpload.text = voltmx.i18n.getLocalizedString("Submit");
      this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     this.view.CopyflxToggles0a570cc69f1d247.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblUnderReview.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblUnderReview.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
   }
 });