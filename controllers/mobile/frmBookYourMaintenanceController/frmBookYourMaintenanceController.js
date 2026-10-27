define({

  onNavigate: function() 
  {
    //this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
    this.setDataToVehicleLotIDSeg();
    this.setData();
    this.view.flxImg.onClick=this.selectBuyerOrSeller.bind(this);
    this.view.segBuyerOrSeller.onRowClick=this.assignValue.bind(this);
    this.view.segVehicleLotID.onRowClick = this.assignVehicleLotID.bind(this);
    this.view.flxVehicleLotDropDown.onClick = this.selectVehicleLotID.bind(this);
    this.view.flxPayOnSite.onClick = this.payOnSiteClick.bind(this, "PayOnSite");
    this.view.flxPayNow.onClick = this.payOnSiteClick.bind(this, "PayNow");
    this.view.flxBack.onClick = this.navigateToVehicleInspection.bind(this);
    this.view.btnbookAndPayNow.onClick = this.processPayment.bind(this,"bookAndPay");
    this.view.btnConfirmBooking.onClick = this.processPayment.bind(this,"Confirm");
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

  payOnSiteClick: function(option) 
  {
    if (option === "PayOnSite") {
      var Visible = this.view.imgPayOnSite.isVisible;
      this.view.imgPayOnSite.isVisible = !Visible;
      this.view.imgPayNow.isVisible = false;
      this.view.btnConfirmBooking.isVisible = !Visible;
      // this.view.btnbookAndPayNow.isVisible = Visible;
    } else if (option === "PayNow") {
      var Visible = this.view.imgPayNow.isVisible;
      this.view.imgPayNow.isVisible = !Visible;
      this.view.imgPayOnSite.isVisible = false;
      this.view.btnbookAndPayNow.isVisible = !Visible;
      //this.view.btnConfirmBooking.isVisible = Visible;
    }
  },
  navigateToVehicleInspection: function() {
    new voltmx.mvc.Navigation("frmVehicleInspection").navigate();
  },
  processPayment: function(type)
  {
      var isBuyerOrSellerSelected = this.view.lblBuyerOrSeller.text !== "Select Service";
      var isLotIdSelected = this.view.lblVehicleLotIdDynamic.text !== "Select Lot ID";
    var mmaintenanceAndRepairData = {
      "service": this.view.lblBuyerOrSeller.text,
      "lotId"  : this.view.lblVehicleLotIdDynamic.text,
      "notes"  : this.view.TXtAreaOptionalNotes.text
    };
    voltmx.store.setItem("mmaintenanceAndRepairData", mmaintenanceAndRepairData);
    //alert(JSON.stringify(voltmx.store.getItem("mmaintenanceAndRepairData")));
  if (!isBuyerOrSellerSelected && !isLotIdSelected) 
      {
        alert("Kindly select Service type, and also select the Lot ID.");
      } else if (!isBuyerOrSellerSelected) 
      {
        alert("Kindly select Service type.");
      } else if (!isLotIdSelected) 
      {
        alert("Kindly select the Lot ID.");
      } else if(type==="bookAndPay")
    {
      new voltmx.mvc.Navigation("frmConfirmAndPayMr").navigate();
    }
    else
    {

      new voltmx.mvc.Navigation("frmBookingConfirmationMR").navigate();
    }
  },
  selectBuyerOrSeller: function() {
    //     voltmx.print("entered");

    if (this.view.flxDropDown.isVisible === true) {
      this.view.flxDropDown.setVisibility(false);
      this.view.imgDropDown.src="dropdownimg.png";
    } else {
      this.view.flxDropDown.setVisibility(true);
      this.view.imgDropDown.src="uparrowfromvehicleinsp.png";
    }

    //     voltmx.print("exit");
  },
  selectVehicleLotID: function()
  {
    if (this.view.flxVehicleLotDropDownData.isVisible === true) {
      this.view.flxVehicleLotDropDownData.setVisibility(false);
      this.view.imgVehicleDrop.src="dropdownimg.png";
    } else {
      this.view.flxVehicleLotDropDownData.setVisibility(true);
      this.view.imgVehicleDrop.src="uparrowfromvehicleinsp.png";
    }
  },
  assignValue: function(){

    //      voltmx.print("entered");
    //     alert(this.view.segBuyerOrSeller.selectedRowItems[0].lbl01);
    this.view.lblBuyerOrSeller.text=
      this.view.segBuyerOrSeller.selectedRowItems[0].lbl01;

    this.view.lblBuyerOrSeller.skin="sknlbl231F20Dubai20px45";
    this.view.imgDropDown.src="dropdownimg.png";
    if(this.view.flxDropDown.isVisible === true)
    {
      this.view.flxDropDown.setVisibility(false);
    }
    else
    {
      this.view.flxDropDown.setVisibility(true);
    }

    //      voltmx.print("exit");
  },
  assignVehicleLotID: function()
  {
    this.view.lblVehicleLotIdDynamic.text=
      this.view.segVehicleLotID.selectedRowItems[0].lbl01;
    this.view.lblObjectId.text =  this.view.segVehicleLotID.selectedRowItems[0].lblOjectID;

    this.view.lblVehicleLotIdDynamic.skin="sknlbl231F20Dubai20px45";
    this.view.imgVehicleDrop.src="dropdownimg.png";
    if(this.view.flxVehicleLotDropDownData.isVisible === true)
    {
      this.view.flxVehicleLotDropDownData.setVisibility(false);
    }
    else
    {
      this.view.flxVehicleLotDropDownData.setVisibility(true);
    }
  },
  setDataToVehicleLotIDSeg: function()
  {
    var previousForm = voltmx.application.getPreviousForm().id;

    //     if (previousForm && previousForm !== "frmRoadSideAssistance") {
    //      alert("Previous Form :"+previousForm);
    //       this.view.flxVehicleLotDropDown.isVisible = false;
    //       this.view.flxVehicleLotDropDownData.isVisible = false;
    //       this.view.lblVehicleLotIdDynamic.text = "#76821";
    //       this.view.lblVehicleLotIdDynamic.skin = "sknlbl231F20Dubai20px45";
    //     } else {
    //alert("setDataTo Vehicle Called");
    var self = this;
    var userId = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userObj = voltmx.store.getItem("userObject");

    var jobTitle = "";
    if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
      jobTitle = userObj.rawResponse.job_title;
    } else {
      alert("Warning: job_title is missing from user object.");
    }

    var user_fleet_received_vehicles_inputparam = {};
    user_fleet_received_vehicles_inputparam["serviceID"] = "fry_int_fleet$user-fleet-received-vehicles";
    user_fleet_received_vehicles_inputparam["user_id"] = userId;
    user_fleet_received_vehicles_inputparam["title"] = "";
    user_fleet_received_vehicles_inputparam["chassis_no"] = "";
    user_fleet_received_vehicles_inputparam["target_selling_price"] = "";
    user_fleet_received_vehicles_inputparam["location"] = "";
    user_fleet_received_vehicles_inputparam["job_title"] = jobTitle;
    user_fleet_received_vehicles_inputparam["page"] = "1";
    user_fleet_received_vehicles_inputparam["pageSize"] = "20";

    var user_fleet_received_vehicles_httpheaders = {
      "user_token": usertoken
    };
    user_fleet_received_vehicles_inputparam["httpheaders"] = user_fleet_received_vehicles_httpheaders;

    var user_fleet_received_vehicles_httpconfigs = {};
    user_fleet_received_vehicles_inputparam["httpconfig"] = user_fleet_received_vehicles_httpconfigs;

    fry_int_fleet$user_fleet_received_vehicles = mfintegrationsecureinvokerasync(
      user_fleet_received_vehicles_inputparam,
      "fry_int_fleet",
      "user-fleet-received-vehicles",
      function (status, response) {

        voltmx.application.dismissLoadingScreen();
        //alert("response from Approved Vehicles :" + JSON.stringify(response));
        //alert(JSON.stringify(response));
        voltmx.print("****************"+JSON.stringify(response)+"****************************");
        var data = response.records;

        if (Array.isArray(data) && data.length > 0) {
          //       self.view.flxVehicleLotID.setVisibility(false);
          //       self.view.flxLotID.setVisibility(true);
          //alert("data :" + JSON.stringify(data));
          var segData = [];
          for (var i = 0; i < data.length; i++) {
            //alert("enter into for loop");
            var item = {
              "lbl01"       : data[i].lot_no || "N/A",
              "lblSeperator": "-",
              "lblName"     : data[i].title || "N/A",
              "lblOjectID"  : data[i].object_id || "N/A"
            };
            segData.push(item);
          }
          //alert(" Approved Vehicles :" + JSON.stringify(segData));
          self.view.segVehicleLotID.setData(segData); 
        }
      }
    );

  },
  
  setData: function()
  {

    if(voltmx.i18n.getCurrentLocale() === "ar_AE")
    {
      this.view.lblHeadder.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.CopylblPayOnSite0e67f3d56c40c4f.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.CopylblPayNow0a8fae36a79134e.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = true; 
      this.view.flx001.reverseLayoutDirection = true;
      this.view.flx002.reverseLayoutDirection = true;
    }
    else
    {
      this.view.lblHeadder.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.CopylblPayOnSite0e67f3d56c40c4f.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.CopylblPayNow0a8fae36a79134e.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = false;
      this.view.flx001.reverseLayoutDirection = false;
      this.view.flx002.reverseLayoutDirection = false;
      
      
    }

  }


});
