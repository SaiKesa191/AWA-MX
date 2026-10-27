define({ 

onNavigate: function(){
  
  
  this.setData();
   this.view.preShow = this.onPreShow.bind(this);
   this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    }.bind(this);
  
  voltmx.print("entered")
  
//    var headerData = { "lblHeading": "Order Summary" };
  var headerData = { "lblHeading": voltmx.i18n.getLocalizedString("Order Summary") };

  
  var rowData=[
    {
//       "lblKey":"Service Type",
          "lblKey":voltmx.i18n.getLocalizedString("Service Type"),
      "lblvalue":"Minor Service"
    },
     {
//       "lblKey":"Vehicle Lot ID",
        "lblKey":voltmx.i18n.getLocalizedString("Vehicle Lot ID"),
      "lblvalue":"#76821"
    },
     {
//       "lblKey":"Optional Notes",
        "lblKey":voltmx.i18n.getLocalizedString("Optional Notes"),
      "lblvalue":"Please check the brakes\nthoroughly"
    },
     {
//       "lblKey":"Amount Payable",
        "lblKey":voltmx.i18n.getLocalizedString("Amount Payable"),
      "lblvalue":"Service Fee: 55.00 AED\nTax Fee: 7.50 AED\nTotal cost: 62.50 AED"
    },
  ]
  
  
  var segDataWithHeader = [[headerData, rowData]];

    this.view.segChangeBuyer.setData(segDataWithHeader);
  
   voltmx.print("exit")
  
  
},
  
  onPreShow: function()
  {
    this.toggleFooterIcons();
    
  },
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
    
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknlblCPBoldCapt181818Font100";
    
       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
  
  
  
     setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  
  this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // List of label widget IDs to apply alignment
  var labelList = [
    "lblBookingConfirmed","lblKey","lblvalue"
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

  // List of Flex containers to reverse layout direction
  var flexList = [
 "FlexGroup0dfd87869855d40"
    
    
  ];

  // Apply reverseLayoutDirection
  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  // Optional localization of text, if needed
 this.view.lblBookingConfirmed.text=voltmx.i18n
   .getLocalizedString("Your booking is confirmed!");
       this.view.lbl01.text=voltmx.i18n.getLocalizedString("Your vehicle will be polished/detailed on-site while you complete your paperwork.")
    this.view.btnReturnToAuction.text=volmx.i18n.getLocalizedString("RETURN TO AUCTIONS");
}

  

 });