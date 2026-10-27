define({ 

 onNavigate: function()
  {
    
    this.adjustRTLLayout();
   this.userid = voltmx.store.getItem("userId");
   this.view.preShow = this.onPreShow.bind(this); 
   this.view.postShow = this.onPostShow.bind(this);
    this.mode = voltmx.store.getItem("mode") || "seller";
    this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
          this.view.flxWarning.setVisibility(false);
    };
    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
   this.view.segFavourites.onRowClick = this.onRowClickAction.bind(this);
   this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
    
    this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
     this.view.onHide = function() {
   
//       voltmx.timer.cancel("AuctionPriceAutoRefreshFav");
        try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshFav");   
        voltmx.print("AuctionPriceAutoRefreshFav cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshFav already stopped or not found"); 
       }
       
        try { voltmx.timer.cancel("StartLiveTimerInit"); } catch(e){}
       
        try { voltmx.timer.cancel("StartLiveTimerInitOneSec"); } catch(e){}
        try { voltmx.timer.cancel("AuctionPriceAutoRefreshFavOneSec"); } catch(e){}
       try { voltmx.timer.cancel("updateCountDown1Fav"); } catch(e){}
       try { voltmx.timer.cancel("updateCountDownFav"); } catch(e){}
       
};
    
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmProfile").navigate();
    }.bind(this);
    
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
  },
  
  onPreShow: function()
  {
    var self = this;
//     self.isDataFetchedOnce = false;
    self.pageSize = 10;
    self.currentOffset = 0;
    self.view.segFavourites.setData([]);
    loginToDam();
     self.toggleFooterIcons();
    if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
    
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
    this.view.tc.setVisibility(false);
    this.view.tbxBidAmount.setEnabled(false);
    if(this.view.flxIncreaseLimit.btnIncDeposit)
      {
        this.view.flxIncreaseLimit.btnIncDeposit.onClick = () =>{
     voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
    new voltmx.mvc.Navigation("frmPaymentType").navigate();
    
        }
      }
    this.view.btnLoadMore.setVisibility(false);
    this.view.lblNorecords.setVisibility(false);
     self.invokeGetTrackedObjects();
     
    
      self.closeBidAmountContainer();
    
        try {
 voltmx.timer.schedule(
    "StartLiveTimerInit",
    function() {
//       if (!self.isDataFetchedOnce) {
//           self.isDataFetchedOnce = true; // mark first run done
//           return; // skip duplicate hit
//         }
      self.startLivePriceRefresh.call(self);
    },
    5,
    false
  );
} catch (e) {
    voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
}
    
     try {
 voltmx.timer.schedule(
    "StartLiveTimerInitOneSec",
    function() {
//       if (!self.isDataFetchedOnce) {
//           self.isDataFetchedOnce = true; // mark first run done
//           return; // skip duplicate hit
//         }
      self.startLivePriceRefreshOneSec.call(self);
    },
    5,
    false
  );
} catch (e) {
    voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
}
    
     try {
 voltmx.timer.schedule(
    "updateCountDownFav",
    function() {
      self.updateCountDownAllAuctionsMethod.call(self);
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
        voltmx.timer.cancel("updateCountDown1Fav");   
        voltmx.print("updateCountDown1Fav cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("updateCountDown1Fav already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "updateCountDown1Fav",
  this.refreshCountDown.bind(this),  // ✅ pass function reference, not call
  1,
  true
);
    
  },
  
  refreshCountDown: function () {
    var self = this;

    try {
        var seg = self.view.segFavourites;
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
  
    startLivePriceRefresh: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshFav");
        try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshFav");   
        voltmx.print("AuctionPriceAutoRefreshFav cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshFav already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshFav",
  this.refreshAuctionPrices.bind(this),  //  pass function reference, not call
  60,
  true
);
   },
  
  //for one sec
  startLivePriceRefreshOneSec: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshFav");
        try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshFavOneSec");   
        voltmx.print("AuctionPriceAutoRefreshFavOneSec cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshFavOneSec already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshFavOneSec",
  this.refreshAuctionPricesOneSec.bind(this),  // ✅ pass function reference, not call
  1,
  true
);
   },
   /**
 * Fetch latest price data periodically
 */
 refreshAuctionPrices: function() {
   var self = this;
   checkTokenValidatity(function() {
  try {
    
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid =  voltmx.store.getItem("userId");
    // If form or segment is not visible, skip refresh
    if (!self.view || !self.view.segFavourites.isVisible) return;

    var inputParams = {
    serviceID: "fry_int_buyer$get-tracked-objects",
    user_id: userid,
    type: "favorites",
    page: 1,
    pageSize: String(self.pageSize),
    language: voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en",
    httpheaders: {
        "user_token": usertoken
      },
    };

    mfintegrationsecureinvokerasync(
      inputParams,
      "fry_int_buyer",
      "get-tracked-objects",
      function(status, response) {
        if (response && response.opstatus === 0 && Array.isArray(response.records)) {
          self.updateAuctionPrices.call(self, response.records);
        }
      }
    );
  } catch (ex) {
    voltmx.print("Error in refreshAuctionPrices: " + ex.message);
  }
   });
},

/**
 * Update only changed prices in the segment (no full reload)
 */
 updateAuctionPrices: function(newRecords) {
  var self = this;
  var seg = self.view.segFavourites;
   var userid =  voltmx.store.getItem("userId");
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
      var newPrice = Number(latest.max_bid).toLocaleString("en-AE");
      var currentDisplayedPrice = row.lblPrice.text.replace("AED ", "").trim();
       var timercount = latest.bid_close_date;
        var userTargetTime = convertUTCtoUserTime(timercount);
        var bidclosetime = getTimeRemainingString(userTargetTime);
      var updatedRow = Object.assign({}, row); 
      if (currentDisplayedPrice !== newPrice) {
        // Update only price label + maybe bidder highlight
        var newSkin =
          latest.winning_bidder === userid
            ? "sknLblDubai02905120pxBold"
            : "sknLblDubaid3243720pxbold";

         updatedRow = Object.assign({}, row, {
          lblPrice: { text: "AED " + newPrice, skin: newSkin,
                    left: isArabic ? "4%" : "",
            right: isArabic ? "" : "8%",
            contentAlignment: isArabic
              ? constants.CONTENT_ALIGN_MIDDLE_LEFT
              : constants.CONTENT_ALIGN_MIDDLE_RIGHT
                    },
           highestbidder: latest.winning_bidder
          
        });

        seg.setDataAt(updatedRow, j);
      }
      
        updatedRow.lblTimerCount = {
            text: bidclosetime,
            right: isArabic ? "4%" : "",
            left: isArabic ? "" : "4%",
            contentAlignment: isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT
        };

        seg.setDataAt(updatedRow, j);
    }
  }
},
  
   /**
 * Fetch latest price data periodically one sec
 */
 refreshAuctionPricesOneSec: function() {
   var self = this;
 
  try {
    
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid =  voltmx.store.getItem("userId");
    // If form or segment is not visible, skip refresh
    if (!self.view || !self.view.segFavourites.isVisible) return;
    
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
  var seg = self.view.segFavourites;
   var userid =  voltmx.store.getItem("userId");
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
          latest.highest_bidder === userid
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
  
  toggleFooterIcons: function(){
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
  
    onPostShow: function()
  {
//     this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
//     this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
//     this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");
    this.view.btnBidNow.onClick = this.invokeFryWfAuctionBidding.bind(this);
    
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
    
//       this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {

//         if (Number(y) > 36 && Number(y) < 62) {
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
    
    
    if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
       this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
    };
    
       this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
    },
  
  
//   setFilterToSeg: function()
//   {
//     var self = this;
//      var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
//   if (!self.originalSegData) return;

//   if (searchText === "") {
//     // Reset to full list
//     self.view.lblNorecords.setVisibility(false);
//     self.view.segFavourites.setData(self.originalSegData);
//     return;
//   }

//   var filteredData = self.originalSegData.filter(function(item) {
//     return item.lblCarName.toLowerCase().includes(searchText);
//   });

//   self.view.segFavourites.setData(filteredData);
    
//   if (filteredData.length === 0) {
//    self.view.lblNorecords.setVisibility(true);
//   self.view.btnLoadMore.setVisibility(false);
// } else {
//   self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
// }  
    
//   },
  
  onLoadMoreClick: function() {
//        voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  this.pageSize += 10;
  this.invokeGetTrackedObjects(); 
},
  
  invokeGetTrackedObjects: function()
  {
     var self = this;
   voltmx.application.showLoadingScreen(null, "Loading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
   checkTokenValidatity(function() {
    function invServiceCallBack(status, get_tracked_objects) {
     voltmx.print("Service status: " + status);
  voltmx.print("Response: " + JSON.stringify(get_tracked_objects));
  voltmx.application.dismissLoadingScreen();
  // Check for server or token issues
  if (get_tracked_objects &&
    get_tracked_objects.opstatus === 0 &&
    get_tracked_objects.records
  ) {
if (get_tracked_objects && Array.isArray(get_tracked_objects.records) && get_tracked_objects.records.length > 0) {
    self.setDataToSegFavourites(get_tracked_objects.records);
    self.activeAuctionIds = get_tracked_objects.records
            .filter(record => record.is_user_bid === "true")
            .map(record => record.auction_id)
            .join(";");
    }
    else
    {
       self.view.btnLoadMore.setVisibility(false);
        self.view.lblNorecords.setVisibility(true);
    }
  } else if (
    get_tracked_objects &&
    (get_tracked_objects.httpStatusCode === 401 || get_tracked_objects.opstatus === 1001)
  ) {
    // Token expired or unauthorized
     self.view.SmthngWentWrong.setVisibility(true);
     self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Session Expired! Please Login";
    // Optionally redirect to login screen here
  } else {
    // Generic error handler
//     alert("Something went wrong while fetching favourites. Please try again later.");
    self.view.SmthngWentWrong.setVisibility(true);
    self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Something went wrong. Please try again.";

  }
    }
    if (get_tracked_objects_inputparam == undefined) {
        var get_tracked_objects_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid =  voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    get_tracked_objects_inputparam["serviceID"] = "fry_int_buyer$get-tracked-objects";
    get_tracked_objects_inputparam["user_id"] = userid;
    get_tracked_objects_inputparam["type"] = "favorites";
    get_tracked_objects_inputparam["page"] = "1";
    get_tracked_objects_inputparam["pageSize"] = String(self.pageSize);
    get_tracked_objects_inputparam["language"] = currentLocale || "en";
    var get_tracked_objects_httpheaders = {
      "user_token": usertoken
    };
    get_tracked_objects_inputparam["httpheaders"] = get_tracked_objects_httpheaders;
    var get_tracked_objects_httpconfigs = {};
    get_tracked_objects_inputparam["httpconfig"] = get_tracked_objects_httpconfigs;
    fry_int_buyer$get_tracked_objects = mfintegrationsecureinvokerasync(get_tracked_objects_inputparam, "fry_int_buyer", "get-tracked-objects", invServiceCallBack);
   });
  },
  
  setDataToSegFavourites: function(records)
  {
    var self = this;
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.segFavourites.widgetDataMap = {
      "lblObjID":"lblObjID",
      "lblAuctionID":"lblAuctionID",
      "imgCarPIcture":"imgCarPIcture",
      "lblCarname":"lblCarname",
      "lblTimerCount":"lblTimerCount",
      "lblLot":"lblLot",
      "lblLotNum":"lblLotNum",
      "lblTotalBids":"lblTotalBids",
      "lblYear":"lblYear",
      "lblYearVal":"lblYearVal",
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
      "flxCurrentAuctions": "flxCurrentAuctions",
      "lblBidAmount":"lblBidAmount",
      "bidCloseTime":"bidCloseTime",
      "flxBidPrice":"flxBidPrice"
    };
    
     var data = [];
   var damAvailable = voltmx.store.getItem("isDamAvailable");
    var newRecords = records.slice(self.currentOffset);
    if(newRecords && newRecords.length>0)
      {
        
        for(var i =0;i<newRecords.length;i++){
            var item = newRecords[i];
          
             var isSilent = false;

if (item && item.auction_type_id) {
  if (item.auction_type_id.includes("4")) {
    isSilent = true;
  }
}
          
            var autobidimg = (item.is_auto_bid && item.is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";

          var bidrateSkin = (item.winning_bidder === this.userid) ? "sknLblDubai02905120pxBold" : "sknLblDubaid3243720pxbold";
          var silentSkin = "sknLblDubai0d74b520pxbold";
          var objid = item.object_id;
          var aucid = item.auction_id;
          var price = item.max_bid;
          var highestbidder = item.winning_bidder;
          var timercount = item.bid_close_date;
//            var bidclosetime = self.getTimeRemainingString(timercount);
           var userTargetTime = convertUTCtoUserTime(timercount);
    var bidclosetime = getTimeRemainingString(userTargetTime);
          var year = item.year || "N/A";
          
          let isYourBidVisible = false;
          if (item && item.max_bid != null) {
  if (Number(item.max_bid) !== 0) {
    isYourBidVisible = true;
  }
}
//            var isFavouriteskin = item.is_favourite === "true" 
//         ? "sknFlxd32437custom120pxround" 
//         : "sknFlx231f20custom120pxround";

//         var whichImage = item.is_favourite === "true" 
//         ? "heartlikerecommended.png" 
//         : "imgdislikenew.png";
          
        data.push({
           "flxCurrentAuctions": {
  "reverseLayoutDirection": isArabic
},
      "imgCarPIcture": {
        
        "src":(damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif",
        "dynamicImageLoading": true
      },
//       "lblCarname": item.title,
          "lblCarname": {
        "text": item.title || "-",
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "lblObjID": item.object_id,
//       "lblTimerCount": bidclosetime,
          "bidCloseTime":timercount,
           "lblTimerCount": {
        "text": bidclosetime,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
        "objid": item.object_id,
         "aucid": item.auction_id,
//       "lblLot": "Lot #",
//       "lblLotNum": item.lot_no || "N/A",
           "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
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
//       "lblTotalBidsCount": item.no_of_bids || "N/A",
          "lblTotalBidsCount": {
        "text": item.location || "N/A",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//       "lblLocation": "Location",
          "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Mileage"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//       "lblLocationName": item.milage || "N/A",
           "lblLocationName": {
        "text": item.milage || "N/A",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
      "lblAuctionID": item.auction_id,
      "flxLikeHeart": {
        "skin": "sknFlxd32437custom120pxround",
         "onClick": this.addActiveToWishList.bind(this,objid,aucid)
       
      },
      "imgHeart": "heartlikerecommended.png",
          "highestbidder": highestbidder,
//       "lblCurrentBid": "CURRENT BID",
           "flxBidPrice": {
          "isVisible": isSilent ? isYourBidVisible : true
        },
          "lblBidAmount": {
        "text": isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") :voltmx.i18n.getLocalizedString("current bid"),
//             voltmx.i18n.getLocalizedString("current bid"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "isSilent": isSilent,
      "lblPrice": {
        "text": isSilent ? (Number(item.max_bid)).toLocaleString("en-AE") : "AED " +  (Number(item.max_bid)).toLocaleString("en-AE"),
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
        var rowData = self.view.segFavourites.data[rowIndex]; // fetch row data from segment
        if (!rowData) return;

        var latestPrice = Number(rowData.lblPrice.text.replace("AED ", "").trim());
        var latestHighestBidder = rowData.highestbidder || "";

        self.openBidAmountContainer(rowData.objid, rowData.aucid, latestPrice, latestHighestBidder,rowData.isSilent);
    },
    "text": voltmx.i18n.getLocalizedString("BID NOW")
}
    });
        } 
     self.view.segFavourites.addAll(data);
      voltmx.application.dismissLoadingScreen();
    
     if (self.pageSize > records.length) {
    self.view.btnLoadMore.setVisibility(false);
       self.view.flxSegmentFavourites.height ="87%";
  } else {
    self.view.btnLoadMore.setVisibility(true);
    self.view.flxSegmentFavourites.height ="77%";
  }
      self.currentOffset += newRecords.length;  
      }
   
    
  },
  
//   getTimeRemainingString: function(targetTimeString) {
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

//     return days + "D " + hours + "H " + minutes + "M " + seconds + "S";
//   } catch (e) {
//     return "N/A";
//   }
// },
  
    addActiveToWishList: function(objid,aucid)
  {
    var self = this;
  var selectedRow = this.view.segFavourites.selectedRowItems;
  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
 // var rowIndex = this.view.segFavourites.selectedRowIndex[1];
//     var selectedIndex = this.view.segFavourites.selectedRowIndex;
    var selectedIndex = this.view.segFavourites.selectedIndex;

if (selectedIndex && selectedIndex.length > 1) {
  var rowIndex = selectedIndex[1];  // This is the row index (0-based)
  voltmx.print("Selected row index: " + rowIndex);
  // Continue logic here...
} else {
  voltmx.print("⚠️ No row selected in segFavourites.");
 // alert("Please select an item first.");
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

      self.view.segFavourites.setDataAt(rowData, rowIndex);
    } else {
//       alert("Favorite toggle failed: " + message);
    }
  };

  if (isAlreadyLiked) {
    self.invokeRemoveTrackedObject(objid, aucid, callback);
  } else {
    self.invokeAddTrackedObject(objid, aucid, callback);
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
  
     openBidAmountContainer: function(objid,aucid,price,highestbidder,isSilent){
       var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
       this.view.flxScrollBidAmount.removeAll();
    if(isLogin)
      {
        
       
       this.view.btnBidNow.setEnabled(true);
        
          if(isSilent){
           self.view.flxAutoBidandAmounts.setVisibility(false);
         self.view.tbxBidAmount.setEnabled(true);
//           self.view.lblSelectIncrement.text = "Minimum Bid Amount:" + self.metadata.min_bid_amount;
          self.view.lblSelectIncrement.setVisibility(false);
            self.isSilent = true;
//           self.minAmount = self.metadata.min_bid_amount;
//            self.view.lblSelectIncrement.skin = "sknLblDubai231f2016pxBold";
        }
        else{
           self.view.flxAutoBidandAmounts.setVisibility(true);
         self.view.tbxBidAmount.setEnabled(false);
          self.view.lblSelectIncrement.setVisibility(true);
          self.isSilent = false;
          
        }
     
                 if ((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller") {
//         if(highestbidder !== this.userid){
        
     var selectedData = this.view.segFavourites.selectedRowItems[0];
//     this.currentAmount = price;
    this.objid = objid;
    this.aucid = aucid;
     this.objIdForAutoBid = objid;
    this.aucIdForAutoBid = aucid;
    
    var amountText = selectedData.lblPrice.text;  // "AED 23500.00"
    var amountOnly = amountText.replace("AED", "").trim();
//     this.createChipSetRelated(amountOnly);
//     this.currentAmount = Number(amountOnly);
       
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
//     this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//     this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
//     this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    this.view.tbxBidAmount.text = "";
    this.view.flxOverLay.setVisibility(true);
//       }
//         else{
// //           alert('You are already a highest bidder');
//            self.view.SmthngWentWrong.setVisibility(true);
//            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "You're the highest bidder!";

//         }
      }
        else{
          this.view.flxOverLay.setVisibility(true);
          this.view.flxWarning.setVisibility(true);
//           alert("You are Seller. Switch to Buyer to use this feature");
        }
      }
       
     

    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },
  
//   enableAutoBidFromBid: function(){
//     var isLogin = voltmx.store.getItem("isLogin");
//     if(isLogin){
//     this.view.flxBidAmountSelectionContainer.setVisibility(false);
//     this.view.tbxAutoBidAmount.text = "";
// //     this.objIdForAutoBid = objid;
// //     this.aucIdForAutoBid = aucid;
//    this.view.flxOverLay.setVisibility(true);
  
//    this.view.flxAutoBidAmountContainer.setVisibility(true);
//     }
//      else{
//       var x = new voltmx.mvc.Navigation("frmLoginScreen");
//       x.navigate();
//     }
//   },
  
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
  
//    enableAutoBid: function(objid,aucid){
//     var isLogin = voltmx.store.getItem("isLogin");
//     if(isLogin){
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
       var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//     self.view.flxAutoBidAmountContainer.setVisibility(true);
    self.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
    self.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      self.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
    self.view.flxAmountAndButton.reverseLayoutDirection = isArabic;
//     if(this.mode !== "seller"){
     if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){
    

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
         var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    self.view.flxAutoBidAmountContainer.setVisibility(true);
    self.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
    self.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      self.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
    self.view.flxAmountAndButton.reverseLayoutDirection = isArabic; 
     self.view.flxBidAmountSelectionContainer.setVisibility(false);
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
      self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Auto Bid Activated Successfully");
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
      self.view.lblErrmsg.text = voltmx.i18n.getLocalizedString("Failed to register auto bid");
      self.view.lblErrmsg.setVisibility(true);
    }
  } catch (e) {
    self.view.lblErrmsg.text = voltmx.i18n.getLocalizedString("Some thing went wrong. Try again");
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
  
  updateSegmentWithAutoBidActive: function() {
    var selIndex = this.view.segFavourites.selectedRowIndex;

    if (!selIndex || selIndex.length < 2) {
        kony.print("No row selected in segFavourites");
        return;
    }

    var rowData = this.view.segFavourites.selectedRowItems[0];

    rowData.imgAutoBidicon = "autobidblue.png";

//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;

    // Force rebind full data to apply skin reliably on iOS
    var segData = this.view.segFavourites.data;
    segData[selIndex[1]] = rowData;
    this.view.segFavourites.setData(segData);
},

  
    invokeFryWfAuctionBidding: function()
  {
    var self = this;
    if(this.view.tbxBidAmount.text.trim() !== "")

      
      {
        
        if(this.view.imgCheck.isVisible){
         
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
            if(msg && msg.toLowerCase().includes("accepted")){
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
              if( self.view.lblSuccessMsg){
                self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Your Bid Has Been Placed Successfully");
              }
                self.closeBidAmountContainer();
                self.view.flxOverLay.setVisibility(true);
                self.view.flxBidSuccessPopup.setVisibility(true);
                self.updateSegmentWithUpdatedBidRate();
               self.updateActiveAuctionIdWhenBid();
              if(!self.isSilent)
                  {
                eventAuctionBid(self.aucid,self.objid);
                  }
            } else if (msg) {
//                 alert(msg);  // Show server-provided message
              self.closeBidAmountContainer();
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
            } else {
//                 alert("Unknown response from server.");
              self.closeBidAmountContainer();
               self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
            }
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
          
//    function invService(status, auction_bidding) {
//         voltmx.application.dismissLoadingScreen();
//         voltmx.print("Status: " + status);
//         voltmx.print("Response: " + JSON.stringify(auction_bidding));

//         // Check for successful HTTP response and opstatus
//         if (
//             auction_bidding &&
//             auction_bidding.opstatus === 0 &&
//             auction_bidding.httpresponse &&
//             auction_bidding.httpresponse.responsecode === 200
//         ) {
//             var msg = auction_bidding.message;
            
//             if (msg === "Your bid is valid and accepted.") {
//               if( self.view.lblSuccessMsg){
//                 self.view.lblSuccessMsg.text = "Your Bid Has Been Placed Successfully";
//               }
//                 self.view.flxOverLay.setVisibility(true);
//                 self.closeBidAmountContainer();
//                 self.view.flxBidSuccessPopup.setVisibility(true);
//                 self.updateSegmentWithUpdatedBidRate();
//             } else if (msg) {
//                 alert(msg);  // Show server-provided message
//             } else {
//                 alert("Unknown response from server.");
//             }
//         } else {
//             alert("Failed to place bid. Please check your connection or try again.");
//         }
//     }
    if (auction_bidding_inputparam == undefined) {
        var auction_bidding_inputparam = {};
    }
     var userid = voltmx.store.getItem("userId");
      var usertoken = voltmx.store.getItem("getUserAccesstoken");
    auction_bidding_inputparam["serviceID"] = "fry_int_buyer$manual-auction-bidding";
    auction_bidding_inputparam["user_id"] = userid;
//     auction_bidding_inputparam["vehicle_amount"] = this.currentAmount;
//     auction_bidding_inputparam["bid_hike"] = Number(this.vehicleHike);
           if(self.isSilent){
           auction_bidding_inputparam["vehicle_amount"] = 0;
        auction_bidding_inputparam["bid_hike"] = Number(self.view.tbxBidAmount.text);
        }
          else{
        auction_bidding_inputparam["vehicle_amount"] = self.currentAmount;
        auction_bidding_inputparam["bid_hike"] = Number(self.vehicleHike);
          }
        auction_bidding_inputparam["auction_id"] = this.aucid;
//         auction_bidding_inputparam["bid_type"] = "";
        auction_bidding_inputparam["object_id"] = this.objid;
    var auction_bidding_httpheaders = {
      "user_token": usertoken
    };
    auction_bidding_inputparam["httpheaders"] = auction_bidding_httpheaders;
    var auction_bidding_httpconfigs = {};
    auction_bidding_inputparam["httpconfig"] = auction_bidding_httpconfigs;
    fry_wf$auction_bidding = mfintegrationsecureinvokerasync(auction_bidding_inputparam, "fry_int_buyer", "manual-auction-bidding", invService);
      }
        
       else{
//          alert('select check box..!');
       } 
       
      }
    else{
//       alert('text box should not be empty');
    }
  },
  
    updateSegmentWithUpdatedBidRate: function()
  {
 
//      var selIndex = this.view.segFavourites.selectedRowIndex;
     var selIndex = this.view.segFavourites.selectedIndex;

    if (!selIndex || selIndex.length < 2) {
        voltmx.print("No row selected in segFavourites");
        return;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE"; // or your app-specific flag

//     var rowData = this.view.segFavourites.selectedRowItems[0];
     var seg = this.view.segFavourites;
    var rowIndex = selIndex[1];
    var rowData = seg.data[rowIndex];
//     var newBidPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
     var numericBid = Number(this.view.tbxBidAmount.text) || 0;
    var currentAmount = this.currentAmount;
    var vehicleHike = Number(this.vehicleHike);
     var bidAmount;
     if(this.isSilent){
       var bidAmount = Number(this.view.tbxBidAmount.text).toLocaleString("en-AE");
     }
     else{
       var bidAmount = currentAmount + vehicleHike;
     }
    
//     if(rowData.lblTotalBidsCount){
//     var totalBids = Number(rowData.lblTotalBidsCount.text) + 1;
//     }
    rowData.lblPrice = {
        "text": this.isSilent ? bidAmount : "AED " + bidAmount,
        "skin": this.isSilent ? "sknLblDubai0d74b520pxbold" : "sknLblDubai02905120pxBold",
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
    };

     rowData.flxBidPrice = {
      "isVisible": this.isSilent ? (numericBid !== 0) : true
    };
//     rowData.lblTotalBidsCount = {
//         "text": totalBids,
//         "left": isArabic ? "4%" : "",
//         "right": isArabic ? "" : "8%",
//         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     };

    // Optional: reapply i18n text too, in case it has changed due to locale switch
    rowData.lblBidAmount = {
        "text": this.isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") : voltmx.i18n.getLocalizedString("current bid"),
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
//     var segData = this.view.segFavourites.data;
//     segData[selIndex[1]] = rowData;
//     this.view.segFavourites.setData(segData);
     seg.setDataAt(rowData, rowIndex);
  
  },
  
updateActiveAuctionIdWhenBid: function () {
    var self = this;

    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

    var inputParam = {
        serviceID: "fry_int_buyer$get-tracked-objects",
        user_id: userid || "",
        type: "favorites",
        page: "1",
        pageSize: String(self.pageSize || 10),
        language: currentLocale || "en",
        httpheaders: { "user_token": usertoken },
        httpconfig: {}
    };

    function serviceCallBack(status, get_tracked_objects) {
        if (
            get_tracked_objects &&
            get_tracked_objects.opstatus === 0 &&
            get_tracked_objects.httpresponse &&
            get_tracked_objects.httpresponse.responsecode === 200 &&
            Array.isArray(get_tracked_objects.records)
        ) {
            //  Update only activeAuctionIds
            self.activeAuctionIds = get_tracked_objects.records
                .filter(record => record.is_user_bid === "true")
                .map(record => record.auction_id)
                .join(";");

            voltmx.print(" Updated activeAuctionIds (favorites): " + self.activeAuctionIds);
        } else {
            voltmx.print(" Failed to update activeAuctionIds (favorites). Response: " + JSON.stringify(get_tracked_objects));
        }
    }

    try {
        mfintegrationsecureinvokerasync(
            inputParam,
            "fry_int_buyer",
            "get-tracked-objects",
            serviceCallBack
        );
    } catch (e) {
        voltmx.print(" Error in updateActiveAuctionIdWhenBid (favorites): " + e);
    }
},

  
    onRowClickAction: function()
  {
   var selectedItem = this.view.segFavourites.selectedRowItems;
   voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
   
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;
        var auctionid = selectedItem[0].aucid;

     
        new voltmx.mvc.Navigation("frmDetails").navigate({
            "objid": objectid,
             "aucid": auctionid
        });
    } else {
        
        voltmx.print("No row selected in segFavourites.");
    }
  },
  
  adjustRTLLayout: function()
  {
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      this.view.flxFavouritesHeading.reverseLayoutDirection = isArabic;
      this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
      this.view.lblFavourites.text = voltmx.i18n.getLocalizedString("Favorites");
        this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.btnCloseBidSuccessPopUp.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Congratulations");
   this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops");
    
       if(isArabic)
         {
        
            var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
         }
         else
           {
             this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
           }
    
//        this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
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
    
    //for openBid
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