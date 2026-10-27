define({ 

  onNavigate: function(){
    
    this.setDataToBuyerSegment();
   this.setDataToSellerSegment();
   this.adjustRTLLayout();
   this.view.preShow = this.onPreShow.bind(this);
   this.view.flxBackNavigateIcon.onClick = this.backToPreviousForm.bind(this);
    if(this.view.segVehicleItemsBuyer){
   this.view.segVehicleItemsBuyer.onRowClick  = this.segMyVehicleItemsBuyerOnRowClickAction.bind(this);
   }
   if(this.view.segVehicleItemsSeller)
     {
       this.view.segVehicleItemsSeller.onRowClick = this.segMyVehicleItemsSellerOnRowClickAction.bind(this);
     }
 },
  
 onPreShow: function()
  {
    this.mode = voltmx.store.getItem("mode") || "seller";
    if(this.mode === "buyer")
      {
        this.view.segVehicleItemsBuyer.setVisibility(true);
        this.view.segVehicleItemsSeller.setVisibility(false);
      }
    else{
      this.view.segVehicleItemsBuyer.setVisibility(false);
      this.view.segVehicleItemsSeller.setVisibility(true);
    }  
  },
  
  backToPreviousForm: function() {

     new voltmx.mvc.Navigation("frmProfile").navigate();
  
},
  
  segMyVehicleItemsBuyerOnRowClickAction: function()
  {
    var selectedProfileItems = this.view.segVehicleItemsBuyer.selectedRowItems;
    if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
      
    var x;
    switch(key){
        case "ACTIVE_BIDS"      :   {
                                         x = new voltmx.mvc.Navigation("frmActiveBids");
                                           
                                       }
                                       break;
        case "WON_BIDS"      :   {
                                      x = new voltmx.mvc.Navigation("frmWonBids");
                                       }
                                       break;
        
    }
    if(x){
         x.navigate();
    }
  },
  
  segMyVehicleItemsSellerOnRowClickAction: function()
  {
     var selectedProfileItems = this.view.segVehicleItemsSeller.selectedRowItems;
      if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
    var x;
    switch(key){
        case "UNDER_REVIEW"      :   {
                                         x = new voltmx.mvc.Navigation("frmUnderReview");
                                           
                                       }
                                       break;
        
        case "PENDING_SALE_CONFIRMATION"    :   {
                                     x = new voltmx.mvc.Navigation("frmPendingSaleConfirmation");
                                       }
                                       break; 
          case "APPROVED_VEHICLES"      :       {
                                         x = new voltmx.mvc.Navigation("frmApprovedVehicles");
                                           
                                       }
                                       break;   
      case "LIVE_AUCTIONS"      :   {
                                         x = new voltmx.mvc.Navigation("frmLiveAuctions");
                                           
                                       }
                                       break;
        case "SOLD"     : {
                                  x = new voltmx.mvc.Navigation("frmSoldVehicles");
                                      }
                                      break;
        
        case "UNSOLD"        :  {
                                  x = new voltmx.mvc.Navigation("frmUnsoldVehicles");
                                      }
                                      break;
         case "DELIVERED_VEHICLES"     : {
                                  x = new voltmx.mvc.Navigation("frmDeliveredVehiclesForSeller");
                                      }
                                      break;

    }
    if(x){
         x.navigate();
    }
    
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
        text: voltmx.i18n.getLocalizedString("My Bids"),
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
      itemKey: "ACTIVE_BIDS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("My Purchases"),
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
      itemKey: "WON_BIDS"
    }
   
  ];
    
    if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segVehicleItemsBuyer.setData(segmentData);
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
        text: voltmx.i18n.getLocalizedString("Under Review"),
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
      itemKey: "UNDER_REVIEW"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Approved Vehicles"),
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
      itemKey: "APPROVED_VEHICLES"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Live Auctions"),
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
      itemKey: "LIVE_AUCTIONS"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Pending Sale Confirmation"),
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
      itemKey: "PENDING_SALE_CONFIRMATION"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Sold"),
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
      itemKey: "SOLD"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Unsold"),
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
      itemKey: "UNSOLD"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Delivered Vehicles"),
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
      itemKey: "DELIVERED_VEHICLES"
    }
  ];
    
     if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segVehicleItemsSeller.setData(segmentData);
},
  
    adjustRTLLayout: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.lblMyVehicles.text = voltmx.i18n.getLocalizedString("My Vehicles");
  // Flip back icon if Arabic
  if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackNavigate.transform = flipTransform;

    this.view.flxBackNavigateIcon.left = "";
    this.view.flxBackNavigateIcon.right = "5dp";

    this.view.lblMyVehicles.left = "";
    this.view.lblMyVehicles.right = "18%";
    this.view.lblMyVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  } else {
    // English LTR default
    this.view.imgBackNavigate.transform = kony.ui.makeAffineTransform(); // reset transform

    this.view.flxBackNavigateIcon.left = "5dp";
    this.view.flxBackNavigateIcon.right = "";

    this.view.lblMyVehicles.left = "18%";
    this.view.lblMyVehicles.right = "";
    this.view.lblMyVehicles.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  }

  this.view.forceLayout(); // Apply UI updates
}
  
 });