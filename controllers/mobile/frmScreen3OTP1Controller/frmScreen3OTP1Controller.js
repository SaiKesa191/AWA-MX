define({ 

  //Type your controller code here 

  onNavigate: function(){
    // Country Code Mapping (Example)

    this.view.preShow = this.onPreshow();
    this.view.segCountry1.onRowClick = this.onRowclickAction;
    this.view.flxDownArrowImg1.onClick = this.onClickActionForDropDown;
    this.view.flxDownArrowImg1.onClick = this.onClickActionForDropDown;
    this.view.flxUpArrowImg12.onClick = this.onClickActionForUpArrow;
    this.view.btnSend.onClick = this.sendAction;
    this.view.btnresend.onClick = this.resendAction;
    this.view.btnSubmit.onClick = this.NavigationAction;
    this.view.txtEmail.onTextChange = this.ValidationEmail;
    this.view.txtPhoneNumber.onTextChange = this.ValidationMobile;

    //             this.view.txtOtp.onTextChange = this.ValidationOTP();
  },
  ValidationOTP: function(){
    var otp = voltmx.store.getItem("otp");
    //   alert("otp from validATION OTP :"+otp);
    if(this.view.txtOtp.text === otp ){
      //     alert( "Validation Done!!");
      return true;
    }
    else{

      this.view.flxErrorMsgOtp.isVisible=true;
      return false;
    }
  },
  onPreshow: function(){
    var countries = [
      {"lbldata": "UAE"},

      {"lbldata": "India"},
      {"lbldata": "Bahrain"},
      {"lbldata": "Qatar"},
      {"lbldata": "Pakisthan"},
      {"lbldata": "India"},
      {"lbldata": "Kuwait"},
      {"lbldata": "Saudi Arabia"}
    ];

    // Dynamically set the data for the segment
    this.view.segCountry1.setData(countries);
  },






  onRowclickAction: function(){
    //     if (!selectedRow || selectedRow.length === 0) {
    //       alert("No row selected.");
    //       return;
    //     }
    var countryCodes = {
      "UAE": "+971",
      "Bahrain": "+973",
      "Kuwait": "+965",
      "Oman": "+968",
      "Qatar": "+974",
      "Saudi Arabia": "+966",
      "India": "+91",
      "Pakistan": "+92"
      // Add more countries as needed	
    };
    var selectedRow=this.view.segCountry1.selectedRowItems;
    //     alert("selectedrow1"+selectedRow[0].lblData);//UAE
    var selectedRowItem = selectedRow[0].lbldata;
    //     alert(this.view.segCountry1.data+"SegData");//[{},{},{}]//[{},{},]
    var segData =this.view.segCountry1.data;
    var lblLoc = this.view.lblLocation1.text;
    //     alert("LblLoc before"+lblLoc);//Countries
    this.view.lblLocation1.text= selectedRowItem;
    //         alert("LblLoc. After"+lblLoc);//UAE//countries


    // alert(countryCodes[selectedRowItem]+"countryCodes[selectedRowItem]");//+91

    // Update Mobile Number Country Code
    if (countryCodes[selectedRowItem]) {
      this.view.lblCountryCode.text = countryCodes[selectedRowItem];
    } else {
      this.view.lblCountryCode.text = "";  // Default if country is not in the list
    }
    segData.forEach((data)=>{
      //                  alert(data.lblData+"data");//UAE
      //       alert(JSON.stringify(data)+"jsondata");//{"lblData":"UAE"}
      //       alert(this.view.lblLocation1.text+"lblloc11111");
      if(this.view.lblLocation1.text === data.lbldata){
        this.view.flxDropDownData.isVisible = false;
        this.view.flxUpArrowImg12.isVisible=false;
        this.view.flxDownArrowImg1.isVisible=true;
      }
    });
    this.view.flxEmail.isVisible=true;
    this.view.flxMobileNumber.isVisible=true;

  },

  onClickActionForDropDown: function(){
    this.view.flxDropDownData.isVisible=true;
    this.view.flxUpArrowImg12.isVisible=true;
    this.view.flxDownArrowImg1.isVisible=false;
  },

  onClickActionForUpArrow: function(){
    this.view.flxDropDownData.isVisible=false;
    this.view.flxUpArrowImg12.isVisible=false;
    this.view.flxDownArrowImg1.isVisible=true;
  },

  sendAction: function() {
    var self = this;

    var phoneNumber = self.view.txtPhoneNumber.text;
    var email = self.view.txtEmail.text;

    if (!phoneNumber && !email) {
      //       alert("Please Enter Mobile Number and Email");

      self.view.lblErrorMsgMbl.text = "  *Mobile Number required!";
      self.view.lblErrorMsg.text = "   * Email Required!";
      self.view.flxErrorMsgEmail.isVisible = true; // Show error message
      self.view.flxErrorMsgMbl.isVisible = true;

    }
    else {
      //       this.view.lblSendGray.isVisible = false;
      self.view.btnSend.skin = "sknBtnOrangeAction";
      //       this.view.lblSendBlack.isVisible = true;
      if(self.view.btnSend.skin  === "sknBtnOrangeAction" && self.ValidationMobile() && self.ValidationEmail()){
        self.view.flxOTP.isVisible=true;
        self.view.btnSubmit.isVisible=true;
        voltmx.store.setItem("phone", phoneNumber);
        voltmx.store.setItem("email", email);



//         var SendOTP_inputparam =SendOTP_inputparam|| {};

//         SendOTP_inputparam["serviceID"] = "flows$User_Registration_Send_Otp";
//         SendOTP_inputparam["country"] = self.view.lblLocation1.text;
//         SendOTP_inputparam["country_code"] = self.view.lblCountryCode.text;
//         SendOTP_inputparam["email"] = self.view.txtEmail.text;
//         SendOTP_inputparam["mobile"] = self.view.txtPhoneNumber.text;
//         var SendOTP_httpheaders = {};
//         SendOTP_inputparam["httpheaders"] = SendOTP_httpheaders;
//         var SendOTP_httpconfigs = {};
//         SendOTP_inputparam["httpconfig"] = SendOTP_httpconfigs;
//         flows$User_Registration_Send_Otp = mfintegrationsecureinvokerasync(SendOTP_inputparam, "flows", "User_Registration_Send_Otp", function(status, SendOTP){
//           //           this.view.lblid.text = voltmx.visualizer.toString(SendOTP.id);
//           //           this.view.lblMeass.text = SendOTP.message;
//           voltmx.print("status :"+status);
//           voltmx.print("status :"+JSON.stringify(status));
//           voltmx.print("response: "+SendOTP);
//           voltmx.print("response from send action: "+JSON.stringify(SendOTP));
          
//           alert("status :"+status);
//           alert("status :"+JSON.stringify(status));
//           alert(SendOTP);
//           alert("response from send action: "+JSON.stringify(SendOTP));
          

//           var id = SendOTP.save_otp_details[0].user_otp_verifications[0].verification_id;
//           voltmx.print("Id from Send Action : "+id);
//           var otp = SendOTP.save_otp_details[0].user_otp_verifications[0].otp;
//           //           var otp = response.save_otp_details[0].user_otp_verifications[0].otp;
//           // var verificationId = response.save_otp_details[0].user_otp_verifications[0].verification_id;
//           voltmx.print("otp :"+otp);
//           voltmx.store.setItem("verification_id", id);
//           voltmx.store.setItem("otp", otp);
//           var verification_Id = voltmx.store.getItem("verification_id");
//           var Otp= voltmx.store.getItem("otp");
//           self.view.txtOtp.text = Otp;
          // alert("this.view.txtOtp.text "+self.view.txtOtp.text );
          //    alert("otp"+Otp);
//         });
      }

      else{
//         self.view.flxOTP.isVisible=false;
//         self.view.btnSubmit.isVisible=false;

      }
    }


  },
  //   sendBlack: function(){
  //     if(this.view.lblSendGray.skin === "sknLblBlack"){
  //       this.view.flxOTP.isVisible=true;

  //     }
  //   },
  onDoneAction: function(){
    this.view.btnSubmit.isVisible=true;
  },
  NavigationAction: function(){
    var self = this;
    voltmx.print("Entered into Validate Otp");

//     var ValidateOTP_inputparam = ValidateOTP_inputparam || {};
//     var verification_Id = voltmx.store.getItem("verification_id");
//     var Otp= voltmx.store.getItem("otp");

//     ValidateOTP_inputparam["serviceID"] = "flows$WorkFlowValidateOTP";
//     //     ValidateOTP_inputparam["email"] = this.view.txtEmail.text;
//     ValidateOTP_inputparam["phone"] = self.view.txtPhoneNumber.text;
//     ValidateOTP_inputparam["verification_id"] =verification_Id;
//     ValidateOTP_inputparam["otp"] =Otp;

//     var ValidateOTP_httpheaders = {};
//     ValidateOTP_inputparam["httpheaders"] = ValidateOTP_httpheaders;
//     var ValidateOTP_httpconfigs = {};
//     ValidateOTP_inputparam["httpconfig"] = ValidateOTP_httpconfigs;
//     flows$ValidateOTP = mfintegrationsecureinvokerasync(ValidateOTP_inputparam, "flows", "WorkFlowValidateOTP", function(status,response){
//       //              this.view.lblMeass.text = response.message;
      //             alert("response: "+JSON.stringify(response));
      //       alert("Status: "+status);
      //       var params = {
      //         "email": this.view.txtEmail.text,

      //       }
      //       var otp = voltmx.store.getItem("otp");
      //   alert("otp from validATION OTP :"+otp);
      //   if(this.view.txtOtp.text === otp ){
      //     alert( "Validation Done!!");
      //     return true;
      //   }
//       if(response.opstatus === 0 && self.ValidationOTP()){
        //         alert("Verified and User Created!!!!");
        var ntf = new  voltmx.mvc.Navigation("frmScreen4SignUp");
        ntf.navigate();
//       }
//       else{
//         alert("status else:"+status);
//       }


//     });




  },
  ValidationEmail: function() {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex pattern
    var email = this.view.txtEmail.text;
    // Check if the email doesn't match the pattern
    if (!this.view.txtEmail.text.match(emailPattern)) {

      this.view.lblErrorMsg.text = "   *Enter Valid Email!";
      this.view.flxErrorMsgEmail.isVisible = true; // Show error message
      return false;

    } else {
      this.view.flxErrorMsgEmail.isVisible = false; // Hide error message

      return true;
    }
  },


  ValidationMobile: function() {
    var phonePattern = /^\d{10}$/; // Regular expression for matching a 10-digit phone number

    if(!this.view.txtPhoneNumber.text.match(phonePattern)) {
      this.view.lblErrorMsgMbl.text = "  *Enter Valid Mobile Number";

      this.view.flxErrorMsgMbl.isVisible = true;
      return false;
    }
    else {
      this.view.flxErrorMsgMbl.isVisible = false;
      return true;
    }
  },




  //   resendAction: function(){
  // var self = this;


  //       var ResendOTP_inputparam = ResendOTP_inputparam || {};
  //     var verification_Id = voltmx.store.getItem("verification_id");
  //     var Otp= voltmx.store.getItem("otp");
  //     var phone =voltmx.store.getItem("phone");
  // //     var getId = voltmx.store.getItem("SentId");
  //     ResendOTP_inputparam["serviceID"] = "flows$User_Registration_Send_Otp";
  // //     ResendOTP_inputparam["id"] = getId;
  //       ResendOTP_inputparam["phone"] = phone;
  //      ResendOTP_inputparam["verification_id"] =verification_Id;
  //      ResendOTP_inputparam["otp"] =Otp;
  //     var ResendOTP_httpheaders = {};
  //     ResendOTP_inputparam["httpheaders"] = ResendOTP_httpheaders;
  //     var ResendOTP_httpconfigs = {};
  //     ResendOTP_inputparam["httpconfig"] = ResendOTP_httpconfigs;
  //    flows$User_Registration_Send_Otp = mfintegrationsecureinvokerasync(ResendOTP_inputparam, "flows", "User_Registration_Send_Otp", function callback(status,resendOTP){
  //       voltmx.print("status :"+status);
  //       voltmx.print("resendOTP : "+resendOTP);
  //       voltmx.print("resendOTP : "+JSON.stringify(resendOTP));
  //       var message = resendOTP.message;
  //       voltmx.print("Message from resendOtp Service :"+message);
  //      voltmx.print("Otp from resend : "+resendOTP.save_otp_details[0].user_otp_verifications[0].otp);
  //      var resendedOTP = resendOTP.save_otp_details[0].user_otp_verifications[0].otp;
  //           self.view.txtOtp.text = resendedOTP;

  //     });

  //   }

});