define({
  onNavigate: function () {
    var self = this;
    this.setData();
//      self.defaultNotifications();
    this.view.flxBack.onClick = function () {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    };

    this.view.preShow = function () {
      self.onPreShow();
      self.defaultNotifications(); // fetch toggle state on entry
    };

    // Bind toggle event to each switch (1 to 5)
    for (let i = 1; i <= 5; i++) {
      self.view["flxswitch" + i].onClick = self.toggleNotificationSwitch.bind(self, i.toString());
    }
  },

  onPreShow: function () {
    this.toggleFooterIcons();
    
     this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    

    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
  },
  
  
   flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
//       this.setUpDataPreshow();
    } else {
      voltmx.print("Still offline...");
    }
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
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },

 toggleNotificationSwitch: function (index) {
  let labelId = "lblNotification" + index;
  let isCurrentlyOn = (index === "5")
    ? this.view[labelId].text === "AR"
    : this.view[labelId].text === "ON";
    
  let newState = !isCurrentlyOn;

  this.setSwitchState(index, newState);

  const keyMap = {
    "1": "enable_push_notification",
    "2": "enable_email_notification",
    "3": "enable_sms_notification",
    "4": "news_letter",
    "5": "language"
  };

  let key = keyMap[index];
  let value;

  if (index === "5") {
    value = newState ? "AR" : "EN";  
  } else {
    value = newState ? "true" : "false";  
  }

  this.saveTogglesNotification(key, value);
},


 setSwitchState: function (index, isOn) {
  let flxSwitch = this.view["flxswitch" + index];
  let flxCircle = this.view["flxcircle" + index];
  let lbl = this.view["lblNotification" + index];

  if (!flxSwitch || !flxCircle || !lbl) return;

  if (isOn) {
    flxSwitch.skin = "sknflxBg61B35CBorder61B35C1pxRadius8px45";
    flxCircle.skin = "sknFlxWhiteRound100px";
    flxCircle.left = "55%";
    lbl.text = parseInt(index) === 5 ? "AR" : "ON";
    lbl.skin = "sknLblDubaiffffff14px";
    lbl.left = "9%";
  } else {
    flxSwitch.skin = "sknflxBgDDE5E8BorderDDE5E8";
    flxCircle.skin = "sknflxBg231F20Border231F20Radius100px45";
    flxCircle.left = "8%";
    lbl.text = parseInt(index) === 5 ? "EN" : "OFF";
    lbl.skin = "sknlbl231F20Dubai14px45";
    lbl.left = "48%";
  }
},

