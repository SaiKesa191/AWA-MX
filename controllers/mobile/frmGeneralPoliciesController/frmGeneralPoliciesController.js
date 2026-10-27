define({

  onNavigate: function() {
    this.setData();
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick = this.navToFAQ.bind(this);
    this.view.segGeneralPolicies.onRowClick = this.onSegmentRowClick.bind(this);
    
    
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
        "lbl1"        : voltmx.i18n.getLocalizedString("What is affliation"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("It is affiliated with a federal governmental institution"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("2.How can members submit complaints or suggestions to Al Wataneya Auctions?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Contact support@alwatanya.ae or call 0097168006006; responses are provided within 2 days, handling complaints with honesty and experience"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("3.Who owns the intellectual property of Al Wataneya Auctions?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Only site owners have rights to names, trademarks, service marks, logos, and images"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("4.What currency is accepted for auction transactions, and can participants cancel participation?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Only Emirate Dirham (AED) is accepted; participants cannot quit or cancel participation after confirmation and bear resulting consequences"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("5.What are the obligations of a non-tax-registered seller regarding possession transfer?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("They must transfer possession to the buyer within 2 days, or face a fine equal to the sale commission for delays"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("6.How long does management approval or rejection of a vehicle sale take?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        : voltmx.i18n.getLocalizedString("Approval or rejection takes 2-21 business days, extendable based on vehicle condition"),
//         "flxButton"   : 
//         {
//           "onClick": this.dropDownOnClick.bind(this)
//         },
        "flx02": {
          isVisible: false 
        }
      },
      { 
        "lbl1"        : voltmx.i18n.getLocalizedString("7.What happens if a buyer takes possession before the official sale agreement and the sale is canceled?"),
        "imgDownArrow": "downarrowfromvehicleinsp.png",
        "lbl2"        :  voltmx.i18n.getLocalizedString("The buyer assumes full responsibility; Al Wataneya Auctions and Emirates Transport only refund the paid vehicle value, not covering repair or other costs"),
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

    this.view.segGeneralPolicies.setData(vehicleDetail);
  },
  
   filterVehicleDetails: function(searchText) {
    var filteredData = this.originalVehicleDetail.filter(function(item) {
      var question = (item.lbl1 || "").toLowerCase();
      var answer = (item.lbl2 || "").toLowerCase();
      return question.includes(searchText.toLowerCase()) || 
        answer.includes(searchText.toLowerCase());
    });


     this.view.segGeneralPolicies.setData(filteredData);
  },



  dropDownOnClick: function () {
  var self = this;
  var selectedRow = self.view.segGeneralPolicies.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segGeneralPolicies.selectedRowIndex[1];

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
  self.view.segGeneralPolicies.setDataAt(rowData, rowIndex);
},
  
  
    onSegmentRowClick: function () {
  var self = this;
  var selectedRow = self.view.segGeneralPolicies.selectedRowItems;

  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = self.view.segGeneralPolicies.selectedRowIndex[1];

  
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

  self.view.segGeneralPolicies.setDataAt(rowData, rowIndex);
},

  
  
  navToFAQ: function()
  {
    new voltmx.mvc.Navigation("frmFAQs").navigate();
  },
  
  
  
    setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
  // Determine alignment and direction
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
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  

  var labelList = [
    "txtBoxSearch","lblgeneralPolicies"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxSearchBox" ,"flxGeneralPolicies"
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
    this.view.lblgeneralPolicies.text=
      voltmx.i18n.getLocalizedString("General Policies"); 
}




});
