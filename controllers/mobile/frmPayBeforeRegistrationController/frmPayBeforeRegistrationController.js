define({ 

  onNavigate: function(context)
  {
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
//     this.view.btnPrevious.onClick = this.navPaymenttype;
//     this.usertoken = voltmx.store.getItem("getUserAccesstoken");
    this.view.preShow = this.onPreShow.bind(this);
    this.newbidlimit = 0;
    this.view.postShow = this.onPostShow.bind(this);
//     this.view.flxBack.onClick = () => new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
//     this.view.btnSkippayment.onClick = () => {
//       new voltmx.mvc.Navigation("frmSelectPreferences").navigate();
//     }
     this.view.btnPrevious.onClick = () => {
      new voltmx.mvc.Navigation("frmSelectPreferences").navigate();
    }
   
//     this.view.tbxAmountToDeposit.onTextChange = () =>{
//       if(this.view.tbxAmountToDeposit.text && this.view.tbxAmountToDeposit.text.trim() !== ""){
//         this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
//       }
//       else{
//         this.view.btnPayNow.skin = "sknBtn7676760RADIUS8PXFONTFFFFFF";
//       }
//     };
//     this.invokeGetBuyerSecurityDeposit();
    this.view.segDepositAmount.onRowClick = this.segTypesOnRowClickAction.bind(this);
    this.view.flxDropDown.onClick = this.flxDropDownOnClickAction.bind(this);
    this.view.btnPayNow.onClick = () =>
      {
//       if(this.view.tbxAmountToDeposit.text && this.view.tbxAmountToDeposit.text.trim() !== "")
//         {
         var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
         this.view.flxOverLay.setVisibility(true);
         this.view.flxPopUpPayment.setVisibility(true); 
          this.view.lblText.text = voltmx.i18n.getLocalizedString("paymentTAndC");
          this.view.lblTermsAndConditions.text = voltmx.i18n.getLocalizedString("Please read the following terms and conditions for transaction refunds careful.");
          this.view.btnCancel.text = voltmx.i18n.getLocalizedString("cancel");
          this.view.btnProceedToPayment.text = voltmx.i18n.getLocalizedString("Proceed to Payment");
          this.view.lblTermsAndConditions.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
          if(isArabic)
            {
              this.view.btnCancel.left = "";
          this.view.btnCancel.right = "2%";
          this.view.btnProceedToPayment.left = "2%";
          this.view.btnProceedToPayment.right = "";
            }
      else{
        this.view.btnCancel.left = "2%";
          this.view.btnCancel.right = "";
          this.view.btnProceedToPayment.left = "";
          this.view.btnProceedToPayment.right = "2%";
      } 
//         }
    };
    this.view.btnProceedToPayment.onClick = this.testPaymentgateway.bind(this);
    this.view.btnCancel.onClick = () =>  {
      this.view.flxPopUpPayment.setVisibility(false); 
      this.view.flxOverLay.setVisibility(false);
      
    };
    
//     this.view.flxArrow.onClick =  this.navToBack.bind(this);
   

  },
  
  onPreShow: function()
  {
//     this.toggleFooterIcons();
//     this.getDepositLimit();
     var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
        var id = previousForm.id;
        var formsToDestroy = ["frmRegister2"];
        
        if (formsToDestroy.includes(id)) {
            voltmx.application.destroyForm(id);
        }
    } 
    if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    this.depositAmount = 0;
     this.view.btnPayNow.setEnabled(false);
     this.view.btnPayNow.skin = "sknBtn7676760RADIUS8PXFONTFFFFFF";
    this.view.flxPaymentStatusCheck.setVisibility(false);
    
    this.view.lblShowBiddingLimit.text = "0";
    this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
    this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
    this.getDepositLimit();
    this.view.imgDropDown.setVisibility(true);
    if(this.view.flxPopUpPayment){
      this.view.flxPopUpPayment.setVisibility(false);
    }
    
//      var previousForm = voltmx.application.getPreviousForm();
//     if (previousForm) {
//         var id = previousForm.id;
//         var formsToDestroy = ["frmRegister2"];
        
//         if (formsToDestroy.includes(id)) {
//             voltmx.application.destroyForm(id);
//         }
//     }
    
  },
  
     getDepositLimit: function(){
    var self = this;
  self.view.segDepositAmount.setData([]);
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

  
  },
  
  navToBack: function(){
    new voltmx.mvc.Navigation("frmRegister2").navigate();
  },
  
  onPostShow: function()
  {
    
   var self = this;

    
    
    self.view.btnRefreshStatus.onClick = () =>{
      self.view.flxPaymentStatusCheck.setVisibility(false);
      if (voltmx.store.getItem("awaitingPayment") === true) {
        voltmx.store.removeItem("awaitingPayment");
        self.getPaymentStatus();
    }
    }
    
  },
  
//    invokeGetBuyerSecurityDeposit: function()
//   {
    
//    var self = this;

//     function invokeBuyerSecurityCallBack(status, get_buyer_security_deposit) {
//       self.originallimit = get_buyer_security_deposit.security_deposit_details[0].avaliable_bidding_limit;
      
//       self.view.lblShowBiddingLimit.text = self.originallimit;
//     }
//     if (get_buyer_security_deposit_inputparam == undefined) {
//         var get_buyer_security_deposit_inputparam = {};
//     }
//     var userid = voltmx.store.getItem("userId");
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     get_buyer_security_deposit_inputparam["serviceID"] = "fry_wf$get-buyer-security-deposit";
//     get_buyer_security_deposit_inputparam["user_id"] = userid;
    
    
//     var get_buyer_security_deposit_httpheaders = {
//       "user_token": usertoken
//     };
//     get_buyer_security_deposit_inputparam["httpheaders"] = get_buyer_security_deposit_httpheaders;
//     var get_buyer_security_deposit_httpconfigs = {};
//     get_buyer_security_deposit_inputparam["httpconfig"] = get_buyer_security_deposit_httpconfigs;
//     fry_wf$get_buyer_security_deposit = mfintegrationsecureinvokerasync(get_buyer_security_deposit_inputparam, "fry_wf", "get-buyer-security-deposit", invokeBuyerSecurityCallBack);
 
    
    
//   },
  

 
  
  flxDropDownOnClickAction: function(){
    if(this.view.imgUpArrow.isVisible){
      this.view.flxDocTypeDropDownList.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
      this.view.imgUpArrow.setVisibility(false);
    }
    else if(this.view.imgDropDown.isVisible){
      this.view.flxDocTypeDropDownList.setVisibility(true);
      this.view.imgUpArrow.setVisibility(true);
      this.view.imgDropDown.setVisibility(false);
    }

  },
  

  
//   segTypesOnRowClickAction: function() {
//     var selectedRow = this.view.segDepositAmount.selectedRowItems[0];
//     voltmx.print("SelectedRow :" + JSON.stringify(selectedRow));

//     var deposit_amt = selectedRow.lblDepositLimit;
//     var selectedEntryId = selectedRow.entry_id;

//     // Save the selected deposit amount
//     voltmx.store.setItem("deposit_amt", deposit_amt);

//     // Find record by entry_id
//     var matchedRecord = this.fullChipsetData.find(function(item) {
//         return item.entry_id === selectedEntryId;
//     });

//     if (matchedRecord) {
//         var maxBid = Number(matchedRecord.max_bid);
        
//         // Always calculate new bid limit as: originallimit + selected maxBid
//         this.newbidlimit = Number(this.originallimit || 0) + maxBid;

//         // Update UI
//          this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
//         this.view.lblShowBiddingLimit.text = this.newbidlimit.toLocaleString('en-US');
//         this.view.requireAmtToDeposit.text = "You need to deposit (AED) \n" + deposit_amt;
//         this.view.lblReqBiddingLimit.text = "To get (Bidding Limit) \n" + maxBid;

//         // Store for internal use
//         this.depositAmount = deposit_amt;
//         voltmx.store.setItem("bid_limit", maxBid);

//         // UI visibility updates
//         this.view.flxDocTypeDropDownList.setVisibility(false);
//         this.view.imgDropDown.setVisibility(true);
//         this.view.imgUpArrow.setVisibility(false);
//     } else {
//         voltmx.print("No matching record found for entry_id: " + selectedEntryId);
//     }
// },
  
//   segTypesOnRowClickAction: function() {
//     if (this.view.segDepositAmount.selectedRowItems && this.view.segDepositAmount.selectedRowItems.length > 0) {

//     var selectedRow = this.view.segDepositAmount.selectedRowItems[0];
//     voltmx.print("SelectedRow :" + JSON.stringify(selectedRow));

//     var deposit_amt = selectedRow.lblDepositLimit;
//     var selectedEntryId = selectedRow.entry_id;

//     // Save selected deposit amount
//     voltmx.store.setItem("deposit_amt", deposit_amt);

//     // Parse deposit amount to number (remove commas if any)
//     var numericDeposit = Number(deposit_amt.replace(/,/g, ''));

//     // Calculate maxBid as 10x the selected deposit
//     var maxBid = numericDeposit * 20;

//     // Store for internal use
//     this.depositAmount = numericDeposit;
    
    
//     if(this.view.lblPayAedAmount){
// //         this.view.lblPayAedAmount.text = "Pay AED "+numericDeposit+" \nby Debit/Credit Card";
//     this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED") +numericDeposit+"\n"+voltmx.i18n.getLocalizedString("by Debit/Credit Card");
//       }
//     this.newbidlimit = Number(this.originallimit || 0) + maxBid;

//     // Update UI
//     this.view.btnPayNow.skin = "sknBtn61b35c20pxbold";
//     this.view.btnPayNow.setEnabled(true);
//     this.view.lblShowBiddingLimit.text = this.newbidlimit.toLocaleString('en-AE');
//     this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("You need to deposit (AED)") + numericDeposit.toLocaleString('en-AE');
//     this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("To get (Bidding Limit)") + maxBid.toLocaleString('en-AE');

//     // Store maxBid
//     voltmx.store.setItem("bid_limit", maxBid);

//     // UI visibility
//     this.view.flxDocTypeDropDownList.setVisibility(false);
//     this.view.imgDropDown.setVisibility(true);
//     this.view.imgUpArrow.setVisibility(false);
//     }
// },
  
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
    voltmx.net.clearCookies();
     voltmx.store.removeItem("linkdata");
     voltmx.store.removeItem("access_token");
    voltmx.store.removeItem("order_id");
    voltmx.store.removeItem("awaitingPayment");
    voltmx.store.removeItem("transactionDetails");
    voltmx.store.removeItem("paymentId");
    self.accesstoken = null;
 
self.orderId = null;
self.transactionDetails = null;
self.paymentId = null;
self.transactionDetails1 = null;
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
  },
  
  
  
  
   testPaymentgateway1: function(payment_access_token) {
     var self = this;
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
        var email = voltmx.store.getItem("email");
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
//            var x = new voltmx.mvc.Navigation("frmBrowserPayment");
//           x.navigate();
          voltmx.store.setItem("awaitingPayment", true);
          self.callCreateRecordAPIInitially(JSON.parse(requestStringEmail));
//           voltmx.application.openURL(hreflink);
          if(self.view.flxPopUpPayment){
      self.view.flxPopUpPayment.setVisibility(false);
      self.view.flxOverLay.setVisibility(false);
//       self.view.flxPaymentStatusCheck.setVisibility(true);
//               voltmx.application.showLoadingScreen(null, "Updating status.. Please don't close.",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//         voltmx.timer.schedule("checkPaymentTimer", function() {
//       voltmx.application.dismissLoadingScreen();
//       if (typeof self.getPaymentStatus === "function") {
//         self.getPaymentStatus();
//       }
//     }, 80, false);
  
    }
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
  
  callCreateRecordAPIInitially: function(trdetails)
  {
    this.transactionDetails = trdetails;
    var self = this;
    
     var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
   
   var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
    
         var url = baseURL + "services/ms_common/api/v1/create-initial-payment-record";
//            var url = "http://20.233.107.18/api/v1/initial-payment/add-initial-security-deposit-payment";
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
        var useridafterregister = voltmx.store.getItem("useridafterregister");
        var regidafterregister = voltmx.store.getItem("regId");
//          var usertoken = voltmx.store.getItem("getUserAccesstoken");
//        request.setRequestHeader("Authorization","Basic "+payment_access_token);
//         request.setRequestHeader("user_token",self.usertoken);
        request.setRequestHeader("Content-Type", "application/json");

//         request.setRequestHeader("Authorization","Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
//         request.setRequestHeader("Accept", "application/json");
           request.setRequestHeader("Authorization","Basic "+ encodeVal);
        if (trdetails.formattedAmount) {
    trdetails.formattedAmount = trdetails.formattedAmount.replace(/[^\x20-\x7E]/g, "");
}
        self.transactionDetails = trdetails;
        
        var body = {
  "user_id": useridafterregister,
  "reg_id": Number(regidafterregister),
  "asset_category": "",
    "payment_action": "deposit",
    "reference_id": useridafterregister,
  "transaction_details": trdetails,
 "payment_method": "EPayment",
 "payment_module": "security_deposit"
       
};
        
       request.send(JSON.stringify(body));
        var urllink = voltmx.store.getItem("linkdata");
              // Handle the response
      request.onReadyStateChange =  function() {
        if (request.readyState === 4) {
          
//           this.view.flxOverLay.setVisibility(false);
//           this.view.flxPopUpPayment.setVisibility(false);
//             if (request.status === 201 || request.status === 200) {
//               self.updateInitialPayment(trdetails);
              var requestStringEmail = request.responseText;
//                alert("create "+requestStringEmail);
             self.createPaymentResponse = JSON.parse(requestStringEmail);
           if(self.createPaymentResponse && self.createPaymentResponse.data && self.createPaymentResponse.data.payment_id){

              var paymentId = self.createPaymentResponse.data.payment_id;
              self.paymentId = paymentId;
//                alert('create res '+requestStringEmail);
//           voltmx.application.openURL(urllink);
                   new voltmx.mvc.Navigation("frmBrowserPayment").navigate();

              
           }
          
         
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
  
  callUpdateRecordAPI: function()
  {
    
    var self = this;
       voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
   
   var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
    
         var url = baseURL +"services/ms_common/api/v1/update-initial-payment";
      try {
          var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
 var useridafterregister = voltmx.store.getItem("useridafterregister");
        var regidafterregister = voltmx.store.getItem("regId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");

        request.setRequestHeader("Content-Type", "application/json");
//         request.setRequestHeader("Authorization","Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
//         request.setRequestHeader("user_token", usertoken);
          request.setRequestHeader("Authorization", "Basic "+encodeVal);
        var body = {
 "transaction_details": self.transactionDetails1,
          "asset_category": "",
     "payment_action": "deposit",
     "reference_id": useridafterregister,
     "user_id": useridafterregister,
     "payment_id": self.paymentId,
      "reg_id": Number(regidafterregister),
     "payment_module": "security_deposit"
       
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

               new voltmx.mvc.Navigation("frmPaymentSuccess").navigate();   

              }
              
                


            } catch (e) {
              voltmx.print("Response parsing failed:\n" + requestStringEmail);
            }

                }

      }
      }
    catch(error){
      alert(" Error: " + error.message);
    }
  },
  
  getPaymentStatus: function () {
  var self = this;
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
        var response = JSON.parse(request.responseText);
        voltmx.application.dismissLoadingScreen();
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
//     if (typeof self.getNewAccess === "function") {
//     self.getNewAccess();
//     }
//     new voltmx.mvc.Navigation("frmPaymentSuccess").navigate();
//         if (typeof self.getNewAccess === "function") {
//     self.getNewAccess();
//     }
    
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
//   alert("⏳ Payment is still pending or being processed.");
    self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text = "Payment is still pending or being processed.";
}
           else{
//              alert(payment.state);
   self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text = payment.state;
           }
          
} else {
 
 self.view.SmthngWentWrong.setVisibility(true);
   self.view.SmthngWentWrong.lblSomethingWentWrong.text ="Payment Failed!";
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
     var x = new voltmx.mvc.Navigation("frmRegister2");
     x.navigate();
  },
  
   getNewAccess: function() {
    var self = this;
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
  
   adjustRTLLayout: function() {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
         this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
         this.view.lblVehicles.text = voltmx.i18n.getLocalizedString("Vehicles");
       this.view.lblAuctionType.text = voltmx.i18n.getLocalizedString("Auction Type");
       this.view.lblpaymentType.text = voltmx.i18n.getLocalizedString("Payment Method");
      this.view.lblPaymentMethod.text = voltmx.i18n.getLocalizedString("Payment Method");
         this.view.lblpayupload.text = voltmx.i18n.getLocalizedString("Pay/Upload");
    this.view.lblBiddingLimit.text = voltmx.i18n.getLocalizedString("Your new bidding limit will be");
    this.view.btnPrevious.text = voltmx.i18n.getLocalizedString("PREVIOUS");
    this.view.btnPayNow.text = voltmx.i18n.getLocalizedString("Pay Now");
    this.view.lblPaymentMethodValue.text = voltmx.i18n.getLocalizedString("Debit/Credit Card");
    this.view.requireAmtToDeposit.text = voltmx.i18n.getLocalizedString("Enter Required Amount to deposit");
    this.view.lblReqBiddingLimit.text = voltmx.i18n.getLocalizedString("Enter Required Bidding Limit");
    this.view.lblNotice.text = voltmx.i18n.getLocalizedString("To proceed, Kindly ensure that the deposit limit is minimum of 5000");
       this.view.lblSpecifyTheBiddingLimit.text = voltmx.i18n.getLocalizedString("Specify the Bidding Limit You require");
       this.view.lblYourBiddingLimit.text = voltmx.i18n.getLocalizedString("Your bidding limit will be instantly updated once your online  payment is successful.");
    this.view.btnPrevious.text = voltmx.i18n.getLocalizedString("Save For Later");
     this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("closeCaps");
//     this.view.flxArrow.reverseLayoutDirection = isArabic;
    this.view.flxVehicles.reverseLayoutDirection = isArabic;
    this.view.flxNotification.reverseLayoutDirection = isArabic;
    this.view.requireAmtToDeposit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblReqBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblVehicles.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblSpecifyTheBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblYourBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblNotice.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblReqBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblShowBiddingLimit.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblText.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblTermsAndConditions.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     if (isArabic) {
       
//     var flipTransform = voltmx.ui.makeAffineTransform();
//     flipTransform.scale(-1, 1); // horizontal flip
//     this.view.imgBack.transform = flipTransform;
       this.view.requireAmtToDeposit.left = "";
       this.view.requireAmtToDeposit.right = "10dp";
  
       this.view.flxDropDown.right = "";
       this.view.flxDropDown.left = "10dp";
       
       this.view.lblReqBiddingLimit.left = "";
       this.view.lblReqBiddingLimit.right = "10dp";
       
       this.view.lblPaymentMethod.left = "";
       this.view.lblPaymentMethod.right = "5%";
       
       this.view.lblPaymentMethodValue.left = "5dp";
       this.view.lblPaymentMethodValue.right = "";
     }
     else{
       
       this.view.lblPaymentMethod.left = "5%";
       this.view.lblPaymentMethod.right = "";
       
       this.view.lblPaymentMethodValue.left = "";
       this.view.lblPaymentMethodValue.right = "5dp";
       
      this.view.requireAmtToDeposit.left = "10dp";
       this.view.requireAmtToDeposit.right = "";
       
       this.view.flxDropDown.right = "10dp";
       this.view.flxDropDown.left = "";
       
       this.view.lblReqBiddingLimit.left = "10dp";
       this.view.lblReqBiddingLimit.right = "";
//        this.view.imgBack.transform = voltmx.ui.makeAffineTransform();

     }
  }
  
  

 });