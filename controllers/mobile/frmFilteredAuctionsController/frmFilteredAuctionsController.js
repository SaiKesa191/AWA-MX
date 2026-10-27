define({
selectedFilters: {},
  categoryToStorageKey: {
    "asset_definitions": { id: "assetId", name: "assetName" },
    "body_type": { id: "bodyTypeId", name: "bodyTypeName" },
    "brand": { id: "brandId", name: "brandName" },
    "model": { id: "modelId", name: "modelName" },
    "year_make": { id: "yearMakeId", name: "yearMakeName" },
    "mileage_filter": { id: "mileageId", name: "mileageName" },
    "fuel_type": { id: "fuelTypeId", name: "fuelTypeName" },
    "transmission_type": { id: "transmissionTypeId", name: "transmissionTypeName" },
    "auction_types": { id: "auctionTypeId", name: "auctionTypeName" },
    "body_condition": { id: "bodyConditionId", name: "bodyConditionName" },
    "branch": { id: "locationId", name: "locationName" },
    "price_range": { id: "priceRangeId", name: "priceRangeName" }
  },

 onNavigate: function()
  {
    
    this.adjustRTL();
    this.userid = voltmx.store.getItem("userId");
//     this.showCurrentAuctions();
    
    this.mode = voltmx.store.getItem("mode");
    this.view.preShow = this.onPreshow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.flxSort.onClick = function(){
      this.view.flxOverLay.setVisibility(true);
      this.view.flxPopUpSort.setVisibility(true);
    }.bind(this);
   
    this.view.flxFilterSearch.onClick = () =>{
      new voltmx.mvc.Navigation("frmFiltersNew").navigate();
    }
    this.view.btnClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
          this.view.flxWarning.setVisibility(false);
    };
    
    this.view.tbxAutoBidAmount.onTextChange = this.validateBidAmount.bind(this);
    
    
    this.view.onHide = () =>{
      
      try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilter");   
        voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilter cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilter already stopped or not found"); 
       }
       
         try { voltmx.timer.cancel("StartLiveTimerInitFA"); } catch(e){}
      
       try { voltmx.timer.cancel("StartLiveTimerInitOneSecFA"); } catch(e){}
       try { voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilterOneSec"); } catch(e){}
      
      try { voltmx.timer.cancel("updateCountDown1Filter"); } catch(e){}
       
          try { voltmx.timer.cancel("updateCountDownFilter"); } catch(e){}
        try { voltmx.timer.cancel("updateCountDownFilterOneMin"); } catch(e){}
        try { voltmx.timer.cancel("updateCountDown1FilterOneMin"); } catch(e){}
    }
   
    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
    
    this.view.flxUpcomingAuctionsHeading.onClick = this.showUpcomingAuctions.bind(this);
    this.view.flxCurrentAuctionHeading.onClick = this.showCurrentAuctions.bind(this);
    this.view.flxVehicleType.onClick = this.showVehicleTypeFilter.bind(this);
    this.view.flxBodyType.onClick = this.showBodyTypeFilter.bind(this);
    this.view.flxRemoveVehicleTypeFilter.onClick = this.hideVehicleTypeFilter.bind(this);
    this.view.flxRemoveBodyTypeFilter.onClick = this.hideBodyTypeFilter.bind(this);
    this.view.flxCommercialVehicles.onClick = this.onFilterClick.bind(this,this.view.flxCommercialVehicles);
    this.view.flxClassicandCollectorCars.onClick = this.onFilterClick.bind(this,this.view.flxClassicandCollectorCars);
    this.view.flxSalvageVehicles.onClick = this.onFilterClick.bind(this,this.view.flxSalvageVehicles);
    this.view.flxLightVehicles.onClick = this.onFilterClick.bind(this, this.view.flxLightVehicles);
    this.view.flxHeavyVehicles.onClick = this.onFilterClick.bind(this, this.view.flxHeavyVehicles);
    this.view.flxBikes.onClick = this.onFilterClick.bind(this, this.view.flxBikes);
    this.view.segCurrentAuctionList.onRowClick = this.navTofrmDetails.bind(this);
   

    this.view.flxRemoveCommercialVehicleFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveClassicCarsFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveBikesFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveSalvageFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveHeavyVehiclesFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveLightVehiclesFromFilter.onClick = this.removeFromFilterItems.bind(this);
    
    this.view.flxCommercialVehiclesBodyType.onClick = this.onFilterClick.bind(this);
    this.view.flxClassicCarsBodyType.onClick = this.onFilterClick.bind(this);
    this.view.flxSalvageVehiclesBodyType.onClick = this.onFilterClick.bind(this);
    this.view.flxBikesBodyType.onClick = this.onFilterClick.bind(this);
    this.view.flxHeavyVehiclesBodyType.onClick = this.onFilterClick.bind(this);
    this.view.flxLightVehiclesBodyType.onClick = this.onFilterClick.bind(this);
    
    this.view.flxRemoveCommercialVehicleBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveClassicCarsBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveSalvageBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveBikeBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveHeavyVehiclesBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    this.view.flxRemoveLightVehiclesBTFromFilter.onClick = this.removeFromFilterItems.bind(this);
    
    
  },
  
  
  
  onPreshow: function(){
    //    this.setDataToSeg();
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    loginToDam();
//     this.view.btnLoadMore.setVisibility(true);
    this.view.flxPopUpSort.setVisibility(false);
    this.toggleFooterIcons();
    this.insertIntoSegPopUp();
    this.view.tbxBidAmount.editable = false;
    

       if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    this.view.tc.setVisibility(false);
    if(this.view.flxIncreaseLimit)
      {
        this.view.flxIncreaseLimit.setVisibility(false);
      }
    if(this.view.flxIncreaseLimit.btnCancel)
      {
        this.view.flxIncreaseLimit.btnCancel.onClick = () =>{
          this.view.flxIncreaseLimit.setVisibility(false);
        }
      }
    if(this.view.flxIncreaseLimit.btnIncDeposit)
      {
        this.view.flxIncreaseLimit.btnIncDeposit.onClick = () =>{
     voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
    new voltmx.mvc.Navigation("frmPaymentType").navigate();
    
        }
      }
    
    this.populateFilterChips();
//       this.checkSession(function() {
        
//         voltmx.print("Session is valid. Proceeding with data load.");
// //        self.invokeOnlineAuctionList();
      
//     });
   this.invokeOnlineAuctionList();
    this.closeBidAmountContainer();
    
   this.view.flxCommercialVehiclesSelected.setVisibility(false);
    this.view.flxClassicCarsSelected.setVisibility(false);
    this.view.flxSalvageSelected.setVisibility(false);
     this.view.flxBikesSelected.setVisibility(false);
    this.view.flxHeavyVehiclesSelected.setVisibility(false);
    this.view.flxLightVehiclesSelected.setVisibility(false);
    
     this.view.flxCommercialVehiclesBodyTypeSelected.setVisibility(false);
    this.view.flxClassicCarsBodyTypeSelected.setVisibility(false);
     this.view.flxSalvageBodyTypeSelected.setVisibility(false);
     this.view.flxBikesBodyTypeSelected.setVisibility(false);
    this.view.flxHeavyVehiclesBodyTypeSelected.setVisibility(false);
     this.view.flxLightVehiclesBodyTypeSelected.setVisibility(false);
    
     var isSilent = voltmx.store.getItem("isSilentFilter");
voltmx.print("isSilentFilter value: " + isSilent);

if (!isSilent) {
    try {
        voltmx.timer.schedule(
            "StartLiveTimerInitFA",
            function() {
                self.startLivePriceRefresh.call(self);
            },
            5,
            false
        );
    } catch (e) {
        voltmx.print("Error while scheduling StartLiveTimerInitFA: " + e.message);
    }

    try {
        voltmx.timer.schedule(
            "StartLiveTimerInitOneSecFA",
            function() {
                self.startLivePriceRefreshOneSec.call(self);
            },
            5,
            false
        );
    } catch (e) {
        voltmx.print("Error while scheduling StartLiveTimerInitOneSecFA: " + e.message);
    }
} else {
    voltmx.print("isSilentFilter is true — skipping timer scheduling.");
}

    
       try {
 voltmx.timer.schedule(
    "updateCountDownFilter",
    function() {
      self.updateCountDownAllAuctionsMethod.call(self);
    },
    2,
    false
  );
} catch (e) {
    voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
}
    
       try {
 voltmx.timer.schedule(
    "updateCountDownFilterOneMin",
    function() {
      self.updateCountDownAllAuctionsMethodOneMin.call(self);
    },
    2,
    false
  );
} catch (e) {
    voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
}
  },
  
    
  updateCountDownAllAuctionsMethod: function()
  {
    
      try {   
        voltmx.timer.cancel("updateCountDown1Filter");   
        voltmx.print("updateCountDown1Filter cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("updateCountDown1Filter already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "updateCountDown1Filter",
  this.refreshCountDown.bind(this),  // ✅ pass function reference, not call
  1,
  true
);
    
  },
  
   updateCountDownAllAuctionsMethodOneMin: function()
  {
    
      try {   
        voltmx.timer.cancel("updateCountDown1FilterOneMin");   
        voltmx.print("updateCountDown1FilterOneMin cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("updateCountDown1FilterOneMin already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "updateCountDown1FilterOneMin",
  this.refreshCountDownOneMin.bind(this),  // ✅ pass function reference, not call
  60,
  true
);
    
  },
  
  refreshCountDown: function () {
    var self = this;

    try {
        var seg = self.view.segCurrentAuctionList;
        var segData = seg.data;
        if (!segData || segData.length === 0) return;

        var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

      var firstVisible = seg.getFirstVisibleRow();
        var lastVisible = seg.getLastVisibleRow();

        if (!firstVisible || !lastVisible) return;

        var startIndex = firstVisible.rowIndex;
        var endIndex = lastVisible.rowIndex;

        // Safety: ensure bounds
        if (startIndex < 0) startIndex = 0;
        if (endIndex >= segData.length) endIndex = segData.length - 1;
      
        for (var i = startIndex; i <= endIndex; i++) {

            var row = segData[i];
            var rawUTC = row.bidCloseTime;

            var userTime = convertUTCtoUserTime(rawUTC);
//             var newTimeText = getTimeRemainingStringWithSec(userTime);
 if (!userTime) continue;

// Get current device time
var now = new Date();

// Difference in milliseconds
var diffMs = userTime - now;

// Convert to minutes
var diffMin = diffMs / (1000 * 60);


if (diffMin < 5) {
     
          var newTimeText = getTimeRemainingStringWithSec(userTime);
         
            var updatedRow = Object.assign({}, row, {
                lblTimerCount: {
                    text: newTimeText,
                    right: isArabic ? "4%" : "",
                    left: isArabic ? "" : "4%",
                    contentAlignment: isArabic
                        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                        : constants.CONTENT_ALIGN_MIDDLE_LEFT
                }
            });

            // Update only this row
            seg.setDataAt(updatedRow, i);
        }
        }
    } catch (err) {
        voltmx.print("refreshCountDown error: " + err);
    }
},
  
  refreshCountDownOneMin: function () {
    var self = this;

    try {
        var seg = self.view.segCurrentAuctionList;
        var segData = seg.data;
        if (!segData || segData.length === 0) return;

        var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

      var firstVisible = seg.getFirstVisibleRow();
        var lastVisible = seg.getLastVisibleRow();

        if (!firstVisible || !lastVisible) return;

        var startIndex = firstVisible.rowIndex;
        var endIndex = lastVisible.rowIndex;

        // Safety: ensure bounds
        if (startIndex < 0) startIndex = 0;
        if (endIndex >= segData.length) endIndex = segData.length - 1;
      
        for (var i = startIndex; i <= endIndex; i++) {

            var row = segData[i];
            var rawUTC = row.bidCloseTime;

            var userTime = convertUTCtoUserTime(rawUTC);
//             var newTimeText = getTimeRemainingStringWithSec(userTime);
 if (!userTime) continue;

// Get current device time
var now = new Date();

// Difference in milliseconds
var diffMs = userTime - now;

// Convert to minutes
var diffMin = diffMs / (1000 * 60);


// if (diffMin < 5) {
     
          var newTimeText = getTimeRemainingString(userTime);
         
            var updatedRow = Object.assign({}, row, {
                lblTimerCount: {
                    text: newTimeText,
                    right: isArabic ? "4%" : "",
                    left: isArabic ? "" : "4%",
                    contentAlignment: isArabic
                        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                        : constants.CONTENT_ALIGN_MIDDLE_LEFT
                }
            });

            // Update only this row
            seg.setDataAt(updatedRow, i);
//         }
        }
    } catch (err) {
        voltmx.print("refreshCountDown error: " + err);
    }
},
  
  
  checkSession: function(callback) {
    if (this.sessionCookie) {
        voltmx.print("Session already available.");
        callback(); // Proceed if session exists
    } else {
        voltmx.print("No session. Logging in...");
        this.loginToDam((newCookie) => {
            if (newCookie) {
                this.sessionCookie = newCookie;
                callback();
            } else {
                voltmx.print("Login failed. Cannot proceed.");
            }
        });
    }
},

  
 loginToDam: function(callback) {
    var httpClient = new voltmx.net.HttpRequest();
  var baseURL = voltmx.store.getItem("BASE_URL");
 
if (baseURL) {
  baseURL = baseURL.trim();

  // Remove port number at end (e.g., :443, :8443)
  baseURL = baseURL.replace(/:\d+$/, "");

  // Ensure trailing slash
  if (!baseURL.endsWith("/")) {
    baseURL += "/";
  }
}
   var url = baseURL + "dx/api/core/v1/auth/login";
    httpClient.open("POST", url , false);
   var username =  voltmx.store.getItem("DAM_USER_NAME");
    var password = voltmx.store.getItem("DAM_PASSWORD");
    var payload = {
        username: username,
        password: password
    };
    httpClient.setRequestHeader("Content-Type", "application/json");
    httpClient.send(JSON.stringify(payload));

    if (httpClient.status === 200) {
        var allHeaders = httpClient.getAllResponseHeaders();
        var cookie = allHeaders["Set-Cookie"] || allHeaders["set-cookie"];
        if (cookie) {
            voltmx.print("Login successful, new cookie set.");
            callback(cookie);
        } else {
            voltmx.print("Login succeeded but no cookie returned.");
            callback(null);
        }
    } else {
        voltmx.print("Login failed with status: " + httpClient.status);
        callback(null);
    }
},

   startLivePriceRefresh: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilter");
      try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilter");   
        voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilter cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilter already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshfrmAllActionsFilter",
  this.refreshAuctionPrices.bind(this),  //  pass function reference, not call
  60,
  true
);
   },
  
  //for one sec
    startLivePriceRefreshOneSec: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilter");
      try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsFilterOneSec");   
        voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilterOneSec cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshfrmAllActionsFilterOneSec already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshfrmAllActionsFilterOneSec",
  this.refreshAuctionPricesOneSec.bind(this),  //  pass function reference, not call
  1,
  true
);
   },
  
