define({


  onNavigate: function (data) {
    try {
      voltmx.application.showLoadingScreen(
        null,
        "Loading..",
        constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
        true,
        true,
        {
          shouldShowLabelInBottom: "true",
          separatorHeight: 45,
          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
          progressIndicatorColor: "Gray"
        }
      );
    } catch (e) {
      voltmx.print("Error showing loading screen: " + e.message);
      return;
    }
    this.seti18n();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxDropDownImgSellerOrBuyer.onClick = this.selectBuyerOrSeller.bind(this);
    this.view.segBuyerOrSeller.onRowClick = this.segBuyerOrSellerOnRowClickAction;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction.bind(this);
    this.view.flxCheckForPayOnSite.onClick = this.payOnSiteClick.bind(this);
    this.view.btnConfirmBooking.onClick = this.btnConfirmBookingOnClickAction;
    this.view.flxBack.onClick = this.navToRoadSideAsst.bind(this);
    this.view.flxSellerOrBuyerContainer.skin = "sknflxBgffffffBorderCCCCCCRadius4px45";
    this.view.flxVehicleLotId.skin = "sknflxBgffffffBorderCCCCCCRadius4px45";
    this.view.flxPickUp.skin = "sknflxBgffffffBorderCCCCCCRadius4px45";
    this.view.flxDrop.skin = "sknflxBgffffffBorderCCCCCCRadius4px45";
    this.view.flxDate.skin = "sknflxBgffffffBorderCCCCCCRadius4px45";
    if (data && data.dropAddressLoc && data.pickupAddress && data.sellerOrBuyerLotId && data.selectedDate && data.pickupLat && data.pickupLon) {
      this.dropAddress = data.dropAddressLoc.lblAddress ? data.dropAddressLoc.lblAddress : data.dropAddressLoc.lblDropLocation;
      this.dropCoordinatesLat = data.dropAddressLoc.lat;
      this.dropCoordinatesLng = data.dropAddressLoc.lng;
      this.pickupAddress = data.pickupAddress;
      this.dropLat = data.dropLat;
      this.dropLon = data.dropLon;
      this.sellerOrBuyerLotId = data.sellerOrBuyerLotId;
      this.selectedDate = data.selectedDate;
      this.pickUpCoordinates = data.pickupLat+","+data.pickupLon;
      voltmx.store.setItem("dropAddress", this.dropAddress || voltmx.store.getItem("dropAddressData"));
      voltmx.store.setItem("dropCoordinatesLat", String(this.dropCoordinatesLat || ""));
      voltmx.store.setItem("dropCoordinatesLng", String(this.dropCoordinatesLng || ""));
      voltmx.store.setItem("pickupAddress", this.pickupAddress || "");
      voltmx.store.setItem("dropLat", String(this.dropLat || ""));
      voltmx.store.setItem("dropLon", String(this.dropLon || ""));
      voltmx.store.setItem("sellerOrBuyerLotId", JSON.stringify(this.sellerOrBuyerLotId || {}));
      voltmx.store.setItem("selectedDate", this.selectedDate || "");
      voltmx.store.setItem("pickUpCoordinates", this.pickUpCoordinates || "");
    }
    else {
      this.dropAddress = voltmx.store.getItem("dropAddress");
      this.dropCoordinatesLat = voltmx.store.getItem("dropCoordinatesLat");
      this.dropCoordinatesLng = voltmx.store.getItem("dropCoordinatesLng");
      this.pickupAddress = voltmx.store.getItem("pickupAddress");
      this.dropLat = voltmx.store.getItem("dropLat");
      this.dropLon = voltmx.store.getItem("dropLon");
      this.sellerOrBuyerLotId = JSON.parse(voltmx.store.getItem("sellerOrBuyerLotId") || "{}");
      this.selectedDate = voltmx.store.getItem("selectedDate");
      this.pickUpCoordinates = voltmx.store.getItem("pickUpCoordinates");
    }
    voltmx.application.dismissLoadingScreen();
  },



  onPreShow: function () {
    this.toggleFooterIcons();
    this.setNavigatedObjectValues();
  },



  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
      this.btnConfirmBookingOnClickAction();
    } else {
      voltmx.print("Still offline...");
    }
  },



  setNavigatedObjectValues: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    voltmx.application.showLoadingScreen(
      null,
      "Loading..",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      true,
      true,
      {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
      }
    );
    var dropAddress = this.dropAddress || voltmx.store.getItem("dropAddress");
    var dropCoordinatesLat = this.dropCoordinatesLat || voltmx.store.getItem("dropCoordinatesLat");
    var dropCoordinatesLng = this.dropCoordinatesLng || voltmx.store.getItem("dropCoordinatesLng");
    var pickupAddress = this.pickupAddress || voltmx.store.getItem("pickupAddress");
    var pickUpCoordinates = this.pickUpCoordinates || voltmx.store.getItem("pickUpCoordinates");
    var dropLat = this.dropLat || voltmx.store.getItem("dropLat");
    var dropLon = this.dropLon || voltmx.store.getItem("dropLon");
    var sellerOrBuyerLotId = this.sellerOrBuyerLotId || JSON.parse(voltmx.store.getItem("sellerOrBuyerLotId") || "{}");
    var selectedDate = this.selectedDate || voltmx.store.getItem("selectedDate");
    if (dropAddress && dropCoordinatesLat && dropCoordinatesLng &&
        pickupAddress && pickUpCoordinates && dropLat && dropLon &&
        sellerOrBuyerLotId && selectedDate) {
      if (dropAddress && dropAddress.lblPlace && dropAddress.lblCountry) {
        var place = (dropAddress.lblPlace && dropAddress.lblPlace.text) ? dropAddress.lblPlace.text :"";
        var country = (dropAddress.lblCountry && dropAddress.lblCountry.text) ? dropAddress.lblCountry.text : "";
        place = place ? String(place) : "";
        country = country ? String(country) : "";
        if (country.trim() !== "") {
          dropAddress = place + ", " + country;
        } else {
          dropAddress = place;
        }
        voltmx.store.setItem("dropAddress", dropAddress);
      }
      this.view.lblLotId.text = sellerOrBuyerLotId.lotId || voltmx.store.getItem("lotidfromstarting")||"";
      this.view.lblPickUp.text = pickupAddress || "";
      this.view.lblDropOff.text = dropAddress || "";
      this.view.lblDate.text = selectedDate || "";
      this.view.txtNotes.text = sellerOrBuyerLotId.lblMsg || "";
      var sellerText = isArabic ? voltmx.i18n.getLocalizedString("Seller") : "Seller";
      var buyerText  = isArabic ? voltmx.i18n.getLocalizedString("Buyer")  : "Buyer";
      if(sellerOrBuyerLotId.lblUserType){
        if(sellerOrBuyerLotId.lblUserType  === "Seller" ||sellerOrBuyerLotId.lblUserType  === "بائع"){
          this.view.lblSellerOrBuyerText.text = sellerText;
        }
        else  if(sellerOrBuyerLotId.lblUserType  === "Buyer" || sellerOrBuyerLotId.lblUserType  === "مشتري"){
          this.view.lblSellerOrBuyerText.text = buyerText;
        }
      }
      else{
        var sellerorBuyerText = voltmx.store.getItem("serviceTitle");
        if(sellerorBuyerText  === "Seller" || sellerorBuyerText === "بائع"){
          this.view.lblSellerOrBuyerText.text = sellerText;
        }
        else  if(sellerorBuyerText  === "Buyer" || sellerorBuyerText === "مشتري"){
          this.view.lblSellerOrBuyerText.text = buyerText;
        }
      }
    }
    voltmx.application.dismissLoadingScreen();
  },



  navToRoadSideAsst: function(){
    new voltmx.mvc.Navigation("frmRequestRoadSideAssistance").navigate();
  },



  selectBuyerOrSeller: function() {
    var isOpen = this.view.imgDropDown.isVisible;
    this.view.imgDropDown.setVisibility(!isOpen);
    this.view.imgUpArrow.setVisibility(isOpen);
    this.view.flxDropDown.setVisibility(isOpen);
  },



  segBuyerOrSellerOnRowClickAction: function(){
    var selectedText = this.view.segBuyerOrSeller.selectedRowItems[0].lblBuyerOrSeller.text;
    this.view.lblSelectedValue.setVisibility(true);
    this.view.lblSelectedValue.text = selectedText;
    var isSellerOrBuyer = selectedText === "Seller" || selectedText === "Buyer";
    this.view.flxDropDown.setVisibility(!isSellerOrBuyer);
    this.view.imgUpArrow.setVisibility(false);
    this.view.imgDropDown.setVisibility(true);
  },



  payOnSiteClick: function () {
    this.view.btnConfirmBooking.setEnabled(this.view.imgCheck.isVisible);
  },



  btnConfirmBookingOnClickAction: function(){

  var self = this;
      checkTokenValidatity(function() {
   
      voltmx.application.showLoadingScreen(
        null,
        "Loading..",
        constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
        true,
        true,
        {
          shouldShowLabelInBottom: "true",
          separatorHeight: 45,
          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
          progressIndicatorColor: "Gray"
        }
      );

      var userId = voltmx.store.getItem("userId");
      var usertoken = voltmx.store.getItem("getUserAccesstoken");
      var object_id = self.sellerOrBuyerLotId.lblObjectId;
      var notes = self.sellerOrBuyerLotId.lblMsg;
      var PickUpAddress = self.pickupAddress;
      var id = voltmx.store.getItem("idFromRSA");
      var selectedDate = self.selectedDate;
      var create_service_request_inputparam = {};
    
      create_service_request_inputparam["serviceID"] = "ms_fleet$create-service-request";
      create_service_request_inputparam["service_type"] = "rsa";
      create_service_request_inputparam["location_name"] = PickUpAddress;
      create_service_request_inputparam["pickup_on"] =selectedDate;
      create_service_request_inputparam["notes"] = self.view.txtNotes.text;
      create_service_request_inputparam["service_provider_id"] = "1";
      create_service_request_inputparam["coordinates"] = self.pickUpCoordinates;
      create_service_request_inputparam["object_id"] = object_id;
      create_service_request_inputparam["emirates"] = id;
      var create_service_request_httpheaders = {
        user_token : usertoken
      };
      create_service_request_inputparam["httpheaders"] = create_service_request_httpheaders;
      var create_service_request_httpconfigs = {};
      create_service_request_inputparam["httpconfig"] = create_service_request_httpconfigs;
      ms_fleet$create_service_request
        = mfintegrationsecureinvokerasync(create_service_request_inputparam, 
                                          "ms_fleet",
                                          "create-service-request",
                                          function(status, response){
        voltmx.print(status);
        voltmx.print(response);
        voltmx.application.dismissLoadingScreen();
        if(!response){
          voltmx.print("No response");
          return;
        }
        if(response.opstatus === 1011
          ){
          this.view.flxError.setVisibility(true);
        }
        if(response && response.rawResponse && response.rawResponse.data){
          var message = response.rawResponse.message;
          voltmx.application.dismissLoadingScreen();
          if(response.opstatus === 0 
            ){
            try{
              var ntf = new voltmx.mvc.Navigation("frmBookingSummaryVehiclePickUp");
              ntf.navigate({
                dropAddressLoc : { lblAddress: self.dropAddress },
                dropCoordinates : {
                  lat: self.dropCoordinatesLat,
                  lng : self.dropCoordinatesLng
                },
                pickupAddress  : self.pickupAddress,
                pickUpCoordinates : self.pickUpCoordinates,
                sellerOrBuyerLotId: self.sellerOrBuyerLotId,
                selectedDate:  self.selectedDate
              });
            } catch (navErr) {
              voltmx.print("Navigation error: " + navErr.message);
              alert("Navigation failed: " + navErr.message);
            }
          }  
        } 
        else if(response && response.rawResponse && response.rawResponse.error){

          if(response.rawResponse.error.message === "Invalid user Token"){
            alert(response.rawResponse.error.message);
          }
          else if (response.rawResponse.error.message === "Service already exists with the given details."){
            alert(response.rawResponse.error.message);
          } 
        }
        else{
          voltmx.print(response.rawResponse);
        }  
      });

    });
    
    
    
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
//       this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
      this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//       this.view.Footer2.lblMyBids.text = "My Bids";
    }
    var isLogin = voltmx.store.getItem("isLogin");
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



  seti18n: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;

    if(isArabic)
    {

      var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      this.view.imgBack.transform = flipTransform;

    }
    else
    {
      this.view.imgBack.transform = voltmx.ui.makeAffineTransform();
    }
    var labelList = [
      "lblBookYourVehicleOrPickup",
      "lblSellerOrBuyerText",
      "lblLotId",
      "lblPickUp",
      "lblDropOff",
      "lblDate",
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxBackNavigation",
      "flxBarContainer",
      "flxSellerOrBuyerContainer",
      "flxVehicleLotId",
      "flxPickUp",
      "flxDrop",
      "flxDate",
      "flxNotes",
      "flxPayOnSite"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblBookYourVehicleOrPickup.text = voltmx.i18n.getLocalizedString("Book Your Vehicle Pickup or Delivery");
    this.view.txtNotes.placeholder = voltmx.i18n.getLocalizedString("Optional Notesd");
    this.view.lblPayOnSite.text = voltmx.i18n.getLocalizedString("Pay On Site");
    this.view.btnConfirmBooking.text = voltmx.i18n.getLocalizedString("CONFIRM BOOKING");
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