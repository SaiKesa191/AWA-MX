define({ 

  onNavigate: function(context)
  {
    var self = this;
   this.adjustRTLLayout();
   
         voltmx.store.removeItem("linkdata");
    
     if (context && context.paymentCompleted === true) {
       
        voltmx.application.showLoadingScreen(null, "Verifying payment...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
            shouldShowLabelInBottom: "true",
            separatorHeight: 45,
            progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
            progressIndicatorColor: "Gray"
        });
//         voltmx.application.destroyForm("frmBrowserPayment");
       
        voltmx.store.removeItem("linkdata");
        this.getPaymentStatus(); // Now safely call the function
    }
    
    if(this.view && this.view.btnPrevious)
      {
    self.view.btnPrevious.onClick = self.navPaymenttype;
      }
    this.usertoken = voltmx.store.getItem("getUserAccesstoken");
    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.newbidlimit = 0;
    if(this.view && this.view.flxBack){
    self.view.flxBack.onClick = () => new voltmx.mvc.Navigation("frmPaymentType").navigate();
    }
//     this.view.tbxAmountToDeposit.onTextChange = () =>{
//       if(this.view.tbxAmountToDeposit.text && this.view.tbxAmountToDeposit.text.trim() !== ""){
//         this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
//       }
//       else{
//         this.view.btnPayNow.skin = "sknBtn7676760RADIUS8PXFONTFFFFFF";
//       }
//     };
    this.invokeGetBuyerSecurityDeposit();
    if(this.view && this.view.segDepositAmount){
    self.view.segDepositAmount.onRowClick = self.segTypesOnRowClickAction.bind(this);
    }
    if(this.view && this.view.flxDropDown){
    self.view.flxDropDown.onClick = self.flxDropDownOnClickAction.bind(this);
    }
    if(this.view && this.view.btnPayNow){
    self.view.btnPayNow.onClick = () =>
      {
//       if(this.view.tbxAmountToDeposit.text && this.view.tbxAmountToDeposit.text.trim() !== "")
//         {
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
         self.view.flxOverLay.setVisibility(true);
         self.view.flxPopUpPayment.setVisibility(true); 
          self.view.lblTermsAndConditions.text = voltmx.i18n.getLocalizedString("Please read the following terms and conditions for transaction refunds careful.");
          self.view.btnCancel.text = voltmx.i18n.getLocalizedString("cancel");
          self.view.btnProceedToPayment.text = voltmx.i18n.getLocalizedString("Proceed to Payment");
          self.view.lblTermsAndConditions.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
          if(isArabic)
            {
              self.view.btnCancel.left = "";
          self.view.btnCancel.right = "2%";
          self.view.btnProceedToPayment.left = "2%";
          self.view.btnProceedToPayment.right = "";
            }
      else{
        self.view.btnCancel.left = "2%";
          self.view.btnCancel.right = "";
          self.view.btnProceedToPayment.left = "";
          self.view.btnProceedToPayment.right = "2%";
      }

      
//         }
    };
  }
    if(this.view && this.view.btnProceedToPayment){
    self.view.btnProceedToPayment.onClick = self.testPaymentgateway.bind(this);
    }
    
    if(this.view && this.view.btnCancel){
    self.view.btnCancel.onClick = () =>  {
      self.view.flxPopUpPayment.setVisibility(false); 
      self.view.flxOverLay.setVisibility(false);
      
    };
    }
    
    if(this.view && this.view.flxArrow){
    self.view.flxArrow.onClick =  self.navPaymenttype;
    }
   

  },
  
  onPreShow: function()
  {
    this.toggleFooterIcons();
    this.view.flxPaymentSuccessPopup.setVisibility(false);
    if(this.view.imgUpArrow.isVisible){
      this.view.flxDocTypeDropDownList.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
      this.view.imgUpArrow.setVisibility(false);
    }
     if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    if(this.view.flxPopUpPayment){
      this.view.flxPopUpPayment.setVisibility(false);
    }
    this.view.flxPaymentStatusCheck.setVisibility(false);
    this.getDepositLimit();
    this.depositAmount = 0;
    this.view.btnPayNow.setEnabled(false);
    this.view.btnPayNow.skin = "sknBtn7676760RADIUS8PXFONTFFFFFF";
    this.view.lblShowBiddingLimit.text = "0";
    this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
    this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
    this.view.imgDropDown.setVisibility(true);
  },
  
   onPostShow: function()
  {
    
     var self = this;
    if(this.view && this.view.flxRemovePaypopup){
    self.view.flxRemovePaypopup.onClick = () => {
      self.view.flxPaymentSuccessPopup.setVisibility(false);
    }
    }
    if(this.view && this.view.btnGotoAuctions){
    self.view.btnGotoAuctions.onClick = () => {
      new voltmx.mvc.Navigation("frmSecurityDeposits").navigate();
    }
    }
  

    
    
//     self.view.btnRefreshStatus.onClick = () =>{
//       self.view.flxPaymentStatusCheck.setVisibility(false);
//       if (voltmx.store.getItem("awaitingPayment") === true) {
//         voltmx.store.removeItem("awaitingPayment");
//         self.getPaymentStatus();
//     }
//     }
    
  },
  
   invokeGetBuyerSecurityDeposit: function()
  {
    
   var self = this;
   checkTokenValidatity(function () {
//     function invokeBuyerSecurityCallBack(status, get_buyer_security_deposit) {
//       self.originallimit = get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit;
      
//       self.view.lblShowBiddingLimit.text = self.originallimit;
//     }
     
     function invokeBuyerSecurityCallBack(status, get_buyer_security_deposit) {
    try {
        // Ensure response and nested objects exist
        if (
            get_buyer_security_deposit &&
            get_buyer_security_deposit.security_deposit_details &&
            Array.isArray(get_buyer_security_deposit.security_deposit_details) &&
            get_buyer_security_deposit.security_deposit_details.length > 0 &&
            typeof get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit !== "undefined"
        ) {
            self.originallimit = get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit;
        } else {
            self.originallimit = "0"; // default fallback
        }

        // Assign to label (ensure label exists)
        if (self.view && self.view.lblShowBiddingLimit) {
            self.view.lblShowBiddingLimit.text = String(self.originallimit);
        }

    } catch (err) {
        voltmx.print("Error in invokeBuyerSecurityCallBack: " + err.message);
        self.originallimit = "0";
        if (self.view && self.view.lblShowBiddingLimit) {
            self.view.lblShowBiddingLimit.text = "0";
        }
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
 
   });
    
  },
  
   getDepositLimit: function(){
    var self = this;
  checkTokenValidatity(function () {
        var master_chipset_limits_inputparam = {};
    
    master_chipset_limits_inputparam["serviceID"] = "fry_int_user$master-chipset-limits";
    var master_chipset_limits_httpheaders = {};
    master_chipset_limits_inputparam["httpheaders"] = master_chipset_limits_httpheaders;
    var master_chipset_limits_httpconfigs = {};
    master_chipset_limits_inputparam["httpconfig"] = master_chipset_limits_httpconfigs;

    fry_int_user$master_chipset_limits = mfintegrationsecureinvokerasync(
    master_chipset_limits_inputparam,
    "fry_int_user",
    "master-chipset-limits",
    function (status, response) {
        voltmx.print("Status : " + status);
        voltmx.print("Response :" + JSON.stringify(response));

        // Ensure we have valid array data
        var data = (response && Array.isArray(response.records)) ? response.records : [];

        self.fullChipsetData = data;

        var segData = [];
        data.forEach(function (res) {
            var maxBid = (res && res.max_bid) ? res.max_bid : "";
            var deposit_limit = (res && res.deposit_limit) ? res.deposit_limit : "";
            var entry_id = (res && res.entry_id) ? res.entry_id : "";

            segData.push({
                "lblDepositLimit": deposit_limit,
                "lblMaxBid": maxBid,
                "entry_id": entry_id
            });
        });

        // Update segment safely
        if (self.view && self.view.segDepositAmount) {
            self.view.segDepositAmount.setData(segData);
        }
    }
);

  });
  },
  
  toggleFooterIcons: function () {
    var self = this;

    if (!self.view || !self.view.Footer2) {
        return;
    }

    // Footer highlight visibility
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

    // Home
    if (self.view.Footer2.imgHome) {
        self.view.Footer2.imgHome.src = "homefooter.png";
    }

    if (self.view.Footer2.lblHome) {
        self.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
    }

    // Auctions
    if (self.view.Footer2.imgMegaPhone) {
        self.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    }

    if (self.view.Footer2.lblAuctions) {
        self.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
    }

    // Sell Car
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
  
 flxDropDownOnClickAction: function () {
    var self = this;

    if (
        self.view &&
        self.view.imgUpArrow &&
        self.view.imgDropDown &&
        self.view.flxDocTypeDropDownList
    ) {

        if (self.view.imgUpArrow.isVisible) {

            self.view.flxDocTypeDropDownList.setVisibility(false);
            self.view.imgDropDown.setVisibility(true);
            self.view.imgUpArrow.setVisibility(false);

        } else if (self.view.imgDropDown.isVisible) {

            self.view.flxDocTypeDropDownList.setVisibility(true);
            self.view.imgUpArrow.setVisibility(true);
            self.view.imgDropDown.setVisibility(false);
        }
    }
},
  
//    segTypesOnRowClickAction: function(){
//     var selectedRow = this.view.segDepositAmount.selectedRowItems[0];
//     voltmx.print("SelectedRow :"+selectedRow);
//       this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
//     var deposit_amt = selectedRow.lblDepositLimit;
//     var selectedEntryId = selectedRow.entry_id; // 🔍 Get clicked row's entry_id
//     voltmx.store.setItem("deposit_amt",deposit_amt );
//     // Now find the corresponding record from fullChipsetData
//     var matchedRecord = this.fullChipsetData.find(function(item) {
//         return item.entry_id === selectedEntryId;
//     });

//     if (matchedRecord) {
//         var maxBid = matchedRecord.max_bid;
         
//          this.newbidlimit = deposit_amt + Number(maxBid);
//         this.view.requireAmtToDeposit.text = "You need to deposit (AED) \n"+ deposit_amt;
//         this.depositAmount = deposit_amt;
//        this.view.lblReqBiddingLimit.text = "To get (Bidding Limit) \n" +maxBid;
//         this.view.lblShowBiddingLimit.text = this.newbidlimit;
//       voltmx.store.setItem("bid_limit", maxBid);
//        this.view.flxDocTypeDropDownList.setVisibility(false);
//        this.view.imgDropDown.setVisibility(true);
//       this.view.imgUpArrow.setVisibility(false);
//     } else {
//         voltmx.print("No matching record found for entry_id: " + selectedEntryId);
//     }

//   },
  
  segTypesOnRowClickAction: function() {
    var selectedRowItems = this.view.segDepositAmount.selectedRowItems;
if (selectedRowItems && selectedRowItems.length > 0) {
    var selectedRow = selectedRowItems[0];
    


    voltmx.print("SelectedRow :" + JSON.stringify(selectedRow));

    var deposit_amt = selectedRow.lblDepositLimit;
    var selectedEntryId = selectedRow.entry_id;

    // Save the selected deposit amount
    voltmx.store.setItem("deposit_amt", deposit_amt);

    // Find record by entry_id
  var matchedRecord = null;

if (Array.isArray(this.fullChipsetData) && this.fullChipsetData.length > 0) {
    matchedRecord = this.fullChipsetData.find(function(item) {
        return item.entry_id === selectedEntryId;
    });
}

    if (matchedRecord) {
        var maxBid = Number(matchedRecord.max_bid);
        
        // Always calculate new bid limit as: originallimit + selected maxBid
        this.newbidlimit = Number(this.originallimit || 0) + maxBid;

        // Update UI
         this.view.btnPayNow.setEnabled(true);
         this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
        this.view.lblShowBiddingLimit.text = this.newbidlimit.toLocaleString('en-US');
        this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("You need to deposit (AED)") + deposit_amt;
        this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("To get (Bidding Limit)") + maxBid;

        // Store for internal use
        this.depositAmount = deposit_amt;
      if(this.view.lblPayAedAmount){
//         this.view.lblPayAedAmount.text = "Pay AED "+deposit_amt+" \nby Debit/Credit Card";
            this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED") +" "+deposit_amt+"\n"+voltmx.i18n.getLocalizedString("by Debit/Credit Card");
      }
        voltmx.store.setItem("bid_limit", maxBid);

        // UI visibility updates
        this.view.flxDocTypeDropDownList.setVisibility(false);
        this.view.imgDropDown.setVisibility(true);
        this.view.imgUpArrow.setVisibility(false);
    } else {
        voltmx.print("No matching record found for entry_id: " + selectedEntryId);
    }
}
},
  
  testPaymentgateway: function() {
    var self = this;
     self.accesstoken = null;
 voltmx.net.clearCookies();
 
self.orderId = null;
self.transactionDetails = null;
self.paymentId = null;
self.transactionDetails1 = null;
    checkTokenValidatity(function() {
      voltmx.store.removeItem("linkdata");
       voltmx.store.removeItem("access_token");
    voltmx.store.removeItem("order_id");
    voltmx.store.removeItem("awaitingPayment");
    voltmx.store.removeItem("transactionDetails");
    voltmx.store.removeItem("paymentId");
      
      
      
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//      var ev = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
       var ev = voltmx.store.getItem("PAYMENT_ACCESS_TOKEN");
    
//          var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
            var url = voltmx.store.getItem("PAYMENT_ACCESS_URL");
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
       request.setRequestHeader("Authorization","Basic "+ev);
        request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
        request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");
                 //
        request.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
request.setRequestHeader("Pragma", "no-cache");
request.setRequestHeader("Expires", "0");
//
     
        
       request.send();
        
              // Handle the response
       request.onReadyStateChange =  function() {
         if (request.readyState === 4) {
            if (request.status === 200) {
              voltmx.application.dismissLoadingScreen();
              var requestStringEmail = request.responseText;
              var payment_access_token = JSON.parse(request.responseText).access_token;
//               alert(payment_access_token);
//               alert(requestStringEmail);
             
              self.testPaymentgateway1(payment_access_token);
              
                }
          }
       };
      }
    catch(error){
//       alert("Error: " + error.message);
    }
    });
  },
  
  
  
  
   testPaymentgateway1: function(payment_access_token){
     var self = this;
     checkTokenValidatity(function () {
     self.accesstoken = payment_access_token;
   voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//          var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";
            var url = voltmx.store.getItem("PAYMENT_ORDER_ID");
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
       request.setRequestHeader("Authorization","Bearer "+payment_access_token);
        request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
        request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
        
            //
        request.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
request.setRequestHeader("Pragma", "no-cache");
request.setRequestHeader("Expires", "0");
//
      var email =   voltmx.store.getItem("userEmail");
        var body = {
  "action": "AUTH",
  "amount": {
    "currencyCode": "AED",
    "value": self.depositAmount*100
  },
          "emailAddress": email,
          merchantAttributes: {
//     redirectUrl: "https://yourdomain.com/success"
        "redirectUrl": "https://paypage.sandbox.ngenius-payments.com/?code=5efa82b95a7926cb",
        "skipConfirmationPage": true
  },
//            merchantAttributes: {
//     redirectUrl: "https://paypage.sandbox.ngenius-payments.com/?code=9f5fa16e82d163a0"
//   },     
     
          
};
        
       request.send(JSON.stringify(body));
        
              // Handle the response
      request.onReadyStateChange =  function() {
        if (request.readyState === 4) {
          voltmx.application.dismissLoadingScreen();
          
//           this.view.flxOverLay.setVisibility(false);
//           this.view.flxPopUpPayment.setVisibility(false);
//             if (request.status === 201 || request.status === 200) {
              var requestStringEmail = request.responseText;
            var hreflink=  JSON.parse(requestStringEmail)._links.payment.href;
            var orderid = JSON.parse(requestStringEmail)._id;
            self.orderId = orderid.split(":")[2];
          voltmx.store.setItem("linkdata", hreflink);
          self.transactionDetails = JSON.parse(requestStringEmail);
//           voltmx.store.setItem("awaitingPayment", true);
          var trdetails = JSON.parse(requestStringEmail);
          
          self.callCreateRecordAPI(trdetails,hreflink);
//           voltmx.application.openURL(hreflink);
          if(self.view.flxPopUpPayment){
      self.view.flxPopUpPayment.setVisibility(false);
      self.view.flxOverLay.setVisibility(false);
//       self.view.flxPaymentStatusCheck.setVisibility(true);
//              voltmx.application.showLoadingScreen(null, "Updating status. Dont close app",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//         voltmx.timer.schedule("checkPaymentTimer", function() {
//       voltmx.application.dismissLoadingScreen();
//       if (typeof self.getPaymentStatus === "function") {
        
//         self.getPaymentStatus();
       
//       }
//     }, 80, false);
    }

                }
  
      }
      }
    catch(error){
//       alert(" Error: " + error.message);
    }
     }); 
  },
  
   callCreateRecordAPI: function(trdetails,hreflink)
  {
    
    this.transactionDetails = trdetails;
    var self = this;
    checkTokenValidatity(function () {
      
           var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
   
   var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
         var url = baseURL +"services/ms_common/api/v1/create-payment-record";
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
        var userid = voltmx.store.getItem("userId");
        var regidafterregister = voltmx.store.getItem("regId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        
        

        request.setRequestHeader("Content-Type", "application/json");
//         request.setRequestHeader("Authorization","Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
        request.setRequestHeader("Authorization", "Basic "+encodeVal);
        request.setRequestHeader("user_token", usertoken);
//         request.setRequestHeader("jwt_token", "");
if (trdetails.formattedAmount) {
    trdetails.formattedAmount = trdetails.formattedAmount.replace(/[^\x20-\x7E]/g, "");
}
        self.transactionDetails = trdetails;
         var body = {

  "asset_category": "",
    "payment_action": "deposit",
    "reference_id": userid,
  "transaction_details": trdetails,
 "payment_method": "EPayment",
 "payment_module": "security_deposit"
       
};
        
       request.send(JSON.stringify(body));
        var urllink = voltmx.store.getItem("linkdata");
              // Handle the response
      request.onReadyStateChange =  function() {
        if (request.readyState === 4) {

              var requestStringEmail = request.responseText;
          
              self.createPaymentResponse = JSON.parse(requestStringEmail);
           if(self.createPaymentResponse && self.createPaymentResponse.data && self.createPaymentResponse.data.payment_id){

              var paymentId = self.createPaymentResponse.data.payment_id;
              self.paymentId = paymentId;
//                alert('create res '+requestStringEmail);
//           voltmx.application.openURL(hreflink);
             new voltmx.mvc.Navigation("frmBrowserPayment").navigate();
              
           }
                }

      }
      }
    catch(error){
      alert(" Error: " + error.message);
    }
    });
  },
  
 callUpdateRecordAPI: function()
  {
    
    var self = this;
   voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    checkTokenValidatity(function () {
      
              var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
   
   var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
         var url = baseURL +"services/ms_common/api/v1/update-payment-record-by-id";
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("PUT", url);
        var userid = voltmx.store.getItem("userId");
        var regidafterregister = voltmx.store.getItem("regId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");

        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Authorization","Basic "+encodeVal);
        request.setRequestHeader("user_token", usertoken);

        var body = {
 "transaction_details": self.transactionDetails1,
  "payment_method": "E-Payment",
    "payment_id": self.paymentId,
    "reference_id": userid,
    "asset_category": "",
    "payment_module": "security_deposit",
    "payment_action": "deposit"
//     "service_id": 33,
   
       
};
        
       request.send(JSON.stringify(body));
        
              // Handle the response
      request.onReadyStateChange =  function() {
        if (request.readyState === 4) {
             voltmx.application.dismissLoadingScreen();
              var requestStringEmail = request.responseText;
          try {
              var response = JSON.parse(requestStringEmail);
              // alert("Update record response :" + JSON.stringify(response));
              //             var updateResponse=JSON.stringify(response);

              if(response && response.data && response.data.payment_status && response.data.payment_status.toLowerCase() === "completed"){

                self.view.flxPaymentSuccessPopup.setVisibility(true);   

              }
              
                


            } catch (e) {
              voltmx.print("Response parsing failed:\n" + requestStringEmail);
            }
          
//                alert(requestStringEmail);
                }

      }
      }
    catch(error){
      voltmx.print(" Error: " + error.message);
    }
    });
  },
  
  getPaymentStatus: function () {
  var self = this;
  checkTokenValidatity(function () {  
  var statusUrl = self.transactionDetails._links.self.href;
    var accessToken = self.accesstoken;
  try {
    var request = new voltmx.net.HttpRequest();
    request.open("GET", statusUrl);
    request.setRequestHeader("Authorization", "Bearer " + accessToken);
    request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
    request.send();

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();
        var response = JSON.parse(request.responseText);
         if (
  response &&
  response._embedded &&
  response._embedded.payment &&
  response._embedded.payment.length > 0
) {
  var payment = response._embedded.payment[0];

  if (
    
    payment.authResponse &&
    payment.authResponse.success === true &&
    payment.authResponse.resultCode === "00"
  ) {
   
//     alert("Payment successful!");
//     new voltmx.mvc.Navigation("frmPaymentSuccess").navigate();
//      self.view.flxPaymentSuccessPopup.setVisibility(true);
//     if (typeof self.getNewAccess === "function") {
//     self.getNewAccess();
    
//     }
    
//       if (typeof self.getNewAccess === "function") {
//     self.getNewAccess();
//   }
  } else if (
  payment.state === "FAILED" ||
  (payment.authResponse && payment.authResponse.success === false)
) {
   self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Payment Failed!";

}
 else if (
  payment.state === "INITIATED" ||
  payment.state === "AUTHORISED" ||
  payment.state === "RECEIVED"
) {
   self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Payment is still pending or being processed.";
//   alert(" Payment is still pending or being processed.");
}
           else{
//              alert(payment.state);
             self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text = payment.state;
           }
          
} else {
 self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Payment Failed!";
//   alert("Invalid payment response.");
}
         if (typeof self.getNewAccess === "function") {
    self.getNewAccess();
  }
      }
    };
  } catch (err) {
//     alert("Error checking payment status: " + err.message);
    self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Some thing went wrong. Try again later";
  }
  });
},
  
  

   testPaymentgateway2: function() {
     var self = this;
    
//          var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders/"+(self.orderId);
            var url = voltmx.store.getItem("PAYMENT_ORDER_ID") + "/" + (self.orderId);
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("GET", url);
       request.setRequestHeader("Authorization","Bearer "+self.payment_access_token);
        request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
        request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
//         var body = {
//   "action": "PURCHASE",
//   "amount": {
//     "currencyCode": "AED",
//     "value": this.depositAmount
//   },
//           merchantAttributes: {
//     redirectUrl: "https://yourdomain.com/success"
//   },
// //            merchantAttributes: {
// //     redirectUrl: "https://paypage.sandbox.ngenius-payments.com/?code=9f5fa16e82d163a0"
// //   },     
     
          
// };
        
       request.send();
        
              // Handle the response
      request.onReadyStateChange =  function() {
        if (request.readyState === 4) {
          voltmx.application.dismissLoadingScreen();
          
//           this.view.flxOverLay.setVisibility(false);
//           this.view.flxPopUpPayment.setVisibility(false);
//             if (request.status === 201 || request.status === 200) {
              var requestStringEmail = request.responseText;
          var trdetails = JSON.parse(requestStringEmail);
           if (trdetails.formattedAmount) {
    trdetails.formattedAmount = trdetails.formattedAmount.replace(/[^\x20-\x7E]/g, "");
}
        self.transactionDetails1 = trdetails;
          if(self.transactionDetails1){
            self.callUpdateRecordAPI();
          }
        
            
//           x.navigate();
//               alert(hreflink);
//           self.callCreateRecordAPI(JSON.parse(requestStringEmail),payment_access_token);
          
          
//           var x = new voltmx.mvc.Navigation("frmBrowserPayment");
//           x.navigate();
//               var payment_access_token = JSON.parse(request.responseText).access_token;
//               alert(payment_access_token);
//               alert(requestStringEmail);
//               var requestJSONEmail = JSON.parse(requestStringEmail);
//               alert(requestJSONEmail);
                }
          //}
      // };
      }
      }
    catch(error){
      alert(" Error: " + error.message);
    }
    
  },  
  
  
  navPaymenttype: function(){
   
     var x = new voltmx.mvc.Navigation("frmPaymentType");
     x.navigate();
  },
  
    getNewAccess: function() {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//      var ev = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
//          var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
      
       var ev = voltmx.store.getItem("PAYMENT_ACCESS_TOKEN");
    
            var url = voltmx.store.getItem("PAYMENT_ACCESS_URL");
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
       request.setRequestHeader("Authorization","Basic "+ev);
        request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
        request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");
        
       request.send();
        
              // Handle the response
       request.onReadyStateChange =  function() {
         if (request.readyState === 4) {
            if (request.status === 200) {
              voltmx.application.dismissLoadingScreen();
              var requestStringEmail = request.responseText;
              var payment_access_token = JSON.parse(request.responseText).access_token;
//               alert(payment_access_token);
//               alert(requestStringEmail);
             self.payment_access_token = payment_access_token;
              if(self.payment_access_token){
                self.testPaymentgateway2();
              }
              
                }
          }
       };
      }
    catch(error){
      alert("Error: " + error.message);
    }
  },
  
