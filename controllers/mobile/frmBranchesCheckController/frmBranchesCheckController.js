define({
  
  

  onNavigate: function() 
  {
    this.abudhabiExpanded = false; 
    this.SharjahExpanded = false; 
    this.addingi18nKeys();
    this.view.flxAll.skin = "sknflxRoundedBorderD32437";
    this.view.lblAll.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxAbudhabi.skin = "sknflxBorderD32437";
    this.view.lblAbudhabi.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxSharjah.skin = "sknflxBorderD32437";
    this.view.lblSharjah.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxAll.onClick = this.allOnclick.bind(this);
    this.view.flxAbudhabi.onClick = this.abudhabiOnclick.bind(this);
    this.view.flxSharjah.onClick = this.sharjahOnclick.bind(this);
    this.view.preShow  = this.onPreShow.bind(this);
    this.view.flxEmailPopup.onClick = this.flxEmailPopupOnClick.bind(this);
    this.view.flxAbudhabiContainer.onClick = this.flxAbudhabiContainerOnClick;
    this.view.flxSharjahContainer.onClick = this.flxSharjahContainerOnClick;
    this.view.flxCallContainerAbudhabi.onClick = this.callFunctionality;
    this.view.flxEmailAbudhabi.onClick = this.emailFunctionality;
    this.view.flxDirectionAbudhabi.onClick = this.directionActionForAbuDhabi ;
    this.view.flxCallContainerSharjah.onClick = this.callFunctionality ;
    this.view.flxEmailSharjah.onClick = this.emailFunctionality;
    this.view.flxDirectionSharjah.onClick = this.directionActionForSharjah ;
    this.view.flxBack.onClick = this.flxBackOnClickAction;
  },
  
  
  
  
  flxBackOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeCheque");
    ntf.navigate();
  },
  
  
  
  
  addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
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
    
    
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblOurBranches",
      "lblDesc",
      "lblBranchAbudhabi",
      "lblBranchSharjah",
      "lblAddressTextAbudhabi",
      "lblAddressAbudhabi",
      "lblAddressTextSharjah",
      "lblAddressSharjah",
      ""
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxBackContainer",
      "flxBranchContainer",
      "flxToggles",
      "flxAbuDhabiVisible",
      "flxOpenOrClose",
      "flxSharjahVisible",
      "flxOpenOrCloseSharjah",
      "flxButtons",
      "flxWorkingHoursMonday",
      "flxWorkingHoursTuesday",
      "flxWorkingHoursWednesday",
      "flxWorkingHoursThursday",
      "flxButtonsSharjah",
      "flxWorkingHoursWednesdaySharjah",
      "flxWorkingHoursThursdaySharjah",
      "flxWorkingHoursFridaySharjah",
      "flxWorkingHoursFriday",
      "flxWorkingHoursMondaySharjah",
      "flxWorkingHoursTuesdaySharjah"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }  
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblOurBranches.text = voltmx.i18n.getLocalizedString("Our Branches");  
    this.view.lblDesc.text  = voltmx.i18n.getLocalizedString("Visit our branch for personalized assistance from our representatives");
    this.view.lblBranches.text  = voltmx.i18n.getLocalizedString("branches");
    this.view.lblAll.text = voltmx.i18n.getLocalizedString("all");
    this.view.lblAbudhabi.text = voltmx.i18n.getLocalizedString("abu dhabi");
    this.view.lblSharjah.text = voltmx.i18n.getLocalizedString("sharjah1");
    this.view.lblBranchAbudhabi.text = voltmx.i18n.getLocalizedString("abudhabi");
    this.view.lblOpenOrClose.text = voltmx.i18n.getLocalizedString("Open");
    this.view.lblBranchSharjah.text = voltmx.i18n.getLocalizedString("sharjah");
    this.view.lblOpenOrCloseSharjah.text = voltmx.i18n.getLocalizedString("Open");
    this.view.lblCall.text = voltmx.i18n.getLocalizedString("Call");
    this.view.lblEmailAbuDhabi.text = voltmx.i18n.getLocalizedString("Email");
    this.view.lblDirectionAbudhabi.text =  voltmx.i18n.getLocalizedString("Direction");
    this.view.lblAddressTextAbudhabi.text = voltmx.i18n.getLocalizedString("Address");
    this.view.lblAddressAbudhabi.text = voltmx.i18n.getLocalizedString("Unnamed Road - Sharjah - United Arab Emirates");
    this.view.lblWorkingHoursMonday.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lbllMondayVal.text = voltmx.i18n.getLocalizedString("Monday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursTuesday.text =  voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblTuesdayVal.text = voltmx.i18n.getLocalizedString("Tuesday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursWed.text =  voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblWednesdayVal.text =  voltmx.i18n.getLocalizedString("Wednesday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursThursday.text =  voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblThursdayVal.text = voltmx.i18n.getLocalizedString("Thursday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursFriday.text =  voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblFridayVal.text = voltmx.i18n.getLocalizedString("Friday: 08:00 AM - 04:00 PM in arabic");
    this.view.lblCallS.text = voltmx.i18n.getLocalizedString("Call");
    this.view.lblEmailS.text =  voltmx.i18n.getLocalizedString("Email");
    this.view.lblDirectionS.text =   voltmx.i18n.getLocalizedString("Direction");
    this.view.lblAddressTextSharjah.text =  voltmx.i18n.getLocalizedString("Address");
    this.view.lblAddressSharjah.text = voltmx.i18n.getLocalizedString("Unnamed Road - Sharjah - United Arab Emirates");
    this.view.lblWorkingHoursMondaySharjah.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lbllMondayValSharjah.text = voltmx.i18n.getLocalizedString("Monday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursTuesdaySharjah.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblTuesdayValSharjah.text =  voltmx.i18n.getLocalizedString("Tuesday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursWednesdaySharjah.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblWednesdayValSharjah.text = voltmx.i18n.getLocalizedString("Wednesday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursThursdaySharjah.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblThursdayValSharjah.text = voltmx.i18n.getLocalizedString("Thursday: 08:00 AM - 04:00 PM");
    this.view.lblWorkingHoursFridaySharjah.text = voltmx.i18n.getLocalizedString("Working hours:");
    this.view.lblFridayValFridaySharjah.text =  voltmx.i18n.getLocalizedString("Friday: 08:00 AM - 04:00 PM in arabic");
  },
  
  
  
  
  onPreShow: function(){
    this.mapAbudhabi();
    this.mapSharjah();
       this.view.flxAbudhabiHideData.bounces = true;
    this.view.flxSharjahHideData.bounces = true;
    this.view.flxScroll.bounces = true;
  },
  
  
  
  
  mapAbudhabi: function(){
    this.view.map1.locationData = [{
      lat        : "24.4539",
      lon        : "54.3773",
      name       : "14th St - Musaffah - Musaffah Industrial - Abu Dhabi - United Arab Emirates",
      desc       : "Abu Dhabi",
      showCallout: true,
      calloutData: {
        lbl1: "Abu Dhabi"
      }
    }];
    voltmx.print("MapData"+JSON.stringify( this.view.map1.locationData));
    voltmx.print("MapDataName"+JSON.stringify( this.view.map1.locationData[0].name));
  },
  
  
  
  
  mapSharjah: function(){
    this.view.map2.locationData = [{
      lat        : "25.3463",
      lon        : "55.4209",
      name       : "8CWC+G93 - Sheikh Rashid Bin Saqr Al Qasimi St - Dasman - Halwan - Sharjah - United Arab Emirates",
      desc       : "Sharjah",
      showCallout: true,
      calloutData: {
        lbl1: "Sharjah", 
      }
    }];
    voltmx.print("MapData"+JSON.stringify( this.view.map2.locationData));
    voltmx.print("MapDataName"+JSON.stringify( this.view.map2.locationData[0].name));
  },
  
  
  
  
  flxEmailPopupOnClick: function(){
    this.view.flxEmailPopup.setVisibility(false);
  },
  
  
  
  
  flxAbudhabiContainerOnClick: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if (this.abudhabiExpanded) {
      this.view.flxAbudhabiHideData.setVisibility(false);
      this.abudhabiExpanded = false;
      if(isArabic){
        this.view.lblOpenOrClose.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrClose.text = "open";
      }
      this.view.lblOpenOrClose.skin = "sknlbl61B35CSize20pxDubaiBold45";
      this.view.imgUpAD.setVisibility(false);
      this.view.imgDownAD.setVisibility(true);
    } else {
      this.view.flxAbudhabiHideData.setVisibility(true);
      this.abudhabiExpanded = true;
      if(isArabic){
        this.view.lblOpenOrClose.text = "مغلق";
      }
      else{
        this.view.lblOpenOrClose.text = "close";
      }
      this.view.lblOpenOrClose.skin = "sknlblDubaiBoldd32437Font60px";
      this.view.imgUpAD.setVisibility(true);
      this.view.imgDownAD.setVisibility(false);
    }
  },
  
  
  
  
  flxSharjahContainerOnClick: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if (this.SharjahExpanded) {
      this.view.flxSharjahHideData.setVisibility(false);
      this.SharjahExpanded = false;
      if(isArabic){
        this.view.lblOpenOrCloseSharjah.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrCloseSharjah.text = "open";
      }
      this.view.lblOpenOrCloseSharjah.skin = "sknlbl61B35CSize20pxDubaiBold45"
      this.view.imgUpS.setVisibility(false);
      this.view.imgDownS.setVisibility(true);
    } else {
      this.view.flxSharjahHideData.setVisibility(true);
      this.SharjahExpanded = true;
      if(isArabic){
        this.view.lblOpenOrCloseSharjah.text = "مغلق";
      }
      else{
        this.view.lblOpenOrCloseSharjah.text = "close";
      }
      this.view.lblOpenOrCloseSharjah.skin = "sknlblDubaiBoldd32437Font60px"
      this.view.imgDownS.setVisibility(false);
      this.view.imgUpS.setVisibility(true);
    }
  },
  
  
  
  
  callFunctionality: function(){
    voltmx.phone.dial("7995077100");
  },
  
  
  
  
  emailFunctionality: function(){
    this.view.flxEmailPopup.setVisibility(true);
  },
  
  
  
  
  directionActionForAbuDhabi: function(){
    var lat = "24.3547473";
    var lon = "54.4582753";
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
    voltmx.application.openURL(url);
  },
  
  
  
  
  directionActionForSharjah: function(){
    var lat = "25.3335516";
    var lon = "55.3905231";
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
    voltmx.application.openURL(url);
  },
  
  
  
  
//   allOnclick: function(){
//     this.view.flxAll.skin = "sknflxRoundedBorderD32437";
//     this.view.lblAll.skin = "sknLblDubaiffffff20pxBold";
//     this.view.flxAbudhabi.skin = "sknflxBorderD32437";
//     this.view.lblAbudhabi.skin = "sknlblD32437Size20pxDubaiBold45";
//     this.view.flxSharjah.skin = "sknflxBorderD32437";
//     this.view.lblSharjah.skin = "sknlblD32437Size20pxDubaiBold45";
//     this.view.flxAbudhabiContainer.setVisibility(true);
//     this.view.flxSharjahContainer.setVisibility(true);
//     if (this.abudhabiExpanded) {
//       this.view.flxAbudhabiHideData.setVisibility(false);
//       this.abudhabiExpanded = false;
//     }
//     if (this.SharjahExpanded) {
//       this.view.flxSharjahHideData.setVisibility(false);
//       this.SharjahExpanded = false;
//     }
//   },
  
  
  allOnclick: function(){
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxAll.skin = "sknflxRoundedBorderD32437";
    this.view.lblAll.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxAbudhabi.skin = "sknflxBorderD32437";
    this.view.lblAbudhabi.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxSharjah.skin = "sknflxBorderD32437";
    this.view.lblSharjah.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxAbudhabiContainer.setVisibility(true);
    this.view.flxSharjahContainer.setVisibility(true);
    if (this.abudhabiExpanded) {
//       this.view.flxAbudhabiHideData.setVisibility(false);
//       this.abudhabiExpanded = false;
       this.view.flxAbudhabiHideData.setVisibility(false);
      this.abudhabiExpanded = false;
      if(isArabic){
        this.view.lblOpenOrClose.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrClose.text = "open";
      }
      this.view.lblOpenOrClose.skin = "sknlbl61B35CSize20pxDubaiBold45";
      this.view.imgUpAD.setVisibility(false);
      this.view.imgDownAD.setVisibility(true);
    }
    if (this.SharjahExpanded) {
//       this.view.flxSharjahHideData.setVisibility(false);
//       this.SharjahExpanded = false;
      this.view.flxSharjahHideData.setVisibility(false);
      this.SharjahExpanded = false;
      if(isArabic){
        this.view.lblOpenOrCloseSharjah.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrCloseSharjah.text = "open";
      }
      this.view.lblOpenOrCloseSharjah.skin = "sknlbl61B35CSize20pxDubaiBold45"
      this.view.imgUpS.setVisibility(false);
      this.view.imgDownS.setVisibility(true);
    }
  },
 
  
  
  abudhabiOnclick: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxAll.skin = "sknflxBorderD32437";
    this.view.lblAll.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxAbudhabi.skin = "sknflxRoundedBorderD32437";
    this.view.lblAbudhabi.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxSharjah.skin = "sknflxBorderD32437";
    this.view.lblSharjah.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxAbudhabiContainer.setVisibility(true);
    this.view.flxSharjahContainer.setVisibility(false);
    if (this.abudhabiExpanded) {
      this.view.flxAbudhabiHideData.setVisibility(false);
      this.abudhabiExpanded = false;
      if(isArabic){
        this.view.lblOpenOrClose.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrClose.text = "open";
      }
      this.view.lblOpenOrClose.skin = "sknlbl61B35CSize20pxDubaiBold45";
      this.view.imgUpAD.setVisibility(false);
      this.view.imgDownAD.setVisibility(true);
    }
  },
  
  
  
  
  sharjahOnclick: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxAll.skin = "sknflxBorderD32437";
    this.view.lblAll.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxAbudhabi.skin = "sknflxBorderD32437";
    this.view.lblAbudhabi.skin = "sknlblD32437Size20pxDubaiBold45";
    this.view.flxSharjah.skin = "sknflxRoundedBorderD32437";
    this.view.lblSharjah.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxAbudhabiContainer.setVisibility(false);
    this.view.flxSharjahContainer.setVisibility(true);
    if (this.SharjahExpanded) {
      this.view.flxSharjahHideData.setVisibility(false);
      this.SharjahExpanded = false;
      if(isArabic){
        this.view.lblOpenOrCloseSharjah.text = "مفتوح";
      }
      else{
        this.view.lblOpenOrCloseSharjah.text = "open";
      }
      this.view.lblOpenOrCloseSharjah.skin = "sknlbl61B35CSize20pxDubaiBold45"
      this.view.imgUpS.setVisibility(false);
      this.view.imgDownS.setVisibility(true);
    }
  },



});