define({ 

  //Type your controller code here 
  onNavigate: function(){
    this.view.flxBarFullName.skin = "sknflxBGDFDFDFRoundedBorderDFDFDF1px";
    this.view.flxNext.onClick = this.flxWrapper;
    this.view.txtFirstNlastName.onTextChange = this.onTextChangeAction;
    this.view.HeaderRegister1.flxBack.onClick = this.HeaderRegisterImgBackOnTouchEndAction.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.view.HeaderRegister1.btnLogin.onClick = this.flxLoginOnClickAction
    this.view.SmthngWentWrong.btnClose.onClick = this.popupClose;
    this.view.SmthngWentWrong.flxClose.onClick = this.popupClose;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
    this.view.onDeviceBack = () => {
      voltmx.print("Device back pressed, but blocked on frmRegister1");
    };
  },	

  
  
  onPreShow: function (){
    var previousForm = voltmx.application.getPreviousForm();
    this.view.SmthngWentWrong.setVisibility(false);
    var self = this;
    if (previousForm) {
      var id = previousForm.id;
      var formsToDestroy = ["frmRegister2","frmLoginScreen"];
      if (formsToDestroy.includes(id)) {
        voltmx.application.destroyForm(id);
      }
      if(id === "frmLoginScreen"|| id === "frmRegister2"){
        this.view.txtFirstNlastName.text = "";
        this.view.flxNext.setVisibility(false);
      }
    }
    this.setData();
  },
  
  
  
  
   flxErrorBtnTryAgainOnClickAction: function() {
  if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    this.view.flxError.setVisibility(false);
  } else {
    voltmx.print("Still offline...");
  }
},
  
  
  
  popupClose: function(){
    this.view.SmthngWentWrong.setVisibility(false);
  },
  
  
  
  
  setData: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblSetUp",
      "txtFirstNlastName",
      "lblFullNameError"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = labelAlignment;
      }
    }
    var flexList = [
      "flxUnderLineContainer",
      "flxImgJudge",
      "flxSetUp",
      "flxUserNameError",
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.HeaderRegister1.btnLogin.text = voltmx.i18n.getLocalizedString("login");
    this.view.lblSetUp.text = voltmx.i18n.getLocalizedString("Let's get you set up");
    this.view.txtFirstNlastName.placeholder = voltmx.i18n.getLocalizedString("First and last name");
  },
  
  
  
  
  flxLoginOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
    ntf.navigate();  
  },
  
  
  
  
  flxWrapper: function(){
    this.NextPageOnClickAction();
  },
  
  
  
  
  NextPageOnClickAction: async function(){
    if(this.view.txtFirstNlastName.text === ""){
      this.view.lblFullNameError.text = "Please Provide Full Name!!"
      return;
    }
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    var FullName = self.view.txtFirstNlastName.text;
    var verification_type = "fullName";
    var baseURL = voltmx.store.getItem("BASE_URL");
    if(baseURL){
      if (!baseURL.endsWith("/")) {
        baseURL += "/";
      }
    }
    var url = baseURL+"services/ms_user_reg/check-user-attribute";
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
    var username = "aaf23ca6180cfacbd5c4ea23c5faa2dd";
    var password = "43f644c5a1bea3169a10586ef47807bc";
    var credentials = username + ":" + password;
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    await new Promise((resolve,reject)=>{
      request.onReadyStateChange = function () {
        if (request.readyState === 4) {
          if (request.status === 200 ) {
            self.view.flxUserNameError.setVisibility(false);
            self.view.SmthngWentWrong.setVisibility(false);
            var requestString = request.responseText;
            var requestJSON = JSON.parse(requestString);
            var opstatusRes = requestJSON.opstatus;
            if(opstatusRes === 0 ){
              if (requestJSON.data && Object.keys(requestJSON.data).length > 0) {
                if( requestJSON.data.userExists === false && requestJSON.data.message === "Full name is valid"){
                  var ntf = new voltmx.mvc.Navigation("frmRegister2");
                  ntf.navigate(
                    {
                      "txtFirstNlastName_text": self.view.txtFirstNlastName.text,
                      "_meta_"                : {
                        "eventName": "onClick",
                        "widgetId" : "flxNext"
                      }
                    }
                  );
                  voltmx.store.setItem("fullName",FullName);
                }
                else{
                  voltmx.application.dismissLoadingScreen();
                  self.view.lblFullNameError.text = "*User Already Exists!!";
                  self.view.flxUserNameError.setVisibility(true);
                }
              } 
              else{
                voltmx.application.dismissLoadingScreen();

                self.view.flxUserNameError.setVisibility(true);
                self.view.lblFullNameError.text  = "*Backend or Service Error With No Data!"
              }
            }
            else{
              self.view.flxUserNameError.setVisibility(true);
              voltmx.application.dismissLoadingScreen();
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.lblFullNameError.text = "*Invalid Name Format";
            }
          }
          else {
            voltmx.application.dismissLoadingScreen();
            self.view.flxUserNameError.setVisibility(true);
            self.view.flxError.setVisibility(true);
          }
        }
      };
      var jsonData = JSON.stringify({
        "verification_type": verification_type,
        "value"            : FullName
      });
      request.send(jsonData);
    });
  },
  
  
  
  
  encodeToBase64: function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
        keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
  },
  
  
  

  onTextChangeAction: function () {
    var rawInput = this.view.txtFirstNlastName.text;
    var namecheck = rawInput.trim();
    var pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Only letters and spaces
    var containsLetter = /[A-Za-z]/.test(namecheck);
    var isValidLength = namecheck.length >= 4 && namecheck.length <= 100;
    if (
      rawInput !== namecheck ||           // leading/trailing spaces
      namecheck.length === 0 ||           // empty
      !pattern.test(namecheck) ||         // bad format
      !containsLetter  ||    
      !isValidLength  
      // must contain at least one letter
    ) {
      this.view.flxNext.setVisibility(false);
      this.view.flxUserNameError.setVisibility(true);
      this.view.lblFullNameError.text = "*Enter a valid fullname (4-100 letters)";
    } else {
      this.view.flxNext.setVisibility(true);
      this.view.flxUserNameError.setVisibility(false);
    }
  },

  
  
  
  HeaderRegisterImgBackOnTouchEndAction: function(){
    if(this.view.txtFirstNlastName.text !== ""){
      this.view.txtFirstNlastName.text = "";
      this.view.lblFullNameError.text = "";
      this.view.flxNext.setVisibility(false);
    }
    else{
      var ntf = new voltmx.mvc.Navigation("frmLoginScreen");
      ntf.navigate();  
    }
  }
});