refreshAuctionPrices: function() {
  try {
    var self = this;

    // Skip refresh if form or segment not visible
    if (!self.view || !self.view.segCurrentAuctionList.isVisible) return;

    function getMileageRange(selectedValue) {
      switch (selectedValue) {
        case "10000": return { from: 0, to: 10000 };
        case "30000": return { from: 10001, to: 30000 };
        case "50000": return { from: 30001, to: 50000 };
        case "75000": return { from: 50001, to: 75000 };
        case "100000": return { from: 75001, to: 100000 };
        case "125000": return { from: 100001, to: 125000 };
        case "150000": return { from: 125001, to: 150000 };
        default: return { from: "", to: "" };
      }
    }

    var inputParams = {};
    var currentLocale = voltmx.store.getItem("currentLocale");
    var priceRangeFrom = 0;
    if (voltmx.store.getItem("priceRangeName")) {
      priceRangeFrom = 100;
    }

    inputParams["serviceID"] = "fry_int_auctions$get-buyer-all-auctions";
    inputParams["body_type"] = voltmx.store.getItem("bodyTypeId") || "";
    inputParams["transmission_type"] = voltmx.store.getItem("transmissionTypeId") || "";
    inputParams["fuel_type"] = voltmx.store.getItem("fuelTypeId") || "";
    inputParams["body_condition"] = voltmx.store.getItem("bodyConditionId") || "";
    inputParams["brand"] = voltmx.store.getItem("brandName") || "";
    inputParams["model"] = voltmx.store.getItem("modelName") || "";

    var selectedMileage = voltmx.store.getItem("mileageId") || "";
    var range = getMileageRange(selectedMileage);
    inputParams["mileage_range_from"] = range.from;
    inputParams["mileage_range_to"] = range.to;

    inputParams["asset_id"] = voltmx.store.getItem("assetId") || "";
    inputParams["user_id"] = self.userid ? self.userid : "";
    inputParams["year_range_from"] = Number(voltmx.store.getItem("yearMakeName"));
    inputParams["year_range_to"] = Number(voltmx.store.getItem("yearMakeName"));

    var isSilent = voltmx.store.getItem("isSilentFilter");
    if (isSilent) {
      inputParams["auction_type"] = "4";
    } else {
      inputParams["auction_type"] = "1;2;3";
    }

    inputParams["yard_branch"] = Number(voltmx.store.getItem("locationId")) || 0;
    inputParams["price_range_from"] = priceRangeFrom;
    inputParams["price_range_to"] = Number(voltmx.store.getItem("priceRangeName")) || 0;
    inputParams["priceSort"] = 0;
    inputParams["milageSort"] = 0;
    inputParams["yearSort"] = 0;
    inputParams["page"] = 1;
    inputParams["lot_no"] = "";
    inputParams["bid_close_date"] = "";
    inputParams["pageSize"] = self.pageSize;
    inputParams["upcoming_auctions"] = 0;
    inputParams["language"] = currentLocale || "en";

    inputParams["httpheaders"] = {};
    inputParams["httpconfig"] = {};

    mfintegrationsecureinvokerasync(
      inputParams,
      "fry_int_auctions",
      "get-buyer-all-auctions",
      function(status, response) {
        try {
          if (response && response.opstatus === 0 && Array.isArray(response.records)) {
            self.updateAuctionPrices.call(self, response.records);
          } else {
            voltmx.print("Invalid refresh response or empty records");
          }
        } catch (innerErr) {
          voltmx.print("Error handling refreshAuctionPrices callback: " + innerErr.message);
        }
      }
    );
  } catch (ex) {
    voltmx.print("Error in refreshAuctionPrices: " + ex.message);
  }
},

/**
 * Update only changed prices in the segment (no full reload)
 */
 updateAuctionPrices: function(newRecords) {
  var self = this;
  var seg = self.view.segCurrentAuctionList;
  var existingData = seg.data;
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  if (!existingData || !existingData.length) return;

  var dataMap = {}; // quick lookup by auction id
  for (var i = 0; i < newRecords.length; i++) {
    var rec = newRecords[i];
    dataMap[rec.object_id] = rec;
  }

  for (var j = 0; j < existingData.length; j++) {
    var row = existingData[j];
    var objid = row.objid;
    var latest = dataMap[objid];
    if (latest) {
      var newPrice = Number(latest.max_bid_amount).toLocaleString("en-AE");
      var currentDisplayedPrice = row.lblPrice.text.replace("AED ", "").trim();

      if (currentDisplayedPrice !== newPrice) {
        // Update only price label + maybe bidder highlight
        var newSkin =
          latest.highest_bidder === self.userid
            ? "sknLblDubai02905120pxBold"
            : "sknLblDubaid3243720pxbold";
        
        var updatedRow = Object.assign({}, row, {
          lblPrice: { text: "AED " + newPrice, skin: newSkin,
                    left: isArabic ? "4%" : "",
            right: isArabic ? "" : "8%",
            contentAlignment: isArabic
              ? constants.CONTENT_ALIGN_MIDDLE_LEFT
              : constants.CONTENT_ALIGN_MIDDLE_RIGHT
                    },
          highestbidder: latest.highest_bidder
          
        });

        seg.setDataAt(updatedRow, j);
      }
    }
  }
},
  
   /**
 * Fetch latest price data periodically one sec
 */
 refreshAuctionPricesOneSec: function() {
  try {
    var self = this;

    // If form or segment is not visible, skip refresh
    if (!self.view || !self.view.segCurrentAuctionList.isVisible) return;

    var inputParams = {
      serviceID: "fry_int_common$get-active-auction-bids",
      auction_ids: self.activeAuctionIds
    };

    mfintegrationsecureinvokerasync(
      inputParams,
      "fry_int_common",
      "get-active-auction-bids",
      function(status, response) {
        if (response && response.opstatus === 0 && Array.isArray(response.records)) {
          self.updateAuctionPricesOneSec.call(self, response.records);
        }
      }
    );
  } catch (ex) {
    voltmx.print("Error in refreshAuctionPrices: " + ex.message);
  }
},

