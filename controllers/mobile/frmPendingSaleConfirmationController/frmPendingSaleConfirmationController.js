define({

  onNavigate: function() 
  {
    
    this.adjustRTLLayout();
     this.view.preShow = this.onPreShow;
    this.view.flxBack.onClick = this.BackNavigation;
    this.view.postShow = this.onPostShow.bind(this);
//     this.view.segPendingSaleConfo.onRowClick = this.onRowClickAction.bind(this);
    this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
   this.view.btnCancel.onClick = () =>{
       this.view.flxOvelaySubmission.setVisibility(false);
      }
//     this.view.btnRejectFromPopup.onClick = this.rejectVehicle.bind(this);
  },
   onPreShow: function(){
//      this.adjustRTLLayout();
     loginToDam();
     this.view.tbxSearch.text = "";
      this.pageSize = 10;
    this.currentOffset = 0;
      this.lot = "";
     this.title = ""; 
   
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
     
     if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    this.view.segPendingSaleConfo.setData([]);
     this.view.btnLoadMore.setVisibility(false);
     this.view.flxOverLay.setVisibility(false);
     this.view.lblNorecords.setVisibility(false);
     this.view.lblBargainError.setVisibility(false);
     this.getPendingSaleConfirmation();
     this.toggleFooterIcons();
     
      this.view.flxOverLay.setVisibility(false)
     this.view.flxBargainContainer.setVisibility(false);
   this.view.flxRejectOrBargain.setVisibility(false);
     this.view.flxAcceptPopup.setVisibility(false);
     this.view.flxApologyRejected.setVisibility(false);
   },
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
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
    this.view.segPendingSaleConfo.setData([]);
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

    self.getPendingSaleConfirmation();
  },
  
  onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
//       this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
     this.view.btnLoadMore.setVisibility(false); 
     this.view.tbxBargainAmount.onTextChange = this.validateBargainAmount.bind(this);

     this.view.flxRemoveBargainPopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false);
     }
     
     this.view.btnCloseBargainSuccesspopup.onClick = () =>{
       this.view.flxBargainSuccessPopup.setVisibility(false);
       this.view.flxOverLay.setVisibility(false); 
     }
     
     this.view.flxRemoveRejectBargainPopup.onClick = () =>{
        this.view.flxOverLay.setVisibility(false); 
        this.view.flxRejectOrBargain.setVisibility(false);
     }
      if(this.view.flxBargainContainer.isVisible){
     this.view.flxBargainContainer.setVisibility(false);
     }
    if(this.view.flxOverLay.isVisible){
    this.view.flxOverLay.setVisibility(true);
    }
    this.view.flxOverLay.onClick = () =>{
       if(this.view.flxBargainContainer.isVisible){
     this.view.flxBargainContainer.setVisibility(false);
     }
      
      if(this.view.flxRejectOrBargain.isVisible){
        this.view.flxRejectOrBargain.setVisibility(false);
      }
      
        if(this.view.flxOverLay.isVisible){
     this.view.flxOverLay.setVisibility(false);
     }
      
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
  
  
  onRowClickAction: function()
  {
var selectedItems = this.view.segPendingSaleConfo.selectedRowItems;
voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
if (Array.isArray(selectedItems) && selectedItems.length > 0) {
    var selectedItem = selectedItems[0];

    if (selectedItem && selectedItem.objid) {
        var navigationData = {
            aucid: selectedItem.aucid,
            objid: selectedItem.objid
        };
         voltmx.store.setItem("previousFormForServices", "frmPendingSaleConfirmation");
        var nav = new voltmx.mvc.Navigation("frmDetails");
        nav.navigate(navigationData);
    } else {
        // Handle missing objid
        voltmx.print("Selected item does not have a valid ID.");
    }
} else {
    // Handle case where nothing is selected
    voltmx.print("Please select an item to view details.");
}

  },
  
//   validateBargainAmount: function() {
//   var text = this.view.tbxBargainAmount.text.trim();

  
//   if (Number(text) < this.selectedWinningBid) {
//     this.view.lblBargainError.text = "Bargain Amount should be more than winning bid";
//     this.view.lblBargainError.setVisibility(true);
//   } else {
//     this.view.lblBargainError.setVisibility(false);
//   }
    
//      if(this.view.tbxBargainAmount && this.view.tbxBargainAmount.text.trim()!== ""){
// //          this.view.btnBargain.skin = "sknBtnBid61B35C8pxradius";
//          this.view.btnSubmitBargain = "sknBtnBid61B35C8pxradius";
//        }
//        else{
// //          this.view.btnBargain.skin = "sknBtnBidcccccc8pxradius";
//          this.view.btnSubmitBargain.skin = "sknBtnBidcccccc8pxradius";
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
  
   setFilterToSeg: function()
  {
    var self = this;
    var searchText ="";
    if(self.view.tbxSearch && self.view.tbxSearch.text){
      searchText = self.view.tbxSearch.text.trim().toLowerCase();
    }
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.segPendingSaleConfo.setData(self.originalSegData);
     self.view.lblNorecords.setVisibility(false);
    
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return item.lblCarName.text.toLowerCase().includes(searchText);
  });

  self.view.segPendingSaleConfo.setData(filteredData);
    
  if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
}    
  },
  

  
   onLoadMoreClick: function()
  {
    
    this.pageSize += 10;
  this.getPendingSaleConfirmation();
  },
 
  
  getPendingSaleConfirmation: function(){
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
   checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");  
//     var currentLocale = voltmx.store.getItem("currentLocale");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
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
   Pending_Sale_Confirmation_inputparam["pagesize"] = String(self.pageSize);
  
     Pending_Sale_Confirmation_inputparam["language"] = currentLocale || "en";
   

  
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
      voltmx.application.dismissLoadingScreen();
//       alert("Status: "+status);
//       alert("response from pending sale confirmation:"+JSON.stringify(response));
       var data = response.records;
         if (Array.isArray(data) && data.length > 0) {  
           self.insertIntoSegPendingSale(data);
           self.view.lblNorecords.setVisibility(false);
         }
      else{
        self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
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
     var segData = [];
    self.view.segPendingSaleConfo.widgetDataMap = {
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

      
//     self.view.segApprovedVehicles.setData([]);
     var newRecords = data.slice(self.currentOffset);
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
     
//      self.originalSegData = segData;
    
      if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
    
     self.view.segPendingSaleConfo.addAll(segData);
    
    
     if (self.pageSize > data.length) {
    self.view.flxsegPendingSaleConfo.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
     self.view.flxsegPendingSaleConfo.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length; 
    
  },
  
//   rejectSale: function()
//   {
    
//     this.view.flxRejectOrBargain.setVisibility(true);
//     this.view.flxOverLay.setVisibility(true);
    
//      var selectedItem = this.view.segPendingSaleConfo.selectedRowItems;

   
//     if (selectedItem && selectedItem.length > 0) {
//         var objectid = selectedItem[0].objid;
//       var auctionid = selectedItem[0].aucid;
//     }
//     else{
//       alert("no row selected");
//     } 
//   },
  
 
  //not working in ios
//   acceptCall: function()
//   {
    
//       var selectedRowIndex = this.view.segPendingSaleConfo.selectedRowIndex;
//   if (!selectedRowIndex || selectedRowIndex[1] == null) {
//     alert("No row selected.");
//     return;
//   }

//   var rowIndex = selectedRowIndex[1];
//   var segData = this.view.segPendingSaleConfo.data;
//   var selectedItem = segData[rowIndex];

//   if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
//     alert("Missing vehicle details.");
//     return;
//   }

//   this.callAcceptService(selectedItem.objid, selectedItem.aucid, rowIndex);
    
//   },
  
  onAcceptButtonClick: function(eventobject, context) {
    this.view.flxOvelaySubmission.setVisibility(true);
    this.view.btnSubmit.onClick =this.acceptCall.bind(this, context);
    //this.acceptCall(context);
},

acceptCall: function(context) {
  this.view.flxOvelaySubmission.setVisibility(false);
    var rowIndex = context.rowIndex;
    var segData = this.view.segPendingSaleConfo.data;
    
    if (rowIndex == null || rowIndex === undefined) {
//         alert("No row selected.");
        return;
    }

    var selectedItem = segData[rowIndex];
    if (!selectedItem || !selectedItem.objid || !selectedItem.aucid) {
//         alert("Missing vehicle details.");
        return;
    }

//   if(selectedItem && Number(selectedItem.lblBuyerOfferValue.text) === 0 && selectedItem.negoStatus && selectedItem.negoStatus.toLowerCase() === "accepted")
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

//   rejectCall: function()
//   {
//       this.view.flxRejectOrBargain.setVisibility(true);
//     this.view.flxOverLay.setVisibility(true);
    
//      var selectedItem = this.view.segPendingSaleConfo.selectedRowItems;
//    var selectedRowIndex = this.view.segPendingSaleConfo.selectedRowIndex;
   
//     if (selectedItem && selectedItem.length > 0) {
//       // var rowIndex = selectedRowIndex[1];
//       var selectedRowIndex = this.view.segPendingSaleConfo.selectedRowIndex;

// if (!Array.isArray(selectedRowIndex) || selectedRowIndex.length < 2 || selectedRowIndex[1] == null) {
//     alert("No row selected.");
//     return;
// }

// var rowIndex = selectedRowIndex[1]; // ✅ Safe to use here

//         var objid = selectedItem[0].objid;
//       var aucid = selectedItem[0].aucid;
//       var winningbid = selectedItem[0].lblHighestBidValue;
//        var  sellerid = voltmx.store.getItem("userId");
//       var buyerid = selectedItem[0].buyerid;
//       this.objidForReject = objid;
//       this.aucidForReject = aucid;
//       this.rowIdForReject = rowIndex;
//       this.selectedWinningBid = winningbid;
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
    var segment = this.view.segPendingSaleConfo;
    var rowIndex = context.rowIndex;
    var segData = segment.data;

    if (!segData || rowIndex === null || rowIndex === undefined) {
//         alert("No row selected");
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
    this.view.tbxBargainAmount.text = "";
//         this.view.tbxBargainAmount.text = "";
    this.view.lblBargainError.setVisibility(false);
     this.view.btnSubmitBargain.skin = "sknBtnBidcccccc8pxradius";
    this.view.btnSubmitBargain.setEnabled(false);
    this.view.flxBargainContainer.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
    this.objidForBargain = null;
      this.aucidForBargain = null;
      this.buyerIdForBargain = null;
      this.sellerIdForBargain = null;
      this.negoId = null;
     var selectedItem = this.view.segPendingSaleConfo.selectedRowItems;

   
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

//     }
//     else{
//       alert("Enter amount");
//     }
    
//   },
  
//  callBargainService: function()
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

//             alert("Error: Server returned status " + request.status);

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
   this.view.tbxBargainAmount.text = "";
   this.view.flxRejectOrBargain.setVisibility(false);
 },
  
//   callAcceptService: function(objid,aucid)
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
        self.view.segPendingSaleConfo.removeAt(rowIndex);
        
        // ✅ Optional: check if segment is now empty
        if (self.view.segPendingSaleConfo.data.length === 0) {
          self.view.lblNorecords.setVisibility(true);
          self.view.btnLoadMore.setVisibility(false);
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
  
  callRejectService: function()
  {
    
     var self = this;

    //working one but not deleting row
//    function doneCallBack(status, fleet_wfstatus) {
//   voltmx.application.dismissLoadingScreen();
          
 
//          self.view.flxRejectOrBargain.setVisibility(false);
//   voltmx.print(fleet_wfstatus);

//   const successMsg = "Your Vehicle has moved from Pending Seller Approval to Unsold.";

//   if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
//     self.view.flxApologyRejected.setVisibility(true);
     
//         self.view.flxOverLay.setVisibility(true);
// //          self.view.flxRejectOrBargain.setVisibility(false);
//   } else {
//     alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
//   }
// }
    
    function doneCallBack(status, fleet_wfstatus) {
    voltmx.application.dismissLoadingScreen();

    self.view.flxRejectOrBargain.setVisibility(false);
    voltmx.print(fleet_wfstatus);

    const successMsg = "Your Vehicle has moved from Pending Seller Approval to Unsold.";

//     if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === successMsg) {
      if(fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (fleet_wfstatus.httpStatusCode === 200 || 
   (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)) &&
  fleet_wfstatus.data
    ){
        self.view.flxApologyRejected.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);

        if (typeof self.rowIdForReject === "number") {
            self.view.segPendingSaleConfo.removeAt(self.rowIdForReject);

            // ✅ If the segment is now empty
            if (self.view.segPendingSaleConfo.data.length === 0) {
                self.view.lblNorecords.setVisibility(true);
                self.view.btnLoadMore.setVisibility(false);
            }
        }
    } 
      
       else if((fleet_wfstatus.error && fleet_wfstatus.error.message)){
//       alert(fleet_wfstatus.error.message); 
        self.view.flxOverLay.setVisibility(false);
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.error.message;
       
     }
      
      else {
//         alert(fleet_wfstatus.user_message || "An unexpected error occurred.");
        if(self.view.SmthngWentWrong){
         self.view.SmthngWentWrong.setVisibility(true);
         self.view.SmthngWentWrong.lblSomethingWentWrong.text = fleet_wfstatus.user_message || "Some thing went wrong. Try again later";
       }
   
      
        self.view.flxOverLay.setVisibility(false);
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
  
//   callRejectService: function()
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
  
   adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//      var keys = voltmx.i18n.getSupportedLocales();
     
//      voltmx.print(keys);
//      for(var i = 0 ;i<keys.length ; i++){
//        var keyvalue = 
//      }
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
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Pending Sale Confirmation");
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
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
      this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
     this.view.lblPendingSaleConfirmation.text = voltmx.i18n.getLocalizedString("Pending Sale Confirmation");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblPendingSaleConfirmation.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblSelectIncrement.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.lblMessagetobyer.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.tbxBargainAmount.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblPendingSaleConfirmation.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblSelectIncrement.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblMessagetobyer.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.tbxBargainAmount.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
     
     
     
   },
  
  goToContact: function()
  {
    voltmx.store.setItem("contactBackForm","frmPendingSaleConfirmation");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
  }
});
