//Type your code here
 
// Function to print current epoch time
const WebSocket = require("ws");
function currentEpochTime() {
  const epochMillis = new Date().getTime();
  voltmx.print("=============================");
  voltmx.print(epochMillis);
  voltmx.print("=============================");
}
 
 
function checkTokenValidatity(onSuccessCallback) {
  var epochMillis = new Date().getTime();
  var expires_in = Number(voltmx.store.getItem("userAccessTokenExp")); // stored expiry time in ms
 
  voltmx.print("Token expiration time: " + expires_in);
  voltmx.print("Current epoch time: " + epochMillis);
 
  if (expires_in > epochMillis) {
    voltmx.print("Token still valid. Proceeding with callback.");
    onSuccessCallback(); // token is valid, proceed
  } else {
    voltmx.print("Token expired. Refreshing...");
    calling_service(onSuccessCallback); // refresh and then proceed
  }
}
 
// Function to call the token refresh service
function calling_service(onRefreshComplete) {
  var refreshtoken = voltmx.store.getItem("refreshtoken");
 
  var get_refresh_token_inputparam = {
    "serviceID": "ms_user$get-refresh-token",
    "platform": "mobile",
    "httpheaders": {
      "refresh_token": refreshtoken
    },
    "httpconfig": {}
  };
 
  mfintegrationsecureinvokerasync(
    get_refresh_token_inputparam,
    "ms_user",
    "get-refresh-token",
    function(status, response) {
      get_refresh_token_callback(status, response, onRefreshComplete);
    }
  );
}
 
// Properly defined callback function working but doesnt give network errors
// function get_refresh_token_callback(status, response, onRefreshComplete) {
//   if (!response || !response.rawResponse || !response.rawResponse.data || !response.rawResponse.data.access_token) {
//     voltmx.print("Token refresh failed.");
//     return;
//   }
 
//   var newToken = response.rawResponse.data.access_token;
//     var newExpiry = Number(response.rawResponse.data.expires_in);
 
//   voltmx.store.setItem("getUserAccesstoken", newToken);
//   voltmx.store.setItem("userAccessTokenExp", newExpiry); // update stored expiry
  
  
  
//   voltmx.print("New token stored. Proceeding...");
//   onRefreshComplete(); // continue the original request
// }

