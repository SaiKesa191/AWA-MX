define({
  onNavigate: function (context) {
 
    this.setData();
    this.navigationData = context || {};
    this.previousFormId = context && context.previousFormId ?
      context.previousFormId : "";

    this.lotIdValidationError = false;
 
    if (this.navigationData.service) {
     
      if (this.navigationData && this.view.lblServiceType) {
        this.view.lblServiceType.text = this.navigationData.service || "";
      }
   
      if (this.view.lblServiceType) {
        this.service = this.view.lblServiceType.text;
      } else {
        voltmx.print(" lblServiceType not found in the view.");
      }

    }

    if (this.service) {
      this.assignValue();
    }

    //     this.objectId=null;
    this.view.preShow = this.onPreShow.bind(this);
//     this.fillingLotID();
    this.view.flxBack.onClick=this.navigateBack.bind(this);
    //     this.view.flxImgdownArrow.onClick = this.selectServiceType.bind(this);
    //     this.view.segServices.onRowClick = this.assignValue.bind(this);
    this.view.btnProceedPayment.onClick = 
      this.btnProceedToPayOnclick.bind(this);
    this.view.flxImrDropDown01.onClick=this.selectLotID.bind(this);
    this.view.segLotIDs.onRowClick=this.assignValueForLotId.bind(this);
    this.storeFormInputAsJSON();
    //      this.assignValue();
    

  },

  onPreShow: function () {
    
    
       this.view.btnProceedPayment.skin=
         "sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45";

      this.setUpDataPreshow();
    this.toggleFooterIcons();
    this.view.lblServiceTypeError.setVisibility(false);
    this.view.lblvehicleLoterror01.setVisibility(false);
    this.view.lblvehicleerror02.setVisibility(false);
    this.view.flxSegLotIDs.setVisibility(false);

    
//       this.fillingLotID();
   
    
//     if(this.view.flxError){
//        this.view.flxError.setVisibility(false);
//     }
    this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    
//       if(this.view.SmthngWentWrong){
//          this.view.SmthngWentWrong.setVisibility(false);
//        }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }

    
             if(this.view.flxServiceError.btnTryAgain){
      this.view.flxServiceError.btnTryAgain.onClick = () =>{
       this.view.flxServiceError.setVisibility(false);
      }
    }
   

  },
  
    flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
       this.setUpDataPreshow();
    } else {
      voltmx.print("Still offline...");
    }
  },
  
  setUpDataPreshow: function(){
    
    var prevform= voltmx.store.getItem("preFormForVI");
      var keepVehicleLotForms = [
    "frmDetails",
    "frmVehicleInspection",
    "frmUnderReview",
    "frmWonBids",
    "frmMyListings",
       "frmServices" 
  ];

  if (keepVehicleLotForms.indexOf(prevform) !== -1) {
   
    this.view.flxVehicleLotID.setVisibility(true);
    this.view.flxLotID.setVisibility(false);

//     voltmx.print("Keeping VehicleLotID data as previous form is: " + prevform);
    
     if (this.previousFormId ==="frmDetails"||
          this.previousFormId ==="frmVehicleInspection") {
        //         var lotData = { "lotid": "#76821" };
        var lotData = voltmx.store.getItem("lotIdForVI");
        //          voltmx.store.setItem("objidForVI", objid);
        var objectid;
        this.objectid= voltmx.store.getItem("objidForVI");
        

//     voltmx.store.setItem("objidForVI", objid);
//     voltmx.store.setItem("lotidForVI", lotno);
     
        if(lotData){
          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);
          var lotId=lotData.lotid || lotData;
          this.view.lblvehicleLotID.text = lotId;
         this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"

          //         voltmx.store.setItem("lotid", value01);
          voltmx.store.setItem("lotId", lotId);
        }
        else{

          alert("lotIdForVI not found in store");
        }
      }
      else if (this.previousFormId === "frmUnderReview"
                                || this.previousFormId === "frmVehicleInspection") {

        //              voltmx.store.setItem("lotIdForVI",item.lot_no);//for VI service

        var lotData = voltmx.store.getItem("lotidForVI");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidForVI");   
                this.objectid = voltmx.store.getItem("objidForVI");   

        if (lotData) {
          // alert("lotIdFromfleet:" + JSON.stringify(lotData));
          //            voltmx.store.setItem("objidForVI",objid);
          //     voltmx.store.setItem("lotidForVI",lotno);


          //        voltmx.store.setItem("objidBCService", selectedItem.objid);
          //     voltmx.store.setItem("lotNoBCService", selectedItem.lblLotValue.text);
          //     voltmx.store.setItem("paymentStatusBCService", selectedItem.lblpaymentstatusvalue.text);

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId;
        this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"

          voltmx.store.setItem("lotId", lotId); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
      }
      
      else if(this.previousFormId===  "frmWonBids"
              || this.previousFormId === "frmVehicleInspection"){
        
         var lotData = voltmx.store.getItem("lotNoBCService");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidBCService");   
                this.objectid = voltmx.store.getItem("objidBCService");   

        if (lotData) {

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId01 = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId01;
          this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"

          voltmx.store.setItem("lotId", lotId01); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
        
        
        
      }
      
      else if(this.previousFormId===  "frmMyListings"
              || this.previousFormId === "frmVehicleInspection"){
        
//  voltmx.store.setItem("objidForVI", objid);
//     voltmx.store.setItem("lotidForVI", lotno);
        
         var lotData = voltmx.store.getItem("lotidForVI");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidForVI");   
                this.objectid = voltmx.store.getItem("objidForVI");   

        if (lotData) {
          // alert("lotIdFromfleet:" + JSON.stringify(lotData));
          //            voltmx.store.setItem("objidForVI",objid);
          //     voltmx.store.setItem("lotidForVI",lotno);


          //        voltmx.store.setItem("objidBCService", selectedItem.objid);
          //     voltmx.store.setItem("lotNoBCService", selectedItem.lblLotValue.text);
          //     voltmx.store.setItem("paymentStatusBCService", selectedItem.lblpaymentstatusvalue.text);

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId;
          this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"

          voltmx.store.setItem("lotId", lotId); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
      } 
    
    
    
  }
    else {
   
    this.view.flxLotID.setVisibility(true);
    this.view.flxVehicleLotID.setVisibility(false);   
              voltmx.application.showLoadingScreen(null, "Loading..",                                             constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

        var self = this;
        var userId = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        var userObj = voltmx.store.getItem("userObject");

        var baseURL = voltmx.store.getItem("BASE_URL");
        if(baseURL){
          if (!baseURL.endsWith("/")) {
            baseURL += "/";
          }
        }

        var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
        var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

        var encodeVal = base64Encode(appkey + ":" + appsecret);
        //          var url = baseURL +"services/ms_common/api/v1/create-payment-record";

        //         var jobTitle = "";
        //         if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
        //           jobTitle = userObj.rawResponse.job_title;
        //         } else {
        //           alert("Warning: job_title is missing from user object.");
        //         }

        //         var jobTitle = "";
        //         if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
        //           var rawTitle = userObj.rawResponse.job_title;
        //           var roles = rawTitle.split(";").map(function(role) {
        //             return role.trim().toLowerCase();
        //           });

        //           if (roles.includes("buyer")) {
        //             jobTitle = "buyer";
        //           } else {
        //             alert("Required role 'buyer' not found in job_title.");
        //           }
        //         } else {
        //           alert("Warning: job_title is missing from user object.");
        //         }


        var mode = voltmx.store.getItem("mode");

        var titleForService = "";

        if (mode && mode === "buyer" || mode==="seller") {
          this.titleForService = mode;
        } else {
          alert("Required role 'buyer'or 'seller' not found");
        }





        //       


        //         if (get_user_vechile_list_for_services_inputparam == undefined) {
        var get_user_vechile_list_for_services_inputparam = {};
        //     }
        get_user_vechile_list_for_services_inputparam["serviceID"] =
          "fry_int_common$get-user-vechile-list-for-services";
        get_user_vechile_list_for_services_inputparam["user_id"] = userId;  
        //           get_user_vechile_list_for_services_inputparam["user_id"]="0ebacdfa-7ce1-46ee-9d63-b09f3d266187";
        get_user_vechile_list_for_services_inputparam["service_type"] ="CI";
        get_user_vechile_list_for_services_inputparam["title"] = this.titleForService;

        var get_user_vechile_list_for_services_httpheaders = {
          "user_token": usertoken
        };
        get_user_vechile_list_for_services_inputparam["httpheaders"] = 
          get_user_vechile_list_for_services_httpheaders;
        var get_user_vechile_list_for_services_httpconfigs = {};
        get_user_vechile_list_for_services_inputparam["httpconfig"] = 
          get_user_vechile_list_for_services_httpconfigs;
        fry_int_common$get_user_vechile_list_for_services =
          mfintegrationsecureinvokerasync
        (get_user_vechile_list_for_services_inputparam, 
         "fry_int_common",
         "get-user-vechile-list-for-services",
         function (status, response) {
          
          try{
            
              voltmx.application.dismissLoadingScreen();
          // alert("response from Vehicles :" +
          //   JSON.stringify(response));
          if(response && response.opstatus && response.opstatus === 1011){
            if(self.view.flxError){
              voltmx.print("entered");
              self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
              self.view.flxError.setVisibility(true);
            }
            return;
          }
          
          
            
        if (response && response.opstatus && response.opstatus >= 500) {
      if (self.view.flxServiceError) {
        self.view.flxServiceError.lblServiceErrorMsg.text =
          "Service error occurred. Please try again later.";
        self.view.flxServiceError.setVisibility(true);
      }
      return;
    }
          
          if(response && response.opstatus && response.opstatus !== 0){
            if(this.view.SmthngWentWrong){
              this.view.SmthngWentWrong.setVisibility(true);
            }
            return;
          }

       if(!response && !response.records){
          voltmx.print("no response found");
          return;
        }
          var data = response.records;

          if (Array.isArray(data) && data.length > 0) {
            self.view.flxVehicleLotID.setVisibility(false);
            self.view.flxLotID.setVisibility(true);

            var segData = data.map(function (item) {
              lotId = item.lot_no || "N/A";
              var fleetName = item.title || "N/A";
              self.objectid=item.object_id;

              return {
                lbl01      : lotId + " - " + fleetName,
                lblObjectId: item.object_id
              };
            });

            self.view.segLotIDs.widgetDataMap = {
              lbl01      : "lbl01",
              lblObjectId: "lblObjectId"
            };

            self.view.segLotIDs.setData(segData);



          }
          else {

          
            self.view.lblnorecored.setVisibility(true);

            self.view.segLotIDs.setVisibility(false);
            

            return;
          }
          
          }
          catch(e){
            
                     if (self.view.SmthngWentWrong) {
        self.view.SmthngWentWrong.lblSomethingWentWrong.text =
          "Something went wrong. Please try again.";
        self.view.SmthngWentWrong.setVisibility(true);
      } else {
        alert("Something went wrong: " + e.message);
      }
            
            
          }
          
          
        
          
          
          
          
          
        }
        );

  }
  },

toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooteractive.png";
  this.view.Footer2.lblHome.skin = "sknLblDubaid3243714pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
    
    
    
     this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
//   
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
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

  //   selectServiceType: function () {
  //     var isDropdownVisible = this.view.flxDropDown.isVisible;


  //     this.view.flxDropDown.setVisibility(!isDropdownVisible);


  //     if (!isDropdownVisible) {

  //       this.view.imgUpArrow.setVisibility(true);
  //       this.view.imgDropDown.setVisibility(false);
  //     } else {

  //       this.view.imgUpArrow.setVisibility(false);
  //       this.view.imgDropDown.setVisibility(true);
  //     }

  //     this.view.lblServiceType.text=this.serviceType;

  //   },



  assignValue: function () {
    try {
      var selectedService = this.service;

      if (selectedService) {
        var trimmedLabel = selectedService.replace(/Inspection/i, "").trim();
        this.trimmedLabel = trimmedLabel;
        //       alert(this.trimmedLabel);
      } else {
        voltmx.print("Service is not defined.");
      }
    } catch (err) {
      voltmx.print("Error in assignValue: " + err.message);
    }
  },


  fillingLotID: function () {
    //     alert("entered into lot assign");
    try {
      var previousForm = voltmx.application.getPreviousForm();

      if (this.previousFormId ==="frmDetails"||
          this.previousFormId ==="frmVehicleInspection") {
        //         var lotData = { "lotid": "#76821" };
        var lotData = voltmx.store.getItem("lotIdForVI");
        //          voltmx.store.setItem("objidForVI", objid);
        var objectid;
        this.objectid= voltmx.store.getItem("objidForVI");
        

//     voltmx.store.setItem("objidForVI", objid);
//     voltmx.store.setItem("lotidForVI", lotno);
     
        if(lotData){
          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);
          var lotId=lotData.lotid || lotData;
          this.view.lblvehicleLotID.text = lotId;
          //         voltmx.store.setItem("lotid", value01);
          voltmx.store.setItem("lotId", lotId);
        }
        else{

          alert("lotIdForVI not found in store");
        }
      }
      else if (this.previousFormId === "frmUnderReview"
                                || this.previousFormId === "frmVehicleInspection") {

        //              voltmx.store.setItem("lotIdForVI",item.lot_no);//for VI service

        var lotData = voltmx.store.getItem("lotidForVI");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidForVI");   
                this.objectid = voltmx.store.getItem("objidForVI");   

        if (lotData) {
          // alert("lotIdFromfleet:" + JSON.stringify(lotData));
          //            voltmx.store.setItem("objidForVI",objid);
          //     voltmx.store.setItem("lotidForVI",lotno);


          //        voltmx.store.setItem("objidBCService", selectedItem.objid);
          //     voltmx.store.setItem("lotNoBCService", selectedItem.lblLotValue.text);
          //     voltmx.store.setItem("paymentStatusBCService", selectedItem.lblpaymentstatusvalue.text);

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId;

          voltmx.store.setItem("lotId", lotId); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
      }
      
      else if(this.previousFormId===  "frmWonBids"
              || this.previousFormId === "frmVehicleInspection"){
        
         var lotData = voltmx.store.getItem("lotNoBCService");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidBCService");   
                this.objectid = voltmx.store.getItem("objidBCService");   

        if (lotData) {

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId01 = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId01;

          voltmx.store.setItem("lotId", lotId01); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
        
        
        
      }
      
      else if(this.previousFormId===  "frmMyListings"
              || this.previousFormId === "frmVehicleInspection"){
        
//  voltmx.store.setItem("objidForVI", objid);
//     voltmx.store.setItem("lotidForVI", lotno);
        
         var lotData = voltmx.store.getItem("lotidForVI");
        var objectid;
//         this.objectID = voltmx.store.getItem("objidForVI");   
                this.objectid = voltmx.store.getItem("objidForVI");   

        if (lotData) {
          // alert("lotIdFromfleet:" + JSON.stringify(lotData));
          //            voltmx.store.setItem("objidForVI",objid);
          //     voltmx.store.setItem("lotidForVI",lotno);


          //        voltmx.store.setItem("objidBCService", selectedItem.objid);
          //     voltmx.store.setItem("lotNoBCService", selectedItem.lblLotValue.text);
          //     voltmx.store.setItem("paymentStatusBCService", selectedItem.lblpaymentstatusvalue.text);

          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 
          // Check if it's an object or plain value
          this.view.lblvehicleLotID.text = lotId;

          voltmx.store.setItem("lotId", lotId); 
          // Store for later (e.g., in Request page)
        } else {
          alert("lotIdForVI not found in store");
        }
        
        
      }

      else {
//         voltmx.print("Not coming from frmDetails");
        this.view.flxVehicleLotID.setVisibility(false);
        this.view.flxLotID.setVisibility(true);
        voltmx.application.showLoadingScreen(null, "Loading..",                                             constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

        var self = this;
        var userId = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        var userObj = voltmx.store.getItem("userObject");

        var baseURL = voltmx.store.getItem("BASE_URL");
        if(baseURL){
          if (!baseURL.endsWith("/")) {
            baseURL += "/";
          }
        }

        var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
        var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

        var encodeVal = base64Encode(appkey + ":" + appsecret);
        //          var url = baseURL +"services/ms_common/api/v1/create-payment-record";

        //         var jobTitle = "";
        //         if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
        //           jobTitle = userObj.rawResponse.job_title;
        //         } else {
        //           alert("Warning: job_title is missing from user object.");
        //         }

        //         var jobTitle = "";
        //         if (userObj && userObj.rawResponse && userObj.rawResponse.job_title) {
        //           var rawTitle = userObj.rawResponse.job_title;
        //           var roles = rawTitle.split(";").map(function(role) {
        //             return role.trim().toLowerCase();
        //           });

        //           if (roles.includes("buyer")) {
        //             jobTitle = "buyer";
        //           } else {
        //             alert("Required role 'buyer' not found in job_title.");
        //           }
        //         } else {
        //           alert("Warning: job_title is missing from user object.");
        //         }


        var mode = voltmx.store.getItem("mode");

        var titleForService = "";

        if (mode && mode === "buyer" || mode==="seller") {
          this.titleForService = mode;
        } else {
          alert("Required role 'buyer'or 'seller' not found");
        }

        var get_user_vechile_list_for_services_inputparam = {};
        //     }
        get_user_vechile_list_for_services_inputparam["serviceID"] =
          "fry_int_common$get-user-vechile-list-for-services";
        get_user_vechile_list_for_services_inputparam["user_id"] = userId;  
        get_user_vechile_list_for_services_inputparam["service_type"] ="CI";
        get_user_vechile_list_for_services_inputparam["title"] = this.titleForService;

        var get_user_vechile_list_for_services_httpheaders = {
          "user_token": usertoken
        };
        get_user_vechile_list_for_services_inputparam["httpheaders"] = 
          get_user_vechile_list_for_services_httpheaders;
        var get_user_vechile_list_for_services_httpconfigs = {};
        get_user_vechile_list_for_services_inputparam["httpconfig"] = 
          get_user_vechile_list_for_services_httpconfigs;
        fry_int_common$get_user_vechile_list_for_services =
          mfintegrationsecureinvokerasync
        (get_user_vechile_list_for_services_inputparam, 
         "fry_int_common",
         "get-user-vechile-list-for-services",
         function (status, response) {
          voltmx.application.dismissLoadingScreen();
          
          if(!response &&  !response.records){
            voltmx.print("no records found..");
            return;
          }

          var data = response.records;

          if (Array.isArray(data) && data.length > 0) {
            self.view.flxVehicleLotID.setVisibility(false);
            self.view.flxLotID.setVisibility(true);

            var segData = data.map(function (item) {
              lotId = item.lot_no || "N/A";
              var fleetName = item.title || "N/A";
              self.objectid=item.object_id;

              return {
                lbl01      : lotId + " - " + fleetName,
                lblObjectId: item.object_id
              };
            });

            self.view.segLotIDs.widgetDataMap = {
              lbl01      : "lbl01",
              lblObjectId: "lblObjectId"
            };

            self.view.segLotIDs.setData(segData);



          }
          else {

          
            self.view.lblnorecored.setVisibility(true);

            self.view.segLotIDs.setVisibility(false);
            

            return;
          }
        }
        );





        //         var user_fleet_received_vehicles_httpheaders = {
        //           "user_token": usertoken
        //         };
        //         user_fleet_received_vehicles_inputparam["httpheaders"] = user_fleet_received_vehicles_httpheaders;

        //         var user_fleet_received_vehicles_httpconfigs = {};
        //         user_fleet_received_vehicles_inputparam["httpconfig"] = user_fleet_received_vehicles_httpconfigs;

        //         fry_int_fleet$user_fleet_received_vehicles = mfintegrationsecureinvokerasync(
        //           user_fleet_received_vehicles_inputparam,
        //           "fry_int_fleet",
        //           "user-fleet-received-vehicles",
        //           function (status, response) {
        //             voltmx.application.dismissLoadingScreen();
        //             //             alert("response from Approved Vehicles :" + JSON.stringify(response));

        //             var data = response.records;

        //             if (Array.isArray(data) && data.length > 0) {
        //               self.view.flxVehicleLotID.setVisibility(false);
        //               self.view.flxLotID.setVisibility(true);

        //               var segData = data.map(function (item) {
        //                 lotId = item.lot_no || "N/A";
        //                 var fleetName = item.title || "N/A";
        //                 //                  objectId=item.object_id;

        //                 return {
        //                   lbl01      : lotId + " - " + fleetName,
        //                   lblObjectId: item.object_id
        //                 };
        //               });

        //               self.view.segLotIDs.widgetDataMap = {
        //                 lbl01      : "lbl01",
        //                 lblObjectId: "lblObjectId"
        //               };

        //               self.view.segLotIDs.setData(segData);



        //             }
        //             else {
        //               self.view.lblNorecords.setVisibility(true);
        //               self.view.btnLoadMore.setVisibility(false);
        //               alert("Data is not an array or is empty.");
        //               voltmx.print("Expected 'response.records' to be an array but got: " +
        //                            JSON.stringify(data));
        //               return;
        //             }
        //           }
        //         );
      }

      //       voltmx.store.setItem("lotId", lotId) ; 
      //       voltmx.store.setItem("object_id", )

    } catch (err) {
      voltmx.print("Error in fillingLotID: " + err.message);
    }
  },

  selectLotID: function () {
   
    var isDropdownVisible = this.view.flxSegLotIDs.isVisible;


    this.view.flxSegLotIDs.setVisibility(!isDropdownVisible);


    if (!isDropdownVisible) {

      this.view.imgUpArrow02.setVisibility(true);
      this.view.imgDownArroe01.setVisibility(false);
    } else {

      this.view.imgUpArrow02.setVisibility(false);
      this.view.imgDownArroe01.setVisibility(true);
    }
  },


  assignValueForLotId: function () {
    try {
      var selectedItems = this.view.segLotIDs.selectedRowItems;

      if (selectedItems && selectedItems.length > 0) {
        var fullLabel = selectedItems[0].lbl01; 


        var lotIdOnly = fullLabel.split(" - ")[0].trim();

//         var objectId = selectedItems[0].lblObjectId; 
                var objectid 
                this.objectid= selectedItems[0].lblObjectId; 

        this.view.lblSetLotId.text = lotIdOnly;
        this.view.lblSetLotId.skin = "sknlbl231F20Dubai20px45";

        //  Store only the lot ID (e.g., "#12345")
        if( lotIdOnly && this.objectid ){
          voltmx.store.setItem("lotId", lotIdOnly);
          voltmx.store.setItem("object_id", this.objectid);
        }
      else{
        voltmx.store.removeItem("lotId");
        voltmx.store.removeItem("object_id");
      }

        this.view.flxSegLotIDs.setVisibility(false);
        this.view.imgUpArrow02.setVisibility(false);
        this.view.imgDownArroe01.setVisibility(true);
      this.view.lblvehicleerror02.setVisibility(false);
      this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"


      } else {
//         voltmx.print("No row is selected in segLotIDs or selectedRowItems is empty.");
                this.view.lblvehicleerror02.setVisibility(true);

      }
    } catch (err) {
      voltmx.print("Error in assignValueForLotId: " + err.message);
    }
  },



  storeFormInputAsJSON: function () {

    var serviceType = "";

    if (this.view.lblServiceType && this.view.lblServiceType.text) {
      serviceType = this.view.lblServiceType.text.replace(/Inspection/i, "").trim();
    } else {
      voltmx.print("⚠️ lblServiceType is null or not initialized.");
    }
    //   var serviceType = (this.view.lblServiceType.text || "").replace(/Inspection/i, "").trim();
    //     var objectID="";
    //     if (previousForm && (previousForm.id === "frmDetails"
    //                || previousForm.id === "frmVehicleInspection")) {
    //           objectID = voltmx.store.getItem("objectIdForVI"); 
    //       }
    //     else {
    //         objectID=this.objectId || voltmx.store.getItem("object_id");
    //     }

    return {
      service_type: "inspection",
//       object_id   : this.objectId || voltmx.store.getItem("object_id")|| voltmx.store.getItem("objectIdForVI")|| this.objectid || this.objectID,
          object_id   : this.objectid||voltmx.store.getItem("object_id"),
      notes       : "",
      type        : serviceType
    };
  },



  btnProceedToPayOnclick: function(){
    //     new voltmx.mvc.Navigation("frmConfirmAndPay").navigate();

    var isValid = true;
    var lotId = "";

    if (!this.trimmedLabel && this.view.lblServiceType.text) {
      this.trimmedLabel = this.view.lblServiceType.text.replace(/Inspection/i, "").trim();
    }


    var serviceType = this.trimmedLabel;
    //     alert("serviceType:"+ serviceType);

    if (this.view.flxLotID.isVisible === true) {
      lotId = this.view.lblSetLotId.text.trim();
      if (!lotId || lotId === "Vehicle Lot ID") {
        this.view.lblvehicleerror02.setVisibility(true);
        isValid = false;
      } else {
        this.view.lblvehicleerror02.setVisibility(false);
      }
    } else if (this.view.flxVehicleLotID.isVisible === true) {
      lotId = this.view.lblvehicleLotID.text.trim();
      if (!lotId || lotId === "Vehicle Lot ID") {
        this.view.lblvehicleLoterror01.setVisibility(true);
        isValid = false;
      } else {
        this.view.lblvehicleLoterror01.setVisibility(false);
      }
    }


    if (!isValid) return;
    
//        if(isValid===true){
//           this.view.btnProceedPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"
//         }
//         else{
//           this.view.btnProceedPayment.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
//           return;
//         }

    var formData = this.storeFormInputAsJSON();

    var navObj = new voltmx.mvc.Navigation("frmConfirmAndPay");
    navObj.navigate({
      lotId      : lotId,
      serviceType: serviceType,
      formData   : formData,
      source     : "frmRequestYourInspectionReport"
    });


    this.view.lblSetLotId.text = "Vehicle Lot ID";
//     this.view.lblvehicleLotID.text = "Vehicle Lot ID";
    this.view.lblSelectService.text = "";

  },


  navigateBack: function() {
  
    var nav01 = new voltmx.mvc.Navigation("frmVehicleInspection");
    nav01.navigate();

   
    this.view.lblSetLotId.text = voltmx.i18n.getLocalizedString("lbl.VehicleLotID") || "Vehicle Lot ID";
//     this.view.lblvehicleLotID.text = kony.i18n.getLocalizedString("lbl.VehicleLotID") || "Vehicle Lot ID"
    this.view.lblSelectService.text = voltmx.i18n.getLocalizedString("lbl.SelectService");
    this.view.flxSegLotIDs.setVisibility(false);
    this.view.lblServiceTypeError.setVisibility(false);
    this.view.lblvehicleLoterror01.setVisibility(false);
    this.view.lblvehicleerror02.setVisibility(false);
    this.view.flxSegLotIDs.setVisibility(false);
    this.view.imgDownArroe01.setVisibility(true);
    this.view.imgUpArrow02.setVisibility(false);
    
    
    
//      var keepVehicleLotForms = [
//     "frmDetails",
//     "frmVehicleInspection",
//     "frmUnderReview",
//     "frmWonBids",
//     "frmMyListings"
//   ];

//   if (keepVehicleLotForms.indexOf(this.previousFormId) !== -1) {
   
//     this.view.flxVehicleLotID.setVisibility(true);
//     this.view.flxLotID.setVisibility(false);

//     voltmx.print("Keeping VehicleLotID data as previous form is: " + this.previousFormId);
//   } else {
   
//     this.view.flxLotID.setVisibility(true);
//     this.view.flxVehicleLotID.setVisibility(false);

//     voltmx.print("Refreshing Lot Data as previous form is: " + this.previousFormId);

//   }
// },



  },
  
  setData: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    if (isArabic) {
    this.view.flxBack.left = null;
    this.view.flxBack.right = "5%";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgBack.transform = flipTransform;
} else {
    this.view.flxBack.left = "5%";
    this.view.flxBack.right = null;
  this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
}
    this.view.flxUnderLineContainer.reverseLayoutDirection = isArabic;
    this.view.lblVehicleInspection.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblVehicleInspection.text = voltmx.i18n.getLocalizedString("Request Your Inspection Report");
    this.view.btnProceedPayment.text = voltmx.i18n.getLocalizedString("Proceed to Payment");
//     this.view.lblServiceType.text = voltmx.i18n.getLocalizedString("Request Your Inspection Report");
  }



});











