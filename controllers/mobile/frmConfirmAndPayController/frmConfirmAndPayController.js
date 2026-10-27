define({ 
 

  onNavigate: function(context) {

    var self=this;

    this.setData();


    if (  context.paymentCompleted === true ) {
      //     if (context.paymentCompleted === true) {
      voltmx.application.showLoadingScreen(null, "Verifying payment...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
      });
      this.getPaymentStatus();
      //     }
    } else if (context.source === "frmRequestYourInspectionReport") {
      // Handle other navigation source
      this.formData = context.formData;
      this.lotId = context.lotId;
      this.serviceType = context.serviceType;
      this.objectid = context.formData.object_id;

    }


    this.view.btnProceedToPayment.onClick = this.testPaymentgateway.bind(this);
    //     this.view.btnProceedPayment.onClick = this.paymentPopUp.bind(this);
    this.view.btnCancelPopup.onClick=this.closePaymentPopUp.bind(this);



    this.view.flxBack.onClick = this.navigateToRequestYourInspectionReport.bind(this);
    this.view.btnCancel.onClick = this.navigateToRequestYourInspectionReport.bind(this);
    this.view.btnProceedPayment.onClick = this.proceedPayment.bind(this);

    this.view.btnGotoAuctions.onClick=this.afterSuccessfulPayment.bind(this);

    this.view.flxRemovePaypopup.onClick=this.closeSuccessPopUp.bind(this);



    this.view.preShow = function() {
      this.onPreShow();
    }.bind(this);
    
   this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35C1pxDubai18px45"
  },


  onPreShow: function()
  {
    this.toggleFooterIcons();
    this.orderSummary();

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
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.setUpDataPreshow();
    } else {
      voltmx.print("Still offline...");
    }
  },


  afterSuccessfulPayment: function () {
    var nav = new voltmx.mvc.Navigation("frmDashBoard");
    nav.navigate();
    this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED")+"\n"+voltmx.i18n.getLocalizedString("by Debit/Credit Card");
  }, 




  closePaymentPopUp: function(){
    this.view.flxPopUpPayment.setVisibility(false);
    this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED")+"\n"+ voltmx.i18n.getLocalizedString("by Debit/Credit Card");
  },

  closeSuccessPopUp: function(){

    this.view.flxPaymentSuccessPopup.setVisibility(false);
    var nav = new voltmx.mvc.Navigation("frmDashBoard");
    nav.navigate();
    this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED")+"\n"+ voltmx.i18n.getLocalizedString("by Debit/Credit Card");

  },



  toggleFooterIcons: function()
  {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);

    this.view.Footer2.imgHome.src = "homefooteractive.png";
    this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";

    this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";

    var mode = voltmx.store.getItem("mode");
    if(mode === "seller"){
      this.view.Footer2.imgMyBids.src = "mylistings.png";
//       this.view.Footer2.lblMyBids.text =  voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//       this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }


    var isLogin = voltmx.store.getItem("isLogin");
    //     alert("isLogin :"+isLogin);
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

  navigateToRequestYourInspectionReport: function()
  {
    new voltmx.mvc.Navigation("frmRequestYourInspectionReport").navigate();
  },
  proceedPayment: function()
  {
    //     alert("Proceed Payment Clicked..!!!");
    this.view.flxPopUpPayment.setVisibility(true);
    var totalserviceamount = voltmx.store.getItem("totalServiceAmount");
    this.view.lblPayAedAmount.text= voltmx.i18n.getLocalizedString("Pay AED") +totalserviceamount+"\n"+voltmx.i18n.getLocalizedString("by Debit/Credit Card");
  },


  orderSummary: function(){

    this.view.lblOrderSummary.text=voltmx.i18n.getLocalizedString("Order Summary");
    this.view.lblVehicleLotID.text=voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    //     this.view.lblVehicleLotIDVal.text= "#"+voltmx.store.getItem("lotId");
    this.view.lblVehicleLotIDVal.text="#"+this.lotId;
    this.view.lblReportType.text=voltmx.i18n.getLocalizedString("Report Type");
    //     this.view.lblReportTypeVal.text=voltmx.store.getItem("reportType");
    this.view.lblReportTypeVal.text=this.serviceType;
    //      this.lotId = context.lotId;
    //     this.serviceType = context.serviceType;


    var self = this;
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");

    function INVOKE_SERVICE(status, response) {
      //   alert("entered into service");
      //   alert("Full response:\n" + JSON.stringify(response, null, 2));

      //    /   JSON.stringify(response));
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
        voltmx.print("no data found..");
        return;
      }

      var services_list = response.records;


      for (var i = 0; i < services_list.length; i++) {
        var item = services_list[i];
        var serviceSelected = self.serviceType+" "+"Inspection";
        //     if (item.name && item.name.toLowerCase().includes(serviceSelected)) {

        if (item.name && item.name.includes(serviceSelected)) {
          //       alert("Amount for Car Inspection: " + item.amount);
          //       var serviceFee= item.amount;

          var serviceFee = parseFloat(item.amount);
          //       var tax = 27.5;
          var tax = parseFloat((serviceFee * 0.05).toFixed(2)); 

          self.view.lblAmountPayable.text=voltmx.i18n.getLocalizedString("Amount Payable");
          self.view.lblServiceFeeVal.text=
            voltmx.i18n.getLocalizedString("Service Fee:")+serviceFee+"AED";
          //       self.view.lblTaxFeeVal.text="tax Fee:"+tax+"AED";
          var total=serviceFee+tax;

          self.depositAmount=parseInt(total);
          //       alert(self.depositAmount);
          //       self.view.lblTotalcostVal.text="Total cost:557.58 AED";
          //       self.view.lblTaxFeeVal.text = "Tax Fee: " + tax.toFixed(2) + " AED";
          self.view.lblTaxFeeVal.text =  
            voltmx.i18n.getLocalizedString("Tax Fee:") +
            tax.toFixed(2) + " AED";
          //       self.view.lblTotalcostVal.text =
          //         "Total cost: " + total.toFixed(2) + " AED";
          self.view.lblTotalcostVal.text =
            voltmx.i18n.getLocalizedString("Total cost:")+
            total.toFixed(2) + " AED";
        self.view.btnProceedPayment.skin="sknBtnBid61B35C8pxradius"
          voltmx.store.setItem("inspectionAmount", item.amount);
          voltmx.store.setItem("totalServiceAmount", total);
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
//     var encodedValue = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
    var encodedValue = voltmx.store.getItem("PAYMENT_ACCESS_TOKEN");
//     var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
       var url = voltmx.store.getItem("PAYMENT_ACCESS_URL");
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
//             alert("Failed to fetch access token. Status: " + request.status);
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

//     var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";
       var url = voltmx.store.getItem("PAYMENT_ORDER_ID");

    try {
      var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Authorization", "Bearer " + payment_access_token);
      request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
      request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
       var email =   voltmx.store.getItem("userEmail");
      var body = {
        "action": "PURCHASE",
        "amount": {
          "currencyCode": "AED",
          "value": self.depositAmount*100 // should be in *fils* (1 AED = 100 fils) // Here we need to add amount
        },
         "emailAddress": email,
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
              //             self.view.flxOverLay.setVisibility(false);

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
        request.setRequestHeader("Authorization", "Basic "+encodeVal);
        request.setRequestHeader("user_token", userToken);

        // Prepare body
        var body = {
          asset_category: "",
          payment_action: "deposit",
          reference_id: self.objectid,
          transaction_details: trdetails,
          payment_method: "EPayment",
          payment_module: "inspection",
          service_type: "inspection", // or "inspection", "bc-change"
          service_request: {    // Here Pass the JSon
            "service_type": "inspection",
            "object_id": self.objectid,
            //            "object_id": "CC4AD9F7-51D4-4965-9A59-68A0D63D8288",
            "notes": "Comprehensive inspection required.",
            "type": self.serviceType.toLowerCase()

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
    var self = this;

    checkTokenValidatity(function () {
      //     var url = "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/update-payment-record-by-id";


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

        // Fetch stored values
        var userId = voltmx.store.getItem("userId");
        var regId = voltmx.store.getItem("regId");
        var userToken = voltmx.store.getItem("getUserAccesstoken");
        var userData = voltmx.store.getItem("pickupData");

        // Set request headers
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Authorization", "Basic "+encodeVal);
        request.setRequestHeader("user_token", userToken);

        // Prepare request body
        var body = {
          transaction_details: self.transactionDetails1,
          payment_method: "E-Payment",
          payment_id: self.paymentId,
          reference_id: self.objectid,
          asset_category: "",
          payment_module: "inspection",
          payment_action: "deposit",
          service_type: "inspection", // or "inspection" | "bc-change"
          service_request: {    // Here Pass the JSon
            "service_type": "inspection",
            "object_id": self.objectid,
            //             "object_id": "CC4AD9F7-51D4-4965-9A59-68A0D63D8288",
            "notes": "Comprehensive inspection required.",
            "type": self.serviceType.toLowerCase()

          }
        };

        // Send the request
        request.send(JSON.stringify(body));
        // Handle the response
        request.onReadyStateChange = function () {
          if (request.readyState === 4) {
            var responseString = request.responseText;
            try {
              var response = JSON.parse(responseString);
              // alert("Update record response :" + JSON.stringify(response));
              //             var updateResponse=JSON.stringify(response);

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

                self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text= response.error.message;

              }


            } catch (e) {
              self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text= "Some thing went wrong.";
//               alert("Response parsing failed:\n" + responseString);
            }
          }
        };

      } catch (error) {
        self.view.SmthngWentWrong.setVisibility(true);
                self.view.SmthngWentWrong.lblSomethingWentWrong.text= "Some thing went wrong.";
//         alert("Error: " + error.message);
      }
    });
  },
  getPaymentStatus: function () {
    var self = this;

    var statusUrl = self.transactionDetails._links.self.href;
    var accessToken = self.accesstoken;

    if (!statusUrl || !accessToken) {
//       alert("Missing payment details. Cannot check status.");
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

//             var payment = response._embedded.payment[0];
            
            var payment = null;

if (response && response._embedded && response._embedded.payment) {
  if (response._embedded.payment.length > 0) {
    payment = response._embedded.payment[0];
  }
}
            if (!payment) {
              voltmx.print("Invalid payment response format.");
              return;
            }

            var paymentState = payment.state;
            var authResponse = payment.authResponse;

            if (
              paymentState === "PURCHASED" &&
              authResponse.success === true &&
              authResponse.resultCode === "00"
            ) {
              //  Payment successful
              //             self.view.flxPaymentSuccessPopup.setVisibility(true);   // Replace with your Success Pop Messgae

              // Optional: Refresh token or update backend
              if (typeof self.getNewAccess === "function") {
                self.getNewAccess();
              }

            } else if (
              paymentState === "FAILED" ||
              (authResponse && authResponse.success === false)
            ) {
              //  Payment failed
              alert("Payment failed. Please try again.");
            } else if (
              paymentState === "INITIATED" ||
              paymentState === "AUTHORISED" ||
              paymentState === "RECEIVED"
            ) {
              // ⏳ Payment is pending
              alert(" Payment is still pending or being processed.");
            } else {
              // Unknown state
              //alert("Payment state: " + paymentState);
            }

          } catch (parseError) {
//             alert("Failed to parse response: " + parseError.message);
          }
        }
      };

    } catch (err) {
      voltmx.application.dismissLoadingScreen();
//       alert("Error checking payment status: " + err.message);
    }
  },
  testPaymentgateway2: function () {
    var self = this;

    // Validate necessary values
    if (!self.orderId || !self.payment_access_token) {
//       alert("Missing orderId or access token.");
      return;
    }

    // API endpoint with orderId
//     var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders/" + self.orderId;
    var url = voltmx.store.getItem("PAYMENT_ORDER_ID") + "/" + (self.orderId);
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
//               alert("Failed to retrieve order details.");
            }

          } catch (parseError) {
//             alert("Failed to parse response: " + parseError.message);
          }
        }
      };

    } catch (error) {
      voltmx.application.dismissLoadingScreen();
//       alert("Error fetching order details: " + error.message);
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
//     var encodedCreds = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
//     var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
    var encodedCreds = voltmx.store.getItem("PAYMENT_ACCESS_TOKEN");
    
            var url = voltmx.store.getItem("PAYMENT_ACCESS_URL");
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
//                 alert("Access token not found in response.");
              }

            } catch (parseError) {
//               alert("Error parsing token response: " + parseError.message);
            }
          } else {
//             alert("Failed to get access token. Status: " + request.status);
          }
        }
      };
    } catch (error) {
      voltmx.application.dismissLoadingScreen();
//       alert("Error requesting access token: " + error.message);
    }
  },




  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    // Determine alignment and direction
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;

   if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
  var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
     
     this.view.btnCancel.left = null;
     this.view.btnCancel.right = "5%";
     
     this.view.btnProceedPayment.left = "5%";
     this.view.btnProceedPayment.right = null;

     this.view.btnCancelPopup.left = null;
     this.view.btnCancelPopup.right = "2%";
     
     this.view.btnProceedToPayment.left = "2%";
     this.view.btnProceedToPayment.right = null;
} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  
   this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
  
  this.view.btnCancel.left = "5%";
     this.view.btnCancel.right = null;
  
  this.view.btnProceedPayment.left = null;
     this.view.btnProceedPayment.right = "5%";
  
   this.view.btnCancelPopup.left = "2%";
     this.view.btnCancelPopup.right = null;
     
     this.view.btnProceedToPayment.left = null;
     this.view.btnProceedToPayment.right = "2%";
}

    //   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    // List of label widget IDs to apply alignment
    var labelList = [
      "lblConfirmAndPay","lblVehicleLotID","lblVehicleLotIDVal","lblReportType","lblReportTypeVal",
      "lblAmountPayable","lblServiceFeeVal","lblTaxFeeVal","lblTotalcostVal","lblText","lblTermsAndConditions"
    ];

    // Apply alignment to labels
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }

    // List of Flex containers to reverse layout direction
    var flexList = [
      "flxUnderLineContainer","flxVehicleLotID","flxReportType","flxAmountPayable"

    ];

    // Apply reverseLayoutDirection
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
 
    // Optional localization of text, if needed
    //  this.view.lblConfirmAndPay.text=voltmx.i18n.getLocalizedString("");
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
    this.view.lblTermsAndConditions.text = voltmx.i18n.getLocalizedString("Please read the following terms and conditions for transaction refunds careful.");
    this.view.lblText.text = voltmx.i18n.getLocalizedString("paymentTAndC");
    this.view.lblOrderSummary.text=voltmx.i18n.getLocalizedString("Order Summary");
    this.view.lblVehicleLotID.text=voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    this.view.lblReportType.text=voltmx.i18n.getLocalizedString("Report Type"); 
    this.view.lblAmountPayable.text=voltmx.i18n.getLocalizedString("Amount Payable");
    this.view.btnCancel.text=voltmx.i18n.getLocalizedString("cancel"); 
    this.view.btnProceedPayment.text=voltmx.i18n.getLocalizedString("Pay Now");
    this.view.lblConfirmAndPay.text = voltmx.i18n.getLocalizedString("Confirm & Pay"); 
    this.view.lblVehicleLotID.text=voltmx.i18n.getLocalizedString("Vehicle Lot ID");
    this.view.lblReportType.text=voltmx.i18n.getLocalizedString("Report Type");
    this.view.btnCancelPopup.text = voltmx.i18n.getLocalizedString("cancel");
    this.view.btnProceedToPayment.text = voltmx.i18n.getLocalizedString("Proceed to Payment");
    this.view.lblrequestReceived.text = voltmx.i18n.getLocalizedString("Your request has been received");
    this.view.lblReceviceReport.text = voltmx.i18n.getLocalizedString("Youll receive your report within 24 hours via email and in your account dashboard.");
    this.view.btnGotoAuctions.text = voltmx.i18n.getLocalizedString("Go To Home Page");
  }



});



