define({

  onNavigate: function() {
    
    this.setData();
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
    
     this.view.flxBack.onClick=this.navToFAQ.bind(this);
    this.view.segShippingAndCollection.onRowClick= this.onSegmentRowClick.bind(this);
    
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
        "lbl1"        :  voltmx.i18n.getLocalizedString("1.When and how can a participant receive a purchased vehicle?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("After payment, the participant receives the vehicle with official transfer documents and must remove it from the auction square within 3 working days"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("2.What is the deadline for removing vehicles from Al Wataneya Auctions premises?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Buyers must remove or transport vehicles within 72 hours post-sale after full payment"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("3.How long does the buyer have to complete vehicle ownership transfer?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("The buyer must complete ownership transfer within 7 days after receiving documents"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("4.How are vehicles transported from the auction yard?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Vehicles are transported only through Al Wataneya Auctions, not external companies, with the buyer bearing transport fees based on location"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("buyerrespon"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Buyersmust"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        :  voltmx.i18n.getLocalizedString("6.What fines apply if vehicles are not towed within seven days?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("A AED 20 fine for light vehicles and AED 50 for heavy vehicles/buses if not towed within 7 days"),
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
    this.view.segShippingAndCollection.setData(vehicleDetail);
  },
  
  
  filterVehicleDetails: function(searchText) {
    var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
      var answer = (item.lbl2 || "").toLowerCase();
      return question.includes(searchText.toLowerCase()) || 
        answer.includes(searchText.toLowerCase());
    });


    this.view.segShippingAndCollection.setData(filteredData);
  },



//   dropDownOnClick: function () {
//   var self = this;
//   var selectedRow = self.view.segShippingAndCollection.selectedRowItems;

//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = self.view.segShippingAndCollection.selectedRowIndex[1];

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

//   // Animate the image rotation
//   rowData.imgDownArrow = {
//     "src"      : "downarrowfromvehicleinsp.png",
//     "transform": rotateTransform
//   };

//   // Update the row
//   self.view.segShippingAndCollection.setDataAt(rowData, rowIndex);
// },
  
  dropDownOnClick: function() {
    var self = this;
    var selectedRow = self.view.segShippingAndCollection.selectedRowItems;

    // Check if selectedRowItems is valid and has at least one item
    if (!selectedRow || !Array.isArray(selectedRow) || selectedRow.length === 0) {
        voltmx.print("No row is selected");
        return;
    }

    var rowData = selectedRow[0];
    var rowIndex;

    // Safely get the row index
    if (self.view.segShippingAndCollection.selectedRowIndex && Array.isArray(self.view.segShippingAndCollection.selectedRowIndex)) {
        rowIndex = self.view.segShippingAndCollection.selectedRowIndex[1];
    } else {
        // Fallback: Get index by comparing data if selectedRowIndex is unavailable
        var allData = self.view.segShippingAndCollection.data || [];
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
        self.view.segShippingAndCollection.setDataAt(rowData, rowIndex);
    } catch (error) {
        voltmx.print("Error updating segment data: " + error.message);
    }
},
  
    onSegmentRowClick: function () {
  var self = this;
  var selectedRow = self.view.segShippingAndCollection.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segShippingAndCollection.selectedRowIndex[1];

  
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

  self.view.segShippingAndCollection.setDataAt(rowData, rowIndex);
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

  var labelList = [
    "txtBoxSearch","lblShippingCollection"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox","flxShippingAndCollection"
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

 this.view.txtBoxSearch.placeholder=
   voltmx.i18n.getLocalizedString("Search FAQs");
    this.view.lblShippingCollection.text=
      voltmx.i18n.getLocalizedString("Shipping & Collection"); 
}

  



});
