  define({ 

     onNavigate: function(context){
        this.adjustRTL();
        this.previousFormId = context && context.previousFormID? 
          context.previousFormID : "";
       
       this.previousFormAction= context && context.previousFormAction ? context.previousFormAction : " ";
 
       
       this.view.preShow = this.onPreShow.bind(this);
       this.view.segServices.onRowClick = this.onRowClickAction.bind(this);


          if(context && context.prevForm){
         this.prevForm = context.prevForm;
       }

          if(context && context.previousFormID){
         this.prevForm = context.previousFormID;
       }
       
         // Default: assume no navigation required
    let targetForm = null;

   
        // Case 1: Came from frmDetails
    if (context && context.lotId && context.objectId) {
      this.lotId = context.lotId;
      this.objectId = context.objectId;
    }
         // Case 2: Came from frmMyListings
    else if (context && context.lotIdfromListings && context.objectIdfromListings) {
      this.lotId = context.lotIdfromListings;
      this.objectId = context.objectIdfromListings;
    }
         // Case 3: Came from frmUnderReview
    else if (context&& context.lotIdfromUnderReview && context.objIdfromUnderReview) {
      this.lotId = context.lotIdfromUnderReview;
      this.objectId = context.objIdfromUnderReview;
    }
                 // Case 4: Came from frmWonBids
    else if (context&& context.objIdFromWonBids && context.lotIdFromWonBids) {
      this.lotId = context.lotIdFromWonBids;
      this.objectId = context.objIdFromWonBids;
    }
   
    // Handle navFormObj if passed
    if (context&&context.navFormObj) {
      this.navFormObj = context.navFormObj;
    }

    // Perform single fallback navigation
    if (targetForm) {
      new voltmx.mvc.Navigation(targetForm).navigate();
    }
//        this.view.flxBack.onClick = this.backArrowOnClick.bind(this);

     },
    
    
//     onPreShow: function () {
//   this.toggleFooterIcons();
 

      
//       var previousForm = voltmx.application.getPreviousForm();

//       if (previousForm && (

//         previousForm.id === "frmVehicleInspection" ||

//         previousForm.id === "frmRequestYourInspection" || 
//          previousForm.id === "frmRoadSideAssistance"||
//          previousForm.id === "frmRequestRoadSideAssistance"

//       )) {

//         var cachedServices = voltmx.store.getItem("lastFilteredServices");

//         if (cachedServices) {

//           var parsedServices = JSON.parse(cachedServices);

//           this.view.segServices.setData(parsedServices);

//           this.view.segServices.setVisibility(true);

//           this.view.lblNoServices.setVisibility(false);

//           return;

//         }

//       }
      
      
      
    
   
//   var services = [
//     {
//       "serviceId": "vehicle_inspection",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Inspection"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "valueservice1.png",
//       "roles": ["buyer", "seller"]
//     },
//     {
//       "serviceId": "vehicle_delivery",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Delivery"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "vehicledelnew.png",
//       "roles": ["buyer", "seller"]
//     },
//     {
//       "serviceId": "ownership_transfer",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Ownership Transfer"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "owntrnew.png",
//       "roles": ["buyer"]
//     }
//   ];
 
//   var mode = voltmx.store.getItem("mode");
//   var paymentStatus = voltmx.store.getItem("paymentStatusBCService");
//   var titleForService = (mode === "buyer" || mode === "seller") ? mode : "";
//   let filteredServices = [];
 
//   // ===  Set widgetDataMap
//   this.view.segServices.widgetDataMap = {
//     "lblServiceName": "lblServiceName",
//     "lblfare": "lblfare",
//     "btnBook": "btnBook",
//     "imgService": "imgService"
//   };
 
//   // ===  CASE 1: frmAllAuctionsList (special case for buyers only)
//   if (this.previousFormAction === "frmAllAuctionsList") {
//     if (titleForService === "buyer") {
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_inspection"
//       );
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       // Seller: no services
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }
 

//   else if (titleForService === "seller") {
//     const action = this.previousFormAction;
 
//     if (
//       action === "frmUnderReview" ||
//       action === "frmApprovedVehicles" ||
//       action === "frmLiveAuctions"
//     ) {
//       // Show both Vehicle Inspection  Delivery
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_inspection" ||
//         service.serviceId === "vehicle_delivery"
//       );
//     } else if (action === "frmUnsoldVehicles") {
//       // Show only Vehicle Delivery
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_delivery"
//       );
//     }
    
//     else if(action === "frmMyListings" || this.prevForm === "frmMyListings"){
      
//        filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_inspection" 
// //                                           ||
// //         service.serviceId === "vehicle_delivery"
//       );
//     }
    
//     else {
//       // Other seller forms: show nothing
//       filteredServices = [];
//     }
 
//     // Toggle UI
//     if (filteredServices.length > 0) {
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }
 
