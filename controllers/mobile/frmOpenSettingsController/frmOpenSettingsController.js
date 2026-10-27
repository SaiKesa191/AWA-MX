define({ 

  onNavigate: function(){
   this.setDataToSegment();
   this.adjustRTLLayout();
   this.view.flxBackNavigateIcon.onClick = this.backToPreviousForm.bind(this);
    this.view.segSettingItems.onRowClick = 
      this.segSettingsItemsOnRowClick.bind(this);
   
 },
  
  backToPreviousForm: function() {
 
    var x = new voltmx.mvc.Navigation("frmProfile");
    x.navigate();
  
},
  
  
  segSettingsItemsOnRowClick: function()
  {
    
    var selectedProfileItems = this.view.segSettingItems.selectedRowItems;
          if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
    var x;
    switch(key){
        case "NOTIFICATIONS"      :   {
                                         x = new voltmx.mvc.Navigation("frmNotifications2");
                                           
                                       }
                                       break;
        case "TERMSANDCONDITIONS"      :   {
                                      x = new voltmx.mvc.Navigation("frmTermsAnDConditions");
                                       }
                                       break;
//         case "General Settings"    :   {
                                   
//                                        }
//                                        break; 
    }
    if(x){
         x.navigate();
    }
  },
  
  setDataToSegment: function()
  {
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  var leftAlign = isArabic ? "" : "25dp";
  var rightAlign = isArabic ? "25dp" : "";

  var chevronLeftAlign = isArabic ? "10dp" : "";
  var chevronRightAlign = isArabic ? "" : "10dp";

  var segmentData = [
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Notifications"),
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
      itemKey: "NOTIFICATIONS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Terms & Conditions"),
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
      itemKey: "TERMSANDCONDITIONS"
    }
   
  ];
    
     if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segSettingItems.setData(segmentData);
    
  },
  
  adjustRTLLayout: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.lblSettings.text = voltmx.i18n.getLocalizedString("App Settings");
  // Flip back icon if Arabic
  if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackNavigate.transform = flipTransform;

    this.view.flxBackNavigateIcon.left = "";
    this.view.flxBackNavigateIcon.right = "5dp";

    this.view.lblSettings.left = "";
    this.view.lblSettings.right = "18%";
    this.view.lblSettings.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  } else {
    // English LTR default
    this.view.imgBackNavigate.transform = kony.ui.makeAffineTransform(); // reset transform

    this.view.flxBackNavigateIcon.left = "5dp";
    this.view.flxBackNavigateIcon.right = "";

    this.view.lblSettings.left = "18%";
    this.view.lblSettings.right = "";
    this.view.lblSettings.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  }

  this.view.forceLayout(); // Apply UI updates
}

 });