define({

  onNavigate: function() {
    
    this.setData();
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick =this.navToFAQ.bind(this);
    this.view.segPayments.onRowClick = this.onSegmentRowClick.bind(this);
    
       this.view.txtBoxSearch.onTextChange = function() {
    var searchText = this.view.txtBoxSearch.text || "";
    this.filterVehicleDetails(searchText);
  }.bind(this); 
    
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


  vehicleDetails: function() {
    var vehicleDetail = [
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("1.What is required for participants to deposit as insurance for the auction?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Participants must deposit an insurance amount per item 23 conditions, payable via credit card, bank transfer, or deposited cheque to Al Wataneya Auctions."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("2.What happens if a participant fails to complete the payment process after winning an auction?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("The deposit is confiscated, and legal actions may be taken if the participant does not complete payment within the period specified"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("3.What are the payment deadlines and penalties for auction winners?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Winners must pay the vehicle amount to Emirates Public Transport and Services Company within 48 hours of auction results; a AED 100 daily penalty applies for delays"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("4.What are the consequences of breaching site conditions regarding payments?"),      
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("The deposit is confiscated, and legal actions may be pursued if a participant breaches site conditions"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("5.Can Al Wataneya Auctions change service charges?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Yes, Al Wataneya Auctions can temporarily change service charges for promotions or new services."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("6.How is the security deposit refunded for cash payments?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("CashSecurity"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("7.How is the security deposit refunded for credit card payments?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Credit card security deposits are automatically refunded after 21 days per bank policy"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("8.Can auction winners recover payments if they fail to pay the remaining amount?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("No, winners cannot refund or recover payments if they fail to pay the remaining amount, and no money is refunded for returning sold vehicles"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("9.How is the security deposit handled for auction participation?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("The deposit is paid per item 25 via credit card, cheque, or bank transfer (receipt sent to support@alwataneya.ae for transfers); refunded if no purchase, confiscated if the winner quits, with possible legal actions"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("10.What are the deposit amounts for different bidding limits?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("AED 5,000 for bids up to AED 100,000; AED 7,500 for up to AED 150,000; AED 10,000 for up to AED 200,000; AED 50,000 for bids exceeding AED 150,000 with no limit"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("What payment"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("The vehicle value must be paid within 48 hours of auction close in cash or approved bank cheque; a AED 100 daily penalty applies for up to 7 days, after which the sale is void, and the deposit is confiscated"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("12.What costs are excluded from the awarded vehicle value?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("The awarded value excludes ownership transfer fees, licensing, transport, and other expenses, which the buyer bears"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("13.Can Al Wataneya Auctions require an increased deposit?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Yes, for multiple vehicle purchases or if the sale amount exceeds AED 100,000, per item 25"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("14.Are vehicles subject to taxes?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Yesall"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("15.What is the VAT rate applied to the final auction price?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("A 5% VAT is applied to the final auction price"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("16.What administrative fees are applied to different vehicle types?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("AED 300 for motorcycles, AED 380 for light vehicles, and AED 480 for heavy vehicles"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("17.Is there a fee for technical condition inspections?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Yes, an additional AED 250 per vehicle is charged for technical condition inspections"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("18.What are the insurance deduction policies for purchase cancellations?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("For check-based insurance, 25% of the purchase value is forfeited; for cash/card-based, 10% is deducted (max full insurance, min AED 2,000)"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
    ];

       this.originalVehicleDetail = vehicleDetail;
    this.view.segPayments.setData(vehicleDetail);
  },
  
    filterVehicleDetails: function(searchText) {
    var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
      var answer = (item.lbl2 || "").toLowerCase();
      return question.includes(searchText.toLowerCase()) || 
        answer.includes(searchText.toLowerCase());
    });


    this.view.segPayments.setData(filteredData);
  },


  dropDownOnClick: function () {
  var self = this;
  var selectedRow = self.view.segPayments.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segPayments.selectedRowIndex[1];

  // Toggle visibility of flx02
  var isNowVisible = !rowData.flx02.isVisible;
  rowData.flx02.isVisible = isNowVisible;

  // Create rotation transform
  var rotateTransform = voltmx.ui.makeAffineTransform();
  if (isNowVisible) {
    rotateTransform.rotate(180);  // expanded
  } else {
    rotateTransform.rotate(0);    // collapsed
  }

  // Animate the image rotation
  rowData.imgDownArrow = {
    "src"      : "downarrowfromvehicleinsp.png",
    "transform": rotateTransform
  };

  // Update the row
  self.view.segPayments.setDataAt(rowData, rowIndex);
},
  
  
    onSegmentRowClick: function () {
  var self = this;
  var selectedRow = self.view.segPayments.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segPayments.selectedRowIndex[1];

  
  var isNowVisible = !rowData.flx02.isVisible;
  rowData.flx02.isVisible = isNowVisible;

 
  var rotateTransform = voltmx.ui.makeAffineTransform();
  if (isNowVisible) {
    rotateTransform.rotate(180); 
  } else {
    rotateTransform.rotate(0);    
  }

  rowData.imgDownArrow = {
    src      : "downarrowfromvehicleinsp.png",
    transform: rotateTransform
  };

  self.view.segPayments.setDataAt(rowData, rowIndex);
},

  
  navToFAQ: function()
  {
    new voltmx.mvc.Navigation("frmFAQs").navigate();
  },
  
  
   setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
  this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  

  var labelList = [
    "txtBoxSearch","lblPayments"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox","flxPayments"
  ];


  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }
     
     
     
        var arrowWidgets = [
        this.view.imgArrow 
      ];

      var transform = voltmx.ui.makeAffineTransform();
      transform.rotate(isArabic ? 180 : 0);

      arrowWidgets.forEach(function(widget) {
        if (widget) {
          widget.transform = transform;
        }
      });

 this.view.txtBoxSearch.placeholder=voltmx.i18n.getLocalizedString("Search FAQs");
    this.view.lblPayments.text=
      voltmx.i18n.getLocalizedString("Payments"); 
}





});
