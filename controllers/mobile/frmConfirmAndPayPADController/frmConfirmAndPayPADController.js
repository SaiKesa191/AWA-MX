define({

  onNavigate: function () {
    // Set up UI data and button click handlers
    this.settingData();

    this.view.btnCancel.onClick = this.navigateToBookYourPolish.bind(this);
    this.view.btnPayNow.onClick = this.navigateToPayment.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
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

  navigateToBookYourPolish: function () {
    // Called when Cancel button is clicked
    alert("Cancel Button");
  },

  navigateToPayment: function () {
    // Called when Pay Now button is clicked
    alert("PayNow Button");
  },

  settingData: function () {
    // Populate segment data
   

    var rowData = [
      {
        "lblVehicleType": {
          "text": "Vehicle Type",
          "skin": "sknlbl767676Dubai16px45"
        },
        "lblVehicleTypeVal": {
          "text": "Sedan",
          "skin": "sknlbl000000Dubai16px45"
        },
        "lblServiceType": {
          "text": "Service Type",
          "skin": "sknlbl767676Dubai16px45"
        },
        "lblServiceTypeVal": {
          "text": "Polishing Only",
          "skin": "sknlbl000000Dubai16px45"
        },
        "lblVehicleLotID": {
          "text": "Vehicle Lot ID",
          "skin": "sknlbl767676Dubai16px45"
        },
        "lblVehicleLotIDVal": {
          "text": "#76821",
          "skin": "sknlbl000000Dubai16px45"
        },
        "lblOptionalNotes": {
          "text": "Optional Notes",
          "skin": "sknlbl767676Dubai16px45"
        },
        "lblOptionalNotesVal": {
          "text": "Deep-cleaning and restoring your vehicle’s interior surfaces, including seats, dashboard, carpets, and trims. Perfect for removing dust, stains, and odors.",
          "skin": "sknlbl000000Dubai16px45"
        },
        "lblAmountPayable": {
          "text": "Amount Payable",
          "skin": "sknlbl767676Dubai16px45"
        },
        "lblAmountPayableVal": {
          "text": "Service Fee: 150.00 AED\nTax Fee: 7.50 AED\nTotal cost: 157.50 AED",
          "skin": "sknlbl000000Dubai16px45"
        }
      }
    ];

    this.view.segData.setData(rowData);

   
  }

});