//   adjustRTLLayout: function() {
//     var self = this;
//     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
//         if(this.view && this.view.flxHeaderNew && this.view.flxHeaderNew.btnChangeLang)
//         {
//          self.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
//         }
//          this.view.lblVehicles.text = voltmx.i18n.getLocalizedString("Vehicles");
//        this.view.lblAuctionType.text = voltmx.i18n.getLocalizedString("Auction Type");
//        this.view.lblpaymentType.text = voltmx.i18n.getLocalizedString("Payment Method");
//       this.view.lblPaymentMethod.text = voltmx.i18n.getLocalizedString("Payment Method");
//          this.view.lblpayupload.text = voltmx.i18n.getLocalizedString("Pay/Upload");
//     this.view.lblBiddingLimit.text = voltmx.i18n.getLocalizedString("Your new bidding limit will be");
//     this.view.btnPrevious.text = voltmx.i18n.getLocalizedString("PREVIOUS");
//     this.view.btnPayNow.text = voltmx.i18n.getLocalizedString("Pay Now");
//     this.view.lblPaymentMethodValue.text = voltmx.i18n.getLocalizedString("Debit/Credit Card");
//     this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
//     this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
//     this.view.lblNotice.text = voltmx.i18n.getLocalizedString("To proceed, Kindly ensure that the deposit limit is minimum of 5000");
//        this.view.lblSpecifyTheBiddingLimit.text = voltmx.i18n.getLocalizedString("Specify the Bidding Limit You require");
//        this.view.lblYourBiddingLimit.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly updated once your online  payment is successful.");
//     this.view.lblText.text = voltmx.i18n.getLocalizedString("paymentTAndC");
//     this.view.Label0a076c7f3e67d42.text = voltmx.i18n.getLocalizedString("Payment success");
//     this.view.btnGotoAuctions.text = voltmx.i18n.getLocalizedString("VIEW SECURITY DEPOSIT");
//     this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
//     this.view.flxArrow.reverseLayoutDirection = isArabic;
//     this.view.flxVehicles.reverseLayoutDirection = isArabic;
//     this.view.flxNotification.reverseLayoutDirection = isArabic;
//     this.view.requireAmtToDeposit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblReqBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

