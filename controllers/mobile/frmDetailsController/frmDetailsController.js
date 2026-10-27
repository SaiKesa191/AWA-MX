define({ 

  onNavigate: function(context)
  {
   loginToDam();
   this.setData1();
    this.userid = voltmx.store.getItem("userId");
    this.mode = voltmx.store.getItem("mode");
    //      var lang = voltmx.store.getItem("curentLang") || "en";
    //      voltmx.store.setItem("curentLang",lang);
    //      this.view.flxHeaderNew.btnChangeLang.text = lang;
    this.addSwipeSupport();
//     this.addPinchSupport();
     if(context){
        this.prevForm = null;
      this.context = context;
    }
    
    if(context && context.prevForm){
      this.context = context;
         this.prevForm = context.prevForm;
 
    }
    
    if(context &&  context.navForm){
      this.context = context;
         this.prevForm = context.navForm;
    } 

//     this.view.onHide = () => {
//       if (this._auctionTimerId) {
//         voltmx.timer.cancel(this._auctionTimerId);
//         this._auctionTimerId = null;
//       }

//       if (this._auctionTimerId1) {
//         voltmx.timer.cancel(this._auctionTimerId1);
//         this._auctionTimerId1 = null;
//       }
//     };



    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.segOptions.onRowClick = this.segOptionsRowClickAction.bind(this);
//      var objid = voltmx.store.getItem("objidForVI"); 
//     var lotId =  voltmx.store.getItem("lotIdForVI"); 
    var currentAuctionNavigation = voltmx.store.getItem("previousFormForServices");
    
    

   this.view.flxShare.onClick = () =>{
     var isLogin = voltmx.store.getItem("isLogin");
     if(isLogin)
   {
      voltmx.store.setItem("originForm01", "frmDetails");
         var objid = voltmx.store.getItem("objidForVI"); 
    var lotId =  voltmx.store.getItem("lotIdForVI"); 
     voltmx.store.setItem("originForm", "frmDetails");
   if(lotId&&objid){
     voltmx.store.setItem("comingFromDashboard", false);
     new voltmx.mvc.Navigation("frmServices")
       .navigate({
       previousFormID: "frmDetails",
//        previousFormForAction: currentAuctionNavigation,
       "previousFormAction": currentAuctionNavigation,
       "lotId" : lotId,
       "objectId": objid,
       "prevForm":"Details"
     });
      }
      else
        {
          objid = voltmx.store.getItem("objidForVI"); 
     lotId =  voltmx.store.getItem("lotIdForVI");
        }
      voltmx.store.setItem("OriginFromForBC", "frmDetails");
   }
     else
       {
         new voltmx.mvc.Navigation("frmLoginScreen").navigate();
       }
    };
    
       this.view.flxBack.onClick  = this.BackNav.bind(this);
    //commented for kalyani changes....
//     this.view.flxBack.onClick = () => {
//       var lastFormId = voltmx.store.getItem("lastFormId");
//     if(this.prevForm && this.prevForm === "frmMyListings") {
//           new voltmx.mvc.Navigation("frmMyListings").navigate();
//         }
//         if(this.prevForm && this.prevForm === "frmUnderReview") {
//           new voltmx.mvc.Navigation("frmUnderReview").navigate();
//         }
//       if (lastFormId) {
//         new voltmx.mvc.Navigation(lastFormId).navigate();
//       } else {
//         var previousForm = voltmx.application.getPreviousForm();
//         if (previousForm) {
//           new voltmx.mvc.Navigation(previousForm.id).navigate();
//         } else {
//           // Optional: fallback or show error if no previous form
//           voltmx.print("No previous form to navigate to.");
//         }
//       }
//     };

    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
    this.view.flxBackFromMultipleImages.onClick = this.hideMultipleImagesflex.bind(this);
    this.view.flxShowMultipleImages.onClick = this.showMultipleImagesflex.bind(this);
    this.view.flxImageBackward.onClick = function() {
      if(this.filteredImages){
        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.showImage(this.currentImageIndex);
      }}.bind(this);
    this.view.flxImageForward.onClick = function() {
      if(this.filteredImages){
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.showImage(this.currentImageIndex);
      }}.bind(this);
    this.view.flxBackwardMultipleImages.onClick = function() {
      if(this.filteredImages){
        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.showImageMultiple(this.currentImageIndex);
      }}.bind(this);
    this.view.flxForwardMultipleImages.onClick = function() {
      if(this.filteredImages){
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.showImageMultiple(this.currentImageIndex);
      }}.bind(this); 
    this.view.btnBidNowLast.onClick = this.openBidAmountContainerFromFleet.bind(this);
    this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    //      this.view.flxTechnicalReport.onClick = this.onDownloadButtonClick.bind(this);

    //#ifdef android
    this.view.flxTechnicalReport.onClick = this.onDownloadButtonClick.bind(this);
    //#endif
    //#ifdef iphone
    this.view.flxTechnicalReport.onClick = this.testPDFNFIDownload.bind(this);
    //#endif

    this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    //    this.view.flxHeaderNew.btnChangeLang.onClick = () => {
    //      if(this.view.flxHeaderNew.btnChangeLang.text === "en"){
    //        this.view.flxHeaderNew.btnChangeLang.text = "ar";
    //        voltmx.store.setItem("curentLang","en");
    //        this.invokeFleetDetails(); 
    //      }
    //      else{
    //        this.view.flxHeaderNew.btnChangeLang.text = "en";
    //        voltmx.store.setItem("curentLang","ar");
    //        this.invokeFleetDetails(); 
    //      }
    //    }
    this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
    this.view.flxZoomIn.onClick = this.zoomIn.bind(this);
this.view.flxZoomOut.onClick = this.zoomOut.bind(this);

    this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.flxFav.onClick = this.addItemToFavourites.bind(this);
    this.view.onHide = this.onHide.bind(this);
  },
  
  onHide: function() {
    var self = this;
  try {
    voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");
    voltmx.timer.cancel("AuctionDetailsAutoRefresh");
    voltmx.print("All auction timers stopped on form hide.");
    
     if (self._auctionTimerId) {
        voltmx.timer.cancel(self._auctionTimerId);
        self._auctionTimerId = null;
      }

      if (self._auctionTimerId1) {
        voltmx.timer.cancel(self._auctionTimerId1);
        self._auctionTimerId1 = null;
      }
  } catch (e) {
    voltmx.print("Error while cancelling timers: " + e.message);
  }
},
  
  startLivePriceRefresh: function() {
  try {   
    voltmx.timer.cancel("AuctionPriceAutoRefreshfrmAllActions");   
    voltmx.print("AuctionPriceAutoRefreshfrmAllActions cancelled successfully"); 
  }
  catch (e) {  
    voltmx.print("AuctionPriceAutoRefreshfrmAllActions already stopped or not found"); 
  }




  //  Refresh auction details (bids etc.) every 5 sec
  try {
    voltmx.timer.cancel("AuctionDetailsAutoRefresh");
  } catch (e) {
    voltmx.print("AuctionDetailsAutoRefresh already stopped or not found");
  }

  voltmx.timer.schedule(
    "AuctionDetailsAutoRefresh",
    this.getActiveAuctionBids.bind(this),
    2,
    true
  );
},


  BackNav: function(){
        var lastFormId = voltmx.store.getItem("lastFormId");
      var targetForm = null;
  if (this.prevForm === "frmMyListings") {
    targetForm = "frmMyListings";
    new voltmx.mvc.Navigation(targetForm).navigate();
    return; // stop further navigation
  } 
        else if (this.prevForm === "WonBids") {
        targetForm = "frmWonBids";
    new voltmx.mvc.Navigation(targetForm).navigate();
    return;
  }
  else if (this.prevForm === "frmUnderReview") {
        targetForm = "frmUnderReview";
    new voltmx.mvc.Navigation(targetForm).navigate();
    return;
  } 
  else if (lastFormId) {
    new voltmx.mvc.Navigation(lastFormId).navigate();
    return;
  } 
  else {
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
      new voltmx.mvc.Navigation(previousForm.id).navigate();
    } else {
      voltmx.print("No previous form to navigate to.");
    }
  }
    },

  onPreShow: function()
  {
//      this.checkSession(function() {

//       voltmx.print("Session is valid. Proceeding with data load.");
      
//     });
    
    
    if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
    
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
    
    
    this.hideMultipleImagesflex();
    this.view.flxNeedAssitance.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
    this.view.lblNoImages.setVisibility(false);
    this.view.tc.setVisibility(false);
    this.view.flxLocationContainer.bottom = "0dp";
    if (this.context && this.context.objid) {
      this.objid = this.context.objid;
      this.aucid = this.context.aucid;
      voltmx.store.setItem("lastObjId", this.objid); // persist it for future
      voltmx.store.setItem("lastAucId",this.aucid);
    } else {
      // fallback if navigating after language change
      this.objid = voltmx.store.getItem("lastObjId");
      this.aucid = voltmx.store.getItem("lastAucId");
    }

    if (!this.objid) {
      voltmx.print("No objid found even in fallback.");
      return;
    }
      var lastFormId = voltmx.store.getItem("lastFormId");
    var fromLiveAuction = voltmx.store.getItem("fromLiveAuction");
    if(lastFormId){
      if (
    lastFormId === "frmWonBids" ||
    lastFormId === "frmApprovedVehicles" ||
    lastFormId === "frmUnderReview" ||
    lastFormId === "frmSoldVehicles" ||
    lastFormId === "frmUnsoldVehicles" ||
    lastFormId === "frmDeliveredVehiclesForSeller" ||
    lastFormId === "frmPendingSaleConfirmation" ||
    (lastFormId === "frmMyListings" && !fromLiveAuction)
) {
//       this.view.btnBidNowLast.setEnabled(false);
//       this.view.btnBidNowLast.skin = "sknBtnececec8pxradius";
        this.view.flxFav.setVisibility(false);
        this.view.flxBidNowButton.setVisibility(false);
//      this.view.flxBids.setVisibility(false);
        this.initialFlxBidsVisible = false;
     this.view.lblTimeCount.setVisibility(false);
    }
      else{
//         this.view.btnBidNowLast.setEnabled(true);
//       this.view.btnBidNowLast.skin = "sknBtnDubai61b35c26pxMedium";
        this.view.flxFav.setVisibility(true);
        this.view.flxBidNowButton.setVisibility(true);
//          this.view.flxBids.setVisibility(true);
        this.initialFlxBidsVisible = true;
        this.view.lblTimeCount.setVisibility(true);
      }
    }
    var self = this;
   
//     self.initialFlxBidsVisible = self.view.flxBids.isVisible;

    self.invokeFleetDetails(); 
    this.view.flxRemoveNeedAssistane.onClick = () =>{
      this.view.flxNeedAssitance.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    this.view.btnContactUsFromPopup.onClick = () =>{
      new voltmx.mvc.Navigation("frmContactUS").navigate();
    }
    this.view.flxNeedAssitance.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
    this.view.flxMultipleImages.setVisibility(false);
    this.closeBidAmountContainer();
    //     this.assignValuesToFieldsFromContext();
  },

  getActiveAuctionBids: function()  
  {
   var self = this;

    function INVOKE_SERVICE_b322beea88ad4566b8c76f6201b6a83f_Callback(status, get_active_auction_bids) {
  voltmx.print(get_active_auction_bids);

  if (
    !get_active_auction_bids ||
    !get_active_auction_bids.httpresponse ||
    get_active_auction_bids.httpresponse.responsecode !== 200 ||
    !get_active_auction_bids.records ||
    get_active_auction_bids.records.length === 0
  ) {
    voltmx.print("No valid auction bids received.");
    return;
  }

  if (get_active_auction_bids.records[0] && get_active_auction_bids.records[0].max_bid_amount) {
    if (self.view.lblBidAmount.text) {
      var currentText = self.view.lblBidAmount.text;
      var cleanedCurrent = Number(currentText.replace(/[^\d.]/g, ""));
      var newBid = Number(get_active_auction_bids.records[0].max_bid_amount);
    
      if (!self.isSilent) {
      if (cleanedCurrent !== newBid) {
        self.view.lblBidAmount.text = "AED " + newBid;
      }
      }

      if (!self.isSilent) {
        var highest_bidder = get_active_auction_bids.records[0].highest_bidder;
        if (self.userid && self.userid === highest_bidder) {
          self.view.lblBidAmount.skin = "sknLblDubai02905120pxBold";
        } else {
          self.view.lblBidAmount.skin = "sknLblDubaid3243720pxbold";
        }
      }
    }
  }
}

    if (get_active_auction_bids_inputparam == undefined) {
        var get_active_auction_bids_inputparam = {};
    }
    var userId = voltmx.store.getItem("userId");
    get_active_auction_bids_inputparam["serviceID"] = "fry_int_common$get-active-auction-bids";
    get_active_auction_bids_inputparam["auction_ids"] = voltmx.store.getItem("aucIDForRefresh") || "";
//     get_active_auction_bids_inputparam["user_id"] = userId || ""; 
    var get_active_auction_bids_httpheaders = {};
    get_active_auction_bids_inputparam["httpheaders"] = get_active_auction_bids_httpheaders;
    var get_active_auction_bids_httpconfigs = {};
    get_active_auction_bids_inputparam["httpconfig"] = get_active_auction_bids_httpconfigs;
    fry_int_common$get_active_auction_bids = mfintegrationsecureinvokerasync(get_active_auction_bids_inputparam, "fry_int_common", "get-active-auction-bids", INVOKE_SERVICE_b322beea88ad4566b8c76f6201b6a83f_Callback);

},
  
  onPostShow: function(){
    var self = this;
    this.view.flxNeedAssitance.setVisibility(false);
    this.view.btnBidNow.onClick =  this.invokeFryWfAuctionBidding.bind(this);
    //     this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
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
    
    //        this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);

    this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }

    };

    this.view.flxWarningClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
      this.view.flxWarning.setVisibility(false);
    };

    this.view.btnClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
      this.view.flxWarning.setVisibility(false);
    };

    //     this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
    //     this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");

    this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
    try {
    self.startLivePriceRefresh();
  } catch (e) {
    voltmx.print("Error while starting refresh timers: " + e.message);
  }

  },

  segOptionsRowClickAction: function()
  {
    var self = this;
    var selectedProfileItems = self.view.segOptions.selectedRowItems;
    var selectedValue = selectedProfileItems[0].lblOptions;
    var x;
    switch(selectedValue){
      case "Terms & Conditions"      :   {
        x = new voltmx.mvc.Navigation("frmTermsAndConditions02");
      }
        break;
      case "Options"      :   {
        x = new voltmx.mvc.Navigation("frmOptions");
      }
        break;
      case "FAQs"    :   {
        x = new voltmx.mvc.Navigation("frmFAQs");
      }
        break; 
      case "Still Have Questions?"     : {
        self.view.flxNeedAssitance.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);
      }
        break;
      case "Request Vehicle Inspection"        :  {
//         voltmx.store.getItem("lotidForVI");
//         voltmx.store.getItem("objidForVI"); 
           voltmx.store.setItem("originForm", "frmDetails");
        x = new voltmx.mvc.Navigation("frmVehicleInspection");
      }
        break;
    }
    if(x){
      x.navigate();
    }

  },

  enableAutoBidFromBid: function(){
    var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin){
      this.view.flxBidAmountSelectionContainer.setVisibility(false);
      this.view.tbxAutoBidAmount.text = "";

      this.view.flxOverLay.setVisibility(true);

      this.view.flxAutoBidAmountContainer.setVisibility(true);
    }
    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },

  assignValuesToFieldsFromContext: function(data,details)
  {

    var item = data;

    this.setCarDetails(item);

    this.filteredImages = this.getFilteredImages(details);
    this.currentImageIndex = 0;

    if (this.filteredImages.length > 0) {
      this.loadImageCarousel();
      this.assignStaticImages(this.filteredImages); 
    } else {
      this.view.imgCarousel.src = ""; // Leave blank if no images
      this.view.flxImageForward.setEnabled(false);
      this.view.flxImageBackward.setEnabled(false);
      this.assignStaticImages([]);
    }




  },

  getFilteredImages: function(details)
  {

    if (details && Array.isArray(details.fleet_images)) {
      return details.fleet_images.filter(function(item) {
        return item.category === "Images";
      });
    }
    return [];

  },

  assignStaticImages: function(images) {
    // Reset all image widgets
    for (var i = 1; i <= 6; i++) {
      this.view["carImg" + i].src = ""; // Clear the src
      this.view["carImg" + i].setVisibility(false);
    }

    if (!images || images.length === 0) {
      this.view.lblNoImages.setVisibility(true); // Show "No Images Found" label
      return;
    }

    this.view.lblNoImages.setVisibility(false); // Hide the label if images found

    // Set images to img1 - img6
    for (var j = 0; j < Math.min(images.length, 6); j++) {
      this.view["carImg" + (j + 1)].src = images[j].file_url;
      this.view["carImg" + (j + 1)].setVisibility(true);
    }
  },

  loadImageCarousel: function() {
    if (this.filteredImages.length === 0) {
      this.view.imgCarousel.src = "noimage.png";
      this.view.flxImageForward.setEnabled(false);
      this.view.flxImageBackward.setEnabled(false);
      return;
    }

    // Show first image
    this.showImage(this.currentImageIndex);

    // Enable/disable buttons
    var hasMultiple = this.filteredImages.length > 1;
    this.view.flxImageForward.setEnabled(hasMultiple);
    this.view.flxImageBackward.setEnabled(hasMultiple);
  },


  //  showImage: function(index) {
  //   if (Array.isArray(this.filteredImages) && this.filteredImages.length > 0) {
  //     const image = this.filteredImages[index];
  //     if (image && image.file_url) {
  //       this.view.imgCarousel.src = isValidURL(image.file_url) ? image.file_url : "noimage.png";
  //     } else {
  //       this.view.imgCarousel.src = "noimage.png";
  //     }
  //   } else {
  //     this.view.imgCarousel.src = "noimage.png";
  //   }
  // },


  //   showImageMultiple: function(index) {
  //   try {
  //     // Check if filteredImages is a valid array with items
  //     if (Array.isArray(this.filteredImages) && this.filteredImages.length > 0) {
  //       var imageObj = this.filteredImages[index];

  //       if (imageObj && imageObj.file_url) {
  //         var url = imageObj.file_url;
  //         this.view.imgCarouselMultipleImages.src = isValidURL(url) ? url : "noimage.png";
  //       } else {
  //         // If file_url is missing or invalid object
  //         this.view.imgCarouselMultipleImages.src = "noimage.png";
  //       }
  //     } else {
  //       // If no images available
  //       this.view.imgCarouselMultipleImages.src = "noimage.png";
  //     }
  //   } catch (e) {
  //     voltmx.print("Error in showImageMultiple: " + e.message);
  //     // Fallback in case of unexpected error
  //     this.view.imgCarouselMultipleImages.src = "noimage.png";
  //   }
  // },

  
