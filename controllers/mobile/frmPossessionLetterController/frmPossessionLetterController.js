define({ 

onNavigate: function(){
  
  
  this.setData();
  this.view.preShow = this.onPreShow.bind(this);
  
   this.view.flxBack.onClick=this.goBackTo.bind(this);
   this.view.txtBoxSearch.onTextChange = this.setFilterToSeg.bind(this);
//   this.onHide();
    this.view.onHide = this.onHidePage.bind(this);

//    this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
  
//        //#ifdef android
//     this.view.flxTechnicalReport.onClick = this.onDownloadButtonClick.bind(this);
//       //#endif
//     //#ifdef iphone
//     this.view.flxTechnicalReport.onClick = this.testPDFNFIDownload.bind(this);
//     //#endif
  
  
//   this.summaryOfPossesionLetter();
//     var data=[
//      { 
//        "lblAuctionId"        : voltmx.i18n.getLocalizedString("Auction ID"),
//        "lblAuctionidValue"   : "482916" ,
//        "lblMakeAndModel"     : voltmx.i18n.getLocalizedString("Make & Model"),
//        "lblMakeAndModelValue": "Nissan 2019" ,
//        "lblDownload"         : voltmx.i18n.getLocalizedString("Download"),
//        "imgDownload"         : "download512h.png"
//      },
//     { 
//        "lblAuctionId"        : voltmx.i18n.getLocalizedString("Auction ID"),
//        "lblAuctionidValue"   : "482916" ,
//        "lblMakeAndModel"     : voltmx.i18n.getLocalizedString("Make & Model") ,
//        "lblMakeAndModelValue": "Nissan 2019" ,
//        "lblDownload"         : voltmx.i18n.getLocalizedString("Download"),
//       "imgDownload"         : "download512h.png"
//      },
//     { 
//        "lblAuctionId"        : voltmx.i18n.getLocalizedString("Auction ID"),
//        "lblAuctionidValue"   : "482916" ,
//        "lblMakeAndModel"     : voltmx.i18n.getLocalizedString("Make & Model") ,
//        "lblMakeAndModelValue": "Nissan 2019" ,
//        "lblDownload"         : voltmx.i18n.getLocalizedString("Download"),
//        "imgDownload"         : "download512h.png"
//      },
    
//            ]


//    this.view.segPossessionSummary.setData(data);
},
  onPreShow: function() {
  var self = this;
 
 
  self.view.txtBoxSearch.text = "";  // Clear search box
  self.view.lblNorecords.setVisibility(false); // Hide "No records"
  if (self.allPossessionData && self.allPossessionData.length > 0) {
    self.view.segPossessionSummary.setData(self.allPossessionData); 
    // Reset original dat
  }
 
  self.toggleFooterIcons();
  self.currentPossessionPage = 1;
  self.allPossessionData = [];
  self.summaryOfPossessionLetter();
 
  self.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
 
  voltmx.timer.schedule(
    "searchPlaceholderTimer01",
    self.updateSearchPlaceholder.bind(self),
    3,
    true
  );
    
    
         this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    

    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
          if(this.view.flxServiceError.btnTryAgain){
      this.view.flxServiceError.btnTryAgain.onClick = () =>{
       this.view.flxServiceError.setVisibility(false);
      }
    }

},
  
  
   flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
//       this.setUpDataPreshow();
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
   this.view.Footer2.lblSellCar.skin = "sknLblDubai231f2014pxBold"; 
    
    
      this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
          this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");

    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
          this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
      

    }
    
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
    
//       this.view.Footer2.imgSellCar.setVisibility(false);
//       this.view.Footer2.flxProfile.setVisibility(true);
     
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
  
   onHidePage: function () {
    voltmx.timer.cancel("searchPlaceholderTimer01");
  },
 
  
   goBackTo: function(){
    var goTo=new voltmx.mvc.Navigation("frmMyDocuments");
    goTo.navigate();
  },
  
  
  
  
   setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

     
     if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
       var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.CopyimgArrow0cddcf2fc0a214f.transform = flipTransform;
 

       
       
} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  this.view.CopyimgArrow0cddcf2fc0a214f.transform = voltmx.ui.makeAffineTransform();
}
  

  var labelList = [
    "lblPossessionLetter","txtBoxSearch"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "FlexGroup0f66a96c59b5141",
    "flxPossesionLetter",
    "flxSearchBox"
  ];


  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  this.view.lblPossesionLetter.text=voltmx.i18n.getLocalizedString("Possession Leters");
  this.view.lblPossessionLetter.text= voltmx.i18n.getLocalizedString("Summary of Possession Letters");
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
     
   
     
},
  
  
  
  
   updateSearchPlaceholder: function () {
    var self = this;
    self.searchKeywords = self.searchKeywords || [
      "Auction ID",
      "Make & Model",
    ];
    self.currentIndex = typeof self.currentIndex === "number" ? self.currentIndex : 0;

    var baseText = voltmx.i18n.getLocalizedString("Search by");
    var keywordKey = self.searchKeywords[self.currentIndex];
    var keywordText = voltmx.i18n.getLocalizedString(keywordKey) || keywordKey;

    if (self.view && self.view.txtBoxSearch) {
      self.view.txtBoxSearch.placeholder = baseText + " " + keywordText;
    }

    self.currentIndex = (self.currentIndex + 1) % self.searchKeywords.length;
  },

  
  