//   // ===  CASE 3: Buyer logic for ownership transfer, etc.
//   else if (titleForService === "buyer") {
//     filteredServices = services.filter(function (service) {
//       const hasAccess = service.roles.includes("buyer");
//     const action = this.previousFormAction;
      
      
//          if (action === "frmMyBidsPage") {
//        return service.serviceId === "vehicle_inspection" && hasAccess;
//       }
      
// //       if (this.previousFormId === "frmDetails") {
// //         if (service.serviceId === "ownership_transfer") {
// //           return hasAccess;
// //         }
// //         return hasAccess;
// //       }
      
// //       var payments= voltmx.store.getItem("paymentstatusofvehicle");
// //         if (this.previousFormId === "frmDetails") {
// //         if (service.serviceId === "ownership_transfer") {
// //           return  payments==="PAID" && hasAccess;
// //         }
// //         return hasAccess;
// //       }
      
//       var payments = voltmx.store.getItem("paymentstatusofvehicle");

// if (this.previousFormId === "frmDetails") {
//     if (service.serviceId === "ownership_transfer") {
//         if (payments) {
//             // Scenario1: Payment check is required
//             return payments === "PAID" && hasAccess;
//         } else {
//             // Scenario 2: No payment check
//             return hasAccess;
//         }
//     }
//     return hasAccess;
// }

      
 
//       if (this.previousFormId === "frmWonBids" || action === "frmWonBids") {
//         if (service.serviceId === "ownership_transfer") {
//           return paymentStatus === "PAID" && hasAccess;
//         }
//         return hasAccess;
//       }
      
   
 
//       return hasAccess;
//     }.bind(this));
 
//     // Toggle UI
//     if (filteredServices.length > 0) {
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }
 

//   this.view.segServices.setData(filteredServices);
      
//       voltmx.store.setItem("lastFilteredServices", JSON.stringify(filteredServices));
// },
    
// onPreShow: function () {
//   this.toggleFooterIcons();

//   // === Define services with serviceId ===
//   var services = [
//     {
//       "serviceId": "vehicle_inspection",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Inspection"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "valueservice1.png",
//       "roles": ["buyer", "seller"]
//     },
//     {
//       "serviceId": "vehicle_delivery",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Delivery"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "vehicledelnew.png",
//       "roles": ["buyer", "seller"]
//     },
//     {
//       "serviceId": "ownership_transfer",
//       "lblServiceName": voltmx.i18n.getLocalizedString("Ownership Transfer"),
//       "lblfare": voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
//       "btnBook": {
//         "onClick": this.onRowClickAction.bind(this),
//         "text": voltmx.i18n.getLocalizedString("Book | Schedule")
//       },
//       "imgService": "owntrnew.png",
//       "roles": ["buyer"]
//     }
//   ];

//   var mode = voltmx.store.getItem("mode");
//   var paymentStatus = voltmx.store.getItem("paymentStatusBCService");
//   var titleForService = (mode === "buyer" || mode === "seller") ? mode : "";
//   let filteredServices = [];

//   // ===  Set widgetDataMap
//   this.view.segServices.widgetDataMap = {
//     "lblServiceName": "lblServiceName",
//     "lblfare": "lblfare",
//     "btnBook": "btnBook",
//     "imgService": "imgService"
//   };

//   // ===  CASE 1: frmAllAuctionsList (special case for buyers only)
//   if (this.previousFormAction === "frmAllAuctionsList") {
//     if (titleForService === "buyer") {
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_inspection"
//       );
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       // Seller: no services
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }

//   // === CASE 2: Seller-specific logic
//   else if (titleForService === "seller") {
//     const action = this.previousFormAction;

//     if (
//       action === "frmUnderReview" ||
//       action === "frmApprovedVehicles" ||
//       action === "frmLiveAuctions"
//     ) {
//       // Show both Vehicle Inspection  Delivery
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_inspection" ||
//         service.serviceId === "vehicle_delivery"
//       );
//     } else if (action === "frmUnsoldVehiclesList") {
//       // Show only Vehicle Delivery
//       filteredServices = services.filter(service =>
//         service.serviceId === "vehicle_delivery"
//       );
//     } else {
//       // Other seller forms: show nothing
//       filteredServices = [];
//     }

