define({ 

 //Type your controller code here 

  onNavigate: function(){
    loginToDam();
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow;
    this.view.flxBack.onClick = this.BackNavigation;
//     this.view.btnLoadMore.onClick = this.getApprovedVehicles.bind(this);
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
//     this.view.segApprovedVehicles.onRowClick = this.onRowClickAction.bind(this);
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
    this.view.tbxSearch.text = "";
     this.view.lblNorecords.setVisibility(false);
    this.view.btnLoadMore.setVisibility(false);
     this.pageSize = 10;
    this.currentOffset = 0;
     this.lot = "";
     this.title = ""; 
    this.view.segApprovedVehicles.setData([]);
     if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
    this.getApprovedVehicles();
    this.toggleFooterIcons();
  

  },
  
  onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
  },
  BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
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
   var selectedItem = this.view.segApprovedVehicles.selectedRowItems;
     
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

   
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
        var auctionid = selectedItem[0].aucid;

     voltmx.store.setItem("previousFormForServices", "frmApprovedVehicles");
         voltmx.store.setItem("originForm", "frmApprovedVehicles");  
     var  currentAuctionNavigation = 
         voltmx.store.getItem("previousFormForServices");
        new voltmx.mvc.Navigation("frmDetails").navigate({
            "objid": objectid,
            "aucid": auctionid
        });
    } else {
        
        voltmx.print("No row selected in segLiveAuctions.");
    }
  },
  
  onLoadMoreClick: function()
  {
     this.pageSize += 10;
     this.getApprovedVehicles();
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
    this.view.segApprovedVehicles.setData([]);
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

    self.getApprovedVehicles();
  },
  
   setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.segApprovedVehicles.setData(self.originalSegData);
    self.view.lblNorecords.setVisibility(false);
    return;
    
    
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return (
    item.lblCarName.text.toLowerCase().includes(searchText) || 
     item.lblIdValue.text.toLowerCase().includes(searchText)
      );
  });

  self.view.segApprovedVehicles.setData(filteredData);
    
   if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
}  
  
    
  },
  
  getApprovedVehicles: function(){
    voltmx.application.showLoadingScreen(null, "Loading..", 
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var self = this;
     var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");
//     alert("userObj :"+JSON.stringify(userObj));
  var jobTitle = "";
      if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
     jobTitle = userObj.rawResponse.job_title;
      } else {
//     alert("Warning: job_title is missing from user object.");
      }
    var user_fleet_received_vehicles_inputparam = {};
//     var currentLocale = voltmx.store.getItem("currentLocale");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    user_fleet_received_vehicles_inputparam["serviceID"] = "fry_int_fleet$user-fleet-received-vehicles";
    user_fleet_received_vehicles_inputparam["user_id"] = userId;
    user_fleet_received_vehicles_inputparam["title"] = self.title || "";
    user_fleet_received_vehicles_inputparam["lot_no"] = self.lot || "";
    user_fleet_received_vehicles_inputparam["chassis_no"] = ""; 
    user_fleet_received_vehicles_inputparam["target_selling_price"] = "";
    user_fleet_received_vehicles_inputparam["location"] = "";
    user_fleet_received_vehicles_inputparam["job_title"] = jobTitle; //get from userObject
    user_fleet_received_vehicles_inputparam["page"] = "1";
    user_fleet_received_vehicles_inputparam["pageSize"] = String(self.pageSize);
     user_fleet_received_vehicles_inputparam["language"] = currentLocale || "en";
    var user_fleet_received_vehicles_httpheaders = {
        "user_token": usertoken
    };
    user_fleet_received_vehicles_inputparam["httpheaders"] = user_fleet_received_vehicles_httpheaders;
    var user_fleet_received_vehicles_httpconfigs = {};
    user_fleet_received_vehicles_inputparam["httpconfig"] = user_fleet_received_vehicles_httpconfigs;
    fry_int_fleet$user_fleet_received_vehicles =
      mfintegrationsecureinvokerasync(user_fleet_received_vehicles_inputparam,
                                      "fry_int_fleet",
                                      "user-fleet-received-vehicles", 
                              function(status,response){
      voltmx.application.dismissLoadingScreen();

           if (
    response &&
    response.opstatus === 0 &&
    response.httpresponse &&
    response.httpresponse.responsecode === 200 &&
    Array.isArray(response.records)
) {
   
    if (self.view.flxError) self.view.flxError.setVisibility(false);
    if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);

    var data = response.records;
    if (data && data.length > 0) {
        self.view.lblNorecords.setVisibility(false);
        self.setDataToSegApproved(data);
    } else {
        self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
        voltmx.print("Expected 'response.records' to be a non-empty array but got:", data);
    }
} else {
    
    if (
        response &&
        response.errcode &&
        Number(response.errcode) === 1011
    ) {
        if (self.view.flxError) {
            self.view.flxError.setVisibility(true);
            if (self.view.flxError.lblNetworkConnectionerror) {
                self.view.flxError.lblNetworkConnectionerror.text =
                    "Network issue. Check connection and retry.";
            }
        }
    } else {
        if (self.view.flxServiceError) {
            self.view.flxServiceError.setVisibility(true);
        }
    }

    voltmx.print("Invalid response structure or status:", response);
}


  });
 },
  setDataToSegApproved: function(records)
  {
    var self = this;
    self.view.segApprovedVehicles.widgetDataMap = {
  "lblCarName": "lblCarName",
  "lblId": "lblId",
   "imgCar":"imgCar",
  "lblIdValue": "lblIdValue",
  "lblTitle": "lblTitle",
  "lblTitleValue": "lblTitleValue",
  "lblChassisNo": "lblChassisNo",
  "lblChassisValue": "lblChassisValue",
  "lblModelYear": "lblModelYear",
  "lblModelYearValue": "lblModelYearValue",
  "lblTargetSellingPrice": "lblTargetSellingPrice",
  "lblTargetSelling": "lblTargetSelling",
  "lblTargetSellingPriceAED": "lblTargetSellingPriceAED",
  "flxTargetSellingPriceValue": "flxTargetSellingPriceValue",
  "lblReceived": "lblReceived",
  "lblReceivedValue": "lblReceivedValue",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
   "lblStatus": "lblStatus",
   "lblStatusVal": "lblStatusVal"
};

    
    var segData = [];
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//     self.view.segApprovedVehicles.setData([]);
     var newRecords = records.slice(self.currentOffset);
     var damAvailable = voltmx.store.getItem("isDamAvailable");
    
    for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
        segData.push({
          "imgCar": {
            "src": (damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
            "imageWhileDownloading": "loading.gif"
          },
//             "lblCarName"              : item.title || "N/A",
        "lblCarName": {
        "text": item.title || "N/A",
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblChassisValue"         : item.chassis_number,
             "lblChassisValue": {
        "text": item.chassis_number || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//             "lblTitleValue"           : item.title || "N/A",
            "lblTitleValue": {
        "text": item.title || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//             "lblIdValue"              : "#"+item.lot_no || "N/A",
          "flxTargetSellingPriceValue": {
            "reverseLayoutDirection": !isArabic,
              "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
          },
           "lblIdValue": {
        "text": "#"+item.lot_no || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//             "lblModelYearValue"       : item.year_of_making || "N/A",
            "lblModelYearValue": {
        "text": item.year_of_making || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
            "lblTargetSelling"        : item.target_selling_price || "N/A",
//             "lblLocationValue"        : item.location || "N/A",
            "lblLocationValue": {
        "text": item.location || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
            "objid"                   : item.object_id,
            "aucid"                   : item.auction_id,
//             "lblReceivedValue"        : "Yes",
           "lblReceivedValue": {
        "text": self.formatAuctionDateTime(item.received) || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//             "lblId"                   : voltmx.i18n.getLocalizedString("ID"),
             "lblId": {
        "text": voltmx.i18n.getLocalizedString("ID"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblTitle"                : "Title",
              "lblTitle": {
        "text": voltmx.i18n.getLocalizedString("Title"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblChassisNo"            : voltmx.i18n.getLocalizedString("Chassis Number"),
               "lblChassisNo": {
        "text": voltmx.i18n.getLocalizedString("Chassis Number"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblModelYear"            : "Model Year",
             "lblModelYear": {
        "text": voltmx.i18n.getLocalizedString("Model Year"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblTargetSellingPrice"   : voltmx.i18n.getLocalizedString("Target Selling Price"),
             "lblTargetSellingPrice": {
        "text": voltmx.i18n.getLocalizedString("Target Selling Price"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
            "lblTargetSellingPriceAED": "AED",
//             "lblReceived"             : "Received",
            "lblReceived": {
        "text": voltmx.i18n.getLocalizedString("Received"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//             "lblLocation"             : voltmx.i18n.getLocalizedString("Location")
            "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          
            "lblStatus": {
        "text": voltmx.i18n.getLocalizedString("Status"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          
            "lblStatusVal": {
        "text": item.status || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          
        });
        
      }
    
//      self.originalSegData = segData;
    
    if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
     self.view.segApprovedVehicles.addAll(segData);
    
    
     if (self.pageSize > records.length) {
    self.view.flxSegApprovedVehicles.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxSegApprovedVehicles.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
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
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("search approved vehicles");
     this.view.lblApprovedVehicles.text = voltmx.i18n.getLocalizedString("Approved Vehicles");
         this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblApprovedVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//        this.view.flxBack.left = "";
//        this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblApprovedVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//        this.view.flxBack.left = "0dp";
//        this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
     
     
     
   }
  
 });