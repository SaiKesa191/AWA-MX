define({

  onNavigate: function (data) {
    this.isDropDownOpen = false;
    this.isDropDownOpenPickUp = false;
    this.seti18n();
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
      }
    });
    data = voltmx.store.getItem("pickUpDropAddress") || data;
    if (data && data.address && data.sellerOrBuyerLotId) {
      this.address = data.address;
      this.sellerOrBuyerLotId = data.sellerOrBuyerLotId;

      if (this.address.results && this.address.results.length > 0) {
        var location = this.address.results[0].geometry.location;
        this.pickupLat = location.lat;
        this.pickupLon = location.lng;
      } else if (this.address.formatted_address && this.address.lat && this.address.lng) {
        this.view.lblPickUpText.text = this.address.formatted_address || "Location";
        //         this.view.lblPickUpText2.text = this.address.formatted_address || "Location";
        this.pickupLat = this.address.lat;
        this.pickupLon = this.address.lng;
      } else {
        voltmx.application.dismissLoadingScreen();
        alert("Address format not recognized, cannot extract lat/lon");
      }
      voltmx.print("Pickup Lat: " + this.pickupLat + ", Lon: " + this.pickupLon);
    }
    this.view.preShow = this.onPreShow.bind(this);
    this.view.tbxDropOff.onTextChange = this.tbxDropOffOnTextChangeAction.bind(this);
    //     this.view.tbxDropOff1.onTextChange = this.tbxDropOffOnTextChangeAction.bind(this);
    this.view.segLocationData.onRowClick = this.navToNextForm.bind(this);
    this.view.segDropLocations.onRowClick = this.segDropLocationsOnRowClickAction.bind(this);
    this.view.segDropLocationsPickUp.onRowClick  = this.segDropLocationsPickUpOnRowClickAction.bind(this);
    this.view.flxDropDownImage.onClick = this.flxDropDownImageonClickAction.bind(this);
    this.view.flxDropDownImgPickup.onClick =  this.flxDropDownImgPickupOnClick.bind(this);
    this.view.flxError.btnTryAgain.onClick = this.flxErrorBtnTryAgainOnClickAction.bind(this);
    this.view.flxBack.onClick = function () {
      new voltmx.mvc.Navigation("frmCarDeliveryAddress").navigate();
    };
    voltmx.runOnMainThread(function () {
      voltmx.application.dismissLoadingScreen();
    }, []);
  },



  getBranchLocations: function(){

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
      voltmx.print("response :"+JSON.stringify(response));
      voltmx.print("status:"+status);


      if (!response || !response.records || response.records.length === 0) {
        voltmx.print("No branch locations found.");
        self.view.segDropLocations.setData([]);
        return;
      }
      voltmx.application.dismissLoadingScreen();
      //  Prepare segment data properly
      var data = response.records.map(function(record) {
        if(record.value === "Sharjah"){
          var addValue = record.add_value || "";
          if (addValue.includes(",")) {
            var parts = addValue.split(",");
            self.sharjahlat = parts[0].trim();
            self.sharjahlon = parts[1].trim();
          }
        }
        else{
          if(record.value === "Abu Dhabi"){
            var addValue = record.add_value || "";
            if (addValue.includes(",")) {
              var parts = addValue.split(",");
              self.Abudhabilat = parts[0].trim();
              self.Abudhabilon = parts[1].trim();
            }
          }
        }
        return {
          "lblDropLocation": record.value || "N/A",

        };
      });
      if(self.view.flxDropOffDropDown.isVisible){
        self.view.segDropLocations.setData(data);
      }
      else if(self.view.flxSelectPickUp.isVisible){
        self.view.segDropLocationsPickUp.setData(data);
      }

    });
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
      "",
    ];
    for (var i = 0; i < labelList.length; i++) {
      if (this.view[labelList[i]]) {
        this.view[labelList[i]].contentAlignment = alignment;
      }
    }
    var flexList = [
      "flxPickUpDrop",
      "flxDirection",
      "flxLine",
      "flxPickp",
      "flxDrop"
    ];

    for (var j = 0; j < flexList.length; j++) {
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    this.view.lblPickUpDrop.text=voltmx.i18n.getLocalizedString("Pick up / Drop");
  },




  flxDropDownImageonClickAction: function() {
    if (!this.isDropDownOpen) {
      this.view.flxDropDownList.setVisibility(true);
      this.view.imgDropDown.setVisibility(false);
      this.view.imgUpArrow.setVisibility(true);
      this.isDropDownOpen = true;
    } else {
      this.view.flxDropDownList.setVisibility(false);
      this.view.imgDropDown.setVisibility(true);
      this.view.imgUpArrow.setVisibility(false);
      this.isDropDownOpen = false;
    }
  },

  flxDropDownImgPickupOnClick: function(){
    if (!this.isDropDownOpenPickUp) {
      this.view.flxDropDownListPickUp.setVisibility(true);
      this.view.imgDropDownPickup.setVisibility(false);
      this.view.imgUpArrowPickUp.setVisibility(true);
      this.isDropDownOpenPickUp = true;
    } else {
      this.view.flxDropDownListPickUp.setVisibility(false);
      this.view.imgDropDownPickup.setVisibility(true);
      this.view.imgUpArrowPickUp.setVisibility(false);
      this.isDropDownOpenPickUp = false;
    }
  },



  segDropLocationsOnRowClickAction: function(){

    var selectedDropLocation = this.view.segDropLocations.selectedRowItems;
    this.view.lblSelectDrop.text = selectedDropLocation[0].lblDropLocation;
    this.view.flxDropDownList.setVisibility(false);
    this.view.imgDropDown.setVisibility(true);
    this.view.imgUpArrow.setVisibility(false);

    //  Prepare segment data properly
    if(this.view.lblSelectDrop.text === "Sharjah"){
      this.Selectedlat =  this.sharjahlat ;
      this.SelectedLon =  this.sharjahlon ; 
    }
    else{
      this.Selectedlat =   this.Abudhabilat;
      this.SelectedLon = this.Abudhabilon;
    }
    this.navToNextForm();
  },



  segDropLocationsPickUpOnRowClickAction: function(){
    var selectedDropLocation = this.view.segDropLocationsPickUp.selectedRowItems;
    this.view.lblSelectPickup.text = selectedDropLocation[0].lblDropLocation;
    this.pickupaddressawa = selectedDropLocation[0].lblDropLocation;
    this.view.flxDropDownListPickUp.setVisibility(false);
    this.view.imgDropDownPickup.setVisibility(true);
    this.view.imgUpArrowPickUp.setVisibility(false);

    //  Prepare segment data properly
    if(this.view.lblSelectPickup.text === "Sharjah"){
      this.Selectedlat =  this.sharjahlat ;
      this.SelectedLon =  this.sharjahlon ; 
      this.pickupLon =  this.sharjahlat ;
      this.pickupLat =  this.sharjahlon ; 
    }
    else{
      this.Selectedlat =   this.Abudhabilat;
      this.SelectedLon = this.Abudhabilon;
      this.pickupLon =  this.Abudhabilat ;
      this.pickupLat =  this.Abudhabilon ; 
    }
    //     this.navToNextForm();
  },




  getLatLonFromAddress: function (addr) {
    if (!addr) return null;
    if (addr.results && addr.results.length > 0) {
      var loc = addr.results[0].geometry.location;
      return { lat: loc.lat, lon: loc.lng, formatted: addr.results[0].formatted_address };
    }
    if (addr.lat && addr.lng) {
      return { lat: addr.lat, lon: addr.lng, formatted: addr.formatted_address || "Location" };
    }
    return null;
  },




  storeRecentSearch: function (addressObj) {
    var key = "recentSearches";
    var maxItems = 5;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    if (typeof addressObj.lblPlace === "string") {
      addressObj.lblPlace = {
        text: addressObj.lblPlace,
        contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT
      };
    } else if (addressObj.lblPlace && typeof addressObj.lblPlace.text === "string") {
      contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT
    }
    if (typeof addressObj.lblCountry === "string") {
      addressObj.lblCountry = {
        text: addressObj.lblCountry,
        contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT
      };
    } else if (addressObj.lblCountry && typeof addressObj.lblCountry.text === "string") {
      contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT
    }
    var searches = voltmx.store.getItem(key) || [];
    searches = searches.filter(function (item) {
      return item.lblPlaceId !== addressObj.lblPlaceId;
    });
    searches.unshift(addressObj);
    if (searches.length > maxItems) {
      searches = searches.slice(0, maxItems);
    }
    voltmx.store.setItem(key, searches);
  },




  onPreShow: function () {
    this.tbxDropOffOnTextChangeAction();
    this.view.lblSelectPickup.text = "Select Pickup";
    this.view.tbxDropOff.text = "";
    this.getBranchLocations();
    this.view.flxDropDownList.setVisibility(false);
    this.view.imgUpArrow.setVisibility(false);
    this.view.imgDropDown.setVisibility(true);
    this.view.flxDropDownListPickUp.setVisibility(false);
    this.view.imgUpArrowPickUp.setVisibility(false);
    this.view.imgDropDownPickup.setVisibility(true);
    if(this.view.flxPickUpLocation.isVisible){
      this.view.flxDropOff.setVisibility(false);
       this.view.flxDropOffDropDown.setVisibility(true);
    }

    var seller_rsa = voltmx.store.getItem("seller_rsa");
    var mode = voltmx.store.getItem("mode") || "seller";

    if(seller_rsa === "sending to awa"){  //sending to awa-> pickup own, awa.

      this.view.flxPickUpLocation.setVisibility(true);
      this.view.flxSelectPickUp.setVisibility(false);
      this.view.flxDropOffDropDown.setVisibility(true);
      this.view.flxDropOff.setVisibility(false);
      this.view.flxSuggessions.setVisibility(false);

    }
    else if(seller_rsa === "receiving to awa" || mode === "buyer"){ //receiving to awa-> pickup awa, drop own.

      this.view.flxPickUpLocation.setVisibility(false);
      this.view.flxDropOffDropDown.setVisibility(false);
      this.view.flxDropOff.setVisibility(true);
      this.view.flxSelectPickUp.setVisibility(true);
      this.view.flxSuggessions.setVisibility(true);
      
      

    }
    var recent = voltmx.store.getItem("recentSearches") || [];
    if (recent && recent.length > 0) {
      var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      var normalized = recent.map(function (item) {
        return {
          lblPlace: (typeof item.lblPlace === "string") ? 
          { text: item.lblPlace,  contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT } 
          : item.lblPlace,
          lblCountry: (typeof item.lblCountry === "string") ? 
          { text: item.lblCountry,  contentAlignment: isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT :  constants.CONTENT_ALIGN_MIDDLE_RIGHT } 
          : item.lblCountry,
          lblPlaceId: item.lblPlaceId
        };
      });
      this.view.segLocationData.setData(normalized);
      this.view.flxSearchedLocations.setVisibility(true); 
    } else {
      this.view.segLocationData.setData([]);
    }
  },




  flxErrorBtnTryAgainOnClickAction: function() {
    if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
    } else {
      voltmx.print("Still offline...");
    }
  },




  tbxDropOffOnTextChangeAction: function () {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var input;
    //     if(this.view.flxSearch1.isVisible){
    //       if (this.view && this.view.tbxDropOff1&&this.view.tbxDropOff1.text) {
    //         input =this.view.tbxDropOff1.text.trim();
    //       }
    //       else {
    //         voltmx.print("tbxDropOff or its text is undefined");
    //         return;
    //       }
    //     }
    //     else{
    if (this.view && this.view.tbxDropOff && this.view.tbxDropOff.text) {
      input = this.view.tbxDropOff.text.trim();
    } else {
      voltmx.print("tbxDropOff or its text is undefined");
      return;
    }

    var self = this;

    if (input === "") {
      var recent = RecentSearchUtil.getRecentSearches();
      if (recent && recent.length > 0) {
        self.view.segLocationData.setData(recent);
        self.view.flxLocationData.setVisibility(true);
      } else {
        self.view.segLocationData.setData([]);
      }
      return;
    }
    var apiKey = "AIzaSyDmPDAkBx-0Gqu4t1fuGxatOoR2FV_AnE0";
    var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
        encodeURIComponent(input) + "&key=" + apiKey;

    var request = new voltmx.net.HttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");

    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          var locData = [];
          if (response.status === "OK" && response.predictions.length > 0) {
            response.predictions.forEach(function (res) {
              var description = res.description;
              var parts = description.split(",");
              var place = parts[0].trim();
              var country = parts[1] ? parts[1].trim() : "";

              locData.push({
                lblPlace: place,
                lblCountry: country,
                lblPlaceId: res.place_id,
                "flxDistanceAndPlace" :{
                  "reverseLayoutDirection": isArabic,
                  "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                },
                "flxPlace": {
                  "reverseLayoutDirection": isArabic,
                  "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                },
                "flxMapAndLocation": {
                  "reverseLayoutDirection": isArabic,
                  "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                },
                "flxLocationHeading": {
                  "reverseLayoutDirection": isArabic,
                  "layoutType": constants.FLEX_LAYOUT_TYPE_FLOW_HORIZONTAL,
                },
              });
            });
            self.view.segLocationData.setData(locData);
            self.view.flxSearchedLocations.setVisibility(true);
          } else {
            voltmx.application.dismissLoadingScreen();
            self.view.segLocationData.setData([]);
          }
        } else {
          voltmx.application.dismissLoadingScreen();
          voltmx.print("Places API failed: " + request.status);
          if (request.status === -1) {
            voltmx.print("Network error or request failed: " + request.status);
            self.view.flxError.setVisibility(true);
          }
          else if (request.status === 0) {
            if (!voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
              self.view.flxError.setVisibility(true);
            } else {
              alert("Unexpected failure (status 0) while online.");
            }
          } 
          else {
            alert("Server responded with error: " + request.status);
            if(request.status === 200){

            }
          }
        }
      } };
    request.send();
  },




  fetchLatLonForPlaceId :function(placeId, callback){
    var apiKey = "AIzaSyDmPDAkBx-0Gqu4t1fuGxatOoR2FV_AnE0"; 
    var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=" + apiKey;
    var httpRequest = new voltmx.net.HttpRequest();
    httpRequest.open(constants.HTTP_METHOD_GET, url);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onReadyStateChange = function () {
      if (httpRequest.readyState !== 4) {
        return; 
      }
      if(httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        if (response.status === "OK") {
          var location = response.result.geometry.location;
          var lat = location.lat;
          var lon = location.lng;
          if (callback) callback(location); 
          voltmx.print("Selected location coordinates: " + lat + ", " + lon);
          this.dropLat = lat;
          this.dropLon = lon;
        } else {
          voltmx.application.dismissLoadingScreen();
          voltmx.print("Place Details error: " + response.status);
        }
      }
      else{
        if (httpRequest.status === -1) {
          voltmx.print("Network error or request failed: " + httpRequest.status);
          self.view.flxError.setVisibility(true);
        }
        else{
          alert("Server responded with error: " + httpRequest.status);
        }
      }
    }.bind(this);
    httpRequest.send();
  },




  fetchLatLonPromise: function(placeId, context) {
    return new Promise(function (resolve, reject) {
      try {
        context.fetchLatLonForPlaceId(placeId, function (locationData) {
          if (locationData && typeof locationData.lat === "number" && typeof locationData.lng === "number") {
            resolve(locationData);
          } else {
            reject("Invalid lat/lng from API");
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },




  navToNextForm: function () {
    var self = this;
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
    if(self.view.segDropLocationsPickUp.selectedRowItems){
      if(self.view.segLocationData.selectedRowItems){
        var selected_address = self.view.segLocationData.selectedRowItems[0];

        var isDataPresent;
        if (!selected_address) {
          alert("Please select a location before continuing.");
          voltmx.application.dismissLoadingScreen();
          return;
        }
        else{
          isDataPresent = true;
        }
        if(selected_address.lblPlaceId){
          var placeId = selected_address.lblPlaceId;
        }


        this.fetchLatLonPromise(placeId, self)
          .then(function (locationData) {
          selected_address.lat = locationData.lat;
          selected_address.lng = locationData.lng;
          if (!self.address || !self.pickupLat || !self.pickupLon) {
            throw "Pickup location not available. Please go back and select again.";
          }
          else{
            isDataPresent = true;
          }
          if (!self.sellerOrBuyerLotId) {
            throw "Lot ID not available.";
          }
          else{
            isDataPresent = true;
          }
          self.storeRecentSearch(selected_address);
          voltmx.store.setItem("dropAddressData", selected_address);
          voltmx.store.setItem("selectedLat", selected_address.lat );
          voltmx.store.setItem("selectedLng", selected_address.lng);

          if(isDataPresent && selected_address){
            var navObj = new voltmx.mvc.Navigation("frmCarCollectionAddress3");
            voltmx.application.dismissLoadingScreen();
            navObj.navigate({
              dropAddress: selected_address,
              pickupAddress: {
                formatted_address: self.pickupaddressawa,
                lat: Number(self.pickupLat),
                lng: Number(self.pickupLon)
              },
              pickupLat: Number(self.pickupLat),
              pickupLon: Number(self.pickupLon),
              sellerOrBuyerLotId: self.sellerOrBuyerLotId
            });
          }
          else{
            alert("No data Selected");
          }
        })
          .catch(function (err) {
          voltmx.application.dismissLoadingScreen();
          voltmx.print("Navigation failed: " + err);
          alert(err);
        });
      }
    }
    else if(self.view.segDropLocations.selectedRowItems){
      selected_address = self.view.segDropLocations.selectedRowItems[0];
      if (!selected_address) {
        alert("Please select a location before continuing.");
        voltmx.application.dismissLoadingScreen();
        return;
      }
      selected_address.lat = self.Selectedlat || "";
      selected_address.lng = self.SelectedLon || "";
      voltmx.store.setItem("dropAddressData", selected_address);
      voltmx.store.setItem("selectedLat", selected_address.lat );
      voltmx.store.setItem("selectedLng", selected_address.lng);
      if(selected_address){
        var navObj = new voltmx.mvc.Navigation("frmCarCollectionAddress3");
        voltmx.application.dismissLoadingScreen();
        navObj.navigate({
          dropAddress: selected_address,
          pickupAddress: self.address,
          pickupLat: self.pickupLat,
          pickupLon: self.pickupLon,
          sellerOrBuyerLotId: self.sellerOrBuyerLotId
        });
      }
      else{
        alert("No data Selected");
      }
    }
    else if(self.view.segDropLocationsPickUp.selectedRowItems){
      selected_address = self.view.segDropLocationsPickUp.selectedRowItems[0];
      if (!selected_address) {
        alert("Please select a location before continuing.");
        voltmx.application.dismissLoadingScreen();
        return;
      }
      selected_address.lat = self.Selectedlat || "";
      selected_address.lng = self.SelectedLon || "";
      voltmx.store.setItem("dropAddressData", selected_address);
      voltmx.store.setItem("selectedLat", selected_address.lat );
      voltmx.store.setItem("selectedLng", selected_address.lng);
      if(selected_address){
        var navObj = new voltmx.mvc.Navigation("frmCarCollectionAddress3");
        voltmx.application.dismissLoadingScreen();
        navObj.navigate({
          dropAddress: selected_address,
          pickupAddress: self.address,
          pickupLat: self.pickupLat,
          pickupLon: self.pickupLon,
          sellerOrBuyerLotId: self.sellerOrBuyerLotId
        });
      }
      else{
        alert("No data Selected");
      }
    }
    else if(!self.view.flxPickUpLocation.isVisible){
      voltmx.application.dismissLoadingScreen();
      alert("Please select pickup");
    }
  },


});
