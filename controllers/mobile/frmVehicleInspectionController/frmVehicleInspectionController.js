define({ 

onNavigate: function(context) 
  {
    
     this.navigationData = context || {};
  this.previousFormId = this.navigationData.previousFormId || "";
    
     this.setData();
    this.view.btnBasicInspectionBookNow.onClick =
      this.requestYourInspectionReportForBasicInspection.bind(this);
    this.view.btnComprehensiveInspectionBookNow.onClick = 
      this.requestYourInspectionReportForComprehensiveInspection.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick=this.flxBackOnclick.bind(this);
   this.view.btnCallNow.onClick = () => {
     voltmx.phone.dial("8006006");
   }
   this.view.flxSampleInspectionreport.onClick = this.openSI.bind(this);
    this.view.flxSampleInspectionreportCI.onClick = this.openSI.bind(this);
  },
  
  openSI: function()
  {
    voltmx.application.openURL("https://uat-alwataneya.et.ae/dx/api/dam/v1/collections/276d01e2-7c67-427a-a05e-acdf1713458c/items/0997aa61-1056-497e-997c-892345537719/renditions/687551bd-d421-4f48-bd19-103aa4825e08?binary=true");
  },
  onPreShow: function()
  {
    
    this.toggleFooterIcons();
//     this.setData();
    this.getPreviousFormNames();
  },
requestYourInspectionReportForBasicInspection: function() {
  var navigationData = {
    service       : "Basic Inspection",
    previousFormId: this.previousFormId

    
  };
//   voltmx.store.setItem("previousFormIdForVI", this.previousFormId);
   new voltmx.mvc.Navigation("frmRequestYourInspectionReport").
   navigate(navigationData);

},

  
   requestYourInspectionReportForComprehensiveInspection: function()
  {
    var navigationData = {
      service       : "Comprehensive Inspection",
      previousFormId: this.previousFormId

    };
//      voltmx.store.setItem("previousFormIdForVI", this.previousFormId); 
    new voltmx.mvc.Navigation("frmRequestYourInspectionReport").
    navigate(navigationData);
       

  },
  
  
  getPreviousFormNames: function(){
    
     var previousForm = voltmx.application.getPreviousForm();
     if(voltmx.store.getItem("preFormForVI") === "frmDashBoard"){
    voltmx.store.setItem("preFormForVI", "frmDashBoard");  
      return;
    }
    if(previousForm.id === "frmDashBoard"){
    voltmx.store.setItem("preFormForVI", "frmDashBoard");  
      return;
    }
    
    else if(previousForm.id === "frmServices"){
       voltmx.store.setItem("preFormForVI", "frmServices");  
      
    }
  },
  
  flxBackOnclick: function(){
    
    
    var originFormVI = voltmx.store.getItem("originForm");
    if (originFormVI=== "frmServices") {
      
    
    new voltmx.mvc.Navigation("frmServices").navigate();
  } else if (originFormVI === "frmDashBoard") {
    new voltmx.mvc.Navigation("frmDashBoard").navigate();
  } else if (originFormVI === "frmDetails") {
    new voltmx.mvc.Navigation("frmDetails").navigate();
  } else {
    new voltmx.mvc.Navigation("frmDashBoard").navigate(); 
  }
    
//     var goBackTo=new voltmx.mvc.Navigation("frmDashBoard");
//     goBackTo.navigate();
    
    
  },
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooteractive.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
    
    
    
     this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
//   
    
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
  
  

  // Set localized text values
  this.view.lblVehicleInspection.text = voltmx.i18n.getLocalizedString("Vehicle Inspection");
  this.view.lblKnowBeforeYouBid.text = voltmx.i18n.getLocalizedString("Know Before You Bid");
  this.view.lblKnowBeforeYouBidDesc.text = voltmx.i18n.getLocalizedString("Get a professional");
  this.view.lblWhyGetaReport.text = voltmx.i18n.getLocalizedString("Why Get a Report?");
  this.view.lbl01.text = voltmx.i18n.getLocalizedString("Make informed bidding decisions");
  this.view.lbl02.text = voltmx.i18n.getLocalizedString("Avoid surprises after purchase");
  this.view.lbl03.text = voltmx.i18n.getLocalizedString("Build trust with verified insights");
  this.view.lblFastTurnaround.text = voltmx.i18n.getLocalizedString("Fast Turnaround");
  this.view.lblFastTurnaroundDesc.text = voltmx.i18n.getLocalizedString("Request your report");
  this.view.lblBasicInspection.text = voltmx.i18n.getLocalizedString("Basic Inspection");
  this.view.lblStartingfromAED250.text = voltmx.i18n.getLocalizedString("Starting from AED");
  this.view.lblVehicleCondition.text = voltmx.i18n.getLocalizedString("Vehicle Condition Score");
  this.view.lblEngine.text = voltmx.i18n.getLocalizedString("Engine, Suspension & Transmission Overview");
  this.view.lblfault.text = voltmx.i18n.getLocalizedString("Fault & Tire Photos");
  this.view.lblbrake.text = voltmx.i18n.getLocalizedString("Brake, Electrical, Rims & Tires Check");
  this.view.lblinterior.text = voltmx.i18n.getLocalizedString("Interior & Paint Condition");
  this.view.lblService.text = voltmx.i18n.getLocalizedString("Service History Summary");
  this.view.lblSampleInspectionreport.text = voltmx.i18n.getLocalizedString("Sample Inspection report");
  this.view.lblComprehensiveInspection.text = voltmx.i18n.getLocalizedString("Comprehensive Inspection");
  this.view.lblStartingfromAED500.text = voltmx.i18n.getLocalizedString("Starting from AEDs");
  this.view.lblChxBoxTittle.text = voltmx.i18n.getLocalizedString("Everything in Basic, plus:");
  this.view.CopylblVehicleCondition0d938767de49049.text = voltmx.i18n.getLocalizedString("Interior & Exterior Photos");
  this.view.CopylblEngine0ceb04c1b579f45.text = voltmx.i18n.getLocalizedString("Engine Bay & Undercarriage Photos");
  this.view.Copylblfault0bdd1450e633f49.text = voltmx.i18n.getLocalizedString("Chassis Damage Report");
  this.view.Copylblbrake0dbaacea7ddd34c.text = voltmx.i18n.getLocalizedString("Estimated Repair Cost");
  this.view.CopylblSampleInspectionreport0jf0786f1159d40.text = voltmx.i18n.getLocalizedString("Sample Inspection report");
  this.view.lblLastDesc.text = voltmx.i18n.getLocalizedString("Not sure which to choose? Let our advisor help you");
  this.view.btnCallNow.text=voltmx.i18n.getLocalizedString("CALL NOW");
  this.view.btnBasicInspectionBookNow.text=voltmx.i18n.getLocalizedString("BOOK NOW");
  this.view.btnComprehensiveInspectionBookNow.text=voltmx.i18n.getLocalizedString("BOOK NOW");
  // Set content alignment and direction based on locale
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;
  if (isArabic) {
    this.view.flxBack.left = null;
    this.view.flxBack.right = "5%";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
} else {
    this.view.flxBack.left = "5%";
    this.view.flxBack.right = null;
  this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
}
  // Apply alignment
  this.view.lblVehicleInspection.contentAlignment = alignment;
  this.view.lblKnowBeforeYouBid.contentAlignment = alignment;
  this.view.lblKnowBeforeYouBidDesc.contentAlignment = alignment;
  this.view.lblWhyGetaReport.contentAlignment = alignment;
  this.view.lbl01.contentAlignment = alignment;
  this.view.lbl02.contentAlignment = alignment;
  this.view.lbl03.contentAlignment = alignment;
  this.view.lblFastTurnaround.contentAlignment = alignment;
  this.view.lblFastTurnaroundDesc.contentAlignment = alignment;
  this.view.lblBasicInspection.contentAlignment = alignment;
  this.view.lblStartingfromAED250.contentAlignment = alignment;
  this.view.lblVehicleCondition.contentAlignment = alignment;
  this.view.lblEngine.contentAlignment = alignment;
  this.view.lblfault.contentAlignment = alignment;
  this.view.lblbrake.contentAlignment = alignment;
  this.view.lblinterior.contentAlignment = alignment;
  this.view.lblService.contentAlignment = alignment;
  this.view.lblSampleInspectionreport.contentAlignment = alignment;
  this.view.lblComprehensiveInspection.contentAlignment = alignment;
  this.view.lblStartingfromAED500.contentAlignment = alignment;
  this.view.lblChxBoxTittle.contentAlignment = alignment;
  this.view.CopylblVehicleCondition0d938767de49049.contentAlignment = alignment;
  this.view.CopylblEngine0ceb04c1b579f45.contentAlignment = alignment;
  this.view.Copylblfault0bdd1450e633f49.contentAlignment = alignment;
  this.view.Copylblbrake0dbaacea7ddd34c.contentAlignment = alignment;
  this.view.CopylblSampleInspectionreport0jf0786f1159d40.contentAlignment = alignment;
  this.view.lblLastDesc.contentAlignment = alignment;

  // Apply reverse layout direction
  var flexList = [
    "flxBack", "flxUnderLineContainer", "flxMinorServiceTittle", "Copyflx0b8ff324b613e4d",
    "flxUL1", "flxUL2", "flxImage", "flxKnowBeforeYouBid", "flxQuestionMark", "flxChx", "flx01", "flximg01",
    "flx02","flx03", "flximg02", "flximg03", "CopyflxQuestionMark0bcbd713e2b7f46", "flxImg", "flximg002", "flximg003",
    "flximg004", "flximg005", "Copyflx0d36facb91def49", "flximg006", "flxSampleInspectionreport", 
    "flxSampleInspectionreportImg", "flxComprehensiveInspectionImg", "Copyflximg0d91a478e64324b",
    "Copyflximg0b84a8ab1023341", "Copyflximg0bb86ac397f4546", "Copyflximg0jc38eab3f9cc4f",
    "CopyflxSampleInspectionreportImg0ed915bbc0f564b", "flxLast", "Copyflx0e5e7a38d2d0e4c","flxRed", "flximg001",
    "flximg002","flximg003","flximg004","flximg005","flximg006","flx001","flx002","flx003","flx004","flx005","flx006","Copyflx0f643027524804c","Copyflx0ge1d592f861d4b",
    "Copyflx0i52de08cb6304b","Copyflx0h0687da9d4ed47","flxTittleWhyGetaReport","flxFastTurnaroundTittle","flxBasicInspectionTittle","flxComprehensiveInspectionTittle","flxSampleInspectionreportCI","flxFastTurnaround","flxInspection","flxsample01"
  ];

  for (var i = 0; i < flexList.length; i++) {
    if (this.view[flexList[i]]) {
      this.view[flexList[i]].reverseLayoutDirection = direction;
    }
  }
}

  
  
 });