function get_refresh_token_callback(status, response, onRefreshComplete) {
  var currentForm = voltmx.application.getCurrentForm();
  
  // Handle error: network or service issue
  if (!response || response.opstatus !== 0 || !response.rawResponse || !response.rawResponse.data || !response.rawResponse.data.access_token) {
    voltmx.print("Token refresh failed.");

    // Show flexError if available in the current form
    if (currentForm && currentForm.flxError) {
      if(response && response.opstatus === 1011){
        voltmx.application.dismissLoadingScreen();

      currentForm.flxError.setVisibility(true);
        return;
      }
      else{
         currentForm.flxError.setVisibility(false);
      }
    }
      
        if(currentForm && currentForm.SmthngWentWrong)
          {
            if(response && response.opstatus !== 0){
              voltmx.application.dismissLoadingScreen();
              
              
              if (response && response.httpStatusCode === 400 || response.httpStatusCode === 401) {
   logoutSessionModule()
  return;
}

              
              
              
            currentForm.SmthngWentWrong.setVisibility(true);
            
              var errMsg = "Something went wrong";

    if (response && response.rawResponse && response.rawResponse.error && response.rawResponse.error.message) {
      errMsg = response.rawResponse.error.message;
    }
              currentForm.SmthngWentWrong.lblSomethingWentWrong.text = errMsg;
            return;
          }
        else{
          currentForm.SmthngWentWrong.setVisibility(false);
        }
      
    }
     
    
  }

  // Success path
  var newToken = "";
var newExpiry = 0;
 if (
    response &&
    response.rawResponse &&
    response.rawResponse.data &&
    typeof response.rawResponse.data.access_token !== "undefined"
) {
    newToken = response.rawResponse.data.access_token;
}

if (
    response &&
    response.rawResponse &&
    response.rawResponse.data &&
    typeof response.rawResponse.data.expires_in !== "undefined"
) {
    newExpiry = Number(response.rawResponse.data.expires_in);
}

  voltmx.store.setItem("getUserAccesstoken", newToken);
  voltmx.store.setItem("userAccessTokenExp", newExpiry);

  voltmx.print("New token stored. Proceeding...");
  
  // Hide error if shown
  if (currentForm && currentForm.flxError) {
    currentForm.flxError.setVisibility(false);
  }

  onRefreshComplete(); // continue after refreshing token
}


 


  function logoutSessionModule() {
      try {
        voltmx.application.showLoadingScreen(
          null,
          "Logging out..No session Found",
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

        var serviceName = "AzureB2C";
        var client = voltmx.sdk.getCurrentInstance();
        var identitySvc = client.getIdentityService(serviceName);

        var options = {
          slo: true,
          browserWidget: voltmx.application.getCurrentForm().browserLogoutWidget
        };

        identitySvc.logout(
          function(response) {
            voltmx.print("Logout success: " + JSON.stringify(response));

            voltmx.net.clearCookies();

            voltmx.store.setItem("isLogin", false);
            voltmx.store.removeItem("refreshtoken");
            voltmx.store.removeItem("expon");
            voltmx.store.removeItem("userAccessTokenExp");
            voltmx.store.setItem("isUserCreated", false);
            voltmx.store.removeItem("accesstoken");
            voltmx.store.removeItem("userObject");
            voltmx.store.removeItem("getUserAccesstoken");
            voltmx.store.removeItem("userId");
            voltmx.store.removeItem("userEmail");

            voltmx.application.dismissLoadingScreen();

            var nav = new voltmx.mvc.Navigation("frmLoginScreen");
            nav.navigate();
          },
          function(error) {
            voltmx.print("Logout failure: " + JSON.stringify(error));

            // Handle session already expired
            if (
              error &&
              error.message &&
              error.message.indexOf("sessions is not active") !== -1
            ) {
              voltmx.net.clearCookies();
              voltmx.store.setItem("isLogin", false);
              voltmx.store.removeItem("refreshtoken");
              voltmx.store.removeItem("expon");
              voltmx.store.removeItem("userAccessTokenExp");
              voltmx.store.setItem("isUserCreated", false);
              voltmx.store.removeItem("accesstoken");
              voltmx.store.removeItem("userObject");
              voltmx.store.removeItem("getUserAccesstoken");
              voltmx.store.removeItem("userId");
              voltmx.store.removeItem("userEmail");
            }

            voltmx.application.dismissLoadingScreen();

            var nav = new voltmx.mvc.Navigation("frmLoginScreen");
            nav.navigate();
          },
          options
        );
      } catch (e) {
        voltmx.print("Logout exception: " + e.message);
        voltmx.application.dismissLoadingScreen();

        var nav = new voltmx.mvc.Navigation("frmLoginScreen");
        nav.navigate();
      }
    }
  
// Callback function for token refresh
 
 
function detectFileType(base64) {
  if (!base64) return ".bin";
 
  if (base64.startsWith("data:image/jpeg") || base64.startsWith("/9j/")) {
    return ".jpg";
  } else if (base64.startsWith("data:image/png") || base64.startsWith("iVBORw0KGgo")) {
    return ".png";
  } else if (base64.startsWith("data:image/webp") || base64.startsWith("UklG")) {
    return ".webp";
  } else if (
    base64.startsWith("data:application/pdf") || 
    base64.startsWith("JVBER")
  ) {
    return ".pdf";
  } else {
    return ".bin";
  }
}
 
var PaymentModule = {
  
getAccessToken: function(successCallback, errorCallback) {
  var ev = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
  var url = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
 
  try {
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
 
    request.setRequestHeader("Authorization", "Basic " + ev);
    request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
    request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");
 
    request.onReadyStateChange = function() {
      try {
        if (request.readyState === 4) {
          voltmx.print("Request status: " + request.status);
          voltmx.print("Response: " + request.responseText);
 
          if (request.status === 200) {
            var token = JSON.parse(request.responseText).access_token;
            successCallback(token);
          } else {
            errorCallback("Auth failed. Status: " + request.status + " Response: " + request.responseText);
          }
        }
      } catch (e) {
        errorCallback("Error in onReadyStateChange: " + e.message);
      }
    };
 
    request.send(); // Make sure send is AFTER onReadyStateChange
  } catch (e) {
    errorCallback("Exception in getAccessToken outer try: " + e.message);
  }
},
 
  createOrder: function(token, amountValue,successCallback, errorCallback) {
    var url = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";
 
    var body = {
      "action": "PURCHASE",
      "amount": {
        "currencyCode": "AED",
        "value": amountValue
      },
      merchantAttributes: {
        redirectUrl: "https://yourdomain.com/success"
      }
    };
 
    try {
      var request = new voltmx.net.HttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Authorization", "Bearer " + token);
      request.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
      request.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
 
      request.onReadyStateChange = function() {
        if (request.readyState === 4) {
          if (request.status === 201 || request.status === 200) {
            var response = JSON.parse(request.responseText);
            var href = response._links.payment.href;
            successCallback(href);
          } else {
            errorCallback(" Order failed. Status: " + request.status);
          }
        }
      };
 
      request.send(JSON.stringify(body));
    } catch (e) {
      errorCallback(" Exception in createOrder: " + e.message);
    }
  },
 
launchBrowser: function(url, overlayFlex) {
  var config = {
    URL: url,
    requestMethod: constants.BROWSER_REQUEST_METHOD_GET
  };
 
  var basic = {
    id: "browserID",
    isVisible: true,
    requestURLConfig: config,
    height: "100%",
    width: "100%"
  };
 
  var layout = {
    height: "100%",
    width: "100%",
    top: "0dp",
    left: "0dp"
  };
 
  var psp = {};
 
  var browserWidget = new voltmx.ui.Browser(basic, layout, psp);
  overlayFlex.removeAll();
  overlayFlex.add(browserWidget);
  overlayFlex.isVisible = true; // Show overlay
}
};
 
function decodeBase64ToByteArray(base64Str) {
  var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var cleanStr = base64Str.replace(/[^A-Za-z0-9+/=]/g, "");
  var output = [];
 
  var i = 0;
  while (i < cleanStr.length) {
    var enc1 = base64Chars.indexOf(cleanStr.charAt(i++));
    var enc2 = base64Chars.indexOf(cleanStr.charAt(i++));
    var enc3 = base64Chars.indexOf(cleanStr.charAt(i++));
    var enc4 = base64Chars.indexOf(cleanStr.charAt(i++));
 
    var chr1 = (enc1 << 2) | (enc2 >> 4);
    var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    var chr3 = ((enc3 & 3) << 6) | enc4;
 
    output.push(chr1);
    if (enc3 != 64) output.push(chr2);
    if (enc4 != 64) output.push(chr3);
  }
 
  return output;
}
 
function base64Encode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var encoded = '';
    var i = 0;
 
    while (i < str.length) {
        var c1 = str.charCodeAt(i++);
        var c2 = str.charCodeAt(i++);
        var c3 = str.charCodeAt(i++);
 
        var e1 = c1 >> 2;
        var e2 = ((c1 & 3) << 4) | (c2 >> 4);
        var e3 = ((c2 & 15) << 2) | (c3 >> 6);
        var e4 = c3 & 63;
 
        if (isNaN(c2)) {
            e3 = e4 = 64;
        } else if (isNaN(c3)) {
            e4 = 64;
        }
 
        encoded += chars.charAt(e1) + chars.charAt(e2) + chars.charAt(e3) + chars.charAt(e4);
    }
 
    return encoded;
}
 
