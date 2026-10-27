define({
  onNavigate: function () {
    var self = this;
    this.adjustRTL();
    // Initialize global variables
    this.selectedFilters = this.selectedFilters || {};
    this.currentCategory = this.currentCategory || "asset_definitions";

    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.view.flxCategories.onClick = this.onCategoryFlexClick.bind(this, "asset_definitions");
    this.view.flxBodyType.onClick = this.onCategoryFlexClick.bind(this, "body_type");
    this.view.flxYearRange.onClick = this.onCategoryFlexClick.bind(this, "year_make");
    this.view.flxFuelType.onClick = this.onCategoryFlexClick.bind(this, "fuel_type");
    this.view.flxTransmission.onClick = this.onCategoryFlexClick.bind(this, "transmission_type");
    this.view.flxType.onClick = this.onCategoryFlexClick.bind(this, "auction_types");
    //this.view.flxVehicleCondition.onClick = this.onCategoryFlexClick.bind(this, "body_condition");
    this.view.flxMileageRange.onClick = this.onCategoryFlexClick.bind(this, "mileage_filter");
    this.view.flxAuctionLocation.onClick = this.onCategoryFlexClick.bind(this, "branch");
//     this.view.flxPriceRange.onClick = this.onCategoryFlexClickSlider.bind(this, "price_range");
    this.view.flxPriceRange.onClick = this.setPriceRangeSlider.bind(this);
    this.view.flxBrand.onClick = this.callCategoriesMasterValues.bind(this);
    this.view.flxModel.onClick = this.callCategoriesMasterValuesForModel.bind(this, this.selectedBrandId);
    this.view.segSelectedFilterItems.onRowClick = this.onSegmentRowClick.bind(this);
    this.view.btnSaveSearch.onClick = this.openSaveSearchPopup.bind(this);
    this.view.flxClearAll.onClick = this.clearFilters.bind(this);
    this.view.btnApplyFilter.onClick = () => {
      
    var brand = voltmx.store.getItem("brandName");
  var model = voltmx.store.getItem("modelName");
  var fuel = voltmx.store.getItem("fuelTypeId");
  var transmission = voltmx.store.getItem("transmissionTypeId");
  var bodyType = voltmx.store.getItem("bodyTypeId");
  var location = voltmx.store.getItem("locationId");
  var price = voltmx.store.getItem("priceRangeName");
  var year = voltmx.store.getItem("yearMakeName");
  var mileage = voltmx.store.getItem("mileageId");

  // Check if ALL filters are empty
  if (
      (!brand || brand === "") &&
      (!model || model === "") &&
      (!fuel || fuel === "") &&
      (!transmission || transmission === "") &&
      (!bodyType || bodyType === "") &&
      (!location || location === 0) &&
      (!price || price === "") &&
      (!year || year === "") &&
      (!mileage || mileage === "")
  ) {
    alert("Select a filter to apply");
    return; // Stop navigation
  }
      
      new voltmx.mvc.Navigation("frmFilteredAuctions").navigate();
    };
    this.view.flxArow.onClick = () => {
   var backPage = voltmx.store.getItem("filtersBackPage");

if (backPage) {
    // If the stored page exists, navigate there
    new voltmx.mvc.Navigation(backPage).navigate();
} else {
    // Otherwise, navigate back to the previous form
    var prevForm = voltmx.application.getPreviousForm();
    if (prevForm) {
        new voltmx.mvc.Navigation(prevForm.id).navigate();
    } else {
        // Fallback: go to dashboard if no previous form exists
        new voltmx.mvc.Navigation("frmDashBoard").navigate();
    }
}

    };
  },

  onPreShow: function () {
    var self = this;
    self.searchId = "";
    this.selectedFilters = this.selectedFilters || {};
    this.currentCategory = "asset_definitions";
    // Safely show/hide containers and buttons
if (this.view.flxSegmentForSelectedFilter) {
    this.view.flxSegmentForSelectedFilter.setVisibility(true);
}

if (this.view.flxSelectedFiltersheading) {
    this.view.flxSelectedFiltersheading.setVisibility(false);
}

if (this.view.btnSaveSearch) {
    this.view.btnSaveSearch.setVisibility(true);
}

    if(this.view.Success){
      this.view.Success.setVisibility(false);
    }
    
    if(this.view.Success.btnCloseSuccess){
      this.view.Success.btnCloseSuccess.onClick = () =>{
        this.view.Success.setVisibility(false);
      }
    }

     if(this.view.SmthngWentWrong){
         this.view.SmthngWentWrong.setVisibility(false);
       }
    if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
if (this.view.btnDelete) {
    this.view.btnDelete.setVisibility(false);
    this.view.btnDelete.onClick = this.deleteSavedSearch.bind(this);
}

//     this.view.flxSliderSelection.setVisibility(false);
   
//     this.clearFilters();
    
    // Set visibility for all filter categories to false initially, except asset_definitions
    const categoryMap = {
      "asset_definitions": "flxCategories",
      "body_type": "flxBodyType",
      "brand": "flxBrand",
      "model": "flxModel",
      "year_make": "flxYearRange",
      "mileage_filter": "flxMileageRange",
      "fuel_type": "flxFuelType",
      "transmission_type": "flxTransmission",
     // "body_condition": "flxVehicleCondition",
      "auction_types": "flxType",
      "branch": "flxAuctionLocation",
      "price_range": "flxPriceRange"
    };
    for (var key in categoryMap) {
      this.view[categoryMap[key]].setVisibility(key === "asset_definitions");
    }
  
     this.invokeMasterFleetSpecValues();
    // Set asset_definitions as active and load its items
    this.setActiveFilterCategory("asset_definitions");
//     this.onCategoryFlexClick("asset_definitions");
  },

  onPostShow: function () {
    this.categoryToStorageKey = {
      "asset_definitions": { id: "assetId", name: "assetName" },
      "body_type": { id: "bodyTypeId", name: "bodyTypeName" },
      "brand": { id: "brandId", name: "brandName" },
      "model": { id: "modelId", name: "modelName" },
      "year_make": { id: "yearMakeId", name: "yearMakeName" },
      "mileage_filter": { id: "mileageId", name: "mileageName" },
      "fuel_type": { id: "fuelTypeId", name: "fuelTypeName" },
      "transmission_type": { id: "transmissionTypeId", name: "transmissionTypeName" },
      "auction_types": { id: "auctionTypeId", name: "auctionTypeName" },
      "body_condition": { id: "bodyConditionId", name: "bodyConditionName" },
      "branch": { id: "locationId", name: "locationName" },
      "price_range": { id: "priceRangeId", name: "priceRangeName" }
    };

    if (this.view.flxSaveSearchTitleCard.isVisible) {
      this.view.flxSaveSearchTitleCard.setVisibility(false);
    }
    if (this.view.flxOverLay.isVisible) {
      this.view.flxOverLay.setVisibility(false);
    }

    this.view.flxRemoveSaveSearchTitleCard.onClick = () => {
      this.view.flxSaveSearchTitleCard.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    };

    this.view.tbxSaveSearchTitle.onTextChange = () => {
      if (this.view.tbxSaveSearchTitle.text && this.view.tbxSaveSearchTitle.text.trim() === "") {
        this.view.flxEmptyBox.setVisibility(false);
        this.view.btnSaveButton.skin = "sknBtnececec8pxradius";
        this.view.btnSaveButton.setEnabled(false);

      } else {
        this.view.flxEmptyBox.setVisibility(true);
        this.view.btnSaveButton.skin = "sknBtnDubaid32437ffffff";
        this.view.btnSaveButton.setEnabled(true);
      }
    };

    this.view.flxEmptyBox.onClick = () => {
      this.view.flxEmptyBox.setVisibility(false);
      if (this.view.tbxSaveSearchTitle) {
        this.view.tbxSaveSearchTitle.text = "";
      }
    };

    this.view.btnSaveButton.onClick = this.callSaveSearchService.bind(this);
    this.view.flxSavedSearch.onClick = this.callGetSaveSearchService.bind(this);
  },

  clearFilters: function () {
    this.selectedFilters = {};
    this.currentCategory = "asset_definitions";
    this.view.flxSelectedFilterItems.removeAll();
    this.view.flxSelectedFiltersheading.setVisibility(false);
    for (var category in this.categoryToStorageKey) {
      var storageKeys = this.categoryToStorageKey[category];
      voltmx.store.removeItem(storageKeys.id);
      voltmx.store.removeItem(storageKeys.name);
    }
    voltmx.store.removeItem("selectedPriceRange");
    this.setActiveFilterCategory("asset_definitions");
    this.onCategoryFlexClick("asset_definitions");
  },

  callSaveSearchService: function () {
    if (this.view.tbxSaveSearchTitle && this.view.tbxSaveSearchTitle.text && this.view.tbxSaveSearchTitle.text.trim() !== "") {
      var self = this;
      voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
        shouldShowLabelInBottom: "true",
        separatorHeight: 45,
        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
        progressIndicatorColor: "Gray"
      });
      var name = self.view.tbxSaveSearchTitle.text.trim();

      function invokeSaveServiceCallBack(status, saved_search) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Saved search response: " + JSON.stringify(saved_search));
        if (saved_search && saved_search.message && saved_search.message.toLowerCase().includes("success") && saved_search.data && saved_search.data.id) {
//           alert("Saved Successfully");
          if(self.view.Success)
            {
              self.view.Success.setVisibility(true);
             self.view.Success.lblSuccessmsg.text = voltmx.i18n.getLocalizedString("Saved Successfully");
            }
        } else if (saved_search && saved_search.message) {
//           alert(saved_search.message);
          if(self.view.SmthngWentWrong)
            {
              self.view.SmthngWentWrong.setVisibility(true);
              self.view.SmthngWentWrong.lblSomethingWentWrong.text = saved_search.message;
            }
        }
        self.view.flxSaveSearchTitleCard.setVisibility(false);
        self.view.flxOverLay.setVisibility(false);
      }

      var saved_search_inputparam = {};
      var usertoken = voltmx.store.getItem("getUserAccesstoken");
      var filter_json = {};

      if (this.selectedFilters) {
        if (this.selectedFilters["asset_definitions"] && this.selectedFilters["asset_definitions"].length > 0) {
          filter_json["asset_id"] = {
            key: this.selectedFilters["asset_definitions"][0].id,
            value: this.selectedFilters["asset_definitions"][0].name
          };
        }
        if (this.selectedFilters["body_type"] && this.selectedFilters["body_type"].length > 0) {
          filter_json["body_type"] = {
            key: this.selectedFilters["body_type"][0].id,
            value: this.selectedFilters["body_type"][0].name
          };
        }
        if (this.selectedFilters["brand"] && this.selectedFilters["brand"].length > 0) {
          filter_json["brand"] = {
            key: this.selectedFilters["brand"][0].id,
            value: this.selectedFilters["brand"][0].name
          };
        }
        if (this.selectedFilters["model"] && this.selectedFilters["model"].length > 0) {
          filter_json["model"] = {
            key: this.selectedFilters["model"][0].id,
            value: this.selectedFilters["model"][0].name
          };
        }
        if (this.selectedFilters["year_make"] && this.selectedFilters["year_make"].length > 0) {
          filter_json["year_make"] = {
            key: this.selectedFilters["year_make"][0].id,
            value: this.selectedFilters["year_make"][0].name
          };
        }
        if (this.selectedFilters["mileage_filter"] && this.selectedFilters["mileage_filter"].length > 0) {
          filter_json["mileage"] = {
            key: this.selectedFilters["mileage_filter"][0].id,
            value: this.selectedFilters["mileage_filter"][0].name
          };
        }
        if (this.selectedFilters["fuel_type"] && this.selectedFilters["fuel_type"].length > 0) {
          filter_json["fuel_type"] = {
            key: this.selectedFilters["fuel_type"][0].id,
            value: this.selectedFilters["fuel_type"][0].name
          };
        }
        if (this.selectedFilters["transmission_type"] && this.selectedFilters["transmission_type"].length > 0) {
          filter_json["transmission_type"] = {
            key: this.selectedFilters["transmission_type"][0].id,
            value: this.selectedFilters["transmission_type"][0].name
          };
        }
        if (this.selectedFilters["body_condition"] && this.selectedFilters["body_condition"].length > 0) {
          filter_json["body_condition"] = {
            key: this.selectedFilters["body_condition"][0].id,
            value: this.selectedFilters["body_condition"][0].name
          };
        }
        if (this.selectedFilters["branch"] && this.selectedFilters["branch"].length > 0) {
          filter_json["yard_branch"] = {
            key: this.selectedFilters["branch"][0].id,
            value: this.selectedFilters["branch"][0].name
          };
        }
        if (this.selectedFilters["price_range"] && this.selectedFilters["price_range"].length > 0) {
          var storedRange = voltmx.store.getItem("selectedPriceRange");
          if (storedRange) {
            if (storedRange.min !== undefined) {
              filter_json["price_range_from"] = storedRange.min.toString();
            }
            if (storedRange.max !== undefined) {
              filter_json["price_range_to"] = storedRange.max.toString();
            }
          }
        }
      }

      saved_search_inputparam["serviceID"] = "ms_common$saved-search";
      saved_search_inputparam["category"] = "fleet";
      saved_search_inputparam["filter_json"] = filter_json;
      saved_search_inputparam["name"] = name;
      saved_search_inputparam["status"] = "Active";
      var saved_search_httpheaders = {
        "user_token": usertoken
      };
      saved_search_inputparam["httpheaders"] = saved_search_httpheaders;
      var saved_search_httpconfigs = {};
      saved_search_inputparam["httpconfig"] = saved_search_httpconfigs;
      mfintegrationsecureinvokerasync(saved_search_inputparam, "ms_common", "saved-search", invokeSaveServiceCallBack);
    } 
