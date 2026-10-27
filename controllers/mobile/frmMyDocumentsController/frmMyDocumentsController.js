define({ 

  //Type your controller code here 
  onNavigate: function(){
    this.view.preShow = this.onPreShow.bind(this);
    this.view.segDocs.onRowClick = this.segDocsOnRowClickAction.bind(this);
    this.view.flxBack.onClick    = this.flxBackOnClickAction;
    this.view.flxUploadContainerTest.onClick = this.flxUploadContainerOnClickAction;
    this.view.flxUploadContainer.onClick = this.flxUploadContainerOnClickAction ;
    this.view.flxUploadPopupClose.onClick = this.flxUploadPopupCloseOnClickAction;
    this.view.flxUploadPopupCloseText.onClick = this.flxUploadPopupCloseOnClickAction;
    //#ifdef android   
    this.view.flxChooseFromFile.onClick = this.pdfCheck;
    this.view.flxChooseFromFileTest.onClick = this.pdfCheck;
    //#endif
    //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFI;
    this.view.flxChooseFromFileTest.onClick = this.testPDFNFI;
    //#endif
    this.view.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction;
    this.view.flxChooseFromLibraryTest.onClick = this.flxChooseFromLibraryOnClickAction;
    this.view.camTest.onCapture= this.camOnCaptureAction;
    //this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction;
    this.view.btnBack.onClick = this.btnBackOnClickAction;
    this.view.btnBackTest.onClick = this.btnBackOnClickAction;
    this.view.btnSubmit.onClick = this.btnSubmitOnClickAction;
    this.view.flxPlus.onClick = this.flxPlusOnClickAction;
    this.view.flxDropDown.onClick = this.flxDropDownOnClickAction;
    this.view.segTypes.onRowClick = this.segTypesOnRowClickAction;
    this.view.flxUploadPopup.onClick = this.flxUploadPopupOnClick;
    this.view.SmthngWentWrong.flxClose.onClick = this.btnCloseOnClick;
    this.view.SmthngWentWrong.btnClose.onClick = this.btnCloseOnClick;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
  },




  flxUploadContainerOnClickAction: function(){
    voltmx.store.setItem("isBack", false);
    this.view.flxUploadPopup.setVisibility(false);
    this.view.UploadInnerTest.setVisibility(true);
    this.view.flxHowWouldYouLikeTest.setVisibility(true);
  },




  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if(isArabic)
      {

         var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgLeftArrow.transform = flipTransform;
            this.view.CopylblHowWouldYou0ib26e33fe91744.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      }
    else
      {
        this.view.imgLeftArrow.transform = voltmx.ui.makeAffineTransform();
        this.view.CopylblHowWouldYou0ib26e33fe91744.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

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
      "lblAddDocument",
      "lblUploadText",
      "lblUploadPhotos",
      "lblHowWouldYou",
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
      "flxUploadInnerHeading",
      "flxDocType",
      "flxSelectInner",
      "flxUploadPhotosOfYourDocument",
      "flxSecurelyUpload",
      "flxExpiryDateContainer",
      "flxExpiryDateContainer",
      "flxToggles",
      ""
    ];

    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    
        this.view.CopylblHowWouldYou0ib26e33fe91744.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
     this.view.lblChooseFromFileTest.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE"); 
     this.view.lblChooseFromLibraryTest.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
     this.view.camTest.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
     this.view.btnSubmitForUploadTest.text = voltmx.i18n.getLocalizedString("Submit");

     this.view.CopyflxToggles0d0d20eabcf6048.reverseLayoutDirection = isArabic;



    
  this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblDocuments.text = voltmx.i18n.getLocalizedString("My Documents");
    this.view.lblAddDocument.text = voltmx.i18n.getLocalizedString("Add Document");
    this.view.lblDocumentType.text = voltmx.i18n.getLocalizedString("Document Type");
    this.view.lblSelect.text = voltmx.i18n.getLocalizedString("Select");
    this.view.lblUploadPhotos.text = voltmx.i18n.getLocalizedString("Upload photos of your document");
    this.view.lblUploadText.text = voltmx.i18n.getLocalizedString("securely upload your document to ensure a smooth and secure experience");
    this.view.lblUploadDocument.text = voltmx.i18n.getLocalizedString("Upload Document");                               
    this.view.lblJPEGOrPNG.text = voltmx.i18n.getLocalizedString("JPEG or PNG only, and Maximum File size is 10MB");
    this.view.lblExpiryDate.text = voltmx.i18n.getLocalizedString("Select Expiry Date");
    this.view.btnBack.text = voltmx.i18n.getLocalizedString("Back");
    this.view.btnSubmit.text = voltmx.i18n.getLocalizedString("Submit");
    this.view.lblHowWouldYou.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
    this.view.lblChooseFromFile.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE");
    this.view.lblChooseFromLibrary.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
    this.view.cam.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
    this.view.btnSubmitForUpload.text = voltmx.i18n.getLocalizedString("Submit");
  },




  getUploadedData: function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    //     this.view.flxLoadingIndicator.setVisibility(true);
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var user_id = voltmx.store.getItem("userId");
    var type = voltmx.store.getItem("Doctype"); // "Government_IDs", etc.
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
      voltmx.print("Response: " + JSON.stringify(response));
      voltmx.application.dismissLoadingScreen();
      //       self.view.flxLoadingIndicator.setVisibility(false);
      if(response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }

      if (!response.records || !Array.isArray(response.records) || response.records.length === 0) {

        voltmx.print("No documents found or empty response.");
        voltmx.store.setItem("isDatafound", false);
        return;
      }
      else{
        voltmx.store.setItem("isUploadedGovtIds", false);
        voltmx.store.setItem("isUploadedGovtIdsEmirates", false);
        voltmx.store.setItem("isUploadedGovtIdsPassPort", false);
        voltmx.store.setItem("isUploadedGovtIdsUAEPass", false);
        voltmx.store.setItem("isUploadedGovtIdsDrivingLicense", false);
        voltmx.store.setItem("isUploadedTradeLicenses", false);
        voltmx.store.setItem("isUploadedSaleContract", false);
        voltmx.store.setItem("isUploadedVatCert", false);
        var data = response.records;
        data.forEach(res=>{
          var subType  =  res.sub_type ? res.sub_type.trim().toLowerCase() : "";  // lowercase key
          var file_url = res.file_url;
          var status   = res.status;
          var file_name = res.file_name;
          var type = res.type;
          if(type === "trade_license" ){
            if(file_url&&file_name){
              voltmx.store.setItem("isUploadedTradeLicenses", true);
            }
            if(subType === "trade licenses"){
              voltmx.store.setItem("isUploadedTradeLicensesSubType", true);
            }
          }
          else if(type === "contract"){
            if(file_url&&file_name){
              voltmx.store.setItem("isUploadedSaleContract", true);
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
              voltmx.store.setItem("isUploadedGovtIds", true);
            }
            if(subType === "emirates id"){
              voltmx.store.setItem("isUploadedGovtIdsEmirates", true);
            }
            else if(subType === "passport"){
              voltmx.store.setItem("isUploadedGovtIdsPassPort", true);
            }
            else if(subType === "uae pass"){
              voltmx.store.setItem("isUploadedGovtIdsUAEPass", true);
            }
            else if(subType === "driving license"){
              voltmx.store.setItem("isUploadedGovtIdsDrivingLicense", true);
            }
          }
        });
      }
    });
  },




  onPreShow: function(){
    this.view.flxDocsError.setVisibility(false);
    this.getUploadedData();  
    this.toggleFooterIcons();
    this.sellerOrBuyer();
    this.getUserNamePassword();
    this.Addingi18nKeys();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // Month is 0-based in JS, so add 1
    var year = today.getFullYear();

    this.view.cal.date = [day, month, year];
    // Start from tomorrow (future dates only)
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    // allowing up to +10 years from today 
    var maxFuture = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());

    this.view.cal.validStartDate = [
      tomorrow.getDate(),
      tomorrow.getMonth() + 1,
      tomorrow.getFullYear()
    ];

    this.view.cal.validEndDate = [
      maxFuture.getDate(),
      maxFuture.getMonth() + 1,
      maxFuture.getFullYear()
    ];
  },




  btnCloseOnClick: function(){
    this.view.SmthngWentWrong.setVisibility(false);
  },




  getUserNamePassword: function(){
    var self = this;
    var base64 = voltmx.store.getItem("BASE_URL");
    var app_key = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var app_secret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var userToken = voltmx.store.getItem("getUserAccesstoken");
    var config_decrypt_inputparam = {};
    config_decrypt_inputparam["serviceID"] = "ms_config$config-decrypt";
    config_decrypt_inputparam["config_key"] = "dam_login";
    config_decrypt_inputparam["app_key"] = app_key;
    config_decrypt_inputparam["app_secret"] =app_secret ;
    var config_decrypt_httpheaders = {
      "user_token": userToken
    };
    config_decrypt_inputparam["httpheaders"] = config_decrypt_httpheaders;
    var config_decrypt_httpconfigs = {};
    config_decrypt_inputparam["httpconfig"] = config_decrypt_httpconfigs;
    ms_config$config_decrypt =
      mfintegrationsecureinvokerasync(config_decrypt_inputparam, 
                                      "ms_config", 
                                      "config-decrypt",
                                      function(status,response){
      voltmx.print(status);
      voltmx.print(response);
      if(response.opstatus === 1011){
        self.view.flxError.setVisibility(true);
      }
    });
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
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




  clearAllFields: function() {
    var uploadOption = voltmx.store.getItem("uploadOption");
    this.view.flxUploadPopup.setVisibility(false);
    this.view.btnSubmit.setEnabled(false);
    this.view.flxDocsError.setVisibility(false);
    this.view.btnSubmit.skin = "sknbtnBGccccccRoundedBordercccccc1pxFontDubaiReg767676Size40px";
    this.view.flxUploadPhotoClickArea.setVisibility(true);
    this.view.flxUploadedFrontview.setVisibility(false);
    this.view.flxUploadedBackView.setVisibility(false);
    this.view.lblDocsError.text  = "";

    if (uploadOption === "PDF") {
      if (this.view.lblUploadedFileName) {
        this.view.lblUploadedFileName.text = "";
      }
      if (this.view.imgDone) {
        this.view.imgDone.setVisibility(false);
      }
    }
    else if (uploadOption === "Image" || uploadOption === "Camera") {
      if (this.view.imgFrontView) {
        if ("base64" in this.view.imgFrontView) {
          this.view.imgFrontView.base64 = "";
        } else {
          this.view.imgFrontView.src = ""; 
        }
      }
      if (this.view.imgBackView) {
        if ("base64" in this.view.imgBackView) {
          this.view.imgBackView.base64 = "";
        } else {
          this.view.imgBackView.src = "";
        }
      }
    }
  },




  sellerOrBuyer: function () {
    this.view.segDocs.widgetDataMap = {
      "lblRowDocs": "lblRowDocs",
      "imgDocs": "imgDocs",
      "docKey": "docKey"
    };
    this.view.segTypes.widgetDataMap = {
      "lblType": "lblType"
    };
    function i18n(key) {
      return voltmx.i18n.getLocalizedString(key);
    }
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    function makeRow(labelKey ,key) {
      return {
        lblRowDocs: {
          text: i18n(labelKey),
          contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
          left: isArabic ? "0%" : "4%",
          right: isArabic ? "4%" : "0%"
        },
        docKey: key,
        imgDocs: "material_symbols_light_folder_outline.png"
      };
    }
    function makeType(labelKey,key) {
      return {
        lblType: {
          text: i18n(labelKey),
          contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT,
          left: isArabic ? "0%" : "4%",
          right: isArabic ? "4%" : "0%"
        },
        typeKey: {
          text: key
        }
      };
    }
    var defaultSegData = [
      makeRow("Government IDs", "Government IDs"),
      makeRow("Trade Licenses", "Trade Licenses"),
      makeRow("VAT Certificates", "VAT Certificates"),
      makeRow("Payment Invoice", ""),
      makeRow("Possession Leters", "Possession Leters"),
      makeRow("Inspection Reports", "Inspection Reports"),
      makeRow("Sale contract", "Sale contract"),
    ];
    var defaultSegDataTypes = [
      makeType("Passport","Passport"),
      makeType("Emirates ID","Emirates ID"),
      makeType("Driving License","Driving License"),
     // makeType("UAE Pass","UAE Pass"),
      makeType("Trade Licenses","Trade Licenses"),
      makeType("VAT Certificates","VAT Certificates"),
//       makeType("Sale contract","Seller contract")
      
    ];
    var mode = voltmx.store.getItem("mode");
    if (mode === "seller") {
//       defaultSegData.push(makeRow("Sale contract", "Sale contract"));
//       defaultSegDataTypes.push(makeType("Sale contract"));
    } else if (mode === "buyer") {
      defaultSegData.push(makeRow("Sale Letters", "Sale Letters"));
      defaultSegDataTypes.push(makeType("Sale Letters","Sale Letters"));
    }
    this.view.segDocs.setData(defaultSegData);
    this.view.segTypes.setData(defaultSegDataTypes);
  },




  segDocsOnRowClickAction: function() {
    var self = this;
    var selectedSegDocs = self.view.segDocs.selectedRowItems;
    if (!selectedSegDocs || selectedSegDocs.length === 0) return; 
    var selectedValue = selectedSegDocs[0].docKey;
    voltmx.store.setItem("selectedGovtId", selectedValue);
    var x; 
    switch (selectedValue) {
      case "Government IDs":
        voltmx.store.setItem( "Doctype",  "Government_IDs");
        voltmx.store.setItem("HeadingForDocs", "Government IDs");
        x = new voltmx.mvc.Navigation("frmGovtIds");
        break;
      case "VAT Certificates":
        voltmx.store.setItem( "Doctype",  "VAT_Certificates");
        x = new voltmx.mvc.Navigation("frmGovtIds");
        voltmx.store.setItem("HeadingForDocs", "VAT Certificates");
        break;
      case "Sale contract": 
        voltmx.store.setItem( "Doctype","contract");
        x = new voltmx.mvc.Navigation("frmGovtIds");
        voltmx.store.setItem("HeadingForDocs","Sale Contract");
        break;
      case "Sale Letters":
        x = new voltmx.mvc.Navigation("frmSaleLetters");
        break;
      case "Possession Leters":
        x = new voltmx.mvc.Navigation("frmPossessionLetter");
        break;
      case "Inspection Reports":
        x = new voltmx.mvc.Navigation("frmInspectionReport");
        break;
      case "Trade Licenses": 
        voltmx.store.setItem( "Doctype","trade_license");
        x = new voltmx.mvc.Navigation("frmGovtIds");
        voltmx.store.setItem("HeadingForDocs","Trade Licenses");
        break;
      case "Payment Receipt":
        break;
    }
    if (x) {
      x.navigate();
    }
  },



  flxBackOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyAccount");
    ntf.navigate();
  },




  flxChooseFromLibraryOnClickAction: function () {
    voltmx.store.setItem("uploadOption", "Image");
    var self = this;
    voltmx.phone.openMediaGallery(function (rawbytes) {
      if (rawbytes) {
        voltmx.print("RawBytes JSON: " + JSON.stringify(rawbytes));

        var base64Data = voltmx.convertToBase64(rawbytes);
        const sizeInBytes = self.estimateBase64Size(base64Data);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        voltmx.print("Image size: " + sizeInMB + " MB");

        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("Image too large. Please upload an image smaller than 10 MB.");
          this.resetUploadUIForImages();
          return;
        }
        var filetype = detectFileType(base64Data);

        var filename = "";
        try {
          var resourcePath = rawbytes.getResourcePath && rawbytes.getResourcePath();
          if (resourcePath) {
            filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
          } else {
            filename = "image_from_gallery_" + new Date().getTime();
          }
        } catch (e) {
          voltmx.print("Error getting resource path: " + e.message);
          filename = "image_from_gallery_" + new Date().getTime();
        }
        var filefullname = filename + filetype;
        self.filename = filefullname;
        self.base64MyDocsUpload = base64Data;
        voltmx.print("Base64 Data: " + base64Data);
        self.view.flxUploadedFrontview.setVisibility(true);
        self.view.lblUploadedFileName.text =   filename;
        self.view.imgFrontView.base64 = base64Data;
        self.view.flxHowWouldYouLike.setVisibility(false);
        self.view.imgFrontView.setVisibility(true);
        self.view.flxUploadPopup.setVisibility(true);
        self.view.UploadInnerTest.setVisibility(false);
        self.view.flxHowWouldYouLikeTest.setVisibility(false);
        self.view.flxDocsError.setVisibility(false);
        self.view.flxUploaded.setVisibility(false);
        self.view.flxUploadPhotoClickArea.setVisibility(false);
        self.view.btnSubmit.setEnabled(true);
        self.view.btnSubmit.skin = "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
      }
    }.bind(this), {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*"
    });
  },




  camOnCaptureAction: function () {
    voltmx.store.setItem("uploadOption", "Cam");
    var rawBytes = this.view.camTest.rawBytes;
    if (rawBytes) {
      var base64Image = voltmx.convertToBase64(rawBytes);
      var sizeInBytes = this.estimateBase64Size(base64Image);
      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 10 * 1024 * 1024) {
        alert(" Image too large. Please capture an image smaller than 10 MB.");
        this.resetUploadUIForImages();
        return;
      }

      var filename = "captured_image"+Date.now();
      var filetype = detectFileType(base64Image);
      var filefullname = filename + filetype;
      this.filenameCam = filefullname;
      this.base64CamImage = base64Image;
      this.selectedPdfFileName = filefullname;
      this.selectedPdfBase64 = base64Image;
      this.view.lblUploadedFileName.text = filefullname;
      this.view.flxBottomFileUpload.setVisibility(false);
      this.view.flxTest.setVisibility(false);
      this.view.btnSubmitForUpload.skin = "sknBtn61b35c20pxbold";
      this.view.imgFrontView.base64 = base64Image;
      this.view.flxUploadedFrontview.setVisibility(true);
      this.view.flxHowWouldYouLike.setVisibility(false);
      this.view.imgFrontView.setVisibility(true);
      this.view.flxUploadPopup.setVisibility(true);
      this.view.flxUploaded.setVisibility(false);
      this.view.flxDocsError.setVisibility(false);
      this.view.UploadInnerTest.setVisibility(false);
      this.view.flxHowWouldYouLikeTest.setVisibility(false);
      this.view.flxUploadPhotoClickArea.setVisibility(false);
//       this.view.btnUploadBackView.setVisibility(true);
      this.view.btnSubmit.setEnabled(true);
      this.view.btnSubmit.skin = "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
    } else {
      voltmx.print("No image captured from camera.");
      alert("Image capture failed. Please check camera permissions.");
    }
  },




  flxUploadPopupCloseOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(false);
    this.view.UploadInnerTest.setVisibility(false);
    this.view.flxHowWouldYouLikeTest.setVisibility(false);
    this.view.flxUploadPopup.setVisibility(true);
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
    var self = this;
    var isBackCopy = voltmx.store.getItem("isBack");
    voltmx.print( "selcted pdf callback data:::" + data) ;
    var type = voltmx.store.getItem("type");
    self.pdfData = null;

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        self.pdfData = JSON.parse(dataJsonStr);
        var isGovtId = voltmx.store.getItem("isGovtId");
        // =========================Front view Logic ================================================================
        self.view.flxUploadedFrontview.setVisibility(true);
        self.view.lblUploadedFileName.text =  self.pdfData.fileName;
        self.SelectedfileName= self.pdfData.fileName;
        self. selectedbase64 =  self.pdfData.base64pdf;
        const sizeInBytes = self.estimateBase64Size(self.selectedbase64);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("File too large. Please upload a file smaller than 10 MB.");
          self.resetUploadUI();
          return;
        }
        self.view.flxHowWouldYouLike.setVisibility(false);
        self.view.imgFrontView.setVisibility(false);
        self.view.flxUploaded.setVisibility(true);
        self.view.imgDone.setVisibility(true);
        self.view.flxUploadPopup.setVisibility(true);
        self.view.UploadInnerTest.setVisibility(false);
        self.view.flxHowWouldYouLikeTest.setVisibility(false);
        self.view.flxDocsError.setVisibility(false);
        self.view.btnSubmit.setEnabled(true);
        self.view.flxUploadPhotoClickArea.setVisibility(false);
        self.view.btnSubmit.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
        //           var isGovtId = voltmx.store.getItem("isGovtId");
        //         if( isGovtId&&this.view.lblUploadedFileName.text !==""){
        //         this.view.btnUploadBackView.setVisibility(true);
        //         }
        //                 if (
        //   isGovtId &&
        //   this.view.lblUploadedFileName &&
        //   this.view.lblUploadedFileName.text &&
        //   this.view.lblUploadedFileName.text.trim() !== ""
        // ) {
        //   this.view.btnUploadBackView.setVisibility(true);
        // } 
        //         else {
        //   this.view.btnUploadBackView.setVisibility(false); // Optional: hide if not valid
        // }

        //         }
        //         else{

        //         =====================Back View Logic============================================================
        //             this.view.lblUploadedFileNameBackCopy.text =  this.SelectedfileName;
        //           this.backCopyFileName = this.SelectedfileName;
        //                 this.backCopyBase64 = this.selectedbase64;
        //         this.view.flxHowWouldYouLike.setVisibility(false);
        // //         this.view.imgFrontView.setVisibility(false);
        //         this.view.imgBackView.setVisibility(false);
        //           this.view.flxUploadedBackView.setVisibility(true);
        //         this.view.flxUploadedBackCopy.setVisibility(true);
        //             this.view.imgDonebackcopy.setVisibility(true);
        //         this.view.flxUploadPhotoClickArea.setVisibility(false);
        //           var isGovtId = voltmx.store.getItem("isGovtId");
        //            this.view.btnSubmit.setEnabled(true);
        //           if(isGovtId &&this.view.lblUploadedFileNameBackCopy.text  ){
        //                this.view.btnSubmit.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";     
        //           }
        //         if(type !== "Government_IDs"){
        //                   this.view.btnSubmit.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
        //         }
        //         }
      } catch (error) {
        console.error("Failed to clone data:", error);
        self.pdfData = null;
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

          self.SelectedfileName = fileName;
          self.selectedbase64 = base64Data;

          voltmx.runOnMainThread(function () {
            self.view.flxUploadedFrontview.setVisibility(true);
            self.view.lblUploadedFileName.text =   self.SelectedfileName;
            self.view.flxHowWouldYouLike.setVisibility(false);
            self.view.imgFrontView.setVisibility(false);
            self.view.flxUploaded.setVisibility(true);
            self.view.flxUploadPopup.setVisibility(true);
            self.view.UploadInnerTest.setVisibility(false);
            self.view.flxHowWouldYouLikeTest.setVisibility(false);
            self.view.imgDone.setVisibility(true);
            self.view.btnSubmit.setEnabled(true);
            self.view.flxUploadPhotoClickArea.setVisibility(false);
            self.view.btnSubmit.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
          }, []);
        });
      }
    }
  },




  btnSubmitOnClickAction: function() {
    if(this.selectedType2){
      var self = this;
      checkTokenValidatity(function() {
        voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
        var uploadOption = voltmx.store.getItem("uploadOption");
        var type = voltmx.store.getItem("type");
        var subtype = voltmx.store.getItem("subType");
        var moduleName = "UploadUserDocuments";
        var moduleType = "Customers";
        var user_code = voltmx.store.getItem("user_code");
        var isGovtId =  voltmx.store.getItem("isGovtId");
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
          if (! self.selectedbase64||!self.SelectedfileName) {
            voltmx.application.dismissLoadingScreen();
            //             self.view.flxLoadingIndicator.setVisibility(false);
            alert("No PDF selected or data missing. Please upload a PDF first.");
            return;
          }
          var fileDetails = [
            {
              "is_thumbnail": "false",
              "filename": self.SelectedfileName,
              "base64": self.selectedbase64.split('+').join('/plus/'),
              "sub_type": subtype,
              "type": type,
            }
          ];
        }
        else if(uploadOption === "Image"){

          //         var self = this;
          voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
          //           self.view.flxLoadingIndicator.setVisibility(true);
          //         alert(self.filename +"self.filename ");
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
                 "type"        : type,
                 "sub_type"    : subtype, 
                },
              ];
        }
        else{
          //         var self = this;
          voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
          //           self.view.flxLoadingIndicator.setVisibility(true);
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
              "type": type,
              "sub_type": subtype,
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
          category : category,
          user_code : user_code
        };

        mfintegrationsecureinvokerasync(
          create_dam_items_inputparam,
          "fry_collection",
          "upload-user-documents",
          function(status, response) {
            //           alert("status"+status);
            //           alert("response"+JSON.stringify(response));
            voltmx.application.dismissLoadingScreen();
            //             self.view.flxLoadingIndicator.setVisibility(false);
            if (!response) {
              voltmx.print("No response object received from service.");
              self.view.SmthngWentWrong.setVisibility(true);
              return;
            }
            //           alert(JSON.stringify(response)+"response");
            //           alert("opstats: "+response.opstatus)
            if (response.opstatus === 0) {
              var rawResponse = response.response;
              var parsedArray = [];

              try {
                parsedArray = JSON.parse(rawResponse);
                //               alert("parsedArray"+parsedArray);

                voltmx.print("Response for upload : " + JSON.stringify(response));
                if (response.message === "Success" && Array.isArray(parsedArray) && parsedArray.length !== 0) {
                  voltmx.print("Response is an empty array.");
                  var uploadsucess =voltmx.i18n.getLocalizedString("Uploaded Successfully");
                  alert(uploadsucess);
                  self.clearAllFields();    
                }
                else {
                  voltmx.application.dismissLoadingScreen();
                  //                   self.view.flxLoadingIndicator.setVisibility(false);

                  if (Array.isArray(parsedArray) &&  parsedArray[0].error_code === "409") {
                    self.view.flxDocsError.setVisibility(true);
                    self.view.lblDocsError.text = "file already exists!!";
                  }
                  else{
                    self.view.SmthngWentWrong.setVisibility(true);
                    self.view.flxDocsError.setVisibility(true);
                    self.view.lblDocsError.text = "Upload failed. Please try again."; 
                  }
                }
              }
              catch (e) {
                voltmx.print("Failed to parse response.response: " + e);
                return;
              }
            } else {	
              if(response.opstatus === 1011){
                self.view.flxError.setVisibility(true);
              }
              if(response.message === "Session/Token got invalidated in the backend.Please login."){
                alert(response.message);
              }
              handleServiceError(response,"upload-user-documents", function(errorMsg){
                self.view.flxDocsError.setVisibility(true);
                self.view.lblDocsError.text = errorMsg;             
              });
            }
          });	
      });
    }
    else{
      alert("Please Select type!!");
    }
  },



  btnBackOnClickAction: function(){
    var uploadOption = voltmx.store.getItem("uploadOption");
    this.view.flxDocTypeDropDownList.setVisibility(false);
    this.view.imgDropDown.setVisibility(true);
    this.view.imgUpArrow.setVisibility(false);
    this.view.lblSelect.text = "Select";
    if(uploadOption === "PDF"){
      if(this.view.lblUploadedFileName.text === "" && this.view.imgDone.isVisible===false){
        this.view.flxUploadPopup.setVisibility(false);
      }
      else{
        this.view.imgDone.setVisibility(false);
        this.view.lblUploadedFileName.text = ""  ;
        this.view.btnSubmit.setEnabled(false);
        this.view.btnSubmit.skin="sknbtnBGccccccRoundedBordercccccc1pxFontDubaiReg767676Size40px";
        this.view.flxUploadPhotoClickArea.setVisibility(true);
        this.view.flxUploadedFrontview.setVisibility(false);
        this.view.flxUploadedBackView.setVisibility(false);
//         this.view.btnUploadBackView.setVisibility(false);
      }
    }
    else if(this.view.imgFrontView.base64){

      if (uploadOption === "Image"){
        if(this.view.imgFrontView.base64 ===""){
          this.view.flxUploadPopup.setVisibility(false);
        }
        else if(this.view.imgFrontView.base64){
          this.view.imgFrontView.base64 ="";
        }  
        this.view.btnSubmit.setEnabled(false);
        this.view.btnSubmit.skin="sknbtnBGccccccRoundedBordercccccc1pxFontDubaiReg767676Size40px";
        this.view.flxUploadPhotoClickArea.setVisibility(true);
        this.view.flxUploadedFrontview.setVisibility(false);
        this.view.flxUploadedBackView.setVisibility(false);
      }
      else{
        if(this.view.imgFrontView.base64){
          this.view.imgFrontView.base64 ="";
        }  
        this.view.btnSubmit.setEnabled(false);
        this.view.btnSubmit.skin="sknbtnBGccccccRoundedBordercccccc1pxFontDubaiReg767676Size40px";
        this.view.flxUploadPhotoClickArea.setVisibility(true);
        this.view.flxUploadedFrontview.setVisibility(false);
        this.view.flxUploadedBackView.setVisibility(false);
      }
    }
    else{
      this.view.flxUploadPopup.setVisibility(false);
    }
  },




  flxPlusOnClickAction: function(){
    this.view.flxUploadPopup.setVisibility(true);
    this.view.btnSubmit.setEnabled(false);
    this.view.btnSubmit.skin="sknbtnBGccccccRoundedBordercccccc1pxFontDubaiReg767676Size40px";
  },




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




  segTypesOnRowClickAction: function(){
    var selectedType = this.view.segTypes.selectedRowItems;
    var selectedIndex = this.view.segTypes.selectedRowIndex[1]; 
    this.selectedType2 = selectedType[0].typeKey.text;
    var alreadyChosen = voltmx.store.getItem("chosenTypes") || [];
    if (!alreadyChosen.includes(this.selectedType2)) {
      alreadyChosen.push(this.selectedType2);
      voltmx.store.setItem("chosenTypes", alreadyChosen);
    }
    this.view.lblSelect.text = selectedType[0].lblType.text;
    this.view.lblBackView.text =  selectedType[0].lblType.text+" Back View";
    this.view.lblFrontView.text =  selectedType[0].lblType.text+" Front View";
    this.view.btnUploadBackView.text ="Upload "+selectedType[0].lblType.text+" Back Copy";
    if(this.view.lblSelect.text!==""){
      this.view.flxDocTypeDropDownList.setVisibility(false);
      this.view.imgUpArrow.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
    }
    if(this.selectedType2 === "Emirates ID"){
      var isUploaded = voltmx.store.getItem("isUploadedGovtIdsEmirates");
      if(isUploaded){
        alert("The type Emirates ID	 has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","Government_IDs");
      voltmx.store.setItem("subType","Emirates ID");
//       this.view.btnUploadBackView.setVisibility(true);
      this.view.flxExpiryDate.top="-40dp";
    }
    else if(this.selectedType2 === "Passport"){
      var isUploaded = voltmx.store.getItem("isUploadedGovtIdsPassPort");
      if(isUploaded){
        alert("The type Passport has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","Government_IDs");
      voltmx.store.setItem("subType","passport");
//       this.view.btnUploadBackView.setVisibility(true);
      this.view.flxExpiryDate.top="-40dp";
    }
    else if(this.selectedType2 === "UAE Pass"){
      var isUploaded = voltmx.store.getItem("isUploadedGovtIdsUAEPass");
      if(isUploaded){
        alert("The type UAE Pass has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","Government_IDs");
      voltmx.store.setItem("subType","uae pass");
//       this.view.btnUploadBackView.setVisibility(true);
      this.view.flxExpiryDate.top="-40dp";
    }
    else if(this.selectedType2 === "Driving License"){
      var isUploaded = voltmx.store.getItem("isUploadedGovtIdsDrivingLicense");
      if(isUploaded){
        alert("The type Driving license has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","Government_IDs");
      voltmx.store.setItem("subType","Driving license");
//       this.view.btnUploadBackView.setVisibility(true);
      this.view.flxExpiryDate.top="-40dp";
    }
    else if(this.selectedType2 === "Trade Licenses"){
      var isUploaded = voltmx.store.getItem("isUploadedTradeLicenses");
      var isUploadedTradeLicensesSubType =voltmx.store.getItem("isUploadedTradeLicensesSubType");
      if(isUploaded && isUploadedTradeLicensesSubType){
        alert("The type Trade license has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","trade_license");
      voltmx.store.setItem("subType","trade_license");
      this.view.flxExpiryDate.top = "-80dp";
//       this.view.btnUploadBackView.setVisibility(false);
    }
    else if(this.selectedType2 === "Tax Registration Document"){
      var isUploaded = voltmx.store.getItem("");
      if(isUploaded){
        alert("The type Tax Registration number has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","trade_license");
      voltmx.store.setItem("subType","Tax Registration Document");
//       this.view.btnUploadBackView.setVisibility(false);
      this.view.flxExpiryDate.top = "-80dp";
    }
    else if(this.selectedType2 === "VAT Certificates"){
      var isUploaded = voltmx.store.getItem("isUploadedVatCert");
      var isUploadedSubType = voltmx.store.getItem("isUploadedVATCerts");
      if(isUploaded ){
        alert("The type VAT Certificates has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","VAT_Certificates");
      voltmx.store.setItem("subType","VAT Certificate");
//       this.view.btnUploadBackView.setVisibility(false);
      this.view.flxExpiryDate.top = "-80dp";
    }
    
    ///---------------------------------------------------------------------
      else if(this.selectedType2 === "Seller contract"){
      var isUploaded = voltmx.store.getItem("isUploadedSaleContract");
      //var isUploadedSubType = voltmx.store.getItem("isUploadedVATCerts");
      if(isUploaded ){
        alert("The type Sale contract has already uploaded with some file!");
        this.view.lblSelect.text = "Select";
        return;
      }
      voltmx.store.setItem("type","contract");
      voltmx.store.setItem("subType","contract");
//       this.view.btnUploadBackView.setVisibility(false);
      this.view.flxExpiryDate.top = "-80dp";
    }
    
    //--------------------------------------------------------
  },



});