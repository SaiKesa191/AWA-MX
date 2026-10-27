define({


  onNavigate: function (data) {

    this.dropAddress =  this.dropAddress = (data && data.dropAddressLoc && data.dropAddressLoc.lblAddress)
      ? data.dropAddressLoc.lblAddress 
    : voltmx.store.getItem("dropAddress");

    this.pickupAddress =(data && data.pickupAddress)
      ? data.pickupAddress 
    : voltmx.store.getItem("pickupAddress");

    this.sellerOrBuyerLotId = (data && data.sellerOrBuyerLotId)
      ? data.sellerOrBuyerLotId 
    : (voltmx.store.getItem("sellerOrBuyerLotId") 
       ? JSON.parse(voltmx.store.getItem("sellerOrBuyerLotId")) 
       : {});

    this.selectedDate = (data && data.selectedDate)
      ? data.selectedDate 
    : voltmx.store.getItem("selectedDate");

    this.dropLat = (data && data.dropCoordinates && data.dropCoordinates.lat)
      ? data.dropCoordinates.lat 
    : voltmx.store.getItem("dropLat");

    this.dropLon =  (data && data.dropCoordinates && data.dropCoordinates.lng)
      ? data.dropCoordinates.lng 
    : voltmx.store.getItem("dropLon");

    this.userType =(data && data.sellerOrBuyerLotId && data.sellerOrBuyerLotId.lblUserType)
      ? data.sellerOrBuyerLotId.lblUserType 
    : voltmx.store.getItem("userType");

    this.lotId = (data && data.sellerOrBuyerLotId && data.sellerOrBuyerLotId.lotId)
      ? data.sellerOrBuyerLotId.lotId 
    : voltmx.store.getItem("lotId");
    this.seti18n();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick = this.flxBackOnClickAction;
    this.view.btnReturnToAuction.onClick = this.btnReturnToAuctionOnClick;
  },




  onPreShow: function(){
    this.toggleFooterIcons();
    this.SetNavigatedObjectValues();
  },



  seti18n: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
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
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblBookingConfirmation",
    
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxArrow",
      "flxUnderLineContainer",
      "flxYourBookingIsConfirmed"
      

    ];

    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
//     this.view.lblBookYourVehicleOrPickup.text = voltmx.i18n.getLocalizedString("Book Your Vehicle Pickup or Delivery");
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
   this.view.lblBookingConfirmation.text = voltmx.i18n.getLocalizedString("Booking Confirmation");
    this.view.lblBookingConfirmed.text = voltmx.i18n.getLocalizedString("Your booking is confirmed!");
    this.view.lblConfoDetails.text = voltmx.i18n.getLocalizedString("Our technicians will service your vehicle on-site while you complete your paperwork.");  
    this.view.btnReturnToAuction.text = voltmx.i18n.getLocalizedString("Go To Home Page");  

  },
  

  flxBackOnClickAction: function(){

    new voltmx.mvc.Navigation("frmBookYourVehiclePickUpOrDelivery").navigate();

  },


  backOnClick: function()
  {
    new voltmx.mvc.Navigation("frmRequestRoadSideAssistance").navigate();
  },



  SetNavigatedObjectValues: function() {
 var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var userType = (this.sellerOrBuyerLotId && this.sellerOrBuyerLotId.lblUserType)
    ? this.sellerOrBuyerLotId.lblUserType
    : "";

    var lotId = (this.sellerOrBuyerLotId && this.sellerOrBuyerLotId.lotId)
    ? this.sellerOrBuyerLotId.lotId
    : "";

    this.view.segBookingData.widgetDataMap = {
      "lblvalue": "lblvalue",
      "lblKey": "lblKey",
      "flxConfirmAndPay": "flxConfirmAndPay"
    };
    var headerData = { "lblHeading": voltmx.i18n.getLocalizedString("Booking Summary"), };
    var data = [
      {
        "lblKey": 
        {
         "text": voltmx.i18n.getLocalizedString("Service Type"),
       "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblvalue": {
          "text":"Pickup",
//           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
            "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
       
      },
      {
       "lblKey": 
        {
         "text": voltmx.i18n.getLocalizedString("Buyer/Seller"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblvalue": 
         {
          "text"    :   userType,
//           "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
           "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
      },
      {
        "lblKey": 
        {
         "text": voltmx.i18n.getLocalizedString("Pickup Location"),
             "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblvalue": 
         {
          "text" : this.pickupAddress || "",
//             "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
            "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
      },
      {
        "lblKey": 
        {
         "text":voltmx.i18n.getLocalizedString("Drop-off Location"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblvalue": 
         {
          "text" : this.dropAddress || "",
//               "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
             "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
      },
      {
          "lblKey": 
        {
         "text":voltmx.i18n.getLocalizedString("Vehicle Lot ID"),
             "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "lblvalue": 
         {    
          "text" : lotId,
//                 "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
            "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
      },
      {
         "lblKey": 
        {
         "text": voltmx.i18n.getLocalizedString("Date and Time"),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
       "lblvalue": 
         {    
          "text" : this.selectedDate || "",
//               "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
             "contentAlignment": isArabic 
    ? constants.CONTENT_ALIGN_MIDDLE_LEFT
    :constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
         "flxConfirmAndPay": {
           "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
      }
      },
     
    ];
    this.view.segBookingData.setData(data);

  },


  btnReturnToAuctionOnClick: function()
  {
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },



//   seti18nData: function()
//   {
   
//     if(voltmx.i18n.getCurrentLocale() === "ar_AE"){

//       this.view.lblBookingConfirmation.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.flxUnderLineContainer.reverseLayoutDirection = true;
//       this.view.lblYourBookingIsConfirmed.reverseLayoutDirection = true;
//     }
//     else{

//       this.view.lblBookingConfirmation.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.flxUnderLineContainer.reverseLayoutDirection = false;
//       this.view.lblYourBookingIsConfirmed.reverseLayoutDirection = false;
//     }
//   },




  toggleFooterIcons: function()
  {
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
    if(mode === "seller"){
      this.view.Footer2.imgMyBids.src = "mylistings.png";
//       this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//       this.view.Footer2.lblMyBids.text = "My Bids";
    }
    var isLogin = voltmx.store.getItem("isLogin");
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



});
