define({ 
  

 onNavigate: function() {  
    
   this.setData();
  
   
    this.userid = voltmx.store.getItem("userId"); 
   this.mode = voltmx.store.getItem("mode");
    this.view.preShow = this.onPreshow.bind(this);
   
//       if (!this.isUIInitialized) {
        
        this.isUIInitialized = true;
//          }
   
   this.view.postShow = this.onPostShow.bind(this);
    this.view.btnRecommended.onClick = this.showRecommendedFilterFlex.bind(this,"recommended");
   this.view.btnEndingSoon.onClick = this.showRecommendedFilterFlex.bind(this,"endingsoon");
    this.view.btnRecentlyViewed.onClick = this.showRecommendedFilterFlex.bind(this,"recentlyviewed");
   this.view.btnYourFavourites.onClick = this.showRecommendedFilterFlex.bind(this,"yourfavourites");
   this.view.btnNewlyListedVehicles.onClick =  this.showRecommendedFilterFlex.bind(this,"newlylisted");
   this.view.btnHotItems.onClick = this.showRecommendedFilterFlex.bind(this,"hotitems");
  // this.view.flxServiceItem1.onClick = this.navToVehicleInspection.bind(this);
   this.view.flxServiceItem2.onClick = this.navToRoadSideAsst.bind(this);
   this.view.flxServiceItem3.onClick = function() {
     var isLogin = voltmx.store.getItem("isLogin");
     
     voltmx.store.setItem("previousFormForCB", "frmDashBoard");
 
       if(isLogin)  new voltmx.mvc.Navigation("frmCominSoonServices").navigate();
       else new voltmx.mvc.Navigation("frmLoginScreen").navigate();
     
    
   }.bind(this);
   
   //// newly added for Vehicle inspection////
   
     this.view.flxServiceItem1.onClick = function() {
     var isLogin = voltmx.store.getItem("isLogin");
     
     voltmx.store.setItem("previousFormForCB", "frmDashBoard");
 
       if(isLogin)  new voltmx.mvc.Navigation("frmCominSoonServices").navigate();
       else new voltmx.mvc.Navigation("frmLoginScreen").navigate();
     
    
   }.bind(this);
   ///////////
   this.view.flxServiceItem4.onClick = function() {
      var isLogin = voltmx.store.getItem("isLogin");
       if(isLogin) new voltmx.mvc.Navigation("frmCominSoon").navigate();
       else new voltmx.mvc.Navigation("frmLoginScreen").navigate();
     
   }.bind(this);
   this.view.flxServiceItem5.onClick = function() {
      var isLogin = voltmx.store.getItem("isLogin");
       if(isLogin) new voltmx.mvc.Navigation("frmCominSoon").navigate();
       else new voltmx.mvc.Navigation("frmLoginScreen").navigate();
   }.bind(this);
   this.view.flxServiceItem6.onClick = function()
   {
     new voltmx.mvc.Navigation("frmCominSoon").navigate();
   }.bind(this);
   this.view.flxAuctionCalendarItem1.onClick = this.navToAuctionCalendar.bind(this);
   this.view.flxAuctionCalendarItem2.onClick = this.navtosiletauctioncalender.bind(this);
   this.view.flxAuctionCalendarItem3.onClick = this.navToComingSoon.bind(this);
   this.view.flxAuctionCalendarItem4.onClick = this.navToComingSoon.bind(this);
   this.view.flxAuctionCalendarItem5.onClick = this.openEmiratesUrl.bind(this);
   this.view.flxAuctionCalendarItem6.onClick = this.navToComingSoon.bind(this);
   this.view.flxViewAll.onClick = this.navToAuctionList.bind(this);
   this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
   this.view.onHide = () => {
    if (this._auctionTimerId) {
        voltmx.timer.cancel(this._auctionTimerId);
        this._auctionTimerId = null;
    }
     
      try {
        // Cancel the auto-refresh timer when leaving the screen
        voltmx.timer.cancel("FeaturedAutoRefresh");
    } catch (e) {
        voltmx.print("No active timer to cancel: " + e.message);
    }

     try { voltmx.timer.cancel("FavouritesAutoRefresh"); } catch(e) {}
};

   
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
   this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
   this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    

   this.view.flxError.btnTryAgain.onClick = this.onPreshow.bind(this);
 },
  
   destroypPreviousForms: function(){
      var self = this;
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
        var id = previousForm.id;
        var formsToDestroy = ["frmRegister2","frmRegister1"];
        
        if (formsToDestroy.includes(id)) {
            voltmx.application.destroyForm(id);
        }
    }
  },
  
  openEmiratesUrl: function()
  {
    voltmx.application.openURL("https://emiratesmoto.ae/");
  },
  
  onPreshow: function(){

    loginToDam();
     if(this.view.flxError){
      this.view.flxError.setVisibility(false);
    }
    if(this.view.SmthngWentWrong){
      this.view.SmthngWentWrong.setVisibility(false);
    }
    this.destroypPreviousForms();
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
    
      if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    this.setTestimonials();
    this.closeBidAmountContainer();
    this.view.tc.setVisibility(false);
    var self = this;
    this.createSegmentDynamically();
    this.toggleFooterIcons();
    var isLogin =voltmx.store.getItem("isLogin");
    if(isLogin){
      registerMyDevice();
   self.showRecommendedFilterFlex("recommended");
    }
    else{
      self.showRecommendedFilterFlex("endingsoon");
    }
//      this.checkSession(function() {
        
//         voltmx.print("Session is valid. Proceeding with data load.");
// //        self.invokeOnlineAuctionList(); 
//        if(isLogin)
//        self.invokeRecommendedList();
//        else
//          self.invokeEndingSoonList();
//     });
     if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
    
    if(isLogin){
    this.view.btnRecommended.skin = "sknBtnRecommendedFilter";
     this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
      this.view.btnEndingSoon.left = "10dp";
       this.view.btnRecommended.setVisibility(true);
        this.view.btnRecentlyViewed.setVisibility(true);
//           if (voltmx.store.getItem("mode") === "buyer") {
            if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || self.mode !== "seller"){
      this.view.btnYourFavourites.setVisibility(true);
    } else {
      this.view.btnYourFavourites.setVisibility(false);
    }
    }
    else
      {
          this.view.btnRecommended.setVisibility(false);
          this.view.btnEndingSoon.left = "20dp";
        this.view.btnRecentlyViewed.setVisibility(false);
        this.view.btnYourFavourites.setVisibility(false);
     this.view.btnEndingSoon.skin = "sknBtnRecommendedFilter";
      }
   
    this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
    this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
    this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
    this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
    this.view.tbxBidAmount.setEnabled(false);
  },
  
  setTestimonials: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.segTestimonials.widgetDataMap = {
      "imgProfile": "imgProfile",
      "lblName": "lblName",
      "lblDate": "lblDate",
      "lblReview": "lblReview",
      "lblRating": "lblRating",
      "imgStar": "imgStar"
    }
    
    var data = [];
   
    data.push({
      "imgProfile": "image_9ce1b58aecd4ef61664409fcdd66adf48254ccb2.png",
      "lblName":"Freddie Deckow",
      "lblDate":"04/04/2002",
      "lblReview": 
      {
       "text": voltmx.i18n.getLocalizedString("Review1"),
  "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

    },
      "lblRating":"4.5",
      "imgStar":"starrating1_5px.png"
    },
             {
      "imgProfile": "image_4a6f04d7c466a91265844de9184bb99a5e315996.png",
      "lblName":"Freddie Deckow",
      "lblDate":"04/04/2002",
       "lblReview": 
      {
       "text": voltmx.i18n.getLocalizedString("Review2"),
  "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

    },
      "lblRating":"4.5",
      "imgStar":"starrating1_5px.png"
    },{
      "imgProfile": "image_9ce1b58aecd4ef61664409fcdd66adf48254ccb2.png",
      "lblName":"Freddie Deckow",
      "lblDate":"04/04/2002",
       "lblReview": 
      {
       "text": voltmx.i18n.getLocalizedString("Review3"),
  "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

    },
      "lblRating": "4.5",
      "imgStar": "starrating1_5px.png"
    })
    this.view.segTestimonials.setData(data);
    
    
  },
  
  resetAuctionCountdown: function() {
    if (this._auctionTimerId) {
        voltmx.timer.cancel(this._auctionTimerId);
        this._auctionTimerId = null;
    }
    this._countdownItems = [];
},

  

  onPostShow: function(){
    
//     this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
//     this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
//     this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");
    
    var previousForm = voltmx.application.getPreviousForm();
//   this.view.rcTXT.onClick = function(widgetRef, context) {
//     if (context.url === "termsLink") {
//         new voltmx.mvc.Navigation("frmTermsAndConditions").navigate();
//     }
// };
if (previousForm && previousForm.id === "frmSelectPreferences") {
    voltmx.application.destroyForm("frmSelectPreferences");
}

    this.view.SmthngWentWrong.btnClose.onClick = () => {
      if(this.view.SmthngWentWrong){
      this.view.SmthngWentWrong.setVisibility(false);
    }
    }
    
     this.view.flxOverLay.onClick = () =>{
      if(this.view.flxAutoBidAmountContainer && this.view.flxAutoBidAmountContainer.isVisible){
        this.view.flxAutoBidAmountContainer.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
      }
     
    };
    
    this.view.btnAutoBid.onClick = this.enableAutoBidFromBid.bind(this);
    
    this.view.flxWarningClose.onClick = () => {
      this.view.flxOverLay.setVisibility(false);
          this.view.flxWarning.setVisibility(false);
    };
    
    this.view.btnBidNow.onClick =  this.invokeFryWfAuctionBidding.bind(this);
    
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
    
//        this.view.rcTXT.onTouchEnd = (source, x, y, contextInfo) => {
      
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
    
     this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    
    
    this.view.btnActivate.onClick = this.stateChangeBid.bind(this,"Active");
    this.view.btnDeactivate.onClick = this.stateChangeBid.bind(this,"Inactive");
    
  },
  
  toggleFooterIcons: function()
  {

  this.view.Footer2.flxHL1.setVisibility(true);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooteractive.png";
  this.view.Footer2.lblHome.skin = "sknLblDubaid3243714pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
     this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
      this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
//       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
//     this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
//         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    
    var isLogin =voltmx.store.getItem("isLogin");

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
  
  navToSilentAuctions: function(){
    new voltmx.mvc.Navigation("frmSealedAuctionsList").navigate();
  },
  
  navToComingSoon: function(){
    var x = new voltmx.mvc.Navigation("frmCominSoon");
   x.navigate();
  },
  
    
  
//   createSegmentDynamically: function(){
  
//    this.view.segCarouselView.widgetDataMap = {
//         "imgCarousel": "imgCarousel",
//         "lblCarouselSlideHeading": "lblCarouselSlideHeading",
//         "lblCarouselSlideSubheading": "lblCarouselSlideSubheading",
//         "btnAction": "btnAction"
//     };

//     // Dummy Data for Segment (Modify as Needed)
//     var data = [
//         {
//             "imgCarousel":"dashboardcarouselnew1.jpg",
//             "lblCarouselSlideHeading": "ONLINE AUCTIONS",
//             "lblCarouselSlideSubheading": "180 Vehicles available",
//             "btnAction": { "text": "VIEW ALL",
//                           "onClick": this.navToAuctionList.bind(this)
//                          }
//         },
//         {
//              "imgCarousel":"dashboardcarouselimg2.jpg",
//             "lblCarouselSlideHeading": "OUR OTHER SERVICES",
//             "lblCarouselSlideSubheading": "Professional servicing, repairs and diagnostics",
//             "btnAction": { "text": "VIEW ALL",
//                            "onClick": this.navToServices.bind(this)
//                          }
//         },
//        {
//              "imgCarousel":"dashboardcarouselnew2.png",
//             "lblCarouselSlideHeading": "FLASH AUCTIONS",
//             "lblCarouselSlideSubheading": "Bid Fast, Win Big - Time's Ticking",
//             "btnAction": { "text": "VIEW ALL",
//                            "onClick": this.navToAuctionCalendar.bind(this)
//                          }
//         },
//       {
//              "imgCarousel":"dashboardphysicalauctions.jpg",   //dashboardcarouselnew3.png
//             "lblCarouselSlideHeading": "PHYSICAL AUCTIONS",
//             "lblCarouselSlideSubheading": "From the Floor to Your Hands - Secure Your Asset",
//             "btnAction": { "text": "VIEW ALL",
//                            "onClick": this.navToAuctionCalendar.bind(this) 
//                          }
//         }
      
      
//     ];

//     // Set data to the segment
//    this.view.segCarouselView.setData(data);
  
     
//     this.view.segCarouselView.pageOnDotImage = "segmentpageonimg.png"; 
//     this.view.segCarouselView.pageOffDotImage = "segmentpageoffimg.png";
//   },
  
 createSegmentDynamically: function() {
    var self = this;
 
    self.view.segCarouselView.widgetDataMap = {
        "imgCarousel": "imgCarousel",
        "lblCarouselSlideHeading": "lblCarouselSlideHeading",
        "lblCarouselSlideSubheading": "lblCarouselSlideSubheading",
        "btnAction": "btnAction"
    };
 
    // Call the service first
    var inputParams = {
        "serviceID": "fry_int_fleet$get-active-auction-count",
        "httpheaders": {}, "httpconfig": {}
    };
 
    mfintegrationsecureinvokerasync(inputParams, "fry_int_fleet", "get-active-auction-count", function (status, response) {
        var vehicleCount = 0;
       if(response && response.opstatus === 1011){
         if(self.view && self.view.flxError){
          self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
         }
    return;
       }
//       if(response &&  response.opstatus !== 0){
//         if(this.view.SmthngWentWrong){
//         this.view.SmthngWentWrong.setVisibility(false);
//         }
//     return;
//       }
 try {
  if (response && response.opstatus !== 0) {
    if (this.view && this.view.SmthngWentWrong) {
      this.view.SmthngWentWrong.setVisibility(false);
    }
    return;
  }
} catch (error) {
  voltmx.print("Error:", error);
}
      if(self.view && self.view.flxError){
      self.view.flxError.setVisibility(false);
      }
        if (status === 400 && response && response.records) {
//             vehicleCount = response.records[0].active_auction_count;
          if (response && response.records && Array.isArray(response.records) &&
response.records.length > 0) {
  vehicleCount = response.records[0].active_auction_count || 0;
  var individualCounts = {
        "regularCount": response.records[0].regular_auction || 0,
        "silentCount": response.records[0].silent_auction || 0
      }
      voltmx.store.setItem("individualCounts",individualCounts);
            self.view.CopylblServiceItem0cef14616000344.text=voltmx.i18n.getLocalizedString("ONLINE AUCTIONS") + " "+ individualCounts.regularCount;
   self.view.CopylblServiceItem0ae6b3f20071644.text=voltmx.i18n.getLocalizedString("Silent Auctions") + " "+ individualCounts.silentCount;
} else {
  voltmx.print(" No records found or invalid response structure");
}
            if(Number(vehicleCount) > 0){
              if(self.view.imgLiveNow){
                self.view.imgLiveNow.setVisibility(false);
              }
            }
          else{
            if(self.view.imgLiveNow){
                self.view.imgLiveNow.setVisibility(false);
              }
          }
        }
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      
        var data = [
    {
        "imgCarousel": "carimg.png",
        "lblCarouselSlideHeading": {
            "text": voltmx.i18n.getLocalizedString("Live Auctions1"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
             "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        "lblCarouselSlideSubheading": {
            "text": vehicleCount + " " + voltmx.i18n.getLocalizedString("Vehicles Available"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

        },
        "btnAction": {
            "text": voltmx.i18n.getLocalizedString("View All"),
//             "onClick": self.navToAuctionCalendar.bind(self),
           "onClick": self.navToauctionCategory.bind(self),
            "left": isArabic ? "2%" : "",
            "right": isArabic ? "" : "2%"
        }
    },
   
    {
        "imgCarousel": "flash_auctions.png",
        "lblCarouselSlideHeading": {
            "text": voltmx.i18n.getLocalizedString("Silent Auctions Cap"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

        },
        "lblCarouselSlideSubheading": {
            "text": voltmx.i18n.getLocalizedString("Bid Fast, Win Big - Time's Ticking!"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

        },
        "btnAction": {
            "text": voltmx.i18n.getLocalizedString("View All"),
            "onClick": self.navToSilentAuctions.bind(self),
            "left": isArabic ? "2%" : "",
            "right": isArabic ? "" : "2%"
        }
    },
//            {
//         "imgCarousel": "other_services.png",
//         "lblCarouselSlideHeading": {
//             "text": voltmx.i18n.getLocalizedString("OUR OTHER SERVICES"),
//             "left": isArabic ? "" : "5%",
//             "right": isArabic ? "5%" : "",
//            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

//         },
//         "lblCarouselSlideSubheading": {
//             "text": voltmx.i18n.getLocalizedString("Professional servicing, repairs and diagnostics"),
//             "left": isArabic ? "" : "5%",
//             "right": isArabic ? "5%" : "",
//            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

//         },
//         "btnAction": {
//             "text": voltmx.i18n.getLocalizedString("View All"),
//             "onClick": self.navToServices.bind(self),
//             "left": isArabic ? "2%" : "",
//             "right": isArabic ? "" : "2%",
          
//         }
//     },
    {
        "imgCarousel": "physical_auctions.png",
        "lblCarouselSlideHeading": {
            "text": voltmx.i18n.getLocalizedString("PHYSICAL AUCTIONS"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

        },
        "lblCarouselSlideSubheading": {
            "text": voltmx.i18n.getLocalizedString("From the Floor to Your  Hands - Secure Your Asset!"),
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "5%" : "",
           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT

        },
        "btnAction": {
            "text": voltmx.i18n.getLocalizedString("View All"),
            "onClick": self.navToComingSoon.bind(self),
            "left": isArabic ? "2%" : "",
            "right": isArabic ? "" : "2%"
        }
    }
];

 
        self.view.segCarouselView.setData(data);
        self.view.segCarouselView.pageOnDotImage = "segmentpageonimg.png";
        self.view.segCarouselView.pageOffDotImage = "segmentpageoffimg.png";
    });
},
 
  
  navToServices: function()
  {
    
    voltmx.store.setItem("previousFormForServices", "frmDashBoard");
     
     var  currentAuctionNavigation =  voltmx.store.getItem("previousFormForServices");
    
    if(voltmx.store.getItem("isLogin")){

// frmDashboard → frmServices
voltmx.store.setItem("comingFromDashboard", true);
var currentFormId = voltmx.application.getCurrentForm().id;
    voltmx.store.setItem("originForm", currentFormId);
     voltmx.store.setItem("originFormForCB", currentFormId);
    new voltmx.mvc.Navigation("frmServices").navigate(
       {
          "previousFormAction": currentAuctionNavigation,
         "previousFormID": "frmDashBoard"
       }
    );
    }
    else
     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
  },

   createsIntoFeaturedAuctions: function() {
        voltmx.print("entered into function");

        var parentFlex = this.view.flxScrollFilteredItems;
//           parentFlex.removeAll();
        var records = this.isRecords ? this.records : this.getStaticCarRecords();
        
        for (var i = 0; i < 5; i++) {
          var leftval = (i === 0) ? "20dp" : "10dp";
          var bidrateSkin;
          if(records[i].highest_bidder === this.userid){
             bidrateSkin = "sknLblDubai02905120pxBold";
          }
          else{
              bidrateSkin = "sknLblDubaid3243720pxbold";
          }
            // Creating the main flex container for each widget
            
            var flexFeaturedAuctionsItem = new voltmx.ui.FlexContainer({
                id: "flexFeaturedAuctionsItem" + i,
                left: leftval,
               right: (i === 4) ? "15dp" : "", 
                width: "275dp", 
                height: "95%",
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
               src : records[i].thumbnail_url ? records[i].thumbnail_url : "car3.png",
//               src: "car3.png",
              width: "100%", 
                height: "100%", 
                imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
                clipBounds: true
            });


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
    left: "4%",
    top: "2%",
    height: "14%",
    width: voltmx.flex.USE_PREFERRED_SIZE,
    skin: "sknLblDubai00000020pxBold",
    text: records[i].sub_category_name ? records[i].sub_category_name : "N/A",
}, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
          
   var lblCountDown = new voltmx.ui.Label({
    id: "lblCountDown" + i,
    isVisible: true,
    left: "4%",
    top: "2dp",
    width: voltmx.flex.USE_PREFERRED_SIZE,
    skin: "sknLblDubaid3243714px",
    text: records[i].time_remaining ? getTimeRemainingString(records[i].time_remaining) : "N/A", 
}, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
          
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
    left: "4%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: "Lot #"
}, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
          
  var lblLotNum = new voltmx.ui.Label({
    id: "lblLotNum" + i,
    isVisible: true,
    right: "8%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: records[i].ID ? records[i].ID : "N/A"
}, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});
          
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
    left: "4%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: "Total Bids"
}, {}, {});

var lblTotalBids = new voltmx.ui.Label({
    id: "lblTotalBids" + i,
    isVisible: true,
    right: "8%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: records[i].bids ? records[i].bids: "N/A"
}, {}, {});
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
    left: "4%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: "Location"
}, {}, {});

var lblLocationName = new voltmx.ui.Label({
    id: "lblLocationName" + i,
    isVisible: true,
    right: "8%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
    text: records[i].location ? records[i].location : "N/A"
}, {}, {});
flxLocation.add(lblLocation, lblLocationName);
          

          
          var lblBidRate = new voltmx.ui.Label({
    id: "lblBidRate" + i,
    isVisible: true,
    right: "8%",
    top: "2dp",
    skin: bidrateSkin, // sknLblDubai02905120pxBold
    text: "AED "+ (records[i].max_bid_amount ? records[i].max_bid_amount : "N/A")
}, { contentAlignment: constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});

          
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
    isVisible: true,
    height: "34dp",
    width: "34dp",
    left: "4%",
    centerY: "50%",
    skin: "sknFlx231f20custom120pxround",
    onClick: this.toggleHeartStatusFromRecommended.bind(this,i),
    layoutType: voltmx.flex.FREE_FORM
}, {}, {});
          
         var imgHeartIconFromRecommended = new voltmx.ui.Image2({
    id: "imgHeartIconFromRecommended" + i,
    isVisible: true,
    centerX: "50%",
    centerY: "50%",
    height: "55%",
    width: "55%",
    src: "imgdislikenew.png"
}, { imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO }, {});
flxLikeFromRecommendedFilter.add(imgHeartIconFromRecommended); 
          

          
          var flxBidEnable = new voltmx.ui.FlexContainer({
            id: "flxBidEnable" + i,
            isVisible: true,
            height: "35dp",
            width: "42dp",
            centerY: "50%",
            right: "45%",
            skin: "sknFlxBasic",
            layoutType: voltmx.flex.FREE_FORM,
            zIndex: 2,
            onClick: this.enableAutoBid.bind(this,{
              auction_id: records[i].auction_id,
              object_id: records[i].object_id})
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
    right: "8%",
    skin: "sknBtn61b35c20pxbold",
    text: "BID NOW",
     onClick: this.openBidAmountContainer.bind(this, {
              auction_id: records[i].auction_id,
              object_id: records[i].object_id,
              max_bid_amount: records[i].max_bid_amount,
              highest_bidder: records[i].highest_bidder,
              ID: records[i].ID,
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
          flxFeaturedAuctionsItemBottom.add(lblBidRate);
          flxFeaturedAuctionsItemBottom.add(flxLikeBid);
         
          
         
//           flxFeaturedAuctionsItemBottom.add(btnBidNow);
          
          flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemBottom);
          parentFlex.add(flexFeaturedAuctionsItem);
        }

        voltmx.print("exit from function");
    },
  
 createsIntoFeaturedAuctions1: function() {
        voltmx.print("entered into function");
   this._bidRateLabels = []; // store references to bid rate labels

//          this.resetAuctionCountdown(); 
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
        var parentFlex = this.view.flxScrollFilteredItems;
        
        parentFlex.reverseLayoutDirection = isArabic;
        this._countdownItems = []; // clear before populating
         
         
//           parentFlex.removeAll();
        var records = this.isRecords ? this.records : [];
        if(records.length === 0 ){
          
          return; 
        }
       var maxRecords = (records.length >= 5) ? 5 : records.length;
        for (var i = 0; i < maxRecords; i++) {
          

          var leftval = (i === 0) ? "20dp" : "10dp";
//           var leftvalar = ()
          var bidrateSkin;
         // var imageUrl = records[i].file_url;
          if (records && Array.isArray(records) && records[i] && records[i].file_url) {
    var imageUrl = records[i].file_url;
} else {
    voltmx.print("file_url missing or record undefined at index: " + i);
}

    var autobidimg = (records && records[i] && records[i].is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";


//           if(records[i].highest_bidder === this.userid){
//              bidrateSkin = "sknLblDubai02905120pxBold";
//           }
//           else{
//               bidrateSkin = "sknLblDubaid3243720pxbold";
//           }
          if (records[i] && records[i].highest_bidder === this.userid) {
    bidrateSkin = "sknLblDubai02905120pxBold";
} else {
    bidrateSkin = "sknLblDubaid3243720pxbold";
}

//           var objid = records[i].object_id;
//           var aucid = records[i].auction_id;
          if (records[i]) {
    var objid = records[i].object_id || records[i].reference_object_id;
    var aucid = records[i].auction_id;
    // continue processing...
} else {
    voltmx.print(" Skipping undefined record at index: " + i);
}

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
          if (records[i]) {
    if (records[i].is_favourite === "true") {
        flexskin = "sknFlxd32437custom120pxround";
        imgheartset = "heartlikerecommended.png";
    } else {
        flexskin = "sknFlx231f20custom120pxround";
        imgheartset = "imgdislikenew.png";
    }
} else {
    voltmx.print(" Skipped undefined record at index: " + i);
}

            // Creating the main flex container for each widget
//             var isLast = i === maxRecords - 1;
            var flexFeaturedAuctionsItem = new voltmx.ui.FlexContainer({
                id: "flexFeaturedAuctionsItem" + i,
              
                left: isArabic ? ((i === maxRecords - 1) ? "15dp" : "") : leftval,
               right: isArabic ? leftval : ((i === maxRecords - 1) ? "15dp" : ""), 
              
                width: "275dp", 
                height: "95%",
                zIndex: 1,
                isVisible: true,
//                 skin: "flxContainer45",
//                 top: (i * 330) + "dp",
                skin: "sknFlxFFFFFFBorderCCCCCC2px",
                clipBounds: true,
              

                
            }, {}, {});
          
            flexFeaturedAuctionsItem.objid = objid; 
            var flxFeaturedAuctionsItemTop = new voltmx.ui.FlexContainer({
              
             id: "flxFeaturedAuctionsItemTop" + i,
             centerX: "50%",
             height: "45%",
             width: "100%",
             zIndex:1,
             isVisible: true,
             top: "0%",
             skin: "sknFlxWhiteRoundedCorner",
             onClick : this.navToFleetPage.bind(this,objid,aucid),
             clipBounds: true  
            },{},{});
          
           var damAvailable = voltmx.store.getItem("isDamAvailable");
          var imgFeaturedAuctions = new voltmx.ui.Image2({
                id: "imgFeaturedAuctions" + i,
                isVisible: true,
               src : (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png",
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
               
          var lblCarname = new voltmx.ui.Label({
    id: "lblCarname" + i,
    isVisible: true,
    left: isArabic ? "": "4%",
    right: isArabic ? "4%" : "",
    top: "2%",
    height: "14%",
    width: voltmx.flex.USE_PREFERRED_SIZE,
    skin: "sknLblDubai00000020pxBold",
    //text: records[i].title ? records[i].title : "N/A",
      text: (records[i] && records[i].title) ? records[i].title : "N/A",
      
}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
  var bidEndTime = this.parseBidCloseDate(records[i].bid_close_date);
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
   // text: records[i].bid_close_date ? this.getTimeRemainingString(records[i].bid_close_date) : "N/A", 
     text: bidclosetime,

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
          
  if (this._countdownItems == null) this._countdownItems = [];

this._countdownItems.push({
    label: lblCountDown,
    endTime: timercount
});
          
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
  //  text: records[i].lot_no ? records[i].lot_no : "N/A"
    text: (records[i] && records[i].lot_no) ? records[i].lot_no : "N/A"

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT  }, {});
          
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
    width: "60%",
    centerY: "50%",
    skin: "sknLblDubai231f20",
   // text: records[i].no_of_bids ? records[i].no_of_bids : "N/A"
  text: (records[i] && records[i].location) ? records[i].location : "N/A"

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
 //   text: records[i].milage ? records[i].milage : "N/A"
  text: (records[i] && records[i].milage) ? records[i].milage : "N/A"

}, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT}, {});
flxLocation.add(lblLocation, lblLocationName);
          
 var flxBidAmount = new voltmx.ui.FlexContainer({
    id: "flxBidAmount" + i,
    isVisible: true,
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
    text: voltmx.i18n.getLocalizedString("Bid Amount") // localize if needed
}, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT}, {});

var lblBidRate = new voltmx.ui.Label({
    id: "lblBidRate" + i,
    isVisible: true,
   left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
    centerY: "50%",
    skin: bidrateSkin, // e.g., sknLblDubai02905120pxBold
   // text: "AED " + (records[i].max_bid ? records[i].max_bid : "N/A")
  text: (records[i] && records[i].max_bid !== undefined && records[i].max_bid !== null)
      ? "AED " + Number(records[i].max_bid).toLocaleString("en-AE")
      : "AED N/A"

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});

          flxBidAmount.add(lblBidAmountHeading, lblBidRate);

      this._bidRateLabels.push({
    id: lblBidRate.id,
    objid: objid
});



          
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
    isVisible: true,
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
            isVisible: true,
            height: "35dp",
            width: "42dp",
            centerY: "50%",
            right: "41%",
            skin: "sknFlxBasic",
            isVisible: false,
            layoutType: voltmx.flex.FREE_FORM,
            zIndex: 2,
            onClick: this.enableAutoBid.bind(this,{
              auction_id: records[i] && records[i].auction_id ? records[i].auction_id : "",
              object_id:  records[i] && records[i].object_id ? records[i].object_id : ""
            
            
            })
          }, {}, {});

          var imgAutoBid = new voltmx.ui.Image2({
            id: "imgAutoBid" + i,
            isVisible: true,
            centerX: "50%",
            centerY: "50%",
            height: "75%",
            width: "75%",
            src: autobidimg
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
//               ID: records[i].lot_no,
      auction_id: records[i] && records[i].auction_id ? records[i].auction_id : "",
      object_id: records[i] && records[i].object_id ? records[i].object_id : "",
      max_bid_amount: records[i] && records[i].max_bid ? records[i].max_bid : "",
      highest_bidder: records[i] && records[i].highest_bidder ? records[i].highest_bidder : "",
      ID: records[i] && records[i].lot_no ? records[i].lot_no : "",
              currentIndex: i,
         isSilent: false
            })  
}, { contentAlignment: constants.CONTENT_ALIGN_CENTER }, {});
flxLikeBid.add(flxLikeFromRecommendedFilter, flxBidEnable, btnBidNow);

     

          flxFeaturedAuctionsItemTop.add(imgFeaturedAuctions);

          flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemTop); 
          flxFeaturedAuctionsItemBottom.add(lblCarname);
          
           flxFeaturedAuctionsItemBottom.add(lblCountDown);
          flxFeaturedAuctionsItemBottom.add(flxLot);
          flxFeaturedAuctionsItemBottom.add(flxTotalBids);
         
          flxFeaturedAuctionsItemBottom.add(flxLocation);
          flxFeaturedAuctionsItemBottom.add(flxBidAmount);
          flxFeaturedAuctionsItemBottom.add(flxLikeBid);

          flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemBottom);
          parentFlex.add(flexFeaturedAuctionsItem);
        }
   
       // Force scroll to start in Arabic
     if (isArabic && parentFlex.scrollToEnd) {
        parentFlex.scrollToEnd();
    }
    // For LTR: make sure it starts from beginning
    else if (!isArabic && parentFlex.scrollToBeginning) {
        parentFlex.scrollToBeginning();
    }
     this.startAuctionCountdown();
        voltmx.print("exit from function");
    },
  
