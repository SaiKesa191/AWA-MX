define({ 

 onNavigate: function(){
   
     this.setDataToSegment();
   this.adjustRTLLayout();
   
   this.view.flxBackNavigateIcon.onClick = this.backToPreviousForm.bind(this);
   this.view.segHelpItems.onRowClick = this.segHelpOnRowClickAction.bind(this);
 },
  
  backToPreviousForm: function() {
 
    var x = new voltmx.mvc.Navigation("frmProfile");
    x.navigate();
  
},
  
  segHelpOnRowClickAction: function()
  {
    
    var selectedProfileItems = this.view.segHelpItems.selectedRowItems;
     if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
    var x;
    switch(key){
        case "FIND_BRANCHES"      :   {
                                         x = new voltmx.mvc.Navigation("frmFindBranch");
                                           
                                       }
                                       break;
        case "FAQS"      :   {
                                      x = new voltmx.mvc.Navigation("frmFAQs");
                                       }
                                       break;
        case "ABOUT_US"     : {
                                  x = new voltmx.mvc.Navigation("frmAboutUs");
                                      }
                                      break;
        case "CONTACT_US"        :  {
                                  voltmx.store.setItem("contactBackForm", "frmOpenHelp");
                                  x = new voltmx.mvc.Navigation("frmContactUS");
                                      }
                                      break;
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
        text: voltmx.i18n.getLocalizedString("Find Branches"),
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
      itemKey: "FIND_BRANCHES"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("FAQs"),
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
      itemKey: "FAQS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("About Us"),
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
      itemKey: "ABOUT_US"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Contact Us"),
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
      itemKey: "CONTACT_US"
    }
  ];
    
     if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segHelpItems.setData(segmentData);
    
    
  },
  
  adjustRTLLayout: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.lblHelp.text = voltmx.i18n.getLocalizedString("Help");
  // Flip back icon if Arabic
  if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackNavigate.transform = flipTransform;

    this.view.flxBackNavigateIcon.left = "";
    this.view.flxBackNavigateIcon.right = "5dp";

    this.view.lblHelp.left = "";
    this.view.lblHelp.right = "18%";
    this.view.lblHelp.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  } else {
    // English LTR default
    this.view.imgBackNavigate.transform = kony.ui.makeAffineTransform(); // reset transform

    this.view.flxBackNavigateIcon.left = "5dp";
    this.view.flxBackNavigateIcon.right = "";

    this.view.lblHelp.left = "18%";
    this.view.lblHelp.right = "";
    this.view.lblHelp.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  }

  this.view.forceLayout(); // Apply UI updates
}

  
 });