define({ 

  onNavigate: function(data)
  {
    var self = this;
    try{
    if(data && data.navForm){
      this.navForm = data.navForm;
      this.action = data.action;
      
    }
    
    this.view.preShow = this.onPreShow.bind(this);
    if(this.view && this.view.btnAccountDetails){
    self.view.btnAccountDetails.onClick = () =>{
      self.view.flxAccountDetailsContainer.setVisibility(true);
    };
    }
    if(this.view && this.view.btnPrevious){
    self.view.btnPrevious.onClick =  self.navAuctionType;
    }
    this.invokeGetBuyerSecurityDeposit();
    if(this.view && this.view.btnClose){
    self.view.btnClose.onClick = () =>{
      self.view.flxAccountDetailsContainer.setVisibility(false);
    };
    }

     if(this.view && this.view.flxUploadSlip){
    self.view.flxUploadSlip.onClick = () => {
      const amountText = self.view.requireAmtToDeposit.text;
      const limitText = self.view.lblReqBiddingLimit.text;
      const hasDigit = /\d/;  
      if (!hasDigit.test(amountText) || !hasDigit.test(limitText)) {
        alert("Please select BID amount and Amount to deposit!");
      } else {
        voltmx.store.setItem("requireAmtToDeposit",self.depositAmount);
        new voltmx.mvc.Navigation("frmBankTransferorDeposit").navigate();
      }
    }
    }
     
      this.Addingi18nKeys();
    
    if(this.view && this.view.flxDropDown){
    self.view.flxDropDown.onClick = self.flxDropDownOnClickAction;
    }
    if(this.view && this.view.segDepositAmount){
    self.view.segDepositAmount.onRowClick = self.segTypesOnRowClickAction;
    }
    if(this.view && this.view.flxBack){
    self.view.flxBack.onClick = self.navAuctionType;
    }
    if(this.view && this.view.flxError && this.view.flxError.btnTryAgain){
    self.view.flxError.btnTryAgain.onClick = self.flxErrorBtnTryAgainOnClickAction;
    }
    }
    catch(e)
      {
        
      }
    },
  
  
  
  
//   Addingi18nKeys: function () {
//     var self = this;
//     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//     var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
//     var direction = isArabic;
//       if(isArabic){
//         var flipTransform = voltmx.ui.makeAffineTransform();
//     flipTransform.scale(-1, 1); // horizontal flip
//     this.view.imgArrow.transform = flipTransform;
//          this.view.flxBack.left = null;
//   this.view.flxBack.right = "5%";
      
//     }
//     else{
//        this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
      
//   this.view.flxBack.left = "5%";
//   this.view.flxBack.right = null;
//     }
    
    
//     var labelList = [
//       "lblVehicles",
//       "lblPaymentMethod",
//       "lblPaymentMethodValue",
//       "lblSpecifyTheBiddingLimit",
//       "lblYourBiddingLimit",
//       "lblReqBiddingLimit",
//       "requireAmtToDeposit",
//       "lblBiddingLimitWillBe",
//       "lblShowBiddingLimit",
//       "lblHaveYouMadeABank",
//       "lblAlwataneyaAuctionBankAccountsHeading"
//     ];
//     var calendarList = [
//       "",
//     ];
//     for (var i = 0; i < calendarList.length; i++) {
//       if (this.view[calendarList[i]]) {
//         this.view[calendarList[i]].contentAlignment = labelAlignment;
//       }
//     }
//     for (var i = 0; i < labelList.length; i++) {
//       if (this.view[labelList[i]]) {
//         this.view[labelList[i]].contentAlignment = labelAlignment;
//       }
//     }
//     var flexList = [
//       "flxArrow", 
//       "flxVehicles",
//       "flxPaymentMethod",
//       "flxReqBiddingContainer",
//       "flxSelect",
//       "flxUpload",
//       "flxButtons",
//       "flxAlwataneyaAuctionBankContainer",
//       "flxShareInner",
//     ];

//     for (var j = 0; j < flexList.length; j++) {
//       if (this.view[flexList[j]]) {
//         this.view[flexList[j]].reverseLayoutDirection = direction;
//       }
//     }
//     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
//     this.view.lblAuctionType.text=voltmx.i18n.getLocalizedString("Auction Type");    
//     this.view.lblpaymentType.text = voltmx.i18n.getLocalizedString("Payment Method");   
//     this.view.lblPaymentMethod.text = voltmx.i18n.getLocalizedString("Payment Method");  
//     this.view.lblPaymentMethodValue.text = voltmx.i18n.getLocalizedString("Bank Deposit / Transfer");
//     this.view.lblpayupload.text=voltmx.i18n.getLocalizedString("Pay/Upload"); 
//     this.view.lblVehicles.text=voltmx.i18n.getLocalizedString("Vehicles");
//     this.view.lblSpecifyTheBiddingLimit.text = voltmx.i18n.getLocalizedString("Specify the Bidding Limit You require");
//     this.view.lblYourBiddingLimit.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly updated once your online  payment is successful.");
//     this.view.lblHaveYouMadeABank.text = voltmx.i18n.getLocalizedString("Have you made a bank deposit or transfer?");
//     this.view.lblBiddingLimitWillBe.text = voltmx.i18n.getLocalizedString("Your new bidding limit will be");
//     this.view.btnPrevious.text = voltmx.i18n.getLocalizedString("PREVIOUS");
//     this.view.lblUploadSlip.text = voltmx.i18n.getLocalizedString("Upload Slip");
//     this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
//     this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
//     this.view.btnAccountDetails.text = voltmx.i18n.getLocalizedString("accountDetails");
//     this.view.lblAlwataneyaAuctionBankAccountsHeading.text = voltmx.i18n.getLocalizedString("AlwataneyaAuctionBankAccounts");
//     this.view.lblBankName.text = voltmx.i18n.getLocalizedString("AlwataneyaIslamicBank");
//     this.view.lblShareAccountDetails.text = voltmx.i18n.getLocalizedString("ShareAccountDetails");
//     this.view.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
//     this.view.lblNoDataFound.text =  voltmx.i18n.getLocalizedString("No Records");
//   },
  
  Addingi18nKeys: function () {
    var self = this;
    try{
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign = isArabic
        ? constants.TEXT_ALIGN_RIGHT
        : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;

    if (isArabic) {

        if (self.view && self.view.imgArrow) {
            var flipTransform = voltmx.ui.makeAffineTransform();
            flipTransform.scale(-1, 1);
            self.view.imgArrow.transform = flipTransform;
        }

        if (self.view && self.view.flxBack) {
            self.view.flxBack.left = null;
            self.view.flxBack.right = "5%";
        }

    } else {

        if (self.view && self.view.imgArrow) {
            self.view.imgArrow.transform =
                voltmx.ui.makeAffineTransform();
        }

        if (self.view && self.view.flxBack) {
            self.view.flxBack.left = "5%";
            self.view.flxBack.right = null;
        }
    }

    var labelList = [
        "lblVehicles",
        "lblPaymentMethod",
        "lblPaymentMethodValue",
        "lblSpecifyTheBiddingLimit",
        "lblYourBiddingLimit",
        "lblReqBiddingLimit",
        "requireAmtToDeposit",
        "lblBiddingLimitWillBe",
        "lblShowBiddingLimit",
        "lblHaveYouMadeABank",
        "lblAlwataneyaAuctionBankAccountsHeading"
    ];

    var calendarList = [
        ""
    ];

    for (var i = 0; i < calendarList.length; i++) {
        if (
            self.view &&
            calendarList[i] &&
            self.view[calendarList[i]]
        ) {
            self.view[calendarList[i]].contentAlignment =
                labelAlignment;
        }
    }

    for (var j = 0; j < labelList.length; j++) {
        if (
            self.view &&
            labelList[j] &&
            self.view[labelList[j]]
        ) {
            self.view[labelList[j]].contentAlignment =
                labelAlignment;
        }
    }

    var flexList = [
        "flxArrow",
        "flxVehicles",
        "flxPaymentMethod",
        "flxReqBiddingContainer",
        "flxSelect",
        "flxUpload",
        "flxButtons",
        "flxAlwataneyaAuctionBankContainer",
        "flxShareInner"
    ];

    for (var k = 0; k < flexList.length; k++) {
        if (
            self.view &&
            flexList[k] &&
            self.view[flexList[k]]
        ) {
            self.view[flexList[k]].reverseLayoutDirection =
                direction;
        }
    }

    if (
        self.view &&
        self.view.flxHeaderNew &&
        self.view.flxHeaderNew.btnChangeLang
    ) {
        self.view.flxHeaderNew.btnChangeLang.text =
            voltmx.i18n.getLocalizedString("changeLang");
    }

    if (self.view && self.view.lblAuctionType) {
        self.view.lblAuctionType.text =
            voltmx.i18n.getLocalizedString("Auction Type");
    }

    if (self.view && self.view.lblpaymentType) {
        self.view.lblpaymentType.text =
            voltmx.i18n.getLocalizedString("Payment Method");
    }

    if (self.view && self.view.lblPaymentMethod) {
        self.view.lblPaymentMethod.text =
            voltmx.i18n.getLocalizedString("Payment Method");
    }

    if (self.view && self.view.lblPaymentMethodValue) {
        self.view.lblPaymentMethodValue.text =
            voltmx.i18n.getLocalizedString(
                "Bank Deposit / Transfer"
            );
    }

    if (self.view && self.view.lblpayupload) {
        self.view.lblpayupload.text =
            voltmx.i18n.getLocalizedString("Pay/Upload");
    }

    if (self.view && self.view.lblVehicles) {
        self.view.lblVehicles.text =
            voltmx.i18n.getLocalizedString("Vehicles");
    }

    if (self.view && self.view.lblSpecifyTheBiddingLimit) {
        self.view.lblSpecifyTheBiddingLimit.text =
            voltmx.i18n.getLocalizedString(
                "Specify the Bidding Limit You require"
            );
    }

    if (self.view && self.view.lblYourBiddingLimit) {
        self.view.lblYourBiddingLimit.text =
            voltmx.i18n.getLocalizedString(
                "Your bidding limit will be instantly updated once your online payment is successful."
            );
    }

    if (self.view && self.view.lblHaveYouMadeABank) {
        self.view.lblHaveYouMadeABank.text =
            voltmx.i18n.getLocalizedString(
                "Have you made a bank deposit or transfer?"
            );
    }

    if (self.view && self.view.lblBiddingLimitWillBe) {
        self.view.lblBiddingLimitWillBe.text =
            voltmx.i18n.getLocalizedString(
                "Your new bidding limit will be"
            );
    }

    if (self.view && self.view.btnPrevious) {
        self.view.btnPrevious.text =
            voltmx.i18n.getLocalizedString("PREVIOUS");
    }

    if (self.view && self.view.lblUploadSlip) {
        self.view.lblUploadSlip.text =
            voltmx.i18n.getLocalizedString("Upload Slip");
    }

    if (self.view && self.view.requireAmtToDeposit) {
        self.view.requireAmtToDeposit.text =
            voltmx.i18n.getLocalizedString(
                "Enter Required Amount to deposit"
            );
    }

    if (self.view && self.view.lblReqBiddingLimit) {
        self.view.lblReqBiddingLimit.text =
            voltmx.i18n.getLocalizedString(
                "Enter Required Bidding Limit"
            );
    }

    if (self.view && self.view.btnAccountDetails) {
        self.view.btnAccountDetails.text =
            voltmx.i18n.getLocalizedString(
                "accountDetails"
            );
    }

    if (
        self.view &&
        self.view.lblAlwataneyaAuctionBankAccountsHeading
    ) {
        self.view.lblAlwataneyaAuctionBankAccountsHeading.text =
            voltmx.i18n.getLocalizedString(
                "AlwataneyaAuctionBankAccounts"
            );
    }

    if (self.view && self.view.lblBankName) {
        self.view.lblBankName.text =
            voltmx.i18n.getLocalizedString(
                "AlwataneyaIslamicBank"
            );
    }

    if (self.view && self.view.lblShareAccountDetails) {
        self.view.lblShareAccountDetails.text =
            voltmx.i18n.getLocalizedString(
                "ShareAccountDetails"
            );
    }

    if (self.view && self.view.btnClose) {
        self.view.btnClose.text =
            voltmx.i18n.getLocalizedString(
                "closeCaps"
            );
    }

    if (self.view && self.view.lblNoDataFound) {
        self.view.lblNoDataFound.text =
            voltmx.i18n.getLocalizedString(
                "No Records"
            );
    }
    }catch(e)
      {
        
      }
},
  
  
  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.invokeGetBuyerSecurityDeposit();
      this.getDepositLimit();
    } else {
      voltmx.print("Still offline...");
    }
  },
  
  
  
  
  navAuctionType: function(){
    var self = this;
    try{
    var flow = voltmx.store.getItem("flow");
    voltmx.print("Previous form is null. Redirecting to default form.");
    if(flow === "security deposit" || self.navForm === "Security deposit"){
      new voltmx.mvc.Navigation("frmSecurityDeposits").navigate(
      {
        "action": self.action
      });  
    }
    else if(flow === "auction type"){
      var nav = new voltmx.mvc.Navigation("frmAuctionType"); 
      nav.navigate();
    }
    else if (self.prevForm.id === "frmBankTransferorDeposit"){
      var nav = new voltmx.mvc.Navigation("frmPaymentType"); 
      nav.navigate();
    }
    var prevFormId = self.prevForm.id;
    if(flow === "security deposit" || self.navForm === "Security deposit"){
      if (prevFormId === "frmPayAndUploadAuctionTypeBankDeposit" ||prevFormId === "frmPayAndUploadAuctionTypeDebitCard" 
          || prevFormId === "frmBankTransferorDeposit") {
        nav = new voltmx.mvc.Navigation("frmSecurityDeposits");
        nav.navigate(
        {
            "action": self.action
        });
      } 
    }
    else if(flow === "auction type"){
      if (prevFormId === "frmPayAndUploadAuctionTypeBankDeposit" ||prevFormId === "frmPayAndUploadAuctionTypeDebitCard"  ) {
        nav = new voltmx.mvc.Navigation("frmAuctionType");
        nav.navigate();
      } 
      else if (prevFormId === "frmBankTransferorDeposit"){
        nav = new voltmx.mvc.Navigation("frmPaymentType");  // <-- Set your fallback screen here
        nav.navigate();
      }
      else {
        nav = new voltmx.mvc.Navigation(prevFormId);
        nav.navigate();
      }
    }
    }
    catch(e)
      {
        
      }
  },
  
  
  
  
  onPreShow: function()
  {
    var self = this;
    try{
    this.toggleFooterIcons();
    this.getDepositLimit();
    this.getBankAccountDetails();
    this.loadDetailsAgain();
    this.prevForm = voltmx.application.getPreviousForm();
    if (previousForm) {
      var previousForm = voltmx.application.getPreviousForm();
      if (previousForm) {
        var id = previousForm.id;
        var formsToDestroy = ["frmRegister2","frmRegister1"];
        if (formsToDestroy.includes(id)) {
          voltmx.application.destroyForm(id);
        }
      }
    }  
    }
    catch(e)
      {
        
      }
  },
  
  
  
  
  loadDetailsAgain: function(){
  },

  
  getDepositLimit: function(){
    var self = this;
    try{
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var master_chipset_limits_inputparam = {};
    master_chipset_limits_inputparam["serviceID"] = "fry_int_user$master-chipset-limits";
    var master_chipset_limits_httpheaders = {};
    master_chipset_limits_inputparam["httpheaders"] = master_chipset_limits_httpheaders;
    var master_chipset_limits_httpconfigs = {};
    master_chipset_limits_inputparam["httpconfig"] = master_chipset_limits_httpconfigs;
    fry_int_user$master_chipset_limits = 
      mfintegrationsecureinvokerasync(master_chipset_limits_inputparam,
                                      "fry_int_user", 
                                      "master-chipset-limits",
                                      function(status,response){
      voltmx.print("Status : "+status);
      voltmx.print("Response :"+response);

      if( response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
      if (status !== 400 || !response) {
        voltmx.print("Service call failed or no response");
        self.view.segDepositAmount.setData([]);
        return;
      }
      if (!response.records || !Array.isArray(response.records) || response.records.length === 0) {
        voltmx.print("No records in response");
        self.view.segDepositAmount.setData([]);
        return;
      }
      if(response.records){
        var data = response.records;
        self.fullChipsetData = data;
        var segData =[];
        data.forEach(res=>{
          var maxBid = res.max_bid;
          var deposit_limit = res.deposit_limit;
          var entry_id = res.entry_id;
          segData.push({
            "lblDepositLimit":{
              "text": deposit_limit,
              "skin": "sknlblBlackDuabiold",
              "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
            },
            "lblMaxBid": {
              "text": maxBid,
              "skin": "sknlblBlackDuabiold",
              "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
            },
            "entry_id": res.entry_id,
            "flxContainer":{
              "reverseLayoutDirection": isArabic,
              "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
            },
          });
        });
       // self.view.segDepositAmount.setData(segData);
        if (self.view && self.view.segDepositAmount) {
  self.view.segDepositAmount.setData(segData);
} else {
  voltmx.print('self.view.segDepositAmount is not available yet.');
}
      }
    });
    }
    catch(e)
      {
        
      }
  },
  
  
  
  
  invokeGetBuyerSecurityDeposit: function()
  {
    var self = this;
    try{
    function invokeBuyerSecurityCallBack(status, get_buyer_security_deposit) {
      if (
        get_buyer_security_deposit &&
        Array.isArray(get_buyer_security_deposit.security_deposit_details) &&
        get_buyer_security_deposit.security_deposit_details.length > 0 &&
        get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit !== undefined
      ) {
        self.originallimit = get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit;
      } else {
        if(get_buyer_security_deposit.opstatus ===1011){
          self.view.flxError.btnTryAgain.setVisibility(true);
        }
        voltmx.print("Bidding limit not available");
        self.originallimit = 0; 
      }
      //self.view.lblShowBiddingLimit.text = self.originallimit;
      if (self.view && self.view.lblShowBiddingLimit) {
  self.view.lblShowBiddingLimit.text = self.originallimit;
} else {
  voltmx.print('self.view.lblShowBiddingLimit is not available.');
}
    }
    if (get_buyer_security_deposit_inputparam == undefined) {
      var get_buyer_security_deposit_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_security_deposit_inputparam["serviceID"] = "fry_wf$get-buyer-security-deposit";
    get_buyer_security_deposit_inputparam["user_id"] = userid;
    var get_buyer_security_deposit_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_security_deposit_inputparam["httpheaders"] = get_buyer_security_deposit_httpheaders;
    var get_buyer_security_deposit_httpconfigs = {};
    get_buyer_security_deposit_inputparam["httpconfig"] = get_buyer_security_deposit_httpconfigs;
    fry_wf$get_buyer_security_deposit = mfintegrationsecureinvokerasync(get_buyer_security_deposit_inputparam, "fry_wf", "get-buyer-security-deposit", invokeBuyerSecurityCallBack);
    }
    catch(e)
      {
        
      }
    },
  
  
  
  
  toggleFooterIcons: function () {
    var self = this;

    if (!self.view || !self.view.Footer2) {
        return;
    }

    if (self.view.Footer2.flxHL1) {
        self.view.Footer2.flxHL1.setVisibility(false);
    }

    if (self.view.Footer2.flxHL2) {
        self.view.Footer2.flxHL2.setVisibility(false);
    }

    if (self.view.Footer2.flxHL3) {
        self.view.Footer2.flxHL3.setVisibility(false);
    }

    if (self.view.Footer2.flxHL4) {
        self.view.Footer2.flxHL4.setVisibility(false);
    }

    if (self.view.Footer2.flxHL5) {
        self.view.Footer2.flxHL5.setVisibility(true);
    }

    if (self.view.Footer2.imgHome) {
        self.view.Footer2.imgHome.src = "homefooter.png";
    }

    if (self.view.Footer2.lblHome) {
        self.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
    }

    if (self.view.Footer2.imgMegaPhone) {
        self.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    }

    if (self.view.Footer2.lblAuctions) {
        self.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
    }

    if (self.view.Footer2.lblSellCar) {
        self.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100";
    }

    var mode = voltmx.store.getItem("mode") || "seller";

    if (mode === "seller") {

        if (self.view.Footer2.imgMyBids) {
            self.view.Footer2.imgMyBids.src = "mylistings.png";
        }

        if (self.view.Footer2.lblMyBids) {
            self.view.Footer2.lblMyBids.text = "Listings";
        }

    } else {

        if (self.view.Footer2.imgMyBids) {
            self.view.Footer2.imgMyBids.src = "mybidsfooter.png";
        }

        if (self.view.Footer2.lblMyBids) {
            self.view.Footer2.lblMyBids.text = "My Bids";
        }
    }

    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");

    if (isLogin === true && isUserCreated === true) {

        if (self.view.Footer2.imgSellCar) {
            self.view.Footer2.imgSellCar.setVisibility(false);
        }

        if (self.view.Footer2.flxProfile) {
            self.view.Footer2.flxProfile.setVisibility(true);
        }

    } else {

        if (self.view.Footer2.imgSellCar) {
            self.view.Footer2.imgSellCar.setVisibility(true);
        }

        if (self.view.Footer2.flxProfile) {
            self.view.Footer2.flxProfile.setVisibility(false);
        }
    }
},
  
  
  
  
  flxDropDownOnClickAction: function(){
    var self = this;
    try{
    if(this.view.imgUpArrow && this.view.imgUpArrow.isVisible){
      this.view.flxDocTypeDropDownList.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
      this.view.imgUpArrow.setVisibility(false);
    }
    else if(this.view.imgDropDown && this.view.imgDropDown.isVisible){
      this.view.flxDocTypeDropDownList.setVisibility(true);
      this.view.imgUpArrow.setVisibility(true);
      this.view.imgDropDown.setVisibility(false);
    }
    }
    catch(e)
      {}
  },
  
  
  
  
  segTypesOnRowClickAction: function() {
    var self = this;
    try{
    var selectedRow = this.view.segDepositAmount.selectedRowItems[0];
    voltmx.print("SelectedRow :" + JSON.stringify(selectedRow));
    var deposit_amt = selectedRow.lblDepositLimit.text;
    var selectedEntryId = selectedRow.entry_id;
    voltmx.store.setItem("deposit_amt", deposit_amt);
    var matchedRecord = this.fullChipsetData.find(function(item) {
      return item.entry_id === selectedEntryId;
    });
    if (matchedRecord) {
      var maxBid = Number(matchedRecord.max_bid);
      this.newbidlimit = Number(this.originallimit || 0) + maxBid;
      this.view.lblShowBiddingLimit.text = this.newbidlimit.toLocaleString('en-US');
      this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("You need to deposit (AED)") + deposit_amt;
      this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("To get (Bidding Limit)") + maxBid;
      this.depositAmount = deposit_amt;
      voltmx.store.setItem("bid_limit", maxBid);
      this.view.flxDocTypeDropDownList.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
      this.view.imgUpArrow.setVisibility(false);
    } else {
      voltmx.print("No matching record found for entry_id: " + selectedEntryId);
    }
    }
    catch(e)
      {}
  },
  
  
  
  
  getBankAccountDetails: function() {
    var self = this;
    try{
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var config_decrypt_inputparam = {};
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var appKey     = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appSecret  = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");    
    config_decrypt_inputparam["serviceID"] = "ms_config$config-decrypt";
    config_decrypt_inputparam["app_key"] = appKey;
    config_decrypt_inputparam["app_secret"] = appSecret;
    config_decrypt_inputparam["config_key"] = "awa_auction_bank_accounts";
    var config_decrypt_httpheaders = {
      "user_token": user_token
    };
    config_decrypt_inputparam["httpheaders"] = config_decrypt_httpheaders;
    var config_decrypt_httpconfigs = {};
    config_decrypt_inputparam["httpconfig"] = config_decrypt_httpconfigs;
    ms_config$config_decrypt = 
      mfintegrationsecureinvokerasync(config_decrypt_inputparam, 
                                      "ms_config",
                                      "config-decrypt",
                                      function(status, response){
      voltmx.print(status);
      voltmx.print(response);
      if(response || response.data){
//         self.view.flxNoDataFound.setVisibility(false);  
        if (self.view && self.view.flxNoDataFound) {
  self.view.flxNoDataFound.setVisibility(false);
} else {
  voltmx.print('self.view.flxNoDataFound is not available.');
}
        if (!response || !response.data || typeof response.data !== "string") {
          voltmx.print("Invalid response or response.data is missing.");
          voltmx.print("Invalid response or response.data is missing.");
          return;
        }
        if(response.opstatus === 1011){
          self.view.flxError.btnTryAgain.setVisibility(true);
        }
        var rawString = response.data; 
        var fixedString = rawString
        .replace(/^{|}$/g, '')
        .split(', ')
        .map(pair => {
          var [key, value] = pair.split('=');
          return `"${key.trim()}":"${value.trim()}"`;
        })
        .join(',');
        var jsonString = `{${fixedString}}`;
        var parsedData = JSON.parse(jsonString);
        voltmx.print(parsedData.bank);  
        var bank = parsedData.bank;
        self.view.lblBankName.text = bank;
        var account_name = parsedData.account_name;
        var iban        = parsedData.iban;
        var account_number = parsedData.account_number;
        var swift_code = parsedData.swift_code;
        var routing_number = parsedData.routing_number;
                var data = [
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("bank"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": {
                         "text" : bank,
                   "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("Account Name"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue": {
                      "text" : account_name,
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("Account Number"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue":{
                      "text" :  account_number,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("iban"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": 
                    {
                       "text" : iban,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "imgCopy": {
                      "isVisible": false
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("swiftCode"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                    },
                    "lblBankAccountDetailsValue": 
                    {
                      "text" : swift_code,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {
                      "isVisible": true,
                      "src": "copy512h.png"
                    },
                    "flximgCopy": {
                      "isVisible": true,
                      "onClick": self.onCopyClicked.bind(self, swift_code)
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                  {
                    "lblBankAccountDetailsKey"  : 
                    {
                      "text" : voltmx.i18n.getLocalizedString("routingNumber"),
                      "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "lblBankAccountDetailsValue": 
                    {
                      "text" : routing_number,
                                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                    },
                    "imgCopy": {"isVisible": true, "src": "copy512h.png"  },
                    "flximgCopy": {
                      "isVisible": true,
                      "onClick": self.onCopyClicked.bind(self, routing_number)
                    },
                    "flxBankAccountDetails" : {
                      "reverseLayoutDirection": isArabic,
                      "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                    }
                  },
                ];
                self.view.segBankDetails.setData(data);
      }
      else{
        self.view.flxNoDataFound.setVisibility(true);  
      }
    });
    }
    catch(e)
      {}
  },
  
  
  
  
  onCopyClicked: function (value) {
    try{
    if (value) {
      alert("Copied to clipboard:\n" + value);
    } else {
      alert("No data to copy.");
    }
    }
    catch(e)
      {}
  }
  
  
  
  
});