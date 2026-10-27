 define({ 

 onNavigate: function(context){
   
//      this.context = context || {};

//     this.previousFormId = this.context.previousFormId || "frmDashBoard";
   
   this.navigationData = context || {};
  this.previousFormId = this.navigationData.previousFormId || "";
   this.view.btnRquestBuyerCahngeNow.onClick=this.requestBuyerChange.bind(this);
   this.view.flxBack.onClick = this.navToDashboard.bind(this);
   this.view.preShow = this.onPreShow.bind(this);
   this.setData();
   
 },
  
  onPreShow: function()
  {
    this.toggleFooterIcons();
    this.getPreviousFormNames();
  },
  navToDashboard: function()
  {
    
//     new voltmx.mvc.Navigation("frmDashBoard").navigate();
    
    var  previousFormId= voltmx.store.getItem("previousFormForCB");
    if(previousFormId === "frmServices"){
        new voltmx.mvc.Navigation("frmServices").navigate();
    }
    else if (previousFormId === "frmDashBoard"){
        new voltmx.mvc.Navigation("frmDashBoard").navigate();
    }
  },
   
   
    getPreviousFormNames: function(){
    
     var previousForm = voltmx.application.getPreviousForm();
    if(previousForm.id === "frmDashBoard"){
    voltmx.store.setItem("preFormForVI", "frmDashBoard");   
    }
    else if(previousForm.id === "frmServices"){
       voltmx.store.setItem("preFormForVI", "frmServices");  
      
    }
  },
  
  
  
  requestBuyerChange: function(){
//     var nav=new voltmx.mvc.Navigation("frmChangeOfBuyer02");
//     nav.navigate();
//     var jobtitle=voltmx.store.getItem("jobTitle");
//     if( jobtitle.includes("buyer")){
//         var nav=new voltmx.mvc.Navigation("frmChangeOfBuyer02");
//     nav.navigate();
//     }
//     else{
//        alert("Ownership transfer is applicable for buyer profile");
//     }
    var mode = voltmx.store.getItem("mode");
 
       if(mode==="buyer"){
    var nav=new voltmx.mvc.Navigation("frmChangeOfBuyer02");
    nav.navigate(
       { previousFormId: this.previousFormId}
 
    );
         }
    else{
      alert("Ownership transfer is applicable for buyer profile");
    }
 
  },
  
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
   // this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   // this.view.Footer2.lblMyBids.text = "My Bids";
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
  
  
  
  
  
  setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

     if(isArabic){
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
         this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
      
    }
    else{
       this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
      
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
    }
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  
//   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // List of label widget IDs to apply alignment
  var labelList = [
   "lblSeamlessTransferProcess","lblSeamlessTransferProcessInfo","lblBuyErTransferRequest","lblAED","lbl01",
    "lbl02","lbl03","lblCallNow",
    "lblChangeOfBuyer"
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

  // List of Flex containers to reverse layout direction
  var flexList = [
   "flxlblLine","flx01","flx02","flx03","flxCallNow","flxImgLbl"
    
    
  ];

  // Apply reverseLayoutDirection
  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  // Optional localization of text, if needed
  this.view.lblChangeOfBuyer.text = voltmx.i18n.getLocalizedString("Change of Buyer");
this.view.lblSeamlessTransferProcess.text = voltmx.i18n.getLocalizedString("Seamless Transfer Process");
 this.view.lblSeamlessTransferProcessInfo.text = voltmx.i18n.
 getLocalizedString("To complete the Change of Ownership process for a vehicle purchased through Al Wataneya Auctions, please provide the name of the new buyer, a payment of 55 AED, the new Emirates ID, and upload the Emirates ID document");
// this.view.lblQuestionMark.text = voltmx.i18n.getLocalizedString("");
this.view.lblBuyErTransferRequest.text = voltmx.i18n.getLocalizedString("Buyer Transfer Request");
  this.view.lblAED.text = voltmx.i18n.getLocalizedString("AED 55");
this.view.lbl01 .text = voltmx.i18n.getLocalizedString("Quick Submission");
 this.view.lbl02.text = voltmx.i18n.getLocalizedString("Seamless Process");
// this.view.CopylblQuestionMark0j52b4a7c163b49.text = voltmx.i18n.getLocalizedString("We attract a wide spectrum of participants, from car rental companies and fleet operators to used car traders, exporters, spare parts dealers, garages, and individual buyers, fostering competitive bidding and successful auction outcomes.");
this.view.lbl03.text = voltmx.i18n.getLocalizedString("Efficient Transfer");
 this.view.lblCallNow.text = voltmx.i18n.getLocalizedString("Not sure which to choose? Let our advisor help you");
this.view.btnRquestBuyerCahngeNow.text=voltmx.i18n.getLocalizedString("REQUEST BUYER CHANGE NOW");
    
    
    
    
    
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
    
    
}

 });