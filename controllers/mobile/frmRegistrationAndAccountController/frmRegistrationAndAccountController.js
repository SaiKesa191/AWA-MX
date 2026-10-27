define({

  onNavigate: function() {
    this.setData();
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
//      this.view.flxBack.onClick = function()
//     {
//       new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
//     }.bind(this);
    
      this.view.flxBack.onClick=this.goBack.bind(this);
    this.view.segRegAndAccount.onRowClick = this.onSegmentRowClick.bind(this);
//      this.view.txtBoxSearch.onTextChange= this.filterVehicleDetails.bind(this);
    
    this.view.txtBoxSearch.onTextChange = function() {
    var searchText = this.view.txtBoxSearch.text || "";
    this.filterVehicleDetails(searchText);
  }.bind(this); 
  },

  onPreShow: function(){
    
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
    this.view.segRegAndAccount.widgetDataMap ={

    "lbl1": "lbl1",
     "imgDownArrow": "imgDownArrow",
      "lbl2": "lbl2",
      "flxButton":"flxButton",
      "flx02": "flx02"
      };
   
  var vehicleDetail = [
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("1.What is required for participants to agree to when registering on the Al Wataneya Auctions website?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("Participants must read and accept the rules, regulations, texts, and provisions governing the relationship with clients, with registration considered as approval of these terms."),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("2.How do participants register to use the Al Wataneya Auctions internet site?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        :voltmx.i18n.getLocalizedString("FAQpartispents"),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("3.Who is restricted from using the Al Wataneya Auctions internet site?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("Individuals lacking legal authority to bid, those under 21 years old, or those banned temporarily or permanently from the site cannot use it ."),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("4.Can a member share their Al Wataneya Auctions username with others?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("Members must not share their username without prior permission and are responsible for any actions taken by others using their account ."),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("5.What are the responsibilities of members regarding the use of the Al Wataneya Auctions website?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("MembersinFAQ"),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("6.What actions can Al Wataneya Auctions take regarding site services and user access?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("Al Wataneya Auctions can limit, stop, or terminate services, prevent user access, delete published content, or cancel non-activated or inactive accounts as deemed necessary ."),
    //  "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("7.How does Al Wataneya Auctions handle customer privacy?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("All member information is private, collected only through participant names and arbitrary site statistics to protect user privacy ."),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    },
    { 
      "lbl1"        : voltmx.i18n.getLocalizedString("8.What are the account registration requirements for participating in an auction?"),
      "imgDownArrow": "downarrowfromvehicleinsp.png",
      "lbl2"        : voltmx.i18n.getLocalizedString("Participants must open a new user account, activate it, and be over 21 years old to register and participate ."),
     // "flxButton"   : { "onClick": this.dropDownOnClick.bind(this) },
      "flx02": { isVisible: false }
    }
  
  ];
 
  this.originalVehicleDetail = vehicleDetail;
  this.view.segRegAndAccount.setData(vehicleDetail);
},
  
  
  filterVehicleDetails: function(searchText) {
  var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
    var answer = (item.lbl2 || "").toLowerCase();
    return question.includes(searchText.toLowerCase()) || answer.includes(searchText.toLowerCase());
  });
  
    
  this.view.segRegAndAccount.setData(filteredData);
},


//   dropDownOnClick: function () {
//   var self = this;
//   var selectedRow = self.view.segRegAndAccount.selectedRowItems;

//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = self.view.segRegAndAccount.selectedRowIndex[1];

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
//   self.view.segRegAndAccount.setDataAt(rowData, rowIndex);
// },
  
  dropDownOnClick: function() {
    var self = this;
    var selectedRow = self.view.segRegAndAccount.selectedRowItems;

    // Check if selectedRowItems is valid and has at least one item
    if (!selectedRow || !Array.isArray(selectedRow) || selectedRow.length === 0) {
        voltmx.print("No row is selected");
        return;
    }

    var rowData = selectedRow[0];
    var rowIndex;

    // Safely get the row index
    if (self.view.segRegAndAccount.selectedRowIndex && Array.isArray(self.view.segRegAndAccount.selectedRowIndex)) {
        rowIndex = self.view.segRegAndAccount.selectedRowIndex[1];
    } else {
        // Fallback: Get index by comparing data if selectedRowIndex is unavailable
        var allData = self.view.segRegAndAccount.data || [];
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
        self.view.segRegAndAccount.setDataAt(rowData, rowIndex);
    } catch (error) {
        voltmx.print("Error updating segment data: " + error.message);
    }
},
//   onSegmentRowClick: function () {
//   var self = this;
//   var selectedRow = self.view.segRegAndAccount.selectedRowItems;

//   if (!selectedRow || selectedRow.length === 0) {
//     voltmx.print("No row is selected");
//     return;
//   }

//   var rowData = selectedRow[0];
//   var rowIndex = self.view.segRegAndAccount.selectedRowIndex[1];

  
//   var isNowVisible = !rowData.flx02.isVisible;
//   rowData.flx02.isVisible = isNowVisible;

 
//   var rotateTransform = voltmx.ui.makeAffineTransform();
//   if (isNowVisible) {
//     rotateTransform.rotate(180); 
//   } else {
//     rotateTransform.rotate(0);    
//   }

//   // Update the arrow icon and transform
//   rowData.imgDownArrow = {
//     src      : "downarrowfromvehicleinsp.png",
//     transform: rotateTransform
//   };

//   self.view.segRegAndAccount.setDataAt(rowData, rowIndex);
// },
  
  onSegmentRowClick: function () {
  var self = this;

  var rowIndexArr = self.view.segRegAndAccount.selectedRowIndex;
  if (!rowIndexArr || rowIndexArr.length < 2) {
    voltmx.print("No row is selected");
    return;
  }

  var rowIndex = rowIndexArr[1];

  // ✅ Always get rowData from seg.data (ensures lbl2 is present)
  var rowData = self.view.segRegAndAccount.data[rowIndex];

  var isNowVisible = !rowData.flx02.isVisible;
  rowData.flx02.isVisible = isNowVisible;

  var rotateTransform = voltmx.ui.makeAffineTransform();
  if (isNowVisible) {
    rotateTransform.rotate(180);
  } else {
    rotateTransform.rotate(0);
  }

  // Keep arrow as simple mapping (string or object depending on your template)
  rowData.imgDownArrow = {
    src      : "downarrowfromvehicleinsp.png",
    transform: rotateTransform
  };

  self.view.segRegAndAccount.setDataAt(rowData, rowIndex);
},



  goBack: function(){
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
    "txtBoxSearch","lblRegistrationAndBookings"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox","flxRegAndAccountTittle"
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
    this.view.lblRegistrationAndBookings.text=
      voltmx.i18n.getLocalizedString("Registration & Account"); 
}
  

});
