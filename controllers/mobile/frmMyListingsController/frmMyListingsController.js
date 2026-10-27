define({ 

 //Type your controller code here 
  onNavigate: function()
{
  
  this.adjustRTLLayout();
  this.userid = voltmx.store.getItem("userId");
  this.view.preShow = this.onPreShow.bind(this);
  this.view.postShow = this.onPostShow.bind(this);
  this.view.flxUnderReview.onClick = this.underReviewToggle.bind(this);
  this.view.flxLiveAuctions.onClick = this.liveAuctionsToggle.bind(this);
  this.view.flxPending.onClick = this.pendingToggle.bind(this);
  
//   this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
  this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
  
       //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif
     //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif
 
    this.view.flxBack.onClick = () =>{
    new voltmx.mvc.Navigation("frmDashBoard").navigate();
  }
    
    this.view.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.cam.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
    this.selectedPdfBase64 = "";
    this.selectedPdfFileName = "";
   this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
}, 
  
  
  onPreShow: function(){
    loginToDam();
    this.view.tbxSearch.text = "";
    this.pageSizeUnderReview = 10;
    this.currentOffsetUnderReview = 0;
    this.view.segUnderReview.setData([]);
    
    this.pageSizeLive = 10;
    this.currentOffSetLive = 0;
    this.view.segLiveAuctions.setData([]);
    
    this.pageSizePending = 10;
    this.currentOffSetPending = 0;
    this.view.segPending.setData([]);
     this.lot = "";
     this.title = ""; 
    
    if(this.view.flxUploadingProgressBar){
       this.view.flxUploadingProgressBar.setVisibility(false);
     }
    
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
    this.view.btnLoadMoreUnderReview.setVisibility(false);
    this.view.btnLoadMoreLive.setVisibility(false);
    this.view.btnLoadMorePending.setVisibility(false);
    
    this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Under Review");
    this.view.lblNoRecordsUnderReview.setVisibility(false);
    this.view.lblNoRecordsLive.setVisibility(false);
    this.view.lblNoRecordsPending.setVisibility(false);
    
    
    
    this.toggleFooterIcons();
    this.underReviewToggle();

    
  },
  
  onPostShow: function()
  {
   
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
    
     if (this.view.flxBottomFileUpload) {
     
       this.view.flxBottomFileUpload.setVisibility(false);
     
    }
    
    
    
         this.view.btnLoadMoreUnderReview.onClick = this.onLoadMoreClickUnderReview.bind(this);
         this.view.btnLoadMoreLive.onClick = this.onLoadMoreClickLive.bind(this);      
         this.view.btnLoadMorePending.onClick = this.onLoadMoreClickPending.bind(this);
    
//          this.view.segUnderReview.onRowClick = this.onRowClickActionUnderReview.bind(this);
//          this.view.segLiveAuctions.onRowClick = this.onRowClickActionLiveAuctions.bind(this);
//          this.view.segPending.onRowClick = this.onRowClickActionPending.bind(this);
   
         this.view.tbxBargainAmount.onTextChange = this.validateBargainAmount.bind(this);

     this.view.flxRemoveBargainPopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false);
     }
     
     if(this.view.flxBargainContainer.isVisible){
     this.view.flxBargainContainer.setVisibility(false);
     }
    if(this.view.flxOverLay.isVisible){
    this.view.flxOverLay.setVisibility(false);
    }
    if(this.view.flxRejectOrBargain.isVisible){
      this.view.flxRejectOrBargain.setVisibility(false);
    }
    
    if(this.view.flxBargainContainer.isVisible){
    this.view.flxBargainContainer.setVisibility(false);
    }
    
    this.view.flxRemoveRejectBargainPopup.onClick = () =>{
       this.view.flxRejectOrBargain.setVisibility(false);
       this.view.flxOverLay.setVisibility(false);
    }
    this.view.flxOverLay.onClick = () =>{
       if(this.view.flxBargainContainer.isVisible){
     this.view.flxBargainContainer.setVisibility(false);
     this.view.flxOverLay.setVisibility(false);
     }
    }
     
     this.view.btnCloseBargainSuccesspopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false); 
     }
    this.view.btnBargainFromPopup.onClick = this.openBargainClosePopup.bind(this);
    this.view.btnRejectFromPopup.onClick = this.callRejectService.bind(this);
     
    
    this.view.flxRemoveApologyRejected.onClick = () => {
      this.view.flxApologyRejected.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    
    this.view.btnCloseApology.onClick = () => {
      this.view.flxApologyRejected.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    
    this.view.btnCloseAcceptPopup.onClick = () =>{
      this.view.flxAcceptPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    
    this.view.flxRemoveAcceptPopup.onClick = () => {
      this.view.flxAcceptPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    
//     this.view.btnBargain.onClick = this.callBargainService.bind(this);
    this.view.btnSubmitBargain.onClick = this.callBargainService.bind(this);
    
    
  
       
    },
  
   toggleFooterIcons: function()
  {
  this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(true);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
   this.view.Footer2.imgMyBids.src = "mybidsfooteractive.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubaid3243714pxBold";
    
      var mode = voltmx.store.getItem("mode");
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistingactive.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
    this.view.Footer2.imgMyBids.src = "mybidsfooteractive.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
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
  
  

   onLoadMoreClickUnderReview: function()
  {
    
  this.pageSizeUnderReview += 10;
  this.invokeUnderReview();
    
    
  },
  
  onLoadMoreClickLive: function()
  {
   this.pageSizeLive += 10; 
    this.invokeLiveAuctions();
  },
  
   onLoadMoreClickPending: function()
  {
   this.pageSizePending += 10; 
    this.invokePendingSale();
  },

 onRowClickActionUnderReview: function() {
      voltmx.store.setItem("fromLiveAuction", false);
   voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
  var selectedItem = this.view.segUnderReview.selectedRowItems;
  if (selectedItem && selectedItem.length > 0) {
    var objid = selectedItem[0].objid;
    var aucid = selectedItem[0].aucid;
    voltmx.store.setItem("previousFormForServices", "frmMyListings");
   new voltmx.mvc.Navigation("frmDetails").navigate({
      "aucid": aucid,
      "objid": objid,
    "prevForm": "MyListings"
    });
  }
},
  
 onRowClickActionLiveAuctions: function(){
      voltmx.store.setItem("fromLiveAuction", true);
   voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
   var selectedItem = this.view.segLiveAuctions.selectedRowItems;
  if (selectedItem && selectedItem.length > 0) {
     var aucid = selectedItem[0].aucid;
    var objid = selectedItem[0].objid;
    voltmx.store.setItem("previousFormForServices", "frmMyListings");
    new voltmx.mvc.Navigation("frmDetails").navigate({
      "objid": objid,
       "aucid": aucid,
    "prevForm":"MyListings"
    });
  }
   
 },
  
  onRowClickActionPending: function(){
       voltmx.store.setItem("fromLiveAuction", false);
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
   var selectedItem = this.view.segPending.selectedRowItems;
  if (selectedItem && selectedItem.length > 0) {
    var objid = selectedItem[0].objid;
    var aucid = selectedItem[0].aucid;
      voltmx.store.setItem("previousFormForServices", "frmMyListings");
   new voltmx.mvc.Navigation("frmDetails").navigate({
      "objid": objid,
      "aucid": aucid,
    "prevForm":"MyListings"
    });
  }
   
 },
  
  
  
  underReviewToggle: function(){
    this.view.btnLoadMoreUnderReview.setVisibility(false);
    this.view.lblNoRecordsUnderReview.setVisibility(false);
//     this.view.btnLoadMoreLive.setVisibility(false);
//     this.view.btnLoadMorePending.setVisibility(false);
    this.view.flxUnderReviewList.setVisibility(true);
    this.view.flxLiveAuctionsList.setVisibility(false);
    this.view.flxPendingList.setVisibility(false);
    this.view.flxH1.setVisibility(true);
    this.view.flxH2.setVisibility(false);
    this.view.flxH3.setVisibility(false);
    
     this.pageSizeUnderReview = 10;
    this.currentOffsetUnderReview = 0;
    this.view.segUnderReview.setData([]);
    
//     this.view.btnLoadMoreUnderReview.setVisibility(true);
//     this.view.btnLoadMoreLive.setVisibility(false);
//     this.view.btnLoadMorePending.setVisibility(false);
    this.currentSearch = "under";
    this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Under Review");
    this.invokeUnderReview();
    
    this.view.lblUnderReview.skin="sknLblDubai231f2018px49";
   this.view.lblLiveAuctions.skin="sknLblDubai8e8e8e18px49";
    this.view.lblPending.skin="sknLblDubai8e8e8e18px49"
  },
  
    liveAuctionsToggle: function(){
//       this.view.btnLoadMoreUnderReview.setVisibility(false);
    this.view.lblNoRecordsLive.setVisibility(false);
    this.view.btnLoadMoreLive.setVisibility(false);
//     this.view.btnLoadMorePending.setVisibility(false);
     this.view.flxUnderReviewList.setVisibility(false);
    this.view.flxLiveAuctionsList.setVisibility(true);
    this.view.flxPendingList.setVisibility(false);
    this.view.flxH1.setVisibility(false);
    this.view.flxH2.setVisibility(true);
    this.view.flxH3.setVisibility(false);
    this.currentSearch = "live";
      
    this.pageSizeLive = 10;
    this.currentOffSetLive = 0;
    this.view.segLiveAuctions.setData([]);
    
   
    this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search live auctions");
      this.invokeLiveAuctions();
      
//       this.view.btnLoadMoreUnderReview.setVisibility(false);
//     this.view.btnLoadMoreLive.setVisibility(true);
//     this.view.btnLoadMorePending.setVisibility(false);
       this.view.lblUnderReview.skin="sknLblDubai8e8e8e18px49";
   this.view.lblLiveAuctions.skin="sknLblDubai231f2018px49";
    this.view.lblPending.skin="sknLblDubai8e8e8e18px49"
  },
  
    pendingToggle: function(){
      this.view.lblNoRecordsPending.setVisibility(false);
//       this.view.btnLoadMoreUnderReview.setVisibility(false);
//     this.view.btnLoadMoreLive.setVisibility(false);
    this.view.btnLoadMorePending.setVisibility(false);
     this.view.flxUnderReviewList.setVisibility(false);
    this.view.flxLiveAuctionsList.setVisibility(false);
    this.view.flxPendingList.setVisibility(true);
    this.view.flxH1.setVisibility(false);
    this.view.flxH2.setVisibility(false);
    this.view.flxH3.setVisibility(true);
      this.currentSearch = "pending";
       this.pageSizePending = 10;
    this.currentOffSetPending = 0;
    this.view.segPending.setData([]);
      this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Pending Sale Confirmation");
      this.invokePendingSale();
      
//      this.view.btnLoadMoreUnderReview.setVisibility(false);
//     this.view.btnLoadMoreLive.setVisibility(false);
//     this.view.btnLoadMorePending.setVisibility(true);
        this.view.lblUnderReview.skin="sknLblDubai8e8e8e18px49";
   this.view.lblLiveAuctions.skin="sknLblDubai8e8e8e18px49";
    this.view.lblPending.skin="sknLblDubai231f2018px49"
  },
  
  
//     validateBargainAmount: function() {
//   var text = this.view.tbxBargainAmount.text.trim();

//   // Regex: starts with digits, optional comma, optional decimal, then space and AED
//   var regex = /^\d+(\.\d{1,2})?\sAED$/;

//   if (!regex.test(text)) {
//     this.view.lblBargainError.text = "Enter amount in format: 2499 AED";
//     this.view.lblBargainError.setVisibility(true);
//   } else {
//     this.view.lblBargainError.setVisibility(false);
//   }
    
//      if(this.view.tbxBargainAmount && this.view.tbxBargainAmount.text.trim()!== ""){
//          this.view.btnBargain.skin = "sknBtnBid61B35C8pxradius";
//        }
//        else{
//          this.view.btnBargain.skin = "sknBtnBidcccccc8pxradius";
//        }
// },
  
  validateBargainAmount: function() {
  var text = this.view.tbxBargainAmount.text.trim();
  var amount = Number(text);
  var isValid = true;

  if (amount <= (this.selectedWinningBid && this.selectedWinningBid.text)) {
    this.view.lblBargainError.text = "Bargain Amount should be more than winning bid";
    this.view.lblBargainError.setVisibility(true);
    isValid = false;
  } else {
    this.view.lblBargainError.setVisibility(false);
  }

  if (isValid && text !== "") {
    this.view.btnSubmitBargain.skin = "sknBtnDubaid3243718px";
    this.view.btnSubmitBargain.setEnabled(true);
  } else {
    this.view.btnSubmitBargain.skin = "sknBtnBidcccccc8pxradius";
    this.view.btnSubmitBargain.setEnabled(false);
  }
},
  
    setFilterToSeg: function(){
  var self = this;
  var searchText = self.view.tbxSearch.text.trim().toLowerCase();

  var config = {
    "under": {
      seg: self.view.segUnderReview,
      originalData: self.originalSegDataUnder,
      lblNoRecords: self.view.lblNoRecordsUnderReview,
      btnLoadMore: self.view.btnLoadMoreUnderReview
    },
    "live": {
      seg: self.view.segLiveAuctions,
      originalData: self.originalSegDataLive,
      lblNoRecords: self.view.lblNoRecordsLive,
      btnLoadMore: self.view.btnLoadMoreLive
    },
    "pending": {
      seg: self.view.segPending,
      originalData: self.originalSegDataPending,
      lblNoRecords: self.view.lblNoRecordsPending,
      btnLoadMore: self.view.btnLoadMorePending
    }
  };

  var currentConfig = config[self.currentSearch];
  if (!currentConfig || !currentConfig.originalData) return;

  if (searchText === "") {
    currentConfig.lblNoRecords.setVisibility(false);
    currentConfig.seg.setData(currentConfig.originalData);
    currentConfig.btnLoadMore.setVisibility(true);
    return;
  }

    var filteredData;
    if(self.currentSearch === "under"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblCarName.text.toLowerCase().includes(searchText);
  });
    }
     if(self.currentSearch === "live"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblCarname.text.toLowerCase().includes(searchText);
  });
    }
     if(self.currentSearch === "pending"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblCarName.text.toLowerCase().includes(searchText);
  });
    }

  currentConfig.seg.setData(filteredData);

  if (filteredData.length === 0) {
    currentConfig.lblNoRecords.setVisibility(true);
    currentConfig.btnLoadMore.setVisibility(false);
  } else {
    currentConfig.lblNoRecords.setVisibility(false);
    currentConfig.btnLoadMore.setVisibility(false);
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
    
   var searchText = (self.view.tbxSearch && self.view.tbxSearch.text ? self.view.tbxSearch.text : "").trim();
    
  // Decide which field to use
    if (!isNaN(searchText)) {
        self.lot = searchText;
        self.title = "";  // clear the other
    } else {
        self.title = searchText;
        self.lot = "";    // clear the other
    }
    
      if(self.currentSearch === "under"){
  this.pageSizeUnderReview = 10;
    this.currentOffsetUnderReview = 0;
    this.view.segUnderReview.setData([]);
    this.view.btnLoadMoreUnderReview.setVisibility(false);
        self.invokeUnderReview();
    }
     if(self.currentSearch === "live"){
  this.pageSizeLive = 10;
    this.currentOffSetLive = 0;
    this.view.segLiveAuctions.setData([]);
    this.view.btnLoadMoreLive.setVisibility(false);
       self.invokeLiveAuctions();
    }
     if(self.currentSearch === "pending"){
  this.pageSizePending = 10;
    this.currentOffSetPending = 0;
    this.view.segPending.setData([]);
    this.view.btnLoadMorePending.setVisibility(false);
       self.invokePendingSale();
    }
//     if (!searchText) return;

  

    
  },
  
  invokeUnderReview: function()
  {
    
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;
    var self = this;
    
    
    checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    
    var underReviewCars_InputParam = {};
    var user_fleet_my_vehicles_inputparam = {};
    
    user_fleet_my_vehicles_inputparam["serviceID"] = "fry_int_fleet$user-fleet-my-vehicles";
    user_fleet_my_vehicles_inputparam["user_id"] = userId;
    user_fleet_my_vehicles_inputparam["lot_no"] = self.lot || "";
    user_fleet_my_vehicles_inputparam["title"] = self.title || "";
    user_fleet_my_vehicles_inputparam["chassis_number"] = "";
    user_fleet_my_vehicles_inputparam["created_on"] ="" ;
    user_fleet_my_vehicles_inputparam["branch"] = "";
    user_fleet_my_vehicles_inputparam["asset_id"] = "ALL";
    user_fleet_my_vehicles_inputparam["page_number"] = "1";
    user_fleet_my_vehicles_inputparam["page_size"] = String(self.pageSizeUnderReview);
    user_fleet_my_vehicles_inputparam["is_rejected"]= "0";
    user_fleet_my_vehicles_inputparam["rejectnotes" ]="";

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
      
      var data = response.records;
      
      if(data && data.length > 0){
        self.view.lblNoRecordsUnderReview.setVisibility(false);
        self.setDataToUnderReviewSeg(data);
      }
      else{
        self.view.lblNoRecordsUnderReview.setVisibility(true);
        self.view.btnLoadMoreUnderReview.setVisibility(false);
//         alert("No records found");
      }

    });

    });
    
  },
  
  setDataToUnderReviewSeg: function(data)
  {
    var self = this;
    
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
   var segData = [];
//      self.view.segUnderReview.setData([]);
   var newRecords = data.slice(self.currentOffsetUnderReview);
    var damAvailable = voltmx.store.getItem("isDamAvailable");
   for (var i = 0; i < newRecords.length; i++) {
    var item = newRecords[i];
     var isDocPresent = !!item.documents && item.documents !=="N/A"
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
      "lblTargetSellingPrice": voltmx.i18n.getLocalizedString("Target Selling Price"),
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
        "opacity": isDocPresent ? 0.75 : 1,
//         "setEnabled": !isDocPresent,
        "text": voltmx.i18n.getLocalizedString("UPLOAD FILE"),
        "onClick": !isDocPresent ? self.onUploadClick.bind(self) : null
       
      }
    });
  }