showImage: function(index) {
  if (Array.isArray(this.filteredImages) && this.filteredImages.length > 0) {
    const image = this.filteredImages[index];
    const imageWidget = this.view.imgCarousel;
    var damAvailable = voltmx.store.getItem("isDamAvailable");
   
    imageWidget.imageWhileDownloading = "loading.gif";
    
    if (image && image.file_url) {
      if (!damAvailable) {
        imageWidget.src = "noimage.png";
      } else {
        imageWidget.src = isValidURL(image.file_url) ? image.file_url : "noimage.png";
      }
    } else {
      imageWidget.src = "noimage.png";
    }
  } else {
    this.view.imgCarousel.src = "noimage.png";
  }
},

  showImageMultiple: function(index) {
  try {
    const imageWidget = this.view.imgCarouselMultipleImages;
    imageWidget.imageWhileDownloading = "loading.gif";

    if (Array.isArray(this.filteredImages) && this.filteredImages.length > 0) {
      var imageObj = this.filteredImages[index];

      if (imageObj && imageObj.file_url) {
        var url = imageObj.file_url;

        var damAvailable = voltmx.store.getItem("isDamAvailable");
        if (!damAvailable) {
          imageWidget.src = "noimage.png";
        } else {
          imageWidget.src = isValidURL(url) ? url : "noimage.png";
        }

      } else {
        imageWidget.src = "noimage.png";
      }
    } else {
      imageWidget.src = "noimage.png";
    }
  } catch (e) {
    voltmx.print("Error in showImageMultiple: " + e.message);
    this.view.imgCarouselMultipleImages.src = "noimage.png";
  }
},


  setCarDetails: function(item) {
    if(item.object_id){
      voltmx.store.setItem("objectIdForVI",item.object_id );
    }
    else{
      voltmx.store.removeItem("objectIdForVI");
    }
    
    if(item.rsa && item.rsa.toLowerCase() === "true")
      {
        voltmx.store.setItem("isRSA",true);
      }
    else{
      voltmx.store.setItem("isRSA",false);
    }
    if(item.bc && item.bc.toLowerCase() === "true")
      {
         voltmx.store.setItem("isBC",true);
      }
    else{
      voltmx.store.setItem("isBC",false);
    }
    if(item.ci && item.ci.toLowerCase() === "true")
      {
        voltmx.store.setItem("isCI",true);
      }
    else{
      voltmx.store.setItem("isCI",false);
    }
    this.view.lblCarName.text = item.title || "N/A";
    this.view.lblLocation.text = item.location || "N/A";
    this.view.lblLotID.text = item.lot_no || "N/A";
    voltmx.store.setItem("aucIDForRefresh",item.auction_id);
    if(item.lot_no){
      voltmx.store.setItem("lotIdForVI",item.lot_no);//for VI service
    }
    else{
      voltmx.store.removeItem("lotIdForVI");
    }
    
     if(item.object_id){
      voltmx.store.setItem("objidForVI",item.object_id); //for VI service
    }
    else{
      voltmx.store.removeItem("objidForVI");
    }

    this.view.lblDistance.text = item.milage ? item.milage  : "N/A";
    this.view.lblAutomatic.text = item.transmission_type || "N/A";
    this.view.lblPetrol.text = item.fuel_type || "N/A";
    this.view.lblBidAmount.text = item.max_bid_amount ? "AED "+ Number(item.max_bid_amount).toLocaleString("en-AE") : "N/A";
    
    this.view.lblTotalBidsAmount.text = item.no_of_bids || "N/A";
    //     this.view.lblRecoBidAmount.text = item.recommended_bid || "N/A";
    //     this.view.lblRetailValueBidAmount.text = item.retain_value || "N/A";
    this.view.lblBodyStyleName.text = item.body_type || "N/A";
    this.view.lblFuelTypeName.text = item.fuel_type || "N/A";
    this.view.lblLocationName.text = item.location || "N/A";
    this.view.lblyearText.text = item.year_make || "N/A";

    this.view.lblMileageAmount.text = item.milage || "N/A";
    
   var currentYear = new Date().getFullYear();

if (item.year_make) {
    var carYear = Number(item.year_make);
    var age = currentYear - carYear;

    if (item.milage) {
        var mileageParts = item.milage.split(" ");
        var mileageValue = parseFloat(mileageParts[0]); 

        
        var avgPerYear = age > 0 ? (mileageValue / age) : mileageValue;
      var mileageType = item.mileage_type || "KM";
      this.view.lblAvgPerYear.text = 
    "Average per year: " + avgPerYear.toFixed(2) + " " + mileageType + " (Expected 30,000 " + mileageType + "/year)";
//        this.view.lblAvgPerYear.text = "Average per year: " + avgPerYear + " "+item.mileage_type + " (Expected 30,000 KM/year)";
        voltmx.print("Average per year: " + avgPerYear + " " + (mileageParts[1] || ""));
      
      var percentage = Math.min((avgPerYear / 30000) * 100, 100); // Cap at 100%

        // Set flex width
        this.view.flxInnerBarSellerOrBuyer.width = percentage + "%";
      
      if (avgPerYear !== undefined && avgPerYear !== null) {
    if (avgPerYear < 30000) {
        this.view.lblLow.setVisibility(true);
        this.view.lblMedium.setVisibility(false);
        this.view.lblHigh.setVisibility(false);
    } else if (avgPerYear === 30000) {
        this.view.lblLow.setVisibility(false);
        this.view.lblMedium.setVisibility(true);
        this.view.lblHigh.setVisibility(false);
    } else {
        this.view.lblLow.setVisibility(false);
        this.view.lblMedium.setVisibility(false);
        this.view.lblHigh.setVisibility(true);
    }
} else {
    // avgPerYear is missing
    this.view.lblLow.setVisibility(false);
    this.view.lblMedium.setVisibility(false);
    this.view.lblHigh.setVisibility(false);
    voltmx.print(" avgPerYear is undefined or null, hiding all labels.");
}

    }
}





    
    this.view.lblTransmissionValue.text = item.transmission_type || "N/A";
    this.view.lblExteriorColor.text = item.colors || "N/A";
    this.view.lblInteriorColor.text = item.colors || "N/A"; // Adjust if you have separate fields
    this.view.lblDriveTypeValue.text = item.media || "N/A";
    this.view.lblEngineType.text = item.no_of_cylinders || "N/A";
    this.view.lblVehicleNoteBodyText.text = item.note_en || "N/A";
    this.view.lblVehicleNoteAr.text = item.note_ar || "N/A";
    this.view.lblAddressLoc.text = item.location || "N/A";
    this.view.lblChassisVal.text = item.chassis_number || "N/A";
    this.view.lblTaxAddVal.text = item.tax_added || "N/A";
    this.view.lblAdmValue.text = item.buyer_expense || "N/A";
//       item.administrative_fees || "N/A";
    this.view.lblOnwershipval.text = item.ownership || "N/A";
    this.view.lblDDVal.text = item.document || "N/A";
    this.view.lblGeneralSpecval.text = item.general_specification || "N/A";
    this.view.lblTowval.text = item.type_of_wheels || "N/A";
    this.view.lblMediaVal.text = item.vehicle_type || "N/A";
    this.view.lblHPVal.text = item.horse_power || "N/A";
    this.view.lblDoorsVal.text = item.no_of_doors ||"N/A";
//     this.view.lblHighMileage.text = "This vehicle has a High mileage at: " + item.milage || "";
      this.view.lblHighMileage.text = voltmx.i18n.getLocalizedString("Vehicle Condtion Analysis");


//     this.view.lblAvgPerYear.text = "Average per year: " + item.milage || "";
    if(item && item.bid_close_date){
        var userTargetTime = convertUTCtoUserTime(item.bid_close_date);
  this.timeLeft(userTargetTime);
//       this.timeLeft(item.bid_close_date);
    }

    var coords = null;

    if (item.location_map && item.location_map.includes(",")) {
      coords = item.location_map.split(",");
    }

    if ((!coords || coords.length < 2 || !coords[0] || !coords[1]) && item.location) {
      if (item.location.trim().toLowerCase() === "sharjah") {
        coords = ["25.3463", "55.4209"];
      } else if (item.location.trim().toLowerCase() === "abu dhabi") {
        coords = ["24.4539", "54.3773"];
      }
    }

    if (coords && coords.length >= 2 && coords[0] && coords[1]) {
      if (this.view && this.view.mapLocation) {
        this.view.mapLocation.locationData = [
          {
            lat: coords[0].trim(),
            lon: coords[1].trim(),
            name: item.location || "",
            desc: item.location || "",
            showcallout: true
          }
        ];

        var self = this;

        try {
          voltmx.timer.cancel("zoomMapTimerFleet");
        } catch (e) {

        }

        // Delay zoom and center to avoid map not yet rendering
        voltmx.timer.schedule("zoomMapTimerFleet", function () {
          if (self.view && self.view.mapLocation) {
            self.view.mapLocation.zoomLevel = 12;
            self.view.mapLocation.centerLocation = {
              lat: coords[0].trim(),
              lon: coords[1].trim()
            };
          }
        }, 1, false);  
      }
    }



    // this.view.mapLocation.setLocationData(locationData);

    if(item.is_favourite === "true"){
      this.view.imgFav.src = "heartlikerecommended.png";
    }
    else
    {
      this.view.imgFav.src = "favfleetdislike.png";
    }
  },

