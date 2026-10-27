define({ 

 //Type your controller code here 


getData: function(){
  
  
 
    var self = this;
    var id = 4052;// Asset name
// Al_Wataneya_Custom_Services
    var AssetCategoriesMasterValues_inputparam = {
        "serviceID": "ms_user_token$get-user-obj",
        "user_id": id,   // Pass ID dynamically here
      "user_source": "azure",
        "httpheaders": {},
        "httpconfig": {}
    };

    // Service call to fetch categories
    ms_user_token$get_user_obj = mfintegrationsecureinvokerasync(
        AssetCategoriesMasterValues_inputparam,
        "ms_user_token", 
        "get-user-obj",
        function(status, response) {
            var responseString = JSON.stringify(response);
//           self.anotherServiceCall(responseString);
          voltmx.store.setItem("UserObj", responseString);
          
          alert("Response from login: " + responseString);
          alert("Response from json Login : "+JSON.typeOf(responseString));
            voltmx.print("response: " + JSON.stringify(responseString));
          voltmx.print("response: " + responseString);
            
        }
    );


},
 });