function isValidURL(url) {
  var pattern = /^(https?:\/\/)[^\s]+$/i;
  return typeof url === "string" && pattern.test(url);
}


function fetchClientProperties() {
  var client = voltmx.sdk.getCurrentInstance();
  if (!client) {
  voltmx.print("SDK not initialized yet. Retrying after 500ms...");
 
  try {
    voltmx.timer.cancel("fetchClientRetry");
  } catch (e) {
  }
 
  voltmx.timer.schedule("fetchClientRetry", function() {
    fetchClientProperties();
  }, 0.5, false);
 
  return;
}
 

  var configurationSvc = client.getConfigurationService();
  configurationSvc.getAllClientAppProperties(function(response) {
    voltmx.store.setItem("BASE_URL", response.BASE_URL);
    voltmx.store.setItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY", response.ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY);
    voltmx.store.setItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET", response.ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET);
//     voltmx.store.setItem("PAYMENT_ACCESS_TOKEN", response.PAYMENT_ACCESS_TOKEN);
//     voltmx.store.setItem("PAYMENT_ACCESS_URL", response.PAYMENT_ACCESS_URL);
//     voltmx.store.setItem("PAYMENT_ORDER_ID", response.PAYMENT_ORDER_ID);
//     voltmx.store.setItem("DAM_USER_NAME",response.DAM_USER_NAME);
//     voltmx.store.setItem("DAM_PASSWORD",response.DAM_PASSWORD);
    
    
    if (response.PAYMENT_ACCESS_TOKEN) {
    voltmx.store.setItem("PAYMENT_ACCESS_TOKEN", response.PAYMENT_ACCESS_TOKEN);
}

if (response.PAYMENT_ACCESS_URL) {
    voltmx.store.setItem("PAYMENT_ACCESS_URL", response.PAYMENT_ACCESS_URL);
}

if (response.PAYMENT_ORDER_ID) {
    voltmx.store.setItem("PAYMENT_ORDER_ID", response.PAYMENT_ORDER_ID);
}

if (response.DAM_USER_NAME) {
    voltmx.store.setItem("DAM_USER_NAME", response.DAM_USER_NAME);
}

if (response.DAM_PASSWORD) {
    voltmx.store.setItem("DAM_PASSWORD", response.DAM_PASSWORD);
}
    
 if (response.SALE_LETTER_URL) {
    voltmx.store.setItem("SALE_LETTER_URL", response.SALE_LETTER_URL);
}
  if(response.SOCKET_URL)
    {
      voltmx.store.setItem("SOCKET_URL",response.SOCKET_URL);
    }


  }, function(error) {
    voltmx.print("Failed to retrieve client app properties: " + JSON.stringify(error));
  });
}