//       else {
//       alert("Please enter a Title");
//     }
  },

  callGetSaveSearchService: function () {
    this.searchId = "";
     var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin)
    {
    this.view.flxSavedSearch.skin = "sknFlxfce3e1";
    this.view.flxActive1.setVisibility(true);
    this.view.lblSavedSearch.skin = "sknLblDubaid3243716pxbold";
    this.view.btnDelete.setVisibility(true);
    this.view.btnSaveSearch.setVisibility(false);
     this.view.flxSelectedFiltersheading.setVisibility(false);
    this.view.flxSelectedFilterItems.removeAll();
    
    const categoryMap = {
      "body_type": "flxBodyType",
      "brand": "flxBrand",
      "model": "flxModel",
      "transmission_type": "flxTransmission",
      "fuel_type": "flxFuelType",
      "year_make": "flxYearRange",
      "mileage_filter": "flxMileageRange",
      "auction_types": "flxType",
     // "body_condition": "flxVehicleCondition",
      "branch": "flxAuctionLocation",
      "price_range": "flxPriceRange"
    };
    for (var key in categoryMap) {
      this.view[categoryMap[key]].setVisibility(false);
    }

    this.view.flxCategories.skin = "sknFlxBasic";
    this.view.lblCategories.skin = "sknLblDubai231f2016pxBold";
    this.view.flxActive2.setVisibility(false);

    this.view.segSelectedFilterItems.setVisibility(false);
    this.view.flxSavedSearchItems.setVisibility(true);
    var self = this;
    self.view.flxSavedSearchItems.removeAll();

    function INVOKE_SERVICE_c934aac6a0df49b1afa2a003c3dba2ee_Callback(status, saved_search_list) {
      voltmx.print("Saved search list: " + JSON.stringify(saved_search_list));
      if (saved_search_list.records && saved_search_list.records.length > 0) {
        self.createSavedSearchItems(saved_search_list, self.view);
      }
    }

    var saved_search_list_inputparam = {};
    var userid = voltmx.store.getItem("userId");
    saved_search_list_inputparam["serviceID"] = "fry_int_common$saved-search-list";
    saved_search_list_inputparam["user_id"] = userid;
    var saved_search_list_httpheaders = {};
    saved_search_list_inputparam["httpheaders"] = saved_search_list_httpheaders;
    var saved_search_list_httpconfigs = {};
    saved_search_list_inputparam["httpconfig"] = saved_search_list_httpconfigs;
    mfintegrationsecureinvokerasync(saved_search_list_inputparam, "fry_int_common", "saved-search-list", INVOKE_SERVICE_c934aac6a0df49b1afa2a003c3dba2ee_Callback);
  }
    else{
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
  },

  openSaveSearchPopup: function () {
      var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin)
    {
      if(JSON.stringify(this.selectedFilters) !== "{}")
      {
      this.view.flxEmptyBox.setVisibility(false);
    if (this.view.tbxSaveSearchTitle) {
      this.view.tbxSaveSearchTitle.text = "";
    }
    this.view.flxSaveSearchTitleCard.setVisibility(true);
    this.view.btnSaveButton.setEnabled(false);
    this.view.btnSaveButton.skin = "sknBtnececec8pxradius";
    this.view.flxOverLay.setVisibility(true);
    }
      else
        {
          alert('Select a filter to save');
        }
  }
     else{
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
  },

  invokeMasterFleetSpecValues: function () {
    var self = this;

    function invCallBack(status, response) {
      voltmx.print("Master fleet spec response: " + JSON.stringify(response));
      self.masterDataResult = response;
      
       const mileageOptions = [
    { id: "10000", value: "10,000 kms or Less" },
    { id: "30000", value: "30,000 kms or Less" },
    { id: "50000", value: "50,000 kms or Less" },
    { id: "75000", value: "75,000 kms or Less" },
    { id: "100000", value: "100,000 kms or Less" },
    { id: "125000", value: "125,000 kms or Less" },
    { id: "150000", value: "150,000 kms or Less" }
  ];

  if (
    self.masterDataResult &&
    self.masterDataResult.data &&
    self.masterDataResult.data[0]
  ) {
    self.masterDataResult.data[0].mileage_filter = mileageOptions;
  }
       self.clearFilters();
      
    }

    let params = {
      serviceID: "fry_int_fleet$master-fleet-spec-values",
      spec_list: "tags;year_make;mileage_type;ownership;location;body_type;doors;no_of_cylinders;color;transmission_type;horsepower;fuel_type;keys;branch;body_condition;mileage_filter",
      widget_name: "fleet_specs_details",
      asset_definitions: "true",
      auction_types: "true",
      httpheaders: {},
      httpconfig: {}
    };

    mfintegrationsecureinvokerasync(params, "fry_int_fleet", "master-fleet-spec-values", invCallBack);
  },


  callCategoriesMasterValues: function () {
    var self = this;
    self.removeDeeperSelectedFilters("brand");
    self.currentCategory = "brand";
    self.setActiveFilterCategory("brand");
    var asset_name = "fleet";
    var category_id = 1;

    var inputParams = {
        serviceID: "fry_int_fleet$asset-categories-master-values",
        category_id: category_id,
        asset_name: asset_name,
        httpheaders: {},
        httpconfig: {}
    };

    mfintegrationsecureinvokerasync(inputParams, "fry_int_fleet", "asset-categories-master-values", function (status, response) {
        voltmx.print("Brand API response: " + JSON.stringify(response));
        if (!response || !response.records) {
            voltmx.print("No brand data received.");
            return;
        }

        // Determine container width
        var containerWidth = 0;
        if (self.view.flxSegmentForSelectedFilter && self.view.flxSegmentForSelectedFilter.frame) {
            containerWidth = self.view.flxSegmentForSelectedFilter.frame.width || self.view.frame.width;
        }

        // Map records with dynamic width
        var brandList = response.records.map(function (item) {
            var labelText = String(item.cat_name || "");
            var avgCharWidth = 10;   // approximate width per character
            var basePadding = 20;    // left + right padding
            var rawWidth = (labelText.length * avgCharWidth) + basePadding;

            var maxWidth = containerWidth - 20; // avoid overflow
            var minWidth = 60;                  // minimum width

            var chipWidth = Math.max(Math.min(rawWidth, maxWidth), minWidth);

            return {
                lblFilterItem: {
                    text: labelText,
                    left: "10dp",
                    right: "10dp",
                    maxNumberOfLines: 1,
                    textTruncatePosition: constants.TEXT_TRUNCATE_END
                },
                tagId: item.cat_id,
                isBrand: true,
                flxItem: {
                    width: chipWidth + "dp"
                }
            };
        });

        self.view.flxSegmentForSelectedFilter.setVisibility(true);
        self.view.segSelectedFilterItems.widgetDataMap = {
            lblFilterItem: "lblFilterItem",
            flxItem: "flxItem"
        };
        self.view.segSelectedFilterItems.setData(brandList);
        voltmx.print("Brand segment updated with dynamic widths.");
    });
},


  callCategoriesMasterValuesForModel: function (brandId) {
    var self = this;
    self.removeDeeperSelectedFilters("model");
    self.currentCategory = "model";
    self.setActiveFilterCategory("model");
    var asset_name = "fleet";

    var inputParams = {
        serviceID: "fry_int_fleet$asset-categories-master-values",
        category_id: brandId,
        asset_name: asset_name,
        httpheaders: {},
        httpconfig: {}
    };

    mfintegrationsecureinvokerasync(inputParams, "fry_int_fleet", "asset-categories-master-values", function (status, response) {
        voltmx.print("Model API response: " + JSON.stringify(response));
        if (!response || !response.records) {
            voltmx.print("No model data received for brand ID: " + brandId);
            return;
        }

        // Determine container width
        var containerWidth = 0;
        if (self.view.flxSegmentForSelectedFilter && self.view.flxSegmentForSelectedFilter.frame) {
            containerWidth = self.view.flxSegmentForSelectedFilter.frame.width || self.view.frame.width;
        }

        // Map records with dynamic width
        var modelList = response.records.map(function (item) {
            var labelText = String(item.cat_name || "");
            var avgCharWidth = 10;   // approximate width per character
            var basePadding = 20;    // left + right padding
            var rawWidth = (labelText.length * avgCharWidth) + basePadding;

            var maxWidth = containerWidth - 20; // avoid overflow
            var minWidth = 60;                  // minimum width

            var chipWidth = Math.max(Math.min(rawWidth, maxWidth), minWidth);

            return {
                lblFilterItem: {
                    text: labelText,
                    left: "10dp",
                    right: "10dp",
                    maxNumberOfLines: 1,
                    textTruncatePosition: constants.TEXT_TRUNCATE_END
                },
                tagId: item.cat_id,
                flxItem: {
                    width: chipWidth + "dp"
                }
            };
        });

        self.view.flxSegmentForSelectedFilter.setVisibility(true);
        self.view.segSelectedFilterItems.widgetDataMap = {
            lblFilterItem: "lblFilterItem",
            flxItem: "flxItem"
        };
        self.view.segSelectedFilterItems.setData(modelList);
        voltmx.print("Model segment updated with dynamic widths for brand ID: " + brandId);
    });
},
  
  onCategoryFlexClick: function (category) {
  var self = this;

  self.view.flxSegmentForSelectedFilter.setVisibility(true);
  self.view.flxSlidercontainer.setVisibility(false);
  // self.view.flxSliderSelection.setVisibility(false);

  self.removeDeeperSelectedFilters(category);

  if (category === "asset_definitions") {
    this.view.btnDelete.setVisibility(false);
    this.view.btnSaveSearch.setVisibility(true);
    self.view.flxSelectedFilterItems.removeAll();
    self.view.segSelectedFilterItems.setVisibility(true);
    self.view.flxSavedSearchItems.setVisibility(false);
    this.view.flxCategories.skin = "sknFlxfce3e1";
    this.view.lblCategories.skin = "sknLblDubaid3243716pxbold";
    this.view.flxActive2.setVisibility(true);
    this.view.flxSavedSearch.skin = "sknFlxBasic";
    this.view.flxActive1.setVisibility(false);
    this.view.lblSavedSearch.skin = "sknLblDubai231f2016pxBold";
  }

  self.currentCategory = category;
  self.setActiveFilterCategory(category);

  var dataList =
    self.masterDataResult &&
    self.masterDataResult.data &&
    self.masterDataResult.data[0] &&
    self.masterDataResult.data[0][category];

  if (!dataList || !Array.isArray(dataList)) {
    voltmx.print("No data found for category: " + category);
    return;
  }

  self.view.forceLayout();

  var containerWidth = 0;
  if (self.view.flxSelectedFilterItems && self.view.flxSelectedFilterItems.frame) {
    containerWidth = self.view.flxSelectedFilterItems.frame.width || self.view.frame.width;
  }

  var segData = dataList.map(function (item) {
    var labelText = String(item.value || "");

    var avgCharWidth = 10;  // estimated character width
    var basePadding = 20;   // left + right padding
    var rawWidth = (labelText.length * avgCharWidth) + basePadding;

    var maxWidth = containerWidth * 0.8; // prevent overflow
    var minWidth = 60;                  // minimum chip width
    var chipWidth = Math.max(Math.min(rawWidth, maxWidth), minWidth);
    var flxHeight = rawWidth > chipWidth ? "50dp" : "35dp";

    return {
      lblFilterItem: {
        text: labelText,
        left: "10dp",
        right: "10dp",
        top: "1dp",
      bottom: "1dp",
        width: chipWidth + "dp",
        height: "preferred",
        maxNumberOfLines: 0,
        textTruncatePosition: constants.TEXT_TRUNCATE_NONE
      },
      flxFilterItems: {
//   width: chipWidth + "dp",
  height: flxHeight,
  autogrowMode: voltmx.flex.AUTOGROW_NONE,
  top: "1dp",
  bottom: "1dp"
},
      tagId: item.id,
      flxItem: {
        width: chipWidth + "dp",
        height: "preferred",
        autogrowMode: voltmx.flex.AUTOGROW_HEIGHT,
        top: "1dp",
      bottom: "1dp"
      }
    };
  });

  self.view.segSelectedFilterItems.widgetDataMap = {
    flxItem: "flxItem",
    lblFilterItem: "lblFilterItem"
  };

  self.view.segSelectedFilterItems.setData(segData);
  voltmx.print("Segment updated for category: " + category);
},