//     this.view.lblVehicles.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblSpecifyTheBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblYourBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblNotice.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblReqBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblShowBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//     this.view.lblText.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
//      if (isArabic) {
       
//     var flipTransform = voltmx.ui.makeAffineTransform();
//     flipTransform.scale(-1, 1); // horizontal flip
//     this.view.imgBack.transform = flipTransform;
//        this.view.requireAmtToDeposit.left = "";
//        this.view.requireAmtToDeposit.right = "10dp";
  
//        this.view.flxDropDown.right = "";
//        this.view.flxDropDown.left = "10dp";
       
//        this.view.lblReqBiddingLimit.left = "";
//        this.view.lblReqBiddingLimit.right = "10dp";
       
//        this.view.lblPaymentMethod.left = "";
//        this.view.lblPaymentMethod.right = "5%";
       
//        this.view.lblPaymentMethodValue.left = "5dp";
//        this.view.lblPaymentMethodValue.right = "";
       
//        this.view.btnPrevious.left = "";
//        this.view.btnPrevious.right = "4%";
       
//        this.view.btnPayNow.left = "4%";
//        this.view.btnPayNow.right = "";
//      }
//      else{
//        this.view.btnPrevious.left = "4%";
//        this.view.btnPrevious.right = "";
       
//        this.view.btnPayNow.left = "";
//        this.view.btnPayNow.right = "4%";
       
