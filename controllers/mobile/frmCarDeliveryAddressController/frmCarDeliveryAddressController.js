
define({

  navData: {},
  onNavigate: function (data) {
    this.setData();
    voltmx.runOnMainThread(function () {
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
    });
    this.navDataSellerOrBuyerLotId = data || {};
    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow;
    this.view.flxBack.onClick = this.BackOnclick.bind(this);
    this.view.flxSearch.onClick = this.flxSearchOnClick.bind(this);
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction.bind(this);
    this.view.segPreviousSearches.onRowClick = this.segPreviousSearchesOnRowClickAction.bind(this);
    voltmx.runOnMainThread(function () {
      voltmx.application.dismissLoadingScreen();
    }, []);
  },




  onPreShow: function() {
 var mode = voltmx.store.getItem("mode") || "seller";
    try {
      kony.timer.cancel("delayMapSetup");
    } catch (e) {}
    kony.timer.schedule("delayMapSetup", function() {
      this.setCurrentLocationOnMap();
    }.bind(this), 0.5, false);
    this.showRecentSearches();
    this.getBranchLocations();
    var seller_rsa = voltmx.store.getItem("seller_rsa");
    if(seller_rsa === "sending to awa"){  //sending to awa-> pickup own, awa.1
      this.view.lblSearchDeliveryAddress.text = "Select alwataneya Location";
    }
else if(seller_rsa === "receiving to awa" || mode === "buyer"){ //receiving to awa-> pickup awa, drop own.0
         this.view.lblSearchDeliveryAddress.text = "Enter Your Location";
    }
  },




  getBranchLocations: function(){

    var self = this;
    var master_branch_locations_inputparam = master_branch_locations_inputparam || {};
    master_branch_locations_inputparam["serviceID"] = "fry_int_fleet$master-branch-locations";
    master_branch_locations_inputparam["location"] = "";
    master_branch_locations_inputparam["location_ar"] = "";
    master_branch_locations_inputparam["page_number"] ="1";
    master_branch_locations_inputparam["page_size"] = "100";
    var master_branch_locations_httpheaders = {};
    master_branch_locations_inputparam["httpheaders"] = master_branch_locations_httpheaders;
    var master_branch_locations_httpconfigs = {};
    master_branch_locations_inputparam["httpconfig"] = master_branch_locations_httpconfigs;
    fry_int_fleet$master_branch_locations =
      mfintegrationsecureinvokerasync(master_branch_locations_inputparam, 
                                      "fry_int_fleet",
                                      "master-branch-locations", 
                                      function(status,response){
//       alert("response :"+JSON.stringify(response));
//       alert("status:"+status);
    });
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
    }
  },




  restorePickupData: function () {
    var pickupAddr = voltmx.store.getItem("address");
    if (pickupAddr &&
        typeof pickupAddr.lat === "number" &&
        typeof pickupAddr.lng === "number") {
      this.address = pickupAddr;
      this.pickupLat = pickupAddr.lat;
      this.pickupLon = pickupAddr.lng;
      voltmx.print("Restored pickup: " +
                   (pickupAddr.formatted_address || JSON.stringify(pickupAddr)) +
                   " (" + this.pickupLat + ", " + this.pickupLon + ")");
    } else {
      voltmx.print("Pickup data not found or invalid in store.");
      this.address = null;
      this.pickupLat = null;
      this.pickupLon = null;
    }
    return this.address;
  },




  fetchLatLonForPlaceId: function(placeId) {
    return new Promise(function(resolve, reject) {
      voltmx.application.showLoadingScreen(
        null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,
        {
          shouldShowLabelInBottom: "true",
          separatorHeight: 45,
          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
          progressIndicatorColor: "Gray"
        }
      );
      var apiKey = "AIzaSyDmPDAkBx-0Gqu4t1fuGxatOoR2FV_AnE0";
      var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
          placeId + "&key=" + apiKey;
      var httpRequest = new voltmx.net.HttpRequest();
      httpRequest.open(constants.HTTP_METHOD_GET, url);
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.onReadyStateChange = function () {
        if (httpRequest.readyState === 4) {
          voltmx.application.dismissLoadingScreen();
          if (httpRequest.status === 200) {
            try {
              var response = JSON.parse(httpRequest.responseText);
              if (response.status === "OK") {
                var location = response.result.geometry.location;
                resolve(location); 
              } else {
                reject("Place Details error: " + response.status);
              }
            } catch (e) {
              reject("JSON parse error: " + e.message);
            }
          } else {
            if (httpRequest.status === -1) {
              voltmx.print("Network error or request failed: " + httpRequest.status);
              this.view.flxError.setVisibility(true);
            }
            else{
              alert("Server responded with error: " + httpRequest.status);
            } }  }
      };
      httpRequest.send();
    });
  },




  segPreviousSearchesOnRowClickAction: function (){
    var selected_address = this.view.segPreviousSearches.selectedRowItems[0];
    if (!selected_address) {
      alert("Please select a previous search before continuing.");
      return;
    }
    var pickupAddr = this.restorePickupData();
    if (!pickupAddr || !this.navDataSellerOrBuyerLotId) {
      alert("Pickup info or LotId missing. Please go back and select again.");
      return;
    }
    var self = this;
    function proceed(address) {
      voltmx.store.setItem("selectedAddress", address);
      var navObj = new voltmx.mvc.Navigation("frmCarCollectionAddress3");  
      if (pickupAddr.lat && pickupAddr.lng) {
        navObj.navigate({
          dropAddress: address,
          pickupAddress: pickupAddr,
          pickupLat: pickupAddr.lat,
          pickupLon: pickupAddr.lng,
          sellerOrBuyerLotId: self.navDataSellerOrBuyerLotId
        });
      } else if (self.pickupLat && self.pickupLon) {
        navObj.navigate({
          dropAddress: address,
          pickupAddress: pickupAddr,
          pickupLat: self.pickupLat,
          pickupLon: self.pickupLon,
          sellerOrBuyerLotId: self.navDataSellerOrBuyerLotId
        });
      }}
    if (typeof selected_address.lat === "number" && typeof selected_address.lng === "number") {
      proceed(selected_address);
      return;
    }
    var placeId = selected_address.lblPlaceId;
    this.fetchLatLonForPlaceId(placeId)
      .then(function (locationData) {
      selected_address.lat = locationData.lat;
      selected_address.lng = locationData.lng;
      voltmx.store.setItem("selectedLat",selected_address.lat );
      voltmx.store.setItem("selectedLng",selected_address.lng );
      proceed(selected_address);
    })
      .catch(function (err) {
      voltmx.print("Previous search failed: " + err);
      alert(err);
    });
  },




  showRecentSearches: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var recent = getRecentSearches() || [];
    var data = recent.map(function (item) {
      var place = "";
      if (item.lblPlace) {
        if (typeof item.lblPlace === "string") {
          place = item.lblPlace;
        } else if (item.lblPlace.text) {
          place = item.lblPlace.text;
        }
      }
      var country = "";
      if (item.lblCountry) {
        if (typeof item.lblCountry === "string") {
          country = item.lblCountry;
        } else if (item.lblCountry.text) {
          country = item.lblCountry.text;
        }
      }
      var address = place + (country ? ", " + country : "");
      return {
        imgLocation: "location512h",
        lblAddress : address,
        lblPlaceId : item.lblPlaceId,
        "segRowPreviousSearches" : {
          "reverseLayoutDirection": isArabic,
          "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
        }
      };
    });
    this.view.segPreviousSearches.setData(data);
    this.view.segPreviousSearches.isVisible = data.length > 0;
  },




  setCurrentLocationOnMap: function() {
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
    voltmx.location.getCurrentPosition(
      function(position) {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        var currentLocation = {
          lat: this.lat,
          lon: this.lon,
          name: "Your Current Location",
          desc: "You are here",
          showCallout: true,
          calloutData: {
            lbl1: "You are here"
          }
        };
        try {
          kony.timer.cancel("setMapTimer");
        } catch (e) {}
        kony.timer.schedule("setMapTimer", function() {
          this.view.map1.provider = constants.MAP_PROVIDER_GOOGLE;
          this.view.map1.enableZoom = true;
          this.view.map1.showUserLocation = true;
          this.view.map1.zoomLevel = 18;
          this.view.map1.locationData = [currentLocation];
          this.view.map1.centerLocation = {
            lat: this.lat,
            lon: this.lon
          };
          this.getAddressFromLatLon(this.lat, this.lon);
          voltmx.application.dismissLoadingScreen();
          voltmx.print("Map updated with current location.");	
        }.bind(this), 0.5, false);
      }.bind(this),
      function(error) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Location Error: " + JSON.stringify(error));
        alert("Unable to get your location.");
      }
    );
  },




  getAddressFromLatLon: function (lat, lon) {
    var apiKey = "AIzaSyDmPDAkBx-0Gqu4t1fuGxatOoR2FV_AnE0"; 
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + apiKey;
    var request = new voltmx.net.HttpRequest();
    request.open("GET", url); 
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();
        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          voltmx.print("Geocode Response: " + JSON.stringify(response));
          if (response.status === "OK" && response.results.length > 0) {
            var firstResult = response.results[0];
            var normalizedPickup = {
              formatted_address: firstResult.formatted_address,
              lat: lat,
              lng: lon
            };
            this.address = normalizedPickup;
            voltmx.store.setItem("address", normalizedPickup);
            voltmx.print("Pickup saved: " + JSON.stringify(normalizedPickup));
          } else {
            alert("No address found for location.");
          }
        } else {
          if (request.status === -1) {
            voltmx.print("Network error or request failed: " + request.status);
            this.view.flxError.setVisibility(true);
          }
          else{
            alert("Server responded with error: " + request.status);
          }}}
    };
    request.send();
  },




  flxSearchOnClick: function(){
    var addr = voltmx.store.getItem("address");
    voltmx.store.removeItem("pickUpDropAddress");
    var navObj = new voltmx.mvc.Navigation("frmPickupAndDrop");
    if(addr &&  this.navDataSellerOrBuyerLotId){
      navObj.navigate({
        address           : addr,
        sellerOrBuyerLotId: this.navDataSellerOrBuyerLotId
      });
      voltmx.store.setItem("pickUpDropAddress",{
        address           : addr,
        sellerOrBuyerLotId: this.navDataSellerOrBuyerLotId
      });
    }
    else{
      voltmx.print(addr);
      return;
    }
  },




  BackOnclick: function() {
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm && previousForm.id === "frmRequestRoadSideAssistance") {
      voltmx.application.destroyForm("frmRequestRoadSideAssistance");
    }
    var navObj = new voltmx.mvc.Navigation("frmRequestRoadSideAssistance");
    navObj.navigate();
  },




  setData: function(){
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
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
    var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var direction = isArabic;
    var labelList = [
      "lblTittle",
      "lblSearchDeliveryAddress"
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxUnderLineContainer",
      "flxBarContainer",
      "flxSearch",
      "flxBack"
    ];
    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblSearchDeliveryAddress.text = voltmx.i18n.getLocalizedString("Enter Your Destination");
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
    this.view.lblTittle.text = voltmx.i18n.getLocalizedString("Car delivery address");
  }




});