define({ 

 onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnCancel.onClick = () => this.view.flxScrollAddReq.setVisibility(false);
    this.view.btnSave.onClick = this.saveAddRequestInfo.bind(this);
  },
  
  onPreShow: function(){
    this.toggleFooterIcons();
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
    
    this.view.segMyVehicles.widgetDataMap = {
      "lblObjId":"lblObjId",
      "lblChassis":"lblChassis",
      "lblChassisValue":"lblChassisValue",
      "lblLot":"lblLot",
      "lblLotNum":"lblLotNum",
      "lblModel":"lblModel",
      "lblModelValue":"lblModelValue",
      "lblAdded":"lblAdded",
      "lblAddedValue":"lblAddedValue",
      "lblTargetSellingPrice":"lblTargetSellingPrice",
      "btnUpload":"btnUpload",
      "btnAddRequest":"btnAddRequest",
      "btnDone":"btnDone"
    }
    
    var data = [];
    
    for (var i = 0; i < records.length; i++) {
  var item = records[i];
  data.push({
    lblObjId: item.object_id,
    lblChassis: "Chassis Number",
    lblChassisValue: item.chassis_number,
    lblLot: "Lot #",
    lblLotNum: item.lot_no,
    lblModel: "Model",
    lblModelValue: item.year_of_making,
    lblAdded: "Added on",
    lblAddedValue: item.created_on,
    lblTargetSellingPrice: item.selling_price,
    btnUpload: 
    {
      onClick: this.AddReqandDoneCall.bind(this,"upload",item.object_id)
       
    },
    btnAddRequest: {
      onClick: this.AddReqandDoneCall.bind(this,"addRequest",item.object_id)
    },
    btnDone: {
      onClick: this.AddReqandDoneCall.bind(this,"done",item.object_id)
    }
   
  });
}
    self.view.segMyVehicles.setData(data);  
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
    
   this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknlblCPBoldCapt181818Font100";
    
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

AddReqandDoneCall: function(type,objId){
 
  switch(type){
    case "addRequest":
      this.view.flxScrollAddReq.setVisibility(true);
      break;
    case "done":
    this.invokeFleetWFStatus(objId);
      break;
  }
  
},
  
invokeFleetWFStatus: function(objId){
  
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
    }
    if (fleet_wfstatus_inputparam == undefined) {
        var fleet_wfstatus_inputparam = {};
    }
    fleet_wfstatus_inputparam["serviceID"] = "ms_fleet$fleet-wfstatus";
    fleet_wfstatus_inputparam["object_id"] = objId;
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

},
  
saveAddRequestInfo: function(){
  
  
  
  
}

 });