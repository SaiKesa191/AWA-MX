
// define({
//     onNavigate: function(context) {
//         var self = this;

//         try {
//             // Ensure context and callback exist
//             if (!context || typeof context.onForgot !== "function") {
//                 voltmx.print("onNavigate: Invalid context or missing onForgot callback");
//                 return;
//             }

//             var browserWidget = self.view.browserForgotPassword;

//             // Defensive check: recreate or reassign browser widget if missing or invalid
//             if (!browserWidget || typeof browserWidget.onPageFinished !== "function") {
//                 voltmx.print("onNavigate: Browser widget missing or invalid, attempting recovery");

//                 try {
//                     // Try to dynamically create a new browser widget if not already present
//                     browserWidget = new voltmx.ui.Browser({
//                         id: "browserForgotPassword",
//                         isVisible: true,
//                         left: "0dp",
//                         top: "0dp",
//                         width: "100%",
//                         height: "100%",
//                         detectTelNumber: true
//                     }, {}, {});
//                     self.view.add(browserWidget);
//                 } catch (creationError) {
//                     voltmx.print("onNavigate: Failed to create browser widget - " + creationError);
//                     return;
//                 }
//             }

//             // Attach page finished listener
//             browserWidget.onPageFinished = function(b, params) {
//                 var url = params && (params.originalURL || params.url);
//                 voltmx.print("Forgot password browser finished: " + url);

//                 if (!url) return;

//                 if (url.indexOf("access_denied") !== -1 ||
//                     url.indexOf("cancel") !== -1 ||
//                     url.indexOf("error_description") !== -1) {
                    
//                     voltmx.print("Forgot password cancelled or denied, returning to login");
//                     new voltmx.mvc.Navigation("frmLoginBrowser").navigate();
//                 }
//                 else if (url.indexOf("success") !== -1 ||
//                          url.indexOf("reset_confirmed") !== -1) {
                    
//                     voltmx.print("Forgot password completed successfully");
//                     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//                 }
//                 else if (url.indexOf("/oauth2/callback") !== -1) {
//                     voltmx.print("Password reset completed, redirect detected: " + url);
//                     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//                 }
//             };

//             // Trigger the callback to load the forgot-password URL
//             context.onForgot(browserWidget);
//         } catch (e) {
//             voltmx.print("onNavigate: Unexpected error - " + e);
//         }
//     }
// });

// define({
//     onNavigate: function() {
//         var self = this;

//         try {
//             voltmx.print("frmForgotBrowser onNavigate started");

//             // Step 1: Clear cookies before starting
//             try {
//                 voltmx.net.clearCookies();
//                 voltmx.print("Cleared all cookies before Forgot Password flow");
//             } catch (cookieErr) {
//                 voltmx.print("Failed to clear cookies: " + cookieErr);
//             }

//             // Step 2: Dynamically create Browser widget (no static one in form)
//             var browserWidget;
//             try {
//                 browserWidget = new voltmx.ui.Browser({
//                     id: "browserForgotPassword",
//                     isVisible: true,
//                     left: "0dp",
//                     top: "0dp",
//                     width: "100%",
//                     height: "100%",
//                     detectTelNumber: true
//                 }, {}, {});

//                 // Add it to the form (or a flex container if available)
//                 if (self.view.flxMain) {
//                     self.view.flxMain.add(browserWidget);
//                 } else {
//                     self.view.add(browserWidget);
//                 }

//                 voltmx.print("Dynamically created browserForgotPassword widget successfully");
//             } catch (creationError) {
//                 voltmx.print("Failed to create browser widget: " + creationError);
//                 return;
//             }

//             //  Step 3: Attach page finished handler
//             browserWidget.onPageFinished = function(b, params) {
//                 var url = params && (params.originalURL || params.url);
//                 voltmx.print("Forgot password browser finished loading: " + url);

//                 if (!url) return;

//                 // Handle redirects / flow
//                 if (url.indexOf("access_denied") !== -1 ||
//                     url.indexOf("cancel") !== -1 ||
//                     url.indexOf("error_description") !== -1) {
//                     voltmx.print("Forgot password cancelled or denied → navigating to login");
//                     new voltmx.mvc.Navigation("frmLoginBrowser").navigate();
//                 }
//                 else if (url.indexOf("success") !== -1 ||
//                          url.indexOf("reset_confirmed") !== -1) {
//                     voltmx.print("Forgot password completed successfully → navigating to login");
//                     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//                 }
//                 else if (url.indexOf("/oauth2/callback") !== -1) {
//                     voltmx.print("Password reset redirect detected: " + url);
//                     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//                 }
//             };

//             // Step 4: Start Forgot Password flow (call identity service)
//             self.startForgotPasswordFlow(browserWidget);

//         } catch (e) {
//             voltmx.print("frmForgotBrowser onNavigate error: " + e);
//         }
//     },

//     startForgotPasswordFlow: function(browserWidget) {
//         try {
//             voltmx.print("Starting forgot password identity flow...");

//             var login_inputparam = {
//                 serviceID: "ForgetPassword$login",
//                 operation: "login",
//                 UseDeviceBrowser: false,
//                 browserWidget: browserWidget
//             };

