define({

  onNavigate: function(){
    
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow;
    this.view.flxBack.onClick = this.BackNavigation;
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
     this.view.postShow = this.onPostShow.bind(this);
//     this.view.segSoldVehicles.onRowClick = this.navTofrmDetails.bind(this);
     this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
  },
  onPreShow: function(){
    var self = this;
    loginToDam();
    this.view.btnLoadMore.setVisibility(false);
    this.view.lblNorecords.setVisibility(false);
    this.view.tbxSearch.text = "";
    this.pageSize = 10;
    this.currentOffset = 0;
    this.lot = "";
     this.title = "";
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
    this.view.segSoldVehicles.setData([]);
    this.getSoldVehicles();
    
  
   this.toggleFooterIcons();
  },
  
  
   onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
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
    this.view.segSoldVehicles.setData([]);
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

    self.getSoldVehicles();
  },
  
  
   onLoadMoreClick: function()
  {
     this.pageSize += 10;
  this.getSoldVehicles();
  },
   setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.lblNorecords.setVisibility(false);
    self.view.segSoldVehicles.setData(self.originalSegData);
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return item.lblCarName.text.toLowerCase().includes(searchText);
  });

  self.view.segSoldVehicles.setData(filteredData);
     if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
}  
    
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
  
  navTofrmDetails: function(){
    var selectedItem = this.view.segSoldVehicles.selectedRowItems[0];
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    
         voltmx.store.setItem("previousFormForServices", "frmSoldVehicles");

    var navigationData = {
      objid: selectedItem.objid
    };
    var nav = new voltmx.mvc.Navigation("frmDetails");
    nav.navigate(navigationData);
  },
  
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
  },
  getSoldVehicles: function(){
    var self = this;
         voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;

    var get_sold_vehicles_inputparam = {};
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    get_sold_vehicles_inputparam["serviceID"] = "fry_int_post_auction$get-sold-vehicles";
    get_sold_vehicles_inputparam["lot_no"] = self.lot || "";
    get_sold_vehicles_inputparam["title"] = self.title || "";
    get_sold_vehicles_inputparam["auction_ends_from"] ="" ;
    get_sold_vehicles_inputparam["auction_ends_to"] ="" ;
    get_sold_vehicles_inputparam["buyer_name"] ="" ;
    get_sold_vehicles_inputparam["seller_name"] ="" ;
    get_sold_vehicles_inputparam["added_by"] ="" ;
    get_sold_vehicles_inputparam["location"] ="" ;
    get_sold_vehicles_inputparam["auction_batch"] ="" ;
    get_sold_vehicles_inputparam["ready_to_deliver"] ="" ;
    get_sold_vehicles_inputparam["asset_id"] ="ALL" ;
    get_sold_vehicles_inputparam["page_number"] ="1" ;
    get_sold_vehicles_inputparam["page_size"] = String(self.pageSize);
     get_sold_vehicles_inputparam["target_selling_price"] ="";
     get_sold_vehicles_inputparam["chassis_number"] ="";
     get_sold_vehicles_inputparam["user_id"] = userid;
     get_sold_vehicles_inputparam["language"] = currentLocale || "en";
    
    var get_sold_vehicles_httpheaders = {
      
                    "user_token": usertoken

    };
    get_sold_vehicles_inputparam["httpheaders"] = get_sold_vehicles_httpheaders;
    var get_sold_vehicles_httpconfigs = {};
    get_sold_vehicles_inputparam["httpconfig"] = get_sold_vehicles_httpconfigs;
    fry_int_post_auction$get_sold_vehicles =
      mfintegrationsecureinvokerasync(get_sold_vehicles_inputparam, 
                                      "fry_int_post_auction", 
                                      "get-sold-vehicles",
                                    function(status,response){
//       alert("status"+status);
//       alert("response from sold :"+response);
//       alert("Response from sold with json :"+JSON.stringify(response));
        voltmx.application.dismissLoadingScreen();
      var data = response.records;
     if (data && Array.isArray(data) && data.length > 0) {
       self.setDataToSegSold(data);
     }
      else{
        self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
      }
    });
  },
  setDataToSegSold: function(records)
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     var damAvailable = voltmx.store.getItem("isDamAvailable");
    self.view.segSoldVehicles.widgetDataMap = {
  "imgCardata":"imgCardata",
  "lblCarName": "lblCarName",
  "lblLot": "lblLot",
  "lblLotValue": "lblLotValue",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
  "lblHighestBid": "lblHighestBid",
  "lblHighestBidValue": "lblHighestBidValue",
  "lblBuyerPaymentStatus": "lblBuyerPaymentStatus",
  "lblBuyerPaymentStatusValue": "lblBuyerPaymentStatusValue",
  "lblETPaymentStatus": "lblETPaymentStatus",
  "lblETPaymentStatusValue": "lblETPaymentStatusValue",
  "flxContactSupportInner": "flxContactSupportInner",
  "lblContactSupport": "lblContactSupport",
  "lblViewInvoice": "lblViewInvoice",
  "flxViewInvoice": "flxViewInvoice"
};

    var segData = [];
    
    
     var newRecords = records.slice(self.currentOffset);
     
       for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
        
      var  status = (item.buyer_payment_status || "N/A").toLowerCase();
        
        segData.push({
          "imgCardata" : {
        "src":(damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif"},
//            "lblCarName"             : item.title || "N/A",
           "lblCarName": {
        "text": item.title || "N/A",
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLot"                 : "Lot#",
            "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLotValue"            : item.lot_no || "N/A",
             "lblLotValue": {
        "text": item.lot_no || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "objid": item.object_id,
//           "lblLocation"            : "Location",
            "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLocationValue"       :item.location || "N/A",
            "lblLocationValue": {
        "text": item.location || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblHighestBid"          :"Highest Bid",
           "lblHighestBid": {
        "text": voltmx.i18n.getLocalizedString("Highest Bid"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblHighestBidValue"     : (item.max_bid != null) ? Math.round(Number(item.max_bid)) : "N/A",
            "lblHighestBidValue": {
        "text": (item.max_bid != null) ? Math.round(Number(item.max_bid)) : "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblBuyerPaymentStatus"  : "Buyer Payment Status",
           "lblBuyerPaymentStatus": {
        "text": voltmx.i18n.getLocalizedString("Buyer payment status"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblBuyerPaymentStatusValue" : item.buyer_payment_status || "N/A",
             "lblBuyerPaymentStatusValue": {
        "text": item.buyer_payment_status || "N/A",
        skin: status === "paid" 
      ? "sknlbl61B35CDubaiBoldFont60px" 
      : status === "unpaid" 
          ? "sknlbld32437DubaiBoldFont60px" 
          : "sknlbl61B35CDubaiBoldFont60px",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblETPaymentStatus"     :"ET Payment Status",
           "lblETPaymentStatus": {
        "text": voltmx.i18n.getLocalizedString("ET payment status"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblETPaymentStatusValue": item.et_payment_status || "N/A",
             "lblETPaymentStatusValue": {
        "text": item.et_payment_status || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
           "imgContct" : "contactsupport512h.png",
          "flxContactSupportInner": {
            "onClick": this.goToContactPage.bind(this),
            "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
          },
          "flxViewInvoice":{
             "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
            "isVisible": false
          },
          "lblContactSupport" : voltmx.i18n.getLocalizedString("contact support"),
          "flxBottomLineContactSupport" : {
            "skin": "sknflxBg231F20Opacity10per"
          },
        "imgInvoice" : "invoice512h.png",
          "lblViewInvoice" : voltmx.i18n.getLocalizedString("view invoice"),
          "flxBottomLineContactSupport" : {
            "skin": "sknflxBg231F20Opacity10per"
          },   
        });
    
      }
//      self.originalSegData = segData;
    
    if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
     self.view.segSoldVehicles.addAll(segData);
    
//      if (self.currentOffset >= records.length) {
//     self.view.btnLoadMore.setVisibility(false);
//   } else {
//     self.view.btnLoadMore.setVisibility(true);
//   }
    if (self.pageSize > records.length) {
    self.view.flxSegSold.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxSegSold.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
  },
  
    adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//      var keys = voltmx.i18n.getSupportedLocales();
     
//      voltmx.print(keys);
//      for(var i = 0 ;i<keys.length ; i++){
//        var keyvalue = 
//      }
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
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search sold vehicles");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
     this.view.lblSoldVehicles.text = voltmx.i18n.getLocalizedString("Sold Vehicles");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblSoldVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblSoldVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
     
     
     
   },
  
  goToContactPage: function()
  {
    voltmx.store.setItem("contactBackForm", "frmSoldVehicles");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
  }
});

