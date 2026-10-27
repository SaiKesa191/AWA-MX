define({

  onNavigate: function() 
  {
    this.vehicleDetails();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxLoadMore.onClick = this.loadMoreOnClick.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
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
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
   this.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100"; 
    
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
  
  vehicleDetails: function() 
  {
    var vehicleDetail = [
      { 
        "imgCardata"          : "dashboardcarouselnew1.jpg",
        "lblCarmodelname"     : "Kia Carnival 2019",
        "lblLot"              : "Lot #",
        "lblLotNum"           : "69952",
        "lblLocation"         : "Location",
        "lblApprovalStatus"   : "APPROVAL STATUS",
        "lblPendingStatus"    : "PAYMENT STATUS",
        "lblWinningBid"       : "WINNING BID",
        "lblLocationVal"      : "Abu Dhabi",
        "lblPaymentStatusVal" : "UNPAID",
        "lblWinningBidVal"    : "10,000",
        "lblApprovalStatusVal": "APPROVED",
        "lblRequestServices"  : "REQUEST SERVICES",
        "lblDocuments"        : "DOCUMENTS",   
        "imgRequestAccess"    : "reqestservices.png",
        "imgDocument"         : "ep_document.png",
        "btnPayNow"           : 
          {
            "text"   : "PAY NOW",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnBidnowOnClick.bind(this)
          },
         "btnRequestDelivery":
          {
            "text"   : "REQUEST DELIVERY",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnRequestDeliveryOnClick.bind(this)
          }
         },
      { 
        "imgCardata"          : "dashboardcarouselnew1.jpg",
        "lblCarmodelname"     : "Kia Carnival 2019",
        "lblLot"              : "Lot #",
        "lblLotNum"           : "69952",
        "lblLocation"         : "Location",
        "lblApprovalStatus"   : "APPROVAL STATUS",
        "lblPendingStatus"    : "PAYMENT STATUS",
        "lblWinningBid"       : "WINNING BID",
        "lblLocationVal"      : "Abu Dhabi",
        "lblPaymentStatusVal" : "UNPAID",
        "lblWinningBidVal"    : "10,000",
        "lblApprovalStatusVal": "APPROVED",
        "lblRequestServices"  : "REQUEST SERVICES",
        "lblDocuments"        : "DOCUMENTS",   
        "imgRequestAccess"    : "reqestservices.png",
        "imgDocument"         : "ep_document.png",
        "btnPayNow"           : 
          {
            "text"   : "PAY NOW",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnBidnowOnClick.bind(this)
          },
         "btnRequestDelivery":
          {
            "text"   : "REQUEST DELIVERY",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnRequestDeliveryOnClick.bind(this)
          }
         },
      { 
        "imgCardata"          : "dashboardcarouselnew1.jpg",
        "lblCarmodelname"     : "Kia Carnival 2019",
        "lblLot"              : "Lot #",
        "lblLotNum"           : "69952",
        "lblLocation"         : "Location",
        "lblApprovalStatus"   : "APPROVAL STATUS",
        "lblPendingStatus"    : "PAYMENT STATUS",
        "lblWinningBid"       : "WINNING BID",
        "lblLocationVal"      : "Abu Dhabi",
        "lblPaymentStatusVal" : "UNPAID",
        "lblWinningBidVal"    : "10,001",
        "lblApprovalStatusVal": "APPROVED",
        "lblRequestServices"  : "REQUEST SERVICES",
        "lblDocuments"        : "DOCUMENTS",   
        "imgRequestAccess"    : "reqestservices.png",
        "imgDocument"         : "ep_document.png",
        "btnPayNow"           : 
          {
            "text"   : "PAY NOW",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnBidnowOnClick.bind(this)
          },
         "btnRequestDelivery":
          {
            "text"   : "REQUEST DELIVERY",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnRequestDeliveryOnClick.bind(this)
          }
         },
      { 
        "imgCardata"          : "dashboardcarouselnew1.jpg",
        "lblCarmodelname"     : "Kia Carnival 2019",
        "lblLot"              : "Lot #",
        "lblLotNum"           : "69952",
        "lblLocation"         : "Location",
        "lblApprovalStatus"   : "APPROVAL STATUS",
        "lblPendingStatus"    : "PAYMENT STATUS",
        "lblWinningBid"       : "WINNING BID",
        "lblLocationVal"      : "Abu Dhabi",
        "lblPaymentStatusVal" : "UNPAID",
        "lblWinningBidVal"    : "10,001",
        "lblApprovalStatusVal": "APPROVED",
        "lblRequestServices"  : "REQUEST SERVICES",
        "lblDocuments"        : "DOCUMENTS",   
        "imgRequestAccess"    : "reqestservices.png",
        "imgDocument"         : "ep_document.png",
        "btnPayNow"           : 
          {
            "text"   : "PAY NOW",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnBidnowOnClick.bind(this)
          },
         "btnRequestDelivery":
          {
            "text"   : "REQUEST DELIVERY",
            "skin"   : "sknBtnBid61B35C8pxradius",
            "onClick": this.btnRequestDeliveryOnClick.bind(this)
          }
         }
    ];

    this.view.segPendingDelivery.setData(vehicleDetail);
  },
  btnBidnowOnClick: function()
  {
    alert("btnPayNow Clicked..!!");
  },
  btnRequestDeliveryOnClick: function()
  {
    alert("btnRequestDelivery Clicked..!!");
  },
  loadMoreOnClick: function()
  {
    alert("Load More Button is Clicked..!!");
  }
  

});
