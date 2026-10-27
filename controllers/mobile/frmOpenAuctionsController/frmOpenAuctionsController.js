define({ 

 onNavigate: function(){
   
    this.setDataToSegment();
   this.adjustRTLLayout();
   
   this.view.flxBackNavigateIcon.onClick = this.backToPreviousForm.bind(this);
   this.view.segAuctionItems.onRowClick = this.segAuctionItemsOnRowClickAction.bind(this);
   
 },
  
  backToPreviousForm: function() {
 
  
    var x = new voltmx.mvc.Navigation("frmProfile");
    x.navigate();
  
},
  
  segAuctionItemsOnRowClickAction: function()
  {
    var selectedProfileItems = this.view.segAuctionItems.selectedRowItems;
         
        if (!selectedProfileItems || selectedProfileItems.length === 0) return;
    
      var key = selectedProfileItems[0].itemKey;
    
      
    var x;
    switch(key){
        case "TODAY_AUCTION"      :   {
                                         x = new voltmx.mvc.Navigation("frmAuctionCalendar");
                                       }
                                       break;
        case "AUCTION_CALENDAR"      :   {
                                         x = new voltmx.mvc.Navigation("frmAuctionCalendar");
                                       }
                                       break;
        case "SAVED_SEARCHES"    :   {
                                     voltmx.store.setItem("lastFormId", "frmOpenAuctions");
                                     voltmx.store.setItem("filtersBackPage", "frmOpenAuctions");
                                     x = new voltmx.mvc.Navigation("frmFiltersNew");
                                       }
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
        text: voltmx.i18n.getLocalizedString("Today's Auction"),
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
      itemKey: "TODAY_AUCTION"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Auction Calendar"),
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
      itemKey: "AUCTION_CALENDAR"
    },
    {
      lblItemName: {
        text: voltmx.i18n.getLocalizedString("Saved Searches"),
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
      itemKey: "SAVED_SEARCHES"
    },
   
  ];
    
     if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // Flip horizontally

    segmentData.forEach(function(item) {
      item.imgChevronRight.transform = flipTransform;
    });
  }

  this.view.segAuctionItems.setData(segmentData);
    
    
  },
  
   adjustRTLLayout: function() {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.lblAuctions.text = voltmx.i18n.getLocalizedString("Auctions");
  // Flip back icon if Arabic
  if (isArabic) {
    var flipTransform = kony.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBackNavigate.transform = flipTransform;

    this.view.flxBackNavigateIcon.left = "";
    this.view.flxBackNavigateIcon.right = "5dp";

    this.view.lblAuctions.left = "";
    this.view.lblAuctions.right = "18%";
    this.view.lblAuctions.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  } else {
    // English LTR default
    this.view.imgBackNavigate.transform = kony.ui.makeAffineTransform(); // reset transform

    this.view.flxBackNavigateIcon.left = "5dp";
    this.view.flxBackNavigateIcon.right = "";

    this.view.lblAuctions.left = "18%";
    this.view.lblAuctions.right = "";
    this.view.lblAuctions.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
  }

  this.view.forceLayout(); // Apply UI updates
}

  

 });