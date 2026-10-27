define({ 

 onNavigate: function()
{
  this.seti18nData();
  this.view.flxVehicles.onClick = this.navToVehicleAuction.bind(this);
  this.view.flxProperties.onClick = this.navToSilentAuctions.bind(this);
  this.view.flxLicenesPlates.onClick = this.navToComingSoon.bind(this);
  this.view.flxEquipment.onClick = this.navToComingSoon.bind(this);
  this.view.flxJeweleryWatches.onClick = this.openEmiratesUrl.bind(this);
  this.view.flxAirConditioner.onClick = this.navToComingSoon.bind(this);
  this.view.preShow = this.onPreShow.bind(this);
},
  
 onPreShow: function(){
   
 this.toggleFooterIcons();
//  checkImageHeaders();
 
   
 },
  
    openEmiratesUrl: function()
  {
    voltmx.application.openURL("https://emiratesmoto.ae/");
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
    
       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
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
  
   navToSilentAuctions: function(){
    new voltmx.mvc.Navigation("frmSealedAuctionsList").navigate();
  },
 navToVehicleAuction: function(){
   var x = new voltmx.mvc.Navigation("frmAllAuctionsList");
   x.navigate();
 },
  navToComingSoon: function(){
    var x = new voltmx.mvc.Navigation("frmCominSoon");
   x.navigate();
  },
  seti18nData: function()
  {
    
    const isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

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
    
  this.view.lblAuctionCategories.contentAlignment = 
  isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

  this.view.flxUL
  ? this.view.flxUL.reverseLayoutDirection = isArabic
  : voltmx.print("flxUnderLineContainer not found in the current form.");

    
//     this.view.lblVehicles.text = voltmx.i18n.getLocalizedString("Vehicles");
//     this.view.lblProperties.text = voltmx.i18n.getLocalizedString("Silent Auctions");
    
    this.view.lblVehicles.text = voltmx.i18n.getLocalizedString("ONLINE AUCTIONS") +" "+ voltmx.store.getItem("individualCounts").regularCount;
    this.view.lblProperties.text = voltmx.i18n.getLocalizedString("Silent Auctions") +" "+ voltmx.store.getItem("individualCounts").silentCount;
    this.view.lblLicensePlate.text = voltmx.i18n.getLocalizedString("UAE Plates");
    this.view.lblEquipment.text = voltmx.i18n.getLocalizedString("Equipment & Machinery");
    this.view.lblJewellery.text = voltmx.i18n.getLocalizedString("Emirates Moto");
    this.view.lblGeneralItems.text = voltmx.i18n.getLocalizedString("General Items");
    this.view.lblAuctionCategories.text = voltmx.i18n.getLocalizedString("Auction Categories");
    
  }

 });