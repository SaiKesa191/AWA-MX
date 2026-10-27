
define({
  onNavigate: function() {
    
    this.adjustRTLLayout();
    this.userid = voltmx.store.getItem("userId");
     this.mode = voltmx.store.getItem("mode");
    this.view.preShow = this.onPreshow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.segCurrentAuctionList.onRowClick = this.navTofrmDetails.bind(this);
    
    this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    this.view.flxRemoveBidSuccessPopup.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
    this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
    
    this.view.flxCloseAutoBidAmountContainer.onClick = function() {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.view.flxError.btnTryAgain.onClick = this.refreshData.bind(this);
    this.view.onHide = function() {
//     voltmx.timer.cancel("searchPlaceholderTimer");
//       this.stopLivePriceRefresh();
         
         try { voltmx.timer.cancel("updateCountDown1AucCalSilent"); } catch(e){}
       
          try { voltmx.timer.cancel("updateCountDownAucCalSilent"); } catch(e){}
       
       
};
  },

  onPreshow: function() {
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    loginToDam();
      if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    this.view.tbxBidAmount.setEnabled(false);
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
    this.view.tc.setVisibility(false);
    if(this.view.flxOverLay){
      this.view.flxOverLay.setVisibility(false);
    }
    this.view.btnLoadMore.setVisibility(false);
    this.toggleFooterIcons();
    this.getActiveAuctionDates();
    
       try {
 voltmx.timer.schedule(
    "updateCountDownAucCalSilent",
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
        voltmx.timer.cancel("updateCountDown1AucCalSilent");   
        voltmx.print("updateCountDown1AucCalSilent cancelled successfully"); 
      }
       catch (e) 
       {  
         voltmx.print("updateCountDown1AucCalSilent already stopped or not found"); 
       }

  // Start periodic refresh
  voltmx.timer.schedule(
  "updateCountDown1AucCalSilent",
  this.refreshCountDown.bind(this),  // ✅ pass function reference, not call
  1,
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
  
  refreshData: function() {
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    this.getActiveAuctionDates();
},
  
  getCurrentDateIndex: function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var todayStr = `${yyyy}-${mm}-${dd}`;

    for (var i = 0; i < this.calendar.length; i++) {
      if (this.calendar[i].fullDate === todayStr) {
        return i;
      }
    }
    return -1; // Current date not found
  },

  getActiveAuctionDates: function() {
    var self = this;
    
    var today = new Date();

    function formatDate(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    var startDate = formatDate(today);
    var futureDate = new Date();
    futureDate.setDate(today.getDate() + 26);
    var endDate = formatDate(futureDate);

    function invokeDatesCallBack(status, get_auction_calendar_dates) {
      voltmx.print(get_auction_calendar_dates.records);
      
      if (self.view.flxError) self.view.flxError.setVisibility(false);
    if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);
      
      if(get_auction_calendar_dates && get_auction_calendar_dates.errcode 
         && Number(get_auction_calendar_dates.errcode) === 1011)
        {
           if (self.view.flxError) self.view.flxError.setVisibility(true);
           return;
        }
      var records = get_auction_calendar_dates.records || [];
      self.updateDates(records);
      self.createCalendarView();
      self.auctionDates = records;

      var currentDateIndex = self.getCurrentDateIndex();
      if (currentDateIndex !== -1) {
        self.handleCalendarItemClick(currentDateIndex, self.calendar);
      } else {
        self.view.segCurrentAuctionList.setData([]);
        self.view.lblNoOfFleets.text = "0";
        self.present = false;
//         alert("No Auctions on this day");
      }
    }

    if (get_auction_calendar_dates_inputparam == undefined) {
      var get_auction_calendar_dates_inputparam = {};
    }
    get_auction_calendar_dates_inputparam["serviceID"] = "fry_int_auctions$get-auction-calendar-dates";
    get_auction_calendar_dates_inputparam["start_date"] = startDate;
    get_auction_calendar_dates_inputparam["end_date"] = endDate;
     get_auction_calendar_dates_inputparam["auction_type"] = "4";

    var get_auction_calendar_dates_httpheaders = {};
    get_auction_calendar_dates_inputparam["httpheaders"] = get_auction_calendar_dates_httpheaders;
    var get_auction_calendar_dates_httpconfigs = {};
    get_auction_calendar_dates_inputparam["httpconfig"] = get_auction_calendar_dates_httpconfigs;
    fry_int_auctions$get_auction_calendar_dates = mfintegrationsecureinvokerasync(
      get_auction_calendar_dates_inputparam,
      "fry_int_auctions",
      "get-auction-calendar-dates",
      invokeDatesCallBack
    );
  },

  // Rest of the existing functions remain unchanged
  prepareAuctionDateSet: function(records) {
    var auctionDates = new Set();
    records.forEach(function(rec) {
      if (rec.auction_date) {
        auctionDates.add(rec.auction_date);
      }
    });
    return auctionDates;
  },

  getFirstAvailableAuctionIndex: function(auctionDates) {
    for (var i = 0; i < auctionDates.length; i++) {
      if (auctionDates[i] && auctionDates[i].hasAuction === true) {
        return i;
      }
    }
    return -1;
  },

  onPostShow: function() {
    this.view.btnBidNow.onClick = this.invokeFryWfAuctionBidding.bind(this);
    
    this.view.flxCheckBox1.onClick = () => {
      if (this.view.imgCheck.isVisible) {
        this.view.imgCheck.setVisibility(false);
        this.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
      } else {
        this.view.imgCheck.setVisibility(true);
        this.view.btnBidNow.skin = "sknBtnBid61B35C8pxradius";
      }
    };
    
//          this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {
      
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
    
     this.view.btnClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
          this.view.flxWarning.setVisibility(false);
    };
    
      this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
    };
    
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
    

    
    if (this.view.flxBidAmountSelectionContainer.isVisible) {
      this.view.flxBidAmountSelectionContainer.setVisibility(false);
    }
    
     this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
  },

  updateDates: function(recordsFromAPI) {
    var weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var currentDate = new Date();
    this.calendar = [];

    var auctionDateSet = this.prepareAuctionDateSet(recordsFromAPI);

    for (var i = 0; i < 26; i++) {
      var tempDate = new Date();
      tempDate.setDate(currentDate.getDate() + i);

      var yyyy = tempDate.getFullYear();
      var mm = String(tempDate.getMonth() + 1).padStart(2, '0');
      var dd = String(tempDate.getDate()).padStart(2, '0');
      var fullDate = `${yyyy}-${mm}-${dd}`;

      var weekday = weeks[tempDate.getDay()];
      var hasAuction = auctionDateSet.has(fullDate);

      this.calendar.push({
        weekday: weekday,
        date: dd,
        fullDate: fullDate,
        hasAuction: hasAuction
      });
    }

    voltmx.print("Calendar: " + JSON.stringify(this.calendar));
  },

  onLoadMoreClick: function() {
    voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
      shouldShowLabelInBottom: "true",
      separatorHeight: 45,
      progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
      progressIndicatorColor: "Gray"
    });
    this.pageSize += 10;
    this.invokeOnlineAuctionList();
  },

  invokeOnlineAuctionList: function() {
    var self = this;

     function invServiceCallBack(status, online_auction_list) {
    voltmx.application.dismissLoadingScreen();

    // Hide all error containers by default
    if (self.view.flxError) self.view.flxError.setVisibility(false);
    if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(false);

    var responseCode = null;
    if (
        online_auction_list &&
        online_auction_list.httpresponse &&
        online_auction_list.httpresponse.responsecode
    ) {
        responseCode = online_auction_list.httpresponse.responsecode;
    }

    if (
        online_auction_list &&
        online_auction_list.opstatus === 0 &&
        responseCode === 200 &&
        Array.isArray(online_auction_list.records)
    ) {
        //  Success case
        var records = online_auction_list.records;

        if (records.length > 0) {
            self.setDataToSegFromService(records);
            self.view.lblNorecords.setVisibility(false);
        } else {
            self.view.lblNorecords.setVisibility(true);
            self.view.btnLoadMore.setVisibility(false);
        }
    } else {
        //  Error case
        if (
            online_auction_list &&
            online_auction_list.errcode &&
            Number(online_auction_list.errcode) === 1011
        ) {
            // Business error (like "No active auctions for user")
            if (self.view.flxError) self.view.flxError.setVisibility(true);
        } else {
            // Service error (network / invalid response)
            if (self.view.flxServiceError) self.view.flxServiceError.setVisibility(true);
        }

        if (self.view.lblNorecords) self.view.lblNorecords.setVisibility(false);
        voltmx.print("Invalid response structure or status: " + JSON.stringify(online_auction_list));
    }
}

    if (online_auction_list_inputparam == undefined) {
      var online_auction_list_inputparam = {};
    }
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

    online_auction_list_inputparam["serviceID"] = "fry_int_auctions$get-buyer-all-auctions";
    online_auction_list_inputparam["body_type"] = "";
    online_auction_list_inputparam["transmission_type"] = "";
    online_auction_list_inputparam["fuel_type"] = "";
    online_auction_list_inputparam["body_condition"] = "";
    online_auction_list_inputparam["user_id"] = this.userid ? this.userid : "";
    online_auction_list_inputparam["brand"] = "";
    online_auction_list_inputparam["model"] = "";
    online_auction_list_inputparam["mileage_range_from"] = "";
    online_auction_list_inputparam["mileage_range_to"] = "";
    online_auction_list_inputparam["asset_id"] = "";
    online_auction_list_inputparam["year_range_from"] = 0;
    online_auction_list_inputparam["year_range_to"] = 0;
    online_auction_list_inputparam["auction_type"] = "4";
    online_auction_list_inputparam["yard_branch"] = 0;
    online_auction_list_inputparam["price_range_from"] = 0;
    online_auction_list_inputparam["price_range_to"] = 0;
    online_auction_list_inputparam["priceSort"] = 0;
    online_auction_list_inputparam["milageSort"] = 0;
    online_auction_list_inputparam["yearSort"] = 0;
    online_auction_list_inputparam["page"] = 1;
    online_auction_list_inputparam["pageSize"] = self.pageSize;
    var selectedDate = new Date(self.selectedCalDate); 
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

  function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

var selected = stripTime(selectedDate);
var current = stripTime(currentDate);

// if (selected > current) {
//   online_auction_list_inputparam["upcoming_auctions"] = 1;
// } else {
//   online_auction_list_inputparam["upcoming_auctions"] = 0;
// }

    online_auction_list_inputparam["bid_close_date"] = self.selectedCalDate || "";
    online_auction_list_inputparam["language"] = currentLocale || "en";

    var online_auction_list_httpheaders = {};
    online_auction_list_inputparam["httpheaders"] = online_auction_list_httpheaders;
    var online_auction_list_httpconfigs = {};
    online_auction_list_inputparam["httpconfig"] = online_auction_list_httpconfigs;
    fry_int_auctions$online_auction_list = mfintegrationsecureinvokerasync(
      online_auction_list_inputparam,
      "fry_int_auctions",
      "get-buyer-all-auctions",
      invServiceCallBack
    );
  },

  setDataToSegFromService: function(records) {
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
      "lblLocation":"lblLocation",
      "lblLocationName":"lblLocationName",
      "flxLikeHeart":"flxLikeHeart",
      "imgHeart":"imgHeart",
      "lblCurrentBid":"lblCurrentBid",
          "lblYear":"lblYear",
      "lblYearVal":"lblYearVal",
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
    };

    self.loadNextRecords(records);
  },

  loadNextRecords: function(records) {
    var self = this;
    var data = [];
    var newRecords = records.slice(self.currentOffset);
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
    for (var i = 0; i < newRecords.length; i++) {
      var item = newRecords[i];
      var imageUrl = item.thumbnail_url;
         var isSilent = false;

if (item && item.auction_type_id) {
  if (item.auction_type_id.includes("4")) {
    isSilent = true;
  }
}
      var carimage = (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png";
      var imagePlaceholder = "loading.gif";
      var carname = item.title && item.title.trim() !== "" ? item.title : "N/A";
//        var carname = (item.category_name && item.sub_category_name)
//   ? item.category_name + " " + item.sub_category_name
//   : "N/A";
      var timercount = item.time_remaining;
//       var bidclosetime = self.getTimeRemainingString(timercount);
      var userTargetTime = convertUTCtoUserTime(timercount);
    var bidclosetime = getTimeRemainingString(userTargetTime);
      var lotnum = item.ID || "N/A";
      var totalbids = item.location || "N/A";
      var location = item.milage || "N/A";
      var objid = item.object_id;
      var aucid = item.auction_id;
       var year = item.year || "N/A";
        let isYourBidVisible = false;

if (item && item.max_bid_amount != null) {
  if (Number(item.max_bid_amount) !== 0) {
    isYourBidVisible = true;
  }
}
      var price = Number(item.max_bid_amount).toLocaleString("en-AE");
      var highestbidder = item.highest_bidder;
      var silentSkin = "sknLblDubai0d74b520pxbold";
      var bidrateSkin = (item.highest_bidder === this.userid) ? "sknLblCronosProd0290512Bold22px" : "sknLblDubaid3243720pxbold";
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
        "objid": objid,
        "aucid": aucid,
         "lblTimerCount": {
        "text": bidclosetime,
        "right": isArabic ? "4%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
        "bidCloseTime": timercount,
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
        
         "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Mileage"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
         "lblLocationName": {
        "text": location,
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
        "lblAuctionID": aucid,
        "flxLikeHeart": {
          "isVisible": true,
          "skin": favFlexSkin,
          "onClick": this.addActiveToWishList.bind(this, objid, aucid)
        },
        "imgHeart": imgheartset,
//         "lblCurrentBid": "CURRENT BID",
        "flxBidPrice": {
          "isVisible": isSilent ? isYourBidVisible : true
        },
          "lblBidAmount": {
        "text": isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") :voltmx.i18n.getLocalizedString("current bid"),
        "right": isArabic ? "8%" : "",
        "left": isArabic ? "" : "4%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
      "lblPrice": {
        "text":  price || "N/A",
        "skin": isSilent ? silentSkin : bidrateSkin, 
        "left": isArabic ? "4%" : "",
        "right": isArabic ? "" : "8%",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
        "flxAutoBid": {
          "isVisible": !isSilent,
          "onClick": this.enableAutoBid.bind(this, objid, aucid)
        },
        "imgAutoBidicon": autobidimg,
        "lblAutoBid": "AUTO BID",
        "btnBidNow": {
          "onClick": this.openBidAmountContainer.bind(this, objid, aucid, price, highestbidder,isSilent),
          "text": voltmx.i18n.getLocalizedString("BID NOW")
        }
      });
    }

    self.view.segCurrentAuctionList.addAll(data);
    voltmx.application.dismissLoadingScreen();

    if (self.pageSize > records.length) {
      self.view.btnLoadMore.setVisibility(false);
      self.view.flxAuctionsSegmentBody.height ="97%";
    } else {
      self.view.btnLoadMore.setVisibility(true);
       self.view.flxAuctionsSegmentBody.height ="85%";
    }

    self.currentOffset += newRecords.length;
  },

//   getTimeRemainingString: function(targetTimeString) {
//     try {
//       var now = new Date().getTime();
//       var target = new Date(targetTimeString).getTime();
//       var diff = target - now;

//       if (isNaN(target) || diff <= 0) {
//         return "0D 0H 0M 0S";
//       }

//       var seconds = Math.floor((diff / 1000) % 60);
//       var minutes = Math.floor((diff / (1000 * 60)) % 60);
//       var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       var days = Math.floor(diff / (1000 * 60 * 60 * 24));

//       return days + "D " + hours + "H " + minutes + "M ";
// //       + seconds + "S";
//     } catch (e) {
//       return "N/A";
//     }
//   },

  addActiveToWishList: function(objid, aucid) {
    var isLogin = voltmx.store.getItem("isLogin");
    if (isLogin) {
      var self = this;
//       if(this.mode !== "seller"){
               if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){

      var selectedRow = self.view.segCurrentAuctionList.selectedRowItems;
      if (!selectedRow || selectedRow.length === 0) {
        voltmx.print("No row is selected");
        return;
      }

      var rowData = selectedRow[0];
    //  var rowIndex = self.view.segCurrentAuctionList.selectedRowIndex[1];
      
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
          if (isAlreadyLiked) {
            rowData.imgHeart = "imgdislikenew.png";
            rowData.flxLikeHeart.skin = "sknFlx231f20custom120pxround";
          } else {
            rowData.imgHeart = "heartlikerecommended.png";
            rowData.flxLikeHeart.skin = "sknFlxd32437custom120pxround";
          }
          self.view.segCurrentAuctionList.setDataAt(rowData, rowIndex);
        } else {
//           alert("Favorite toggle failed: " + message);
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
    } else {
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
  },

  invokeAddTrackedObject: function(objid, aucid, callback) {
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

  toggleFooterIcons: function() {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);
    
    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
    
    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
    var mode = voltmx.store.getItem("mode") || "seller";
    if (mode === "seller") {
      this.view.Footer2.imgMyBids.src = "mylistings.png";
//       this.view.Footer2.lblMyBids.text = "Listings";
    } else {
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//       this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
    if (isLogin === true && isUserCreated === true) {
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    } else {
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
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
//    if(this.mode !== "seller"){
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
        var isActive = bidData.status.toLowerCase() === "active";
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
var isActive = (bidData.status && bidData.status.toLowerCase() === "active") ? true : false;
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

//   updateSegmentWithUpdatedBidRate: function() {
//     var self = this;
//     var selIndex = self.view.segCurrentAuctionList.selectedRowIndex;
//     var rowData = self.view.segCurrentAuctionList.selectedRowItems[0];
//     rowData.lblPrice = {
//       "text": "AED " + (self.currentAmount + Number(self.vehicleHike)),
//       "skin": "sknLblDubai02905120pxBold"
//     };
//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;
//     self.view.segCurrentAuctionList.setDataAt(rowData, selIndex[1]);
//   },
  
  updateSegmentWithUpdatedBidRate: function () {
//     var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;
//       var selIndex = this.view.segCurrentAuctionList.selectedIndex;
       var selIndex = this.selIndex;
    if (!selIndex || selIndex.length < 2) {
        voltmx.print("No row selected in segCurrentAuctionList");
        return;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE"; // or your app-specific flag
     var seg = this.view.segCurrentAuctionList;
    var rowIndex = selIndex[1];
    var rowData = seg.data[rowIndex];
    var numericBid = Number(this.view.tbxBidAmount.text) || 0;
//     var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];
    var currentAmount = this.currentAmount;
    var vehicleHike = Number(this.vehicleHike);
    var bidAmount;
     if(this.isSilent){
       var bidAmount = Number(this.view.tbxBidAmount.text).toLocaleString("en-AE");
     }
     else{
       var bidAmount = currentAmount + vehicleHike;
     }
//     var newBidPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
//     if(rowData.lblTotalBidsCount){
//     var totalBids = Number(rowData.lblTotalBidsCount.text) + 1;
//     }

    rowData.lblPrice = {
        "text": bidAmount,
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
//     var segData = this.view.segCurrentAuctionList.data;
//     segData[selIndex[1]] = rowData;
//     this.view.segCurrentAuctionList.setData(segData);
    seg.setDataAt(rowData, rowIndex);
},

 //  Working one commented for Dynamic getting chipsets.   
//   openBidAmountContainer: function(objid, aucid, price, highestbidder) {
//     var isLogin = voltmx.store.getItem("isLogin");
//     if (isLogin) {
// //       if(this.mode !== "seller"){
//                if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){

//       if (highestbidder !== this.userid) {
//         var selectedData = this.view.segCurrentAuctionList.selectedRowItems[0];
//         this.objid = objid;
//         this.aucid = aucid;
//         this.objIdForAutoBid = objid;
//         this.aucIdForAutoBid = aucid;
        
//         var amountText = selectedData.lblPrice.text;
//         var amountOnly = amountText.replace("AED", "").trim();
//         this.createChipSetRelated(amountOnly);
//         this.currentAmount = Number(amountOnly);
//         this.view.flxBidAmountSelectionContainer.setVisibility(true);
//         this.view.imgCheck.setVisibility(true);
//     this.view.btnBidNow.skin = "sknBtnBid61B35C8pxradius";
//         this.view.tbxBidAmount.text = "";
//         this.view.flxOverLay.setVisibility(true);
//       } 
        
//         else {
//         alert('You are already a highest bidder');
//       }
//           }
       
//         else{
//           this.view.flxOverLay.setVisibility(true);
//           this.view.flxWarning.setVisibility(true);
// //           alert("You are Seller. Switch to Buyer to use this feature");
//         }
//     } else {
//       var x = new voltmx.mvc.Navigation("frmLoginScreen");
//       x.navigate();
//     }
//   },

//   createChipSetRelated: function(amountOnly) {
//     var self = this;
//     this.view.flxScrollBidAmount.removeAll();
   
//     var bidAmounts;
//     if (amountOnly <= 20000) {
//       bidAmounts = ["100", "200", "500", "1000", "3000", "5000"];
//     } else if (amountOnly > 20000 && amountOnly <= 50000) {
//       bidAmounts = ["200", "500", "1000", "3000", "5000"];
//     } else if (amountOnly > 50000 && amountOnly <= 200000) {
//       bidAmounts = ["500", "1000", "3000", "5000"];
//     } else {
//       bidAmounts = ["5000", "10000", "15000", "50000"];
//     }
    
//     this.dynamicBidButtons = {};

//     bidAmounts.forEach(function(amount, index) {
//       var btnId = "btn" + amount + "AED";
//       var btn = new voltmx.ui.Button({
//         "centerY": "50%",
//         "height": "100%",
//         "id": btnId,
//         "isVisible": true,
//         "left": index === 0 ? "5%" : "2%",
//         "skin": "sknBtnCCCCCCBorderDubai75778620px",
//         "text": "+" + amount + " AED",
//         "top": "0dp",
//         "width": voltmx.flex.USE_PREFERRED_SIZE,
//         "onClick": self.selectBidAmountAddIntoTextBox.bind(self, amount)
//       }, {
//         "contentAlignment": constants.CONTENT_ALIGN_CENTER,
//         "displayText": true,
//         "padding": [5, 0, 5, 0],
//         "paddingInPixel": false
//       }, {});

//       self.dynamicBidButtons[amount] = btn;
//       self.view.flxScrollBidAmount.add(btn);
//     });
//   },
  
  openBidAmountContainer: function(objid, aucid, price, highestbidder,isSilent) {
    var self = this;
    isSilent = true;
    var isLogin = voltmx.store.getItem("isLogin");
    this.view.flxScrollBidAmount.removeAll();
    this.objid = objid;
    this.aucid = aucid;
    this.objIdForAutoBid = objid;
    this.aucIdForAutoBid = aucid;

    if (isLogin) {
        
        var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      this.selIndex = this.view.segCurrentAuctionList.selectedIndex;
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
        
        this.view.btnAutoBid.left = "";
        this.view.btnAutoBid.right = "4%";
        
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
        
        this.view.btnAutoBid.left = "4%";
        this.view.btnAutoBid.right = "";
        
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
            if (highestbidder !== this.userid) {
                var selectedData = this.view.segCurrentAuctionList.selectedRowItems[0];
                var amountText = selectedData.lblPrice.text;
                var amountOnly = amountText.replace("AED", "").trim();

                this.currentAmount = Number(amountOnly);

                
//                 var self = this;
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
//                 alert('You are already a highest bidder');
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString("You are the highest bidder");
            }
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
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//     this.view.flxScrollBidAmount.removeAll();
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

    for (var key in self.dynamicBidButtons) {
      self.dynamicBidButtons[key].skin = "sknBtnCCCCCCBorderDubai75778620px";
    }

    if (self.dynamicBidButtons[amount]) {
      self.dynamicBidButtons[amount].skin = "sknBtnd32437DubaiFFFFFF20px";
    }

    this.view.tbxBidAmount.text = this.currentAmount + Number(amount) + " AED";
    this.vehicleHike = amount;
  },

  closeBidAmountContainer: function() {
    this.view.flxBidAmountSelectionContainer.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },

  invokeFryWfAuctionBidding: function() {
    if (this.view.tbxBidAmount.text.trim() !== "") {
      if (this.view.imgCheck.isVisible) {
        var self = this;
         checkTokenValidatity(function() {
        voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
          shouldShowLabelInBottom: "true",
          separatorHeight: 45,
          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
          progressIndicatorColor: "Gray"
        });
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
            
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
              if(msg && msg.toLowerCase().includes("accepted")){
              if( self.view.lblSuccessMsg){
                self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Your Bid Has Been Placed Successfully");
              }
                self.closeBidAmountContainer();
                self.view.flxOverLay.setVisibility(true);
                self.view.flxBidSuccessPopup.setVisibility(true);
                self.updateSegmentWithUpdatedBidRate();
            } else if (msg && msg.trim() !== "") {
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
//         function invService(status, auction_bidding) {
//           voltmx.application.dismissLoadingScreen();
//           voltmx.print("Status: " + status);
//           voltmx.print("Response: " + JSON.stringify(auction_bidding));

//           if (
//                auction_bidding &&
//     auction_bidding.opstatus === 0 &&
//     auction_bidding.auction_bidding_reponse &&
//     auction_bidding.auction_bidding_reponse[0] &&
//     auction_bidding.auction_bidding_reponse[0].records &&
//     auction_bidding.auction_bidding_reponse[0].records[0]
//           ) {
//             var record = auction_bidding.auction_bidding_reponse[0].records[0];
//             var msg = auction_bidding.message;
            
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
//               if (self.view.lblSuccessMsg) {
//                 self.view.lblSuccessMsg.text = "Your Bid Has Been Placed Successfully";
//               }
//               self.closeBidAmountContainer();
//               self.view.flxBidSuccessPopup.setVisibility(true);
//               self.updateSegmentWithUpdatedBidRate();
//             } else if (msg) {
//               alert(msg);
//             } else {
//               alert("Unknown response from server.");
//             }
//           } else {
//             alert("Failed to place bid. Please check your connection or try again.");
//           }
//         }

        if (auction_bidding_inputparam == undefined) {
          var auction_bidding_inputparam = {};
        }
        var userid = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        auction_bidding_inputparam["serviceID"] = "fry_int_buyer$manual-auction-bidding";
        auction_bidding_inputparam["user_id"] = userid;
          if(self.isSilent){
           auction_bidding_inputparam["vehicle_amount"] = 0;
        auction_bidding_inputparam["bid_hike"] = Number(self.view.tbxBidAmount.text);
        }
          else{
        auction_bidding_inputparam["vehicle_amount"] = self.currentAmount;
        auction_bidding_inputparam["bid_hike"] = Number(self.vehicleHike);
          }
        auction_bidding_inputparam["auction_id"] = self.aucid;
        auction_bidding_inputparam["object_id"] = self.objid;
        var auction_bidding_httpheaders = {
          "user_token": usertoken
        };
        auction_bidding_inputparam["httpheaders"] = auction_bidding_httpheaders;
        var auction_bidding_httpconfigs = {};
        auction_bidding_inputparam["httpconfig"] = auction_bidding_httpconfigs;
        fry_wf$auction_bidding = mfintegrationsecureinvokerasync(
          auction_bidding_inputparam,
          "fry_int_buyer",
          "manual-auction-bidding",
          invService
        );
         });
      } else {
//         alert('select check box..!');
      }
    } else {
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
      self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Auto Bid Activated Successfully");
      self.updateSegmentWithAutoBidActive();
      self.view.flxBidSuccessPopup.setVisibility(true);
    } else if (parsedResult &&  (parsedResult.message || parsedResult.result_message)) {
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

  createCalendarView: function() {
    if (!this.calendar || this.calendar.length === 0) {
      this.updateDates();
    }
    var self = this;
    self.view.flxScrollCalendarShow.removeAll();

    for (var i = 0; i < this.calendar.length; i++) {
      var item = this.calendar[i];
      var leftVal = (i === 0) ? "2%" : "0%";
 
      var flxItem = new voltmx.ui.FlexContainer({
        id: "flxItem" + i,
        layoutType: voltmx.flex.FLOW_VERTICAL,
        width: "12%",
        height: "100%",
        left: leftVal,
        isVisible: true,
        skin: "slFbox",
        onClick: this.handleCalendarItemClick.bind(this, i, this.calendar)
      }, {}, {});
      flxItem.setDefaultUnit(voltmx.flex.DP);

      var lblWeekDay = new voltmx.ui.Label({
        id: "lblWeekDay" + i,
        text: item.weekday,
        centerX: "50%",
        top: "5%",
        skin: "sknLblDubai231f2018pxMedium",
        width: voltmx.flex.USE_PREFERRED_SIZE,
        isVisible: true
      }, {
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});

      var lblDate = new voltmx.ui.Label({
        id: "lblDate" + i,
        text: item.date,
        centerX: "50%",
        top: "0",
        height: "33%",
        skin: "sknLblDubai231f2022pxMedium",
        width: voltmx.flex.USE_PREFERRED_SIZE,
        isVisible: true
      }, {
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});

      var flxActiveDot = new voltmx.ui.FlexContainer({
        id: "flxActiveItem" + i,
        width: "22%",
        height: "13%",
        top: "1%",
        centerX: "50%",
        isVisible: item.hasAuction,
        skin: "sknFlxd32437bgcustom120pxround",
        layoutType: voltmx.flex.FREE_FORM
      }, {}, {});
      flxActiveDot.setDefaultUnit(voltmx.flex.DP);

      flxItem.add(lblWeekDay, lblDate, flxActiveDot);
      self.view.flxScrollCalendarShow.add(flxItem);
    }
  },

  handleCalendarItemClick: function(selectedIndex, auctionDates) {
    for (var i = 0; i < this.calendar.length; i++) {
      var itemFlex = this.view["flxItem" + i];
      if (!itemFlex) continue;

      if (i === selectedIndex) {
        var selectedDate = new Date();
        selectedDate.setDate(new Date().getDate() + i);
        var yyyy = selectedDate.getFullYear();
        var mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        var dd = String(selectedDate.getDate()).padStart(2, '0');
        var fullDate = `${yyyy}-${mm}-${dd}`;
        this.selectedCalDate = fullDate;

        var formattedLabel = this.formatSelectedDateLabel(fullDate);
        
        var parts = formattedLabel.split(",");

if (parts && parts.length === 2) {
   formattedLabel = parts[1].trim() + ", " + parts[0].trim();
  

}
        
        this.view.lblDayAndDate.text = formattedLabel;

        var count = this.getCountForDate(fullDate);
        this.view.lblNoOfFleets.text = parseInt(count, 10).toString();

        var hasAuction = auctionDates[i] && auctionDates[i].hasAuction === true;

        if (hasAuction) {
          itemFlex.skin = "sknFlxeae9e9";
          this.pageSize = 10;
          this.currentOffset = 0;
          this.view.segCurrentAuctionList.setData([]);
          this.invokeOnlineAuctionList();
          this.present = true;
        } else {
          itemFlex.skin = "slFbox";
          this.view.segCurrentAuctionList.setData([]);
          this.present = false;
        }
      } else {
        itemFlex.skin = "slFbox";
      }
    }

    if (!this.present) {
//       alert("No Auctions on this day");
      this.view.lblNorecords.setVisibility(true);
    }
    else {
    this.view.lblNorecords.setVisibility(false);
  }
  },

  getCountForDate: function(dateStr) {
    var totalCount = 0;
    if (!this.auctionDates || !Array.isArray(this.auctionDates)) return totalCount;

    this.auctionDates.forEach(function(rec) {
      if (rec.auction_date && rec.auction_date.trim() === dateStr) {
        totalCount += parseInt(rec.count || "0");
      }
    });

    return totalCount;
  },

  formatSelectedDateLabel: function(dateStr) {
    var date = new Date(dateStr);
    var options = { month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  },

//   enableAutoBidFromBid: function() {
//     var isLogin = voltmx.store.getItem("isLogin");
//     if (isLogin) {
//       this.view.flxBidAmountSelectionContainer.setVisibility(false);
//       this.view.tbxAutoBidAmount.text = "";
//       this.view.flxOverLay.setVisibility(true);
//       this.view.flxAutoBidAmountContainer.setVisibility(true);
//     } else {
//       var x = new voltmx.mvc.Navigation("frmLoginScreen");
//       x.navigate();
//     }
//   },
  
  adjustRTLLayout: function()
  {
    this.view.lblAuctionCalendar.text = voltmx.i18n.getLocalizedString("Auction Calendar");
        this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
     this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.btnCloseBidSuccessPopUp.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Congratulations");
    this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops");
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
     this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
     this.view.tc.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
//     this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
//         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxUnderLineContainer.reverseLayoutDirection = isArabic;
    if(isArabic){
      this.view.lblAuctionCalendar.left = "";
      this.view.lblAuctionCalendar.right = "10dp";
      
      this.view.flxUL1.left = "";
      this.view.flxUL1.right = "10dp";
      
      this.view.flxUL2.left = "";
      this.view.flxUL2.right = "3dp";
    }
    else{
      this.view.lblAuctionCalendar.left = "10dp";
      this.view.lblAuctionCalendar.right = "";
      
      this.view.flxUL1.left = "10dp";
      this.view.flxUL1.right = "";
      
      this.view.flxUL2.left = "3dp";
      this.view.flxUL2.right = "";
    }
  },

  navTofrmDetails: function() {
    var selectedItem = this.view.segCurrentAuctionList.selectedRowItems[0];
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    var navigationData = {
      aucid: selectedItem.aucid,
      objid: selectedItem.objid
    };
    var nav = new voltmx.mvc.Navigation("frmDetails");
    nav.navigate(navigationData);
  }
});