// onCategoryFlexClick: function (category) {
//     var self = this;
//     self.view.flxSegmentForSelectedFilter.setVisibility(true);
//     self.view.flxSlidercontainer.setVisibility(false);
// //     self.view.flxSliderSelection.setVisibility(false);
//     self.removeDeeperSelectedFilters(category);

//     if (category === "asset_definitions") {
//       this.view.btnDelete.setVisibility(false);
//     this.view.btnSaveSearch.setVisibility(true);
//       self.view.flxSelectedFilterItems.removeAll();
//       self.view.segSelectedFilterItems.setVisibility(true);
//       self.view.flxSavedSearchItems.setVisibility(false);
//       this.view.flxCategories.skin = "sknFlxfce3e1";
//       this.view.lblCategories.skin = "sknLblDubaid3243716pxbold";
//       this.view.flxActive2.setVisibility(true);
//       this.view.flxSavedSearch.skin = "sknFlxBasic";
//       this.view.flxActive1.setVisibility(false);
//       this.view.lblSavedSearch.skin = "sknLblDubai231f2016pxBold";
//     }

//     self.currentCategory = category;
//     self.setActiveFilterCategory(category);

//     var dataList = self.masterDataResult && self.masterDataResult.data && self.masterDataResult.data[0] && self.masterDataResult.data[0][category];