startAuctionCountdown: function () {
    if (this._auctionTimerId) voltmx.timer.cancel(this._auctionTimerId);

    this._auctionTimerId = "AUCTION_TIMER";

    voltmx.timer.schedule(this._auctionTimerId, function () {
        var now = new Date().getTime();

        this._countdownItems.forEach(function (item) {
//             var remaining = item.endTime.getTime() - now;
           var usertime = convertUTCtoUserTime(item.endTime);
            var label = item.label;

            if (!label) return;

//             if (remaining <= 0) {
//                 label.text = "Ended";
//                 return;
//             }

//             var seconds = Math.floor((remaining / 1000) % 60);
//             var minutes = Math.floor((remaining / (1000 * 60)) % 60);
//             var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
//             var days = Math.floor(remaining / (1000 * 60 * 60 * 24));

//             function pad(n) {
//                 return n < 10 ? "0" + n : n;
//             }

//             var formatted = `${days}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S` ;
//             label.text = formatted;
             label.text = getTimeRemainingStringWithSec(usertime);
        }, this);
    }.bind(this), 1, true); // repeat every 1 second
},
  
  parseBidCloseDate: function(dateStr) {
    // Ensure safe fallback
    if (!dateStr) return new Date();
    return new Date(dateStr.replace(" ", "T")); // Converts to "2025-07-25T06:30:00.0"
},
  
   createsIntoFeaturedAuctions2: function() {
        voltmx.print("entered into function");
     this._favBidRateLabels = [];
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
        var parentFlex = this.view.flxScrollFilteredItems;
      parentFlex.reverseLayoutDirection = isArabic;
//           parentFlex.removeAll();
         var records = this.isRecords ? this.records : [];
        if(records.length === 0 ){
          
          return; 
        }
        
        for (var i = 0; i < records.length; i++) {
          var leftval = (i === 0) ? "20dp" : "10dp";
          var bidrateSkin;
//            var imageUrl = records[i].file_url;
//           if(records[i].winning_bidder === this.userid){
//              bidrateSkin = "sknLblDubai02905120pxBold";
//           }
//           else{
//               bidrateSkin = "sknLblDubaid3243720pxbold";
//           }
//           var objid = records[i].object_id;
//           var aucid = records[i].auction_id;
          
                       var isSilent = false;

if (records && records[i] && records[i].auction_type_id) {
  if (records[i].auction_type_id.includes("4")) {
    isSilent = true;
  }
}
          var imageUrl = (records && records[i] && records[i].file_url) ? records[i].file_url : "";
         
var bidrateSkin = (records && records[i] && records[i].winning_bidder === this.userid)
    ? "sknLblDubai02905120pxBold"
    : "sknLblDubaid3243720pxbold";
     var silentSkin = "sknLblDubai0d74b520pxbold";
        let isYourBidVisible = false;
          if (records && records[i] && records[i].max_bid != null) {
  if (Number(records[i].max_bid) !== 0) {
    isYourBidVisible = true;
  }
}

var objid = (records && records[i] && records[i].object_id) ? records[i].object_id : "";
var aucid = (records && records[i] && records[i].auction_id) ? records[i].auction_id : "";
var autobidimg = (records && records[i] && records[i].is_auto_bid === "true") ? "autobidblue.png" : "autobidnewone.png";

//           var flexskin;
//           var imgheartset;
//           if(records[i].is_favourite === "true"){
//             flexskin = "sknFlxd32437custom120pxround";
//             imgheartset = "heartlikerecommended.png";
//           }
//           else{
//             flexskin = "sknFlx231f20custom120pxround";
//             imgheartset = "imgdislikenew.png";
//           }
            // Creating the main flex container for each widget
            
            var flexFeaturedAuctionsItem = new voltmx.ui.FlexContainer({
                id: "flexFeaturedAuctionsItem" + i,
//                 left: leftval,
//                right: (i === 4) ? "15dp" : "", 
              left: isArabic ? ((i === records.length - 1) ? "15dp" : "") : leftval,
               right: isArabic ? leftval : ((i === records.length - 1) ? "15dp" : ""), 
              
                width: "275dp", 
                height: "95%",
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
             onClick : this.navToFleetPage.bind(this,objid,aucid),
             clipBounds: true  
            },{},{});
          
          var damAvailable = voltmx.store.getItem("isDamAvailable");
          var imgFeaturedAuctions = new voltmx.ui.Image2({
                id: "imgFeaturedAuctions" + i,
                isVisible: true,
               src : (damAvailable && isValidURL(imageUrl)) ? imageUrl : "noimage.png",
//               src: imageUrl,
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
            text: records && records[i] && records[i].title ? records[i].title : "N/A",

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
    
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
//     text: records[i].bid_close_date ? this.getTimeRemainingString(records[i].bid_close_date) : "N/A", 
     text: bidclosetime

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT }, {});
          
  if (this._countdownItems == null) this._countdownItems = [];

this._countdownItems.push({
    label: lblCountDown,
    endTime: timercount
});
          
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
   // text: records[i].lot_no ? records[i].lot_no : "N/A"
    text: records && records[i] && records[i].lot_no ? records[i].lot_no : "N/A"

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});
          
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
  //  text: records[i].no_of_bids ? records[i].no_of_bids : "N/A"
  text: records && records[i] && records[i].location ? records[i].location : "N/A"

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
  //  text: records[i].milage ? records[i].milage : "N/A"
  text: records && records[i] && records[i].milage ? records[i].milage : "N/A"

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
    text: isSilent ? voltmx.i18n.getLocalizedString("Your Bid Amount") :voltmx.i18n.getLocalizedString("current bid") // localize if needed
}, {contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT}, {});

