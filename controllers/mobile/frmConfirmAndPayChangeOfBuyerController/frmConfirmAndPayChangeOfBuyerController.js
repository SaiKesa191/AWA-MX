define({

  navData: {},

  onNavigate: function (context) {
//     this.navData = context || {};
     
  
    
     
     if (context && context.paymentCompleted === true) {
        voltmx.application.showLoadingScreen(null, "Verifying payment...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
            shouldShowLabelInBottom: "true",
            separatorHeight: 45,
            progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
            progressIndicatorColor: "Gray"
        });
//         voltmx.application.destroyForm("frmBrowserPayment");
       
//        "78461"
        this.getPaymentStatus(); // Now safely call the function
    }
    
    else  if (context && context.source && context.source === "frmChangeOfBuyer02") {
       // alert("Loading order summary...");
//       this.navData = context || {};

  this.lotId = context.lotId ;
  this.location = context.location ;
  this.contactnumber = context.contactnumber ;
  this.emiratesId = context.emiratesId ;
  this.name = context.newBuyerName ;

  this.formData = context.formData ;
  this.object_id = context.formData.object_id ;
  this.notes = context.formData.notes ;
  this.documentId = context.formData.document_id ;
        this.orderSummary();
    }
      this.setData();
    this.view.flxBack.onClick = this.
    navigateToRequestYourInspectionReport.bind(this);
    this.view.btnCancel.onClick = this.
    navigateToRequestYourInspectionReport.bind(this);
    this.view.btnProceedPayment.onClick = this.proceedPayment.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    
    this.view.btnProceedPayment=this.proceedPayment.bind(this);
    this.view.btnProceedToPayment.onClick = this.testPaymentgateway.bind(this);
    this.view.btnGotoAuctions.onClick=this.afterSuccessfulPayment.bind(this);
//     this.view.flxRemovePaypopup.onClick=this.view.flxPopUpPayment.setVisibility(false);
    this.view.btnCancelPopUp.onClick=this.closePaymentPopUp.bind(this);
    
     this.view.flxRemovePaypopup.onClick=this.closeSuccessPopUp.bind(this);
  

  },

  onPreShow: function () {
    this.toggleFooterIcons();
//     this.orderSummary(); 
    this.depositAmount = 0;
     this.view.flxPaymentSuccessPopup.setVisibility(false);
    
    
      this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    

    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    if(this.view.flxPopUpPayment){
    this.view.flxPopUpPayment.setVisibility(false);
    }

  },
  
  
  
   flxErrorBtnTryAgainOnClickAction: function() {
     var self = this;
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      self.view.flxError.setVisibility(false);
      if (self.setUpDataPreshow && typeof self.setUpDataPreshow === "function") {
            self.setUpDataPreshow();
        }
    } else {
      voltmx.print("Still offline...");
    }
  },
  
  