//     if (!dataList || !Array.isArray(dataList)) {
//       voltmx.print("No data found for category: " + category);
//       return;
//     }
// self.view.forceLayout();
//     var containerWidth = 0;
// if (self.view.flxSelectedFilterItems && self.view.flxSelectedFilterItems.frame) {
//   containerWidth = self.view.flxSelectedFilterItems.frame.width || self.view.frame.width;
// }
//     var segData = dataList.map(function (item) {
      
//        var labelText = String(item.value || "");
  
// var avgCharWidth = 10;   // a bit more generous
// var basePadding = 20;    // left + right padding
// var rawWidth = (labelText.length * avgCharWidth) + basePadding;

// var maxWidth = containerWidth - 20; // don’t overflow container
// var minWidth = 60;                  // safeguard for very short text

// var chipWidth = Math.max(Math.min(rawWidth, maxWidth), minWidth);

      
//       return {
//         lblFilterItem: {
//       text: labelText,
//       left: "10dp",   // padding left
//       right: "10dp",
//       maxNumberOfLines: 1,
//       textTruncatePosition: constants.TEXT_TRUNCATE_END
//         },
//         tagId: item.id,
//         flxItem: {
//       width: chipWidth + "dp" 
//     }
//       };
//     });

//     self.view.segSelectedFilterItems.widgetDataMap = {
//       flxItem: "flxItem",
//       lblFilterItem: "lblFilterItem"
//     };
//     self.view.segSelectedFilterItems.setData(segData);
//     voltmx.print("Segment updated for category: " + category);
//   },


//   onCategoryFlexClickSlider: function (category) {
//     var self = this;
//     self.removeDeeperSelectedFilters(category);
//     self.currentCategory = category;
//     self.view.flxSegmentForSelectedFilter.setVisibility(false);
// //     self.view.flxSliderSelection.setVisibility(true);
// //     self.view.flxSliderSelection.removeAll();

//     var minPrice = 0;
//     var maxPrice = 50000;
//     var step = 5000;
//     var trackTop = 40;
//     var trackBottom = 40;

//     var lblMaxPrice = new kony.ui.Label({
//       id: "lblMaxPrice",
//       text: "Maximum Price",
//       top: "0dp",
//       left: "50dp",
//       skin: "sknLblDubai231f2014px"
//     }, {}, {});

//     var lblMinPrice = new kony.ui.Label({
//       id: "lblMinPrice",
//       text: "Minimum Price",
//       bottom: "0dp",
//       left: "50dp",
//       skin: "sknLblDubai231f2014px"
//     }, {}, {});

//     var flxTrack = new kony.ui.FlexContainer({
//       id: "flxTrack",
//       top: trackTop + "dp",
//       bottom: trackBottom + "dp",
//       left: "100dp",
//       width: "5dp",
//       skin: "sknFlxfce3e1",
//       layoutType: kony.flex.FREE_FORM
//     }, {}, {});

//     var flxThumb = new kony.ui.FlexContainer({
//       id: "flxThumb",
//       width: "20dp",
//       height: "20dp",
//       skin: "sknFlxd32437bgcustom120pxround",
//       centerX: "50%",
//       centerY: "80%",
//       onTouchMove: moveThumb,
//       layoutType: kony.flex.FREE_FORM
//     }, {}, {});

//     var lblPriceTag = new kony.ui.Label({
//       id: "lblPriceTag",
//       text: "10000",
//       centerY: "80%",
//       left: "130dp",
//       skin: "sknLblDubai231f2014px"
//     }, {}, {});

//     self.view.flxSliderSelection.add(lblMaxPrice, lblMinPrice, flxTrack, flxThumb, lblPriceTag);
//     self.view.forceLayout();

//     function moveThumb(widgetRef, touchData) {
//       var trackY = self.view.flxSliderSelection.flxTrack.frame.y;
//       var trackHeight = self.view.flxSliderSelection.flxTrack.frame.height;

//       var absoluteY = widgetRef.frame.y + touchData.y;
//       var newY = absoluteY - trackY;

//       if (newY < 0) newY = 0;
//       if (newY > trackHeight) newY = trackHeight;

//       var thumbTop = trackY + newY - (flxThumb.frame.height / 2);
//       flxThumb.top = thumbTop + "dp";
//       lblPriceTag.top = thumbTop + "dp";

//       var relativePos = newY / trackHeight;
//       var valueRange = maxPrice - minPrice;
//       var value = maxPrice - (relativePos * valueRange);

//       var snappedValue = Math.round(value / step) * step;
//       if (snappedValue < minPrice) snappedValue = minPrice;
//       if (snappedValue > maxPrice) snappedValue = maxPrice;

//       lblPriceTag.text = snappedValue.toString();

//       var storedRange = voltmx.store.getItem("selectedPriceRange") || {};
//       storedRange.min = minPrice;
//       storedRange.max = snappedValue;
//       voltmx.store.setItem("selectedPriceRange", storedRange);

//       self.addToSelectedFilters("price_range", "price_" + snappedValue, "Price: " + snappedValue);
//       self.addSelectedFilterChip("price_range", "price_" + snappedValue, "Price: " + snappedValue);
//       self.view.forceLayout();
//     }
//   },

  onSegmentRowClick: function () {
    var self = this;
    var selectedRow = self.view && self.view.segSelectedFilterItems && self.view.segSelectedFilterItems.selectedRowItems && self.view.segSelectedFilterItems.selectedRowItems[0];

    if (!selectedRow) {
      voltmx.print("No item selected in segment.");
      return;
    }

    var name = selectedRow.lblFilterItem.text;
    var id = selectedRow.tagId;
    self.view.segSelectedFilterItems.setData([]);

//     const categoryTransitions = {
//       "asset_definitions": { next: "body_type", condition: name === "Fleet", setVisibility: true },
//       "body_type": { next: "brand", action: () => self.callCategoriesMasterValues() },
//       "brand": { next: "model", action: () => { self.selectedBrandId = id; self.callCategoriesMasterValuesForModel(id); } },
//       "model": { next: "year_make" },
//       "year_make": { next: "mileage_filter" },
//       "mileage_filter": { next: "fuel_type" },
//       "fuel_type": { next: "transmission_type" },
//       "transmission_type": { next: "body_condition" },
//       "body_condition": { next: "branch" },
//       "auction_types": { next: "branch" },
//       "branch": { next: "price_range", action: () => self.setPriceRangeSlider() }
//     };
    
      const categoryTransitions = {
      "asset_definitions": { next: "brand", condition: name === "Fleet", setVisibility: true,  action: () => self.callCategoriesMasterValues() },
      "body_type": { next: "mileage_filter" },
      "brand": { next: "model", action: () => { self.selectedBrandId = id; self.callCategoriesMasterValuesForModel(id); } },
      "model": { next: "year_make" },
      "year_make": { next: "body_type" },
      "mileage_filter": { next: "fuel_type" },
      "fuel_type": { next: "transmission_type" },
      //"transmission_type": { next: "body_condition" },
          "transmission_type": { next: "branch" },
      //"body_condition": { next: "branch" },
      "auction_types": { next: "branch" },
      "branch": { next: "price_range", action: () => self.setPriceRangeSlider() }
    };

    if (categoryTransitions[self.currentCategory]) {
      var transition = categoryTransitions[self.currentCategory];
      if (self.currentCategory === "asset_definitions" && !transition.condition) {
//         self.view.SmthngWentWrong.setVisibility(true);
//         self.view.SmthngWentWrong.lblSomethingWentWrong.text = "No records found";
        new voltmx.mvc.Navigation("frmCominSoon").navigate();
        return;
      }

      var storageKeys = self.categoryToStorageKey[self.currentCategory];
      voltmx.store.setItem(storageKeys.id, id);
      voltmx.store.setItem(storageKeys.name, name);
      self.addSelectedFilterChip(self.currentCategory, id, name);
      self.addToSelectedFilters(self.currentCategory, id, name);

      if (self.currentCategory === "asset_definitions" && transition.condition) {
        self.view.flxSelectedFiltersheading.setVisibility(true);
        const categoryMap = {
          "body_type": "flxBodyType",
          "brand": "flxBrand",
          "model": "flxModel",
          "transmission_type": "flxTransmission",
          "fuel_type": "flxFuelType",
          "year_make": "flxYearRange",
          "mileage_filter": "flxMileageRange",
         // "body_condition": "flxVehicleCondition",
          "branch": "flxAuctionLocation",
          "price_range": "flxPriceRange"
        };
        for (var key in categoryMap) {
          self.view[categoryMap[key]].setVisibility(true);
        }
      }

      if (transition.action) {
        transition.action();
      } else {
        self.onCategoryFlexClick(transition.next);
      }
    }
  },

  addToSelectedFilters: function (category, id, name) {
    if (!this.selectedFilters) this.selectedFilters = {};
    if (!this.selectedFilters[category]) this.selectedFilters[category] = [];
    this.selectedFilters[category] = [{ id: id, name: name }];
  },

  setActiveFilterCategory: function(activeCategory) {
    var self = this;

    const categoryMap = {
      "asset_definitions": { flx: "flxCategories", lbl: "lblCategories", active: "flxActive2" },
      "body_type": { flx: "flxBodyType", lbl: "lblBodyType", active: "flxActive4" },
      "brand": { flx: "flxBrand", lbl: "lblBrand", active: "flxActive5" },
      "model": { flx: "flxModel", lbl: "lblModel", active: "flxActive6" },
      "year_make": { flx: "flxYearRange", lbl: "lblYearRange", active: "flxActive7" },
      "mileage_filter": { flx: "flxMileageRange", lbl: "lblMileageRange", active: "flxActive8" },
      "fuel_type": { flx: "flxFuelType", lbl: "lblFuelType", active: "flxActive9" },
      "transmission_type": { flx: "flxTransmission", lbl: "lblTransmission", active: "flxActive10" },
      //"body_condition": { flx: "flxVehicleCondition", lbl: "lblVehicleCondition", active: "flxActive12" },
      "branch": { flx: "flxAuctionLocation", lbl: "lblAuctionLocation", active: "flxActive13" },
      "price_range": { flx: "flxPriceRange", lbl: "lblPriceRange", active: "flxActive14" }
    };

    for (var key in categoryMap) {
      var flxId = categoryMap[key].flx;
      var lblId = categoryMap[key].lbl;
      var activeId = categoryMap[key].active;
      if (key === activeCategory && self.view[flxId].isVisible) {
        self.view[flxId].skin = "sknFlxfce3e1";
        self.view[lblId].skin = "sknLblDubaid3243716pxbold";
        self.view[activeId].setVisibility(true);
      } else {
        self.view[flxId].skin = "sknFlxBasic";
        self.view[lblId].skin = "sknLblDubai231f2016pxBold";
        self.view[activeId].setVisibility(false);
      }
    }
  },
  
 