var lblBidRate = new voltmx.ui.Label({
    id: "lblBidRate" + i,
    isVisible: true,
   left: isArabic ? "4%": "",
    right: isArabic ? "" : "4%",
    centerY: "50%",
    skin: isSilent ? silentSkin : bidrateSkin, // e.g., sknLblDubai02905120pxBold
  //  text: "AED " + (records[i].max_bid ? records[i].max_bid : "N/A")
  text: "AED " + (records && records[i] && records[i].max_bid ? Number(records[i].max_bid).toLocaleString("en-AE") : "N/A")

}, { contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT }, {});

          flxBidAmount.add(lblBidAmountHeading, lblBidRate);
//           if (!this._favBidRateLabels) this._favBidRateLabels = [];
this._favBidRateLabels.push({
    id: lblBidRate.id,
    objid: objid
});

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
    isVisible: true,
    height: "34dp",
    width: "34dp",
    left: "4%",
    centerY: "50%",
    skin: "sknFlxd32437custom120pxround",
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
    src: "heartlikerecommended.png"
}, { imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO }, {});
flxLikeFromRecommendedFilter.add(imgHeartIconFromRecommended); 
          

          
          var flxBidEnable = new voltmx.ui.FlexContainer({
            id: "flxBidEnable" + i,
            isVisible: true,
            height: "35dp",
            width: "42dp",
            centerY: "50%",
            right: "41%",
            skin: "sknFlxBasic",
            isVisible: false,
            layoutType: voltmx.flex.FREE_FORM,
            zIndex: 2,
            onClick: this.enableAutoBid.bind(this,{
//               auction_id: records[i].auction_id,
//               object_id: records[i].object_id
              auction_id: records && records[i] && records[i].auction_id ? records[i].auction_id : "",
  object_id: records && records[i] && records[i].object_id ? records[i].object_id : ""
              })
          }, {}, {});

          var imgAutoBid = new voltmx.ui.Image2({
            id: "imgAutoBid" + i,
            isVisible: true,
            centerX: "50%",
            centerY: "50%",
            height: "75%",
            width: "75%",
            src: autobidimg
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
//               max_bid_amount: records[i].max_bid,
//               highest_bidder: records[i].winning_bidder,
//               ID: records[i].lot_no,
       auction_id: records && records[i] && records[i].auction_id ? records[i].auction_id : "",
  object_id: records && records[i] && records[i].object_id ? records[i].object_id : "",
  max_bid_amount: records && records[i] && records[i].max_bid ? records[i].max_bid : "",
  highest_bidder: records && records[i] && records[i].winning_bidder ? records[i].winning_bidder : "",
  ID: records && records[i] && records[i].lot_no ? records[i].lot_no : "",
              currentIndex: i,
       isSilent: isSilent
            })  
}, { contentAlignment: constants.CONTENT_ALIGN_CENTER }, {});
flxLikeBid.add(flxLikeFromRecommendedFilter, flxBidEnable, btnBidNow);

     

          flxFeaturedAuctionsItemTop.add(imgFeaturedAuctions);

          flexFeaturedAuctionsItem.add(flxFeaturedAuctionsItemTop); 
          flxFeaturedAuctionsItemBottom.add(lblCarname);
          
           flxFeaturedAuctionsItemBottom.add(lblCountDown);
          flxFeaturedAuctionsItemBottom.add(flxLot);
          flxFeaturedAuctionsItemBottom.add(flxTotalBids);
         
          flxFeaturedAuctionsItemBottom.add(flxLocation);
          flxFeaturedAuctionsItemBottom.add(flxBidAmount);
          flxFeaturedAuctionsItemBottom.add(flxLikeBid);

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
      this.startAuctionCountdown();
        voltmx.print("exit from function");
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
  
  
  
