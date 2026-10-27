define({
  onNavigate: function () {
    var self = this;
//     self.setData();
   // var ntf; 
  var previousForm=voltmx.application.getPreviousForm().id;
   voltmx.print('previous form is '+ previousForm);
    //alert('previous form is '+ previousForm);

       voltmx.application.destroyForm(previousForm);
    
    self.view.btnMinorService.onClick = self.navigateToBookYourMaintenance.bind(this);
    self.view.btnMajorService.onClick = self.navigateToBookYourMaintenance.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    }.bind(this);
  },
  
  onPreShow: function()
  {
     this.setData();
    this.toggleFooterIcons();
  },
  
    toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
    
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknlblCPBoldCapt181818Font100";
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = "My Bids";
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

  navigateToBookYourMaintenance: function () {
    var ntf = new voltmx.mvc.Navigation("frmBookYourMaintenance");
    ntf.navigate();
  },
  
  
//     setData: function()
//   {

//     if(voltmx.i18n.getCurrentLocale() === "ar_AE")
//     {
//       this.view.lblMaintenanceAndRepairs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblKeepYourCarDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblKeepYourCar.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblWhyBookaService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0ae1c7c54590045.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0ea7f198eab7d43.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0c2b29b6740ed4d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0c175c660502f4e.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblStartingfromAED250.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblMinorService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0h05f5caece894d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0e825ce60120e4f.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0d10045cbae2f46.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0f07fa1fc04e04a.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0h2d32293be5e40.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0d10705859d1743.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0d898d8d63eac4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblMajorService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblStartingfromAED499.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0b423ab684f6e48.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0e6531dcd7e3941.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0i64ec4eaa60b4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0f898fa8a30824d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0ha3e52724e7541.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0c730c25cba4248.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.Copylbl0b22ed9a2749e4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblChxBoxTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.lblLastDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
//       this.view.flxUnderLineContainer.reverseLayoutDirection = true;
//       this.view.flxTittleWhyBookaService.reverseLayoutDirection = true;
//       this.view.Copyflx0beecdb40301d46.reverseLayoutDirection = true;
//       this.view.Copyflx0a56c2e556fee42.reverseLayoutDirection = true;
//       this.view.Copyflx0f80cb9a11ac048.reverseLayoutDirection = true;
//       this.view.Copyflx0j92712951e4640.reverseLayoutDirection = true;
//       this.view.flxMinorServiceTittle.reverseLayoutDirection = true;
//       this.view.Copyflx0b8ff324b613e4d.reverseLayoutDirection = true;
//       this.view.Copyflx0aa7a3a71492849.reverseLayoutDirection = true;
//       this.view.Copyflx0be3f2bd7db2b44.reverseLayoutDirection = true;
//       this.view.Copyflx0ie982e8711494d.reverseLayoutDirection = true;
//       this.view.Copyflx0bb153cea1b3442.reverseLayoutDirection = true;
//       this.view.Copyflx0ice4febc11f34f.reverseLayoutDirection = true;
//       this.view.Copyflx0j7a3c623eb0a41.reverseLayoutDirection = true;
//       this.view.flxMajorServiceTittle.reverseLayoutDirection = true;
//       this.view.Copyflx0dd00da2dc37041.reverseLayoutDirection = true;
//       this.view.Copyflx0h055527d9acc44.reverseLayoutDirection = true;
//       this.view.Copyflx0ic16a220491144.reverseLayoutDirection = true;
//       this.view.Copyflx0g9ea2f92a60347.reverseLayoutDirection = true;
//       this.view.Copyflx0e5e7a38d2d0e4c.reverseLayoutDirection = true;
//       this.view.Copyflx0ceb2c7a8132c4f.reverseLayoutDirection = true;
//       this.view.Copyflx0d36facb91def49.reverseLayoutDirection = true;
//     }
//     else
//     {
//       this.view.lblMaintenanceAndRepairs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblKeepYourCarDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblKeepYourCar.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblWhyBookaService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0ae1c7c54590045.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0ea7f198eab7d43.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0c2b29b6740ed4d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0c175c660502f4e.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblStartingfromAED250.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblMinorService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0h05f5caece894d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0e825ce60120e4f.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0d10045cbae2f46.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0f07fa1fc04e04a.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copyflx0bb153cea1b3442.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0h2d32293be5e40.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0d10705859d1743.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0d898d8d63eac4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblMajorService.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblStartingfromAED499.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0b423ab684f6e48.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0e6531dcd7e3941.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0i64ec4eaa60b4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0f898fa8a30824d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0ha3e52724e7541.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0c730c25cba4248.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.Copylbl0b22ed9a2749e4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblChxBoxTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.lblLastDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
//       this.view.flxUnderLineContainer.reverseLayoutDirection = false; 
//       this.view.flxTittleWhyBookaService.reverseLayoutDirection = false; 
//       this.view.Copyflx0beecdb40301d46.reverseLayoutDirection = false; 
//       this.view.Copyflx0a56c2e556fee42.reverseLayoutDirection = false; 
//       this.view.Copyflx0f80cb9a11ac048.reverseLayoutDirection = false; 
//       this.view.Copyflx0j92712951e4640.reverseLayoutDirection = false; 
//       this.view.flxMinorServiceTittle.reverseLayoutDirection = false; 
//       this.view.Copyflx0b8ff324b613e4d.reverseLayoutDirection = false; 
//       this.view.Copyflx0aa7a3a71492849.reverseLayoutDirection = false; 
//       this.view.Copyflx0be3f2bd7db2b44.reverseLayoutDirection = false; 
//       this.view.Copyflx0ie982e8711494d.reverseLayoutDirection = false; 
//       this.view.Copyflx0bb153cea1b3442.reverseLayoutDirection = false; 
//       this.view.Copyflx0ice4febc11f34f.reverseLayoutDirection = false; 
//       this.view.Copyflx0j7a3c623eb0a41.reverseLayoutDirection = false; 
//       this.view.flxMajorServiceTittle.reverseLayoutDirection = false; 
//       this.view.Copyflx0dd00da2dc37041.reverseLayoutDirection = false; 
//       this.view.Copyflx0h055527d9acc44.reverseLayoutDirection = false; 
//       this.view.Copyflx0ic16a220491144.reverseLayoutDirection = false; 
//       this.view.Copyflx0g9ea2f92a60347.reverseLayoutDirection = false; 
//       this.view.Copyflx0e5e7a38d2d0e4c.reverseLayoutDirection = false; 
//       this.view.Copyflx0ceb2c7a8132c4f.reverseLayoutDirection = false; 
//       this.view.Copyflx0d36facb91def49.reverseLayoutDirection = false; 
      
     
//     }

//   }
  
  setData: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  // Set localized text values
  this.view.lblMaintenanceAndRepairs.text = voltmx.i18n.getLocalizedString("Maintenance & Repairs");
  this.view.lblKeepYourCarDesc.text = voltmx.i18n.getLocalizedString("Choose from our expert Minor or Major Service packages-designed exclusively for Al Wataneya Auctions buyers. Convenient on-site servicing while your paperwork is processed.");
  this.view.lblKeepYourCar.text = voltmx.i18n.getLocalizedString("Keep Your Car Running Smoothly");
  this.view.lblWhyBookaService.text = voltmx.i18n.getLocalizedString("Why Book a Service?");
  this.view.Copylbl0ae1c7c54590045.text = voltmx.i18n.getLocalizedString("Maintain peak vehicle performance");
  this.view.Copylbl0ea7f198eab7d43.text = voltmx.i18n.getLocalizedString("Prevent costly repairs with regular check-ups");
  this.view.Copylbl0c2b29b6740ed4d.text = voltmx.i18n.getLocalizedString("Save time with on-site service during paperwork");
  this.view.Copylbl0c175c660502f4e.text = voltmx.i18n.getLocalizedString("Performed by certified technicians using quality parts");
  this.view.lblStartingfromAED250.text = voltmx.i18n.getLocalizedString("Starting from AED 259");
  this.view.lblMinorService.text = voltmx.i18n.getLocalizedString("Minor Service");
  this.view.Copylbl0h05f5caece894d.text = voltmx.i18n.getLocalizedString("Oil & filter change");
  this.view.Copylbl0e825ce60120e4f.text = voltmx.i18n.getLocalizedString("Fluid level checks & top-ups (brake, coolant, windshield washer)");
  this.view.Copylbl0d10045cbae2f46.text = voltmx.i18n.getLocalizedString("Brake inspection");
  this.view.Copylbl0f07fa1fc04e04a.text = voltmx.i18n.getLocalizedString("Battery test");
  this.view.Copylbl0h2d32293be5e40.text = voltmx.i18n.getLocalizedString("Tyre pressure check & adjustment");
  this.view.Copylbl0d10705859d1743.text = voltmx.i18n.getLocalizedString("Basic engine diagnostics");
  this.view.Copylbl0d898d8d63eac4c.text = voltmx.i18n.getLocalizedString("Visual inspection of belts & hoses");
  this.view.lblMajorService.text = voltmx.i18n.getLocalizedString("Major Service");
  this.view.lblStartingfromAED499.text = voltmx.i18n.getLocalizedString("Starting from AED 499");
  this.view.Copylbl0b423ab684f6e48.text = voltmx.i18n.getLocalizedString("Air filter replacement");
  this.view.Copylbl0e6531dcd7e3941.text = voltmx.i18n.getLocalizedString("Spark plug check/replacement");
  this.view.Copylbl0i64ec4eaa60b4c.text = voltmx.i18n.getLocalizedString("Transmission fluid check");
  this.view.Copylbl0f898fa8a30824d.text = voltmx.i18n.getLocalizedString("Comprehensive brake system check");
  this.view.Copylbl0ha3e52724e7541.text = voltmx.i18n.getLocalizedString("Suspension & steering inspection");
  this.view.Copylbl0c730c25cba4248.text = voltmx.i18n.getLocalizedString("Detailed engine diagnostics");
  this.view.Copylbl0b22ed9a2749e4c.text = voltmx.i18n.getLocalizedString("Full vehicle safety check");
  this.view.lblChxBoxTittle.text = voltmx.i18n.getLocalizedString("Includes everything in Minor Service, plus:");
  this.view.lblLastDesc.text = voltmx.i18n.getLocalizedString("lblLastDesc");

  // Set content alignment and direction based on locale
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  // Apply alignment
  this.view.lblMaintenanceAndRepairs.contentAlignment = alignment;
  this.view.lblKeepYourCarDesc.contentAlignment = alignment;
  this.view.lblKeepYourCar.contentAlignment = alignment;
  this.view.lblWhyBookaService.contentAlignment = alignment;
  this.view.Copylbl0ae1c7c54590045.contentAlignment = alignment;
  this.view.Copylbl0ea7f198eab7d43.contentAlignment = alignment;
  this.view.Copylbl0c2b29b6740ed4d.contentAlignment = alignment;
  this.view.Copylbl0c175c660502f4e.contentAlignment = alignment;
  this.view.lblStartingfromAED250.contentAlignment = alignment;
  this.view.lblMinorService.contentAlignment = alignment;
  this.view.Copylbl0h05f5caece894d.contentAlignment = alignment;
  this.view.Copylbl0e825ce60120e4f.contentAlignment = alignment;
  this.view.Copylbl0d10045cbae2f46.contentAlignment = alignment;
  this.view.Copylbl0f07fa1fc04e04a.contentAlignment = alignment;
  this.view.Copylbl0h2d32293be5e40.contentAlignment = alignment;
  this.view.Copylbl0d10705859d1743.contentAlignment = alignment;
  this.view.Copylbl0d898d8d63eac4c.contentAlignment = alignment;
  this.view.lblMajorService.contentAlignment = alignment;
  this.view.lblStartingfromAED499.contentAlignment = alignment;
  this.view.Copylbl0b423ab684f6e48.contentAlignment = alignment;
  this.view.Copylbl0e6531dcd7e3941.contentAlignment = alignment;
  this.view.Copylbl0i64ec4eaa60b4c.contentAlignment = alignment;
  this.view.Copylbl0f898fa8a30824d.contentAlignment = alignment;
  this.view.Copylbl0ha3e52724e7541.contentAlignment = alignment;
  this.view.Copylbl0c730c25cba4248.contentAlignment = alignment;
  this.view.Copylbl0b22ed9a2749e4c.contentAlignment = alignment;
  this.view.lblChxBoxTittle.contentAlignment = alignment;
  this.view.lblLastDesc.contentAlignment = alignment;

  // Apply reverse layout direction
  var flexList = [
    "flxUnderLineContainer",
    "flxTittleWhyBookaService",
    "Copyflx0beecdb40301d46",
    "Copyflx0a56c2e556fee42",
    "Copyflx0f80cb9a11ac048",
    "Copyflx0j92712951e4640",
    "flxMinorServiceTittle",
    "Copyflx0b8ff324b613e4d",
    "Copyflx0aa7a3a71492849",
    "Copyflx0be3f2bd7db2b44",
    "Copyflx0ie982e8711494d",
    "Copyflx0bb153cea1b3442",
    "Copyflx0ice4febc11f34f",
    "Copyflx0j7a3c623eb0a41",
    "flxMajorServiceTittle",
    "Copyflx0dd00da2dc37041",
    "Copyflx0h055527d9acc44",
    "Copyflx0ic16a220491144",
    "Copyflx0g9ea2f92a60347",
    "Copyflx0e5e7a38d2d0e4c",
    "Copyflx0ceb2c7a8132c4f",
    "Copyflx0d36facb91def49"
  ];

  for (var i = 0; i < flexList.length; i++) {
    if (this.view[flexList[i]]) {
      this.view[flexList[i]].reverseLayoutDirection = direction;
    }
  }
}

  
});