afterSuccessfulPayment: function () {
    var nav = new voltmx.mvc.Navigation("frmDashBoard");
    nav.navigate();
    this.view.flxPaymentSuccessPopup.setVisibility(false);
},
  
  
  
   closeSuccessPopUp: function(){
    
   this.view.flxPaymentSuccessPopup.setVisibility(false);
     var nav = new voltmx.mvc.Navigation("frmDashBoard");
    nav.navigate();
    
  },

  
 

  toggleFooterIcons: function () {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);

    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";

    var mode = voltmx.store.getItem("mode") || "seller";
    if (mode === "seller") {
      this.view.Footer2.imgMyBids.src = "mylistings.png";
     // this.view.Footer2.lblMyBids.text = "Listings";
    } else {
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    //  this.view.Footer2.lblMyBids.text = "My Bids";
    }

    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");

    this.view.Footer2.imgSellCar.setVisibility(!(isLogin === true &&
                                                 isUserCreated === true));
    this.view.Footer2.flxProfile.setVisibility(isLogin === true && 
                                               isUserCreated === true);
  },

  navigateToRequestYourInspectionReport: function () {
    new voltmx.mvc.Navigation("frmChangeOfBuyer02").navigate();
  },

  proceedPayment: function () {
//     alert("Proceed Payment Clicked..!!!");
    this.view.flxPopUpPayment.setVisibility(true);
    var totalserviceamount = voltmx.store.getItem("totalamount");
//     this.view.lblPayAedAmount.text="Pay AED "+totalserviceamount+"\n"+"by Debit/Credit Card";
    this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED") +totalserviceamount+"\n"+voltmx.i18n.getLocalizedString("by Debit/Credit Card");

  },
  
  
   closePaymentPopUp: function(){
   this.view.flxPopUpPayment.setVisibility(false);
  },

  orderSummary: function () {
    var self = this;
//   

    self.view.lblOrderSummary.text = "Order Summary";
    self.view.lblOrderSummary.skin="sknlbl231F20"
    self.view.lblVehicleLotID.text = "Vehicle ID";
    self.view.lblContactNumber.text = "Contact Number";
    self.view.lblNewBuyer.text = "New Buyer Name";
    self.view.lblEmirates.text = "Emirates ID";
    self.view.lblLocation.text = "Location";

    // Assign values or "-"
    self.view.lblVehicleLotIDVal.text = self.lotId;
    self.view.lblLocationvalue.text = self.location;
    self.view.lblNewBuyerValue.text = self.name;
    self.view.lblContactNumberValue.text = self.contactnumber;
    self.view.lblemiratesID.text = self.emiratesId;
 
 
     var userId = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");

 function INVOKE_SERVICE(status, response) {
   
  
   if(response && response.opstatus && response.opstatus === 1011){
     if(self.view.flxError){
       voltmx.print("entered");
       self.view.flxError.lblNetworkConnectionerror.text = 
         "Network issue. Please check your connection.";
       self.view.flxError.setVisibility(true);
     }
     return;
   }


   if(response && response.opstatus && response.opstatus !== 0){
     if(this.view.SmthngWentWrong){
       this.view.SmthngWentWrong.setVisibility(false);
     }
     return;
   }
   
   if(!response && !response.records){
     voltmx.print("no records found..");
     return;
   }

  var services_list = response.records;

  if (!Array.isArray(services_list)) {
    voltmx.print("records is not an array.");
    return;
  }

  for (var i = 0; i < services_list.length; i++) {
    var item = services_list[i];


    if(item.name && item.name.includes("Buyer Change")){

      
      var serviceFee = parseFloat(item.amount);
//       var tax = 25;
            var tax = parseFloat((serviceFee * 0.05).toFixed(2)); 


      self.view.lblAmountPayable.text=voltmx.i18n.getLocalizedString("Amount Payable");
      self.view.lblServiceFeeVal.text="Service Fee:"+ serviceFee + "AED";
//       self.view.lblTaxFeeVal.text="tax Fee:"+tax+"AED";
      var total=serviceFee+tax;
      
      self.depositAmount=parseInt(total);
//       alert(self.depositAmount);
//       self.view.lblTotalcostVal.text="Total cost:557.58 AED";
      self.view.lblTaxFeeVal.text = "Tax Fee: " + tax.toFixed(2) + " AED";
      self.view.lblTotalcostVal.text =
        "Total cost: " + total.toFixed(2) + " AED";

      voltmx.store.setItem("inspectionAmount", item.amount);
      voltmx.store.setItem("totalamount", total);
      break;
    }
  }
}


    if (services_list_inputparam == undefined) {
        var services_list_inputparam = {};
    }
    services_list_inputparam["serviceID"] = "fry_int_admin$services-list";
     services_list_inputparam["foundrySerivceName"] ="Service list";
    services_list_inputparam["serviceAction"] ="list";
    services_list_inputparam["name"] ="";
    services_list_inputparam["amount"] ="";
    services_list_inputparam["page_number"] ="1";
     services_list_inputparam["page_size"] ="100";
     services_list_inputparam["filter_list"] ="";
    
    var services_list_httpheaders = {
      "user_token": usertoken
    };
    services_list_inputparam["httpheaders"] = services_list_httpheaders;
    var services_list_httpconfigs = {};
    services_list_inputparam["httpconfig"] = services_list_httpconfigs;
    fry_int_admin$services_list = mfintegrationsecureinvokerasync
    (services_list_inputparam, 
                           "fry_int_admin", 
                          "services-list",
                              INVOKE_SERVICE);
  
  },
  
  
  
  
  
  
   testPaymentgateway: function () {
  var self = this;
  voltmx.net.clearCookies();
  // Show loading screen
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

  // Authorization credentials (Base64 encoded client_id:client_secret)
  var encodedValue = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
  var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Authorization", "Basic " + encodedValue);
    request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
    request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");

    request.send();

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          var accessToken = response.access_token;

          // Pass token to next function
          self.testPaymentgateway1(accessToken);
        } else {
          alert("Failed to fetch access token. Status: " + request.status);
        }
      }
    };
  } catch (error) {
    voltmx.application.dismissLoadingScreen();
    alert("Error: " + error.message);
  }
},
testPaymentgateway1: function (payment_access_token) {
  var self = this;

  self.accesstoken = payment_access_token;

  // Show loading screen
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

  var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Authorization", "Bearer " + payment_access_token);
    request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
    request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");

    var body = {
      "action": "PURCHASE",
      "amount": {
        "currencyCode": "AED",
        "value": self.depositAmount*100 // should be in *fils* (1 AED = 100 fils) // Here we need to add amount
      },
       "merchantAttributes": {
       "redirectUrl": "https://paypage.sandbox.ngenius-payments.com/?code=5efa82b95a7926cb",
        "skipConfirmationPage": true
      }
    };

    request.send(JSON.stringify(body));

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        if (request.status === 201 || request.status === 200) {
          var response = JSON.parse(request.responseText);
          var paymentLink = response._links.payment.href;
          var orderId = response._id;
          self.orderId = orderId.split(":")[2];
          self.transactionDetails = response;

          voltmx.store.setItem("awaitingPayment", true);

          // Optional: store payment link if needed
           voltmx.store.setItem("linkdata", paymentLink);

          // Call backend record creation API
          self.callCreateRecordAPI(response, paymentLink);

          // UI Updates
          if (self.view.flxPopUpPayment) {
            self.view.flxPopUpPayment.setVisibility(false);
          //  self.view.flxOverLay.setVisibility(false);

          }
        } else {
          alert("Order creation failed. Status: " + request.status);
        }
      }
    };
  } catch (error) {
    voltmx.application.dismissLoadingScreen();
    alert("Error: " + error.message);
  }
},

