define({
  onNavigate: function () {
    this.view.btnProceedPayment.isVisible = false;
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick = this.navigateToVehicleInspection.bind(this);
    this.view.flxPayOnSite.onClick = this.payOnSiteClick.bind(this, "PayOnSite");
    this.view.flxPayNow.onClick = this.payOnSiteClick.bind(this, "PayNow");
    this.view.btnProceedPayment.onClick = this.processPayment.bind(this);
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

  
  vehicleDetails: function () {
    var vehicleDetail = [
      {
        "imgVehicleDrop": "iconamoon_arrow_down_2.png",
        "imgDown"       : "iconamoon_arrow_down_2.png",
        "lblSedan"      : {
          "text": "Sedan",
          "skin": "sknlbl231F20"
        },
        "lblSUV": {
          "text": "SUV",
          "skin": "sknlbl231F20"
        },
        "lblVehicleType": {
          "text": "Vehicle Type",
          "skin": "sknlbl9A9EA7"
        },
        "lblService": {
          "text": "Select Service",
          "skin": "sknlbl9A9EA7"
        },
        "lblPolishingOnly": {
          "text": "Polishing Only",
          "skin": "sknlbl231F20"
        },
        "lblDetailingOnly": {
          "text": "Detailing Only",
          "skin": "sknlbl231F20"
        },
        "lblCombo": {
          "text": "Polishing + Detailing (Combo)",
          "skin": "sknlbl231F20"
        },
        "tbxVehicleLottID": {
          "placeholder": "Vehicle Lot ID",
          "skin"       : "skntxt"
        },
        "txtAreaOptionalNotes": {
          "placeholder": "Optional Notes:  e.g., “Please prioritize interior detailing”",
          "skin"       : "skntxtArea"
        },
        "flxDropDownVehicleType": {
          "onClick": this.dropDownOnClick1.bind(this)
        },
        "flxSedan": {
          "isVisible": false,
          "onClick"  : this.flxSedanOnClick.bind(this)
        },
        "flxSUV": {
          "isVisible": false,
          "onClick"  : this.flxSUVOnClick.bind(this)
        },
        "flxDropDownService": {
          "onClick": this.dropDownOnClick2.bind(this)
        },
        "flxPolishingOnly": {
          "isVisible": false,
          "onClick"  : this.flxPolishingOnlyOnClick.bind(this)
        },
        "flxDetailingOnly": {
          "isVisible": false,
          "onClick"  : this.flxDetailingOnlyOnClick.bind(this)
        },
        "flxCombo": {
          "isVisible": false,
          "onClick"  : this.flxComboOnClick.bind(this)
        },
      }
    ];

    this.view.segService.setData(vehicleDetail);
    this.view.imgPayOnSite.isVisible = false;
    this.view.imgPayNow.isVisible = false;
  },

  dropDownOnClick1: function () 
  {
    var selectedRow = this.view.segService.selectedRowItems;

    if (!selectedRow || selectedRow.length === 0) 
    {
      voltmx.print("No row is selected");
      return;
    }

    var rowIndex = this.view.segService.selectedRowIndex[1];
    var rowData = selectedRow[0];

    var isNowVisible = rowData.flxSedan.isVisible;
    rowData.flxSedan.isVisible = !isNowVisible;
    rowData.flxSUV.isVisible = !isNowVisible;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(isNowVisible ? 0 : 180);

    rowData.imgVehicleDrop = {
      "src"      : "iconamoon_arrow_down_2.png",
      "transform": rotateTransform
    };

    this.view.segService.setDataAt(rowData, rowIndex);
  },

  dropDownOnClick2: function () {
    var selectedRow = this.view.segService.selectedRowItems;

    if (!selectedRow || selectedRow.length === 0) {
      voltmx.print("No row is selected");
      return;
    }

    var rowIndex = this.view.segService.selectedRowIndex[1];
    var rowData = selectedRow[0];

    var isNowVisible = rowData.flxPolishingOnly.isVisible;
    rowData.flxPolishingOnly.isVisible = !isNowVisible;
    rowData.flxDetailingOnly.isVisible = !isNowVisible;
    rowData.flxCombo.isVisible = !isNowVisible;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(isNowVisible ? 0 : 180);

    rowData.imgDown = {
      "src"      : "iconamoon_arrow_down_2.png",
      "transform": rotateTransform
    };

    this.view.segService.setDataAt(rowData, rowIndex);
  },

  handleInspectionSelection: function (selectedServiceLabel) {
    var rowIndex = this.view.segService.selectedRowIndex[1];
    var rowData = this.view.segService.selectedRowItems[0];

    rowData.lblVehicleType.text = selectedServiceLabel;
    rowData.lblVehicleType.skin = "sknlbl231F20";

    var isNowVisible = rowData.flxSedan.isVisible;
    rowData.flxSedan.isVisible = !isNowVisible;
    rowData.flxSUV.isVisible = !isNowVisible;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(isNowVisible ? 0 : 180);

    rowData.imgVehicleDrop = {
      "src"      : "iconamoon_arrow_down_2.png",
      "transform": rotateTransform
    };

    this.view.segService.setDataAt(rowData, rowIndex);
  },

  handleInspectionSelection2: function (selectedServiceLabel) {
    var rowIndex = this.view.segService.selectedRowIndex[1];
    var rowData = this.view.segService.selectedRowItems[0];

    rowData.lblService.text = selectedServiceLabel;
    rowData.lblService.skin = "sknlbl231F20";

    var isNowVisible = rowData.flxPolishingOnly.isVisible;
    rowData.flxPolishingOnly.isVisible = !isNowVisible;
    rowData.flxDetailingOnly.isVisible = !isNowVisible;
    rowData.flxCombo.isVisible = !isNowVisible;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(isNowVisible ? 0 : 180);

    rowData.imgDown = {
      "src"      : "iconamoon_arrow_down_2.png",
      "transform": rotateTransform
    };

    this.view.segService.setDataAt(rowData, rowIndex);
  },

  flxSedanOnClick: function () {
    this.handleInspectionSelection("Sedan");
  },
  flxSUVOnClick: function () {
    this.handleInspectionSelection("SUV");
  },
  flxPolishingOnlyOnClick: function () {
    this.handleInspectionSelection2("Polishing Only");
  },
  flxDetailingOnlyOnClick: function () {
    this.handleInspectionSelection2("Detailing Only");
  },
  flxComboOnClick: function () {
    this.handleInspectionSelection2("Polishing + Detailing (Combo)");
  },
  navigateToVehicleInspection: function () {
    new voltmx.mvc.Navigation("frmVehicleInspection").navigate();
  },

  payOnSiteClick: function (option) {
    if (option === "PayOnSite") {
      var Visible = this.view.imgPayOnSite.isVisible;
      this.view.imgPayOnSite.isVisible = !Visible;
      this.view.imgPayNow.isVisible = false;
      this.view.btnProceedPayment.isVisible = !Visible;
    } else if (option === "PayNow") {
      this.view.btnProceedPayment.isVisible = !Visible;
    }
  },
  processPayment: function()
  {
      var Visible = this.view.imgPayNow.isVisible;
      this.view.imgPayNow.isVisible = !Visible;
      this.view.imgPayOnSite.isVisible = false;

    var flag = this.view.imgPayOnSite.isVisible;
    
    if(flag)
    {
     
      new voltmx.mvc.Navigation("frmBookingConfirmationPAD").navigate();
    }
    else
    {
     
      new voltmx.mvc.Navigation("frmConfirmAndPayPAD").navigate();
    }
  },
  setData: function()
  {

    if(voltmx.i18n.getCurrentLocale() === "ar_AE")
    {
      this.view.lblBookYourPolishingAndDetailingService.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.lblPayOnSite.contentAlignment =constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.lblPayNow.contentAlignment =constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = true; 
      this.view.flx001.reverseLayoutDirection = true; 
      this.view.flx002.reverseLayoutDirection = true; 
    }
    else
    {
      this.view.lblBookYourPolishingAndDetailingService.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.lblPayOnSite.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.lblPayNow.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = false; 
      this.view.flx001.reverseLayoutDirection = false; 
      this.view.flx002.reverseLayoutDirection = false; 
     
    }

  }
});
