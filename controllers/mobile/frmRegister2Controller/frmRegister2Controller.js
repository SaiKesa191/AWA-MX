define({ 

  //Type your controller code here 
  onNavigate: function(){
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    this.terms = false;
    this.view.preShow = this.onPreShow;
    this.view.btnSaveAndContinue.skin = "sknbtnBG61B35CRoundedBorder61B35C1pxFontDubaiRegffffffSize45px";
    this.view.flxToggle2.skin = "sknflxBGFF7171Opacity50perPlainBorderFF71711px";
    this.view.flxBarSellerOrBuyer.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxBarEmail.skin ="sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxEmailVerificationCodeBar.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxBarMobile.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxBarMobileOtp.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxBarUserName.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxBarPassConfo.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flx2.onClick = this.PopupVisibilityAction; 
    this.view.flxClosePopup.onClick = this.ClosePopupOnClick;
    this.view.btnSaveAndContinue.onClick = this.btnSaveAndContinueSellerOrBuyeronClickAction;
    this.view.flxFooter.onClick = this.nextOnclick;
    this.view.onDeviceBack = () => {
      voltmx.print("Device back pressed, but blocked on frmRegister1");
    };
    this.view.HeaderRegisterSellerOrBuyer.imgBack.onTouchEnd = this.BackNavigation.bind(this,"sellerOrBuyer");
    this.view.HeaderRegisterForEmail.imgBack.onTouchEnd = this.BackNavigation.bind(this,"emailBack");
    this.view.HeaderRegisterForCompany.imgBack.onTouchEnd  = this.BackNavigation.bind(this, "companyBack");
    this.view.HeaderRegisterForTradeLicense.imgBack.onTouchEnd= this.BackNavigation.bind(this,"tradeLicense");
    this.view.HeaderRegisterForTradeLicenseExpiryDate.imgBack.onTouchEnd   = this.BackNavigation.bind(this,"tradeLicenseExpiryDate");
    this.view.HeaderRegisterForTaxRegistrationNumber.imgBack.onTouchEnd = this.BackNavigation.bind(this,"taxRegistrationNumber");
    this.view.HeaderRegisterForVerificationCode.imgBack.onTouchEnd = this.BackNavigation.bind(this,"emailVerificationCode");
    this.view.HeaderRegisterMobileContainer.imgBack.onTouchEnd = this.BackNavigation.bind(this,"mobileBack");
    this.view.HeaderRegisterMobileOTP.imgBack.onTouchEnd  = this.BackNavigation.bind(this,"mobileotpback");
    this.view.HeaderRegister3.imgBack.onTouchEnd = this.BackNavigation.bind(this,"usernameBack");
    this.view.HeaderRegister1.imgBack.onTouchEnd  = this.BackNavigation.bind(this,"passwordback");
    this.view.HeaderRegisterConfirmPassword.imgBack.onTouchEnd = this.BackNavigation.bind(this,"confirmPassBack");
    this.view.flxRadioButtonSeller.onClick = this.flxRadioButtonSellerOnClick;
    this.view.flxRadioButtonBuyer.onClick = this.flxRadioButtonBuyerOnClick;
    this.view.flxWithTradeRadioBtn.onClick = this.flxWithTradeRadioBtnOnClick;
    this.view.flxWithoutTradeRadioBtn.onClick = this.radioBtnWithoutTradeOnclick;
    this.view.btnTradeSaveAndContinue.onClick=this.btnTradeSaveAandContinueOnclickAction;
    this.view.flxSellerRegisterPopupClose.onClick = this.flxSellerRegisterPopupCloseOnClickAction;
    this.view.flxCompanyFooter.onClick = this.flxCompanyFooterOnClickAction;
    this.view.flxTradeLicenseFooter.onClick = this.flxTradeLicenseFooterOnClickAction;
    this.view.tbxCompanyAddress.onTextChange = this.tbxCompanyAddressOnTextChangeAction;
    this.view.tbxTradeLicenseNumber.onTextChange = this.tbxTradeLicenseNumberOnTextChangeAction;
    this.view.calendarTradeLicenseExpiryDate.onSelection = this.calendarTradeLicenseExpiryDateOnSelectionAction;
    this.view.tbxTaxRegistrationNumber.onTextChange = this.tbxTaxRegistrationNumberOnTextChangeAction;
    this.view.flxTradeLicenseExpiryDateFooter.onClick = this.flxTradeLicenseExpiryDateFooterOnClickAction;
    this.view.flxTaxRegistrationNumberFooter.onClick = this.flxTaxRegistrationNumberFooterOnClickAction;
    this.view.tbxEmailAddress.onTextChange = this.tbxEmailAddressOnTextChangeAction;
    this.view.flxEmailFooter.onClick= this.flxWrapper;
    this.view.flxMobileFooter.onClick = this.flxWrappermobilefooter;
    this.view.flxResendCode.onClick = this.flxWrapper3;
    this.view.tbxPhoneNumber.onTextChange = this.tbxPhoneNumberonTextChangeAction;
    this.view.flxCountryCode.onClick = this.flxCountryCodeOnClickAction;
    this.view.flxCountrycodeClosePopup.onClick = this.flxCountrycodeClosePopupOnClickAction;
    this.view.segCountryCodes.onRowClick = this.segCountryCodesOnRowClickAction;
    this.view.flxImgBack.onClick = this.flxImgBackOnClickAction;
    this.view.tbxSearchCountryCode.onTextChange = this.tbxSearchCountryCodeOnTextChangeAction.bind(this);
    this.view.flxResendMobileOtpCodeIn.onClick = this.flxWrapper7.bind(this);
    this.view.flxOtpVerificationFooter.onClick = this.flxWrapper8;
    this.view.tbxUserName.onTextChange = this.tbxUserNameOnTextChangeAction;
    this.view.flxUserNameFooter.onClick = this.flxWrapper9;
    this.view.flxEmailVerificationFooter.onClick= this.flxWrapper4;
    this.view.tbxPassWordName.onTextChange = this.tbxPassWordNameOnTextChangeAction;
    this.view.tbxConfirmPassWord.onTextChange = this.tbxConfirmPassWordOnTextChangeAction;
    this.view.flxPasswordFooter.onClick = this.flxPasswordFooterOnClickAction;
    this.view.flxEyeIconPass.onClick = this.flxEyeIconPassOnClickAction;
    this.view.flxEyeIconConfirmPass.onClick = this.flxEyeIconConfirmPassOnClickAction;
    this.view.lblUploadSignedDocs.onTouchEnd = this.lblUploadSignedDocsOnTouchEndAction;
    this.view.lblDownloadTermsAndConditions.onTouchEnd = this.lblDownloadTermsAndConditionsOnTouchEndAction;
    this.view.btnUploadYourDoc.onClick = this.btnUploadYourDocOnClickAction;
    this.view.flxCheckBoxTerms.onClick = this.chxIhaveReadTermsNCondOnSelectionAction;
    this.view.btnSaveAndContinueForTermsNConditions.onClick = this.flxWrapper10;
    this.view.flxClose.onClick= this.btnSaveAndContinueSellerOnClickAction;
    this.view.btnSaveAndContinueSeller.onClick=this.btnSaveAndContinueSellerOnClickAction;
    this.view.btnSaveAndContinueBuyer.onClick = this.btnSaveAndContinueBuyerOnClick;
    this.view.flxCloseBuyer.onClick = this.btnSaveAndContinueBuyerOnClick;
    this.view.HeaderRegisterSellerOrBuyer.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForEmail.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForCompany.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForTradeLicense.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForTradeLicenseExpiryDate.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForTaxRegistrationNumber.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterForVerificationCode.btnLogin.onClick = this.flxLoginOnClickActionForEmailVerificationCode;
    this.view.HeaderRegisterMobileContainer.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterMobileOTP.btnLogin.onClick = this.flxLoginOnClickActionForMobileOtp;
    this.view.HeaderRegister3.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegister1.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.HeaderRegisterConfirmPassword.btnLogin.onClick = this.flxLoginOnClickAction;
    this.view.tbxCode1.onTextChange = this.emailtbxCode1OnTextChangeAction ;
    this.view.tbxCode2.onTextChange = this.emailtbxCode2OnTextChangeAction;
    this.view.tbxCode3.onTextChange = this.emailtbxCode3OnTextChangeAction;
    this.view.tbxCode4.onTextChange = this.emailtbxCode4OnTextChangeAction;
    this.view.tbxOTP1.onTextChange  = this.mobiletbxOTP1OnTextChangeAction;
    this.view.tbxOTP2.onTextChange = this.mobiletbxOTP2OnTextChangeAction;
    this.view.tbxOTP3.onTextChange  = this.mobiletbxotp3OnTextChangeAction;
    this.view.tbxOTP4.onTextChange = this.mobiletbxOTP4OnTextChangeAction;
    this.view.tbxCode1.onEndEditing = this.handleOTPBlur.bind(this, "tbxCode1");
    this.view.tbxCode2.onEndEditing = this.handleOTPBlur.bind(this, "tbxCode2");
    this.view.tbxCode3.onEndEditing = this.handleOTPBlur.bind(this, "tbxCode3");
    this.view.tbxCode4.onEndEditing = this.handleOTPBlur.bind(this, "tbxCode4");
    this.view.flxSeller.onClick = this.flxRadioButtonSellerOnClick;
    this.view.flxBuyer.onClick = this.flxRadioButtonBuyerOnClick;
    this.view.flxWithoutTrade.onClick = this.radioBtnWithoutTradeOnclick;
    this.view.flxWithTrade.onClick = this.flxWithTradeRadioBtnOnClick;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
    voltmx.application.dismissLoadingScreen();
  },


  //   handleOTPBlur: function(boxId) {
  //     voltmx.print(boxId + " lost focus");
  //     var otp1 = this.view.tbxCode1 ? (this.view.tbxCode1.text || "").trim() : "";
  //     var otp2 = this.view.tbxCode2 ? (this.view.tbxCode2.text || "").trim() : "";
  //     var otp3 = this.view.tbxCode3 ? (this.view.tbxCode3.text || "").trim() : "";
  //     var otp4 = this.view.tbxCode4 ? (this.view.tbxCode4.text || "").trim() : "";
  //     var isEmpty = !(otp1 || otp2 || otp3 || otp4);
  //     if (isEmpty) {
  //       this.view.flxEmailVerificationFooter.setVisibility(false);
  //     }
  //   },
  handleOTPBlur: function(boxId) {
    voltmx.print(boxId + " lost focus");

    if (!this.view) {
      voltmx.print("Form destroyed — skipping handleOTPBlur");
      return;
    }

    var otp1 = this.view.tbxCode1 ? (this.view.tbxCode1.text || "").trim() : "";
    var otp2 = this.view.tbxCode2 ? (this.view.tbxCode2.text || "").trim() : "";
    var otp3 = this.view.tbxCode3 ? (this.view.tbxCode3.text || "").trim() : "";
    var otp4 = this.view.tbxCode4 ? (this.view.tbxCode4.text || "").trim() : "";

    var isEmpty = !(otp1 || otp2 || otp3 || otp4);
    if (isEmpty) {
      this.view.flxEmailVerificationFooter.setVisibility(false);
    }
  },





  handleOTPInput: function(currentBox, nextBox, prevBox, storageKey, footerContainer, isLastBox) {
    var input = currentBox.text.replace(/[^0-9]/g, '');
    if (input.length >= 1) {
      currentBox.text = input.charAt(0);
      voltmx.store.setItem(storageKey, input.charAt(0));

      if (!isLastBox && nextBox) {
        nextBox.setFocus(true);
      } else if (isLastBox && footerContainer) {
        footerContainer.setVisibility(true);
      }
    } else {

      if (prevBox) {
        prevBox.setFocus(true);
      }
      if (footerContainer) {
        footerContainer.setVisibility(false);
      }
    }
  },


  emailtbxCode1OnTextChangeAction: function() {
    this.handleOTPInput(
      this.view.tbxCode1,
      this.view.tbxCode2,
      null, // no previous
      "emailCode1",
      this.view.flxEmailVerificationFooter,
      false
    );
  },
  emailtbxCode2OnTextChangeAction: function() {
    this.handleOTPInput(
      this.view.tbxCode2,
      this.view.tbxCode3,
      this.view.tbxCode1,
      "emailCode2",
      this.view.flxEmailVerificationFooter,
      false
    );
  },
  emailtbxCode3OnTextChangeAction: function() {
    this.handleOTPInput(
      this.view.tbxCode3,
      this.view.tbxCode4,
      this.view.tbxCode2,
      "emailCode3",
      this.view.flxEmailVerificationFooter,
      false
    );
  },
  emailtbxCode4OnTextChangeAction: function() {
    this.handleOTPInput(
      this.view.tbxCode4,
      null,
      this.view.tbxCode3,
      "emailCode4",
      this.view.flxEmailVerificationFooter,
      true
    );
  },

  mobiletbxOTP1OnTextChangeAction: function () {
    this.handleOTPInput(
      this.view.tbxOTP1,
      this.view.tbxOTP2,
      null, 
      "mobileotp1",
      this.view.flxOtpVerificationFooter,
      false
    );
  },
  mobiletbxOTP2OnTextChangeAction: function () {
    this.handleOTPInput(
      this.view.tbxOTP2,
      this.view.tbxOTP3,
      this.view.tbxOTP1,
      "mobileotp2",
      this.view.flxOtpVerificationFooter,
      false
    );
  },
  mobiletbxotp3OnTextChangeAction: function () {
    this.handleOTPInput(
      this.view.tbxOTP3,
      this.view.tbxOTP4,
      this.view.tbxOTP2,
      "mobileotp3",
      this.view.flxOtpVerificationFooter,
      false
    );
  },
  mobiletbxOTP4OnTextChangeAction: function () {
    this.handleOTPInput(
      this.view.tbxOTP4,
      null,
      this.view.tbxOTP3,
      "mobileotp4",
      this.view.flxOtpVerificationFooter,
      true
    );
  },


  clearOtpFields: function(prefix) {
    for (var i = 1; i <= 4; i++) {
      var tbx = this.view["tbx" + prefix + i];
      tbx.text = "";
      voltmx.store.removeItem(prefix.toLowerCase() + i);
    }
    if (prefix === "Code") {
      this.view.flxEmailVerificationFooter.setVisibility(false);
    } else if (prefix === "OTP") {
      this.view.flxOtpVerificationFooter.setVisibility(false);
    }
  },


  onPreShow: function(){
    var self = this;
    if ((this.getPreviousForm() === "frmRegister1") && this.navigationContext && this.navigationContext._meta_ && (this.navigationContext._meta_.widgetId === "flxNext") && (this.navigationContext._meta_.eventName === "onClick")) {
      self.view.lblUserFullName.text = this.navigationContext.txtFirstNlastName_text;
    }
    this.view.lblTermsNConditions.textStyle = "Underline";
    this.view.lbltermsAndConditions.onTouchEnd = ()=> {
      new voltmx.mvc.Navigation("frmTermsAnDConditions").navigate();
    };
    this.getCountryCodes();
    this.view.calendarTradeLicenseExpiryDate.placeholder = "Trade License Expiry Date";
    this.view.calendarTradeLicenseExpiryDate.dateComponents = null;
    var today = new Date();
    var nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    this.view.calendarTradeLicenseExpiryDate.validStartDate = [ today.getDate()  , today.getMonth() + 1, today.getFullYear()];
    this.view.calendarTradeLicenseExpiryDate.validEndDate = [nextYear.getDate() , nextYear.getMonth() + 1,   nextYear.getFullYear()];
    this.view.calendarTradeLicenseExpiryDate.viewConfig ={
      calendarViewConfig: {
        showCalendarIcon: false
      }} 
    this.setData();
  },


  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
    }
  },


  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;

    var labelList = [
      "lblIm",
      "lblUserFullName",
      "lblSeller",
      "lblBuyer",
      "lblEnterYourCompanyName",
      "EnterYourTradeLicenseNumber",
      "lblEnterYourTradeLicenseNumber",
      "lblCalendarPlaceholder",
      "EnterYourTaxRegistrationNumber",
      "lblEnterCodeSentToYou",
      "lblEmailResendCodein",
      "lblImSigningUpWithMobl",
      "lblSignedEmail",
      "lblEnterOTPSentToYou",
      "lblMyUserWillBe",
      "lblMyPassWordWillBe",
      "lblPassWordError",
      "lblConfirmPasswordWillbe",
      "lblPassWordShouldMatchConfirmPassword",
      "lblEnterCodeSentToYou",
      "lblUserNameError",
      "lblPassWordErrorWithStrike",
      "lblPassWordShouldMatchConfirmPassword",
      "lblTaxRegistrationNumberError",
      "WithoutTradertxInfo",
      "WithTradertxInfo",
      "tbxEmailAddress",
      "tbxCompanyAddress",
      "tbxTaxRegistrationNumber",
      "tbxPhoneNumber",
      "tbxPassWordName",
      "tbxConfirmPassWord",
      "tbxUserName",
      "tbxTradeLicenseNumber",
      "lblMinChar",
      "lblLower",
      "lblUpper",
      "lblSpecial"
    ];
    var calendarList = [
      "calendarTradeLicenseExpiryDate",
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
      "flxUserHead",
      "flxIm",
      "flxUser",
      "flxSeller",
      "flxBuyer",
      "flxSellerRegister",
      "flxTogglesTrade",
      "flxWithoutTrade",
      "flxWithTrade",
      "flxMail",
      "flxSigningUpWith",
      "EmailVerifyConfirmation",
      "flxCompanyImage",
      "flxEnterYourCompanyName",
      "flxTradeLicenseNumber",
      "flxEnterYourTradeLicenseNumber",
      "flxTradeLicenseExpiryDateHeadingImage",
      "flxTaxRegistrationNumberHeadingImg",
      "flxEnterYourTaxRegistrationNumber",
      "flxEmailOtpCodeHeadImg",
      "flxCodeVerification",
      "flxResendCode",
      "flxResendCodeInContainer",
      "flxOTPSentSuccessFully",
      "flxEmailOtpError",
      "flxMobileImgHeading",
      "flxCountryCodesContainer",
      "flxCountryCodeNmblNumber",
      "flxMobileError",
      "flxMobileVerificationHeading",
      "flxCodeVerificationText",
      "flxResendOTPCode",
      "flxMobileOtpError",
      "flxUserNameHeadingImg",
      "flxPassportHeadingImg",
      "flxPassWordError",
      "flxConfirmPassWordHead",
      "flxTermsAndcond",
      "flxEmailError",
      "flxDropDown",
      "flxCodeVerification",
      "flxUserNameError",
      "flxConfirmPasswordError",
      "flxTaxRegistrationNumberError",
      "flxIam",
      "flxImgDropDownFlex",
      "flxBarSellerOrBuyer",
      "flxBarEmail",
      "flxCompanyBar",
      "flxTradeLicenseBar",
      "flxTradeLicenseExpiryDateBar",
      "flxTaxRegistrationNumberBar",
      "flxEmailVerificationCodeBar",
      "flxBarMobile",
      "flxBarMobileOtp",
      "flxBarUserName",
      "flxBarPassConfo",
      "flxConfirmPasswordBar",
    ];

    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblIm.text = voltmx.i18n.getLocalizedString("Im");
    this.view.lblIma.text = voltmx.i18n.getLocalizedString("I am a");
    this.view.lblRegisterAs.text = voltmx.i18n.getLocalizedString("I want to register as a");
    this.view.lblSeller.text = voltmx.i18n.getLocalizedString("Seller");
    this.view.lblBuyer.text = voltmx.i18n.getLocalizedString("Buyer");
    this.view.WithoutTradertxInfo.text = voltmx.i18n.getCurrentLocale() === "ar_AE" ?
      'لأفراد <span style="color:#007bff;"><b>بدون</b></span> رخصة تجارية' :
    'FOR INDIVIDUALS <span style="color:#007bff;"><b>WITHOUT</b></span> TRADE LICENSE';
    this.view.WithTradertxInfo.text = voltmx.i18n.getCurrentLocale() === "ar_AE" ?
      'لأفراد <span style="color:#007bff;"><b>مع</b></span> رخصة تجارية' :
    'FOR INDIVIDUALS <span style="color:#007bff;"><b>WITH</b></span> TRADE LICENSE';
    this.view.btnTradeSaveAndContinue.text = voltmx.i18n.getLocalizedString("Save and Continue");
    this.view.lblImSigningUpWith.text = voltmx.i18n.getLocalizedString("I'm signing up with");
    this.view.tbxEmailAddress.placeholder = voltmx.i18n.getLocalizedString("Your Email");
    this.view.lblVerifyConfirmation.text = voltmx.i18n.getLocalizedString("We'll send a verification code to this email");
    this.view.lblEnterYourCompanyName.text = voltmx.i18n.getLocalizedString("Enter Your Company Name");
    this.view.EnterYourTradeLicenseNumber.text = voltmx.i18n.getLocalizedString("Enter Your Trade License Number");
    this.view.lblEnterYourTradeLicenseNumber.text = voltmx.i18n.getLocalizedString("Enter Your Trade License Expiry Date");
    this.view.EnterYourTaxRegistrationNumber.text = voltmx.i18n.getLocalizedString("Enter Your Tax Registration Number");
    this.view.lblEnterCodeSentToYou.text = voltmx.i18n.getLocalizedString("Enter the code sent to your email address");
    this.view.lblEmailResendCodein.text = voltmx.i18n.getLocalizedString("Resend Code in");
    this.view.tbxPhoneNumber.placeholder = voltmx.i18n.getLocalizedString("Your Mobile");
    this.view.lblEnterOTPSentToYou.text = voltmx.i18n.getLocalizedString("Enter the code sent to your phone number");
    this.view.lblMyUserWillBe.text = voltmx.i18n.getLocalizedString("My user Name will be");
    this.view.lblMyPassWordWillBe.text = voltmx.i18n.getLocalizedString("My password will be");
    this.view.lblConfirmPasswordWillbe.text = voltmx.i18n.getLocalizedString("Confirm password will be");
    this.view.tbxPassWordName.placeholder = voltmx.i18n.getLocalizedString("Password");
    this.view.tbxTradeLicenseNumber.placeholder = voltmx.i18n.getLocalizedString("Trade License Number");
    this.view.tbxTaxRegistrationNumber.placeholder = voltmx.i18n.getLocalizedString("Tax Registration Number");
    this.view.tbxUserName.placeholder = voltmx.i18n.getLocalizedString("Your username");
    this.view.lblImSigningUpWithMobl.text = voltmx.i18n.getLocalizedString("I'm signing up with");
    this.view.lblResendMblOTPCode.text = voltmx.i18n.getLocalizedString("Resend Code in");
    this.view.btnSaveAndContinueForTermsNConditions.text = voltmx.i18n.getLocalizedString("Save and Continue");
    this.view.lblCongratulations.text = voltmx.i18n.getLocalizedString("Your Application Has Been Submitted!");
    this.view.lblThanks.text = voltmx.i18n.getLocalizedString("Thank you for applying to become a seller on our platform");
    this.view.lblContact.text = voltmx.i18n.getLocalizedString("We’ll notify you via email once your account is approved.");
    this.view.lblCallForFurtherAssisstance.text = voltmx.i18n.getLocalizedString("If you have any questions in the meantime, feel free to call");
    this.view.btnSaveAndContinueSeller.text = voltmx.i18n.getLocalizedString("Close");
    this.view.lblWelcomeAbroad.text = voltmx.i18n.getLocalizedString("Welcome Aboard!");
    this.view.lblSuccessfullyCreated.text = voltmx.i18n.getLocalizedString("Your buyer account has been successfully created");
    this.view.lblNeedHelp.text =voltmx.i18n.getLocalizedString("Need Help Contact");
    this.view.btnSaveAndContinueBuyer.text = voltmx.i18n.getLocalizedString("Save and Continue");
  },


  flxLoginOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
    ntf.navigate();  
  },


  flxLoginOnClickActionForEmailVerificationCode: function(){
    kony.timer.cancel("otpTimer");
    var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
    ntf.navigate(); 
  },


  flxLoginOnClickActionForMobileOtp: function(){
    kony.timer.cancel("otpTimerMobile");
    var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
    ntf.navigate(); 
  },


  BackNavigation: function (type){
    switch  (type){
      case "sellerOrBuyer"     : 
        {
          if(this.view.lblSellerOrBuyer.text === ""){
            var ntf =new voltmx.mvc.Navigation("frmRegister1");
            ntf.navigate();
          }
          else{
            this.view.lblSellerOrBuyer.text = "";
            this.view.flx2.setEnabled(true);
            this.view.flxFooter.setVisibility(false);
            this.view.flxInnerBarSellerOrBuyer.width="10%";
            this.view.imgRadioBuyerOn.setVisibility(false);
            this.view.imgRadioSellerOn.setVisibility(false);
            this.view.imgRadioSellerOff.setVisibility(true);
            this.view.imgRadioBuyerOff.setVisibility(true);
            this.view.imgWithoutTradeRadioON.setVisibility(false);
            this.view.imgWithoutTradeRadioOff.setVisibility(true);
            this.view.imgWithTradeRadioON.setVisibility(false);
            this.view.imgWithTradeRadioOff.setVisibility(true);
          }
        }
        break;
      case "emailBack"          : {

        var isEmailVerify = voltmx.store.getItem("isEmailVerified");
        var isEmailOtpVerified = voltmx.store.getItem("isEmailOtpVerified");
        if(isEmailVerify!== true||isEmailOtpVerified !==true){
          var trade = voltmx.store.getItem("trade");
          this.view.flxEmailContainer.setVisibility(false);
          if(trade === "WithTrade"){
            this.view.flxTaxRegistrationNumber.setVisibility(true);
          }
          else{
            this.view.flxSellerOrBuyerMain.setVisibility(true);
            this.view.imgWithoutTradeRadioON.setVisibility(false);
            this.view.imgWithTradeRadioON.setVisibility(false);
            this.view.imgWithoutTradeRadioOff.setVisibility(true);
            this.view.imgWithTradeRadioOff.setVisibility(true);
            voltmx.store.setItem("is_org", false);
          }
        }
        else{
          if(trade === "WithTrade"){
            this.view.flxTaxRegistrationNumber.setVisibility(true);
          }
          else{
            var self = this;
            voltmx.ui.Alert({
              "alertType": constants.ALERT_TYPE_CONFIRMATION,
              "alertTitle": "Alert!",
              "yesLabel": "Yes",
              "noLabel": "No, continue",
              "alertIcon": "alert.png",
              "message": "Are you sure you want to abort the registration process? Any progress will be lost.",
              "alertHandler": function(response){
              if (response === true) {
                 try {
    voltmx.timer.cancel("otpTimerMobile");
    voltmx.timer.cancel("otpTimer");
    voltmx.print("OTP timers cancelled successfully");
} catch (e) {
    voltmx.print("OTP timers already stopped or not found: " + e.message);
}
 
                  var ntf = new voltmx.mvc.Navigation("frmDashBoard");
                  ntf.navigate();
                } else {
                  self.view.flxSellerOrBuyerMain.setVisibility(false);
                  return;
                }
              }
            }, {
              "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
          }
        }
      }
        break;
      case "emailVerificationCode": {
        this.view.flxEmailVerificationCode.setVisibility(false);
        this.view.flxEmailContainer.setVisibility(true);
        this.view.tbxCode1.setFocus(true);
      }
        break;
      case "mobileBack"          : {
        this.view.tbxCode1.setEnabled(false);
        this.view.tbxCode2.setEnabled(false); 
        this.view.tbxCode3.setEnabled(false); 
        this.view.tbxCode4.setEnabled(false);
        this.view.flxMobileContainer.setVisibility(false);
        this.view.flxEmailContainer.setVisibility(true);
        this.view.lblMobileError.text ="";
      }
        break;
      case "mobileotpback"       : {
        this.view.flxMobileVerifyAndOTPCode.setVisibility(false);
        this.view.flxMobileContainer.setVisibility(true);
        this.view.tbxOTP1.setFocus(true);
      }
        break;
      case "usernameBack"        : {
        var isMobileVerified = voltmx.store.getItem("isMobileVerified");
        var isMobileOTPVerified = voltmx.store.getItem("isMobileOtpVerified");


        if(this.view.tbxUserName.text===""){
          if(isMobileVerified && isMobileOTPVerified){
            this.view.tbxOTP1.setEnabled(false);
            this.view.tbxOTP2.setEnabled(false);
            this.view.tbxOTP3.setEnabled(false);
            this.view.tbxOTP4.setEnabled(false);
            this.view.flxUserName.setVisibility(false);
            this.view.flxMobileContainer.setVisibility(true);
          }
          else{
            this.view.flxMobileVerifyAndOTPCode.setVisibility(true);
          }
        }
        else{
          this.view.tbxUserName.text="";
          this.view.lblUserNameError.text ="";
          this.view.flxInnerBarUserName.width = "61%";
        }
      }
        break;
      case  "passwordback"        : {
        if(this.view.tbxPassWordName.text === "" ){
          this.view.flxPassWord.setVisibility(false);
          this.view.flxUserName.setVisibility(true);
//           this.view.flxPassWordError.setVisibility(true);
        }
        else {
          this.view.tbxPassWordName.text = "";
          this.view.flxPasswordFooter.setVisibility(false);
          this.view.flxPassWordError.setVisibility(false);
        }

      }
        break;
      case "confirmPassBack"  :  {
        var confirmPass = this.view.tbxConfirmPassWord.text || ""; // fallback to empty string
        if (confirmPass.trim() === ""){ 
          this.view.flxConfirmPasswordContainer.setVisibility(false);
          this.view.flxPassWord.setVisibility(true);
        }
        else{
          this.view.tbxConfirmPassWord.text = "";
          this.view.imgCheckTerms.setVisibility(false);        
          this.view.btnSaveAndContinueForTermsNConditions.setVisibility(false);
        }
      }
        break;
      case "companyBack"        : {
        if(this.view.tbxCompanyAddress.text === ""){
          this.view.flxCompanyName.setVisibility(false);
          this.view.flxSellerOrBuyerMain.setVisibility(true);
        }
        else{
          this.view.tbxCompanyAddress.text = "";
          this.view.flxCompanyFooter.setVisibility(false);
        }
      }
        break;
      case "tradeLicense"      : {
        if (!this.view.tbxTradeLicenseNumber.text) {
          this.view.flxTradeLicense.setVisibility(false);
          this.view.flxCompanyName.setVisibility(true);
        } else {
          this.view.tbxTradeLicenseNumber.text = "";
          this.view.flxTradeLicenseFooter.setVisibility(false);
        }
      }
        break;
      case "tradeLicenseExpiryDate":    {
        var selectedDate = this.view.calendarTradeLicenseExpiryDate.date;
        if (!selectedDate) {
          this.view.flxTradeLicenseExpiryDate.setVisibility(false);
          this.view.flxTradeLicense.setVisibility(true);
        } else {
          this.view.calendarTradeLicenseExpiryDate.date = null;
          this.view.flxTradeLicenseExpiryDateFooter.setVisibility(false);
        }
      }
        break;
      case "taxRegistrationNumber":   {
        if (this.view.tbxTaxRegistrationNumber.text && this.view.tbxTaxRegistrationNumber.text.trim() !== "") {
          this.view.flxTaxRegistrationNumber.setVisibility(false);
          this.view.tbxTaxRegistrationNumber.text = "";
          this.view.flxTradeLicenseExpiryDate.setVisibility(true);
        } else {
          this.view.flxTaxRegistrationNumber.setVisibility(false);
          this.view.flxTradeLicenseExpiryDate.setVisibility(true);
          this.view.flxTaxRegistrationNumberFooter.setVisibility(false);
        }
      }
    }
  },


  PopupVisibilityAction: function(){
    this.view.flxPopupSellerOrBuyer.setVisibility(true);
    this.view.flxPopupFromFooter.bottom = "-3%";
    if(!this.view.imgRadioSellerOn.isVisible || !this.view.imgRadioBuyerOn.isVisible){
      this.view.btnSaveAndContinue.setEnabled(false); 
      this.view.flxFooter.setVisibility(false);
    }
    else{
      this.view.btnSaveAndContinue.setEnabled(true);
      this.view.flxFooter.setVisibility(true);
    }
    this.view.flxFooter.setVisibility(false);
  },


  ClosePopupOnClick: function(){
    this.view.flxPopupSellerOrBuyer.setVisibility(false);
    this.view.flxPopupFromFooter.bottom = "-45%";
  },


  btnSaveAndContinueSellerOrBuyeronClickAction: function(){
    var setUserName = voltmx.store.setItem("userName", this.view.lblUserFullName.text);
    var gettedUserName = voltmx.store.getItem("userName");
    this.view.flxPopupSellerOrBuyer.setVisibility(false);
    this.view.flxPopupFromFooter.bottom = "-45%";
    this.view.lblSellerRegister.text = this.view.lblSellerRegister.text +" "+"Registration"
    if(!this.view.imgRadioSellerOn.isVisible && !this.view.imgRadioBuyerOn.isVisible){
      this.view.btnSaveAndContinue.setEnabled(false);
      this.view.flxFooter.setVisibility(false);
      this.view.flxInnerBarSellerOrBuyer.width="10%";
      this.view.lblSellerOrBuyerTradeError.text = "*Select Any Type!!";
      return;
    }
    else{
      this.view.lblSellerOrBuyerTradeError.text = "";
      this.view.btnSaveAndContinue.setEnabled(true);
      this.view.flxFooter.setVisibility(true);
      this.view.flxInnerBarSellerOrBuyer.width="21%";
      this.view.flxFooter.setVisibility(true);

      if (!this.view.imgRadioSellerOn.isVisible) {
        this.view.lblSellerOrBuyer.text = this.view.lblBuyer.text.toLowerCase();
        this.view.lblSellerRegister.text =this.view.lblBuyer.text.toLowerCase();
      } else {
        this.view.lblSellerOrBuyer.text = this.view.lblSeller.text.toLowerCase();
        this.view.lblSellerRegister.text = this.view.lblSeller.text.toLowerCase();
      }
      if (this.view.lblSellerOrBuyer.text === "") {
        this.view.flxFooter.setVisibility(false);
      } else {
        this.view.flxFooter.setVisibility(true);
        var lblSellerOrBuyer = this.view.lblSellerOrBuyer.text;
        var setedUserType = voltmx.store.setItem("userType", lblSellerOrBuyer);
        var getedUserType = voltmx.store.getItem("userType");
      }
    }
  },


  nextOnclick: function(){
    this.view.flxPopupTrade.setVisibility(true);
    this.view.flxPopupRegister.bottom="-3%";
    this.view.flxPopupSellerOrBuyer.setVisibility(false);
    if(this.view.imgWithTradeRadioON.isVisible ||this.view.imgWithoutTradeRadioON.isVisible){
      this.view.btnTradeSaveAndContinue.setEnabled(true);
    }
    else{
      this.view.btnTradeSaveAndContinue.setEnabled(false);
    }
    if(this.view.lblSellerRegister.text ===this.view.lblSellerOrBuyer.text ){
      var res = voltmx.i18n.getLocalizedString("Registration");
      var originalText = this.view.lblSellerRegister.text.trim();
      var updatedText = originalText + res;
      updatedText = updatedText.charAt(0).toUpperCase() + updatedText.slice(1);
      this.view.lblSellerRegister.text = updatedText;
    }
  },


  flxRadioButtonSellerOnClick: function(){
    if(this.view.imgRadioSellerOn.isVisible){
      this.view.imgRadioSellerOn.setVisibility(true);
      this.view.imgRadioSellerOff.setVisibility(false);
      this.view.imgRadioBuyerOn.setVisibility(false);
      this.view.imgRadioBuyerOff.setVisibility(true);
      this.view.btnSaveAndContinue.setEnabled(true); 
      this.view.flxFooter.setVisibility(true);
    }
    else{
      this.view.imgRadioSellerOff.setVisibility(true);
      this.view.imgRadioSellerOn.setVisibility(true);
      this.view.imgRadioBuyerOn.setVisibility(false);
      this.view.imgRadioBuyerOff.setVisibility(true);
      this.view.btnSaveAndContinue.setEnabled(true); 
      this.view.flxFooter.setVisibility(true);
    }
  },


  flxRadioButtonBuyerOnClick: function(){
    if(this.view.imgRadioBuyerOn.isVisible){
      this.view.imgRadioBuyerOn.setVisibility(true);
      this.view.imgRadioBuyerOff.setVisibility(false);
      this.view.imgRadioSellerOn.setVisibility(false);
      this.view.imgRadioSellerOff.setVisibility(true);
      this.view.btnSaveAndContinue.setEnabled(true); 
      this.view.flxFooter.setVisibility(true);
    }
    else{
      this.view.imgRadioBuyerOff.setVisibility(false);
      this.view.imgRadioBuyerOn.setVisibility(true);
      this.view.imgRadioSellerOn.setVisibility(false);
      this.view.imgRadioSellerOff.setVisibility(true);
      this.view.btnSaveAndContinue.setEnabled(true); 
      this.view.flxFooter.setVisibility(true);
    }
  },


  radioBtnWithoutTradeOnclick: function(){
    if(this.view.imgWithoutTradeRadioON.isVisible){
      this.view.imgWithoutTradeRadioON.setVisibility(true);
      this.view.imgWithoutTradeRadioOff.setVisibility(false);
      this.view.imgWithTradeRadioON.setVisibility(false);
      this.view.imgWithTradeRadioOff.setVisibility(true);
      this.view.btnTradeSaveAndContinue.setEnabled(true); 
    }
    else{
      this.view.imgWithoutTradeRadioOff.setVisibility(true);
      this.view.imgWithoutTradeRadioON.setVisibility(true);
      this.view.imgWithTradeRadioON.setVisibility(false);
      this.view.imgWithTradeRadioOff.setVisibility(true);
      this.view.btnTradeSaveAndContinue.setEnabled(true); 
    }
  },


  flxWithTradeRadioBtnOnClick: function(){
    if(this.view.imgWithTradeRadioON.isVisible){
      this.view.imgWithTradeRadioOff.setVisibility(false);
      this.view.imgWithoutTradeRadioON.setVisibility(false);
      this.view.imgWithTradeRadioON.setVisibility(true);
      this.view.imgWithoutTradeRadioOff.setVisibility(true);
      this.view.btnTradeSaveAndContinue.setEnabled(true); 
    }
    else{
      this.view.imgWithTradeRadioOff.setVisibility(false);
      this.view.imgWithoutTradeRadioON.setVisibility(false);
      this.view.imgWithTradeRadioON.setVisibility(true);
      this.view.imgWithoutTradeRadioOff.setVisibility(true);
      this.view.btnTradeSaveAndContinue.setEnabled(true); 
    }
  },


  btnTradeSaveAandContinueOnclickAction: function(){
    if (!this.view.imgWithoutTradeRadioON.isVisible && !this.view.imgWithTradeRadioON.isVisible) {
      this.view.flxPopupTrade.setVisibility(false);
      this.view.lblSellerOrBuyerTradeError.text = "*Please Select a Trade Type!!";
      this.view.flxEmailContainer.setVisibility(false);
      return;
    }
    else{
      this.view.lblSellerOrBuyerTradeError.text = "";
    }
    if (this.view.imgWithTradeRadioON.isVisible) {
      voltmx.store.setItem("trade", "WithTrade");
      voltmx.store.setItem("is_org", true);
    } else if (this.view.imgWithoutTradeRadioON.isVisible) {
      voltmx.store.setItem("is_org", false);
      voltmx.store.setItem("trade", "WithOutTrade");
    }
    var trade = voltmx.store.getItem("trade");
    if(trade === "WithTrade"){
      //With Trade!!!
      this.view.flxSellerOrBuyerMain.setVisibility(false);
      this.view.flxCompanyName.setVisibility(true);
      this.view.flxPopupTrade.setVisibility(false);
      voltmx.store.setItem("isEmailVerified", false);
    }
    else{
      //Without Trade!!!!
      voltmx.store.setItem("isEmailVerified", false);
      this.view.flxPopupTrade.setVisibility(false);
      this.view.flxSellerOrBuyerMain.setVisibility(false);
      this.view.flxEmailContainer.setVisibility(true);
    }
  },


  //Registration Individual for seller/buyer Pop Up visible onClick action!!!!!
  flxSellerRegIndividualCloseonClickAction: function(){
    this.view.flxFooterPopupSellerRegistrationForIndividual.bottom="-45%";
  },


  //Registration Individual for seller/buyer Pop Upunvisible onClick action!!!!
  flxSellerRegisterPopupCloseOnClickAction: function(){
    this.view.flxPopupTrade.setVisibility(false);
    this.view.flxPopupRegister.bottom= "-45%";
    this.view.flxPopupFromFooter.bottom= "-3%";
    this.view.flxPopupSellerOrBuyer.setVisibility(true);
    this.view.flxFooter.setVisibility(true);
    this.view.flxPopupFromFooter.bottom="-45%";
    this.view.flxPopupSellerOrBuyer.setVisibility(false);
    this.view.flx2.setEnabled(false);
  },


  flxCompanyFooterOnClickAction: function(){
    this.view.flxTradeLicense.setVisibility(true);
    this.view.flxCompanyName.setVisibility(false);
  },


  flxTradeLicenseFooterOnClickAction: function(){
    this.view.flxTradeLicense.setVisibility(false);
    this.view.flxTradeLicenseExpiryDate.setVisibility(true);
    this.view.calendarTradeLicenseExpiryDate.dateComponents = null;
  },


  tbxCompanyAddressOnTextChangeAction: function(){
    var companyNameRaw = this.view.tbxCompanyAddress.text;         
    var companyNameTrimmed = companyNameRaw.trim();            
    if (companyNameRaw !== companyNameTrimmed) {
      this.view.flxCompanyFooter.setVisibility(false);
      this.view.flxCompanyError.setVisibility(true);
      return;
    }
    var pattern = /^[A-Za-z.]+(?: [A-Za-z.]+)*$/;
    var isValidLength = companyNameTrimmed.length >= 4 && companyNameTrimmed.length <= 100;
    if (!pattern.test(companyNameTrimmed) || !isValidLength) {
      this.view.flxCompanyFooter.setVisibility(false);
      this.view.flxCompanyError.setVisibility(true);
    } else {
      this.view.flxCompanyFooter.setVisibility(true);
      this.view.flxCompanyError.setVisibility(false);
    }
  },


  tbxTradeLicenseNumberOnTextChangeAction: function () {
    var rawInput = this.view.tbxTradeLicenseNumber.text;
    if (/[a-z]/.test(rawInput)) {
      var upperText = rawInput.toUpperCase();
      this.view.tbxTradeLicenseNumber.text = upperText;
      rawInput = upperText;
    }
    var trimmedInput = rawInput.trim();
    var pattern = /^[A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]+$/;
    var isValidLength = trimmedInput.length >= 10 && trimmedInput.length <= 15;
    if (
      rawInput !== trimmedInput ||        // leading/trailing spaces
      trimmedInput.length === 0 ||        // empty
      !pattern.test(trimmedInput) ||      // contains invalid chars
      !isValidLength                      // invalid length
    ) {
      this.view.flxTradeLicenseFooter.setVisibility(false);
      this.view.flxTradeLicenseError.setVisibility(true);
      this.view.lblTradeLicenseError.text = "*Enter valid Trade License Number (10–15 characters, special characters allowed)";
    } else {
      this.view.flxTradeLicenseFooter.setVisibility(true);
      this.view.flxTradeLicenseError.setVisibility(false);
    }
  },


  calendarTradeLicenseExpiryDateOnSelectionAction: function() {
    try {
      this.view.flxDateError.setVisibility(false);
      this.view.flxTradeLicenseExpiryDateFooter.setVisibility(true);
      var dateComponents = this.view.calendarTradeLicenseExpiryDate.dateComponents;
      if (!Array.isArray(dateComponents)) {
        voltmx.print("dateComponents is not an array:", dateComponents);
        return;
      }
      if (dateComponents.length < 3) {
        voltmx.print("dateComponents length less than 3, ignoring");
        return;
      }
      // order: day, month, year, ...
      var day = dateComponents[0];
      var month = dateComponents[1] - 1;
      var year = dateComponents[2];
      var hour = dateComponents.length > 3 ? dateComponents[3] : 0;
      var minute = dateComponents.length > 4 ? dateComponents[4] : 0;
      var second = dateComponents.length > 5 ? dateComponents[5] : 0;

      var selectedDate = new Date(year, month, day, hour, minute, second);
      var today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        this.view.flxDateError.setVisibility(true);
        this.view.calendarTradeLicenseExpiryDate.dateComponents = null;
        this.view.lblCalendarPlaceholder.text = "Trade License Expiry Date";
        this.view.flxTradeLicenseExpiryDateFooter.setEnabled(false);
        return;
      }

      var dayStr = ('0' + day).slice(-2);
      var monthStr = ('0' + (month + 1)).slice(-2);
      var formattedDate = `${dayStr}/${monthStr}/${year}`;
      voltmx.store.setItem("selectedDate",selectedDate.toISOString() );
      this.view.lblCalendarPlaceholder.text = formattedDate;
      voltmx.print("Selected Expiry Date: " + formattedDate);
      this.view.flxTradeLicenseExpiryDateFooter.setEnabled(true);
    } catch (err) {
      voltmx.print("Error in calendarTradeLicenseExpiryDateOnSelectionAction:", err);
    }
  },


  tbxTaxRegistrationNumberOnTextChangeAction: function() {
    var rawInput = this.view.tbxTaxRegistrationNumber.text;
    if (rawInput !== rawInput.trim()) {
      this.view.flxTaxRegistrationNumberFooter.setVisibility(false);
      this.view.flxTaxRegistrationNumberError.setVisibility(true);
      return;
    }
    var taxRegNumber = rawInput.trim();
    var pattern = /^\d+$/; 
    var isValidLength = taxRegNumber.length === 15;
    if (!pattern.test(taxRegNumber) || !isValidLength) {
      this.view.flxTaxRegistrationNumberFooter.setVisibility(false);
      this.view.flxTaxRegistrationNumberError.setVisibility(true);
      this.view.lblTaxRegistrationNumberError.text = "*Enter valid Tax Registration Number (15 numeric characters only)"
    } else {
      this.view.flxTaxRegistrationNumberFooter.setVisibility(true);
      this.view.flxTaxRegistrationNumberError.setVisibility(false);
    }
  },

  flxTradeLicenseExpiryDateFooterOnClickAction: function(){
    var selectedDate =  voltmx.store.getItem("selectedDate");
    if(this.view.lblCalendarPlaceholder.text !== "Trade License Expiry Date"){
      this.view.flxTradeLicenseExpiryDate.setVisibility(false);
      this.view.flxTaxRegistrationNumber.setVisibility(true);
    }
  },


  flxTaxRegistrationNumberFooterOnClickAction: function(){
    this.view.flxEmailContainer.setVisibility(true);
    this.view.flxTaxRegistrationNumber.setVisibility(false);
  },


  tbxEmailAddressOnTextChangeAction: function() {
    var rawInput = this.view.tbxEmailAddress.text;
    var emailText = rawInput.trim();
    //     var emailRegex = /^(?![._\-+])([a-zA-Z0-9]+(?:[._\-+][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    var emailRegex = /^(?![._\-+])([a-zA-Z0-9]+(?:[._\-+][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.(com|co|in|org|net|sg|edu|gov|info)$/;
    if (
      rawInput !== emailText ||       // leading/trailing spaces
      emailText.length === 0 ||       // empty field
      !emailRegex.test(emailText)     // invalid email format
    ) {
      this.view.flxEmailFooter.setVisibility(false);
      this.view.lblEmailError.text = "*Enter valid email address";
    } else {
      this.view.flxEmailFooter.setVisibility(true);
      this.view.lblEmailError.text = "";
    }
    const atIndex = emailText.indexOf("@");
    const hasConsecutiveDots = emailText.includes("..");
    const startsOrEndsWithDot = emailText.startsWith(".") || emailText.endsWith(".");
    const dotNearAt = (atIndex > 0 && emailText[atIndex - 1] === ".") || (emailText[atIndex + 1] === ".");
    var isValidLength = emailText.length >= 4 && emailText.length <= 50;

    if (
      !emailRegex.test(emailText) ||
      hasConsecutiveDots ||
      startsOrEndsWithDot ||
      dotNearAt||
      !isValidLength  
    ) {
      this.view.lblEmailError.text = "*Enter Valid Email";
      this.view.flxEmailFooter.setVisibility(false);
      this.view.flxInnerBarEmail.width= "30%";
    } else {
      this.view.lblEmailError.text = "";
      this.view.flxEmailFooter.setVisibility(true);
      this.view.flxInnerBarEmail.width= "40%";
    }
  },

  flxWrapper: function(){
    this.imgNextInEmailonTouchEndAction();
  },

  //Email validation Service call and calling sendEmail Otp Function !!!!!!!!
  imgNextInEmailonTouchEndAction: async function() {
    var self = this;
    var isEmailVerified = voltmx.store.getItem("isEmailVerified");
    var isEmailOTPVerified = voltmx.store.getItem("isEmailOtpVerified");
    if(isEmailVerified === false ){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      //       var pattern =  /^(?![._\-+])([a-zA-Z0-9]+(?:[._\-+][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
      if (self.view.tbxEmailAddress.text !== null ) {
        var verification_type = "email";	
        var baseURL = voltmx.store.getItem("BASE_URL");
        if(baseURL){
          if (!baseURL.endsWith("/")) {
            baseURL += "/";
          }
        }
        var url =baseURL+"services/ms_user_reg/check-user-attribute";
        try {
          var request = new voltmx.net.HttpRequest();
          request.open("POST", url);
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json");
          request.onReadyStateChange =  function() {
            if (request.readyState === 4) {
              if (request.status === 200) {
                var requestStringEmail = request.responseText;
                var requestJSONEmail = JSON.parse(requestStringEmail);
                voltmx.print("requestJSON from validate email: " + requestJSONEmail);
                var opstatusRes = requestJSONEmail.opstatus;
                if (opstatusRes === 0 ){
                  if (requestJSONEmail.data && Object.keys(requestJSONEmail.data).length > 0) {
                    if(requestJSONEmail.data.userExists=== false && requestJSONEmail.data.message === "Email Id is valid") {
                      voltmx.print("Email Response: "+JSON.stringify(requestJSONEmail));
                      voltmx.store.setItem("email", self.view.tbxEmailAddress.text.trim());
                      self.flxWrapper2(self.view.tbxEmailAddress.text.trim(), verification_type);
                    }
                    else{
                      voltmx.application.dismissLoadingScreen();
                      self.view.flxEmailError.setVisibility(true);
                      self.view.flxEmailFooter.setVisibility(false);
                      self.view.lblEmailError.text = "*User with this email already exists!!";
                    }
                  }
                  else{
                    voltmx.application.dismissLoadingScreen();
                    self.view.flxEmailError.setVisibility(true);
                    self.view.flxEmailFooter.setVisibility(false);
                    self.view.lblEmailError.text = requestJSONEmail.error.message
                    self.view.lblEmailError.text = "* Backend or Service Error!"
                  }
                }
                else {
                  voltmx.application.dismissLoadingScreen();
                  self.view.flxEmailError.setVisibility(true);
                  self.view.flxEmailFooter.setVisibility(false);
                  self.view.lblEmailError.text ="* Response Error";
                }
              }
              else {
                self.view.flxEmailError.setVisibility(true);
                voltmx.application.dismissLoadingScreen();
                self.view.flxError.setVisibility(true);
              }
            }
          };
          var requestData = JSON.stringify({
            "verification_type": verification_type,
            "value": self.view.tbxEmailAddress.text.trim()
          });
          request.send(requestData); 

        } catch (error) {
          alert("Error: " + error.message);
          voltmx.print("Error: " + error.message);
        }
      } else {
        voltmx.application.dismissLoadingScreen();
        self.view.lblEmailError.text = "Email Required!!";
        self.view.flxEmail.setVisibility(true);
        self.view.flxEmailVerificationCode.setVisibility(false);
      }
    }
    else{
      if(isEmailOTPVerified){
        voltmx.application.dismissLoadingScreen();
        self.view.flxEmailContainer.setVisibility(false);
        self.view.flxMobileContainer.setVisibility(true);
      }
      else{
        voltmx.application.dismissLoadingScreen();
        self.view.flxEmailVerificationCode.setVisibility(true);
        self.view.flxEmailContainer.setVisibility(false);
        self.view.flxMobileContainer.setVisibility(false);
      }
    }
  },


  flxWrapper2: function(){
    this.sendEmailOTPRequest();
  },


  // Function to handle sending OTP for the email, calling send email otp service!!!
  sendEmailOTPRequest: async function(email) {
    var self = this;
    var verification_type = "Email";
    var baseURL = voltmx.store.getItem("BASE_URL");
    if(baseURL){
      if (!baseURL.endsWith("/")) {
        baseURL += "/";
      }
    }
    try {
      return new Promise((resolve, reject) => {
        var url = baseURL+"services/ms_user_reg/send-email-otp";
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);
        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onReadyStateChange = function() {
          if (request.readyState === 4) {
            if (request.status === 200) {
              voltmx.application.dismissLoadingScreen();
              var requestStringSentEmail = request.responseText;
              var requestJSONSentEmail = JSON.parse(requestStringSentEmail);
              voltmx.print("requestJSON from send email OTP: " + requestJSONSentEmail);
              var opstatusRes2 = requestJSONSentEmail.opstatus;
              if (opstatusRes2 === 0 ){
                var reg_id = requestJSONSentEmail.data.reg_id;
                voltmx.store.setItem("regId", reg_id);
                voltmx.store.setItem("isEmailOtpVerified", false);
                self.view.tbxCode1.setFocus(true);
                self.view.flxResendCode.setVisibility(true);
                self.view.flxInnerBarEmailVerificationCode.width = "42%";
                self.view.flxEmailContainer.setVisibility(false);
                self.view.flxEmailVerificationCode.setVisibility(true);
                self.startOTPTimerforEmail();
                self.view.flxEmailFooter.setVisibility(true);
                resolve(); 
              } 
              else {
                voltmx.application.dismissLoadingScreen();
                if(requestJSONSentEmail.error.message === "Email already verified."){
                  self.view.lblEmailError.text = "*Email already verified."
                }
                self.clearOtpFields("Code");
                reject(new Error("OTP not sent. Opstatus: " + opstatusRes2)); 
                if( opstatusRes2 === 8009 && requestJSONSentEmail.error.message !== "Email already verified."){
                  self.view.lblEmailError.text = "*Backend request failed!!" ;
                  return;
                }
              } 	
            } else {
              voltmx.application.dismissLoadingScreen();
              self.view.flxError.setVisibility(true);
              self.clearOtpFields("Code");
              reject(new Error("Failed to send email OTP: " + request.status + " - " + request.responseText)); // Reject on failure
            }
          }
        }
        var requestData = JSON.stringify({
          "email": self.view.tbxEmailAddress.text.trim(),
          "verification_type": verification_type,
        });
        request.send(requestData);
      });
    }   
    catch (error) {
      alert("Error sending email OTP: " + error.message);
      voltmx.print("Error sending email OTP: " + error.message);
    }
  },


  startOTPTimerforEmail:function() {
    this.countdownTime = 30;
    kony.timer.schedule("otpTimer", this.updateTimerForEmail.bind(this), 1, true);
  },


  updateTimerForEmail: function() {


    if (!this.view) {
      voltmx.print("Form destroyed — cancelling OTP timer");
      try { kony.timer.cancel("otpTimer"); } catch(e) {}
      return;
    }

    var minutes = Math.floor(this.countdownTime / 60);
    var seconds = this.countdownTime % 60;
    var minStr = (minutes < 10 ? "0" + minutes : "" + minutes);
    var secStr = (seconds < 10 ? "0" + seconds : "" + seconds);
    if (this.view && this.view.lblEmailTimer) {
      this.view.lblEmailTimer.text = (minStr || "00") + ":" + (secStr || "00"); 
    } else {
      voltmx.print("Error: lblEmailTimer or view is not available on this form.");
    }
    this.countdownTime--;
    if (this.countdownTime < 0) {
      kony.timer.cancel("otpTimer");
      if (this.view && this.view.lblEmailResendCodein) {
        this.view.lblEmailResendCodein.text = "Resend Code?";
      } else {
        voltmx.print("Error: lblEmailResendCodein or view is not available on this form.");
      }
      if (this.view && this.view.lblEmailResendCodein) {
        this.view.lblEmailResendCodein.skin = "sknlblCPLtCaptd32437Font80px";
      } else {
        voltmx.print("Error: lblEmailResendCodein or view is not available on this form.");
      }
      this.view.lblEmailTimer.setVisibility(false);
    }
  },


  encodeToBase64: function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
        keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
  },


  //function to set Email OTP Automatically from the service in the texboxes without entering!!
  emailtbxCode1OnTextChange: function(){

    //     Dont remove this commented code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     ====================================================================
    //     var emailOTP = voltmx.store.getItem("emailOTP");
    //     var code1 = emailOTP.slice(0, 1);
    //     var code2 = emailOTP.slice(1, 2);
    //     var code3 = emailOTP.slice(2, 3);
    //     var code4 = emailOTP.slice(3, 4);
    //     //var code5 = emailOTP.slice(4, 5);
    //     //var code6 = emailOTP.slice(5, 6);
    //     //alert("email Otp: code1 ="+code1 +"code2 ="+code2+"code3 ="+code3+"code4 ="+code4);
    //     // Assign values to textboxes
    //     this.view.tbxCode1.text = code1;
    //     this.view.tbxCode2.text = code2;
    //     this.view.tbxCode3.text = code3;
    //     this.view.tbxCode4.text = code4;
    //     //this.view.tbxCode5.text = code5;
    //     //this.view.tbxCode6.text = code6;
    //    ========================================================================== 
    //      var code1 =  this.view.tbxCode1.text ;
    //      var code2 =this.view.tbxCode2.text;
    //      var code3 = this.view.tbxCode3.text;
    //      var code4 = this.view.tbxCode4.text ;
    //      var emailOtpCode = code1+code2+code3+code4;
    //      voltmx.print("emailOtpcode : "+emailOtpCode);
    //      voltmx.store.setItem("emailOTP", emailOtpCode);

    //     if(this.view.tbxCode1.text !==null&&this.view.tbxCode2.text !==null&&this.view.tbxCode3.text !==null&&this.view.tbxCode4.text !==null)
    //     {
    //       var email = voltmx.store.getItem("email");
    //       this.view.flxEmailVerificationFooter.setVisibility(true);
    //       this.view.tbxCode1.setEnabled(false);
    //       this.view.tbxCode2.setEnabled(false);
    //       this.view.tbxCode3.setEnabled(false);
    //       this.view.tbxCode4.setEnabled(false);
    //     }
    //     else{
    //       this.view.flxMobileContainer.setVisibility(false);
    //       this.view.flxEmailVerificationCode.setVisibility(true);
    //     }
  },


  flxWrapper3: function(){
    this.flxResendCodeOnClickAction();
  },


  //Function to call Resend OTP When the otp is expired!!
  flxResendCodeOnClickAction: async function(){
    if(this.view.lblEmailResendCodein.text === "Resend Code?"){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var self = this;
      var email = voltmx.store.getItem("email");
      var verification_type ="Email";
      var regId = voltmx.store.getItem("regId");
      var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
        if (!baseURL.endsWith("/")) {
          baseURL += "/";
        }
      }
      var url =baseURL+"services/ms_user_reg/resend-otp";
      try {
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);

        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");

        await new Promise((resolve, reject) => {
          request.onReadyStateChange = function() {
            if (request.readyState === 4) {
              if (request.status === 200) {

                voltmx.application.dismissLoadingScreen();
                var requestString = request.responseText;
                var requestJSONresendEmailOTP = JSON.parse(requestString);
                voltmx.print("requestJSON resend email otp: " + JSON.stringify(requestJSONresendEmailOTP)); 
                var opstatusRes2 = requestJSONresendEmailOTP.opstatus;
                if (requestJSONresendEmailOTP.message === "OTP sent successfully.") {
                  kony.timer.cancel("otpTimer");
                  self.startOTPTimerforEmail();
                  self.view.lblEmailOtpError.text = "";
                  self.view.flxOTPSentSuccessFully.setVisibility(true);
                  self.view.flxResendCode.setVisibility(true);
                  self.view.lblOtpSentSuccessFully.text = requestJSONresendEmailOTP.message;
                  self.view.lblEmailResendCodein.text ="Resend Code in"
                  self.view.lblEmailTimer.setVisibility(true);
                  self.clearOtpFields("Code");
                  self.view.tbxCode1.setFocus(true);
                  resolve(); 
                } 
                else {                voltmx.application.dismissLoadingScreen();
                      kony.timer.cancel("otpTimer");
                      reject(new Error("resend OTP not sent. Opstatus: " + opstatusRes2)); 
                     }
              } else {
                voltmx.application.dismissLoadingScreen();
                self.view.flxError.setVisibility(true);
              }
            }
          }
          var requestData = JSON.stringify({
            "email": self.view.tbxEmailAddress.text.trim(),
            "verification_type": verification_type,
            "reg_id" :regId ,
          });
          request.send(requestData); 
        });
      }   
      catch (error) {
        alert("Error Resending email OTP: " + error.message);
        voltmx.print("Error Resending email OTP: " + error.message);
      }
    }
  },


  flxWrapper4: function(){
    this.flxNextInEmailVerificationOnTouchEndAction();
  },


  //Function to call verify email otp Service in email verification code page!!!
  flxNextInEmailVerificationOnTouchEndAction: async function(){
    var self = this;
    var isEmailOtpVerified = voltmx.store.getItem("isEmailOtpVerified");
    if(isEmailOtpVerified === false){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var verification_type ="Email";
      var code1 = voltmx.store.getItem("emailCode1");
      var code2 = voltmx.store.getItem("emailCode2");
      var code3 = voltmx.store.getItem("emailCode3");
      var code4 = voltmx.store.getItem("emailCode4");
      var emailOTP = code1+code2+code3+code4;
      var regId = voltmx.store.getItem("regId");
      var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
        if (!baseURL.endsWith("/")) {
          baseURL += "/";
        }
      }
      var url = baseURL+"services/ms_user_reg/verify-otp";

      try {
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);

        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;

        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        await new Promise((resolve, reject) => {
          request.onReadyStateChange = function() {
            if (request.readyState === 4) {
              if (request.status === 200) {
                voltmx.application.dismissLoadingScreen();
                var requestString = request.responseText;
                var requestJSON = JSON.parse(requestString);
                voltmx.print("requestJSON verify email: " + JSON.stringify(requestJSON)); 
                if (requestJSON.data.is_verified === true && requestJSON.message === "Email Verified successfully." ) {
                  var is_verified = requestJSON.data.is_verified;
                  self.view.flxEmailVerificationCode.setVisibility(false);
                  self.view.flxMobileContainer.setVisibility(true);
                  self.view.flxEmailOtpVerified.setVisibility(true);
                  voltmx.store.setItem("isEmailOtpVerified", true);
                  voltmx.store.setItem("isEmailVerified", true);
                  self.view.tbxEmailAddress.setEnabled(false);
                  voltmx.store.setItem("isMobileVerified", false);
                  self.view.lblSignedEmail.text =self.view.tbxEmailAddress.text.trim() ;
                } else {
                  voltmx.application.dismissLoadingScreen();
                  self.view.flxEmailOtpError.setVisibility(true);
                  self.view.lblEmailOtpError.text ="Backend Response Failed!!";
                  self.view.flxResendCode.setVisibility(false);
                  voltmx.print(" OTP verification failed! Response error.");
                }
                resolve();
              } else {
                voltmx.application.dismissLoadingScreen();
                //                 self.view.flxError.setVisibility(true);
                self.view.flxEmailOtpError.setVisibility(true);
                self.view.lblEmailOtpError.text ="Invalid OTP!!";
                self.clearOtpFields("Code");
                self.view.tbxCode1.setFocus(true);
                self.view.lblOtpSentSuccessFully.text = "";
                self.view.flxOTPSentSuccessFully.setVisibility(false);
              }
            }
          };
          var jsonData = JSON.stringify({
            "email": self.view.tbxEmailAddress.text.trim(),
            "verification_type": verification_type,
            "otp": emailOTP,
            "reg_id": regId
          });
          request.send(jsonData); 
        });
      } catch (error) {
        alert("Error: " + error.message);
        voltmx.print(" Error: " + error.message);
      }
    }
    else{
      voltmx.application.dismissLoadingScreen();
      self.view.flxEmailVerificationCode.setVisibility(false);
      self.view.flxMobileContainer.setVisibility(true);
    }
  },


  flxWrappermobilefooter: function(){
    this.flxMobileFooterOnClickAction();
  },


  //function to call "mobile validation Service" as well as calling "sendMobileOtp" function!!!
  flxMobileFooterOnClickAction : async function(){
    var self = this;
    var isMobileVerified = voltmx.store.getItem("isMobileVerified");
    var isMobileOtpVerified = voltmx.store.getItem("isMobileOtpVerified");
    if(isMobileVerified === false){
      voltmx.application.showLoadingScreen(null, "Loading..", 
                                           constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      if(self.view.tbxPhoneNumber.text !== null ){
        var verification_type = "phone";
        var reg_id = voltmx.store.getItem("regId");
        var rawPhone =   self.view.lblCountryCode.text +self.view.tbxPhoneNumber.text;
        var encodedPhone = rawPhone.replace(/\+/g, "%2B");
        var baseURL = voltmx.store.getItem("BASE_URL");
        if(baseURL){
          if (!baseURL.endsWith("/")) {
            baseURL += "/";
          }
        }
        var url = baseURL+"services/ms_user_reg/check-user-attribute";
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);
        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onReadyStateChange =  function () {
          if (request.readyState === 4) {
            if (request.status === 200 ) {
              var requestString = request.responseText;
              var requestJSON = JSON.parse(requestString);
              voltmx.print("response in Mobile Verification :"+requestJSON);
              var opstatusRes = requestJSON.opstatus;
              if(opstatusRes === 0 ){
                if (requestJSON.data && Object.keys(requestJSON.data).length > 0) {
                  if(requestJSON.data.message === "Phone Number is valid" && requestJSON.data.userExists === false){
                    self.flxWrapper6();
                  }
                  else{
                    voltmx.application.dismissLoadingScreen();
                    self.view.lblMobileError.text = "* Phone Number Already Exists!!";
                    self.view.flxEmailOtpError.setVisibility(true);
                    self.view.flxMobileFooter.setVisibility(false);
                  }
                }
                else{
                  voltmx.application.dismissLoadingScreen();
                  self.view.flxEmailOtpError.setVisibility(true);
                  self.view.lblMobileError.text = "* Backend or Service Error!"
                }
              }
              else{
                voltmx.application.dismissLoadingScreen();
                self.view.flxEmailOtpError.setVisibility(true);
                self.view.lblMobileError.text ="* Response Error";
              }
            } else {
              voltmx.application.dismissLoadingScreen();
              self.view.flxError.setVisibility(true);
              self.view.flxEmailOtpError.setVisibility(true);
            }
          }
        };
        var jsonData = JSON.stringify({
          "value" :encodedPhone,
          "verification_type"   :verification_type ,
        });
        request.send(jsonData);
      }
      else{
        voltmx.application.dismissLoadingScreen();
        self.view.lblMobileError.text ="*Mobile Required!!";
        self.view.flxMobileVerifyAndOTPCode.setVisibility(false);
        self.view.flxMobileContainer.setVisibility(true);
      }
    }
    else{
      if(isMobileOtpVerified){
        voltmx.application.dismissLoadingScreen();
        self.view.flxUserName.setVisibility(true);
        self.view.flxMobileContainer.setVisibility(false);
      }
      else{
        voltmx.application.dismissLoadingScreen();
        self.view.flxMobileVerifyAndOTPCode.setVisibility(true);
        self.view.flxMobileContainer.setVisibility(false);
        self.view.flxUserName.setVisibility(false);
      }
    }
  },


  flxWrapper6: function(){
    this.sendMobileOTP();
  },


  //function to call "send mobile otp service" and navigate to verify mobile otp page!!!
  sendMobileOTP: async function(){
    var self = this;
    var country_code = voltmx.store.getItem("country_code");
    var verification_type = "Mobile";
    var reg_id = voltmx.store.getItem("regId");
    try {
      return new Promise((resolve, reject) => {
        var baseURL = voltmx.store.getItem("BASE_URL");
        if(baseURL){
          if (!baseURL.endsWith("/")) {
            baseURL += "/";
          }
        }
        var url = baseURL+"services/ms_user_reg/send-mobile-otp";
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);
        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onReadyStateChange =  function() {
          if (request.readyState === 4) {
            if (request.status === 200) {
              voltmx.application.dismissLoadingScreen();
              var requestStringSentMobile = request.responseText;
              var requestJSONSentMobile = JSON.parse(requestStringSentMobile);
              if (requestJSONSentMobile.data.reg_id!==null ) {
                try {
                  voltmx.timer.cancel("otpTimerMobile");
                  voltmx.print("Timer otpTimerMobile cancelled successfully");
                } catch (e) {
                  voltmx.print("Timer cancel failed: " + e.message);
                }
                self.view.flxMobileContainer.setVisibility(false);
                self.view.flxMobileVerifyAndOTPCode.setVisibility(true);
                voltmx.store.setItem("mobile", self.view.tbxPhoneNumber.text);
                var reg_id= requestJSONSentMobile.data.reg_id;
                voltmx.store.setItem("regId", reg_id);
                voltmx.store.setItem("isMobileOtpVerified",false);
                self.startOTPTimerForMobile();
                self.view.flxInnerBarMobileOtp.width = "60%";
                self.view.tbxOTP1.setFocus(true);
                resolve(); 
              } 
              else {
                voltmx.application.dismissLoadingScreen();
                self.view.flxInnerBarMobileOtp.width = "54%";
                self.clearOtpFields("OTP");
                reject(new Error("Failed to send email OTP: " + request.status + " - " + request.responseText)); // Reject on failure
              }
            } else {
              voltmx.application.dismissLoadingScreen();
              self.view.flxError.setVisibility(true);
              self.clearOtpFields("OTP");
              reject(new Error("Failed to send email OTP: " + request.status + " - " + request.responseText)); // Reject on failure
            }
          }
        }
        var requestData = JSON.stringify({
          "mobile_number": self.view.tbxPhoneNumber.text,
          "verification_type": verification_type,
          "reg_id":Number(reg_id),
          "country_code":"+971"
        });
        request.send(requestData); 
      });
    }   
    catch (error) {
      alert("Error sending email OTP: " + error.message);
      voltmx.print("Error sending email OTP: " + error.message);
    }
  },


  startOTPTimerForMobile: function() {
    this.countdownTimeMobile = 30;
    kony.timer.schedule("otpTimerMobile", this.updateTimerForMobile.bind(this), 1, true);
  },


  updateTimerForMobile: function() {
    var minutes = Math.floor(this.countdownTimeMobile / 60);
    var seconds = this.countdownTimeMobile % 60;
    var minStr = (minutes < 10 ? "0" + minutes : "" + minutes);
    var secStr = (seconds < 10 ? "0" + seconds : "" + seconds);
    this.view.lblMobileTimer.text = minStr + ":" + secStr;
    this.countdownTimeMobile--;
    if (this.countdownTimeMobile < 0) {
      kony.timer.cancel("otpTimerMobile");
      this.view.lblResendMblOTPCode.text = "Resend Code?";
      this.view.lblResendMblOTPCode.skin = "sknlblCPLtCaptd32437Font80px";
      this.view.lblMobileTimer.setVisibility(false);
    }
  },


  tbxPhoneNumberonTextChangeAction: function() {
    var pattern = /^\d{9,10}$/; 
    var phoneNumber = this.view.tbxPhoneNumber.text.trim();
    // Check for empty input
    if (!phoneNumber || phoneNumber === "") {
      this.view.lblMobileError.text = "Mobile Number Required!!";
      this.view.flxMobileFooter.setVisibility(false);
    } 
    // Check if it’s all zeroes
    else if (/^0{9,}$/.test(phoneNumber)) {
      this.view.lblMobileError.text = "*Mobile number cannot be all zeroes";
      this.view.flxMobileFooter.setVisibility(false);
    } 
    // Check if it’s not a valid 10-digit number
    else if (!pattern.test(phoneNumber)) {
      this.view.lblMobileError.text = "*Enter a valid mobile number (9–10 digits)";
      this.view.flxMobileFooter.setVisibility(false);
    } 
    // Passed all checks
    else {
      this.view.lblMobileError.text = "";
      this.view.flxMobileFooter.setVisibility(true);
    }
  },


  flxCountryCodeOnClickAction: function(){
    this.view.flxCountryCodePopup.setVisibility(true);
  },


  flxCountrycodeClosePopupOnClickAction: function(){
    this.view.flxCountryCodePopup.setVisibility(false);
  },


  getCountryCodes: function(){
    var self = this;
    if (get_country_code_list_inputparam == undefined) {
      var get_country_code_list_inputparam = {};
    }
    get_country_code_list_inputparam["serviceID"] = "fry_int_admin$get-country-code-list";
    get_country_code_list_inputparam["country_name"] = "";
    var get_country_code_list_httpheaders = {};
    get_country_code_list_inputparam["httpheaders"] = get_country_code_list_httpheaders;
    var get_country_code_list_httpconfigs = {};
    get_country_code_list_inputparam["httpconfig"] = get_country_code_list_httpconfigs;
    fry_int_admin$get_country_code_list = 
      mfintegrationsecureinvokerasync(get_country_code_list_inputparam,
                                      "fry_int_admin",
                                      "get-country-code-list", 
                                      function(status,response){
      voltmx.print("status:"+status);
      voltmx.print("response :"+response);

      if (!response || !response.records || !Array.isArray(response.records)) {
        voltmx.print("No valid response or records from service");
        self.view.segCountryCodes.setData([]); 
        return;
      }
      if (  response.opstatus === 1011) {
        voltmx.print("Service call failed. Showing error.");
        self.view.segCountryCodes.setData([]);
        self.view.flxError.setVisibility(true); 
        return;
      }
      var countryCodes = [];
      response.records.forEach(function(res) {
        var country = res.country || "Unknown";
        self.add_value = res.add_value || "car3.png";
        var phone_code = res.phone_code || "";
        var code = res.code || "";
        countryCodes.push({
          "lblCountryCode": phone_code,
          "lblCountryName": country,
          "imgCountryFlag": { "src": self.add_value }
        });
      });
      if (countryCodes.length > 0) {
        self.view.segCountryCodes.setData(countryCodes);
      } else {
        voltmx.print("No country codes found in response");
        self.view.segCountryCodes.setData([]);
      }   
      self.view.segCountryCodes.setData(countryCodes);
    });
  },


  segCountryCodesOnRowClickAction: function(){
    var selectedCountryCode = this.view.segCountryCodes.selectedRowItems;
    var countrycode = selectedCountryCode[0].lblCountryCode;
    var selectedCountryFlag = selectedCountryCode[0].imgCountryFlag.src;
    this.view.lblCountryCode.text =	 countrycode;
    this.view.imgCountryCode.src  = selectedCountryFlag;
    this.view.flxCountryCodePopup.setVisibility(false);
  },


  flxImgBackOnClickAction: function(){
    this.view.flxCountryCodePopup.setVisibility(false);
  },


  tbxSearchCountryCodeOnTextChangeAction: function() {
    var self = this;
    if (!self.originalCountryData) {
      self.originalCountryData = self.view.segCountryCodes.data || [];
    }
    var allItems = self.originalCountryData;
    var searchValue = self.view.tbxSearchCountryCode.text.trim();
    var segLabelName = "lblCountryName";
    var filteredData = [];
    if (searchValue === "") {
      self.view.segCountryCodes.setData(allItems);
      return;
    }
    if (!Array.isArray(allItems) || !searchValue) {
      self.view.segCountryCodes.setData(allItems);
      return;
    }
    var pattern = searchValue.toUpperCase();
    for (var i = 0; i < allItems.length; i++) {
      var labelValue = allItems[i][segLabelName];
      if (labelValue && labelValue.toUpperCase().includes(pattern)) {
        filteredData.push(allItems[i]);
      }
    }
    self.view.segCountryCodes.setData(filteredData);
  },


  flxWrapper7: function(){
    this.flxResendOTPCodeOnClickAction();
  },


  flxResendOTPCodeOnClickAction: async function(){
    if(this.view.lblResendMblOTPCode.text === "Resend Code?"){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var self = this;
      var verification_type ="Mobile";
      var regId = voltmx.store.getItem("regId");
      var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
        if (!baseURL.endsWith("/")) {
          baseURL += "/";
        }
      }
      var url = baseURL+"services/ms_user_reg/resend-otp";

      try {
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);

        var username = "d6bebb28b79927d1c747ea19b028ceb4";
        var password = "5da9490e70d8f3201e20c4cf203961da";
        var credentials = username + ":" + password;
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        await new Promise((resolve, reject) => {
          request.onReadyStateChange = function() {
            if (request.readyState === 4) {
              if (request.status === 200) {
                voltmx.application.dismissLoadingScreen();
                var requestString = request.responseText;
                var requestJSONresendMobileOTP = JSON.parse(requestString);
                var opstatusRes2 = requestJSONresendMobileOTP.opstatus;
                if (requestJSONresendMobileOTP.message === "OTP sent successfully.") {
                  kony.timer.cancel("otpTimerMobile");
                  self.startOTPTimerForMobile();
                  self.view.flxMobileOtpSentSuccessFull.setVisibility(true);
                  self.view.flxMobileOtpError.setVisibility(false);
                  self.view.lblMobileOtpError.text="";
                  self.view.lblResendMblOTPCode.text = "Resend Code in";
                  self.view.lblMobileTimer.setVisibility(true);
                  self.view.flxResendOTPCode.setVisibility(true);
                  self.view.lblMobileOtpSent.text = requestJSONresendMobileOTP.message ;
                  self.clearOtpFields("OTP");
                  self.view.tbxOTP1.setFocus(true);
                  resolve();
                } 
                else {
                  voltmx.application.dismissLoadingScreen();
                  self.view.lblMobileOtpError.text = "resend OTP not sent.";
                  self.view.lblMobileOtpVerified.text = "";
                }
              } else {
                self.view.lblMobileOtpError.text = "resend OTP not sent. plase try again!";
                voltmx.application.dismissLoadingScreen();
                self.view.flxError.setVisibility(true);
                self.view.lblMobileOtpVerified.text = "";
              }
            }
          }
          var requestData = JSON.stringify({
            "mobile_number":self.view.tbxPhoneNumber.text,
            "verification_type": verification_type,
            "reg_id" :regId ,
            "country_code": "+971",
          });
          request.send(requestData); 
        });
      }   
      catch (error) {
        alert("Error Resending Mobile OTP: " + error.message);
        voltmx.print("Error Resending Mobile OTP: " + error.message);
      }
    }
  },


  //function to set Mobile OTP Automatically from the service in the texboxes without entering!!
  tbxOTP1OnTextChangeAction: function(){
    var otp = voltmx.store.getItem("otp");
    var code1 = otp.slice(0, 1);
    var code2 = otp.slice(1, 2);
    var code3 = otp.slice(2, 3);
    var code4 = otp.slice(3, 4);
    this.view.tbxOTP1.text = code1;
    this.view.tbxOTP2.text = code2;
    this.view.tbxOTP3.text = code3;
    this.view.tbxOTP4.text = code4;
    if(this.view.tbxOTP1.text !==null&&this.view.tbxOTP2.text !==null&&this.view.tbxOTP3.text !==null&&this.view.tbxOTP4.text !==null)
    {
      this.view.flxOtpVerificationFooter.setVisibility(true);
      this.view.tbxOTP1.setEnabled(false);
      this.view.tbxOTP2.setEnabled(false); 
      this.view.tbxOTP3.setEnabled(false); 
      this.view.tbxOTP4.setEnabled(false);
    }
    else{
      this.view.flxOtpVerificationFooter.setVisibility(false);
    }
  },


  flxWrapper8: function(){
    this.flxNextInOTPVerificationOnTouchEndAction();
  },


  //function to call "Verify Mobile OTP Service"  and navigate to Username Page!!!
  flxNextInOTPVerificationOnTouchEndAction: async function(){
    var self = this;
    var isMobileOtpVerified= voltmx.store.getItem("isMobileOtpVerified");
    if(isMobileOtpVerified=== false){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var otp1 = voltmx.store.getItem("mobileotp1");
      var otp2 = voltmx.store.getItem("mobileotp2");
      var otp3 = voltmx.store.getItem("mobileotp3");
      var otp4 = voltmx.store.getItem("mobileotp4");
      var otp = otp1+otp2+otp3+otp4;
      var countrycode = voltmx.store.getItem("country_code");
      var verification_type = "Mobile";
      var reg_id = voltmx.store.getItem("regId");
      var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
        if (!baseURL.endsWith("/")) {
          baseURL += "/";
        }
      }
      var url = baseURL+"services/ms_user_reg/verify-otp";
      var request = new voltmx.net.HttpRequest();
      request.open("POST", url);

      var username = "d6bebb28b79927d1c747ea19b028ceb4";
      var password = "5da9490e70d8f3201e20c4cf203961da";
      var credentials = username + ":" + password;
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Accept", "application/json");
      await new Promise((resolve, reject) => {
        request.onReadyStateChange = function () {
          if (request.readyState === 4) {
            if (request.status === 200 ) {
              voltmx.application.dismissLoadingScreen();
              var requestString = request.responseText;
              var requestJSON = JSON.parse(requestString);
              voltmx.print("Success: " + request.responseText);
              if(requestJSON.data.is_verified === true){
                self.view.flxMobileVerifyAndOTPCode.setVisibility(false);
                self.view.flxUserName.setVisibility(true);
                voltmx.store.setItem("isMobileVerified", true);
                kony.timer.cancel("otpTimerMobile");
                voltmx.store.setItem("isMobileOtpVerified", true);
                self.view.tbxPhoneNumber.setEnabled(false);
                if (self.view.flxMobileOtpVerified) {
                  self.view.flxMobileOtpVerified.setVisibility(true);
                } else {
                  kony.print("flxMobileOtpVerified is not available");
                }
                self.view.flxResendOTPCode.setVisibility(false);
              }
              else{
                voltmx.application.dismissLoadingScreen();
                self.view.flxMobileOtpError.setVisibility(true);
                self.view.lblMobileOtpError.text ="Backend Response Failed!!";
                self.view.flxResendOTPCode.setVisibility(false);
              }
            } else {
              voltmx.application.dismissLoadingScreen();
              //               self.view.flxError.setVisibility(true);
              self.view.flxMobileOtpError.setVisibility(true);  
              self.view.lblMobileOtpError.text = "Invalid OTP!"
              self.clearOtpFields("OTP");
              self.view.tbxOTP1.setFocus(true);
              self.view.lblMobileOtpSent.text = "";
              self.view.flxMobileOtpSentSuccessFull.setVisibility(false);
              voltmx.print(" Failed: " + request.status + " - " + request.responseText);
            }
          }
        };
        var jsonData = JSON.stringify({
          "mobile_number": self.view.tbxPhoneNumber.text,
          "otp":otp,
          "country_code" : "+971",
          "reg_id" : reg_id,
          "verification_type" :verification_type
        });
        request.send(jsonData);
      });
    }
    else{
      voltmx.application.dismissLoadingScreen();
      self.view.flxMobileVerifyAndOTPCode.setVisibility(false);
      self.view.flxUserName.setVisibility(true);
    }
  },


  //Navigation from UserName to PassWord and Confirm Password Page!!!!!
  flxNextUserNameOnTouchEndAction: function(){
    this.view.flxPassWord.setVisibility(true);
    this.view.flxUserName.setVisibility(false);
  },



  //Navigation from Password and Confirm Password to terms and conditions page!!!!
  imgNextPasswordOnTouchEnd: function(){
    if(this.view.tbxUserName.text !== null &&this.view.tbxPassWordName.text !==null ){
      if(this.PasswordValidate()&&this.ConfirmPassValidate()){
        this.view.flxTermsAndConditions.setVisibility(true);
      }
      else{
        this.view.flxTermsAndConditions.setVisibility(false);
      }
    }
  },


  PasswordValidate: function() {
    var self = this;
    var password = self.view.tbxPassWordName.text.trim();
    this.view.flxPassWordError.setVisibility(true);
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*&#])[A-Za-z\d@$!%*&#]{8,16}$/;
    var isMinLength = password.length >= 8;
    var hasValidLength = password.length <= 16;
    var hasLower = /[a-z]/.test(password);
    var hasUpper = /[A-Z]/.test(password);
    var hasDigit = /\d/.test(password);
    var hasSpecial = /[@$!%*&#]/.test(password);
    var hasNoQuestionMark = !password.includes("?");
    var hasDigits = /[0-9]/.test(password);
    // label skins (red if invalid, green if valid)
    var validSkin = "sknlblDubaiReg28a745Font40px";     // Green skin
    var invalidSkin = "sknlblDubaiRegdc3545Font40px"; // Red skin

    this.view.lblMinChar.skin = isMinLength ? validSkin : invalidSkin;
    this.view.lblLower.skin = hasLower ? validSkin : invalidSkin;
    this.view.lblUpper.skin = hasUpper ? validSkin : invalidSkin;
    this.view.lblSpecial.skin = hasSpecial ? validSkin : invalidSkin;
    this.view.lblDigits.skin = hasDigits ? validSkin : invalidSkin;
    // You can add more labels for digits, max length, etc. if needed

    // Final validation only returns true if:
    // - It matches the full regex
    // - Does not contain '?'
    // - Length is within range
    var isValid = pattern.test(password) && hasNoQuestionMark && hasValidLength;

    self.view.flxPasswordFooter.top = "150dp";
    return isValid;
  },


  //Validating Confirm Password!!!!
  ConfirmPassValidate: function(){
    var self = this;
    var rawPassword = self.view.tbxPassWordName.text || "";
    var rawConfirmPassword = self.view.tbxConfirmPassWord.text || "";
    if (!self.view.tbxPassWordName || !self.view.tbxConfirmPassWord) {
      voltmx.print("Password fields not initialized yet.");
      self.view.lblPassWordShouldMatchConfirmPassword.setVisibility(true);
      this.view.btnSaveAndContinueForTermsNConditions.setEnabled(false);
      return false;
    }
    var password = rawPassword.trim();
    var confirmPassword = rawConfirmPassword;
    // Password pattern: min 8, max 16, at least 1 lowercase, 1 uppercase, 1 number, 1 special character
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
    if (
      rawConfirmPassword !== confirmPassword ||    // leading/trailing spaces
      confirmPassword.length === 0 ||              // empty
      !pattern.test(confirmPassword) ||            // not matching password pattern
      confirmPassword !== password                 // not matching original password
    ) {
      self.view.lblPassWordShouldMatchConfirmPassword.setVisibility(true);
      this.view.btnSaveAndContinueForTermsNConditions.setEnabled(false);
      return false;
    } else {
      this.view.btnSaveAndContinueForTermsNConditions.setEnabled(true);
      self.view.lblPassWordShouldMatchConfirmPassword.setVisibility(false);
      return true;
    }
  },


  //User name onTextChange Action!!!!!!
  tbxUserNameOnTextChangeAction: function(){
    var rawInput = this.view.tbxUserName.text;
    var userName = rawInput.trim();
    // Regex: 5–64 chars, no ending dot, valid special characters only
    var pattern = /^(?=.*[A-Za-z])[A-Za-z0-9.\-_!#^~\\]{3,64}(?<!\.)$/;
    if (
      rawInput !== userName ||        // has leading/trailing spaces
      !pattern.test(userName)         // invalid structure or length or missing letter
    ) {
      this.view.flxUserNameFooter.setVisibility(false);
      this.view.lblUserNameError.text = "*Enter valid username, accept 3–64 chars, no ending dot, valid special characters only(.-_!#^~\)";
    } else {
      this.view.flxUserNameFooter.setVisibility(true);
      this.view.lblUserNameError.text = "";
    }
  },


  flxWrapper9: function(){
    this.imgNextUserNameOnTouchEndAction();
  },


  //Function to call user validation Service and enabling Password and Confirm PassWord page!!!!
  imgNextUserNameOnTouchEndAction: async function(){
    var baseURL = voltmx.store.getItem("BASE_URL");
    if(baseURL){
      if (!baseURL.endsWith("/")) {
        baseURL += "/";
      }
    }
    var url = baseURL+"services/ms_user_reg/check-user-attribute";
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var verification_type ="userName";
    try {
      var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
      var username = "d6bebb28b79927d1c747ea19b028ceb4";
      var password = "5da9490e70d8f3201e20c4cf203961da";
      var credentials = username + ":" + password;
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Accept", "application/json");
      await new Promise((resolve, reject) => {
        request.onReadyStateChange = function() {
          if (request.readyState === 4) {
            if (request.status === 200 ) {
              voltmx.application.dismissLoadingScreen();
              var requestString = request.responseText;
              var requestJSON = JSON.parse(requestString); 
              var opstatusRes = requestJSON.opstatus;
              if (opstatusRes === 0 ){
                if (requestJSON.data && Object.keys(requestJSON.data).length > 0) {
                  if(requestJSON.data.userExists === false){
                    self.view.flxPassWord.setVisibility(true);
                    self.view.flxUserName.setVisibility(false);
                  } else {
                    voltmx.application.dismissLoadingScreen();
                    self.view.lblUserNameError.text = "* User Already Exists!!!";
                  }
                  resolve();
                }
                else{
                  voltmx.application.dismissLoadingScreen();
                  alert(requestJSON.error.message);
                  self.view.lblUserNameError.text = "* Backend or Service Error!"
                }
              }

              else{
                voltmx.application.dismissLoadingScreen();
                self.view.lblUserNameError.text ="* Response Error!!";
                voltmx.print("Failed: " + request.status + " - " + request.responseText);
              }
            } else {
              voltmx.application.dismissLoadingScreen();
              self.view.flxError.setVisibility(true);
              voltmx.print("Failed: " + request.status + " - " + request.responseText);
            }
          }
        };
        var jsonData = JSON.stringify({
          "verification_type": verification_type,
          "value":self.view.tbxUserName.text ,
        });
        request.send(jsonData); 
      });
    } catch (error) {
      alert("Error: " + error.message);
      voltmx.print("Error: " + error.message);
    }
  },


  validatePasswordRules: function(password) {
    var isMinChar = password.length >= 8;
    var hasLower = /[a-z]/.test(password);
    var hasUpper = /[A-Z]/.test(password);
    var hasSpecial = /[@$!%*&#]/.test(password);
    var hasDigits = /[0-9]/.test(password); 
    // Colors
    var greenSkin = "sknlblDubaiReg28a745Font40px"; // Define in themes (green text)
    var redSkin = "sknlblDubaiRegdc3545Font40px";     // Define in themes (red text)
    this.view.lblMinChar.skin = isMinChar ? greenSkin : redSkin;
    this.view.lblLower.skin = hasLower ? greenSkin : redSkin;
    this.view.lblUpper.skin = hasUpper ? greenSkin : redSkin;
    this.view.lblSpecial.skin = hasSpecial ? greenSkin : redSkin;
    this.view.lblDigits.skin = hasDigits ? greenSkin : redSkin;
    this.view.flxPasswordFooter.setVisibility = !isValid;
  },


  tbxPassWordNameOnTextChangeAction: function() {
    var passwordText = this.view.tbxPassWordName.text;
    var isPasswordHidden = this.view.tbxPassWordName.secureTextEntry;
    if (passwordText.length > 0) {
      this.view.imgEyeOpenPass.setVisibility(true);

      if (isPasswordHidden) {
        this.view.imgEyeClosePass.setVisibility(true);
      } else {
        this.view.imgEyeClosePass.setVisibility(false);
      }
    } else {
      this.view.imgEyeOpenPass.setVisibility(false);
      this.view.imgEyeClosePass.setVisibility(false);
    }
    var isValid = this.PasswordValidate();
    this.view.flxPasswordFooter.setVisibility(isValid);
  },

  //Confirm PassWord OnTextChange Action!!!!
  tbxConfirmPassWordOnTextChangeAction: function(){
    var confirmPass = this.view.tbxConfirmPassWord.text || "";
    if (confirmPass.length > 0) {
      this.view.imgEyeOpenConfirmPass.setVisibility(true); 

      if (this.view.tbxConfirmPassWord.secureTextEntry === true) {
        this.view.imgEyeCloseConfirmPass.setVisibility(true);  // Show cross if hidden
      } else {
        this.view.imgEyeCloseConfirmPass.setVisibility(false); // Hide cross if visible
      }
    } else {
      this.view.imgEyeOpenConfirmPass.setVisibility(false);
      this.view.imgEyeCloseConfirmPass.setVisibility(false);
    }
    // Confirm Password Validation
    if (this.ConfirmPassValidate()&& confirmPass.trim().length > 0 ) {
      this.view.lblPassWordShouldMatchConfirmPassword.setVisibility(false);
      if(this.view.imgCheckTerms.isVisible){
        this.view.btnSaveAndContinueForTermsNConditions.setVisibility(true);
      }
      else{
        this.view.btnSaveAndContinueForTermsNConditions.setVisibility(false);
      }
    } else {
      this.view.lblPassWordShouldMatchConfirmPassword.setVisibility(true);
    }
  },


  //OnClick Action for MaskText ON and OFF!!!
  flxEyeIconPassOnClickAction: function(){
    this.view.tbxPassWordName.secureTextEntry = !this.view.tbxPassWordName.secureTextEntry;
    if (this.view.tbxPassWordName.secureTextEntry === true) {
      this.view.imgEyeClosePass.setVisibility(true);  // Show cross (password hidden)
    } else {
      this.view.imgEyeClosePass.setVisibility(false); // Hide cross (password visible)
    }
  }, 


  flxEyeIconConfirmPassOnClickAction: function(){  
    this.view.tbxConfirmPassWord.secureTextEntry = !this.view.tbxConfirmPassWord.secureTextEntry;
    if (this.view.tbxConfirmPassWord.secureTextEntry === true) {
      this.view.imgEyeCloseConfirmPass.setVisibility(true);  // Show cross if hidden
    } else {
      this.view.imgEyeCloseConfirmPass.setVisibility(false); // Hide cross if visible
    }
  },


  flxPasswordFooterOnClickAction: function(){
    this.view.flxPassWord.setVisibility(false);
    this.view.flxConfirmPasswordContainer.setVisibility(true);
  },



  btnUploadYourDocOnClickAction: function(){
    this.view.flxFooterPopupSellerRegistrationForIndividual.bottom="-3%";
    this.view.flxPopupHowWouldYouUploadYourDoc.setVisibility(false);
    if(this.flagUploaded){
      this.view.lblUploadSignedDocs.text = "uploadedfile";
      this.view.flxCongratulationsSellerSeller.setVisibility(true);
    }
  },


  //Navigation from Password and Confirm Password to terms and conditions page!!!!
  btnPassWordAndConfirmPasswordOnClickAction:function(){
    if(this.PasswordValidate() && this.ConfirmPassValidate()){
      this.view.flxTermsAndConditions.setVisibility(true);
      this.view.flxPassWord.setVisibility(false);
      this.view.btnSaveAndContinue.setEnabled(false);
      this.view.btnSaveAndContinueForTermsNConditions.skin="sknbtnCPReg767676CstmBorder5pxFont70px";
    }
  },


  lblDownloadTermsAndConditionsOnTouchEndAction: function(){
    this.view.flxDownLoadTermsAndConditions.setVisibility(false);
    this.view.flxUploadedSignedDocs.setVisibility(true);
    this.view.flxIHaveRead.setVisibility(true);
  },


  lblUploadSignedDocsOnTouchEndAction: function(){
    this.view.flxFooterPopupSellerRegistrationForIndividual.bottom="-60%";
    this.view.flxPopupHowWouldYouUploadYourDoc.setVisibility(true);
    this.view.flxFooterPopupHowWouldUpload.bottom = "3%";
  },


  flxWrapper10: function(){
    this.btnSaveAndContinueForTermsNConditionsOnClickAction();
  },

  //Function to call "create user service" and enabling congratulations popup in this success call!!! 
  btnSaveAndContinueForTermsNConditionsOnClickAction: async function(){ 
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var self = this;
    var UserRegister_inputparam = {};
    var userRole = voltmx.store.getItem("userType");
    userRole=userRole.toLowerCase();
    var email= voltmx.store.getItem("email");
    var fullName = voltmx.store.getItem("fullName");
    var is_org = voltmx.store.getItem("is_org");
    var reg_id =voltmx.store.getItem("regId");
    var user_Type = "IND";
    var mobile = voltmx.store.getItem("mobile");
    var baseURL = voltmx.store.getItem("BASE_URL");
    if(baseURL){
      if (!baseURL.endsWith("/")) {
        baseURL += "/";
      }
    }
    var url = baseURL+"services/ms_user_reg/create-user";
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
    var username = "d6bebb28b79927d1c747ea19b028ceb4";
    var password = "5da9490e70d8f3201e20c4cf203961da";
    var credentials = username + ":" + password;
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    await new Promise((resolve, reject) => {
      request.onReadyStateChange = function () {
        if (request.readyState === 4) {
          if (request.status === 200 ) {
            voltmx.application.dismissLoadingScreen();
            var requestString = request.responseText;
            var requestJSON = JSON.parse(requestString);
            voltmx.print("requestJSON :"+requestJSON);
            if( requestJSON && requestJSON.data && requestJSON.data.user_id !== null){
              self.view.flxInnerBarConfirmPassword.width="100%";
              voltmx.store.setItem("useridafterregister",requestJSON.data.user_id);
              if(is_org === true &&  requestJSON.statusCode === 200 && requestJSON.message ==="User created successfully."){

                voltmx.print("response in create user for with trade :"+JSON.stringify(requestJSON));
                if(userRole === "seller"){
                  self.view.flxCongratulationsSeller.setVisibility(true);
                  self.view.flxCongratulationsBuyer.setVisibility(false);
                }
                else{
                  self.view.flxCongratulationsBuyer.setVisibility(true);
                  self.view.flxCongratulationsSeller.setVisibility(false);
                }
                voltmx.store.setItem("isUserCreated", true);
              }
              else if(is_org === false &&  requestJSON.statusCode === 200 && requestJSON.message ==="User created successfully."){
                self.view.flxCongratulationsSeller.setVisibility(true);
                voltmx.print("response in create user for without trade :"+JSON.stringify(requestJSON));
                if(userRole === "seller"){
                  self.view.flxCongratulationsSeller.setVisibility(true);
                  self.view.flxCongratulationsBuyer.setVisibility(false);
                }
                else{
                  self.view.flxCongratulationsBuyer.setVisibility(true);
                  self.view.flxCongratulationsSeller.setVisibility(false);
                }
                voltmx.store.setItem("isUserCreated", true);
              }

            }
            else{
              voltmx.application.dismissLoadingScreen();
              voltmx.store.setItem("isUserCreated", false);
              alert("No response!");
            }
          } else {
            voltmx.application.dismissLoadingScreen();
            self.view.flxError.setVisibility(true);
          }
        }	
      };
      var userRoleRaw = voltmx.store.getItem("userType");
      var userRole = (userRoleRaw === "بائع" || userRoleRaw === "Seller") ? "seller" :
      (userRoleRaw === "مشتري" || userRoleRaw === "Buyer") ? "buyer" :
      userRoleRaw; 
      userRole = userRole.toLocaleLowerCase();
      var is_org = voltmx.store.getItem("is_org");
      var selectedDateStr = voltmx.store.getItem("selectedDate");
      if (selectedDateStr) {
        var selectedDate = new Date(Date.parse(selectedDateStr));
        var year = selectedDate.getFullYear();
        var month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        var day = String(selectedDate.getDate()).padStart(2, '0');

        var formattedExpiryDate = `${year}-${month}-${day}`;
        voltmx.print(formattedExpiryDate);
      }

      //       var  = `${year}-${month}-${day}`; // "YYYY-MM-DD"
      if(is_org !==  true){

        var jsonDataForWithoutTrade = JSON.stringify({
          "user_role" : userRole,
          "full_name" : fullName,
          "user_name" : self.view.tbxUserName.text,
          "password" : self.view.tbxPassWordName.text,
          "email" : email,
          "mobile_number": self.view.tbxPhoneNumber.text,
          "reg_id": reg_id,
          "country_code":"+971",
        });
        request.send(jsonDataForWithoutTrade);
      }
      else{
        var jsonDataForTrade = JSON.stringify({
          "full_name": fullName,  
          "user_name": self.view.tbxUserName.text,  
          "password": self.view.tbxPassWordName.text,    
          "user_role": userRole,   
          "email": email,
          "mobile_number": self.view.tbxPhoneNumber.text, 
          "country_code": "+971", 
          "reg_id": reg_id,   
          "is_org":is_org , 
          "company_name":self.view.tbxCompanyAddress.text,
          "tax_registration_no": self.view.tbxTaxRegistrationNumber.text,  
          "trade_license_expiry_date":formattedExpiryDate,   
          "trade_license_number": self.view.tbxTradeLicenseNumber.text
        });
        request.send(jsonDataForTrade); 
      }
    });
  },


  //Disabling Congrats Popup and Navigating to Login Page!!!!
  btnSaveAndContinueSellerOnClickAction: function(){
    this.view.flxCongratulationsSeller.setVisibility(false);
    var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
    ntf.navigate();
  },


  btnSaveAndContinueBuyerOnClick: function(){
    var ntf = new voltmx.mvc.Navigation("frmPayBeforeRegistration");
    ntf.navigate();
  },


  flxUploadPopupClose: function(){
    this.view.flxPopupHowWouldYouUploadYourDoc.setVisibility(false);
    this.view.flxFooterPopupHowWouldUpload.bottom="3%";
    this.view.flxFooterPopupSellerRegistrationForIndividual.bottom="3%";
    this.view.flxTermsAndConditions.setVisibility(true);
  },


  chxIhaveReadTermsNCondOnSelectionAction: function() {
    var self = this;
    self.terms = !self.terms;
    self.view.imgCheckTerms.setVisibility(self.terms);
    self.view.flxInnerBarConfirmPassword.width = self.terms ? "80%" : "100%";
    var isPasswordConfirmed = self.ConfirmPassValidate();
    var isCheckboxVisible = self.view.imgCheckTerms.isVisible;
    var isPasswordEntered = self.view.tbxConfirmPassWord && self.view.tbxConfirmPassWord.text !== "";
    var shouldEnableButton = isCheckboxVisible && isPasswordConfirmed && isPasswordEntered;
    self.view.btnSaveAndContinueForTermsNConditions.setVisibility(shouldEnableButton);
    self.view.btnSaveAndContinueForTermsNConditions.setEnabled(shouldEnableButton);
  }


});