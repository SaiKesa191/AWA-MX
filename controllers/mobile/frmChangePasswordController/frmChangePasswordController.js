define({
  
  onNavigate: function () {
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxArrow.onClick=this.backNavigation.bind(this);
    this.view.flxEyeImg.onClick = this.newPasswordOnTextChangeShow.bind(this);
    this.view.flxEyeImg03.onClick =
      this.confirmPasswordOnTextChangeShow.bind(this);


    this.view.txtNewPassword.onTextChange = 
      this.onPasswordTextChange.bind(this);
    this.view.txtConfirmNewPassword.onTextChange =
      this.onConfirmPasswordTextChange.bind(this);

    this.view.btnChangePassword.onClick =
      this.validateAndChangePassword.bind(this);
    
    this.view.btnHomePage.onClick=this.goToHome.bind(this);
    this.view.flxRemovePaypopup.onClick=this.removePopUP.bind(this);
    
  },

  onPreShow: function () {
    this.toggleFooterIcons();
    this.view.flxError.setVisibility(false);
    if(  this.view.flxError){
      
      this.view.flxError.setVisibility(false);
    }
        this.view.flxError.btnTryAgain.onClick=
          this.onTryAgainOnclick.bind(this);
    
    if(this.view.SmthngWentWrong){
      this.view.SmthngWentWrong.setVisibility(false);
    }
  
      if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    
  },
  
  onTryAgainOnclick: function () {
  var self = this;

  // Hide the error popup
  this.view.flxError.setVisibility(false);

  // Check if internet is available
  if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {

    //  Clear the UI (manual refresh)
    this.view.txtUserName.text = "";
    this.view.txtNewPassword.text = "";
    this.view.txtConfirmNewPassword.text = "";
    this.view.lblErrorText.setVisibility(false);
    this.view.lblErrorText02.setVisibility(false);
    this.view.flxerrortext01.setVisibility(false);
    this.view.lblValidationError.setVisibility(false);
    this.view.flxPaymentSuccessPopup.setVisibility(false);

    this.view.txtNewPassword.secureTextEntry = true;
    this.view.txtConfirmNewPassword.secureTextEntry = true;
    this.view.eyeClose.setVisibility(true);
    this.view.imgEyeClose01.setVisibility(true);

    //  (Optional) Set focus back to first field
//     this.view.txtUserName.setFocus(true);

    // Retry API with previous values
    var oldPwd = this.view.txtUserName.text;
    var newPwd = this.view.txtNewPassword.text;

    // Only retry if values exist (otherwise user needs to re-enter)
    if (oldPwd && newPwd) {
      this.callChangePasswordAPI(oldPwd.trim(), newPwd.trim());
    }

  } else {
    // Still offline — show error again
    this.view.flxError.setVisibility(true);
  }
},

  goToHome: function(){
     var goToHomePage=new voltmx.mvc.Navigation("frmDashBoard");
     goToHomePage.navigate(); 
    var self=this;  
     self.view.txtUserName.text = "";
        self.view.txtNewPassword.text = "";
        self.view.txtConfirmNewPassword.text = "";
        self.view.lblErrorText.setVisibility(false);
        self.view.lblErrorText02.setVisibility(false);
        self.view.txtNewPassword.secureTextEntry = true;
        self.view.txtConfirmNewPassword.secureTextEntry = true;
        self.view.eyeClose.setVisibility(true);
        self.view.imgEyeClose01.setVisibility(true);
         self.view.lblValidationError.setVisibility(false);
     self.view.flxerrortext01.setVisibility(false);
    self.view.flxPaymentSuccessPopup.setVisibility(false);
    
  },

    removePopUP: function(){
       
      this.view.flxPaymentSuccessPopup.setVisibility(false);
      
    },
    
  backNavigation: function(){
    new voltmx.mvc.Navigation("frmOpenMyAccount").navigate();
    this.view.txtUserName.text="";
    this.view.txtNewPassword.text="";
    this.view.txtConfirmNewPassword.text="";
    this.view.txtUserName.text = "";
        this.view.txtNewPassword.text = "";
    this.view.flxerrortext01.setVisibility(false);
        this.view.txtConfirmNewPassword.text = "";
        this.view.lblErrorText.setVisibility(false);
        this.view.lblErrorText02.setVisibility(false);
        this.view.txtNewPassword.secureTextEntry = true;
        this.view.txtConfirmNewPassword.secureTextEntry = true;
        this.view.eyeClose.setVisibility(true);
        this.view.imgEyeClose01.setVisibility(true);
         this.view.lblValidationError.setVisibility(false);
     this.view.flxPaymentSuccessPopup.setVisibility(false);
    
    
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
    
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },

  newPasswordOnTextChangeShow: function () {
    this.view.txtNewPassword.secureTextEntry =
      !this.view.txtNewPassword.secureTextEntry;
    this.view.eyeClose.setVisibility(this.view.txtNewPassword.secureTextEntry);
  },

  confirmPasswordOnTextChangeShow: function () {
    this.view.txtConfirmNewPassword.secureTextEntry =
      !this.view.txtConfirmNewPassword.secureTextEntry;
    this.view.imgEyeClose01.setVisibility(this.view.txtConfirmNewPassword.secureTextEntry);
  },

  onPasswordTextChange: function () {
    var password = this.view.txtNewPassword.text;

    if (!password || password.trim() === "") {
      this.view.lblErrorText02.setVisibility(false);
      return;
    }

    if (this.validatePassword(password)) {
      this.view.lblErrorText02.text = voltmx.i18n.getLocalizedString("Strong password");
      this.view.lblErrorText02.skin = "sknlbl61b35cDubaiRegFont40px";
    } else {
      this.view.lblErrorText02.text =
       voltmx.i18n.getLocalizedString("Password must be");
      this.view.lblErrorText02.skin = "sknlblDubaiRegff0000Font40px";
    }

    this.view.lblErrorText02.setVisibility(true);

    // Validate confirm password again to ensure match after new password change
    this.onConfirmPasswordTextChange();
  },
  
  
  
  onConfirmPasswordTextChange: function () {
  var confirmPassword = this.view.txtConfirmNewPassword.text;
  var newPassword = this.view.txtNewPassword.text;

  if (!confirmPassword || confirmPassword.trim() === "") {
    this.view.lblErrorText.setVisibility(false);
    return;
  }

  if (newPassword === confirmPassword) {
    this.view.lblErrorText.text =voltmx.i18n.getLocalizedString("Passwords match");
    this.view.lblErrorText.skin = "sknlbl61b35cDubaiRegFont40px";
  } else {
    this.view.lblErrorText.text = voltmx.i18n.getLocalizedString("Passwords do not match");
    this.view.lblErrorText.skin = "sknlblDubaiRegff0000Font40px";
  }

  this.view.lblErrorText.setVisibility(true);
},


  validateAndChangePassword: function () {
    var isValid = true;

//     var oldPwd = this.view.txtUserName.text.trim()|| "";
//     var newPwd = this.view.txtNewPassword.text.trim();
//     var confirmPwd = this.view.txtConfirmNewPassword.text.trim();
    
    
    var oldPwd = this.view.txtUserName && this.view.txtUserName.text ?
        this.view.txtUserName.text.trim() : "";
var newPwd = this.view.txtNewPassword && this.view.txtNewPassword.text ?
    this.view.txtNewPassword.text.trim() : "";
var confirmPwd = this.view.txtConfirmNewPassword && 
    this.view.txtConfirmNewPassword.text ?
    this.view.txtConfirmNewPassword.text.trim() : "";


    // Old Password Validation
    if (!oldPwd) {
      this.view.flxerrortext01.setVisibility(true); 
      // Show error label or container
      isValid = false;
    } else {
      this.view.flxerrortext01.setVisibility(false); // Hide error if valid
    }

    // New Password Validation
    if (!newPwd) {
      this.view.lblErrorText02.setVisibility(true);
      this.view.lblErrorText02.text = voltmx.i18n.getLocalizedString("Field is required");
      this.view.lblErrorText02.skin = "sknlblDubaiRegff0000Font40px";
      isValid = false;
    } else if (!this.validatePassword(newPwd)) {
      this.view.lblErrorText02.setVisibility(true);
      this.view.lblErrorText02.text = voltmx.i18n.getLocalizedString("Password must be");
      this.view.lblErrorText02.skin = "sknlblDubaiRegff0000Font40px";
      isValid = false;
    } else {
      this.view.lblErrorText02.setVisibility(false);
    }

    // Confirm Password Validation
    if (!confirmPwd) {
      this.view.lblErrorText.setVisibility(true);
      this.view.lblErrorText.text = voltmx.i18n.getLocalizedString("Field is required");
      this.view.lblErrorText.skin = "sknlblDubaiRegff0000Font40px";
      isValid = false;
    } else if (newPwd !== confirmPwd) {
      this.view.lblErrorText.setVisibility(true);
      this.view.lblErrorText.text = voltmx.i18n.getLocalizedString("Passwords do not match");
      this.view.lblErrorText.skin = "sknlblDubaiRegff0000Font40px";
      isValid = false;
    } else {
      this.view.lblErrorText.setVisibility(false);
    }

    // Prevent reusing old password
//     if (oldPwd === newPwd) {
//       alert("New password cannot be the same as the old password.");
//       this.view.lblErrorText02.text="*New password cannot be the same as the old password."
//       isValid = false;
//     }
//     else if(oldPwd==="" && newPwd==="" ){
//         this.view.lblValidationError.setVisibility(true);
//        this.view.lblValidationError.text="*old password and newpassword fields are mandatory";
//     },
    
    
    if (oldPwd === "" || newPwd === "") {
      this.view.lblValidationError.setVisibility(true);
      this.view.lblValidationError.text = voltmx.i18n.getLocalizedString("Old password and new password fields are mandatory");
      isValid = false;
    } else if (oldPwd === newPwd) {
//       alert("New password cannot be the same as the old password.");
      this.view.lblErrorText02.setVisibility(true);
      this.view.lblErrorText02.text =voltmx.i18n.getLocalizedString("New password cannot be the same as the old password");
      isValid = false;
    } else {
      this.view.lblValidationError.setVisibility(false);
      this.view.lblErrorText02.setVisibility(false);
    }


    if (isValid) {
      var self = this;
      this.callChangePasswordAPI(oldPwd, newPwd, function onSuccess() {

        self.view.txtUserName.text = "";
        self.view.txtNewPassword.text = "";
        self.view.txtConfirmNewPassword.text = "";
        self.view.lblErrorText.setVisibility(false);
        self.view.lblErrorText02.setVisibility(false);
        self.view.txtNewPassword.secureTextEntry = true;
        self.view.txtConfirmNewPassword.secureTextEntry = true;
        self.view.eyeClose.setVisibility(true);
        self.view.imgEyeClose01.setVisibility(true);
         self.view.lblValidationError.setVisibility(false);
      });
    }
  },
  
  
  
   validatePassword: function (pwd) {
    // Validate for at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
//   var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*&#])[A-Za-z\d@$!%*&#]{8,16}$/;

    return pattern.test(pwd);
  },


  
  callChangePasswordAPI: function (oldPwd, newPwd) {
  try {
    var request = new voltmx.net.HttpRequest();
    var usertoken = voltmx.store.getItem("getUserAccesstoken");

    var baseURL = voltmx.store.getItem("BASE_URL");
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }

    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var url = baseURL + "services/ms_user/api/v1/update-user-additional-info-password";

    request.open("PUT", url, true);

    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Basic " + encodeVal);
    request.setRequestHeader("user_token", usertoken);

    var payload = {
      old_password: oldPwd,
      new_password: newPwd
    };

      request.send(JSON.stringify(payload));
//     voltmx.application.showLoadingScreen("sknLoading", "Changing password...",
//       constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

    var self = this;

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        // Network error check
        if (request.status === -1 || request.status === 0) {
         // alert("entered status===-1")
          self.view.flxError.setVisibility(true);
//           self.view.flxPaymentSuccessPopup.setVisibility(false);
          return;
        }

    
        if (!request.responseText) {
        
          self.view.flxError.setVisibility(true);
//           self.view.flxPaymentSuccessPopup.setVisibility(false);
          return;
        }

        try {
          var response = JSON.parse(request.responseText);
          
          

          // Handle specific error case
          if (response.error && response.error.message === "Password mismatch") {
//             self.view.lblErrorText01.text = "Incorrect password";
//             self.view.flxerrortext01.setVisibility(true);
           self.view.SmthngWentWrong.lblSomethingWentWrong.text= "Incorrect old password"
            self.view.SmthngWentWrong.setVisibility(true);
          }
          if (request.status === 200) {
           // alert("entered into ststus 200")
           
            self.view.flxError.setVisibility(false);
            self.view.flxPaymentSuccessPopup.setVisibility(true);
            // Clear input fields and reset UI
            self.view.txtUserName.text = "";
            self.view.txtNewPassword.text = "";
            self.view.txtConfirmNewPassword.text = "";
            self.view.flxerrortext01.setVisibility(false);
            self.view.lblErrorText.setVisibility(false);
            self.view.lblErrorText02.setVisibility(false);
            self.view.txtNewPassword.secureTextEntry = true;
            self.view.txtConfirmNewPassword.secureTextEntry = true;
            self.view.eyeClose.setVisibility(true);
            self.view.imgEyeClose01.setVisibility(true);
            self.view.lblValidationError.setVisibility(false);
          } else {
//             alert("Failed to change password: " + (response.message || "Unknown error"));
//             self.view.flxError.setVisibility(true);
//             self.view.flxPaymentSuccessPopup.setVisibility(false);
//             self.view.lblValidationError.setVisibility(true);
// //             self.view.lblValidationError.text="password change unsuccessfull"
//              self.view.lblValidationError.text="password change unsuccessfull"
         self.view.SmthngWentWrong.lblSomethingWentWrong.text=
           "password change unsuccessfull"
  
            self.view.SmthngWentWrong.setVisibility(true);
          }
        } catch (e) {
//           alert("Response parse error: " + e.message);
//            self.view.lblValidationError.text="password change unsuccessfull"
//           self.view.flxError.setVisibility(true);
//           self.view.flxPaymentSuccessPopup.setVisibility(false);
           self.view.SmthngWentWrong.lblSomethingWentWrong.text=
           "password change unsuccessfull"
  
            self.view.SmthngWentWrong.setVisibility(true);
        }
      }
    };



  } catch (err) {
    voltmx.application.dismissLoadingScreen();
    alert("Exception: " + err.message);
  }
  },




  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
         this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    // Determine alignment and direction
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
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
    //   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    // List of label widget IDs to apply alignment
    var labelList = [
      "lblMyInfo","lbluserName","lblnewPassword","lblConfirmNewpassword","txtUserName",
      "lblErrorText01","txtNewPassword","lblErrorText02","txtConfirmNewPassword",
      "lblErrorText","lblValidationError"
    ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

  // List of Flex containers to reverse layout direction
  var flexList = [
  
    "flxtextBox","flxEyeImg03","flxConfirmNewPassword","flxChangePassword"
    
    
  ];

  // Apply reverseLayoutDirection
  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  // Optional localization of text, if needed
this.view.lblpasswordChnagedSuccessfully.text = voltmx.i18n.getLocalizedString("Your password has been changed successfully.");
   this.view.btnHomePage.text =  voltmx.i18n.getLocalizedString("Go To Home Page");  
 this.view.lblMyInfo.text=voltmx.i18n.getLocalizedString("Change Password");
  this.view.lbluserName.text=voltmx.i18n.getLocalizedString("Old Password");
   this.view.lblnewPassword.text=voltmx.i18n.getLocalizedString("New Password");
  this.view.lblConfirmNewpassword.text=
    voltmx.i18n.getLocalizedString("Confirm New Password");  
  this.view.btnChangePassword.text=
    voltmx.i18n.getLocalizedString("Change Password");  
    
    
}
  
  
  
  
});