//   working one commented on oct16
addSelectedFilterChip: function(category, id, labelText) {
  var self = this;
  var chipId = "flx_" + category + "_" + id;

  // Remove if chip already exists
  if (self.view.flxSelectedFilterItems[chipId]) {
    self.view.flxSelectedFilterItems.remove(self.view.flxSelectedFilterItems[chipId]);
  }

  // Estimate width based on text length (adjust multiplier for your font)
  var avgCharWidth = 8;
  var rawWidth = (labelText.length * avgCharWidth) + 40; // label + cross + padding
  this.view.forceLayout();
  var containerWidth = 0;
if (self.view.flxSelectedFilterItems && self.view.flxSelectedFilterItems.frame) {
    containerWidth = self.view.flxSelectedFilterItems.frame.width;
}
  var maxWidth = containerWidth - 20; // prevent chip from going out of screen
  var chipWidth = Math.min(rawWidth, maxWidth);

  // --- Create chip container ---
  var flx = new voltmx.ui.FlexContainer({
    id: chipId,
    autogrowMode: voltmx.flex.AUTOGROW_NONE,
    clipBounds: true,
    height: "32dp",
    width: chipWidth + "dp",
    isVisible: true,
    layoutType: voltmx.flex.FREE_FORM,
    left: "4dp", // will be positioned in reflow
    top: "0dp",
    skin: "sknFlxfce3e1bordere73183",
    onClick: function () {
      self.removeSelectedFilterChip(category, id);
    }
  }, { paddingInPixel: false }, {});
  flx.setDefaultUnit(voltmx.flex.DP);

  // Cross icon
  var img = new voltmx.ui.Image2({
    id: "img_" + category + "_" + id,
    isVisible: true,
    left: "5dp",
    skin: "slImage",
    src: "crossred2x.png",
    centerY: "50%",
    height: "25%",
    width: "20dp",
    zIndex: 1
  }, {
    imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
  }, {});

  // Label
  var lbl = new voltmx.ui.Label({
    id: "lbl_" + category + "_" + id,
    text: labelText,
    skin: "sknLblDubaid3243716pxbold",
    centerY: "50%",
    left: "30dp",
    right: "5dp", 
    width: voltmx.flex.USE_PREFERRED_SIZE,
     height: "100%",                      // match parent height
  maxNumberOfLines: 1,                 // single line
  textTruncatePosition: constants.TEXT_TRUNCATE_END
  }, {
    contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT
  }, {});

  // Add children
  flx.add(img, lbl);
  self.view.flxSelectedFilterItems.add(flx);

  // Show header and reflow
  self.view.flxSelectedFiltersheading.setVisibility(true);
  self.reflowSelectedChips();
  self.view.forceLayout();
},

  
  
  removeSelectedFilterChip: function (category, id) {
    var self = this;
    var chipId = "flx_" + category + "_" + id;

    if (self.view.flxSelectedFilterItems[chipId]) {
      self.view.flxSelectedFilterItems.remove(self.view.flxSelectedFilterItems[chipId]);
    }

    if (self.selectedFilters && self.selectedFilters[category]) {
      self.selectedFilters[category] = self.selectedFilters[category].filter(function (item) {
        return item.id !== id;
      });

      if (self.selectedFilters[category].length === 0) {
        delete self.selectedFilters[category];
        var storageKeys = self.categoryToStorageKey[category];
        if (storageKeys) {
          voltmx.store.removeItem(storageKeys.id);
          voltmx.store.removeItem(storageKeys.name);
        }
      }
    }

    self.removeDeeperSelectedFilters(category);

    var hierarchy = ["asset_definitions",  "brand", "model", "year_make","body_type", "mileage_filter", "fuel_type", "transmission_type", "body_condition", "auction_types", "branch", "price_range"];
    var lastSelectedCategory = "asset_definitions";

    for (var i = hierarchy.length - 1; i >= 0; i--) {
      var cat = hierarchy[i];
      if (self.selectedFilters && self.selectedFilters[cat] && self.selectedFilters[cat].length > 0) {
        lastSelectedCategory = cat;
        break;
      }
    }

    self.currentCategory = lastSelectedCategory;
    self.setActiveFilterCategory(lastSelectedCategory);
    self.onCategoryFlexClick(lastSelectedCategory);

    if (!self.selectedFilters || Object.keys(self.selectedFilters).length === 0) {
      self.view.flxSelectedFiltersheading.setVisibility(false);
      self.currentCategory = "asset_definitions";
      self.setActiveFilterCategory("asset_definitions");
      self.onCategoryFlexClick("asset_definitions");
    }
    self.reflowSelectedChips();
  },

  removeDeeperSelectedFilters: function (category) {
    var self = this;
    var hierarchy = ["asset_definitions",  "brand", "model", "year_make","body_type", "mileage_filter", "fuel_type", "transmission_type", "body_condition", "auction_types", "branch", "price_range"];
    var currentIndex = hierarchy.indexOf(category);

    if (currentIndex === -1) return;

    for (var i = currentIndex + 1; i < hierarchy.length; i++) {
      var deeperCategory = hierarchy[i];
      if (self.selectedFilters && self.selectedFilters[deeperCategory]) {
        self.selectedFilters[deeperCategory].forEach(function (item) {
          var chipId = "flx_" + deeperCategory + "_" + item.id;
          if (self.view.flxSelectedFilterItems[chipId]) {
            self.view.flxSelectedFilterItems.remove(self.view.flxSelectedFilterItems[chipId]);
          }
        });
        delete self.selectedFilters[deeperCategory];
        var storageKeys = self.categoryToStorageKey[deeperCategory];
        if (storageKeys) {
          voltmx.store.removeItem(storageKeys.id);
          voltmx.store.removeItem(storageKeys.name);
        }
      }
    }
    self.reflowSelectedChips();
  },

  //for filling spaces
//   reflowSelectedChips: function () {
//   var self = this;
//   var containerWidth = self.view.flxSelectedFilterItems.frame.width;
//   var leftPadding = 10;
//   var rightPadding = 10;
//   var currentX = leftPadding;
//   var currentY = 0;
//   var rowHeight = 45; // chip height + gap

//   var children = self.view.flxSelectedFilterItems.widgets();

//   children.forEach(function (chip) {
//     var chipWidth = chip.frame.width;

//     // Wrap to next line if needed
//     if ((currentX + chipWidth) > (containerWidth - rightPadding)) {
//       currentX = leftPadding;
//       currentY += rowHeight;
//     }

//     chip.left = currentX + "dp";
//     chip.top = currentY + "dp";

//     currentX += chipWidth + 10; // 10dp gap
//   });