callCreateRecordAPI: function (trdetails, hreflink) {
  var self = this;

  // Store transaction details locally
  self.transactionDetails = trdetails;

  // Ensure special characters are cleaned
  if (trdetails.formattedAmount) {
    trdetails.formattedAmount = trdetails.formattedAmount.replace(/[^\x20-\x7E]/g, "");
  }

  // Validate user token first
//   checkTokenValidatity(function () {
//     var url = "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/create-payment-record";
    
//       var self = this;
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

      // Get user-related data
      var userId = voltmx.store.getItem("userId");
      var regId = voltmx.store.getItem("regId");
      var userToken = voltmx.store.getItem("getUserAccesstoken");
      var userData = voltmx.store.getItem("pickupData");

      // Set headers
      request.setRequestHeader("Content-Type", "application/json");
//       request.setRequestHeader("Authorization", "Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
       request.setRequestHeader("Authorization", "Basic "+encodeVal);
      request.setRequestHeader("user_token", userToken);

      // Prepare body
      var body = {
        asset_category: "",
        payment_action: "deposit",
        reference_id: self.object_id,
        transaction_details: trdetails,
        payment_method: "EPayment",
        payment_module: "bc-change",
        service_type: "bc-change", // or "inspection", "bc-change"
        service_request: 
        {    // Here Pass the JSon
//           service_type: "rsa",
//           notes: userData.lblMsg,
//           service_provider_id: "1",
//           object_id: userData.lblObjectId
          "service_type": "bc-change",
          "service_id": 31,
          "object_id":self.object_id ,
          "notes": self.notes,
          "new_buyer_id": "",
          "name":self.name,
          "emirate": "UAE",
          "document_id": self.emiratesId
//           "document_id": voltmx.store.getItem("navDataForPayment").emiratesId
         
          
                   
        }
      };

      // Send request
      request.send(JSON.stringify(body));

      request.onReadyStateChange = function () {
        if (request.readyState === 4) {
          var responseString = request.responseText;
          var response = JSON.parse(responseString);
          self.createPaymentResponse = response;

          // Success check
          if (response && response.data && response.data.payment_id) {
            var paymentId = response.data.payment_id;
            self.paymentId = paymentId;

            // Open N-Genius payment page
            //voltmx.application.openURL(hreflink);
            new voltmx.mvc.Navigation("frmBrowserPayment").navigate();
          } else {
            alert("Payment record creation failed.");
          }
        }
      };
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
},

