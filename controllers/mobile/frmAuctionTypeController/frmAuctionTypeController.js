define({ 

  onNavigate: function()
  {
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnSkip.onClick = this.btnSkipOnClickAction;
    this.view.flxSecond.onClick =this.comingSoon;
    this.view.flxBack.onClick =this.navProfile;
    this.view.flxfirst.onClick = function(){
      voltmx.store.setItem("flow", "auction type");
      voltmx.store.setItem("lastFormIdPay", "frmAuctionType");
      new voltmx.mvc.Navigation("frmPaymentType").navigate();
    }.bind(this);
  },
  
  
  
  
  btnSkipOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmProfile");
    ntf.navigate();
  },
  
  
  
  
  onPreShow: function(){
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
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
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
  
  
  
  
  comingSoon: function(){
    var navda =new voltmx.mvc.Navigation("frmCominSoon");
    navda.navigate();
  },
  
  
  
  
  navProfile: function(){
    var navda1 =new voltmx.mvc.Navigation("frmProfile");
    navda1.navigate();
  },
  
  
  
  
  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
    this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
    this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
    this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
    var mode = voltmx.store.getItem("mode") || "seller";
    
      if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
      var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
}
    
    
    
    
    if(mode === "seller"){
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var labelList = [
      "btnSkip",
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
    var flexList = [
      "flx01","flx02",
      "flxArrow"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.btnSkip.text=voltmx.i18n.getLocalizedString("Skip");      
    this.view.lblAuctionType.text=voltmx.i18n.getLocalizedString("Auction Type");    
    this.view.lblpaymentType.text=voltmx.i18n.getLocalizedString("Payment Method");    
    this.view.lblpayupload.text=voltmx.i18n.getLocalizedString("Pay/Upload");    
    this.view.lblSelectType.text=voltmx.i18n.getLocalizedString("Select the type of auction you want to join");  
    this.view.lblvehicle.text=voltmx.i18n.getLocalizedString("Vehicles");
    this.view.lblUAEplate.text=voltmx.i18n.getLocalizedString("UAE Plates");   
  }
  
  
  
  
});