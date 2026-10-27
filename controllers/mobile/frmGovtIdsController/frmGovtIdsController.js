define({ 

  //Type your controller code here 
  onNavigate: function(){
    this.view.flxBackNav.onClick= this.flxBackNavOnClickAction;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.segGovtIds.onRowClick = this.segGovtIdsOnRowClickAction;
    this.view.segVATCertificates.onRowClick = this.segVATCertificatesOnRowClickAction;
    this.view.flxUploadPopupClose.onClick = this.flxUploadPopupCloseOnClickAction;

    //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck;
    //#endif

    //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFI;
    //#endif
    this.view.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction;
    this.view.cam.onCapture = this.camOnCaptureAction;
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction;
    this.view.SmthngWentWrong.flxClose.onClick = this.btnCloseOnClick;
    this.view.SmthngWentWrong.btnClose.onClick = this.btnCloseOnClick;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
  },
  
  
  

  onPreShow: function(){
    this.toggleFooterIcons();
    this.setHeading();
    this.getUploadedData();  
    this.view.flxDocsError.setVisibility(false);
    this.Addingi18nKeys();
  },
  
  
  

  i18n: function(key) {
    return voltmx.i18n.getLocalizedString(key) || key; 
  },


  
  i18nStatus: function(status) {
    switch (status) {
      case "Verified": return voltmx.i18n.getLocalizedString("Verified");
      case "Under Review": return voltmx.i18n.getLocalizedString("Under Review");
      case "Not Uploaded": return voltmx.i18n.getLocalizedString("Not Uploaded");
      default: return status;
    }
  },

  


  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
    }
  },




  btnCloseOnClick: function(){
    this.view.SmthngWentWrong.setVisibility(false);
  },



  checkSession: function(callback) {
    if (this.sessionCookie) {
      voltmx.print("Session already available.");
      callback();
    } else {
      voltmx.print("No session. Logging in...");
      this.loginToDam((newCookie) => {
        if (newCookie) {
          this.sessionCookie = newCookie;
          callback();
        } else {
          voltmx.print("Login failed. Cannot proceed.");
        }
      });
    }
  },


  
  
  loginToDam: function(callback) {
    var httpClient = new voltmx.net.HttpRequest();
    var baseURL = voltmx.store.getItem("BASE_URL");
    if (baseURL) {
      baseURL = baseURL.trim();
      baseURL = baseURL.replace(/:\d+$/, "");
      if (!baseURL.endsWith("/")) {
        baseURL += "/";
      }
    }
    var url = baseURL + "dx/api/core/v1/auth/login";
    httpClient.open("POST", url , false);
    var username =  voltmx.store.getItem("DAM_USER_NAME");
    var password = voltmx.store.getItem("DAM_PASSWORD");
    var payload = {
      username: username,
      password: password
    };
    httpClient.setRequestHeader("Content-Type", "application/json");
    httpClient.send(JSON.stringify(payload));

    if (httpClient.status === 200) {
      var allHeaders = httpClient.getAllResponseHeaders();
      var cookie = allHeaders["Set-Cookie"] || allHeaders["set-cookie"];
      if (cookie) {
        voltmx.print("Login successful, new cookie set.");
        callback(cookie);
      } else {
        voltmx.print("Login succeeded but no cookie returned.");
        callback(null);
      }
    } else {
      if(httpClient.status === 500 || httpClient.status === 503 ){
        alert("Image not available... failed with status "+httpClient.status );
      }
      voltmx.print("Login failed with status: " + httpClient.status);
      callback(null);
    }
  },




  toggleFooterIcons: function()
  {
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
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
    this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
    this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
    this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");

    var mode = voltmx.store.getItem("mode") || "seller";
    if (mode === "seller") {
      this.view.Footer2.imgMyBids.src = "mylistings.png";
      this.view.Footer2.lblMyBids.text = "Listings";
    } else {
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      this.view.Footer2.lblMyBids.text = "My Bids";
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



  setSectionVisibility: function(doctype) {
    this.view.flxSegmentVATCertificates.setVisibility(false);
    this.view.flxSegmentSaleContract.setVisibility(false);
    this.view.flxSegmentGovtIds.setVisibility(false);
    this.view.flxSegTradeLicenses.setVisibility(false);
    this.view.flxShowUploadedImg.setVisibility(false);
    switch (doctype) {
      case "VAT_Certificates":
        this.view.lblGovtIds.text = "VAT Certificates";
        this.view.flxSegmentVATCertificates.setVisibility(true);
        this.view.segVATCertificates.setVisibility(true);
        break;

      case "Government_IDs":
        this.view.lblGovtIds.text = "Government IDs";
        this.view.flxSegmentGovtIds.setVisibility(true);
        break;

      case "contract":
        this.view.lblGovtIds.text = "Sale Contract";
        this.view.flxSegmentSaleContract.setVisibility(true);
        this.view.segSaleContract.setVisibility(true);
        break;

      case "trade_license":
        this.view.lblGovtIds.text = "Trade Licenses";
        this.view.flxSegTradeLicenses.setVisibility(true);
        this.view.segTradeLicenses.setVisibility(true);
        break;
    }
  },

  
  
  
  setHeading: function() {
    var doctype = voltmx.store.getItem("Doctype");
    this.setSectionVisibility(doctype);
  },
  
  
  

  flxBackNavOnClickAction: function() {
    if (this.view.flxShowUploadedImg.isVisible) {
      var doctype = voltmx.store.getItem("Doctype");
      this.view.flxShowUploadedImg.setVisibility(false);
      this.setSectionVisibility(doctype);
    } else {
      var ntf = new voltmx.mvc.Navigation("frmMyDocuments");
      ntf.navigate();
    }
  },


  

  getUploadedData: function() {
        voltmx.application.showLoadingScreen(null, "Loading..",   
                                             constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                             true,
                                             true, {    
          shouldShowLabelInBottom: "true",    
          separatorHeight: 45,      
          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,   
          progressIndicatorColor: "Gray"     });
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var user_id = voltmx.store.getItem("userId");
    var type = voltmx.store.getItem("Doctype");
    var get_my_documents_inputparam = {
      serviceID: "fry_int_user$get-my-documents",
      reference_id: user_id,
      category: "My_Documents",
      type: type,
      httpheaders: {
        "user_token": user_token
      },
      httpconfig: {}
    };
    var self = this;

    fry_int_user$get_my_documents = 
      mfintegrationsecureinvokerasync(get_my_documents_inputparam, 
                                      "fry_int_user", 
                                      "get-my-documents", 
                                      function(status1,response){
      voltmx.print("Status1 :"+status1);
            voltmx.application.dismissLoadingScreen();
      if(response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
      if (!response.records || !Array.isArray(response.records) || response.records.length === 0) {
        voltmx.print("No documents found or empty response.");
        voltmx.store.setItem("isDatafound", false);
        self.createDynamicGovtSeg();
        self.createDynamicVATCert();
        self.createDynamicSaleContract();
        self.createDynamicTrdaeLicenses();
        return;
      }
      else{
        voltmx.store.setItem("isDatafound", true);
                voltmx.application.dismissLoadingScreen();
        self.docObj = {};
        var data = response.records;
        data.forEach(res=>{
          var subType  =  res.sub_type ? res.sub_type.trim().toLowerCase() : "";  
          var file_url = res.file_url;
          var status   = res.status;
          var file_name = res.file_name;
          if (subType.includes("passport")) {

            self.docObj[subType] =res;
          }//if close
          else if(subType === "uae pass"){
            self.docObj["uae pass"] = res;	
          }
          else if (subType === "driving license"){
            self.docObj["driving license"] = res;
          }//else if close
          else if (subType === "vat certificate") {
            self.docObj["vat certificate"] = res;
          } else if (subType === "contract") {
            self.docObj["contract"] = res;
          }
          else if (subType === "trade_license") {
            self.docObj["trade_license"] = res;
          }
          else if (subType === "emirates id"){
            self.docObj["emirates id"] = res;
          }
          if(type === "trade_license" ){
            if(file_url&&file_name){
              voltmx.store.setItem("isUploadedTradeLicenses", false);
            }
          }
          else if(type === "contract"){
            if(file_url&&file_name){
              voltmx.store.setItem("isUploadedSaleContract",false);
            }
          }
          else if(type === "VAT_Certificates"){
            if(status === "Verified"){
              if(file_url&&file_name){
                voltmx.store.setItem("isUploadedVatCert", true);
              }
            }
          }
          else if(type === "Government_IDs"){
            if(file_url&&file_name){
              voltmx.store.setItem("isUploadedGovtIds", false);
            }
            if(subType === "Emirates ID"){
              voltmx.store.setItem("isUploadedGovtIdsEmirates", false);
            }
            else if(subType === "passport"){
              voltmx.store.setItem("isUploadedGovtIdsPassPort", false);
            }
            else if(subType === "uae pass"){
              voltmx.store.setItem("isUploadedGovtIdsUAEPass", false);
            }
            else if(subType === "Driving license"){
              voltmx.store.setItem("isUploadedGovtIdsDrivingLicense", false);
            }
          }
        });//map close
        var passportDoc = self.docObj["passport"];
        if (passportDoc) {
          self.statusForPassport = passportDoc.status;
          self.fileUrlForPassport = passportDoc.file_url;
          voltmx.print("Passport status: " +self.statusForPassport);
          voltmx.print("Passport file URL: " + self.fileUrlForPassport);
        }//if close
        self.createDynamicGovtSeg();
        self.createDynamicVATCert();
        self.createDynamicSaleContract();
        self.createDynamicTrdaeLicenses();
      }
    });//service close

  },//unction close


  
  
  onEyeOpenClickForPassportGovtIdFunc: function(passportDoc){
    voltmx.print("onEyeOpenClickForPassportGovtIdFunc triggered");
    var docObj = this.docObj || {};
    var isDatafound = voltmx.store.getItem("isDatafound");
    voltmx.print("isDatafound: " + isDatafound);
    voltmx.print("docObj.passport: " + JSON.stringify(passportDoc));

    if (isDatafound && passportDoc) {
      this.onEyeOpenClickForPassportGovtId(passportDoc);
    } else {
      alert("Please upload to view");
    }
  },

  
  
  onEyeOpenClickForUAEPassFunc: function(uaePassDoc){
    var isDatafound = voltmx.store.getItem("isDatafound");
    voltmx.print("onEyeOpenClickForPassportGovtIdFunc triggered");
    var docObj = this.docObj || {};
    voltmx.print("isDatafound: " + isDatafound);
    voltmx.print("docObj.passport: " + JSON.stringify(uaePassDoc));
    if (isDatafound && uaePassDoc) {
      this.onEyeOpenClickForUAEPass(uaePassDoc);
    } else {
      alert("Please upload to view");
    }
  },

  
  
  
  onEyeOpenClickForDrivingLicenseFunc: function(drivingLicenseDoc){
    var docObj = this.docObj || {};
    var isDatafound = voltmx.store.getItem("isDatafound");
    if(isDatafound && drivingLicenseDoc){
      this.onEyeOpenClickForDrivingLicense(drivingLicenseDoc);
    }
    else{
      alert("Please upload to view");
    }
  },
  
  
  
  
  onEyeOpenClickForEmiratesIdFunc: function(emiratesIdDoc){
    var docObj = this.docObj || {}; 
    var isDatafound = voltmx.store.getItem("isDatafound");
    if(isDatafound && emiratesIdDoc){
      this.onEyeOpenClickForEmiratesId(emiratesIdDoc);
    }
    else{
      alert("Please upload to view");
    }
  },
  



  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if(isArabic)
      {
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
      }
    else
      {
         this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
      }
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
      this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblDocuments",
      "lblHowWouldYou",
      "lblGovtIds"
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
    var flexList = [
      "flxHeading", 
      "flxGovtIdsHeadText",
      "flxDocsError",
      "flxToggles"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    var selectedItem = voltmx.store.getItem("selectedGovtId")
    if (selectedItem) {
      this.view.lblGovtIds.text = voltmx.i18n.getLocalizedString(selectedItem);
    }
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblHowWouldYou.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
    this.view.lblChooseFromFile.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE");
    this.view.lblChooseFromLibrary.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
    this.view.cam.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
    this.view.btnSubmitForUpload.text = voltmx.i18n.getLocalizedString("Submit");
    this.view.SmthngWentWrong.btnClose.text = voltmx.i18n.getLocalizedString("CloseWithCaps");
    this.view.SmthngWentWrong.lblSomethingWentWrong.text= voltmx.i18n.getLocalizedString("Something went wrong. Please  try again later.");
    this.view.SmthngWentWrong.lblOops.text = voltmx.i18n.getLocalizedString("Oops!");
  },

  
  

  createDynamicGovtSeg: function(){
    this.view.segGovtIds.widgetDataMap = {
      "lblIdName": "lblIdName",
      "btnStatus": "btnStatus",
      "imgUpload": "imgUpload",
      "imgEyeOpen": "imgEyeOpen",
      "flxUpload": "flxUpload",
      "flxEyeOpen": "flxEyeOpen",
      "flxUploadAndSeen": "flxUploadAndSeen",
      "segRowGovtIds": "segRowGovtIds",
      "flxStatus":"flxStatus",
      "flxIdName":"flxIdName"
    };
    var RTL = 100;
    var LTR = 101;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var docObj = this.docObj || {}; 
    var passportDoc = docObj["passport"] || {};
    var uaePassDoc = docObj["uae pass"] || {};
    var drivingLicenseDoc =   docObj["driving license"] || {};
    var emiratesId = docObj["emirates id"] || {};

    var data = [{
      "imgUpload": "upload512h.png",
      "imgEyeOpen": "eyeicon512h.png",
      "lblIdName": {
        "text": voltmx.i18n.getLocalizedString("Passport"),
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
      },
      "btnStatus": {

        "text": this.i18nStatus(passportDoc.status || "Not Uploaded"),

        "skin": passportDoc &&passportDoc.status === "Uploaded"
        ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"

        : passportDoc.status === "Under Review"
        ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"
        : passportDoc.status === "Verified"
        ? "sknbtnBGD32437FontffffffDubaiReg45px"
        : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"
      },
      "flxEyeOpen": {
        "layoutDirection": isArabic ? constants.FLEX_LAYOUT_DIRECTION_RTL : constants.FLEX_LAYOUT_DIRECTION_LTR,
        "onClick": passportDoc ?
        this.onEyeOpenClickForPassportGovtIdFunc.bind(this,passportDoc)
        :function () { alert("Please upload to view."); }
      },
      "flxUpload": {
        "layoutDirection": isArabic ? constants.FLEX_LAYOUT_DIRECTION_RTL : constants.FLEX_LAYOUT_DIRECTION_LTR,
        "onClick": passportDoc? this.deleteFileObjectIfExists.bind(this,
                                                                   passportDoc.status || "",
                                                                   passportDoc.file_url || "",
                                                                   passportDoc.id || "","passport"
                                                                  ) : function(){
          this.view.flxHowWouldYouLike.setVisibility(true);
          voltmx.store.setItem("UploadType", "passport");
        }
      },

      "flxUploadAndSeen": {
        "reverseLayoutDirection": isArabic
      },
      "flxNameAndStatus": {
        "reverseLayoutDirection": isArabic
      },
      "segRowGovtIds": {
        "reverseLayoutDirection": isArabic
      },
      "flxStatus":{
        "reverseLayoutDirection": isArabic,
        "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,

      },
      "flxIdName":{
        "reverseLayoutDirection": isArabic
      }

    },

//                 {
//                   "imgUpload": "upload512h.png",
//                   "imgEyeOpen": "eyeicon512h.png",
//                   "lblIdName": {
//                     "text": voltmx.i18n.getLocalizedString("UAE Pass"),
//                     "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
//                   },
//                   "btnStatus": {
//                     "text": uaePassDoc ? this.i18nStatus(uaePassDoc.status) : this.i18nStatus("Not Uploaded"),
//                     "skin": uaePassDoc &&uaePassDoc.status === "Uploaded"
//                     ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"   // green for Uploaded
//                     : uaePassDoc&& uaePassDoc.status === "Under Review"
//                     ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review (same green)
//                     : uaePassDoc&& uaePassDoc.status === "Verified"
//                     ? "sknbtnBGD32437FontffffffDubaiReg45px"          // red for Verified
//                     : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"   // gray for Not Uploaded or others

//                   },
//                   "flxEyeOpen": {
//                     "onClick": () => {

//                       if (uaePassDoc ){     
//                         this.onEyeOpenClickForUAEPassFunc(uaePassDoc);
//                       } else {
//                         alert("Please upload to view.");
//                       }
//                     }
//                   },
//                   "flxUpload": {
//                     "onClick": () => {
//                       if (uaePassDoc) {
//                         this.deleteFileObjectIfExists(
//                           uaePassDoc.status || "",
//                           uaePassDoc.file_url || "",
//                           uaePassDoc.id || "",
//                           "uae pass"
//                         );
//                       } else {
//                         this.view.flxHowWouldYouLike.setVisibility(true);
//                         voltmx.store.setItem("UploadType", "uaePass");
//                       }
//                     }
//                   },
//                   "flxUploadAndSeen": {
//                     "reverseLayoutDirection": isArabic
//                   },
//                   "flxNameAndStatus": {
//                     "reverseLayoutDirection": isArabic
//                   },
//                   "segRowGovtIds": {
//                     "reverseLayoutDirection": isArabic
//                   },
//                   "flxStatus":{
//                     "reverseLayoutDirection": isArabic,
//                     "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,

//                   },
//                   "flxIdName":{
//                     "reverseLayoutDirection": isArabic
//                   }
//                 },

                {
                  "imgUpload": "upload512h.png",
                  "imgEyeOpen": "eyeicon512h.png",

                  "lblIdName": {
                    "text": voltmx.i18n.getLocalizedString("Driving License"),
                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT

                  },
                  "btnStatus": {
                    "text": drivingLicenseDoc ? this.i18nStatus(drivingLicenseDoc.status) :this.i18nStatus("Not Uploaded"),

                    "skin": drivingLicenseDoc && drivingLicenseDoc.status === "Uploaded"
                    ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"   // green for Uploaded
                    : drivingLicenseDoc && drivingLicenseDoc.status === "Under Review"
                    ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review
                    : drivingLicenseDoc&& drivingLicenseDoc.status === "Verified"
                    ? "sknbtnBGD32437FontffffffDubaiReg45px"          // red for Verified
                    : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"   // gray for Not Uploaded or others

                  },
                  "flxEyeOpen": {
                    "onClick": () => {
                      if (drivingLicenseDoc) {
                        this.onEyeOpenClickForDrivingLicenseFunc(drivingLicenseDoc);
                      } else {
                        alert("Please upload to view.");
                      }
                    }
                  },
                  "flxUpload": {
                    "onClick": () => {
                      if (drivingLicenseDoc ) {
                        this.deleteFileObjectIfExists(
                          drivingLicenseDoc.status || "",
                          drivingLicenseDoc.file_url || "",
                          drivingLicenseDoc.id || "",
                          "driving license"
                        );
                      } else {
                        this.view.flxHowWouldYouLike.setVisibility(true);
                        voltmx.store.setItem("UploadType", "drivingLicense");
                      }
                    }
                  },
                  "flxUploadAndSeen": {
                    "reverseLayoutDirection": isArabic
                  },
                  "flxNameAndStatus": {
                    "reverseLayoutDirection": isArabic
                  },
                  "segRowGovtIds": {
                    "reverseLayoutDirection": isArabic
                  },
                  "flxStatus":{
                    "reverseLayoutDirection": isArabic,
                    "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,

                  },
                  "flxIdName":{
                    "reverseLayoutDirection": isArabic
                  }

                },
                {
                  "imgUpload": "upload512h.png",
                  "imgEyeOpen": "eyeicon512h.png",
                  "lblIdName": {
                    "text": voltmx.i18n.getLocalizedString("Emirates ID"),

                    "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
                  },
                  "btnStatus": {
                    "text": emiratesId ? this.i18nStatus(emiratesId.status) : this.i18nStatus("Not Uploaded"),
                    "skin": emiratesId && emiratesId.status === "Uploaded"
                    ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"   // green for Uploaded
                    : emiratesId && emiratesId.status === "Under Review"
                    ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review
                    : emiratesId && emiratesId.status === "Verified"
                    ? "sknbtnBGD32437FontffffffDubaiReg45px"          // red for Verified
                    : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"   // gray for Not Uploaded or others

                  },

                  "flxEyeOpen": {
                    "onClick": () => {
                      if (emiratesId ) {
                        this.onEyeOpenClickForEmiratesIdFunc(emiratesId);
                      } else {
                        alert("Please upload to view.");
                      }
                    }
                  },
                  "flxUpload": {
                    "onClick": () => {
                      if (emiratesId) {
                        this.deleteFileObjectIfExists(
                          emiratesId.status || "",
                          emiratesId.file_url || "",
                          emiratesId.id || "",
                          "emirates id"
                        );
                      } else {
                        this.view.flxHowWouldYouLike.setVisibility(true);
                        voltmx.store.setItem("UploadType", "emiratesId");
                      }
                    }
                  },
                  "flxUploadAndSeen": {
                    "reverseLayoutDirection": isArabic
                  },
                  "flxNameAndStatus": {
                    "reverseLayoutDirection": isArabic
                  },
                  "segRowGovtIds": {
                    "reverseLayoutDirection": isArabic
                  },
                  "flxStatus":{
                    "reverseLayoutDirection": isArabic,
                    "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,

                  },
                  "flxIdName":{
                    "reverseLayoutDirection": isArabic
                  }

                }
               ];
    this.view.segGovtIds.setData(data);
    this.view.forceLayout();
  },
  
  
  


  createDynamicVATCert: function() {
    var docObj = this.docObj || {};
    var docInfo = docObj["vat certificate"]|| {};
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    this.view.segVATCertificates.widgetDataMap = {
      "lblIdName": "lblIdName",
      "btnStatus": "btnStatus",
      "imgUpload": "imgUpload",
      "imgEyeOpen": "imgEyeOpen",
      "flxUpload": "flxUpload",
      "flxEyeOpen": "flxEyeOpen",
      "flxUploadAndSeen": "flxUploadAndSeen",
      "segRowVATCertificates": "segRowVATCertificates",
      "flxStatus":"flxStatus",
      "flxIdName":"flxIdName"
    };
    var RTL = 100;
    var LTR = 101;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var data = [
      {
        "imgUpload": "upload512h.png",
        "imgEyeOpen": "eyeicon512h.png",
        "lblIdName": {
          "text": voltmx.i18n.getLocalizedString("VAT Certificates"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "btnStatus": {
          "text": docInfo ? this.i18nStatus(docInfo.status) : this.i18nStatus("Not Uploaded"),
          "skin": docInfo && docInfo.status === "Uploaded"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"   // green for Uploaded
          : docInfo && docInfo.status === "Under Review"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review
          : docInfo && docInfo.status === "Verified"
          ? "sknbtnBGD32437FontffffffDubaiReg45px"          // red for Verified
          : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"   // gray for Not Uploaded or others

        },
        "flxEyeOpen": {
          "onClick": () => {
            if (docInfo && docInfo!=={}) {
              this.onEyeOpenClickForPassportVATCert(docInfo);
            } else {
              alert("Please upload to view.");
            }
          }
        },

        "flxUpload": {
          "onClick": () => {
            if (docInfo&& docInfo!=={}) {
              this.deleteFileObjectIfExists(
                docInfo.status || "",
                docInfo.file_url || "",
                docInfo.id || "",
                "vat certificates"
              );
            } else {
              this.view.flxHowWouldYouLike.setVisibility(true);
              voltmx.store.setItem("UploadType", "VatCert");
            }
          }
        },
        "flxUploadAndSeen": {
          "reverseLayoutDirection": isArabic
        },
        "flxNameAndStatus": {
          "reverseLayoutDirection": isArabic
        },
        "segRowVATCertificates": {
          "reverseLayoutDirection": isArabic
        },
        "flxStatus":{
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,

        },
        "flxIdName":{
          "reverseLayoutDirection": isArabic
        }
      }
    ];
    //     alert("data"+ JSON.stringify(data));
    this.view.segVATCertificates.setData(data);
    this.view.forceLayout();
  },





  createDynamicSaleContract: function() {
    var docObj = this.docObj || {}; 
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var saleContractDoc = docObj["contract"] || {}; 
    var status = this.i18nStatus(saleContractDoc ? saleContractDoc.status : "Not Uploaded");
    this.view.segSaleContract.widgetDataMap = {

      "lblIdName": "lblIdName",
      "btnStatus": "btnStatus",
      "imgUpload": "imgUpload",
      "imgEyeOpen": "imgEyeOpen",
      "flxUpload": "flxUpload",
      "flxEyeOpen": "flxEyeOpen",
      "flxUploadAndSeen": "flxUploadAndSeen",
      "segRowSaleContract": "segRowSaleContract",
      "flxStatus":"flxStatus",
      "flxIdName":"flxIdName"
    };
    var data = [
      {
        "imgUpload": "upload512h.png",
        "imgEyeOpen": "eyeicon512h.png",
        "lblIdName": {
          "text": voltmx.i18n.getLocalizedString("Sale contract"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "btnStatus": {
          "text": status,
          "skin": status === "Uploaded"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Uploaded
          : status === "Under Review"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review (same green)
          : status === "Verified"
          ? "sknbtnBGD32437FontffffffDubaiReg45px"          // red for Verified
          : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"  // gray for others or Not Uploaded

        },
        "flxEyeOpen": {
          "onClick": () => {
            if (saleContractDoc&& saleContractDoc!=={} ) {
              this.onEyeOpenClickForPassportSaleContract(saleContractDoc);
            } else {
              alert("Please upload to view.");
            }
          }
        },
        "flxUpload": {
          "onClick": () => {
            if (saleContractDoc&& saleContractDoc!=={} ) {
              this.deleteFileObjectIfExists(
                saleContractDoc.status || "",
                saleContractDoc.file_url || "",
                saleContractDoc.id || "",
                "contract"
              );
            } else {
              this.view.flxHowWouldYouLike.setVisibility(true);
              voltmx.store.setItem("UploadType", "contract");
            }
          },
          "isVisible": false
        },
        "flxUploadAndSeen": {
          "reverseLayoutDirection": isArabic
        },
        "flxNameAndStatus": {
          "reverseLayoutDirection": isArabic
        },
        "segRowSaleContract": {
          "reverseLayoutDirection": isArabic
        },
        "flxStatus":{
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxIdName":{
          "reverseLayoutDirection": isArabic
        }
      }
    ];
    this.view.segSaleContract.setData(data);
    this.view.forceLayout();
  },




  createDynamicTrdaeLicenses: function() {
    var docObj = this.docObj || {};
    var docInfo = docObj["trade_license"]|| {};
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    this.view.segTradeLicenses.widgetDataMap = {

      "lblIdName": "lblIdName",
      "btnStatus": "btnStatus",
      "imgUpload": "imgUpload",
      "imgEyeOpen": "imgEyeOpen",
      "flxUpload": "flxUpload",
      "flxEyeOpen": "flxEyeOpen",
      "flxUploadAndSeen": "flxUploadAndSeen",
      "segRowSaleContract": "segRowSaleContract",
      "flxStatus":"flxStatus",
      "flxIdName":"flxIdName"
    };
    var data = [
      {
        "imgUpload": "upload512h.png",
        "imgEyeOpen": "eyeicon512h.png",
        "lblIdName": {
          "text": voltmx.i18n.getLocalizedString("Trade Licenses"),
          "contentAlignment": isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT
        },
        "btnStatus": {
          "text": docInfo ? this.i18nStatus(docInfo.status) : this.i18nStatus("Not Uploaded"),
          "skin": docInfo && docInfo.status === "Uploaded"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"   // green for Uploaded
          : docInfo && docInfo.status === "Under Review"
          ? "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px"  // green for Under Review
          : docInfo && docInfo.status === "Verified"
          ? "sknbtnBGD32437FontffffffDubaiReg45px"          	// red for Verified
          : "sknbtnBG767676Fontffffff45pxRoundedBorder1px"   // gray for Not Uploaded or others
        },
        "flxEyeOpen": {
          "onClick": () => {
            if (docInfo&& docInfo!=={} ) {
              this.onEyeOpenClickForTradeLicenses(docInfo);
            } else {
              alert("Please upload to view.");
            }
          }
        },
        "flxUpload": {
          "onClick": () => {
            if (docInfo && docInfo!=={}) {
              this.deleteFileObjectIfExists(
                docInfo.status || "",
                docInfo.file_url || "",
                docInfo.id || "",
                "trade_license"
              );
            } else {
              this.view.flxHowWouldYouLike.setVisibility(true);
              voltmx.store.setItem("UploadType", "TradeLicenses");
            }
          }
        },
        "flxUploadAndSeen": {
          "reverseLayoutDirection": isArabic
        },
        "flxNameAndStatus": {
          "reverseLayoutDirection": isArabic
        },
        "segRowSaleContract": {
          "reverseLayoutDirection": isArabic
        },
        "flxStatus":{
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        },
        "flxIdName":{
          "reverseLayoutDirection": isArabic
        }
      }
    ];
    this.view.segTradeLicenses.setData(data);
    this.view.forceLayout();
  },




  deleteFileObjectIfExists: function(status, file_url, id, type){
    var self = this;
        voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    if(status=== "Verified"||status=== "Under Review" ){
      self.view.flxDocsError.setVisibility(false);
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_True() {
        var user_token = voltmx.store.getItem("getUserAccesstoken");
        var delete_object_item_inputparam = delete_object_item_inputparam || {};

        delete_object_item_inputparam["serviceID"]  = "fry_collection$delete-object-item";
        delete_object_item_inputparam["user_token"] = user_token;
        delete_object_item_inputparam["file_url"]   = file_url   ;
        delete_object_item_inputparam["moduleName"] = "DeleteFile";
        delete_object_item_inputparam["file_id"]    = id  ;
        delete_object_item_inputparam["file_cat"]   ="document" ;
        var delete_object_item_httpheaders = {
        };
        delete_object_item_inputparam["httpheaders"] = delete_object_item_httpheaders;
        var delete_object_item_httpconfigs = {};
        delete_object_item_inputparam["httpconfig"] = delete_object_item_httpconfigs;
        fry_collection$delete_object_item = 
          mfintegrationsecureinvokerasync(delete_object_item_inputparam, 
                                          "fry_collection", 
                                          "delete-object-item",
                                          function(status, response){
          voltmx.print(status);
          voltmx.print(response);
          if (!response || Object.keys(response).length === 0) {
            voltmx.print("Empty response received!");
            alert("No response received from delete service.");
            return;
          }
          if (response.opstatus === 0 && response.status === "Success") {
                        voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
            var deletefile = voltmx.i18n.getLocalizedString("File deleted successfully");
            alert(deletefile);
            self.getUploadedData(); 
              if (self.docObj && self.docObj["vat certificate"]) {
                  delete self.docObj["vat certificate"];
            }
          } 
          else if(response.opstatus === 1011){
            self.view.flxError.setVisibility(true);
          }
          else {
            alert("Failed to delete file.");
          }
        });
      }
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_False() {
//              self.view.flxLoadingIndicator.setVisibility(false);
        voltmx.application.dismissLoadingScreen();
      }
      function SHOW_ALERT_f1a8129889d74e268f752870d70cb393_Callback(response) {
        if (response === true) {
          SHOW_ALERT_f1a8129889d74e268f752870d70cb393_True();
        } else {
          SHOW_ALERT_f1a8129889d74e268f752870d70cb393_False();
        }
      }
      
      var alertmsg = voltmx.i18n.getLocalizedString("There is a file which is already uploaded, do you want to replace it?");
      var replace = voltmx.i18n.getLocalizedString("Replace?");
      var cancel = voltmx.i18n.getLocalizedString("cancel");
      voltmx.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
       // "alertTitle": "Replace items?",
        "yesLabel": replace,
        "noLabel": cancel,
        "alertIcon": "exchange.png",
        "message": alertmsg,
        "alertHandler": SHOW_ALERT_f1a8129889d74e268f752870d70cb393_Callback
      }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });
    }
    else{
            voltmx.application.dismissLoadingScreen();
//         self.view.flxLoadingIndicator.setVisibility(false);
//       self.view.flxLoadingIndicator.setVisibility(false);
      self.view.flxDocsError.setVisibility(false);
      self.view.flxHowWouldYouLike.setVisibility(true);
      if(type === "passport"){
        voltmx.store.setItem("subType", "passport");
      }
      else if (type === "uae pass"){
        voltmx.store.setItem("subType", "UAE Pass");
      }
      else if (type === "driving license"){
        voltmx.store.setItem("subType", "Driving License");
      }
      else if ( type === "emirates id "){
        voltmx.store.setItem("subType", "Emirates Id");
      }
      else if (type === "vat certificates"){
        voltmx.store.setItem("subType", "VAT Certificate");
      }
      else if (type === "contract"){
        voltmx.store.setItem("subType", "contract");
      }
      else if ( type === "trade_license"){
        voltmx.store.setItem("subType", "trade_license"); 
      }
    }
  },

  
  


  flxUploadContainerOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(true);
  },

  


  flxUploadPopupCloseOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(false);
  },

  
  

  onEyeOpenClickForPassportGovtId: function(docInfo) {
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF";
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "passportPDF" || docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for Passport");
      }
    });
  },




  onEyeOpenClickForUAEPass: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF"; 
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "uaePassPDF" || docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for UAE Pass");
      }
    });
  },




  onEyeOpenClickForDrivingLicense: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF";
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "drivingLicensePDF" || docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for Driving License");
      }
    });
  },     




  onEyeOpenClickForTradeLicenses: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF"; 
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "TradeLicensesPDF" || docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);  
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for Trade Licenses");
      }
    });
  },




  onEyeOpenClickForEmiratesId: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF"; 
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "emiratesIdPDF"|| docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);  
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for Emirates Id");
      }
    });
  },



  onEyeOpenClickForPassportVATCert: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF"; 
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "VatCertPDF"|| docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for VAT Certificates");
      }
    });
  },




  onEyeOpenClickForPassportSaleContract: function(docInfo){
    var self = this;
    self.checkSession(function() {
      voltmx.print("Session is valid. Proceeding with data load.");   
      if (docInfo && docInfo.file_url && docInfo.file_name) {
        self.view.flxSegmentGovtIds.setVisibility(false);
        self.view.segVATCertificates.setVisibility(false);
        self.view.segSaleContract.setVisibility(false);
        self.view.segTradeLicenses.setVisibility(false);
        self.view.flxShowUploadedImg.setVisibility(true);
        var uploadOption = "PDF"; 
        var UploadOptionAndType = voltmx.store.getItem("UploadOptionAndType");
        if(UploadOptionAndType === "SaleContractPDF"|| docInfo.file_name.toLowerCase().includes(".pdf")){
          self.view.flxUploaded.setVisibility(true);
          self.view.lblUploadedFileName.text = docInfo.file_name;
          self.view.imgUploaded.setVisibility(false);
        } else {
          self.view.flxUploaded.setVisibility(false);
          self.view.imgUploaded.setVisibility(true);
          self.view.imgUploaded.src = docInfo.file_url;
        }
      } else {
        alert("No file uploaded for Sale Contract");
      }
    });
  },




  flxChooseFromLibraryOnClickAction: function(){
    var uploadOption = voltmx.store.setItem("uploadOption", "Image");
    voltmx.phone.openMediaGallery(function(rawbytes) {
      if (rawbytes) {
        voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
        var testfilename = rawbytes.getResourcePath();
        var path = rawbytes.getResourcePath && rawbytes.getResourcePath();
        var filename = "selectedFile_" + new Date().getTime();
        if (path && typeof path === "string") {
          filename = path.substring(path.lastIndexOf("/") + 1);
        }
        voltmx.print("Filename: " + filename);
        var base64Data = voltmx.convertToBase64(rawbytes);
        const sizeInBytes = this.estimateBase64Size(base64Data);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        voltmx.print("Image size: " + sizeInMB + " MB");

        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("Image too large. Please upload an image smaller than 10 MB.");
          this.resetUploadUIForImages();
          return;
        }

        var filetype =  detectFileType(base64Data);
        var filefullname = filename+filetype;
        this.filename =filefullname
        this.base64MyDocsUpload = base64Data;
        voltmx.print("Base64 : "+base64Data);
        this.view.flxHowWouldYouLike.setVisibility(false);
        this.uploadLogic();
      }  }.bind(this), {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*" 
    });
  },


  
  camOnCaptureAction: function () {
  voltmx.store.setItem("uploadOption", "Cam");
  var rawBytes = this.view.cam.rawBytes;

  if (rawBytes) {
    var base64Image = voltmx.convertToBase64(rawBytes);
    var sizeInBytes = this.estimateBase64Size(base64Image);
    var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    voltmx.print("Captured Image Size: " + sizeInMB + " MB");
    if (sizeInBytes > 10 * 1024 * 1024) {
      voltmx.print("Image too large, compressing...");
      try {
        var imageObj = voltmx.image.createImage(base64Image);
        var scaledImage = imageObj.scaleToFit(1024, 1024);
        base64Image = scaledImage.toBase64();
        sizeInBytes = this.estimateBase64Size(base64Image);
        sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

        voltmx.print("Compressed Image Size: " + sizeInMB + " MB");
      } catch (err) {
        alert("Image too large and compression failed. Please capture a smaller image.");
        this.resetUploadUIForImages();
        return;
      }
    }
    var filetype = this.detectFileType(base64Image);
    var timestamp = new Date().getTime();
    var filename = "captured_" + timestamp + filetype;

    this.filenameCam = filename;
    this.base64CamImage = base64Image;

    voltmx.print("File Ready for Upload: " + filename);
    this.view.flxHowWouldYouLike.setVisibility(false);
    this.uploadLogic();
  } else {
    voltmx.print("No image captured from camera.");
  }
},




  detectFileType: function (base64Data) {
    if (base64Data.startsWith("/9j/")) return ".jpg";
    if (base64Data.startsWith("iVBORw0KGgo")) return ".png";
    return ".jpg"; 
  },



  estimateBase64Size: function (base64String) {
    if (!base64String) return 0;
    var padding = (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
    return (base64String.length * 3 / 4) - padding;
  },




  pdfCheck: function() {
    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");
    try {
      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
      var TestPdfNfi = java.import("com.example.pdfuploadnfitest.TestPdfNfi");
      TestPdfNfi.pdfCallback = this.pdfCallback.bind(this);
      var activityContext = VoltMXMain.getActivityContext();
      var Intent  = java.import("android.content.Intent");
      var intentObj =  new Intent(activityContext, TestPdfNfi.class);
      activityContext.startActivity(intentObj);
    } catch (e) {
      alert("Error: " + e.message);
    }
  },



  pdfCallback: function ( data) {
    voltmx.print( "selcted pdf callback data:::" + data) ;
    this.pdfData = null;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        this.pdfData = JSON.parse(dataJsonStr);
        this.selectedPdfFileName = this.pdfData.fileName;
        this.selectedPdfBase64=  this.pdfData.base64pdf;
        const sizeInBytes = this.estimateBase64Size(this. selectedPdfBase64);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("File too large. Please upload a file smaller than 10 MB.");
          this.resetUploadUI();
          return;
        }
        voltmx.print("file Uploaded!");
        var UploadType = voltmx.store.getItem("UploadType");
        var uploadOption = voltmx.store.getItem("uploadOption");
        if(uploadOption === "PDF"){
          if(UploadType === "passport"){
            voltmx.store.setItem("UploadOptionAndType", "passportPDF");
          }
          else if(UploadType === "uaePass"){
            voltmx.store.setItem("UploadOptionAndType", "uaePassPDF");
          }
          else if(UploadType === "drivingLicense"){
            voltmx.store.setItem("UploadOptionAndType", "drivingLicensePDF");
          }
          else if(UploadType === "VatCert"){
            voltmx.store.setItem("UploadOptionAndType", "VatCertPDF");
          }
          else if(UploadType === "emiratesId"){
            voltmx.store.setItem("UploadOptionAndType", "emiratesIdPDF");
          }
          else if(UploadType === "contract"){
            voltmx.store.setItem("UploadOptionAndType", "SaleContractPDF");
          }
          else if(UploadType === "TradeLicenses"){
            voltmx.store.setItem("UploadOptionAndType", "TradeLicensesPDF");
          }
        }
        this.view.flxHowWouldYouLike.setVisibility(false);
        this.uploadLogic();
      } catch (error) {
        console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },
  
  
  
  
  testPDFNFI: function()
  {
    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");
    var self=this;
    voltmx.runOnMainThread(mainthread, []);
    function  mainthread() {   
      var PDFNFIUploadIOS = objc.import("PDFNFIUploadIOS");
      var ViewController = objc.import("ViewController");
      if (!ViewController) {
        voltmx.print("Error: Failed to import PDFNFIUploadIOS");
      }
      else{
        var ViewObject = ViewController.alloc().jsinit();
        ViewObject.pickPdfTapped();
        ViewObject.pdfCallback(function(pdfArrayObj){
          voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]); 

          var fileName = pdfArrayObj[0];
          var base64Data = pdfArrayObj[1];

          self.selectedPdfFileName = fileName;
          self.selectedPdfBase64 = base64Data;

          voltmx.runOnMainThread(function () {
            self.view.flxHowWouldYouLike.setVisibility(false);
            self.uploadLogic();
          }, []);
        });
      }
    }
  },
  
  
  
  
  estimateBase64Size: function (base64Str) {
    let padding = (base64Str.match(/=*$/) || [""])[0].length;
    return Math.floor((base64Str.length * 3) / 4) - padding;
  },
  
  
  
  resetUploadUI: function () {
    this.view.flxUploadedFrontview.setVisibility(false);
    this.view.imgDone.setVisibility(false);
    this.view.btnSubmit.setEnabled(false);
    this.view.flxDocsError.setVisibility(true);
    this.view.flxHowWouldYouLike.setVisibility(false);
  },
  
  
  
  
  resetUploadUIForImages: function () {
    this.view.flxDocsError.setVisibility(false);
    this.view.imgFrontView.setVisibility(false);
    this.view.flxUploadedFrontview.setVisibility(false);
    this.view.flxUploaded.setVisibility(false);
    this.view.flxUploadPhotoClickArea.setVisibility(true);
    this.view.lblUploadedFileName.text = "";
    this.view.btnSubmit.setEnabled(false);
  },
  
  
  
  
  startProgressSimulation: function() {
    var self = this;
    var progressValue = 0;
    voltmx.timer.schedule(
      "progressBarTimer",
      function() {
        if (progressValue < 90) {
          progressValue += 10;
          self.view.flxInnerBar.width = progressValue + "%";
        } else {
          voltmx.timer.cancel("progressBarTimer");
        }
      }.bind(this), 
      5,
      true
    );
  },
  
  
  
  
  uploadToBackend: function(success, failure) {
    setTimeout(function() {
      success();
    }, 8000);
  },
  
  
  
  
  uploadLogic: function(){
    var self = this;
    checkTokenValidatity(function() {
      self.view.flxUploadingProgressBar.setVisibility(true);
      self.view.flxInnerBar.width = "0%";
      self.startProgressSimulation();

      var uploadOption = voltmx.store.getItem("uploadOption");
      var subType = voltmx.store.getItem("subType");
      var type = voltmx.store.getItem("Doctype");
      var moduleName = "UploadUserDocuments";
      var moduleType = "Customers";
      var user_code = voltmx.store.getItem("user_code");
      var user_token = voltmx.store.getItem("getUserAccesstoken");
      var user_id = voltmx.store.getItem("userId");
      var userObj = voltmx.store.getItem("userObject");
      voltmx.print("UserObj:"+JSON.stringify(userObj));
      voltmx.print("is_org :"+userObj.rawResponse.is_org);
      var is_org =userObj.rawResponse.is_org;
      if(is_org === false){
        is_org = 0;
      }
      else{
        is_org = 1;
      }
      var category ="My_Documents";
      if(uploadOption === "PDF"){
        if (!self.selectedPdfFileName || !self.selectedPdfBase64) {
          voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
          alert("No PDF selected or data missing. Please upload a PDF first.");
          return;
        }
        var fileDetails = [
          {
            "is_thumbnail": "false",
            "filename": self.selectedPdfFileName,
            "base64": self.selectedPdfBase64.replaceAll('+', '/plus/'),
            "sub_type"    : subType,
            "type"        : type, 
          }
        ];
      }
      else if(uploadOption === "Image"){

        //       var self = this;
                voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      //  this.view.flxLoadingIndicator.setVisibility(true);
        if (!self.filename || !self.base64MyDocsUpload) {
          voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
          alert("No Image selected or data missing. Please upload a Image first.");
          return;
        }
        var fileDetails = 
            [
              {"is_thumbnail": "false",  
               "filename"    : self.filename, 
               "base64"      : self.base64MyDocsUpload.replaceAll('+','/plus/'),
               "sub_type"    : subType,
               "type"        : type, 
              },
            ];
      }
      else{
        //       var self = this;
                voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      //  this.view.flxLoadingIndicator.setVisibility(true);
        if ( !self.filenameCam|| !self.base64CamImage) {
          voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
          alert("No captured Image selected or data missing. Please upload a Captured Image Again!.");
          return;
        }
        var fileDetails = [
          {
            "is_thumbnail": "false",
            "filename":self.filenameCam,
            "base64": self.base64CamImage.replaceAll('+', '/plus/'),
            "sub_type"    : subType,
            "type"        : type, 
          }
        ];
      }
      var create_dam_items_inputparam = {
        serviceID: "fry_collection$upload-user-documents",
        httpheaders: {},
        httpconfig: {},
        collectionId: "",
        moduleType: moduleType,
        user_id: user_id,
        moduleName: moduleName,
        file_details: fileDetails,
        user_token: user_token,
        is_org: is_org,
        category: category,
        user_code : user_code
      };

      mfintegrationsecureinvokerasync(
        create_dam_items_inputparam,
        "fry_collection",
        "upload-user-documents",
        function(status, response) {
          if(!response){
            voltmx.print("No Response");
            return;
          }
          if (response.opstatus === 0 ){
            if(!response.response){
              voltmx.print("No Response2");
              return;
            }
            var rawResponse = response.response;
            var parsedArray = [];
            try {
              parsedArray = JSON.parse(rawResponse); 
                            voltmx.application.dismissLoadingScreen();
//               self.view.flxLoadingIndicator.setVisibility(false);
              voltmx.print("Uploaded Successfully");
              //               alert("Response for upload : " + JSON.stringify(response));

              if(response.message === "Success" && Array.isArray(parsedArray) && parsedArray.length > 0) {
                self.view.flxDocsError.setVisibility(false);
                voltmx.timer.cancel("progressBarTimer");
                self.view.flxInnerBar.width = "100%"; 
                self.getUploadedData(); 
                voltmx.timer.schedule("hideProgressBarTimer", function() {
                  self.view.flxUploadingProgressBar.setVisibility(false);
                }, 1, false);
                voltmx.print("Response for upload : " + JSON.stringify(response));

                self.view.flxHowWouldYouLike.setVisibility(false);
                voltmx.store.setItem("isUploadedDocs",true);
              }
              else {
                                voltmx.application.dismissLoadingScreen();
//                 self.view.flxLoadingIndicator.setVisibility(false);
                voltmx.timer.cancel("progressBarTimer");
                self.view.flxUploadingProgressBar.setVisibility(false);
                self.view.flxDocsError.setVisibility(true);
                if (Array.isArray(parsedArray) &&  parsedArray[0].error_code === "409") {
                  self.view.lblDocsError.text = "file already exists!!";
                }
                else{
                  self.view.lblDocsError.text = "Upload failed. Please try again."; 
                }
              }
              if (Array.isArray(parsedArray) && parsedArray.length !== 0) {
                voltmx.print("Response is an empty array.");
              }
              else {
                self.view.SmthngWentWrong.setVisibility(true);
                voltmx.timer.cancel("progressBarTimer");
                self.view.flxUploadingProgressBar.setVisibility(false);
              }
              voltmx.print("Parsed data: " + JSON.stringify(parsedArray));
            }
            catch (e) {
              voltmx.timer.cancel("progressBarTimer");
              self.view.flxUploadingProgressBar.setVisibility(false);
              voltmx.print("Failed to parse response.response: " + e);
              return; 
            }
          } else {
                        voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
            if(response.opstatus === 1011){
              self.view.flxError.setVisibility(true);
            }
                        voltmx.application.dismissLoadingScreen();
//             self.view.flxLoadingIndicator.setVisibility(false);
            voltmx.timer.cancel("progressBarTimer");
            self.view.flxUploadingProgressBar.setVisibility(false);
            handleServiceError(response,"upload-user-documents", function(errorMsg){
              self.view.flxDocsError.setVisibility(true);
              self.view.lblDocsError.text = errorMsg;
            });
          }
        }
      );
    });
  },

  
  

});