define({ 

  onNavigate: function() {
    this.view.flxArrow.onClick  =this.onArrowClickFunction;
    this.view.preShow = this.onPreShow;
    this.view.flxFileUpload.onClick = this.flxFileUploadOnClickAction;
    this.view.flxUploadPopupCloseForDocs.onClick = this.flxUploadPopupCloseForDocsOnClickAction;
    this.view.btnUploadReceipt.onClick = this.btnUploadReceiptOnClickAction;
    this.view.flxBankTransfer.onClick = this.flxbankTransferToggleOnClickAction.bind(this);
    this.view.flxBankDeposit.onClick  = this.flxbankDepositOnClickAction.bind(this);
    this.view.flxClose.onClick = this.btnViewSecurityDepositOnClickAction;
    //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck;
    //#endif
    //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFI;
    //#endif
    this.view.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.cam.onCapture = this.camOnCaptureAction;
    this.Addingi18nKeys();
//     this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction;
    this.view.btnViewSecurityDeposit.onClick = this.btnViewSecurityDepositOnClickAction;
    this.view.txtReceiptRreference.onTextChange = this.txtReceiptRreferenceOnTextChange;
    this.view.SmthngWentWrong.flxClose.onClick = this.btnCloseOnClick;
    this.view.SmthngWentWrong.btnClose.onClick = this.btnCloseOnClick;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction;
  },




  Addingi18nKeys: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var textAlign = isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;
    var direction = isArabic;
    
 
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
     this.view.lblRegisterAs.text = voltmx.i18n.getLocalizedString("How would you like to upload your document");
     this.view.lblChooseFromFile.text = voltmx.i18n.getLocalizedString("CHOOSE FROM FILE"); 
     this.view.lblChooseFromLibrary.text = voltmx.i18n.getLocalizedString("CHOOSE FROM LIBRARY");
     this.view.cam.text = voltmx.i18n.getLocalizedString("TAKE A PHOTO");
     this.view.btnSubmitForUpload.text = voltmx.i18n.getLocalizedString("Submit");
     this.view.flxToggles.reverseLayoutDirection = isArabic;
    
    
    
    
    
    if (isArabic) {
      this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      
      var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;

  this.view.flxArrow.left = null;

  this.view.flxArrow.right = "5%";

} else {
 this.view.lblRegisterAs.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
  this.view.flxArrow.left = "5%";

  this.view.flxArrow.right = null;

}

 
    var labelList = [
      "lblbankTransferOrDeposit",
      "lblReciptType",
      "txtReceiptRreference",
      "lblAmountOnRecepit",
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
      "flxArrow", 
      "flxBankDepositBankTransferToggles",
      "flxreceiptReference",
      "flxAmountOnRecepit",
      "lblRegisterAs"
    ];

    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblbankTransferOrDeposit.text = voltmx.i18n.getLocalizedString("bank transfer or deposit");
    this.view.lblReciptType.text = voltmx.i18n.getLocalizedString("receiptType");
    this.view.lblBankDeposit.text = voltmx.i18n.getLocalizedString("bank deposit");
    this.view.lblBankTransferToggle.text = voltmx.i18n.getLocalizedString("bank transfer");
    this.view.lbluploadReceipt.text = voltmx.i18n.getLocalizedString("uploadReceipt");
    this.view.lblJpgorPng.text = voltmx.i18n.getLocalizedString("JPEG, PNG and PDF only, maximum file size is 10MB");
    this.view.txtReceiptRreference.placeholder = voltmx.i18n.getLocalizedString("receiptReferenceNo");
    this.view.btnUploadReceipt.text = voltmx.i18n.getLocalizedString("uploadReceipt");
   this.view.lblThankYou.text = voltmx.i18n.getLocalizedString("Thank You !");
    this.view.lblSuccessMsg.text = voltmx.i18n.getLocalizedString("Sucesspopupinbanktransfer");
   this.view.lblContactUs.text = voltmx.i18n.getLocalizedString("Contact Us");
    this.view.btnViewSecurityDeposit.text = voltmx.i18n.getLocalizedString("VIEW SECURITY DEPOSIT");
  },




  onPreShow: function(){
    this.btnEnableAction();
    this.fieldsOn();
    this.paymentMehod();
    var today = new Date();
      var pastLimit = new Date(today.getFullYear(), today.getMonth()-1 , today.getDate());
    this.view.calender.validStartDate = [pastLimit.getDate(), pastLimit.getMonth() + 1, pastLimit.getFullYear()];
    this.view.calender.validEndDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    this.view.calender.viewConfig = {
      calendarViewConfig: {
        showCalendarIcon: false
      }
    };
    var day = today.getDate();
    var month = today.getMonth() + 1; // Month is 0-based in JS, so add 1
    var year = today.getFullYear();
    this.view.calender.date = [day, month, year];
    if(this.view.imgUploaded){
    this.view.imgUploaded.setVisibility(false);
    }
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.btnUploadReceiptOnClickAction();
    } else {
      voltmx.print("Still offline...");
    }
  },




  btnCloseOnClick: function(){
    this.view.SmthngWentWrong.setVisibility(false);
  },




  btnEnableAction: function(){
    this.view.btnUploadReceipt.setEnabled(false);
  },




  fieldsOn: function(){
    this.view.flxFileUploadContainer.setVisibility(true);
    this.view.flxDocsErrorContainer.setVisibility(false);
    this.view.flxUploaded.setVisibility(false);
    this.view.flxReferenceError.setVisibility(false);
    this.view.txtReceiptRreference.text= "";
    this.view.flxBankTransferBottomLine.setVisibility(false);
    this.view.flxBankDepositBottomLine.setVisibility(true);
    this.view.flxFileUploadSuccessPopup.setVisibility(false);
    this.view.btnUploadReceipt.skin = "sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
    var amt = voltmx.store.getItem("requireAmtToDeposit");
    this.view.lblAmountOnRecepit.text = amt;
  },




  checkFileUnselect: function () {
    var uploadOption = voltmx.store.getItem("uploadOption");
    if (uploadOption === "PDF") {
      if (!this.view.lblUploadedFileNamePdf.text || this.view.lblUploadedFileNamePdf.text.trim() === "") {
        alert("Please select a PDF file!");
        return false;
      }
    } else if (uploadOption === "Image") {
      if (!this.view.imgUploaded.base64) {
        alert("Please select an image file!");
        return false;
      }
    } else {
      if (!this.view.imgUploaded.base64) {
        alert("Please select a file!");
        return false;
      }
    }
    return true;
  },




  txtReceiptRreferenceOnTextChange: function(){
    if(!this.view.txtReceiptRreference.text){
      this.view.flxReferenceError.setVisibility(true);
      this.view.btnUploadReceipt.setEnabled(false);
    }
    else{
      this.view.flxReferenceError.setVisibility(false);
      this.view.btnUploadReceipt.setEnabled(true);
    }
  },




  paymentMehod: function(){
    if(this.view.flxBankTransferBottomLine.isVisible){
      voltmx.store.setItem("payment_method", "Bank Transfer");
    }else if( this.view.flxBankDepositBottomLine.isVisible){
      voltmx.store.setItem("payment_method", "Bank Deposit");
    }
  },




  checkEmpty: function () {
    var paymentMethod = voltmx.store.getItem("payment_method");
    var receiptRef = this.view.txtReceiptRreference.text;
    var isFileSelected = this.checkFileUnselect();
    let isValid = true;
    if (!receiptRef || receiptRef.trim() === "") {
      this.view.flxReferenceError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxReferenceError.setVisibility(false);
    }
    if (!isFileSelected) {
      isValid = false;
    }
    if (!paymentMethod) {
      isValid = false;
    }
    this.view.btnUploadReceipt.setEnabled(isValid);
    return isValid;
  },




  flxbankDepositOnClickAction: function(){
    this.view.flxBankTransferBottomLine.setVisibility(false);
    this.view.flxBankDepositBottomLine.setVisibility(true);
    voltmx.store.setItem("payment_method", "Bank Deposit");
  },




  flxbankTransferToggleOnClickAction: function(){
    voltmx.store.setItem("payment_method", "Bank Transfer");
    this.view.flxBankDepositBottomLine.setVisibility(false);
    this.view.flxBankTransferBottomLine.setVisibility(true);
  },




  onArrowClickFunction: function() {
    var noPdfUploaded = !this.view.lblUploadedFileNamePdf.text && !this.view.imgDone.src;
    var noImageUploaded = !this.view.imgUploaded.src;
    if (noPdfUploaded || noImageUploaded) {
      this.view.lblUploadedFileNamePdf.text = "";
      this.view.imgDone.src = "";
      this.view.imgUploaded.src = "";
      this.view.flxDocsErrorContainer.setVisibility(false);
      this.view.imgUploaded.setVisibility(false);
      this.view.flxUploaded.setVisibility(false);
      this.view.flxFileUploadContainer.setVisibility(true);
      var nav = new voltmx.mvc.Navigation("frmPayAndUploadAuctionTypeBankDeposit");
      nav.navigate();
      return;
    } 
    this.view.imgUploaded.src = "";
    this.view.flxDocsErrorContainer.setVisibility(false);
    this.view.imgUploaded.setVisibility(false);
    this.view.flxUploaded.setVisibility(false);
    this.view.flxFileUploadContainer.setVisibility(true);
  },




  flxFileUploadOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(true);
  },




  flxUploadPopupCloseForDocsOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(false);
  },




  estimateBase64Size: function (base64Str) {
    let padding = (base64Str.match(/=*$/) || [""])[0].length;
    return Math.floor((base64Str.length * 3) / 4) - padding;
  },




  flxChooseFromLibraryOnClickAction: function () {
    voltmx.store.setItem("uploadOption", "Image");
    var self = this;
    voltmx.phone.openMediaGallery(function (rawbytes) {
      if (rawbytes) {
        voltmx.print("Raw Bytes JSON: " + JSON.stringify(rawbytes));
        var base64Data = voltmx.convertToBase64(rawbytes);
        const sizeInBytes = self.estimateBase64Size(base64Data);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        voltmx.print("Image size: " + sizeInMB + " MB");
        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("Image too large. Please upload an image smaller than 10 MB.");
        //  this.resetUploadUIForImages();
          return;
        }
        var filetype = detectFileType(base64Data) || ".jpg"; 
        var filename = "Image_" + new Date().getTime() + filetype;
        self.filename = filename;
        self.base64MyDocsUpload = base64Data;
        self.view.imgUploaded.base64 = base64Data;
        self.view.flxHowWouldYouLike.setVisibility(false);
        self.view.flxFileUploadContainer.setVisibility(false);
        self.view.flxFileUpload.setVisibility(true);
        self.view.imgDone.src = "";
        self.view.imgUploaded.setVisibility(true);
        self.view.flxUploaded.setVisibility(false);
        if (self.view.txtReceiptRreference.text === "") {
          self.view.btnUploadReceipt.setEnabled(false);
        } else {
          self.view.btnUploadReceipt.setEnabled(true);
        }
        self.view.btnUploadReceipt.skin = "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
      }
    }.bind(this), {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*"
    });
  },




  camOnCaptureAction: function() {
    var self = this;
    voltmx.store.setItem("uploadOption", "Cam");
    var rawBytes = self.view.cam.rawBytes;
    if (rawBytes) {
      var base64Image = voltmx.convertToBase64(rawBytes);
      var sizeInBytes = self.estimateBase64Size(base64Image);
      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 10 * 1024 * 1024) {
        alert("Image too large. Please capture an image smaller than 10 MB.");
       // this.resetUploadUIForImages();
        return;
      }
      var filename = "captured_image"+Date.now();
      try {
        if (rawBytes.getResourcePath && typeof rawBytes.getResourcePath === "function") {
          var resourcePath = rawBytes.getResourcePath();
          if (resourcePath) {
            filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
          }
        }
      } catch (e) {
        voltmx.print("Error extracting filename: " + e.message);
      }
      var base64Image = "";
      try {
        base64Image = voltmx.convertToBase64(rawBytes);
      } catch (err) {
        voltmx.print("Error converting to base64: " + err.message);
        alert("Image conversion failed.");
        return;
      }
      var filetype = detectFileType(base64Image);
      var filefullname = filename + filetype;
      self.filenameCam = filefullname;
      self.base64CamImage = base64Image;
      self.view.imgUploaded.base64 = base64Image;
      self.view.imgDone.src = "";
      self.view.flxHowWouldYouLike.setVisibility(false);
      self.view.flxFileUploadContainer.setVisibility(false);
      self.view.flxFileUpload.setVisibility(true);
      self.view.imgUploaded.setVisibility(true);
      if (self.view.txtReceiptRreference.text === "") {
        self.view.btnUploadReceipt.setEnabled(false);
      } else {
        self.view.btnUploadReceipt.setEnabled(true);
      }
      self.view.btnUploadReceipt.skin = "sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
    } else {
      voltmx.print("rawBytes is null - possibly camera permission denied or no image captured.");
      alert("Camera failed to capture image. Please try again.");
    }
  },




  flxUploadContainerOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(true);
  },




  flxUploadPopupCloseOnClickAction: function(){
    this.view.flxHowWouldYouLike.setVisibility(false);
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
        this.SelectedfileName =this.pdfData.fileName;
        this.selectedbase64 =this.pdfData.base64pdf;
        const sizeInBytes = this.estimateBase64Size(this. selectedbase64);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("File too large. Please upload a file smaller than 10 MB.");
          this.resetUploadUI();
          return;
        }
        this.view.lblUploadedFileNamePdf.text =  this.SelectedfileName;
        this.view.flxHowWouldYouLike.setVisibility(false);
        this.view.imgUploaded.setVisibility(false);
        this.view.flxUploadedFile.setVisibility(true);
        this.view.flxUploaded.setVisibility(true);
        this.view.flxFileUploadContainer.setVisibility(false);
        this.view.flxDocsErrorContainer.setVisibility(false);
        if(this.view.txtReceiptRreference.text === ""){
          this.view.btnUploadReceipt.setEnabled(false);
        }
        else{
          this.view.btnUploadReceipt.setEnabled(true);
        }
        this.view.btnUploadReceipt.setEnabled(true);
        this.view.btnUploadReceipt.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
      } catch (error) {
        console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },




  testPDFNFI: function() {
    var self = this;
    voltmx.store.setItem("uploadOption", "PDF");
    voltmx.runOnMainThread(function mainthread() {
      var ViewController = objc.import("ViewController");
      if (!ViewController) {
        voltmx.print("Error: Failed to import ViewController");
        return;
      }
      var ViewObject = ViewController.alloc().jsinit();
      ViewObject.pickPdfTapped();

      ViewObject.pdfCallback(function(pdfArrayObj) {
        voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]);
        var fileName = pdfArrayObj[0];
        var base64Data = pdfArrayObj[1];
        self.SelectedfileName = fileName;
        self.selectedbase64 = base64Data;
        voltmx.runOnMainThread(function() {
          self.view.lblUploadedFileNamePdf.text =  self.SelectedfileName;
          self.view.flxHowWouldYouLike.setVisibility(false);
          self.view.imgUploaded.setVisibility(false);
          self.view.flxUploadedFile.setVisibility(true);
          self.view.flxUploaded.setVisibility(true);
          self.view.flxFileUploadContainer.setVisibility(false);
          self.view.flxDocsErrorContainer.setVisibility(false);
          if(self.view.txtReceiptRreference.text === ""){
            self.view.btnUploadReceipt.setEnabled(false);
          }
          else{
            self.view.btnUploadReceipt.setEnabled(true);
          }
          self.view.btnUploadReceipt.setEnabled(true);
          self.view.btnUploadReceipt.skin ="sknbtnBG61B35CDubaiRegFont45pxRoundedBorder1px";
        }, []);
      });
    }, []);
  },




  btnUploadReceiptOnClickAction: function(){
       var self = this;
    checkTokenValidatity(function() {
    if(self.checkEmpty()){
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var bid_limit = voltmx.store.getItem("bid_limit");
      var deposit_amt = voltmx.store.getItem("deposit_amt");
      if(!bid_limit||!deposit_amt){
        alert("please select bid limit and deposit amount");
      }
      var reference_no =self.view.txtReceiptRreference.text;
      self.referenceNumber = reference_no;
      var dateStr = self.view.calender.date; // "23/05/2025"
      var parts = dateStr.split('/');
      var payment_date = `${parts[2]}-${parts[1]}-${parts[0]}`;
      var payment_method = voltmx.store.getItem("payment_method");
      var user_token = voltmx.store.getItem("getUserAccesstoken");
      voltmx.print("date:"+payment_date);
      var user_security_deposit_banktransfer_inputparam = {};
      user_security_deposit_banktransfer_inputparam["serviceID"] = "ms_user$user-security-deposit-banktransfer";
      user_security_deposit_banktransfer_inputparam["bid_limit"] =bid_limit ;
      user_security_deposit_banktransfer_inputparam["deposit_amt"] = Number(deposit_amt);
      user_security_deposit_banktransfer_inputparam["reference_no"] = reference_no;
      user_security_deposit_banktransfer_inputparam["payment_date"] = payment_date;
      user_security_deposit_banktransfer_inputparam["payment_method"] = payment_method;
      user_security_deposit_banktransfer_inputparam["currency_code"] = "AED";
      user_security_deposit_banktransfer_inputparam["payment_module"] = "security_deposit";
      var user_security_deposit_banktransfer_httpheaders = {
        "user_token" : user_token,
      };
      user_security_deposit_banktransfer_inputparam["httpheaders"] = user_security_deposit_banktransfer_httpheaders;
      var user_security_deposit_banktransfer_httpconfigs = {};
      user_security_deposit_banktransfer_inputparam["httpconfig"] = user_security_deposit_banktransfer_httpconfigs;
      ms_user$user_security_deposit_banktransfer =
        mfintegrationsecureinvokerasync(user_security_deposit_banktransfer_inputparam, 
                                        "ms_user", 
                                        "user-security-deposit-banktransfer", 
                                        function(status,response){
        voltmx.print("status :"+status);
        voltmx.print("Response in user-security-deposit-banktransfer :"+response);    
        if(response.data&&response.data.payment_id){
          self.uploadLogic();
        }
        else{
          voltmx.application.dismissLoadingScreen();
          if(response.opstatus === 8009 && response.errmsg ==="Backend request failed for service user-security-deposit-banktransfer with HTTP status code 401."){
            self.view.flxDocsErrorContainer.setVisibility(true);
            self.view.lblDocsError.text = "*Failed or Token Expired! Try Again!";
            self.view.btnUploadReceipt.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
            self.view.btnUploadReceipt.setEnabled(false);
          }
          else if(response.opstatus === 8009 && response.errmsg ==="Backend request failed for service user-security-deposit-banktransfer with HTTP status code 400."&& response.httpStatusCode === 400 ){
           if( response.error.message){
            self.view.flxDocsErrorContainer.setVisibility(true);
            self.view.lblDocsError.text =  response.error.message;
            self.view.btnUploadReceipt.setEnabled(false);
            self.view.btnUploadReceipt.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
           }
            else{
            self.view.flxDocsErrorContainer.setVisibility(true);
            self.view.lblDocsError.text = "*Failed Bad request! Try Again!";
            self.view.btnUploadReceipt.setEnabled(false);
            self.view.btnUploadReceipt.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
            }
          }
          else if(response.opstatus === 8009 && response.errmsg ==="Backend request failed for service user-security-deposit-banktransfer with HTTP status code 400."){
            self.view.flxDocsErrorContainer.setVisibility(true);
            self.view.lblDocsError.text = "*Failed Bad request! Try Again!";
            self.view.btnUploadReceipt.setEnabled(false);
            self.view.btnUploadReceipt.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
          }
          else if(response.message === "Session/Token got invalidated in the backend.Please login."){
            alert(response.message);
          }
          else if(response.opstatus === 1011){
            self.view.flxError.setVisibility(true);
          }
        }
      }  );
    }
    });
  },




  uploadLogic: function() {
    var self = this;
    checkTokenValidatity(function() {
    var uploadOption = voltmx.store.getItem("uploadOption");
    var type = voltmx.store.getItem("type");
    var moduleName = "UploadUserDocuments";
    var moduleType = "Customers";
    var user_token = voltmx.store.getItem("getUserAccesstoken");
    var user_id = voltmx.store.getItem("userId");
    var user_code = voltmx.store.getItem("user_code");
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
    var category ="Security_Deposit";
    if(uploadOption === "PDF"){
      if (!self.SelectedfileName || !self.selectedbase64) {
        voltmx.application.dismissLoadingScreen();
        alert("No PDF selected or data missing. Please upload a PDF first.");
        return;
      }
      var fileDetails = [
        {
          "is_thumbnail": "false",
          "filename": self.SelectedfileName,
          "base64": self.selectedbase64.replaceAll('+', '/plus/'),
          "sub_type": "Upload Receipt",
          "type": "Customers",
        }
      ];
    }
    else if(uploadOption === "Image"){

//       var self = this;
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

      if (!self.filename || !self.base64MyDocsUpload) {
        voltmx.application.dismissLoadingScreen();
        alert("No Image selected or data missing. Please upload a Image first.");
        return;
      }
      var fileDetails = 
          [
            {"is_thumbnail": "false",  
             "filename"    : self.filename, 
             "base64"      : self.base64MyDocsUpload.replaceAll('+','/plus/'),
             "sub_type": "Upload Receipt",
             "type": "Customers", 
            },

          ];
    }
    else{
//       var self = this;

      if ( !self.filenameCam|| !self.base64CamImage) {
        voltmx.application.dismissLoadingScreen();
        alert("No captured Image selected or data missing. Please upload a Captured Image Again!.");
        return;
      }
      var fileDetails = [
        {
          "is_thumbnail": "false",
          "filename":self.filenameCam,
          "base64": self.base64CamImage.replaceAll('+', '/plus/'),
          "sub_type": "Upload Receipt",
          "type": "Customers",	
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
      user_code : user_code,
      category :category,
      reference_id : self.referenceNumber
    };

    mfintegrationsecureinvokerasync(
      create_dam_items_inputparam,
      "fry_collection",
      "upload-user-documents",
      function(status, response) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Upload Response: " + JSON.stringify(response));
        if (response.opstatus === 0 ){
          var rawResponse = response.response;
          var parsedArray = [];
          try {
            parsedArray = JSON.parse(rawResponse);  
            voltmx.print("Uploaded Successfully");
            voltmx.print("Response for upload : " + JSON.stringify(response));
            if(response.message === "Success" && Array.isArray(parsedArray) && parsedArray.length > 0) {
              self.view.flxDocsErrorContainer.setVisibility(false);
              self.view.flxFileUploadSuccessPopup.setVisibility(true);
              if (uploadOption === "PDF") {
                self.view.flxUploadedFile.setVisibility(true);
                self.view.flxUploaded.setVisibility(true);
                self.view.imgUploaded.setVisibility(false);
              } else {
                self.view.flxUploadedFile.setVisibility(true);
                self.view.imgUploaded.setVisibility(true);
              }
            }
            if (Array.isArray(parsedArray) && parsedArray.length !== 0) {
              voltmx.print("Response is an empty array.");
            }
            else {
              self.view.SmthngWentWrong.setVisibility(true);
            }
            voltmx.print("Parsed data: " + JSON.stringify(parsedArray));
          }
          catch (e) {
            voltmx.print("Failed to parse response.response: " + e);
            return; 
          }      
        } else {	
          if(response.opstatus === 1011){
            self.view.flxError.setVisibility(true);
          }
          handleServiceError(response,"upload-user-documents", function(errorMsg){
            self.view.flxDocsErrorContainer.setVisibility(true);
            self.view.lblDocsError.text  = errorMsg;
          });
        }
      });
    });
  },




  btnViewSecurityDepositOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmSecurityDeposits");
    ntf.navigate();
  },




});
