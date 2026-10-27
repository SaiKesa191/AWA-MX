define({

  onNavigate: function() {
    
    this.setData();
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
//     this.view.flxBack.onClick;
      this.view.flxBack.onClick=this.navToFAQ.bind(this);
    this.view.segVehicleInformation.onRowClick = this.onSegmentRowClick.bind(this);
    
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
        "lbl1"        :  voltmx.i18n.getLocalizedString("1.In what condition are vehicles sold at Al Wataneya Auctions?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("Vehicles are sold in their current condition"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("2.What guarantees does Al Wataneya Auctions provide for vehicles?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :   voltmx.i18n.getLocalizedString("Vehicles are guaranteed to conform to inspection report specifications for 3 days from payment but not for validity of use, commercial value, or travel to other countries"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("WhatAIAuction"),    
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :   voltmx.i18n.getLocalizedString("Their role is limited to displaying and brokering vehicles, with no responsibility for disputes arising from purchased vehicles"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
       { 
        "lbl1"        : voltmx.i18n.getLocalizedString("4.Who handles disputes or fraud related to vehicles, such as odometer tampering or chassis issues?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :   voltmx.i18n.getLocalizedString("Litigation occurs between the vehicle owner and buyer, with Al Wataneya Auctions acting only as a mediator"),
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
    this.view.segVehicleInformation.setData(vehicleDetail);
  },
  
  
     filterVehicleDetails: function(searchText) {
    var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
      var answer = (item.lbl2 || "").toLowerCase();
      return question.includes(searchText.toLowerCase()) || 
        answer.includes(searchText.toLowerCase());
    });


    this.view.segVehicleInformation.setData(filteredData);
  },


//   dropDownOnClick: function () {
//   var self = this;
//   var selectedRow = self.view.segVehicleInformation.selectedRowItems;

//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = self.view.segVehicleInformation.selectedRowIndex[1];

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
//   self.view.segVehicleInformation.setDataAt(rowData, rowIndex);
// },
  
  dropDownOnClick: function() {
    var self = this;
    var selectedRow = self.view.segVehicleInformation.selectedRowItems;

    // Check if selectedRowItems is valid and has at least one item
    if (!selectedRow || !Array.isArray(selectedRow) || selectedRow.length === 0) {
        voltmx.print("No row is selected");
        return;
    }

    var rowData = selectedRow[0];
    var rowIndex;

    // Safely get the row index
    if (self.view.segVehicleInformation.selectedRowIndex && Array.isArray(self.view.segVehicleInformation.selectedRowIndex)) {
        rowIndex = self.view.segVehicleInformation.selectedRowIndex[1];
    } else {
        // Fallback: Get index by comparing data if selectedRowIndex is unavailable
        var allData = self.view.segVehicleInformation.data || [];
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
        self.view.segVehicleInformation.setDataAt(rowData, rowIndex);
    } catch (error) {
        voltmx.print("Error updating segment data: " + error.message);
    }
},
  
    onSegmentRowClick: function () {
  var self = this;
  var selectedRow = self.view.segVehicleInformation.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segVehicleInformation.selectedRowIndex[1];

  
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

  self.view.segVehicleInformation.setDataAt(rowData, rowIndex);
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
    "txtBoxSearch","lblVehicleInformation"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox","flxVehicleInformation"
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
    this.view.lblVehicleInformation.text=
      voltmx.i18n.getLocalizedString("Vehicle Information"); 
}




});
