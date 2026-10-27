define({ 

  onNavigate: function() {    
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxdebitCard.onClick = () => {
      new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeDebitCard").navigate();
    }
    this.view.flxBankDeposit.onClick = () => new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeBankDeposit").navigate();
    this.view.flxCheque.onClick = () => new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeCheque").navigate();
    this.view.flxBack.onClick = this.navAuctionType.bind(this);
  },




  onPreShow: function(){
    this.toggleFooterIcons();
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
      var id = previousForm.id;
      var formsToDestroy = ["frmPayAndUploadAuctionTypeBankDeposit","frmPayAndUploadAuctionTypeBankDeposit"];
      if (formsToDestroy.includes(id)) {
        voltmx.application.destroyForm(id);
      }
    }
  },




  toggleFooterIcons: function(){
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
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    }
    var isLogin = voltmx.store.getItem("isLogin");
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




  navAuctionType: function(){
    var preform = voltmx.store.getItem("lastFormIdPay");
    var prevForm = voltmx.application.getPreviousForm();
    var flow = voltmx.store.getItem("flow");
    if (!prevForm || !prevForm.id) {
      voltmx.print("Previous form is null. Redirecting to default form.");
      if(flow === "security deposit"){
        var nav = new voltmx.mvc.Navigation("frmSecurityDeposits");  
        nav.navigate();
      }
      else if(flow === "auction type"){
        var nav = new voltmx.mvc.Navigation("frmAuctionType");  
        nav.navigate();
      }
      return;
    }
    var prevFormId = prevForm.id;
    if(flow === "security deposit"){
      if (prevFormId === "frmPayAndUploadAuctionTypeBankDeposit" ||prevFormId === "frmPayAndUploadAuctionTypeDebitCard"|| "frmPayAndUploadAuctionTypeCheque" ) {
        var nav = new voltmx.mvc.Navigation("frmSecurityDeposits");
        nav.navigate();
      } else {
        var nav = new voltmx.mvc.Navigation(prevFormId);
        nav.navigate();
      }
    }
    else if(flow === "auction type"){
      if (prevFormId === "frmPayAndUploadAuctionTypeBankDeposit" ||prevFormId === "frmPayAndUploadAuctionTypeDebitCard"|| "frmPayAndUploadAuctionTypeCheque") {
        var nav = new voltmx.mvc.Navigation("frmAuctionType");
        nav.navigate();
      } else {
        var nav = new voltmx.mvc.Navigation(prevFormId);
        nav.navigate();
      }
    }
    else
      {
        var nav = new voltmx.mvc.Navigation(prevFormId);
        nav.navigate();
      }
  },




  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
    this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
    this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
    this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
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
      "lblpaymentmethod","lblContent","lblBankDepositContent1","lblBankDepositContent2",
      "lblChequeContent1","lblChequeContent2","lblContent"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flx01","flxvehicle","flxHeadingDebitCard","flxInnerdebitCard","flxBankDepositOrTransfer",
      "flxInnerBankDepositOrTransfer","flxChequeHeading","flxInnerCheque","flxArrow",
      "flxContent"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }     
    this.view.lblAuctionType.text=voltmx.i18n.getLocalizedString("Auction Type");    
    this.view.lblpaymentType.text=voltmx.i18n.getLocalizedString("Payment Method");    
    this.view.lblpayupload.text=voltmx.i18n.getLocalizedString("Pay/Upload");    
    this.view.Label0d6007de804d245.text=voltmx.i18n.getLocalizedString("Vehicles");
    this.view.lblpaymentmethod.text=voltmx.i18n.getLocalizedString("Select Payment Method ");  
    this.view.lblDebitOrCreditCard.text=voltmx.i18n.getLocalizedString("Debit / Credit Card");
    this.view.lblBankDepositOrTransfer.text=voltmx.i18n.getLocalizedString("Bank Deposit / Transfer");
    this.view.lblCheque.text=voltmx.i18n.getLocalizedString("Cheque");
    this.view.lblContent.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly updated once your online payment is successful");
    this.view.lblBankDepositContent1.text = voltmx.i18n.getLocalizedString("Must submit a bank receipt");                                 
    this.view.lblBankDepositContent2.text = voltmx.i18n.getLocalizedString("Your bank receipt processing may");
    this.view.lblChequeContent1.text = voltmx.i18n.getLocalizedString("Minimum amount AED");
    this.view.lblChequeContent2.text = voltmx.i18n.getLocalizedString("cheques have to be submitted at payment type");
  }




});