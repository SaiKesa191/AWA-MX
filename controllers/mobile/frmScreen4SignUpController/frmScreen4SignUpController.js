define({ 

  //Type your controller code here 
  onNavigate: function(){
    //     var storedPhoneNumber = voltmx.store.getItem("phone");
    //     var storedEmail = voltmx.store.getItem("email");
    // Populate the textboxes with the stored values if they exist
    this.view.txtPassword.onTextChange = this.PasswordValidate;
    this.view.txtConfirmPassword.onTextChange = this.ConfirmPassValidate;
    this.view.btnSignUp.onClick = this.signUpAction;
   this.view.flxCheckBox.onClick = this.checkBoxAction;

  },
checkBoxAction: function(){
  if(this.view.imgOK.isVisible){
    this.view.imgOK.isVisible=false;
  }
  else{
        this.view.imgOK.isVisible=true;

  }
},
  signUpAction: function(){
    var self = this;
    var userRole = "Buyer";
    var userType = "ind";
    var trade_License_Number ="";
    var trade_License_expire="";
    var tax_registration_Number="";
    var is_Seller = "0";
    var is_org = "false";

    var email = voltmx.store.getItem("email");
    var phone = voltmx.store.getItem("phone");
    voltmx.print("Email from store :"+email);
    voltmx.print("phone from store :"+phone);


//     var RegisterUser_inputparam = RegisterUser_inputparam || {};

//     RegisterUser_inputparam["serviceID"] = "flows$User_Creation_WorkFlow";
//     RegisterUser_inputparam["full_name"] = self.view.txtFullName.text;
//     RegisterUser_inputparam["name"] = self.view.txtUserName.text;
//     RegisterUser_inputparam["password"] = self.view.txtConfirmPassword.text;
//     RegisterUser_inputparam["email"] = email;
//     RegisterUser_inputparam["mobile"] = phone;
//     RegisterUser_inputparam["user_role"] = userRole;
//     RegisterUser_inputparam["user_type"] = userType;
//    RegisterUser_inputparam["is_seller"] = is_Seller;
//     RegisterUser_inputparam["is_org"] = is_org;



//     var RegisterUser_httpheaders = {};
//     RegisterUser_inputparam["httpheaders"] = RegisterUser_httpheaders;
//     var RegisterUser_httpconfigs = {};
//     RegisterUser_inputparam["httpconfig"] = RegisterUser_httpconfigs;
//    flows$User_Creation_WorkFlow = mfintegrationsecureinvokerasync(RegisterUser_inputparam, "flows", "User_Creation_WorkFlow", function RegisterUser(status,response){
      
      //       alert("status: "+status);
//       alert("response :"+JSON.stringify(response));
      //       (response.opstatus === 0 
//       if( response.opstatus===0 ){
        alert("User Created!!");
        var ntf= new voltmx.mvc.Navigation("frmSellCarList12");
        ntf.navigate();
//       }
//       else{
//         alert("status else :"+status);
//       }
//     });


  },

  PasswordValidate: function(){
    var password = this.view.txtPassword.text;
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if(!password.match(pattern)){
      this.view.flxErrorMsgPassword.isVisible = true;
      return false;
    }
    else{
      this.view.flxErrorMsgPassword.isVisible = false;
      return true;
    }
  },
  ConfirmPassValidate: function(){
    var confirmPassword = this.view.txtConfirmPassword.text;
    var password = this.view.txtPassword.text;

    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if(!confirmPassword.match(pattern)&&password !== confirmPassword){
      this.view.flxEroorMsgConfirmPass.isVisible = true;
      return false;
    }
    else{
      this.view.flxEroorMsgConfirmPass.isVisible = false;
      return true;
    }
  },


});