//             function onSuccess(response) {
//                 voltmx.print("Forgot password success: " + JSON.stringify(response));
//             }

//             function onFailure(error) {
//                 voltmx.print("Forgot password failed: " + JSON.stringify(error));
//             }

//             // Invoke the identity service
//             mfidentityserviceinvoker(
//                 "ForgetPassword",
//                 login_inputparam,
//                 onSuccess,
//                 onFailure
//             );
//         } catch (ex) {
//             voltmx.print("startForgotPasswordFlow error: " + ex);
//         }
//     }
// });

define({
  
  onNavigate: function()
  {
//     this.startForgotPasswordFlow();
    var self = this;
    try
    {
    voltmx.timer.schedule("startForgotTimer", function() {
    self.startForgotPasswordFlow();
  }, 2, false);
    
  }
  catch(e)
{
  voltmx.print("Timer cancel failed or already cleared: " + e);
}
    
    self.view.onHide = self.onHideForm.bind(self);
  },
  
  onHideForm: function() {
  voltmx.print("Forgot Browser form hidden — cancelling any pending timers");
  try {
    voltmx.timer.cancel("startForgotTimer");
  } catch (e) {
    voltmx.print("Timer cancel failed or already cleared: " + e);
  }
},
  
  startForgotPasswordFlow: function() {
  var self = this;
  voltmx.print("Starting forgot password identity flow...");

  // --- Step 1: clear cookies before new session ---
  try {
    voltmx.net.clearCookies();
    voltmx.print("Cleared cookies before Forgot Password identity flow");
  } catch (cookieErr) {
    voltmx.print("Failed to clear cookies: " + cookieErr);
  }

  // --- Step 2: create Browser widget if not already present ---
    if (self.view) {
  if (!self.view.defaultBrowserWidgetForForgot) {
    try {
      
      voltmx.print("Creating browser widget for Forgot Password flow...");

         self.view.add(new voltmx.ui.Browser({
            "id": "defaultBrowserWidgetForForgot",
            "left": "0dp",
            "top": "0dp",
            "width": "100%",
            "height": "100%"
        }, {}, {}));
      
 
      voltmx.print("Browser widget for Forgot Password added to view");
    } catch (creationErr) {
      voltmx.print("Failed to create browser widget: " + creationErr);
      return;
    }
  }
    }
    else
      {
        voltmx.print("self.view is not available yet – skipping forgot-widget creation");
      }
  // --- Step 3: Always rebind onPageFinished handler ---
  voltmx.print("Rebinding onPageFinished for Forgot Password browser");
//   self.view.defaultBrowserWidgetForForgot.goBack = () =>{
//     new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//   }
    
    
 if (self.view) {
  if (self.view.defaultBrowserWidgetForForgot) {
   self.view.defaultBrowserWidgetForForgot.handleRequest = function(b, params) {
    var url = (params.originalURL || "").toLowerCase();
    voltmx.print("handleRequest → " + url);

    if (url.includes("cancel") || url.includes("access_denied")) {
        new voltmx.mvc.Navigation("frmLoginScreen").navigate();
        return true; // stop loading this URL
    }
     else if (url.indexOf("success") !== -1 ||
               url.indexOf("reset_confirmed") !== -1 ||
               url.indexOf("/oauth2/callback") !== -1) {
      voltmx.print("Forgot password completed successfully → navigating to login");
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
       return true;
    }

    return false; // allow normal navigation
};
  }
 }

    
//   self.view.defaultBrowserWidgetForForgot.onPageFinished = function(b, params) {
//     var url = params && (params.originalURL || params.url);
//     voltmx.print("Forgot password browser finished loading: " + url);

//     if (!url) return;

//     if (url.indexOf("access_denied") !== -1 ||
//         url.indexOf("cancel") !== -1 ||
//         url.indexOf("error_description") !== -1) {
//       voltmx.print("Forgot password cancelled or denied → navigating to login");
//       new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//     } else if (url.indexOf("success") !== -1 ||
//                url.indexOf("reset_confirmed") !== -1 ||
//                url.indexOf("/oauth2/callback") !== -1) {
//       voltmx.print("Forgot password completed successfully → navigating to login");
//       new voltmx.mvc.Navigation("frmLoginScreen").navigate();
//     }
//   };

  // --- Step 4: Prepare input parameters for the Identity Service ---
  var forgot_inputparam = {};
  forgot_inputparam["serviceID"] = "ForgetPassword$login";
  forgot_inputparam["operation"] = "login";
  forgot_inputparam["browserWidget"] = self.view && self.view.defaultBrowserWidgetForForgot;

  // --- Step 5: Invoke the Identity Service ---
  function onSuccess(response) {
    voltmx.print("Forgot password success: " + JSON.stringify(response));
    if (self.view && self.view.defaultBrowserWidgetForForgot) {
      self.view.remove(self.view.defaultBrowserWidgetForForgot);
    }
  }

  function onFailure(error) {
    voltmx.print("Forgot password failed: " + JSON.stringify(error));
    if (self.view && self.view.defaultBrowserWidgetForForgot) {
      self.view.remove(self.view.defaultBrowserWidgetForForgot);
    }
  }

  mfidentityserviceinvoker("ForgetPassword", forgot_inputparam, onSuccess, onFailure);
}

  
});
