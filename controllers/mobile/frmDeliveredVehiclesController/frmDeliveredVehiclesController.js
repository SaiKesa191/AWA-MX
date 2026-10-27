define({

  onNavigate: function() 
  {
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    }.bind(this);
    
    this.view.tbxSearch.onTextChange = this.setFilterToSeg.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
  },
  
  onPreShow: function()
  {
    var self = this;
    
    this.view.tbxSearch.text = "";
     this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segDeliveredVehicles.setData([]);
    this.view.btnLoadMore.setVisibility(false);
    this.view.lblNorecords.setVisibility(false);
    this.toggleFooterIcons();
    self.invokeDeliveredVehicles();
//      this.checkSession(function() {
        
//         voltmx.print("Session is valid. Proceeding with data load.");
       
      
//     });
   
  },
  
    onPostShow: function()
  {
     this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    
  },
  
   

  
  setFilterToSeg: function()
  {
    var self = this;
     var searchText = self.view.tbxSearch.text.trim().toLowerCase();
  
  if (!self.originalSegData) return;

  if (searchText === "") {
    // Reset to full list
    self.view.lblNorecords.setVisibility(false);
    self.view.segDeliveredVehicles.setData(self.originalSegData);
    return;
  }

  var filteredData = self.originalSegData.filter(function(item) {
    return item.lblCarName.toLowerCase().includes(searchText);
  });

  self.view.segDeliveredVehicles.setData(filteredData);
    
  if (filteredData.length === 0) {
   self.view.lblNorecords.setVisibility(true);
  self.view.btnLoadMore.setVisibility(false);
} else {
  self.view.lblNorecords.setVisibility(false);
  self.view.btnLoadMore.setVisibility(true);
}  
    
  },
  
   onLoadMoreClick: function() {
   voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  this.pageSize += 10;
  this.invokeDeliveredVehicles(); // Will bring all up to new pageSize
},
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(true);
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = "My Bids";
    }
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
   this.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100"; 
  
    
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
  
  invokeDeliveredVehicles: function()
  {
    var self = this;
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    function invokeDeliveredCallBack(status, seller_delivered_vehicles) {
      voltmx.print(seller_delivered_vehicles);
      var records = seller_delivered_vehicles.records
      self.vehicleDetails(records);
    }
    if (seller_delivered_vehicles_inputparam == undefined) {
        var seller_delivered_vehicles_inputparam = {};
    }
    seller_delivered_vehicles_inputparam["serviceID"] = "fry_int_seller$seller-delivered-vehicles";
    seller_delivered_vehicles_inputparam["user_id"] = userid;
    seller_delivered_vehicles_inputparam["page"] = "1";
    seller_delivered_vehicles_inputparam["pageSize"] = String(self.pageSize);
    var seller_delivered_vehicles_httpheaders = {
      "user_token": usertoken
    };
    seller_delivered_vehicles_inputparam["httpheaders"] = seller_delivered_vehicles_httpheaders;
    var seller_delivered_vehicles_httpconfigs = {};
    seller_delivered_vehicles_inputparam["httpconfig"] = seller_delivered_vehicles_httpconfigs;
    fry_int_seller$seller_delivered_vehicles = mfintegrationsecureinvokerasync(seller_delivered_vehicles_inputparam, "fry_int_seller", "seller-delivered-vehicles", invokeDeliveredCallBack);

  },

  vehicleDetails: function(records) 
  {
    var self = this;
    var vehicleDetail = [];
     
     var newRecords = records.slice(self.currentOffset);
    for(var i =0 ;i<newRecords.length ;i++){
      var item = newRecords[i];
      vehicleDetail.push(
      { 
        "imgCardata"              : item.file_url ? item.file_url : "car3.png",
        "lblCarName"         : item.title ? item.title : "N/A",
        "lblLot"                  : "Lot #",
        "lblLocationValue"          : item.location ? item.location : "N/A",
        "lblLotValue"               : item.lot_no ? item.lot_no : "N/A",
        "lblLocation"             : "Location",
        "lblHighestBid"           : "Highest Bid",
        "lblBuyerPaymentStatus"   : "Buyer Payment Status",
        "lblETPaymentStatus"      : "ET Payment Status",
        "lblVehicleStatus"        : "Vehicle status",
        "lblHighestBidValue"        : item.bid_amount ? item.bid_amount : "N/A",
        "lblETPaymentStatusValue": item.payment_status ? item.payment_status : "N/A",
        "lblETPaymentStatusVal"   : item.payment_status ? item.payment_status : "N/A",
        "lblVehicleStatusValue"     : item.status ? item.status : "N/A",
        "imgContactSupport"       : "contactnew.png",
        "imgViewInvoice"          : "ep_document.png",
        "lblViewInvoice"          : "View Invoice",
        "lblContactSupport"       : "Contact Support",
        "flxContactSupport": {
          "onClick": this.navToContactPage.bind(this)
        }
         });

    }
      
    

    
     voltmx.application.dismissLoadingScreen()();
    self.originalSegData = vehicleDetail;
    
     self.view.segDeliveredVehicles.addAll(vehicleDetail);
    
    
     if (self.pageSize > records.length) {
    self.view.btnLoadMore.setVisibility(false);
  } else {
    self.view.btnLoadMore.setVisibility(true);
  }
      self.currentOffset += newRecords.length;
  },
  
  navToContactPage: function()
  {
     voltmx.store.setItem("contactBackForm","frmDeliveredVehicles");
    new voltmx.mvc.Navigation("frmContactUS").navigate();
    
  }


});