//       getTimeRemainingString: function(targetTimeString) {
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

//     return days + "D " + hours + "H " + minutes + "M ";
// //     + seconds + "S";
//   } catch (e) {
//     return "N/A";
//   }
// },
  
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
  
  navToFleetPage: function(objid,aucid)
  {
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);
    var context = {
      "objid":objid,
      "aucid":aucid
    }
    new voltmx.mvc.Navigation("frmDetails").navigate(context);
    
  },

  
  testrc: function()
  {
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxAutoBidAmountContainer.setVisibility(true);
    this.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
    this.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      this.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
    this.view.flxAmountAndButton.reverseLayoutDirection = isArabic;
    
//     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//         this.view.flxBidAmountSelectionContainer.setVisibility(true);
//       this.view.flxAutoBidandAmounts.reverseLayoutDirection = isArabic;
//       this.view.flxScrollBidAmount.reverseLayoutDirection = isArabic;
//       this.view.flxBidAmountEnterBox.reverseLayoutDirection = isArabic;
//       this.view.flxAcknowledge.reverseLayoutDirection = isArabic;
//       this.view.flxOverLay.setVisibility(true);
//       this.view.lblSelectIncrement.text = voltmx.i18n.getLocalizedString("Select the Increment");
//       this.view.btnAutoBid.text = voltmx.i18n.getLocalizedString("Auto Bid");
//       this.view.btnBidNow.text = voltmx.i18n.getLocalizedString("BID NOW");
//       this.view.lblTermsAck.text = voltmx.i18n.getLocalizedString("I acknowledge that I have examined the vehicle, accept its current condition, and agree to the terms and conditions related to it.");
//       this.view.tbxBidAmount.placeholder = voltmx.i18n.getLocalizedString("Enter Bid Amount");
      
//       this.view.lblTermsAck.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.tbxBidAmount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.rcTXT.text =  voltmx.i18n.getLocalizedString("I acknowledge that I have examined the vehicle, accept its current condition, and agree to the terms and conditions related to it.");
//       if(isArabic){
//         this.view.lblSelectIncrement.left = "";
//         this.view.lblSelectIncrement.right = "4%";
        
//         this.view.flxCloseBidAmountSelection.right = "";
//         this.view.flxCloseBidAmountSelection.left = "0dp";
        
//         this.view.btnAutoBid.left = "";
//         this.view.btnAutoBid.right = "4%";
        
//         this.view.flxScrollBidAmount.left = "";
//         this.view.flxScrollBidAmount.right = "-3%";
        
//         this.view.tbxBidAmount.left = "";
//         this.view.tbxBidAmount.right = "4%";
        
//         this.view.btnBidNow.left = "";
//         this.view.btnBidNow.right = "-3%";
        
//         this.view.flxCheckBox.left = "";
//         this.view.flxCheckBox.right = "4%";
        
//         this.view.lblTermsAck.left = "";
//         this.view.lblTermsAck.right = "2%";
//       }
//       else{
//         this.view.lblSelectIncrement.left = "4%";
//         this.view.lblSelectIncrement.right = "";
        
//         this.view.flxCloseBidAmountSelection.right = "0dp";
//         this.view.flxCloseBidAmountSelection.left = "";
        
//         this.view.btnAutoBid.left = "4%";
//         this.view.btnAutoBid.right = "";
        
//         this.view.flxScrollBidAmount.left = "-3%";
//         this.view.flxScrollBidAmount.right = "";
        
//         this.view.tbxBidAmount.left = "4%";
//         this.view.tbxBidAmount.right = "";
        
//         this.view.btnBidNow.left = "-3%";
//         this.view.btnBidNow.right = "";
        
//         this.view.flxCheckBox.left = "4%";
//         this.view.flxCheckBox.right = "";
        
//         this.view.lblTermsAck.left = "2%";
//         this.view.lblTermsAck.right = "";
//       }
  },
  
  
  
  openBidAmountContainer: function(params){
    var self = this;
    var isLogin = voltmx.store.getItem("isLogin");
    var isSilent = params.isSilent;
     this.view.flxScrollBidAmount.removeAll();
    this.aucid = null;
    this.objid = null;
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
      
      //if(this.mode !== "seller"){
       if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){
//      if(params.highest_bidder !== this.userid){
     this.aucid = params.auction_id;
    this.objid = params.object_id;
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
                    if (response && response.records && Array.isArray(response.records) &&
response.records.length > 0) {
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
//     }
         
//        else{
//       self.view.SmthngWentWrong.setVisibility(true);
//               self.view.SmthngWentWrong.lblSomethingWentWrong.text = "You're the highest bidder!";
//     }
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
  
//   createChipSetRelated: function(amountOnly) {
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
    if(this.view.tbxBidAmount.text.trim() !== "")
      {  
          if(this.view.imgCheck.isVisible){
         var self = this;
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
//         if (record.status_code && record.status_code.toLowerCase() === "success") {
            if (self.view.lblSuccessMsg) {
                self.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Your Bid Has Been Placed Successfully");
            }
            self.closeBidAmountContainer();
            self.view.flxBidSuccessPopup.setVisibility(true);
            self.view.flxOverLay.setVisibility(true);

            //  Update bid amount label in flex
            var bidAmount = self.view.tbxBidAmount.text.trim();
            var lblId = "lblBidRate" + self.currentIndex;
            var flxId = "flxBidAmount" + self.currentIndex;
            if (self.view[lblId]) {
                self.view[lblId].text = self.isSilent ? "AED "+ bidAmount : bidAmount;
                self.view[lblId].skin = self.isSilent ? "sknLblDubai0d74b520pxbold" : "sknLblDubai02905120pxBold";
            }
            
            if (self.view[flxId]) {
    if (self.isSilent && (!bidAmount || bidAmount === "0")) {
        self.view[flxId].setVisibility(false);
    } else {
        self.view[flxId].setVisibility(true);
    }
} 
            if(!self.isSilent)
              {
                eventAuctionBid(self.aucid,self.objid);
              }
        } else if (msg) {
            self.closeBidAmountContainer();
            self.view.SmthngWentWrong.setVisibility(true);
            if (self.view.SmthngWentWrong.lblSomethingWentWrong) {
                self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
            }
        } else {
            self.closeBidAmountContainer();
//             self.view.SmthngWentWrong.setVisibility(true);
//             if (self.view.SmthngWentWrong.lblSomethingWentWrong) {
//                 self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Something went wrong. Please try again.";
//             }
        }
    } else {
        self.closeBidAmountContainer();
        self.view.SmthngWentWrong.setVisibility(true);
        if (self.view.SmthngWentWrong.lblSomethingWentWrong) {
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
  
  closeBidAmountContainer: function(){
    this.view.flxBidAmountSelectionContainer.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
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
 
  
  toggleHeartStatus: function(index){
   var imgHeart = this.view["imgHeartIcon" + index]; // Get the image by ID

    if (imgHeart.src === "heartdislikefeaturedauctions.png") {
        imgHeart.src = "heartlikexx.png"; // Change to liked state
    } else {
        imgHeart.src = "heartdislikefeaturedauctions.png"; // Change back to unliked state
    }
  },
  

  
  toggleHeartStatusFromRecommended: function(objid, aucid, index) {
  var self = this;

  var isLogin = voltmx.store.getItem("isLogin");
  if (!isLogin) {
    new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    return;
  }

       if((voltmx.store.getItem("jobTitle") || "").toLowerCase().includes("buyer") || this.mode !== "seller"){
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
//       alert("Favorite toggle failed: " + message);
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
  
  
//   enableAutoBid: function(params){
//     var isLogin = voltmx.store.getItem("isLogin");
//      this.objIdForAutoBid = null;
//     this.aucIdForAutoBid = null;
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
    self.view.lblEnterMaxBidAmount.text = voltmx.i18n.getLocalizedString("Enter Maximum Bid Amount");
    self.view.tbxAutoBidAmount.placeholder = voltmx.i18n.getLocalizedString("Amount");
      self.view.btnAutoBidCall.text = voltmx.i18n.getLocalizedString("Auto Bid");
    self.view.flxAmountAndButton.reverseLayoutDirection = isArabic;
    
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
  

showRecommendedFilterFlex: function(filter){
    // Stop any existing auto-refresh before switching
    try { voltmx.timer.cancel("FeaturedAutoRefresh"); } catch(e) {}

    switch(filter){
      case "recommended":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilter";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
        this.invokeRecommendedList();
        this.startAutoRefresh("Recommended"); // Step 3
        break;

      case "endingsoon":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilter";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
        this.invokeEndingSoonList();
        this.startAutoRefresh("EndingSoon"); // Step 3
        break;

      case "recentlyviewed":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilter";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
        this.invokeRecentlyList();
        this.startAutoRefresh("RecentlyViewed"); // Step 3
        break;

      case "yourfavourites":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilter";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
        this.invokeFavourites();
//         this.startAutoRefresh("YourFavourites"); // Step 3
        this.startFavouritesAutoRefresh();
        break;

      case "newlylisted":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilter";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilterNormal";
        this.invokeNewlyList();
        this.startAutoRefresh("NewlyListed"); // Step 3
        break;
        
      case "hotitems":
        this.view.btnRecommended.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnEndingSoon.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnRecentlyViewed.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnYourFavourites.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnNewlyListedVehicles.skin = "sknBtnRecommendedFilterNormal";
        this.view.btnHotItems.skin = "sknBtnRecommendedFilter";
        this.invokeHotItems();
        this.startAutoRefresh("Hot"); // Step 3
        break;
    }
},

  
  invokeEndingSoonList: function()
  {
        var self = this;
//     checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function invokeEndingList(status, get_buyer_ending_soon) {

      voltmx.application.dismissLoadingScreen();
         var responseCode = get_buyer_ending_soon && get_buyer_ending_soon.httpresponse && get_buyer_ending_soon.httpresponse.responsecode;
         var opstatus = get_buyer_ending_soon && get_buyer_ending_soon.opstatus;
          if (opstatus === 1011) {
    self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
    return;
}

// Other non-zero opstatus (general failure)
if (opstatus !== 0) {
    if(self.view.SmthngWentWrong){
        self.view.SmthngWentWrong.setVisibility(false);
        }
    return;
}
      self.view.flxError.setVisibility(false);
      var records = [];
if (
  get_buyer_ending_soon &&
  get_buyer_ending_soon.records &&
  Array.isArray(get_buyer_ending_soon.records)
) {
  records = get_buyer_ending_soon.records;
}

//       var records = get_buyer_ending_soon && get_buyer_ending_soon.records ? get_buyer_ending_soon.records : [];
      if (records.length > 0) {
      self.records = records;
      self.isRecords = true;
     self.view.flxScrollFilteredItems.setVisibility(true);
    } else {
      self.records = [];  // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }

    // Always call create function after response
    self.view.flxScrollFilteredItems.removeAll(); 
    self.createsIntoFeaturedAuctions1();
    }
    if (get_buyer_ending_soon_inputparam == undefined) {
        var get_buyer_ending_soon_inputparam = {};
    }
    
    
    get_buyer_ending_soon_inputparam["serviceID"] = "fry_int_buyer$get-buyer-ending-soon-proc";
     get_buyer_ending_soon_inputparam["user_id"] = userid;
     get_buyer_ending_soon_inputparam["page"] = "1";
     get_buyer_ending_soon_inputparam["pageSize"] = "10";
     get_buyer_ending_soon_inputparam["language"] = currentLocale || "en";
    
    
    var get_buyer_ending_soon_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_ending_soon_inputparam["httpheaders"] = get_buyer_ending_soon_httpheaders;
    var get_buyer_ending_soon_httpconfigs = {};
    get_buyer_ending_soon_inputparam["httpconfig"] = get_buyer_ending_soon_httpconfigs;
    fry_int_buyer$get_buyer_ending_soon = mfintegrationsecureinvokerasync(get_buyer_ending_soon_inputparam, "fry_int_buyer", "get-buyer-ending-soon-proc", invokeEndingList);
//     });
    },
  
  invokeRecentlyList: function()
  {
    
      var self = this;
    checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function invokeRecentlyViewList(status, get_buyer_recently_viewed_vehicles) {
      voltmx.application.dismissLoadingScreen();
      
        var responseCode = get_buyer_recently_viewed_vehicles && get_buyer_recently_viewed_vehicles.httpresponse && get_buyer_recently_viewed_vehicles.httpresponse.responsecode;
        var opstatus = get_buyer_recently_viewed_vehicles && get_buyer_recently_viewed_vehicles.opstatus;
         if (opstatus === 1011) {
    self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
    return;
}

// Other non-zero opstatus (general failure)
if (opstatus !== 0) {
    if(self.view.SmthngWentWrong){
        self.view.SmthngWentWrong.setVisibility(false);
        }
    return;
}
       self.view.flxError.setVisibility(false);
      
      var records = [];
if (
  get_buyer_recently_viewed_vehicles && get_buyer_recently_viewed_vehicles.records &&
  Array.isArray(get_buyer_recently_viewed_vehicles.records)
) {
  records = get_buyer_recently_viewed_vehicles.records;
}

      
//       var records = get_buyer_recently_viewed_vehicles && get_buyer_recently_viewed_vehicles.records ? get_buyer_recently_viewed_vehicles.records : [];
      if (records.length > 0) {
      self.records = records;
      self.isRecords = true;
     self.view.flxScrollFilteredItems.setVisibility(true);
    } else {
      self.records = [];  // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }

    // Always call create function after response
    self.view.flxScrollFilteredItems.removeAll(); 
    self.createsIntoFeaturedAuctions1();
    }
    if (get_buyer_recently_viewed_vehicles_inputparam == undefined) {
        var get_buyer_recently_viewed_vehicles_inputparam = {};
    }
    get_buyer_recently_viewed_vehicles_inputparam["serviceID"] = "fry_int_buyer$get-buyer-recently-viewed-vehicles-proc";
     get_buyer_recently_viewed_vehicles_inputparam["user_id"] = userid;
     get_buyer_recently_viewed_vehicles_inputparam["page"] = "1";
     get_buyer_recently_viewed_vehicles_inputparam["pageSize"] = "10";
     get_buyer_recently_viewed_vehicles_inputparam["language"] = currentLocale || "en";
    var get_buyer_recently_viewed_vehicles_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_recently_viewed_vehicles_inputparam["httpheaders"] = get_buyer_recently_viewed_vehicles_httpheaders;
    var get_buyer_recently_viewed_vehicles_httpconfigs = {};
    get_buyer_recently_viewed_vehicles_inputparam["httpconfig"] = get_buyer_recently_viewed_vehicles_httpconfigs;
    fry_int_buyer$get_buyer_recently_viewed_vehicles = mfintegrationsecureinvokerasync(get_buyer_recently_viewed_vehicles_inputparam, "fry_int_buyer", "get-buyer-recently-viewed-vehicles-proc", invokeRecentlyViewList);
    });
    
  },
  
  invokeRecommendedList: function()
  {
     var self = this;
    checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function invokeRecommendListCallBack(status, get_buyer_recommended_vehicles) {
  try {
    voltmx.application.dismissLoadingScreen();

    var opstatus = get_buyer_recommended_vehicles && get_buyer_recommended_vehicles.opstatus;
    var responseCode =
      get_buyer_recommended_vehicles &&
      get_buyer_recommended_vehicles.httpresponse &&
      get_buyer_recommended_vehicles.httpresponse.responsecode;

    // Network issue
    if (opstatus === 1011) {
      self.view.flxError.lblNetworkConnectionerror.text =
        "Network issue. Please check your connection.";
      self.view.flxError.setVisibility(true);
      return;
    }

    // General failure
    if (opstatus !== 0) {
      if (self.view.SmthngWentWrong) {
        self.view.SmthngWentWrong.setVisibility(false);
      }
      return;
    }

    // Success flow
    self.view.flxError.setVisibility(false);

    var records = [];
    if (
      get_buyer_recommended_vehicles && get_buyer_recommended_vehicles.records &&
      Array.isArray(get_buyer_recommended_vehicles.records)
    ) {
      records = get_buyer_recommended_vehicles.records;
    }

    if (records.length > 0) {
      self.records = records;
      self.isRecords = true;
      self.view.flxScrollFilteredItems.setVisibility(true);
    } else {
      self.records = []; // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }

    // Always call create function after response
    self.view.flxScrollFilteredItems.removeAll();
    self.createsIntoFeaturedAuctions1();

  } catch (e) {
    voltmx.print("Error in invokeRecommendListCallBack: " + e.message);
  
  }
}

    if (get_buyer_recommended_vehicles_inputparam == undefined) {
        var get_buyer_recommended_vehicles_inputparam = {};
    }
    get_buyer_recommended_vehicles_inputparam["serviceID"] = "fry_int_buyer$get-buyer-recommended-vehicles";
    get_buyer_recommended_vehicles_inputparam["user_id"] = userid;
     get_buyer_recommended_vehicles_inputparam["page"] = "1";
     get_buyer_recommended_vehicles_inputparam["pageSize"] = "10";
     get_buyer_recommended_vehicles_inputparam["language"] = currentLocale || "en";
    var get_buyer_recommended_vehicles_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_recommended_vehicles_inputparam["httpheaders"] = get_buyer_recommended_vehicles_httpheaders;
    var get_buyer_recommended_vehicles_httpconfigs = {};
    get_buyer_recommended_vehicles_inputparam["httpconfig"] = get_buyer_recommended_vehicles_httpconfigs;
    fry_int_buyer$get_buyer_recommended_vehicles = mfintegrationsecureinvokerasync(get_buyer_recommended_vehicles_inputparam, "fry_int_buyer", "get-buyer-recommended-vehicles", invokeRecommendListCallBack);
    });
    },
  
  invokeNewlyList: function()
  {
       var self = this;
//     checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function newlyListedCallBack(status, get_buyer_newly_listed_fleets) {
      voltmx.application.dismissLoadingScreen();
       var responseCode = get_buyer_newly_listed_fleets && get_buyer_newly_listed_fleets.httpresponse && get_buyer_newly_listed_fleets.httpresponse.responsecode;
        var opstatus = get_buyer_newly_listed_fleets && get_buyer_newly_listed_fleets.opstatus;
     if (opstatus === 1011) {
    self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
    return;
}

// Other non-zero opstatus (general failure)
if (opstatus !== 0) {
    if(self.view.SmthngWentWrong){
        self.view.SmthngWentWrong.setVisibility(false);
        }
    return;
}
      self.view.flxError.setVisibility(false);
      var records = [];
if (
  get_buyer_newly_listed_fleets &&
  get_buyer_newly_listed_fleets.records &&
  Array.isArray(get_buyer_newly_listed_fleets.records)
) {
  records = get_buyer_newly_listed_fleets.records;
}

//       var records = get_buyer_newly_listed_fleets && get_buyer_newly_listed_fleets.records ? get_buyer_newly_listed_fleets.records : [];
      if (records.length > 0) {
      self.records = records;
      self.isRecords = true;
      self.view.flxScrollFilteredItems.setVisibility(true);
    } else {
      self.records = [];  // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }

    // Always call create function after response
    self.view.flxScrollFilteredItems.removeAll(); 
    self.createsIntoFeaturedAuctions1();
    }
    if (get_buyer_newly_listed_fleets_inputparam == undefined) {
        var get_buyer_newly_listed_fleets_inputparam = {};
    }
    get_buyer_newly_listed_fleets_inputparam["serviceID"] = "fry_int_buyer$get-buyer-newly-listed-fleets-proc";
    get_buyer_newly_listed_fleets_inputparam["user_id"] = userid;
     get_buyer_newly_listed_fleets_inputparam["page"] = "1";
     get_buyer_newly_listed_fleets_inputparam["pageSize"] = "10";
     get_buyer_newly_listed_fleets_inputparam["language"] = currentLocale || "en";
    var get_buyer_newly_listed_fleets_httpheaders = {};
    get_buyer_newly_listed_fleets_inputparam["httpheaders"] = get_buyer_newly_listed_fleets_httpheaders;
    var get_buyer_newly_listed_fleets_httpconfigs = {};
    get_buyer_newly_listed_fleets_inputparam["httpconfig"] = get_buyer_newly_listed_fleets_httpconfigs;
    fry_int_buyer$get_buyer_newly_listed_fleets = mfintegrationsecureinvokerasync(get_buyer_newly_listed_fleets_inputparam, "fry_int_buyer", "get-buyer-newly-listed-fleets-proc", newlyListedCallBack);
//     });
  },
  
  invokeHotItems: function()
  {
    var self = this;
//     checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function invokeHotItemsCallBack(status, get_buyer_hot_items) {
      voltmx.application.dismissLoadingScreen();
      
        var responseCode = get_buyer_hot_items && get_buyer_hot_items.httpresponse && get_buyer_hot_items.httpresponse.responsecode;
         var opstatus = get_buyer_hot_items && get_buyer_hot_items.opstatus;
        if (opstatus === 1011) {
    self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
    return;
}

// Other non-zero opstatus (general failure)
if (opstatus !== 0) {
   if(self.view.SmthngWentWrong){
        self.view.SmthngWentWrong.setVisibility(false);
        }
    return;
}
       self.view.flxError.setVisibility(false);
      var records = [];
if (
  get_buyer_hot_items &&
  get_buyer_hot_items.records &&
  Array.isArray(get_buyer_hot_items.records)
) {
  records = get_buyer_hot_items.records;
}

//        var records = get_buyer_hot_items && get_buyer_hot_items.records ? get_buyer_hot_items.records : [];
      if (records.length > 0) {
      self.records = records;
      self.isRecords = true;
      self.view.flxScrollFilteredItems.setVisibility(true);
    } else {
      self.records = [];  // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }

    // Always call create function after response
    self.view.flxScrollFilteredItems.removeAll(); 
    self.createsIntoFeaturedAuctions1();
    }
    if (get_buyer_hot_items_inputparam == undefined) {
        var get_buyer_hot_items_inputparam = {};
    }
    get_buyer_hot_items_inputparam["serviceID"] = "fry_int_buyer$get-buyer-hot-items";
    get_buyer_hot_items_inputparam["userId"] = userid;
     get_buyer_hot_items_inputparam["page"] = "1";
     get_buyer_hot_items_inputparam["pageSize"] = "10";
   
      get_buyer_hot_items_inputparam["language"] = currentLocale || "en";
  
    var get_buyer_hot_items_httpheaders = {};
    get_buyer_hot_items_inputparam["httpheaders"] = get_buyer_hot_items_httpheaders;
    var get_buyer_hot_items_httpconfigs = {};
    get_buyer_hot_items_inputparam["httpconfig"] = get_buyer_hot_items_httpconfigs;
    fry_int_buyer$get_buyer_hot_items = mfintegrationsecureinvokerasync(get_buyer_hot_items_inputparam, "fry_int_buyer", "get-buyer-hot-items", invokeHotItemsCallBack);
//     });
  },
  
  invokeFavourites: function()
  {
     var self = this;
    checkTokenValidatity(function() {
            voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
    function invServiceCallBack(status, get_tracked_objects) {
      voltmx.application.dismissLoadingScreen();
      
        var responseCode = get_tracked_objects && get_tracked_objects.httpresponse && get_tracked_objects.httpresponse.responsecode;
        var opstatus = get_tracked_objects && get_tracked_objects.opstatus;
         if (opstatus === 1011) {
    self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
    self.view.flxError.setVisibility(true);
    return;
}

// Other non-zero opstatus (general failure)
if (opstatus !== 0) {
    if(self.view.SmthngWentWrong){
        self.view.SmthngWentWrong.setVisibility(false);
        }
    return;
}
      self.view.flxError.setVisibility(false);
     voltmx.print("Service status: " + status);
  voltmx.print("Response: " + JSON.stringify(get_tracked_objects));
 var records = [];
  // Check for server or token issues
  if (get_tracked_objects &&
    get_tracked_objects.opstatus === 0 &&
    get_tracked_objects.records &&
  Array.isArray(get_tracked_objects.records)
  ) {
      records = get_tracked_objects.records;
    if(records.length > 0){
    self.records = records;
      self.isRecords = true;
      self.view.flxScrollFilteredItems.setVisibility(true);
    }
    else{
       self.records = [];  // fallback to empty
      self.isRecords = false;
      self.view.flxScrollFilteredItems.setVisibility(false);
    }
    
    self.view.flxScrollFilteredItems.removeAll(); 
    self.createsIntoFeaturedAuctions2();
    
  } else if (
    get_tracked_objects &&
    (get_tracked_objects.httpStatusCode === 401 || get_tracked_objects.opstatus === 1001)
  ) {
    // Token expired or unauthorized
//     alert("Session expired. Please log in again.");
    // Optionally redirect to login screen here
  } else {
    // Generic error handler
//     alert("Something went wrong while fetching favourites. Please try again later.");
  }
    }
    if (get_tracked_objects_inputparam == undefined) {
        var get_tracked_objects_inputparam = {};
    }
    
    get_tracked_objects_inputparam["serviceID"] = "fry_int_buyer$get-tracked-objects";
    get_tracked_objects_inputparam["user_id"] = userid;
    get_tracked_objects_inputparam["type"] = "favorites";
    get_tracked_objects_inputparam["page"] = "1";
    get_tracked_objects_inputparam["pageSize"] = "10";
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
  
  
  navToVehicleInspection: function(){

    
    var isLogin = voltmx.store.getItem("isLogin");
    var currentFormId = voltmx.application.getCurrentForm().id;
    voltmx.store.setItem("originForm", currentFormId);
     voltmx.store.setItem("originFormForCB", currentFormId);
    if(isLogin)  new voltmx.mvc.Navigation("frmVehicleInspection").navigate();
    else new voltmx.mvc.Navigation("frmLoginScreen").navigate();

    
  },
  
  navToRoadSideAsst: function()
  {
    
    var isLogin = voltmx.store.getItem("isLogin");
       if(isLogin)  new voltmx.mvc.Navigation("frmRoadSideAssistance").navigate(
       {
          "prevForm": "DashBoard"
       });
       else new voltmx.mvc.Navigation("frmLoginScreen").navigate();
  
  },
  
  navToAuctionCalendar: function(){
    var x = new voltmx.mvc.Navigation("frmAuctionCalendar");
    x.navigate();
  },
  
  navtosiletauctioncalender: function(){
     var x = new voltmx.mvc.Navigation("frmAuctionCalendarSilent");
    x.navigate();
  },
  
  navToauctionCategory: function(){
      var x = new voltmx.mvc.Navigation("frmAuctionCategories");
    x.navigate();
  },
  
  navToAuctionList: function(){
    var x = new voltmx.mvc.Navigation("frmAllAuctionsList");
    x.navigate();
  },
  
  
  
  
  
    
   setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

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
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");




  var flexList = [
    
    "flxCalHeading","flxScrollRecommendedFilterHeading","flxUnderLineContainer","CopyflxUnderLineContainer0c2064eb597744b","CopyflxUnderLineContainer0gbfb74c5256c4c","CopyflxUnderLineContainer0d7c2d7bc333046"
  ];


  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }
  
     if(isArabic){
       this.view.btnHotItems.left = "20dp";
       this.view.btnHotItems.right = "";
       this.view.btnRecommended.left = "10dp";
       this.view.btnRecommended.right = "20dp";
       
       this.view.lblAuctionCalendar.left = "";
       this.view.lblAuctionCalendar.right = "10dp";
       
       this.view.flxUL1.left = "";
       this.view.flxUL1.right = "10dp";
       this.view.flxUL2.left = "";
       this.view.flxUL2.right = "3dp";
       
           this.view.CopyflxUL0b0601b8e8ad34c.left = "";
       this.view.CopyflxUL0b0601b8e8ad34c.right = "10dp";
       this.view.CopyflxUL0j1859389c2564e.left = "";
       this.view.CopyflxUL0j1859389c2564e.right = "3dp";
       
       this.view.lblFeaturedAuctions.left = "";
       this.view.lblFeaturedAuctions.right = "10dp";
       
       this.view.lblTestimonials.left = "";
       this.view.lblTestimonials.right = "10dp";
       
       this.view.flxViewAll.right = "";
       this.view.flxViewAll.left = "0dp";
       
       this.view.CopyflxViewAll0b6944285c44644.right = "";
       this.view.CopyflxViewAll0b6944285c44644.left = "0dp";
       
       this.view.lblValueAddedServices.left = "";
       this.view.lblValueAddedServices.right = "10dp";
       
          this.view.CopyflxUL0a9f0cfb1600944.left = "";
       this.view.CopyflxUL0a9f0cfb1600944.right = "10dp";
       this.view.CopyflxUL0b5ba46d98e234d.left = "";
       this.view.CopyflxUL0b5ba46d98e234d.right = "3dp";
       
       this.view.CopyflxUL0b3c0098dcd6d4c.left = "";
       this.view.CopyflxUL0b3c0098dcd6d4c.right = "10dp";
       
       this.view.CopyflxUL0jd038776c88d47.left = "";
       this.view.CopyflxUL0jd038776c88d47.right = "3dp";
  }
     else{
       this.view.btnRecommended.left = "20dp";
       this.view.btnRecommended.right = "";
       this.view.btnHotItems.left = "10dp";
       this.view.btnHotItems.right = "20dp";
       
       this.view.lblAuctionCalendar.left = "10dp";
       this.view.lblAuctionCalendar.right = "";
       
       this.view.flxUL1.left = "10dp";
       this.view.flxUL1.right = "";
       this.view.flxUL2.left = "3dp";
       this.view.flxUL2.right = "";
       
       this.view.CopyflxUL0b0601b8e8ad34c.left = "10dp";
       this.view.CopyflxUL0b0601b8e8ad34c.right = "";
       this.view.CopyflxUL0j1859389c2564e.left = "3dp";
       this.view.CopyflxUL0j1859389c2564e.right = "";
       
       this.view.lblFeaturedAuctions.left = "10dp";
       this.view.lblFeaturedAuctions.right = "";
       
       this.view.lblTestimonials.left = "10dp";
       this.view.lblTestimonials.right = "";
       
       this.view.flxViewAll.right = "0dp";
       this.view.flxViewAll.left = "";
       
       this.view.CopyflxViewAll0b6944285c44644.right = "0dp";
       this.view.CopyflxViewAll0b6944285c44644.left = "";
       
       this.view.lblValueAddedServices.left = "10dp";
       this.view.lblValueAddedServices.right = "";
       
       this.view.CopyflxUL0a9f0cfb1600944.left = "10dp";
       this.view.CopyflxUL0a9f0cfb1600944.right = "";
       this.view.CopyflxUL0b5ba46d98e234d.left = "3dp";
       this.view.CopyflxUL0b5ba46d98e234d.right = "";
       
        this.view.CopyflxUL0b3c0098dcd6d4c.left = "10dp";
       this.view.CopyflxUL0b3c0098dcd6d4c.right = "";
       
       this.view.CopyflxUL0jd038776c88d47.left = "3dp";
       this.view.CopyflxUL0jd038776c88d47.right = "";
     }
     
  this.view.lblAuctionCalendar.text=voltmx.i18n.getLocalizedString("Auction Calendar");
     
     this.view.lblTestimonials.text = voltmx.i18n.getLocalizedString("Testimonials");
 this.view.CopylblServiceItem0cef14616000344.text=voltmx.i18n.getLocalizedString("ONLINE AUCTIONS");
   this.view.CopylblServiceItem0ae6b3f20071644.text=voltmx.i18n.getLocalizedString("Silent Auctions"); 
     this.view.CopylblServiceItem0d685eec66cd348.text=voltmx.i18n.getLocalizedString("UAE Plates");
     this.view.lblServiceItem1.text=voltmx.i18n.getLocalizedString("Vehicle Inspection");
     this.view.lblServiceItem2.text=voltmx.i18n.getLocalizedString("Vehicle Delivery");
     this.view.lblServiceItem3.text=voltmx.i18n.getLocalizedString("Ownership Transfer");
     this.view.lblServiceItem4.text=voltmx.i18n.getLocalizedString("Polishing & Detailing");
     this.view.lblServiceItem5.text=voltmx.i18n.getLocalizedString("Maintenance & Repairs");
     this.view.lblServiceItem6.text=voltmx.i18n.getLocalizedString("More Services");
     this.view.btnRecommended.text=voltmx.i18n.getLocalizedString("Recommended");
     this.view.btnEndingSoon.text=voltmx.i18n.getLocalizedString("Ending Soon");
     this.view.btnRecentlyViewed.text=voltmx.i18n.getLocalizedString("Recently Viewed");
    this.view.btnYourFavourites.text=voltmx.i18n.getLocalizedString("Your Favorites");
     this.view.btnNewlyListedVehicles.text=voltmx.i18n.getLocalizedString("Newly Listed Vehicles");
     this.view.btnHotItems.text=voltmx.i18n.getLocalizedString("Hot items");
     this.view.lblFeaturedAuctions.text = voltmx.i18n.getLocalizedString("Featured Auctions");
     this.view.lblViewAll.text = voltmx.i18n.getLocalizedString("View All");
     this.view.lblValueAddedServices.text = voltmx.i18n.getLocalizedString("Value Added Services");
     this.view.CopylblServiceItem0a67b0f71af8d49.text=voltmx.i18n.getLocalizedString("Equipment & Machinery");
     this.view.CopylblServiceItem0e5f94c04e72f4a.text=voltmx.i18n.getLocalizedString("Emirates Moto");
     this.view.CopylblServiceItem0h7eb84b90cd14a.text=voltmx.i18n.getLocalizedString("General Items");
     this.view.CopylblViewAll0ida4196b1f364f.text = voltmx.i18n.getLocalizedString("View All");
     this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Congratulations");
     this.view.btnCloseBidSuccessPopUp.text = voltmx.i18n.getLocalizedString("closeCaps");
     this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
     this.view.tc.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    this.view.tc.richTextPoints.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

     
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
   },
  
//   updateFeaturedAuctionPrices: function(newRecords) {
//   var self = this;
//   var parentFlex = self.view.flxScrollFilteredItems;
//   if (!parentFlex || parentFlex.widgets().length === 0) return;

//   var dataMap = {};
//   for (var i = 0; i < newRecords.length; i++) {
//     var rec = newRecords[i];
//     dataMap[rec.object_id] = rec;
//   }

//   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

//   // Loop through existing flex cards
//   var children = parentFlex.widgets();
//   for (var j = 0; j < children.length; j++) {
//     var flexItem = children[j];
//     try {
//       var objid = flexItem.objid || ""; // store objid when creating flex (see below)
//       if (!objid || !dataMap[objid]) continue;
//       var latest = dataMap[objid];

//       var newPrice = Number(latest.max_bid).toLocaleString("en-AE");
//       var lblBidRate = flexItem.widgets().find(w => w.id.startsWith("lblBidRate"));
//       if (!lblBidRate) continue;

//       var currentDisplayedPrice = lblBidRate.text.replace("AED ", "").trim();

//       if (currentDisplayedPrice !== newPrice) {
//         // Change price & skin
//         var newSkin = latest.highest_bidder === self.userid
//           ? "sknLblDubai02905120pxBold"
//           : "sknLblDubaid3243720pxbold";

//         lblBidRate.text = "AED " + newPrice;
//         lblBidRate.skin = newSkin;
//         lblBidRate.left = isArabic ? "4%" : "";
//         lblBidRate.right = isArabic ? "" : "4%";
//         lblBidRate.contentAlignment = isArabic
//           ? constants.CONTENT_ALIGN_MIDDLE_LEFT
//           : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       }
//     } catch (e) {
//       voltmx.print("Error updating featured auction price: " + e.message);
//     }
//   }
// },

updateFeaturedAuctionPrices: function(newRecords) {
    var self = this;
    if (!this._bidRateLabels || this._bidRateLabels.length === 0) return;

    var dataMap = {};
    for (var i = 0; i < newRecords.length; i++) {
        var rec = newRecords[i];
        dataMap[rec.object_id] = rec;
    }

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    for (var j = 0; j < this._bidRateLabels.length; j++) {
        var item = this._bidRateLabels[j];
        var lblBidRate = this.view[item.id];  // get widget by ID
        var objid = item.objid;

        if (!lblBidRate || !objid || !dataMap[objid]) continue;

        var latest = dataMap[objid];
        var newPrice = latest.max_bid !== undefined && latest.max_bid !== null
            ? Number(latest.max_bid).toLocaleString("en-AE")
            : "N/A";

        if (lblBidRate.text.replace("AED ", "").trim() !== newPrice) {
            lblBidRate.text = "AED " + newPrice;
            lblBidRate.skin = latest.highest_bidder === self.userid
                ? "sknLblDubai02905120pxBold"
                : "sknLblDubaid3243720pxbold";

            lblBidRate.left = isArabic ? "4%" : "";
            lblBidRate.right = isArabic ? "" : "4%";
            lblBidRate.contentAlignment = isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_LEFT
                : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        }
    }
},
  
 startAutoRefresh: function(activeSection) {
  var self = this;
  try { voltmx.timer.cancel("FeaturedAutoRefresh"); } catch(e) {}
  try { voltmx.timer.cancel("FavouritesAutoRefresh"); } catch(e) {}
  voltmx.timer.schedule("FeaturedAutoRefresh", function() {
    switch (activeSection) {
      case "Hot": self.refreshHotItemsData.call(self); break;
      case "EndingSoon": self.refreshEndingSoonData.call(self); break;
      case "NewlyListed": self.refreshNewlyListedData.call(self); break;
      case "RecentlyViewed": self.refreshRecentlyViewedData.call(self); break;
      case "Recommended": self.refreshRecommendedData.call(self); break;
      
    }
  }, 3, true);
},


refreshHotItemsData: function() {
  var self = this;
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");
  var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

  var params = {
    serviceID: "fry_int_buyer$get-buyer-hot-items",
    userId: userid,
    page: "1",
    pageSize: "10",
    language: currentLocale,
    httpheaders: { user_token: usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    params,
    "fry_int_buyer",
    "get-buyer-hot-items",
    function(status, res) {
      if (res && res.opstatus === 0 && Array.isArray(res.records)) {
        self.updateFeaturedAuctionPrices.call(self, res.records);
      }
    }
  );
},

  refreshEndingSoonData: function() {
  var self = this;
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");
  var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

  var params = {
    serviceID: "fry_int_buyer$get-buyer-ending-soon-proc",
    user_id: userid,
    page: "1",
    pageSize: "10",
    language: currentLocale,
    httpheaders: { user_token: usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    params,
    "fry_int_buyer",
    "get-buyer-ending-soon-proc",
    function(status, res) {
      if (res && res.opstatus === 0 && Array.isArray(res.records)) {
        self.updateFeaturedAuctionPrices.call(self, res.records);
      }
    }
  );
},

  refreshNewlyListedData: function() {
  var self = this;
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");
  var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

  var params = {
    serviceID: "fry_int_buyer$get-buyer-newly-listed-fleets-proc",
    user_id: userid,
    page: "1",
    pageSize: "10",
    language: currentLocale,
    httpheaders: { user_token: usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    params,
    "fry_int_buyer",
    "get-buyer-newly-listed-fleets-proc",
    function(status, res) {
      if (res && res.opstatus === 0 && Array.isArray(res.records)) {
        self.updateFeaturedAuctionPrices.call(self, res.records);
      }
    }
  );
},

  refreshRecentlyViewedData: function() {
  var self = this;
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");
  var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

  var params = {
    serviceID: "fry_int_buyer$get-buyer-recently-viewed-vehicles-proc",
    user_id: userid,
    page: "1",
    pageSize: "10",
    language: currentLocale,
    httpheaders: { user_token: usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    params,
    "fry_int_buyer",
    "get-buyer-recently-viewed-vehicles-proc",
    function(status, res) {
      if (res && res.opstatus === 0 && Array.isArray(res.records)) {
        self.updateFeaturedAuctionPrices.call(self, res.records);
      }
    }
  );
},

  refreshRecommendedData: function() {
  var self = this;
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userid = voltmx.store.getItem("userId");
  var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

  var params = {
    serviceID: "fry_int_buyer$get-buyer-recommended-vehicles",
    user_id: userid,
    page: "1",
    pageSize: "10",
    language: currentLocale,
    httpheaders: { user_token: usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    params,
    "fry_int_buyer",
    "get-buyer-recommended-vehicles",
    function(status, res) {
      if (res && res.opstatus === 0 && Array.isArray(res.records)) {
        self.updateFeaturedAuctionPrices.call(self, res.records);
      }
    }
  );
},

  startFavouritesAutoRefresh: function() {
    var self = this;
    try { voltmx.timer.cancel("FavouritesAutoRefresh"); } catch(e) {}
     try { voltmx.timer.cancel("FeaturedAutoRefresh"); } catch(e) {}
    voltmx.timer.schedule("FavouritesAutoRefresh", function() {
        self.refreshFavouriteItemsData.call(self);
    }, 3, true);
},

  
  refreshFavouriteItemsData: function() {
    var self = this;
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";

    var params = {
        serviceID: "fry_int_buyer$get-tracked-objects",
        user_id: userid,
        type: "favorites",
        page: "1",
        pageSize: "10",
        language: currentLocale,
        httpheaders: { user_token: usertoken },
        httpconfig: {}
    };

    mfintegrationsecureinvokerasync(
        params,
        "fry_int_buyer",
        "get-tracked-objects",
        function(status, res) {
            if (res && res.opstatus === 0 && Array.isArray(res.records)) {
                self.updateFavouriteAuctionPrices.call(self, res.records);
            }
        }
    );
},
  
  updateFavouriteAuctionPrices: function(newRecords) {
    var self = this;
    if (!this._favBidRateLabels || this._favBidRateLabels.length === 0) return;

    var dataMap = {};
    for (var i = 0; i < newRecords.length; i++) {
        var rec = newRecords[i];
        dataMap[rec.object_id] = rec;
    }
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    for (var j = 0; j < this._favBidRateLabels.length; j++) {
        var item = this._favBidRateLabels[j];
        var lblBidRate = this.view[item.id];
        var objid = item.objid;

        if (!lblBidRate || !objid || !dataMap[objid]) continue;

        var latest = dataMap[objid];
        if(latest.auction_type_id.includes("4")) continue;
        var newPrice = latest.max_bid !== undefined && latest.max_bid !== null
            ? Number(latest.max_bid).toLocaleString("en-AE")
            : "N/A";

        if (lblBidRate.text.replace("AED ", "").trim() !== newPrice) {
            lblBidRate.text = "AED " + newPrice;
            lblBidRate.skin = latest.winning_bidder === self.userid
                ? "sknLblDubai02905120pxBold"
                : "sknLblDubaid3243720pxbold";

            lblBidRate.left = isArabic ? "4%" : "";
            lblBidRate.right = isArabic ? "" : "4%";
            lblBidRate.contentAlignment = isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_LEFT
                : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        }
    }
},

  
  

 });