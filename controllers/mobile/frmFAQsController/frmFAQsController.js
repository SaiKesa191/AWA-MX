define({
  onNavigate: function () {
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);

    // Navigation Clicks
    this.view.flx01.onClick = this.navToRegistrationAccount.bind(this);
    this.view.flxforgotpassword.onClick = this.navForgotpasswordfaq.bind(this);
    this.view.flx02.onClick = this.navToBiddingProcess.bind(this);
    this.view.flx03.onClick = this.navToPayments.bind(this);
    this.view.flx04.onClick = this.navToVehicleInfo.bind(this);
    this.view.flx05.onClick = this.navToShippingAndCollection.bind(this);
    this.view.flx06.onClick = this.navToGeneralPolicies.bind(this);
    this.view.flxViewAllQuestion02.onClick =
      this.navToBiddingProcess.bind(this);

//     this.view.flxBack.onClick = function () {
//       new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
//     }.bind(this);
    
    this.view.flxBack.onClick = this.navToOpenHelp.bind(this);

    // Add Touch Effects
    this.setTouchEffects();
    this.view.txtBoxSearch.onTextChange = this.searchFlexes.bind(this);
    
    
    var rotate=  voltmx.ui.makeAffineTransform();
  },

  onPreShow: function () {
    this.toggleFooterIcons();
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
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
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

 
  setTouchEffects: function () {
    for (let i = 1; i <= 6; i++) {
      const index = i;
      const flx = this.view["flx0" + index];

      flx.onTouchStart = function () {
        this.applyTouchSkin(index, true);
      }.bind(this);

      flx.onTouchEnd = function () {
        this.applyTouchSkin(index, false);
      }.bind(this);
    }
  },

  applyTouchSkin: function (index, isTouched) {
    const flxSkin = isTouched ? "sknflxBgffffffBorderccccccRadius8px45" : 
    "sknflxBgF6F9FABorderEBEBEBRadius8px45";
    const lblSkin = "sknlbl231f20Dubai18px";
    const headingSkin = "sknlbl231F20Dubai20px45";
    const viewAllSkin = isTouched? "sknlbl231f20Dubai18px":
    "sknlbl61B35CDubai18px45";

    this.view["flx0" + index].skin = flxSkin;
    this.view["lblheading0" + index].skin = headingSkin;
    this.view["lbl0" + index].skin = lblSkin;
    this.view["lbl0" + (index + 1)].skin = lblSkin;
    this.view["lblViewAllQuestions0" + index].skin = viewAllSkin;

    // Optionally update image skins if defined
    // this.view["imgheading0" + index].skin = isTouched ?
//     "sknImgHover" : "sknImgNormal";
    // this.view["imggreenArrow0" + index].skin = isTouched ? 
//     "sknImgHover" : "sknImgNormal";
    
//     this.view["imgheading0" + index].src = isTouched ?
//     "icon_active.png" : "icon_normal.png";
  this.view["imggreenArrow0" + index].src = isTouched ?
    "rightarrowblack512h_1_.png" : "rightarrow_green.png";

  },
  
  
  searchFlexes: function() {
    var searchText = this.view.txtBoxSearch.text || "";
    searchText = searchText.toLowerCase().trim();

    // List of all flex containers and their headings
    var flexList = [
        { flx: this.view.flx01, heading: this.view.lblheading01.text },
        { flx: this.view.flx02, heading: this.view.lblheading02.text },
        { flx: this.view.flx03, heading: this.view.lblheading03.text },
        { flx: this.view.flx04, heading: this.view.lblheading04.text },
        { flx: this.view.flx05, heading: this.view.lblheading05.text },
        { flx: this.view.flx06, heading: this.view.lblheading06.text }
    ];

    // Loop through flexes and toggle visibility
    flexList.forEach(function(item) {
        if (searchText === "" || item.heading.toLowerCase().includes(searchText)) {
            item.flx.setVisibility(true);
        } else {
            item.flx.setVisibility(false);
        }
    });
},


  // Navigation Functions
  navToRegistrationAccount: function () {
//     new voltmx.mvc.Navigation("frmRegistrationAndAccount").navigate();
     new voltmx.mvc.Navigation("frmRegistrationAndAccount").navigate();
  },
  
  navForgotpasswordfaq: function(){
    new voltmx.mvc.Navigation("frmForgotPasswordFAQ").navigate();
  },

  navToBiddingProcess: function () {
    new voltmx.mvc.Navigation("frmBiddingProcess").navigate();
  },

  navToPayments: function () {
    new voltmx.mvc.Navigation("frmPayments").navigate();
  },

  navToVehicleInfo: function () {
    new voltmx.mvc.Navigation("frmVehicleInformation").navigate();
  },

  navToShippingAndCollection: function () {
    new voltmx.mvc.Navigation("frmShippingAndCollection").navigate();
  },

  navToGeneralPolicies: function () {
    new voltmx.mvc.Navigation("frmGeneralPolicies").navigate();
  },

  navToOpenHelp: function () {
    
    var previousForm = voltmx.application.getPreviousForm();
    if(previousForm.id === "frmOpenHelp"){
       new voltmx.mvc.Navigation("frmOpenHelp").navigate();
//     voltmx.store.setItem("preFormForVI", "frmOpenHelp");   
    }
    else if(previousForm.id === "frmContactUS"){
//        voltmx.store.setItem("preFormForVI", "frmContactUS");  
       new voltmx.mvc.Navigation("frmContactUS").navigate();
      
    }
    else{
      new voltmx.mvc.Navigation("frmOpenHelp").navigate();
    }
    
     
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

  
//   this.view.lblChangeOfBuyer.contentAlignment= isArabic ?
//       constants.CONTENT_ALIGN_MIDDLE_RIGHT : 
//       constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // List of label widget IDs to apply alignment
  var labelList = [
    "lbl01","lbl02","lbl03","lbl04","lbl05","lbl06",
    "lbl07","lbl08","lbl09","lbl010","lbl011","lbl012","txtBoxSearch","lblheadingfg","lblfaq","lblfaq2fg","lblViewAllQuestionsfg"
    
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
   "flxFAQs","flxImglbl","flxviewAllQuestions","flxViewAllQuestion02",
    "flxViewAllQuestion03","flxViewAllQuestions04","flxViewAllQuestions05",
    "flxViewAllQuestions06","flxImgLbl02","flxImgLbl03","flxImgLbl04",
    "flximglbl05","flximglbl06","flxSearchBox","flxViewAllQuestion02","flxImgforgorpass","flxviewAllQuestionsfg"
    
  ];

  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }
     
  // rotate arrow     
      var arrowWidgets = [
        this.view.imggreenArrow01,
        this.view.imggreenArrow02,
        this.view.imggreenArrow03,
        this.view.imggreenArrow04,
        this.view.imggreenArrow05,
        this.view.imggreenArrow06,
        this.view.imgArrow
       
      ];

      var transform = voltmx.ui.makeAffineTransform();
      transform.rotate(isArabic ? 180 : 0);

      arrowWidgets.forEach(function(widget) {
        if (widget) {
          widget.transform = transform;
        }
      });
  
      this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

      this.view.lblFAQs.text=voltmx.i18n.getLocalizedString("FAQs");
      ///------------------------------------------------------------------
      this.view.lblheadingfg.text =voltmx.i18n.getLocalizedString("Forgot Password");
      this.view.lblfaq.text =voltmx.i18n.getLocalizedString("What is affliation");
      this.view.lblfaq2fg.text =voltmx.i18n.getLocalizedString("How can members submit complaints or suggestions to Al Wataneya Auctions?");
      this.view.lblViewAllQuestionsfg=voltmx.i18n.getLocalizedString("View All Questions");
      //-----------------------------------------------------------------
      this.view.lblheading01.text=voltmx.i18n.
      getLocalizedString("Registration & Account");
      this.view.lbl01.text=voltmx.i18n.
      getLocalizedString("What is required for participants to agree to when registering on the Al Wataneya Auctions website ?");
      this.view.lbl02.text=voltmx.i18n
        .getLocalizedString("How do participants register to use the Al Wataneya Auctions internet site?");
      this.view.lblheading02.text=voltmx.i18n.
      getLocalizedString("Bidding Process");
      this.view.lbl03.text=voltmx.i18n
        .getLocalizedString("What must participants do before bidding on vehicles or commodities in the auction?");
      this.view.lbl04.text=voltmx.i18n
        .getLocalizedString("Is there a limit to the number of vehicles a participant can own from the auction?");
      this.view.lblheading03.text=voltmx.i18n.getLocalizedString("Payments");
      this.view.lbl05.text=voltmx.i18n
        .getLocalizedString("What is required for participants to deposit as insurance for the auction?");
      this.view.lbl06.text=voltmx.i18n
        .getLocalizedString("What happens if a participant fails to complete the payment process after winning an auction?");
      this.view.lblheading04.text=voltmx.i18n
        .getLocalizedString("Vehicle Information");
      this.view.lbl07.text=voltmx.i18n
        .getLocalizedString("In what condition are vehicles sold at Al Wataneya Auctions?");
      this.view.lbl08.text=voltmx.i18n
        .getLocalizedString("What guarantees does Al Wataneya Auctions provide for vehicles?");
      this.view.lblheading05.text=voltmx.i18n
        .getLocalizedString("Shipping & Collection");
      this.view.lbl09.text=voltmx.
      i18n.getLocalizedString("When and how can a participant receive a purchased vehicle?");
      this.view.lbl010.text=voltmx.
      i18n.getLocalizedString("What is the deadline for removing vehicles from Al Wataneya Auctions premises?");
      this.view.lblheading06.text=voltmx.i18n
        .getLocalizedString("General Policies");
      this.view.lbl011.text=voltmx.i18n.
      getLocalizedString("What is the affiliation of Al Wataneya Auctions’ website?");
      this.view.lbl012.text=voltmx.i18n.
      getLocalizedString("How can members submit complaints or suggestions to Al Wataneya Auctions?");
      this.view.lblViewAllQuestions01.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.lblViewAllQuestions02.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.lblViewAllQuestions03.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.lblViewAllQuestions04.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.lblViewAllQuestions05.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.lblViewAllQuestions06.text=voltmx.i18n.
      getLocalizedString("View All Questions");
      this.view.txtBoxSearch.placeholder=voltmx.i18n.
      getLocalizedString("Search FAQs");
      
}

 
});
