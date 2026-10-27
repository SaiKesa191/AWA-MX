define({

  onNavigate: function() {
    this.setData();
    this.vehicleDetails();
    this.view.flxBack.onClick = this.navToFAQ.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
        this.view.segBiddingProcess.onRowClick = 
          this.onSegmentRowClick.bind(this);
    
      this.view.txtBoxSearch.onTextChange = function() {
    var searchText = this.view.txtBoxSearch.text || "";
    this.filterVehicleDetails(searchText);
  }.bind(this); 
//   },


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
        "lbl1"        :  voltmx.i18n.getLocalizedString("1.What must participants do before bidding on vehicles or commodities in the auction?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Participants must inspect and verify that the vehicles or commodities match the provided specifications, as items are sold as-is, with no responsibility on Al Wataneya Auctions."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("2.Is there a limit to the number of vehicles a participant can own from the auction?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Participants can own an unlimited number of vehicles offered in the auction, subject to applicable legal provisions."),
       // "flxButton"   :  { "onClick": this.dropDownOnClick.bind(this)},
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("3.How is bidding time managed at the close of an auction?"),       
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Bidding is extended by two minutes if bids are placed in the last two minutes of the closing time to allow more bidding opportunities."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("4.What are the bidding categories based on vehicle price ranges?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("For vehicles priced 100-20,000 AED, all bid categories (100, 200, 500, 1000, 3000, 5000) are available; for 20,000-50,000 AED, categories above 100 AED apply; for 50,000 AED and above, all categories except 100 and 200 AED are available."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :   voltmx.i18n.getLocalizedString("5.How can bidders track their bids and purchases?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Bidders can follow"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :   voltmx.i18n.getLocalizedString("6.What are the procedures for participating in an electronic auction?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Participants read the vehicle list, bid during the auction period, and note that two minutes are added if bidding continues in the last two minutes; results are subject to acquiring party approval."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("7.How does the auto bid feature work on the Al Wataneya Auctions site?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
//         "lbl2"        :  voltmx.i18n.getLocalizedString("Selecta vehiclefaq"),
        "lbl2"        :  voltmx.i18n.getLocalizedString("how does auto bid work"),
        
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("8.What responsibilities does the buyer have regarding vehicle inspection before bidding?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Buyers must thoroughly inspect the vehicle, acknowledge it is sold as-is without guarantee, and cannot cancel the sale due to defects, as Al Wataneya Auctions acts only as a broker."),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("9.What happens if a bidder opts not to purchase a court vehicle after winning?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("A 5% fine in favor of the court is imposed if the bidder chooses not to purchase a court vehicle."),
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
    this.view.segBiddingProcess.setData(vehicleDetail);
  },
  
  
  
  filterVehicleDetails: function(searchText) {
    var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
      var answer = (item.lbl2 || "").toLowerCase();
      return question.includes(searchText.toLowerCase()) || 
        answer.includes(searchText.toLowerCase());
    });


    this.view.segBiddingProcess.setData(filteredData);
  },

//   dropDownOnClick: function () {
//   var self = this;
//   var selectedRow = self.view.segBiddingProcess.selectedRowItems;

//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = self.view.segBiddingProcess.selectedRowIndex[1];

//   // Toggle visibility of flx02
//   var isNowVisible = !rowData.flx02.isVisible;
//   rowData.flx02.isVisible = isNowVisible;

//   // Create rotation transform
//   var rotateTransform = voltmx.ui.makeAffineTransform();
//   if (isNowVisible) {
//     rotateTransform.rotate(180);  // expanded
//   } else {
//     rotateTransform.rotate(0);    // collapsed
//   }

 
//   rowData.imgDownArrow = {
//     "src"      : "downarrowfromvehicleinsp.png",
//     "transform": rotateTransform
//   };

//   // Update the row
//   self.view.segBiddingProcess.setDataAt(rowData, rowIndex);
// },
  
  dropDownOnClick: function() {
    var self = this;
    var selectedRow = self.view.segBiddingProcess.selectedRowItems;

    // Check if selectedRowItems is valid and has at least one item
    if (!selectedRow || !Array.isArray(selectedRow) || selectedRow.length === 0) {
        voltmx.print("No row is selected");
        return;
    }

    var rowData = selectedRow[0];
    var rowIndex;

    // Safely get the row index
    if (self.view.segBiddingProcess.selectedRowIndex && Array.isArray(self.view.segBiddingProcess.selectedRowIndex)) {
        rowIndex = self.view.segBiddingProcess.selectedRowIndex[1];
    } else {
        // Fallback: Get index by comparing data if selectedRowIndex is unavailable
        var allData = self.view.segBiddingProcess.data || [];
        rowIndex = allData.findIndex(function(item) {
            return item === rowData;
        });
        if (rowIndex === -1) {
            voltmx.print("Could not determine row index");
            return;
        }
    }

    // Toggle visibility of flx02
    var isNowVisible = !rowData.flx02.isVisible;
    rowData.flx02.isVisible = isNowVisible;

    // Create rotation transform
    var rotateTransform = voltmx.ui.makeAffineTransform();
    if (isNowVisible) {
        rotateTransform.rotate(180); // Expanded
    } else {
        rotateTransform.rotate(0); // Collapsed
    }

    // Update the image rotation
    rowData.imgDownArrow = {
        "src": "downarrowfromvehicleinsp.png",
        "transform": rotateTransform
    };

    // Update the row in the segment
    try {
        self.view.segBiddingProcess.setDataAt(rowData, rowIndex);
    } catch (error) {
        voltmx.print("Error updating segment data: " + error.message);
    }
},
  
  
    onSegmentRowClick: function () {
  var self = this;
  var selectedRow = self.view.segBiddingProcess.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segBiddingProcess.selectedRowIndex[1];

  
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

  self.view.segBiddingProcess.setDataAt(rowData, rowIndex);
},

  
  navToFAQ: function()
  {
    new voltmx.mvc.Navigation("frmFAQs").navigate();
  },
  
  
    setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
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
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  

  var labelList = [
    "txtBoxSearch","lblBiddingProcess"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox","flxBiddingProcess"
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
    this.view.lblBiddingProcess.text=
      voltmx.i18n.getLocalizedString("Bidding Process"); 
}
  
  
  
  



});