//Type your code here
function handleServiceError(response, opName, uiCallback) {
  var parsed = null;
  try {
    if (typeof response.response === "string") {
      parsed = JSON.parse(response.response);
    }
  } catch (e) {
    voltmx.print("❌ Failed to parse response JSON: " + e.message);
    if (uiCallback) uiCallback("❗ Invalid server response.");
    return;
  }
 
  if (Array.isArray(parsed)) {
    const err = parsed[0];
    if (err && err.error_code) {
      let msg = "";
      switch (err.error_code) {
        case "400":
          msg = "🚫 Bad Request: Please check the request parameters.";
          break;
        case "401":
          msg = "🔒 Unauthorized: Your session has expired. Please login again.";
          break;
        case "409":
          msg = "⚠️ Duplicate file: A file with this name already exists.";
          break;
        case "1011":
          msg = "🔌 Connectivity issue: " + err.error_message;
          break;
        default:
          msg = "⚠️ Service error: " + (err.error_message || "Unexpected error");
      }
      if (uiCallback) uiCallback(msg);
      return;
    }
  }
 
  // Fallback for unexpected structure or missing error code
  if (uiCallback) uiCallback("❗ Unexpected error occurred in " + opName);
}

function parseDateString(dateStr) {
  // Converts "2025-07-30 06:27:01.0" → JS Date
  var cleaned = dateStr.replace(".0", "").replace(/-/g, "/");
  return new Date(cleaned);
}

