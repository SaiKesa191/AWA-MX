define({ 

  onNavigate: function()
  {
    this.hasMoreData;
    this.view.flxPendingCompletion.onClick = this.pendingCompletionOnClick.bind(this);
    this.view.flxCompletedService.onClick = this.CompletedServicesOnClick.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.Addingi18nKeys();
    this.view.flxBackNavigation.onClick = this.backToOpenMyAccount;
    this.view.btnLoadMore.onClick = this.btnLoadMoreOnClickAction;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
     this.view.SegPending.onRowClick = function() {
      var selectedIndex = this.view.SegPending.selectedRowIndex[1];
      this.toggleRowVisibilityPending(this.view.SegPending, selectedIndex);
    }.bind(this);
  },




  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if(isArabic)
    {
      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgBackNav.transform = flipTransform;
    }
    else
    {
      this.view.imgBackNav.transform = voltmx.ui.makeAffineTransform();
    }
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblTotalApprovedVehicles",
      "lblServicesCompleted",
      "lblPendingCompletion1"
    ];
    var calendarList = [
      "",
    ];
    for (var i = 0; i < calendarList.length; i++) {
      if (this.view[calendarList[i]]) {
        this.view[calendarList[i]].contentAlignment = labelAlignment;
      }
    }
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = labelAlignment;
      }
    }
    this.view.flxTotalApprovedVehiclesCount.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxServicesCompletedCount.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxPendingCompletionScroll.reverseLayoutDirection = isArabic ? true : false;
    this.view.lblTotalApprovedVehiclesCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblServicesompletedCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblPendingCompletionCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    var flexList = [
      "flxBack", 
      "flxTotalApproved",
      "flxServicesCompleted",
      "flxPendingCompletion1",
      "flxSummaryOfVehiclePayments"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
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
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblSummaryOfOtherServicePayments.text = voltmx.i18n.getLocalizedString("Summary of Other Services Payments");
    this.view.lblSummaryOfOtherServicesPayments.text = voltmx.i18n.getLocalizedString("Summary of Other Services Payments");
    this.view.lblTotalApprovedVehicles.text = voltmx.i18n.getLocalizedString("Total Other Service Availed");
    this.view.lblPendingCompletion.text =  voltmx.i18n.getLocalizedString("Pending Completion");
    this.view.lblCompletedService.text = voltmx.i18n.getLocalizedString("Completed service");
    this.view.lblServicesCompleted.text = voltmx.i18n.getLocalizedString("Services Completed");
    this.view.lblPendingCompletion1.text = voltmx.i18n.getLocalizedString("Pending Completion");
    this.view.btnLoadMore.text =  voltmx.i18n.getLocalizedString("Load more");
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.getOtherServicePayments();
    } else {
      voltmx.print("Still offline...");
    }
  },




  backToOpenMyAccount: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyAccount")
    ntf.navigate();
  },




  onPreShow: function() {
    this.toggleFooterIcons();
    this.type = "pending";
    this.pageSize = 10;           
    this.currentPendingPage = 1;   
    this.currentCompletedPage = 1;
    this.getOtherServicePayments(this.type, this.currentPendingPage, this.pageSize);
  },




  btnLoadMoreOnClickAction: function() {
    var type = voltmx.store.getItem("CompletedOrPendingStatus") || "pending";
    if (this.view.SegPending.isVisible) {
      this.currentPendingPage++;
      this.getOtherServicePayments("pending", this.currentPendingPage, this.pageSize);
    } else if (this.view.SegCompleted.isVisible) {
      this.currentCompletedPage++;
      this.getOtherServicePayments("completed", this.currentCompletedPage, this.pageSize);
    }
  },




  flxBackNavigationOnClickAction : function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyAccount");
    ntf.navigate();
  },



  getOtherServicePayments: function(type,page,pageSize){
    voltmx.application.showLoadingScreen(null, "Loading..", 
                                         constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                         false, true, 
                                         {shouldShowLabelInBottom: "true",   
                                          separatorHeight: 45,   
                                          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, 
                                          progressIndicatorColor: "Gray"     });

    var self = this;
    var buyer_other_payments_mobile_inputparam = buyer_other_payments_mobile_inputparam || {};
    var userId =   voltmx.store.getItem("userId");
    var user_token= voltmx.store.getItem("getUserAccesstoken");
    buyer_other_payments_mobile_inputparam["serviceID"] = "fry_wf$buyer-other-payments-mobile";
    buyer_other_payments_mobile_inputparam["user_id"] = userId;
    buyer_other_payments_mobile_inputparam["page"] = page ;
    buyer_other_payments_mobile_inputparam["page_size"] = pageSize ;
    buyer_other_payments_mobile_inputparam["type"] = type;
    var buyer_other_payments_mobile_httpheaders = {
      "user_token" : user_token
    };
    buyer_other_payments_mobile_inputparam["httpheaders"] = buyer_other_payments_mobile_httpheaders;
    var buyer_other_payments_mobile_httpconfigs = {};
    buyer_other_payments_mobile_inputparam["httpconfig"] = buyer_other_payments_mobile_httpconfigs;
    fry_wf$buyer_other_payments_mobile = 
      mfintegrationsecureinvokerasync(buyer_other_payments_mobile_inputparam,
                                      "fry_wf", 
                                      "buyer-other-payments-mobile", 
                                      function(status, response){
      voltmx.print(status);
      voltmx.print(response);
      if(!response){
        volmx.print("No Response");
        return;
      }
      if(response.opstatus === 0){
        if( response.buyer_other_payments_details&& response.buyer_other_payments_summary){
          var buyer_other_payments_summary = response.buyer_other_payments_details[0].records[0];
          var buyer_other_payments_details = response.buyer_other_payments_details[0].records[0];
          var total_no_of_vehicles = buyer_other_payments_details.total_no_of_vehicles || 0;
          var pending_vehicles     = buyer_other_payments_details.pending_vehicles || 0;
          var paid_vehciles        = buyer_other_payments_details.paid_vehciles || 0;
          self.view.lblTotalApprovedVehiclesCount.text = total_no_of_vehicles;
          self.view.lblServicesompletedCount .text = paid_vehciles;
          self.view.lblPendingCompletionCount.text = pending_vehicles;
          self.view.lblPendingCompletionValue.text = pending_vehicles;
          self.view.lblCompletedServiceValue.text = paid_vehciles;
          self.getBuyerOtherPaymentsSummary(response);
          voltmx.application.dismissLoadingScreen();
        } 
        else{
          voltmx.application.dismissLoadingScreen();
          alert("No records found!!")
        }
      }
      else{
        if( response.opstatus === 1011){
          self.view.flxError.setVisibility(true);
        }
        voltmx.application.dismissLoadingScreen();
        if(response.message === "User don't have permissions"){
          alert("User don't have permissions");
        }else{
          voltmx.print(response);   
        }
        voltmx.print("Invalid or empty response from get-buyer-other-payments");
      }
    });
  },




  getBuyerOtherPaymentsSummary: function(response) {
    var buyer_other_payments_summary = response.buyer_other_payments_summary[0].records;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var paid = [];
    var pending = [];
    if (Array.isArray(buyer_other_payments_summary) && buyer_other_payments_summary.length > 0) {
      var pending_index = 0;
      var paid_index = 0;
      buyer_other_payments_summary.forEach((res, index) => {
        var lot_no = res.lot_no || "N/A";
        var title  = res.title || "N/A";
        var object_id = res.object_id || "N/A";
        var status = res.status || "N/A";
        var completion_status = res.completion_status || "N/A";
        var service_cost = res.service_cost || "N/A";
        this.totalPages = res.totalPages || "N/A";
        //         var clickHandler ;
        //         if(completion_status.toLowerCase() === "completed"){
        //           clickHandler = this.toggleRowVisibilityPaid.bind(this,paid_index);
        //           paid_index = paid_index + 1;
        //         }
        //         else{
        //           clickHandler = this.toggleRowVisibilityPending.bind(this,pending_index);
        //           pending_index = pending_index + 1;
        //         }

        var clickHandler;
         var targetSegment;
        if (completion_status.toLowerCase() === "completed") {
          // Pass both segment and index
           targetSegment = this.view.SegCompleted;
          paid_index = paid_index + 1;
        } else {
          // Pass both segment and index
               targetSegment = this.view.SegPending;
//           clickHandler = this.toggleRowVisibilityPending.bind(this, this.view.SegPending, pending_index);
          pending_index = pending_index + 1;
        }
 clickHandler = this.toggleRowVisibilityPending.bind(this,targetSegment , index);
        var cardData = 
            { 
              "imgRightArrow": {
                "src": isArabic ? "back512h.png" : "rightarrow512h.png"
              },
              "lblAuctionID": 
              { 
                "text": voltmx.i18n.getLocalizedString("Auction ID"),
                "skin": "sknlblBlackDuabiold",
                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
              },
              "lblAuctionIDVal": {
                "text"      : lot_no,
                "skin"      : "sknLblCronosPro231f2016px",
                'onClick': clickHandler,
                "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT

              },
              "lblServiceType": {
                "text": voltmx.i18n.getLocalizedString("Service Type"),
                "skin": "sknlblBlackDuabiold",
                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

              },
              "lblServiceTypeValue": {
                "text": res.service_name || "N/A",
                "skin": "sknLblCronosPro231f2016px",
                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT  : constants.CONTENT_ALIGN_TOP_RIGHT 

              },
//               "lblMakeAndModel": { 
//                 "text": voltmx.i18n.getLocalizedString("Make & Model"),
//                 "skin": "sknlblBlackDuabiold",
//                 "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
//               },
//               "lblMakeAndModelValue": {
//                 "text": title,
//                 "skin": "sknLblCronosPro231f2016px",
//                 "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT  : constants.CONTENT_ALIGN_TOP_RIGHT 
//               },

              "lblAmount": { 
                "text": voltmx.i18n.getLocalizedString("Amount"), 
                "skin": "sknlblBlackDuabiold",
                "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
              },
              "lblAED": {
                "text": "AED",
                "skin": "sknlblDubai20pxbold",
              },
              "lblAmountValue": {
                "text": service_cost,
                "skin": "sknlblBlackDuabiold",
              },
//               "lblPaymentStatus": {
//                 "text": voltmx.i18n.getLocalizedString("payment status"), 
//                 "skin": "sknlblBlackDuabiold",
//                 "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

//               },
//               "lblPaymentStatusValue": {
//                 "text": status,
//                 "skin": status.trim().toLowerCase() === "paid" ? "sknLblDubai61b35c14pxbold" : "sknLblRed",
//                 "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT 
//               },
              "lblCompletionStatus": {
                "text": voltmx.i18n.getLocalizedString("Completion Status"),
                "skin": "sknlblBlackDuabiold",
                "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_RIGHT :  constants.CONTENT_ALIGN_TOP_LEFT 
              },
              "lblCompletionStatusValue": {
                "text": completion_status,
                "skin": "sknlbl61B35C14px", 
                "contentAlignment":  isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT 
              },
              "flxHideData": {
                "isVisible": false,
              },
              "isHidden": true,
              "flxAuctionID":{
                'onClick': clickHandler,
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxMakeAndModelContainer" :{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxAmount":{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxAmountValue":{
                "reverseLayoutDirection": !isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxPaymentStatus":{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxPaymentStatus":{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxCompletionStatusContainer":{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxAuctionIdContainer":{
                "reverseLayoutDirection": !isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              },
              "flxServiceTypeContainer":{
                "reverseLayoutDirection": isArabic,
                "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
              }
            };
        if (completion_status.toLowerCase() === "pending") {
          pending.push(cardData);
        } else if (completion_status.toLowerCase() === "completed") {
          paid.push(cardData);
        }
      });
      if (this.type === "pending") {
        if (this.currentPendingPage === 1) {
          this.view.SegPending.setData(pending); 
        } else {
          let existingPending = this.view.SegPending.data || [];
          this.view.SegPending.setData(existingPending.concat(pending));
        }
        this.hasMoreData = this.currentPendingPage < this.totalPages;
      }

      if (this.type === "completed") {
        if (this.currentCompletedPage === 1) {
          this.view.SegCompleted.setData(paid);
        } else {
          let existingCompleted = this.view.SegCompleted.data || [];
          this.view.SegCompleted.setData(existingCompleted.concat(paid));
        }
        this.hasMoreData = this.currentCompletedPage < this.totalPages;
      }
    } else {
      voltmx.print("No other service records found.");
      this.hasMoreData = false;
    }
    this.view.btnLoadMore.setVisibility(this.hasMoreData);
  },




  pendingCompletionOnClick: function(){
    this.currentPendingPage = 1;
    voltmx.store.setItem("status", "pending");
    this.view.flxPendingCompletion.skin = "sknflxBgFFE2E5";
    voltmx.store.setItem("CompletedOrPendingStatus","pending"); 
    this.type = voltmx.store.getItem("CompletedOrPendingStatus");
    this.getOtherServicePayments(this.type, this.currentPendingPage, this.pageSize);
    this.view.flxPendingCompletionBar.skin = "sknflxBgRed";
    this.view.flxCompletedService.skin = "slFbox";
    this.view.flxCompletedServiceBar.skin = "sknflxBg9c9c9c";
    this.view.SegCompleted.setVisibility(false);
    this.view.SegPending.setVisibility(true);
  },




  CompletedServicesOnClick: function(){
    this.currentCompletedPage = 1;
    voltmx.store.setItem("status", "completed");
    this.view.flxCompletedService.skin = "sknflxBgFFE2E5";
    voltmx.store.setItem("CompletedOrPendingStatus","completed"); 
    this.type = voltmx.store.getItem("CompletedOrPendingStatus");
    this.getOtherServicePayments(this.type, this.currentCompletedPage, this.pageSize);
    this.view.flxCompletedServiceBar.skin = "sknflxBgRed";
    this.view.flxPendingCompletion.skin = "slFbox";
    this.view.flxPendingCompletionBar.skin = "sknflxBg9c9c9c";
    this.view.SegPending.setVisibility(false);
    this.view.SegCompleted.setVisibility(true);
  },




  toggleRowVisibilityPaid: function(seg, rowIndex){
    var status =  voltmx.store.getItem("status");
//     var seg =  this.view.SegCompleted;
    var allData = seg.data;
    var didChange = false;
    if (rowIndex === undefined || rowIndex === null) {
      voltmx.print("Invalid rowIndex");
      return;
    }
    for (var i = 0; i < allData.length; i++) {
      if (i === rowIndex) {
        var currentVisibility = allData[i].isHidden;
        allData[i].isHidden = !currentVisibility;
        allData[i].flxHideData = {
          //           isVisible: !currentVisibility
          isVisible: currentVisibility ? true : false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      } else if (!allData[i].isHidden) {
        allData[i].isHidden = true;
        allData[i].flxHideData = {
          isVisible: false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      }
    }
    if (!didChange) {
      seg.setData(allData);
    }
    this.view.forceLayout();
  },




  toggleRowVisibilityPending: function (seg,rowIndex) {
    var status =  voltmx.store.getItem("status");
//     var seg = this.view.SegPending;
    var allData = seg.data;
    var didChange = false;
    for (var i = 0; i < allData.length; i++) {
      if (i === rowIndex) {
//         var currentVisibility = allData[i].isHidden;
        var currentVisibility = allData[i].isHidden === undefined ? true : allData[i].isHidden;

        allData[i].isHidden = !currentVisibility;
        allData[i].flxHideData = {
//                     isVisible: !currentVisibility
          isVisible: currentVisibility ? true : false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      } else if (!allData[i].isHidden) {
        allData[i].isHidden = true;
        allData[i].flxHideData = {
          isVisible: false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      }
    }
    if (!didChange) {
      seg.setData(allData);
    }
    this.view.forceLayout();
  },     




  toggleFooterIcons: function() {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(true);
    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    this.view.Footer2.lblSellCar.skin = "sknLblDubai231f2014pxBold"; 
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
    this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
    this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
    this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
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




});