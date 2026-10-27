define({


  onNavigate: function (data) {
    this.prevForm = voltmx.application.getPreviousForm();
    voltmx.application.showLoadingScreen(
      null,
      "Loading..",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      true,
      true
    );
    this.navData;
    if (data && Object.keys(data).length > 0) {
      voltmx.store.setItem("pickUpAddressData", data);
      this.navData = data;
    } else {
      this.navData =
        voltmx.store.getItem("pickUpAddressData") ||
        voltmx.store.getItem("address") ||
        {};
    }
    this.dropFromLocal = voltmx.store.getItem("dropAddressData");
    this.selectedDrop  = voltmx.store.getItem("selectedAddress");
    this.selectedLat   = voltmx.store.getItem("selectedLat");
    this.selectedLng   = voltmx.store.getItem("selectedLng");
    this.settingDate();
    this.setData();
    this.view.flxBack.onClick = this.navToPickUp.bind(this);
    this.view.preShow = this.onPreShow;
    this.view.flxCheckForPayOnSite.onClick = this.flxCheckForPayOnSiteOnClickAction;
    this.view.cal.onSelection = this.calOnSelectionAction;
    this.view.btnConfirmPickUPOrDropOff.onClick =
      this.btnConfirmPickUPOrDropOffOnClickAction;
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction.bind(this);
  },




  onPreShow: function () {
    this.view.btnConfirmPickUPOrDropOff.setEnabled(false);
    this.view.cal.data = null;
    this.view.lblSelectDate.text="Select date"
    this.view.flxPayOnSite.setVisibility(false);
    this.view.flxSelectDateError.setVisibility(false);
    this.view.imgCheck.setVisibility(false);
    var normalizedPickup = this.normalizePickup(this.navData.pickupAddress);
    var hasValidPickup =
        normalizedPickup &&
        typeof this.navData.pickupLat === "number" &&
        typeof this.navData.pickupLon === "number";
    var hasValidDrop = false;
    var resolvedDrop = null;
    if (
      this.navData.dropAddress &&
      typeof this.navData.dropAddress.lat === "number" &&
      typeof this.navData.dropAddress.lng === "number"
    ) {
      hasValidDrop = true;
      resolvedDrop = this.navData.dropAddress;
    } else if (
      this.selectedDrop &&
      typeof this.selectedLat === "number" &&
      typeof this.selectedLng === "number"
    ) {
      alert("Using drop from selectedDrop/Lat/Lng");
      hasValidDrop = true;
      resolvedDrop = {
        ...this.selectedDrop,
        lat: this.selectedLat,
        lng: this.selectedLng,
      };
    }
    var hasLotId = !!this.navData.sellerOrBuyerLotId;
    if (hasValidPickup && hasValidDrop && hasLotId) {
      this.assignNavData(this.navData, normalizedPickup, resolvedDrop);
      this.setupMapAndDismiss();
      return;
    }
    if (hasValidPickup && hasLotId && this.dropFromLocal) {
      this.assignNavData(this.navData, normalizedPickup, this.dropFromLocal);
      this.setupMapAndDismiss();
      return;
    }
    voltmx.application.dismissLoadingScreen();
//     new voltmx.mvc.Navigation(this.prevForm).navigate();
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
    }
  },



  normalizePickup: function(pickupAddress) {
    if (!pickupAddress) return null;
    if (pickupAddress.formatted_address) {
      return {
        formatted_address: pickupAddress.formatted_address,
        lat: pickupAddress.lat,
        lng: pickupAddress.lng
      };
    }
    if (
      pickupAddress.results &&
      pickupAddress.results[0] &&
      pickupAddress.results[0].formatted_address
    ) {
      let loc = pickupAddress.results[0].geometry.location || {};
      return {
        formatted_address: pickupAddress.results[0].formatted_address,
        lat: loc.lat,
        lng: loc.lng
      };
    }
   else if(pickupAddress){
      return {
        formatted_address: pickupAddress,
        lat: pickupAddress.lat,
        lng: pickupAddress.lng
      };
    }
    return null;
  },




  assignNavData: function (navData, normalizedPickup, dropOverride) {
    this.pickupLat = navData.pickupLat;
    this.pickupLon = navData.pickupLon;
    if (normalizedPickup && normalizedPickup.formatted_address) {
      this.pickupAddress = normalizedPickup.formatted_address;
    } else if (navData.pickupAddress && navData.pickupAddress.formatted_address) {
      this.pickupAddress = navData.pickupAddress.formatted_address;
    } else if (navData.pickupAddress ){
      this.pickupAddress = navData.pickupAddress;
    }
    else{
      this.pickupAddress =null;
    }
    this.view.lblPickUpAddress.text =
      this.pickupAddress || "Pickup not available";
    this.dropAddressLoc = dropOverride || navData.dropAddress || {};
    this.dropLat = this.dropAddressLoc.lat || null;
    this.dropLon = this.dropAddressLoc.lng || null;
    if (this.dropAddressLoc && Object.keys(this.dropAddressLoc).length > 0) {
      voltmx.store.setItem("dropAddressData", this.dropAddressLoc);
    }
    if (navData.sellerOrBuyerLotId) {
      this.sellerOrBuyerLotId = navData.sellerOrBuyerLotId;
    }
    this.view.forceLayout(); 
    voltmx.print("Assigned pickup=" + this.pickupAddress +
                 " | drop=" + JSON.stringify(this.dropAddressLoc));
  },




  setupMapAndDismiss: function () {
    try { kony.timer.cancel("delayMapsSetup"); } catch (e) {}
    kony.timer.schedule(
      "delayMapsSetup",
      function () {
        voltmx.application.dismissLoadingScreen();
        if (this.view.map1) {
          try {
            this.flxwrapper();
          } catch (e) {
            alert("flxwrapper failed: " + e.message);
          }
        } else {
          alert("Map widget not found.");
        }
      }.bind(this),
      1,
      false
    );
  },




  btnConfirmPickUPOrDropOffOnClickAction: function() {
    if (this.calOnSelectionAction()) {
      var navObj = new voltmx.mvc.Navigation("frmBookYourVehiclePickUpOrDelivery");
      if(this.dropAddressLoc &&  this.pickupAddress &&  this.sellerOrBuyerLotId 
         && this.selectedDate &&  this.pickupLat &&this.pickupLon && this.dropLon 
         && this.dropLat ){
        navObj.navigate({
          "dropAddressLoc"     :  this.dropAddressLoc,
          "pickupAddress"      :  this.pickupAddress,
          "sellerOrBuyerLotId" :  this.sellerOrBuyerLotId,
          "selectedDate"       :  this.selectedDate,
          "pickupLat"          : this.pickupLat,
          "pickupLon"          : this.pickupLon,
          "dropLon"            :  this.dropLon,
          "dropLat"            :  this.dropLat
        });
      }
      else{
        voltmx.print("Pickup/Drop data missing. Retrying fetch...");
        this.refreshPickupDropData(); 
      }
    } else {
      this.view.flxSelectDateError.setVisibility(true);
    }
  },




  refreshPickupDropData: function() {
    var data = voltmx.store.getItem("pickUpAddressData");
    if (data) {
      this.pickupLat = data.pickupLat;
      this.pickupLon = data.pickupLon;
      this.dropLat   = data.dropAddress.lat;
      this.dropLon   = data.dropAddress.lng;
      this.pickupAddress = data.pickupAddress.results[0].formatted_address;
      this.dropAddressLoc = data.dropAddress;
      this.sellerOrBuyerLotId = data.sellerOrBuyerLotId;
      this.view.lblPickUpAddress.text = this.pickupAddress;
      this.view.forceLayout();
    }
  },




  calOnSelectionAction: function () {
    var selected = this.view.cal.date;
    if (selected) {
      selected = selected.replace(/\u200E|\u200F/g, "");
      const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
      for (let i = 0; i < 10; i++) {
        selected = selected.replace(arabicDigits[i], i);
      }
      selected = selected.replace(/-/g, "/");
      var parts = selected.split("/");
      var day, month, year;
      if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
      } else {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        year = parseInt(parts[2], 10);
      }
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        voltmx.print("Invalid date parts after normalization: " + selected);
        this.view.flxPayOnSite.setVisibility(false);
        return false;
      }
      var now = new Date();
      var combinedDate = new Date(Date.UTC(year, month, day, now.getHours(), now.getMinutes(), now.getSeconds()));
      if (isNaN(combinedDate.getTime())) {
        voltmx.print("Invalid combined date: " + selected);
        this.view.flxPayOnSite.setVisibility(false);
        return false;
      }
      var isoString = combinedDate.toISOString();
      this.selectedDate = isoString;
      this.view.lblSelectDate.text = isoString;
      voltmx.print("Selected ISO DateTime: " + isoString);
      this.view.flxPayOnSite.setVisibility(true);
      return true;
    } else {
      voltmx.print("No date selected.");
      this.view.flxPayOnSite.setVisibility(false);
      return false;
    }
  },




  flxwrapper: function(){
    this.getDirectionsAndDisplay(
      this.pickupLat,
      this.pickupLon,
      this.dropLat,
      this.dropLon
    );
  },




  getDirectionsAndDisplay: function (pickupLat, pickupLon, dropLat, dropLon) {
    voltmx.runOnMainThread(function () {
    }, []);
    var origin = pickupLat + "," + pickupLon;
    var destination = dropLat + "," + dropLon;
    var apiKey = "AIzaSyDmPDAkBx-0Gqu4t1fuGxatOoR2FV_AnE0"; // Replace with your valid key
    var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        encodeURIComponent(origin) + "&destination=" +
        encodeURIComponent(destination) + "&mode=driving&key=" + apiKey;
    voltmx.print(url + "   url ");
    var httpClient = new voltmx.net.HttpRequest();
    httpClient.open(constants.HTTP_METHOD_GET, url);
    httpClient.onReadyStateChange = function () {
      voltmx.runOnMainThread(function () {
        if (httpClient.readyState === 4) {
          voltmx.print("Raw Directions API Response: " + httpClient.response);
          try {
            if (httpClient.status === 200 && httpClient.response) {
              var response = httpClient.response; 
              if (response.status === "ZERO_RESULTS") {
                voltmx.application.showAlert(
                  "No such response found with the location " + this.dropAddressLoc.lblPlace + "," + this.dropAddressLoc.lblCountry,
                  null
                );
                voltmx.application.dismissLoadingScreen();
                return;
              }
              if (response.status === "OK") {
                var route = response.routes[0];
                var leg = route.legs[0];
                var distance = leg.distance.text; 
                var duration = leg.duration.text; 
                voltmx.print("Distance: " + distance + ", Duration: " + duration);
                var points = voltmx.map.decode(route.overview_polyline.points);
                if (!this.view.map1) {
                  voltmx.print("Map widget not initialized.");
                  voltmx.application.showAlert("Map widget not found. Please try again.", null);
                  voltmx.application.dismissLoadingScreen();
                  return;
                }
                this.view.map1.clear();
                this.view.map1.locationData = [
                  { lat: pickupLat, lon: pickupLon, name: "Pickup", desc: "Start", showCallout: true },
                  { lat: dropLat, lon: dropLon, name: "Drop", desc: "End", showCallout: true }
                ];
                if (points && points.length > 0) {
                  voltmx.print("Decoded Polyline Points: " + JSON.stringify(points));
                  try { kony.timer.cancel("myOneTimeTimer"); } catch (e) {}

                  kony.timer.schedule("myOneTimeTimer", function () {
                    voltmx.runOnMainThread(function () {
                      this.view.map1.addPolyline({
                        id: "route",
                        points: points.map(function (pt) {
                          return { lat: pt.latitude, lon: pt.longitude };
                        }),
                        color: "#FF0000",
                        width: 4
                      });
                    }.bind(this), []);
                  }.bind(this), 0.5, false); 
                } else {
                  voltmx.print("Polyline points not decoded correctly.");
                  voltmx.application.showAlert("Unable to draw route on map.", null);
                  voltmx.application.dismissLoadingScreen();
                }
                try { kony.timer.cancel("mapZoomDelay"); } catch (e) {}
                kony.timer.schedule("mapZoomDelay", function () {
                  voltmx.runOnMainThread(function () {
                    this.view.map1.zoomLevel = 12;
                    voltmx.application.dismissLoadingScreen();
                  }.bind(this), []);
                }.bind(this), 0.8, false);
              } else {
                voltmx.print("Directions API error: " + response.status);
                voltmx.application.showAlert("Directions API error: " + response.status, null);
                voltmx.application.dismissLoadingScreen();
              }
            } else {
              voltmx.print("HTTP error: " + httpClient.status);
              if (httpClient.status === -1) {
                voltmx.print("Network error or request failed: " + httpClient.status);
                this.view.flxError.setVisibility(true);
              }
              else{
                alert("Failed to fetch directions. HTTP Status:  " + httpClient.status);
              }
              voltmx.application.showAlert("Failed to fetch directions. HTTP Status: " + httpClient.status, null);
              voltmx.application.dismissLoadingScreen();
            }
          } catch (e) {
            voltmx.print("Error in getDirectionsAndDisplay: " + e.message);
            voltmx.application.dismissLoadingScreen();
          }
        }
      }.bind(this), []);
    }.bind(this);
    httpClient.send();
  },




  flxCheckForPayOnSiteOnClickAction: function() {
    this.view.imgCheck.setVisibility(!this.view.imgCheck.isVisible);
    this.view.btnConfirmPickUPOrDropOff.setEnabled(this.view.imgCheck.isVisible);
  },




  settingDate: function() {
    var today = new Date();
    var futureDate = new Date();
    futureDate.setFullYear(today.getFullYear() + 1);
    var startDate = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    var endDate = [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()];
    this.view.cal.validStartDate = startDate;
    this.view.cal.validEndDate = endDate;
    this.view.cal.dateComponents = startDate;
  },




  navToPickUp: function() {
    var prevForm = voltmx.application.getPreviousForm();
    if (prevForm && prevForm.id) {
      try {
        voltmx.application.destroyForm(prevForm.id);
        voltmx.print("Destroyed previous form: " + prevForm.id);
      } catch (e) {
        voltmx.print("Failed to destroy previous form: " + e.message);
      }
    }
    var navObj = new voltmx.mvc.Navigation("frmPickupAndDrop");
    navObj.navigate();
  }, 




  setData: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    if(isArabic)
      {
       this.view.flxBack.left = "";
        this.view.flxBack.right = "0dp";
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;   
      }
    else
      {
        this.view.flxBack.left = "0dp";
        this.view.flxBack.right = "";
         this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
      }
    var labelList = [
      "lblTitle",
      "lblPickUpAddress"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxBarContainer",
      "flxPickUpAddress",
      "flxPayOnSite",
      "flxSelectDateError",
      "flxPickUpOrDropOff"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblFixedFareAnyWhere.text = voltmx.i18n.getLocalizedString("Fixed fare anywhere in Dubai");
    this.view.lblPickUpOrDropOff.text = voltmx.i18n.getLocalizedString("Pickup/Drop Off");
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblTitle.text = voltmx.i18n.getLocalizedString("Car delivery address");
    this.view.lblPayOnSite.text = voltmx.i18n.getLocalizedString("Pay On Site");
    //     this.view.lblPickUpOrDropOff.text = voltmx.i18n.getLocalizedString("pickUpOrDropOff");
    //     this.view.lblFixedFareAnyWhere.text = voltmx.i18n.getLocalizedString("FixedfareanywhereinDubai");
    this.view.lblSelectDate.text  = voltmx.i18n.getLocalizedString("selectDate");
    this.view.btnConfirmPickUPOrDropOff.text = voltmx.i18n.getLocalizedString("CONFIRM PICKUP/ DROP OFF");
  }




});
