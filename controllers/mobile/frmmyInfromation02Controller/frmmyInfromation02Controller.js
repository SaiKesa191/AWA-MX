define({ 

  onNavigate: function()
  {
  
    this.settingData();
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnUpdateMobileNumber.onClick = this.updateData.bind(this,"Number");
    this.view.btnUpdateEmail.onClick = this.updateData.bind(this,"email");
    this.view.btnConfirm.onClick = this.updateData.bind(this,"address");
    this.view.txtMail.onTextChange = this.validateEmail.bind(this);
    this.view.CopytbxPhoneNumber0c3ff2b0d62e94c.onTextChange = this.validateUAEMobileNumber.bind(this);
   this.view.tbxBuildingName.onTextChange = this.checkAllAddressFields.bind(this);
this.view.txtStreetName.onTextChange = this.checkAllAddressFields.bind(this);
this.view.txtCity.onTextChange = this.checkAllAddressFields.bind(this);
this.view.txtPO.onTextChange = this.checkAllAddressFields.bind(this);



    this.view.flxArow.onClick = function()
    {
      new voltmx.mvc.Navigation("frmOpenMyAccount").navigate();
    }.bind(this);
    
    
    this.view.btnchngeaddress.onClick = function()
    {
      this.view.btnConfirm.skin ="sknBtnececec8pxradius";
      this.view.flxChangeAddress.setVisibility(true);
      this.view.flxOverLay.setVisibility(true);
    }.bind(this);
    this.view.flxChangeAddressClose.onClick = function()
    {

      this.empty();
      this.view.flxChangeAddress.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.flxAddIMgAndLbl.onClick = function()
    {

      this.view.flxContactus.setVisibility(true);
      this.view.flxOverLay.setVisibility(true);


    }.bind(this);
    this.view.flxContactusClose.onClick = function()
    {
      this.view.flxContactus.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);

    }.bind(this);
    this.view.flxAddEmail.onClick = function()
    {

      this.view.flxEmail.setVisibility(true);
      this.view.flxOverLay.setVisibility(true);

    }.bind(this);
    this.view.flxEmailClose.onClick = function()
    {
      this.view.flxEmail.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    //     this.view.btnConfirm.onClick = function()
    //     {
    //       this.view.flxChangeAddress.setVisibility(false);
    //       this.view.flxOverLay.setVisibility(false);
    //     }.bind(this);
  },

  onPreShow: function()
  {
//         this.settingData();

     this.view.btnConfirm.setEnabled(false);
   this.view.btnConfirm.skin = "sknBtnececec8pxradius";
    this.toggleFooterIcons();
    
    if(this.view.flxError){
       this.view.flxError.setVisibility(false);
    }
    this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    
      if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
          if(this.view.flxServiceError.btnTryAgain){
      this.view.flxServiceError.btnTryAgain.onClick = () =>{
       this.view.flxServiceError.setVisibility(false);
      }
    }
    
  },
  
  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
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
//       this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//       this.view.Footer2.lblMyBids.text = "My Bids";
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

  settingData: function () {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var self = this;
    
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");
    function sellerBuyerInfoCallback(status, response) {
      
      if(response && response.opstatus && response.opstatus === 1011){
        if(self.view.flxError){
          self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
          self.view.flxError.setVisibility(true);
        }
        return;
      }
      
      if (response && response.opstatus && response.opstatus >= 500) {
        if (self.view.flxServiceError) {
          self.view.flxServiceError.lblServiceErrorMsg.text = "Service error occurred. Please try again later.";
          self.view.flxServiceError.setVisibility(true);
        }
        return;
      }
      
      
        if(response && response.opstatus && response.opstatus !== 0){
        if(this.view.SmthngWentWrong){
        this.view.SmthngWentWrong.setVisibility(false);
        }
    return;
      }
      if(self.view.flxError){
      self.view.flxError.setVisibility(false);
      }

     if (!response || !Array.isArray(response.records) || response.records.length === 0) {
//     alert("Failed to retrieve seller-buyer info.");
    return;
}
      
      var records = (response && Array.isArray(response.records)) ? response.records : [];
var record = records.length > 0 ? records[0] : null;
      

     
      voltmx.print(JSON.stringify(record));
      //alert(JSON.stringify(record));
      voltmx.store.setItem("userInfo", record);
      var addressParts = [];

      if (record.city) addressParts.push(record.city);
      if (record.state) addressParts.push(record.state);
      if (record.country) addressParts.push(record.country);
      if (record.zip) addressParts.push("P.O. Box " + record.zip);
      if (record.address) addressParts.push(record.address);

      //  Add comma after each line, and full stop after the last line
//       var formattedAddress = addressParts
//       .map((line, index) => {
//         return (index === addressParts.length - 1) ? line + "." : line + ",";
//       })
//       .join("\n");
      if(record.city || record.state || record.country || record.zip || record.address)
      {
//         self.view.flxAddressBook.setVisibility(true);
        if (!self.view.flxAddressBook) {
    return; // nothing to show
}

self.view.flxAddressBook.setVisibility(true);

        self.view.lblAddressTittle.text = voltmx.i18n.getLocalizedString("Address Book");

        self.view.lblAddressTittle.skin = "slnlbl0D0A19DuabiBold16px45";
        self.view.btnchngeaddress.text = voltmx.i18n.getLocalizedString("Update Address");
        self.view.btnchngeaddress.skin = "sknbtnBg61B35CBorder61B35CRadius3pxffffffDubai16px45";
        
//         self.view.lblAddressDetailes.text = formattedAddress;
//         self.view.lblAddressDetailes.skin ="sknlbl0D0A19DubaiBold18px45";
      }
      if(record.address && record.address.trim() !== "," && record.address.trim() !== ", ")
      {
        self.view.lblAddress.setVisibility(true);
        self.view.lblAddress.text = record.address;
//         self.view.lblAddress.skin = "sknlbl0D0A19DubaiBold18px45";
         self.view.lblAddress.skin = "sknlbl000000Dubai18px45";
      }
      
      if(record.city)
      {
        self.view.lblCity.setVisibility(true);
        self.view.lblCity.text = record.city+",";
//         self.view.lblCity.skin = "sknlbl0D0A19DubaiBold18px45";
         self.view.lblCity.skin = "sknlbl000000Dubai18px45";
      }
      
      if(record.state)
      {
        self.view.lblState.setVisibility(true);
        self.view.lblState.text = record.state+",";
//         self.view.lblState.skin = "sknlbl0D0A19DubaiBold18px45";
         self.view.lblState.skin = "sknlbl000000Dubai18px45";
      }
      
      if(record.country)
      {
        self.view.lblCountry.setVisibility(true);
        self.view.lblCountry.text = record.country+",";
//         self.view.lblCountry.skin = "sknlbl0D0A19DubaiBold18px45";
         self.view.lblCountry.skin = "sknlbl000000Dubai18px45";
      }
      if(record.zip)
      {
        self.view.lblPincode.setVisibility(true);
        self.view.lblPincode.text = "P.O. Box :" +record.zip;
//         self.view.lblPincode.skin = "sknlbl0D0A19DubaiBold18px45";
         self.view.lblPincode.skin = "sknlbl000000Dubai18px45";
      }
      
      if(record.phone)
      {
        self.view.flxprimaryNumber.setVisibility(true);
        self.view.lblprimaryNumber.text = voltmx.i18n.getLocalizedString("Primary Number");
        self.view.lblprimaryNumber.skin = "sknlbl9A9EA7DubaiBold18px45";
        self.view.lblNumber.text = record.phone;
        self.view.lblNumber.skin = "sknlbl0D0A19DubaiBold18px45";
        self.view.lblAddSecondaryNumber.text = "Add Secondary Number";
        self.view.lblAddSecondaryNumber.skin = "sknlbl231f20Dubai16px45";
      }
      if(record.email)
      {
        self.view.flxPrimaryEmail.setVisibility(true);
        self.view.lblprimaryEmail.text = voltmx.i18n.getLocalizedString("Primary Email");
        self.view.lblprimaryEmail.skin = "sknlbl9A9EA7DubaiBold18px45";
        self.view.lblEmail.text = record.email;
        self.view.lblEmail.skin="sknlbl0D0A19DubaiBold18px45";
        self.view.lblAddSecondaryEmail.text = "Add Secondary Email";
        self.view.lblAddSecondaryEmail.skin = "sknlbl231f20Dubai16px45";
      }
     
      if (record.secondary_email) 
      {
        //alert("Enter into second email :"+record.secondary_email);
        self.view.flxSecondaryEmail.setVisibility(true);
        self.view.lblSecondaryEmail.text =voltmx.i18n.getLocalizedString("Secondary Email");
        self.view.lblSecondaryEmail.skin ="sknlbl9A9EA7DubaiBold18px45";
        self.view.lblEmail02.text =record.secondary_email;
        self.view.lblEmail02.skin = "sknlbl0D0A19DubaiBold18px45";
        self.view.flxSecondaryEmail.setVisibility(true);
        self.view.flx102.setVisibility(false);
        
      }else
      {
        self.view.flxSecondaryEmail.setVisibility(false);
      }
      if (record.secondary_phone) 

      {
        //alert("Enter into second number :"+record.secondary_phone);
        
        self.view.lblSecondaryNumber.text =voltmx.i18n.getLocalizedString("Secondary Number");

        self.view.lblSecondaryNumber.skin = "sknlbl9A9EA7DubaiBold18px45"; 
        self.view.lblSecondaryPhoneNumber.text = record.secondary_phone;
        self.view.lblSecondaryPhoneNumber.skin = "sknlbl0D0A19DubaiBold18px45";
        self.view.flxSecondaryhoneNumber.setVisibility(true);
        self.view.flx02.setVisibility(false);
      }else
      {
        self.view.flxSecondaryhoneNumber.setVisibility(false);
      }
      

    //self.sendUpdatedUserInfo(record); 
      

    }

    if (sellerBuyerInfoInputParams == undefined) {
      var sellerBuyerInfoInputParams = {};
    }

    sellerBuyerInfoInputParams["serviceID"] = "fry_int_common$seller-buyer-info";
    sellerBuyerInfoInputParams["user_id"] = userId;

    var httpHeaders = {
      "user_token": usertoken
    };
    sellerBuyerInfoInputParams["httpheaders"] = httpHeaders;

    var httpConfigs = {};
    sellerBuyerInfoInputParams["httpconfig"] = httpConfigs;

    fry_int_common$seller_buyer_info = mfintegrationsecureinvokerasync(
      sellerBuyerInfoInputParams,
      "fry_int_common",
      "seller-buyer-info",
      sellerBuyerInfoCallback
    );
    
    voltmx.application.dismissLoadingScreen();

  },

  updateData: function(type)
  {
    //alert("Update function called");
    var self = this;
   
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");  



    var record = voltmx.store.getItem("userInfo");

//     if (type === 'Number') {
//       var number = self.view.tbxPhoneNumber.text;
//       var code = self.view.lblCountryCode.text;
//       var mobileNumber = code + number;
// //       var flag1 =/^(?:9715[0-9]{8}|05[0-9]{8})$/.test(number);
//        var flag1 =/^(?:\+971|0)5[0-9]{8}$/.test(number);
      
//       if(flag1)
//       {
//         self.view.flxContactus.setVisibility(false);
//         self.view.flxOverLay.setVisibility(false);
//         record.secondary_phone = mobileNumber;
//         voltmx.store.setItem("userInfo", record);
//         self.view.lblNumberError.setVisibility(false);
//       }
//       else
//       {
//         self.view.flxContactus.setVisibility(true);
//         self.view.flxOverLay.setVisibility(true);
//         self.view.lblNumberError.setVisibility(true);
//       }
//     } 
    if (type === 'Number') {
    var number = self.view.tbxPhoneNumber.text.trim();
    var code = self.view.lblCountryCode.text.trim();
    var mobileNumber = code + number;

    // UAE number validation
    var flag1 = /^(?:\+9715[0-9]{8}|05[0-9]{8})$/.test(mobileNumber);

    if (flag1) {
        self.view.flxContactus.setVisibility(false);
        self.view.flxOverLay.setVisibility(false);
        record.secondary_phone = mobileNumber;
        voltmx.store.setItem("userInfo", record);
        self.view.lblNumberError.setVisibility(false);
    } else {
        self.view.flxContactus.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);
        self.view.lblNumberError.setVisibility(true);
    }
}

    else if (type === 'email')
    {
      var email = self.view.txtMail.text;
      var flag = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(flag)
      {
        self.view.flxEmail.setVisibility(false);
        self.view.flxOverLay.setVisibility(false);
        record.secondary_email = email;
        voltmx.store.setItem("userInfo", record);
        self.view.lblError.setVisibility(false);
      }
      else
      {
        self.view.flxEmail.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);
        self.view.lblError.setVisibility(true);
      }
    } else {
     
      self.view.flxChangeAddress.setVisibility(false);
      self.view.flxOverLay.setVisibility(false);
      var buildingName = self.view.tbxBuildingName.text;
      var streetName = self.view.txtStreetName.text;
      var city = self.view.txtCity.text;
      var po = self.view.txtPO.text;
if (!record) {
  record = {};  // ensure it's an object
}
      record.city = city;
      if(buildingName)
        {
           record.address = buildingName
        }
      if(streetName)
        {
          record.address = streetName
        }
      if(buildingName && streetName)
        {
      record.address = buildingName + ", " + streetName;
        }
      record.zip = po;
      voltmx.store.setItem("userInfo", record);
    }
 self.sendUpdatedUserInfo(record); 
//     self.sendUpdatedUserInfo(record); 
    self.view.tbxPhoneNumber.text = "";
    self.view.txtMail.text = "";
    self.view.tbxBuildingName.text= "";
    self.view.txtStreetName.text = "";
    self.view.txtCity.text = "";
    self.view.txtPO.text = "";

  },
   

sendUpdatedUserInfo: function (updatedRecord) {
  

  //alert("Received: " + JSON.stringify(updatedRecord));

  var usertoken = voltmx.store.getItem("getUserAccesstoken");
//   var url = "https://dev-hcltx.et.ae:443/services/ms_user/api/v1/update-user-additional-info-password";
  
     var baseURL = voltmx.store.getItem("BASE_URL");
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }

    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var url = baseURL + "services/ms_user/api/v1/update-user-additional-info-password";


  var request = new voltmx.net.HttpRequest();
  request.open("PUT", url);

  // Set required headers (must include Content-Type)
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
//   request.setRequestHeader("Authorization", "Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
      request.setRequestHeader("Authorization", "Basic " + encodeVal);

  request.setRequestHeader("user_token", usertoken);

 
  var requestData = {};
  if (updatedRecord.secondary_phone) {
    requestData.secondary_phone = updatedRecord.secondary_phone;
  }
  if (updatedRecord.secondary_email) {
    requestData.secondary_email = updatedRecord.secondary_email;
  }
  if (updatedRecord.city) {
    requestData.city = updatedRecord.city;
  }
  if (updatedRecord.address) {
    requestData.address = updatedRecord.address;
  }
  if (updatedRecord.zip) {
    requestData.zip = updatedRecord.zip;
  }
 
  if (Object.keys(requestData).length === 0) {
    alert("No valid fields to update.");
    return;
  }

  request.onReadyStateChange = function () {
    if (request.readyState === 4) {
      voltmx.application.dismissLoadingScreen();
      if (request.status === 200) {
//         var response = JSON.parse(request.responseText);
//         //alert("Updated: " + JSON.stringify(response));
//         this.settingData();
         try {
          var response = JSON.parse(request.responseText);
          this.settingData(); // Refresh view
        } catch (e) {
          // JSON parsing error fallback
          if (this.view.SmthngWentWrong) {
            this.view.SmthngWentWrong.lblSomethingWentWrong.text = "Unexpected response. Please try again.";
            this.view.SmthngWentWrong.setVisibility(true);
          }
        }
      } 
      
      else if (request.status === 0 || request.status === -1) {
      // Handle network error
//       alert("Network error. Please check your internet connection.");
        if (this.view.flxError){
          this.view.flxError.setVisibility(true);
        }
    }
      
      else {
//         alert("Request failed: " + request.status + "\n" + request.responseText);
        this.view.SmthngWentWrong.setVisibility(true);
      }
    }
  }.bind(this);

 
  request.send(JSON.stringify(requestData));
},
  setData: function()
  {

    
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
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
    if(voltmx.i18n.getCurrentLocale() === "ar_AE")
    {
      this.view.lblMyInformation.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblprimaryNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblSecondaryNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblSecondaryPhoneNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblprimaryEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblEmail02.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblSecondaryEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAddress.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblCity.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblState.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblCountry.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblPincode.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAddressTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.flx01.reverseLayoutDirection = true;
      this.view.flx02.reverseLayoutDirection = true;
      this.view.flxAddIMgAndLbl.reverseLayoutDirection = true;
      this.view.flx001.reverseLayoutDirection = true;
      this.view.flx101.reverseLayoutDirection = true;
      this.view.flx102.reverseLayoutDirection = true;
      this.view.flxAddEmail.reverseLayoutDirection = true;
      this.view.flx0001.reverseLayoutDirection = true;
      this.view.flxData.reverseLayoutDirection = true;
      this.view.flxchangeAddressButton.reverseLayoutDirection = true;
      this.view.flxMyInfo.reverseLayoutDirection = true;
    
       var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
    }
    else
      {
        this.view.lblMyInformation.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.lblprimaryNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblSecondaryNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblSecondaryPhoneNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblprimaryEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblEmail02.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblSecondaryEmail.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblAddress.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblCity.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblState.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblCountry.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblPincode.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblAddressTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.flx01.reverseLayoutDirection = false;
        this.view.flx02.reverseLayoutDirection = false;
        this.view.flxAddIMgAndLbl.reverseLayoutDirection = false;
        this.view.flx001.reverseLayoutDirection = false;
        this.view.flx101.reverseLayoutDirection = false;
        this.view.flx102.reverseLayoutDirection = false;
        this.view.flxAddEmail.reverseLayoutDirection = false;
        this.view.flx0001.reverseLayoutDirection = false;
        this.view.flxData.reverseLayoutDirection = false;
        this.view.flxchangeAddressButton.reverseLayoutDirection = false;
        this.view.flxMyInfo.reverseLayoutDirection = false;
        this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
      }
    this.view.lblMyInformation.text = voltmx.i18n.getLocalizedString("My info");
    this.view.lblprimaryNumber.text = voltmx.i18n.getLocalizedString("Primary Number");
    this.view.lblSecondaryNumber.text = voltmx.i18n.getLocalizedString("Secondary Number");
    this.view.lblprimaryEmail.text = voltmx.i18n.getLocalizedString("Primary Email");
    this.view.lblSecondaryEmail.text = voltmx.i18n.getLocalizedString("Secondary Email");
    this.view.lblAddressTittle.text = voltmx.i18n.getLocalizedString("Address Book");
    this.view.btnchngeaddress.text = voltmx.i18n.getLocalizedString("Update Address");
    
  },
  
  
  validateEmail: function () {
  var email = this.view.txtMail.text;  // Replace with your textbox ID
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && emailRegex.test(email)) {
    voltmx.print("Valid Email: " + email);
    this.view.lblError.setVisibility(false);
  } else {
    this.view.lblError.text = "* Please enter a valid email address.";
    this.view.lblError.setVisibility(true);
    voltmx.print("Invalid Email: " + email);
  }
},
  
  validateUAEMobileNumber: function () {
  var mobile = this.view.CopytbxPhoneNumber0c3ff2b0d62e94c.text.trim(); // your input textbox
  var regex = /^(?:9715[0-9]{8}|05[0-9]{8})$/;

  if (regex.test(mobile)) {
    voltmx.print("Valid UAE Mobile Number: " + mobile);
    //this.view.lblMobileError.setVisibility(false);
    return true;
  } else {
    voltmx.print("Invalid UAE Mobile Number: " + mobile);
    this.view.lblMobileError.text = "* Please enter a valid UAE mobile number.";
  //  this.view.lblMobileError.setVisibility(true);
    return false;
  }
},
  

checkAllAddressFields: function () {
 var building = this.view.tbxBuildingName.text ? this.view.tbxBuildingName.text.trim() : "";
  var street = this.view.txtStreetName.text ? this.view.txtStreetName.text.trim() : "";
  var city = this.view.txtCity.text ? this.view.txtCity.text.trim() : "";
  var po = this.view.txtPO.text ? this.view.txtPO.text.trim() : "";
  var allFilled = building !== "" && street !== "" && city !== "" && po !== "";

  if (allFilled) {
    this.view.btnConfirm.setEnabled(true);
    this.view.btnConfirm.skin = "sknBtnBid61B35C8pxradius"; // Optional: add active skin
  } else {
    this.view.btnConfirm.setEnabled(false);
   this.view.btnConfirm.skin = "sknBtnececec8pxradius"; // Optional: add disabled skin
  }
},

 
empty: function(){
this.view.tbxBuildingName.text = "";
this.view.txtStreetName.text = "";
this.view.txtCity.text = "";
this.view.txtPO.text = "";
}
  


});