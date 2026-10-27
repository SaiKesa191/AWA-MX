define({
  onNavigate: function (context) {
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
    this.view.preShow = this.onPreShow.bind(this);
    this.usertoken = voltmx.store.getItem("getUserAccesstoken");
    const pickupData = voltmx.store.getItem("pickupData");
    this.setDataToForm(pickupData);

    this.view.flxBack.onClick = () => {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    };
    
   this.view.btnGotoAuctions.onClick = () => {
      this.view.flxPaymentSuccessPopup.setVisibility(false);
      new voltmx.mvc.Navigation("frmAllAuctionsList").navigate();
    };

    this.view.btnPaynow.onClick = () => {
      this.view.flxOverLay.setVisibility(true);
      this.view.flxPopUpPayment.setVisibility(true);
    };

    this.view.btnProceedToPayment.onClick = this.testPaymentgateway.bind(this);

    this.view.btnCancel.onClick = () => {
      this.view.flxPopUpPayment.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    };
  },

  onPreShow: function () {
    this.toggleFooterIcons();
    this.depositAmount = 0;
    this.view.flxPaymentSuccessPopup.setVisibility(false);
  },

  toggleFooterIcons: function () {
    const footer = this.view.Footer2;
    footer.flxHL1.setVisibility(false);
    footer.flxHL2.setVisibility(false);
    footer.flxHL3.setVisibility(false);
    footer.flxHL4.setVisibility(false);
    footer.flxHL5.setVisibility(false);

    footer.imgHome.src = "homefooter.png";
    footer.lblHome.skin = "sknlblCPBoldCapt181818Font100";

    footer.imgMegaPhone.src = "auctionsfooter.png";
    footer.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";

    footer.imgMyBids.src = "mybidsfooter.png";
    footer.lblMyBids.skin = "sknlblCPBoldCapt181818Font100";

    const mode = voltmx.store.getItem("mode") || "seller";
    if (mode === "seller") {
      footer.imgMyBids.src = "mylistings.png";
      footer.lblMyBids.text = "Listings";
    } else {
      footer.imgMyBids.src = "mybidsfooter.png";
      footer.lblMyBids.text = "My Bids";
    }

    const isLogin = voltmx.store.getItem("isLogin");
    const isUserCreated = voltmx.store.getItem("isUserCreated");

    footer.imgSellCar.setVisibility(!(isLogin && isUserCreated));
    footer.flxProfile.setVisibility(isLogin && isUserCreated);
  },

  setDataToForm: function (pickupData) {
  var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  //var userId = voltmx.store.getItem("userId");
  var usertoken = voltmx.store.getItem("getUserAccesstoken");

  function INVOKE_SERVICE(status, response) {
    try {
      if (!response || !Array.isArray(response.records)) {
        alert("Invalid or empty service response.");
        return;
      }
      //voltmx.print(JSON.stringify(response));
      //alert(JSON.stringify(response));
      var services_list = response.records;
      var serviceFee = 0;
      var tax = 0;
      var total = 0;
      //var userId = services_list.userId;
      for (var i = 0; i < services_list.length; i++) {
        var item = services_list[i];

        if (item.name && item.name.toLowerCase().includes("rsa")) {
          serviceFee = parseFloat(item.amount || "0");
          tax = 7.58;
          total = serviceFee + tax;
          self.depositAmount =parseInt(total);
          break;
        }
      }
   //self.depositAmount = total;
      // After async call success, build segment data
      var headerData = { "lblHeading": "Order Summary" };

      var rowData = [
        {
          "lblKey"  : "Service Type",
          "lblvalue": "Pickup"
        },
        {
          "lblKey"  : "Buyer/Seller",
          "lblvalue": pickupData.user
        },
        {
          "lblKey"  : "Pickup Location",
          "lblvalue": "RSA"
        },
        {
          "lblKey"  : "Drop-off Location",
          "lblvalue": "RSA"
        },
        {
          "lblKey": "Vehicle Lot ID",
          "lblvalue": pickupData.lotId
        },
        {
          "lblKey"  : "Date and Time",
          "lblvalue": pickupData.selectedDate
        },
        {
          "lblKey"  : "Amount Payable",
          "lblvalue":
            "Service Fee: " + serviceFee + " AED\n" +
            "Tax Fee: " + tax + " AED\n" +
            "Total Cost: " + total.toFixed(2) + " AED"
        }
      ];

      var segDataWithHeader = [[headerData, rowData]];
      self.view.segBookingData.setData(segDataWithHeader);
       voltmx.application.dismissLoadingScreen();

    } catch (e) {
      alert("Error parsing service response: " + e.message);
    }
  }

  var services_list_inputparam = {
    serviceID: "fry_int_admin$services-list",
    foundryServiceName: "Service list",
    serviceAction: "list",
    name: "",
    amount: "",
    page_number: "1",
    filter_list: "",
    page_size: "10",
    httpheaders: {
      user_token: usertoken
    },
    
//     {
//   "foundrySerivceName": "Service list",
//   "serviceAction": "list",
//   "name": "",
//   "amount": "",
//   "page_number": "1",
//   "page_size": "10",
//   "filter_list": ""
// }
    
    httpconfig: {}
  };

  fry_int_admin$services_list = mfintegrationsecureinvokerasync(
    services_list_inputparam,
    "fry_int_admin",
    "services-list",
    INVOKE_SERVICE
  );
},


  testPaymentgateway: function () {
  var self = this;

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
        "value": self.depositAmount // should be in *fils* (1 AED = 100 fils)
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
            self.view.flxOverLay.setVisibility(false);

//             voltmx.application.showLoadingScreen(
//               null,
//               "Updating status. Don’t close app",
//               constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
//               false,
//               true,
//               {
//                 shouldShowLabelInBottom: "true",
//                 separatorHeight: 45,
//                 progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
//                 progressIndicatorColor: "Gray"
//               }
//             );

//             // Schedule payment status check
//             voltmx.timer.schedule("checkPaymentTimer", function () {
//               voltmx.application.dismissLoadingScreen();
//               if (typeof self.getPaymentStatus === "function") {
//                 self.getPaymentStatus();
//               } else {
//                 alert("getPaymentStatus is not a function");
//               }
//             }, 80, false);
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
  checkTokenValidatity(function () {
    var url = "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/create-payment-record";

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
      request.setRequestHeader("Authorization", "Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
      request.setRequestHeader("user_token", userToken);

      // Prepare body
      var body = {
        asset_category: "",
        payment_action: "deposit",
        reference_id: userId,
        transaction_details: trdetails,
        payment_method: "EPayment",
        payment_module: "security_deposit",
        service_type: "rsa", // or "inspection", "bc-change"
        service_request: {
          service_type: "rsa",
          notes: userData.lblMsg,
          service_provider_id: "1",
          object_id: userData.lblObjectId
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
    var url = "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/update-payment-record-by-id";

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
      request.setRequestHeader("Authorization", "Basic MWE1YTI3Nzg2OGQxYzRlMzI1MWVmZDYwMDEzNWUyZmY6ZDIxZDc5ODM4ODY3YmNhZTU3OWYwOTc0MjA2MGFhNGY=");
      request.setRequestHeader("user_token", userToken);

      // Prepare request body
      var body = {
        transaction_details: self.transactionDetails1,
        payment_method: "E-Payment",
        payment_id: self.paymentId,
        reference_id: userId,
        asset_category: "",
        payment_module: "security_deposit",
        payment_action: "deposit",
        service_type: "rsa", // or "inspection" | "bc-change"
        service_request: {
          service_type: "rsa",
          notes: userData.lblMsg,
          service_provider_id: "1",
          object_id: userData.lblObjectId
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
            //alert("Update Successful:\n" + JSON.stringify(response, null, 2));
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

          var payment = response._embedded.payment[0];
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
            // ✅ Payment successful
            self.view.flxPaymentSuccessPopup.setVisibility(true);
            //var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";

            // voltmx.net.clearCookies(url);
            //voltmx.net.removeAllCachedResponses();
           // alert("Sucess");
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
}





});
