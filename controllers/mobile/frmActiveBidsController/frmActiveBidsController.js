define({

  onNavigate: function() 
  {
    
    this.adjustRTLLayout();
    this.userid = voltmx.store.getItem("userId");
  this.view.preShow = this.onPreShow.bind(this);
  this.view.postShow = this.onPostShow.bind(this);
    
      this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
//       this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);

   this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
    
    this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmOpenMyVehicles").navigate();
    }.bind(this);
    
    this.view.segActiveBidList.onRowClick = this.onRowClickAction.bind(this);
        this.view.flxError.btnTryAgain.onClick = this.onPreShow.bind(this);
    this.view.flxServiceError.btnTryAgain.onClick = () =>
    {
      new voltmx.mvc.Navigation("frmDashBoard").navigate();
    }
    this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
  },
  
   onPreShow: function(){
     var self = this;
     
       if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
      this.lot = "";
     this.title = ""; 
   
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
      this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segActiveBidList.setData([]);
     loginToDam();
    this.toggleFooterIcons();
    this.invokeActiveBidsService();
    this.closeBidAmountContainer();
     this.view.btnLoadMore.setVisibility(false);
      this.view.tbxSearch.text = "";
     this.view.lblNorecords.setVisibility(false);
    
       if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
     
     if(this.view.flxIncreaseLimit)
      {
        this.view.flxIncreaseLimit.setVisibility(false);
      }
     this.view.tc.setVisibility(false);
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
     if(this.view.flxError.btnTryAgain){
       this.view.flxError.btnTryAgain.onClick = this.onPreShow.bind(this);
     }
     
       this.view.onHide = function() {
   
//       voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBids");
           try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBids");   
        voltmx.print("AuctionPriceAutoRefreshActiveBids cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshActiveBids already stopped or not found"); 
       }

       try { voltmx.timer.cancel("StartLiveTimerInitActBids"); } catch(e){}  
         
         try { voltmx.timer.cancel("StartLiveTimerInitOneSecActBids"); } catch(e){}  
         try { voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBidsOneSec"); } catch(e){}  
         
                  try { voltmx.timer.cancel("updateCountDownActiveBids"); } catch(e){}  

                  try { voltmx.timer.cancel("updateCountDown1ActiveBids"); } catch(e){}  

};
          try {
 voltmx.timer.schedule(
    "StartLiveTimerInitActBids",
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
    "StartLiveTimerInitOneSecActBids",
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
    "updateCountDownActiveBids",
    function() {
//       if (!self.isDataFetchedOnce) {
//           self.isDataFetchedOnce = true; // mark first run done
//           return; // skip duplicate hit
//         }
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
        voltmx.timer.cancel("updateCountDown1ActiveBids");   
        voltmx.print("updateCountDown1ActiveBids cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("updateCountDown1ActiveBids already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "updateCountDown1ActiveBids",
  this.refreshCountDown.bind(this),  // ✅ pass function reference, not call
  1,
  true
);
    
  },
  
   startLivePriceRefresh: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBids");
       try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBids");   
        voltmx.print("AuctionPriceAutoRefreshActiveBids cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshActiveBids already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshActiveBids",
  this.refreshAuctionPrices.bind(this),  // ✅ pass function reference, not call
  60,
  true
);
   },
  
  //for one sec
  startLivePriceRefreshOneSec: function() {
  // Cancel any existing timer to avoid duplicates
//   voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBids");
       try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshActiveBidsOneSec");   
        voltmx.print("AuctionPriceAutoRefreshActiveBidsOneSec cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("AuctionPriceAutoRefreshActiveBidsOneSec already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "AuctionPriceAutoRefreshActiveBidsOneSec",
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
    if (!self.view || !self.view.segActiveBidList.isVisible) return;

    var inputParams = {
    serviceID: "fry_int_buyer$get-buyer-my-active-bids",
      
        user_id: userid,
      page: "1",
      pageSize: self.pageSize,
      language: voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en",
      lot_no : self.lot || "",
      title : self.title || "",
      httpheaders: { "user_token": usertoken },
    };

    mfintegrationsecureinvokerasync(
      inputParams,
      "fry_int_buyer",
      "get-buyer-my-active-bids",
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
  var seg = self.view.segActiveBidList;
   var userid =  voltmx.store.getItem("userId");
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  var existingData = seg.data;
 
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
      var currentDisplayedPrice = row.lblCurrentbidamount.text.replace("AED ", "").trim();
      var timercount = latest.bid_close_date;
        var userTargetTime = convertUTCtoUserTime(timercount);
        var bidclosetime = getTimeRemainingString(userTargetTime);
      var updatedRow = Object.assign({}, row); 
      if (currentDisplayedPrice !== newPrice) {
        // Update only price label + maybe bidder highlight
        
        
        var isSilent = false;
      if (latest.auction_type_id && latest.auction_type_id.includes("4")) {
        isSilent = true;
      }

      // Apply silent or normal skin rules
      var bidrateSkin;
      if (latest.highest_bidder === userid) {
        bidrateSkin = "sknLblDubai02905120pxBold";
      } else {
        bidrateSkin = "sknLblDubaid3243720pxbold";
      }
      var silentSkin = "sknLblDubai0d74b520pxbold";

        var newSkin = isSilent ? silentSkin : bidrateSkin;
        
         updatedRow = Object.assign({}, row, {
          lblCurrentbidamount: { text: "AED " + newPrice, 
                                skin: newSkin,
                    left: isArabic ? "5%" : "",
            right: isArabic ? "" : "5%",
            contentAlignment: isArabic
              ? constants.CONTENT_ALIGN_MIDDLE_LEFT
              : constants.CONTENT_ALIGN_MIDDLE_RIGHT
                    },
          highestbidder: latest.highest_bidder
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
   checkTokenValidatity(function() {
  try {
    
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid =  voltmx.store.getItem("userId");
    // If form or segment is not visible, skip refresh
    if (!self.view || !self.view.segActiveBidList.isVisible) return;

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
   });
},

/**
 * Update only changed prices in the segment (no full reload) one sec
 */
 updateAuctionPricesOneSec: function(newRecords) {
  var self = this;
  var seg = self.view.segActiveBidList;
   var userid =  voltmx.store.getItem("userId");
  var existingData = seg.data;
 
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
      var currentDisplayedPrice = row.lblCurrentbidamount.text.replace("AED ", "").trim();

      if (currentDisplayedPrice !== newPrice) {
        // Update only price label + maybe bidder highlight
         var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
        
//         var isSilent = false;
//       if (latest.auction_type_id && latest.auction_type_id.includes("4")) {
//         isSilent = true;
//       }

      // Apply silent or normal skin rules
      var bidrateSkin;
      if (latest.highest_bidder === userid) {
        bidrateSkin = "sknLblDubai02905120pxBold";
      } else {
        bidrateSkin = "sknLblDubaid3243720pxbold";
      }
      var silentSkin = "sknLblDubai0d74b520pxbold";

//         var newSkin = isSilent ? silentSkin : bidrateSkin;
        
        var updatedRow = Object.assign({}, row, {
          lblCurrentbidamount: { text: "AED " + newPrice, 
                                skin: bidrateSkin,
                    left: isArabic ? "5%" : "",
            right: isArabic ? "" : "5%",
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
  
    refreshCountDown: function () {
    var self = this;

    try {
        var seg = self.view.segActiveBidList;
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
    this.view.segActiveBidList.setData([]);
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

    self.invokeActiveBidsService();
  },
  
  onRowClickAction: function()
  {
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

    // Get selected row items from the segment
    var selectedItems = this.view.segActiveBidList.selectedRowItems;
     voltmx.store.setItem("previousFormForServices", "frmMyBidsPage");
    if (selectedItems.length > 0) {
        var selectedItem = selectedItems[0];

        if (selectedItem && selectedItem.objid) {
            var navigationData = {
                aucid: selectedItem.aucid,
                objid: selectedItem.objid
            };
            var nav = new voltmx.mvc.Navigation("frmDetails");
            nav.navigate(navigationData);
        } else {
            voltmx.print("Selected item does not have a valid objid.");
        }
    } else {
        voltmx.print("Please select an item to view details.");
    }
  },
  
    onPostShow: function()
  {
//     this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
//     this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
//     this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");
    this.view.btnBidNow.onClick = this.invokeFryWfAuctionBidding.bind(this);
    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
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
  
//         this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {
      
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
    
     this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
    };
    
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
    
    this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
       
    },
  
   setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.segActiveBidList.setData(self.originalSegData);
    self.view.lblNorecords.setVisibility(false);
    return;
    
    
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return item.lblCarmodelname.text.toLowerCase().includes(searchText);
  });

  self.view.segActiveBidList.setData(filteredData);
    
   if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
  self.view.btnLoadMore.setVisibility(true);
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
  
  onLoadMoreClick: function()
  {
     this.pageSize += 10;
     this.invokeActiveBidsService();
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
  
   
  invokeActiveBidsService: function() {
  var self = this;
 voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

  checkTokenValidatity(function() {

    
    var serviceCallBack = function(status, get_buyer_my_active_bids) {
    voltmx.print(get_buyer_my_active_bids);
    voltmx.application.dismissLoadingScreen();

    
    if (
        get_buyer_my_active_bids &&
        get_buyer_my_active_bids.opstatus === 0 &&
        get_buyer_my_active_bids.httpresponse &&
        get_buyer_my_active_bids.httpresponse.responsecode === 200 &&
        Array.isArray(get_buyer_my_active_bids.records)
    ) {
      
       if (self.view.flxError) self.view.flxError.setVisibility(false);
       if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);
        // Success case
        if (get_buyer_my_active_bids.records.length > 0) {
            self.view.lblNorecords.setVisibility(false);
            self.insertIntoActiveBidsSegment(get_buyer_my_active_bids.records);
          self.activeAuctionIds = get_buyer_my_active_bids.records
    .filter(record => !String(record.auction_type_id).includes("4"))
    .map(record => record.auction_id)
    .join(";");

        } else {
            self.view.lblNorecords.setVisibility(true);
            self.view.btnLoadMore.setVisibility(false);
        }
    } else {
        // Error case
//         self.view.flxError.setVisibility(true);

        if (
            get_buyer_my_active_bids &&
            get_buyer_my_active_bids.errcode &&
          Number(get_buyer_my_active_bids.errcode) === 1011
        ) {
            self.view.flxError.setVisibility(true);
        } else {
           self.view.flxServiceError.setVisibility(true);
        }

        voltmx.print("Invalid response structure or status.");
    }
};


    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var currentLocale = voltmx.store.getItem("currentLocale");
    var inputParam = {
      serviceID: "fry_int_buyer$get-buyer-my-active-bids",
      user_id: userid,
      page: "1",
      pageSize: self.pageSize,
      language: currentLocale || "en",
      lot_no : self.lot || "",
      title : self.title || "",
      httpheaders: { "user_token": usertoken },
      httpconfig: {}
    };

    mfintegrationsecureinvokerasync(inputParam, "fry_int_buyer", "get-buyer-my-active-bids", serviceCallBack);
  });
},
  
  insertIntoActiveBidsSegment: function(records)
  {
    var self = this;
     
    self.view.segActiveBidList.widgetDataMap = {
    "imgCardata": "imgCardata",
    "lblCarmodelname": "lblCarmodelname",
    "lblLot": "lblLot",
    "lblLotNum": "lblLotNum",
    "lblTotalbids": "lblTotalbids",
    "lblTotalBidsCount": "lblTotalBidsCount",
    "lblLocation": "lblLocation",
    "lblLocationVal": "lblLocationVal",
    "lblCurrentBid": "lblCurrentBid",
    "lblCurrentbidamount": "lblCurrentbidamount",
      "flxYourBid":"flxYourBid",
      "lblYourBid":"lblYourBid",
      "lblYourBidValue":"lblYourBidValue",
     "lblAucStatus": "lblAucStatus",
     "lblAucStatusValue": "lblAucStatusValue",
    "btnBidnow": "btnBidnow",
    "flxfav": "flxfav",
    "imgfavicon": "imgfavicon",
    "flxRebid": "flxRebid",
    "imgrebid": "imgrebid",
    "flxShare": "flxShare",
    "imgshare": "imgshare",
    "lblTimerCount": "lblTimerCount",
      "bidCloseTime": "bidCloseTime",
      "flxBottam": "flxBottam"
};
    
     var segmentData = [];
         var newRecords = records.slice(self.currentOffset);
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
    for(var i = 0; i<newRecords.length; i++)
      {
        
        var activebiditem = newRecords[i];
        var isSilent = false;

if (activebiditem && activebiditem.auction_type_id) {
  if (activebiditem.auction_type_id.includes("4")) {
    isSilent = true;
  }
}
        var objid = activebiditem.object_id;
        var aucid = activebiditem.auction_id;
        var price = Number(activebiditem.max_bid).toLocaleString("en-AE");
        var your_bid =  Number(activebiditem.your_bid).toLocaleString("en-AE");
        var highestbidder = activebiditem.highest_bidder;
         var timercount = activebiditem.bid_close_date;
        var userTargetTime = convertUTCtoUserTime(timercount);
        var bidclosetime = getTimeRemainingString(userTargetTime);
        var now = new Date();
        var targetTime = new Date(userTargetTime);
        var isFavouriteskin = activebiditem.is_favourite === "true" 
        ? "sknFlxd32437custom120pxround" 
        : "sknFlx231f20custom120pxround";
        
        var whichImage = activebiditem.is_favourite === "true" 
        ? "heartlikerecommended.png" 
        : "imgdislikenew.png";
       var autobidimg = (activebiditem.is_auto_bid && activebiditem.is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";
        
        var bidrateSkin;
       if(activebiditem.highest_bidder === this.userid){
             bidrateSkin = "sknLblDubai02905120pxBold";
          }
          else{
              bidrateSkin = "sknLblDubaid3243720pxbold";
          }
        
        var silentSkin = "sknLblDubai0d74b520pxbold";
        var data = {
          "imgCardata": 
          {
           "src": (activebiditem.file_url && damAvailable && isValidURL(activebiditem.file_url)) ? activebiditem.file_url : "noimage.png",
            "imageWhileDownloading": "loading.gif",
            "dynamicImageLoading": true
        },
//           "lblCarmodelname": activebiditem.title || "N/A",
            "lblCarmodelname": {
            "text": activebiditem.title || "N/A",
            "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
            
          },
//           "lblLot": "Lot #",
           "lblLot": {
          "text": voltmx.i18n.getLocalizedString("Lot #"),
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
             "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        },
          "objid": objid,
          "aucid": aucid,
           "highestbidder": highestbidder,
            "lblTimerCount": { 
        "text": bidclosetime,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic 
            ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
            : constants.CONTENT_ALIGN_MIDDLE_LEFT
    },
    "bidCloseTime": timercount,
//           "lblLotNum": activebiditem.lot_no || "N/A",
           "lblLotNum": {
            "text": activebiditem.lot_no || "N/A",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
          },
//           "lblTotalbids": "Total Bids",
           "lblTotalbids": {
            "text": voltmx.i18n.getLocalizedString("Mileage"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
         "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
          },
//           "lblTotalBidsCount": activebiditem.no_of_bids || "N/A",
           "lblTotalBidsCount":{
            "text": activebiditem.milage || "N/A",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
          },
//           "lblLocation": "Location",
             "lblLocation": {
            "text": voltmx.i18n.getLocalizedString("Location"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
         "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
          },
//           "lblLocationVal": activebiditem.location|| "N/A",
          "lblLocationVal": {
  "text": activebiditem.location
    ? activebiditem.location.substring(0, 20) + (activebiditem.location.length > 20 ? "..." : "")
    : "N/A",
  "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
    : constants.CONTENT_ALIGN_MIDDLE_LEFT,
  "right": isArabic ? "" : "5%",
  "left": isArabic ? "5%" : "",
},

//           "lblCurrentBid": "Current Bid",
          "lblCurrentBid": {
            "text": isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") :voltmx.i18n.getLocalizedString("current bid new"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
         "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
          },
          "lblCurrentbidamount": {"text": "AED "+ price || "N/A",
                                  "skin": isSilent ? silentSkin : bidrateSkin, 
                                  "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : "",
                                 },
           "flxYourBid":
          {
            "isVisible": !isSilent
          },
         "lblYourBid":
          {
            "text": voltmx.i18n.getLocalizedString("Your Bid"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "right": isArabic ? "4%" : "",
            "left": isArabic ? "" : "4%"
          },
          "lblYourBidValue":
          {
            "text": "AED "+ your_bid || "N/A", 
                                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": isArabic ? "" : "5%",
                                "left": isArabic ? "5%" : ""
          },
          "lblAucStatus": {
            "text": voltmx.i18n.getLocalizedString("Status"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "right": isArabic ? "4%" : "",
            "left": isArabic ? "" : "4%",
          },
          "lblAucStatusValue": {"text": activebiditem.approval_status || "N/A", 
                                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "right": isArabic ? "" : "5%",
                                "left": isArabic ? "5%" : "",
                               },
          "flxfav": {
            "isVisible": true,
//             !isSilent, 
            "skin": isFavouriteskin,
            "onClick": this.addActiveToWishList.bind(this,objid,aucid)
          },
          "imgfavicon" : whichImage,
          "isSilent": isSilent,
          
          "flxShare": {
            "isVisible": false,
            "onClick": null,
            "skin": "sknflxBgFFFFFFBorder231F202px45",
            
            "clipBounds": true,
            "zIndex": 1,
            "enable": false 
          },
          "imgshare": "share.png",
          "flxRebid": {
            "isVisible": false,
            "skin": "slFbox",
            "onClick": this.enableAutoBid.bind(this,objid,aucid)
          },
          "imgrebid": autobidimg,
           "flxBottam": {
             "isVisible": now < targetTime
           },
            "btnBidnow": {
   "onClick": function(widget, context) {
        var rowIndex = context.rowIndex;   // get the row index
        var rowData = self.view.segActiveBidList.data[rowIndex]; // fetch row data from segment
        if (!rowData) return;

        var latestPrice = Number(rowData.lblCurrentbidamount.text.replace("AED ", "").trim());
        var latestHighestBidder = rowData.highestbidder || "";

        self.openBidAmountContainer(rowData.objid, rowData.aucid, latestPrice, latestHighestBidder,rowData.isSilent);
    },
    "text": voltmx.i18n.getLocalizedString("BID NOW"),
     "skin": "sknBtnBid61B35C8pxradius",
}
          
          
          
        }
        
        segmentData.push(data);
      }
    
        if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segmentData;
} else {
  self.originalSegData = self.originalSegData.concat(segmentData);
}
    self.view.segActiveBidList.addAll(segmentData);
    voltmx.application.dismissLoadingScreen();
     if (self.pageSize > records.length) {
    self.view.btnLoadMore.setVisibility(false);
     self.view.flxSegment.height =  "90%";
  } else {
    self.view.btnLoadMore.setVisibility(true);
     self.view.flxSegment.height ="80%";
  }
      self.currentOffset += newRecords.length;
    
    
  },
  
//   addActiveToWishList: function(objid,aucid)
//   {
//     var self = this;
//   var selectedRow = this.view.segActiveBidList.selectedRowItems;
//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = this.view.segActiveBidList.selectedRowIndex[1];

//   var isAlreadyLiked = rowData.imgfavicon === "heartlikerecommended.png";

//   var callback = function(success, message) {
//     if (success) {
//       // Update UI based on action
//       if (isAlreadyLiked) {
//         rowData.imgfavicon = "imgdislikenew.png";
//         rowData.flxfav.skin = "sknFlx231f20custom120pxround";
//       } else {
//         rowData.imgfavicon = "heartlikerecommended.png";
//         rowData.flxfav.skin = "sknFlxd32437custom120pxround";
//       }

//       self.view.segActiveBidList.setDataAt(rowData, rowIndex);
//     } else {
// //       alert("Favorite toggle failed: " + message);
//     }
//   };

//   if (isAlreadyLiked) {
//     self.invokeRemoveTrackedObject(objid, aucid, callback);
//   } else {
//     self.invokeAddTrackedObject(objid, aucid, callback);
//   }
    
//   },
  
  addActiveToWishList: function (objid, aucid) {
  var self = this;

  var isLogin = voltmx.store.getItem("isLogin");
  if (!isLogin) {
    // Not logged in → Navigate to Login
    new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    return;
  }

  var selectedRow = this.view.segActiveBidList.selectedRowItems;
  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];

  // Get row index — works for iOS & Android
  var allData = this.view.segActiveBidList.data || [];
  var rowIndex = this.view.segActiveBidList.selectedRowIndex
    ? this.view.segActiveBidList.selectedRowIndex[1]
    : allData.findIndex(item => JSON.stringify(item) === JSON.stringify(rowData));

  voltmx.print(" Row Index: " + rowIndex);
  voltmx.print(" Row Data: " + JSON.stringify(rowData));

  var isAlreadyLiked = rowData.imgfavicon === "heartlikerecommended.png";

  var callback = function (success, message) {
    if (success) {
      // Update UI
      if (isAlreadyLiked) {
        rowData.imgfavicon = "imgdislikenew.png";
        rowData.flxfav.skin = "sknFlx231f20custom120pxround";
      } else {
        rowData.imgfavicon = "heartlikerecommended.png";
        rowData.flxfav.skin = "sknFlxd32437custom120pxround";
      }
      self.view.segActiveBidList.setDataAt(rowData, rowIndex);
    } else {
      voltmx.print(" Favorite toggle failed: " + message);
    }
  };

  if (isAlreadyLiked) {
    self.invokeRemoveTrackedObject(objid, aucid, callback);
  } else {
    self.invokeAddTrackedObject(objid, aucid, callback);
  }
},
  
   openBidAmountContainer: function(objid,aucid,price,highestbidder,isSilent){
     var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
     this.view.flxScrollBidAmount.removeAll();
     this.objid = null;
    this.aucid = null;
          
     this.objIdForAutoBid = null;
    this.aucIdForAutoBid = null;
    if(isLogin)
      {
        
       this.selIndex = this.view.segActiveBidList.selectedIndex;
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
        
//         if(highestbidder !== this.userid){
        
     var selectedData = this.view.segActiveBidList.selectedRowItems[0];
//     this.currentAmount = price;
    this.objid = objid;
    this.aucid = aucid;
          
    this.objIdForAutoBid = objid;
    this.aucIdForAutoBid = aucid;      
    
    var amountText = selectedData.lblCurrentbidamount.text;  // "AED 23500.00"
    var amountOnly = amountText.replace("AED", "").trim();
//      this.createChipSetRelated(amountOnly);
//     this.currentAmount = Number(amountOnly);
          
//            var self = this;
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
// //           alert("You're the highest bidder!");
//            self.view.SmthngWentWrong.setVisibility(true);
//               self.view.SmthngWentWrong.lblSomethingWentWrong.text = "You're the highest bidder!";

//         }
      }
        
    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
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
    
    if(true){
    

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
//      self.view.flxOverLay.setVisibility(true);
//           self.view.flxWarning.setVisibility(true);
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
  
  
  invokeAddTrackedObject: function(objid,aucid,callback)
  {
    
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


    
  },
  
  invokeRemoveTrackedObject: function(objid, aucid, callback) {
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
},
  
//   invokeAutoBidFunction: function()
//   {
    
//      if (this.view.tbxAutoBidAmount.text && this.view.tbxAutoBidAmount.text.trim() !== "") {
       
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
//     var maxBidAmount = self.view.tbxAutoBidAmount.text;
//     register_auto_bidding_inputparam["serviceID"] = "fry_int_auctions$auction-register-auto-bid";
//     register_auto_bidding_inputparam["auction_id"] = this.aucIdForAutoBid;
//     register_auto_bidding_inputparam["bid_by"] = userid;
//     register_auto_bidding_inputparam["bid_max_amount"] = maxBidAmount;
// //     register_auto_bidding_inputparam["bid_min_value"] = "200";
//     register_auto_bidding_inputparam["object_id"] = this.objIdForAutoBid;
//     var register_auto_bidding_httpheaders = {
//       "user_token":""
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
//       self.updateSegmentWithAutoBidActive();
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
//             var msg = auction_bidding.message;
            
          
          
       if(msg && msg.toLowerCase().includes("accepted")){
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
              if( self.view.lblSuccessMsg){
                self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Your Bid Has Been Placed Successfully");
              }
                self.closeBidAmountContainer();
                self.view.flxOverLay.setVisibility(true);
                self.view.flxBidSuccessPopup.setVisibility(true);
                self.updateSegmentWithUpdatedBidRate();
                if(!self.isSilent)
                  {
                eventAuctionBid(self.aucid,self.objid);
                  }
//                 self.updateActiveAuctionIdWhenBid();
            } else if (msg && msg.trim() !== "") {
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
    auction_bidding_inputparam["serviceID"] = "fry_int_buyer$manual-auction-bidding";
    auction_bidding_inputparam["user_id"] = userid;
    var usertoken = voltmx.store.getItem("getUserAccesstoken");

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
  
//     updateSegmentWithUpdatedBidRate: function()
//   {
    
//     var selIndex = this.view.segActiveBidList.selectedRowIndex;
//     var rowData = this.view.segActiveBidList.selectedRowItems[0];
//     rowData.lblCurrentbidamount = "AED " + (this.currentAmount + Number(this.vehicleHike));
//     rowData.lblCurrentbidamount = {
//     "text": "AED " + (this.currentAmount + Number(this.vehicleHike)),
//     "skin": "sknLblDubai02905120pxBold"
//   };
// //     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;
//     this.view.segActiveBidList.setDataAt(rowData, selIndex[1]);
  
//   },
  
   updateSegmentWithUpdatedBidRate: function () {
//     var selIndex = this.view.segActiveBidList.selectedRowIndex;
//      var selIndex = this.view.segActiveBidList.selectedIndex;
     var selIndex = this.selIndex;
     

    if (!selIndex || selIndex.length < 2) {
        voltmx.print("No row selected in segActiveBidList");
        return;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var seg = this.view.segActiveBidList;
    var rowIndex = selIndex[1];
    var rowData = seg.data[rowIndex];
//     var rowData = this.view.segActiveBidList.selectedRowItems[0];

    var currentAmount = this.currentAmount;
    var vehicleHike = Number(this.vehicleHike);
     var bidAmount;
     if(this.isSilent){
       var bidAmount = Number(this.view.tbxBidAmount.text).toLocaleString("en-AE");
     }
     else{
       var bidAmount = currentAmount + vehicleHike;
     }
    

//     var totalBids = 1;
//     if (rowData.lblTotalBidsCount && rowData.lblTotalBidsCount.text) {
//        var totalBids = Number(rowData.lblTotalBidsCount.text) + 1;
//     }

    // Update current bid amount
    rowData.lblCurrentbidamount = {
        "text": "AED " + bidAmount,
        "skin": this.isSilent ? "sknLblDubai0d74b520pxbold" : "sknLblDubai02905120pxBold",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : ""
    };


    // Update i18n labels
    rowData.lblCurrentBid = {
        "text": this.isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") : voltmx.i18n.getLocalizedString("current bid"),
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%"
    };

rowData.lblYourBidValue = {
        "text": "AED " + bidAmount,
//         "skin": this.isSilent ? "sknLblDubai0d74b520pxbold" : "sknLblDubai02905120pxBold",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "right": isArabic ? "" : "5%",
        "left": isArabic ? "5%" : ""
    };


    // Update i18n labels
    rowData.lblYourBid = {
        "text": voltmx.i18n.getLocalizedString("Your Bid"),
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%"
    };


    // Rebind data
//     var segData = this.view.segActiveBidList.data;
//     segData[selIndex[1]] = rowData;
//     this.view.segActiveBidList.setData(segData);
     seg.setDataAt(rowData, rowIndex);
},
  
  updateActiveAuctionIdWhenBid: function () {
    var self = this;

    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var currentLocale = voltmx.store.getItem("currentLocale");

    var inputParam = {
        serviceID: "fry_int_buyer$get-buyer-my-active-bids",
        user_id: userid || "",
        page: "1",
        pageSize: self.pageSize || 10,
        language: currentLocale || "en",
        lot_no: self.lot || "",
        title: self.title || "",
        httpheaders: { "user_token": usertoken },
        httpconfig: {}
    };

    function serviceCallBack(status, get_buyer_my_active_bids) {
        if (
            get_buyer_my_active_bids &&
            get_buyer_my_active_bids.opstatus === 0 &&
            get_buyer_my_active_bids.httpresponse &&
            get_buyer_my_active_bids.httpresponse.responsecode === 200 &&
            Array.isArray(get_buyer_my_active_bids.records)
        ) {
            //  Update only activeAuctionIds (overwrite, not append)
            self.activeAuctionIds = get_buyer_my_active_bids.records
                .filter(record => !String(record.auction_type_id).includes("4"))
                .map(record => record.auction_id)
                .join(";");

            voltmx.print(" Updated activeAuctionIds after bid: " + self.activeAuctionIds);
        } else {
            voltmx.print(" Failed to update activeAuctionIds after bid. Response: " + JSON.stringify(get_buyer_my_active_bids));
        }
    }

    try {
        mfintegrationsecureinvokerasync(
            inputParam,
            "fry_int_buyer",
            "get-buyer-my-active-bids",
            serviceCallBack
        );
    } catch (e) {
        voltmx.print(" Error in updateActiveAuctionIdWhenBid: " + e);
    }
},

  
  adjustRTLLayout: function()
  {
    if(this.view.flxError){
     this.view.flxError.setVisibility(false);
   }
    if (this.view.flxServiceError) 
    {
      this.view.flxServiceError.setVisibility(false);
    }
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
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search My Bids");
     this.view.lblMyBidsHeading.text = voltmx.i18n.getLocalizedString("My Bids");
    this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.btnCloseBidSuccessPopUp.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Congratulations");
    this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops");
    this.view.tc.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblMyBidsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblMyBidsHeading.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

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