//     // Toggle UI
//     if (filteredServices.length > 0) {
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }

//   // ===  CASE 3: Buyer logic for ownership transfer, etc.
//   else if (titleForService === "buyer") {
//     filteredServices = services.filter(function (service) {
//       const hasAccess = service.roles.includes("buyer");

//       if (this.previousFormId === "frmDetails") {
//         if (service.serviceId === "ownership_transfer") {
//           return hasAccess;
//         }
//         return hasAccess;
//       }

//       if (this.previousFormId === "frmWonBids") {
//         if (service.serviceId === "ownership_transfer") {
//           return paymentStatus === "PAID" && hasAccess;
//         }
//         return hasAccess;
//       }

//       return hasAccess;
//     }.bind(this));

//     // Toggle UI
//     if (filteredServices.length > 0) {
//       this.view.segServices.setVisibility(true);
//       this.view.lblNoServices.setVisibility(false);
//     } else {
//       this.view.segServices.setVisibility(false);
//       this.view.lblNoServices.setVisibility(true);
//     }
//   }

 
//   this.view.segServices.setData(filteredServices);
// },
    
  // === service list
getAllServices: function () {
  return [
    {
      "serviceId"     : "vehicle_inspection",
      "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Inspection"),
      "lblfare"       : voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
      "btnBook"       : {
        "onClick": this.onRowClickAction.bind(this),
        "text"   : voltmx.i18n.getLocalizedString("Book | Schedule")
      },
      "imgService": "valueservice1.png",
      "roles"     : ["buyer", "seller"]
    },
    {
      "serviceId"     : "vehicle_delivery",
      "lblServiceName": voltmx.i18n.getLocalizedString("Vehicle Delivery"),
      "lblfare"       : voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
      "btnBook"       : {
        "onClick": this.onRowClickAction.bind(this),
        "text"   : voltmx.i18n.getLocalizedString("Book | Schedule")
      },
      "imgService": "vehicledelnew.png",
      "roles"     : ["buyer", "seller"]
    },
    {
      "serviceId"     : "ownership_transfer",
      "lblServiceName": voltmx.i18n.getLocalizedString("Ownership Transfer"),
      "lblfare"       : voltmx.i18n.getLocalizedString("Fixed fare of AED300"),
      "btnBook"       : {
        "onClick": this.onRowClickAction.bind(this),
        "text"   : voltmx.i18n.getLocalizedString("Book | Schedule")
      },
      "imgService": "owntrnew.png",
      "roles"     : ["buyer"]
    }
  ];
},  
    adjustRTL: function()
    {
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      if(isArabic)
        {
           this.view.flxBack.right = "5%";
            this.view.flxBack.left = "";
          var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
        }
      else
        {
          this.view.flxBack.right = "";
            this.view.flxBack.left = "5%";
          this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
        }
     
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
   this.view.lblNoServices.text = voltmx.i18n.getLocalizedString("No Services Found");

    },
    onPreShow: function () {
  this.toggleFooterIcons();
  
  var previousForm = voltmx.application.getPreviousForm();
       this.view.flxBack.onClick = this.backArrowOnClick.bind(this);

  // === CASE: Restore cached services if coming from inspection/assistance forms
  if (
    previousForm &&
    (
      previousForm.id === "frmVehicleInspection" ||
      previousForm.id === "frmRequestYourInspection" ||
      previousForm.id === "frmRoadSideAssistance" ||
      previousForm.id === "frmRequestRoadSideAssistance"
    )
  ) {
    var cachedIds = voltmx.store.getItem("lastFilteredServices");

    if (cachedIds) {
      var parsedIds = JSON.parse(cachedIds);

      // Rebuild from  services 
      var rebuiltServices = this.getAllServices().filter(s =>
        parsedIds.includes(s.serviceId)
      );

      this.view.segServices.setData(rebuiltServices);
      this.view.segServices.setVisibility(true);
      this.view.lblNoServices.setVisibility(false);
      return;
    }
  }

 
  var services = this.getAllServices();

  var mode = voltmx.store.getItem("mode");
  var paymentStatus = voltmx.store.getItem("paymentStatusBCService");
  var titleForService = (mode === "buyer" || mode === "seller") ? mode : "";
  let filteredServices = [];

  
  this.view.segServices.widgetDataMap = {
    "lblServiceName": "lblServiceName",
    "lblfare"       : "lblfare",
    "btnBook"       : "btnBook",
    "imgService"    : "imgService"
  };

  // === CASE 1: frmAllAuctionsList (special case for buyers only)
  if (this.previousFormAction === "frmAllAuctionsList") {
    if (titleForService === "buyer") {
      filteredServices = services.filter(s =>
        s.serviceId === "vehicle_inspection"
      );
      this.view.segServices.setVisibility(true);
      this.view.lblNoServices.setVisibility(false);
    } else {
      this.view.segServices.setVisibility(false);
      this.view.lblNoServices.setVisibility(true);
    }
  }

  // === CASE 2: Seller logic
  else if (titleForService === "seller") {
    const action = this.previousFormAction;

    if (
      action === "frmUnderReview" ||
      action === "frmApprovedVehicles" ||
      action === "frmLiveAuctions"||
      action==="frmDashBoard"
    ) {
      // Show Vehicle Inspection + Delivery
      filteredServices = services.filter(s =>
        s.serviceId === "vehicle_inspection" ||
        s.serviceId === "vehicle_delivery"
      );
    } else if (action === "frmUnsoldVehicles") {
      // Show only Vehicle Delivery
      filteredServices = services.filter(s =>
        s.serviceId === "vehicle_delivery"
      );
    } else if (action === "frmMyListings" ||
               this.prevForm === "frmMyListings") {
      // Show only Vehicle Inspection
      filteredServices = services.filter(s =>
        s.serviceId === "vehicle_inspection"
      );
    } 
    
    else if (action==="frmPendingSaleConfirmation")
      {
        filteredServices = [];
      } 
    else {
      filteredServices = [];
    }

    // Toggle UI
    if (filteredServices.length > 0) {
      this.view.segServices.setVisibility(true);
      this.view.lblNoServices.setVisibility(false);
    } else {
      this.view.segServices.setVisibility(false);
      this.view.lblNoServices.setVisibility(true);
    }
  }

  // === CASE 3: Buyer logic
  else if (titleForService === "buyer") {
    filteredServices = services.filter(function (service) {
      const hasAccess = service.roles.includes("buyer");
      const action = this.previousFormAction;
      var payments = voltmx.store.getItem("paymentstatusofvehicle");

      if (action === "frmMyBidsPage" ) {
        return service.serviceId === "vehicle_inspection" && hasAccess;
      }
      
      if (action === "frmDashBoard" ) {
        return hasAccess;
      }

      if (this.previousFormId === "frmDetails") {
        if (service.serviceId === "ownership_transfer") {
          if (payments) {
            return payments === "PAID" && hasAccess;
          } else {
            return hasAccess;
          }
        }
        return hasAccess;
      }

      if (this.previousFormId === "frmWonBids" || action === "frmWonBids") {
        if (service.serviceId === "ownership_transfer") {
          return paymentStatus === "PAID" && hasAccess;
        }
        return hasAccess;
      }

      return hasAccess;
    }.bind(this));

    if (filteredServices.length > 0) {
      this.view.segServices.setVisibility(true);
      this.view.lblNoServices.setVisibility(false);
    } else {
      this.view.segServices.setVisibility(false);
      this.view.lblNoServices.setVisibility(true);
    }
  }

  // === Final step: set data + cache IDs
  this.view.segServices.setData(filteredServices);

  voltmx.store.setItem(
    "lastFilteredServices",
    JSON.stringify(filteredServices.map(s => s.serviceId))
  );
},


