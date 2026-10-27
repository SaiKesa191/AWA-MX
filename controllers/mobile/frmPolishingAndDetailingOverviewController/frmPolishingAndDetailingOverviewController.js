define({ 

 //Type your controller code here 
onNavigate: function()
  {
    this.setData();
    this.view.btnBasicInspectionBookNow.onClick = this.navigateToBookYourPolishing.bind(this);
    this.view.btnComprehensiveInspectionBookNow.onClick = this.navigateToBookYourPolishing.bind(this);
    this.view.btnStandardPolish.onClick = this.navigateToBookYourPolishing.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    }.bind(this);
  },
  
  onPreShow: function()
  {
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
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
   this.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100"; 
    
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
  
  navigateToBookYourPolishing: function()
  {
    new voltmx.mvc.Navigation("frmBookYourPolishing").navigate();
  },
  
  setData: function()
  {
 
    if(voltmx.i18n.getCurrentLocale() === "ar_AE")
    {
      this.view.lblPolishingAndDetailingOverview.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblShowroomShine.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblShowroomShineDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblBasicPolishing.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblQuickShine.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblStartingfromAED250.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0b423ab684f6e48.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0e6531dcd7e3941.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0i64ec4eaa60b4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblComprehensiveInspection.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblInterior.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblStartingfromAED500.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0ae1c7c54590045.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0ea7f198eab7d43.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0c2b29b6740ed4d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblStandardPolishing.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.CopylblStartingfromAED0hc984ac150d747.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblDelivered.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0aa9c05de8c764f.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0c4217a27e23140.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.Copylbl0h0e388faa8594c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblLastDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = true;
      this.view.flxBasicInspectionTittle.reverseLayoutDirection = true;
      this.view.Copyflx0dd00da2dc37041.reverseLayoutDirection = true;
      this.view.Copyflx0h055527d9acc44.reverseLayoutDirection = true;
      this.view.Copyflx0ic16a220491144.reverseLayoutDirection = true;
      this.view.flxFullDetailingTittle.reverseLayoutDirection = true;
      this.view.Copyflx0beecdb40301d46.reverseLayoutDirection = true;
      this.view.Copyflx0a56c2e556fee42.reverseLayoutDirection = true;
      this.view.Copyflx0f80cb9a11ac048.reverseLayoutDirection = true;
      this.view.flxStandardPolishingTittle.reverseLayoutDirection = true;
      this.view.Copyflx0aa53afd693cf4c.reverseLayoutDirection = true;
      this.view.Copyflx0a374584f2ad648.reverseLayoutDirection = true;
      this.view.Copyflx0h1b8884061cf44.reverseLayoutDirection = true;
    }
    else
      {
        this.view.lblPolishingAndDetailingOverview.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblShowroomShine.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblShowroomShineDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblBasicPolishing.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblQuickShine.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblStartingfromAED250.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0b423ab684f6e48.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0e6531dcd7e3941.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0i64ec4eaa60b4c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblComprehensiveInspection.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblInterior.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblStartingfromAED500.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0ae1c7c54590045.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0ea7f198eab7d43.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0c2b29b6740ed4d.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblStandardPolishing.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.CopylblStartingfromAED0hc984ac150d747.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblDelivered.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0aa9c05de8c764f.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0c4217a27e23140.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.Copylbl0h0e388faa8594c.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblLastDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.flxUnderLineContainer.reverseLayoutDirection = false;
        this.view.flxBasicInspectionTittle.reverseLayoutDirection = false;
        this.view.Copyflx0dd00da2dc37041.reverseLayoutDirection = false;
        this.view.Copyflx0h055527d9acc44.reverseLayoutDirection = false;
        this.view.Copyflx0ic16a220491144.reverseLayoutDirection = false;
        this.view.flxFullDetailingTittle.reverseLayoutDirection = false;
        this.view.Copyflx0beecdb40301d46.reverseLayoutDirection = false;
        this.view.Copyflx0a56c2e556fee42.reverseLayoutDirection = false;
        this.view.Copyflx0f80cb9a11ac048.reverseLayoutDirection = false;
        this.view.flxStandardPolishingTittle.reverseLayoutDirection = false;
        this.view.Copyflx0aa53afd693cf4c.reverseLayoutDirection = false;
        this.view.Copyflx0a374584f2ad648.reverseLayoutDirection = false;
        this.view.Copyflx0h1b8884061cf44.reverseLayoutDirection = false;
      }
  }
  
 });