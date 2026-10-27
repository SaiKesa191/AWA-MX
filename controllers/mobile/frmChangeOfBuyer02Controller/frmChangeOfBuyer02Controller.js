define({ 

  onNavigate: function(context){

    this.navigationData = context || {};
    this.previousFormId = context && context.previousFormId ? context.previousFormId : "";

    this.setData();
    //    this.view.flxDocumentUpload.onClick = this.showUploadOptionsPopUp.bind(this);
    this.view.flxDocumentUpload.onClick=this.showUploadOptionsPopUp.bind(this);
    this.view.flxUploadPopupClose.onClick = this.closeUploadOptionsPopUp.bind(this);
    this.view.flxBack.onClick = this.navToChangeBuyer.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
//     this.fillingLotID();
    this.getBranches();
    this.view.seglocations.onRowClick = this.assignLocationOnclick.bind(this);
    this.view.flxImrDropDown01.onClick = this.selectLotID.bind(this);
    //    this.view.flxSetLOtID.onClick = this.selectLotID.bind(this);
    this.view.segLotIDs.onRowClick = this.assignValueForLotId.bind(this);
    this.view.flxlocationdropdown.onClick=this.selectLocationdropDownOnclick.bind(this);
    this.view.btnProceedToPayment.onClick=this.requestBuyerChange.bind(this);
    //    this.view.flxChooseFromFile.onClick=this.pdfCheck.bind(this);

    //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif
    //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif

    this.view.flxChooseFromLibrary.onClick=this.chooseFromLibrary.bind(this);
    //      this.view.flxTakeAPhoto.onClick=this.camOnCaptureAction.bind(this);
    this.view.cam.onCapture=this.camOnCaptureAction.bind(this);

    //    this.storeFormInputAsJSON();

  },

  onPreShow: function() {
    this.view.flxUpload.setVisibility(false);
//     this.view.flxError.btnTryAgain.onClick = 
//       this.flxErrorBtnTryAgainOnClickAction.bind(this);
    this.toggleFooterIcons();
    
    this.setUpDataPreshow();

    //      this.view.flxDocumentUpload.onClick=this.showUploadOptionsPopUp.bind(this);


    this.view.txtNewBuyerName.onTextChange =
      this.clearBuyerNameError.bind(this);
    this.view.txtEmiratesId.onTextChange = this.clearEmiratesIdError.bind(this);
    //    this.view.seglocations.onRowClick = this.onLocationSelected.bind(this);
    this.view.lblerrorMessageOfContact.setVisibility(false);
    this.view.lblBuyerError.setVisibility(false);
    this.view.lblEmiratesIDError.setVisibility(false);

    var userdetails = voltmx.store.getItem("userObject");
    if (typeof userdetails === "string") {
      userdetails = JSON.parse(userdetails);
    }
    if (userdetails && userdetails.rawResponse
        && userdetails.rawResponse.phone) {
      var userphone = userdetails.rawResponse.phone;
      this.view.txtContactNumber.text=userphone;

      voltmx.print("User phone number: " + userphone);
    } else {
      voltmx.print("Phone number not found in userObject.");
    }



//     this.view.segLotIDs.onRowClick = function () {

//       var selectedItems = this.view.segLotIDs.selectedRowItems;

//       if (selectedItems && selectedItems.length > 0) {

//         var selectedRowData = selectedItems[0];
//         var lotId = "";

//         if (selectedRowData.lbl01) {

//           lotId = selectedRowData.lbl01.split(" ")[0];

//         }
//         this.view.lblSetLotId.text = lotId;

//         this.view.lblSetLotId.setVisibility(true);

//         if (lotId !== "" && lotId !== "Select Lot ID" && lotId !== "Vehicle ID") {

//           this.view.lblvehicleloterror2.setVisibility(false);

//         }    

//       }

//       this.view.flxSegLotIDs.setVisibility(false);

//       //     this.selectLotID();
//       this.view.imgDownArrow.setVisibility(true);

//       this.view.imgUparrow.setVisibility(false);

//     }.bind(this);


//     this.view.seglocations.onRowClick = function() {

//       var selectedItems = this.view.seglocations.selectedRowItems;

//       if (selectedItems && selectedItems.length > 0) {

//         var selectedRowData = selectedItems[0];

//         var location = selectedRowData.lbl01 || "";

//         this.view.lblselectedlocation.text = location;

//         if (location !== "" && location !== "Select Location") {

//           this.view.lbllocationerror.setVisibility(false);

//         }

//       }

//       this.view.flxlistOfLocations.setVisibility(false);

//       //   this.selectLotID();

//       this.view.imgDownArrow.setVisibility(true);

//       this.view.imgUparrow.setVisibility(false);

//     }.bind(this);

  this.view.flxError.btnTryAgain.onClick = 
      this.flxErrorBtnTryAgainOnClickAction.bind(this);
    
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
  
  
//     flxErrorBtnTryAgainOnClickAction: function() {
//     if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
//       this.view.flxError.setVisibility(false);
//     } else {
//       voltmx.print("Still offline...");
//     }
//   },
  
  
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
    
          if (this.previousFormId  === "frmWonBids"
          || this.previousFormId === "frmChangeOfBuyer")
      {
        //         var lotData = voltmx.store.getItem("lotidForVI");
        //          var objectID = voltmx.store.getItem("objidForVI");  
 
        var lotData = voltmx.store.getItem("lotNoBCService");
        var objectid;
        this.objectid =  voltmx.store.getItem("objidBCService");
 
        if (lotData) {
 
 
          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);
 
          var lotId = lotData.lotid || lotData;
 
          this.view.lblvehicleLotID.text = lotId;
 
          voltmx.store.setItem("lotId", lotId); 
        }   
        else {
          alert("lotIdForVI not found in store");
        }
 
      } 
      //       }
 
      else if(this.previousFormId === "frmDetails"
 
              || this.previousFormId === "frmChangeOfBuyer"){
 
        var lotData = voltmx.store.getItem("lotIdForVI");
 
        //          voltmx.store.setItem("objidForVI", objid);
 
        var objectid;
 
        this.objectid= voltmx.store.getItem("objidForVI");
 
        if (lotData) {
 
          this.view.flxVehicleLotID.setVisibility(true);
 
          this.view.flxLotID.setVisibility(false);
 
          var lotId = lotData.lotid || lotData;
 
          this.view.lblvehicleLotID.text = lotId;
 
          voltmx.store.setItem("lotId", lotId);
 
        } else {
 
          alert("lotIdForVI not found in store");
 
        }
 
 
      }
    
  }
  
   else{
     
            voltmx.print("Not coming from frmDetails");
        this.view.flxVehicleLotID.setVisibility(false);
        this.view.flxLotID.setVisibility(true);
        voltmx.application.showLoadingScreen(null, "Loading..",                                             constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
 
        var self = this;
        var userId = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        var userObj = voltmx.store.getItem("userObject");
 
 
        var baseURL = voltmx.store.getItem("BASE_URL");
        if (baseURL && !baseURL.endsWith("/")) {
          baseURL += "/";
        }
 
        var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
        var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
        var encodeVal = base64Encode(appkey + ":" + appsecret);
 
        var url = baseURL + "services/fry_int_common/api/v1/get_user_vechile_list_for_services";
 
        //        var jobTitle = "";
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
 
        if (mode && mode === "buyer") {
          self.titleForService = mode;
        } else {
          alert("Required role 'buyer' not found");
        }
 
 
        var get_user_vechile_list_for_services_inputparam = {};
        //     }
        get_user_vechile_list_for_services_inputparam["serviceID"] =
          "fry_int_common$get-user-vechile-list-for-services";
        get_user_vechile_list_for_services_inputparam["user_id"] = userId;  
        //           get_user_vechile_list_for_services_inputparam["user_id"]="0ebacdfa-7ce1-46ee-9d63-b09f3d266187";
        get_user_vechile_list_for_services_inputparam["service_type"] ="BC";
        get_user_vechile_list_for_services_inputparam["title"] = this.titleForService ;
 
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
          //           alert("response from Approved Vehicles :" + JSON.stringify(response));
          
          if(response && response.opstatus && response.opstatus === 1011){
            if(self.view.flxError){
              voltmx.print("entered");
              self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
              self.view.flxError.setVisibility(true);
            }
            return;
          }
          
          
          if(response && response.opstatus && response.opstatus !== 0){
            if(this.view.SmthngWentWrong){
              this.view.SmthngWentWrong.setVisibility(false);
            }
            return;
          }
          
          
          if(!response  && !response.records){
            voltmx.print("no records found...");
            return;
          }
          var data1 = response.records;
 
          if (Array.isArray(data1) && data1.length > 0) {
            //             self.view.flxVehicleLotID.setVisibility(false);
            //             self.view.flxLotID.setVisibility(true);
 
            var segdata1 = data1.map(function (item) {
              var lotId01 = item.lot_no || "N/A";
              var fleetName = item.title || "N/A";
              self.objectid=  item.object_id;
              voltmx.store.setItem("objectid_seg", self.objectid);
              return {
                lbl01      : lotId01 + " - " + fleetName,
                lblObjectID: item.object_id
              };
            });
 
            self.view.segLotIDs.widgetDataMap = {
              lbl01      : "lbl01",
              lblObjectID: "lblObjectID"
            };
 
            self.view.segLotIDs.setData(segdata1);
          }
          else {           
            self.view.segLotIDs.setVisibility(false);
            self.view.lblNorecords.setVisibility(true);
            self.view.lblNorecords.text = "No records found....";
          }
            
          }catch(e){
            
            
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
//    }    
  },



  clearContactNumberError: function () {
    var contactnumber = this.view.txtContactNumber.text.trim();
    if (/^[0-9]{10}$/.test(contactnumber)) {
      this.view.lblerrorMessageOfContact.setVisibility(false);

    }
  },

  clearBuyerNameError: function () {
    var newBuyerName = this.view.txtNewBuyerName.text.trim();
    if (newBuyerName !== "") {
      this.view.lblBuyerError.setVisibility(false);
    }
  },

  clearEmiratesIdError: function () {
    var emiratesId = this.view.txtEmiratesId.text.trim();
    if (emiratesId !== "") {
      this.view.lblEmiratesIDError.setVisibility(false);
    }
  },


  onLocationSelected: function () {

    var selectedRowData = this.view.segLocation.selectedRowItems[0];
    var selectedLocation = selectedRowData.lbl01; 

    this.view.lblselectedlocation.text = selectedLocation;

    if (selectedLocation !== "Select Location") {
      this.view.lbllocationerror.setVisibility(false);
    }
  },



  toggleFooterIcons: function() {
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
    if (mode === "seller") {
      this.view.Footer2.imgMyBids.src = "mylistings.png";
     // this.view.Footer2.lblMyBids.text = "Listings";
    } else {
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
      //this.view.Footer2.lblMyBids.text = "My Bids";
    }

    var isLogin = voltmx.store.getItem("isLogin");
    var isUserCreated = voltmx.store.getItem("isUserCreated");

    if (isLogin === true && isUserCreated === true) {
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    } else {
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },



  navToChangeBuyer: function () {
    var navigationObj = new voltmx.mvc.Navigation("frmChangeOfBuyer");
    navigationObj.navigate();
    this.onNavigatingToOtherForms();

  },


  onNavigatingToOtherForms: function(){
//     this.view.lblvehicleLotID.text="";
    this.view.lblSetLotId.text="";
    this.view.lblselectedlocation.text="";
    this.view.txtContactNumber.text="";
    this.view.txtNewBuyerName.text="";
    this.view.txtEmiratesId.text="";
    this.view.txtAreaOptionalNotes.text="";
    this.view.Success.setVisibility(false);
    this.view.lblDocumentError.setVisibility(false);
    this.view.lblvehicleLoterror.setVisibility(false);
    this.view.lblvehicleloterror2.setVisibility(false);
    this.view.lbllocationerror.setVisibility(false);
    this.view.lblerrorMessageOfContact.setVisibility(false);
    this.view.lblBuyerError.setVisibility(false);
    this.view.lblEmiratesIDError.setVisibility(false);
    this.view.imgDocumnetUpload.setVisibility(true);
    //   this.view.flxImrDropDown01.setVisibility(false);
    this.view.flxlistOfLocations.setVisibility(false);
    this.view.flxSegLotIDs.setVisibility(false);
    this.view.imgDownArrow.setVisibility(true);
    this.view.imgUparrow.setVisibility(false);
    this.view.imglocationdropdown.setVisibility(true);
    this.view.imgUpArrow01.setVisibility(false);
  },


  showUploadOptionsPopUp: function() {
    this.view.flxUpload.setVisibility(true);

  },

  closeUploadOptionsPopUp: function() {
    this.view.flxUpload.setVisibility(false);
  },

  getBranches: function () {
    var self = this;
    var input = {
      serviceID: "fry_int_fleet$master-fleet-spec-values",
      spec_list: "branch",
      widget_name: "fleet_specs_details",
      "asset definitions": "true",
      "auction_types": "true",
      httpheaders: {},
      httpconfig: {}
    };

    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(
      input,
      "fry_int_fleet",
      "master-fleet-spec-values",
      function (status, response) {
        voltmx.application.dismissLoadingScreen();
        
          if(response && response.opstatus && response.opstatus === 1011){
            if(self.view.flxError){
              voltmx.print("entered");
              self.view.flxError.lblNetworkConnectionerror.text = "Network issue. Please check your connection.";
              self.view.flxError.setVisibility(true);
            }
            return;
          }
          
          
          if(response && response.opstatus && response.opstatus !== 0){
            if(this.view.SmthngWentWrong){
              this.view.SmthngWentWrong.setVisibility(false);
            }
            return;
          }
        
        if(!response && !response.data){
          voltmx.print("no records found");
          return;
        }
        
        var data1 = response.data;

        if (Array.isArray(data1) && data1.length > 0 && Array.isArray(data1[0].branch)) {
          var branchdata1 = data1[0].branch;
          var branch_array = [];

          branchdata1.forEach(function (res) {
            branch_array.push({ lbl01: res.value || "N/A" });
          });

          self.view.seglocations.widgetDataMap = { lbl01: "lbl01" };
          self.view.seglocations.setData(branch_array);
               self.view.lblNorecordsLoc.setVisibility(false);

          self.branch_array = branch_array;
          voltmx.store.setItem("branchArray", branch_array);
        } else {
          self.view.seglocations.setVisibility(false);
          self.view.lblNorecordsLoc.setVisibility(true);
          voltmx.print("Invalid response: " + JSON.stringify(response));
        }
      }
    );
  },

  fillingLotID: function () {
    //   alert("entered into lot assign");
    try {
      //     var previousForm = voltmx.application.getPreviousForm();

      if (this.previousFormId  === "frmWonBids"
          || this.previousFormId === "frmChangeOfBuyer")
      {
        //         var lotData = voltmx.store.getItem("lotidForVI");
        //          var objectID = voltmx.store.getItem("objidForVI");  

        var lotData = voltmx.store.getItem("lotNoBCService");
        var objectID;
        this.objectID =  voltmx.store.getItem("objidBCService");

        if (lotData) {


          this.view.flxVehicleLotID.setVisibility(true);
          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 

          this.view.lblvehicleLotID.text = lotId;

          voltmx.store.setItem("lotId", lotId); 
        }   
        else {
          alert("lotIdForVI not found in store");
        }

      } 
      //       }

      else if(this.previousFormId === "frmDetails"

              || this.previousFormId === "frmChangeOfBuyer"){

        var lotData = voltmx.store.getItem("lotIdForVI");

        //          voltmx.store.setItem("objidForVI", objid);

        var objectid;

        this.objectid= voltmx.store.getItem("objidForVI");

        if (lotData) {

          this.view.flxVehicleLotID.setVisibility(true);

          this.view.flxLotID.setVisibility(false);

          var lotId = lotData.lotid || lotData; 

          this.view.lblvehicleLotID.text = lotId;

          voltmx.store.setItem("lotId", lotId); 

        } else {

          alert("lotIdForVI not found in store");

        }


      }


      else {
        voltmx.print("Not coming from frmDetails");
        this.view.flxVehicleLotID.setVisibility(false);
        this.view.flxLotID.setVisibility(true);
        voltmx.application.showLoadingScreen(null, "Loading..",                                             constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

        var self = this;
        var userId = voltmx.store.getItem("userId");
        var usertoken = voltmx.store.getItem("getUserAccesstoken");
        var userObj = voltmx.store.getItem("userObject");



        var baseURL = voltmx.store.getItem("BASE_URL");
        if (baseURL && !baseURL.endsWith("/")) {
          baseURL += "/";
        }

        var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
        var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
        var encodeVal = base64Encode(appkey + ":" + appsecret);

        var url = baseURL + "services/fry_int_common/api/v1/get_user_vechile_list_for_services";

        //        var jobTitle = "";
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

        if (mode && mode === "buyer") {
          self.titleForService = mode;
        } else {
          alert("Required role 'buyer' not found");
        }


        var get_user_vechile_list_for_services_inputparam = {};
        //     }
        get_user_vechile_list_for_services_inputparam["serviceID"] =
          "fry_int_common$get-user-vechile-list-for-services";
        get_user_vechile_list_for_services_inputparam["user_id"] = userId;  
        //           get_user_vechile_list_for_services_inputparam["user_id"]="0ebacdfa-7ce1-46ee-9d63-b09f3d266187";
        get_user_vechile_list_for_services_inputparam["service_type"] ="BC";
        get_user_vechile_list_for_services_inputparam["title"] = this.titleForService ;

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
          //           alert("response from Approved Vehicles :" + JSON.stringify(response));

          var data1 = response.records;

          if (Array.isArray(data1) && data1.length > 0) {
            //             self.view.flxVehicleLotID.setVisibility(false);
            //             self.view.flxLotID.setVisibility(true);

            var segdata1 = data1.map(function (item) {
              var lotId01 = item.lot_no || "N/A";
              var fleetName = item.title || "N/A";
              self.objectId=  item.object_id;
              voltmx.store.setItem("objectid_seg", self.objectId);
              return {
                lbl01      : lotId01 + " - " + fleetName,
                lblObjectID: item.object_id
              };
            });

            self.view.segLotIDs.widgetDataMap = {
              lbl01      : "lbl01",
              lblObjectID: "lblObjectID"
            };

            self.view.segLotIDs.setData(segdata1);
          }
          else {           
            self.view.segLotIDs.setVisibility(false);
            self.view.lblNorecords.setVisibility(true);
            self.view.lblNorecords.text = "No records found....";
          }
        }
        );
      }
    } catch (err) {
      voltmx.print("Error in fillingLotID: " + err.message);
    }
  },

  selectLotID: function () {
    var isVisible = this.view.flxSegLotIDs.isVisible;
    this.view.flxSegLotIDs.setVisibility(!isVisible);

    if (!isVisible) {
      // Dropdown is now being shown
      this.view.imgUparrow.setVisibility(true);
      this.view.imgDownArrow.setVisibility(false);
    } else {
      // Dropdown is now being hidden
      this.view.imgUparrow.setVisibility(false);
      this.view.imgDownArrow.setVisibility(true);
    }
  },


  assignValueForLotId: function () {
    try {
      var selectedItems = this.view.segLotIDs.selectedRowItems;

      if (selectedItems && selectedItems.length > 0) {
        var fullLabel = selectedItems[0].lbl01;
        var lotIdOnly = fullLabel.split(" - ")[0].trim();

        var objectid
        this.objectid= selectedItems[0].lblObjectID; 

        this.view.lblSetLotId.text = lotIdOnly;
        this.view.lblSetLotId.skin = "sknlbl231F20Dubai20px45";
        if(lotIdOnly &&  this.objectid){
          voltmx.store.setItem("lotId", lotIdOnly);
          voltmx.store.setItem("object_id", this.objectid);
        }
        else{
          voltmx.store.removeItem("lotId");
          voltmx.store.removeItem("object_id");

        }


        // Hide dropdown and show correct arrow
        this.view.flxSegLotIDs.setVisibility(false);
        this.view.imgUparrow.setVisibility(false);
        this.view.imgDownArrow.setVisibility(true);
                this.view.lblvehicleloterror2.setVisibility(false);

      }
      else {
//         voltmx.print("No row is selected in segLotIDs or selectedRowItems is empty.");
        this.view.lblvehicleloterror2.setVisibility(true);
      }

    } catch (err) {
      voltmx.print("Error in assignValueForLotId: " + err.message);
    }
  },


  selectLocationdropDownOnclick: function () {
    var isDropdownVisible = this.view.flxlistOfLocations.isVisible;


    this.view.flxlistOfLocations.setVisibility(!isDropdownVisible);

    if (!isDropdownVisible) {

      this.view.imgUpArrow01.setVisibility(true);
      this.view.imglocationdropdown.setVisibility(false);
    } else {
      this.view.imgUpArrow01.setVisibility(false);
      this.view.imglocationdropdown.setVisibility(true);
    }
  },

  assignLocationOnclick: function () {
    try {
      var selectedItems = this.view.seglocations.selectedRowItems;
      if (selectedItems && selectedItems.length > 0) {
        var location = selectedItems[0].lbl01;
        this.view.lblselectedlocation.text = location;
        this.view.flxlistOfLocations.setVisibility(false);
        this.view.imgUpArrow01.setVisibility(false);
        this.view.imglocationdropdown.setVisibility(true);
                this.view.lbllocationerror.setVisibility(false);

      }
      else{
        this.view.lbllocationerror.setVisibility(true);
      }
    } catch (err) {
      voltmx.print("Error in assignLocationOnclick: " + err.message);
    }
  },



  pdfCheck: function() {
    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");
    try {

      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
      var TestPdfNfi = java.import("com.example.pdfuploadnfitest.TestPdfNfi");
      TestPdfNfi.pdfCallback = this.pdfCallback.bind(this);
      var activityContext = VoltMXMain.getActivityContext();
      var Intent  = java.import("android.content.Intent");
      var intentObj =  new Intent(activityContext, TestPdfNfi.class);
      activityContext.startActivity(intentObj);
    } catch (e) {
      alert("Error: " + e.message);
    }
  },

  pdfCallback: function(data) {

    voltmx.print( "selcted pdf callback data:::" + data) ;
    //     alert("Filename selected :::"+data);

    this.pdfData = null;

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        this.pdfData = JSON.parse(dataJsonStr);
        if(this.pdfData && this.pdfData.base64pdf){
          this.selectedPdfBase64 = this.pdfData.base64pdf;
          this.selectedPdfFileName = this.pdfData.fileName;




          var sizeInBytes = this.estimateBase64Size(this.selectedPdfBase64);
          var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

          if (sizeInBytes > 10 * 1024 * 1024) {
            alert(" File too large. Please upload a file smaller than 10 MB.");

            return;
          }



          if (this.pdfData.fileName==="") return;
          //            this.view.lblDocumentUpload.text = this.pdfData.fileName;
          //       this.view.imgupload.setVisibility(false);
          //           this.view.flxBottomFileUpload.setVisibility(false);
          //           this.view.flxOverLay.setVisibility(false);
          this.view.flxUpload.setVisibility(false);

          //            this.fleetDocUpload();
          this.view.imgDocumnetUpload.setVisibility(false);

          this.view.lblDocumentUpload.text = this.pdfData.fileName;

          this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
          // this.view.flxUpload.setVisibility(false);


          this.fleetDocUpload();
        }


      } catch (error) {
        console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },




  testPDFNFIIOS: function()
  {
    var self=this;

    voltmx.runOnMainThread(mainthread, []);

    function  mainthread() {   
      var PDFNFIUploadIOS = objc.import("PDFNFIUploadIOS");
      var ViewController = objc.import("ViewController");
      if (!ViewController) {
        voltmx.print("Error: Failed to import PDFNFIUploadIOS");
      }
      else{
        var ViewObject = ViewController.alloc().jsinit();
        ViewObject.pickPdfTapped();


        ViewObject.pdfCallback(function(pdfArrayObj){
          voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]); 

          var fileName = pdfArrayObj[0];
          var base64Data = pdfArrayObj[1];

          self.selectedPdfFileName = fileName;
          self.selectedPdfBase64 = base64Data;

          var sizeInBytes = self.estimateBase64Size(self.selectedPdfBase64);
          var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

          if (sizeInBytes > 10 * 1024 * 1024) {
            alert(" File too large. Please upload a file smaller than 10 MB.");

            return;
          }


          voltmx.runOnMainThread(function () {

            self.view.flxUpload.setVisibility(false);
            //     self.view.flxOverLay.setVisibility(false);
            self.view.imgDocumnetUpload.setVisibility(false);
            self.view.lblDocumentUpload.text=fileName;
            self.fleetDocUpload();
          }, []);
        });



      }
    }


  },

  camOnCaptureAction: function(){

    var rawBytes = this.view.cam.rawBytes;

    if (rawBytes) {
      // Convert raw bytes to base64
      //        var testfilename = rawBytes.getResourcePath();
      //        alert("testfilename"+testfilename);
      //       
      //       var filename =  rawBytes.getResourcePath().substring(rawBytes.getResourcePath().lastIndexOf("/") + 1);
      var filename = "";
      try {
        var resourcePath = rawBytes.getResourcePath && rawBytes.getResourcePath();

        if (resourcePath) {
          var normalizedPath = resourcePath.replace(/\\/g, "/");
          filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);

          if (!filename || filename.trim() === "") {
            filename = "captured_image_" + new Date().getTime();
          }
        } else {
          // Fallback for iOS or invalid resourcePath
          filename = "captured_image_" + new Date().getTime();
        }
      } catch (e) {
        voltmx.print("Error extracting filename: " + e.message);
        filename = "captured_image_" + new Date().getTime();
      }


      var base64Image = voltmx.convertToBase64(rawBytes);




      var sizeInBytes = this.estimateBase64Size(base64Image);
      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 10 * 1024 * 1024) {
        alert(" Image too large. Please capture an image smaller than 10 MB.");
        return;
      }



      var filetype =  detectFileType(base64Image);
      //        alert("type"+filetype);
      var filefullname = filename+filetype;

      //        alert("fullname"+filefullname);
      this.filenameCam =filefullname;

      this.selectedPdfFileName = filefullname;
      this.selectedPdfBase64 = base64Image;

      this.fleetDocUpload();


      this.view.lblDocumentUpload.text = filefullname;
      this.view.imgDocumnetUpload.setVisibility(false);
      //       this.view.imgupload.setVisibility(false);
      this.view.flxUpload.setVisibility(false);
      this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
      //       this.view.flxOverLay.setVisibility(false);
      //       var base64Image = kony.convertToBase64(rawBytes);
      this.base64CamImage = base64Image;

    } 
    else {
      kony.print("No image captured from camera.");
    }
  },


  estimateBase64Size: function (base64Str) {
    let padding = (base64Str.match(/=*$/) || [""])[0].length;
    return Math.floor((base64Str.length * 3) / 4) - padding;
  },


  chooseFromLibrary: function()
  {
    var self = this;

    voltmx.phone.openMediaGallery(function(rawbytes) {
      if (rawbytes) {
        voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
        //         var testfilename = rawbytes.getResourcePath();
        //         //        alert("testfilename"+testfilename);
        //         var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);
        //             this.view.flxUploadConfirmationinGsovtID.setVisibility(true);
        //            .text = filename;

        var filename = "";
        try {
          var resourcePath = rawbytes.getResourcePath && rawbytes.getResourcePath();
          if (resourcePath) {
            var normalizedPath = resourcePath.replace(/\\/g, "/");
            filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
            if (!filename || filename.trim() === "") {
              filename = "image_from_gallery_" + new Date().getTime();
            }
          } else {
            filename = "image_from_gallery_" + new Date().getTime();
          }
        } catch (e) {
          voltmx.print("Error getting resource path: " + e.message);
          filename = "image_from_gallery_" + new Date().getTime();
        }





        // Convert to Base64 and store based on file index
        var base64Data = voltmx.convertToBase64(rawbytes);

        var sizeInBytes = self.estimateBase64Size(base64Data);
        var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("Image too large. Please select an image smaller than 10 MB.");
          return;
        }

        var filetype =  detectFileType(base64Data);
        //        alert("type"+filetype);
        var filefullname = filename+filetype;
        //        alert("fullname"+filefullname);
        this.selectedPdfFileName = filefullname;
        this.selectedPdfBase64 = base64Data;

        self.fleetDocUpload();

        this.view.lblDocumentUpload.text = filefullname;
        //         this.view.lblfilename.left ="0%";
        //       this.view.imgupload.setVisibility(false);
        this.view.imgDocumnetUpload.setVisibility(false);

        this.view.flxUpload.setVisibility(false);
        //         this.view.flxOverLay.setVisibility(false);

        this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";



        voltmx.print("Base64 : "+base64Data);
        //        this.view.flxUploadedBackView

        //           self.createDamItems(type,filename,base64Data);
      }
    }.bind(this), {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*"  // Set the mime type for images
      //       mimetype: "application/*" 

    }
                                 ); 
  },


  fleetDocUpload: function()
  {
    var self = this;
    var userobj = voltmx.store.getItem("userObject");
    var isorg = userobj.rawResponse.is_org;
    // Sample code to fetch the integration service details with passthrough 
    var serviceName = "fry_collection";   
    // Get an instance of SDK
    var client = voltmx.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService(serviceName);
    var operationName = "upload-fleet-documents";
    var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    //        voltmx.store.setItem("lotId", lotIdOnly);
    var lotId=voltmx.store.getItem("lotId");
    var params = {
      "user_id": userid,
      "moduleName": "UploadFleetDocuments",
      "is_org": isorg,
      "category": "bc-change",
      //         "object_id":   self.objectId ||  voltmx.store.getItem("objidForVI"),
//       "object_id": self.objectId||  voltmx.store.getItem("object_id") || voltmx.store.getItem("objidBCService")|| self.objectID|| self.objectid,
               "object_id": self.objectid ||    voltmx.store.getItem ("object_id"),
      "lot_no": lotId,
      "file_details": [
        {
          //                 "is_thumbnail": "true",
          "filename": self.selectedPdfFileName,
          "base64": self.selectedPdfBase64 // You need to encode file as base64 and insert it here
        }
      ],
      "user_token": userToken
    };

    this.view.lblDocumentError.setVisibility(false);
    var headers = {
      //     "custom-header-key1": "custom-header-value1"
    }; //If there are no headers, pass null
    // options is an optional parameter that helps in configuring the network layer.
    integrationSvc.invokeOperation(operationName, headers, params, function(response) {

      //   alert("upload document to dam:"+JSON.stringify(response));
      //   if(response && reponse.message==="Success"){
      //         self.view.lblDocumentError.text="Document uploaded successfully";
      //         self.view.lblDocumentError.skin="sknlbl61b35cDubaiRegFont40px"
      //     }
      //   else{
      //       self.view.lblDocumentError.text="document upload failed!";
      //       self.view.lblDocumentError.skin="sknlblDubaiRegff0000Font40px"
      //   }


    }, function(error) {
      //    alert("Integration Service Failure: " + JSON.stringify(error));
      //    self.view.lblDocumentError.text = "Integration service error!";
      //     self.view.lblDocumentError.skin = "sknlblDubaiRegff0000Font40px";
    }, {
      "passthrough": true
    });
  },  


  requestBuyerChange: function () {
    var isValid = true;
    var lotId = "";



    if (this.view.flxLotID.isVisible === true) {
      lotId = this.view.lblSetLotId.text.trim();
      if ( lotId === "Vehicle ID" ) {
        this.view.lblvehicleloterror2.setVisibility(true);
        isValid = false;
      } else {
        this.view.lblvehicleloterror2.setVisibility(false);
      }

    } else if (this.view.flxVehicleLotID.isVisible === true) {
      lotId = this.view.lblvehicleLotID.text.trim();
      if ( lotId === "Select Lot ID" ) {
        this.view.lblvehicleLoterror.setVisibility(true);
        //     this.view.lblvehicleLoterror.text = "*feild required";
        isValid = false;
      } else {
        this.view.lblvehicleLoterror.setVisibility(false);
      }
    }

    var location = this.view.lblselectedlocation.text;
    if (!location || location === "Select Location") {
      this.view.lbllocationerror.setVisibility(true);
      isValid = false;
    } else {
      this.view.lbllocationerror.setVisibility(false);
    }


    var contactnumber = this.view.txtContactNumber.text;
    if (!contactnumber) {
      this.view.lblerrorMessageOfContact.setVisibility(true);
      this.view.lblerrorMessageOfContact.text = voltmx.i18n.getLocalizedString("Field is required");
      
      //     this.view.txtContactNumber.skin = "sknTxtError";
      isValid = false;
    }
    else {
      this.view.lblerrorMessageOfContact.setVisibility(false);
    }


    var newBuyerName = this.view.txtNewBuyerName.text;
    if (!newBuyerName || newBuyerName.trim() === "") {
      this.view.lblBuyerError.setVisibility(true);
      //     this.view.txtNewBuyerName.skin = "sknTxtError";
      isValid = false;
    } else {
      this.view.lblBuyerError.setVisibility(false);
      //     this.view.txtNewBuyerName.skin = "sknTxtNormal";
    }


    var emiratesId = this.view.txtEmiratesId.text;

    if (!emiratesId || emiratesId.trim() === "") {
      this.view.lblEmiratesIDError.text = voltmx.i18n.getLocalizedString("Field is required");;
      this.view.lblEmiratesIDError.setVisibility(true);
      // this.view.txtEmiratesId.skin = "sknTxtError";
     // isValid = false;
    } else {
      // Remove hyphens for validation
     // var cleanedId = emiratesId.replace(/-/g, "");

     // var emiratesIdPattern = /^784\d{11}$/;

//       if (!emiratesIdPattern.test(cleanedId)) {
//         this.view.lblEmiratesIDError.text = "*Please enter a valid Emirates ID";
//         this.view.lblEmiratesIDError.setVisibility(true);
//         // this.view.txtEmiratesId.skin = "sknTxtError";
//         isValid = false;
//       } else {
//         this.view.lblEmiratesIDError.setVisibility(false);
//         // this.view.txtEmiratesId.skin = "sknTxtNormal";
//       }
    }



    var optionalNotes = this.view.txtAreaOptionalNotes.text;
    //       this.fileUploadToservice();
//     this.fleetDocUpload();

    if(this.view.lblDocumentUpload.text==="Upload Document"){
      this.view.lblDocumentError.setVisibility(true);
      isValid = false;
    }
    else{
      this.view.lblDocumentError.setVisibility(false);
    }



    if (!isValid) return;

//     this.fleetDocUpload();
    //     if(isValid===true){
    //       this.view.btnProceedToPayment.skin="sknbtnBg61B35CBorder61B35CRadius8pxDubaiffffff18px45"
    //     }
    //     else{
    //       this.view.btnProceedToPayment.skin="sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
    //       return;
    //     }

    //    this.fileUploadToservice();
    //   this.view.txtContactNumber.skin = "sknTxtNormal"; 
    var formData = this.storeFormInputAsJSON(); 

    var navObj = new voltmx.mvc.Navigation("frmConfirmAndPayChangeOfBuyer");
    navObj.navigate({
      lotId: lotId,
      location: location,
      contactnumber: contactnumber,
      newBuyerName: newBuyerName,
      emiratesId: emiratesId,
      formData   : formData,
      source     : "frmChangeOfBuyer02"

    });


    this.view.lblSetLotId.text = "Vehicle Id";
    this.view.lblvehicleLotID.text = "Vehicle Id";
    this.view.lblselectedlocation.text = "Location";
    this.view.txtContactNumber.text = "";
    this.view.txtNewBuyerName.text = "";
    this.view.txtEmiratesId.text = "";
    this.view.txtAreaOptionalNotes.text = "";
    this.view.lblDocumentUpload.text="Upload Document";
    this.view.Success.setVisibility(false);
    this.view.lblDocumentError.setVisibility(false);
    this.view.lblvehicleLoterror.setVisibility(false);
    this.view.lblvehicleloterror2.setVisibility(false);
    this.view.lbllocationerror.setVisibility(false);
    this.view.lblerrorMessageOfContact.setVisibility(false);
    this.view.lblBuyerError.setVisibility(false);
    this.view.lblEmiratesIDError.setVisibility(false);
    this.view.imgDocumnetUpload.setVisibility(true);


  },


  storeFormInputAsJSON: function () {

    this.newBuyerName = this.view.txtNewBuyerName.text.trim();
   // this.emiratesId = this.view.txtEmiratesId.text.trim();
    if (this.view.txtEmiratesId && this.view.txtEmiratesId.text) {
    this.emiratesId = this.view.txtEmiratesId.text.trim();
} else {
    this.emiratesId = "";
}

    //   this.optionalNotes = this.view.txtAreaOptionalNotes.text.trim();
    if (this.view.txtAreaOptionalNotes && this.view.txtAreaOptionalNotes.text) {
      this.optionalNotes = this.view.txtAreaOptionalNotes.text.trim();
    } else {
      this.optionalNotes = "";
    }

    var lotId = "";
    if (this.view.flxLotID.isVisible === true) {
      lotId = this.view.lblSetLotId.text.trim();
    } else if (this.view.flxVehicleLotID.isVisible === true) {
      lotId = this.view.lblvehicleLotID.text.trim();
    }

    var formData = {
      "service_type": "bc-change",
      "service_id": 31,
      //       "object_id": "F3AA4C52-60D3-4FBF-B25B-33BD78FC49E1",
      //        "object_id": this.objectId||  voltmx.store.getItem("object_id"),
//       "object_id": this.objectId||  voltmx.store.getItem("object_id") || voltmx.store.getItem("objidBCService")|| this.objectID|| this.objectid,
                     "object_id": this.objectid ||    voltmx.store.getItem ("object_id"),
      "newBuyerName": this.newBuyerName,
      "emirate": this.emiratesId,
      "notes": this.optionalNotes,
      //       "document_id": "TRN002",
      "document_id": this.emiratesId,
      "new_buyer_id": "",


    };


    // Store in local storage
    //   voltmx.store.setItem("buyerChangeFormData", formData);

    voltmx.print(" Stored Form Data as JSON: " + JSON.stringify(formData));
    //     alert(" Form data saved successfully!"  + JSON.stringify(formData));

    return formData;

  },



  setData: function () {
    
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

      if(isArabic){
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
         this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
      
    }
    else{
       this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
      
  this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
    }
    
 


    // Determine alignment and direction
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;


    //   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    // List of label widget IDs to apply alignment
    var labelList = [
      "lblChangeOfBuyer","lblvehicleLotID","lblvalue","lbl01","lblselectedlocation",
      "lblDocumentUpload","txtContactNumber","txtNewBuyerName","txtEmiratesId","txtAreaOptionalNotes",
      "lblSetLotId","lblRegisterAs"
    ];

    // Apply alignment to labels
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }

    // List of Flex containers to reverse layout direction
    var flexList = [
      "FlexGroup0e97f46e15a7a45","flxVehicleLotID","flxLotID",
      ,"flxDocumentUpload","flxToggles"

    ];

    // Apply reverseLayoutDirection
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }

    // Optional localization of text, if needed
    this.view.lblChangeOfBuyer.text=voltmx.i18n.getLocalizedString("Change of Buyer");
    this.view.lblSetLotId.text=voltmx.i18n.getLocalizedString("Vehicle ID");
    this.view.lblselectedlocation.text=voltmx.i18n.getLocalizedString("Select Location");
    this.view.txtContactNumber.placeholder=voltmx.i18n.getLocalizedString("Contact Number");  
    this.view.lblDocumentUpload.text=voltmx.i18n.getLocalizedString("Upload Document");
    this.view.btnProceedToPayment.text=voltmx.i18n.getLocalizedString("Proceed to Payment");
    this.view.txtAreaOptionalNotes.placeholder=voltmx.i18n.getLocalizedString("Optional Notesd");
    this.view.txtEmiratesId.placeholder=voltmx.i18n.getLocalizedString("Emirates ID");
    this.view.txtNewBuyerName.placeholder=voltmx.i18n.getLocalizedString("New Buyer Name");

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
  
  }






});
