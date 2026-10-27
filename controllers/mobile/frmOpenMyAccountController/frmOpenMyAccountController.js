define({ 

 onNavigate: function(){
   
   this.setDataToBuyerSegment();
   this.setDataToSellerSegment();
   this.adjustRTLLayout();
   this.view.preShow = this.onPreShow.bind(this);
   
   this.view.flxBackNavigateIcon.onClick = this.backToPreviousForm.bind(this);
   this.view.btnDelete.onClick = this.deleteProfile.bind(this);
   //this.view.btnCancel.onClick = this.closeDeletePopup.bind(this);
   this.view.flxClose.onClick = this.closeDeletePopup.bind(this);
   this.view.btnCancel.onClick = this.closeDeletePopup.bind(this);
   if(this.view.segMyAccountItemsBuyer){
   this.view.segMyAccountItemsBuyer.onRowClick  = this.segMyAccountItemsBuyerOnRowClickAction.bind(this);
   }
   if(this.view.segMyAccountItemsSeller)
     {
       this.view.segMyAccountItemsSeller.onRowClick = this.segMyAccountItemsSellerOnRowClickAction.bind(this);
     }
//    if(this.view.btnCancel)
//    {
//      this.view.btnCancel.onClick = function()
//      {
//        this.view.flxOverLay.setVisibility(false);
//        this.view.flxDeleteMyAccount.setVisibility(false);
//      }
//    }
 },
  
  onPreShow: function()
  {
    this.mode = voltmx.store.getItem("mode") || "seller";
    if(this.mode === "buyer")
      {
        this.view.segMyAccountItemsBuyer.setVisibility(true);
        this.view.segMyAccountItemsSeller.setVisibility(false);
      }
    else{
      this.view.segMyAccountItemsBuyer.setVisibility(false);
        this.view.segMyAccountItemsSeller.setVisibility(true);
    }  
  },
  
  backToPreviousForm: function() {
  
    var x = new voltmx.mvc.Navigation("frmProfile");
    x.navigate();
  
},
  segMyAccountItemsBuyerOnRowClickAction: function(){
    var selectedProfileItems = this.view.segMyAccountItemsBuyer.selectedRowItems;
    
    if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
    var x;
    switch(key){
         case "MY_INFORMATION"      :   {
                                         x = new voltmx.mvc.Navigation("frmmyInfromation02");
                                           
                                       }
                                       break;
        case "MY_DOCUMENTS"      :   {
                                         x = new voltmx.mvc.Navigation("frmMyDocuments");
                                           
                                       }
                                       break;
        case "CHANGE_PASSWORD"      :   {
                                        x = new voltmx.mvc.Navigation("frmChangePassword");
                                       }
                                       break;
        case "SECURITY_DEPOSITS"    :   {
                                     x = new voltmx.mvc.Navigation("frmSecurityDeposits");
                                       }
                                       break; 
        case "VEHICLE_PAYMENTS"     : {
                                  x = new voltmx.mvc.Navigation("frmSummaryOfVehiclePayments");
                                      }
                                      break;
        case "OTHER_PAYMENTS"        :  {
                                  x = new voltmx.mvc.Navigation("frmSummaryOfOtherServicePayments");
                                      }
                                      break;
        case "DELETE_ACCOUNT"        :  {
                                   this.view.flxDeleteMyAccount.setVisibility(true);
                                  this.view.flxOverLay.setVisibility(true);
                                      }
                                      break;
         case "LOGOUT"        :  {
                                   this.logoutSession();
                                      }
                                      break;
    }
    if(x){
         x.navigate();
    }
  },
  
  segMyAccountItemsSellerOnRowClickAction: function()
  {
    var selectedProfileItems = this.view.segMyAccountItemsSeller.selectedRowItems;
    
        if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
      
    var x;
    switch(key){
         case "MY_INFORMATION"      :   {
                                         x = new voltmx.mvc.Navigation("frmmyInfromation02");
                                           
                                       }
                                       break;
        case "MY_DOCUMENTS"      :   {
                                         x = new voltmx.mvc.Navigation("frmMyDocuments");
                                           
                                       }
                                       break;
        case "CHANGE_PASSWORD"      :   {
                                         x = new voltmx.mvc.Navigation("frmChangePassword");
                                       }
                                       break;
        case "SECURITY_DEPOSITS"    :   {
                                     x = new voltmx.mvc.Navigation("frmSecurityDeposits");
                                       }
                                       break; 
        case "VEHICLE_PAYMENTS"     : {
                                  x = new voltmx.mvc.Navigation("frmSummaryOfVehiclePayments");
                                      }
                                      break;
        case "OTHER_PAYMENTS"        :  {
                                  x = new voltmx.mvc.Navigation("frmSummaryOfOtherServicePayments");
                                      }
                                      break;
         case "DELETE_ACCOUNT"        :  {
                         if(this.view.flxDeleteMyAccount)
                         {
                                   this.view.flxDeleteMyAccount.setVisibility(true);
                         }
           
                                   this.view.flxOverLay.setVisibility(true);
                                      }
                                      break;
         case "LOGOUT"        :  {
                                   this.logoutSession();
                                      }
                                      break;
    }
    if(x){
         x.navigate();
    }
  },
  
  deleteProfile: function() {
    var self = this;
     var userId = voltmx.store.getItem("userId");
      var usertoken = voltmx.store.getItem("getUserAccesstoken");
      

    function deleteUserCallback(status, response) 
    {
      //alert(JSON.stringify(response));
      self.view.flxOverLay.setVisibility(false);
      self.view.flxDeleteMyAccount.setVisibility(false);
      alert(response.message);
      
      self.logoutSession();
      // Example: alert("User deleted successfully");
    }

    var deleteUserInputParams = {};
    deleteUserInputParams["serviceID"] = "ms_user$delete-user-by-id";
    deleteUserInputParams["user_id"] = userId;

    var httpHeaders = {
     "user_token": usertoken
    };
    deleteUserInputParams["httpheaders"] = httpHeaders;

    var httpConfigs = {};
    deleteUserInputParams["httpconfig"] = httpConfigs;

    ms_user$delete_user_by_id = mfintegrationsecureinvokerasync(
        deleteUserInputParams,
        "ms_user",
        "delete-user-by-id",
        deleteUserCallback
    );

},
  
  logoutSession: function(){
    voltmx.net.clearCookies();
    voltmx.store.setItem("isLogin",false);

    voltmx.store.removeItem("refreshtoken");
    voltmx.store.removeItem("expon");
    voltmx.store.removeItem("userAccessTokenExp");


    voltmx.store.setItem("isUserCreated",false);
    voltmx.store.removeItem("accesstoken");
    voltmx.store.removeItem("userObject");
    voltmx.store.removeItem("getUserAccesstoken");
    voltmx.store.removeItem("userId");
    voltmx.store.removeItem("userEmail");
    //this.preshowFunctions();
    
      var nav = new voltmx.mvc.Navigation("frmDashBoard");
      nav.navigate();

  },

  
  closeDeletePopup: function()
  {
    this.view.flxOverLay.setVisibility(false);
    this.view.flxDeleteMyAccount.setVisibility(false);
  },
  setDataToBuyerSegment: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    
    

  var leftAlign = isArabic ? "" : "25dp";
  var rightAlign = isArabic ? "25dp" : "";

  var chevronLeftAlign = isArabic ? "10dp" : "";
  var chevronRightAlign = isArabic ? "" : "10dp";

  var segmentData = [
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("My Information"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
       imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "MY_INFORMATION"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("My Documents"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "MY_DOCUMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Security Deposits"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "SECURITY_DEPOSITS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Vehicle Payments"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "VEHICLE_PAYMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Other Services Payments"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "OTHER_PAYMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Change Password"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "CHANGE_PASSWORD"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Delete my Account"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "DELETE_ACCOUNT"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Logout"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "LOGOUT"
    }
  ];
    
    if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segMyAccountItemsBuyer.setData(segmentData);
},
  
  setDataToSellerSegment: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  var leftAlign = isArabic ? "" : "25dp";
  var rightAlign = isArabic ? "25dp" : "";

  var chevronLeftAlign = isArabic ? "10dp" : "";
  var chevronRightAlign = isArabic ? "" : "10dp";

  var segmentData = [
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("My Information"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "MY_INFORMATION"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("My Documents"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "MY_DOCUMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Vehicle Payments"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "VEHICLE_PAYMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Other Services Payments"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "OTHER_PAYMENTS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Change Password"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "CHANGE_PASSWORD"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Delete my Account"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "DELETE_ACCOUNT"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Logout"),
        left: leftAlign,
        right: rightAlign
      },
      flxChevronright: {
        left: chevronLeftAlign,
        right: chevronRightAlign
      },
      imgChevronRight: {
        src: "rightchevronnew.png"
      },
      itemKey: "LOGOUT"
    }
  ];
    
     if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segMyAccountItemsSeller.setData(segmentData);
},
  
  adjustRTLLayout: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.lblProfile.text = voltmx.i18n.getLocalizedString("My Account");
    this.view.Label0h39e0a18c49e41.text = voltmx.i18n.getLocalizedString("Delete Account Confirmation");
    this.view.Label0c74604f54a3b47.text = voltmx.i18n.getLocalizedString("are you sure you want to delete the account?");
     this.view.btnCancel.text = voltmx.i18n.getLocalizedString("cancel");
    this.view.btnDelete.text = voltmx.i18n.getLocalizedString("Yes");
    // Flip back icon if Arabic
  if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackNavigate.transform = flipTransform;

    this.view.flxBackNavigateIcon.left = "";
    this.view.flxBackNavigateIcon.right = "5dp";

    this.view.lblProfile.left = "";
    this.view.lblProfile.right = "18%";
    this.view.lblProfile.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  } else {
    // English LTR default
    this.view.imgBackNavigate.transform = kony.ui.makeAffineTransform(); // reset transform

    this.view.flxBackNavigateIcon.left = "5dp";
    this.view.flxBackNavigateIcon.right = "";

    this.view.lblProfile.left = "18%";
    this.view.lblProfile.right = "";
    this.view.lblProfile.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  }

  this.view.forceLayout(); // Apply UI updates
}


  
  


 });