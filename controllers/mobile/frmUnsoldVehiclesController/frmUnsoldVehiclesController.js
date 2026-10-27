define({

  onNavigate: function(){
    
    this.adjustRTLLayout();
    this.view.preShow = this.onPreShow;
    this.view.flxBack.onClick = this.BackNavigation;
//     this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.tbxSearch.onTextChange = this.applySearch.bind(this);
     this.view.postShow = this.onPostShow.bind(this);
    this.view.btnCheckStatusRelist.onClick = () => {
      new voltmx.mvc.Navigation("frmUnderReview").navigate();
      this.view.flxRelistedPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    },
    this.view.btnGoToHome.onClick = () => {
       new voltmx.mvc.Navigation("frmDashBoard").navigate();
      this.view.flxArchivePopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }
    this.view.SmthngWentWrong.btnClose.onClick = () =>{
     this.view.SmthngWentWrong.setVisibility(false);
   }
   this.view.btnCloseReCallPopup.onClick = () =>{
     this.view.flxRecalPopup.setVisibility(false);
     this.view.flxOverLay.setVisibility(false); 
   }
   this.view.flxRemoveRecallPopup.onClick = () =>{
     this.view.flxRecalPopup.setVisibility(false);
     this.view.flxOverLay.setVisibility(false); 
   }
   
   this.view.flxRemoveBidSuccessPopup.onClick = () =>{
    this.view.flxRelistedPopup.setVisibility(false);
     this.view.flxOverLay.setVisibility(false); 
   }
   
//    this.view.segUnsoldVehicles.onRowClick = this.onRowClickAction.bind(this);
     this.view.btnOk.onClick = this.invokeServiceWithSearch.bind(this);
  },
  onPreShow: function(){
    var self = this;
    loginToDam();
     this.view.tbxSearch.text = "";
    this.pageSize = 10;
    this.currentOffset = 0;
     this.lot = "";
     this.title = ""; 
    this.view.segUnsoldVehicles.setData([]);
    this.toggleFooterIcons();
    self.getUnsoldVehicles();
     self.view.flxArchivePopup.setVisibility(false);
     self.view.flxOverLay.setVisibility(false);
     self.view.flxRelistedPopup.setVisibility(false);
     self.view.btnLoadMore.setVisibility(false);
    self.view.flxRecalPopup.setVisibility(false);
    if (this.view.btnOk) {
    this.view.btnOk.setVisibility(false);
}
    
       if(self.view.SmthngWentWrong){
      self.view.SmthngWentWrong.setVisibility(false);
    }
    if(self.view.SmthngWentWrong){
     self.view.SmthngWentWrong.btnClose.onClick = () => {
      self.view.SmthngWentWrong.setVisibility(false);
    }
    }
    
     
  },
  
   BackNavigation: function(){
    var ntf = new voltmx.mvc.Navigation("frmOpenMyVehicles");
    ntf.navigate();
  },
  
   onPostShow: function()
  {
    this.view.btnLoadMore.setVisibility(false);
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.view.flxRemoveArchivePopup.onClick = ()=>{
      this.view.flxOverLay.setVisibility(false);
     this.view.flxArchivePopup.setVisibility(false);
    }
    
  },
  
   applySearch: function() {
   var self = this;
var hasText = false;

if (self.view.tbxSearch && typeof self.view.tbxSearch.text === "string") {
    hasText = self.view.tbxSearch.text.trim() !== "";
}

if (self.view.btnOk) {
    self.view.btnOk.setVisibility(hasText);
}
     if (!hasText) {
        self.invokeServiceWithSearch();
    }
},
  invokeServiceWithSearch: function()
  {
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segUnsoldVehicles.setData([]);
    this.view.btnLoadMore.setVisibility(false);
   var searchText = (self.view.tbxSearch && self.view.tbxSearch.text ? self.view.tbxSearch.text : "").trim();


//     if (!searchText) return;

    // Decide which field to use
    if (!isNaN(searchText)) {
        self.lot = searchText;
        self.title = "";  // clear the other
    } else {
        self.title = searchText;
        self.lot = "";    // clear the other
    }

    self.getUnsoldVehicles();
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
    
   var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
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
  
   
  
   onLoadMoreClick: function()
  {
     this.pageSize += 10;
  this.getUnsoldVehicles();
  },
   setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.segUnsoldVehicles.setData(self.originalSegData);
    self.view.lblNorecords.setVisibility(false);
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return item.lblCarName.text.toLowerCase().includes(searchText);
  });

  self.view.segUnsoldVehicles.setData(filteredData);
    
     if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
//   self.view.btnLoadMore.setVisibility(true);
}  
    
  },
  
  getUnsoldVehicles: function(){
    var self = this;
     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });;
     checkTokenValidatity(function() {
        var get_unsold_vehicles_inputparam = {};
//        var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
     var currentLocale = voltmx.i18n.getCurrentLocale() === "ar_AE" ? "ar" : "en";
   
//     var userObj = voltmx.store.getItem("userObject");
    
    get_unsold_vehicles_inputparam["serviceID"] = "fry_int_post_auction$get-unsold-vehicles";
    var get_unsold_vehicles_httpheaders = {
                    "user_token": usertoken

    };
     get_unsold_vehicles_inputparam["title"] = self.title || "";
     get_unsold_vehicles_inputparam["lot_no"] = self.lot || "";
     get_unsold_vehicles_inputparam["location"] ="";
     get_unsold_vehicles_inputparam["chassis_number"] ="";
     get_unsold_vehicles_inputparam["end_date"] ="";
     get_unsold_vehicles_inputparam["seller_data"] ="";
     get_unsold_vehicles_inputparam["buyer_data"] ="";
     get_unsold_vehicles_inputparam["asset_id"] ="ALL";
     get_unsold_vehicles_inputparam["page_number"] ="1";
     get_unsold_vehicles_inputparam["page_size"] = String(self.pageSize);
     get_unsold_vehicles_inputparam["seller_type"] ="";
     get_unsold_vehicles_inputparam["language"] =currentLocale;
    
    get_unsold_vehicles_inputparam["httpheaders"] = get_unsold_vehicles_httpheaders;
    var get_unsold_vehicles_httpconfigs = {};
    get_unsold_vehicles_inputparam["httpconfig"] = get_unsold_vehicles_httpconfigs;
    fry_int_post_auction$get_unsold_vehicles =
      mfintegrationsecureinvokerasync(get_unsold_vehicles_inputparam, 
                                      "fry_int_post_auction",
                                      "get-unsold-vehicles",
                                      function(status,response){
//       alert("response from unsold:"+JSON.stringify(response));
//       alert("response from unsold without json :"+response);
      voltmx.application.dismissLoadingScreen();
      var data = response.records;
                  if (Array.isArray(data) && data.length > 0) {
                    self.view.lblNorecords.setVisibility(false);
          self.setDataToSegUnsold(data);
                  }
       else
        {
           self.view.lblNorecords.setVisibility(true);
        self.view.btnLoadMore.setVisibility(false);
        }
    });
     });
},
  
  setDataToSegUnsold: function(records)
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var damAvailable = voltmx.store.getItem("isDamAvailable");
    self.view.segUnsoldVehicles.widgetDataMap = {
  "imgCardata": "imgCardata",
  "lblCarName": "lblCarName",
  "lblLot": "lblLot",
  "lblLotValue": "lblLotValue",
  "lblLocation": "lblLocation",
  "lblLocationValue": "lblLocationValue",
  "lblHighestBid": "lblHighestBid",
  "lblHighestBidValue": "lblHighestBidValue",
  "flxRecallAndArchive": "flxRecallAndArchive",
  "btnRelist": "btnRelist",
  "btnRecall": "btnRecall",
  "btnArchive": "btnArchive",
  "lblContactSupport": "lblContactSupport",
  "flxContactSupportInner": "flxContactSupportInner",
      "flxEditAndRelistButtons":"flxEditAndRelistButtons",
};

     var segData = [];
    
    var newRecords = records.slice(self.currentOffset);
    
     for(var i=0;i<newRecords.length;i++)
      {
        var item = newRecords[i];
        segData.push({
          "imgCardata" : {
        "src":(damAvailable && isValidURL(item.file_url)) ? item.file_url : "noimage.png",
        "imageWhileDownloading": "loading.gif"},
          "objid": item.object_id,
//           "lblCarName" : item.auction_title || "N/A",
             "lblCarName": {
        "text": item.auction_title || "N/A",
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLot"    : "Lot#",
            "lblLot": {
        "text": voltmx.i18n.getLocalizedString("Lot #"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
          
//           "lblLotValue"    : item.id || "N/A",
           "lblLotValue": {
        "text": item.id || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblLocation"    :"Location",
             "lblLocation": {
        "text": voltmx.i18n.getLocalizedString("Location"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
//           "lblLocationValue" :item.location || "N/A",
             "lblLocationValue": {
        "text": item.location || "N/A",
        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
//           "lblHighestBid"   :"Highest Bid",
//           "lblHighestBidValue": item.max_bid || "N/A",
          "btnEdit" : {
          "text"  : voltmx.i18n.getLocalizedString("Highest_bid"),
          "skin"  :"sknbtnBGffffffRoundedBorder1px000000Font231f2045px",
           "isVisible": false
//           "onClick" : 
        },
          
          "lblHighestBid": {
        "text": voltmx.i18n.getLocalizedString("higest Bid"),
        "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT
      },
             "lblHighestBidValue": {
        "text": item.max_bid != null
          ? Number(item.max_bid).toLocaleString("en-AE")
          : "N/A",

        "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
        "contentAlignment": isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT
      },
          "flxRecallAndArchive" :{
            "isVisible": true
          },
          "btnRelist" :{
            "text" : voltmx.i18n.getLocalizedString("relist"),
              "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
            "skin" : "sknBtn61b35cDubai45pxmedium",
            "onClick" : this.onRelistButtonClick.bind(this)
          },
          
          "btnRecall" :{
            "text" : voltmx.i18n.getLocalizedString("recall"),
          "skin"  :"sknbtnBGffffffRoundedBorder1px000000Font231f2045px",
            "onClick": this.onRecall.bind(this),
            "isVisible": false
            
          },
          "btnArchive": {
            "text" : voltmx.i18n.getLocalizedString("archive"),
            "skin" :"sknbtnBGffffffRoundedBorder1px000000Font231f2045px",
             "right": isArabic ? "" : "0dp",
        "left": isArabic ? "0dp" : "",
             "onClick" : this.archiveVehicle.bind(this),
            "isVisible": true
          },
          "imgContct" : "contactsupport512h.png",
          "lblContactSupport" : voltmx.i18n.getLocalizedString("contact support"),
          "flxBottomLineContactSupport" : {
            "skin": "sknflxBg231F20Opacity10per"
          },  
          "flxContactSupportInner" : {
            "onClick": this.goToContactPage.bind(this),
             "right": isArabic ? "0dp" : "",
        "left": isArabic ? "" : "0dp"
          }
        });
    
      }
//      self.originalSegData = segData;
    
    if (!self.originalSegData || self.currentOffset === 0) {
  self.originalSegData = segData;
} else {
  self.originalSegData = self.originalSegData.concat(segData);
}
    
     self.view.segUnsoldVehicles.addAll(segData);
    

    if (self.pageSize > records.length) {
    self.view.flxSegUnsoldVehicles.height = "90%";
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.flxSegUnsoldVehicles.height = "80%";
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;

  },
  
  onRowClickAction: function()
  {
    var selectedItem = this.view.segUnsoldVehicles.selectedRowItems;
    voltmx.store.setItem("lastFormId", voltmx.application.getCurrentForm().id);

   
     voltmx.store.setItem("previousFormForServices", "frmUnsoldVehicles");
//      var  currentAuctionNavigation =  voltmx.store.getItem("previousFormForServices");
    
    
    
    if (selectedItem && selectedItem.length > 0) {
        var objectid = selectedItem[0].objid;

     
        new voltmx.mvc.Navigation("frmDetails").navigate({
            "objid": objectid
        });
    } else {
        
        voltmx.print("No row selected in segLiveAuctions.");
    }
    
    
  },
  
  onRecall: function()
  {
    
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
     var selectedItem = this.view.segUnsoldVehicles.selectedRowItems[0];
  if (selectedItem && selectedItem.objid) {
    this.callWfStatusToRecall(selectedItem.objid);
  } else {
    voltmx.print("Error: No selected item or missing objid");
  }
  },
  
  callWfStatusToRecall: function(objid)
  {
      var self = this;

//     function doneCallBack(status, fleet_wfstatus) {
//       voltmx.application.dismissLoadingScreen();
//       voltmx.print(fleet_wfstatus);
//       if(fleet_wfstatus.user_message && fleet_wfstatus.user_message === "Your Vehicle has moved from Vehicle For Submission to Vehicle Submission Acceptance.")
//         {
//           self.view.flxRecalPopup.setVisibility(true);
//           self.view.flxOverLay.setVisibility(true);
//         }
//       else{
//         alert(fleet_wfstatus.user_message);
//       }
      
//     }
    
    function doneCallBack(status, fleet_wfstatus) {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(fleet_wfstatus);

    var msg = "";

    if (fleet_wfstatus.user_message && fleet_wfstatus.user_message === "Your Vehicle has moved from Vehicle For Submission to Vehicle Submission Acceptance.") {
        self.view.flxRecalPopup.setVisibility(true);
        self.view.flxOverLay.setVisibility(true);
        return; // no need to show alert in this special case
    }

    // If user_message exists, use it first
    if (fleet_wfstatus.user_message) {
        msg = fleet_wfstatus.user_message;
    }
    // If error.message exists, append or use it
    else if (fleet_wfstatus.error && fleet_wfstatus.error.message) {
        msg = fleet_wfstatus.error.message;
    }
    // If errmsg exists, use it as a fallback
    else if (fleet_wfstatus.errmsg) {
        msg = fleet_wfstatus.errmsg;
    }
    // Fallback generic message
    else {
        msg = "Something went wrong. Please  try again later.";
    }
    if(self.view.SmthngWentWrong)
    {
      self.view.SmthngWentWrong.setVisibility(true);
      self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
    }
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objid;
    fleet_wfstatus_inputparam["action_name"] = "Recall";
//     fleet_wfstatus_inputparam["comments"] = "";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", doneCallBack);

  },
    
onRelistButtonClick: function(eventobject, context) {
  this.relistCall(context);
},

relistCall: function(context) {
  var rowIndex = context.rowIndex;
  var segData = this.view.segUnsoldVehicles.data;

  if (rowIndex == null || rowIndex === undefined) {
    return;
  }

  var selectedItem = segData[rowIndex];
  if (!selectedItem || !selectedItem.objid) {
    return;
  }

  this.invokeRelistService1(selectedItem.objid, rowIndex);
},

  invokeRelistService1: function(objid, rowIndex) {
  var self = this;

  function invokeRelistCallBack(status, fleet_wfstatus) {
    voltmx.print(fleet_wfstatus);

    if (
      fleet_wfstatus &&
      fleet_wfstatus.opstatus === 0 &&
      (
        fleet_wfstatus.httpStatusCode === 200 ||
        (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)
      ) &&
      fleet_wfstatus.data
    ) {
      // ✅ Show success popup
      self.view.flxRelistedPopup.setVisibility(true);
      self.view.flxOverLay.setVisibility(true);

      // ✅ Remove relisted row safely
      if (typeof rowIndex === "number") {
        self.view.segUnsoldVehicles.removeAt(rowIndex);

        // Optional: handle empty list
        if (self.view.segUnsoldVehicles.data.length === 0) {
          self.view.lblNorecords.setVisibility(true);
          self.view.btnLoadMore.setVisibility(false);
        }
      }
      return;
    }

    // Handle errors gracefully
    var msg = fleet_wfstatus.user_message ||
              (fleet_wfstatus.error && fleet_wfstatus.error.message) ||
              fleet_wfstatus.errmsg ||
              "Something went wrong. Please try again later.";

    if (self.view.SmthngWentWrong) {
      self.view.SmthngWentWrong.setVisibility(true);
      self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
    }
  }

  // Prepare and call service
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var fleet_wfstatus_inputparam = {
    serviceID: "ms_fleet$fleet-wfstatus",
    object_id: objid,
    action_name: "Relist",
    httpheaders: { "user_token": usertoken },
    httpconfig: {}
  };

  mfintegrationsecureinvokerasync(
    fleet_wfstatus_inputparam,
    "ms_fleet",
    "fleet-wfstatus",
    invokeRelistCallBack
  );
},

  
  relistVehicle: function()
  {
    var self = this;
   var selectedRow = self.view.segUnsoldVehicles.selectedRowItems;
  if (selectedRow && selectedRow.length > 0) {
    var objid = selectedRow[0].objid;
    self.invokeRelistService(objid);
  } else {
//     alert("no row selected");
  }
  },
  
  invokeRelistService: function(objid)
  {
    
    var self = this;

//     function invokeRelistCallBack(status, fleet_wfstatus) {
//       voltmx.print(fleet_wfstatus);
//       if(fleet_wfstatus.user_message === "Your Vehicle has moved from Unsold to Vehicle Submission Acceptance."){
//         self.view.flxRelistedPopup.setVisibility(true); 
//         self.view.flxOverLay.setVisibility(true);
//       }
//       else
//         {
//           alert(fleet_wfstatus.user_message);
//         }
//     }
    
    function invokeRelistCallBack(status, fleet_wfstatus) {
    voltmx.print(fleet_wfstatus);

   
//     if (fleet_wfstatus.user_message === "Your Vehicle has moved from Unsold to Vehicle Submission Acceptance.") {
//         self.view.flxRelistedPopup.setVisibility(true);
//         self.view.flxOverLay.setVisibility(true);
//         return; 
//     }

      if (
    fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (
      fleet_wfstatus.httpStatusCode === 200 ||
      (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)
    ) &&
    fleet_wfstatus.data
  ) {
    voltmx.print("Fleet status updated successfully.");
        self.view.flxRelistedPopup.setVisibility(true);
      
        self.view.flxOverLay.setVisibility(true);
        return;
      }
    
    var msg = "";

    if (fleet_wfstatus.user_message) {
        msg = fleet_wfstatus.user_message;
//         alert(msg); 
    }
    else if (fleet_wfstatus.error && fleet_wfstatus.error.message) {
        msg = fleet_wfstatus.error.message;
    }
    else if (fleet_wfstatus.errmsg) {
        msg = fleet_wfstatus.errmsg;
    }
    else {
        msg = "Something went wrong. Please try again later.";
    }

    
    if (!fleet_wfstatus.user_message && self.view.SmthngWentWrong) {
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
    }
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objid;
    fleet_wfstatus_inputparam["action_name"] = "Relist";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", invokeRelistCallBack);

    
  },
  
  archiveVehicle: function()
  {
     var self = this;
   var selectedRow = self.view.segUnsoldVehicles.selectedRowItems;
  if (selectedRow && selectedRow.length > 0) {
    var objid = selectedRow[0].objid;
    self.invokeArchiveService(objid);
  } else {
//     alert("no row selected");
  }
  },
  
  invokeArchiveService: function(objid)
  {
    
     var self = this;


    
    function invokeArchiveCallBack(status, fleet_wfstatus) {
    voltmx.print(fleet_wfstatus);

      
        if (
    fleet_wfstatus &&
    fleet_wfstatus.opstatus === 0 &&
    (
      fleet_wfstatus.httpStatusCode === 200 ||
      (fleet_wfstatus.httpresponse && fleet_wfstatus.httpresponse.responsecode === 200)
    ) &&
    fleet_wfstatus.data
  ) {
   self.view.flxArchivePopup.setVisibility(true); 
         self.view.CopylblSuccessMsg0gd8f913870be4b.text = voltmx.i18n.getLocalizedString("Vehicle Has Been Archived");
        self.view.flxOverLay.setVisibility(true);
        return; 
      }

    
    var msg = "";
    if (fleet_wfstatus.user_message) {
        msg = fleet_wfstatus.user_message;
    } else if (fleet_wfstatus.error && fleet_wfstatus.error.message) {
        msg = fleet_wfstatus.error.message;
    } else if (fleet_wfstatus.errmsg) {
        msg = fleet_wfstatus.errmsg;
    } else {
        msg = "Something went wrong. Please try again later.";
    }

    if (self.view.SmthngWentWrong) {
        self.view.SmthngWentWrong.setVisibility(true);
        self.view.SmthngWentWrong.lblSomethingWentWrong.text = msg;
    } 
}

    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objid;
    fleet_wfstatus_inputparam["action_name"] = "Archive";
    var fleet_wfstatus_httpheaders = {
      "user_token": usertoken
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", invokeArchiveCallBack);
    
  },
  
  adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//      var keys = voltmx.i18n.getSupportedLocales();
     
//      voltmx.print(keys);
//      for(var i = 0 ;i<keys.length ; i++){
//        var keyvalue = 
//      }
   this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
//     this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
//         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
     this.view.flxSearchContainer.reverseLayoutDirection = isArabic;
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
     this.view.tbxSearch.placeholder = voltmx.i18n.getLocalizedString("Search Unsold vehicles");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load more");
    this.view.lblNorecords.text = voltmx.i18n.getLocalizedString("No Records");
     this.view.lblUnSoldVehicles.text = voltmx.i18n.getLocalizedString("Unsold Vehicles");
    this.view.btnGoToHome.text =  voltmx.i18n.getLocalizedString("Go To Home Page");
    
     this.view.flxSegRowHeading.reverseLayoutDirection = isArabic;
     if (isArabic) {
       this.view.lblUnSoldVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
       this.view.flxBack.left = "";
       this.view.flxBack.right = "0dp";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;

     }
     else{
       this.view.lblUnSoldVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
       this.view.flxBack.left = "0dp";
       this.view.flxBack.right = "";
       this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
       this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;

     }
     
     
     
   },
  
  goToContactPage: function()
  {
     voltmx.store.setItem("contactBackForm","frmUnsoldVehicles");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
  }

});