//   self.view.forceLayout();
// },

  
  //by dinesh commented for sravan ios
// reflowSelectedChips: function () {
//   var self = this;
//   var containerWidth = self.view.flxSelectedFilterItems.frame.width;
//   var leftPadding = 10;
//   var rightPadding = 10;
//   var currentX = leftPadding;
//   var currentY = 0;
//   var rowHeight = 45; // chip height + margin
//   var chipsInRow = 0;
//   var maxPerRow = 2; // enforce only 2 per row

//   var children = self.view.flxSelectedFilterItems.widgets();

//   children.forEach(function (chip) {
//     var chipWidth = chip.frame.width;

//     // Wrap if row is full OR chip won't fit
//     if (chipsInRow >= maxPerRow || (currentX + chipWidth) > (containerWidth - rightPadding)) {
//       currentX = leftPadding;
//       currentY += rowHeight;
//       chipsInRow = 0;
//     }

//     chip.left = currentX + "dp";
//     chip.top = currentY + "dp";

//     currentX += chipWidth + 10; // gap
//     chipsInRow++;
//   });

//   self.view.forceLayout();
// },

reflowSelectedChips: function() {
    var self = this;
 
    // Make sure layout is resolved before measuring frames
    self.view.forceLayout();
 
    var containerWidth = self.view.flxSelectedFilterItems.frame.width;
    var leftPadding = 10;
    var rightPadding = 10;
    var currentX = leftPadding;
    var currentY = 0;
    var rowHeight = 45; // chip height + margin
    var chipsInRow = 0;
    var maxPerRow = 2; // enforce only 2 per row
 
    var children = self.view.flxSelectedFilterItems.widgets();
 
    children.forEach(function(chip, idx) {
        if (!chip) {
            voltmx.print("⚠️ Skipping null chip at index " + idx);
            return;
        }
 
        // Safely get chip width (frame or fallback)
        var chipWidth = 0;
        if (chip.frame && chip.frame.width) {
            chipWidth = chip.frame.width;
        } else if (chip.preferredWidth) {
            chipWidth = chip.preferredWidth;
        } else {
            chipWidth = 100; // fallback default
            voltmx.print("⚠️ Using fallback width for chip at index " + idx);
        }
 
        // Wrap if row is full OR chip won't fit
        if (chipsInRow >= maxPerRow || (currentX + chipWidth) > (containerWidth - rightPadding)) {
            currentX = leftPadding;
            currentY += rowHeight;
            chipsInRow = 0;
        }
 
        chip.left = currentX + "dp";
        chip.top = currentY + "dp";
 
        currentX += chipWidth + 10; // gap
        chipsInRow++;
    });
 
    // Apply layout updates
    self.view.forceLayout();
},
  
  createSavedSearchItems: function (saved_search_list, view) {
    var self = this;
    self.searchId = null;
    voltmx.print("Starting createSavedSearchItems with " + (saved_search_list.records ? saved_search_list.records.length : 0) + " records");
    if (!saved_search_list.records || !Array.isArray(saved_search_list.records)) {
        voltmx.print("Error: saved_search_list.records is invalid or empty");
        return;
    }

    view.flxSavedSearchItems.removeAll();
   
    view.flxSlidercontainer.setVisibility(false);
    view.flxSavedSearchItems.layoutType = voltmx.flex.FLOW_VERTICAL;
//     view.flxSavedSearchItems.autogrowMode = voltmx.flex.AUTOGROW_HEIGHT;
    view.flxSavedSearchItems.enableScrolling = true;
    view.flxSavedSearchItems.scrollDirection = voltmx.flex.SCROLL_VERTICAL;

    saved_search_list.records.forEach((record, index) => {
        try {
            voltmx.print("Processing record: id=" + record.id + ", name=" + record.name);

            var flxSavedItem = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
                "clipBounds": true,
                "id": `flxSavedItem_${record.id}`,
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_VERTICAL,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "slFbox",
                "top": index === 0 ? "0dp" : "5dp",
                "width": "100%",
                "zIndex": index + 1,
                "appName": "AlwataneyaAuction"
            }, { "paddingInPixel": false }, {});
            flxSavedItem.setDefaultUnit(voltmx.flex.DP);

            var flxSavedItemHead = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "32dp",
                "id": `flxSavedItemHead_${record.id}`,
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0",
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "0",
                "width": "100%",
                "appName": "AlwataneyaAuction"
            }, { "paddingInPixel": false }, {});
            flxSavedItemHead.setDefaultUnit(voltmx.flex.DP);

            var flxRadioItem = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "32dp",
                "id": `flxRadioItem_${record.id}`,
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "5%",
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "0",
                "width": "14%",
                "appName": "AlwataneyaAuction"
            }, { "paddingInPixel": false }, {});
            flxRadioItem.setDefaultUnit(voltmx.flex.DP);

            var imgRadioOn = new voltmx.ui.Image2({
                "centerX": "50%",
                "centerY": "50%",
                "height": "60%",
                "id": `imgRadioOn_${record.id}`,
                "isVisible": false,
                "left": "0",
                "skin": "slImage",
                "src": "radioonnew.png",
                "top": "0",
                "width": "60%"
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});

            var imgRadioOff = new voltmx.ui.Image2({
                "centerX": "50%",
                "centerY": "50%",
                "height": "60%",
                "id": `imgRadioOff_${record.id}`,
                "isVisible": true,
                "left": "0",
                "skin": "slImage",
                "src": "radiooffnew.png",
                "top": "0",
                "width": "60%"
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});

          flxRadioItem.onClick = function () {
    try {
        voltmx.print("Radio clicked for record id=" + record.id);

        // Reset all radios to OFF
        saved_search_list.records.forEach((otherRecord) => {
            var otherRadioOn = view[`imgRadioOn_${otherRecord.id}`];
            var otherRadioOff = view[`imgRadioOff_${otherRecord.id}`];
            if (otherRadioOn && otherRadioOff) {
                otherRadioOn.isVisible = false;
                otherRadioOff.isVisible = true;
            }
        });

        // Turn ON the clicked radio
        imgRadioOn.isVisible = true;
        imgRadioOff.isVisible = false;

        // Assign selected searchId
        self.searchId = record.id;
        self.selectedFlexId = `flxSavedItem_${record.id}`;
        voltmx.print("Selected searchId=" + self.searchId);

        // Clear previous filters
        [
            "bodyTypeId","bodyTypeName","brandId","brandName",
            "modelId","modelName","yearMakeId","yearMakeName",
            "mileageId","mileageName","fuelTypeId","fuelTypeName",
            "transmissionTypeId","transmissionTypeName",
            "bodyConditionId","bodyConditionName",
            "yardBranchId","yardBranchName",
            "priceRangeFrom","priceRangeTo",
            "selectedSavedSearchId","selectedSavedSearchCategory"
        ].forEach(k => voltmx.store.removeItem(k));

        // Capture filter_json data and store individually
        var filterJson = JSON.parse(record.filter_json || "{}");
      voltmx.store.setItem("filter_json_" + record.id, JSON.stringify(filterJson));
        for (var key in filterJson) {
            if (key !== "asset_id") {
                var filterData = typeof filterJson[key] === "object" && filterJson[key] !== null && filterJson[key].value !== null
                    ? { key: filterJson[key].key, value: filterJson[key].value }
                    : { key: null, value: filterJson[key] };

                if (filterData.value && filterData.value !== "$value" && filterData.value !== null) {
                    var storeKeyId = mapCategoryToStoreKeyId(key);
                    var storeKeyName = mapCategoryToStoreKeyName(key);
                    if (storeKeyId && storeKeyName) {
                        voltmx.store.setItem(storeKeyId, filterData.key || filterData.value);
                        voltmx.store.setItem(storeKeyName, filterData.value);
                        voltmx.print("Stored " + storeKeyId + "=" + (filterData.key || filterData.value) + ", " + storeKeyName + "=" + filterData.value);
                    }
                }
            }
        }

        // Store saved search ID and category
        voltmx.store.setItem("selectedSavedSearchId", record.id);
        voltmx.store.setItem("selectedSavedSearchCategory", record.category || "");
        voltmx.print("Stored selectedSavedSearchId=" + record.id + ", selectedSavedSearchCategory=" + (record.category || ""));

        // Navigate if needed
        // var nav = new voltmx.mvc.Navigation("frmFilteredAuctions");
        // nav.navigate();

    } catch (e) {
        voltmx.print("Error in onClick for id=" + record.id + ": " + e.message);
    }
};

            function mapCategoryToStoreKeyId(category) {
                var mapping = {
                    "body_type": "bodyTypeId",
                    "brand": "brandId",
                    "model": "modelId",
                    "year_make": "yearMakeId",
                    "mileage": "mileageId",
                    "fuel_type": "fuelTypeId",
                    "transmission_type": "transmissionTypeId",
                    "body_condition": "bodyConditionId",
                    "yard_branch": "yardBranchId",
                    "price_range_from": "priceRangeFrom",
                    "price_range_to": "priceRangeTo"
                };
                return mapping[category] || null;
            }

            function mapCategoryToStoreKeyName(category) {
                var mapping = {
                    "body_type": "bodyTypeName",
                    "brand": "brandName",
                    "model": "modelName",
                    "year_make": "yearMakeName",
                    "mileage": "mileageName",
                    "fuel_type": "fuelTypeName",
                    "transmission_type": "transmissionTypeName",
                    "body_condition": "bodyConditionName",
                    "yard_branch": "yardBranchName",
                    "price_range_from": "priceRangeFrom",
                    "price_range_to": "priceRangeTo"
                };
                return mapping[category] || null;
            }

            flxRadioItem.add(imgRadioOn, imgRadioOff);

            var lblName = new voltmx.ui.Label({
                "height": "32dp",
                "id": `lblName_${record.id}`,
                "isVisible": true,
                "left": "20%",
                "skin": "sknLblDubai231f2020pxmedium",
                "text": record.name || "Unnamed",
                "textStyle": { "letterSpacing": 0, "strikeThrough": false },
                "top": "0",
                "width": voltmx.flex.USE_PREFERRED_SIZE
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, { "textCopyable": false });

            flxSavedItemHead.add(flxRadioItem, lblName);
            flxSavedItem.add(flxSavedItemHead);

            var filterJson;
            try {
                filterJson = JSON.parse(record.filter_json);
                voltmx.print("Parsed filter_json for id=" + record.id + ": " + JSON.stringify(filterJson));
            } catch (e) {
                voltmx.print("Error parsing filter_json for id=" + record.id + ": " + e.message);
                filterJson = {};
            }

            var filterIndex = 0;
            for (var key in filterJson) {
                var self = this;
                try {
                    if (key !== "asset_id") {
                        var value = typeof filterJson[key] === "object" && filterJson[key] !== null && filterJson[key].value !== null ? filterJson[key].value : filterJson[key];
                        if (value && value !== "$value" && value !== null) {
                          var labelText = value.toString();
                            var flxSavedItemCategories = new voltmx.ui.FlexContainer({
                                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                                "clipBounds": true,
                                "height": "30dp",
                                "id": `flxSavedItemCategories_${record.id}_${filterIndex}`,
                                "isVisible": true,
                                "layoutType": voltmx.flex.FLOW_HORIZONTAL,
                                "left": "18%",
                                "isModalContainer": false,
                                "skin": "sknflxCustomRoundedCCCCCC",
                                "top": filterIndex === 0 ? "0dp" : "10dp",
//                                 "width": "55%",
                              "width": ((labelText.length * 8) + 40) + "dp", 
                                "onClick": self.turnFlxToChip.bind(self),
                                "appName": "AlwataneyaAuction",
                               
                            }, { "paddingInPixel": false }, {});
                          flxSavedItemCategories.savedSearchId = record.id;
flxSavedItemCategories.savedSearchCategory = record.category || "";
flxSavedItemCategories.savedSearchName = record.name || "Unnamed";
                            flxSavedItemCategories.setDefaultUnit(voltmx.flex.DP);

                            var label = new voltmx.ui.Label({
                                "centerY": "50%",
                                "id": `lblCategory_${record.id}_${filterIndex}`,
                                "isVisible": true,
                                "left": "20dp",
                                "skin": "sknLblDubai231f2016pxRegular",
                                "text": value.toString(),
                                "textStyle": { "letterSpacing": 0, "strikeThrough": false },
                                "width": voltmx.flex.USE_PREFERRED_SIZE
                            }, {
                                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                                "padding": [0, 0, 0, 0],
                                "paddingInPixel": false
                            }, { "textCopyable": false });

                            flxSavedItemCategories.add(label);
                            flxSavedItem.add(flxSavedItemCategories);
                            filterIndex++;
                            voltmx.print("Added filter chip: " + key + "=" + value + " for id=" + record.id);
                        }
                    }
                } catch (e) {
                    voltmx.print("Error processing filter key=" + key + " for id=" + record.id + ": " + e.message);
                    continue;
                }
            }

            view.flxSavedSearchItems.add(flxSavedItem);
            view.forceLayout();
            voltmx.print("Added flxSavedItem for id=" + record.id);
        } catch (e) {
            voltmx.print("Error processing record id=" + record.id + ": " + e.message);
        }
    });

    view.forceLayout();
    voltmx.print("Finished createSavedSearchItems");
},

  //new one added for updating the saved search
  turnFlxToChip: function(widget, context) {
    var self = this;
    try {
        voltmx.print("turnFlxToChip called for widgetId=" + widget.id);

        widget.skin = "sknFlxfce3e1bordere73183";

        var children = widget.widgets();
        var lbl = children.find(w => w.id.indexOf("lblCategory_") === 0);

        widget.removeAll();

      var flxClose = new voltmx.ui.FlexContainer({
            id: "flxClose_" + widget.id,
            height: "20dp",
            width: "20dp",
            left: "8dp",
            centerY: "50%",
            clipBounds: true,
            isVisible: true,
            layoutType: voltmx.flex.FREE_FORM,
            onClick: function() {
                voltmx.print("Chip close clicked for " + widget.id);
                self.updateSavedSearchAfterChipRemove(widget, lbl ? lbl.text : null);
            }
        }, {}, {});
        flxClose.setDefaultUnit(voltmx.flex.DP);
       
        var imgClose = new voltmx.ui.Image2({
            id: "imgClose_" + widget.id,
            src: "crossred2x.png",
            height: "10dp",
            width: "10dp",
            centerX: "50%",
            centerY: "50%",
            isVisible: true,
            skin: "slImage"
        }, {
            imageScaleMode: constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            padding: [0, 0, 0, 0],
            paddingInPixel: false
        }, {});
      
        flxClose.add(imgClose);
        widget.add(flxClose);

        if (lbl) {
            lbl.left = "8dp";
            lbl.width = voltmx.flex.USE_PREFERRED_SIZE;
            widget.add(lbl);
        }

        if (lbl && lbl.text) {
            var chars = lbl.text.length;
            var totalWidth = (chars * 8) + 40;
            widget.width = totalWidth + "dp";
        }

        self.view.forceLayout();
    } catch (e) {
        voltmx.print("Error in turnFlxToChip: " + e.message);
    }
},