function formatRemainingTime(seconds) {
  var d = Math.floor(seconds / 86400);
  var h = Math.floor((seconds % 86400) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = seconds % 60;
  return `${d}D ${h}H ${m}M ${s}S`;
}

function callGetAutoBidRate(objid,aucid,onCompletionCallback){
  var userid = voltmx.store.getItem("userId");
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var serviceInput = {
    serviceID: "fry_int_auctions$get-auction-auto-bidding",
    auction_id: aucid,
    object_id: objid,
    bid_by: userid,
    httpheaders: {
      user_token: usertoken
    },          // Add headers if needed
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    serviceInput,
    "fry_int_auctions",
    "get-auction-auto-bidding",
    function(status, response) {
      if (typeof onCompletionCallback === "function") {
        onCompletionCallback(status, response);
      }
    }
  );
}

// function getConfigUsernamePassword(){
//    var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
//    var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
//     var usertoken = voltmx.store.getItem("getUserAccesstoken");
//   var serviceInput = {
//     serviceID: "ms_config$config-decrypt",
//     config_key: "dam_login",
//     app_key : appkey,
//     app_secret: appsecret,
//     httpheaders: {
//       user_token: usertoken
//     },          // Add headers if needed
//     httpconfig: {}
//   };

//   mfintegrationsecureinvokerasync(
//     serviceInput,
//     "ms_config",
//     "config-decrypt",
//     function(status, response) {
//      voltmx.print(response);
//     }
//   );
// }

function splasscreen() {  
  let isSplashShown = voltmx.store.getItem("isSplashShown");   
  if (isSplashShown === undefined || isSplashShown === null || isSplashShown === false) {   
    voltmx.store.setItem("isSplashShown", true);     
    return "frmSplashScreenMain";   
  } else {     
    return "frmDashBoard";   
  } 
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function getBidDetailsByObjectId(objectId, auctionId, callback) {
    var inputParams = {
        serviceID: "fry_int_common$get_bid_details_by_object_id",
        object_id: objectId,
        auction_id: auctionId,
        httpheaders: {},
        httpconfig: {}
    };

    mfintegrationsecureinvokerasync(inputParams, "fry_int_common", "get_bid_details_by_object_id", function(status, response) {
        if (response && response.opstatus === 0) {
            voltmx.print("✅ Bid details fetched: " + JSON.stringify(response));
            callback && callback(response);
        } else {
            voltmx.print("❌ Failed to fetch bid details. Status: " + status + ", Response: " + JSON.stringify(response));
            callback && callback(null);
        }
    });
}


function getRecentSearches() {
      return voltmx.store.getItem("recentSearches") || [];
    }
 
     function storeRecentSearch(addressObj) {
      var key = "recentSearches";
      var maxItems = 5;
 
      var searches = voltmx.store.getItem(key) || [];
 
      // Remove duplicates by PlaceId
      searches = searches.filter(function (item) {
        return item.lblPlaceId !== addressObj.lblPlaceId;
      });
 
      // Add the latest one on top
      searches.unshift(addressObj);
 
      if (searches.length > maxItems) {
        searches = searches.slice(0, maxItems);
      }
 
      voltmx.store.setItem(key, searches);
    }
  


////////////////////

//Type your code here
 
 
function regSuccessCallback(regId) {
 
  kony.print("** JavaScript regSuccessCallback() called **"+regId);
//   alert(regId);
  subscribeKMS ( regId );
 
}
 
 
function regFailureCallback(errormsg) {
 
  kony.print("* JavaScript regFailureCallback() called *");
//   alert(errormsg);
  kony.print(errormsg.failurereason);
 
  kony.print(errormsg.description);
 
}
 
 
function onlinePushNotificationCallback(msg) {
 
  kony.print("* JavaScript onlinePushNotificationCallback() called *");
//   alert(msg);
  kony.print(msg);
 
  kony.print(msg.message);
 
}
 
 
function offlinePushNotificationCallback(msg) {
 
  kony.print("* JavaScript offlinePushNotificationCallback() called *");
//   alert(msg);
  kony.print(msg);
 
}
 
 
function unregSuccessCallback() {
 
  kony.print("* JavaScript unregSuccessCallback() called *");
//   alert("* JavaScript unregSuccessCallback() called *");
 
}
 
 
function unregFailureCallback(errormsg) {
 
  kony.print("* JavaScript unregFailureCallback() called *");
//   alert(errormsg);
  kony.print(errormsg.errorcode);
 
  kony.print(errormsg.errormessage);
 
}
 
 
function setPushCallbacks() {
 
  voltmx.push.setCallbacks({
 
    onsuccessfulregistration:
 
    regSuccessCallback,
 
    onfailureregistration:
 
    regFailureCallback,
 
    onlinenotification:
 
    onlinePushNotificationCallback,
 
    offlinenotification:
 
    offlinePushNotificationCallback,
 
    onsuccessfulderegistration:
 
    unregSuccessCallback,
 
    onfailurederegistration:
 
    unregFailureCallback
 
  });
 
}
 
function deRegisterMyPush() {
//   var myhash = new Hash();
//   alert(myhash);
  voltmx.push.deRegister([]);
}
 
function registerMyDevice() {
 
  var deviceOS = kony.os.deviceInfo().name.toLowerCase();
  var config;
 
  switch (deviceOS) {
    case 'android':
      config = {
        senderid: "793034431189"
      };
      voltmx.push.register(config);
//       alert("Android device registered with sender ID: " + config.senderid);
      kony.print("Android device registered with sender ID: " + config.senderid);
     
      break;
 
    case 'iphone':
      config = [0, 1, 2]; // Badge, Sound, Alert
      voltmx.push.register(config);
//       alert("iPhone device registered with config: " + config.toString());
      kony.print("iPhone device registered with config: " + config.toString());
      break;
 
    default:
//       alert("Your device is not supported for push registration.");
      kony.print("Your device is not supported for push registration.");
  }
 
}	
 
function subscribeKMS ( regId ) {
 
  var osType = kony.os.deviceInfo().name.toLowerCase();
 
  //       "android" or "iphone";
 
  var deviceId = kony.os.deviceInfo().deviceid;
 
  var messagingSvc = kony.sdk.getCurrentInstance().getMessagingService();
 
  messagingSvc.register(osType, deviceId, regId, deviceId,
 
                        successCallbackForSubscribe,
 
                        failureCallbackForSubscribe);
 
}
 
function successCallbackForSubscribe(res){   
//   alert(res.id);
 
  kony.print("successCallbackForSubscribe  KSID : "+ res.id);
  voltmx.store.setItem("SenderID", res.id);
  invokePushRegistrationService();
}
 
function failureCallbackForSubscribe(err){
//   alert(err);
 
  kony.print("failureCallbackForSubscribe"+JSON.stringify(err));
 
}
 
function invokePushRegistrationService() {
    var ksid = voltmx.store.getItem("SenderID");
    var userToken = voltmx.store.getItem("getUserAccesstoken");

    if (!ksid || !userToken) {
        voltmx.print(" Missing KSID or User Token");
        return;
    }

    var inputParams = {
        serviceID: "ms_notification$register-push-notifications",
        httpheaders: {
            "user_token":  userToken
        },
        httpconfig: {},
        ksid: ksid // this goes in the body
    };

    mfintegrationsecureinvokerasync(
        inputParams,
        "ms_notification",
        "register-push-notifications",
        function(status, response) {
//           alert(response);
            if (status === 400 || status === 300) {
                voltmx.print(" Failed to register push notifications: " + JSON.stringify(response));
            } else {
                voltmx.print(" Push notification registration successful: " + JSON.stringify(response));
            }
        }
    );
}



// function convertUTCtoUserTime(utcString) {
//   try {
//     // Backend string → ISO UTC
//     let isoString = utcString.replace(" ", "T").replace(".0", "") + "Z";
//     let utcDate = new Date(isoString);

//     if (isNaN(utcDate.getTime())) {
//       voltmx.print("Invalid UTC string: " + utcString);
//       return null;
//     }

//     // Log UTC version
//     voltmx.print("Raw UTC string: " + utcString);
//     voltmx.print("Parsed as UTC date: " + utcDate.toISOString());

//     // Log user local version (IST, or wherever the device is)
//     voltmx.print("Local time (user TZ): " + utcDate.toString());

//     return utcDate; // local tz handled automatically
//   } catch (e) {
//     voltmx.print("Error converting UTC: " + e.message);
//     return null;
//   }
// }

function convertUTCtoUserTime(utcString) {
  try {
    if (!utcString) return null;

    // Convert backend string to ISO format with UTC 'Z'
    let isoString = utcString.replace(" ", "T").replace(".0", "") + "Z";
    let utcDate = new Date(isoString);

    if (isNaN(utcDate.getTime())) {
      voltmx.print("Invalid UTC string: " + utcString);
      return null;
    }

    // Create a Date object in local device timezone
    // Simply returning the utcDate works, since JS Date automatically converts UTC → local
    return utcDate;
  } catch (e) {
    voltmx.print("Error converting UTC to local date: " + e.message);
    return null;
  }
}

 function getTimeRemainingString(targetDate) {
  try {
    if (!targetDate) return "N/A";

    var now = new Date().getTime();          // current device time in ms
    var target = targetDate.getTime();       // target Date in ms
    var diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return "0D 0H 0M 0S";
    }

    var seconds = Math.floor((diff / 1000) % 60);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days + "D " + hours + "H " + minutes + "M ";
  } catch (e) {
    return "N/A";
  }
}

 function getTimeRemainingStringWithSec(targetDate) {
  try {
    if (!targetDate) return "N/A";

    var now = new Date().getTime();          // current device time in ms
    var target = targetDate.getTime();       // target Date in ms
    var diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return "0D 0H 0M 0S";
    }

    var seconds = Math.floor((diff / 1000) % 60);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days + "D " + hours + "H " + minutes + "M " + seconds +"S";
  } catch (e) {
    return "N/A";
  }
}

   function closeThreeAndOpenFlxIncreaseLimit(view,msg) {
      view.flxBidAmountSelectionContainer.setVisibility(false);
      view.flxOverLay.setVisibility(false);
      view.flxAutoBidAmountContainer.setVisibility(false);

      view.flxIncreaseLimit.lblYoudonthave.text = msg;
//         voltmx.i18n.getLocalizedString("you dont have enough limit to bid");
      view.flxIncreaseLimit.btnCancel.text = voltmx.i18n.getLocalizedString("cancel");
      view.flxIncreaseLimit.btnIncDeposit.text = voltmx.i18n.getLocalizedString("Increase your deposit");
      view.flxIncreaseLimit.setVisibility(true);
    }