//        this.view.lblPaymentMethod.left = "5%";
//        this.view.lblPaymentMethod.right = "";
       
//        this.view.lblPaymentMethodValue.left = "";
//        this.view.lblPaymentMethodValue.right = "5dp";
       
//       this.view.requireAmtToDeposit.left = "10dp";
//        this.view.requireAmtToDeposit.right = "";
       
//        this.view.flxDropDown.right = "10dp";
//        this.view.flxDropDown.left = "";
       
//        this.view.lblReqBiddingLimit.left = "10dp";
//        this.view.lblReqBiddingLimit.right = "";
//        this.view.imgBack.transform = voltmx.ui.makeAffineTransform();

//      }
//   }
  
  adjustRTLLayout: function() {
    var self = this;
    var v = this.view;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    if(v && v.flxHeaderNew && v.flxHeaderNew.btnChangeLang){
        v.flxHeaderNew.btnChangeLang.text =
            voltmx.i18n.getLocalizedString("changeLang");
    }

    if(v && v.lblVehicles){
        v.lblVehicles.text = voltmx.i18n.getLocalizedString("Vehicles");
    }

    if(v && v.lblAuctionType){
        v.lblAuctionType.text = voltmx.i18n.getLocalizedString("Auction Type");
    }

    if(v && v.lblpaymentType){
        v.lblpaymentType.text = voltmx.i18n.getLocalizedString("Payment Method");
    }

    if(v && v.lblPaymentMethod){
        v.lblPaymentMethod.text = voltmx.i18n.getLocalizedString("Payment Method");
    }

    if(v && v.lblpayupload){
        v.lblpayupload.text = voltmx.i18n.getLocalizedString("Pay/Upload");
    }

    if(v && v.lblBiddingLimit){
        v.lblBiddingLimit.text =
            voltmx.i18n.getLocalizedString("Your new bidding limit will be");
    }

    if(v && v.btnPrevious){
        v.btnPrevious.text = voltmx.i18n.getLocalizedString("PREVIOUS");
    }

    if(v && v.btnPayNow){
        v.btnPayNow.text = voltmx.i18n.getLocalizedString("Pay Now");
    }

    if(v && v.lblPaymentMethodValue){
        v.lblPaymentMethodValue.text =
            voltmx.i18n.getLocalizedString("Debit/Credit Card");
    }

    if(v && v.requireAmtToDeposit){
        v.requireAmtToDeposit.text =
            voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
    }

    if(v && v.lblReqBiddingLimit){
        v.lblReqBiddingLimit.text =
            voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
    }

    if(v && v.lblNotice){
        v.lblNotice.text =
            voltmx.i18n.getLocalizedString(
                "To proceed, Kindly ensure that the deposit limit is minimum of 5000"
            );
    }

    if(v && v.lblSpecifyTheBiddingLimit){
        v.lblSpecifyTheBiddingLimit.text =
            voltmx.i18n.getLocalizedString(
                "Specify the Bidding Limit You require"
            );
    }

    if(v && v.lblYourBiddingLimit){
        v.lblYourBiddingLimit.text =
            voltmx.i18n.getLocalizedString(
                "Your bidding limit will be instantly updated once your online payment is successful."
            );
    }

    if(v && v.lblText){
        v.lblText.text =
            voltmx.i18n.getLocalizedString("paymentTAndC");
    }

    if(v && v.Label0a076c7f3e67d42){
        v.Label0a076c7f3e67d42.text =
            voltmx.i18n.getLocalizedString("Payment success");
    }

    if(v && v.btnGotoAuctions){
        v.btnGotoAuctions.text =
            voltmx.i18n.getLocalizedString("VIEW SECURITY DEPOSIT");
    }

    if(v && v.SmthngWentWrong && v.SmthngWentWrong.btnClose){
        v.SmthngWentWrong.btnClose.text =
            voltmx.i18n.getLocalizedString("closeCaps");
    }

    if(v && v.flxArrow){
        v.flxArrow.reverseLayoutDirection = isArabic;
    }

    if(v && v.flxVehicles){
        v.flxVehicles.reverseLayoutDirection = isArabic;
    }

    if(v && v.flxNotification){
        v.flxNotification.reverseLayoutDirection = isArabic;
    }

    if(v && v.requireAmtToDeposit){
        v.requireAmtToDeposit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblReqBiddingLimit){
        v.lblReqBiddingLimit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblVehicles){
        v.lblVehicles.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblSpecifyTheBiddingLimit){
        v.lblSpecifyTheBiddingLimit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblYourBiddingLimit){
        v.lblYourBiddingLimit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblNotice){
        v.lblNotice.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblBiddingLimit){
        v.lblBiddingLimit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblShowBiddingLimit){
        v.lblShowBiddingLimit.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(v && v.lblText){
        v.lblText.contentAlignment =
            isArabic
                ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
                : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    }

    if(isArabic){

        if(v && v.imgBack){
            var flipTransform = voltmx.ui.makeAffineTransform();
            flipTransform.scale(-1, 1);
            v.imgBack.transform = flipTransform;
        }

        if(v && v.requireAmtToDeposit){
            v.requireAmtToDeposit.left = "";
            v.requireAmtToDeposit.right = "10dp";
        }

        if(v && v.flxDropDown){
            v.flxDropDown.right = "";
            v.flxDropDown.left = "10dp";
        }

        if(v && v.lblReqBiddingLimit){
            v.lblReqBiddingLimit.left = "";
            v.lblReqBiddingLimit.right = "10dp";
        }

        if(v && v.lblPaymentMethod){
            v.lblPaymentMethod.left = "";
            v.lblPaymentMethod.right = "5%";
        }

        if(v && v.lblPaymentMethodValue){
            v.lblPaymentMethodValue.left = "5dp";
            v.lblPaymentMethodValue.right = "";
        }

        if(v && v.btnPrevious){
            v.btnPrevious.left = "";
            v.btnPrevious.right = "4%";
        }

        if(v && v.btnPayNow){
            v.btnPayNow.left = "4%";
            v.btnPayNow.right = "";
        }

    } else {

        if(v && v.btnPrevious){
            v.btnPrevious.left = "4%";
            v.btnPrevious.right = "";
        }

        if(v && v.btnPayNow){
            v.btnPayNow.left = "";
            v.btnPayNow.right = "4%";
        }

        if(v && v.lblPaymentMethod){
            v.lblPaymentMethod.left = "5%";
            v.lblPaymentMethod.right = "";
        }

        if(v && v.lblPaymentMethodValue){
            v.lblPaymentMethodValue.left = "";
            v.lblPaymentMethodValue.right = "5dp";
        }

        if(v && v.requireAmtToDeposit){
            v.requireAmtToDeposit.left = "10dp";
            v.requireAmtToDeposit.right = "";
        }

        if(v && v.flxDropDown){
            v.flxDropDown.right = "10dp";
            v.flxDropDown.left = "";
        }

        if(v && v.lblReqBiddingLimit){
            v.lblReqBiddingLimit.left = "10dp";
            v.lblReqBiddingLimit.right = "";
        }

        if(v && v.imgBack){
            v.imgBack.transform = voltmx.ui.makeAffineTransform();
        }
    }
}
  
  

 });
