define({ 

  onNavigate: function() {
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnViewBranches.onClick = () => new voltmx.mvc.Navigation("frmBranchesCheck").navigate();
    this.newbidlimit = 0;
    this.Addingi18nKeys();
    this.view.flxArrow.onClick =  this.btnPreviousOnClick;
    this.view.btnPrevious.onClick = this.btnPreviousOnClick;
    this.isNetworkChecked = false;
  },




  onPreShow: function() {
    this.toggleFooterIcons();
    this.invokeGetBuyerSecurityDeposit();
  },




  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    if (isArabic) {
      this.view.flxBack.left = null;
      this.view.flxBack.right = "5%";
      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgArrow.transform = flipTransform;
    } else {
      this.view.flxBack.left = "5%";
      this.view.flxBack.right = null;
      this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
    }
    var labelList = [
      "lblVehicles",
      "lblPaymentInstructions",
      "lblChequeInfo",
      "lblMinimumAmountAED",
      "chequesHaveSubmitted",
      "lblYourBiddingLimit",
      "lblBiddingLimitWillBe",
      "lblNewBidLimit"
    ];
    var calendarList = [
      "",
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
      "flxArrow", 
      "flxToggles",
      "flxVehicles",
      "flxPaymentMethod"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblAuctionType.text = voltmx.i18n.getLocalizedString("Auction Type");    
    this.view.lblpaymentType.text = voltmx.i18n.getLocalizedString("Payment Method");   
    this.view.lblpayupload.text = voltmx.i18n.getLocalizedString("Pay/Upload");   
    this.view.lblVehicles.text = voltmx.i18n.getLocalizedString("Vehicles");
    this.view.lblPaymentMethodValue.text  = voltmx.i18n.getLocalizedString("Cheque");
    this.view.btnPrevious.text = voltmx.i18n.getLocalizedString("PREVIOUS");
    this.view.lblPaymentMethod.text = voltmx.i18n.getLocalizedString("Payment Method"); 
    this.view.btnViewBranches.text = voltmx.i18n.getLocalizedString("view branches");
    this.view.lblPaymentInstructions.text = voltmx.i18n.getLocalizedString("Payment Instructions");
    this.view.lblBiddingLimitWillBe.text = voltmx.i18n.getLocalizedString("Your new bidding limit will be");
    this.view.lblMinimumAmountAED.text  = voltmx.i18n.getLocalizedString("Minimum amount AED");
    this.view.chequesHaveSubmitted.text = voltmx.i18n.getLocalizedString("Cheques have to be submitted at");
    this.view.lblYourBiddingLimit.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly  updated once you submit your security deposit cheque");
  },




  init: function() {
    if (!this.isNetworkChecked) {
      this.isNetworkChecked = true;
      if (!voltmx.net.isNetworkAvailable()) {
        voltmx.print("No network available. Redirecting...");
        var ntf = new voltmx.mvc.Navigation("frmError");
        ntf.navigate();
        return;
      }
    }
  },




  invokeGetBuyerSecurityDeposit: function(){
    var self = this;
    var get_buyer_security_deposit_inputparam = get_buyer_security_deposit_inputparam||{};
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    if (!userid || !usertoken) {
      alert("Missing user ID or token.");
      return;
    }
    get_buyer_security_deposit_inputparam["serviceID"] = "fry_wf$get-buyer-security-deposit";
    get_buyer_security_deposit_inputparam["user_id"] = userid;
    var get_buyer_security_deposit_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_security_deposit_inputparam["httpheaders"] = get_buyer_security_deposit_httpheaders;
    var get_buyer_security_deposit_httpconfigs = {};
    get_buyer_security_deposit_inputparam["httpconfig"] = get_buyer_security_deposit_httpconfigs;
    fry_wf$get_buyer_security_deposit =
      mfintegrationsecureinvokerasync(get_buyer_security_deposit_inputparam, 
                                      "fry_wf",
                                      "get-buyer-security-deposit", 
                                      function  invokeBuyerSecurityCallBack(status, response){
      voltmx.print("Full response: " + JSON.stringify(response));

      if (response.opstatus === 0) {
        if (
          response.security_deposit_details &&
          Array.isArray(response.security_deposit_details) &&
          response.security_deposit_details.length > 0
        ) {
          var amount = response.security_deposit_details[0].avaliable_bidding_limit;
          self.view.lblNewBidLimit.text = amount;
        } else {
          voltmx.print("Empty or missing `security_deposit_details`.");
          alert("No bidding limit data available.");
        }
      } else {
        alert("Error occurred: " + (response.message || "Unknown error"));
      }
    } );
  },




  toggleFooterIcons: function(){
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(true);

    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
    this.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100"; 

    var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
      this.view.Footer2.imgMyBids.src = "mylistings.png";
      this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      this.view.Footer2.lblMyBids.text = "My Bids";
    }
    var isLogin = voltmx.store.getItem("isLogin");
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




  btnPreviousOnClick: function(){
    var flow = voltmx.store.getItem("flow");
    if(flow === "security deposit"){
      var nav = new voltmx.mvc.Navigation("frmSecurityDeposits");
      nav.navigate();
    }
    else{
      var ntf =  new voltmx.mvc.Navigation("frmPaymentType");
      ntf.navigate();
    }
  },




});