summaryOfPossessionLetter: function () {
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  var self = this;

  // Initialize variables on first call
 self.pageSize = self.pageSize || 10;
self.currentPossessionPage = self.currentPossessionPage || 1;
self.allPossessionData = self.allPossessionData || [];

  var userId = voltmx.store.getItem("userId");
  var usertoken = voltmx.store.getItem("getUserAccesstoken");

  function callback(status, response) {
    
       if(response && response.opstatus && response.opstatus === 1011){
     if(self.view.flxError){
       voltmx.print("entered");
       self.view.flxError.lblNetworkConnectionerror.text = 
         "Network issue. Please check your connection.";
       self.view.flxError.setVisibility(true);
     }
     return;
   }
    
    
       if (response && response.opstatus && response.opstatus >= 500) {
      if (self.view.flxServiceError) {
        self.view.flxServiceError.lblServiceErrorMsg.text =
          "Service error occurred. Please try again later.";
        self.view.flxServiceError.setVisibility(true);
      }
      return;
    }
          
          
   if(response && response.opstatus && response.opstatus !== 0){
     if(this.view.SmthngWentWrong){
       this.view.SmthngWentWrong.setVisibility(true);
     }
     return;
   }
      
        
       if (!response && !response.records) {
            self.view.segPossessionSummary.setData([]);
      self.view.lblNorecords.setVisibility(true);
      self.view.btnLoadMore.setVisibility(false)
         voltmx.print("no records found...");
         return;
       }
    var data = response.records;
    
    
    
    
     self.view.segPossessionSummary.widgetDataMap = {
        lblAuctionId: "lblAuctionId",
        lblMakeAndModel: "lblMakeAndModel",
        lblAuctionidValue: "lblAuctionidValue",
        lblMakeAndModelValue: "lblMakeAndModelValue",
        lblDownload: "lblDownload",
        flxButton: "flxButton",
      flxRight:  "flxRight"
      };


    if (Array.isArray(data) && data.length > 0) {
      var segData = data.map(function (item) {
        return {
          
               
            "flxRight":{
             "right": isArabic ? "2%" : "",
        "left": isArabic ? "" : "4%",
          },
            
            "flxButton":{
                "right": isArabic ? "60%" : "",
                "left": isArabic ? "" : "60%",
                "onClick": self.downloadOnClick.bind(self,item)
            },
          lblAuctionidValue: item.lot_no || "N/A",
          lblMakeAndModelValue: item.title || "N/A",
          lblAuctionId: voltmx.i18n.getLocalizedString("Auction ID"),
          lblMakeAndModel: voltmx.i18n.getLocalizedString("Make & Model"),
          lblDownload: voltmx.i18n.getLocalizedString("Download"),
          imgDownload: "download512h.png",
//           flxButton: {
//            "onClick": self.downloadOnClick.bind(self,item)

// //             function () {
             
// //             }
//           }
        };
      });

      
      
     
      self.allPossessionData = self.allPossessionData.concat(segData);

      self.view.segPossessionSummary.setData(self.allPossessionData);
      self.view.lblNorecords.setVisibility(false);

      if (data.length < self.pageSize) {
        self.view.btnLoadMore.setVisibility(false);
      } else {
        self.view.btnLoadMore.setVisibility(true);
      }

    } else {
      if (self.currentPossessionPage === 1) {
        self.view.segPossessionSummary.setData([]);
        self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
      }
      self.view.btnLoadMore.setVisibility(false);
      voltmx.print("Expected 'response.records' to be an array but got: " + JSON.stringify(data));
    }
  }

  var inputParam = {
    serviceID: "fry_int_common$get-user-documents-info",
    ClientUserId: userId,
    Category: "Possession_Letter",
    Page: self.currentPossessionPage.toString(),
    PageSize: self.pageSize.toString(),
    httpheaders: {
      "user_token": usertoken
    },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    inputParam,
    "fry_int_common",
    "get-user-documents-info",
    callback
  );
},