//   timeLeft: function (endTimeStr) {
//     // Cancel existing timer if any
// //     endTimeStr = "2025-10-14 06:20:00.0";
//     if (this._auctionTimerId1) {
//       voltmx.timer.cancel(this._auctionTimerId1);
//     }

//     var self = this;
//     this._auctionTimerId1 = "AUCTION_TIMER_FLEET";

//     // Parse bid_close_date string into Date object
//     var endTime = new Date(endTimeStr.replace(/-/g, "/")); 

//     voltmx.timer.schedule(this._auctionTimerId1, function () {
//       var now = new Date().getTime();
//       var remaining = endTime.getTime() - now;

//       if (remaining <= 0) {
//         self.view.lblTimeCount.text = "Time Left : 00:00:00";
//         voltmx.timer.cancel(self._auctionTimerId1);
//         return;
//       }

//       var seconds = Math.floor((remaining / 1000) % 60);
//       var minutes = Math.floor((remaining / (1000 * 60)) % 60);
//       var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
//       var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

//       function pad(n) {
//         return n < 10 ? "0" + n : n;
//       }

//       var formatted = `Time Left : ${days}D:${pad(hours)}H:${pad(minutes)}M:${pad(seconds)}S`;
//       self.view.lblTimeCount.text = formatted;
//     }, 1, true); // every second
//   },

  timeLeft: function (endTime) {
  if (this._auctionTimerId1) {
    voltmx.timer.cancel(this._auctionTimerId1);
  }

  var self = this;
  this._auctionTimerId1 = "AUCTION_TIMER_FLEET";

  // Ensure endTime is a Date
  var endTimeDate = (endTime instanceof Date) ? endTime : new Date(endTime);

  voltmx.timer.schedule(this._auctionTimerId1, function () {
    var now = new Date().getTime();
    var remaining = endTimeDate.getTime() - now;

    if (remaining <= 0) {
      if(self.view.lblTimeCount){
      self.view.lblTimeCount.text = "Time Left : 00:00:00";
      }
      voltmx.timer.cancel(self._auctionTimerId1);
      return;
    }

    var seconds = Math.floor((remaining / 1000) % 60);
    var minutes = Math.floor((remaining / (1000 * 60)) % 60);
    var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

    function pad(n) {
      return n < 10 ? "0" + n : n;
    }

    var formatted = `Time Left : ${days}D:${pad(hours)}H:${pad(minutes)}M:${pad(seconds)}S`;
    if(self.view.lblTimeCount){
    self.view.lblTimeCount.text = formatted;
    }
  }, 1, true); // every second
},
  
  invokeFleetDetails: function()
  {
    var self = this;

    function fleetDetailsCallBack(status, fleet_details) {
      voltmx.print(fleet_details);
      var canModifyFlxBids = self.initialFlxBidsVisible !== false;

    if (canModifyFlxBids) {
      self.view.flxBids.setVisibility(true);
    }
      if (
  fleet_details &&
  fleet_details.meta_data &&
  Array.isArray(fleet_details.meta_data) &&
  fleet_details.meta_data[0] &&
  fleet_details.meta_data[0].auction_type_id &&
  typeof fleet_details.meta_data[0].auction_type_id === "string" &&
  fleet_details.meta_data[0].auction_type_id.includes("4")
) {
   self.isSilent = true;
    self.view.flxFav.setVisibility(true);
//    self.view.flxBids.skin = "sknFlxBasic";
//    self.view.flxBids.layoutType = voltmx.flex.FREE_FORM;
//     self.view.flxTotalBids.setVisibility(false);
//     self.view.flxCurrentBid.centerX = "50%";
//     self.view.flxCurrentBid.skin = "CopyslFbox0c14d6a2daf7d49";
    self.view.lblCurrentBid.text = voltmx.i18n.getLocalizedString("Your Bid Amount");
    self.view.lblBidAmount.skin = "sknLblDubai0d74b514pxbold";
        
      if(  fleet_details.meta_data &&
  fleet_details.meta_data[0]  && Number(fleet_details.meta_data[0].max_bid_amount) === 0)
        {
          self.view.flxBids.setVisibility(false);
        }
       
} else {
  self.isSilent = false;
   self.view.flxFav.setVisibility(true);
//   self.view.flxBids.setVisibility(true);
//   self.view.flxBids.skin = "sknflxBGf4f4f4Bordere6e7e8RoundedCorner";
//    self.view.flxBids.layoutType = voltmx.flex.FLOW_HORIZONTAL;
//     self.view.flxTotalBids.setVisibility(true);
  self.view.flxCurrentBid.centerX = "";
  self.view.lblCurrentBid.text = voltmx.i18n.getLocalizedString("Highest Bid");
//   self.view.lblBidAmount.skin = "sknLblDubai61b35c14pxbold";
  
  if(fleet_details.meta_data && fleet_details.meta_data[0] && fleet_details.meta_data[0].highest_bidder === self.userid)
    {
      self.view.lblBidAmount.skin = "sknLblDubai61b35c14pxbold";
    }
  else
    {
      self.view.lblBidAmount.skin = "sknLblDubaid3243714pxBold";
    }
  //highest_bidder
  //sknLblDubaid3243714pxBold give this skin for normal bidder and green for highest bidder
}
      
      if(fleet_details.meta_data){
        self.assignValuesToFieldsFromContext(fleet_details.meta_data[0],fleet_details);
        self.metadata = fleet_details.meta_data[0];
        self.fleetDetails = fleet_details;
        if( fleet_details.meta_data[0].category_id){
          self.invokeSimilarVehicles(fleet_details.meta_data[0].category_id,fleet_details.meta_data[0].auction_type_id);
        }
        self.getActiveAuctionBids();
      }
    }
    if (fleet_details_inputparam == undefined) {
      var fleet_details_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var jobtitle = voltmx.store.getItem("jobTitle");
    var mode = voltmx.store.getItem("mode");
//     var currentLocale = voltmx.store.getItem("currentLocale");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    fleet_details_inputparam["serviceID"] = "fry_int_common$fleet-details";
    fleet_details_inputparam["object_id"] = self.objid;
    fleet_details_inputparam["auction_id"] = self.aucid;
    fleet_details_inputparam["job_title"] = jobtitle;
    fleet_details_inputparam["user_id"] = userid ? userid : "";
    fleet_details_inputparam["language"] = currentLocale || "en";
    fleet_details_inputparam["plaform"] = "Mobile";
    fleet_details_inputparam["user_mode"] = mode || "";

    //     fleet_details_inputparam["operation_id"] = 
    //     fleet_details_inputparam["plaform"] = 


    var fleet_details_httpheaders = {};
    fleet_details_inputparam["httpheaders"] = fleet_details_httpheaders;
    var fleet_details_httpconfigs = {};
    fleet_details_inputparam["httpconfig"] = fleet_details_httpconfigs;
    fry_wf$fleet_details = mfintegrationsecureinvokerasync(fleet_details_inputparam, "fry_int_common", "fleet-details", fleetDetailsCallBack);

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
          this.damUnavailable = true;
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

  hideMultipleImagesflex: function() {
    try {
      if (this.view && this.view.flxScrollMain) {
        this.view.flxScrollMain.setVisibility(true);
      }
      if (this.view && this.view.flxMultipleImages) {
        this.view.flxMultipleImages.setVisibility(false);
      }
      //     if (this.view && this.view.flxWhatsappcomponent) {
      //       this.view.flxWhatsappcomponent.setVisibility(true);
      //     }
      if (this.view && this.view.flxBidNowButton) {
        this.view.flxBidNowButton.setVisibility(true);
      }
    } catch (e) {
      voltmx.print("Error in hideMultipleImagesflex: " + e.message);
    }
  },

  showMultipleImagesflex: function() {
     this.zoomed = false;
        this.lastTapTime = 0;
    
     this.zoomStep = 40;       // dp increment per click
    this.maxWidth = 500;      // maximum zoom width
    this.maxHeight = 550;     // maximum zoom height
    this.minWidth = 240;      // minimum width (original)
    this.minHeight = 240;     // minimum height (original)
   

    try {
      if (typeof this.showImageMultiple === "function") {
        this.showImageMultiple(this.currentImageIndex);
      }

      if (this.view && this.view.flxScrollMain) {
        this.view.flxScrollMain.setVisibility(false);
      }
      if (this.view && this.view.flxMultipleImages) {
        this.view.flxMultipleImages.setVisibility(true);
      }
      //     if (this.view && this.view.flxWhatsappcomponent) {
      //       this.view.flxWhatsappcomponent.setVisibility(false);
      //     }
      if (this.view && this.view.flxBidNowButton) {
        this.view.flxBidNowButton.setVisibility(false);
      }
      
        // Set up double-tap on the image widget
//         this.view.imgCarouselMultipleImages.onTouchEnd = function() {
//             const currentTime = new Date().getTime();
//             if (currentTime - this.lastTapTime < 300) { // double-tap detected
//                 this.toggleImageZoom();
//             }
//             this.lastTapTime = currentTime;
//         }.bind(this);
    } catch (e) {
      voltmx.print("Error in showMultipleImagesflex: " + e.message);
    }
  },
  
  zoomIn: function() {
  const img = this.view.imgCarouselMultipleImages;
    this.normalizeToSquare(img);
  let w = parseInt(img.width.replace("dp",""));
  let h = parseInt(img.height.replace("dp",""));

  let targetWidth = Math.min(w + this.zoomStep, this.maxWidth);
  let targetHeight = Math.min(h + this.zoomStep, this.maxHeight);

  this.animateImageZoom(img, targetWidth, targetHeight);
},

zoomOut: function() {
  const img = this.view.imgCarouselMultipleImages;
  this.normalizeToSquare(img);
  let w = parseInt(img.width.replace("dp",""));
  let h = parseInt(img.height.replace("dp",""));

  let targetWidth = Math.max(w - this.zoomStep, this.minWidth);
  let targetHeight = Math.max(h - this.zoomStep, this.minHeight);

  this.animateImageZoom(img, targetWidth, targetHeight);
},

  normalizeToSquare: function(img) {
  let w = parseInt(img.width.replace("dp",""));
  let h = parseInt(img.height.replace("dp",""));

  // pick the smaller dimension to avoid distortion
  let size = Math.min(w, h);

  img.width = size + "dp";
  img.height = size + "dp";
},

  
animateImageZoom: function(img, targetWidth, targetHeight) {
  img.centerX = "50%";
  img.centerY = "50%";

  const animationDef = {
    0: { width: img.width, height: img.height },
    100: { width: targetWidth + "dp", height: targetHeight + "dp" }
  };

  const animConfig = {
    duration: 0.3,
    iterationCount: 1,
    fillMode: kony.anim.FILL_MODE_FORWARDS
  };

  const animation = kony.ui.createAnimation(animationDef);
  img.animate(animation, animConfig, {});
},

//   toggleImageZoom: function() {
//   const imageWidget = this.view.imgCarouselMultipleImages;

//   if (!imageWidget) return;

//   let targetWidth, targetHeight;

//   if (!this.zoomed) {
//     // Zoom in (e.g., 2x)
//     targetWidth = "200%";
//     targetHeight = "200%";
//   } else {
//     // Zoom out (original size)
//     targetWidth = "100%";
//     targetHeight = "100%";
//   }

//   const animationDef = {
//     0: { width: imageWidget.width, height: imageWidget.height },
//     100: { width: targetWidth, height: targetHeight }
//   };

//   const animConfig = {
//     duration: 0.3, // seconds
//     iterationCount: 1,
//     fillMode: kony.anim.FILL_MODE_FORWARDS
//   };

//   const animation = kony.ui.createAnimation(animationDef);
//   imageWidget.animate(animation, animConfig, {});

//   this.zoomed = !this.zoomed; // toggle state
// },
  
  openBidAmountContainerFromFleet: function(){
    var self = this;
    self.aucid = null;
    self.objid = null;
    var isLogin = voltmx.store.getItem("isLogin");
    this.view.flxScrollBidAmount.removeAll();
    self.fromFlex = false;
    if(isLogin)
    {
      
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      this.view.btnBidNow.setEnabled(true);
     
      //        if(self.mode !== "seller"){
      if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || self.mode !== "seller"){
        try {
        if(self.isSilent){
           self.view.flxAutoBidandAmounts.setVisibility(false);
         self.view.tbxBidAmount.setEnabled(true);
//           self.view.lblSelectIncrement.text = "Minimum Bid Amount:" + self.metadata.min_bid_amount;
          self.view.lblSelectIncrement.setVisibility(false);
//           self.minAmount = self.metadata.min_bid_amount;
//            self.view.lblSelectIncrement.skin = "sknLblDubai231f2016pxBold";
        }
        else{
           self.view.flxAutoBidandAmounts.setVisibility(true);
         self.view.tbxBidAmount.setEnabled(false);
          self.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Select the Increment");
           self.view.lblSelectIncrement.skin = "sknLblDubai75778620pxBold";
        }

//         if(self.metadata && self.metadata.highest_bidder && self.metadata.highest_bidder !== self.userid){
//         if(self.metadata && self.metadata.highest_bidder !== self.userid){
          self.aucid = self.metadata.auction_id;
          self.objid = self.metadata.object_id;
          self.objIdForAutoBid =self.metadata.object_id;
          self.aucIdForAutoBid = self.metadata.auction_id;
          self.currentAmount = Number(self.metadata.max_bid_amount);

          getBidDetailsByObjectId(self.objid, self.aucid, function(response) {
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

          //       self.createChipSetRelated(self.currentAmount);
          self.view.flxBidAmountSelectionContainer.setVisibility(true);
          //       self.view.imgCheck.setVisibility(false);
          //     self.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          //     self.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          //     self.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          self.view.tbxBidAmount.text = "";
          self.view.imgCheck.setVisibility(false);
          self.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
          self.view.flxOverLay.setVisibility(true);
//         }
//         else{
//            self.view.SmthngWentWrong.setVisibility(true);
//            self.view.SmthngWentWrong.lblSomethingWentWrong.text = "You're the highest bidder!";
//         }
        }
        catch(e) {
        voltmx.print("  " + e);
    }
      }
      else{
        self.view.flxOverLay.setVisibility(true);
        self.view.flxWarning.setVisibility(true);
        //           alert("You are Seller. Switch to Buyer to use this feature");
      }
    }
    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },

  openBidAmountContainer: function(params){
    var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
    this.view.flxScrollBidAmount.removeAll();
    
    if(isLogin)
    {
      //        if(this.mode !== "seller"){
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      
      this.view.flxAutoBidandAmounts.reverseLayoutDirection = isArabic;
      this.view.flxScrollBidAmount.reverseLayoutDirection = isArabic;
      this.view.flxBidAmountEnterBox.reverseLayoutDirection = isArabic;
      this.view.flxAcknowledge.reverseLayoutDirection = isArabic;
      this.view.btnBidNow.setEnabled(true);
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
      
      if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){
        //currentWorking
        self.isSilent = params.isSilent;
        if(params.isSilent){
           self.view.flxAutoBidandAmounts.setVisibility(false);
         self.view.tbxBidAmount.setEnabled(true);
//           self.view.lblSelectIncrement.text = "Minimum Bid Amount:" + self.metadata.min_bid_amount;
          self.view.lblSelectIncrement.setVisibility(false);
//           self.minAmount = self.metadata.min_bid_amount;
//            self.view.lblSelectIncrement.skin = "sknLblDubai231f2016pxBold";
        }
        else{
           self.view.flxAutoBidandAmounts.setVisibility(true);
         self.view.tbxBidAmount.setEnabled(false);
          self.view.lblSelectIncrement.setVisibility(true);
          self.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Select the Increment");
           self.view.lblSelectIncrement.skin = "sknLblDubai75778620pxBold";
        }
      if (params && this.userid) {
      
//         this.view.flxAutoBidandAmounts.setVisibility(true);
//          this.view.tbxBidAmount.setEnabled(false);
          this.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Select the Increment");
           this.view.lblSelectIncrement.skin = "sknLblDubai75778620pxBold";
//         if (params && params.highest_bidder && this.userid && params.highest_bidder !== this.userid) {
        if (params.highest_bidder !== this.userid){
         this.aucid = null;
         this.objid = null;
          this.fromFlex = true;
          this.aucid = params.auction_id;
          this.objid = params.object_id;
          this.objIdForAutoBid = params.object_id;
          this.aucIdForAutoBid = params.auction_id;
          this.currentAmount = Number(params.max_bid_amount);
          this.selectedID = params.ID;
          this.currentIndex = params.currentIndex;



          // amount changes every time when bid,so wrote like this to get amount+hike (updated one) every time.
          var lblId = "lblBidRate" + this.currentIndex;
          if (this.view[lblId]) {
            var amountText = this.view[lblId].text;   // "AED 23500.00" for understanding 
            var amountOnly = amountText.replace("AED", "").trim();  // "23500.00"
            //       this.currentAmount = Number(amountOnly); 
          }
          //     this.createChipSetRelated(amountOnly);

          var self = this;
          getBidDetailsByObjectId(self.objid, self.aucid, function(response) {
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
          //     this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          //     this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          //     this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
          this.view.tbxBidAmount.text = "";
          this.view.flxOverLay.setVisibility(true);
        }
      
        else{
          self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = "You're the highest bidder!";
        }
      }
      }
      else{

        this.view.flxOverLay.setVisibility(true);
        this.view.flxWarning.setVisibility(true);

      }
    }

    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
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

  //    createChipSetRelated: function(amountOnly) {
  //     var self = this;
  //     this.view.flxScrollBidAmount.removeAll();

  //   if (amountOnly <= 20000) {

  //     var bidAmounts = ["100", "200", "500", "1000", "3000", "5000"];
  //    }
  //    else if (amountOnly > 20000 && amountOnly <= 50000) {
  //      var bidAmounts = ["200", "500", "1000", "3000", "5000"];
  //    }
  //    else if (amountOnly > 50000 && amountOnly <= 200000) {
  //       var bidAmounts = ["500", "1000", "3000", "5000"];
  //    }
  //    else if (amountOnly > 200000){
  //      var bidAmounts = ["5000", "10000", "15000", "50000"];
  //    }
  //    if(amountOnly)
  //     this.dynamicBidButtons = {};  // Store references to buttons
  //   if(bidAmounts){
  //     bidAmounts.forEach(function(amount, index) {
  //         var btnId = "btn" + amount + "AED";
  //         var btn = new voltmx.ui.Button({
  //             "centerY": "50%",
  //             "height": "100%",
  //             "id": btnId,
  //             "isVisible": true,
  //             "left": index === 0 ? "5%" : "2%",
  //             "skin": "sknBtnCCCCCCBorderDubai75778620px",
  //             "text": "+" + amount + " AED",
  //             "top": "0dp",
  //             "width": voltmx.flex.USE_PREFERRED_SIZE,
  //             "onClick": self.selectBidAmountAddIntoTextBox.bind(self, amount)
  //         }, {
  //             "contentAlignment": constants.CONTENT_ALIGN_CENTER,
  //             "displayText": true,
  //             "padding":  [5, 0, 5, 0],
  //             "paddingInPixel": false
  //         }, {});

  //         self.dynamicBidButtons[amount] = btn; // Save reference
  //         self.view.flxScrollBidAmount.add(btn);
  //     });
  //   }
  // },

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
          
          if(auction_bidding &&
    auction_bidding.opstatus === 0 &&
    auction_bidding.auction_bidding_reponse &&
    auction_bidding.auction_bidding_reponse[0] &&
    auction_bidding.auction_bidding_reponse[0].records &&
    auction_bidding.auction_bidding_reponse[0].records[0])
          {
            
            var record = auction_bidding.auction_bidding_reponse[0].records[0];
            var msg = auction_bidding.message;
            if(msg && msg.toLowerCase().includes("accepted")){
//             if (record.status_code && record.status_code.toLowerCase() === "success") {
              if (self.view.lblSuccessMsg) {
                self.view.lblSuccessMsg.text = "Your Bid Has Been Placed Successfully";
              }
              self.view.flxBidSuccessPopup.setVisibility(true);
              self.closeBidAmountContainer();
              self.view.flxOverLay.setVisibility(true);
              //           self.updateSegmentWithUpdatedBidRate(); IN place of this need to update flex
              //           new voltmx.mvc.Navigation("frmAllAuctions").navigate();
              if(self.fromFlex){
                var bidAmount = self.view.tbxBidAmount.text.trim();
                var lblId = "lblBidRate" + self.currentIndex;
                var flxId = "flxBidAmount" + self.currentIndex;
                if (self.view[lblId]) {
                  self.view[lblId].text = bidAmount;
                  if(self.isSilent)
                    {
                  self.view[lblId].skin = "sknLblDubai0d74b520pxbold";
                    }
                  else
                    {
                      self.view[lblId].skin = "sknLblDubai02905120pxBold";
                    }
                }
                
                   if (self.view[flxId]) {
    if (self.isSilent && (!bidAmount || bidAmount === "0")) {
        self.view[flxId].setVisibility(false);
    } else {
        self.view[flxId].setVisibility(true);
    }
}

              }
              else{
                self.invokeFleetDetails();
              }
              
              if(!self.isSilent)
                  {
                eventAuctionBid(self.aucid,self.objid);
                  }
            }
            else if(msg){
             self.closeBidAmountContainer();
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
            }
            else {
             self.closeBidAmountContainer();
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Something went wrong. Please try again.";
            }
          }
         else {
        if (auction_bidding && auction_bidding.opstatus === 1011) {
            self.closeBidAmountContainer();
//             self.view.flxError.setVisibility(true);
        } else {
            self.closeBidAmountContainer();
            self.view.SmthngWentWrong.setVisibility(true);
            self.view.SmthngWentWrong.lblSomethingWentWrong.text =
                msg || "Something went wrong. Please try again.";
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
        if(self.isSilent){
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
//         alert('select check box..!');
      } 
    }
    else{
//       alert('text box should not be empty');
    }
  },

  //   //old one working for without session by teju...
  //   onDownloadButtonClick: function () {
  //   if (this.fleetDetails.fleet_images) {
  //     try {

  //       // Find the first file with type "3rd-Party"
  //       var fleetimages = this.fleetDetails.fleet_images;
  //       var thirdPartyFile = fleetimages.find(function(item) {
  //         return item.file_type === "3rd-Party";
  //       });

  //       if (thirdPartyFile && thirdPartyFile.file_url) {
  //         var fileUrl = thirdPartyFile.file_url;
  //         var fileName = thirdPartyFile.file_name;

  //         // Proceed to download
  //         var DownloadClass = java.import("com.example.pdffiledownload.FileDownloadHandler");
  //         var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

  //         DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
  // //         alert("Download started for: " + fileName);
  //       } else {
  //         alert("No 3rd-Party report file found to download.");
  //       }
  //     } catch (e) {
  //       alert("Download error: " + e.message);
  //     }
  //   } else {
  //     alert("No Report Available");
  //   }
  // },

  onDownloadButtonClick: function () {
    var self = this;
    var fleetImages = this.fleetDetails && Array.isArray(this.fleetDetails.fleet_images)
    ? this.fleetDetails.fleet_images
    : null;

    if (fleetImages) {
      try {
        // Find the first file with type "3rd-Party"
        var thirdPartyFile = fleetImages.find(function (item) {
          return item && item.file_type === "3rd-Party";
        });

        if (thirdPartyFile && thirdPartyFile.file_url && thirdPartyFile.file_name) {
          var fileUrl = thirdPartyFile.file_url;
          var fileName = thirdPartyFile.file_name;
          fileName = "Technical Report_" + Date.now();

          try {
            // Proceed to download using Java interop
            var DownloadClass = java.import("com.example.pdffiledownload.FileDownloadHandler");
            var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

            DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
            // Optionally show confirmation to user
            // voltmx.ui.Alert("Download started for: " + fileName);
          } catch (downloadError) {
            self.showToast("Download failed: " + downloadError.message);
          }
        } else {
          self.showToast("No Technical report found to download.");
        }
      } catch (e) {
        self.showToast("Unexpected error while checking files: " + e.message);
      }
    } else {
      self.showToast("No report files available.");
    }
  },

  showToast: function(message) {
    var platform = voltmx.os.deviceInfo().name.toLowerCase();

    if (platform === "android") {
      var toast = new voltmx.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT,
        alignConfig: {
          widget: voltmx.application.getCurrentForm(),
          position: constants.TOAST_POS_BOTTOM // or TOAST_POS_TOP / CENTER
        }
      });
      toast.show();
    } else if (platform === "iphone" || platform === "ipad") {
      alert(message);
    } else {
      // Fallback for other platforms (optional)
      voltmx.print("Toast not supported on this platform: " + platform);
    }
  },


  testPDFNFIDownload: function()
  {

    if (this.fleetDetails.fleet_images) {
      try {
        // Find the first file with type "3rd-Party"
        var fleetimages = this.fleetDetails.fleet_images;
        var thirdPartyFile = fleetimages.find(function(item) {
          return item.file_type === "3rd-Party";
        });

        if (thirdPartyFile && thirdPartyFile.file_url) {
          var fileUrl = thirdPartyFile.file_url;
          var fileName = thirdPartyFile.file_name;
          fileName = "Technical Report_" + Date.now();

          // Proceed to download
          var FileDownloadHandlerNFI = objc.import("PDFDownloadNFI");
          var DownloadPDFViewController = objc.import("DownloadPDFViewController");
          if (!DownloadPDFViewController) {
            voltmx.print("Error: Failed to import PDFDownloadNFI");
          }
          else{
            var downloadObject = DownloadPDFViewController.alloc().jsinit();
            downloadObject.downloadAndPreviewPDFFileName(fileUrl,fileName);
          }

          //         alert("Download started for: " + fileName);
        } else {
          alert("No Technical report found to download.");
        }
      } catch (e) {
        alert("Download error: " + e.message);
      }
    }
    else {
      alert("No Report Available");
    }


  },


  //   onDownloadButtonClick: function () {
  //   if (this.fleetDetails.fleet_images) {
  //     try {
  //       var fleetimages = this.fleetDetails.fleet_images;
  //       var thirdPartyFile = fleetimages.find(function(item) {
  //         return item.file_type === "3rd-Party";
  //       });

  //       if (thirdPartyFile && thirdPartyFile.file_url) {
  //         var fileUrl = thirdPartyFile.file_url;
  //         var fileName = thirdPartyFile.file_name;

  //         // Step 1: Ensure session is valid
  //         var self = this;
  //         self.checkSession(function () {
  //           var sessionCookie = self.sessionCookie;
  //           var cleanedCookie = sessionCookie.split(";")[0];
  //           // Step 2: Get activity context
  //           var FileDownloadHandler = java.import("com.example.alluploadfilestest.TestAllfiles");
  //           var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

  //           // Step 3: Call the new NFI method
  //           FileDownloadHandler.downloadFileWithAuth(ActivityContext, fileUrl, fileName, cleanedCookie);
  //         });

  //       } 
  //       else {
  //         alert("No 3rd-Party report file found to download.");
  //       }
  //     } catch (e) {
  //       alert("Download error: " + e.message);
  //     }
  //   } else {
  //     alert("No Report Available");
  //   }
  // },
  //   onDownloadButtonClick: function () {
  //   try {
  //     var fileUrl = "https://dev-hcltx.et.ae/dx/api/dam/v1/collections/e3ad7524-682d-499c-842b-ac18f52f624f/items/a4ed5bd3-2a36-4690-8d43-861e61d998ab?binary=true";
  //     var fileName = "SampleReport.pdf"; // Give any name with extension

  //     var self = this;
  //     // Ensure session is valid and get cookie
  //     self.checkSession(function () {
  //       var sessionCookie = self.sessionCookie;
  //       var cleanedCookie = sessionCookie.split(";")[0]; // Usually "LtpaToken2=..."

  //       // Load the NFI class and context
  //       var FileDownloadHandler = java.import("com.example.alluploadfilestest.TestAllfiles");
  //       var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

  //       // Call the native function with hardcoded URL
  //       FileDownloadHandler.downloadFileWithAuth(ActivityContext, fileUrl, fileName, cleanedCookie);
  //     });

  //   } catch (e) {
  //     alert("Download error: " + e.message);
  //   }
  // },

  closeBidAmountContainer: function(){
    this.view.flxBidAmountSelectionContainer.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },

  //   invokeAutoBidFunction: function()
  //   {
  //      if(this.view.tbxAutoBidAmount.text && this.view.tbxAutoBidAmount.text.trim() !== "")
  //        {
  //       var self = this;
  //     checkTokenValidatity(function() {
  //     function invokeServiceCallBack(status, register_auto_bidding) {
  //      if (register_auto_bidding && register_auto_bidding.opstatus === 0 && register_auto_bidding.records && register_auto_bidding.records.length > 0){
  //        self.view.flxAutoBidAmountContainer.setVisibility(false);

  //        if (self.view.lblSuccessMsg) {
  //          self.view.lblSuccessMsg.text = "Auto Bid Activated Successfully";
  //        }
  //        self.view.flxBidSuccessPopup.setVisibility(true);
  //      }
  //     }
  //     if (register_auto_bidding_inputparam == undefined) {
  //         var register_auto_bidding_inputparam = {};
  //     }
  //     var userid = voltmx.store.getItem("userId");
  //      var usertoken = voltmx.store.getItem("getUserAccesstoken");
  //     var maxBidAmount = self.view.tbxAutoBidAmount.text;
  //     register_auto_bidding_inputparam["serviceID"] = "fry_int_auctions$auction-register-auto-bid";
  //     register_auto_bidding_inputparam["auction_id"] = self.aucIdForAutoBid;
  //     register_auto_bidding_inputparam["bid_by"] = userid;
  //     register_auto_bidding_inputparam["bid_max_amount"] = maxBidAmount;
  // //     register_auto_bidding_inputparam["bid_min_value"] = "200";
  //     register_auto_bidding_inputparam["object_id"] = self.objIdForAutoBid;
  //     var register_auto_bidding_httpheaders = {
  //        "user_token":usertoken
  //     };
  //     register_auto_bidding_inputparam["httpheaders"] = register_auto_bidding_httpheaders;
  //     var register_auto_bidding_httpconfigs = {};
  //     register_auto_bidding_inputparam["httpconfig"] = register_auto_bidding_httpconfigs;
  //     fry_int_auctions$register_auto_bidding = mfintegrationsecureinvokerasync(register_auto_bidding_inputparam, "fry_int_auctions", "auction-register-auto-bid", invokeServiceCallBack);
  //     });  
  //     }
  //     else{
  //        alert('Enter Max. Bid Amount');
  //     }

  //   },
  invokeAutoBidFunction: function()
  {
   var self = this;
    if (this.view.tbxAutoBidAmount.text && this.view.tbxAutoBidAmount.text.trim() !== "") {

      
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

//             if (parsedResult && parsedResult.opstatus === 0 && parsedResult.res_status === "SUCCESS") {
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
      self.view.lblErrmsg.text = "Enter Max. Bid Amount";
    }
  },

  //     enableAutoBid: function(params){
  //     var isLogin = voltmx.store.getItem("isLogin");
  //     if(isLogin)
  //       {
  //     this.objIdForAutoBid = params.object_id;
  //     this.aucIdForAutoBid = params.auction_id;
  //    this.view.flxOverLay.setVisibility(true);
  //    this.view.flxAutoBidAmountContainer.setVisibility(true);
  //       }  
  //      else{
  //       var x = new voltmx.mvc.Navigation("frmLoginScreen");
  //       x.navigate();
  //     }
  //   },

  enableAutoBid: function(params) {
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
        callGetAutoBidRate(params.object_id, params.auction_id, function(status, response) {
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
//             self.view.btnActivate.setVisibility(!isActive);
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

          self.objIdForAutoBid = params.object_id;
          self.aucIdForAutoBid = params.auction_id;
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
      callGetAutoBidRate(self.objid, self.aucid, function(status, response) {
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

  invokeSimilarVehicles: function(catid,auctionTypeId)
  {
    var self = this;

    function invokeSimilarCallBack(status, get_buyer_similar_vehicles) {
      voltmx.print(get_buyer_similar_vehicles);

      var records = get_buyer_similar_vehicles && get_buyer_similar_vehicles.records ? get_buyer_similar_vehicles.records : [];

      if (records.length > 0) {
        self.records = records;
        self.isRecords = true;
        self.view.flxSimilarVehicles.setVisibility(true);
        self.view.flxLocationContainer.bottom = "0dp";
      } else {
        self.records = [];  // fallback to empty
        self.isRecords = false;
        self.view.flxSimilarVehicles.setVisibility(false);
        self.view.flxLocationContainer.bottom = "160dp";
      }

      // Always call create function after response
      self.view.flxScrollFilteredItems.removeAll(); 
      self.createsIntoSimilarVehicles();
    }
    if (get_buyer_similar_vehicles_inputparam == undefined) {
      var get_buyer_similar_vehicles_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var currentLocale = voltmx.store.getItem("currentLocale");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_similar_vehicles_inputparam["serviceID"] = "fry_int_buyer$get_buyer_similar_vehicles_proc";
    get_buyer_similar_vehicles_inputparam["user_id"] =  userid ? userid : "";
    get_buyer_similar_vehicles_inputparam["category_id"] = catid;
    get_buyer_similar_vehicles_inputparam["page_number"] = "1";
    get_buyer_similar_vehicles_inputparam["page_size"] = "10";
    if (auctionTypeId) {
    get_buyer_similar_vehicles_inputparam["auction_type"] = auctionTypeId;
  }
    get_buyer_similar_vehicles_inputparam["language"] = currentLocale || "en";
    get_buyer_similar_vehicles_inputparam["object_id"] = voltmx.store.getItem("lastObjId");
    var get_buyer_similar_vehicles_httpheaders = {
      "user_token": usertoken ? usertoken : ""
    };
    get_buyer_similar_vehicles_inputparam["httpheaders"] = get_buyer_similar_vehicles_httpheaders;
    var get_buyer_similar_vehicles_httpconfigs = {};
    get_buyer_similar_vehicles_inputparam["httpconfig"] = get_buyer_similar_vehicles_httpconfigs;
    fry_int_buyer$get_buyer_similar_vehicles = mfintegrationsecureinvokerasync(get_buyer_similar_vehicles_inputparam, "fry_int_buyer", "get_buyer_similar_vehicles_proc", invokeSimilarCallBack);

  },

  createsIntoSimilarVehicles: function() {
    voltmx.print("entered into function");
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   var damAvailable = voltmx.store.getItem("isDamAvailable"); 
    var parentFlex = this.view.flxScrollFilteredItems;
    parentFlex.reverseLayoutDirection = isArabic;
    this._countdownItems = [];
    //           parentFlex.removeAll();
    var records = this.isRecords ? this.records : [];
    var userid = voltmx.store.getItem("userId");
    for (var i = 0; i < records.length; i++) {
      var leftval = (i === 0) ? "20dp" : "10dp";
      var bidrateSkin;
      var autobidimg;
      //           if(records[i].winning_bidder === userid){
      //              bidrateSkin = "sknLblCronosProd0290512Bold22px";
      //           }
      //           else{
      //               bidrateSkin = "sknLblDubaid3243720pxbold";
      //           }
      var isSilent = false;
      if(records[i] && records[i].auction_type_id && records[i].auction_type_id.includes("4"))
        {
          isSilent = true;
        }
      
          let isYourBidVisible = false;
          if (records && records[i] && records[i].max_bid != null) {
  if (Number(records[i].max_bid) !== 0) {
    isYourBidVisible = true;
  }
}
      
      if (records[i] && records[i].winning_bidder === userid) {
        bidrateSkin = "sknLblCronosProd0290512Bold22px";
      } else {
        bidrateSkin = "sknLblDubaid3243720pxbold";
      }
     var silentSkin = "sknLblDubai0d74b520pxbold";
      if (records[i] && records[i].is_auto_bid === "true") {
        autobidimg = "autobidblue.png";
      } else {
        autobidimg = "autobidnewone.png";
      }

      var objid = records[i] && records[i].object_id ? records[i].object_id : "";
      var aucid = records[i] && records[i].auction_id ? records[i].auction_id : "";


      //            var objid = records[i].object_id;
      //       
      var flexskin;
      var imgheartset;
      //           if(records[i].is_favourite === "true"){
      //             flexskin = "sknFlxd32437custom120pxround";
      //             imgheartset = "heartlikerecommended.png";
      //           }
      //           else{
      //             flexskin = "sknFlx231f20custom120pxround";
      //             imgheartset = "imgdislikenew.png";
      //           }
      if (records[i] && records[i].is_favourite === "true") {
        flexskin = "sknFlxd32437custom120pxround";
        imgheartset = "heartlikerecommended.png";
      } else {
        flexskin = "sknFlx231f20custom120pxround";
        imgheartset = "imgdislikenew.png";
      }

      // Creating the main flex container for each widget

      var flexFeaturedAuctionsItem = new voltmx.ui.FlexContainer({
        id: "flexFeaturedAuctionsItem" + i,
//         left: leftval,
//         right: (i === 4) ? "15dp" : "", 
        left: isArabic ? ((i === records.length - 1) ? "15dp" : "") : leftval,
               right: isArabic ? leftval : ((i === records.length - 1) ? "15dp" : ""), 
        width: "275dp", 
        height: "100%",
        zIndex: 1,
        isVisible: true,
        //                 skin: "flxContainer45",
        //                 top: (i * 330) + "dp",
        skin: "sknFlxFFFFFFBorderCCCCCC2px",
        clipBounds: true

      }, {}, {});


      var flxFeaturedAuctionsItemTop = new voltmx.ui.FlexContainer({

        id: "flxFeaturedAuctionsItemTop" + i,
        centerX: "50%",
        height: "45%",
        width: "100%",
        zIndex:1,
        isVisible: true,
        top: "0%",
        skin: "sknFlxWhiteRoundedCorner",
        clipBounds: true  
      },{},{});

      var imgFeaturedAuctions = new voltmx.ui.Image2({
        id: "imgFeaturedAuctions" + i,
        isVisible: true,
        //                src : (isValidURL(records[i].file_url)) ? records[i].file_url : "noimage.png",
        src: (records[i] && records[i].file_url && damAvailable && isValidURL(records[i].file_url)) 
        ? records[i].file_url 
        : "noimage.png",

        imageWhileDownloading: "loading.gif",
        //               src: "car3.png",
        width: "100%", 
        height: "100%", 
        imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        clipBounds: true
      });
      
         imgFeaturedAuctions.onDownloadComplete = function(widgetRef, success) {
    if (!success) {
        voltmx.print("Falling back, image failed: " + widgetRef.src);
        widgetRef.src = "noimage.png";
    }
           };


      var flxFeaturedAuctionsItemBottom  = new voltmx.ui.FlexContainer({

        id: "flxFeaturedAuctionsItemBottom" + i,
        centerX: "50%",
        height: "55%",
        width: "100%",
        zIndex: 2,
        isVisible: true,
        top: "45%",
        skin: "sknFlxBasic",
        clipBounds: true,
        layoutType: voltmx.flex.FLOW_VERTICAL


      },{},{});

      //           var lblCarname = new voltmx.ui.Label(
      //            {
      //                 id: "lblCarname" + i,
      //                 text: records[i].sub_category_name ? records[i].sub_category_name : "N/A", 
      //                 isVisible: true,
      //                 width: "preferred",
      //                 left: "5%",
      //                 top: "10%",
      //                 height: "15%",
      //                 skin: "sknLblCronosPro231f2022pxbold"
      //           }
      //           );

      var lblCarname = new voltmx.ui.Label({
        id: "lblCarname" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        top: "2%",
        height: "14%",
        width: voltmx.flex.USE_PREFERRED_SIZE,
        skin: "sknLblDubai00000020pxBold",
        //     text: records[i].title ? records[i].title : "N/A",
        text: (records[i] && records[i].title) ? records[i].title : "N/A",

      }, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
//       var bidEndTime = this.parseBidCloseDate(records[i].bid_close_date);
      var timercount = records && records[i] && records[i].bid_close_date;
var userTargetTime = timercount ? convertUTCtoUserTime(timercount) : null;
var bidclosetime = userTargetTime ? getTimeRemainingString(userTargetTime) : "N/A";
      var lblCountDown = new voltmx.ui.Label({
        id: "lblCountDown" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        top: "2dp",
        width: voltmx.flex.USE_PREFERRED_SIZE,
        skin: "sknLblDubaid3243714px",
            text: bidclosetime
       

      }, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});

//       if (this._countdownItems == null) this._countdownItems = [];

//       this._countdownItems.push({
//         label: lblCountDown,
//         endTime: bidEndTime
//       });

      var flxLot = new voltmx.ui.FlexContainer({
        id: "flxLot" +  i,
        isVisible: true,
        top: "2dp",
        height: "22dp",
        width: "100%",
        layoutType: voltmx.flex.FREE_FORM,
        skin: "slFbox"
      }, {}, {});
      flxLot.setDefaultUnit(voltmx.flex.DP);

      var lblLot = new voltmx.ui.Label({
        id: "lblLot" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        text: voltmx.i18n.getLocalizedString("Lot #")
      }, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});

      var lblLotNum = new voltmx.ui.Label({
        id: "lblLotNum" + i,
        isVisible: true,
         left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        //     text: records[i].lot_no ? records[i].lot_no : "N/A"
        text: (records[i] && records[i].lot_no) ? records[i].lot_no : "N/A"

      }, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});

      //           var lblLot = new voltmx.ui.Label({

      //                 id: "lblLot" + i,
      //                 text: "Lot #:"+(records[i].ID ? records[i].ID : "N/A"),
      //                 isVisible: true,
      //                 width: "preferred",
      //                 left: "5%",
      //                 top: "30%",
      //                 height: "15%",
      //                 skin: "sknLblCronosPro231f2016px"

      //           });
      flxLot.add(lblLot, lblLotNum);

      var flxTotalBids = new voltmx.ui.FlexContainer({
        id: "flxTotalBids" + i,
        isVisible: true,
        top: "2dp",
        height: "22dp",
        width: "100%",
        layoutType: voltmx.flex.FREE_FORM,
        skin: "slFbox"
      }, {}, {});


      var lblTotalBidsText = new voltmx.ui.Label({
        id: "lblTotalBidsText" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        text: voltmx.i18n.getLocalizedString("Location")
      }, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT}, {});

      var lblTotalBids = new voltmx.ui.Label({
        id: "lblTotalBids" + i,
        isVisible: true,
         left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        //     text: records[i].no_of_bids ? records[i].no_of_bids: "N/A"
//         text: (records[i] && records[i].no_of_bids !== undefined && records[i].no_of_bids !== null) ? records[i].no_of_bids : "N/A"
            text: (records[i] && records[i].location !== undefined && records[i].location !== null) ? records[i].location : "N/A"

      }, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT}, {});
      flxTotalBids.add(lblTotalBidsText,lblTotalBids);



      var flxLocation = new voltmx.ui.FlexContainer({
        id: "flxLocation" + i,
        isVisible: true,
        top: "2dp",
        height: "22dp",
        width: "100%",
        layoutType: voltmx.flex.FREE_FORM,
        skin: "slFbox"
      }, {}, {});
      flxLocation.setDefaultUnit(voltmx.flex.DP);

      var lblLocation = new voltmx.ui.Label({
        id: "lblLocation" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        text: voltmx.i18n.getLocalizedString("Mileage")
      }, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT}, {});

      var lblLocationName = new voltmx.ui.Label({
        id: "lblLocationName" + i,
        isVisible: true,
         left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
        centerY: "50%",
        skin: "sknLblDubai231f20",
        //     text: records[i].milage ? records[i].milage : "N/A"
        text: (records[i] && records[i].milage !== undefined && records[i].milage !== null) ? records[i].milage : "N/A"

      }, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT}, {});
      flxLocation.add(lblLocation, lblLocationName);


      var flxBidAmount = new voltmx.ui.FlexContainer({
        id: "flxBidAmount" + i,
        isVisible: isSilent ? isYourBidVisible : true,
        top: "2dp",
        height: "22dp",
        width: "100%",
        layoutType: voltmx.flex.FREE_FORM,
        skin: "slFbox"
      }, {}, {});
      flxBidAmount.setDefaultUnit(voltmx.flex.DP);

      var lblBidAmountHeading = new voltmx.ui.Label({
        id: "lblBidAmountHeading" + i,
        isVisible: true,
        left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
        centerY: "50%",
        skin: "sknLblDubai231f20", // same as location heading
        text: isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") : voltmx.i18n.getLocalizedString("Bid Amount") // localize if needed
      }, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT}, {});

      var lblBidRate = new voltmx.ui.Label({
        id: "lblBidRate" + i,
        isVisible: true,
         left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
        centerY: "50%",
        skin: isSilent ? silentSkin : bidrateSkin, // e.g., sknLblCronosProd0290512Bold22px
        //     text: "AED " + (records[i].max_bid ? records[i].max_bid : "N/A")
        text: (records[i] && records[i].max_bid !== undefined && records[i].max_bid !== null)
        ? "AED " + Number(records[i].max_bid).toLocaleString("en-AE")
        : "AED N/A"

      }, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});

      flxBidAmount.add(lblBidAmountHeading, lblBidRate);


      var flxLikeBid = new voltmx.ui.FlexContainer({
        id: "flxLikeBid" + i,
        isVisible: true,
        top: "2dp",
        height: "45dp",
        width: "100%",
        layoutType: voltmx.flex.FREE_FORM,
        skin: "slFbox"
      }, {}, {});
      flxLikeBid.setDefaultUnit(voltmx.flex.DP);

      var flxLikeFromRecommendedFilter = new voltmx.ui.FlexContainer({
        id: "flxLikeFromRecommendedFilter" + i,
        isVisible: isSilent ? true: true,
        height: "34dp",
        width: "34dp",
        left: "4%",
        centerY: "50%",
        skin: flexskin,
        onClick: this.toggleHeartStatusFromRecommended.bind(this,objid,aucid,i),
        layoutType: voltmx.flex.FREE_FORM
      }, {}, {});

      var imgHeartIconFromRecommended = new voltmx.ui.Image2({
        id: "imgHeartIconFromRecommended" + i,
        isVisible: true,
        centerX: "50%",
        centerY: "50%",
        height: "55%",
        width: "55%",
        src: imgheartset
      }, { imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO }, {});
      flxLikeFromRecommendedFilter.add(imgHeartIconFromRecommended); 



      var flxBidEnable = new voltmx.ui.FlexContainer({
        id: "flxBidEnable" + i,
        isVisible: false,
        height: "35dp",
        width: "42dp",
        centerY: "50%",
        right: "41%",
        skin: "sknFlxBasic",
        layoutType: voltmx.flex.FREE_FORM,
        zIndex: 2,
        onClick: this.enableAutoBid.bind(this,{
          //               auction_id: records[i].auction_id,
          //               object_id: records[i].object_id
          auction_id: records[i] && records[i].auction_id ? records[i].auction_id : "",
          object_id: records[i] && records[i].object_id ? records[i].object_id : ""

        })
      }, {}, {});

      var imgAutoBid = new voltmx.ui.Image2({
        id: "imgAutoBid" + i,
        isVisible: true,
        centerX: "50%",
        centerY: "50%",
        height: "75%",
        width: "75%",
        src: "autobidnewone.png"
      }, { imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO }, {});
      flxBidEnable.add(imgAutoBid);



      var btnBidNow = new voltmx.ui.Button({
        id: "btnBidNow"+i,
        isVisible: true,
        height:"40dp",
        width: "35%",
        centerY: "50%",
        right: "4%",
        skin: "sknBtn61b35c20pxbold",
        text: voltmx.i18n.getLocalizedString("BID NOW"),
        onClick: this.openBidAmountContainer.bind(this, {
          //               auction_id: records[i].auction_id,
          //               object_id: records[i].object_id,
          //               max_bid_amount: records[i].max_bid_amount,
          //               highest_bidder: records[i].highest_bidder,
          //               ID: records[i].ID,
          auction_id: records[i] && records[i].auction_id ? records[i].auction_id : "",
          object_id: records[i] && records[i].object_id ? records[i].object_id : "",
          max_bid_amount: records[i] && records[i].max_bid_amount ? records[i].max_bid_amount : "",
          highest_bidder: records[i] && records[i].highest_bidder ? records[i].highest_bidder : "",
          ID: records[i] && records[i].ID ? records[i].ID : "", isSilent: isSilent,

          currentIndex: i
        })  
      }, { contentAlignment: constants.CONTENT_ALIGN_CENTER }, {});
      flxLikeBid.add(flxLikeFromRecommendedFilter, flxBidEnable, btnBidNow);




      //           var btnTest = new voltmx.ui.Button({
      //              id: "btnTest"+ i,
      //              right: "5%",
      //             top: "69%",
      //             text: "BID NOW",
      //             height: "preferred",
      //             width: "30%",
      //             skin: "sknBtnBidNow",

      //             onClick: this.openBidAmountContainer.bind(this, {
      //               auction_id: records[i].auction_id,
      //               object_id: records[i].object_id,
      //               max_bid_amount: records[i].max_bid_amount,
      //               ID: records[i].ID,
      //               currentIndex: i
      //             })  

      //           })



      flxFeaturedAuctionsItemTop.add(imgFeaturedAuctions);
      //           if (records[i].thumbnail_url) {
      //             this.checkSessionAndAssignImage(
      //               imgFeaturedAuctions,
      //               records[i].thumbnail_url   // password
      //             );
      //           }


      flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemTop); 
      flxFeaturedAuctionsItemBottom.add(lblCarname);

      flxFeaturedAuctionsItemBottom.add(lblCountDown);
      flxFeaturedAuctionsItemBottom.add(flxLot);
      flxFeaturedAuctionsItemBottom.add(flxTotalBids);

      flxFeaturedAuctionsItemBottom.add(flxLocation);
      flxFeaturedAuctionsItemBottom.add(flxBidAmount);
      flxFeaturedAuctionsItemBottom.add(flxLikeBid);



      //           flxFeaturedAuctionsItemBottom.add(btnBidNow);

      flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemBottom);
      parentFlex.add(flexFeaturedAuctionsItem);
    }
    
      if (isArabic && parentFlex.scrollToEnd) {
        parentFlex.scrollToEnd();
    }
    // For LTR: make sure it starts from beginning
    else if (!isArabic && parentFlex.scrollToBeginning) {
        parentFlex.scrollToBeginning();
    }