function convertUTCtoUserTimeForSecurityDeposits(utcString) {
  try {
    if (!utcString) return null;

    // Remove any milliseconds part: .1, .01, .057, .123456 etc.
    let cleaned = utcString.replace(/\.\d+$/, "");

    // Convert to ISO-8601: "YYYY-MM-DDTHH:mm:ssZ"
    cleaned = cleaned.replace(" ", "T") + "Z";

    let utcDate = new Date(cleaned);

    if (isNaN(utcDate.getTime())) {
      voltmx.print("Invalid UTC string: " + utcString);
      return null;
    }

    // JS Date automatically converts UTC → local timezone
    return utcDate;
  } catch (e) {
    voltmx.print("Error converting UTC to local date: " + e.message);
    return null;
  }
}

function safeFormatDate(dateString) {
    let dateObj = convertUTCtoUserTimeForSecurityDeposits(dateString);

    if (!dateObj || isNaN(dateObj.getTime())) {
        return "N/A"; // Or any fallback text
    }

    return dateObj.toString().split(" ").slice(0, 5).join(" ");
}

 function loginToDam() {
    try {
        var httpClient = new voltmx.net.HttpRequest();
        var baseURL = voltmx.store.getItem("BASE_URL");

        if (baseURL) {
            baseURL = baseURL.trim();
            baseURL = baseURL.replace(/:\d+$/, ""); // remove port
            if (!baseURL.endsWith("/")) baseURL += "/";
        }

        var url = baseURL + "dx/api/core/v1/auth/login";
        httpClient.open("POST", url, false); // sync

        var username = voltmx.store.getItem("DAM_USER_NAME");
        var password = voltmx.store.getItem("DAM_PASSWORD");
        httpClient.setRequestHeader("Content-Type", "application/json");
        httpClient.send(JSON.stringify({ username, password }));

        // Clear old cookie before checking
        voltmx.store.removeItem("sessionCookie");

        if (httpClient.status === 200) {
            var allHeaders = httpClient.getAllResponseHeaders();
var cookie = null;

if (allHeaders) {
    // Case 1: String (iOS often returns raw header string)
    if (typeof allHeaders === "string") {
        var lines = allHeaders.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.toLowerCase().startsWith("set-cookie:")) {
                cookie = line.substring("set-cookie:".length).trim();
                break;
            }
        }
    }

    // Case 2: Object (Android usually returns JSON-like map)
    else if (typeof allHeaders === "object") {
        // Key may be "Set-Cookie" or "set-cookie"
        cookie = allHeaders["Set-Cookie"] || allHeaders["set-cookie"] || null;
    }
}


            if (cookie) {
                voltmx.print("Login successful, cookie stored.");
                voltmx.store.setItem("sessionCookie", cookie);
                voltmx.store.setItem("isDamAvailable", true);
                return true;
            } else {
                voltmx.print("Login succeeded but no cookie returned.");
                voltmx.store.setItem("isDamAvailable", false);
                return false;
            }
        } else {
            voltmx.print("Login failed with status: " + httpClient.status);
            voltmx.print("Response text: " + httpClient.responseText);
            voltmx.store.setItem("isDamAvailable", false);
            return false;
        }
    } catch (e) {
        voltmx.print("Error in loginToDam: " + e.message);
        voltmx.store.setItem("isDamAvailable", false);
        return false;
    }
}
function convertUTCToFormattedLocalNotifications(utcString) {
  try {
    if (!utcString) return "";

    // Split date and time
    var parts = utcString.split(" ");
    if (parts.length !== 2) return "";

    var dateParts = parts[0].split("-");
    var timeParts = parts[1].split(":");

    if (dateParts.length !== 3 || timeParts.length < 3) return "";

    var year = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // JS month starts from 0
    var day = parseInt(dateParts[2], 10);

    var secondsParts = timeParts[2].split(".");
    var hour = parseInt(timeParts[0], 10);
    var minute = parseInt(timeParts[1], 10);
    var second = parseInt(secondsParts[0], 10);

    // Create UTC date properly
    var utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));

    if (isNaN(utcDate.getTime())) return "";

    // Now convert to local time automatically
    var localDate = new Date(utcDate);

    // Format it
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };

    return localDate.toLocaleString("en-US", options);

  } catch (e) {
    voltmx.print("Error: " + e.message);
    return "";
  }
}

