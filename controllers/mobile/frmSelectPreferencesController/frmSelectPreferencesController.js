define({ 

  onNavigate: function() {
    this.view.btnSubmit.onClick = this.submit1 ;
    this.view.preShow =this.onPreShow;
    this.view.btnBidNow.onClick = this.btnBidNowOnClick;
    this.view.segData.onRowClick=this.checkOnclick.bind(this);
    this.view.flxClose.onClick = this.popupClose.bind(this);
  },




  onPreShow: function(){
    this.invokeService();
    var previousForm = voltmx.application.getPreviousForm();
    if (previousForm) {
      var id = previousForm.id;
      var formsToDestroy = ["frmRegister2"];
      if (formsToDestroy.includes(id)) {
        voltmx.application.destroyForm(id);
      }
    }
  },




  popupClose: function() {
    this.view.flxThankYouHappyBidPopup.setVisibility(false);
  },




  btnBidNowOnClick: function(){
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },



  checkOnclick: function() {
    var selectedRow = this.view.segData.selectedRowItems;
    if (!selectedRow || selectedRow.length === 0) {
      voltmx.print("No row is selected");
      return;
    }
    var rowData = selectedRow[0];
    var rowIndex = this.view.segData.selectedRowIndex[1];
    rowData.imgCheck.isVisible = !rowData.imgCheck.isVisible;
    this.view.segData.setDataAt(rowData, rowIndex);
  },




  invokeService: function () {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
    function INVOKE_SERVICE_f34951ddcd6e49d4941f797019e5b991_Callback(status, master_fleet_spec_values) {
      var tagsArray = master_fleet_spec_values.data[0].tags;
      var segmentData = [];
      for (var i = 0; i < tagsArray.length; i++) {
        var data = {
          "imgCheck": {
            "isVisible": false,
            "src"      : "checkedcheck.png"
          },
          "flxCheckBox": {
            "skin"     : "sknFlxFFFFFFBorderCCCCCC2px",
          },
          "lblPreferences": {
            "text": tagsArray[i].value,
            "skin": "sknlbl767676Dubai20px45"
          },
        };
        segmentData.push(data);
      }
      voltmx.application.dismissLoadingScreen();
      self.view.segData.setData(segmentData);
    }
    var spec = "tags";
    var widname = "fleet_specs_details";
    var assdef = "true";
    var auctiotype = "true";
    if (typeof master_fleet_spec_values_inputparam === "undefined") {
      var master_fleet_spec_values_inputparam = {};
    }
    master_fleet_spec_values_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    master_fleet_spec_values_inputparam["auction_types"] = auctiotype;
    master_fleet_spec_values_inputparam["asset_definitions"] = assdef;
    master_fleet_spec_values_inputparam["widget_name"] = widname;
    master_fleet_spec_values_inputparam["spec_list"] = spec;
    master_fleet_spec_values_inputparam["httpheaders"] = {};
    master_fleet_spec_values_inputparam["httpconfig"] = {};
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(
      master_fleet_spec_values_inputparam,
      "fry_int_fleet",
      "master-fleet-spec-values",
      INVOKE_SERVICE_f34951ddcd6e49d4941f797019e5b991_Callback
    );
  },




  submit: function () {
    voltmx.application.showLoadingScreen(null, "Loading..",   
                                         constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                         false,
                                         true, 
                                         {shouldShowLabelInBottom: "true", 
                                          separatorHeight: 45,      
                                          progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,    
                                          progressIndicatorColor: "Gray"     });
    var self = this;
    var selectedRows = [];
    var data = self.view.segData.data;

    data.forEach(function(res) {
      if (res.imgCheck && res.imgCheck.isVisible) {
        selectedRows.push(res.lblPreferences.text);
      }
    });
    var add_user_preference_inputparam = add_user_preference_inputparam || {};
    add_user_preference_inputparam["serviceID"] = "ms_user_reg$add-user-preference";
    add_user_preference_inputparam["key"] = "user_presets";
    add_user_preference_inputparam["value"] = selectedRows;

    var add_user_preference_httpheaders = {};
    add_user_preference_inputparam["httpheaders"] = add_user_preference_httpheaders;

    var add_user_preference_httpconfigs = {};
    add_user_preference_inputparam["httpconfig"] = add_user_preference_httpconfigs;

    ms_user_reg$add_user_preference = mfintegrationsecureinvokerasync(
      add_user_preference_inputparam,
      "ms_user_reg",
      "add-user-preference",
      function(status, res) {
        voltmx.print("Status: " + status);
        voltmx.print("Response: " + JSON.stringify(res));
        if (res && res.rawResponse && res.rawResponse.message === "User presets saved successfully.") {
          voltmx.application.dismissLoadingScreen();
          self.view.flxPreferencesError.setVisibility(false);
          self.view.flxThankYouHappyBidPopup.setVisibility(true);
        } else {
          voltmx.application.dismissLoadingScreen();
          self.view.flxPreferencesError.setVisibility(true);
        }
      });
  },
  
  submit1: function()
{
  var self = this;
  self.view.flxPreferencesError.setVisibility(false);
  self.view.flxThankYouHappyBidPopup.setVisibility(true);
}




});