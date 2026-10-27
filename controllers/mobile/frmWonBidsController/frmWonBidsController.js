define({

  onNavigate: function() 
  {
    
    this.adjustRTLLayout();
    this.userid = voltmx.store.getItem("userId");
  this.view.preShow = this.onPreShow.bind(this);
  this.view.postShow = this.onPostShow.bind(this);
    
    this.view.flxApprovedBids.onClick =this.ActiveBidsToggle.bind(this);
//    this.view.flxRejectedBids.onClick =this.winningBidsToggle.bind(this);
    this.view.flxPendingBids.onClick =this.lostBidToggle.bind(this);
    
    this.view.btnLoadMore.onClick = this.onLoadMoreApp.bind(this);
    this.view.btnLoadMoreRejected.onClick = this.onLoadMoreRej.bind(this);
    this.view.btnLoadMorePending.onClick = this.onLoadMorePen.bind(this);
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
      this.view.segActiveBidList.onRowClick = this.onRowClickActionApproved.bind(this);
      this.view.segPendingList.onRowClick = this.onRowClickActionPending.bind(this);
    
    this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmOpenMyVehicles").navigate();
    }.bind(this);
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
    
    this.view.btnClose.onClick =() =>this.view.flxAccountDetailsContainer.setVisibility(false);
  },
  
   onPreShow: function(){
    loginToDam();
    this.pageSizeApp = 10;
    this.currentOffsetApp = 0;
    this.view.segActiveBidList.setData([]);
     
      this.view.tbxSearch.text = "";
     
     this.lot = "";
     this.title = ""; 
     if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
      if(this.view.flxUploadingProgressBar){
       this.view.flxUploadingProgressBar.setVisibility(false);
     }
//      if(this.view.flxError){
//       this.view.flxError.setVisibility(false);
//     }
//      if(this.view.flxServiceError){
//        this.view.flxServiceError.setVisibility(false);
//      }
     if(this.view.lblNorecordsPending){
       this.view.lblNorecordsPending.setVisibility(false);
     }
      if(this.view.lblNorecordsApproved){
       this.view.lblNorecordsApproved.setVisibility(false);
     }
    this.pageSizeRej = 10;
    this.currentOffsetRej = 0;
    this.view.segRejectedList.setData([]);
     
     this.pageSizePen = 10;
    this.currentOffsetPen = 0;
    this.view.segPendingList.setData([]);
     this.currentSearch = "approved";
     this.view.flxOverLay.setVisibility(false);
//      this.view.flxBargainContainer.setVisibility(false);
   this.view.flxRejectOrBargain.setVisibility(false);
     this.view.flxAcceptPopup.setVisibility(false);
     this.view.flxApologyRejected.setVisibility(false);
    this.toggleFooterIcons();
     this.ActiveBidsToggle();
     this.showBankAccount();
//     this.invokeWinningBidsServiceApproved();
//     this.invokeWinningBidsServiceRejected();
//     this.invokeWinningBidsServicePending();
    
  },
  
  onPostShow: function()
  {
    this.view.btnBargainFromPopup.onClick = this.openBargainClosePopup.bind(this);
    this.view.btnRejectFromPopup.onClick = this.callRejectService.bind(this);
      this.view.flxChooseFromLibrary.onClick = this.chooseFromLibrary.bind(this);
//     this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    if(this.view.flxBottomFileUpload){
      this.view.flxBottomFileUpload.setVisibility(false);
    }
     //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif
     //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif
    
    this.view.cam.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
  

    this.view.flxRemoveRejectBargainPopup.onClick = () =>{
      this.view.flxRejectOrBargain.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    
     this.view.btnCloseBargainSuccesspopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false); 
     }
     
     this.view.flxRemoveBargainPopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false); 
     }
    
      this.view.flxOverLay.onClick = () =>{
       if(this.view.flxBargainContainer.isVisible){
     this.view.flxBargainContainer.setVisibility(false);
     this.view.flxOverLay.setVisibility(false);
     }
      }
     
    this.view.tbxBargainAmount.onTextChange = this.validateBargainAmount.bind(this);
    
    this.view.flxRemoveApologyRejected.onClick = () => {
      this.view.flxApologyRejected.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
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
    
    if(this.view.flxOverLay)
      {
        if(this.view.flxBargainContainer){
            this.view.flxBargainContainer.setVisibility(false);
            
        }
      }
    if(this.view.flxBargainContainer){
     this.view.flxBargainContainer.setVisibility(false);
    }
    this.view.flxClose.onClick = () =>{
      this.view.flxBottomFileUpload.setVisibility(false);
    }
    this.view.btnLoadMorePending.setVisibility(false);
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
    
    this.view.btnSubmitBargain.onClick = this.callBargainService.bind(this);
    
  },
  
  validateBargainAmount: function() {
  var text = this.view.tbxBargainAmount.text.trim();
  var amount = Number(text);
  var isValid = true;

  if (amount <= (this.selectedWinningBid && this.selectedWinningBid.text)) {
    this.view.lblBargainError.text = voltmx.i18n.getLocalizedString("Bargain Amount should be more than winning bid");
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
   
    setFilterToSeg: function() {
  var self = this;
  var searchText = self.view.tbxSearch.text.trim().toLowerCase();

  var config = {
    "approved": {
      seg: self.view.segActiveBidList,
      originalData: self.originalSegDataActive,
      lblNoRecords: self.view.lblNorecordsApproved,
      btnLoadMore: self.view.btnLoadMore
    },
   
    "pending": {
      seg: self.view.segPendingList,
      originalData: self.originalSegDataPending,
      lblNoRecords: self.view.lblNorecordsPending,
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
    if(self.currentSearch === "approved"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblWinningmodelname.text.toLowerCase().includes(searchText);
  });
    }
     if(self.currentSearch === "won"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblWinningmodelname.toLowerCase().includes(searchText);
  });
    }
     if(self.currentSearch === "pending"){
   filteredData = currentConfig.originalData.filter(function(item) {
    return item.lblWinningmodelname.text.toLowerCase().includes(searchText);
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
    
    
      if(self.currentSearch === "approved"){
  this.pageSizeApp = 10;
    this.currentOffsetApp = 0;
    this.view.segActiveBidList.setData([]);
    this.view.btnLoadMore.setVisibility(false);
        self.invokeWinningBidsServiceApproved();
    }
   
     if(self.currentSearch === "pending"){
  this.pageSizePen = 10;
    this.currentOffsetPen = 0;
    this.view.segPendingList.setData([]);
    this.view.btnLoadMorePending.setVisibility(false);
       self.invokeWinningBidsServicePending();
    }
//     if (!searchText) return;

  

    
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
  
  onLoadMoreApp: function()
  {

  this.pageSizeApp += 10;
  this.invokeWinningBidsServiceApproved();
  },
  onLoadMoreRej: function()
  {
  voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

  this.pageSizeRej += 10;
  this.invokeWinningBidsServiceRejected();
  },
  onLoadMorePen: function()
  {
  this.pageSizePen += 10;
  this.invokeWinningBidsServicePending();
  },
  
 invokeWinningBidsServiceApproved: function()
  {
      var self = this;
   voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     checkTokenValidatity(function() {
//    var currentLocale = voltmx.store.getItem("currentLocale");
   var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function serviceCallBack(status, get_buyer_my_winning_bids) {
      voltmx.print(get_buyer_my_winning_bids);
      voltmx.application.dismissLoadingScreen();
      
      
       if (
        get_buyer_my_winning_bids &&
        get_buyer_my_winning_bids.opstatus === 0 &&
        get_buyer_my_winning_bids.httpresponse &&
        get_buyer_my_winning_bids.httpresponse.responsecode === 200 &&
        Array.isArray(get_buyer_my_winning_bids.records)
       ) {

         if (self.view.flxError) self.view.flxError.setVisibility(false);
         if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);

         var records = get_buyer_my_winning_bids.records;


         if(records && records.length > 0){
         self.insertIntoWinningBidsSegment(records);
          self.view.lblNorecordsApproved.setVisibility(false);
         }
         else{
        self.view.lblNorecordsApproved.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
         }

    } else {
//         alert('Some thing went wrong');
//        self.view.SmthngWentWrong.setVisibility(true);
      
//         voltmx.print("Invalid response structure or status.");
      
      
        
         if (
            get_buyer_my_winning_bids &&
            get_buyer_my_winning_bids.errcode &&
          Number(get_buyer_my_winning_bids.errcode) === 1011
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
    }
      
    }
        var get_buyer_my_winning_bids_inputparam = {};

    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_my_winning_bids_inputparam["serviceID"] = "fry_int_buyer$get-buyer-my-winning-bids";
     get_buyer_my_winning_bids_inputparam["user_id"] = userid;
     get_buyer_my_winning_bids_inputparam["status"] = "Approved";
     get_buyer_my_winning_bids_inputparam["page"] = "1";
     get_buyer_my_winning_bids_inputparam["lot_no"] = self.lot || "";
    get_buyer_my_winning_bids_inputparam["title"] = self.title || "";
     get_buyer_my_winning_bids_inputparam["pageSize"] = String(self.pageSizeApp);
    get_buyer_my_winning_bids_inputparam["language"] = currentLocale || "en";
    var get_buyer_my_winning_bids_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_my_winning_bids_inputparam["httpheaders"] = get_buyer_my_winning_bids_httpheaders;
    var get_buyer_my_winning_bids_httpconfigs = {};
    get_buyer_my_winning_bids_inputparam["httpconfig"] = get_buyer_my_winning_bids_httpconfigs;
    fry_int_buyer$get_buyer_my_winning_bids = mfintegrationsecureinvokerasync(get_buyer_my_winning_bids_inputparam, "fry_int_buyer", "get-buyer-my-winning-bids", serviceCallBack);
     });
  },
  
  invokeWinningBidsServiceRejected: function()
  {
     var self = this;

    function serviceCallBack(status, get_buyer_my_winning_bids) {
      voltmx.print(get_buyer_my_winning_bids);
      
       if (
        get_buyer_my_winning_bids &&
        get_buyer_my_winning_bids.opstatus === 0 &&
        get_buyer_my_winning_bids.httpresponse &&
        get_buyer_my_winning_bids.httpresponse.responsecode === 200 &&
        Array.isArray(get_buyer_my_winning_bids.records)
    ) {
          var records = get_buyer_my_winning_bids.records;
        

          if(records && records.length > 0){
//           self.insertIntoRejectedList(records);
//           self.view.lblNorecords.setVisibility(false);
         }
         else{
//         self.view.lblNorecords.setVisibility(true);
//         self.view.btnLoadMore.setVisibility(false);
         }
    

    } else {
        self.view.SmthngWentWrong.setVisibility(true);
        voltmx.print("Invalid response structure or status.");
    }
      
    }
//     if (get_buyer_my_winning_bids_inputparam == undefined) {
        var get_buyer_my_winning_bids_inputparam = {};
//     }
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_my_winning_bids_inputparam["serviceID"] = "fry_int_buyer$get-buyer-my-winning-bids";
     get_buyer_my_winning_bids_inputparam["user_id"] = userid;
     get_buyer_my_winning_bids_inputparam["status"] = "Rejected";
     get_buyer_my_winning_bids_inputparam["page"] = "1";
     get_buyer_my_winning_bids_inputparam["pageSize"] = String(self.pageSizeRej);
    var get_buyer_my_winning_bids_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_my_winning_bids_inputparam["httpheaders"] = get_buyer_my_winning_bids_httpheaders;
    var get_buyer_my_winning_bids_httpconfigs = {};
    get_buyer_my_winning_bids_inputparam["httpconfig"] = get_buyer_my_winning_bids_httpconfigs;
    fry_int_buyer$get_buyer_my_winning_bids = mfintegrationsecureinvokerasync(get_buyer_my_winning_bids_inputparam, "fry_int_buyer", "get-buyer-my-winning-bids", serviceCallBack);
  
  },
  
  invokeWinningBidsServicePending: function()
  {
    
    var self = this;
  voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     checkTokenValidatity(function() {
//    var currentLocale = voltmx.store.getItem("currentLocale");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function serviceCallBack(status, get_buyer_my_winning_bids) {
      voltmx.print(get_buyer_my_winning_bids);
      voltmx.application.dismissLoadingScreen();
       if (
        get_buyer_my_winning_bids &&
        get_buyer_my_winning_bids.opstatus === 0 &&
        get_buyer_my_winning_bids.httpresponse &&
        get_buyer_my_winning_bids.httpresponse.responsecode === 200 &&
        Array.isArray(get_buyer_my_winning_bids.records)
    ) {
         
          var records = get_buyer_my_winning_bids.records;
          if (self.view.flxError) self.view.flxError.setVisibility(false);
         if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);


         if(Array.isArray(records) &&  records.length > 0){
      self.insertIntoPendingList(records);
           self.view.lblNorecordsPending.setVisibility(false);
         }
         else{
           self.view.btnLoadMorePending.setVisibility(false);
           self.view.lblNorecordsPending.setVisibility(true);
         }

    } else {
//         alert("Some thing went wrong.");
       if (
            get_buyer_my_winning_bids &&
            get_buyer_my_winning_bids.errcode &&
          Number(get_buyer_my_winning_bids.errcode) === 1011
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
    }
      
    }
    if (get_buyer_my_winning_bids_inputparam == undefined) {
        var get_buyer_my_winning_bids_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_my_winning_bids_inputparam["serviceID"] = "fry_int_buyer$get-buyer-my-winning-bids";
     get_buyer_my_winning_bids_inputparam["user_id"] = userid;
     get_buyer_my_winning_bids_inputparam["status"] = "Pending";
     get_buyer_my_winning_bids_inputparam["page"] = "1";
     get_buyer_my_winning_bids_inputparam["lot_no"] = self.lot || "";
    get_buyer_my_winning_bids_inputparam["title"] = self.title || "";
     get_buyer_my_winning_bids_inputparam["pageSize"] = String(self.pageSizePen);
    get_buyer_my_winning_bids_inputparam["language"] = currentLocale || "en";
    var get_buyer_my_winning_bids_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_my_winning_bids_inputparam["httpheaders"] = get_buyer_my_winning_bids_httpheaders;
    var get_buyer_my_winning_bids_httpconfigs = {};
    get_buyer_my_winning_bids_inputparam["httpconfig"] = get_buyer_my_winning_bids_httpconfigs;
    fry_int_buyer$get_buyer_my_winning_bids = mfintegrationsecureinvokerasync(get_buyer_my_winning_bids_inputparam, "fry_int_buyer", "get-buyer-my-winning-bids", serviceCallBack);
     });
    
  },
  
  insertIntoWinningBidsSegment: function(records)
  {
      var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
      self.view.segActiveBidList.widgetDataMap = {
        "imgCardata":"imgCardata",
        "lblWinningmodelname": "lblWinningmodelname",
        "lbllot": "lbllot",
        "lblLotValue": "lblLotValue",
        "lblLocationname": "lblLocationname",
        "lblLocationValue": "lblLocationValue",
        "lblApproval": "lblApproval",
        "lblStatusApproved": "lblStatusApproved",
         "lblPaymentstatus": "lblPaymentstatus",
        "lblpaymentstatusvalue": "lblpaymentstatusvalue",
         "flxDocuments":"flxDocuments",
        "lblWinningbid": "lblWinningbid",
        "lblwinningbidamt": "lblwinningbidamt",
        "imgRequestServices": "imgRequestServices",
        "lblrequestaccess": "lblrequestaccess",
//         "imgdoc": "imgdoc",
//         "lblDocuments": "lblDocuments",
         "lblPaymentSlip":"lblPaymentSlip",
          "imgUpload":"imgUpload",
        "btnPayNow": "btnPayNow",
        "flxRequestaccess":"flxRequestaccess",
        "flxViewBankAccountDetails":"flxViewBankAccountDetails",
        "lblViewBank":"lblViewBank",
        "lblAmtfeetax":"lblAmtfeetax",
        "flxDeliveryDate":"flxDeliveryDate",
        "lblDeliverydate":"lblDeliverydate",
        "lblDeliverydateid":"lblDeliverydateid"
      }
    
    var segData = [];
    var newRecords = records.slice(self.currentOffsetApp);
    
      for(var i=0;i<newRecords.length;i++){
        
        var winningbiditem = newRecords[i];
        var paymentstatusskin = (winningbiditem.payment_status.toLowerCase() === "paid") ? "sknlbl029051Size16pxDubaiBold" : "sknlblD32437Size16pxDubaiBold45";
        var data = {
          "imgCardata": 
          {
        "src":(damAvailable && isValidURL(winningbiditem.file_url)) ? winningbiditem.file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif"},
          
//           "lblWinningmodelname": winningbiditem.title || "N/A",
          "lblWinningmodelname": {
            "text": winningbiditem.title,
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          "lbllot":  {
            "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          
//           "lblLotValue": winningbiditem.lot_no || "N/A",
            "lblLotValue":  {
            "text": winningbiditem.lot_no || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          "objid": winningbiditem.object_id,
          "aucid": winningbiditem.auction_id,
//           "lblLocationname": "Location",
          "lblLocationname":  {
            "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblLocationValue": winningbiditem.location || "N/A",
           "lblLocationValue":  {
            "text": winningbiditem.location || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
//           "lblApproval": "Approval Status",
           "lblApproval":  {
            "text": voltmx.i18n.getLocalizedString("approval status"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          
//           "lblStatusApproved": winningbiditem.approval_status || "N/A",
            "lblStatusApproved":  {
            "text": (winningbiditem.approval_status || "N/A").toUpperCase(),
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
//           "lblPaymentstatus": "Payment Status",
           "lblPaymentstatus":  {
            "text": voltmx.i18n.getLocalizedString("payment status"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          "lblpaymentstatusvalue": {"text":winningbiditem.payment_status || "N/A",
                                     "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,

                                    "skin" : paymentstatusskin},
//           "lblWinningbid": "Winning Bid",
          "lblWinningbid":  {
            "text": voltmx.i18n.getLocalizedString("Total Amount To Be Paid"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblwinningbidamt": winningbiditem.winning_bid || "N/A",
          "lblwinningbidamt":  {
            "text": winningbiditem.buyer_total_amt || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          
          //deliverydate
           "lblDeliverydate":  {
            "text": voltmx.i18n.getLocalizedString("Delivery Date"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblwinningbidamt": winningbiditem.winning_bid || "N/A",
          "lblDeliverydateid":  {
            "text": winningbiditem.deliver_date || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          
          
          //deliverydate
            "lblAmtfeetax":  {
            "text": voltmx.i18n.getLocalizedString("WinningBidFeesTax"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          "imgRequestServices": "reqestservices.png",
          "lblrequestaccess":{
            "text": voltmx.i18n.getLocalizedString("request services"),
             "skin": (winningbiditem.is_delivered && winningbiditem.is_delivered !== "true") ? "sknlbl231F20Size14pxDubaiBoldUnderlined45" : "sknflxDubaiReg767676Font45px"
          },
          "flxDocuments": {
            "isVisible": ((winningbiditem.payment_slip_uploaded || "").toLowerCase() === "false"),
            "onClick": self.openFileUpload.bind(self, winningbiditem.object_id, winningbiditem.lot_no) 
          },
//           "imgdoc": "ep_document.png",
//           "lblDocuments": "Upload File",
          "imgUpload":"lucide_upload_redcolor.png",
          "lblPaymentSlip": {
           "text": voltmx.i18n.getLocalizedString("Upload Payment Slip")
        },
          "btnPayNow": {
            "skin":"sknbtnBg61B35CBoder61B35C1pxRadius8pxFontffffffDubaiReg14px45",
            "text": "PAY NOW",
            "onClick": this.invokePayment.bind(this)
          },
          "flxRequestaccess":{
            "onClick":  (winningbiditem.is_delivered && winningbiditem.is_delivered !== "true" && winningbiditem.payment_status && winningbiditem.payment_status.toLowerCase() === "paid") ?  this.navToServices.bind(this) : this.showCannotReq.bind(this,winningbiditem)
          },
          
         
           "flxViewBankAccountDetails":{
            "onClick":  this.showBankDetails.bind(this)
          },
            "lblViewBank":  {
            "text": voltmx.i18n.getLocalizedString("View Bank Account Details"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
        }
        
        segData.push(data);

      }
    
//      if (!self.originalSegDataActive || self.currentOffsetActive === 0) {
//   self.originalSegDataActive = segData;
// } else {
//   self.originalSegDataActive = self.originalSegDataActive.concat(segData);
// }
    self.view.segActiveBidList.addAll(segData);
    voltmx.application.dismissLoadingScreen();
      if (self.pageSizeApp > records.length) {
    self.view.flxApprovedList.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxApprovedList.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffsetApp += newRecords.length;
    
    
  },
    
    showBankDetails:function(){
      this.view.flxAccountDetailsContainer.setVisibility(true);
    },
    showBankAccount: function(){
        var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var config_decrypt_inputparam = {};
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var appKey     = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appSecret  = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");    
    config_decrypt_inputparam["serviceID"] = "ms_config$config-decrypt";
    config_decrypt_inputparam["app_key"] = appKey;
    config_decrypt_inputparam["app_secret"] = appSecret;
    config_decrypt_inputparam["config_key"] = "awa_auction_bank_accounts";
    var config_decrypt_httpheaders = {
      "user_token": user_token
    };
    config_decrypt_inputparam["httpheaders"] = config_decrypt_httpheaders;
    var config_decrypt_httpconfigs = {};
    config_decrypt_inputparam["httpconfig"] = config_decrypt_httpconfigs;
    ms_config$config_decrypt = 
      mfintegrationsecureinvokerasync(config_decrypt_inputparam, 
                                      "ms_config",
                                      "config-decrypt",
                                      function(status, response){
      voltmx.print(status);
      voltmx.print(response);
      if(response || response.data){
//         self.view.flxNoDataFound.setVisibility(false);  
        if (self.view && self.view.flxNoDataFound) {
  self.view.flxNoDataFound.setVisibility(false);
} else {
  voltmx.print('self.view.flxNoDataFound is not available.');
}
        if (!response || !response.data || typeof response.data !== "string") {
          voltmx.print("Invalid response or response.data is missing.");
          voltmx.print("Invalid response or response.data is missing.");
          return;
        }
        if(response.opstatus === 1011){
         // this.view.flxError.btnTryAgain.setVisibility(true);
        }
        var rawString = response.data; 
        var fixedString = rawString
        .replace(/^{|}$/g, '')
        .split(', ')
        .map(pair => {
          var [key, value] = pair.split('=');
          return `"${key.trim()}":"${value.trim()}"`;
        })
        .join(',');
        var jsonString = `{${fixedString}}`;
        var parsedData = JSON.parse(jsonString);
        voltmx.print(parsedData.bank);  
        var bank = parsedData.bank;
        self.view.lblBankName.text = bank;
        var account_name = parsedData.account_name;
        var iban        = parsedData.iban;
        var account_number = parsedData.account_number;
        var swift_code = parsedData.swift_code;
        var routing_number = parsedData.routing_number;
                var data = [
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("Bank Name"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": {
                         "text" : bank,
                   "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("Account Name"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue": {
                      "text" : account_name,
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("Account Number"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue":{
                      "text" :  account_number,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("iban"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": 
                    {
                       "text" : iban,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("swiftCode"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": 
                    {
                      "text" : swift_code,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": true,
                      "src": "copy512h.png"
                    },
                    "flximgCopy": {
                      "isVisible": false,
                      //"onClick": self.onCopyClicked.bind(self, swift_code)
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("routingNumber"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue": 
                    {
                      "text" : routing_number,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {"isVisible": true, "src": "copy512h.png"  },
                    "flximgCopy": {
                      "isVisible": false,
                      //"onClick": self.onCopyClicked.bind(self, routing_number)
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                ];
                self.view.segBankDetails.setData(data);
      }
      else{
        self.view.flxNoDataFound.setVisibility(true);  
      }
    });
      
      
    },
  
 showCannotReq: function(winningbiditem) {
  this.view.SmthngWentWrong.setVisibility(true);

  var messageKey = "You cannot request this service until your payment is completed"; // default

  if (winningbiditem && winningbiditem.is_delivered && winningbiditem.is_delivered === "true") {
    messageKey = "This service cannot be requested because the vehicle has already been delivered";
  }

  this.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString(messageKey);
},

  navToServices: function() {
  try {
    var selectedRowItems = this.view.segActiveBidList.selectedRowItems;
    if (!selectedRowItems || selectedRowItems.length === 0) {
      voltmx.print("No row selected in segActiveBidList");
      return;
    }

    var selectedItem = selectedRowItems[0]; // get the first selected row

    // Store required details for frmServices
    voltmx.store.setItem("objidBCService", selectedItem.objid);
    voltmx.store.setItem("lotNoBCService", selectedItem.lblLotValue.text);
    voltmx.store.setItem("paymentStatusBCService", selectedItem.lblpaymentstatusvalue.text);

    // Navigate to frmServices
//     new voltmx.mvc.Navigation("frmServices").navigate();
    
//     new voltmx.mvc.Navigation("frmServices").navigate({ previousFormID: "frmWonBids" });
      var lotId = voltmx.store.getItem("lotNoBCService");
    var objId = voltmx.store.getItem("objidBCService");
    if(lotId&&objId){
      voltmx.store.setItem("navFormFromBids", "WonBids");
      voltmx.store.setItem("comingFromDashboard", false);
      voltmx.store.setItem("seller_rsa", "receiving to awa");
    new voltmx.mvc.Navigation("frmServices").navigate({ 
      previousFormID: "frmWonBids",
      lotIdFromWonBids : lotId,
      objIdFromWonBids : objId
    });
    }
    else{
       lotId = voltmx.store.getItem("lotNoBCService");
       objId = voltmx.store.getItem("objidBCService");
    }
    voltmx.store.setItem("OriginFromForBC", "frmWonBids");
    voltmx.store.setItem("originForm01", "frmWonBids");
     voltmx.store.setItem("originForm", "frmWonBids");
//     voltmx.store.setItem("OriginFromForBC", "frmWonBids");
//     voltmx.store.setItem("originForm01", "frmWonBids");


  } catch (e) {
    voltmx.print("Error in navToServices: " + e.message);
  }
},
  
  openFileUpload: function(objid,lotno)
  {
    this.object_id = null;
    this.lot_no = null;
    if(objid){
    this.object_id = objid;
    }
    if(lotno){
      this.lot_no = lotno;
    }
    this.view.flxBottomFileUpload.setVisibility(true);
    
  },
  
  insertIntoRejectedList: function(records)
  {
    var self = this;
    
      self.view.segRejectedList.widgetDataMap = {
        "imgCardata":"imgCardata",
        "lblWinningmodelname": "lblWinningmodelname",
        "lbllot": "lbllot",
        "lblLotValue": "lblLotValue",
        "lblLocationname": "lblLocationname",
        "lblLocationValue": "lblLocationValue",
        "lblApproval": "lblApproval",
        "lblStatusApproved": "lblStatusApproved",
         "lblPaymentstatus": "lblPaymentstatus",
        "lblpaymentstatusvalue": "lblpaymentstatusvalue",
        "lblWinningbid": "lblWinningbid",
        "lblwinningbidamt": "lblwinningbidamt",
        "imgRequestServices": "imgRequestServices",
        "lblrequestaccess": "lblrequestaccess",
        "imgdoc": "imgdoc",
        "lblDocuments": "lblDocuments",
        "btnPayNow": "btnPayNow"
      }
    
    var segData = [];
    var newRecords = records.slice(self.currentOffsetRej);
      for(var i=0;i<newRecords.length;i++){
        
        var winningbiditem = newRecords[i];
       var paymentstatusskin = (winningbiditem.payment_status.toLowerCase() === "paid") ? "sknlbl029051Size16pxDubaiBold" : "sknlblD32437Size16pxDubaiBold45";

        var data = {
          "imgCardata": (isValidURL(winningbiditem.file_url)) ? winningbiditem.file_url : "noimage.png",
          "lblWinningmodelname": winningbiditem.title || "N/A",
          "lbllot": "Lot #",
          "lblLotValue": winningbiditem.lot_no || "N/A",
          "lblLocationname": "Location",
          "lblLocationValue": winningbiditem.location || "N/A",
          "lblApproval": "Approval Status",
          "lblStatusApproved": winningbiditem.approval_status || "N/A",
          "lblPaymentstatus": "Payment Status",
          "lblpaymentstatusvalue": {"text":winningbiditem.payment_status || "N/A",
                                    "skin" : paymentstatusskin},
          "lblWinningbid": "Winning Bid",
          "lblwinningbidamt": winningbiditem.max_bid || "N/A",
          "imgRequestServices": "reqestservices.png",
          "lblrequestaccess": "REQUEST SERVICES",
          "imgdoc": "ep_document.png",
          "lblDocuments": "DOCUMENTS",
          "btnPayNow": {
            "skin":"sknbtnBg61B35CBoder61B35C1pxRadius8pxFontffffffDubaiReg14px45",
            "text": "PAY NOW"
          }
          
          
        }
        
        segData.push(data);

      }
    self.view.segRejectedList.addAll(segData);
    voltmx.application.dismissLoadingScreen();
     if (self.currentOffsetRej > records.length) {
    self.view.btnLoadMoreRejected.setVisibility(false);
  } else {
    self.view.btnLoadMoreRejected.setVisibility(true);
  }
      self.currentOffsetRej += newRecords.length;
    
  },
  
  insertIntoPendingList: function(records)
  {
    
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
      self.view.segPendingList.widgetDataMap = {
        "imgCardata":"imgCardata",
        "lblWinningmodelname": "lblWinningmodelname",
        "lbllot": "lbllot",
        "lblLotValue": "lblLotValue",
        "lblLocationname": "lblLocationname",
        "lblLocationValue": "lblLocationValue",
        "lblApproval": "lblApproval",
        "lblStatusApproved": "lblStatusApproved",
        "lblPaymentstatus": "lblPaymentstatus",
        "lblpaymentstatusvalue": "lblpaymentstatusvalue",
        "lblWinningbid": "lblWinningbid",
        "lblwinningbidamt": "lblwinningbidamt",
        "imgRequestServices": "imgRequestServices",
        "lblrequestaccess": "lblrequestaccess",
        "imgdoc": "imgdoc",
        "flxSellerOffer":"flxSellerOffer",
         "lblSellerOffer": "lblSellerOffer",
        "lblSellerOfferValue":"lblSellerOfferValue",
        "flxServicesDocuments":"flxServicesDocuments",
        "lblDocuments": "lblDocuments",
        "btnPayNow": "btnPayNow",
        "btnAccept": "btnAccept",
        "btnReject": "btnReject",
        "btnBargain": "btnBargain"
      }
    
    var segData = [];
    
    var newRecords = records.slice(self.currentOffsetPen);
    
      for(var i=0;i<newRecords.length;i++){
        
        var winningbiditem = newRecords[i];
        var paymentstatusskin = (winningbiditem.payment_status.toLowerCase() === "paid") ? "sknlbl029051Size16pxDubaiBold" : "sknlblD32437Size16pxDubaiBold45";
        var negoid = winningbiditem.nego_id || "0";
        var isvisible = negoid !== "0";
        var selleroffer = winningbiditem.seller_offer || "0";
        var isSellerOffer = selleroffer !== "0";
        
        
        var data = {
          "imgCardata":{"src": (damAvailable && isValidURL(winningbiditem.file_url)) ? winningbiditem.file_url : "noimage.png",
                         "imageWhileDownloading": "loading.gif"}
                        ,
//           "lblWinningmodelname": winningbiditem.title || "N/A",
            "lblWinningmodelname": {
            "text": winningbiditem.title || "N/A",
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lbllot": "Lot #",
           "lbllot":  {
            "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          "objid": winningbiditem.object_id,
          "aucid": winningbiditem.auction_id,
          "negoid": winningbiditem.nego_id,
//           "lblLotValue": winningbiditem.lot_no || "N/A",
           "lblLotValue":  {
            "text": winningbiditem.lot_no || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
//           "lblLocationname": "Location",
          "lblLocationname":  {
            "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblLocationValue": winningbiditem.location || "N/A",
                     "lblLocationValue":  {
            "text": winningbiditem.location || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
//           "lblApproval": "Approval Status",
           "lblApproval":  {
            "text": voltmx.i18n.getLocalizedString("approval status"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblStatusApproved": winningbiditem.approval_status || "N/A",
          "lblStatusApproved":  {
            "text": winningbiditem.approval_status || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          "buyerid": winningbiditem.winner_id,
          "sellerid": winningbiditem.seller_id,
//           "lblPaymentstatus": "Payment Status",
           "lblPaymentstatus":  {
            "text": voltmx.i18n.getLocalizedString("payment status"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
          "lblpaymentstatusvalue":{"text":winningbiditem.payment_status || "N/A",
                                   
                                     "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,

                                    "skin" : paymentstatusskin},
//           "lblWinningbid": "Winning Bid",
            "lblWinningbid":  {
            "text": voltmx.i18n.getLocalizedString("winning bid"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

          },
//           "lblwinningbidamt": winningbiditem.winning_bid || "N/A",
          "lblwinningbidamt":  {
            "text": winningbiditem.winning_bid || "N/A",
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          "flxSellerOffer": {
            "isVisible":isSellerOffer},
          "lblSellerOffer": {"text": voltmx.i18n.getLocalizedString("Seller Offer"),
        "right": isArabic ? "5%" : "",
        "left": isArabic ? "" : "5%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
                            },
          "lblSellerOfferValue": {
            "text": Number(selleroffer).toLocaleString("en-AE"),
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT

          },
          "flxServicesDocuments":{
            "isVisible": isvisible
          },
          "btnAccept": {
//             "isVisible": isvisible,
            "text": voltmx.i18n.getLocalizedString("ACCEPT"),
            "onClick": self.onAcceptButtonClick.bind(self)
          },
          
          "btnReject": {
//             "isVisible": isvisible,
            "text": voltmx.i18n.getLocalizedString("REJECT"),
            "onClick": self.rejectCall.bind(self)
          },
          "btnBargain": {
//            "isVisible": isvisible,
          "text": voltmx.i18n.getLocalizedString("BARGAIN"),
          "onClick": self.bargainCall.bind(self)
        }
            
            

        }
        
        segData.push(data);

      }
    
     if (!self.originalSegDataPending || self.currentOffsetActive === 0) {
  self.originalSegDataPending = segData;
} else {
  self.originalSegDataPending = self.originalSegDataPending.concat(segData);
}
    
    self.view.segPendingList.addAll(segData);
    voltmx.application.dismissLoadingScreen();
     if (self.pageSizePen > records.length) {
     self.view.flxPendingList.height = "80%";
    self.view.btnLoadMorePending.setVisibility(false);
  } else {
    self.view.flxPendingList.height = "70%";
    self.view.btnLoadMorePending.setVisibility(true);
  }
      self.currentOffsetPen += newRecords.length;
    
  },
  
//   acceptCall: function()
//   {
// //     var selectedRow = this.view.segPendingList.selectedRowItems[0];
// //     var objid = selectedRow.objid;
// //     var aucid = selectedRow.aucid;
    
// //     this.callAcceptService(objid,aucid);
    
//               var selectedRowIndex = this.view.segPendingList.selectedRowIndex;
//   if (!selectedRowIndex || selectedRowIndex[1] == null) {
//     alert("No row selected.");
//     return;
//   }

//   var rowIndex = selectedRowIndex[1];
//   var segData = this.view.segPendingList.data;
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
    var segData = this.view.segPendingList.data;
    
    if (rowIndex == null || rowIndex === undefined) {
//         alert("No row selected.");
        return;
    }

    var selectedItem = segData[rowIndex];
    if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
//         alert("Missing vehicle details.");
        return;
    }

    this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
},
  
  rejectCall: function()
  {
      this.view.flxRejectOrBargain.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
    
     var selectedItem = this.view.segPendingList.selectedRowItems;

   this.negoId = null;
    if (selectedItem && selectedItem.length > 0) {
        var objid = selectedItem[0].objid;
      var aucid = selectedItem[0].aucid;
            var winningbid = selectedItem[0].lblwinningbidamt;
    
      this.selectedWinningBid = winningbid;
      this.objidForReject = objid;
      this.aucidForReject = aucid;
      var negoid = selectedItem[0].negoid;
      this.negoId = negoid;
      this.view.flxRejectOrBargain.setVisibility(true);
      this.view.flxOverLay.setVisibility(true);
    }
    else{
//       alert("no row selected");
    } 
  },
  
  bargainCall: function()
  {
    this.view.tbxBargainAmount.text = "";
    this.view.lblBargainError.setVisibility(false);
    this.view.flxBargainContainer.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
    
     var selectedItem = this.view.segPendingList.selectedRowItems;

   this.negoId = null;
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
      var auctionid = selectedItem[0].aucid;
      var sellerid = selectedItem[0].sellerid;
      var winningbid = selectedItem[0].lblwinningbidamt;
      var negoid = selectedItem[0].negoid;
      this.objidForBargain = objectid;
      this.aucidForBargain = auctionid;
      this.selleridForBargain = sellerid;
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

//     function bargainCallBack(status, negotiation) {
//       voltmx.print(negotiation);
//     }
//     if (negotiation_inputparam == undefined) {
//         var negotiation_inputparam = {};
//     }
//       var userid = voltmx.store.getItem("userId");
//     negotiation_inputparam["serviceID"] = "ms_post_auction$negotiation";
//     negotiation_inputparam["auction_id"] = self.aucidForBargain;
//     negotiation_inputparam["bargain_nego_price"] = String(self.view.tbxBargainAmount.text.trim());
//     negotiation_inputparam["buyer_id"] = userid;
//       negotiation_inputparam["seller_id"] = "";
//       negotiation_inputparam["message"] = self.view.txtAreaMessage.text;
//     var negotiation_httpheaders = {};
//     negotiation_inputparam["httpheaders"] = negotiation_httpheaders;
//     var negotiation_httpconfigs = {};
//     negotiation_inputparam["httpconfig"] = negotiation_httpconfigs;
//     ms_post_auction$negotiation = mfintegrationsecureinvokerasync(negotiation_inputparam, "ms_post_auction", "negotiation", bargainCallBack);

//     }
//     else{
//       alert("Enter amount");
//     }
    
//   },
  
callBargainService: function()

  {

      var self = this;

      try {

    var rawAmount = self.view.tbxBargainAmount.text.trim();

    voltmx.print("Bargain amount:", rawAmount);

} catch (error) {

   voltmx.print("Error while getting bargain amount:", error);

}
 
  if (rawAmount === "") {

    self.view.lblBargainError.text = voltmx.i18n.getLocalizedString("Please enter a bargain amount");

    self.view.lblBargainError.setVisibility(true);

    return; // stop execution

  }
 
  var amountOnly = rawAmount.replace(" AED", "").trim();

  var parsedAmount = Number(amountOnly);
 
  if (parsedAmount <= self.selectedWinningBid.text) {

    self.view.lblBargainError.text = voltmx.i18n.getLocalizedString("Bargain Amount should be more than winning bid");

    self.view.lblBargainError.setVisibility(true);

    return; // stop execution

  }

    checkTokenValidatity(function() {

    if(!self.view.lblBargainError.isVisible){

    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

      var baseURL = voltmx.store.getItem("BASE_URL");

      if(baseURL){

      if (!baseURL.endsWith("/")) {

      baseURL += "/";

    }

      }

    var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");

   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

     var userid = voltmx.store.getItem("userId");

    var encodeVal = base64Encode(appkey + ":" + appsecret);

     var ev = encodeVal;

     var url = baseURL +"services/ms_post_auction/api/v1/negotiation";

      var usertoken = voltmx.store.getItem("getUserAccesstoken");

      try {

          var request = new voltmx.net.HttpRequest();

      request.open("POST", url);

       request.setRequestHeader("Authorization","Basic "+ev);

        request.setRequestHeader("Content-Type", "application/json");

        request.setRequestHeader("user_token",usertoken);

        var msg = self.view.txtAreaMessage && self.view.txtAreaMessage.text;

        // Get and clean amount from text box

        var rawAmount = self.view.tbxBargainAmount.text || "";

        var amountOnly = rawAmount.replace(" AED", "").trim();
 
        // Convert to number safely

        var parsedAmount = Number(amountOnly);

 
        var negotiation_inputparam = {

        parent_id: Number(self.negoId),

        auction_id: self.aucidForBargain,

        bargain_nego_price: parsedAmount,

        buyer_id: userid,

        seller_id: self.selleridForBargain,

        message: msg

    };
 
    // Send JSON string

    request.send(JSON.stringify(negotiation_inputparam));

      request.onReadyStateChange = function () {

  if (request.readyState === 4) {

    voltmx.application.dismissLoadingScreen();
 
    if (request.status === 200) {

      var response = JSON.parse(request.responseText);

      voltmx.print("Negotiation response: " + JSON.stringify(response));
 
      if (response && response.data && response.data.id) {

//         alert("Success: " + response.message);  

        self.view.flxBargainSuccessPopup.setVisibility(true);

        self.view.flxOverLay.setVisibility(true);

        self.view.flxBargainContainer.setVisibility(false);

      } else {

                      if(response && response.error && response.error.message)

                {

                    if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text = response.error.message;

                      return;

       }

                }

//         alert(" Failed to submit negotiation. Please try again.");

         self.view.flxOverLay.setVisibility(false);

         self.view.SmthngWentWrong.setVisibility(true);

      }

    } else {

//       alert("Error: Server returned status " + request.status);

       var response = JSON.parse(request.responseText);

         if(response && response.error && response.error.message)

                {

                    if(self.view.SmthngWentWrong){

         self.view.SmthngWentWrong.setVisibility(true);

         self.view.SmthngWentWrong.lblSomethingWentWrong.text = response.error.message;

                      return;

       }

                }

        self.view.flxOverLay.setVisibility(false);

       self.view.SmthngWentWrong.setVisibility(true);

    }

  }

};
 
        


      }

    catch(error){

//       alert("Error: " + error.message);

    }

    }

    });

  },
 
  
 openBargainClosePopup: function(){
   this.view.flxBargainContainer.setVisibility(true);
   this.view.flxRejectOrBargain.setVisibility(false);
 },
  
//   callAcceptService: function(objid,aucid)
//   {
//     var self = this;

//      function invokeAcceptCallBack(status, negotiation_acceptance) {
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
//       errorMessage = negotiation_acceptance.error.message;
//       self.view.flxOverLay.setVisibility(false);
//     } else if (
//       negotiation_acceptance &&
//       negotiation_acceptance.errmsg
//     ) {
//       errorMessage = negotiation_acceptance.errmsg;
//       self.view.flxOverLay.setVisibility(false);
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
//   callAcceptService: function(objid,aucid,rowIndex)
//   {
    
//      var self = this;

//    function doneCallBack(status, fleet_wfstatus) {
//   voltmx.application.dismissLoadingScreen();
//   voltmx.print(fleet_wfstatus);

//   const successMsg = "Your Vehicle has moved from Pending Seller Approval to Approved by Seller.";

// //   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
//        if(fleet_wfstatus &&
//     fleet_wfstatus.opstatus === 0 &&
//     (fleet_wfstatus.httpStatusCode === 200 || 
//    (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)) &&
//   fleet_wfstatus.data
//     ){ 
//     self.view.flxAcceptPopup.setVisibility(true);
//     self.view.flxOverLay.setVisibility(true);
    
//       if (typeof rowIndex === "number") {
//         self.view.segPendingList.removeAt(rowIndex);
        
        
//         //  Optional: check if segment is now empty
//         if (self.view.segPendingList.data.length === 0) {
//           self.view.lblNorecordsPending.setVisibility(true);
//           self.view.btnLoadMorePending.setVisibility(false);
//         }
//       }
//   }
//      else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
// //       alert(fleet_wfstatus.error.message); 
//        self.view.flxOverLay.setVisibility(false);
//        self.view.SmthngWentWrong.setVisibility(true);
//        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
//      }
//      else {
// //     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
//        self.view.flxOverLay.setVisibility(false);
//         self.view.SmthngWentWrong.setVisibility(true);
//         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || voltmx.i18n.getLocalizedString("Some thing went wrong. Try again");
//   }
// }

//     if (fleet_wfstatus_inputparam == undefined) {
//         var fleet_wfstatus_inputparam = {};
//     }
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
//     fleet_wfstatus_inputparam["object_id"] = objid;
//     fleet_wfstatus_inputparam["action_name"] = "Accepted";
// //     fleet_wfstatus_inputparam["comments"] = "";
//     var fleet_wfstatus_httpheaders = {
//       "user_token": usertoken
//     };
//     fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
//     var fleet_wfstatus_httpconfigs = {};
//     fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
//     ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);
    
    
//   },
  
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
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200))
  
    ){
   
         self.view.flxAcceptPopup.setVisibility(true);
    self.view.flxOverLay.setVisibility(true);
    
//       if (typeof rowIndex === "number") {
//         self.view.segPendingList.removeAt(rowIndex);
        
        
//         //  Optional: check if segment is now empty
//         if (self.view.segPendingList.data.length === 0) {
//           self.view.lblNorecordsPending.setVisibility(true);
//           self.view.btnLoadMorePending.setVisibility(false);
//         }
//       }
        
  } 
     
     else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
       self.view.flxOverLay.setVisibility(false);
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
     
     else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
       if(self.view.SmthngWentWrong){
         self.view.flxOverLay.setVisibility(false);
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
  
   callRejectService: function()
  {
    
     var self = this;

   function doneCallBack(status, fleet_wfstatus) {
  voltmx.application.dismissLoadingScreen();
  voltmx.print(fleet_wfstatus);
  self.view.flxRejectOrBargain.setVisibility(false);
  const successMsg = "Your Vehicle has moved from Pending Seller Approval to Approved by Seller.";

//   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
      if(fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (fleet_wfstatus.httpStatusCode === 200 || 
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200))
  
    ){
   
    self.view.flxApologyRejected.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);
        
  } 
     
     else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
       self.view.flxOverLay.setVisibility(false);
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
     
     else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
       if(self.view.SmthngWentWrong){
         self.view.flxOverLay.setVisibility(false);
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
    fleet_wfstatus_inputparam["auction_id"] = self.aucidForReject;
    fleet_wfstatus_inputparam["status"] = "Rejected";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_post_auction", "negotiation-acceptance", doneCallBack);
    
  },
  
  //Fry-wf for while
//   callRejectService: function()
//   {
    
//      var self = this;

//    function doneCallBack(status, fleet_wfstatus) {
//   voltmx.application.dismissLoadingScreen();
//   self.view.flxRejectOrBargain.setVisibility(false);
//   voltmx.print(fleet_wfstatus);

//   const successMsg = "Your Vehicle has moved from Pending Seller Approval to Unsold.";

// //   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
//     if(fleet_wfstatus &&
//     fleet_wfstatus.opstatus === 0 &&
//     (fleet_wfstatus.httpStatusCode === 200 || 
//    (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)) &&
//   fleet_wfstatus.data
//     ){
//     self.view.flxApologyRejected.setVisibility(true);
//         self.view.flxOverLay.setVisibility(true);
         
//   }
//      else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
// //       alert(fleet_wfstatus.error.message); 
//         self.view.flxOverLay.setVisibility(false);
//         self.view.SmthngWentWrong.setVisibility(true);
//         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
//      }
//      else {
// //     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
//        self.view.flxOverLay.setVisibility(false);
//         self.view.SmthngWentWrong.setVisibility(true);
//        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || voltmx.i18n.getLocalizedString("Some thing went wrong. Try again");

       
//   }
// }

//     if (fleet_wfstatus_inputparam == undefined) {
//         var fleet_wfstatus_inputparam = {};
//     }
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
//     fleet_wfstatus_inputparam["object_id"] = self.objidForReject;
//     fleet_wfstatus_inputparam["action_name"] = "Rejected";
// //     fleet_wfstatus_inputparam["comments"] = "";
//     var fleet_wfstatus_httpheaders = {
//       "user_token": usertoken
//     };
//     fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
//     var fleet_wfstatus_httpconfigs = {};
//     fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
//     ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);
    
    
//   },
  
  
  
    ActiveBidsToggle: function(){
       this.pageSizeApp = 10;
    this.currentOffsetApp = 0;
      
      if(this.view.lblNorecordsApproved){
       this.view.lblNorecordsApproved.setVisibility(false);
     }
      this.view.btnLoadMore.setVisibility(false);
      this.view.btnLoadMorePending.setVisibility(false);
    this.view.segActiveBidList.setData([]);
     this.invokeWinningBidsServiceApproved();
   
    this.view.flxApprovedList.setVisibility(true);
    this.view.flxRejectedList.setVisibility(false);
    this.view.flxPendingList.setVisibility(false);
    this.view.flxH1.setVisibility(true);
    this.view.flxH2.setVisibility(false);
    this.view.flxH3.setVisibility(false);
     this.currentSearch = "approved";
      this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Approved Bids");
    this.view.lblActiveBids.skin="sknLblDubai231f2018px49";
   this.view.lblWinningBids.skin="sknLblDubai8e8e8e18px49";
    this.view.lblLostBids.skin="sknLblDubai8e8e8e18px49"
  },
  
    winningBidsToggle: function(){
      this.invokeWinningBidsServiceRejected();
    if(this.view.lblNorecordsPending){
       this.view.lblNorecordsPending.setVisibility(false);
     }
    this.view.flxApprovedList.setVisibility(false);
    this.view.flxRejectedList.setVisibility(true);
    this.view.flxPendingList.setVisibility(false);
    this.view.flxH1.setVisibility(false);
    this.view.flxH2.setVisibility(true);
    this.view.flxH3.setVisibility(false);
      this.currentSearch = "rejected";
      this.view.tbxSearch.placeholder = "Search Rejected Bids";
       this.view.lblActiveBids.skin="sknLblDubai8e8e8e18px49";
   this.view.lblWinningBids.skin="sknLblDubai231f2018px49";
    this.view.lblLostBids.skin="sknLblDubai8e8e8e18px49"
  },
  
    lostBidToggle: function(){
      this.pageSizePen = 10;
    this.currentOffsetPen = 0;
    this.view.segPendingList.setData([]);
      this.view.btnLoadMore.setVisibility(false);
      this.view.btnLoadMorePending.setVisibility(false);
      this.invokeWinningBidsServicePending();
    this.view.flxApprovedList.setVisibility(false);
   this.view.flxRejectedList.setVisibility(false);
    this.view.flxPendingList.setVisibility(true);
    this.view.flxH1.setVisibility(false);
    this.view.flxH2.setVisibility(false);
    this.view.flxH3.setVisibility(true);
      this.currentSearch = "pending";
      this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Pending Bids");
        this.view.lblActiveBids.skin="sknLblDubai8e8e8e18px49";
   this.view.lblWinningBids.skin="sknLblDubai8e8e8e18px49";
    this.view.lblLostBids.skin="sknLblDubai231f2018px49"
  },
  onRowClickActionApproved: function()
  {
    
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

    // Get selected row items from the segment
    var selectedItems = this.view.segActiveBidList.selectedRowItems;

    if (selectedItems.length > 0) {
        var selectedItem = selectedItems[0];
     var statusofpayemnt = selectedItem.lblpaymentstatusvalue.text;
      voltmx.store.setItem("paymentstatusofvehicle", statusofpayemnt);
        if (selectedItem && selectedItem.objid) {
            var navigationData = {
                aucid: selectedItem.aucid,
                objid: selectedItem.objid,
               navForm : "WonBids",
//                statusofpayemnt:statusofpayemnt
            };
//            var currentAuctionNavigation = voltmx.store.getItem("previousFormForServices");
          voltmx.store.setItem("previousFormForServices", "frmWonBids");
            var nav = new voltmx.mvc.Navigation("frmDetails");
            nav.navigate(navigationData);
        } else {
            voltmx.print("Selected item does not have a valid objid.");
        }
    } else {
        voltmx.print("Please select an item to view details.");
    }
    
  },
  
 onRowClickActionPending: function() {
    // Save the current form ID
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

    // Get selected row items from the segment
    var selectedItems = this.view.segPendingList.selectedRowItems;

    if (selectedItems.length > 0) {
        var selectedItem = selectedItems[0];
  var statusofpayemnt = selectedItem.lblpaymentstatusvalue.text;
            voltmx.store.setItem("paymentstatusofvehicle", statusofpayemnt);

        if (selectedItem && selectedItem.objid) {
            var navigationData = {
                objid: selectedItem.objid,
//               statusofpayemnt:statusofpayemnt
            };
          
             voltmx.store.setItem("previousFormForServices", "frmWonBids");
            var nav = new voltmx.mvc.Navigation("frmDetails");
            nav.navigate(navigationData);
        } else {
            voltmx.print("Selected item does not have a valid objid.");
        }
    } else {
        voltmx.print("Please select an item to view details.");
    }
},
  
  
   pdfCheck: function() {
     var self = this;
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
//       alert("Error: " + e.message);
       self.view.SmthngWentWrong.setVisibility(true);
       
    }
  },

  pdfCallback: function(data) {
  var self = this;
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
          
             var sizeInBytes = self.estimateBase64Size(self.selectedPdfBase64);
    var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

    if (sizeInBytes > 10 * 1024 * 1024) {
      alert(" File too large. Please upload a file smaller than 10 MB.");
      
      return;
    }
          
          //            this.view.lblfilename.text = this.pdfData.fileName;
          //       this.view.imgupload.setVisibility(false);
          this.view.flxBottomFileUpload.setVisibility(false);
          //           this.view.flxOverLay.setVisibility(false);
          //            this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
          this.invokeUploadFleetDoc();
        }

//         alert(this.pdfData.fileName);

      } catch (error) {
//         console.error("Failed to clone data:", error);
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
//     self.view.flxOverLay.setVisibility(false);
    self.invokeUploadFleetDoc();
  }, []);
});

        
      
  }
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


  
  camOnCaptureAction: function () {
    var self = this;
    var rawBytes = this.view.cam.rawBytes;

    if (rawBytes) {
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
                // Fallback for iOS or if resourcePath is null/undefined
                filename = "captured_image_" + new Date().getTime();
            }
        } catch (e) {
            voltmx.print("Error extracting filename: " + e.message);
            filename = "captured_image_" + new Date().getTime();
        }

        // Convert raw bytes to base64
        var base64Image = voltmx.convertToBase64(rawBytes);

        // ✅ Size check (reject if > 10MB)
        var sizeInBytes = this.estimateBase64Size(base64Image);
        var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

        if (sizeInBytes > 10 * 1024 * 1024) {
            alert("Image too large (" + sizeInMB + " MB). Please capture an image smaller than 10 MB.");
            return;
        }

        var filetype = detectFileType(base64Image) || ".jpg";
        var filefullname = filename + filetype;

        this.filenameCam = filefullname;
        this.selectedPdfFileName = filefullname;
        this.selectedPdfBase64 = base64Image;
        this.base64CamImage = base64Image;

        this.view.flxBottomFileUpload.setVisibility(false);

        //  Do not change this (as per your request)
        this.invokeUploadFleetDoc();
    } else {
        voltmx.print("No image captured from camera.");
    }
},


  
  chooseFromLibrary: function () {
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

      // Estimate base64 size
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

      self.view.flxBottomFileUpload.setVisibility(false);
      voltmx.print("Base64 : " + base64Data);

      self.invokeUploadFleetDoc();
    } else {
      voltmx.print("No image selected.");
    }
  }.bind(this), {}, {
    action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
    format: voltmx.phone.MEDIA_DOCUMENT_RAW,
    mimetype: "image/*"
  });
},
//   invokeUploadFleetDoc: function()
//   {
//      voltmx.application.showLoadingScreen(null, "Uploading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

//     var self = this;
//     // Sample code to fetch the integration service details with passthrough 
//     var serviceName = "fry_collection";   
//     // Get an instance of SDK
//      var userobj = voltmx.store.getItem("userObject");
//     var isorg = userobj.rawResponse.is_org;
//     var client = voltmx.sdk.getCurrentInstance();
//     var integrationSvc = client.getIntegrationService(serviceName);
//     var operationName = "upload-fleet-documents";
//     var userToken = voltmx.store.getItem("getUserAccesstoken");
//     var userid = voltmx.store.getItem("userId");

//     var params = {
//       "user_id": userid,
//       "moduleName": "UploadFleetDocuments",
//       "is_org": isorg,
//       "category": "payment_slip",
//       "object_id": self.object_id,
//       "lot_no":self.lot_no,
//       "file_details": [
//         {
//           "filename": self.selectedPdfFileName,
//           "base64": self.selectedPdfBase64.replaceAll('+','/plus/'), // You need to encode file as base64 and insert it here
//         }
//       ],
//       "user_token": userToken
//     };
//     var headers = {
//       //     "custom-header-key1": "custom-header-value1"
//     }; //If there are no headers, pass null
//     // options is an optional parameter that helps in configuring the network layer.
//     integrationSvc.invokeOperation(operationName, headers, params, function(response) {
//       voltmx.print("Integration Service Response is: " + JSON.stringify(response));
//    //In success callback , update upload slip slip to eye icon and Payment under review.
//       voltmx.application.dismissLoadingScreen();
//       var message = response.rawResponse.message;
//       if(message === "Success"){
// //         ==========================================================================
//        alert("uploaded");
//      } 
//     }, function(error) {
//       voltmx.print("Integration Service Failure: " + JSON.stringify(error));
//     }, {
//       "passthrough": true
//     });
//   },
  
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

  invokeUploadFleetDoc: function()
{
//   voltmx.application.showLoadingScreen(null, "Uploading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
//     shouldShowLabelInBottom: "true",
//     separatorHeight: 45,
//     progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
//     progressIndicatorColor: "Gray"
//   });

  var self = this;
  var serviceName = "fry_collection";
  var userobj = voltmx.store.getItem("userObject");
  var isorg = userobj.rawResponse.is_org;
  var client = voltmx.sdk.getCurrentInstance();
  var integrationSvc = client.getIntegrationService(serviceName);
  var operationName = "upload-fleet-documents";
  var userToken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");

  var params = {
    "user_id": userid,
    "moduleName": "UploadFleetDocuments",
    "is_org": isorg,
    "category": "payment_slip",
    "object_id": self.object_id,
    "lot_no": self.lot_no,
    "file_details": [
      {
        "filename": self.selectedPdfFileName,
        "base64": self.selectedPdfBase64.replaceAll('+', '/plus/')
      }
    ],
    "user_token": userToken
  };

  var headers = {}; // No custom headers
  self.view.flxUploadingProgressBar.setVisibility(true);
self.view.flxInnerBar.width = "0%";
self.startProgressSimulation();

  integrationSvc.invokeOperation(
    operationName,
    headers,
    params,
    function(response) {
      voltmx.print("Integration Service Response is: " + JSON.stringify(response));
      voltmx.application.dismissLoadingScreen();
      voltmx.timer.cancel("progressBarTimer");


      try {
        if (response && response.rawResponse) {
          const rawResp = response.rawResponse;
          const opStatus = rawResp.opstatus;

          if (opStatus === 0 && rawResp.response) {
            let parsedResponse = JSON.parse(rawResp.response);

            if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
              let errorCode = parsedResponse[0].error_code;

              if (errorCode === "409") {
                self.view.flxUploadingProgressBar.setVisibility(false);
                if (self.view.SmthngWentWrong) {
                  self.view.SmthngWentWrong.setVisibility(true);
                  self.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString("File already exists. Please rename");
                }
                return;
              }
            }

            if (self.view.Success) {
              self.view.flxInnerBar.width = "100%";
              self.view.flxUploadingProgressBar.setVisibility(false);
              self.view.Success.setVisibility(true);
//               self.callWfStatusToDone();
              self.view.Success.lblSuccessmsg.text = voltmx.i18n.getLocalizedString("Document uploaded successfully");
            }
            return;
          }
        }

        // Unexpected response case
        if (self.view.SmthngWentWrong) {
          self.view.flxUploadingProgressBar.setVisibility(false);
          self.view.SmthngWentWrong.setVisibility(true);
          self.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString("Some thing went wrong. Try again");
        }
      } catch (e) {
        voltmx.print("Exception while processing response: " + e.message);
        if (self.view.SmthngWentWrong) {
          self.view.flxUploadingProgressBar.setVisibility(false);
          self.view.SmthngWentWrong.setVisibility(true);
          self.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString("Some thing went wrong. Try again");
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

  callWfStatusToDone: function()
  {
      var self = this;
    checkTokenValidatity(function() {
    function doneCallBack(status, fleet_wfstatus) {
      voltmx.print(fleet_wfstatus);
      if(fleet_wfstatus.httpStatusCode === 200 &&
    fleet_wfstatus.opstatus === 0 &&
    fleet_wfstatus.data)
        {
        }
      else{
//         alert(fleet_wfstatus.user_message);
        if(fleet_wfstatus && fleet_wfstatus.user_message)
          {
//             self.view.SmthngWentWrong.setVisibility(true);
//             self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message;
          }
      }
      
    }
    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = self.object_id;
    fleet_wfstatus_inputparam["action_name"] = "Upload Payment Slip";
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
  
  
  invokePayment: function()
  {
    
  },
  
  adjustRTLLayout: function() 
  {
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     if(this.view.flxError){
      this.view.flxError.setVisibility(false);
    }
     if (this.view.flxServiceError) 
    {
      this.view.flxServiceError.setVisibility(false);
    }
    this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.Success.btnCloseSuccess.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.lblActiveBids.text = voltmx.i18n.getLocalizedString("Approved");
    this.view.lblLostBids.text = voltmx.i18n.getLocalizedString("Pending");
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
    this.view.lblNorecordsApproved.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");

this.view.lblNorecordsPending.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMorePending.text = voltmx.i18n.getLocalizedString("Load more");
  this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops");
     this.view.CopyflxToggles0a570cc69f1d247.reverseLayoutDirection = isArabic;
     this.view.flxSearchContainer.reverseLayoutDirection = isArabic;
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Approved Bids");
     this.view.lblMyPurchases.text = voltmx.i18n.getLocalizedString("My Purchases");
   this.view.CopylblSuccessMsg0f95c42d8d04644.text = voltmx.i18n.getLocalizedString("The seller has been intimated. You can check the approval status in the My Purchases section of My Vehicles");
    this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Awesome!");
    this.view.btnCloseAcceptPopup.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.btnCloseApology.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.lblApology.text = voltmx.i18n.getLocalizedString("Apologies! Bid Rejected. Relist your vehicle or customer support will contact you soon.\nDetails in the 'Unsold' section of My Vehicles");
   this.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("You've rejected the online bid! Would you like to bargain with the bidder instead?");
    this.view.btnRejectFromPopup.text = voltmx.i18n.getLocalizedString("REJECT");
    this.view.btnBargainFromPopup.text = voltmx.i18n.getLocalizedString("BARGAIN");
    this.view.CopylblSuccessMsg0c7ad2f87becd44.text = voltmx.i18n.getLocalizedString("The seller has been initimated. You can check the status of your offer in the My Purchases section");
    this.view.btnCloseBargainSuccesspopup.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.CopyLabel0d56568fbcc7440.text = voltmx.i18n.getLocalizedString("Hurray!");
   this.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Kindly enter the amount you want for your product");
   this.view.tbxBargainAmount.placeholder = voltmx.i18n.getLocalizedString("Bargain Amount");
   this.view.btnBargain.text = voltmx.i18n.getLocalizedString("BARGAIN"); 
         this.view.lblMessagetobyer.text = voltmx.i18n.getLocalizedString("Message To Buyer");
   this.view.btnSubmitBargain.text = voltmx.i18n.getLocalizedString("Submit");
    this.view.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.lblAlwataneyaAuctionBankAccountsHeading.text = voltmx.i18n.getLocalizedString("AlwataneyaAuctionBankAccounts");
//     this.view.lblBankName.text = voltmx.i18n.getLocalizedString("AlwataneyaIslamicBank");

     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     this.view.flxAlwataneyaAuctionBankContainer.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblMyPurchases.left = "";
       this.view.lblMyPurchases.right = "14%";
//        this.view.imgSearch.left = "";
//        this.view.imgSearch.right = "3%";
       this.view.txtAreaMessage.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblMessagetobyer.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        this.view.lblSelectIncrement.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblMyPurchases.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblAlwataneyaAuctionBankAccountsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblBargainError.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.tbxBargainAmount.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
     }
     else{
       this.view.lblMyPurchases.left = "14%";
       this.view.lblMyPurchases.right = "";
//        this.view.imgSearch.left = "3%";
//        this.view.imgSearch.right = "";
       this.view.txtAreaMessage.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblMessagetobyer.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblSelectIncrement.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblMyPurchases.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.tbxBargainAmount.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblAlwataneyaAuctionBankAccountsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblBargainError.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
     }
    
  }
});