updateSavedSearchAfterChipRemove: function(widget, removedValue) {
    var self = this;
    try {
        voltmx.print("updateSavedSearchAfterChipRemove called for widgetId=" + widget.id + " removedValue=" + removedValue);

        widget.removeFromParent();
        self.view.forceLayout();
        var token = voltmx.store.getItem("getUserAccesstoken");
        var savedSearchId = voltmx.store.getItem("selectedSavedSearchId");
        var savedSearchCategory = voltmx.store.getItem("selectedSavedSearchCategory");
        var name = voltmx.store.getItem("selectedSavedSearchName") || "Unnamed";
      
        var savedSearchId = widget.savedSearchId;
           
        var savedSearchCategory =  widget.savedSearchCategory || "";
           
        var name =  widget.savedSearchName || "Unnamed";
        
        if (!savedSearchId) {
            voltmx.print("No savedSearchId found in storage");
            return;
        }

        var currentFilters = {};
        try {
            currentFilters = JSON.parse(voltmx.store.getItem("filter_json_" + savedSearchId) || "{}");
        } catch (e) {
            currentFilters = {};
        }

        for (var key in currentFilters) {
            var val = (typeof currentFilters[key] === "object" ? currentFilters[key].value : currentFilters[key]);
            if (val === removedValue) {
                delete currentFilters[key];
                voltmx.print("Removed filter key=" + key + " val=" + val);
            }
        }

        if (Object.keys(currentFilters).length === 0) {
            voltmx.print("All filters removed. Deleting saved search id=" + savedSearchId);

            var delete_inputparam = {
                "serviceID": "ms_common$delete-saved-search",
                "httpheaders": { "user_token": token },
                "id": savedSearchId
            };

            mfintegrationsecureinvokerasync(delete_inputparam, "ms_common", "delete-saved-search",
                function(status, response) {
                    voltmx.print("Delete saved search response: " + JSON.stringify(response));
                });
            return;
        }

        var update_inputparam = {
            "serviceID": "ms_common$update-saved-search",
            "httpheaders": { "user_token": token },
            "id": savedSearchId,
            "category": savedSearchCategory,
            "name": name,
            "status": "Active",
            "filter_json": JSON.stringify(currentFilters)
        };

        mfintegrationsecureinvokerasync(update_inputparam, "ms_common", "update-saved-search",
            function(status, response) {
                voltmx.print("Update saved search response: " + JSON.stringify(response));
                voltmx.store.setItem("filter_json_" + savedSearchId, JSON.stringify(currentFilters));
            });

    } catch (e) {
        voltmx.print("Error in updateSavedSearchAfterChipRemove: " + e.message);
    }
},

  

  
  setPriceRangeSlider: function() {
    try {
      
//       var transform = voltmx.ui.makeAffineTransform();
//     // Rotate by 90 degrees
//     transform.rotate(90);
      
//       var transform1 = voltmx.ui.makeAffineTransform();
//     // Rotate by 90 degrees
//     transform1.rotate(270);

//     // Apply the transform to the flex container
//     this.view.flxSliderSelection1.transform = transform;
//       this.view.flxSliderValue.transform = transform1;
      this.view.flxSlidercontainer.setVisibility(true);
    this.setActiveFilterCategory("price_range");
   this.view.lblSliderValue.text = 100;
   this.view.lblSliderValue.left = "0%";
      this.view.flxSliderSelection1.setVisibility(true);
    this.view.flxSegmentForSelectedFilter.setVisibility(false);
      
        this.view.sliderPriceRange.min = 100;
        this.view.sliderPriceRange.max = 335000;
        this.view.sliderPriceRange.step = undefined;

        // Skins for the left and right parts of the slider
        this.view.sliderPriceRange.leftSkin = "slSliderea4235opa100left";
        this.view.sliderPriceRange.rightSkin = "slSliderea4235opa30right";

        // Skins for min and max labels
        this.view.sliderPriceRange.minLabelSkin = "sknslLbld32437dubai";
        this.view.sliderPriceRange.maxLabelSkin = "sknslLbld32437dubai";

        // Show labels
        this.view.sliderPriceRange.showMinValue = true;
        this.view.sliderPriceRange.showMaxValue = true;

        // Thumb skin (sliderthumbpoint5.png must be in resources)
        this.view.sliderPriceRange.thumbImage = "sliderthumbpoint5.png";
        // Slightly larger thumb size so it appears outside
        this.view.sliderPriceRange.thumbHeight = 60; // default ~20
        this.view.sliderPriceRange.thumbWidth = 60;
        

        // Bind events
        this.view.sliderPriceRange.onSlide = this.onSliderSlide.bind(this);
        this.view.sliderPriceRange.onSelection = this.onSliderSelection.bind(this);

    } catch (err) {
        voltmx.print("Error in initSlider: " + err);
    }
},