callUpdateRecordAPI: function () {
//   var self = this;

//   checkTokenValidatity(function () {
//     var url = "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/update-payment-record-by-id";
    
    
    
    
//       var baseURL = voltmx.store.getItem("BASE_URL");
//       if(baseURL){
//       if (!baseURL.endsWith("/")) {
//       baseURL += "/";
//     }
//       }
   
//    var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
//    var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
//     var encodeVal = base64Encode(appkey + ":" + appsecret);
// //          var url = baseURL +"services/ms_common/api/v1/update-payment-record-by-id";
//            var url = baseURL +"services/ms_common/api/v1/update-payment-record-by-id";

//     try {
//       var request = new voltmx.net.HttpRequest();
//       request.open("PUT", url);
// //        request.open("POST", url);

//       // Fetch stored values
//       var userId = voltmx.store.getItem("userId");
//       var regId = voltmx.store.getItem("regId");
//       var userToken = voltmx.store.getItem("getUserAccesstoken");
//       var userData = voltmx.store.getItem("pickupData");

//       // Set request headers
//       request.setRequestHeader("Content-Type", "application/json");
// //       request.setRequestHeader("Authorization", "Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
//   request.setRequestHeader("Authorization","Basic "+encodeVal );

//       request.setRequestHeader("user_token", userToken);
    
    
    
    
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
    
    
    
  
      // Prepare request body
      var body = {
        transaction_details: self.transactionDetails1,
        payment_method: "E-Payment",
        payment_id: self.paymentId,
      
//         key:"value",
        asset_category: "",
        payment_module: "bc-change",
        payment_action: "deposit",
       
          reference_id: self.object_id,
//          reference_id:  voltmx.store.getItem("objectIDForpayment"),
        service_type: "bc-change", // or "inspection" | "bc-change"
        service_request: {  // Here Pass the JSON
          "service_type": "bc-change",
          "service_id": 31,
          "object_id": self.object_id,
//            "object_id": voltmx.store.getItem("objectIDForpayment"),
          "notes": self.notes , 
           "new_buyer_id":"",
          "name": self.name,
          "emirate": "UAE",
          "document_id": self.emiratesId
        }
        
        
                
    
      };

        
       // alert("reference id:"+ self.objectid);
       //  alert("notes :"+ self.notes);
      // Send the request
      request.send(JSON.stringify(body));
      //  alert(JSON.stringify(body));

      // Handle the response
      request.onReadyStateChange = function () {
        if (request.readyState === 4) {
          var responseString = request.responseText;
          try {
            var response = JSON.parse(responseString);
          // alert("Update record response:\n" + JSON.stringify(response));
            
            if(response && response.data && response.data.payment_status && response.data.payment_status.toLowerCase() ==="completed"){

              self.view.flxPaymentSuccessPopup.setVisibility(true);   

            }
            
                else if(response && response.error && response.error.message)
              {
//                 alert(response.error.message);
                self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text= response.error.message;
              }

            else{

//               alert(responseString+"Payment failed.please try again...")
               self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text= "Something went wrong .please try again..";

            }
          } catch (e) {     
            
            alert("Response parsing failed:\n" + responseString);
          }
        }
      };

    } catch (error) {
      alert("Error: " + error.message);
    }
  });
},
getPaymentStatus: function () {
  var self = this;

  var statusUrl = self.transactionDetails._links.self.href;
  var accessToken = self.accesstoken;

  if (!statusUrl || !accessToken) {
    alert("Missing payment details. Cannot check status.");
    return;
  }

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("GET", statusUrl);
    request.setRequestHeader("Authorization", "Bearer " + accessToken);
    request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
    request.send();

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        try {
          var response = JSON.parse(request.responseText);

          var payment = null;
 
if (response && response._embedded && response._embedded.payment) {
  if (response._embedded.payment.length > 0) {
    payment = response._embedded.payment[0];
  }
}
         // var payment = response._embedded.payment[0];
          if (!payment) {
            alert("Invalid payment response format.");
            return;
          }

          var paymentState = payment.state;
          var authResponse = payment.authResponse;

          if (
            paymentState === "PURCHASED" &&
            authResponse.success === true &&
            authResponse.resultCode === "00"
          ) {
        
//             self.view.flxPaymentSuccessPopup.setVisibility(true);  
            // Replace with your Success Pop Messgae

            // Optional: Refresh token or update backend
            if (typeof self.getNewAccess === "function") {
              self.getNewAccess();
            }

          } else if (
            paymentState === "FAILED" ||
            (authResponse && authResponse.success === false)
          ) {
            // ❌ Payment failed
            alert("Payment failed. Please try again.");
          } else if (
            paymentState === "INITIATED" ||
            paymentState === "AUTHORISED" ||
            paymentState === "RECEIVED"
          ) {
            // ⏳ Payment is pending
           // alert("⏳ Payment is still pending or being processed.");
          } else {
            // Unknown state
            //alert("Payment state: " + paymentState);
          }

        } catch (parseError) {
          alert("Failed to parse response: " + parseError.message);
        }
      }
    };

  } catch (err) {
    voltmx.application.dismissLoadingScreen();
    alert("Error checking payment status: " + err.message);
  }
},
testPaymentgateway2: function () {
  var self = this;

  // Validate necessary values
  if (!self.orderId || !self.payment_access_token) {
    alert("Missing orderId or access token.");
    return;
  }

  // API endpoint with orderId
  var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders/" + self.orderId;

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("GET", url);

    // Set headers
    request.setRequestHeader("Authorization", "Bearer " + self.payment_access_token);
    request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
    request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");

    // Send request
    request.send();

    // Handle response
    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        try {
          var response = JSON.parse(request.responseText);

          // Clean up any special characters
          if (response.formattedAmount) {
            response.formattedAmount = response.formattedAmount.replace(/[^\x20-\x7E]/g, "");
          }

          self.transactionDetails1 = response;

          // If valid, update backend record
          if (self.transactionDetails1) {
            self.callUpdateRecordAPI();
          } else {
            alert("Failed to retrieve order details.");
          }

        } catch (parseError) {
          alert("Failed to parse response: " + parseError.message);
        }
      }
    };

  } catch (error) {
    voltmx.application.dismissLoadingScreen();
    alert("Error fetching order details: " + error.message);
  }
},
getNewAccess: function () {
  var self = this;

  voltmx.application.showLoadingScreen(
    null,
    "Loading...",
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

  // Base64-encoded credentials (client_id:client_secret)
  var encodedCreds = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
  var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);

    // Set headers
    request.setRequestHeader("Authorization", "Basic " + encodedCreds);
    request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
    request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");

    // Send request
    request.send();

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        if (request.status === 200) {
          try {
            var response = JSON.parse(request.responseText);
            self.payment_access_token = response.access_token;

            if (self.payment_access_token) {
              self.testPaymentgateway2(); // Proceed with next step
            } else {
              alert("Access token not found in response.");
            }

          } catch (parseError) {
            alert("Error parsing token response: " + parseError.message);
          }
        } else {
          alert("Failed to get access token. Status: " + request.status);
        }
      }
    };
  } catch (error) {
    voltmx.application.dismissLoadingScreen();
    alert("Error requesting access token: " + error.message);
  }
},
  
  setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

   if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
      var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
     
   this.view.btnCancelPopUp.left = null;
     this.view.btnCancelPopUp.right = "2%";
     
     this.view.btnProceedToPayment.left = "2%";
     this.view.btnProceedToPayment.right = null;
     
} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
   this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
  
  this.view.btnCancelPopUp.left = "2%";
     this.view.btnCancelPopUp.right = null;
     
     this.view.btnProceedToPayment.left = null;
     this.view.btnProceedToPayment.right = "2%";
}
  // Determine alignment and direction
  var direction = isArabic; // true for Arabic (RTL), false otherwise

  const labels = [
    "lblVehicleLotID",
    "lblLocation",
    "lblContactNumber",
    "lblNewBuyer",
    "lblEmirates",
    "lblAmountPayable",
    "lblConfirmAndPay",
    "lblText"
  ];

  const values = [
    "lblVehicleLotIDVal",
    "lblLocationvalue",
    "lblContactNumberValue",
    "lblNewBuyerValue",
    "lblemiratesID",
    "lblConfirmAndPay",
    "lblTermsAndConditions"
  ];

  if (isArabic) {
    labels.forEach(label => {
      if(this.view[label]){
        this.view[label].contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      }
    });
    values.forEach(value => {
      if(this.view[value]){
        this.view[value].contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      }
    });
  } else {
    labels.forEach(label => {
      if(this.view[label]){
        this.view[label].contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      }
    });
    values.forEach(value => {
      if(this.view[value]){
        this.view[value].contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      }
    });
  }

  // List of Flex containers to reverse layout direction
  var flexList = [
    "flxUnderLineContainer", "flxVehicleLotID", "flxReportType", "flxAmountPayable",
    "flxLocation1", "flxContactNumber", "flxnewBuyerName", "flxEmirates","flxTittle"
  ];
 this.view.lblConfirmAndPay.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // Apply reverseLayoutDirection
  flexList.forEach(flx => {
    if(this.view[flx]){
      this.view[flx].reverseLayoutDirection = direction;
    }
  });

 // Localization of text
  this.view.lblTermsAndConditions.text = voltmx.i18n.getLocalizedString("Please read the following terms and conditions for transaction refunds careful.");
  this.view.lblText.text = voltmx.i18n.getLocalizedString("paymentTAndC");
  this.view.btnCancelPopUp.text = voltmx.i18n.getLocalizedString("cancel");
  this.view.btnProceedToPayment.text = voltmx.i18n.getLocalizedString("Proceed to Payment");
  this.view.lblOrderSummary.text = voltmx.i18n.getLocalizedString("Order Summary");
  this.view.lblVehicleLotID.text = voltmx.i18n.getLocalizedString("Vehicle ID");
 // this.view.lblReportType.text = voltmx.i18n.getLocalizedString("Report Type");
  this.view.lblAmountPayable.text = voltmx.i18n.getLocalizedString("Amount Payable");
  this.view.btnCancel.text = voltmx.i18n.getLocalizedString("cancel");
  this.view.btnProceedPayment.text = voltmx.i18n.getLocalizedString("Pay Now");
  this.view.lblLocation.text = voltmx.i18n.getLocalizedString("Location");
  this.view.lblContactNumber.text = voltmx.i18n.getLocalizedString("Contact Number");
  this.view.lblNewBuyer.text = voltmx.i18n.getLocalizedString("New Buyer Name");
  this.view.lblEmirates.text = voltmx.i18n.getLocalizedString("Emirates ID");
    this.view.lblConfirmAndPay.text=voltmx.i18n.getLocalizedString("Confirm & Pay");
    
    
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



// 83132