//     this.startAuctionCountdown();
    voltmx.print("exit from function");
  },

  startAuctionCountdown: function () {
    if (this._auctionTimerId) voltmx.timer.cancel(this._auctionTimerId);

    this._auctionTimerId = "AUCTION_TIMER";

    voltmx.timer.schedule(this._auctionTimerId, function () {
      var now = new Date().getTime();

      this._countdownItems.forEach(function (item) {
        var remaining = item.endTime.getTime() - now;
        var label = item.label;

        if (!label) return;

        if (remaining <= 0) {
          label.text = "Ended";
          return;
        }

        var seconds = Math.floor((remaining / 1000) % 60);
        var minutes = Math.floor((remaining / (1000 * 60)) % 60);
        var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

        function pad(n) {
          return n < 10 ? "0" + n : n;
        }

        var formatted = `${days}D ${pad(hours)}H ${pad(minutes)}M`;
        //             ${pad(seconds)}S`;
        label.text = formatted;
      }, this);
    }.bind(this), 1, true); // repeat every 1 second
  },

  parseBidCloseDate: function(dateStr) {
    // Ensure safe fallback
    if (!dateStr) return new Date();
    return new Date(dateStr.replace(" ", "T")); // Converts to "2025-07-25T06:30:00.0"
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

//       return days + "D " + hours + "H " + minutes + "M " + seconds + "S";
//     } catch (e) {
//       return "N/A";
//     }
//   },

  addItemToFavourites: function()
  {
    var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin){
      //         if(this.mode !== "seller"){
      if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){

        var isAlreadyLiked = self.view.imgFav.src === "heartlikerecommended.png";

        // Define callback to update UI after API response
        var callback = function(success, message) {
          if (success) {
            if (isAlreadyLiked) {
              self.view.imgFav.src = "favfleetdislike.png";
            } else {
              self.view.imgFav.src = "heartlikerecommended.png";
            }
          } else {
//             alert("Favorite toggle failed: " + message);
          }
        };

        if (!this.metadata || !this.metadata.auction_id) {
    voltmx.print("auction_id is missing, cannot track/untrack object.");
    return;
}
        // Call backend to add/remove
        if (isAlreadyLiked) {
          self.invokeRemoveTrackedObject(this.objid, this.metadata.auction_id, callback);
        } else {
          self.invokeAddTrackedObject(this.objid, this.metadata.auction_id, callback);
        }

      }

      else{
        self.view.flxOverLay.setVisibility(true);
        self.view.flxWarning.setVisibility(true);
      }
    }
    else{
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
  },

  toggleHeartStatusFromRecommended: function(objid, aucid, index) {
    var self = this;

    var isLogin = voltmx.store.getItem("isLogin");
    if (!isLogin) {
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
      return;
    }

    if(self.mode !== "seller"){
      var imgHeart = self.view["imgHeartIconFromRecommended" + index];
      var flxHeart = self.view["flxLikeFromRecommendedFilter" + index];

      // Determine current status
      var isAlreadyLiked = imgHeart.src === "heartlikerecommended.png";

      // Define callback to update UI after API response
      var callback = function(success, message) {
        if (success) {
          if (isAlreadyLiked) {
            flxHeart.skin = "sknFlx231f20custom120pxround";
            imgHeart.src = "imgdislikenew.png";
          } else {
            flxHeart.skin = "sknFlxd32437custom120pxround";
            imgHeart.src = "heartlikerecommended.png";
          }
        } else {
//           alert("Favorite toggle failed: " + message);
        }
      };

      // Call backend to add/remove
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





  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    // Determine alignment and direction
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;


    //   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    // List of label widget IDs to apply alignment
    var labelList = [
      "lblCarName","lblLocation","lbllotNumber","lblLotID","lblBasicInformation","lblTechnicalReport",
      "lblBodyStyle","lblBodyStyleName","lblFuelType","lblFuelTypeName","lblLocationBasicInfo","lblLocationName",
      "lblYear","lblyearText","lblMileage","lblMileageAmount","lblTransmission","lblTransmissionValue","Exterior Colour",
      "lblInteriorColour","lblInteriorColor","lblDriveType","lblDriveTypeValue","Engine","lblEngineType","lblChassisNumber","lblChassisVal","lblTaxAdded",
      "lblTaxAddVal","lblAdmFees","lblAdmValue","lblOwnership","lblOnwershipval","lblDocDel","lblDDVal","lblGeneralSpecval","lblGeneralSpec","lblTypesOfWheels",
      "lblTowval","lblMedia","lblMediaVal","lblHP","lblHPVal","lblNoOfDoors","lblDoorsVal","lblVehicleNoteBodyText",
      "lblVehicleNoteAr","lblLocationText","lblAddressLoc","lblFav","lblShare","lblConditionAnalysis","lblHighMileage","lblAvgPerYear","lblVehicleNote","lblSimilarVehicles","lblExterior"
    ];

    // Apply alignment to labels

    for (var i = 0; i < labelList.length; i++) {
      var label = labelList[i];
      if (this.view[label]) {
        if (label === "lbllotNumber" || label === "lblLotID") {
          this.view[label].contentAlignment = !alignment;
        } else {
          this.view[label].contentAlignment = alignment;
        }
      }
    }
// for (var i = 0; i < labelList.length; i++) {
//     if (this.view[labelList[i]]) {
//       this.view[labelList[i]].contentAlignment = alignment;
//     }
//   }

    // List of Flex containers to reverse layout direction
    var flexList = [
      "flxCarDetailsHead","flxLocation","flxBids","flxTechnicalReport","flxVehicleNoteHeading","flxLocationHead",
      "flxMapDetails","flxFav","flxBasicInfoHead","flxBlue","flxTimerCount","flxBar","flxScrollFilteredItems",
      "flxBodyStyleFuelType","flxLocationYear","flxMileageTransmission","flxExteriorInteriorColour","CopyflxDriveTypeEngine0c51dae4e7b304d","flxChassisNUmTaxAdded","flxDriveTypeEngine",
      "CopyflxDriveTypeEngine0g78b6cdc214a4f","CopyflxDriveTypeEngine0ccd230d9c96f41","CopyflxDriveTypeEngine0f39fd7bc441a4f"

    ];

    //   // Apply reverseLayoutDirection
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }

    if(isArabic)
    {
      this.view.imgShare.left = "";
      this.view.imgShare.right = "10%";

//       this.view.lblShare.left = "";
//       this.view.lblShare.right = "0dp";

      this.view.imgFav.left = "";
      this.view.imgFav.right = "10%";

      this.view.lblFav.left = "";
      this.view.lblFav.right = "0dp"; 

      this.view.lblBasicInformation.left = "";
      this.view.lblBasicInformation.right = "0dp";

      this.view.flxTechnicalReport.left = "";
      this.view.flxTechnicalReport.right = "4%";

      this.view.lblTechnicalReport.left = "";
      this.view.lblTechnicalReport.right = "10%";

      this.view.imgDownload.left = "";
      this.view.imgDownload.right = "3%";

      this.view.lblConditionAnalysis.left = "";
      this.view.lblConditionAnalysis.right = "0dp";

      this.view.lblHighMileage.left = "";
      this.view.lblHighMileage.right = "0dp";

      this.view.lblAvgPerYear.left = "";
      this.view.lblAvgPerYear.right = "0dp";

      this.view.lblSimilarVehicles.left = "";
      this.view.lblSimilarVehicles.right = "5%";

      this.view.flxBodyStyle.left = "";
      this.view.flxBodyStyle.right = "0dp";

      this.view.flxFuelType.left = "";
      this.view.flxFuelType.right = "2%";

      // 1
      this.view.flexLocation.left = "";
      this.view.flexLocation.right = "0dp";

      // 2
      this.view.flxYear.left = "";
      this.view.flxYear.right = "2%";

      // 3
      this.view.flxMileage.left = "";
      this.view.flxMileage.right = "0dp";

      // 4
      this.view.flxTransmission.left = "";
      this.view.flxTransmission.right = "2%";

      // 5
      this.view.flxExteriorColor.left = "";
      this.view.flxExteriorColor.right = "0dp";

      // 6
      this.view.flxInteriorColour.left = "";
      this.view.flxInteriorColour.right = "2%";

      // 7
      this.view.flxDriveType.left = "";
      this.view.flxDriveType.right = "0dp";

      // 8
      this.view.flxEngine.left = "";
      this.view.flxEngine.right = "2%";

      // 9
      this.view.CopyflxDriveType0ed639d6dbdc541.left = "";
      this.view.CopyflxDriveType0ed639d6dbdc541.right = "0dp";

      // 10
      this.view.CopyflxEngine0d14ba6d0d9e743.left = "";
      this.view.CopyflxEngine0d14ba6d0d9e743.right = "2%";

      // 11
      this.view.CopyflxDriveType0ab07bc82787848.left = "";
      this.view.CopyflxDriveType0ab07bc82787848.right = "0dp";

      // 12
      this.view.CopyflxEngine0c76d7ede06dc4b.left = "";
      this.view.CopyflxEngine0c76d7ede06dc4b.right = "2%";

      // 13
      this.view.CopyflxDriveType0e89712644d994a.left = "";
      this.view.CopyflxDriveType0e89712644d994a.right = "0dp";

      // 14
      this.view.CopyflxEngine0c1246cff02d545.left = "";
      this.view.CopyflxEngine0c1246cff02d545.right = "2%";

      // 15
      this.view.CopyflxDriveType0ae19cf4e48b446.left = "";
      this.view.CopyflxDriveType0ae19cf4e48b446.right = "0dp";

      // 16
      this.view.CopyflxEngine0h37d0d12b07348.left = "";
      this.view.CopyflxEngine0h37d0d12b07348.right = "2%";

      // 17
      this.view.CopyflxDriveType0c37b59704bc44d.left = "";
      this.view.CopyflxDriveType0c37b59704bc44d.right = "0dp";

      // 18
      this.view.CopyflxEngine0h1adce72f2c34e.left = "";
      this.view.CopyflxEngine0h1adce72f2c34e.right = "2%";

      this.view.flxBack.left = "";
      this.view.flxBack.right = "10dp";

      this.view.flxShowMultipleImages.left = "10dp";
      this.view.flxShowMultipleImages.right = "";

      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); 
      this.view.imgBAr.transform = flipTransform;

    }
    else{

      var normalTransform = voltmx.ui.makeAffineTransform(); 
      this.view.imgBAr.transform = normalTransform;

      this.view.flxBack.left = "10dp";
      this.view.flxBack.right = "";

      this.view.flxShowMultipleImages.left = "";
      this.view.flxShowMultipleImages.right = "10dp";

      this.view.flxHead1.left = "0dp";
      this.view.flxHead1.right = "";

      this.view.flxHead2.left = "";
      this.view.flxHead2.right = "";

      this.view.imgShare.left = "10%";
      this.view.imgShare.right = "";

//       this.view.lblShare.left = "0dp";
//       this.view.lblShare.right = "";

      this.view.imgFav.left = "10%";
      this.view.imgFav.right = "";

      this.view.lblFav.left = "0dp";
      this.view.lblFav.right = "";

      this.view.lblBasicInformation.left = "0dp";
      this.view.lblBasicInformation.right = "";

      this.view.flxTechnicalReport.left = "4%";
      this.view.flxTechnicalReport.right = "";

      this.view.lblTechnicalReport.left = "10%";
      this.view.lblTechnicalReport.right = "";

      this.view.imgDownload.left = "3%";
      this.view.imgDownload.right = "";

      this.view.lblConditionAnalysis.left = "0dp";
      this.view.lblConditionAnalysis.right = "";

      this.view.lblHighMileage.left = "0dp";
      this.view.lblHighMileage.right = "";

      this.view.lblAvgPerYear.left = "0dp";
      this.view.lblAvgPerYear.right = "";

      this.view.lblSimilarVehicles.left = "5%";
      this.view.lblSimilarVehicles.right = "";

      this.view.flxBodyStyle.left = "0dp";
      this.view.flxBodyStyle.right = "";

      this.view.flxFuelType.left = "2%";
      this.view.flxFuelType.right = "";

      // 1
      this.view.flexLocation.left = "0dp";
      this.view.flexLocation.right = "";

      // 2
      this.view.flxYear.left = "2%";
      this.view.flxYear.right = "";

      // 3
      this.view.flxMileage.left = "0dp";
      this.view.flxMileage.right = "";

      // 4
      this.view.flxTransmission.left = "2%";
      this.view.flxTransmission.right = "";

      // 5
      this.view.flxExteriorColor.left = "0dp";
      this.view.flxExteriorColor.right = "";

      // 6
      this.view.flxInteriorColour.left = "2%";
      this.view.flxInteriorColour.right = "";

      // 7
      this.view.flxDriveType.left = "0dp";
      this.view.flxDriveType.right = "";

      // 8
      this.view.flxEngine.left = "2%";
      this.view.flxEngine.right = "";

      // 9
      this.view.CopyflxDriveType0ed639d6dbdc541.left = "0dp";
      this.view.CopyflxDriveType0ed639d6dbdc541.right = "";

      // 10
      this.view.CopyflxEngine0d14ba6d0d9e743.left = "2%";
      this.view.CopyflxEngine0d14ba6d0d9e743.right = "";

      // 11
      this.view.CopyflxDriveType0ab07bc82787848.left = "0dp";
      this.view.CopyflxDriveType0ab07bc82787848.right = "";

      // 12
      this.view.CopyflxEngine0c76d7ede06dc4b.left = "2%";
      this.view.CopyflxEngine0c76d7ede06dc4b.right = "";

      // 13
      this.view.CopyflxDriveType0e89712644d994a.left = "0dp";
      this.view.CopyflxDriveType0e89712644d994a.right = "";

      // 14
      this.view.CopyflxEngine0c1246cff02d545.left = "2%";
      this.view.CopyflxEngine0c1246cff02d545.right = "";

      // 15
      this.view.CopyflxDriveType0ae19cf4e48b446.left = "0dp";
      this.view.CopyflxDriveType0ae19cf4e48b446.right = "";

      // 16
      this.view.CopyflxEngine0h37d0d12b07348.left = "2%";
      this.view.CopyflxEngine0h37d0d12b07348.right = "";

      // 17
      this.view.CopyflxDriveType0c37b59704bc44d.left = "0dp";
      this.view.CopyflxDriveType0c37b59704bc44d.right = "";

      // 18
      this.view.CopyflxEngine0h1adce72f2c34e.left = "2%";
      this.view.CopyflxEngine0h1adce72f2c34e.right = "";

    }

    // Optional localization of text, if needed
    this.view.lbllotNumber.text=voltmx.i18n.getLocalizedString("#Lot Number");  
    this.view.lblCurrentBid.text=voltmx.i18n.getLocalizedString("Highest Bid");
    this.view.lblTotalBids.text=voltmx.i18n.getLocalizedString("Total Bids");   
    this.view.lblBasicInformation.text=voltmx.i18n.getLocalizedString("Basic Information");
    this.view.lblTechnicalReport.text=voltmx.i18n.getLocalizedString("Technical Report");
    this.view.lblBodyStyle.text=voltmx.i18n.getLocalizedString("Body Style");
    this.view.lblFuelType.text=voltmx.i18n.getLocalizedString("fuel type");
    this.view.lblLocationBasicInfo.text=voltmx.i18n.getLocalizedString("Location");   
    this.view.lblYear.text=voltmx.i18n.getLocalizedString("year");
    this.view.lblMileage.text=voltmx.i18n.getLocalizedString("Mileage");    
    this.view.lblTransmission.text=voltmx.i18n.getLocalizedString("Transmission");
    this.view.lblExterior.text=voltmx.i18n.getLocalizedString("Exterior Colour");
    this.view.lblInteriorColour.text=voltmx.i18n.getLocalizedString("Interior Colour");
    this.view.lblDriveType.text=voltmx.i18n.getLocalizedString("Drive Type"); 
    this.view.lblEngine.text=voltmx.i18n.getLocalizedString("Cylinders");
    this.view.lblChassisNumber.text=voltmx.i18n.getLocalizedString("Chassis Number");
    this.view.lblTaxAdded.text=voltmx.i18n.getLocalizedString("tax Added");
    this.view.lblAdmFees.text=voltmx.i18n.getLocalizedString("Administrative Fees");
    this.view.lblOwnership.text=voltmx.i18n.getLocalizedString("Ownership");  
    this.view.lblDocDel.text=voltmx.i18n.getLocalizedString("Document delivery");
    this.view.lblGeneralSpec.text=voltmx.i18n.getLocalizedString("General Specification");
    this.view.lblTypesOfWheels.text=voltmx.i18n.getLocalizedString("Type of wheels"); 
    this.view.lblMedia.text=voltmx.i18n.getLocalizedString("Media");
    this.view.lblHP.text=voltmx.i18n.getLocalizedString("Horse Power");
    this.view.lblNoOfDoors.text=voltmx.i18n.getLocalizedString("Doors");
    this.view.lblVehicleNote.text=voltmx.i18n.getLocalizedString("Vehicle Note");  
    this.view.lblLocationText.text=voltmx.i18n.getLocalizedString("Location");
