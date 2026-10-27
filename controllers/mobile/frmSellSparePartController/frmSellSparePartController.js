define({ 

 onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBranchDownArrow.onClick = this.BranchDownArrow;
    this.view.flxBranchUparrow.onClick = this.BranchUpArrow;
       this.view.flxYearOfMakeDownArrow.onClick = this.YearOfMakeDownArrowAction;
    this.view.flxYearOfMakeUpArrow.onClick = this.YearOfMakeUpArrowAction;
    this.view.btnSubmit.onClick = this.onSubmit.bind(this);
        this.view.segYearOfMake.onRowClick = this.segYearOfMakeonRowClickAction;
    this.view.SegBranches.onRowClick = this.BranchesonRowClickAction;
  },
  
  onPreShow: function()
  {
    this.getBranches();
    this.toggleFooterIcons();
    this.getYearOfMake();
  },
  
  
  getBranches: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "branch";
    FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
//             alert("Json REesponse for keys:"+JSON.stringify(response));
//       var year_of_make_id = response.data[0].fuel_type[0].id;

      var branch_array = [];

      var branchData = response.data[0].branch;

      branchData.forEach(res=>{
        branch_array.push({
          "lblBranchName"  : res.value,
          "lblBranchId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.SegBranches.setData(branch_array);
       self.branch_array = branch_array;
      voltmx.store.setItem("branchArray", branch_array);

    });
  },
  
    BranchesonRowClickAction: function(){

var self = this;
var selectedBranch = this.view.SegBranches.selectedRowItems;

if (selectedBranch && selectedBranch.length > 0) {
    self.view.tbxBranchName.text = selectedBranch[0].lblBranchName;
    self.branchId = selectedBranch[0].lblBranchId;
    self.branchValue = selectedBranch[0].lblBranchName;
    self.view.flxBranchDropdown.setVisibility(false);
  self.view.flxBranchUparrow.setVisibility(false);
    self.view.flxBranchDownArrow.setVisibility(true);
  self.view.lblBrancherror.setVisibility(false);
}

//     voltmx.store.setItem("BranchesSelected", selectedBranch[0].lblBranchName);
  },
  
   BranchDownArrow: function(){
    this.view.flxBranchDownArrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(true);
    this.view.flxBranchUparrow.setVisibility(true);
  },
  BranchUpArrow: function(){
    this.view.flxBranchUparrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(false);
    this.view.flxBranchDownArrow.setVisibility(true);
  },
  
  YearOfMakeDownArrowAction: function(){
    this.view.flxYearOfMakeDownArrow.setVisibility(false);
    this.view.flxYearMakeDropDownList.setVisibility(true);
    this.view.flxYearOfMakeUpArrow.setVisibility(true);
  },
  
   YearOfMakeUpArrowAction: function(){
    this.view.flxYearOfMakeUpArrow.setVisibility(false);
    this.view.flxYearMakeDropDownList.setVisibility(false);
    this.view.flxYearOfMakeDownArrow.setVisibility(true);
  },
  
  toggleFooterIcons: function()
  {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);
 
    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
 
    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
 
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
  
  getYearOfMake: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "year_make";
     FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
      //       alert("Json REesponse for year mae:"+JSON.stringify(response));
      var year_of_make_id = response.data[0].year_make[0].id;
      //       alert("year_of_make_id :"+year_of_make_id);
      //       voltmx.store.setItem("yearOfMakeId", year_of_make_id);
      var year_array = [];

      var rawYearData = response.data[0].year_make;

      var sortedYears = rawYearData.sort((a, b) => Number(b.value) - Number(a.value));


      sortedYears.forEach(res=>{
        year_array.push({
          "lblYearMake"  : res.value,
          "lblYearMakeId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.segYearOfMake.setData(year_array);
      self.yeararray = year_array;
      voltmx.store.setItem("Yeararray", year_array);

    });
  },

  segYearOfMakeonRowClickAction: function(){
    var self = this;
var selectedYearOfMake = this.view.segYearOfMake.selectedRowItems;

if (selectedYearOfMake && selectedYearOfMake.length > 0) {
    self.view.tbxYearOfMaking.text = selectedYearOfMake[0].lblYearMake;
    this.view.flxYearMakeDropDownList.setVisibility(false);
//     voltmx.store.setItem("YearOfMakeSelected", selectedYearOfMake[0].lblYearMake);
//     voltmx.store.setItem("yearOfMakeId", selectedYearOfMake[0].lblYearMakeId);
   self.yearselected = selectedYearOfMake[0].lblYearMake;
    this.view.lblerroryearofmake.setVisibility(false);
} else {
    // Optionally clear or reset if nothing selected
    this.view.lblerroryearofmake.setVisibility(false);
    // You may also want to log or handle this scenario based on your UX
}
     self.view.flxYearOfMakeUpArrow.setVisibility(false);
    self.view.flxYearOfMakeDownArrow.setVisibility(true);

  },
  
  onSubmit: function()
  {
    
       var self = this;

    function INVOKE_SERVICE_g60fdfc3dd5d4223bc74ce3e7268f2ab_Callback(status, add_spare_parts) {}
    if (add_spare_parts_inputparam == undefined) {
        var add_spare_parts_inputparam = {};
    }
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    add_spare_parts_inputparam["serviceID"] = "ms_fleet$add-spare-parts";
    add_spare_parts_inputparam["client_user_id"] = userid;
    add_spare_parts_inputparam["category_id"] = 2295;
    add_spare_parts_inputparam["sub_category_id"] = 2295;
    add_spare_parts_inputparam["year_of_making"] = self.yearselected;
    add_spare_parts_inputparam["yard_branch"] = self.branchId;
    add_spare_parts_inputparam["target_selling_price"] = self.view.tbxTargetSellingPrice.text;
    add_spare_parts_inputparam["manufactured_date"] = self.view.tbxManufacturedDate.text;
     add_spare_parts_inputparam["manufacturer"] = self.view.tbxManufacturer.text;
     add_spare_parts_inputparam["purchased"] = self.view.tbxPurchased.text;
    add_spare_parts_inputparam["purchased_date"] = self.view.tbxPurchasedDate.text;
    var add_spare_parts_httpheaders = {
      "user_token": usertoken
    };
    add_spare_parts_inputparam["httpheaders"] = add_spare_parts_httpheaders;
    var add_spare_parts_httpconfigs = {};
    add_spare_parts_inputparam["httpconfig"] = add_spare_parts_httpconfigs;
    ms_fleet$add_spare_parts = mfintegrationsecureinvokerasync(add_spare_parts_inputparam, "ms_fleet", "add-spare-parts", INVOKE_SERVICE_g60fdfc3dd5d4223bc74ce3e7268f2ab_Callback);

    
  }
  

 });