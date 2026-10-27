define({ 

  onNavigate: function(data){
    voltmx.store.setItem("navForm","RoadSideAssistance")
    this.setData();
    this.view.btnBookNow.onClick=this.bookNowOnclick.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick = this.navToPrevForm.bind(this);
    if(data){
      this.lotId = data.lotId;
      this.objectId = data.objectId;
      this.prevForm = data.prevForm;
    }
    else{
      voltmx.print("No data Found!");
    }
  },




  onPreShow: function(){
    this.toggleFooterIcons();
    this.segRSAGuidesWidgetDataMap();
    this.segHowItWorksLinesWidgetDataMap();
    this.prevFormAction();
  },




  prevFormAction: function(){
    var previousForm = voltmx.application.getPreviousForm();
    if(previousForm.id === "frmDashBoard"){
      voltmx.store.setItem("prevFormRSA", "DashBoard");   
    }
    else if(previousForm.id === "frmServices"){
      voltmx.store.setItem("prevFormRSA", "Services");  
    }
  },




  segRSAGuidesWidgetDataMap: function(){
    this.view.segRSAGuides.widgetDataMap = {
      "lblGuideLines": "lblGuideLines",
      "imgCheck"   : "imgCheck",
      "flxRSA" : "flxRSA"
    };
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var data = [
      {
        "imgCheck" :  "checkblack512h.png",
        "lblGuideLines": {
          "text": voltmx.i18n.getLocalizedString("Hassle-free pickup or delivery for both buyers and sellers"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "flxRSA" :  {
          "reverseLayoutDirection": isArabic
        }
      },
      {
        "imgCheck" :  "checkblack512h.png",
        "lblGuideLines": {
          "text": voltmx.i18n.getLocalizedString("Professional, insured transport for peace of mind"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "flxRSA" :  {
          "reverseLayoutDirection": isArabic
        }     
      },
      {
        "imgCheck" :  "checkblack512h.png",
        "lblGuideLines": {
          "text": voltmx.i18n.getLocalizedString("Saves time-no need to arrange your own logistics"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "flxRSA" :  {
          "reverseLayoutDirection": isArabic
        }     
      },
      {
        "imgCheck" :  "checkblack512h.png",
        "lblGuideLines": {
          "text": voltmx.i18n.getLocalizedString("Transparent, upfront pricing based on your locations"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "flxRSA" :  {
          "reverseLayoutDirection": isArabic
        }     
      },
    ];
    this.view.segRSAGuides.setData(data);
  },



  segHowItWorksLinesWidgetDataMap: function(){
    this.view.segHowItWorksLines.widgetDataMap ={
      "lblLines": "lblLines"
    }
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var data = [
      {
        "lblLines": {
          "text": voltmx.i18n.getLocalizedString("1.Select pickup and drop-off locations"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
      },
      {
        "lblLines": {
          "text": voltmx.i18n.getLocalizedString("2.Get instant price calculation"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
      },
      {
        "lblLines": {
          "text": voltmx.i18n.getLocalizedString("3.Confirm and book your service"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
      },
      {
        "lblLines": {
          "text": voltmx.i18n.getLocalizedString("4.Our team will coordinate and update you every step of the way"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
      },
    ];
    this.view.segHowItWorksLines.setData(data);
  },




  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    if(isArabic)
      {
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackArrow.transform = flipTransform;
      }
    else
      {
         this.view.imgBackArrow.transform = voltmx.ui.makeAffineTransform();
      }
    var labelList = [
      "lblRoadSideAssisstance",
      "lblSeamlessVehicle",
      "lblSeamlessVehicleInfo",
      "lblHowItWorks",
      "lblBookNow"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxBackNav",
      "flxUnderLineContainer",
      "flxWhyBookRSA",
      "flxHowItWorksContainer"
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
    this.view.lblRoadSideAssisstance.text=voltmx.i18n.getLocalizedString("Road Side Assistance");
    this.view.lblSeamlessVehicle.text=voltmx.i18n.getLocalizedString("Seamless Vehicle Pickup & Delivery");
    this.view.lblSeamlessVehicleInfo.text=voltmx.i18n.getLocalizedString("Whether you’re selling or buying, our trusted RSA service makes transporting your vehicle to or from Al Wataneya Auctions easy and reliable. Choose your pickup and drop-off locations, get instant pricing, and let our team handle the rest.");
    this.view.lblWhyBookRSA.text=voltmx.i18n.getLocalizedString("Why Book RSA?");
    this.view.lblHowItWorks.text=voltmx.i18n.getLocalizedString("How It Works");
    this.view.lblBookNow.text=voltmx.i18n.getLocalizedString("Make your auction experience smoother. Book your vehicle transport now.");
    this.view.btnBookNow.text=voltmx.i18n.getLocalizedString("BOOK NOW");
  },




  toggleFooterIcons: function(){
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
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
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




  navToPrevForm: function() {
    var previousForm = voltmx.application.getPreviousForm();
    if (this.prevForm === "frmDetails") {
      new voltmx.mvc.Navigation("frmDetails").navigate();
      return;
    }
    else if (this.prevForm === "frmUnderReview") {
      new voltmx.mvc.Navigation("frmUnderReview").navigate();
      return;
    }
    else if (this.prevForm === "frmMyListings") {
      new voltmx.mvc.Navigation("frmMyListings").navigate();
      return;
    }
    if (previousForm) {
      if (previousForm.id === "frmRequestRoadSideAssistance") {
        if (this.prevForm === "Services") {
          new voltmx.mvc.Navigation("frmServices").navigate({
            navFormObj: "RoadSideAssistance"
          });
        } else if(this.prevForm === "DashBoard") {
          new voltmx.mvc.Navigation("frmDashBoard").navigate();
        }
      }
      else if (previousForm.id === "frmServices") {
        new voltmx.mvc.Navigation("frmServices").navigate({
          navFormObj: "RoadSideAssistance"
        });
      }
      else {
        new voltmx.mvc.Navigation("frmDashBoard").navigate();
      }
    } else {
      new voltmx.mvc.Navigation("frmDashBoard").navigate();
    }
  },




  bookNowOnclick: function(){
    var nav=new voltmx.mvc.Navigation("frmRequestRoadSideAssistance");
    nav.navigate({
      "lotId" : this.lotId,
      "objectId" : this.objectId,
      "prevForm" : "RoadSideAssistance"
    });
  },




});