onLoadMoreClick: function() {
  this.currentPossessionPage++;
  this.summaryOfPossessionLetter();
},
  
  
  
  setFilterToSeg: function () {
    var self = this;
    var searchText = self.view.txtBoxSearch.text.trim().toLowerCase();

    if (!self.allPossessionData) return;

    if (searchText === "") {
      self.view.lblNorecords.setVisibility(false);
      self.view.segPossessionSummary.setData(self.allPossessionData);
      return;
    }

    var filteredData = self.allPossessionData.filter(function (item) {
      var makeModelText = item.lblMakeAndModelValue || "";
      var lotIdText = item.lblAuctionidValue || "";

      return (
        makeModelText.toLowerCase().includes(searchText) ||
        lotIdText.toLowerCase().includes(searchText)
      );
    });

    self.view.segPossessionSummary.setData(filteredData);

    if (filteredData.length === 0) {
      self.view.lblNorecords.setVisibility(true);
      self.view.btnLoadMore.setVisibility(false);
    } else {
      self.view.lblNorecords.setVisibility(false);
      // self.view.btnLoadMore.setVisibility(true);
    }
    
    
     // Show "Load More" only if more than 1 result
    if (filteredData.length > 1) {
      self.view.btnLoadMore.setVisibility(true);
    } else {
      self.view.btnLoadMore.setVisibility(false);
    }
  },


  
downloadOnClick: function(response) {
  var fileUrl = response.file_url;
//   var fileUrl =
//       "https://uat-hcltx.et.ae/dx/api/dam/v1/collections/49da2f10-111e-47b9-997d-7310a8b824e0/items/a09c4f72-c60d-428e-9ea2-e72a28c22fc7?binary=true"
  var self = this;
  var deviceName = voltmx.os.deviceInfo().name; 

  if (fileUrl && typeof fileUrl === "string" && fileUrl.startsWith("http")) {
    voltmx.application.showLoadingScreen(null, "Downloading...",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});

    try {
//       var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    
//       var now = new Date();

      // Format: yyyyMMdd_HH
//       var year = now.getFullYear();
//       var month = (now.getMonth() + 1).toString().padStart(2, '0');
//       var day = now.getDate().toString().padStart(2, '0');
//       var hour = now.getHours().toString().padStart(2, '0');

//       var randomNum = Math.floor(Math.random() * 1000); 

//       var extension = "pdf";
//       if (fileUrl.lastIndexOf(".") !== -1) {
//         extension = fileUrl.substring(fileUrl.lastIndexOf(".") + 1);
//       }

//       var fileName = "possessionletter_" +
//           year + month + day + "_" + hour + "_" +
//           randomNum + "." + extension;
      
         var fileName = "possessionletter_" + Date.now()+".pdf";

   

      if (deviceName.toLowerCase() === "android") {
        try {
          var DownloadClass = java.import
          ("com.example.pdffiledownload.FileDownloadHandler");
          var ActivityContext = java.import
          ("com.konylabs.android.KonyMain").getActivityContext();

          DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
          // Optional: self.showToast("Download started for: " + fileName);
        } catch (downloadError) {
          self.showToast
          ("Download failed on Android: " + downloadError.message);
        }

      } else if (deviceName.toLowerCase() === "iphone") {
        try {
          var FileDownloadHandlerNFI = objc.import("PDFDownloadNFI");
          var DownloadPDFViewController = objc.import("DownloadPDFViewController");

          if (!DownloadPDFViewController) {
            voltmx.print("Error: Failed to import DownloadPDFViewController");
            self.showToast("iOS download handler not available.");
          } else {
            var downloadObject = DownloadPDFViewController.alloc().jsinit();
            downloadObject.downloadAndPreviewPDFFileName(fileUrl, fileName);
          }
        } catch (e) {
          self.showToast("Exception during iOS download: " + e.message);
        }

      } else {
        self.showToast("Unsupported platform: " + deviceName);
      }

    } catch (ex) {
      self.showToast("Exception during download: " + ex.message);
    } finally {
      voltmx.application.dismissLoadingScreen();
     
    }

  } else {
    self.showToast("No file available to download.");
  }
},


showToast: function(message) {
  var platform = voltmx.os.deviceInfo().name.toLowerCase();

  if (platform === "android") {
    var toast = new voltmx.ui.Toast({
      text: message,
      duration: constants.TOAST_LENGTH_SHORT,
      alignConfig: {
        widget: voltmx.application.getCurrentForm(),
        position: constants.TOAST_POS_BOTTOM
      }
    });
    toast.show();
  } else if (platform === "iphone" || platform === "ipad") {
    alert(message);
  } else {
    voltmx.print("Toast not supported on this platform: " + platform);
  }
},

  
  

  
  
  
  


 });