/**
 * Update only changed prices in the segment (no full reload) one sec
 */
 updateAuctionPricesOneSec: function(newRecords) {
  var self = this;
  var seg = self.view.segCurrentAuctionList;
  var existingData = seg.data;
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  if (!existingData || !existingData.length) return;

  var dataMap = {}; // quick lookup by auction id
  for (var i = 0; i < newRecords.length; i++) {
    var rec = newRecords[i];
    dataMap[rec.object_id] = rec;
  }

  for (var j = 0; j < existingData.length; j++) {
    var row = existingData[j];
    var objid = row.objid;
    var latest = dataMap[objid];
    if (latest) {
      var newPrice = Number(latest.max_bid_amount).toLocaleString("en-AE");
      var currentDisplayedPrice = row.lblPrice.text.replace("AED ", "").trim();

      if (currentDisplayedPrice !== newPrice) {
        // Update only price label + maybe bidder highlight
        var newSkin =
          latest.highest_bidder === self.userid
            ? "sknLblDubai02905120pxBold"
            : "sknLblDubaid3243720pxbold";
        
        var updatedRow = Object.assign({}, row, {
          lblPrice: { text: "AED " + newPrice, skin: newSkin,
                    left: isArabic ? "4%" : "",
            right: isArabic ? "" : "8%",
            contentAlignment: isArabic
              ? constants.CONTENT_ALIGN_MIDDLE_LEFT
              : constants.CONTENT_ALIGN_MIDDLE_RIGHT
                    },
          highestbidder: latest.highest_bidder
          
        });

        seg.setDataAt(updatedRow, j);
      }
      
    
    }
  }
},
  
  onPostShow: function()
  {
     this.view.btnLoadMore.setVisibility(false);
     this.view.lblNorecords.setVisibility(false);
//     this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
//     this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
//     this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");
    this.view.btnBidNow.onClick = this.invokeFryWfAuctionBidding.bind(this);
    this.view.segAuctionPopUp.onRowClick = this.selectedOption.bind(this);
    this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
    };
    
//      this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {
      
//      if (Number(y) > 36 && Number(y) < 62) {
//     this.view.tc.setVisibility(true);
// }
//     }
    this.view.rcTXT.onClick = (widgetref, context) => {
       var self = this;
      try{
        let clickedText = "";
 
    if (typeof context === "string") {
        clickedText = context.trim();
    } else if (context && context.text) {
        clickedText = context.text.trim();
    }
 
    if (!clickedText) return;
 
    if (clickedText.includes("Terms And Conditions") ||
        clickedText.includes("الشروط والأحكام")) {
         self.view.tc.setVisibility(true);
                var t = voltmx.ui.makeAffineTransform();
          t.translate(0, 60);

          self.view.tc.animate(
            voltmx.ui.createAnimation({
              "0": { "transform": t, "opacity": 0 },
              "100": { "transform": voltmx.ui.makeAffineTransform(), "opacity": 1 }
            }),
            { duration: 0.3, fillMode: voltmx.anim.FILL_MODE_FORWARDS },
            {}
          );
    }
      }
      catch(e){
        voltmx.print(e);
      }
};
         this.view.tc.flxBack.onClick = ()  => {
      this.view.tc.setVisibility(false);
    }
   
      this.view.flxWarningClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
          this.view.flxWarning.setVisibility(false);
    };
    
     if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
    
     
    this.view.flxCheckBox1.onClick = () => {
       
      if(this.view.imgCheck.isVisible)
        {
          this.view.imgCheck.setVisibility(false);
          this.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
        }
      else{
        this.view.imgCheck.setVisibility(true);
          this.view.btnBidNow.skin = "sknBtnBid61B35C8pxradius";
        }
      };
       
    this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    
    this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
//     this.view.btnAutoBid2.onClick = this.invokeAutoBidFunction2.bind(this);
    this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
    this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
    },

  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(true);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
//     sknlblCPBoldDisp333333Font200
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
    this.view.Footer2.imgSearch.src = "searchactive.png";
    this.view.Footer2.lblSearch.skin = "sknLblDubaid3243714pxBold";
    
     var mode = voltmx.store.getItem("mode");
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
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
    
  insertIntoSegPopUp: function () {
    var data = [
      {
        "lbl01": {
          "text": "Ending Soonest (default)",
          "skin": "sknlbl231F20Dubai20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_on.png",
          "isVisible": true
        }
      },
      {
        "lbl01": {
          "text": "Newest Listings",
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        }
      },
      {
        "lbl01": {
          "text": "Lowest Price First",
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        }
      },
      {
        "lbl01": {
          "text": "Highest Price First",
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        }
      },
      {
        "lbl01": {
          "text": "Most Bids Received",
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        }
      },
      {
        "lbl01": {
          "text": "Nearest Location",
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        }
      }
    ];

    this.view.segAuctionPopUp.setData(data);
  },

  selectedOption: function () {
    
    var seg = this.view.segAuctionPopUp;
    var selectedIndex = seg.selectedRowIndex[1]; 
    var data = seg.data;

    // Set all rows to unselected
    for (var i = 0; i < data.length; i++) {
      data[i].imgcheckedbutton.src = "radio_popup_off.png";
      data[i].imgcheckedbutton.isVisible = true;
    }

    // Set selected row to selected
    data[selectedIndex].imgcheckedbutton.src = "radio_popup_on.png";
    data[selectedIndex].imgcheckedbutton.isVisible = true;

    // Update segment with modified data
    seg.setData(data);

    // Get selected text and alert
    var selectedText = data[selectedIndex].lbl01.text;
//     alert("Selected: " + selectedText);
     this.view.flxPopUpSort.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },
  
  onLoadMoreClick: function() {
    this.pageSize += 10;
  this.invokeOnlineAuctionList(); // Will bring all up to new pageSize
},
  
   populateFilterChips: function() {
    var self = this;
    this.view.flxFilteredItems.removeAll();
    this.selectedFilters = {};

    // Retrieve filters from voltmx.store
    for (var category in this.categoryToStorageKey) {
      var storageKeys = this.categoryToStorageKey[category];
      var id = voltmx.store.getItem(storageKeys.id);
      var name = voltmx.store.getItem(storageKeys.name);
      if (id && name) {
        this.selectedFilters[category] = [{ id: id, name: name }];
        this.addFilterChip(category, id, name);
      }
    }

    // Handle price_range separately
    var priceRange = voltmx.store.getItem("selectedPriceRange");
    if (priceRange) {
      try {
        priceRange = JSON.parse(priceRange);
        if (priceRange.min !== undefined && priceRange.max !== undefined) {
          var priceLabel = `Price: ${priceRange.min}-${priceRange.max}`;
          this.selectedFilters["price_range"] = [{ id: "price_" + priceRange.max, name: priceLabel }];
          this.addFilterChip("price_range", "price_" + priceRange.max, priceLabel);
        }
      } catch (e) {
        voltmx.print("Error parsing priceRange: " + e.message);
      }
    }

    this.view.flxFilteredItems.isVisible = Object.keys(this.selectedFilters).length > 0;
  },

  
   addFilterChip: function(category, id, labelText) {
    var self = this;
    var chipId = "flx_" + category + "_" + id;

    // Remove existing chip if it exists
    if (self.view.flxFilteredItems[chipId]) {
        self.view.flxFilteredItems.remove(self.view.flxFilteredItems[chipId]);
    }

      var avgCharWidth = 8; // dp per character for your font size
    var chipWidth = (labelText.length * avgCharWidth) + 50;
     

     var flx = new voltmx.ui.FlexContainer({
    id: chipId,
    autogrowMode: voltmx.flex.AUTOGROW_NONE,
    clipBounds: true,
    height: "80%",
    width: chipWidth + "dp",
    isVisible: true,
    layoutType: voltmx.flex.FREE_FORM, // Changed from FLOW_HORIZONTAL
    left: "10dp",
    skin: "sknFlxfce3e1bordere73183",
    centerY: "50%",
//     isSelected: true,
       isSelected: !!(self.selectedFilters[category] && 
                   self.selectedFilters[category].some(item => item.id === id)),
    onClick: function () {
        self.toggleFilterChip(category, id, labelText);
    }
}, {
    padding: [5, 0, 5, 0],
    paddingInPixel: false
}, {});
flx.setDefaultUnit(voltmx.flex.DP); // Important for free-form positioning

var img = new voltmx.ui.Image2({
    id: "img_" + category + "_" + id,
    isVisible: true,
    left: "5dp",
    src: "crossred2x.png",
    centerY: "50%",
    height: "25%",
    width: "20dp",
    zIndex: 1
}, {
    imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    padding: [0, 0, 0, 0],
    paddingInPixel: false
}, {});

var lbl = new voltmx.ui.Label({
    id: "lbl_" + category + "_" + id,
    text: labelText,
    skin: "sknLblDubaid3243716pxbold",
    centerY: "50%",
    left: "30dp", // Keeps alignment similar to your second function
    width: voltmx.flex.USE_PREFERRED_SIZE
}, {
    contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT,
    padding: [5, 0, 5, 0],
    paddingInPixel: false
}, { textCopyable: false });

flx.add(img, lbl);

    self.view.flxFilteredItems.add(flx);
    self.view.forceLayout(); // Ensure layout updates
},

toggleFilterChip: function(category, id, labelText) {
    var self = this;
    var chipId = "flx_" + category + "_" + id;
    var chipWidget = self.view.flxFilteredItems[chipId];

    if (!chipWidget) {
        voltmx.print("Chip not found: " + chipId);
        return;
    }
  
  
//   if (typeof chipWidget.isSelected === "undefined") {
//         chipWidget.isSelected = false;
//     }

    // Toggle the isSelected state
  
//     chipWidget.isSelected = !chipWidget.isSelected;
    var alreadySelected = self.selectedFilters[category] && 
                      self.selectedFilters[category].some(item => item.id === id);

chipWidget.isSelected = !alreadySelected;


    // Update UI based on state
//     self.updateFilterChipUI(category, id, chipWidget.isSelected);

    if (!chipWidget.isSelected) {
        // Remove from selectedFilters and voltmx.store
        if (self.selectedFilters[category]) {
            self.selectedFilters[category] = self.selectedFilters[category].filter(function(item) {
                return item.id !== id;
            });

            if (self.selectedFilters[category].length === 0) {
                delete self.selectedFilters[category];
                var storageKeys = self.categoryToStorageKey[category];
                if (storageKeys) {
                    voltmx.store.removeItem(storageKeys.id);
                    voltmx.store.removeItem(storageKeys.name);
                }
                if (category === "price_range") {
                    voltmx.store.removeItem("selectedPriceRange");
                }
            }
        }
        self.view.flxFilteredItems.remove(chipWidget);
        // Refresh auction list
        self.view.segCurrentAuctionList.setData([]);
        self.currentOffset = 0;
        self.invokeOnlineAuctionList();
    } else {
        // Re-add to selectedFilters and voltmx.store
        var storageKeys = self.categoryToStorageKey[category];
        if (storageKeys) {
            voltmx.store.setItem(storageKeys.id, id);
            voltmx.store.setItem(storageKeys.name, labelText);
            self.selectedFilters[category] = [{ id: id, name: labelText }];
            if (category === "price_range") {
                var priceParts = labelText.replace("Price: ", "").split("-");
                voltmx.store.setItem("selectedPriceRange", JSON.stringify({
                    min: parseInt(priceParts[0]),
                    max: parseInt(priceParts[1])
                }));
            }
        }

        // Refresh auction list
        self.view.segCurrentAuctionList.setData([]);
        self.currentOffset = 0;
        self.invokeOnlineAuctionList();
    }

    // Update visibility of flxFilteredItems
//     self.view.flxFilteredItems.isVisible = Object.keys(self.selectedFilters).length > 0;
},

