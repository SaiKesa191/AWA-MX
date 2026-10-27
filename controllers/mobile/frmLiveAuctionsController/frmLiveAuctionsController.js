define({ 

 //Type your controller code here 
  onNavigate: function(){
    
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.flxBack.onClick = this.BackNavigation;
    
//     this.view.segLiveAuctions.onRowClick = this.onRowClickAction.bind(this);
    this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);

  },
   onPreShow: function(){
     
//      this.view.tbxSearch.text = "";
     loginToDam();
      if (this.view.tbxSearch) {
      this.view.tbxSearch.text = "";
    } else {
      voltmx.print(" tbxSearch not found. Check if widget ID is correct.");
    }
     this.view.lblNorecords.setVisibility(false);
     this.view.btnLoadMore.setVisibility(false);
      this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segLiveAuctions.setData([]);
       this.lot = "";
     this.title = ""; 
   
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
     //  this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
     if (this.view.tbxSearch) {
//       this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
       this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
    } else {
      voltmx.print(" tbxSearch is not available. Check widget ID or loading order.");
    }
     this.getLiveAuctions();
     this.toggleFooterIcons();
   },
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
  },
  
   onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
  },
  
   setFilterToSeg: function()
  {
    var self = this;
    var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.lblNorecords.setVisibility(false);
    self.view.segLiveAuctions.setData(self.originalSegData);
     self.view.btnLoadMore.setVisibility(true);
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return (
      item.lblCarName.text.toLowerCase().includes(searchText) ||
       item.lblAuctionIdValue.text.toLowerCase().includes(searchText)
      );
  });

  self.view.segLiveAuctions.setData(filteredData);
    
  if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
  self.view.btnLoadMore.setVisibility(false);
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
    this.view.segLiveAuctions.setData([]);
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

    self.getLiveAuctions();
  },
  
  onRowClickAction: function()
  {
   var selectedItem = this.view.segLiveAuctions.selectedRowItems;
   voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

   
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
        var auctionid = selectedItem[0].aucid;
     
     voltmx.store.setItem("previousFormForServices", "frmLiveAuctions");
//      var  currentAuctionNavigation = 
//          voltmx.store.getItem("previousFormForServices");
      
        new voltmx.mvc.Navigation("frmDetails").navigate({
            "objid": objectid,
            "aucid": auctionid
        });
    } else {
        
        voltmx.print("No row selected in segLiveAuctions.");
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
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
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
  
  onLoadMoreClick: function()
  {
    
    this.pageSize += 10;
  this.getLiveAuctions();
  },
  getLiveAuctions: function(){
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var self = this;
     checkTokenValidatity(function() {
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
     var userObj = voltmx.store.getItem("userObject");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
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
    live_auctions_inputparam["page_size"] = String(self.pageSize);
    live_auctions_inputparam["target_selling_price"] = "";
    live_auctions_inputparam["language"] = currentLocale || "en";

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
           self.view.lblNorecords.setVisibility(false);
           self.setDataToLiveAuctions(data);
           
         }
      else{
        self.view.btnLoadMore.setVisibility(false);
        self.view.lblNorecords.setVisibility(true);
//         alert("Data is not an array or is empty.");
            voltmx.print("Expected 'response.records' to be an array but got:", data);
                return;  // Exit early if the data structure is not as expected
      }
    });
     });
},
  
  formatAuctionDateTime: function(rawDateTime) {
//   if (!rawDateTime) return "N/A";

//   // Remove .0 if present
//   var cleaned = rawDateTime.split(".")[0];

//   // Parse into a Date object
//   var dateObj = new Date(cleaned.replace(" ", "T")); // ensures ISO format for parsing

//   if (isNaN(dateObj.getTime())) return "Invalid Date";

//   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   var month = months[dateObj.getMonth()];
//   var day = dateObj.getDate();
//   var year = dateObj.getFullYear();

//   var hours = dateObj.getHours();
//   var minutes = dateObj.getMinutes();
//   var ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12; // convert to 12-hour format
//   minutes = minutes < 10 ? "0" + minutes : minutes;

//   return `${month} ${day} ${year} ${hours}:${minutes}${ampm}`;
    
    if (!rawDateTime) return "N/A";

  // Remove .0 if present
  var cleaned = rawDateTime.split(".")[0];

  //  Add "Z" so JS treats this as UTC time
  var isoString = cleaned.replace(" ", "T") + "Z";
  var dateObj = new Date(isoString);

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
  
  setDataToLiveAuctions: function(data)
  {
    var self = this;
    self.view.segLiveAuctions.widgetDataMap = {
  "imgCar": "imgCar",
  "lblCarName": "lblCarName",
  "lblAuctionId": "lblAuctionId",
  "lblAuctionIdValue": "lblAuctionIdValue",
  "lblChassisNo": "lblChassisNo",
  "lblChassisNoValue": "lblChassisNoValue",
  "lblModel": "lblModel",
  "lblModelValue": "lblModelValue",
  "lblTargetSellingPrice": "lblTargetSellingPrice",
  "flxTargetSellingPriceValue": "flxTargetSellingPriceValue",
  "lblTargetSellingPriceAED": "lblTargetSellingPriceAED",
  "lblTargetSelling": "lblTargetSelling",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
  "lblAuctionStarted": "lblAuctionStarted",
  "lblAuctionStartedValue": "lblAuctionStartedValue",
  "lblAuctionEnded": "lblAuctionEnded",
  "lblAuctionEndedValue": "lblAuctionEndedValue",
  "lblNoBids": "lblNoBids",
  "lblNBidsValue": "lblNBidsValue",
  "lblNoOfVisits": "lblNoOfVisits",
  "lblNoOfVisitsValue": "lblNoOfVisitsValue",
  "lblMaxBid": "lblMaxBid",
  "lblMaxBidValue": "lblMaxBidValue",
  "lblMaxBidAED": "lblMaxBidAED",
  "flxMaxBidValue": "flxMaxBidValue"
};

     var segData = [];
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     var damAvailable = voltmx.store.getItem("isDamAvailable");
//     self.view.segApprovedVehicles.setData([]);
     var newRecords = data.slice(self.currentOffset);
    for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
        segData.push({
          
//           "lblCarName": item.title || "N/A",
          "lblCarName": {
        "text": item.title || "N/A",
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          "imgCar": 
          {
           "src": (damAvailable && isValidURL(item.thumbnail_url)) ? item.thumbnail_url : "noimage.png",
           "imageWhileDownloading": "loading.gif"
          },
//           "lblAuctionId"        : "Auction ID",
            "lblAuctionId": {
        "text": voltmx.i18n.getLocalizedString("Auction ID"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblAuctionIdValue"    : "#"+item.lot_no || "N/A",
             "lblAuctionIdValue": {
        "text": "#"+item.lot_no || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "objid": item.object_id,
          "aucid": item.auction_id,
//           "lblChassisNo"         : "Chassis No",
             "lblChassisNo": {
        "text": voltmx.i18n.getLocalizedString("Chassis Number"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          
//           "lblChassisNoValue"    :item.chassis_number || "N/A",
           "lblChassisNoValue": {
        "text": item.chassis_number || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblModel"             : "Model",
              "lblModel": {
        "text": voltmx.i18n.getLocalizedString("Model"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblModelValue"        : item.year_of_making || "N/A",
           "lblModelValue": {
        "text": item.year_of_making || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblTargetSellingPrice" : "Target Selling Price",
            "lblTargetSellingPrice": {
        "text": voltmx.i18n.getLocalizedString("Target Selling Price"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
           "flxTargetSellingPriceValue": {
            "reverseLayoutDirection": !isArabic,
              "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
          },
          "lblTargetSelling"      : item.target_selling_price || "N/A",
          "lblTargetSellingPriceAED" :"AED",
//           "lblLocation"              :"Location",
            "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLocationValue"         :item.location || "N/A",
             "lblLocationValue": {
        "text": item.location || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblAuctionStarted"        :"Auction Started",
           "lblAuctionStarted": {
        "text": voltmx.i18n.getLocalizedString("Auction Started"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblAuctionStartedValue"   :item.auction_start_date || "N/A",
             "lblAuctionStartedValue": {
        "text": item.auction_start_date || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          
//           "lblAuctionEnded"          : "Auction Ended",
           "lblAuctionEnded": {
        "text": voltmx.i18n.getLocalizedString("Auction Ended"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblAuctionEndedValue"     : self.formatAuctionDateTime(item.bid_close_date) || "N/A",
            "lblAuctionEndedValue": {
        "text": self.formatAuctionDateTime(item.bid_close_date) || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblNoBids"                :"N.Bids",
           "lblNoBids": {
        "text": voltmx.i18n.getLocalizedString("N.Bids"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblNBidsValue"           : item.no_of_bids || "N/A",
          "lblNBidsValue": {
        "text": item.no_of_bids || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblNoOfVisits"            :"Number Of Visits",
           "lblNoOfVisits": {
        "text": voltmx.i18n.getLocalizedString("Number of Visits"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblNoOfVisitsValue"       : item.no_of_vistors || "N/A",
            "lblNoOfVisitsValue": {
        "text": item.no_of_vistors || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblMaxBid"                : "Max Bid",
            "lblMaxBid": {
        "text": voltmx.i18n.getLocalizedString("Max Bid"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          "lblMaxBidAED"             : "AED",
          "lblMaxBidValue"           : item.current_bid || "N/A",
          "flxMaxBidValue":{
            "reverseLayoutDirection": !isArabic,
              "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
          }
          
        });
      }
     
//      self.originalSegData = segData;
     if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
     self.view.segLiveAuctions.addAll(segData);
    
    
     if (self.pageSize > data.length) {
    self.view.flxSegmentLiveAuctions.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxSegmentLiveAuctions.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
  },
  
  adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     this.view.flxSearchContainer.reverseLayoutDirection = isArabic;
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
    
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search live auctions");
     this.view.lblLiveAuctions.text = voltmx.i18n.getLocalizedString("Live Auctions");
        this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblLiveAuctions.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//        this.view.flxBack.left = "";
//        this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblLiveAuctions.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//        this.view.flxBack.left = "0dp";
//        this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
     
     
     
   }
   

 });