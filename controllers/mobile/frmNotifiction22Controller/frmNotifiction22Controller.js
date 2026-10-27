define({ 

  onNavigate: function(){
    this.view.flxBack.onClick=this.backTo.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    
   
  },
  
  onPreShow: function(){
   this.toggleFooterIcons();
   this.getNotifications();
   this.adjustRTLLayout();
  },
  
  
  
  
  getNotifications: function(){
  voltmx.application.showLoadingScreen(
    null,
    "Loading..",
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

  var self = this;
  var get_notifications_inputparam = {};
  var userId = voltmx.store.getItem("userId");
  var userToken = voltmx.store.getItem("getUserAccesstoken");

  get_notifications_inputparam["serviceID"] = "fry_int_common$get-notifications";
  get_notifications_inputparam["user_id"] = userId;
  get_notifications_inputparam["page"] = "1";
  get_notifications_inputparam["pageSize"] = "50";

  var get_notifications_httpheaders = {
    "user_token": userToken
  };
  get_notifications_inputparam["httpheaders"] = get_notifications_httpheaders;
  get_notifications_inputparam["httpconfig"] = {};

  fry_int_common$get_notifications = mfintegrationsecureinvokerasync(
    get_notifications_inputparam,
    "fry_int_common",
    "get-notifications",
    function(status, response) {
      voltmx.print("Status :" + status);
      voltmx.print("Response :" + response);

      if (response && response.records) {
        var count = response.records.length;
        var intCount = parseInt(count);
          
        voltmx.print("Total notifications: " + intCount);
        self.view.lblCount.text = voltmx.i18n.getLocalizedString("Notifications");
//           + "(" + intCount + ")";
        self.setNotifications(response);
      } else {
        alert("No Records Found!!");
        self.view.lblCount.text = voltmx.i18n.getLocalizedString("Notifications");
      }

      voltmx.application.dismissLoadingScreen();
    }
  );
},
//   ================
//    "records": [
//         {
//             "message_id": "21",
//             "user_id_message_to": "422bf156-df44-441f-8ffa-c937b4c8d561",
//             "message_to": "praveen_vallakati",
//             "user_id_message_from": "5c31edc8-56ac-4017-894a-5c1b56ca1195",
//             "message_from": "unifi1",
//             "message": "My reply ",
//             "send_on": "2025-03-16 12:21:48.0",
//             "read_at": "2025-07-31 10:51:42.933",
//             "type": "messages",
//             "status": "Seen",
//             "total_pages": "1",
//             "total_count": "4"
//   ==================
  
setNotifications: function(response) {
  var self = this;
  
  self.view.segNotification.widgetDataMap = {
    "lblUserName": "lblUserName",
    "lblCommented": "lblCommented",
    "lblday": "lblday",
    "lblApproved": "lblApproved",
    "lblDay02": "lblDay02",
    "imgUser": "imgUser",
    "imgMessage": "imgMessage",
    "imgBellIcon": "imgBellIcon",
    "flxNotifications": "flxNotifications",
    "flxMessageImg": "flxMessageImg"
};
  
  var records = response.records;
//   var records = [];

// if (response && Array.isArray(response.records)) {
//     records = response.records.filter(function(item) {
//         return item && item.type === "notification";
//     });
// }
  var NotificationsData = [];

  records.forEach(function(res) {
    var type = res.type;
    var commentStatus = "";
    var notifyStatus = false;
   var senton = convertUTCToFormattedLocalNotifications(res.send_on);
    if (type === "message") {
      commentStatus = res.message;
      notifyStatus = true;
    } else if (type === "notification") {
      commentStatus = res.message;
      notifyStatus = false;
    }
    var notificationRow = {
      "lblUserName": res.message_from,
      "lblCommented": commentStatus,
      "lblday": senton,
//       "lblApproved": res.message,
//       "lblDay02": res.send_on,
      "imgUser": {
        "src": "user__1_1.png"
      },
      "imgMessage": "notificationdots512h.png",
      "imgBellIcon": "bellrounded512h.png",
      "flxNotifications": {
        "isVisible": false
      },
      "reference_id": res.reference_id,
      "flxMessageImg": {
        "isVisible": notifyStatus,
        "onClick": self.navToAccountMessages.bind(self)
      }
    };

    NotificationsData.push(notificationRow);
  });

  self.view.segNotification.setData(NotificationsData);
  voltmx.application.dismissLoadingScreen();
},  
  
  
  navToAccountMessages: function(){
    var self = this;
    var selectedRows = self.view.segNotification.selectedRowItems;
   var referenceId;
if (selectedRows && selectedRows.length > 0) {

    var selectedRow = selectedRows[0];

     referenceId = selectedRow.reference_id;

    voltmx.print("Reference ID: " + referenceId);

} else {
    voltmx.print("No row selected");
}
         
    var ntf = new voltmx.mvc.Navigation("frmAccountantMessages");
    ntf.navigate({
      "reference_id": referenceId
    });
  },
  
    backTo: function(){
            voltmx.application.dismissLoadingScreen();
    var nav= new voltmx.mvc.Navigation("frmProfile");
    nav.navigate(); 
  },
  
   adjustRTLLayout: function() {
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
//      var keys = voltmx.i18n.getSupportedLocales();
     
//      voltmx.print(keys);
//      for(var i = 0 ;i<keys.length ; i++){
//        var keyvalue = 
//      }
     
     
     if (isArabic) {
  this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
       var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.backNav.transform = flipTransform;
 

} else {
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
  this.view.backNav.transform = voltmx.ui.makeAffineTransform();
}
     
     
     this.view.flxNotification.reverseLayoutDirection = isArabic;
     this.view.flxNotificationsHeading.reverseLayoutDirection = isArabic;
     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
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
  
  
 

 });