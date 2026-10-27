define({ 

  onNavigate: function()
  {
    this.view.flxBack.onClick = this.navToOpenHelp.bind(this);
    this.setData();
      this.view.preShow = this.onPreshow.bind(this);
    
  },
  
  navToOpenHelp: function()
  {
    new voltmx.mvc.Navigation("frmOpenHelp").navigate();
  },
  
  onPreshow: function(){
     
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
   this.view.Footer2.lblSellCar.skin = "sknLblDubai231f2014pxBold"; 
    
    
    
       this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
    
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
   this.view.Footer2.lblMyBids.text = 
     voltmx.i18n.getLocalizedString("Listings");

    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    this.view.Footer2.lblMyBids.text =
      voltmx.i18n.getLocalizedString("My Bids");

    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
    
//       this.view.Footer2.imgSellCar.setVisibility(false);
//       this.view.Footer2.flxProfile.setVisibility(true);
     
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
//   setData: function()
//   {
// //       voltmx.i18n.setCurrentLocaleAsync('en_IN', currentLocaleChangeSuccess, currentLocaleChangeFailure);
// //       function currentLocaleChangeSuccess () {
// //         var ntf = new voltmx.mvc.Navigation("frmLangChange");
// //         ntf.navigate();
// //       }
// //       function currentLocaleChangeFailure () {
// //         alert("Error while changing the current application locale");
// //       }
    
// // alert("current Locale :"+voltmx.i18n.getCurrentLocale());
// //     this.view.lblInfo01.text = voltmx.i18n.getLocalizedString("AboutUSInfo1");
// //     alert("aboutus inf01"+voltmx.i18n.getLocalizedString("AboutUSInfo1"));
// //      alert("aboutus"+voltmx.i18n.getLocalizedString("About Us"));
    
//     if(voltmx.i18n.getCurrentLocale() === "ar_AE")
//     {
//       this.view.lblAboutUs.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       //       this.view.flxTransform1.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       //       this.view.flxTransform2.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.flxTransform1.reverseLayoutDirection = true; 
//      this.view.flxUnderLineContainer.reverseLayoutDirection = true; 
//       this.view.lblHeading01.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblInfo01.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblHeading02.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblInfo02.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblheading03.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblinfo03.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.Copylblheading0g20ea285412541.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.Copylblinfo0d7b641f82b6d41.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblHeading05.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//       this.view.lblinfo05.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
//     }
//     else
//     {
//       this.view.lblAboutUs.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       //       this.view.flxTransform1.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       //       this.view.flxTransform2.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.flxTransform1.reverseLayoutDirection = false; 
//       this.view.flxUnderLineContainer.reverseLayoutDirection = false; 
//       this.view.lblHeading01.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblInfo01.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblInfo02.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblHeading02.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblheading03.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblinfo03.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.Copylblheading0g20ea285412541.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.Copylblinfo0d7b641f82b6d41.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblHeading05.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//       this.view.lblinfo05.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
//     }

//   }
  
  
  setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if(isArabic){
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
    }
    else{
       this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
    }
  
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT;
  var direction = isArabic;

  // List of label widget IDs to apply alignment
  var labelList = [
    "lblAboutUs",
    "lblHeading01", "lblInfo01",
    "lblHeading02", "lblInfo02",
    "lblheading03", "lblinfo03",
    "Copylblheading0g20ea285412541",
    "Copylblinfo0d7b641f82b6d41",
    "lblHeading05", "lblinfo05"
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

  // List of Flex containers to reverse layout direction
  var flexList = [
    "flxTransform1",
    "flxUnderLineContainer",
     "flxAboutUs"
    // Add more container IDs here if needed
  ];

  // Apply reverseLayoutDirection
  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  // Optional: Localize text using resource bundles (uncomment if using i18n keys)
       this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

  this.view.lblAboutWatenya.text = voltmx.i18n.getLocalizedString("About Al Wataneya Auctions---text");
  this.view.lblHeading01.text = voltmx.i18n.getLocalizedString("About Al Wataneya Auctions");
  this.view.lblInfo01.text = voltmx.i18n.getLocalizedString("AboutUSInfo1");
  this.view.lblHeading02.text = voltmx.i18n.getLocalizedString("Strategic Presence");
  this.view.lblInfo02.text = voltmx.i18n.getLocalizedString("Operating in Abu Dhabi and Sharjah, two major UAE hubs, we provide convenient access for buyers and sellers across the regions.");
  this.view.lblheading03.text = voltmx.i18n.getLocalizedString("Trusted Supply Chain");
  this.view.lblinfo03.text = voltmx.i18n.getLocalizedString("Our vehicles are sourced from reputable entities such as government bodies, corporates, insurance companies, courts, police, leasing companies, banks, and municipalities, ensuring a steady and high-quality selection.");
  this.view.Copylblheading0g20ea285412541.text = voltmx.i18n.getLocalizedString("Diverse Buyer Community");
  this.view.Copylblinfo0d7b641f82b6d41.text = voltmx.i18n.getLocalizedString("We attract a wide spectrum of participants, from car rental companies and fleet operators to used car traders, exporters, spare parts dealers, garages, and individual buyers, fostering competitive bidding and successful auction outcomes.");
  this.view.lblHeading05.text = voltmx.i18n.getLocalizedString("Growing User Base");
  this.view.lblinfo05.text = voltmx.i18n.getLocalizedString("With more than 35,000+ registered users, Al Wataneya has achieved significant market reach and customer trust. At Al Wataneya Auctions, we are committed to transparency, efficiency, and delivering value-making us a trusted choice for vehicle auctions in the UAE.");
 
}


 });