define({
  selectedFilters: {},

  onNavigate: function()
  {

    this.adjustRTLLayout();
    this.userid = voltmx.store.getItem("userId");
    this.showCurrentAuctions();

    this.mode = voltmx.store.getItem("mode");
    this.view.preShow = this.onPreshow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.flxSort.onClick = function(){
      this.view.flxOverLay.setVisibility(true);
      this.view.flxPopUpSort.setVisibility(true);
    }.bind(this);
    this.view.onHide = function() {
      voltmx.timer.cancel("searchPlaceholderTimer");
      //       this.stopLivePriceRefresh();
      try {   
        voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");   
        voltmx.print("AuctionPriceAutoRefreshfrmAllActions cancelled successfully"); 
      }
      catch (e) 
      {  
        voltmx.print("AuctionPriceAutoRefreshfrmAllActions already stopped or not found"); 
      }

      try { voltmx.timer.cancel("StartLiveTimerInitAllAuc"); } catch(e){}

      try { voltmx.timer.cancel("StartLiveTimerInitOneSecAllAuc"); } catch(e){}

      try { voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsOneSec"); } catch(e){}

      try { voltmx.timer.cancel("updateCountDown1AllAuctions"); } catch(e){}

      try { voltmx.timer.cancel("updateCountDownAllAuctions"); } catch(e){}

      try { voltmx.timer.cancel("updateCountDownAllAuctionsAndroid"); } catch(e){}

      try { voltmx.timer.cancel("updateCountDown1AllAuctionsAndroid"); } catch(e){}
    };
    this.view.flxFilterSearch.onClick = () =>{
//       voltmx.store.setItem("isSilentFilter", false);
//       voltmx.store.setItem("filtersBackPage", "frmAllAuctionsList");
//       new voltmx.mvc.Navigation("frmFiltersNew").navigate();
    }
    this.view.btnClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
      this.view.flxWarning.setVisibility(false);
    };

    this.view.tbxAutoBidAmount.onTextChange = this.validateBidAmount.bind(this);

    this.view.btnBodyTypeApply.onClick = () => {
      voltmx.store.setItem("isSilentFilter", false);
      voltmx.store.setItem("filtersBackPage", "frmAllAuctionsList");
      new voltmx.mvc.Navigation("frmFilteredAuctions").navigate();
    };

    this.view.btnApplyVehicleCondition.onClick = () => {
      voltmx.store.setItem("isSilentFilter", false);
      voltmx.store.setItem("filtersBackPage", "frmAllAuctionsList");
      new voltmx.mvc.Navigation("frmFilteredAuctions").navigate();
    };
    //     this.view.onHide = () =>{
    //       voltmx.timer.cancel("auctionCountdownTimer");
    //     }

    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);

    this.view.flxUpcomingAuctionsHeading.onClick = this.showUpcomingAuctions.bind(this);
    this.view.flxCurrentAuctionHeading.onClick = this.showCurrentAuctions.bind(this);
    this.view.flxVehicleType.onClick = this.showVehicleTypeFilter.bind(this);
    this.view.flxBodyType.onClick = this.showBodyTypeFilter.bind(this);
    this.view.flxRemoveVehicleTypeFilter.onClick = this.hideVehicleTypeFilter.bind(this);
    this.view.flxRemoveBodyTypeFilter.onClick = this.hideBodyTypeFilter.bind(this);

    this.view.segCurrentAuctionList.onRowClick = this.navTofrmDetails.bind(this);

    this.view.flxRemoveVehicleConditionFilter.onClick = this.hideVehicleConditionFilter.bind(this);
    this.view.flxCondition.onClick = this.showVehicleConditionFilter.bind(this);


    this.view.flxError.btnTryAgain.onClick = this.refreshData.bind(this);
    if (this.view.flxServiceError) 
    {
      this.view.flxServiceError.btnTryAgain.onClick = () =>
      {
        new voltmx.mvc.Navigation("frmDashBoard").navigate();
      }
    }

    this.view.flxFilterBodyLeft.onClick = () =>{
      voltmx.store.setItem("isSilentFilter", false);
      voltmx.store.setItem("filtersBackPage", "frmAllAuctionsList");
      new voltmx.mvc.Navigation("frmFiltersNew").navigate();
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
    this.view.flxFilterBodyLeft.reverseLayoutDirection = isArabic;
    this.view.flxScrollFilterBody.reverseLayoutDirection = isArabic;
    this.view.flxSort.reverseLayoutDirection = isArabic;
    this.view.flxVehicleType.reverseLayoutDirection = isArabic;
    this.view.flxBodyType.reverseLayoutDirection = isArabic;
    this.view.flxCondition.reverseLayoutDirection = isArabic;
    this.view.flxVehicleConditionHeading.reverseLayoutDirection = isArabic;
    this.view.flxBodyTypeHeading.reverseLayoutDirection = isArabic;

    this.view.btnApplyVehicleCondition.text = voltmx.i18n.getLocalizedString("apply");
    this.view.btnBodyTypeApply.text = voltmx.i18n.getLocalizedString("apply");
    this.view.lblVehicleCondition.text = voltmx.i18n.getLocalizedString("Vehicle Condition");
    this.view.lblBodyTypeText.text = voltmx.i18n.getLocalizedString("Body Type");
    this.view.lblCurrentAuctions.text = voltmx.i18n.getLocalizedString("Current Auctions");
    this.view.lblUpcomingAuctions.text = voltmx.i18n.getLocalizedString("Upcoming Auctions");
    this.view.lblFilters.text = voltmx.i18n.getLocalizedString("Filters");
    this.view.lblSort.text = voltmx.i18n.getLocalizedString("sort");
    this.view.lblBodyType.text = voltmx.i18n.getLocalizedString("Body Type");
    this.view.lblCondition.text = voltmx.i18n.getLocalizedString("Condition");
    this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
    this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops");
    this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Congratulations");
    //     this.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Your Bid Has Been Placed Successfully");
    this.view.btnCloseBidSuccessPopUp.text = voltmx.i18n.getLocalizedString("closeCaps");

    this.view.tbxSearchByCategory.centerY = "50%";
    this.view.lblWarnMsg.text = voltmx.i18n.getLocalizedString("Bids in the last 5 minutes extend closing by  5 minutes");

    if(isArabic){

      this.view.lblCondition.left = "";
      this.view.lblCondition.right = "8dp";
      this.view.imgArrow2.left = "";
      this.view.imgArrow2.right = "5dp";

      this.view.lblBodyType.left = "";
      this.view.lblBodyType.right = "8dp";
      this.view.imgArrow1.left = "";
      this.view.imgArrow1.right = "5dp";

      this.view.lblVehicleType.left = "";
      this.view.lblVehicleType.right = "8dp";
      this.view.imgArrow.left = "";
      this.view.imgArrow.right = "5dp";

      this.view.lblSort.left = "";
      this.view.lblSort.right = "13dp";
      this.view.imgSortArrow.left = "";
      this.view.imgSortArrow.right = "5dp";

      this.view.flxFilterActionFlex.right = "";
      this.view.flxFilterActionFlex.left = "2%";

      this.view.imgSearch.left = "";
      this.view.imgSearch.right = "5%";

      this.view.tbxSearchByCategory.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      //       this.view.tbxSearchByCategory.padding = [0, 3, 0, 0];
      this.view.flxSort.left = "";
      this.view.flxSort.right = "20dp";

      this.view.flxVehicleType.left = "";
      this.view.flxVehicleType.right = "10dp";

      this.view.flxBodyType.left = "";
      this.view.flxBodyType.right = "10dp";

      this.view.flxCondition.left = "25dp";
      this.view.flxCondition.right = "10dp";
      
      this.view.tbxSearchByCategory.right = "5%";
      this.view.tbxSearchByCategory.left = "";
      
      this.view.flxFilterActionFlex.right = "";
      this.view.flxFilterActionFlex.left = "3%";
    }
    else{
      this.view.lblCondition.left = "8dp";
      this.view.lblCondition.right = "";
      this.view.imgArrow2.left = "5dp";
      this.view.imgArrow2.right = "";

      this.view.lblBodyType.left = "8dp";
      this.view.lblBodyType.right = "";
      this.view.imgArrow1.left = "5dp";
      this.view.imgArrow1.right = "";

      this.view.lblVehicleType.left = "8dp";
      this.view.lblVehicleType.right = "";
      this.view.imgArrow.left = "5dp";
      this.view.imgArrow.right = "";

      this.view.lblSort.left = "13dp";
      this.view.lblSort.right = "";
      this.view.imgSortArrow.left = "5dp";
      this.view.imgSortArrow.right = "";

      this.view.flxFilterActionFlex.right = "2%";
      this.view.flxFilterActionFlex.left = "";

      this.view.imgSearch.left = "5%";
      this.view.imgSearch.right = "";

      this.view.tbxSearchByCategory.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      //       this.view.tbxSearchByCategory.padding = [0, 0, 0, 3];
      this.view.flxSort.left = "20dp";
      this.view.flxSort.right = "";

      this.view.flxVehicleType.left = "10dp";
      this.view.flxVehicleType.right = "";

      this.view.flxBodyType.left = "10dp";
      this.view.flxBodyType.right = "";

      this.view.flxCondition.left = "10dp";
      this.view.flxCondition.right = "25dp";

      this.view.tbxSearchByCategory.right = "";
      this.view.tbxSearchByCategory.left = "5%";
      
      this.view.flxFilterActionFlex.right = "3%";
      this.view.flxFilterActionFlex.left = "";
    }


    //from openBid
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
    this.view.lblTermsAck.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.tbxBidAmount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
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
  },

  onPreshow: function(){
    //    this.setDataToSeg();
    var self = this;

    this.pageSize = 10;
    this.page = 1;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    //      loginToDam();
    if(this.view.lblNorecords)
    {
      this.view.lblNorecords.setVisibility(false);
    }
    //     this.view.btnLoadMore.setVisibility(true);


    if(this.view.flxOverLay){
      this.view.flxOverLay.onClick = () =>{
        if(this.view.flxPopUpSort){
          this.view.flxPopUpSort.setVisibility(false);
        }
      }
    }
    this.view.tc.setVisibility(false);
    if(this.view.flxOverLay){
      this.view.flxOverLay.setVisibility(false);
    }

    if(this.view.flxBodyTypeFilter){
      this.view.flxBodyTypeFilter.setVisibility(false);
    }

    if(this.view.flxVehicleConditionFilter){
      this.view.flxVehicleConditionFilter.setVisibility(false);
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
    if(this.view.flxIncreaseLimit.btnIncDeposit)
    {
      this.view.flxIncreaseLimit.btnIncDeposit.onClick = () =>{
        voltmx.store.setItem("lastFormIdPay", voltmx.application.getCurrentForm().id);
        new voltmx.mvc.Navigation("frmPaymentType").navigate();

      }
    }
    
    if(this.view.flxFilterActionFlex)
      {
        this.view.flxFilterActionFlex.onClick = () =>{
          if(this.view.tbxSearchByCategory.text !== "" && this.view.tbxSearchByCategory.text !== null)
            {
              this.lotIdForSearch = this.view.tbxSearchByCategory.text;
              this.view.btnLoadMore.setVisibility(false);
              this.pageSize = 10;
              this.currentOffset = 0;
              this.view.segCurrentAuctionList.setData([]);
              this.invokeOnlineAuctionList();
            }
          else
            {
//         voltmx.store.setItem("isSilentFilter", true);
//       voltmx.store.setItem("filtersBackPage", "frmSealedAuctionsList");
//       new voltmx.mvc.Navigation("frmFiltersNew").navigate();
            }
        }
      }
    
    if(this.view.tbxSearchByCategory){
     this.view.tbxSearchByCategory.onTextChange = () =>
     {
       if(this.view.tbxSearchByCategory.text === "")
         {
           this.lotIdForSearch = "";
           this.pageSize = 10;
              this.currentOffset = 0;
              this.view.segCurrentAuctionList.setData([]);
              this.invokeOnlineAuctionList();
         }
     }
    }
    this.view.tbxSearchByCategory.text = "";
    this.lotIdForSearch = "";
    
    this.view.flxPopUpSort.setVisibility(false);
    this.toggleFooterIcons();

    this.insertIntoSegPopUp();
    this.invokeMasterFleetSpecValues();
    this.view.tbxBidAmount.setEnabled(false);
    self.currentIndex = 0;
    try {
      voltmx.timer.schedule(
        "searchPlaceholderTimer",
        self.updateSearchPlaceholder.bind(self),
        1,
        true
      );
    } catch (e) {
      voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
    }


    try {
      voltmx.timer.schedule(
        "StartLiveTimerInitAllAuc",
        function() {
          self.startLivePriceRefresh.call(self);
        },
        5,
        false
      );
    } catch (e) {
      voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
    }


    //new for one sec
    try {
      voltmx.timer.schedule(
        "StartLiveTimerInitOneSecAllAuc",
        function() {
          self.startLivePriceRefreshOneSec.call(self);
        },
        5,
        false
      );
    } catch (e) {
      voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
    }

    //#ifdef iphone
    try {
      voltmx.timer.schedule(
        "updateCountDownAllAuctionsAndroid",
        function() {
          self.updateCountDownAllAuctionsMethodAndroid.call(self);
        },
        2,
        false
      );
    } catch (e) {
      voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
    }
    //#endif

    //#ifdef android
    try {
      voltmx.timer.schedule(
        "updateCountDownAllAuctionsAndroid",
        function() {
          self.updateCountDownAllAuctionsMethodAndroid.call(self);
        },
        2,
        false
      );
    } catch (e) {
      voltmx.print("Error while scheduling searchPlaceholderTimer: " + e.message);
    }
    //#endif

    //       this.checkSession(function() {

    //         voltmx.print("Session is valid. Proceeding with data load.");
    // //        self.invokeOnlineAuctionList();

    //     });
    //    this.invokeOnlineAuctionList();
    this.closeBidAmountContainer();
    this.view.tbxSearchByCategory.setEnabled(true);

  },

  //   onHide: function() {
  //   this.stopLivePriceRefresh(); // important to stop timer when form hidden
  // },

  startLivePriceRefresh: function() {
    // Cancel any existing timer to avoid duplicates
    //   voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");
    try {   
      voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");   
      voltmx.print("AuctionPriceAutoRefreshfrmAllActions cancelled successfully"); 
    }
    catch (e) 
    {  
      voltmx.print("AuctionPriceAutoRefreshfrmAllActions already stopped or not found"); 
    }

    // Start periodic refresh
    voltmx.timer.schedule(
      "AuctionPriceAutoRefreshfrmAllActions",
      this.refreshAuctionPrices.bind(this),  // ✅ pass function reference, not call
      60,
      true
    );
  },

  //for one sec
  startLivePriceRefreshOneSec: function() {
    // Cancel any existing timer to avoid duplicates
    //   voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");
    try {   
      voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActionsOneSec");   
      voltmx.print("AuctionPriceAutoRefreshfrmAllActionsOneSec cancelled successfully"); 
    }
    catch (e) 
    {  
      voltmx.print("AuctionPriceAutoRefreshfrmAllActionsOneSec already stopped or not found"); 
    }

    // Start periodic refresh
    voltmx.timer.schedule(
      "AuctionPriceAutoRefreshfrmAllActionsOneSec",
      this.refreshAuctionPricesOneSec.bind(this),  // ✅ pass function reference, not call
      1,
      true
    );
  },

  updateCountDownAllAuctionsMethod: function()
  {

    try {   
      voltmx.timer.cancel("updateCountDown1AllAuctions");   
      voltmx.print("updateCountDown1AllAuctions cancelled successfully"); 
    }
    catch (e) 
    {  
      voltmx.print("updateCountDown1AllAuctions already stopped or not found"); 
    }

    // Start periodic refresh
    voltmx.timer.schedule(
      "updateCountDown1AllAuctions",
      this.refreshCountDown.bind(this),  // ✅ pass function reference, not call
      1,
      true
    );

  },

  updateCountDownAllAuctionsMethodAndroid: function()
  {
    var self = this;
    try {   
      voltmx.timer.cancel("updateCountDown1AllAuctionsAndroid");   
      voltmx.print("updateCountDown1AllAuctionsAndroid cancelled successfully"); 
    }
    catch (e) 
    {  
      voltmx.print("updateCountDown1AllAuctionsAndroid already stopped or not found"); 
    }

    // Start periodic refresh
    voltmx.timer.schedule(
      "updateCountDown1AllAuctionsAndroid",
      this.refreshCountDownAndroid.bind(this),  // ✅ pass function reference, not call
      1,
      true
    );

  },

  //   refreshCountDownAndroid: function()
  //   {
  //         var self = this;

  //     try {
  //         var seg = self.view.segCurrentAuctionList;
  //         var segData = seg.data;
  //         if (!segData || segData.length === 0) return;

  //         var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  //         for (var i = 0; i < segData.length; i++) {

  //             var row = segData[i];
  //             var rawUTC = row.bidCloseTime;

  //             var userTime = convertUTCtoUserTime(rawUTC);
  // //             var newTimeText = getTimeRemainingStringWithSec(userTime);

  //           if (!userTime) continue;

  // // Get current device time
  // var now = new Date();

  // // Difference in milliseconds
  // var diffMs = userTime - now;

  // // Convert to minutes
  // var diffMin = diffMs / (1000 * 60);


  // if (diffMin < 101800) {

  //     var newTimeText = getTimeRemainingStringWithSec(userTime);

  //     var updatedRow = Object.assign({}, row, {
  //         lblTimerCount: {
  //             text: newTimeText,
  //             right: isArabic ? "4%" : "",
  //             left: isArabic ? "" : "4%",
  //             contentAlignment: isArabic
  //                 ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //                 : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //         }
  //     });

  //     seg.setDataAt(updatedRow, i);

  // }}


  //     } catch (err) {
  //         voltmx.print("refreshCountDown error: " + err);
  //     }

  //   },

  updateCountDownAllAuctionsMethodAndroid: function() {
    try {   
      voltmx.timer.cancel("updateCountDown1AllAuctionsAndroid");   
      voltmx.print("updateCountDown1AllAuctionsAndroid cancelled successfully"); 
    } catch (e) {  
      voltmx.print("updateCountDown1AllAuctionsAndroid already stopped or not found"); 
    }

    // Start periodic refresh
    voltmx.timer.schedule(
      "updateCountDown1AllAuctionsAndroid",
      this.refreshCountDownAndroid.bind(this),
      1,
      true
    );
  },


  refreshCountDownAndroid: function() {
    try {
      var seg = this.view.segCurrentAuctionList;
      var segData = seg.data;

      if (!segData || segData.length === 0) return;

      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

      // -------------------------------
      //  Get visible row indices
      // -------------------------------
      var firstVisible = seg.getFirstVisibleRow();
      var lastVisible = seg.getLastVisibleRow();

      if (!firstVisible || !lastVisible) return;

      var startIndex = firstVisible.rowIndex;
      var endIndex = lastVisible.rowIndex;

      // Safety: ensure bounds
      if (startIndex < 0) startIndex = 0;
      if (endIndex >= segData.length) endIndex = segData.length - 1;

      // ---------------------------------------
      // Update ONLY visible rows
      // ---------------------------------------
      for (var i = startIndex; i <= endIndex; i++) {

        var row = segData[i];
        var rawUTC = row.bidCloseTime;

        var userTime = convertUTCtoUserTime(rawUTC);
        if (!userTime) continue;

        var now = new Date();
        var diffMin = (userTime - now) / (1000 * 60);

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

          seg.setDataAt(updatedRow, i);  
        }
      }

    } catch (err) {
      voltmx.print("refreshCountDown error: " + err);
    }
  },

  /**
 * Fetch latest price data periodically
 */
  refreshAuctionPrices: function() {
    try {
      var self = this;

      // If form or segment is not visible, skip refresh
      if (!self.view || !self.view.segCurrentAuctionList.isVisible) return;

      var inputParams = {
        serviceID: "fry_int_auctions$get-buyer-all-auctions",
        body_type: "",
        transmission_type: "",
        fuel_type: "",
        body_condition: "",
        brand: "",
        model: "",
        mileage_range_from: "",
        mileage_range_to: "",
        asset_id: "",
        user_id: self.userid || "",
        year_range_from: 0,
        year_range_to: 0,
        auction_type: "1;2;3",
        yard_branch: 0,
        price_range_from: 0,
        price_range_to: 0,
        priceSort: (voltmx.store.getItem("priceSort") || "").toString(),
        milageSort: 0,
        yearSort: (voltmx.store.getItem("newlyListing") || "").toString(),
        page: 1,
        lot_no: "",
        bid_close_date: "",
        pageSize: 100,
        upcoming_auctions: self.upcoming,

        language: voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en"
      };

      mfintegrationsecureinvokerasync(
        inputParams,
        "fry_int_auctions",
        "get-buyer-all-auctions",
        function(status, response) {
          if (response && response.opstatus === 0 && Array.isArray(response.records)) {
            self.updateAuctionPrices.call(self, response.records);
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

        var timercount = latest.time_remaining;
        var userTargetTime = convertUTCtoUserTime(timercount);
        var bidclosetime = getTimeRemainingString(userTargetTime);
        var updatedRow = Object.assign({}, row); 
        if (currentDisplayedPrice !== newPrice) {
          // Update only price label + maybe bidder highlight
          var newSkin =
              latest.highest_bidder === self.userid
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

  refreshCountDown: function () {
    var self = this;

    try {
      var seg = self.view.segCurrentAuctionList;
      var segData = seg.data;
      if (!segData || segData.length === 0) return;

      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

      for (var i = 0; i < segData.length; i++) {

        var row = segData[i];
        var rawUTC = row.bidCloseTime;

        var userTime = convertUTCtoUserTime(rawUTC);
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

    } catch (err) {
      voltmx.print("refreshCountDown error: " + err);
    }
  },


  //   refreshCountDown: function () {
  //     var self = this;

  //     try {
  //         var seg = self.view.segCurrentAuctionList;
  //         var segData = seg.data;

  //         if (!segData || segData.length === 0) return;

  //         var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  //         // Get visible rows
  //         var first = seg.getFirstVisibleRow();
  //         var last = seg.getLastVisibleRow();

  //         if (!first || !last) return;

  //         var start = first.rowIndex;
  //         var end = last.rowIndex;

  //         for (var i = start; i <= end; i++) {

  //             // Get row widget (native object)
  //             var rowWidget = seg.getrowbyIndex(i);
  //             if (!rowWidget) continue;

  //             // Access segData using rowWidget.rowIndex
  //             var rowData = segData[rowWidget.rowIndex];
  //             if (!rowData) continue;

  //             // Extract time fields
  //             var rawUTC = rowData.bidCloseTime;
  //             var userTime = convertUTCtoUserTime(rawUTC);
  //             var newTimeText = getTimeRemainingStringWithSec(userTime);

  //             // Access label using segData pattern
  //             var lbl = rowData.lblTimerCount;
  //             if (!lbl) continue;

  //             // Update label text
  //             lbl.text = newTimeText;

  //             // Update alignment based on language
  //             if (isArabic) {
  //                 lbl.right = "4%";
  //                 lbl.left = "";
  //                 lbl.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  //             } else {
  //                 lbl.left = "4%";
  //                 lbl.right = "";
  //                 lbl.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  //             }

  //             // Toggle skins (your skins)
  //             lbl.skin =
  //                 lbl.skin === "sknLblDubaid3243714px"
  //                     ? "sknLblDubai8e8e8e20pxBold"
  //                     : "sknLblDubaid3243714px";

  //           ////
  //                   var updatedRow = Object.assign({}, rowData, {
  //                 lblTimerCount: {
  //                     text: newTimeText,
  //                     skin:
  //                         rowData.lblTimerCount.skin === "sknLblDubaid3243714px"
  //                             ? "sknLblDubai8e8e8e20pxBold"
  //                             : "sknLblDubaid3243714px",
  //                     right: isArabic ? "4%" : "",
  //                     left: isArabic ? "" : "4%",
  //                     contentAlignment: isArabic
  //                         ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //                         : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //                 }
  //             });

  //             // Update only this row
  //             seg.setDataAt(updatedRow, i);
  // ////
  // //       seg.setData(segData);
  //         }

  //     } catch (err) {
  //         voltmx.print("refreshCountDown error: " + err);
  //     }
  // },

  refreshData: function() {
    this.pageSize = 10;
    this.page = 1;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    this.invokeOnlineAuctionList();
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

  invokeMasterFleetSpecValues: function () {
    var self = this;

    function invCallBack(status, response) {
      voltmx.print("Master fleet spec response: " + JSON.stringify(response));
      self.masterDataResult = response;
    }

    let params = {
      serviceID: "fry_int_fleet$master-fleet-spec-values",
      spec_list: "body_type;body_condition",
      widget_name: "fleet_specs_details",
      asset_definitions: "true",
      auction_types: "true",
      httpheaders: {},
      httpconfig: {}
    };

    mfintegrationsecureinvokerasync(params, "fry_int_fleet", "master-fleet-spec-values", invCallBack);
  },

  updateSearchPlaceholder: function () {
    var self = this;

    // Initialize index if undefined
    if (typeof self.currentIndex !== "number") {
      self.currentIndex = 0;
    }

    var baseText = voltmx.i18n.getLocalizedString("Search by");
    var searchKeywords = ["Lot Number"];

    // Safety check: ensure keywords array is valid and not empty
    if (!Array.isArray(searchKeywords) || searchKeywords.length === 0) {
      return;
    }

    // Safety check: ensure view and textbox exist
    if (self.view && self.view.tbxSearchByCategory) {
      var newPlaceholder = baseText +" "+ voltmx.i18n.getLocalizedString(searchKeywords[self.currentIndex]);
      self.view.tbxSearchByCategory.placeholder = newPlaceholder;

    }

    // Safely increment index and wrap around
    self.currentIndex = (self.currentIndex + 1) % searchKeywords.length;
  },

  onPostShow: function()
  {

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

      if(this.view.flxPopUpSort && this.view.flxPopUpSort.isVisible){
        this.view.flxPopUpSort.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }

    };

    //set sort to default
    voltmx.store.setItem("priceSort", 0);
    voltmx.store.removeItem("newlyListing");

    if(this.view.SmthngWentWrong){
      this.view.SmthngWentWrong.setVisibility(false);
    }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }

    this.view.flxWarningClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
      this.view.flxWarning.setVisibility(false);
    };

    if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    //     this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {
    //       voltmx.print(source);

    //     if (Number(y) > 36 && Number(y) < 62) {
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
          //       this.view.tc.setVisibility(true);

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
    this.view.Footer2.flxHL2.setVisibility(true);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);

    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooteractive.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubaid3243714pxBold";

    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";

    var mode = voltmx.store.getItem("mode");
    if(mode === "seller"){
      this.view.Footer2.imgMyBids.src = "mylistings.png";
      //     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      //     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
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
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var data = [
      {
        "lbl01": {
          "left": isArabic ? "" : "10%",
          "right": isArabic ? "10%" : "",
          "text": voltmx.i18n.getLocalizedString("endingSoonestDefault"),
          "skin": "sknlbl231F20Dubai20px45"
        },
        "flxcheckedButton": {
          "left": isArabic ? "" : "85%",
          "right": isArabic ? "85%" : "",
        },
        "imgcheckedbutton": {
          "src": "radio_popup_on.png",
          "isVisible": true
        },
        "key": {
          "text": "endingSoon"
        }
      },
      {
        "lbl01": {
          "left": isArabic ? "" : "10%",
          "right": isArabic ? "10%" : "",
          "text": voltmx.i18n.getLocalizedString("newestListings"),
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "flxcheckedButton": {
          "left": isArabic ? "" : "85%",
          "right": isArabic ? "85%" : "",
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        },
        "key": {
          "text": "newlyListings"
        }
      },
      {
        "lbl01": {
          "left": isArabic ? "" : "10%",
          "right": isArabic ? "10%" : "",
          "text": voltmx.i18n.getLocalizedString("lowestPriceFirst"),
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "flxcheckedButton": {
          "left": isArabic ? "" : "85%",
          "right": isArabic ? "85%" : "",
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        },
        "key": {
          "text": "lowestPriceFirst"
        }
      },
      {
        "lbl01": {
          "left": isArabic ? "" : "10%",
          "right": isArabic ? "10%" : "",
          "text": voltmx.i18n.getLocalizedString("highestPriceFirst"),
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "flxcheckedButton": {
          "left": isArabic ? "" : "85%",
          "right": isArabic ? "85%" : "",
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        },
        "key": {
          "text": "highestPriceFirst"
        }
      },
      {
        "lbl01": {
          "left": isArabic ? "" : "10%",
          "right": isArabic ? "10%" : "",
          "text": voltmx.i18n.getLocalizedString("mostBidsReceived"),
          "skin": "sknlbl231F20DubaiBold20px45"
        },
        "flxcheckedButton": {
          "left": isArabic ? "" : "85%",
          "right": isArabic ? "85%" : "",
        },
        "imgcheckedbutton": {
          "src": "radio_popup_off.png",
          "isVisible": false
        },
        "key": {
          "text": "mostBidsReceived"
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
    var key = data[selectedIndex].key.text;
    //     alert(key);
    switch(key){
      case "endingSoon": {
        voltmx.store.setItem("priceSort", 0);
        voltmx.store.removeItem("newlyListing");
        this.applySortFilterAndCall();
        break;
      }
      case "newlyListings": {
        voltmx.store.setItem("priceSort", 0);
        voltmx.store.setItem("newlyListing",3);
        this.applySortFilterAndCall();
        break;
      }
      case "lowestPriceFirst": {
        voltmx.store.setItem("priceSort", 1);
        voltmx.store.removeItem("newlyListing");
        this.applySortFilterAndCall();
        break;
      }
      case "highestPriceFirst": {
        voltmx.store.setItem("priceSort", 2);
        voltmx.store.removeItem("newlyListing");
        this.applySortFilterAndCall();
        break;
      }
      case "mostBidsReceived": {
        voltmx.store.setItem("priceSort", 3);
        voltmx.store.removeItem("newlyListing");
        this.applySortFilterAndCall();
        break;
      }
      case "nearestLocation": {

        break;
      }
      default: voltmx.print("no row matches");
    }
    //     if(selec)
    //     alert("Selected: " + selectedText);
    this.view.flxPopUpSort.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },

  applySortFilterAndCall: function(){
    this.view.btnLoadMore.setVisibility(false);
    this.pageSize = 10;
    this.page = 1;
    this.currentOffset = 0;
    this.view.segCurrentAuctionList.setData([]);
    this.invokeOnlineAuctionList();


  },

  onLoadMoreClick: function() {
    this.pageSize += 10;
    this.page += 1;
    this.invokeOnlineAuctionList(); // Will bring all up to new pageSize
  },

  invokeOnlineAuctionList: function(){

    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    //     function invServiceCallBack(status, online_auction_list) {
    //       if (!online_auction_list || !online_auction_list.records) {
    //         voltmx.print("Error: Response is null or missing auction_list");
    //         return;
    //       }
    //       var records = online_auction_list.records;
    //       self.setDataToSegFromService(records);
    //     }

    function invServiceCallBack(status, online_auction_list) {
      voltmx.application.dismissLoadingScreen();
      //     self.activeAuctionIds = "";
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
          //             self.activeAuctionIds = records
          //             .filter(record => record.is_user_bid === "true")
          //             .map(record => record.auction_id)
          //             .join(";");
          let newActiveIds = records
          .filter(r => r.is_user_bid === "true")
          .map(r => r.auction_id);

          if (!self.activeAuctionIds) self.activeAuctionIds = "";
          let existingIds = self.activeAuctionIds.split(";").filter(Boolean);
          let mergedIds = [...new Set([...existingIds, ...newActiveIds])];
          self.activeAuctionIds = mergedIds.join(";");
          self.setDataToSegFromService(records);
          self.view.lblNorecords.setVisibility(false);
          //             self.view.flxAuctionsSegmentBody.height = "85%";
        } else {
          self.view.lblNorecords.setVisibility(true);
          self.view.btnLoadMore.setVisibility(false);
          //            self.view.flxAuctionsSegmentBody.height = "96%";
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
    online_auction_list_inputparam["brand"] = "";
    online_auction_list_inputparam["model"] = "";
    online_auction_list_inputparam["mileage_range_from"] = "";
    online_auction_list_inputparam["mileage_range_to"] = "";
    online_auction_list_inputparam["asset_id"] = "";
    //      online_auction_list_inputparam["lot_no"] = 0
    online_auction_list_inputparam["user_id"] = this.userid ? this.userid : "";
    online_auction_list_inputparam["year_range_from"] = 0;
    online_auction_list_inputparam["year_range_to"] = 0;
    online_auction_list_inputparam["auction_type"] = "1;2;3";
    online_auction_list_inputparam["yard_branch"] = 0;
    //      online_auction_list_inputparam["lot_no"] = 0;
    online_auction_list_inputparam["price_range_from"] = 0;
    online_auction_list_inputparam["price_range_to"] = 0;
    //     online_auction_list_inputparam["priceSort"] = voltmx.store.getItem("priceSort") || "";
    let storedPriceSort = voltmx.store.getItem("priceSort");
    online_auction_list_inputparam["priceSort"] = 
      (storedPriceSort !== null && storedPriceSort !== undefined) ? String(storedPriceSort) : "";

    online_auction_list_inputparam["milageSort"] = 0;

    let storedNewlyListing = voltmx.store.getItem("newlyListing");
    online_auction_list_inputparam["yearSort"] = 
      (storedNewlyListing !== null && storedNewlyListing !== undefined) ? String(storedNewlyListing) : "";
    online_auction_list_inputparam["page"] = self.page || 1;
    online_auction_list_inputparam["lot_no"] = this.lotIdForSearch ? Number(this.lotIdForSearch) : "";
    online_auction_list_inputparam["bid_close_date"] = "";
    online_auction_list_inputparam["pageSize"] = 10;
    online_auction_list_inputparam["upcoming_auctions"] = self.upcoming;
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
      "lblBidAmount":"lblBidAmount"
    }

    self.loadNextRecords(records); 

  },


  //commented 2 for smooth load
  loadNextRecords: function (records) {
    var self = this;
    voltmx.application.dismissLoadingScreen();

    // 🔹 Handle no records at all
    if (!records || records.length === 0) {
      self.view.lblNorecords.setVisibility(true);
      self.view.btnLoadMore.setVisibility(false);
      return;
    }



    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
    var data = [];


    records.forEach(function (item) {
      var imageUrl = item.thumbnail_url;
      var carimage = (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png";
      var imagePlaceholder = "loading.gif";
      var carname = item.title && item.title.trim() !== "" ? item.title : "N/A";
      var timercount = item.time_remaining;
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
      var bidrateSkin = (item.highest_bidder === self.userid)
      ? "sknLblDubai02905120pxBold"
      : "sknLblDubaid3243720pxbold";
      var favFlexSkin = (item.is_favourite === "true")
      ? "sknFlxd32437custom120pxround"
      : "sknFlx231f20custom120pxround";
      var imgheartset = (item.is_favourite === "true")
      ? "heartlikerecommended.png"
      : "imgdislikenew.png";
      var autobidimg = (item.is_auto_bid === "true")
      ? "autobidblue.png"
      : "autobidnewone.png";

      //         data.push({
      //             "flxCurrentAuctions": { "reverseLayoutDirection": isArabic },
      //             "imgCarPIcture": { "src": carimage, "imageWhileDownloading": imagePlaceholder },
      //             "lblCarname": { "text": carname },
      //             "lblObjID": objid,
      //             "lblTimerCount": { "text": bidclosetime },
      //             "bidCloseTime": timercount,
      //             "lblLot": { "text": voltmx.i18n.getLocalizedString("Lot #") },
      //             "lblLotNum": { "text": lotnum },
      //             "lblYear": { "text": voltmx.i18n.getLocalizedString("year") },
      //             "lblYearVal": { "text": year },
      //             "lblTotalBids": { "text": voltmx.i18n.getLocalizedString("Location") },
      //             "lblTotalBidsCount": { "text": totalbids },
      //             "lblLocation": { "text": voltmx.i18n.getLocalizedString("Mileage") },
      //             "lblLocationName": { "text": location },
      //             "lblAuctionID": aucid,
      //                       "objid": objid,
      //       "aucid":aucid,
      //           "highestbidder": highestbidder,
      //             "flxLikeHeart": {
      //                 "skin": favFlexSkin,
      //                 "onClick": self.addActiveToWishList.bind(self, objid, aucid)
      //             },
      //             "imgHeart": imgheartset,
      //             "lblBidAmount": { "text": voltmx.i18n.getLocalizedString("current bid") },
      //             "lblPrice": { "text": "AED " + price, "skin": bidrateSkin },
      //             "flxAutoBid": {
      //                 "isVisible": false,
      //                 "onClick": self.enableAutoBid.bind(self, objid, aucid)
      //             },
      //             "imgAutoBidicon": autobidimg,
      //             "lblAutoBid": "AUTO BID",
      //             "btnBidNow": {
      //                 "onClick": function (widget, context) {
      //                     var rowIndex = context.rowIndex;
      //                     var rowData = self.view.segCurrentAuctionList.data[rowIndex];
      //                     if (!rowData) return;
      //                     var latestPrice = Number(rowData.lblPrice.text.replace("AED ", "").trim());
      //                     var latestHighestBidder = rowData.highestbidder || "";
      //                     self.openBidAmountContainer(rowData.lblObjID, rowData.lblAuctionID, latestPrice, latestHighestBidder,rowData.lblLotNum.text);
      //                 },
      //                 "text": voltmx.i18n.getLocalizedString("BID NOW")
      //             }
      //         });

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
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblObjID": objid,
        "objid": objid,
        "aucid": aucid,
        "lblTimerCount": { 
          "text": bidclosetime,
          "right": isArabic ? "4%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "bidCloseTime": timercount,

        "lblLot": { 
          "text": voltmx.i18n.getLocalizedString("Lot #"),
          "right": isArabic ? "8%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblLotNum": { 
          "text": lotnum,
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "" : "8%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_LEFT 
          : constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },

        "lblYear": { 
          "text": voltmx.i18n.getLocalizedString("year"),
          "right": isArabic ? "8%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblYearVal": { 
          "text": year,
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "" : "8%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_LEFT 
          : constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },

        "lblTotalBids": { 
          "text": voltmx.i18n.getLocalizedString("Location"),
          "right": isArabic ? "8%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblTotalBidsCount": { 
          "text": totalbids,
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "" : "8%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_LEFT 
          : constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },

        "lblLocation": { 
          "text": voltmx.i18n.getLocalizedString("Mileage"),
          "right": isArabic ? "8%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblLocationName": { 
          "text": location,
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "" : "8%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_LEFT 
          : constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },

        "lblAuctionID": aucid,
        "highestbidder": highestbidder,
        "flxLikeHeart": { 
          "skin": favFlexSkin,
          "onClick": self.addActiveToWishList.bind(self, objid, aucid)
        },
        "imgHeart": imgheartset,

        "lblBidAmount": { 
          "text": voltmx.i18n.getLocalizedString("current bid"),
          "right": isArabic ? "8%" : "",
          "left": isArabic ? "" : "4%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
          : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblPrice": { 
          "text": "AED " + price,
          "skin": bidrateSkin,
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "" : "8%",
          "contentAlignment": isArabic 
          ? constants.CONTENT_ALIGN_MIDDLE_LEFT 
          : constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },

        "flxAutoBid": { 
          "isVisible": false,
          "onClick": self.enableAutoBid.bind(self, objid, aucid)
        },
        "imgAutoBidicon": autobidimg,
        "lblAutoBid": "AUTO BID",

        "btnBidNow": {
          "onClick": function(widget, context) {
            var rowIndex = context.rowIndex;
            var rowData = self.view.segCurrentAuctionList.data[rowIndex];
            if (!rowData) return;
            var latestPrice = Number(rowData.lblPrice.text.replace("AED ", "").trim());
            var latestHighestBidder = rowData.highestbidder || "";
            self.openBidAmountContainer(
              rowData.lblObjID,
              rowData.lblAuctionID,
              latestPrice,
              latestHighestBidder,
              rowData.lblLotNum.text || ""
            );
          },
          "text": voltmx.i18n.getLocalizedString("BID NOW")
        }
      });

    });


    self.view.segCurrentAuctionList.addAll(data);


    self.view.lblNorecords.setVisibility(false);
    self.view.btnLoadMore.setVisibility(records.length >=  10);

    if(self.view.btnLoadMore.isVisible)

    {

      self.view.flxAuctionsSegmentBody.height = "85%";

    }

    else

    {

      self.view.flxAuctionsSegmentBody.height = "96%";

    }


    voltmx.print(" Added " + records.length + " records, page=" + self.page);
  },


  //commented 1 which is good using one
  //   loadNextRecords: function(records) {
  //   var self = this;
  //   var data = [];
  //      var newRecords = records.slice(self.currentOffset); // Only new ones
  //       var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  //    var damAvailable = voltmx.store.getItem("isDamAvailable");
  //   for (var i = 0; i < newRecords.length; i++) {
  //     var item = newRecords[i];
  //     var imageUrl = item.thumbnail_url;


  //     var carimage = (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png";
  //     var imagePlaceholder = "loading.gif";

  //     var carname = item.title && item.title.trim() !== "" ? item.title : "N/A";
  // //     var carname = (item.category_name && item.sub_category_name)
  // //   ? item.category_name + " " + item.sub_category_name
  // //   : "N/A";
  //     var timercount = item.time_remaining;
  // //     var timercountInsert = this.getCountDown("2025-06-20 23:59:59.0");
  //     var userTargetTime = convertUTCtoUserTime(timercount);
  //     var bidclosetime = getTimeRemainingString(userTargetTime);
  //     var lotnum = item.ID || "N/A";
  //     var totalbids = item.location || "N/A";
  //     var location = item.milage || "N/A";
  //     var objid = item.object_id;
  //     var aucid = item.auction_id;
  //     var year = item.year || "N/A";
  //     var price = Number(item.max_bid_amount).toLocaleString("en-AE");
  //     var highestbidder = item.highest_bidder;
  //     var bidrateSkin = (item.highest_bidder === this.userid) ? "sknLblDubai02905120pxBold" : "sknLblDubaid3243720pxbold";
  //     var favFlexSkin = (item.is_favourite === "true") ? "sknFlxd32437custom120pxround" : "sknFlx231f20custom120pxround";
  //     var imgheartset = (item.is_favourite === "true") ? "heartlikerecommended.png" : "imgdislikenew.png";
  //     var autobidimg = (item.is_auto_bid && item.is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";
  //     data.push({
  //         "flxCurrentAuctions": {
  //   "reverseLayoutDirection": isArabic
  // },
  //       "imgCarPIcture": {
  //   "src": carimage,
  //   "imageWhileDownloading": imagePlaceholder
  // },
  //       "lblCarname": {
  //         "text": carname,
  //         "right": isArabic ? "4%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //       "lblObjID": objid,
  //        "lblTimerCount": {
  //         "text": bidclosetime,
  //         "right": isArabic ? "4%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //       "bidCloseTime": timercount,
  //       "objid": objid,
  //       "aucid":aucid,
  // //       "lblLot": "Lot #",
  //        "lblLot": {
  //         "text": voltmx.i18n.getLocalizedString("Lot #"),
  //         "right": isArabic ? "8%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //        "lblLotNum": {
  //         "text": lotnum,
  //         "left": isArabic ? "4%" : "",
  //         "right": isArabic ? "" : "8%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //       },
  //        "lblYear": {
  //         "text": voltmx.i18n.getLocalizedString("year"),
  //         "right": isArabic ? "8%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //        "lblYearVal": {
  //         "text": year,
  //         "left": isArabic ? "4%" : "",
  //         "right": isArabic ? "" : "8%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //       },
  // //       "lblTotalBids": "Total Bids",
  //        "lblTotalBids": {
  //         "text": voltmx.i18n.getLocalizedString("Location"),
  //         "right": isArabic ? "8%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //        "lblTotalBidsCount": {
  //         "text": totalbids,
  //         "left": isArabic ? "4%" : "",
  //         "right": isArabic ? "" : "8%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //       },
  //        "lblLocation": {
  //         "text": voltmx.i18n.getLocalizedString("Mileage"),
  //         "right": isArabic ? "8%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  // //       "lblLocation": "Location",
  //        "lblLocationName": {
  //         "text": location,
  //         "left": isArabic ? "4%" : "",
  //         "right": isArabic ? "" : "8%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //       },
  //       "lblAuctionID": aucid,
  //       "flxLikeHeart": {
  //         "skin": favFlexSkin,
  //         "onClick": this.addActiveToWishList.bind(this,objid,aucid)
  //       },
  //       "imgHeart": imgheartset,
  //       "highestbidder": highestbidder, 
  //        "lblBidAmount": {
  //         "text": voltmx.i18n.getLocalizedString("current bid"),
  //         "right": isArabic ? "8%" : "",
  //         "left": isArabic ? "" : "4%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
  //       },
  //       "lblPrice": {
  //         "text": "AED " + price,
  //         "skin": bidrateSkin,
  //         "left": isArabic ? "4%" : "",
  //         "right": isArabic ? "" : "8%",
  //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
  //       },
  //       "flxAutoBid": {
  //         "isVisible": false,
  //         "onClick": this.enableAutoBid.bind(this, objid, aucid)
  //       },
  //       "imgAutoBidicon": autobidimg,
  //       "lblAutoBid": "AUTO BID",
  // //       "btnBidNow": {
  // //         "onClick": this.openBidAmountContainer.bind(this, objid, aucid, price, highestbidder),
  // //         "text": voltmx.i18n.getLocalizedString("BID NOW")
  // //       }
  //       "btnBidNow": {
  //    "onClick": function(widget, context) {
  //         var rowIndex = context.rowIndex;   // get the row index
  //         var rowData = self.view.segCurrentAuctionList.data[rowIndex]; // fetch row data from segment
  //         if (!rowData) return;

  //         var latestPrice = Number(rowData.lblPrice.text.replace("AED ", "").trim());
  //         var latestHighestBidder = rowData.highestbidder || "";

  //         self.openBidAmountContainer(rowData.objid, rowData.aucid, latestPrice, latestHighestBidder);
  //     },
  //     "text": voltmx.i18n.getLocalizedString("BID NOW")
  // }

  //     });

  //    }

  //   self.view.segCurrentAuctionList.addAll(data);

  // //     self.startAuctionCountdown();
  //      voltmx.application.dismissLoadingScreen();

  //      if (self.pageSize > records.length) {
  //     self.view.btnLoadMore.setVisibility(false);
  //   } else {
  //     self.view.btnLoadMore.setVisibility(true);
  //   }
  //       self.currentOffset += newRecords.length;



  // },


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
        //             if (highestbidder !== this.userid) {

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

        this.view.flxBidAmountSelectionContainer.setVisibility(true);
        this.view.imgCheck.setVisibility(false);
        this.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
        this.view.tbxBidAmount.text = "";
        this.view.flxOverLay.setVisibility(true);
        //             } else {
        // //                 alert("You're the highest bidder!");
        //               self.view.SmthngWentWrong.setVisibility(true);
        //               self.view.SmthngWentWrong.lblSomethingWentWrong.text = voltmx.i18n.getLocalizedString("You are the highest bidder");
        //             }
      } else {
        this.view.flxOverLay.setVisibility(true);
        this.view.flxWarning.setVisibility(true);
      }
    } else {
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
  },

  //   createChipSetRelated: function(bidAmounts) {
  //     var self = this;
  //     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  //     this.dynamicBidButtons = {};

  //     if (!bidAmounts || bidAmounts.length === 0) {
  //         voltmx.print(" No bid amounts provided.");
  //         return;
  //     }

  //     // 🔹 Temporarily hide container to avoid re-layout during add
  //     self.view.flxScrollBidAmount.setVisibility(false);

  //     // 🔹 Use local array to batch the buttons before adding
  //     var tempBtns = [];

  //     bidAmounts.forEach(function(amount, index) {
  //         var btnId = "btn" + amount + "AED";
  //         var btn = new voltmx.ui.Button({
  //             "centerY": "50%",
  //             "height": "100%",
  //             "id": btnId,
  //             "isVisible": true,
  //             "left": isArabic ? "" : (index === 0 ? "5%" : "2%"),
  //             "right": isArabic ? (index === 0 ? "5%" : "2%") : "",
  //             "skin": "sknBtnCCCCCCBorderDubai75778620px",
  //             "text": "+" + amount + " AED",
  //             "top": "0dp",
  //             "width": voltmx.flex.USE_PREFERRED_SIZE,
  //             "onClick": self.selectBidAmountAddIntoTextBox.bind(self, amount)
  //         }, {
  //             "contentAlignment": constants.CONTENT_ALIGN_CENTER,
  //             "displayText": true,
  //             "padding": [5, 0, 5, 0],
  //             "paddingInPixel": false
  //         }, {});

  //         self.dynamicBidButtons[amount] = btn;
  //         tempBtns.push(btn);
  //     });

  //     // 🔹 Add all buttons together (reduces layout thrash)
  //     tempBtns.forEach(function(btn) {
  //         self.view.flxScrollBidAmount.add(btn);
  //     });

  //     // 🔹 Show container again after all buttons added
  //     self.view.flxScrollBidAmount.setVisibility(true);

  //     // 🔹 Scroll after small delay to ensure layout complete
  //     voltmx.timer.schedule("scrollDelay", function() {
  //         if (isArabic && self.view.flxScrollBidAmount.scrollToEnd) {
  //             self.view.flxScrollBidAmount.scrollToEnd();
  //         } else if (!isArabic && self.view.flxScrollBidAmount.scrollToBeginning) {
  //             self.view.flxScrollBidAmount.scrollToBeginning();
  //         }
  //     }, 0.1, false);
  // },

  //commented for fast load
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
      //         if(this.mode !== "seller"){
      if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){

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
            //       alert("Favorite toggle failed: " + message);
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
          //             alert("clicked");
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
                self.updateActiveAuctionIdWhenBid();
                eventAuctionBid(self.aucid,self.objid);

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
          var usertoken = voltmx.store.getItem("getUserAccesstoken");
          auction_bidding_inputparam["serviceID"] = "fry_int_buyer$manual-auction-bidding";
          auction_bidding_inputparam["user_id"] = userid;
          auction_bidding_inputparam["vehicle_amount"] = self.currentAmount;
          auction_bidding_inputparam["bid_hike"] = Number(self.vehicleHike);
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

  updateActiveAuctionIdWhenBid: function () {
    var self = this;

    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

    var online_auction_list_inputparam = {
      serviceID: "fry_int_auctions$get-buyer-all-auctions",
      body_type: "",
      transmission_type: "",
      fuel_type: "",
      body_condition: "",
      brand: "",
      model: "",
      mileage_range_from: "",
      mileage_range_to: "",
      asset_id: "",
      lot_no: self.lotForUpdateActiveAuctionId,
      user_id: self.userid || "",
      year_range_from: 0,
      year_range_to: 0,
      auction_type: "1;2;3",
      yard_branch: 0,
      price_range_from: 0,
      price_range_to: 0,

      // handle stored filters (like sort options)
      priceSort:
      (voltmx.store.getItem("priceSort") !== null &&
       voltmx.store.getItem("priceSort") !== undefined)
      ? String(voltmx.store.getItem("priceSort"))
      : "",

      milageSort: 0,
      yearSort:
      (voltmx.store.getItem("newlyListing") !== null &&
       voltmx.store.getItem("newlyListing") !== undefined)
      ? String(voltmx.store.getItem("newlyListing"))
      : "",

      page:  1,
      pageSize:  1,
      bid_close_date: "",
      upcoming_auctions: self.upcoming || 0,
      language: currentLocale || "en",
      httpheaders: {},
      httpconfig: {}
    };

    function invServiceCallBack(status, online_auction_list) {
      if (
        online_auction_list &&
        online_auction_list.opstatus === 0 &&
        online_auction_list.httpresponse &&
        online_auction_list.httpresponse.responsecode === 200 &&
        Array.isArray(online_auction_list.records)
      ) {
        // Update only activeAuctionIds
        //             self.activeAuctionIds = online_auction_list.records
        //                 .filter(record => record.is_user_bid === "true")
        //                 .map(record => record.auction_id)
        //                 .join(";");

        let newIds = online_auction_list.records
        .filter(record => record.is_user_bid === "true")
        .map(record => record.auction_id);

        // get old IDs, clean empty ones
        let existingIds = (self.activeAuctionIds || "")
        .split(";")
        .filter(Boolean);

        // merge old + new, remove duplicates
        let mergedIds = Array.from(new Set([...existingIds, ...newIds]));

        // save back as string
        self.activeAuctionIds = mergedIds.join(";");
        voltmx.print(" Updated activeAuctionIds after bid: " + self.activeAuctionIds);
      } else {
        voltmx.print(" Failed to update activeAuctionIds: " + JSON.stringify(online_auction_list));
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
      voltmx.print(" Error calling updateActiveAuctionIdWhenBid: " + e);
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
      //        self.view.lblErrmsg.text = "Enter Max. Bid Amount";
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

      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      //     self.view.flxAutoBidAmountContainer.setVisibility(true);
      self.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
      self.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      self.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
      self.view.flxAmountAndButton.reverseLayoutDirection = isArabic
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

      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      this.view.flxAutoBidAmountContainer.setVisibility(true);
      this.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
      this.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      this.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
      this.view.flxAmountAndButton.reverseLayoutDirection = isArabic


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


  updateSegmentWithUpdatedBidRate: function () {
    //     var selIndex = this.view.segCurrentAuctionList.selectedRowIndex;
    var selIndex = this.view.segCurrentAuctionList.selectedIndex;

    if (!selIndex || selIndex.length < 2) {
      voltmx.print("No row selected in segCurrentAuctionList");
      return;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE"; // or your app-specific flag
    var seg = this.view.segCurrentAuctionList;
    var rowIndex = selIndex[1];
    var rowData = seg.data[rowIndex];

    //     var rowData = this.view.segCurrentAuctionList.selectedRowItems[0];
    var newBidPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
    if(rowData.lblTotalBidsCount){
      var totalBids = Number(rowData.lblTotalBidsCount.text) + 1;
    }
    rowData.lblPrice = {
      "text": newBidPrice,
      "skin": "sknLblDubai02905120pxBold",
      "left": isArabic ? "4%" : "",
      "right": isArabic ? "" : "8%",
      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
    };

    //     rowData.lblTotalBidsCount = {
    //         "text": totalBids,
    //         "left": isArabic ? "4%" : "",
    //         "right": isArabic ? "" : "8%",
    //         "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
    //     };

    // Optional: reapply i18n text too, in case it has changed due to locale switch
    rowData.lblBidAmount = {
      "text": voltmx.i18n.getLocalizedString("current bid"),
      "right": isArabic ? "8%" : "",
      "left": isArabic ? "" : "4%",
      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
    };

    //     rowData.lblTotalBids = {
    //         "text": voltmx.i18n.getLocalizedString("Location"),
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
    this.view.lblNorecords.setVisibility(false);
    this.view.segCurrentAuctionList.setVisibility(true);
    this.view.btnLoadMore.setVisibility(false);
    this.upcoming = 0;
    this.pageSize = 10;
    this.page = 1;
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
    this.view.lblNorecords.setVisibility(false);
    this.view.segCurrentAuctionList.setVisibility(true);
    this.view.btnLoadMore.setVisibility(false);
    this.upcoming = 1;
    this.pageSize = 10;
    this.page = 1;
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
    this.populateVehicleTypes();
  },

  hideVehicleTypeFilter: function(){
    this.view.flxVehicleTypeFilter.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },

  showVehicleConditionFilter: function(){
    this.view.flxVehicleConditionFilter.setVisibility(true);
    this.view.flxOverLay.setVisibility(true);
    this.populateVehicleCondition();
  },

  hideVehicleConditionFilter: function(){
    this.view.flxVehicleConditionFilter.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },


  hideBodyTypeFilter: function(){
    this.view.flxBodyTypeFilter.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },


  navTofrmDetails: function(){
    voltmx.store.setItem("previousFormForServices", "frmAllAuctionsList");
    var selectedItem = this.view.segCurrentAuctionList.selectedRowItems[0];
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    var navigationData = {
      aucid: selectedItem.aucid,
      objid: selectedItem.objid
    };
    var nav = new voltmx.mvc.Navigation("frmDetails");
    nav.navigate(navigationData);
  },

  populateVehicleTypes: function () {
    var self = this;

    this.view.flxBodyTypeFitler.removeAll();

    self.view.forceLayout();
    var containerWidth = this.view.flxBodyTypeFitler.frame.width || this.view.frame.width;
    var leftPadding = 20;
    var rightPadding = 20;
    var availableWidth = containerWidth - (leftPadding + rightPadding);
    var currentX = leftPadding;
    var currentY = 0;
    var rowHeight = 50; // 40dp flex + 10dp gap

    var bodyTypes = (this.masterDataResult &&
                     this.masterDataResult.data &&
                     this.masterDataResult.data[0] &&
                     this.masterDataResult.data[0].body_type) || [];

    bodyTypes.forEach(function (item) {
      var textLength = item.value.length;
      var flexWidth = (textLength * 8) + 20; // 8dp per char + padding

      // Wrap to next line if it doesn't fit
      if ((currentX + flexWidth) > (containerWidth - rightPadding)) {
        currentX = leftPadding;
        currentY += rowHeight;
      }

      var flxVehicleType = new voltmx.ui.FlexContainer({
        autogrowMode: voltmx.flex.AUTOGROW_NONE,
        clipBounds: false,
        height: "40dp",
        id: "flxVehicleType_" + item.id,
        isVisible: true,
        layoutType: voltmx.flex.FREE_FORM,
        left: currentX + "dp",
        top: currentY + "dp",
        width: flexWidth + "dp",
        skin: "sknflxffffffBorder767676Radius8px",
        isModalContainer: false,

        // Pass ID & Value via closure
        onClick: (function (filterId, filterValue) {
          return function () {
            // Save in store
            voltmx.store.setItem("bodyTypeId", String(filterId));
            voltmx.store.setItem("bodyTypeName", String(filterValue));
            // Width for selected tag
            var selWidth = (String(filterValue).length * 8) + 50;

            // Clear existing
            self.view.flxBodyTypeSelectedItems.removeAll();

            // Create selected tag
            var flxSelected = new voltmx.ui.FlexContainer({
              autogrowMode: voltmx.flex.AUTOGROW_NONE,
              clipBounds: false,
              height: "40dp",
              id: "selectedBodyType_" + filterId,
              isVisible: true,
              layoutType: voltmx.flex.FREE_FORM,
              width: selWidth + "dp",
              left: "20dp",
              skin: "sknFlxd32437bgcustom8pxround",
              isModalContainer: false,
              onClick: function () {
                self.view.flxBodyTypeSelectedItems.remove(flxSelected);
                voltmx.store.removeItem("bodyTypeId");
                voltmx.store.removeItem("bodyTypeName");
                self.view.forceLayout();
              }
            }, {
              paddingInPixel: false
            }, {});

            flxSelected.setDefaultUnit(voltmx.flex.DP);

            var lblSelected = new voltmx.ui.Label({
              left: "10dp",
              centerY: "50%",
              id: "lblSelectedBodyType",
              isVisible: true,
              skin: "sknLblDubaiffffff20px",
              text: filterValue,
              width: voltmx.flex.USE_PREFERRED_SIZE
            }, {
              contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT
            }, {});

            var imgRemove = new voltmx.ui.Image2({
              right: "10dp",
              centerY: "50%",
              id: "imgRemoveBodyType",
              isVisible: true,
              src: "removewhite.png",
              width: "10dp",
              height: "10dp"
            }, {
              imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
            }, {});

            flxSelected.add(lblSelected, imgRemove);
            self.view.flxBodyTypeSelectedItems.add(flxSelected);
            self.view.forceLayout();
          };
        })(item.id, item.value) // Pass values here
      }, {
        paddingInPixel: false
      }, {});

      flxVehicleType.setDefaultUnit(voltmx.flex.DP);

      var lblVehicleType = new voltmx.ui.Label({
        centerX: "50%",
        centerY: "50%",
        height: "80%",
        id: "lblVehicleType_" + item.id,
        isVisible: true,
        skin: "sknLblDubai76767616px",
        text: item.value,
        width: voltmx.flex.USE_PREFERRED_SIZE
      }, {
        contentAlignment: constants.CONTENT_ALIGN_CENTER
      }, {});

      flxVehicleType.add(lblVehicleType);
      self.view.flxBodyTypeFitler.add(flxVehicleType);

      // Move X for next
      currentX += flexWidth + 10;
    });

    this.view.forceLayout();
  },

  //  populateVehicleCondition: function () {
  //     var self = this;

  //     // Clear existing
  //     this.view.flxVehicleConditionValues.removeAll();

  //     self.view.forceLayout();
  //     var containerWidth = this.view.flxVehicleConditionValues.frame.width || this.view.frame.width;
  //     var leftPadding = 20;
  //     var rightPadding = 20;
  //     var availableWidth = containerWidth - (leftPadding + rightPadding);
  //     var currentX = leftPadding;
  //     var currentY = 0;
  //     var rowHeight = 50; // 40dp flex + 10dp gap

  //     var conditions = (this.masterDataResult &&
  //         this.masterDataResult.data &&
  //         this.masterDataResult.data[0] &&
  //         this.masterDataResult.data[0].body_condition) || [];

  //     conditions.forEach(function (item) {
  //         var textLength = item.value.length;
  //         var flexWidth = (textLength * 8) + 20;

  //         // Wrap to next line if needed
  //         if ((currentX + flexWidth) > (containerWidth - rightPadding)) {
  //             currentX = leftPadding;
  //             currentY += rowHeight;
  //         }

  //         // Create condition flex with closure-based onClick
  //         var flxCondition = new voltmx.ui.FlexContainer({
  //             autogrowMode: voltmx.flex.AUTOGROW_NONE,
  //             clipBounds: false,
  //             height: "40dp",
  //             id: "flxCondition_" + item.id,
  //             isVisible: true,
  //             layoutType: voltmx.flex.FREE_FORM,
  //             left: currentX + "dp",
  //             top: currentY + "dp",
  //             width: flexWidth + "dp",
  //             skin: "sknflxffffffBorder767676Radius8px",
  //             isModalContainer: false,

  //             // Pass ID & Value via closure
  //             onClick: (function (conditionId, conditionValue) {
  //                 return function () {
  //                     // Save in store
  //                     voltmx.store.setItem("bodyConditionId", String(conditionId));
  //                     voltmx.store.setItem("bodyConditionName", String(conditionValue));
  //                     var selWidth = (String(conditionValue).length * 8) + 50;

  //                     // Clear existing selected filters
  //                     self.view.flxVehicleConditionSelectedFitlers.removeAll();

  //                     // Create selected condition chip
  //                     var flxSelected = new voltmx.ui.FlexContainer({
  //                         autogrowMode: voltmx.flex.AUTOGROW_NONE,
  //                         clipBounds: false,
  //                         height: "40dp",
  //                         id: "selectedCondition_" + conditionId,
  //                         isVisible: true,
  //                         layoutType: voltmx.flex.FREE_FORM,
  //                         width: selWidth + "dp",
  //                         left: "20dp",
  //                         skin: "sknFlxd32437bgcustom8pxround",
  //                         isModalContainer: false,
  //                         onClick: function () {
  //                             self.view.flxVehicleConditionSelectedFitlers.remove(flxSelected);
  //                             voltmx.store.removeItem("bodyConditionId");
  //                             voltmx.store.removeItem("bodyConditionName");
  //                             self.view.forceLayout();
  //                         }
  //                     }, {
  //                         paddingInPixel: false
  //                     }, {});

  //                     flxSelected.setDefaultUnit(voltmx.flex.DP);

  //                     var lblSelected = new voltmx.ui.Label({
  //                         left: "10dp",
  //                         centerY: "50%",
  //                         id: "lblSelectedCondition",
  //                         isVisible: true,
  //                         skin: "sknLblDubaiffffff20px",
  //                         text: conditionValue,
  //                         width: voltmx.flex.USE_PREFERRED_SIZE
  //                     }, {
  //                         contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT
  //                     }, {});

  //                     var imgRemove = new voltmx.ui.Image2({
  //                         right: "10dp",
  //                         centerY: "50%",
  //                         id: "imgRemoveCondition",
  //                         isVisible: true,
  //                         src: "removewhite.png",
  //                         width: "10dp",
  //                         height: "10dp"
  //                     }, {
  //                         imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
  //                     }, {});

  //                     flxSelected.add(lblSelected, imgRemove);
  //                     self.view.flxVehicleConditionSelectedFitlers.add(flxSelected);
  //                     self.view.forceLayout();
  //                 };
  //             })(item.id, item.value)
  //         }, {
  //             paddingInPixel: false
  //         }, {});

  //         flxCondition.setDefaultUnit(voltmx.flex.DP);

  //         var lblCondition = new voltmx.ui.Label({
  //             centerX: "50%",
  //             centerY: "50%",
  //             height: "80%",
  //             id: "lblCondition_" + item.id,
  //             isVisible: true,
  //             skin: "sknLblDubai76767616px",
  //             text: item.value,
  //             width: voltmx.flex.USE_PREFERRED_SIZE
  //         }, {
  //             contentAlignment: constants.CONTENT_ALIGN_CENTER
  //         }, {});

  //         flxCondition.add(lblCondition);
  //         self.view.flxVehicleConditionValues.add(flxCondition);

  //         currentX += flexWidth + 10; // move for next
  //     });

  //     this.view.forceLayout();
  // }

  populateVehicleCondition: function () {
    var self = this;

    // Clear existing and ensure vertical flow layout
    this.view.flxVehicleConditionValues.removeAll();
    this.view.flxVehicleConditionValues.layoutType = voltmx.flex.FLOW_VERTICAL;
    self.view.forceLayout();

    var conditions = (this.masterDataResult &&
                      this.masterDataResult.data &&
                      this.masterDataResult.data[0] &&
                      this.masterDataResult.data[0].body_condition) || [];

    conditions.forEach(function (item) {
      var flxCondition = new voltmx.ui.FlexContainer({
        autogrowMode: voltmx.flex.AUTOGROW_HEIGHT,
        clipBounds: false,
        id: "flxCondition_" + item.id,
        isVisible: true,
        layoutType: voltmx.flex.FREE_FORM,
        width: "90%",        // slightly inset from screen edges
        left: "5%",
        top: "4dp",          // spacing between items
        skin: "sknflxffffffBorder767676Radius8px",
        onClick: (function (conditionId, conditionValue) {
          return function () {
            //  Remove any previously selected condition
            self.view.flxVehicleConditionSelectedFitlers.removeAll();
            voltmx.store.removeItem("bodyConditionId");
            voltmx.store.removeItem("bodyConditionName");

            //  Save new selected values
            voltmx.store.setItem("bodyConditionId", String(conditionId));
            voltmx.store.setItem("bodyConditionName", String(conditionValue));

            //  Calculate width safely (max 340dp default)
            var selWidth = (String(conditionValue).length * 8) + 50;
            var maxWidth = 340 - 24; // ~4dp right padding, 20dp left offset
            //     if (selWidth > maxWidth) selWidth = maxWidth;

            //  Create selected condition flex
            var flxSelected = new voltmx.ui.FlexContainer({
              //         autogrowMode: voltmx.flex.AUTOGROW_NONE,
              clipBounds: false,
              height: "40dp",
              id: "selectedCondition_" + conditionId,
              isVisible: true,
              centerY: "50%",
              layoutType: voltmx.flex.FREE_FORM,
              width: selWidth + "dp",
              left: "20dp",
              skin: "sknFlxd32437bgcustom8pxround",
              onClick: function () {
                // Deselect logic
                self.view.flxVehicleConditionSelectedFitlers.remove(flxSelected);
                voltmx.store.removeItem("bodyConditionId");
                voltmx.store.removeItem("bodyConditionName");
                self.view.forceLayout();
              }
            }, { paddingInPixel: false }, {});

            flxSelected.setDefaultUnit(voltmx.flex.DP);

            //  Label with side + vertical padding
            var lblSelected = new voltmx.ui.Label({
              left: "10dp",
              right: "30dp", // leave space for remove icon
              top: "6dp",
              bottom: "6dp",
              id: "lblSelectedCondition",
              isVisible: true,
              skin: "sknLblDubaiffffff20px",
              text: conditionValue,
              width: (selWidth - 50) + "dp",
              numberOfLines: 1,
              autogrowMode: voltmx.flex.AUTOGROW_NONE,
              textTruncatePosition: constants.TEXT_TRUNCATE_END
            }, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});

            //  Remove icon
            var imgRemove = new voltmx.ui.Image2({
              right: "10dp",
              centerY: "50%",
              id: "imgRemoveCondition",
              isVisible: true,
              src: "removewhite.png",
              width: "12dp",
              height: "12dp"
            }, { imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO }, {});

            //  Add to container
            flxSelected.add(lblSelected, imgRemove);
            self.view.flxVehicleConditionSelectedFitlers.add(flxSelected);
            self.view.forceLayout();
          };

        })(item.id, item.value)
      }, { paddingInPixel: false }, {});

      flxCondition.setDefaultUnit(voltmx.flex.DP);

      var lblCondition = new voltmx.ui.Label({
        left: "10dp",
        right: "10dp",
        top: "8dp",
        bottom: "8dp",
        id: "lblCondition_" + item.id,
        isVisible: true,
        skin: "sknLblDubai76767616px",
        text: item.value,
        width: voltmx.flex.USE_AVAILABLE_SPACE,
        autogrowMode: voltmx.flex.AUTOGROW_HEIGHT,
        numberOfLines: 0
      }, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});

      flxCondition.add(lblCondition);
      self.view.flxVehicleConditionValues.add(flxCondition);
    });

    this.view.forceLayout();
  }





});