//     self.originalSegDataUnder = segData;
   
      if (!self.originalSegDataUnder || self.currentOffsetUnderReview === 0) {
  self.originalSegDataUnder = segData;
} else {
  self.originalSegDataUnder = self.originalSegDataUnder.concat(segData);
}
   
    self.view.segUnderReview.addAll(segData);
    voltmx.application.dismissLoadingScreen();
     if (self.pageSizeUnderReview > data.length) {
     self.view.flxSegUnderReview.height = "98%";
    self.view.btnLoadMoreUnderReview.setVisibility(false);
  } else {
    self.view.flxSegUnderReview.height = "88%";
    self.view.btnLoadMoreUnderReview.setVisibility(true);
  }
      self.currentOffsetUnderReview += newRecords.length;
    
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
      if(fleet_wfstatus.user_message && fleet_wfstatus.user_message === "Your Vehicle has moved from Vehicle For Submission to Vehicle Submission Acceptance.")
        {
          new voltmx.mvc.Navigation("frmApprovedVehicles").navigate();
        }
      else{
//         alert(fleet_wfstatus.user_message);
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
  
  
    onAddRequest: function()
  {
     voltmx.store.setItem("NavForm","MyListings")
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
    
   var selectedItems = this.view.segUnderReview.selectedRowItems;

    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
        voltmx.print(" No row selected in segUnderReview");
        return;
    }

    var rowData = selectedItems[0];

    var objid = rowData.objid || "";
    var lotno = rowData.lotno || "";

    voltmx.store.setItem("objidForVI", objid);
    voltmx.store.setItem("lotidForVI", lotno);

    voltmx.print(" objid: " + objid + ", lotno: " + lotno);
 
    
    voltmx.store.setItem("originForm01","frmMyListings");
    var objid = voltmx.store.getItem("objidForVI");
    var lotId = voltmx.store.getItem("lotidForVI");
    
    
              voltmx.store.setItem("originForm", "frmMyListings");

   if(lotId&&objid){
     voltmx.store.setItem("comingFromDashboard", false);
    new voltmx.mvc.Navigation("frmServices").navigate({
        "previousFormID":"frmMyListings",
        "lotIdfromListings" : lotId,
       "objectIdfromListings": objid,
          "prevForm":"MyListings"
      
    });
    
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
  
  invokeLiveAuctions: function(){
    
   voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var self = this;
     checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
     var userObj = voltmx.store.getItem("userObject");
//     alert("usrobj"+userObj);
//     alert("userObj :"+JSON.stringify(userObj));
    var jobTitle = "";
      if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
     jobTitle = userObj.rawResponse.job_title;
      } else {
//     alert("Warning: job_title is missing from user object.");
      }

//     var jobTitle = userObj.rawResponse.job_title;
    var live_auctions_inputparam = {};
    
    live_auctions_inputparam["serviceID"] = "fry_int_management$live-auctions";
    live_auctions_inputparam["user_id"] = userId;
    live_auctions_inputparam["lotNoFilter"] = self.lot || "";
    live_auctions_inputparam["titleFilter"] = self.title || ""; 
    live_auctions_inputparam["chassisFilter"] = ""; 
    live_auctions_inputparam["locationFilter"] = "";
    live_auctions_inputparam["sellerFilter"] = "";
    live_auctions_inputparam["job_title"] = jobTitle; //get from userObject
    live_auctions_inputparam["seller_typeFilter"] = "";
    live_auctions_inputparam["aseet_id"] = "ALL";
    live_auctions_inputparam["page_number"] = "1";
    live_auctions_inputparam["page_size"] = String(self.pageSizeLive);
    live_auctions_inputparam["target_selling_price"] = "";

    var live_auctions_httpheaders = {
              "user_token": usertoken
    };
    live_auctions_inputparam["httpheaders"] = live_auctions_httpheaders;
    var live_auctions_httpconfigs = {};
    live_auctions_inputparam["httpconfig"] = live_auctions_httpconfigs;
    fry_int_management$live_auctions = 
      mfintegrationsecureinvokerasync(live_auctions_inputparam,
                                      "fry_int_management", 
                                      "live-auctions", 
                                      function(status,response){
      voltmx.application.dismissLoadingScreen();
//       alert("Status: "+status);
//       alert("response from Live Auctions:"+JSON.stringify(response));
       var data = response.records;
         if (Array.isArray(data) && data.length > 0) {              
           self.view.lblNoRecordsLive.setVisibility(false);
           self.setDataToLiveAuctions(data);
           
         }
      else{
        self.view.btnLoadMoreLive.setVisibility(false);
        self.view.lblNoRecordsLive.setVisibility(true);
//         alert("Data is not an array or is empty.");
            voltmx.print("Expected 'response.records' to be an array but got:", data);
                return;  // Exit early if the data structure is not as expected
      }
    });
     });
  },
  
  setDataToLiveAuctions: function(data)
  {
    var self = this;
     var segData = [];
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     var damAvailable = voltmx.store.getItem("isDamAvailable");
    this.view.segLiveAuctions.widgetDataMap = {
      "lblObjID":"lblObjID",
      "lblAuctionID":"lblAuctionID",
      "imgCarPIcture":"imgCarPIcture",
      "lblCarname":"lblCarname",
      "lblTimerCount":"lblTimerCount",
      "bidCloseTime":"bidCloseTime",
//       "lblLot":"lblLot",
      "lblLotNum":"lblLotNum",
      "lblYear":"lblYear",
      "lblYearVal":"lblYearVal",
//       "lblTotalBids":"lblTotalBids",
      "lblTotalBidsCount":"lblTotalBidsCount",
      "lblLocation":"lblLocation",
      "lblLocationName":"lblLocationName",
      "flxLikeHeart":"flxLikeHeart",
      "imgHeart":"imgHeart",
      "lblCurrentBid":"lblCurrentBid",
      "lblPrice": "lblPrice",
      "btnBidNow":"btnBidNow",
      "flxAutoBid":"flxAutoBid",
      "imgAutoBidicon":"imgAutoBidicon",
      "lblAutoBid":"lblAutoBid",
      "lblTotalBids": "lblTotalBids",
  "lblLot": "lblLot",
  "lblCarname": "lblCarname",
  "flxCurrentAuctions": "flxCurrentAuctions",
    "lblBidAmount":"lblBidAmount"
    }
    
//     self.view.segApprovedVehicles.setData([]);
     var newRecords = data.slice(self.currentOffSetLive);
    for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
//         var bidclosetime = self.getTimeRemainingString(item.bid_close_date);
        var userTargetTime = convertUTCtoUserTime(item.bid_close_date);
    var bidclosetime = getTimeRemainingString(userTargetTime);
        segData.push({
            "flxCurrentAuctions": {
  "reverseLayoutDirection": isArabic
},
          "lblCarname": 
          {
          "text": (item.title ? item.title.replace(/\s(19|20)\d{2}$/, "") : "N/A"),
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
          "imgCarPIcture": 
          {
           "src": (damAvailable && isValidURL(item.thumbnail_url)) ? item.thumbnail_url : "noimage.png",
           "imageWhileDownloading": "loading.gif"
          },
//           "lblTimerCount": bidclosetime,
           "lblTimerCount": {
        "text": bidclosetime,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLot": "Lot #",
          "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLotNum": item.lot_no || "N/A",
           "lblLotNum": {
        "text": item.lot_no || "N/A",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          
           "lblYear": {
        "text": voltmx.i18n.getLocalizedString("year"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
       "lblYearVal": {
        "text": item.year_of_making || "N/A",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblTotalBids": "Total Bids",
           "lblTotalBids": {
        "text": voltmx.i18n.getLocalizedString("Total Bids"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblTotalBidsCount": item.no_of_bids || "N/A",
           "lblTotalBidsCount": {
        "text": item.no_of_bids || "N/A",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblLocation": "Location",
           "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Mileage"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//            "lblBidAmount": "Bid Amount",
           "lblBidAmount": {
        "text": voltmx.i18n.getLocalizedString("current bid"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLocationName": item.location || "N/A",
                 "lblLocationName": {
        "text": item.milage || "-",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblPrice": item.current_bid != null ? "AED " + Math.round(item.current_bid) : "N/A",
           "lblPrice": {
        "text": item.current_bid != null ? "AED " + Math.round(item.current_bid) : "N/A",
//         "skin": bidrateSkin,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "objid": item.object_id,
          "aucid": item.auction_id
//           "lblAuctionId"        : "Auction ID",
//           "lblAuctionIdValue"    : "#"+item.lot_no || "N/A",
//           "objid": item.object_id,
//           "lblChassisNo"         : "Chassis No",
//           "lblChassisNoValue"    :item.chassis_number || "N/A",
//           "lblModel"             : "Model",
//           "lblModelValue"        : item.year_of_making || "N/A",
//           "lblTargetSellingPrice" : "Target Selling Price",
//           "lblTargetSelling"      : item.target_selling_price || "N/A",
//           "lblTargetSellingPriceAED" :"AED",
//           "lblLocation"              :"Location",
//           "lblLocationValue"         :item.location || "N/A",
//           "lblAuctionStarted"        :"Auction Started",
//           "lblAuctionStartedValue"   :item.auction_start_date || "N/A",
//           "lblAuctionEnded"          : "Auction Ended",
//           "lblAuctionEndedValue"     : self.formatAuctionDateTime(item.bid_close_date) || "N/A",
//           "lblNoBids"                :"N.Bids",
//           "lblNBidsValue"           : item.no_of_bids || "N/A",
//           "lblNoOfVisits"            :"Number Of Visits",
//           "lblNoOfVisitsValue"       : item.no_of_vistors || "N/A",
//           "lblMaxBid"                : "Max Bid",
//           "lblMaxBidAED"             : "AED",
//           "lblMaxBidValue"           : item.current_bid || "N/A"
          
        });
      }
     
//      self.originalSegDataLive = segData;
     if (!self.originalSegDataLive || self.currentOffSetLive === 0) {
  self.originalSegDataLive = segData;
} else {
  self.originalSegDataLive = self.originalSegDataLive.concat(segData);
}
    
     self.view.segLiveAuctions.addAll(segData);
    
    
     if (self.pageSizeLive > data.length) {
    self.view.flxSegLiveAuctions.height = "98%";
    self.view.btnLoadMoreLive.setVisibility(false);
  } else {
    self.view.flxSegLiveAuctions.height = "88%";
    self.view.btnLoadMoreLive.setVisibility(true);
  }
      self.currentOffSetLive += newRecords.length;
  },
  
    formatAuctionDateTime: function(rawDateTime) {
  if (!rawDateTime) return "N/A";

  // Remove .0 if present
  var cleaned = rawDateTime.split(".")[0];

  // Parse into a Date object
  var dateObj = new Date(cleaned.replace(" ", "T")); // ensures ISO format for parsing

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var month = months[dateObj.getMonth()];
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  var hours = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert to 12-hour format
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${month} ${day} ${year} ${hours}:${minutes}${ampm}`;
},
  
  invokePendingSale: function()
  {
    
    var self = this;
        voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;

    checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");               
    var Pending_Sale_Confirmation_inputparam = {};
   Pending_Sale_Confirmation_inputparam["serviceID"] = "fry_int_post_auction$pending-seller-approval-data";
   Pending_Sale_Confirmation_inputparam["user_id"] = userId;
   Pending_Sale_Confirmation_inputparam["lot_no"] = self.lot || ""; 
   Pending_Sale_Confirmation_inputparam["title"] = self.title || ""; 
   Pending_Sale_Confirmation_inputparam["chassis_number"] = ""; 
   Pending_Sale_Confirmation_inputparam["branch"] = "";
   Pending_Sale_Confirmation_inputparam["seller_type"] = "";
   Pending_Sale_Confirmation_inputparam["auction_ends"] = "";
   Pending_Sale_Confirmation_inputparam["seller_data"] = "";
   Pending_Sale_Confirmation_inputparam["asset_id"] = "ALL";
   Pending_Sale_Confirmation_inputparam["page"] = "1";
   Pending_Sale_Confirmation_inputparam["pagesize"] = String(self.pageSizePending);

  
    var Pending_Sale_httpheaders = {
              "user_token": usertoken
    };
   Pending_Sale_Confirmation_inputparam["httpheaders"] = Pending_Sale_httpheaders;
    var Pending_Sale_httpconfigs = {};
   Pending_Sale_Confirmation_inputparam["httpconfig"] = Pending_Sale_httpconfigs;
    fry_int_post_auction$pending_seller_approval_data = 
      mfintegrationsecureinvokerasync(Pending_Sale_Confirmation_inputparam,
                                      "fry_int_post_auction", 
                                      "pending-seller-approval-data", 
                                      function(status,response){
//       alert("Status: "+status);
//       alert("response from pending sale confirmation:"+JSON.stringify(response));
       voltmx.application.dismissLoadingScreen();
      if(response && response.records){
      var data = response.records;
      }
         if (Array.isArray(data) && data.length > 0) {  
           self.insertIntoSegPendingSale(data);
           self.view.lblNoRecordsPending.setVisibility(false);
//            self.view.lblNoRecordsPending.setVisibility(false);
         }
        else{
          self.view.btnLoadMorePending.setVisibility(false);
        self.view.lblNoRecordsPending.setVisibility(true);
        }
    });
    });
    
  },
  
  insertIntoSegPendingSale: function(data)
  {
    var self = this;
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var acceptText = voltmx.i18n.getLocalizedString("ACCEPT");
    var rejectText = voltmx.i18n.getLocalizedString("REJECT");
    var bargainText = voltmx.i18n.getLocalizedString("BARGAIN");
     var damAvailable = voltmx.store.getItem("isDamAvailable");
      self.view.segPending.widgetDataMap = {
   "lblCarName":"lblCarName",
  "imgCardata": "imgCardata",
  "lblLot": "lblLot",
  "lblLotValue": "lblLotValue",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
  "lblHighestBid": "lblHighestBid",
  "lblHighestBidValue": "lblHighestBidValue",
  "lblBuyerOffer": "lblBuyerOffer",
   "lblBuyerOfferValue":"lblBuyerOfferValue",
  "btnReject": "btnReject",
  "btnAccept": "btnAccept",
  "btnBargain": "btnBargain",
  "flxContactSupport": "flxContactSupport",
  "lblContactSupport": "lblContactSupport",
  "flxContactSupportInner":"flxContactSupportInner",
   "flxBuyerOffer":"flxBuyerOffer"
};
     var segData = [];
      
//     self.view.segApprovedVehicles.setData([]);
     var newRecords = data.slice(self.currentOffSetPending);
    for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
        var buyeroffer = item.buyer_offer || "0";
         var isBuyerOffer = buyeroffer !== "0";
         segData.push({
         "imgCardata" : {
    "src": (item.file_url && damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
            "imageWhileDownloading": "loading.gif"
         },
//           "lblCarName": item.title || "N/A",
          "lblCarName": {
        "text": item.title || "N/A",
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          "buyerid": item.buyer_id,
          "sellerid": item.seller_id,
           "negoid": item.nego_id,
//           "lblLot"        : "lot #",
            "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLotValue"    : item.lot_no || "N/A",
            "lblLotValue": {
        "text": item.lot_no || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblLocation"             : "Location",
             "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//            "lblLocationValue"         :item.location || "N/A",
            "lblLocationValue": {
        "text": item.location || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblHighestBid"      :"Highest Bid",
             "lblHighestBid": {
        "text": voltmx.i18n.getLocalizedString("Highest Bid"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblHighestBidValue"  :item.max_amount || "N/A",
             "lblHighestBidValue": {
        "text": item.max_amount || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "objid": item.object_id,
          "aucid": item.auction_id,
            "negoStatus": item.nego_status,
         "btnBargain" :
        {
          "text"   : bargainText,
          "skin"   : "sknbtnBGffffffRoundedBorder1px000000Font231f2045px",
       "onClick": this.bargainCall.bind(this)
//            "right": isArabic ? "" : "0dp",
//         "left": isArabic ? "0dp" : "",
        },
          "flxBuyerOffer": {
            "isVisible": isBuyerOffer
          },
//           "lblBuyerOffer": "Buyer Offer",
               "lblBuyerOffer": {
        "text": voltmx.i18n.getLocalizedString("Buyer Offer"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblBuyerOfferValue": buyeroffer || "N/A",
            "lblBuyerOfferValue": {
        "text": buyeroffer || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "btnReject" : 
          {
            "text"  : rejectText,
            "skin"   : "sknbtnBGffffffRoundedBorder1px000000Font231f2045px",
            "onClick": this.onRejectButtonClick.bind(this)
//                 "right": isArabic ? "0dp" : "",
//         "left": isArabic ? "" : "0dp",
            
          },
          "btnAccept"  :{
            "text" : acceptText,
            "skin"  : "sknBtn61b35cDubai45pxmedium",
            "onClick": this.onAcceptButtonClick.bind(this)
//             "right": isArabic ? "" : "0dp",
//         "left": isArabic ? "0dp" : "",
         
          },
             "imgContct" : "contactsupport512h.png",
//              "lblContactSupport" : "Contact Support",
             "flxBottomLineContactSupport" : {
             "skin": "sknflxBg231F20Opacity10per"
          },
          
          "flxContactSupportInner": {
            "onClick": this.goToContact.bind(this),
            
          },
          "flxContactSupport":{
            "reverseLayoutDirection": isArabic
          },
          
          "lblContactSupport": {
            "text": voltmx.i18n.getLocalizedString("contact support")
          }
          
        });
      }
     
//      self.originalSegDataPending = segData;
    
     if (!self.originalSegDataPending || self.currentOffSetPending === 0) {
  self.originalSegDataPending = segData;
} else {
  self.originalSegDataPending = self.originalSegDataPending.concat(segData);
}
    
     self.view.segPending.addAll(segData);
    
    
     if (self.pageSizePending > data.length) {
    self.view.flxSegPendingList.height = "98%";
    self.view.btnLoadMorePending.setVisibility(false);
  } else {
    self.view.flxSegPendingList.height = "88%";
    self.view.btnLoadMorePending.setVisibility(true);
  }
      self.currentOffSetPending += newRecords.length; 
    
  },
  
//     getTimeRemainingString: function(targetTimeString) {
//   try {
//     var now = new Date().getTime();
//     var target = new Date(targetTimeString).getTime();
//     var diff = target - now;

//     if (isNaN(target) || diff <= 0) {
//       return "0D 0H 0M 0S";
//     }

//     var seconds = Math.floor((diff / 1000) % 60);
//     var minutes = Math.floor((diff / (1000 * 60)) % 60);
//     var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     var days = Math.floor(diff / (1000 * 60 * 60 * 24));

//     return days + "D " + hours + "H " + minutes + "M ";
// //     + seconds + "S";
//   } catch (e) {
//     return "N/A";
//   }
// },
  
//   not working in ios
//   acceptCall: function()
//   {
// //     var selectedRow = this.view.segPending.selectedRowItems[0];
// //     var objid = selectedRow.objid;
// //     var aucid = selectedRow.aucid;
    
// //     this.callAcceptService(objid,aucid);
    
    
//           var selectedRowIndex = this.view.segPending.selectedRowIndex;
//   if (!selectedRowIndex || selectedRowIndex[1] == null) {
//     alert("No row selected.");
//     return;
//   }

//   var rowIndex = selectedRowIndex[1];
//   var segData = this.view.segPending.data;
//   var selectedItem = segData[rowIndex];

//   if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
//     alert("Missing vehicle details.");
//     return;
//   }

//   this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
    
//   },
  
    onAcceptButtonClick: function(eventobject, context) {
    this.acceptCall(context);
},

acceptCall: function(context) {
    var rowIndex = context.rowIndex;
    var segData = this.view.segPending.data;
    
    if (rowIndex == null || rowIndex === undefined) {
        alert("No row selected.");
        return;
    }

    var selectedItem = segData[rowIndex];
    if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
        alert("Missing vehicle details.");
        return;
    }

//     if(selectedItem && Number(selectedItem.lblBuyerOfferValue.text) === 0)
//   {
//     this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
//   }
//   else
//     {
//       this.callNegoService(selectedItem.objid, selectedItem.aucid, rowIndex);
//     }
  
  if (selectedItem) {
  let offerValue = 0;
  let negoStatus = "";

  if (
    selectedItem.lblBuyerOfferValue &&
    selectedItem.lblBuyerOfferValue.text
  ) {
    offerValue = Number(selectedItem.lblBuyerOfferValue.text);
  }

  if (selectedItem.negoStatus) {
    negoStatus = selectedItem.negoStatus.toLowerCase();
  }

  if (offerValue === 0) {
    // No negotiation, call workflow API
    this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
  } else if (negoStatus === "accepted") {
    // Negotiation exists and already accepted, call workflow API
    this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
  } else {
    // Negotiation exists but not accepted yet, call negotiation API
    this.callNegoService(selectedItem.objid, selectedItem.aucid, rowIndex);
  }
}
},
  
 callNegoService: function(objid,aucid,rowIndex)
  {
    var self = this;

   function doneCallBack(status, fleet_wfstatus) {
  voltmx.application.dismissLoadingScreen();
  voltmx.print(fleet_wfstatus);

  const successMsg = "Your Vehicle has moved from Pending Seller Approval to Approved by Seller.";

//   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
      if(fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (fleet_wfstatus.httpStatusCode === 200 || 
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200))
  
    ){
   
        self.callAcceptService(objid,aucid,rowIndex);
        
  } 
     
     else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
       
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
     
     else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
       if(self.view.SmthngWentWrong){
         self.view.SmthngWentWrong.setVisibility(true);
         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || "Some thing went wrong. Try again later";
       }
     
  }
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_post_auction$negotiation-acceptance";
    fleet_wfstatus_inputparam["auction_id"] = aucid;
    fleet_wfstatus_inputparam["status"] = "Accepted";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_post_auction", "negotiation-acceptance", doneCallBack);
    
    
  },
  
  //not working in ios
//   rejectCall: function()
//   {
//       this.view.flxRejectOrBargain.setVisibility(true);
//     this.view.flxOverLay.setVisibility(true);
    
//      var selectedItem = this.view.segPending.selectedRowItems;
//    var selectedRowIndex = this.view.segPending.selectedRowIndex;
   
//     if (selectedItem && selectedItem.length > 0) {
//        var rowIndex = selectedRowIndex[1];
//         var objid = selectedItem[0].objid;
//       var aucid = selectedItem[0].aucid;
//       var winningbid = selectedItem[0].lblHighestBidValue;
//        var  sellerid = voltmx.store.getItem("userId");
//       var buyerid = selectedItem[0].buyerid;
//       this.objidForReject = objid;
//       this.aucidForReject = aucid;
//       this.rowIdForReject = rowIndex;
//        this.selectedWinningBid = winningbid;
//        this.objidForBargain = objid;
//       this.aucidForBargain = aucid;
//       this.buyerIdForBargain = buyerid;
//       this.sellerIdForBargain = sellerid;
//       this.view.flxRejectOrBargain.setVisibility(true);
//       this.view.flxOverLay.setVisibility(true);
//     }
//     else{
//       alert("no row selected");
//     } 
//   },
  
    // Button's onClick handler
onRejectButtonClick: function(eventobject, context) {
    this.rejectCall(context);
},

// Updated rejectCall function
rejectCall: function(context) {
    var segment = this.view.segPending;
    var rowIndex = context.rowIndex;
    var segData = segment.data;

    if (!segData || rowIndex === null || rowIndex === undefined) {
        alert("No row selected");
        return;
    }

    var selectedItem = segData[rowIndex];
    if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
//         alert("Invalid row data");
        return;
    }
  this.negoId = null;
    var objid = selectedItem.objid;
    var aucid = selectedItem.aucid;
    var winningbid = selectedItem.lblHighestBidValue;
    var sellerid = voltmx.store.getItem("userId");
    var buyerid = selectedItem.buyerid;
   var negoid = selectedItem.negoid;
    this.objidForReject = objid;
    this.aucidForReject = aucid;
    this.rowIdForReject = rowIndex;
    this.selectedWinningBid = winningbid;
    this.objidForBargain = objid;
    this.aucidForBargain = aucid;
    this.buyerIdForBargain = buyerid;
    this.sellerIdForBargain = sellerid;
    this.negoId = negoid;
  
    this.view.flxRejectOrBargain.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
},
   
    bargainCall: function()
  {
     this.view.btnSubmitBargain.skin = "sknBtnBidcccccc8pxradius";
    this.view.tbxBargainAmount.text = "";
    this.view.lblBargainError.setVisibility(false);
    this.view.btnSubmitBargain.setEnabled(false);
    this.view.flxBargainContainer.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
    this.objidForBargain = null;
      this.aucidForBargain = null;
      this.buyerIdForBargain = null;
      this.sellerIdForBargain = null;
      this.negoId = null;
     var selectedItem = this.view.segPending.selectedRowItems;

   
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
      var auctionid = selectedItem[0].aucid;
      var winningbid = selectedItem[0].lblHighestBidValue;
      var negoid = selectedItem[0].negoid;
      var  sellerid = voltmx.store.getItem("userId");
      var buyerid = selectedItem[0].buyerid;
      this.objidForBargain = objectid;
      this.aucidForBargain = auctionid;
      this.buyerIdForBargain = buyerid;
      this.sellerIdForBargain = sellerid;
      this.selectedWinningBid = winningbid;
      this.negoId = negoid;
    }
    else{
//       alert("no row selected");
    } 
  },
  
//   callBargainService: function()
//   {
//     if(this.view.tbxBargainAmount.text!==""){
//        var self = this;
//     checkTokenValidatity(function() {
//     function bargainCallBack(status, negotiation) {
//       voltmx.print(negotiation);
//       self.view.flxBargainContainer.setVisibility(false);
//     self.view.flxOverLay.setVisibility(false);
//       alert(negotiation);
//     }
//     if (negotiation_inputparam == undefined) {
//         var negotiation_inputparam = {};
//     }
//       var userid = voltmx.store.getItem("userId");
//       var msg = self.view.txtAreaMessage && self.view.txtAreaMessage.text;
//     negotiation_inputparam["serviceID"] = "ms_post_auction$negotiation";
//     negotiation_inputparam["auction_id"] = self.aucidForBargain;
//     negotiation_inputparam["bargain_nego_price"] = String(self.view.tbxBargainAmount.text.trim());
//     negotiation_inputparam["buyer_id"] = self.buyerIdForBargain;
//       negotiation_inputparam["seller_id"] = self.sellerIdForBargain;
//       negotiation_inputparam["message"] = msg;
//     var negotiation_httpheaders = {};
//     negotiation_inputparam["httpheaders"] = negotiation_httpheaders;
//     var negotiation_httpconfigs = {};
//     negotiation_inputparam["httpconfig"] = negotiation_httpconfigs;
//     ms_post_auction$negotiation = mfintegrationsecureinvokerasync(negotiation_inputparam, "ms_post_auction", "negotiation", bargainCallBack);
//     });
//     }
//     else{
//       alert("Enter amount");
//     }
    
//   },
  
//   callBargainService: function()
//   {
//       var self = this;
//     checkTokenValidatity(function() {
//     if(!self.view.lblBargainError.isVisible){
//     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      
//       var baseURL = voltmx.store.getItem("BASE_URL");
//       if(baseURL){
//       if (!baseURL.endsWith("/")) {
//       baseURL += "/";
//     }
//       }
      
//     var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
//    var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
//     var encodeVal = base64Encode(appkey + ":" + appsecret);
//      var ev = encodeVal;
//      var url = baseURL +"services/ms_post_auction/api/v1/negotiation";
//       var usertoken = voltmx.store.getItem("getUserAccesstoken");
//       try {
        
//           var request = new voltmx.net.HttpRequest();
//       request.open("POST", url);
//        request.setRequestHeader("Authorization","Basic "+ev);
//         request.setRequestHeader("Content-Type", "application/json");
//         request.setRequestHeader("user_token",usertoken);
//         var msg = self.view.txtAreaMessage && self.view.txtAreaMessage.text;
//         // Get and clean amount from text box
//         var rawAmount = self.view.tbxBargainAmount.text || "";
//         var amountOnly = rawAmount.replace(" AED", "").trim();

//         // Convert to number safely
//         var parsedAmount = Number(amountOnly);
       

//         var negotiation_inputparam = {
//         auction_id: self.aucidForBargain,
//         bargain_nego_price: parsedAmount,
//         buyer_id: self.buyerIdForBargain,
//         seller_id: self.sellerIdForBargain,
//         message: msg
//     };

//     // Send JSON string
//     request.send(JSON.stringify(negotiation_inputparam));
        
//       request.onReadyStateChange = function () {
//   if (request.readyState === 4) {
//     voltmx.application.dismissLoadingScreen();

//     if (request.status === 200) {
//       var response = JSON.parse(request.responseText);
//       voltmx.print("Negotiation response: " + JSON.stringify(response));

//       if (response && response.data && response.data.id) {
// //         alert("Success: " + response.message);  
//         self.view.flxBargainSuccessPopup.setVisibility(true);
//         self.view.flxOverLay.setVisibility(true);
//         self.view.flxBargainContainer.setVisibility(false);
//       } else {
//         alert(" Failed to submit negotiation. Please try again."); 
//       }
//     } else {
//       alert("Error: Server returned status " + request.status);
//     }
//   }
// };

        
        
        
//       }
//     catch(error){
//       alert("Error: " + error.message);
//     }
//     }
//     });
    
//   },
  
  callBargainService: function() {

  var self = this;
 
//   var rawAmount = self.view.tbxBargainAmount.text.trim();

     try {

    var rawAmount = self.view.tbxBargainAmount.text.trim();

    voltmx.print("Bargain amount:", rawAmount);

} catch (error) {

   voltmx.print("Error while getting bargain amount:", error);

}

  if (rawAmount === "") {

    self.view.lblBargainError.text = "Please enter a bargain amount.";

    self.view.lblBargainError.setVisibility(true);

    return; // stop execution

  }
 
  var amountOnly = rawAmount.replace(" AED", "").trim();

  var parsedAmount = Number(amountOnly);
 
  if (parsedAmount <= self.selectedWinningBid.text) {

    self.view.lblBargainError.text = "Bargain Amount should be more than winning bid.";

    self.view.lblBargainError.setVisibility(true);

    return; // stop execution

  }
 
  // If error is still visible for some reason, block service call

  if (self.view.lblBargainError.isVisible) {

    return;

  }
 
  checkTokenValidatity(function() {

    voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {

      shouldShowLabelInBottom: "true",

      separatorHeight: 45,

      progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,

      progressIndicatorColor: "Gray"

    });
 
    var baseURL = voltmx.store.getItem("BASE_URL");

    if (baseURL && !baseURL.endsWith("/")) {

      baseURL += "/";

    }
 
    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");

    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var url = baseURL + "services/ms_post_auction/api/v1/negotiation";

    var usertoken = voltmx.store.getItem("getUserAccesstoken");

    var msg = self.view.txtAreaMessage && self.view.txtAreaMessage.text;
 
    var negotiation_inputparam = {

      parent_id: Number(self.negoId),

      auction_id: self.aucidForBargain,

      bargain_nego_price: parsedAmount,

      buyer_id: self.buyerIdForBargain,

      seller_id: self.sellerIdForBargain,

      message: msg

    };
 
    try {

      var request = new voltmx.net.HttpRequest();

      request.open("POST", url);

      request.setRequestHeader("Authorization", "Basic " + encodeVal);

      request.setRequestHeader("Content-Type", "application/json");

      request.setRequestHeader("user_token", usertoken);
 
      request.send(JSON.stringify(negotiation_inputparam));
 
      request.onReadyStateChange = function() {

        if (request.readyState === 4) {

          voltmx.application.dismissLoadingScreen();
 
          if (request.status === 200) {

            var response = JSON.parse(request.responseText);

            voltmx.print("Negotiation response: " + JSON.stringify(response));
 
            if (response && response.data && response.data.id) {

              self.view.flxBargainSuccessPopup.setVisibility(true);

              self.view.flxOverLay.setVisibility(true);

              self.view.flxBargainContainer.setVisibility(false);

            } else {

//               alert("Failed to submit negotiation. Please try again.");

                            if(response && response.error && response.error.message)

                {

                    if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text = response.error.message;

                      return;

       }

                }

                if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Some thing went wrong. Try again later";

       }

            }

          } else {

                 var response = JSON.parse(request.responseText);

                          if(response && response.error && response.error.message)

                {

                    if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text = response.error.message;

                      return;

       }

                }

             if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Some thing went wrong. Try again later";

       }

          }

        }

      };

    } catch (e) {

      voltmx.application.dismissLoadingScreen();

       if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Some thing went wrong. Try again later";

       }

//       alert("An error occurred while submitting the negotiation.");

    }

  });

},
 
 openBargainClosePopup: function(){
   this.view.flxBargainContainer.setVisibility(true);
   this.view.flxRejectOrBargain.setVisibility(false);
 },
  
//    callAcceptService: function(objid,aucid)
//   {
//     var self = this;

//     function invokeAcceptCallBack(status, negotiation_acceptance) {
//   voltmx.print(negotiation_acceptance);

//   if (
//     negotiation_acceptance &&
//     negotiation_acceptance.message === "Negotiation offer details updated successfully"
//   ) {
//     self.view.flxAcceptPopup.setVisibility(true);
//     self.view.flxOverLay.setVisibility(true);
//   } else {
//     var errorMessage = "Something went wrong. Please try again.";

//     if (
//       negotiation_acceptance &&
//       negotiation_acceptance.error &&
//       negotiation_acceptance.error.message
//     ) {
//       self.view.flxOverLay.setVisibility(false);
//       errorMessage = negotiation_acceptance.error.message;
//     } else if (
//       negotiation_acceptance &&
//       negotiation_acceptance.errmsg
//     ) {
//       self.view.flxOverLay.setVisibility(false);
//       errorMessage = negotiation_acceptance.errmsg;
//     }

//     alert(errorMessage);
//   }
// }

//     if (negotiation_acceptance_inputparam == undefined) {
//         var negotiation_acceptance_inputparam = {};
//     }
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     negotiation_acceptance_inputparam["serviceID"] = "ms_post_auction$negotiation-acceptance";
//     negotiation_acceptance_inputparam["auction_id"] = aucid;
//      negotiation_acceptance_inputparam["status"] = "accepted";
//     var negotiation_acceptance_httpheaders = {
//       "user_token": usertoken
//     };
//     negotiation_acceptance_inputparam["httpheaders"] = negotiation_acceptance_httpheaders;
//     var negotiation_acceptance_httpconfigs = {};
//     negotiation_acceptance_inputparam["httpconfig"] = negotiation_acceptance_httpconfigs;
//     ms_post_auction$negotiation_acceptance = mfintegrationsecureinvokerasync(negotiation_acceptance_inputparam, "ms_post_auction", "negotiation-acceptance", invokeAcceptCallBack);

    
    
//   },
  
  
  //Fry-wf added while ...
  callAcceptService: function(objid,aucid,rowIndex)
  {
    
     var self = this;

   function doneCallBack(status, fleet_wfstatus) {
  voltmx.application.dismissLoadingScreen();
  voltmx.print(fleet_wfstatus);

  const successMsg = "Your Vehicle has moved from Pending Seller Approval to Approved by Seller.";

//   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
     if(fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (fleet_wfstatus.httpStatusCode === 200 || 
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)) &&
  fleet_wfstatus.data
    ){
    self.view.flxAcceptPopup.setVisibility(true);
    self.view.flxOverLay.setVisibility(true);
    
      if (typeof rowIndex === "number") {
        self.view.segPending.removeAt(rowIndex);
        
        // ✅ Optional: check if segment is now empty
        if (self.view.segPending.data.length === 0) {
          self.view.lblNoRecordsPending.setVisibility(true);
          self.view.btnLoadMorePending.setVisibility(false);
        }
      }
  }
     else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
       
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
     else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
        if(self.view.SmthngWentWrong){
         self.view.SmthngWentWrong.setVisibility(true);
         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || "Some thing went wrong. Try again later";
       }
  }
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objid;
    fleet_wfstatus_inputparam["action_name"] = "Accepted";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);
    
    
  },
  
 //Fry-wf for while
  callRejectService: function()
  {
    
     var self = this;


    function doneCallBack(status, fleet_wfstatus) {
  voltmx.application.dismissLoadingScreen();
  voltmx.print(fleet_wfstatus);
  self.view.flxRejectOrBargain.setVisibility(false);
  const successMsg = "Your Vehicle has moved from Pending Seller Approval to Unsold.";

//   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
    if(fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (fleet_wfstatus.httpStatusCode === 200 || 
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)) &&
  fleet_wfstatus.data
    ){
    self.view.flxApologyRejected.setVisibility(true);
    self.view.flxOverLay.setVisibility(true);
    

    if (typeof self.rowIdForReject === "number") {
      self.view.segPending.removeAt(self.rowIdForReject);

      // Optional: Show "No records" if segment is empty
      if (self.view.segPending.data.length === 0) {
        self.view.lblNoRecordsPending.setVisibility(true);
        self.view.btnLoadMorePending.setVisibility(false);
      }
    }
    }
    else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
       
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
    
     else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
     if(self.view.SmthngWentWrong){
         self.view.SmthngWentWrong.setVisibility(true);
         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || "Some thing went wrong. Try again later";
       }
  }
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = self.objidForReject;
    fleet_wfstatus_inputparam["action_name"] = "Rejected";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);
    
    
  },
  
//     callRejectService: function()
//   {
    
//      var self = this;
//     self.view.flxRejectOrBargain.setVisibility(false);
//       function invokeAcceptCallBack(status, negotiation_acceptance) {
//   voltmx.print(negotiation_acceptance);

//   if (
//     negotiation_acceptance &&
//     negotiation_acceptance.message === "Negotiation offer details updated successfully"
//   ) {
//     self.view.flxApologyRejected.setVisibility(true);
//         self.view.flxOverLay.setVisibility(true);
//          self.view.flxRejectOrBargain.setVisibility(false);
//   } else {
//     var errorMessage = "Something went wrong. Please try again.";

//     if (
//       negotiation_acceptance &&
//       negotiation_acceptance.error &&
//       negotiation_acceptance.error.message
//     ) {
//       errorMessage = negotiation_acceptance.error.message;
//     } else if (
//       negotiation_acceptance &&
//       negotiation_acceptance.errmsg
//     ) {
//       self.view.flxOverLay.setVisibility(false);
//       errorMessage = negotiation_acceptance.errmsg;
//     }
//     self.view.flxOverLay.setVisibility(false);
//     alert(errorMessage);
//   }
// }
//     if (negotiation_acceptance_inputparam == undefined) {
//         var negotiation_acceptance_inputparam = {};
//     }
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     negotiation_acceptance_inputparam["serviceID"] = "ms_post_auction$negotiation-acceptance";
//     negotiation_acceptance_inputparam["auction_id"] = self.aucidForReject;
//      negotiation_acceptance_inputparam["status"] = "rejected";
//     var negotiation_acceptance_httpheaders = {
//       "user_token": usertoken
//     };
//     negotiation_acceptance_inputparam["httpheaders"] = negotiation_acceptance_httpheaders;
//     var negotiation_acceptance_httpconfigs = {};
//     negotiation_acceptance_inputparam["httpconfig"] = negotiation_acceptance_httpconfigs;
//     ms_post_auction$negotiation_acceptance = mfintegrationsecureinvokerasync(negotiation_acceptance_inputparam, "ms_post_auction", "negotiation-acceptance", invokeAcceptCallBack);

    
//   },
  
 adjustRTLLayout: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
    if (isArabic) {
          this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblMyBidsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;

     }
     else{
       this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblMyBidsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();

     }
    
    this.view.lblUnderReview.text = voltmx.i18n.getLocalizedString("Under Review");
    this.view.lblLiveAuctions.text = voltmx.i18n.getLocalizedString("Live Auctions");
    this.view.lblPending.text = voltmx.i18n.getLocalizedString("Pending");
    this.view.lblMyBidsHeading.text = voltmx.i18n.getLocalizedString("Listings");
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
      this.view.lblRegisterAs.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
     this.view.lblChooseFromFile.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE"); 
     this.view.lblChooseFromLibrary.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
     this.view.cam.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
     this.view.btnSubmitForUpload.text = voltmx.i18n.getLocalizedString("Submit");

     this.view.CopyflxToggles0a570cc69f1d247.reverseLayoutDirection = isArabic;
    this.view.flxSearchContainer.reverseLayoutDirection = isArabic;
    this.view.tbxSearch.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblSelectIncrement.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblMessagetobyer.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.tbxBargainAmount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.btnLoadMoreUnderReview.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.btnLoadMoreLive.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.btnLoadMorePending.text =  voltmx.i18n.getLocalizedString("Load more");
    this.view.lblNoRecordsPending.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.lblNoRecordsUnderReview.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.lblNoRecordsLive.text = voltmx.i18n.getLocalizedString("No Records");
    
    
         this.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Kindly enter the amount you want for your product");
     this.view.lblMessagetobyer.text = voltmx.i18n.getLocalizedString("Message To Buyer");
      this.view.tbxBargainAmount.placeholder = voltmx.i18n.getLocalizedString("Bargain Amount");
     this.view.btnBargain.text = voltmx.i18n.getLocalizedString("BARGAIN");
     this.view.btnSubmitBargain.text = voltmx.i18n.getLocalizedString("Submit");
     this.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("You've rejected the online bid! Would you like to bargain with the bidder instead?");
     this.view.btnRejectFromPopup.text = voltmx.i18n.getLocalizedString("REJECT");
     this.view.btnBargainFromPopup.text = voltmx.i18n.getLocalizedString("BARGAIN");
     this.view.lblApology.text = voltmx.i18n.getLocalizedString("Apologies! Bid Rejected. Relist your vehicle or customer support will contact you soon.\nDetails in the 'Unsold' section of My Vehicles");
     this.view.btnCloseApology.text = voltmx.i18n.getLocalizedString("Close");
     this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Awesome!");
     this.view.CopylblSuccessMsg0f95c42d8d04644.text = voltmx.i18n.getLocalizedString("The highest bidder has been intimated. You can check the payment status in the 'Approved' section of My Vehicles.");
     this.view.btnCloseAcceptPopup.text = voltmx.i18n.getLocalizedString("Close");
     this.view.CopyLabel0d56568fbcc7440.text = voltmx.i18n.getLocalizedString("Hurray!");
     this.view.CopylblSuccessMsg0c7ad2f87becd44.text = voltmx.i18n.getLocalizedString("The buyer has been intimated. You can check the status of your offer in the 'Pending Sale' section");
     this.view.btnCloseBargainSuccesspopup.text = voltmx.i18n.getLocalizedString("Close");
  },
  
  goToContact: function()
  {
    voltmx.store.setItem("contactBackForm","frmMyListings");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
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

      voltmx.print("✅ Base64 Image Uploaded: " + base64Data);
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
  
  fleetDocUpload: function()
  {
     var self = this;
     voltmx.application.showLoadingScreen(null, "Uploading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    var userobj = voltmx.store.getItem("userObject");
    var isorg = userobj.rawResponse.is_org;
    // Sample code to fetch the integration service details with passthrough 
var serviceName = "fry_collection";   
// Get an instance of SDK
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
        "lot_no":self.lotidforfleet,
        "file_details": [
            {
                "is_thumbnail": "true",
                "filename": self.selectedPdfFileName,
                "base64": self.selectedPdfBase64,
             "type":"Possession_Letter",
          "sub_type":"Possession_Letter"
            }
        ],
        "user_token": userToken
};
var headers = {
//     "custom-header-key1": "custom-header-value1"
}; //If there are no headers, pass null
    
     self.view.flxUploadingProgressBar.setVisibility(true);
self.view.flxInnerBar.width = "0%";
self.startProgressSimulation();
// options is an optional parameter that helps in configuring the network layer.
integrationSvc.invokeOperation(
    operationName,
    headers,
    params,
    function (response) {
      voltmx.application.dismissLoadingScreen();
        voltmx.print("Integration Service Response is: " + JSON.stringify(response));
        
        try {
            if (response && response.rawResponse) {
                const rawResp = response.rawResponse;
                const opStatus = rawResp.opstatus;

                if (opStatus === 0 && rawResp.response) {
                    let parsedResponse = JSON.parse(rawResp.response);

                    if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
                        let errorCode = parsedResponse[0].error_code;

                        if (errorCode === "409") {
                          if(self.view.SmthngWentWrong){
                            self.view.flxUploadingProgressBar.setVisibility(false);
                            self.view.SmthngWentWrong.setVisibility(true);
                            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "File already exists. Please rename.";
                          }
//                             alert("File already exists. Please rename.");
                            return;
                        }
                    }

                    // Success case if no error_code present
//                     if(self.view.SmthngWentWrong){
//                             self.view.SmthngWentWrong.setVisibility(true);
//                             self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Document uploaded successfully.";
//                           }
//                     alert("Document uploaded successfully.");
                    if(self.view.Success){
                      self.view.flxInnerBar.width = "100%";
                      self.view.flxUploadingProgressBar.setVisibility(false);
                      self.view.Success.setVisibility(true);
                      self.view.Success.lblSuccessmsg.text = "Document uploaded successfully.";      
                    }
                    return;
                }
            }

            // Catch all unexpected response cases
           if(self.view.SmthngWentWrong){
             self.view.flxUploadingProgressBar.setVisibility(false);
                            self.view.SmthngWentWrong.setVisibility(true);
                            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
                          }
//             alert("Unexpected response. Please try again.");
        } catch (e) {
          
            voltmx.print("Exception while processing response: " + e.message);
          if(self.view.SmthngWentWrong){
            self.view.flxUploadingProgressBar.setVisibility(false);
                            self.view.SmthngWentWrong.setVisibility(true);
                            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
                          }
//             alert("An error occurred while processing the response.");
        }
    },
    function (error) {
      voltmx.application.dismissLoadingScreen();
        voltmx.print("Integration Service Failure: " + JSON.stringify(error));
       if(self.view.SmthngWentWrong){
         self.view.flxUploadingProgressBar.setVisibility(false);
                            self.view.SmthngWentWrong.setVisibility(true);
                            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Some thing went wrong. Try again";
                          }
//         alert("Upload failed. Please try again later.");
    },
    {
        "passthrough": true
    }
);

  }
  
 
   

 });