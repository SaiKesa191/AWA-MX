define({

  onNavigate: function(){
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow;
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
    this.view.flxBack.onClick = this.BackNavigation;
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
  },
  onPreShow: function(){
    this.view.tbxSearch.text = "";
     this.view.lblNorecords.setVisibility(false);
   
   this.pageSize = 10;
    this.currentOffset = 0;
    this.toggleFooterIcons();
    this.lot = "";
     this.title = ""; 
     if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
    this.view.segDeliveredVehicles.setData([]);
     this.view.btnLoadMore.setVisibility(false);
   this.getDeliveredVehicles();
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
 this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
       this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
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
    this.view.segDeliveredVehicles.setData([]);
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

    self.getDeliveredVehicles();
  },
  
  
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
  },
  
    onLoadMoreClick: function()
  {
    
    this.pageSize += 10;
  this.getDeliveredVehicles();
  },
  
  getDeliveredVehicles: function(){
    var self = this;

    
    self.view.segDeliveredVehicles.widgetDataMap = {
  "lblCarName": "lblCarName",
  "imgCardata": "imgCardata",
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
  "lblVehicleStatus": "lblVehicleStatus",
  "lblVehicleStatusValue": "lblVehicleStatusValue",
  "flxContactSupportInner": "flxContactSupportInner",
  "lblContactSupport": "lblContactSupport",
  "lblViewInvoice": "lblViewInvoice",
  "flxViewInvoice": "flxViewInvoice"
};

    var segData = [];
        var seller_delivered_vehicles_inputparam = {};
      var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//     var currentLocale = voltmx.store.getItem("currentLocale");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
//     alert("userObj :"+JSON.stringify(userObj));
  var jobTitle = "";
      if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
     jobTitle = userObj.rawResponse.job_title;
      } else {
//     alert("Warning: job_title is missing from user object.");
      }
    seller_delivered_vehicles_inputparam["serviceID"] = "fry_int_seller$seller-delivered-vehicles";
    seller_delivered_vehicles_inputparam["user_id"] = userId;    
    seller_delivered_vehicles_inputparam["page"] = "1";
    seller_delivered_vehicles_inputparam["lot_no"] = self.lot || "";
    seller_delivered_vehicles_inputparam["title"] = self.title || "";
    seller_delivered_vehicles_inputparam["pageSize"] = self.pageSize;
    seller_delivered_vehicles_inputparam["language"] = currentLocale || "en";

    var seller_delivered_vehicles_httpheaders = {
      "user_token": usertoken
    };
    seller_delivered_vehicles_inputparam["httpheaders"] = seller_delivered_vehicles_httpheaders;
    var seller_delivered_vehicles_httpconfigs = {};
    seller_delivered_vehicles_inputparam["httpconfig"] = seller_delivered_vehicles_httpconfigs;
    fry_int_seller$seller_delivered_vehicles =
      mfintegrationsecureinvokerasync(seller_delivered_vehicles_inputparam, 
                                      "fry_int_seller", 
                                      "seller-delivered-vehicles", 
                                      function(status1,response){
//       alert("status:"+status1);
//       alert("Response from delivered without json:"+response);
//             alert("Response from delivered without json:"+JSON.stringify(response));
      var data = response.records;
      if (!Array.isArray(data) || !data.length) {
    self.view.lblNorecords.setVisibility(true);
    return;
}
      self.view.lblNorecords.setVisibility(false);
       
      var newRecords = data.slice(self.currentOffset);
       if (Array.isArray(data) && data.length > 0) {              
      self.view.lblNorecords.setVisibility(false);
      data.forEach(res=>{
        var lot_no          = res.lot_no;
        var payment_status  = res.payment_status;
        var location        = res.location;
        var total_pages     = res.total_pages;
        var title           = res.title;
        var object_id       = res.object_id;
        var status          = res.status;
        var file_url        = res.file_url;
        var bid_amount      = res.bid_amount;
      segData.push({
        "imgCardata" : {
          "src":(isValidURL(file_url)) ? file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif"
        },
        "lblCarName"  : {
    "text": title,
  "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
        "lblLot": {
    "text": voltmx.i18n.getLocalizedString("Lot #"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
        "lblLotValue"  : {
    "text": lot_no,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
        "lblLocation": {
    "text": voltmx.i18n.getLocalizedString("Location"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
  "lblLocationValue": {
    "text": location,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
  "lblHighestBid": {
    "text": voltmx.i18n.getLocalizedString("Highest Bid"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
  "lblHighestBidValue": {
    "text": bid_amount,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
  "lblBuyerPaymentStatus": {
    "text": voltmx.i18n.getLocalizedString("Buyer payment status"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
  "lblBuyerPaymentStatusValue": {
    "text": payment_status,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
  "lblETPaymentStatus": {
    "text": voltmx.i18n.getLocalizedString("ET payment status"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
  "lblETPaymentStatusValue": {
    "text": payment_status,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
  "lblVehicleStatus": {
    "text": voltmx.i18n.getLocalizedString("Vehicle Status"),
    "left": isArabic ? "" : "0dp",
    "right": isArabic ? "0dp" : "",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  },
  "lblVehicleStatusValue": {
    "text": status,
    "left": isArabic ? "0dp" : "",
    "right": isArabic ? "" : "0dp",
    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  },
//         "lblLocation"  : "Location",
//         "lblLocationValue" : location,
//         "lblHighestBid"  : "Highest Bid",
//         "lblHighestBidValue" : bid_amount,
//         "lblBuyerPaymentStatus" :"Buyer Payment Status",
//         "lblBuyerPaymentStatusValue":payment_status,
//         "lblETPaymentStatus" : "ET Payment Status",
//         "lblETPaymentStatusValue" :status ,
//         "lblVehicleStatus" :"Vehicle Status",
//         "lblVehicleStatusValue" : status,
          "imgContct" : "contactsupport512h.png",
          "lblContactSupport" : voltmx.i18n.getLocalizedString("contact support"),
          "flxBottomLineContactSupport" : {
        
            "skin": "sknflxBg231F20Opacity10per"
          },
        
        "flxContactSupportInner":{
        "left": isArabic ? "" : "1dp",
    "right": isArabic ? "1dp" : "",
           "onClick": self.goToContactPage.bind(this),
           
          },
        "flxViewInvoice":{
          "isVisible": false
        },
        "imgInvoice" : "invoice512h.png",
          "lblViewInvoice" : "View Invoice",
          "flxBottomLineContactSupport" : {
            "skin": "sknflxBg231F20Opacity10per"
          },
        
      });
      
      });
      self.view.segDeliveredVehicles.addAll(segData);
         
          if (self.pageSize > data.length) {
    self.view.btnLoadMore.setVisibility(false);
    self.view.flxsegDeliveredVehicles.height = "90%";
  } else {
    self.view.btnLoadMore.setVisibility(true);
    self.view.flxsegDeliveredVehicles.height = "80%";
    
  }
      self.currentOffset += newRecords.length;
         
//           alert("segData after: " + JSON.stringify(segData));  
            } else {
               self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
//                 alert("Data is not an array or is empty.");
            voltmx.print("Expected 'response.records' to be an array but got:", data);
                return;  // Exit early if the data structure is not as expected
            }

    });
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
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("search deliver vehicles");
     this.view.lblDeliveredVehicles.text = voltmx.i18n.getLocalizedString("Delivered Vehicles");
      this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
          this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblDeliveredVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblDeliveredVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
   },
  
   goToContactPage: function()
  {
     voltmx.store.setItem("contactBackForm","frmDeliveredVehiclesForSeller");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
  }
 
});
