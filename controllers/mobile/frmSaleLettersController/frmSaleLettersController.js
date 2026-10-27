define({ 
  

onNavigate: function(){
  
  this.view.preShow = this.onPreShow.bind(this);
  this.view.flxBack.onClick=this.goBackTo.bind(this);
  this.setData();
    this.view.txtBoxSearch.onTextChange = this.setFilterToSeg.bind(this);
//      ÷ this.onHide();
    this.view.onHide = this.onHidePage.bind(this);
},
  
 onPreShow: function() {
    var self = this;
  self.view.flxSummaryOfSalesLetter.setVisibility(true);
   self.view.flxSearchBox.setVisibility(true);
   self.view.Browser0bce43188ceea42.setVisibility(false);
    self.toggleFooterIcons();
    self.currentPossessionPage = 1;
    self.allPossessionData = [];
    self.summaryOfsalesLetter();  // assuming this is your data fetch function
 
    self.view.txtBoxSearch.text = "";  // Clear search box
    self.view.lblNorecords.setVisibility(false); // Hide "No records"
 
    // Defensive check for widget existence before calling setData
    if (self.view.summaryOfsalesLetter && 
        self.allPossessionData && self.allPossessionData.length > 0) {
      self.view.summaryOfsalesLetter.setData(self.allPossessionData);
    }
 
    self.view.btnLoadMore.onClick = self.onLoadMoreClick.bind(self);
 
    voltmx.timer.schedule(
      "searchPlaceholderTimer02",
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
  
  
  goBackTo: function(){
    var goTo=new voltmx.mvc.Navigation("frmMyDocuments");
    goTo.navigate();
  },
  
  
  onHidePage: function () {
    voltmx.timer.cancel("searchPlaceholderTimer02");
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
     this.view.Footer2.lblAuctions.text = 
       voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = 
       voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = 
       voltmx.i18n.getLocalizedString("Profile");
    
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
   this.view.Footer2.lblMyBids.text = 
     voltmx.i18n.getLocalizedString("Listings");

    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    this.view.Footer2.lblMyBids.text =
      voltmx.i18n.getLocalizedString("My Bids");

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
  
  
  
   updateSearchPlaceholder: function () {
    var self = this;
    self.searchKeywords = self.searchKeywords || [
      "Auction ID",
      "Make & Model",
    ];
    self.currentIndex = typeof self.currentIndex ===
      "number" ? self.currentIndex : 0;

    var baseText = voltmx.i18n.getLocalizedString("Search by");
    var keywordKey = self.searchKeywords[self.currentIndex];
    var keywordText = voltmx.i18n.getLocalizedString(keywordKey) || keywordKey;

    if (self.view && self.view.txtBoxSearch) {
       self.view.txtBoxSearch.placeholder = baseText + " " + keywordText;
    }

    self.currentIndex = (self.currentIndex + 1) % self.searchKeywords.length;
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
    this.view.imgArrow.transform = flipTransform;
 

} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();  
}

  var labelList = [
    "lblPossesionLetter","txtBoxSearch","lblSummarySalesLetter"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "FlexGroup0f66a96c59b5141",
    "FlexGroup0jb30ea40dfff47",
    "flxSalesLetters",
    "flxsearch",
    "flxSearchBox"
  ];


  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  this.view.lblSalesLetterstext=voltmx.i18n.getLocalizedString("Sale Letters");
  this.view.lblSummarySalesLetter.text= voltmx.i18n.getLocalizedString("Summary of Sale Letters");
    this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
     
   
     
},
  
  
summaryOfsalesLetter: function () {
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  var self = this;

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
       this.view.SmthngWentWrong.setVisibility(false);
     }
     return;
   }
      
      
      
       if (!response && !response.records) {
         
             
         self.view.segSalesTable.setData([]);
      self.view.lblNorecords.setVisibility(true);
      self.view.btnLoadMore.setVisibility(false);
         voltmx.print("no records found...");
         return;
       }
    var data = response.records;
     
     self.view.segSalesTable.widgetDataMap = {
        lblAuctionId: "lblAuctionId",
        lblMakeAndModel: "lblMakeAndModel",
        lblAuctionidValue: "lblAuctionidValue",
        lblMakeAndModelValue: "lblMakeAndModelValue",
        lblDownload: "lblDownload",
        flxButton: "flxButton",
       flxRight: "flxRight"
       
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
                "onClick": self.showHTMLinWebview.bind(self,item.object_id)
            },
          lblAuctionidValue: item.lot_no || "N/A",
          lblMakeAndModelValue: item.title || "N/A",
          lblAuctionId: voltmx.i18n.getLocalizedString("Auction ID"),
          lblMakeAndModel: voltmx.i18n.getLocalizedString("Make & Model"),
          lblDownload: voltmx.i18n.getLocalizedString("View"),
          imgDownload: "download512h.png",
//           flxButton: {
//            "onClick": self.downloadOnClick.bind(self,item)
//           }
        };
      });

      
      
     
      self.allPossessionData = self.allPossessionData.concat(segData);

      self.view.segSalesTable.setData(self.allPossessionData);
      self.view.lblNorecords.setVisibility(false);

      if (data.length < self.pageSize) {
        self.view.btnLoadMore.setVisibility(false);
      } else {
        self.view.btnLoadMore.setVisibility(true);
      }

    } else {
      if (self.currentPossessionPage === 1) {
        self.view.segSalesTable.setData([]);
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
    Category: "SalesDocument",
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
  this.summaryOfsalesLetter();
},

  
  
    setFilterToSeg: function () {
    var self = this;
    var searchText = self.view.txtBoxSearch.text.trim().toLowerCase();

    if (!self.allPossessionData) return;

    if (searchText === "") {
      self.view.lblNorecords.setVisibility(false);
      self.view.segSalesTable.setData(self.allPossessionData);
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

    self.view.segSalesTable.setData(filteredData);

    if (filteredData.length === 0) {
      self.view.lblNorecords.setVisibility(true);
      self.view.btnLoadMore.setVisibility(false);
    } else {
      self.view.lblNorecords.setVisibility(false);
      // self.view.btnLoadMore.setVisibility(true); // Uncomment if needed
    }
      
      
      
        // Show "Load More" only if more than 1 result
    if (filteredData.length > 1) {
      self.view.btnLoadMore.setVisibility(true);
    } else {
      self.view.btnLoadMore.setVisibility(false);
    }
  },
  
 showHTMLinWebview: function(objid) {
   this.view.flxSummaryOfSalesLetter.setVisibility(false);
   this.view.flxSearchBox.setVisibility(false);
   
   
    var self = this;
   voltmx.application.showLoadingScreen(null, "Loading..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
   checkTokenValidatity(function() {
    function invServiceCallBack(status, get_tracked_objects) {
     voltmx.print("Service status: " + status);
  voltmx.print("Response: " + JSON.stringify(get_tracked_objects));
  voltmx.application.dismissLoadingScreen();
  // Check for server or token issues
  if (get_tracked_objects &&
    get_tracked_objects.opstatus === 0 &&
    get_tracked_objects.records
  ) {
if (get_tracked_objects && Array.isArray(get_tracked_objects.records) && get_tracked_objects.records.length > 0) {
//   voltmx.store.setItem("data", get_tracked_objects.records[0]) ;
//   voltmx.store.setItem("name", "sudhanva")
//   voltmx.store.setItem("data", get_tracked_objects.records[0])
  
//   alert("one :"+get_tracked_objects);
//   alert("two :"+get_tracked_objects.records[0]);
//   alert("three :"+get_tracked_objects.records[0].title);
  
  
 
  
  var htmlData = "<!DOCTYPE html><html lang='ar' dir='rtl'> <head>   <meta charset='UTF-8' />   <title>وثيقة بيع مركبة</title>   <style>     /* Import Dubai font */     @import url('https://fonts.googleapis.com/css2?family=Dubai:wght@400;500;700&display=swap');     body {       font-family: 'Dubai', sans-serif;       margin: 0;       padding: 0;       background: #fff;       font-size: 16px;       line-height: 1.8;     }     table {       border-collapse: collapse;     }     td {       padding: 0 7.5px;       vertical-align: top;     }     p {       margin: 0px;       font-size: 16px;       color: #000;     }     h1 {       font-size: 24px;       text-align: center;       font-weight: bold;       margin: 0px;     }     h4 {       font-size: 12px;       text-align: center;       font-weight: bold;       margin: 0px;     }     .notice {       background: #9e9e9e;       color: #fff;       font-weight: bold;       text-align: center;       border: 1px solid #000;       padding: 6px;     }     .signature {       font-weight: bold;       font-family: 16px;     }     .qr-footer {       display: flex;       justify-content: space-between;       gap: 15px;       margin-top: 15px;       align-items: center;     }     .qr-footer img {       width: 120px;       height: 120px;     }     .footer-text {       font-size: 12px;       line-height: 1.6;       text-align: right;     }   </style> </head> <body>   <div        style='width:727px; margin:10px auto 10px 10px; border:1.5px solid #9a9a9a; padding:10px; box-sizing:border-box;'>     <div style='margin-top: -2rem;'>       <table border='0' cellspacing='0' cellpadding='4' width='100%'>         <!-- HEADER -->         <tr>           <td align='right' width='50%'>             <img style='width: 210px;aspect-ratio: auto 210 / 75;height: 75px;'                  src='https://uat-alwataneya.et.ae/PA_Operations/resources/image/logo_new4.png'>           </td>           <td align='left' width='50%'>             <img style='height: 70px;' src='https://uat-alwataneya.et.ae/PA_Operations/resources/image/print_logo2.jpg'                  width='210' height='75'>           </td>         </tr>         <!-- GREETING -->         <tr>           <td colspan='2'>             <p>السادة / إدارة المرور والترخيص المحترمين ....</p>           </td>         </tr>         <!-- TITLE -->         <tr>           <td colspan='2'>             <h1>وثيقة بيع مركبة</h1>           </td>         </tr>         <!-- DATE + AUCTION NO -->         <tr>           <td>             <p><b>التاريخ:</b> "+get_tracked_objects.records[0].bid_close_date+"</p>             <!--             <p><b>التاريخ:</b> <p id='name'></p></p> -->           </td>           <td>             <p><b>رقم المزاد:</b> "+get_tracked_objects.records[0].lot_no+ " " +get_tracked_objects.records[0].batch_name+"</p>           </td>         </tr>         <!-- INTRO -->         <tr>           <td colspan='2' style='font-size: 17.3333px; font-weight: bold;'>تشهد مؤسسة الإمارات العامة للنقل والخدمات (مواصلات الإمارات - الوطنية للمزادات) (الطرف الأول) .. ببيع المركبة التالي بياناتها:</td>         </tr>         <!-- VEHICLE INFO -->         <tr>           <td>                         <p><b>نوع المركبة:</b> "+get_tracked_objects.records[0].title+"</p>           </td>           <td><b>سنة الصنع:</b> "+get_tracked_objects.records[0].year_of_make+"</p>         </td>       </tr>     <tr>       <td>         <p><b>رقم الهيكل:</b> "+get_tracked_objects.records[0].chassis_number+"</p>       </td>       <td>         <p><b>الرقم الداخلي:</b> "+get_tracked_objects.records[0].oracle_number+"</p>       </td>     </tr>     <!-- BUYER -->     <tr style='height: 50px;'>       <td>         <p><b>وقد بيعت للسيد:</b> "+get_tracked_objects.records[0].buyer_name+"</p>       </td>       <td>         <p><b>ورقم هاتفه:</b> "+get_tracked_objects.records[0].buyer_mobile_number+"</p>       </td>     </tr>     <tr>       <td colspan='4' height='26'></td>     </tr>     <!-- CONFIRM -->     <tr>       <td colspan='2'>         وبصفته المشتري (الطرف الثاني)، وقد قام المذكور بسداد قيمة المركبة المذكورة كاملاً ولا مانع من نقل ملكيتها         له.       </td>     </tr>     <!-- SIGNATURE LABELS -->     <tr>       <td class='signature'>الطرف الأول - مدير مركز بيع المركبات</td>       <td class='signature'>الطرف الثاني - المشتري</td>     </tr>     <tr>       <td style='height: 20px;'></td>     </tr>     <!-- SIGNATURE IMAGE -->     <tr>       <td><img style='height: 40px;position: relative;' src='https://uat-alwataneya.et.ae/PA_Operations/resources/image/newSignature.png'></td>       <td>&nbsp;</td>     </tr>     <tr>       <td style='height: 33.53333333333333px;' colspan='2'></td>     </tr>     <!-- NOTICE -->     <tr>       <td colspan='2'>         <table align='center' width='623' border='0' cellspacing='0' cellpadding='0' style='border-collapse:collapse;'>           <tr>             <td align='center' style='                                       place-items: center;                                       width:100%;                                       border: double windowtext 1.5pt;                                                   background: #9e9e9e;                                                        color: #fff;                                                                 padding: 0cm 5.4pt 0cm 5.4pt;                                                     height: 25.15pt;                                                           font-size: 12.0pt;                                                           font-weight: 400;                                                           text-align: center;                                       -webkit-print-color-adjust: exact;                                       print-color-adjust: exact;                                       box-sizing: border-box;                                       '>               خاص بتسليم المركبات             </td>           </tr>         </table>       </td>     </tr>     <tr>       <td colspan='4' height='60'></td>     </tr>     <!-- DELIVERY TEXT -->     <tr>       <td colspan='2'>         أقر أنا الموقع أدناه بأنني استلمت المركبة المذكورة بعد المعاينة اللازمة وأتعهد بسحب المركبة خلال 3 أيام،         وأني على علم بأن أية ضمانات منصوص عليها بالمزاد تسقط بعد 3 أيام من سدادي لقيمة المركبة، كما أتعهد بإزالة         هوية وشعارات المؤسسة وعدم استخدام المركبة أو عرضها للبيع إلا بعد إزالة الهوية والشعارات تماماً.       </td>     </tr>     <tr>       <td colspan='4' height='32'></td>     </tr>     <!-- DELIVERY SIGNATURE -->     <tr>       <td class='signature'>إعتماد مسئول التسليم:</td>       <td class='signature'>توقيع المستلم:</td>     </tr>     <br>     <!-- QR + FOOTER -->     <!-- DISTRIBUTION -->     </table>   </div> <div class='qr-footer'>   <div class='footer-text'>     <b>شهادة الكترونية</b> يمكن التحقق من صحة هذه الشهادة من خلال مسح رمز الباركود الموجود. <br> <br>     <b>ملاحظة:</b> اذا واجهت اي مشكلة في التحقق، يرجى التواصل عبر البريد الإلكتروني     <a href='mailto:etcares@et.ae'>etcares@et.ae</a>   </div>   <div style='margin-bottom: 3rem;'>     <img src='https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://alwataneya.ae/seller-buyer/sales-documents?obj="+get_tracked_objects.records[0].object_id+"' alt='QR Code' />   </div> </div> <h4 style='margin: 0px;'>التوزيع: النسخة للمشتري | النسخة الأصلية لجهة نقل الملكية | نسخة للشؤون الإدارية</h4> </div></body></html>";
//       "<h1>hello world</h1>";
  self.view.Browser0bce43188ceea42.htmlString=htmlData;
  self.view.Browser0bce43188ceea42.centerY = "23%";
   self.view.Browser0bce43188ceea42.setVisibility(true);
  
    }
    else
    {
      
    }
  } else if (
    get_tracked_objects &&
    (get_tracked_objects.httpStatusCode === 401 || get_tracked_objects.opstatus === 1001)
  ) {
    // Token expired or unauthorized
   
    // Optionally redirect to login screen here
  } else {
    // Generic error handler
//     alert("Something went wrong while fetching favourites. Please try again later.");
   
  }
    }
    if (get_tracked_objects_inputparam == undefined) {
        var get_tracked_objects_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid =  voltmx.store.getItem("userId");
    get_tracked_objects_inputparam["serviceID"] = "fry_int_common$get-salesdocument-details";
    get_tracked_objects_inputparam["object_id"] = objid;
    
    var get_tracked_objects_httpheaders = {
      "user_token": usertoken
    };
    get_tracked_objects_inputparam["httpheaders"] = get_tracked_objects_httpheaders;
    var get_tracked_objects_httpconfigs = {};
    get_tracked_objects_inputparam["httpconfig"] = get_tracked_objects_httpconfigs;
    fry_int_common$get_salesdocument_details = mfintegrationsecureinvokerasync(get_tracked_objects_inputparam, "fry_int_common", "get-salesdocument-details", invServiceCallBack);
   });
   
   
   
   
   
   
   
  
},
  
  
  
  
 
downloadOnClick: function(response) {
  var fileUrl = response.file_url;
  var self = this;
  var deviceName = voltmx.os.deviceInfo().name; 

  if (fileUrl && typeof fileUrl === "string" && fileUrl.startsWith("http")) {
    voltmx.application.showLoadingScreen(null, "Downloading...",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});

    try {
//       var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    
      var now = new Date();

      // Format: yyyyMMdd_HH
      var year = now.getFullYear();
      var month = (now.getMonth() + 1).toString().padStart(2, '0');
      var day = now.getDate().toString().padStart(2, '0');
      var hour = now.getHours().toString().padStart(2, '0');

      var randomNum = Math.floor(Math.random() * 1000); 

//       var extension = "pdf";
//       if (fileUrl.lastIndexOf(".") !== -1) {
//         extension = fileUrl.substring(fileUrl.lastIndexOf(".") + 1);
//       }

//       var fileName = "saleletter_" +
//           year + month + day + "_" + hour + "_" +
//           randomNum + "." + ".pdf";
      
               var fileName = "saleletter_" + Date.now();


   

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



///76715---nissan patrol 2025(vehicle insepcetion----UAT)
///84399--Bentley (vehicle insepcetion----DEV)