defaultNotifications: function () {
  var self = this;

  var userId = voltmx.store.getItem("userId");
  var usertoken = voltmx.store.getItem("getUserAccesstoken");

  
      checkTokenValidatity(function() {
   

    function INVOKE_SERVICE(status, response) {
      
      
          if(response && response.opstatus && response.opstatus === 1011){
     if(self.view.flxError){
       voltmx.print("entered");
       self.view.flxError.lblNetworkConnectionerror.text = 
         "Network issue. Please check your connection.";
       self.view.flxError.setVisibility(true);
     }
     return;
   }
      
      
//         if (response && response.opstatus !== 0) {
//         var errorMsg = response.error || response.message || "Service error occurred.";
//         if (self.view.flxServiceError) {
//           self.view.flxServiceError.lblServiceErrorMsg.text = errorMsg;
//           self.view.flxServiceError.setVisibility(true);
//         } else if (self.view.SmthngWentWrong) {
//           self.view.SmthngWentWrong.lblSomethingWentWrong.text = errorMsg;
//           self.view.SmthngWentWrong.setVisibility(true);
//         }
//         return;
//       }
          
          
   if(response && response.opstatus && response.opstatus !== 0){
     if(this.view.SmthngWentWrong){
       this.view.SmthngWentWrong.setVisibility(true);
     }
     return;
   }
 

    if (response && response.records && response.records.length > 0) {
      var data = response.records[0];
//      alert("Notification settings response: " + JSON.stringify(response));
      // Accept both string and boolean true values
      var push = data.enable_push_notification === "true" || data.enable_push_notification === true;
      var email = data.enable_email_notification === "true" || data.enable_email_notification === true;
      var sms = data.enable_sms_notification === "true" || data.enable_sms_notification === true;
      var newsletter = data.news_letter === "true" || data.news_letter === true;
      var languageSet = data.language === "AR";

      // Debug output of switch values
      voltmx.print("Switch States => Push: " + push + ", Email: " + email + ", SMS: " + sms + ", Newsletter: " + newsletter + ", Language: " + languageSet);

      // Set the switches
      self.setSwitchState(1, push);
      self.setSwitchState(2, email);
      self.setSwitchState(3, sms);
      self.setSwitchState(4, newsletter);
      self.setSwitchState(5, languageSet);
    } else {
//       voltmx.print("Notification settings fetch failed or empty.");
//       alert("Failed to load notification settings.");
      
       if (self.view.SmthngWentWrong) {
          self.view.SmthngWentWrong.lblSomethingWentWrong.text =
            "Something went wrong. Please try again.";
          self.view.SmthngWentWrong.setVisibility(true);
        }
        voltmx.print("Error parsing response: " + e.message);
    }
  }
      
      
      
//     }
    if (get_user_notifications_settings_inputparam == undefined) {
        var get_user_notifications_settings_inputparam = {};
    }
    get_user_notifications_settings_inputparam["serviceID"] = 
      "fry_int_user$get-user-notifications-settings";
      get_user_notifications_settings_inputparam["user_id"] = userId;

    var get_user_notifications_settings_httpheaders = {
        "user_token": usertoken,
    };
    get_user_notifications_settings_inputparam["httpheaders"] =
      get_user_notifications_settings_httpheaders;
    var get_user_notifications_settings_httpconfigs = {};
    get_user_notifications_settings_inputparam["httpconfig"] =
      get_user_notifications_settings_httpconfigs;
    fry_int_user$get_user_notifications_settings = mfintegrationsecureinvokerasync
    (get_user_notifications_settings_inputparam,
     "fry_int_user", "get-user-notifications-settings", INVOKE_SERVICE);
        
      });

},



  saveTogglesNotification: function (key, value) {
    
    
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    
          checkTokenValidatity(function() {

    
    var inputParam = {
      serviceID: "ms_common$user-toggle-notifications",
      key: key,
      value: value,
      httpheaders: {
        "user_token": usertoken
      },
      httpconfig: {}
    };

    function INVOKE_SERVICE(status, response) {
      

      if(response && response.opstatus && response.opstatus === 1011){
        if(self.view.flxError){
          voltmx.print("entered");
          self.view.flxError.lblNetworkConnectionerror.text = 
            "Network issue. Please check your connection.";
          self.view.flxError.setVisibility(true);
        }
        return;
      }


      if(response && response.opstatus && response.opstatus !== 0){
        if(this.view.SmthngWentWrong){
          this.view.SmthngWentWrong.setVisibility(true);
        }
        return;
      }
//       alert(JSON.stringify(response))
      voltmx.print("Save toggle response: " + JSON.stringify(response));
      if (status !== 400) {
        voltmx.print("Saved toggle: " + key + " = " + value);
      } else {
        voltmx.print("Failed to save toggle for " + key);
      }
    }

    mfintegrationsecureinvokerasync(
      inputParam,
      "ms_common",
      "user-toggle-notifications",
      INVOKE_SERVICE
    );
            
                  });

  },
  
  
  
  
  
     setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  if(isArabic)
    {
      var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
    }
     else
       {
          this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
       }
  this.view.flxNotification.reverseLayoutDirection = isArabic;

  var labelList = [
       "lblNotification"
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

//   List of Flex containers to reverse layout direction
//   var flexList = [

    
    
//   ];

// //   // Apply reverseLayoutDirection
//   for (var j = 0; j < flexList.length; j++) {
//     if (this.view[flexList[j]]) {
//       this.view[flexList[j]].reverseLayoutDirection = direction;
//     }
//   }
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
   this.view.lblNotification.text=voltmx.i18n.getLocalizedString("Notifications");
      this.view.lblsample.text=voltmx.i18n.getLocalizedString("Push Notifications")
     this.view.lblsample02.text=voltmx.i18n.getLocalizedString("Email Notifications")
       this.view.lblsmaple03.text=voltmx.i18n.getLocalizedString("SMS Notifications")
       this.view.lblsample04.text=voltmx.i18n.getLocalizedString("News Letter")
       this.view.lblsample05.text=voltmx.i18n.getLocalizedString("Preferred Language")
     }      
      
});