function openLocalHTML() {
 
    var htmlContent = "<html><head><title>My Page</title></head><body><h1>Hello, World!</h1><p>This is loaded HTML.</p></body></html>";  // Your HTML string
    var dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);
    voltmx.application.openURL("data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Ctitle%3EMy%20Page%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E%3Cp%3EThis%20is%20loaded%20HTML.%3C%2Fp%3E%3C%2Fbody%3E%3C%2Fhtml%3E");
//      voltmx.application.openURL(dataUrl);
}

function checkImageHeaders() {

//     var url = "https://dev-hcltx.et.ae/dx/api/dam/v1/collections/d8baba99-87d6-47c0-bbab-06b53b2ef409/items/b50005ce-d15f-4cc0-a491-abba19693233?binary=true";
      var url = "https://uat-hcltx.et.ae/dx/api/dam/v1/collections/5906c1a6-dcb9-4003-bb7c-9f687f3170d5/items/c0651832-c708-4df7-887a-657972846f08?binary=true";
    var httpClient = new voltmx.net.HttpRequest();

    httpClient.onReadyStateChange = function () {

        if (httpClient.readyState == 4) {

            voltmx.print("Status : " + httpClient.status);

            // Print all response headers
            voltmx.print("All Headers:");
            voltmx.print(httpClient.getAllResponseHeaders());

            // Print specific cache headers
            voltmx.print("Cache-Control : " + httpClient.getResponseHeader("Cache-Control"));
            voltmx.print("ETag          : " + httpClient.getResponseHeader("ETag"));
            voltmx.print("Age           : " + httpClient.getResponseHeader("Age"));
            voltmx.print("Last-Modified : " + httpClient.getResponseHeader("Last-Modified"));
            voltmx.print("Expires       : " + httpClient.getResponseHeader("Expires"));
            voltmx.print("X-Cache       : " + httpClient.getResponseHeader("X-Cache"));
            voltmx.print("CF-Cache-Status : " + httpClient.getResponseHeader("CF-Cache-Status"));
        }
    };

    httpClient.open(constants.HTTP_METHOD_GET, url, true);
    httpClient.send();
}
  
 function eventAuctionBid(aucid,objid) {
    var self = this;
     var url = voltmx.store.getItem("SOCKET_URL");
     if(!url) return;
    checkTokenValidatity(function() {
      try {
          
          var request = new voltmx.net.HttpRequest();
           var accesstoken = voltmx.store.getItem("getUserAccesstoken");
      request.open("POST", url);
       request.setRequestHeader("user_token",accesstoken);
        request.setRequestHeader("Content-Type","application/json");
//         request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
//         request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");
                 //
//         request.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
// request.setRequestHeader("Pragma", "no-cache");
// request.setRequestHeader("Expires", "0");

          var body = {
      "auction_id": aucid,
   "object_id": objid
          
};
        
       request.send(JSON.stringify(body));    
       request.onReadyStateChange =  function() {
         if (request.readyState === 4) {
            if (request.status === 200) {
              var requestStringEmail = request.responseText;
              voltmx.print("");
//               alert(requestStringEmail);
                }
           else
             {
//                alert(requestStringEmail);
             }
          }
       };
      }
    catch(error){
//       alert("Error: " + error.message);
//       alert(error);
      voltmx.print(error);
    }
    });
  }
  

function enableWebSocket() {

console.log("##############################################################")

   var socket =  NativeWebSocket.connect("ws://192.168.2.106:8080");
//   NativeWeb

// 	var socket = new WebSocket("ws://192.168.2.106:8080");

	socket.onopen = function () {

	    socket.send(JSON.stringify({

	        action: "JOIN",

	        auctionId: Math.random(1000)

	    }));

	};

	socket.onmessage = function (event) {

	    var message = JSON.parse(event.data);

	    if (message.type === "NEW_BID") {

// 	        frmAuction.lblBid.text = "₹ " + message.highestBid;

// 	        frmAuction.lblBidder.text = message.bidder;

	    }

	};

}
 


  