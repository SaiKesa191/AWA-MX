define({ 

 //Type your controller code here 
onNavigate: function(){
  this.view.Button0f5c113e0c0eb44.onClick = this.action;
},
  action: async function() {
    var self = this;
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (self.view.tbxEmailAddress.text !== null && self.view.tbxEmailAddress.text.match(pattern)) {
      var verification_type = "email";
      var url = "https://dev-hcltx.et.ae:443/services/ms_user_reg/check-user-attribute";

      try {
        // Create HTTP request for email validation
        var request = new voltmx.net.HttpRequest();
        request.open("POST", url);
       var username = "aaf23ca6180cfacbd5c4ea23c5faa2dd";
       var password = "43f644c5a1bea3169a10586ef47807bc";
        var credentials = username + ":" + password;
//         var encodedValue = this.encodeToBase64(credentials);  
        // Set headers
//         request.setRequestHeader("Authorization", "Basic " + encodedValue);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");

        // Handle the response
        request.onReadyStateChange = async function() {
          if (request.readyState === 4) {
            if (request.status === 200) {
              alert("✅ Success from email check: " + request.responseText);
              var requestStringEmail = request.responseText;
              var requestJSONEmail = JSON.parse(requestStringEmail);
              voltmx.print("requestJSON from validate email: " + requestJSONEmail);
//               alert("opstatus: " + requestJSONEmail.opstatus);

              var opstatusRes = requestJSONEmail.opstatus;
              if (opstatusRes === 0 && requestJSONEmail.data.userExists=== false && requestJSONEmail.data.message === "Email Id is valid") {
                // Calling the async function to handle the OTP request
                voltmx.store.setItem("email", self.view.tbxEmailAddress.text);
                await self.sendEmailOTPRequest(self.view.tbxEmailAddress.text, verification_type);
              } else {
//                 alert("response error!!! OTP not sent");
                              alert("❌ Failed to check email: " + request.status + " - " + request.responseText);

              }
            } else {
//               alert("❌ Failed to check email: " + request.status + " - " + request.responseText);
            }
          }
        };

        var requestData = JSON.stringify({
          "verfication_type": verification_type,
          "value": self.view.tbxEmailAddress.text
        });

        request.send(requestData); // Send the request

      } catch (error) {
        alert("❌ Error: " + error.message);
        voltmx.print("❌ Error: " + error.message);
      }
    } else {
      self.view.lblEmailRequired.setVisibility(true);
      self.view.flxEmail.setVisibility(true);
      self.view.flxEmailVerificationCode.setVisibility(false);
    }
  },


  
  
 });