define({ 

  onNavigate: function(data) {
    if(data){
      this.action = data.action
    }
    this.view.flxOnlineDeposit.onClick = this.OnlineDepositOnClick.bind(this);
    this.view.flxBankDeposit.onClick = this.BankDepositOnClick.bind(this);
    this.view.flxCheques.onClick = this.ChequesOnClick.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick = this.flxBackOnClick;
    this.Addingi18nKeys();
    this.view.flxUploadPaymentSlip.onClick =  this.navToPayAndUploadBankDepositOrTransferForm.bind(this);
    this.view.flxIncreaseLimit.onClick = this.SecurityDepositFlxIncreaseLimitOnClick;
    this.view.flxBackNavigation.onClick = () => new voltmx.mvc.Navigation("frmOpenMyAccount").navigate();
    this.view.SegDataGrid.onRowClick = function() {
      var selectedIndex = this.view.SegDataGrid.selectedRowIndex[1];
      this.toggleRowVisibilityPending(this.view.SegDataGrid, selectedIndex);
    }.bind(this);
    this.view.SegBankDepositTransfer.onRowClick = function() {
      var selectedIndex = this.view.SegBankDepositTransfer.selectedRowIndex[1];
      this.toggleRowVisibilityPending(this.view.SegBankDepositTransfer, selectedIndex);
    }.bind(this);
    this.view.SegCheque.onRowClick = function() {
      var selectedIndex = this.view.SegCheque.selectedRowIndex[1];
      this.toggleRowVisibilityPending(this.view.SegCheque, selectedIndex);
    }.bind(this);
    this.view.flxdebitCard.onClick = this.flxdebitCardOnClick;
    this.view.flxCheque.onClick = this.flxChequeOnClick;
    this.view.flxBankDepositPaymentType.onClick = this.flxBankDepositContainerOnClickAction;
    this.view.btnLoadMore.onClick = this.btnLoadMoreOnClickAction;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;

  },




  displayAuctionTypes: function(){
    var prevForm = voltmx.application.getPreviousForm();
    var prevFormId = prevForm.id;
    if(this.action){
      if(this.action === "Upload payment slip"){
        this.view.flxScrollMain.setVisibility(true);
        this.view.flxPaymentMethods.setVisibility(false);
      }
      else   if (prevFormId === "frmPayAndUploadAuctionTypeBankDeposit" ||prevFormId === "frmPayAndUploadAuctionTypeDebitCard"||prevFormId === "frmPayAndUploadAuctionTypeCheque" ) {
        if(this.action === "Increase Limit"){
          this.view.flxScrollMain.setVisibility(false);
          this.view.flxPaymentMethods.setVisibility(true);
        }
      }
    }
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.getSecurityDeposit();
    } else {
      voltmx.print("Still offline...");
    }
  },




  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    if (isArabic) {
      this.view.flxBackNavigation.left = null;
      this.view.flxBackNavigation.right = "5%";
      this.view.flxBack.left = null;
      this.view.flxBack.right = "5%";
      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgBackNav.transform = flipTransform;
      this.view.imgBack.transform = flipTransform;
    } else {
      this.view.flxBackNavigation.left = "5%";
      this.view.flxBackNavigation.right = null;
      this.view.imgBackNav.transform = voltmx.ui.makeAffineTransform();
      this.view.flxBack.left = "5%";
      this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
    }
    var labelList = [
      "lblSecurityDepositDetails",
      "lblAvailableSecurityDeposits",
      "lblTotalBiddingLimits",
      "lblCurrentlyUsed",
      "lblTotalBiddingLimits",
      "lblAuctionCalendar",
      "lblCheques",
      "lblChequeAmt",
      "lblTransactionType",
      "lblCheques",
      "lblChequeAmt",
      "lblBankDepOrTransfer",
      "lblpaymentmethod",
      "lblContent",
      "lblBankDepositContent1",
      "lblBankDepositContent2",
      "lblChequeContent1",
      "lblChequeContent2",

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


    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.flxTotalApprovedVehiclesCount.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxServicesCompletedCount.reverseLayoutDirection = isArabic ? true : false;
    this.view.flxPendingCompletionScroll.reverseLayoutDirection = isArabic ? true : false;

    this.view.lblPaidVehiclesCount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblPaidBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblCurrentlyUsedAmount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    var flexList = [
      "flxBackContainer", 
      "flxSecurityDepositDetailsFlexContainer",
      "flxTotalApproved",
      "flxServicesCompleted",
      "flxPendingCompletion1",
      "flxPaidVehiclesAmtCountScroll",
      
      "flxUnderLineContainer",
      "flxOnlineDepositUpper",
      "flxBankDepositUpper",
      "flxChequeUpper",
      "flxPaidVehicles1",
      "flxBankDepositAmount",
      "flxUploadPaymentSlip",
      "flxIncreaseLimit",
      "flxPaidVehiclesCountScroll",
      "flxBackNav",
      "flxSelectPAymentmethod",
      "flxHeadingDebitCard",
      "flxInnerdebitCard",
      "flxBankDepositOrTransfer",
      "flxInnerBankDepositOrTransfer",
      "flxChequeHeading",
      "flxInnerCheque",
      "flxContent"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.flxButtons.reverseLayoutDirection = !direction;
    this.view.lblSecurityDepositDetails.text = voltmx.i18n.getLocalizedString("Security Deposit Details");
    this.view.lblAvailableSecurityDeposits.text = voltmx.i18n.getLocalizedString("Available Security Deposit");
    this.view.lblTotalBiddingLimits.text = voltmx.i18n.getLocalizedString("Total Bidding Limit");
    this.view.lblCurrentlyUsed.text = voltmx.i18n.getLocalizedString("Currently Used");
    this.view.lblUploadPaymentSlip.text = voltmx.i18n.getLocalizedString("Upload Payment Slip");
    this.view.lblIncreaseLimit.text =  voltmx.i18n.getLocalizedString("Increase Limit");
    this.view.lblAuctionCalendar.text = voltmx.i18n.getLocalizedString("Summary of Your Security Deposit");
    this.view.lblTransactionType.text = voltmx.i18n.getLocalizedString("Online Deposit");
    this.view.lblBankDepOrTransfer.text = voltmx.i18n.getLocalizedString("Bank Deposit / Transfer");
    this.view.lblCheques.text = voltmx.i18n.getLocalizedString("Cheque");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.lblDebitOrCreditCard.text = voltmx.i18n.getLocalizedString("Debit / Credit Card");
    this.view.lblBankDepositOrTransfer.text = voltmx.i18n.getLocalizedString("Bank Deposit / Transfer");
    this.view.lblCheque.text = voltmx.i18n.getLocalizedString("Cheque");
    this.view.lblContent.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly updated once your online payment is successful");
    this.view.lblBankDepositContent1.text = voltmx.i18n.getLocalizedString("Must submit a bank receipt");                                 
    this.view.lblBankDepositContent2.text = voltmx.i18n.getLocalizedString("Your bank receipt processing may");
    this.view.lblChequeContent1.text = voltmx.i18n.getLocalizedString("Minimum amount AED");
    this.view.lblChequeContent2.text = voltmx.i18n.getLocalizedString("cheques have to be submitted at payment type");
    this.view.lblpaymentmethod.text = voltmx.i18n.getLocalizedString("Select Payment Method");
  },




  navToPayAndUploadBankDepositOrTransferForm: function(){
    voltmx.store.setItem("flow", "security deposit");
    var ntf = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeBankDeposit");
    ntf.navigate({
      "navForm" : "Security deposit",
      "action" : "Upload payment slip"
    });
  },




  flxdebitCardOnClick: function(){
    var ntf = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeDebitCard");
    ntf.navigate({
      "action" : "Increase Limit"
    });
  },




  flxChequeOnClick: function(){
    var ntf = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeCheque");
    ntf.navigate(
      {
        "action" : "Increase Limit"
      });
  },




  SecurityDepositFlxIncreaseLimitOnClick: function(){
    this.view.flxScrollMain.setVisibility(false);
    this.view.flxPaymentMethods.setVisibility(true);
    this.view.flxHeaderNew.btnChangeLang.setVisibility(false);
    voltmx.store.setItem("flow", "security deposit");
    voltmx.store.setItem("action", "Increase Limit");
  },




  flxBankDepositContainerOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeBankDeposit");
    ntf.navigate({
      "action" : "Increase Limit"
    });
  },




  flxBackOnClick: function(){
    this.view.flxHeaderNew.btnChangeLang.setVisibility(true);
    voltmx.print(voltmx.application.getCurrentForm());
    if(this.view.flxPaymentMethods.isVisible){
      this.view.flxPaymentMethods.setVisibility(false);
      this.view.flxScrollMain.setVisibility(true);
    }
    else{
      var prevForm = voltmx.application.getPreviousForm();
      if (prevForm) {
        var navObj = new voltmx.mvc.Navigation(prevForm.id);
        navObj.navigate();
      }
    }
  },




  onPreShow: function() {
    this.view.flxHeaderNew.btnChangeLang.setVisibility(true);
    this.toggleFooterIcons();

    this.view.flxPaymentMethods.setVisibility(false);
    this.view.flxScrollMain.setVisibility(true);
    this.type = "epayment";
    this.pageSize = 10;           
    this.onlineDepositPage = 1;   
    this.BankDepositPage = 1;
    this.chequePage = 1;
    this.getSecurityDeposit(this.type, this.onlineDepositPage, this.pageSize);
    this.displayAuctionTypes();
  },




  btnLoadMoreOnClickAction: function() {
    var type = voltmx.store.getItem("TypeOnlineBankCheque") || "epayment";
    if (this.view.SegDataGrid.isVisible) {
      this.onlineDepositPage++;
      this.getSecurityDeposit("epayment", this.onlineDepositPage, this.pageSize);
    } else if (this.view.SegBankDepositTransfer.isVisible) {
      this.BankDepositPage++;
      this.getSecurityDeposit("Bank Transfer", this.BankDepositPage, this.pageSize);
    }
    else if(this.view.SegCheque.isVisible){
      this.chequePage++;
      this.getSecurityDeposit("Cheque",this.chequePage, this.pageSize);
    }
  },




  getSecurityDeposit: function(type,page,pageSize ){
    voltmx.application.showLoadingScreen(
      null,
      "Loading..",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      false,
      true,
      {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
      }
    );
    var self = this;
    var buyer_security_deposit_mobile_inputparam = buyer_security_deposit_mobile_inputparam || {};
    var userId =   voltmx.store.getItem("userId");
    var user_token= voltmx.store.getItem("getUserAccesstoken");
    buyer_security_deposit_mobile_inputparam["serviceID"] = "fry_wf$buyer-security-deposit-mobile";
    buyer_security_deposit_mobile_inputparam["user_id"] = userId;
    buyer_security_deposit_mobile_inputparam["page"] = page;
    buyer_security_deposit_mobile_inputparam["pageSize"] = pageSize ;
    buyer_security_deposit_mobile_inputparam["type"] = type;
    var buyer_security_deposit_mobile_httpheaders = {
      "user_token" : user_token
    };
    buyer_security_deposit_mobile_inputparam["httpheaders"] = buyer_security_deposit_mobile_httpheaders;
    var buyer_security_deposit_mobile_httpconfigs = {};
    buyer_security_deposit_mobile_inputparam["httpconfig"] = buyer_security_deposit_mobile_httpconfigs;
    fry_wf$buyer_security_deposit_mobile = 
      mfintegrationsecureinvokerasync(buyer_security_deposit_mobile_inputparam,
                                      "fry_wf", "buyer-security-deposit-mobile",

                                      function(status, response){
      //       voltmx.application.dismissLoadingScreen();
      voltmx.print(status);
      voltmx.print(response);

      if (!response) {
        alert("Service call failed!");
        return;
      }
      if (response.opstatus === 0  
          && response.security_deposit_details 
          && response.security_deposit_category 
          && response.security_deposit_summary) {

        var security_deposit_details = response.security_deposit_details[0] || {};
        var security_deposit_summary = response.security_deposit_summary[0] || {};
        var security_deposit_category = response.security_deposit_category[0] || {};
        var cheques_sum = security_deposit_category.cheques_sum || "0";
        var bankTransfer_sum = security_deposit_category.bankTransfer_sum || "0";
        var ePayment_sum = security_deposit_category.ePayment_sum || "0";
        var avaliable_security_deposit = security_deposit_details.avaliable_security_deposit || "0";
        var avaliable_bidding_limit = security_deposit_details.avaliable_bidding_limit || "0";
        var used_limit = security_deposit_details.used_limit || "0";
        self.view.lblOnlineDeposit.text = ePayment_sum;
        self.view.lblBankDepositOrTransferAmt.text = bankTransfer_sum;
        self.view.lblChequeAmt.text = cheques_sum;
        self.view.lblPaidVehiclesCount.text = avaliable_security_deposit;
        self.view.lblPaidBiddingLimit.text = avaliable_bidding_limit;
        self.view.lblCurrentlyUsedAmount.text = used_limit;
        self.getSecurityDepositSummary(response);
      }
      else {
        voltmx.application.dismissLoadingScreen();
        if( response.opstatus === 1011){
          self.view.flxError.setVisibility(true);
        }        
        if(response.message === "User don't have permissions"){
          alert(response.message);
        }
        voltmx.print("Invalid or empty response from get-buyer-security-deposit");
      }
    });
  },




  getSecurityDepositSummary: function(response) {
    var security_deposit_summary = response.security_deposit_summary;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var epaymentList = [];
    var bankTransferList = [];
    var chequeList = [];
    if (Array.isArray(security_deposit_summary) && security_deposit_summary.length > 0) {
      security_deposit_summary.forEach((res, index) => {
        var amount = res.amount || "N/A"; 
        var date_time =  res.date_time || "N/A";
        var payment_id = res.payment_id || "N/A";
        var transaction_no = res.transaction_no || "N/A";
        var status = res.status || "N/A";
        var payment_type = res.payment_type || "N/A";

        var targetSegment;
        if (payment_type === "epayment") {
          targetSegment = this.view.SegDataGrid;
        } else if (payment_type === "Bank Transfer" || payment_type === "Bank Deposit") {
          targetSegment = this.view.SegBankDepositTransfer;
        } else if (payment_type === "Cheque") {
          targetSegment = this.view.SegCheque;
        }
        var clickHandler = this.toggleRowVisibilityPending(targetSegment, index);
        var cardData = {
          "imgRightArrow": {
            "src": isArabic ? "back512h.png" : "rightarrow512h.png",
          },
          "lblRequestRefund": {
            "text": "Request Refund",
            "skin": "sknlblDubai32pxbold"
          },
          "lblTransTransactionNo": {
            "text": voltmx.i18n.getLocalizedString("Transaction No"),
            "skin": "sknlblBlackDuabiold",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
          },
          "lblTransTransactionNoVal": {
            "text": payment_id,
            "skin": "sknLblCronosPro231f2016px",
            "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT

          },
          "lblTransDate": {
            "text": voltmx.i18n.getLocalizedString("Date"),
            "skin": "sknlblBlackDuabiold",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
          },
          "lblTransDateVal": {
            "text": safeFormatDate(date_time),
            "skin": "sknLblCronosPro231f2016px",
            "contentAlignment": isArabic ?  constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT

          },
          "lblTransAmount": {
            "text": voltmx.i18n.getLocalizedString("Amount"),
            "skin": "sknlblBlackDuabiold",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

          },
          "lblAED": {
            "text": "AED",
            "skin": "sknlblDubai20pxbold",
          },
          "lblAmountVal": {
            "text": amount.toString(),
            "skin": "sknlblBlackDuabiold",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT ,

          },
          "lblTransStatus": {
            "text": voltmx.i18n.getLocalizedString("Status"),
            "skin": "sknlblBlackDuabiold",
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

          },

          "lblStatusVal": {
            "text": status,
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT ,
            "skin": status.trim().toLowerCase() === "approved" ? "sknLblDubai61b35c14pxbold" : "sknLblRed"
          },
          "lblTransactionIdValue": {
            "text": transaction_no.split(":").pop(),
            "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_LEFT : constants.CONTENT_ALIGN_TOP_RIGHT ,

          },
          "lblTransactionId": {
            "text": voltmx.i18n.getLocalizedString("Transaction Id"),
            "skin": "sknlblBlackDuabiold",
          },

          "flxTransDate":{
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxTransStatus":{
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxDateContainer":{
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxAmount":{
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxCurrentAmount":{
            "reverseLayoutDirection": !isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxStatusValue":{
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxTransactionId":{
            "isVisible":false,
            "reverseLayoutDirection": isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxBack": {
            isVisible: true,
            "skin": "slFbox"
          },
          "flxTransactionNo" : {
            
            "reverseLayoutDirection": !isArabic,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "flxTransTransactionNo": {
            "reverseLayoutDirection": isArabic,
            "onClick" :clickHandler,
            "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
          },
          "isHidden": true,
          "flxHideData": { isVisible: false }
        };

        if (payment_type === "epayment") {
          epaymentList.push(cardData);
        } else if (payment_type === "Bank Transfer" || payment_type === "Bank Deposit") {
          bankTransferList.push(cardData);
        } else if (payment_type === "Cheque") {
          chequeList.push(cardData);
        }
      });
      var self = this;
      if (this.type === "epayment") {
        if (this.onlineDepositPage === 1) {
          this.view.SegDataGrid.setData(epaymentList);
        } else {
          let existing = this.view.SegDataGrid.data || [];
          this.view.SegDataGrid.setData(existing.concat(epaymentList));
        }
        this.hasMoreData = this.onlineDepositPage < this.totalPages;

        this.view.SegDataGrid.onRowClick = function(widgetRef, sectionIndex, rowIndex) {
          self.toggleRowVisibilityPending(widgetRef, rowIndex);
        };
      }
      else if (this.type === "Bank Transfer" || this.type === "Bank Deposit") {
        if (this.BankDepositPage === 1) {
          this.view.SegBankDepositTransfer.setData(bankTransferList);
        } else {
          let existing = this.view.SegBankDepositTransfer.data || [];
          this.view.SegBankDepositTransfer.setData(existing.concat(bankTransferList));
        }
        this.hasMoreData = this.BankDepositPage < this.totalPages;
        this.view.SegBankDepositTransfer.onRowClick = function(widgetRef, sectionIndex, rowIndex) {
          self.toggleRowVisibilityPending(widgetRef, rowIndex);
        };
      }
      else if (this.type === "Cheque") {
        if (this.chequePage === 1) {
          this.view.SegCheque.setData(chequeList);
        } else {
          let existing = this.view.SegCheque.data || [];
          this.view.SegCheque.setData(existing.concat(chequeList));
        }
        this.hasMoreData = this.chequePage < this.totalPages;
        this.view.SegCheque.onRowClick = function(widgetRef, sectionIndex, rowIndex) {
          self.toggleRowVisibilityPending(widgetRef, rowIndex);
        };
      }
    } else {
      voltmx.print("No service records found.");
      this.hasMoreData = false;
    }
    voltmx.application.dismissLoadingScreen();
    this.view.btnLoadMore.setVisibility(this.hasMoreData);
  },




  toggleRowVisibilityPending: function(seg, rowIndex) {
    var allData = seg.data;
    var didChange = false;
    if (rowIndex === undefined || rowIndex === null) {
      voltmx.print("Invalid rowIndex");
      return;
    }
    for (var i = 0; i < allData.length; i++) {
      if (i === rowIndex) {
        var currentVisibility = allData[i].isHidden;
        allData[i].isHidden = !currentVisibility;
        allData[i].flxHideData = {
          isVisible: currentVisibility ? true : false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      } else if (!allData[i].isHidden) {
        allData[i].isHidden = true;
        allData[i].flxHideData = {
          isVisible: false
        };
        seg.setDataAt(allData[i], i);
        didChange = true;
      }
    }
    if (!didChange) {
      seg.setData(allData);
    }
    this.view.forceLayout();
  },




  OnlineDepositOnClick: function() {
    this.onlineDepositPage =1;
    voltmx.store.setItem("depositType", "OnlineDeposit");
    this.type = voltmx.store.getItem("TypeOnlineBankCheque") || "OnlineDeposit";
    this.getSecurityDeposit(  this.type, this.onlineDepositPage, this.pageSize);
    this.view.flxOnlineDeposit.skin = "sknflxBgFFE2E5";
    this.view.flxOnlineSeperator.skin = "sknflxBgRed";
    this.view.flxBankDeposit.skin = "slFbox";
    this.view.flxBankDepositSeperator.skin = "sknflxBg9c9c9c";
    this.view.flxCheques.skin = "slFbox";
    this.view.flxChequeSeperator.skin = "sknflxBg9c9c9c";
    this.view.SegBankDepositTransfer.setVisibility(false);
    this.view.SegCheque.setVisibility(false);
    this.view.SegDataGrid.setVisibility(true);
  },




  BankDepositOnClick: function(){
    this.BankDepositPage =1;
    voltmx.store.setItem("depositType", "BankDeposit");
    this.type = voltmx.store.getItem("TypeOnlineBankCheque") || "Bank Deposit";
    this.view.flxOnlineDeposit.skin = "slFbox";
    this.view.flxBankDeposit.skin = "sknflxBgFFE2E5";
    this.view.flxBankDepositSeperator.skin = "sknflxBgRed";
    this.view.flxOnlineSeperator.skin = "sknflxBg9c9c9c";
    this.view.flxCheques.skin = "slFbox";
    this.view.flxChequeSeperator.skin = "sknflxBg9c9c9c";
    this.getSecurityDeposit(  this.type, this.BankDepositPage, this.pageSize);
    this.view.SegDataGrid.setVisibility(false);
    this.view.SegBankDepositTransfer.setVisibility(true);
    this.view.SegCheque.setVisibility(false);
  },




  ChequesOnClick: function(){
    this.chequePage = 1;
    voltmx.store.setItem("depositType", "Cheque");
    this.type = voltmx.store.getItem("TypeOnlineBankCheque") || "Cheque";
    this.getSecurityDeposit(this.type, this.chequePage, this.pageSize);
    this.view.flxOnlineDeposit.skin = "slFbox";
    this.view.flxOnlineSeperator.skin = "sknflxBg9c9c9c";
    this.view.flxBankDeposit.skin = "slFbox";
    this.view.flxBankDepositSeperator.skin = "sknflxBg9c9c9c";
    this.view.flxCheques.skin = "sknflxBgFFE2E5";
    this.view.flxChequeSeperator.skin = "sknflxBgRed";
    this.view.SegDataGrid.setVisibility(false);
    this.view.SegBankDepositTransfer.setVisibility(false);
    this.view.SegCheque.setVisibility(true);
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




});