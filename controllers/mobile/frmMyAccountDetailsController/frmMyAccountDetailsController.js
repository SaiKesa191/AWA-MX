define({ 



  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this); 
    this.setData();
    this.view.flxBack.onClick =  this.backToMyProfile;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction.bind(this);
  },



  backToMyProfile: function(){
    var ntf = new voltmx.mvc.Navigation("frmProfile");
    ntf.navigate();
  },


  onPreShow: function(){
    this.toggleFooterIcons();
    this.getAccountDetails();
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

  //   getAccountDetails: function(){
  //     var self = this;
  //         var get_user_bank_details_inputparam = {};
  //       var user_id = voltmx.store.getItem("userId");
  //      var user_token = voltmx.store.getItem("getUserAccesstoken");
  //     get_user_bank_details_inputparam["serviceID"] = "fry_int_user$get-user-bank-details";
  //     get_user_bank_details_inputparam["user_id"] = user_id;
  //     var get_user_bank_details_httpheaders = {
  //       "user_token" : user_token
  //     };
  //     get_user_bank_details_inputparam["httpheaders"] = get_user_bank_details_httpheaders;
  //     var get_user_bank_details_httpconfigs = {};
  //     get_user_bank_details_inputparam["httpconfig"] = get_user_bank_details_httpconfigs;
  //     fry_int_user$get_user_bank_details = 
  //       mfintegrationsecureinvokerasync(get_user_bank_details_inputparam, 
  //                                       "fry_int_user", 
  //                                       "get-user-bank-details",
  //                                       function(status,response){
  //       voltmx.print(status);
  //       voltmx.print(response);
  //       if (response && Array.isArray(response.records) && response.records.length > 0) {
  //   var record = response.records[0];
  //   self.view.lblAccountNameValue.text = record.bank_account_name || "N/A";
  //   self.view.lblAccountNumberValue.text = record.bank_account_number || "N/A";
  //   self.view.lblIbanNumberValue.text = record.iban || "N/A";
  // }
  //     });
  //   },


  //there is no account details for buyer!!
  getAccountDetails: function(){

    var self = this;
    var seller_buyer_info_inputparam = seller_buyer_info_inputparam || {};
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var user_id = voltmx.store.getItem("userId");
    seller_buyer_info_inputparam["serviceID"] = "fry_int_common$seller-buyer-info";
    seller_buyer_info_inputparam["user_id"] = user_id;
    var seller_buyer_info_httpheaders = {};
    seller_buyer_info_inputparam["httpheaders"] = seller_buyer_info_httpheaders;
    var seller_buyer_info_httpconfigs = {
      "user_token" : user_token
    };
    seller_buyer_info_inputparam["httpconfig"] = seller_buyer_info_httpconfigs;
    fry_int_common$seller_buyer_info =
      mfintegrationsecureinvokerasync(seller_buyer_info_inputparam, 
                                      "fry_int_common", "seller-buyer-info", 
                                      function(status, response){
      voltmx.print("response"+response);

      if(!response){
        voltmx.print("No Response");
        return;
      }
      
      if(response.opstatus === 1011){
      self.view.flxError.setVisibility(true);
      }
      
      if (response && Array.isArray(response.records) && response.records.length > 0) {
        var record = response.records[0];
        self.view.lblAccountNameValue.text = record.bank_account_name || "N/A";
        self.view.lblAccountNumberValue.text = record.bank_account_number || "N/A";
        self.view.lblIbanNumberValue.text = record.iban || "N/A";
      }
      
    });  
  },



  
    flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.getAccountDetails();
    } else {
      voltmx.print("Still offline...");
    }
  },



  setData: function()
  {
    if(voltmx.i18n.getCurrentLocale() === "ar_AE") {
      this.view.lblTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblIBANNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAccountnametype.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAccountNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblIbanNumberValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAccountNameValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.lblAccountNumberValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = true;
      this.view.flxMyAccountDetails.reverseLayoutDirection = true;
      var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
    }
    else {
      this.view.lblTittle.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblIBANNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblAccountnametype.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblAccountNumber.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblIbanNumberValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblAccountNameValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblAccountNumberValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = false;
      this.view.flxMyAccountDetails.reverseLayoutDirection = false;
      this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
    }
    
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
  }
});