updateFilterChipUI: function(category, id, isSelected) {
    var self = this;
    var chipId = "flx_" + category + "_" + id;
    var imgId = "img_" + category + "_" + id;
    var lblId = "lbl_" + category + "_" + id;

    var chipWidget = self.view.flxFilteredItems[chipId];
    var imgWidget = self.view.flxFilteredItems[imgId];
    var lblWidget = self.view.flxFilteredItems[lblId];
  
//     chipWidget.isSelected = isSelected;
  
  if (isSelected) {
        chipWidget.skin = "sknFlxfce3e1bordere73183";
        lblWidget.skin = "sknLblDubaid3243716pxbold";
        imgWidget.isVisible = true;
    } else {
        chipWidget.skin = "sknFlxFFFFFFBorderebebeb1px";
        lblWidget.skin = "sknLblDubai231f2016pxBold";
        imgWidget.isVisible = false;
    }

    self.view.forceLayout(); // Ensure UI updates
},

  
  invokeOnlineAuctionList: function(){
    
     var self = this;
 voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    
    function getMileageRange(selectedValue) {
  switch (selectedValue) {
    case "10000": return { from: 0, to: 10000 };
    case "30000": return { from: 10001, to: 30000 };
    case "50000": return { from: 30001, to: 50000 };
    case "75000": return { from: 50001, to: 75000 };
    case "100000": return { from: 75001, to: 100000 };
    case "125000": return { from: 100001, to: 125000 };
    case "150000": return { from: 125001, to: 150000 };
    default: return { from: "", to: "" }; // fallback
  }
}

    
    function invServiceCallBack(status, online_auction_list) {
      voltmx.application.dismissLoadingScreen();
      if (!online_auction_list || !online_auction_list.records) {
        voltmx.print("Error: Response is null or missing auction_list");
        return;
      }
       var records = [];
    if (
        online_auction_list &&
        Array.isArray(online_auction_list.records)
    ) {
        records = online_auction_list.records;
    }
      
//       var records = online_auction_list.records;
      if(records && records.length > 0){
      self.setDataToSegFromService(records);
      self.view.lblNorecords.setVisibility(false);
        
        
         var isSilent = voltmx.store.getItem("isSilentFilter");
    if (!isSilent) {
      self.activeAuctionIds = records
            .filter(record => record.is_user_bid === "true")
            .map(record => record.auction_id)
            .join(";");
    } 
        
     
      }
      else{
       self.view.lblNorecords.setVisibility(true);
       self.view.btnLoadMore.setVisibility(false);
      }
    }
    if (online_auction_list_inputparam == undefined) {
        var online_auction_list_inputparam = {};
    }
    var currentLocale = voltmx.store.getItem("currentLocale");
    var priceRangeFrom = 0;
    if(voltmx.store.getItem("priceRangeName")){
      priceRangeFrom = 100;
    }
    online_auction_list_inputparam["serviceID"] = "fry_int_auctions$get-buyer-all-auctions";
    online_auction_list_inputparam["body_type"] = voltmx.store.getItem("bodyTypeId") || "";
    online_auction_list_inputparam["transmission_type"] = voltmx.store.getItem("transmissionTypeId") || "";
    online_auction_list_inputparam["fuel_type"] = voltmx.store.getItem("fuelTypeId") || "";
    online_auction_list_inputparam["body_condition"] = voltmx.store.getItem("bodyConditionId") || "";
    online_auction_list_inputparam["brand"] = voltmx.store.getItem("brandName") || "";
    online_auction_list_inputparam["model"] = voltmx.store.getItem("modelName") || "";
     var selectedMileage = voltmx.store.getItem("mileageId") || "";
var range = getMileageRange(selectedMileage);

online_auction_list_inputparam["mileage_range_from"] = range.from;
online_auction_list_inputparam["mileage_range_to"] = range.to;

    online_auction_list_inputparam["asset_id"] = voltmx.store.getItem("assetId") || "";
//      online_auction_list_inputparam["lot_no"] = 0
    online_auction_list_inputparam["user_id"] = this.userid ? this.userid : "";
     online_auction_list_inputparam["year_range_from"] = Number(voltmx.store.getItem("yearMakeName"));
     online_auction_list_inputparam["year_range_to"] = Number(voltmx.store.getItem("yearMakeName"));
//      online_auction_list_inputparam["auction_type"] = Number(voltmx.store.getItem("auctionTypeId")) || 0;
    var isSilent =  voltmx.store.getItem("isSilentFilter");
    if(isSilent){
      online_auction_list_inputparam["auction_type"] = "4";
    }else{
      online_auction_list_inputparam["auction_type"] = "1;2;3";
    }
      
     online_auction_list_inputparam["yard_branch"] = Number(voltmx.store.getItem("locationId")) || 0;
//      online_auction_list_inputparam["lot_no"] = 0;
     online_auction_list_inputparam["price_range_from"] = priceRangeFrom;
     online_auction_list_inputparam["price_range_to"] = Number(voltmx.store.getItem("priceRangeName")) || 0;
    online_auction_list_inputparam["priceSort"] = 0;
    online_auction_list_inputparam["milageSort"] = 0;
    online_auction_list_inputparam["yearSort"] = 0;
     online_auction_list_inputparam["page"] = 1;
    online_auction_list_inputparam["lot_no"] = "";
    online_auction_list_inputparam["bid_close_date"] = "";
     online_auction_list_inputparam["pageSize"] = self.pageSize;
    online_auction_list_inputparam["upcoming_auctions"] = 0;
    online_auction_list_inputparam["language"] = currentLocale || "en";
    var online_auction_list_httpheaders = {};
    online_auction_list_inputparam["httpheaders"] = online_auction_list_httpheaders;
    var online_auction_list_httpconfigs = {};
    online_auction_list_inputparam["httpconfig"] = online_auction_list_httpconfigs;
    fry_int_auctions$online_auction_list = mfintegrationsecureinvokerasync(online_auction_list_inputparam, "fry_int_auctions", "get-buyer-all-auctions", invServiceCallBack);

  
    
  },
  
 
  setDataToSegFromService: function(records)
  {
    var self = this;
    this.view.segCurrentAuctionList.widgetDataMap = {
      "lblObjID":"lblObjID",
      "lblAuctionID":"lblAuctionID",
      "imgCarPIcture":"imgCarPIcture",
      "lblCarname":"lblCarname",
      "lblTimerCount":"lblTimerCount",
      "bidCloseTime":"bidCloseTime",
//       "lblLot":"lblLot",
      "lblLotNum":"lblLotNum",
//       "lblTotalBids":"lblTotalBids",
      "lblTotalBidsCount":"lblTotalBidsCount",
      "lblYear":"lblYear",
      "lblYearVal":"lblYearVal",
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
    "lblBidAmount":"lblBidAmount",
     "flxBidPrice":"flxBidPrice"
    }

  self.loadNextRecords(records); 

  },
  
  loadNextRecords: function(records) {
  var self = this;
  var data = [];
     var isSilent =  voltmx.store.getItem("isSilentFilter");
     var newRecords = records.slice(self.currentOffset); // Only new ones
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     var damAvailable = voltmx.store.getItem("isDamAvailable");
    var silentSkin = "sknLblDubai0d74b520pxbold";
  for (var i = 0; i < newRecords.length; i++) {
    var item = newRecords[i];
    var imageUrl = item.thumbnail_url;
    
     let isYourBidVisible = false;

if (item && item.max_bid_amount != null) {
  if (Number(item.max_bid_amount) !== 0) {
    isYourBidVisible = true;
  }
}
    var carimage = (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png";
    var imagePlaceholder = "loading.gif";
    
    var carname = item.title && item.title.trim() !== "" ? item.title : "N/A";
    var timercount = item.time_remaining;
//     var timercountInsert = this.getCountDown("2025-06-20 23:59:59.0");
    
//     var bidclosetime = self.getTimeRemainingString(timercount);
    var userTargetTime = convertUTCtoUserTime(timercount);
    var bidclosetime = getTimeRemainingString(userTargetTime);
    var lotnum = item.ID || "N/A";
    var totalbids = item.location || "N/A";
    var location = item.milage || "N/A";
    var objid = item.object_id;
    var aucid = item.auction_id;
    var year = item.year || "N/A";
    var price = Number(item.max_bid_amount).toLocaleString("en-AE");
    var highestbidder = item.highest_bidder;
    var bidrateSkin = (item.highest_bidder === this.userid) ? "sknLblDubai02905120pxBold" : "sknLblDubaid3243720pxbold";
    var favFlexSkin = (item.is_favourite === "true") ? "sknFlxd32437custom120pxround" : "sknFlx231f20custom120pxround";
    var imgheartset = (item.is_favourite === "true") ? "heartlikerecommended.png" : "imgdislikenew.png";
    var autobidimg = (item.is_auto_bid && item.is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";
     
    data.push({
        "flxCurrentAuctions": {
  "reverseLayoutDirection": isArabic
},
      "imgCarPIcture": {
  "src": carimage,
  "imageWhileDownloading": imagePlaceholder,
  "dynamicImageLoading": true
},
      "lblCarname": {
        "text": carname,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "lblObjID": objid,
       "lblTimerCount": {
        "text": bidclosetime,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "bidCloseTime": timercount,
      "objid": objid,
      "aucid":aucid,
//       "lblLot": "Lot #",
       "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
       "lblLotNum": {
        "text": lotnum,
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
        "text": year,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//       "lblTotalBids": "Total Bids",
       "lblTotalBids": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
       "lblTotalBidsCount": {
        "text": totalbids,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
       "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Mileage"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblLocation": "Location",
       "lblLocationName": {
        "text": location,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      "lblAuctionID": aucid,
      "highestbidder":highestbidder,
      "flxLikeHeart": {
        "isVisible": true,
        "skin": favFlexSkin,
        "onClick": this.addActiveToWishList.bind(this,objid,aucid)
      },
      "imgHeart": imgheartset,
         "flxBidPrice": {
          "isVisible": isSilent ? isYourBidVisible : true
        },
       "lblBidAmount": {
        "text": isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") : voltmx.i18n.getLocalizedString("current bid"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "lblPrice": {
        "text": isSilent ? price : "AED " + price,
        "skin": isSilent ? silentSkin : bidrateSkin,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      "flxAutoBid": {
        "isVisible": false,
        "onClick": this.enableAutoBid.bind(this, objid, aucid)
      },
      "imgAutoBidicon": autobidimg,
      "lblAutoBid": "AUTO BID",
//       "btnBidNow": {
//         "onClick": this.openBidAmountContainer.bind(this, objid, aucid, price, highestbidder),
//         "text": voltmx.i18n.getLocalizedString("BID NOW")
//       }
      "btnBidNow": {
   "onClick": function(widget, context) {
        var rowIndex = context.rowIndex;   // get the row index
        var rowData = self.view.segCurrentAuctionList.data[rowIndex]; // fetch row data from segment
        if (!rowData) return;

        var latestPrice = Number(rowData.lblPrice.text.replace("AED ", "").trim());
        var latestHighestBidder = rowData.highestbidder || "";

        self.openBidAmountContainer(rowData.objid, rowData.aucid, latestPrice, latestHighestBidder,rowData.lblLotNum.text);
    },
    "text": voltmx.i18n.getLocalizedString("BID NOW")
}
    });
  
   }
  
  self.view.segCurrentAuctionList.addAll(data);
    
//     self.startAuctionCountdown();
     voltmx.application.dismissLoadingScreen();
    
     if (self.pageSize > records.length) {
    self.view.flxAuctionsSegmentBody.height = "100%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxAuctionsSegmentBody.height = "90%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
    
    

},
  
  getTimeRemainingString: function(targetTimeString) {
  try {
    var now = new Date().getTime();
    var target = new Date(targetTimeString).getTime();
    var diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return "0D 0H 0M 0S";
    }

    var seconds = Math.floor((diff / 1000) % 60);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days + "D " + hours + "H " + minutes + "M " + seconds + "S";
  } catch (e) {
    return "N/A";
  }
},
 
//   openBidAmountContainer: function(objid,aucid,price,highestbidder){
//     var isLogin = voltmx.store.getItem("isLogin");
    
//     this.objid = null;
//     this.aucid = null;
          
//      this.objIdForAutoBid = null;
//     this.aucIdForAutoBid = null;
          
    
//     if(isLogin)
//       {
//         if(this.mode !== "seller"){
//         if(highestbidder !== this.userid){
        
//      var selectedData = this.view.segCurrentAuctionList.selectedRowItems[0];
// //     this.currentAmount = price;
//     this.objid = objid;
//     this.aucid = aucid;
          
//      this.objIdForAutoBid = objid;
//     this.aucIdForAutoBid = aucid;
          
    
//     var amountText = selectedData.lblPrice.text;  // "AED 23500.00"
    
//     var amountOnly = amountText.replace("AED", "").trim();
//     this.createChipSetRelated(amountOnly);
//     this.currentAmount = Number(amountOnly);
//     this.view.flxBidAmountSelectionContainer.setVisibility(true);
//     this.view.imgCheck.setVisibility(false);
// //     this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
// //     this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
// //     this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//     this.view.tbxBidAmount.text = "";
//     this.view.flxOverLay.setVisibility(true);
//       }
//            else{
//           alert('You are already a highest bidder');
//         }
//         }
       
//         else{
//           this.view.flxOverLay.setVisibility(true);
//           this.view.flxWarning.setVisibility(true);
// //           alert("You are Seller. Switch to Buyer to use this feature");
//         }
//       }
        
//     else{
//       var x = new voltmx.mvc.Navigation("frmLoginScreen");
//       x.navigate();
//     }
//   },
  
   openBidAmountContainer: function(objid, aucid, price, highestbidder,lot) {
     var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
    this.view.flxScrollBidAmount.removeAll();
    this.objid = objid;
    this.aucid = aucid;
    this.lotForUpdateActiveAuctionId = lot;
    this.objIdForAutoBid = objid;
    this.aucIdForAutoBid = aucid;

    if (isLogin) {
      
     
      this.view.btnBidNow.setEnabled(true);
      

        if ((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller") {
          var isSilent =  voltmx.store.getItem("isSilentFilter");
          if(isSilent){
           self.view.flxAutoBidandAmounts.setVisibility(false);
         self.view.tbxBidAmount.setEnabled(true);
          self.view.lblSelectIncrement.setVisibility(false);
           

        }
        else{
           self.view.flxAutoBidandAmounts.setVisibility(true);
         self.view.tbxBidAmount.setEnabled(false);
          self.view.lblSelectIncrement.setVisibility(true);
         
          
        }
          

              if(!isSilent){
                getBidDetailsByObjectId(objid, aucid, function(response) {
                    if (response && response.records && response.records.length > 0) {
                         var record = response.records[0];
                        var chipsets = record.chipsets || "";
                        var bidAmounts = chipsets.split(";").map(function(item) {
                            return item.trim();
                        });
                       // Set current amount from bid_amount, remove decimals
        var bidAmount = parseInt(record.bid_amount, 10) || 0;
        self.currentAmount = bidAmount;
                        self.createChipSetRelated(bidAmounts);  // Pass the dynamic chipsets
                    } else {
                        voltmx.print(" No bid chipsets found, fallback to default.");
                        self.createChipSetRelated([]);  // Empty or fallback
                    }
                });
              }
                this.view.flxBidAmountSelectionContainer.setVisibility(true);
                this.view.imgCheck.setVisibility(false);
                this.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
                this.view.tbxBidAmount.text = "";
                this.view.flxOverLay.setVisibility(true);

        } else {
            this.view.flxOverLay.setVisibility(true);
            this.view.flxWarning.setVisibility(true);
        }
    } else {
        new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
},
  
  createChipSetRelated: function(bidAmounts) {
    var self = this;
//     this.view.flxScrollBidAmount.removeAll();
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.dynamicBidButtons = {};

    if (!bidAmounts || bidAmounts.length === 0) {
        voltmx.print(" No bid amounts provided.");
        return;
    }

    bidAmounts.forEach(function(amount, index) {
        var btnId = "btn" + amount + "AED";
        var btn = new voltmx.ui.Button({
            "centerY": "50%",
            "height": "100%",
            "id": btnId,
            "isVisible": true,
            "left": isArabic ? "" : (index === 0 ? "5%" : "2%"),
             "right": isArabic ? (index === 0 ? "5%" : "2%") : "",
            "skin": "sknBtnCCCCCCBorderDubai75778620px",
            "text": "+" + amount + " AED",
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "onClick": self.selectBidAmountAddIntoTextBox.bind(self, amount)
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [5, 0, 5, 0],
            "paddingInPixel": false
        }, {});

        self.dynamicBidButtons[amount] = btn;
        self.view.flxScrollBidAmount.add(btn);
    });
    
     // Force scroll to start in Arabic
     if (isArabic && this.view.flxScrollBidAmount.scrollToEnd) {
        this.view.flxScrollBidAmount.scrollToEnd();
    }
    // For LTR: make sure it starts from beginning
    else if (!isArabic && this.view.flxScrollBidAmount.scrollToBeginning) {
        this.view.flxScrollBidAmount.scrollToBeginning();
    }
},

selectBidAmountAddIntoTextBox: function(amount) {
    var self = this;

    // Reset all to default skin
    for (var key in self.dynamicBidButtons) {
        self.dynamicBidButtons[key].skin = "sknBtnCCCCCCBorderDubai75778620px";
    }

    // Set selected one to active skin
    if (self.dynamicBidButtons[amount]) {
        self.dynamicBidButtons[amount].skin = "sknBtnd32437DubaiFFFFFF20px";
    }

    this.view.tbxBidAmount.text = this.currentAmount + Number(amount) + " AED";
    this.vehicleHike = amount;
},
  


  closeBidAmountContainer: function(){
    this.view.flxBidAmountSelectionContainer.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },
  
//   selectBidAmountAddIntoTextBox: function(amount){
    
//     if(amount === "500"){
//        this.view.btn500AED.skin = "sknBtnd32437DubaiFFFFFF20px";
//       this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//       this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//     }
//     else if(amount === "1000"){
//       this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//       this.view.btn1000AED.skin = "sknBtnd32437DubaiFFFFFF20px";
//       this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//     }
//     else 
//       {
//         this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//       this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//       this.view.btn1500AED.skin = "sknBtnd32437DubaiFFFFFF20px";
//       }
    
//     this.view.tbxBidAmount.text = this.currentAmount + Number(amount) +" AED";
//     this.vehicleHike = amount;
    
//   },
  
   addActiveToWishList: function(objid,aucid)
  {
    
     var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin)
      {
        var self = this;
        if(this.mode !== "seller"){
    
  var selectedRow = self.view.segCurrentAuctionList.selectedRowItems;
  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  //var rowIndex = self.view.segCurrentAuctionList.selectedRowIndex[1];
        var selectedRow = self.view.segCurrentAuctionList.selectedRowItems;

if (selectedRow && selectedRow.length > 0) {
    var rowData = selectedRow[0];
    var allData = self.view.segCurrentAuctionList.data;

    // Find actual index
    var rowIndex = allData.findIndex(item => JSON.stringify(item) === JSON.stringify(rowData));
    
    voltmx.print(" Row Index: " + rowIndex);
    voltmx.print(" Row Data: " + JSON.stringify(rowData));
} else {
    voltmx.print(" No row is selected in segCurrentAuctionList.");
}


  var isAlreadyLiked = rowData.imgHeart === "heartlikerecommended.png";

  var callback = function(success, message) {
    if (success) {
      // Update UI based on action
      if (isAlreadyLiked) {
        rowData.imgHeart = "imgdislikenew.png";
        rowData.flxLikeHeart.skin = "sknFlx231f20custom120pxround";
      } else {
        rowData.imgHeart = "heartlikerecommended.png";
        rowData.flxLikeHeart.skin = "sknFlxd32437custom120pxround";
      }

     self.view.segCurrentAuctionList.setDataAt(rowData, rowIndex);
    } else {
      alert("Favorite toggle failed: " + message);
    }
  };

  if (isAlreadyLiked) {
    self.invokeRemoveTrackedObject(objid, aucid, callback);
  } else {
    self.invokeAddTrackedObject(objid, aucid, callback);
  }
      }
    else{
       self.view.flxOverLay.setVisibility(true);
          self.view.flxWarning.setVisibility(true);
    }
      }
    else
      {
        new voltmx.mvc.Navigation("frmLoginScreen").navigate();
      }
    
  },
    
   invokeAddTrackedObject: function(objid,aucid,callback)
  {
    
    checkTokenValidatity(function() {
    var usertoken = voltmx.store.getItem("getUserAccesstoken");

  var inputParam = {
    serviceID: "ms_buyer$add-tracked-object",
    auction_id: aucid,
    object_id: objid,
    type: "favorites",
    httpheaders: {
      user_token: usertoken
    },
    httpconfig: {}
  };

  function addCallBack(status, response) {
    voltmx.print("Add Favorite Response: " + JSON.stringify(response));

    if (response.opstatus === 0 && response.data && response.data.favourite_id) {
      callback(true, response.data.favourite_id);
    } else {
      callback(false, response.message || "Unknown error");
    }
  }

  mfintegrationsecureinvokerasync(inputParam, "ms_buyer", "add-tracked-object", addCallBack);

    });
    
  },
  
  invokeRemoveTrackedObject: function(objid, aucid, callback) {
     checkTokenValidatity(function() {
  var usertoken = voltmx.store.getItem("getUserAccesstoken");

  var inputParam = {
    serviceID: "ms_buyer$remove-tracked-object",
    auction_id: aucid,
    object_id: objid,
    type: "favorites",
    httpheaders: {
      user_token: usertoken
    },
    httpconfig: {}
  };

  function removeCallBack(status, response) {
    voltmx.print("Remove Favorite Response: " + JSON.stringify(response));

    if (response.opstatus === 0 && response.data && response.data.favourite_id) {
      callback(true, response.data.favourite_id);
    } else {
      callback(false, response.message || "Unknown error");
    }
  }

  mfintegrationsecureinvokerasync(inputParam, "ms_buyer", "remove-tracked-object", removeCallBack);
     });
},
  
invokeFryWfAuctionBidding: function()
  {
    var self = this;
    if(this.view.tbxBidAmount.text.trim() !== "")

      
      {
        
        if(this.view.imgCheck.isVisible){
         
        checkTokenValidatity(function() {
     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     self.view.btnBidNow.setEnabled(false);
          function invService(status, auction_bidding) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Status: " + status);
        voltmx.print("Response: " + JSON.stringify(auction_bidding));
     var msg = auction_bidding && auction_bidding.message;
     if (msg) {
  if (msg.includes("exceeds") || msg.includes("available") || msg.includes("credit")) {
    // do your logic here
//     voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
//     new voltmx.mvc.Navigation("frmPaymentType").navigate();
    if(self.view.flxIncreaseLimit)
      {
       voltmx.store.removeItem("flow");
       closeThreeAndOpenFlxIncreaseLimit(self.view,msg);
      }
    return;
  }
     
        if (msg.includes("add")) {
    // do your logic here
//     voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
//     new voltmx.mvc.Navigation("frmPaymentType").navigate();
     if(self.view.flxIncreaseLimit)
      {
       voltmx.store.removeItem("flow");
       closeThreeAndOpenFlxIncreaseLimit(self.view,msg);
      }
    return;
  }
}
        // Check for successful HTTP response and opstatus
        if (
          auction_bidding &&
    auction_bidding.opstatus === 0 &&
    auction_bidding.auction_bidding_reponse &&
    auction_bidding.auction_bidding_reponse[0] &&
    auction_bidding.auction_bidding_reponse[0].records &&
    auction_bidding.auction_bidding_reponse[0].records[0]
        ) {
            var record = auction_bidding.auction_bidding_reponse[0].records[0];
            var msg = auction_bidding.message;
            
          
          
             if(msg && msg.toLowerCase().includes("accepted")) {
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
              if( self.view.lblSuccessMsg){
                self.view.lblSuccessMsg.text = "Your Bid Has Been Placed Successfully";
              }
                self.closeBidAmountContainer();
                self.view.flxOverLay.setVisibility(true);
                self.view.flxBidSuccessPopup.setVisibility(true);
                self.updateSegmentWithUpdatedBidRate();
               var isSilent = voltmx.store.getItem("isSilentFilter");
               if (!isSilent) {
                 self.updateActiveAuctionIdWhenBid();
                 eventAuctionBid(self.aucid,self.objid);
               }
            } else if (msg) {
//                 alert(msg);  // Show server-provided message
              self.closeBidAmountContainer();
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
            } 
//               else {
// //                 alert("Unknown response from server.");
//               self.closeBidAmountContainer();
//                self.view.SmthngWentWrong.setVisibility(true);
//               self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
//             }
        }
     else {
    if (auction_bidding && auction_bidding.opstatus === 1011) {
        self.closeBidAmountContainer();
        self.view.flxError.setVisibility(true);
    } else {
        self.closeBidAmountContainer();
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text =
            (auction_bidding && auction_bidding.message) || "Something went wrong. Please try again.";
    }
}
     
    }
    if (auction_bidding_inputparam == undefined) {
        var auction_bidding_inputparam = {};
    }
     var userid = voltmx.store.getItem("userId");
     var usertoken = voltmx.store.getItem("getUserAccesstoken");
    auction_bidding_inputparam["serviceID"] = "fry_int_buyer$manual-auction-bidding";
          auction_bidding_inputparam["user_id"] = userid;
          var isSilent =  voltmx.store.getItem("isSilentFilter");
          if(isSilent){
            auction_bidding_inputparam["vehicle_amount"] = 0;
            auction_bidding_inputparam["bid_hike"] = Number(self.view.tbxBidAmount.text);
          }
          else{
            auction_bidding_inputparam["vehicle_amount"] = self.currentAmount;
            auction_bidding_inputparam["bid_hike"] = Number(self.vehicleHike);
          }
    
        auction_bidding_inputparam["auction_id"] = self.aucid;
//         auction_bidding_inputparam["bid_type"] = "";
        auction_bidding_inputparam["object_id"] = self.objid;
    var auction_bidding_httpheaders = {
      "user_token": usertoken
    };
    auction_bidding_inputparam["httpheaders"] = auction_bidding_httpheaders;
    var auction_bidding_httpconfigs = {};
    auction_bidding_inputparam["httpconfig"] = auction_bidding_httpconfigs;
    fry_wf$auction_bidding = mfintegrationsecureinvokerasync(auction_bidding_inputparam, "fry_int_buyer", "manual-auction-bidding", invService);
        });
      }
        
       else{
//          alert('select check box..!');
       } 
       
      }
    else{
//       alert('text box should not be empty');
    }
  },
  
  invokeAutoBidFunction: function()
  {
    
     if (this.view.tbxAutoBidAmount.text && this.view.tbxAutoBidAmount.text.trim() !== "") {
       
       var self = this;
      checkTokenValidatity(function() {
       function invokeServiceCallBack(status, register_auto_bidding) {
        try {
          
             var dmsg = register_auto_bidding && register_auto_bidding.message;
           if (dmsg) {
  if (dmsg.includes("exceeds") || dmsg.includes("available") || dmsg.includes("credit")) {
    // do your logic here
//     voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
//     new voltmx.mvc.Navigation("frmPaymentType").navigate();
    if(self.view.flxIncreaseLimit)
      {
       closeThreeAndOpenFlxIncreaseLimit(self.view);
      }
    return;
  }
}
    // If detailed result exists, parse it
    var resultStr = register_auto_bidding.register_auto_bidding;
    var parsedResult = typeof resultStr === "string" ? JSON.parse(resultStr) : resultStr;

//     if (parsedResult && parsedResult.opstatus === 0 && parsedResult.res_status === "SUCCESS") {
               if (
  parsedResult &&
  parsedResult.opstatus === 0 &&
  (
    parsedResult.result_status === "SUCCESS" || 
    (parsedResult.records && parsedResult.records[0] && parsedResult.records[0].res_status === "SUCCESS")
  )
){
      self.view.flxAutoBidAmountContainer.setVisibility(false);
      self.view.lblSuccessMsg.text = "Auto Bid Activated Successfully";
      self.updateSegmentWithAutoBidActive();
      self.view.flxBidSuccessPopup.setVisibility(true);
    } else if (parsedResult && (parsedResult.message || parsedResult.result_message)) {
      self.view.lblErrmsg.text = parsedResult.message || parsedResult.result_message;
      self.view.lblErrmsg.setVisibility(true);
    } else if (register_auto_bidding.message) {
      // fallback if message is at top level
      self.view.lblErrmsg.text = register_auto_bidding.message;
      self.view.lblErrmsg.setVisibility(true);
    } else {
      self.view.lblErrmsg.text = "Failed to register auto bid.";
      self.view.lblErrmsg.setVisibility(true);
    }
  } catch (e) {
    self.view.lblErrmsg.text = "Unexpected error occurred.";
    self.view.lblErrmsg.setVisibility(true);
    voltmx.print("Auto bid callback error: " + e.message);
  }

    }
    if (register_auto_bidding_inputparam == undefined) {
        var register_auto_bidding_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
     var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var maxBidAmount = self.view.tbxAutoBidAmount.text;
    register_auto_bidding_inputparam["serviceID"] = "fry_wf$auto-bid-register";
    register_auto_bidding_inputparam["auction_id"] = self.aucIdForAutoBid;
    register_auto_bidding_inputparam["user_id"] = userid;
    register_auto_bidding_inputparam["bid_max_amount"] = maxBidAmount;
//     register_auto_bidding_inputparam["bid_min_value"] = "200";
    register_auto_bidding_inputparam["object_id"] = self.objIdForAutoBid;
    register_auto_bidding_inputparam["bid_id"] = self.bidid || 0;
    var register_auto_bidding_httpheaders = {
      "user_token": usertoken
    };
    register_auto_bidding_inputparam["httpheaders"] = register_auto_bidding_httpheaders;
    var register_auto_bidding_httpconfigs = {};
    register_auto_bidding_inputparam["httpconfig"] = register_auto_bidding_httpconfigs;
    fry_int_auctions$register_auto_bidding = mfintegrationsecureinvokerasync(register_auto_bidding_inputparam, "fry_wf", "auto-bid-register", invokeServiceCallBack);
      });
      }
    else{
//        alert('Enter Max. Bid Amount');
    }
  },
  
//    invokeAutoBidFunction2: function()
//   {
    
//      if (this.view.tbxAutoBidAmount2.text && this.view.tbxAutoBidAmount2.text.trim() !== "") {
       
//        var self = this;

//        function invokeServiceCallBack(status, register_auto_bidding) {
//          if (register_auto_bidding && register_auto_bidding.opstatus === 0 && register_auto_bidding.records && register_auto_bidding.records.length > 0){
//            self.view.flxAutoBidAmountContainer.setVisibility(false);
          
//            self.view.lblSuccessMsg.text = "Auto Bid Activated Successfully";
//             self.view.flxBidSuccessPopup.setVisibility(true);
//          }

//     }
//     if (register_auto_bidding_inputparam == undefined) {
//         var register_auto_bidding_inputparam = {};
//     }
//     var userid = voltmx.store.getItem("userId");
//      var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     var maxBidAmount = self.view.tbxAutoBidAmount2.text;
//     register_auto_bidding_inputparam["serviceID"] = "fry_int_auctions$auction-register-auto-bid-v1";
//     register_auto_bidding_inputparam["auction_id"] = this.aucIdForAutoBid;
//     register_auto_bidding_inputparam["bid_by"] = userid;
//     register_auto_bidding_inputparam["bid_max_amount"] = maxBidAmount;
// //     register_auto_bidding_inputparam["bid_min_value"] = "200";
//     register_auto_bidding_inputparam["object_id"] = this.objIdForAutoBid;
//     register_auto_bidding_inputparam["bid_id"] = this.bidid || 0;
//     var register_auto_bidding_httpheaders = {
//       "user_token": usertoken
//     };
//     register_auto_bidding_inputparam["httpheaders"] = register_auto_bidding_httpheaders;
//     var register_auto_bidding_httpconfigs = {};
//     register_auto_bidding_inputparam["httpconfig"] = register_auto_bidding_httpconfigs;
//     fry_int_auctions$register_auto_bidding = mfintegrationsecureinvokerasync(register_auto_bidding_inputparam, "fry_int_auctions", "auction-register-auto-bid", invokeServiceCallBack);
//        }
//     else{
//        alert('Enter Max. Bid Amount');
//     }
//   },

//   addToWishList: function(widgetRef, sectionIndex, rowIndex){
//     var selectedRow  = this.view.segCurrentAuctionList.selectedRowItems;
//     if (!selectedRow || selectedRow.length === 0) {
//       voltmx.print("No row is selected");
//       return;
//     }
//     var rowData = selectedRow[0];
//     var rowIndex = this.view.segCurrentAuctionList.selectedRowIndex[1];

// //     rowData.imgHeart = rowData.imgHeart === "imgdislikenew.png" ? "heartlikerecommended.png" : "imgdislikenew.png";
    
//        if (rowData.imgHeart === "imgdislikenew.png") {
//   rowData.imgHeart = "heartlikerecommended.png";
//   rowData.flxLikeHeart.skin =  "sknFlxd32437custom120pxround";
// } else {
//   rowData.imgHeart = "imgdislikenew.png";
//   rowData.flxLikeHeart.skin =  "sknFlx231f20custom120pxround";
// }

//     // Update only the selected row
//     this.view.segCurrentAuctionList.setDataAt(rowData, rowIndex);
//   },
//   enableAutoBid: function(objid,aucid){
//     var isLogin = voltmx.store.getItem("isLogin");
//     this.objIdForAutoBid = null;
//     this.aucIdForAutoBid = null;
//     if(isLogin){
//     var userid = voltmx.store.getItem("userId");
//     var data = callGetAutoBidRate(objid,aucid);
//     this.view.tbxAutoBidAmount.text = "";
//     this.objIdForAutoBid = objid;
//     this.aucIdForAutoBid = aucid;
//    this.view.flxOverLay.setVisibility(true);
//    this.view.flxAutoBidAmountContainer.setVisibility(true);
//     }
//      else{
//       var x = new voltmx.mvc.Navigation("frmLoginScreen");
//       x.navigate();
//     }
//   },

enableAutoBid: function(objid, aucid) {
  var isLogin = voltmx.store.getItem("isLogin");
  this.objIdForAutoBid = null;
  this.aucIdForAutoBid = null;
  this.bidid = null;

  if (isLogin) {
    var self = this;
    if(this.mode !== "seller"){
    

    // Clear and hide error
    self.view.lblErrmsg.text = "";
    self.view.lblErrmsg.setVisibility(false);
    self.view.btnActivate.setVisibility(false);
    callGetAutoBidRate(objid, aucid, function(status, response) {
      var bidAmount = "";

      // Show the single container
      self.view.flxAutoBidAmountContainer.setVisibility(true);
      self.view.flxOverLay.setVisibility(true);

      if ((status === 200 || status === 400) &&
          response && Array.isArray(response.records) &&
          response.records.length > 0) {

        var bidData = response.records[0];

        if (bidData.bid_max_amount) {
          bidAmount = Math.trunc(Number(bidData.bid_max_amount)).toString();
        }

        self.bidid = bidData.bid_id;
        self.autobidamount = bidAmount;
        self.view.tbxAutoBidAmount.text = bidAmount;

        // Show/hide buttons based on bid status
var isActive = (bidData.status && bidData.status.toLowerCase() === "active") ? true : false;
//         self.view.btnActivate.setVisibility(!isActive);
        self.view.btnDeactivate.setVisibility(isActive);

      } else {
        // No existing record – allow fresh input
        self.view.tbxAutoBidAmount.text = "";
        self.bidid = null;
        self.autobidamount = null;

        // Hide activate/deactivate buttons
        self.view.btnActivate.setVisibility(false);
        self.view.btnDeactivate.setVisibility(false);
      }

      self.objIdForAutoBid = objid;
      self.aucIdForAutoBid = aucid;
    });
  }else{
     self.view.flxOverLay.setVisibility(true);
          self.view.flxWarning.setVisibility(true);
  }
  } else {
    var nav = new voltmx.mvc.Navigation("frmLoginScreen");
    nav.navigate();
  }
},
  
  stateChangeBid: function(status){
    
     var self = this;
  checkTokenValidatity(function() {
    function callback(status, update_auto_bid_status) {
      
      voltmx.print(update_auto_bid_status);
       self.view.flxAutoBidAmountContainer.setVisibility(false);
       self.view.flxOverLay.setVisibility(false);
      
    }
    if (update_auto_bid_status_inputparam == undefined) {
        var update_auto_bid_status_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    update_auto_bid_status_inputparam["serviceID"] = "fry_int_auctions$update-auto-bid-status";
    update_auto_bid_status_inputparam["bid_id"] = Number(self.bidid);
    update_auto_bid_status_inputparam["status"] = status;
    var update_auto_bid_status_httpheaders = {
      "user_token": usertoken
    };
    update_auto_bid_status_inputparam["httpheaders"] = update_auto_bid_status_httpheaders;
    var update_auto_bid_status_httpconfigs = {};
    update_auto_bid_status_inputparam["httpconfig"] = update_auto_bid_status_httpconfigs;
    fry_int_auctions$update_auto_bid_status = mfintegrationsecureinvokerasync(update_auto_bid_status_inputparam, "fry_int_auctions", "update-auto-bid-status", callback);
  });
    
  },
  
  validateBidAmount: function()
  {
    
    
    
  },

   enableAutoBidFromBid: function(){
    var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin){
      
 var self = this;
     this.view.flxBidAmountSelectionContainer.setVisibility(false);
    // Clear and hide error
    self.view.lblErrmsg.text = "";
    self.view.lblErrmsg.setVisibility(false);
    self.view.btnActivate.setVisibility(false);
    callGetAutoBidRate(self.objIdForAutoBid, self.aucIdForAutoBid, function(status, response) {
      var bidAmount = "";

      // Show the single container
      self.view.flxAutoBidAmountContainer.setVisibility(true);
      self.view.flxOverLay.setVisibility(true);

      if ((status === 200 || status === 400) &&
          response && Array.isArray(response.records) &&
          response.records.length > 0) {

        var bidData = response.records[0];

        if (bidData.bid_max_amount) {
          bidAmount = Math.trunc(Number(bidData.bid_max_amount)).toString();
        }

        self.bidid = bidData.bid_id;
        self.autobidamount = bidAmount;
        self.view.tbxAutoBidAmount.text = bidAmount;

        // Show/hide buttons based on bid status
        var isActive = bidData.status.toLowerCase() === "active";
        self.view.btnActivate.setVisibility(!isActive);
        self.view.btnDeactivate.setVisibility(isActive);

      } else {
        // No existing record – allow fresh input
        self.view.tbxAutoBidAmount.text = "";
        self.bidid = null;
        self.autobidamount = null;

        // Hide activate/deactivate buttons
        self.view.btnActivate.setVisibility(false);
        self.view.btnDeactivate.setVisibility(false);
      }

    });
   
    }
     else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },
  
//   updateSegmentWithUpdatedBidRate: function()
//   {
    
//     var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;
//     var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];
//     rowData.lblPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
//     rowData.lblPrice = {
//     "text": "AED " + (this.currentAmount + Number(this.vehicleHike)),
//     "skin": "sknLblDubai02905120pxBold"
//   };
//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;
//     this.view.segCurrentAuctionList.setDataAt(rowData, selIndex[1]);
//   },
  
//   updateSegmentWithUpdatedBidRate: function() {
//     var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;

//     if (!selIndex || selIndex.length < 2) {
//         kony.print("No row selected in segCurrentAuctionList");
//         return;
//     }

//     var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];

//     rowData.lblPrice = {
//         "text": "AED " + (this.currentAmount + Number(this.vehicleHike)),
//         "skin": "sknLblDubai02905120pxBold"
//     };

//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;

//     this.view.segCurrentAuctionList.setDataAt(rowData, selIndex[1]);
// },

  updateSegmentWithUpdatedBidRate: function() {
//    var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;
    var selIndex = this.view.segCurrentAuctionList.selectedIndex;

    if (!selIndex || selIndex.length < 2) {
        voltmx.print("No row selected in segCurrentAuctionList");
        return;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE"; // or your app-specific flag
    //currentworking
    var isSilent =  voltmx.store.getItem("isSilentFilter");
//     var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];
     var seg = this.view.segCurrentAuctionList;
    var rowIndex = selIndex[1];
    var rowData = seg.data[rowIndex];
//     var newBidPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
   
    
   var numericBid = 0;
var newBidPrice;

if (isSilent) {
    numericBid = Number(this.view.tbxBidAmount.text) || 0;
    newBidPrice = numericBid.toLocaleString("en-AE");
} else {
    numericBid = this.currentAmount + Number(this.vehicleHike);
    newBidPrice = "AED " + numericBid;
}
    
//     var isYourBidVisible = newBidPrice !== 0;
    
    rowData.lblPrice = {
        "text": newBidPrice,
        "skin": isSilent ? "sknLblDubai0d74b520pxbold" : "sknLblDubai02905120pxBold",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
    };
    
    rowData.flxBidPrice = {
      "isVisible": isSilent ? (numericBid !== 0) : true
    };

//     rowData.lblTotalBidsCount = {
//         "text": totalBids,
//         "left": isArabic ? "4%" : "",
//         "right": isArabic ? "" : "8%",
//         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     };

    // Optional: reapply i18n text too, in case it has changed due to locale switch
    rowData.lblBidAmount = {
        "text": isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") : voltmx.i18n.getLocalizedString("current bid"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
    };

//     rowData.lblTotalBids = {
//         "text": voltmx.i18n.getLocalizedString("Total Bids"),
//         "right": isArabic ? "8%" : "",
//         "left": isArabic ? "" : "4%",
//         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
//     };

    // Force rebind full data to apply layout changes
//     var segData = this.view.segCurrentAuctionList.data;
//     segData[selIndex[1]] = rowData;
//     this.view.segCurrentAuctionList.setData(segData);
     seg.setDataAt(rowData, rowIndex);
},
  
  updateActiveAuctionIdWhenBid: function () {
    var self = this;

    voltmx.print("Updating activeAuctionIds (Filter screen)...");

    function getMileageRange(selectedValue) {
        switch (selectedValue) {
            case "10000": return { from: 0, to: 10000 };
            case "30000": return { from: 10001, to: 30000 };
            case "50000": return { from: 30001, to: 50000 };
            case "75000": return { from: 50001, to: 75000 };
            case "100000": return { from: 75001, to: 100000 };
            case "125000": return { from: 100001, to: 125000 };
            case "150000": return { from: 125001, to: 150000 };
            default: return { from: "", to: "" };
        }
    }

    var online_auction_list_inputparam = {};
    var currentLocale = voltmx.store.getItem("currentLocale") || "en";
    var priceRangeFrom = 0;

    if (voltmx.store.getItem("priceRangeName")) {
        priceRangeFrom = 100;
    }

    var selectedMileage = voltmx.store.getItem("mileageId") || "";
    var range = getMileageRange(selectedMileage);
    var isSilent = voltmx.store.getItem("isSilentFilter");

    online_auction_list_inputparam = {
        serviceID: "fry_int_auctions$get-buyer-all-auctions",
        body_type: voltmx.store.getItem("bodyTypeId") || "",
        transmission_type: voltmx.store.getItem("transmissionTypeId") || "",
        fuel_type: voltmx.store.getItem("fuelTypeId") || "",
        body_condition: voltmx.store.getItem("bodyConditionId") || "",
        brand: voltmx.store.getItem("brandName") || "",
        model: voltmx.store.getItem("modelName") || "",
        mileage_range_from: range.from,
        mileage_range_to: range.to,
        asset_id: voltmx.store.getItem("assetId") || "",
        lot_no: self.lotForUpdateActiveAuctionId,
        user_id: self.userid || "",
        year_range_from: Number(voltmx.store.getItem("yearMakeName")) || 0,
        year_range_to: Number(voltmx.store.getItem("yearMakeName")) || 0,
        auction_type: isSilent ? "4" : "1;2;3",
        yard_branch: Number(voltmx.store.getItem("locationId")) || 0,
        price_range_from: priceRangeFrom,
        price_range_to: Number(voltmx.store.getItem("priceRangeName")) || 0,
        priceSort: 0,
        milageSort: 0,
        yearSort: 0,
        page: 1,
        bid_close_date: "",
        pageSize: self.pageSize || 10,
        upcoming_auctions: 0,
        language: currentLocale,
        httpheaders: {},
        httpconfig: {}
    };

    function invServiceCallBack(status, response) {
        if (
            response &&
            response.opstatus === 0 &&
            response.httpresponse &&
            response.httpresponse.responsecode === 200 &&
            Array.isArray(response.records)
        ) {
            self.activeAuctionIds = response.records
                .filter(record => record.is_user_bid === "true")
                .map(record => record.auction_id)
                .join(";");

            voltmx.print(" Filter screen activeAuctionIds updated: " + self.activeAuctionIds);
        } else {
            voltmx.print(" Failed to update activeAuctionIds (Filter screen): " + JSON.stringify(response));
        }
    }

    try {
        mfintegrationsecureinvokerasync(
            online_auction_list_inputparam,
            "fry_int_auctions",
            "get-buyer-all-auctions",
            invServiceCallBack
        );
    } catch (e) {
        voltmx.print(" Error in updateActiveAuctionIdWhenBid (Filter screen): " + e);
    }
},
  
  updateSegmentWithAutoBidActive: function() {
    var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;

    if (!selIndex || selIndex.length < 2) {
        kony.print("No row selected in segCurrentAuctionList");
        return;
    }

    var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];

    rowData.imgAutoBidicon = "autobidblue.png";

//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;

    // Force rebind full data to apply skin reliably on iOS
    var segData = this.view.segCurrentAuctionList.data;
    segData[selIndex[1]] = rowData;
    this.view.segCurrentAuctionList.setData(segData);
},

  
  showCurrentAuctions: function()
  {
    this.view.flxUALine.setVisibility(false);
    this.view.flxCALine.setVisibility(true);
//     this.view.flxScrollUpcomingAuctionSegmentBody.setVisibility(false);
//     this.view.flxScrollAuctionSegmentBody.setVisibility(true);
    this.view.lblUpcomingAuctions.skin = "sknLblDubai8e8e8e18px49";
    this.view.lblCurrentAuctions.skin = "sknLblDubai231f2018px49";
    this.view.segCurrentAuctionList.setData([]);
    this.view.segCurrentAuctionList.setVisibility(true);
    this.view.btnLoadMore.setVisibility(false);
    this.upcoming = 0;
    this.pageSize = 10;
    this.currentOffset = 0;
      this.invokeOnlineAuctionList(); 
  },
  
  showUpcomingAuctions: function(){
    this.view.flxUALine.setVisibility(true);
    this.view.flxCALine.setVisibility(false);
//     this.view.flxScrollUpcomingAuctionSegmentBody.setVisibility(true);
//     this.view.flxScrollAuctionSegmentBody.setVisibility(false);
    this.view.lblUpcomingAuctions.skin = "sknLblDubai231f2018px49";  
    this.view.lblCurrentAuctions.skin = "sknLblDubai8e8e8e18px49"; 
    this.view.segCurrentAuctionList.setData([]);
    this.view.segCurrentAuctionList.setVisibility(true);
    this.view.btnLoadMore.setVisibility(false);
    this.upcoming = 1;
    this.pageSize = 10;
    this.currentOffset = 0;
      this.invokeOnlineAuctionList(); 
    
  },
  
  showVehicleTypeFilter: function(){
    this.view.flxVehicleTypeFilter.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
  },
  
  showBodyTypeFilter: function(){
    this.view.flxBodyTypeFilter.setVisibility(true);
     this.view.flxOverLay.setVisibility(true);
  },
  
  hideVehicleTypeFilter: function(){
    this.view.flxVehicleTypeFilter.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },
  hideBodyTypeFilter: function(){
    this.view.flxBodyTypeFilter.setVisibility(false);
     this.view.flxOverLay.setVisibility(false);
  },
  onFilterClick: function(widgetRef){
    var id = widgetRef.id;
    
    if(id === "flxCommercialVehicles"){
      if(!this.view.flxCommercialVehiclesSelected.isVisible){
        this.view.flxCommercialVehiclesSelected.setVisibility(true);
      }
    }
     if(id === "flxClassicandCollectorCars"){
      if(!this.view.flxClassicCarsSelected.isVisible){
        this.view.flxClassicCarsSelected.setVisibility(true);
      }
    }
     if(id === "flxSalvageVehicles"){
      if(!this.view.flxSalvageSelected.isVisible){
        this.view.flxSalvageSelected.setVisibility(true);
      }
    }
     if(id === "flxBikes"){
      if(!this.view.flxBikesSelected.isVisible){
        this.view.flxBikesSelected.setVisibility(true);
      }
    }
     if(id === "flxHeavyVehicles"){
      if(!this.view.flxHeavyVehiclesSelected.isVisible){
        this.view.flxHeavyVehiclesSelected.setVisibility(true);
      }
    }
     if(id === "flxLightVehicles"){
      if(!this.view.flxLightVehiclesSelected.isVisible){
        this.view.flxLightVehiclesSelected.setVisibility(true);
      }
    }
    if(id === "flxCommercialVehiclesBodyType"){
      if(!this.view.flxCommercialVehiclesBodyTypeSelected.isVisible){
        this.view.flxCommercialVehiclesBodyTypeSelected.setVisibility(true);
      }
    }
    if(id === "flxClassicCarsBodyType"){
      if(!this.view.flxClassicCarsBodyTypeSelected.isVisible){
        this.view.flxClassicCarsBodyTypeSelected.setVisibility(true);
      }
    }
    if(id === "flxSalvageVehiclesBodyType"){
      if(!this.view.flxSalvageBodyTypeSelected.isVisible){
        this.view.flxSalvageBodyTypeSelected.setVisibility(true);
      }
    }
    if(id === "flxBikesBodyType"){
      if(!this.view.flxBikesBodyTypeSelected.isVisible){
        this.view.flxBikesBodyTypeSelected.setVisibility(true);
      }
    }
    if(id === "flxHeavyVehiclesBodyType"){
      if(!this.view.flxHeavyVehiclesBodyTypeSelected.isVisible){
        this.view.flxHeavyVehiclesBodyTypeSelected.setVisibility(true);
      }
    }
    if(id === "flxLightVehiclesBodyType"){
      if(!this.view.flxLightVehiclesBodyTypeSelected.isVisible){
        this.view.flxLightVehiclesBodyTypeSelected.setVisibility(true);
      }
    }
  },
  
  removeFromFilterItems: function(widgetRef){
    var parentFlex = widgetRef.parent;
    parentFlex.setVisibility(false);
  },

  navTofrmDetails: function(){
    var selectedItem = this.view.segCurrentAuctionList.selectedRowItems[0];
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    var navigationData = {
      objid: selectedItem.objid,
      aucid: selectedItem.aucid,
    };
    var nav = new voltmx.mvc.Navigation("frmDetails");
    nav.navigate(navigationData);
  },
  
  adjustRTL: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
        this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
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
    
    this.view.flxAutoBidandAmounts.reverseLayoutDirection = isArabic;
      this.view.flxScrollBidAmount.reverseLayoutDirection = isArabic;
      this.view.flxBidAmountEnterBox.reverseLayoutDirection = isArabic;
      this.view.flxAcknowledge.reverseLayoutDirection = isArabic;
      
      this.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Select the Increment");
      this.view.btnAutoBid.text = voltmx.i18n.getLocalizedString("Auto Bid");
      this.view.btnBidNow.text = voltmx.i18n.getLocalizedString("BID NOW");
      this.view.lblTermsAck.text = voltmx.i18n.getLocalizedString("I acknowledge that I have examined the vehicle, accept its current condition, and agree to the terms and conditions related to it.");
      this.view.tbxBidAmount.placeholder = voltmx.i18n.getLocalizedString("Enter Bid Amount");
      this.view.rcTXT.text =  voltmx.i18n.getLocalizedString("I acknowledge that I have examined the vehicle, accept its current condition, and agree to the terms and conditions related to it.");
       this.view.tc.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

      this.view.lblTermsAck.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.tbxBidAmount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
      
      if(isArabic){
        this.view.lblSelectIncrement.left = "";
        this.view.lblSelectIncrement.right = "4%";
        
        this.view.flxCloseBidAmountSelection.right = "";
        this.view.flxCloseBidAmountSelection.left = "0dp";
        
//         this.view.btnAutoBid.left = "";
//         this.view.btnAutoBid.right = "4%";
        
        this.view.flxScrollBidAmount.left = "";
        this.view.flxScrollBidAmount.right = "-3%";
        
        this.view.tbxBidAmount.left = "";
        this.view.tbxBidAmount.right = "4%";
        
        this.view.btnBidNow.left = "";
        this.view.btnBidNow.right = "-3%";
        
        this.view.flxCheckBox1.left = "";
        this.view.flxCheckBox1.right = "4%";
        
        this.view.lblTermsAck.left = "";
        this.view.lblTermsAck.right = "2%";
      }
      else{
        this.view.lblSelectIncrement.left = "4%";
        this.view.lblSelectIncrement.right = "";
        
        this.view.flxCloseBidAmountSelection.right = "0dp";
        this.view.flxCloseBidAmountSelection.left = "";
        
//         this.view.btnAutoBid.left = "4%";
//         this.view.btnAutoBid.right = "";
        
        this.view.flxScrollBidAmount.left = "-3%";
        this.view.flxScrollBidAmount.right = "";
        
        this.view.tbxBidAmount.left = "4%";
        this.view.tbxBidAmount.right = "";
        
        this.view.btnBidNow.left = "-3%";
        this.view.btnBidNow.right = "";
        
        this.view.flxCheckBox1.left = "4%";
        this.view.flxCheckBox1.right = "";
        
        this.view.lblTermsAck.left = "2%";
        this.view.lblTermsAck.right = "";
      }
  }
 });