backArrowOnClick: function () {
    var prevForm1 = voltmx.application.getPreviousForm();
    var prevFormId = prevForm1 ? prevForm1.id : null;

    var NavForm           = voltmx.store.getItem("NavForm");
    var originFormFromBC  = voltmx.store.getItem("OriginFromForBC");
    var originForm01      = voltmx.store.getItem("originForm01");
    var originForm        = voltmx.store.getItem("originForm");
    var previousFormForCB = voltmx.store.getItem("previousFormForCB");
    var navForm           = voltmx.store.getItem("navForm");
    var navForm3          = voltmx.store.getItem("navForm3");
    var navForm2          = voltmx.store.getItem("navFormFromBids");
    var navForm4          = voltmx.store.getItem("originForm");

    voltmx.print("originFormFromBC: " + originFormFromBC);
    voltmx.print("originForm01: " + originForm01);
    voltmx.print("originForm: " + originForm);
    voltmx.print("previousFormForCB: " + previousFormForCB);
    voltmx.print("this.prevForm: " + this.prevForm);
    voltmx.print("prevForm1.id: " + prevFormId);

    var targetForm = "frmDashBoard"; // Default fallback
// alert(this.prevForm+"this.prevForm ");
//    alert(navForm3  +"navForm3  ");
  
       if (voltmx.store.getItem("comingFromDashboard")) {
    voltmx.print("Directly returning to Dashboard");
    new voltmx.mvc.Navigation("frmDashBoard").navigate();
    return; // Stop execution to avoid overwriting targetForm later
  }
  
    // Special handling when coming from RoadSideAssistance
    if (this.navFormObj === "RoadSideAssistance" &&
        navForm === "RoadSideAssistance") {

        if (this.prevForm === "Details" || navForm4 === "frmDetails") {
            targetForm = "frmDetails";
        } else if (this.prevForm === "UnderReview" 
                   ||this.prevForm === "frmUnderReview"||
                   navForm3 === "UnderReview") {
            targetForm = "frmUnderReview";
        } else if (this.prevForm === "MyListings" || navForm === "MyListings") {
            targetForm = "frmMyListings";
        } else if (this.prevForm === "frmWonBids" || navForm2 === "WonBids") {
            targetForm = "frmWonBids";
        }

    } 
  else {
        // General origin checks
    
   
        if (originFormFromBC === "frmUnderReview" ||
            originForm01     === "frmUnderReview" ||
            originForm       === "frmUnderReview" ||
            previousFormForCB === "frmUnderReview") {
            targetForm = "frmUnderReview";
        }
      else if (originFormFromBC === "frmWonBids" ||
                   originForm01 === "frmWonBids"  || 
               originForm === "frmWonBids" ) {
            targetForm = "frmWonBids";
        
        } 
    
     else if (this.prevForm === "MyListings" 
        || originForm01==="frmMyListings" || originForm==="frmMyListings" ) {
            targetForm = "frmMyListings";
        }
        else if (originFormFromBC === "frmDetails" ||
                   originForm01 === "frmDetails" || 
                 originForm ==="frmDetails") {
            targetForm = "frmDetails";
        
        } 
      else if (previousFormForCB === "frmDashBoard" ) {
            targetForm = "frmDashBoard";
        }
     
    }

    voltmx.print("Navigating to: " + targetForm);
    new voltmx.mvc.Navigation(targetForm).navigate();
},

 
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
     this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
    
    var isLogin =voltmx.store.getItem("isLogin");

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
  
  onRowClickAction: function()
  {
    var self = this;
    var selectedItem = self.view.segServices.selectedRowItems;
   if (selectedItem && selectedItem.length > 0) {
//     var serviceName = selectedItem[0].lblServiceName;
     var serviceId = selectedItem[0].serviceId;

    switch (serviceId) {
      case "vehicle_inspection":
         voltmx.store.setItem("originForm", "frmServices");
//             voltmx.store.setItem("originForm", "frmWonBids");
// 
//                  voltmx.store.setItem("originForm", "frmUnderReview");
        if(voltmx.application.getPreviousForm().id === "frmDashBoard"){
           voltmx.store.setItem("preFormForVI","frmDashBoard");
        }
        else
          {
            voltmx.store.removeItem("preFormForVI");
          }
       
//         new voltmx.mvc.Navigation("frmVehicleInspection").navigate(
//             { previousFormId: self.previousFormId}
 
//         );
          new voltmx.mvc.Navigation("frmCominSoonServices").navigate(
           { previousFormId: self.previousFormId}
         );
        break;

      case "vehicle_delivery":
         new voltmx.mvc.Navigation("frmRoadSideAssistance").navigate({
          "lotId"   : self.lotId,
       "objectId": self.objectId,
           "prevForm": "Services"
         });
        break;

      case "ownership_transfer":
        voltmx.store.setItem("originForm", "frmServices");
       voltmx.store.setItem("previousFormForCB", "frmServices");
         new voltmx.mvc.Navigation("frmCominSoonServices").navigate(
           { previousFormId: self.previousFormId}
         );
        break;

      case "Polishing & Detailing":
         new voltmx.mvc.Navigation
         ("frmPolishingAndDetailingOverview").navigate();
        break;

      case "Maintenance & Repairs":
       new voltmx.mvc.Navigation("frmMaintenanceAndRepairs").navigate();
        break;

      default:
    
        break;
    }
  } else {
    alert("No service selected.");
  }
  },
  
  

 });