//     this.view.lblShare.text=voltmx.i18n.getLocalizedString("Services");
    this.view.lblShare.text = voltmx.i18n.getLocalizedString("Services");
    this.view.lblFav.text=voltmx.i18n.getLocalizedString("Favourite");  
    this.view.btnBidNowLast.text=voltmx.i18n.getLocalizedString("BID NOW");    



  },

setData1: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.flxBids.setVisibility(false);
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    
    // Label list to set alignment safely
    var labelList = [
        "lblCarName", "lblLocation", "lbllotNumber", "lblLotID", "lblBasicInformation", "lblTechnicalReport",
        "lblBodyStyle", "lblBodyStyleName", "lblFuelType", "lblFuelTypeName", "lblLocationBasicInfo", "lblLocationName",
        "lblYear", "lblyearText", "lblMileage", "lblMileageAmount", "lblTransmission", "lblTransmissionValue",
        "lblInteriorColour", "lblInteriorColor", "lblDriveType", "lblDriveTypeValue", "lblEngineType",
        "lblChassisNumber", "lblChassisVal", "lblTaxAdded", "lblTaxAddVal", "lblAdmFees", "lblAdmValue",
        "lblOwnership", "lblOnwershipval", "lblDocDel", "lblDDVal", "lblGeneralSpecval", "lblGeneralSpec",
        "lblTypesOfWheels", "lblTowval", "lblMedia", "lblMediaVal", "lblHP", "lblHPVal", "lblNoOfDoors", "lblDoorsVal",
        "lblVehicleNoteBodyText", "lblVehicleNoteAr", "lblLocationText", "lblAddressLoc",
        "lblConditionAnalysis", "lblHighMileage", "lblAvgPerYear", "lblVehicleNote", "lblSimilarVehicles", "lblExterior","lblInteriorColor","lblEngine",
        "lblExteriorColor"
    ];

    // Apply alignment safely
    for (var i = 0; i < labelList.length; i++) {
        var lbl = this.view[labelList[i]];
        if (lbl) {
            lbl.contentAlignment = alignment;
        }
    }
  
  
  this.view.lbllotNumber.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  this.view.lblLotID.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  this.view.lblDriveType.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  this.view.lblInteriorColor.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  this.view.tc.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    // Flex list to reverse layout safely
    var flexList = [
        "flxCarDetailsHead", "flxLocation", "flxBids", "flxTechnicalReport", "flxVehicleNoteHeading",
        "flxLocationHead", "flxMapDetails", "flxFav", "flxBasicInfoHead", "flxBlue", "flxTimerCount",
        "flxBar", "flxScrollFilteredItems", "flxBodyStyleFuelType", "flxLocationYear", "flxMileageTransmission",
        "flxExteriorInteriorColour", "CopyflxDriveTypeEngine0c51dae4e7b304d", "flxChassisNUmTaxAdded", "flxDriveTypeEngine",
        "CopyflxDriveTypeEngine0g78b6cdc214a4f", "CopyflxDriveTypeEngine0ccd230d9c96f41", "CopyflxDriveTypeEngine0f39fd7bc441a4f","CopyflxVehicleNoteHeading0c097d39f411e4e"
    ];

    for (var j = 0; j < flexList.length; j++) {
        var flx = this.view[flexList[j]];
        if (flx) {
            flx.reverseLayoutDirection = direction;
        }
    }

    // Special positioning for Arabic
    if (isArabic) {
      
         
      
        if (this.view.imgShare) { this.view.imgShare.left = ""; this.view.imgShare.right = "10%"; }
        if (this.view.lblShare) { this.view.lblShare.left = ""; this.view.lblShare.right = "0dp"; }
        if (this.view.imgFav) { this.view.imgFav.left = ""; this.view.imgFav.right = "10%"; }
        if (this.view.lblFav) { this.view.lblFav.left = ""; this.view.lblFav.right = "0dp"; }
        if (this.view.lblBasicInformation) { this.view.lblBasicInformation.left = ""; this.view.lblBasicInformation.right = "0dp"; }
        if (this.view.flxTechnicalReport) { this.view.flxTechnicalReport.left = ""; this.view.flxTechnicalReport.right = "4%"; }
        if (this.view.lblTechnicalReport) { this.view.lblTechnicalReport.left = ""; this.view.lblTechnicalReport.right = "10%"; }
        if (this.view.imgDownload) { this.view.imgDownload.left = ""; this.view.imgDownload.right = "3%"; }

        if (this.view.flxBack) { this.view.flxBack.left = ""; this.view.flxBack.right = "10dp"; }
        if (this.view.flxShowMultipleImages) { this.view.flxShowMultipleImages.left = "10dp"; this.view.flxShowMultipleImages.right = ""; }

        // Flip image
        if (this.view.imgBAr) {
            var flipTransform = voltmx.ui.makeAffineTransform();
            flipTransform.scale(-1, 1);
            this.view.imgBAr.transform = flipTransform;
        }
    } 
    // English positioning
    else {
//         if (this.view.imgFav) { this.view.imgFav.left = ""; this.view.imgFav.right = "10%"; }
//         if (this.view.lblFav) { this.view.lblFav.left = ""; this.view.lblFav.right = "5dp"; }

        if (this.view.flxBack) { this.view.flxBack.left = "10dp"; this.view.flxBack.right = ""; }
        if (this.view.flxShowMultipleImages) { this.view.flxShowMultipleImages.left = ""; this.view.flxShowMultipleImages.right = "10dp"; }
        if (this.view.imgBAr) {
            var normalTransform = voltmx.ui.makeAffineTransform();
            this.view.imgBAr.transform = normalTransform;
        }
    }


    // Safe localized text assignment
    var localizationMap = {
        lbllotNumber: "#Lot Number",
        lblCurrentBid: "Highest Bid",
        lblTotalBids: "Total Bids",
        lblBasicInformation: "Basic Information",
        lblTechnicalReport: "Technical Report",
        lblBodyStyle: "Body Style",
        lblFuelType: "fuel type",
        lblLocationBasicInfo: "Location",
        lblYear: "year",
        lblMileage: "Mileage",
        lblTransmission: "Transmission",
        lblExterior: "Exterior Colour",
        lblInteriorColour: "Interior Colour",
        lblDriveType: "Drive Type",
        lblEngine: "Cylinders",
        lblChassisNumber: "Chassis Number",
        lblTaxAdded: "Tax Added",
        lblAdmFees: "Administrative Fees",
        lblOwnership: "Ownership",
        lblDocDel: "Document delivery",
        lblGeneralSpec: "General Specification",
        lblTypesOfWheels: "Type of wheels",
        lblMedia: "Vehicle Source",
        lblHP: "Horse Power",
        lblNoOfDoors: "Doors",
        lblVehicleNote: "Vehicle Note",
        lblLocationText: "Location",
        lblShare: "Services",
        lblFav: "Favourite",
        btnBidNowLast: "BID NOW",
        lblConditionAnalysis: "Condition Analysis"
    };

    for (var key in localizationMap) {
        if (this.view[key]) {
            this.view[key].text = voltmx.i18n.getLocalizedString(localizationMap[key]);
        }
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
    
},
  
   addSwipeSupport: function () {
    try {
      this.view.flxCarImagesCarousel.removeGestureRecognizer(constants.GESTURE_TYPE_SWIPE);
      this.view.flxImagesCarouselMultipleImages.removeGestureRecognizer(constants.GESTURE_TYPE_SWIPE);
    } catch (e) {}

    this.view.flxCarImagesCarousel.addGestureRecognizer(
      constants.GESTURE_TYPE_SWIPE,
      {
        fingers       : 1,
        swipeDirection: [
          constants.GESTURE_DIRECTION_LEFT,
          constants.GESTURE_DIRECTION_RIGHT
        ]
      },
      this.swipeHandler.bind(this)
    );
     
      this.view.flxImagesCarouselMultipleImages.addGestureRecognizer(
      constants.GESTURE_TYPE_SWIPE,
      {
        fingers       : 1,
        swipeDirection: [
          constants.GESTURE_DIRECTION_LEFT,
          constants.GESTURE_DIRECTION_RIGHT
        ]
      },
      this.swipeHandlerMultiple.bind(this)
    );
  },
  
  swipeHandler: function(widgetRef, gestureInfo) {
    var direction = gestureInfo.swipeDirection;
     
    // 1 = LEFT  → next image
    // 2 = RIGHT → previous image

    if (direction === 1) {
        // Same as clicking forward arrow
        if (this.filteredImages && this.filteredImages.length > 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
            this.showImage(this.currentImageIndex);
        }

    } else if (direction === 2) {
        // Same as clicking backward arrow
        if (this.filteredImages && this.filteredImages.length > 0) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) %
                                      this.filteredImages.length;
            this.showImage(this.currentImageIndex);
        }
    }
},

  swipeHandlerMultiple: function(widgetRef, gestureInfo) {
    var direction = gestureInfo.swipeDirection;
     
    // 1 = LEFT  → next image
    // 2 = RIGHT → previous image

    if (direction === 1) {
        // Same as clicking forward arrow
        if (this.filteredImages && this.filteredImages.length > 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
            this.showImageMultiple(this.currentImageIndex);
        }

    } else if (direction === 2) {
        // Same as clicking backward arrow
        if (this.filteredImages && this.filteredImages.length > 0) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) %
                                      this.filteredImages.length;
            this.showImageMultiple(this.currentImageIndex);
        }
    }
},
  
  addPinchSupport: function () {
  try {
    this.view.flxImagesCarouselMultipleImages.removeGestureRecognizer(constants.GESTURE_TYPE_PINCH);
  } catch(e){}

  var pinchConfig = {
    fingers: 2,
    continuousEvents: true
  };

  this.view.flxImagesCarouselMultipleImages.addGestureRecognizer(
    constants.GESTURE_TYPE_PINCH,
    pinchConfig,
    this.pinchHandler.bind(this)
  );
},

  pinchHandler: function(widgetRef, gestureInfo) {

    var state = gestureInfo.gestureState;   // 1 = begin, 2 = active
    var scale = gestureInfo.scale;

    if (state === 1) {
        // pinch began → store starting scale
        this.pinchStartScale = scale;
        return;
    }

    if (state === 2) {
        // pinch active → compare to starting scale
        if (scale > this.pinchStartScale) {
            // PINCH-OUT → zoom in
            this.zoomIn();
        } else if (scale < this.pinchStartScale) {
            // PINCH-IN → zoom out
            this.zoomOut();
        }

        // reset start scale to allow continuous zooming
        this.pinchStartScale = scale;
    }
},




});