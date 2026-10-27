define({ 

 //Type your controller code here 
  
  onNavigate: function(){
    this.setData();
    this.view.flxSellCar.onClick = this.flxSellCarOnClickAction;
    this.view.preShow = this.preshowFunctions.bind(this);
    
    this.view.postShow = this.onPostShow.bind(this);
//     this.view.Footer2.flxSellCar.onClick = this.Footer2flxSellCarOnClickAction;
   this.view.flxLogout.onClick = this.logoutSession.bind(this);
//    this.view.btnCompleteKYC.onClick = this.btnCompleteKYCOnClickAction;
    this.view.flxMyVehicles.onClick = this.navToMyVehicles.bind(this);
    this.view.flxNotifications.onClick = function(){
      new voltmx.mvc.Navigation("frmNotifiction22").navigate(); 
    }.bind(this);
    this.view.flxAuctions.onClick = () => {
      var x = new voltmx.mvc.Navigation("frmOpenAuctions");
      x.navigate();
    }
    this.view.flxHelp.onClick = () => {
      var x = new voltmx.mvc.Navigation("frmOpenHelp");
     x.navigate();
    }
   
    this.view.flxLanguageToggle.onClick = () =>
    {
      this.changeApplicationCurrentLocale();
    }
    this.view.flxView.onClick = function()
    {
     new voltmx.mvc.Navigation("frmMyAccountDetails").navigate(); 
    }.bind(this);
    
    this.view.flxAdd.onClick = function()
    {
      new voltmx.mvc.Navigation("frmAuctionType").navigate();
    }.bind(this);
    
    this.view.flxFeedBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmfeedBack").navigate();
    }.bind(this);
    
    this.view.flxContact.onClick = function()
    {
      voltmx.store.setItem("contactBackForm", "frmProfile");
      new voltmx.mvc.Navigation("frmContactUS").navigate();
    }.bind(this);
    
    this.view.flxToggleBar.onClick = this.toggleSwitchSellerBuyer.bind(this);
    this.view.flxToggleSwitch.onClick = this.toggleSwitchSellerBuyer.bind(this);
    this.view.flxFavourites.onClick = this.navToFavourites.bind(this);
    this.view.flxMyBookings.onClick = this.navToMyBookings.bind(this);
//    this.view.flxLogout.onClick = this.flxLogoutOnClickAction;
  },
  
 logoutSession: function() {
  // Show loading while logout is in progress
  voltmx.application.showLoadingScreen(null, "Logging out..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
    shouldShowLabelInBottom: "true",
    separatorHeight: 45,
    progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
    progressIndicatorColor: "Gray"
  });

  var serviceName = "AzureB2C"; 
  var client = voltmx.sdk.getCurrentInstance();
  var identitySvc = client.getIdentityService(serviceName);

  var options = {
    slo: true,
    browserWidget: this.view.browserLogoutWidget
  };

  identitySvc.logout(
    function(response) {
      voltmx.print("Logout success: " + JSON.stringify(response));
      voltmx.net.clearCookies();

      voltmx.store.setItem("isLogin", false);
      voltmx.store.removeItem("refreshtoken");
      voltmx.store.removeItem("expon");
      voltmx.store.removeItem("userAccessTokenExp");
      voltmx.store.setItem("isUserCreated", false);
      voltmx.store.removeItem("accesstoken");
      voltmx.store.removeItem("userObject");
      voltmx.store.removeItem("getUserAccesstoken");
      voltmx.store.removeItem("userId");
      voltmx.store.removeItem("userEmail");

      voltmx.application.dismissLoadingScreen();  

      var x = new voltmx.mvc.Navigation("frmDashBoard");
      x.navigate();
    },
    function(error) {
      if (error && error.message && error.message.indexOf("sessions is not active") !== -1) {
        voltmx.print("Session expired. Clearing stored tokens...");
        voltmx.net.clearCookies();
        voltmx.store.setItem("isLogin", false);
        voltmx.store.removeItem("refreshtoken");
        voltmx.store.removeItem("expon");
        voltmx.store.removeItem("userAccessTokenExp");
        voltmx.store.setItem("isUserCreated", false);
        voltmx.store.removeItem("accesstoken");
        voltmx.store.removeItem("userObject");
        voltmx.store.removeItem("getUserAccesstoken");
        voltmx.store.removeItem("userId");
        voltmx.store.removeItem("userEmail");
         var x = new voltmx.mvc.Navigation("frmDashBoard");
      x.navigate();
      } else {
        voltmx.print("Logout failure: " + JSON.stringify(error));
      }

      voltmx.application.dismissLoadingScreen(); 
    },
    options
  );
},
  
 preshowFunctions: function () {
  var self = this;

  // Get and normalize job roles
  var jobTitle = voltmx.store.getItem("jobTitle") || "";
  var roles = jobTitle.split(";").map(r => r.trim().toLowerCase());
  var canToggle = roles.includes("buyer") && roles.includes("seller");

  // Determine mode
  var storedMode = voltmx.store.getItem("mode");
  if (storedMode && roles.includes(storedMode)) {
    self.mode = storedMode;
  } else if (roles.includes("buyer")) {
    self.mode = "buyer";
    voltmx.store.setItem("mode", "buyer");
  } else if (roles.includes("seller")) {
    self.mode = "seller";
    voltmx.store.setItem("mode", "seller");
  } else {
    self.mode = null;
//     voltmx.ui.showToast("No valid mode assigned. Please contact support.");
    return;
  }

  // Determine nextSwitch only if toggle allowed
  if (canToggle) {
    self.nextSwitch = (self.mode === "seller") ? "buyer" : "seller";
    self.view.flxToggleSwitch.setEnabled(true);
    self.view.flxToggleSwitch.opacity = 1;
  } else {
    self.nextSwitch = null;
    self.view.flxToggleSwitch.setEnabled(false);
    self.view.flxToggleSwitch.opacity = 0.5;
  }

  // Favourites visibility
  self.view.flxFavourites.setVisibility(roles.includes("buyer"));

  // Call initializers
  self.getSwitchState();
  self.getFullName();
  self.loginConfirmation();
  self.toggleFooterIcons();

  if (self.view.defaultBrowserWidgetForOauth2) {
    self.view.remove(self.view.defaultBrowserWidgetForOauth2);
    self.view.defaultBrowserWidgetForOauth2 = null;
  }
   
   this.adjustArrowsForRTL();
},

  
  onPostShow: function()
  {
    var self = this;

     if(self.view.SmthngWentWrong){
         self.view.SmthngWentWrong.setVisibility(false);
       }
    if(self.view.SmthngWentWrong.btnClose){
      self.view.SmthngWentWrong.btnClose.onClick = () =>{
        self.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    self.view.flxMyAccount.onClick = () =>{
      var x = new voltmx.mvc.Navigation("frmOpenMyAccount");
      x.navigate();
    }
    
    self.view.flxAppSettings.onClick = () =>{
      var x = new voltmx.mvc.Navigation("frmOpenSettings");
     x.navigate();
    }
    self.view.flxPermission.setVisibility(false);
     self.view.btnOk.onClick = () =>{
      self.view.flxPermission.setVisibility(false);
       self.view.flxOverLay.setVisibility(false);
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
//    this.view.Footer2.lblSellCar.skin = "";
    
   var mode = voltmx.store.getItem("mode");
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
  getFullName: function(){
    var self = this;
     var username;
      var isLogin = voltmx.store.getItem("isLogin");
      if(isLogin){
         username = voltmx.store.getItem("fullnameuo");
      }
    
    var userobj = voltmx.store.getItem("userObject");
    if(userobj && userobj.rawResponse && userobj.rawResponse.is_org === true)
      {
        self.view.lblUsernameMenubar.text = (userobj.rawResponse.organization_details &&
     userobj.rawResponse.organization_details.company_name)
        ? userobj.rawResponse.organization_details.company_name
        : username;
      }
    else
      {
        self.view.lblUsernameMenubar.text = username;
      }
      
  },
  loginConfirmation: function(){
     var isLogin =voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
//     alert("isLogin :"+isUserCreated);
    if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  flxSellCarOnClickAction: function(){
    var self = this;
    var userobj = voltmx.store.getItem("userObject");
    
    var hasAddNewCarPermission = false;

if (userobj && userobj.rawResponse &&
    userobj.rawResponse.permissions &&
    Array.isArray(userobj.rawResponse.permissions.Sellers)) {

    var sellersPermissions = userobj.rawResponse.permissions.Sellers;

    hasAddNewCarPermission = sellersPermissions.some(function(permission) {
        return permission.option_name === "Add a new car";
    });
}

if (hasAddNewCarPermission) {
    var ntf = new voltmx.mvc.Navigation("frmSellCarList12");
    ntf.navigate();

} else {
//     self.view.flxPermission.setVisibility(true);
//        self.view.flxOverLay.setVisibility(true);
     self.view.SmthngWentWrong.setVisibility(true);
}
//    var platform = voltmx.os.deviceInfo().name.toLowerCase();
 
//   if (platform === "android") {
//     var toast = new voltmx.ui.Toast({
//       text: "You don't have permission. Kindly contact Al Wataneya on 8006006.",
//       duration: constants.TOAST_LENGTH_SHORT,
//       alignConfig: {
//         widget: voltmx.application.getCurrentForm(),
//         position: constants.TOAST_POS_BOTTOM // or TOAST_POS_TOP / CENTER
//       }
//     });
//     toast.show();
//   } else if (platform === "iphone" || platform === "ipad") {
//     alert("You don't have permission. Kindly contact Al Wataneya on 8006006.");
//   } else {
//     // Fallback for other platforms (optional)
//     voltmx.print("Toast not supported on this platform: " + platform);
//   }
// }

    
 
   
    
  },
  Footer2flxSellCarOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },
  btnCompleteKYCOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmUploadKYC");
    ntf.navigate();
  },
  flxLogoutOnClickAction: function(){
    voltmx.store.setItem("isLogin", false);
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },
  
  navToMyVehicles: function(){
    var x = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    x.navigate();
  },
  
 toggleSwitchSellerBuyer: function () {
  var jobTitle = voltmx.store.getItem("jobTitle") || "";
  var roles = jobTitle.split(";").map(r => r.trim().toLowerCase());
  var canToggle = roles.includes("buyer") && roles.includes("seller");

  if (!canToggle || !this.nextSwitch) {
//     voltmx.ui.showToast("You do not have permission to switch modes.");
    return;
  }

  if (this.nextSwitch === "buyer") {
    this.view.flxToggleBar.left = null;
    this.view.flxToggleBar.right = "4dp";
    this.view.flxToggleBar.skin = "sknFlx61b35cRound100px";
    this.view.flxToggleSwitch.skin = "sknFlxFFFFFFRound30px";
    this.view.lblModeInfo1.text = voltmx.i18n.getLocalizedString("Add Security Deposit");
    this.view.lblModeInfo2.text = voltmx.i18n.getLocalizedString("In order to bid you have to add a security deposit");
    this.view.lblModeName.text = voltmx.i18n.getLocalizedString("switch to selling");
    this.view.flxAdd.setVisibility(true);
    this.view.flxView.setVisibility(false);
    this.view.lblModeName.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxSwitchContainer.skin = "sknFlx61b35cRounded8px";
    this.nextSwitch = "seller";
    this.mode = "buyer";
    voltmx.store.setItem("mode", "buyer");

    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
  } else {
    this.view.flxToggleBar.right = null;
    this.view.flxToggleBar.left = "4dp";
    this.view.flxToggleBar.skin = "sknFlxWhiteRound100px";
    this.view.flxToggleSwitch.skin = "sknFlx767676Round30px";
    this.view.lblModeInfo1.text = voltmx.i18n.getLocalizedString("My Bank Account Details");
    this.view.lblModeInfo2.text = voltmx.i18n.getLocalizedString("Payment from Emirates Transport will be credited to this account");
    this.view.lblModeName.text = voltmx.i18n.getLocalizedString("Switch to Buying");
    this.view.flxAdd.setVisibility(false);
    this.view.flxView.setVisibility(true);
    this.view.lblModeName.skin = "sknLblDubai231f2020pxBold";
    this.view.flxSwitchContainer.skin = "sknFlxf1f1f1Rounded8px";
    this.nextSwitch = "buyer";
    this.mode = "seller";
    voltmx.store.setItem("mode", "seller");

    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
  }

  // Update favourites visibility
  this.view.flxFavourites.setVisibility(roles.includes("buyer"));
},

  
 getSwitchState: function () {
  if (this.mode === "buyer") {
    this.view.flxToggleBar.left = null;
    this.view.flxToggleBar.right = "4dp";
    this.view.flxToggleBar.skin = "sknFlx61b35cRound100px";
    this.view.flxToggleSwitch.skin = "sknFlxFFFFFFRound30px";
    this.view.lblModeInfo1.text = voltmx.i18n.getLocalizedString("Add Security Deposit");
    this.view.lblModeInfo2.text = voltmx.i18n.getLocalizedString("In order to bid you have to add a security deposit");
    this.view.lblModeName.text = voltmx.i18n.getLocalizedString("switch to selling");
    this.view.flxAdd.setVisibility(true);
    this.view.flxView.setVisibility(false);
    this.view.lblModeName.skin = "sknLblDubaiffffff20pxBold";
    this.view.flxSwitchContainer.skin = "sknFlx61b35cRounded8px";

    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
  } else if (this.mode === "seller") {
    this.view.flxToggleBar.right = null;
    this.view.flxToggleBar.left = "4dp";
    this.view.flxToggleBar.skin = "sknFlxWhiteRound100px";
    this.view.flxToggleSwitch.skin = "sknFlx767676Round30px";
    this.view.lblModeInfo1.text = voltmx.i18n.getLocalizedString("My Bank Account Details");
    this.view.lblModeInfo2.text = voltmx.i18n.getLocalizedString("Payment from Emirates Transport will be credited to this account");
    this.view.lblModeName.text = voltmx.i18n.getLocalizedString("Switch to Buying");
    this.view.flxAdd.setVisibility(false);
    this.view.flxView.setVisibility(true);
    this.view.lblModeName.skin = "sknLblDubai231f2020pxBold";
    this.view.flxSwitchContainer.skin = "sknFlxf1f1f1Rounded8px";

    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
  } else {
//     voltmx.ui.showToast("No valid mode to display.");
  }
},

  
  navToFavourites: function()
  {
    new voltmx.mvc.Navigation("frmFavourites").navigate();
  },
  
  navToMyBookings: function()
  {
    new voltmx.mvc.Navigation("frmMyBookings").navigate();
  },
  
    
    setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  this.getSwitchState();
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
    voltmx.store.getItem("regDate");
    this.view.lblJoinedOn.text = "Joined on "+ voltmx.store.getItem("regDate");
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;
 
  
//   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // List of label widget IDs to apply alignment
  var labelList = [
    "lblMyAccount", "lblMyVehicles","lblMyBookings","lblAuctions","lblSellCar","lblHelp","lblAppSettings","lblAdditionalFeatures","lblFav","CopylblSettings0ae3d43376d3949","lblContact","lblLogout","lblModeInfo1","lblModeInfo2"
  ];
 
  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }
 
  // List of Flex containers to reverse layout direction
  var flexList = [
  
    "flxMyAccount","flxMyVehicles","flxMyBookings","flxAuctions","flxSellCar","flxHelp","flxAppSettings","flxLanguageToggle","flxFavourites","flxNotifications","flxShareApp","flxContact","flxLogout","flxHeadingAdditionalFeatures","flxSecurityDeposit"
    
  ];
 
//   // Apply reverseLayoutDirection
  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }
      
      if (isArabic) {
        
        this.view.lblUsernameMenubar.left = "";
  this.view.lblUsernameMenubar.right = "0dp";
        
        this.view.flxVerifiedUser.left = "";
  this.view.flxVerifiedUser.right = "0dp";
  
  this.view.lblJoinedOn.left = "";
  this.view.lblJoinedOn.right = "0dp";
    
        this.view.flxUserDetailsMenuBar.right = "";
  this.view.flxUserDetailsMenuBar.left = "0dp";
        
        this.view.flxProfileMenuBar.left = "";
    this.view.flxProfileMenuBar.right = "6%";
        
    this.view.imgProfileIcon.left = "";
    this.view.imgProfileIcon.right = "5%";
    this.view.lblMyAccount.left = "";
    this.view.lblMyAccount.right = "5%";
    this.view.flxImgArrowToggle1.left = "";
    this.view.flxImgArrowToggle1.right = "10%";

    this.view.imgMyVehicles.left = "";
    this.view.imgMyVehicles.right = "5%";
    this.view.lblMyVehicles.left = "";
    this.view.lblMyVehicles.right = "5%";
    this.view.CopyflxImgArrowToggle0ia2a1ef42d984e.left = "";
    this.view.CopyflxImgArrowToggle0ia2a1ef42d984e.right = "10%";

    this.view.imgMyBookings.left = "";
    this.view.imgMyBookings.right = "5%";
    this.view.lblMyBookings.left = "";
    this.view.lblMyBookings.right = "5%";
    this.view.CopyflxImgArrowToggle0be4c0bca76e545.left = "";
    this.view.CopyflxImgArrowToggle0be4c0bca76e545.right = "10%";

    this.view.imgAuctionIcon.left = "";
    this.view.imgAuctionIcon.right = "5%";
    this.view.lblAuctions.left = "";
    this.view.lblAuctions.right = "5%";
    this.view.flxImgArrowToggle3.left = "";
    this.view.flxImgArrowToggle3.right = "10%";

    this.view.imgVehicle.left = "";
    this.view.imgVehicle.right = "5%";
    this.view.lblSellCar.left = "";
    this.view.lblSellCar.right = "5%";
    this.view.CopyflxImgArrowToggle0e6777395139b41.left = "";
    this.view.CopyflxImgArrowToggle0e6777395139b41.right = "10%";

    this.view.imgHelpIcon.left = "";
    this.view.imgHelpIcon.right = "5%";
    this.view.lblHelp.left = "";
    this.view.lblHelp.right = "5%";
    this.view.flxImgArrowToggle4.left = "";
    this.view.flxImgArrowToggle4.right = "10%";

    this.view.imgAppSettingsIcon.left = "";
    this.view.imgAppSettingsIcon.right = "5%";
    this.view.lblAppSettings.left = "";
    this.view.lblAppSettings.right = "5%";
    this.view.flxImgArrowToggle5.left = "";
    this.view.flxImgArrowToggle5.right = "10%";
        
    this.view.lblAdditionalFeatures.right = "5%";
    this.view.lblAdditionalFeatures.left = "";
        
     this.view.imgLanguageToggleIcon.left = "";
     this.view.imgLanguageToggleIcon.right = "5%";
      
      this.view.lblLanguageToggle.left = "";
       this.view.lblLanguageToggle.right = "5%";
        
        this.view.imgSettingsIcon.left = "";
        this.view.imgSettingsIcon.right = "5%";
        
        this.view.lblFav.left = "";
        this.view.lblFav.right = "5%";
        
        this.view.CopyimgSettingsIcon0gc4911f7666c40.left = "";
        this.view.CopyimgSettingsIcon0gc4911f7666c40.right = "5%";
        
        this.view.CopylblSettings0ae3d43376d3949.left = "";
        this.view.CopylblSettings0ae3d43376d3949.right = "5%";
        
        this.view.imgContactUsIcon.left = "";
        this.view.imgContactUsIcon.right = "5%";
        
        this.view.lblContact.left = "";
        this.view.lblContact.right = "5%";
        
        this.view.imgLogoutIcon.left = "";
        this.view.imgLogoutIcon.right = "5%";
        
        this.view.lblLogout.left = "";
        this.view.lblLogout.right = "5%";
        
        this.view.lblModeName.left = "";
        this.view.lblModeName.right = "5%";
        
        this.view.flxToggleSwitch.left = "10dp";
       this.view.flxToggleSwitch.right = "";
        
//         this.view.imgArrowToggle.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.CopyimgArrowToggle0ga7aeb42b88c4a.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.CopyimgArrowToggle0d965143ac1ad43.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.imgArrowToggle3.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.CopyimgArrowToggle0a8b5a29412af4a.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.imgArrowToggle4.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);
// this.view.imgArrowToggle5.transform = voltmx.ui.makeAffineTransform().scale(-1, 1);


} else {
  
  this.view.lblUsernameMenubar.left = "0dp";
  this.view.lblUsernameMenubar.right = "";
  
  this.view.flxVerifiedUser.left = "0dp";
  this.view.flxVerifiedUser.right = "";
  
  this.view.lblJoinedOn.left = "0dp";
  this.view.lblJoinedOn.right = "";
  
  this.view.flxUserDetailsMenuBar.right = "0dp";
  this.view.flxUserDetailsMenuBar.left = "";
  
    this.view.flxProfileMenuBar.left = "6%";
    this.view.flxProfileMenuBar.right = "";
  
    this.view.imgProfileIcon.right = "";
    this.view.imgProfileIcon.left = "5%";
    this.view.lblMyAccount.right = "";
    this.view.lblMyAccount.left = "5%";
    this.view.flxImgArrowToggle1.right = "";
    this.view.flxImgArrowToggle1.left = "10%";

    this.view.imgMyVehicles.right = "";
    this.view.imgMyVehicles.left = "5%";
    this.view.lblMyVehicles.right = "";
    this.view.lblMyVehicles.left = "5%";
    this.view.CopyflxImgArrowToggle0ia2a1ef42d984e.right = "";
    this.view.CopyflxImgArrowToggle0ia2a1ef42d984e.left = "10%";

    this.view.imgMyBookings.right = "";
    this.view.imgMyBookings.left = "5%";
    this.view.lblMyBookings.right = "";
    this.view.lblMyBookings.left = "5%";
    this.view.CopyflxImgArrowToggle0be4c0bca76e545.right = "";
    this.view.CopyflxImgArrowToggle0be4c0bca76e545.left = "10%";

    this.view.imgAuctionIcon.right = "";
    this.view.imgAuctionIcon.left = "5%";
    this.view.lblAuctions.right = "";
    this.view.lblAuctions.left = "5%";
    this.view.flxImgArrowToggle3.right = "";
    this.view.flxImgArrowToggle3.left = "10%";

    this.view.imgVehicle.right = "";
    this.view.imgVehicle.left = "5%";
    this.view.lblSellCar.right = "";
    this.view.lblSellCar.left = "5%";
    this.view.CopyflxImgArrowToggle0e6777395139b41.right = "";
    this.view.CopyflxImgArrowToggle0e6777395139b41.left = "10%";

    this.view.imgHelpIcon.right = "";
    this.view.imgHelpIcon.left = "5%";
    this.view.lblHelp.right = "";
    this.view.lblHelp.left = "5%";
    this.view.flxImgArrowToggle4.right = "";
    this.view.flxImgArrowToggle4.left = "10%";

    this.view.imgAppSettingsIcon.right = "";
    this.view.imgAppSettingsIcon.left = "5%";
    this.view.lblAppSettings.right = "";
    this.view.lblAppSettings.left = "5%";
    this.view.flxImgArrowToggle5.right = "";
    this.view.flxImgArrowToggle5.left = "10%";
  
    this.view.lblAdditionalFeatures.left = "5%";
    this.view.lblAdditionalFeatures.right = "";
  
  this.view.imgLanguageToggleIcon.left = "5%";
     this.view.imgLanguageToggleIcon.right = "";
      
      this.view.lblLanguageToggle.left = "5%";
       this.view.lblLanguageToggle.right = "";
        
        this.view.imgSettingsIcon.left = "5%";
        this.view.imgSettingsIcon.right = "";
        
        this.view.lblFav.left = "5%";
        this.view.lblFav.right = "";
        
        this.view.CopyimgSettingsIcon0gc4911f7666c40.left = "5%";
        this.view.CopyimgSettingsIcon0gc4911f7666c40.right = "";
        
        this.view.CopylblSettings0ae3d43376d3949.left = "5%";
        this.view.CopylblSettings0ae3d43376d3949.right = "";
        
        this.view.imgContactUsIcon.left = "5%";
        this.view.imgContactUsIcon.right = "";
        
        this.view.lblContact.left = "5%";
        this.view.lblContact.right = "";
        
        this.view.imgLogoutIcon.left = "5%";
        this.view.imgLogoutIcon.right = "";
        
        this.view.lblLogout.left = "5%";
        this.view.lblLogout.right = "";
  
        this.view.lblModeName.left = "5%";
        this.view.lblModeName.right = "";
  
       this.view.flxToggleSwitch.left = "";
       this.view.flxToggleSwitch.right = "10dp";
  
//      this.view.imgArrowToggle.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.CopyimgArrowToggle0ga7aeb42b88c4a.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.CopyimgArrowToggle0d965143ac1ad43.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.imgArrowToggle3.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.CopyimgArrowToggle0a8b5a29412af4a.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.imgArrowToggle4.transform = voltmx.ui.makeAffineTransform().scale(1, 1);
// this.view.imgArrowToggle5.transform = voltmx.ui.makeAffineTransform().scale(1, 1);

}

 
  // Optional localization of text, if needed
//       this.view.lblAuctionCalendar.text=voltmx.i18n.getLocalizedString("Auction Calendar");
       this.view.lblMyAccount.text = voltmx.i18n.getLocalizedString("My Account");
       this.view.lblMyVehicles.text = voltmx.i18n.getLocalizedString("My Vehicles");
      this.view.lblMyBookings.text = voltmx.i18n.getLocalizedString("My Bookings");
      this.view.lblAuctions.text = voltmx.i18n.getLocalizedString("Auctions");
      this.view.lblSellCar.text = voltmx.i18n.getLocalizedString("Sell Car");
      this.view.lblHelp.text = voltmx.i18n.getLocalizedString("Help");
      this.view.lblAppSettings.text = voltmx.i18n.getLocalizedString("App Settings");
      this.view.lblLanguageToggle.text =  voltmx.i18n.getLocalizedString("Language Toggle");
      this.view.lblFav.text = voltmx.i18n.getLocalizedString("Favorites");
      this.view.CopylblSettings0ae3d43376d3949.text = voltmx.i18n.getLocalizedString("Notifications");
//       this.view.lblShareApp.text = voltmx.i18n.getLocalizedString("Notifications");
      this.view.lblContact.text = voltmx.i18n.getLocalizedString("Contact Us");
      this.view.lblLogout.text = voltmx.i18n.getLocalizedString("Logout");
      this.view.lblAdditionalFeatures.text = voltmx.i18n.getLocalizedString("Additional Features");
      
      this.view.Label0ief788949aef42.text = voltmx.i18n.getLocalizedString("Add");
      this.view.CopyLabel0f69faa19292a43.text = voltmx.i18n.getLocalizedString("View");

},
  
  adjustArrowsForRTL: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  var flipTransform =  voltmx.ui.makeAffineTransform();
  flipTransform.scale(-1, 1);

  if (isArabic) {
    this.view.imgArrowToggle.transform = flipTransform;
    this.view.CopyimgArrowToggle0ga7aeb42b88c4a.transform = flipTransform;
    this.view.CopyimgArrowToggle0d965143ac1ad43.transform = flipTransform;
    this.view.imgArrowToggle3.transform = flipTransform;
    this.view.CopyimgArrowToggle0a8b5a29412af4a.transform = flipTransform;
    this.view.imgArrowToggle4.transform = flipTransform;
    this.view.imgArrowToggle5.transform = flipTransform;
  } else {
    var normalTransform =  voltmx.ui.makeAffineTransform(); // No scale
    this.view.imgArrowToggle.transform = normalTransform;
    this.view.CopyimgArrowToggle0ga7aeb42b88c4a.transform = normalTransform;
    this.view.CopyimgArrowToggle0d965143ac1ad43.transform = normalTransform;
    this.view.imgArrowToggle3.transform = normalTransform;
    this.view.CopyimgArrowToggle0a8b5a29412af4a.transform = normalTransform;
    this.view.imgArrowToggle4.transform = normalTransform;
    this.view.imgArrowToggle5.transform = normalTransform;
  }

  this.view.forceLayout();
},
  
  changeApplicationCurrentLocale: function() 
  { 
    var currentLocale = voltmx.i18n.getCurrentLocale();
    //var selectedLang= this.view.btnChangeLang.text;

    //         alert("currentLocale :"+currentLocale);
    var currentLocalToSet;
    if(currentLocale === 'en_IN'){
      // this.view.btnChangeLang.text ="Eng";
      voltmx.store.setItem("currentLocale","ar");

      currentLocalToSet = 'ar_AE';
      //         alert("currentLocalToSet :"+currentLocalToSet);
    }
    else{
      // this.view.btnChangeLang.text ="عربي";
      voltmx.store.setItem("currentLocale","en");
      currentLocalToSet = 'en_IN';

      // alert("currentLocalToSet :"+currentLocalToSet);
    }
    voltmx.i18n.setCurrentLocaleAsync(currentLocalToSet, currentLocaleChangeSuccess, currentLocaleChangeFailure);
    function currentLocaleChangeSuccess () {
      var ntf = new voltmx.mvc.Navigation("frmLangChange");
      ntf.navigate();
    }
    function currentLocaleChangeFailure () {
      //         alert("Error while changing the current application locale");
    }
  }

  

 });

