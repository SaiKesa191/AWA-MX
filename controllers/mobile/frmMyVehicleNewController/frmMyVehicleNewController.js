define({ 

 onNavigate: function(){
   
   
   this.view.preShow = this.onPreShow.bind(this);
   this.view.flxBack.onClick = this.handleBackNavigation.bind(this);
   
   

   
   
   
 },
  
  onPreShow: function()
  {
    this.view.flxSegVehicles.setVisibility(true);
   this.view.flxTable.setVisibility(false); 
    this.invokeMYVehiclesService();
    
  },
  handleBackNavigation: function()
  {
    if(this.view.flxTable.isVisible){
      this.view.flxTable.setVisibility(false);
      this.view.flxSegVehicles.setVisibility(true);
    }
    else{
      new voltmx.mvc.Navigation("frmOpenMyVehicles").navigate();
    }
  },
  
  
//   vehicleList: function(){
//      this.view.flxSegVehicles.widgetDataMap = {   
//        "lblVehicle": "lblVehicle",
//        "flxEyeIcon": "flxEyeIcon",
//        "imgEyeIcon": "imgEyeIcon"    
//     }
    
    
//      var vehicles=[
//            { "lblVehicle": "Nissan Altima 2020",
//              "imgEyeIcon": "eye_icon.png" 
//            },
//        { "lblVehicle": "Nissan Sunny 2020",
//              "imgEyeIcon": "eye_icon.png" 
//            },
//        { "lblVehicle": "Nissan SENTRA 2019",
//              "imgEyeIcon": "eye_icon.png" 
//            }
//     ]
    
//     this.view.segVehicles.setData(vehicles)
    
    
    
//   },
  
  
  invokeMYVehiclesService: function()
  {
      var self = this;

    function invServiceCallBack(status, user_fleet_my_vehicles) {
      self.setVehiclesDataToSeg(user_fleet_my_vehicles.records);
    }
    if (user_fleet_my_vehicles_inputparam == undefined) {
        var user_fleet_my_vehicles_inputparam = {};
    }
    var userId = voltmx.store.getItem("userId");
    user_fleet_my_vehicles_inputparam["serviceID"] = "fry_int_fleet$user-fleet-my-vehicles";
    user_fleet_my_vehicles_inputparam["user_id"] = userId;
    user_fleet_my_vehicles_inputparam["foundrySerivceName"] = "Your Vehicles";
    user_fleet_my_vehicles_inputparam["lot_no"] = "";
     user_fleet_my_vehicles_inputparam["title"] = "";
     user_fleet_my_vehicles_inputparam["chassis_number"] = "";
     user_fleet_my_vehicles_inputparam["created_on"] = "";
     user_fleet_my_vehicles_inputparam["branch"] = "";
    user_fleet_my_vehicles_inputparam["asset_id"]= "ALL";
      user_fleet_my_vehicles_inputparam["page_number"] = "1";
      user_fleet_my_vehicles_inputparam["page_size"] = "10";
    
    

   var userToken = voltmx.store.getItem("getUserAccesstoken");
    var user_fleet_my_vehicles_httpheaders = {
      "user_token": userToken
    };
    user_fleet_my_vehicles_inputparam["httpheaders"] = user_fleet_my_vehicles_httpheaders;
    var user_fleet_my_vehicles_httpconfigs = {};
    user_fleet_my_vehicles_inputparam["httpconfig"] = user_fleet_my_vehicles_httpconfigs;
    fry_int_fleet$user_fleet_my_vehicles = mfintegrationsecureinvokerasync(user_fleet_my_vehicles_inputparam, "fry_int_fleet", "user-fleet-my-vehicles", invServiceCallBack);
    
  },
  
  setVehiclesDataToSeg: function(records)
  {
     var self = this;
    
    self.view.segVehicles.widgetDataMap = {
      "lblObjId":"lblObjId",
      "lblVehicle":"lblVehicle",
      "flxEyeIcon":"flxEyeIcon"
    };
    
     var data = [];
    
    for (var i = 0; i < records.length; i++) {
  var item = records[i];
    data.push({
       lblVehicle: item.title,
      flxEyeIcon: {
        "onClick": self.vehicleDetails.bind(this,item)
      }
    })
    }
    
    self.view.segVehicles.setData(data);
  },
  vehicleDetails: function(item){
    
    var self = this;
    self.view.flxSegVehicles.setVisibility(false);
   self.view.flxTable.setVisibility(true); 
    
    
     var vehicleDetail=[
        { "lblAuctionId":"Auction Id" ,
        "lblAuctionIdValue": "#" +item.lot_no || "N/A",
        "lblChassisNo":"Chassis No",
        "lblChassisNoValue": item.chassis_number || "N/A",
        "lblModel":"Model",
        "lblModelValue": item.model || "N/A",
        "lblAdded":"Added",
        "lblAddedValue": item.created_on || "N/A",
        "lblTargetSellingPrice": "Target Selling Price",
        "lbltargetSellingPriceValue": item.selling_price || "N/A",
        "lblLocation":"Location",
        "lblLocationValue": item.location || "N/A",
        "lblUploadFile":"Upload File",
        "lblUploadFileValue":"altima_doc.pdf",
        "lblAddRequest":"Add Request",
        "lblAddRequestValue":"Request Sent",
        "lblDone":"Done",
        "btnDone":{"text":"Done",
                   "onClick": this.invokeFleetWFStatus.bind(this,item)
                  }
        },
   ]
   
   
   self.view.segTableVehicle.setData(vehicleDetail);
    
  },
  
  invokeFleetWFStatus: function(item)
  {
     var self = this;
   voltmx.application.showLoadingScreen();
    function invokeServiceCallBack(status, fleet_wfstatus) {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(fleet_wfstatus);
      if(fleet_wfstatus.httpStatusCode === 200){
        alert("Vehicle For Submission completed successfully");
        voltmx.application.dismissLoadingScreen();
        var x = new voltmx.mvc.Navigation("frmDashBoard");
        x.navigate();
      }
      else{
        alert(JSON.stringify(fleet_wfstatus));
      }
    }
    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = item.object_id;
    fleet_wfstatus_inputparam["action_name"] = "Done";
  var userToken = voltmx.store.getItem("getUserAccesstoken");
    var fleet_wfstatus_httpheaders = {
      "user_token": userToken,
      "jwt_token": ""
    };
    fleet_wfstatus_inputparam["httpheaders"] = fleet_wfstatus_httpheaders;
    var fleet_wfstatus_httpconfigs = {};
    fleet_wfstatus_inputparam["httpconfig"] = fleet_wfstatus_httpconfigs;
    ms_fleet$fleet_wfstatus = mfintegrationsecureinvokerasync(fleet_wfstatus_inputparam, "ms_fleet", "fleet-wfstatus", invokeServiceCallBack);
    
    
  }

 
  
  
  
 });