onSliderSlide: function(eventObj) {
    try {
        
        var selectedValue = eventObj.selectedValue;
         voltmx.store.setItem("priceRangeName",selectedValue);
        voltmx.print("Sliding... Selected value: " + selectedValue);
         this.view.lblSliderValue.text = String(selectedValue);
// this.view.flxSliderValue.left = ((Number(selectedValue) / 50000) * 100) + "%";
      var percent = (Number(selectedValue) / 335000) * 100;

// Clamp to a minimum of 10% and maximum of 90%
if (percent < 10) {
    percent = 10;
} else if (percent > 80) {
    percent = 80;
}

this.view.flxSliderValue.left = percent + "%";
    } catch (err) {
        voltmx.print("Error in onSliderSlide: " + err);
    }
},

onSliderSelection: function(eventObj) {
    try {
        var response = { selectedValue: eventObj.selectedValue }; // Simulating JSON object
//         alert("Selected Value: " + response.selectedValue);
      voltmx.store.setItem("priceRangeName",response.selectedValue);
        this.view.lblSliderValue.text = String(response.selectedValue);
//       this.view.flxSliderValue.left = ((Number(response.selectedValue) / 50000) * 100) + "%";
      var percent = (Number(response.selectedValue) / 335000) * 100;

// Clamp to a minimum of 10% and maximum of 90%
if (percent < 10) {
    percent = 10;
} else if (percent > 80) {
    percent = 80;
}

this.view.flxSliderValue.left = percent + "%";

    } catch (err) {
        voltmx.print("Error in onSliderSelection: " + err);
    }
},
  
  deleteSavedSearch: function()
  {
      var self = this;
 if (self.searchId && self.searchId !== ""){
    function INVOKE_SERVICE_f3f658d753824fc4baf0b09906d374ab_Callback(status, delete_saved_search) {
      voltmx.print(delete_saved_search);
        if (
        delete_saved_search &&
        delete_saved_search.opstatus === 0 &&
        delete_saved_search.httpStatusCode === 200
    ) {
        var flexId = self.selectedFlexId;  // the one stored earlier
        if (flexId && self.view[flexId]) {
            self.view.flxSavedSearchItems.remove(self.view[flexId]);
            self.view.forceLayout();
            self.searchId = "";
            voltmx.print("Removed flex: " + flexId);
        } else {
            voltmx.print("Flex not found for deletion: " + flexId);
        }
    } else {
        voltmx.print("Failed to delete saved search.");
    }
    }
    if (delete_saved_search_inputparam == undefined) {
        var delete_saved_search_inputparam = {};
    }
    delete_saved_search_inputparam["serviceID"] = "ms_common$delete-saved-search";
    delete_saved_search_inputparam["serach_id"] = self.searchId;
    var delete_saved_search_httpheaders = {
      "user_token": voltmx.store.getItem("getUserAccesstoken")
    };
    delete_saved_search_inputparam["httpheaders"] = delete_saved_search_httpheaders;
    var delete_saved_search_httpconfigs = {};
    delete_saved_search_inputparam["httpconfig"] = delete_saved_search_httpconfigs;
    ms_common$delete_saved_search = mfintegrationsecureinvokerasync(delete_saved_search_inputparam, "ms_common", "delete-saved-search", INVOKE_SERVICE_f3f658d753824fc4baf0b09906d374ab_Callback);
  }
  
  else
  {
  alert('Select any saved search');
}
},
  
  adjustRTL: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxClearAll.reverseLayoutDirection = isArabic;
    this.view.flxArow.reverseLayoutDirection = isArabic;
    this.view.flxScrollBody.reverseLayoutDirection = isArabic;
    if(isArabic)
      {
//         this.view.flxCategoriesLeft.right = "0dp";
//         this.view.flxCategoriesLeft.left = null;
        
//          this.view.flxItemsRight.left = "35dp";
//         this.view.flxItemsRight.right = null;
        
        this.view.flxArow.left = null;
        this.view.flxArow.right = "4%";
        
        this.view.flxClearAll.left = "3dp";
        this.view.flxClearAll.right = null;
        
            var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
        this.view.lblPleaseEnter.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      }
    else
      {
//         this.view.flxCategoriesLeft.right = "0dp";
//         this.view.flxCategoriesLeft.left = null;
        
//         this.view.flxItemsRight.left = "35dp";
//         this.view.flxItemsRight.right = null;
        
        this.view.flxArow.left = "4%";
        this.view.flxArow.right = null;
        
        this.view.flxClearAll.left = null;
        this.view.flxClearAll.right = "3dp";
        
        this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
         this.view.lblPleaseEnter.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      }
    this.view.lblSelect.text = voltmx.i18n.getLocalizedString("Select");
    this.view.btnSaveSearch.text = voltmx.i18n.getLocalizedString("Save");
    this.view.lblSelectedFilters.text = voltmx.i18n.getLocalizedString("Selected Filters");
    this.view.lblPriceRangee.text = voltmx.i18n.getLocalizedString("Price Range");
    this.view.lblMinimumPrice.text = voltmx.i18n.getLocalizedString("Min Price");
    this.view.lblMaximimPrice.text = voltmx.i18n.getLocalizedString("Max Price");
    this.view.btnSaveButton.text = voltmx.i18n.getLocalizedString("Save");
      this.view.Label0b6d03cd7d6bc48.text = voltmx.i18n.getLocalizedString("Save Search");
       this.view.lblPleaseEnter.text = voltmx.i18n.getLocalizedString("Please enter a title to save your search");
    this.view.btnDelete.text = voltmx.i18n.getLocalizedString("Delete");
    this.view.lblFilter.text = voltmx.i18n.getLocalizedString("Filter");
    this.view.lblClearAll.text = voltmx.i18n.getLocalizedString("Clear All");
    this.view.lblSavedSearch.text = voltmx.i18n.getLocalizedString("Saved Search");
    this.view.lblCategories.text = voltmx.i18n.getLocalizedString("Categories"); 
    this.view.lblBrand.text = voltmx.i18n.getLocalizedString("Brand"); 
    this.view.lblModel.text = voltmx.i18n.getLocalizedString("Model");
    this.view.lblYearRange.text = voltmx.i18n.getLocalizedString("Year Range");
    this.view.lblBodyType.text = voltmx.i18n.getLocalizedString("Body Type");
    this.view.lblMileageRange.text = voltmx.i18n.getLocalizedString("Mileage Range");
    this.view.lblFuelType.text = voltmx.i18n.getLocalizedString("fuel type");
    this.view.lblTransmission.text = voltmx.i18n.getLocalizedString("Transmission");
   // this.view.lblVehicleCondition.text = voltmx.i18n.getLocalizedString("Vehicle Condition");
    this.view.lblAuctionLocation.text = voltmx.i18n.getLocalizedString("Auction Location");
    this.view.lblPriceRange.text = voltmx.i18n.getLocalizedString("Price Range");
    this.view.btnApplyFilter.text = voltmx.i18n.getLocalizedString("apply");
    this.view.Success.btnCloseSuccess.text = voltmx.i18n.getLocalizedString("closeCaps");
  }
  
});