define({ 

  //Type your controller code here 
  onNavigate: function(){
    this.adjustRTL();
    this.view.flxSignUpContainer.onClick = this.NavigateToSignUpForm.bind(this);
    this.view.flxBack.onClick = () => {
     
      new voltmx.mvc.Navigation("frmDashBoard").navigate();
    }
//     this.view.btnSignIn.onClick = this.login.bind(this);
    this.view.btnSignIn.onClick = () =>{
      new voltmx.mvc.Navigation("frmLoginBrowser").navigate();
    }
    var self = this;
    try{
    self.view.preShow = self.onPreShow.bind(self);
    }
    catch(e)
      {
        voltmx.print(e);
      }
    
  },

  NavigateToSignUpForm: function(){
    var ntf = new voltmx.mvc.Navigation("frmRegister1");
    ntf.navigate();
  },
  
//   onPreShow: function(){
//     var previousForm = voltmx.application.getPreviousForm();
//     if(previousForm){
//       var id = previousForm.id;
//       if(id === "frmRegister2"){
//         voltmx.application.destroyForm("frmRegister2");
//       }
//     }
//   },
  onPreShow: function() {
//     if (this.isLoggingIn) {
//       this.justLoggedIn = null;
//         // Prevent anything from rendering if login in progress
//         return;
//     }
     this.browserWidget();
    this.destroypPreviousForms();
},
  
  destroypPreviousForms: function(){
      var self = this;
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
        var id = previousForm.id;
        var formsToDestroy = ["frmRegister2","frmRegister1"];
        
        if (formsToDestroy.includes(id)) {
            voltmx.application.destroyForm(id);
        }
    }
  },
browserWidget: function(){
      var self = this;
    if (self.view.defaultBrowserWidgetForOauth2) {
    self.view.remove(self.view.defaultBrowserWidgetForOauth2);
    self.view.defaultBrowserWidgetForOauth2 = null; // Also nullify the reference
  }
},
  
  login: function(){
    var self = this;
    
     if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    
    function invSuccess(response) {
      alert("login success");
      var instance = voltmx.sdk.getCurrentInstance();
     if (instance.tokens && instance.tokens.AzureB2C && instance.tokens.AzureB2C.provider_token && instance.tokens.AzureB2C.provider_token.params) {
        var accesstoken = instance.tokens.AzureB2C.provider_token.params.access_token;
        var refreshtoken = instance.tokens.AzureB2C.provider_token.params.refresh_token;
        var expon = instance.tokens.AzureB2C.provider_token.params.expires_on;
        
        voltmx.store.setItem("accesstoken", accesstoken);
        voltmx.store.setItem("refreshtoken", refreshtoken);
        voltmx.store.setItem("expon", expon);
    } else {
        voltmx.print("Provider tokens missing after login!");
    }

      voltmx.store.setItem("isLogin",true);
      voltmx.store.setItem("isUserCreated",true);
      
      self.getUserObject();
      
    }
    function invFailure(error) {
      alert("login failed");
    }
    
    login_inputparam["serviceID"] = "AzureB2C$login";
    login_inputparam["operation"] = "login";
    login_inputparam["UseDeviceBrowser"] = true;
    //#ifdef preview
    //#ifdef iphone
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#else
    //#ifdef iphone
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#endif
    AzureB2C$login = mfidentityserviceinvoker("AzureB2C", login_inputparam, invSuccess, invFailure);

  },
  
  login1: function(){
    var self = this;
//    self.isLoggingIn = true;
    function SHOW_ALERT_fd10b6306969472cbdf6f91575f6f820_True() {}
    function INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Success(response) {
        if (self.view.defaultBrowserWidgetForOauth2) {
            self.view.remove(self.view.defaultBrowserWidgetForOauth2);
        }
 
        function SHOW_ALERT_j0a2abff2b34402ebc918d773d940883_Callback() {
            SHOW_ALERT_j0a2abff2b34402ebc918d773d940883_True();
        }
//         voltmx.ui.Alert({
//             "alertType": constants.ALERT_TYPE_INFO,
//             "alertTitle": null,
//             "yesLabel": null,
//             "noLabel": null,
//             "alertIcon": null,
//             "message": "You have successfully logged in.",
//             "alertHandler": SHOW_ALERT_j0a2abff2b34402ebc918d773d940883_Callback
//         }, {
//             "iconPosition": constants.ALERT_ICON_POSITION_LEFT
//         });
      
       var instance = voltmx.sdk.getCurrentInstance();
     if (instance.tokens && instance.tokens.AzureB2C && instance.tokens.AzureB2C.provider_token && instance.tokens.AzureB2C.provider_token.params) {
        var accesstoken = instance.tokens.AzureB2C.provider_token.params.access_token;
        var refreshtoken = instance.tokens.AzureB2C.provider_token.params.refresh_token;
        var expon = instance.tokens.AzureB2C.provider_token.params.expires_on;
        
        voltmx.store.setItem("accesstoken", accesstoken);
        voltmx.store.setItem("refreshtoken", refreshtoken);
        voltmx.store.setItem("expon", expon);
    } else {
        voltmx.print("Provider tokens missing after login!");
    }
 
      voltmx.store.setItem("isLogin",true);
      voltmx.store.setItem("isUserCreated",true);
      self.getUserObject();
    }
    function INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Failure(error) {
        if (self.view.defaultBrowserWidgetForOauth2) {
            self.view.remove(self.view.defaultBrowserWidgetForOauth2);
        }
 
        function SHOW_ALERT_fd10b6306969472cbdf6f91575f6f820_Callback() {
            SHOW_ALERT_fd10b6306969472cbdf6f91575f6f820_True();
        }
        voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": null,
            "yesLabel": null,
            "noLabel": null,
            "alertIcon": null,
            "message": "Login failed. Please try again.",
            "alertHandler": SHOW_ALERT_fd10b6306969472cbdf6f91575f6f820_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    }
    function SHOW_ALERT_j0a2abff2b34402ebc918d773d940883_True() {}
    if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    login_inputparam["serviceID"] = "AzureB2C$login";
    login_inputparam["operation"] = "login";
    if (!self.view.defaultBrowserWidgetForOauth2) {
        self.view.add(new voltmx.ui.Browser({
            "id": "defaultBrowserWidgetForOauth2",
            "left": "0dp",
            "top": "0dp",
            "width": "100%",
            "height": "100%"
        }, {}, {}));
    }
    login_inputparam["browserWidget"] = self.view.defaultBrowserWidgetForOauth2;
    AzureB2C$login = mfidentityserviceinvoker("AzureB2C", login_inputparam, INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Success, INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Failure);
},


  getUserObject: function() {
  var self = this;

  function invoke_service_callback(status, get_user_object) {
    if (
      get_user_object &&
      get_user_object.httpStatusCode &&
      get_user_object.httpStatusCode === 401
    ) {
      alert("Sign-in failed. Please try again later.");

      var serviceName = "AzureB2C";
      var client = voltmx.sdk.getCurrentInstance();
      var identitySvc = client.getIdentityService(serviceName);

      var options = {
        slo: true,
        browserWidget: self.view.browserLogoutWidget // use self instead of this
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
        },
        function(error) {
    
  if (error && error.message && error.message.indexOf("sessions is not active") !== -1) {
  // Azure B2C session expired, clear tokens
  voltmx.print("Session expired. Clearing stored tokens...");
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
     
}
    else{
    voltmx.print("Logout failure: " + JSON.stringify(error));
    
    }
  },
        options
      );

      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
      return;
    } else if (
      get_user_object &&
      get_user_object.httpStatusCode &&
      get_user_object.httpStatusCode !== 200
    ) {
      alert("Something went wrong. Please try again later.");
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
      return;
    }

    voltmx.print(status);

    try {
      var rawResponse = get_user_object && get_user_object.rawResponse
        ? get_user_object.rawResponse
        : {};

      var getUserAccesstoken = rawResponse.access_token || "";
      var userId = rawResponse.user_id || "";
      var userAccessTokenExp = rawResponse.expires_in || "";
      var jobtitle = rawResponse.job_title || "";
      var securityDeposit = rawResponse.security_deposit || "";
      var nick = rawResponse.nick || "";
      var user_code = rawResponse.user_code || "";

      voltmx.store.setItem("userObject", get_user_object);
      voltmx.store.setItem("userId", userId);
      voltmx.store.setItem("getUserAccesstoken", getUserAccesstoken);
      voltmx.store.setItem("userAccessTokenExp", userAccessTokenExp);
      voltmx.store.setItem("jobTitle", jobtitle);
      voltmx.store.setItem("securityDeposit", securityDeposit);
      voltmx.store.setItem("username", nick);
      voltmx.store.setItem("user_code", user_code);

      // Safely determine mode
      var roles = jobtitle
        ? jobtitle.split(";").map(function(r) {
            return r.trim().toLowerCase();
          })
        : [];

      var defaultMode = roles.indexOf("buyer") !== -1 ? "buyer" : "seller";
      voltmx.store.setItem("mode", defaultMode);
    } catch (e) {
      voltmx.print("Error while setting user session: " + e.message);
    }

    var x = new voltmx.mvc.Navigation("frmDashBoard");
    x.navigate();
  }

  if (typeof get_user_object_inputparam === "undefined") {
    var get_user_object_inputparam = {};
  }

  get_user_object_inputparam["serviceID"] = "ms_user$get-user-object";

  var get_user_object_httpheaders = {
    jwt_azure_token: voltmx.store.getItem("accesstoken")
  };

  get_user_object_inputparam["httpheaders"] = get_user_object_httpheaders;
  get_user_object_inputparam["httpconfig"] = {};

  ms_user$get_user_object = mfintegrationsecureinvokerasync(
    get_user_object_inputparam,
    "ms_user",
    "get-user-object",
    invoke_service_callback
  );
},
  
  adjustRTL: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    this.view.flxSignUp.reverseLayoutDirection = isArabic;
    this.view.lblHeadingWelcome.text = voltmx.i18n.getLocalizedString("Welcome Back");
    this.view.btnSignIn.text = voltmx.i18n.getLocalizedString("Sign In");
    this.view.lblDontHaveAnAccount.text = voltmx.i18n.getLocalizedString("Don't have an account?");
    this.view.lblSignUp.text = voltmx.i18n.getLocalizedString("Sign Up");
//     this.view.lblDontHaveAnAccount.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblSignUp.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    if(isArabic)
      {
        this.view.lblDontHaveAnAccount.right = "14%";
        this.view.lblDontHaveAnAccount.left = null;
        
        this.view.flxSignUpContainer.right = "0dp";
        this.view.flxSignUpContainer.left = null;
      }
    else
      {
        this.view.lblDontHaveAnAccount.left = "18%";
        this.view.lblDontHaveAnAccount.right = "";
        
        this.view.flxSignUpContainer.left = "0dp";
        this.view.flxSignUpContainer.right = "";
      }
  }

  
});