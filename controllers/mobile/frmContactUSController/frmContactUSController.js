define({ 

 onNavigate: function()
  {
    
    this.setData();
    this.view.flxBack.onClick = this.navToHelp.bind(this);
    this.view.preShow = this.onPreShow.bind(this);
    this.setInputListeners();
    this.view.btnSubmit.onClick=this.reportIssueFormDetails.bind(this);
    this.view.flxPaymentSuccessPopup.setVisibility(false);
//     this.view.btnSubmit.onClick=this.invokeServiceForreportAnIssue();
    this.view.flxRemovePaypopup.onClick= this.removePopUp.bind(this);
    this.view.flxPaymentSuccessPopup.onClick= this.removePopUp.bind(this);
    
    this.view.flxPhonecircle.onClick =
      this.onRadioOptionClicked.bind(this, "phone");
    this.view.flxEmailcircle.onClick = 
      this.onRadioOptionClicked.bind(this, "email");
    this.view.flxBothcircle.onClick =
      this.onRadioOptionClicked.bind(this, "both");
    
    this.view.btnCallOurSupportTeam.onClick=this.callSuppportOnclick.bind(this);
    
    this.view.btnGoToHome.onClick=()=>{
//       this.view.flxSellCarSuccess.setVisibility(false);
      voltmx.phone.dial("8006006");
    }
    
    this.view.flxClose.onClick=()=>{
      this.view.flxSellCarSuccess.setVisibility(false);
    }
    
    this.view.btnLiveChat.onClick=()=>{
     var goto= new voltmx.mvc.Navigation("frmLiveChat");
      goto.navigate();
    }
    
    this.view.btnViewfAQS.onClick=()=>{
     var goto= new voltmx.mvc.Navigation("frmFAQs");
      goto.navigate();
    }
    
    this.view.btnSendAnEmail.onClick=()=>{
      
     voltmx.phone.openEmail(["etcares@et.ae"], [], [], null, null, false);
    }
    
    
//     this.view.btnSendAnEmail
    
    
  },
  
  onPreShow: function()
  {
    var self = this;
    this.service_type = "General Inquiry";
    this.view.tbxBranchName.text = "";
    this.view.flxBox.setVisibility(true);
    this.view.flxIMgtick.setVisibility(false);
    this.view.tbxBranchName.setEnabled(false);
    this.view.flxBranchDropdown.setVisibility(false);
    
    this.view.imgRadioBtnClicked.setVisibility(false);
      this.view.imgRadioBtnUnClicked.setVisibility(true);

      this.view.imgRadioBtnClickedEmail.setVisibility(false);
      this.view.imgRadioBtnUnClickedEmail.setVisibility(true);

      this.view.imgRadioBtnClickedBoth.setVisibility(false);
      this.view.imgRadioBtnUnClickedBoth.setVisibility(true);
    
    this.view.SegBranches.onRowClick = this.onTopicRowClick.bind(this);
    this.view.btnHomePage.onClick = () =>
    {
      self.view.flxPaymentSuccessPopup.setVisibility(false);
      self.callSuppportOnclick();
    }
    this.view.flxBranchDownArrow.onClick = this.BranchDownArrow;
    this.view.flxBranchUparrow.onClick = this.BranchUpArrow;
    this.view.flxBox.onClick = this.tickvisibleoff;
    this.view.flxIMgtick.onClick = this.emptyon;
   this.toggleFooterIcons();
    this.setTopic();
//     this.onRadioOptionClicked("Both");
     this.view.flxError.btnTryAgain.onClick=
          this.onTryAgainOnclick.bind(this);
    
//          if(this.view.SmthngWentWrong.btnClose){
//       this.view.SmthngWentWrong.btnClose.onClick = () =>{
//         this.view.SmthngWentWrong.setVisibility(false);
//       }
//     }
       if(this.view.SmthngWentWrong.btnClose){
      this.view.SmthngWentWrong.btnClose.onClick = () =>{
        this.view.SmthngWentWrong.setVisibility(false);
      }
    }
    
    
       if(this.view.flxServiceError.btnTryAgain){
      this.view.flxServiceError.btnTryAgain.onClick = () =>{
       this.view.flxServiceError.setVisibility(false);
      }
    }
     if(this.view.flxSellCarSuccess){
     this.view.flxSellCarSuccess.setVisibility(false);
        }
    
  },
  
  setTopic: function() {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var data = [
        {
            lblBranchName: 
          {
          text: voltmx.i18n.getLocalizedString("Appreciation"),
          left: isArabic ? "": "10%",
          right: isArabic ? "10%": ""
        },
            key: "Appreciation"
        },
        {
            lblBranchName: 
          {
           text: voltmx.i18n.getLocalizedString("Complaint/Issue"),
             left: isArabic ? "": "10%",
          right: isArabic ? "10%": ""
        },
            key: "Complaint/Issue"
        },
        {
            lblBranchName:
          {
            text: voltmx.i18n.getLocalizedString("General Inquiry"),
            left: isArabic ? "": "10%",
          right: isArabic ? "10%": ""
          },
            key: "General Inquiry"
        }
    ];

    this.view.SegBranches.setData(data);
},
  
  onTopicRowClick: function() {
    var self = this;
    var selectedRow = self.view.SegBranches.selectedRowItems[0];

    if (selectedRow) {
        self.service_type = selectedRow.key;
         self.view.flxBranchDropdown.setVisibility(false);
  self.view.flxBranchUparrow.setVisibility(false);
    self.view.flxBranchDownArrow.setVisibility(true);
      self.view.tbxBranchName.text = selectedRow.lblBranchName.text;
    }
},
  
   BranchDownArrow: function(){
    this.view.flxBranchDownArrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(true);
    this.view.tbxBranchName.setEnabled(false);
    this.view.flxBranchUparrow.setVisibility(true);
  },
  BranchUpArrow: function(){
    this.view.flxBranchUparrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(false);
    this.view.tbxBranchName.setEnabled(false);
    this.view.flxBranchDownArrow.setVisibility(true);
  },
  
  tickvisibleoff: function(){
     this.view.flxBox.setVisibility(false);
    this.view.flxIMgtick.setVisibility(true);
  },
  
  emptyon: function(){
    this.view.flxIMgtick.setVisibility(false);
     this.view.flxBox.setVisibility(true);
  },
  
  onTryAgainOnclick: function(){
    
      if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      this.view.flxError.setVisibility(false);
           this.view.flxError.setVisibility(false);
      this.view.txtName.text="";
    this.view.txtEmail.text="";
    this.view.txtPhone.text="";
    this.view.txtComplaintOrMessage.text="";
    this.view.textareaComplaint.text="";
    this.view.imgRadioBtnClickedBoth.setVisibility(true);
     this.view.lblerror01.setVisibility(false);
        this.view.lblerror001.setVisibility(false);
  this.view.lblerror02.setVisibility(false);
  this.view.lblerror03.setVisibility(false);
  this.view.lblerror04.setVisibility(false);
  this.view.lblerror05.setVisibility(false);
//       this.setUpDataPreshow();
    } else {
      voltmx.print("Still offline...");
    }
    
   
    
  },
  
  callSuppportOnclick: function(){
    
    this.view.lblThankYou.text= voltmx.i18n.getLocalizedString("Speak with Our Support Team");
    this.view.lblContactYouShortly.text="+971 8006006";
    this.view.btnGoToHome.text= voltmx.i18n.getLocalizedString("CALL NOW");
    this.view.flxSellCarSuccess.setVisibility(true);
    
  },
  
  removePopUp: function(){
    this.view.flxPaymentSuccessPopup.setVisibility(false);
    this.view.txtName.text="";
    this.view.txtEmail.text="";
    this.view.txtPhone.text="";
    this.view.txtComplaintOrMessage.text="";
    this.view.textareaComplaint.text="";
    this.view.imgRadioBtnClickedBoth.setVisibility(true);
     this.view.lblerror01.setVisibility(false);
    this.view.lblerror001.setVisibility(false);
  this.view.lblerror02.setVisibility(false);
  this.view.lblerror03.setVisibility(false);
  this.view.lblerror04.setVisibility(false);
  this.view.lblerror05.setVisibility(false);
    
    
  },
  
  
 toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(true);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
   this.view.Footer2.lblSellCar.skin = "sknLblDubaid3243714pxBold"; 
    
   var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
      this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
  
  navToHelp: function()
  {
    var id = voltmx.store.getItem("contactBackForm");
    new voltmx.mvc.Navigation(id).navigate();
      this.view.flxPaymentSuccessPopup.setVisibility(false);
    this.view.txtName.text="";
    this.view.txtEmail.text="";
    this.view.txtPhone.text="";
    this.view.txtComplaintOrMessage.text="";
    this.view.textareaComplaint.text="";
//     this.view.imgRadioBtnClickedBoth.setVisibility(true);
     this.view.lblerror01.setVisibility(false);
    this.view.lblerror001.setVisibility(false);
  this.view.lblerror02.setVisibility(false);
  this.view.lblerror03.setVisibility(false);
  this.view.lblerror04.setVisibility(false);
  this.view.lblerror05.setVisibility(false);
    
    
      this.selectedRadio = null;

      this.view.imgRadioBtnClicked.setVisibility(false);
      this.view.imgRadioBtnUnClicked.setVisibility(true);

      this.view.imgRadioBtnClickedEmail.setVisibility(false);
      this.view.imgRadioBtnUnClickedEmail.setVisibility(true);

      this.view.imgRadioBtnClickedBoth.setVisibility(false);
      this.view.imgRadioBtnUnClickedBoth.setVisibility(true);

  },
  
  
   setInputListeners: function () {
    var self = this;

    this.view.txtName.onTextChange = function () {
      self.view.lblerror01.setVisibility(false);
    };
     
     this.view.txtLastname.onTextChange = function () {
      self.view.lblerror001.setVisibility(false);
    };

    this.view.txtEmail.onTextChange = function () {
      self.view.lblerror02.setVisibility(false);
    };

    this.view.txtPhone.onTextChange = function () {
      self.view.lblerror03.setVisibility(false);
    };

    this.view.textareaComplaint.onTextChange = function () {
      self.view.lblerror05.setVisibility(false);
    };

    this.view.contactOptions.onSelection = function () {
      self.view.lblerror04.setVisibility(false);
    };
  },
  
  
  
  reportIssueFormDetails: function () {
    var isValid = true;

    var name = this.view.txtName.text;
    var lastname = this.view.txtLastname.text;
    var regex = /^[A-Za-z]+$/;

    if (!name) {
      this.view.lblerror01.text = voltmx.i18n.getLocalizedString("Field is required");
      this.view.lblerror01.setVisibility(true);
      isValid = false;
    } else if (!regex.test(name)) {
      this.view.lblerror01.text = "Please enter letters only (A–Z or a–z)";
      this.view.lblerror01.setVisibility(true);
      isValid = false;
    } else {
      this.view.lblerror01.setVisibility(false);
    }
    
    if (!lastname) {
      this.view.lblerror001.text = voltmx.i18n.getLocalizedString("Field is required");
      this.view.lblerror001.setVisibility(true);
      isValid = false;
    } else if (!regex.test(name)) {
      this.view.lblerror001.text = "Please enter letters only (A–Z or a–z)";
      this.view.lblerror001.setVisibility(true);
      isValid = false;
    } else {
      this.view.lblerror001.setVisibility(false);
    }

    var email = this.view.txtEmail.text;
    if (!email) {
      this.view.lblerror02.setVisibility(true);
      this.view.lblerror02.text =  voltmx.i18n.getLocalizedString("Field is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.view.lblerror02.setVisibility(true);
      this.view.lblerror02.text = "Enter a valid email address";
      isValid = false;
    } else {
      this.view.lblerror02.setVisibility(false);
    }

//     var phone = this.view.txtPhone.text;
//     if (!phone) {
//       this.view.lblerror03.setVisibility(true);
//       this.view.lblerror03.text = "*Field is required";
//       isValid = false;
//     } else if (!/^[0-9]{10}$/.test(phone)) {
//       this.view.lblerror03.setVisibility(true);
//       this.view.lblerror03.text = "Enter valid 10-digit contact number";
//       isValid = false;
//     } else {
//       this.view.lblerror03.setVisibility(false);
//     }

    var complaint = this.view.textareaComplaint.text;
    if (!complaint) {
      this.view.lblerror05.setVisibility(true);
      isValid = false;
    } else {
      this.view.lblerror05.setVisibility(false);
    }

//     var selectedContactOption = this.view.contactOptions.selectedKey;
//     if (!selectedContactOption) {
//       this.view.lblerror04.setVisibility(true);
//       this.view.lblerror04.text = "*Please select an option";
//       isValid = false;
//     } else {
//       this.view.lblerror04.setVisibility(false);
//     }
    
    
    var selectedOption = this.selectedRadio;

if (!selectedOption) {
  this.view.lblerror04.text = voltmx.i18n.getLocalizedString("Please select an option");
  this.view.lblerror04.setVisibility(true);
  isValid = false;
} else {
  this.view.lblerror04.setVisibility(false);
}


    if (isValid) {
      this.invokeServiceForreportAnIssue();
       this.view.txtName.text = "";
       this.view.txtLastname.text = "";
  this.view.txtEmail.text = "";
  this.view.txtPhone.text = "";
  this.view.textareaComplaint.text = "";
//   this.view.contactOptions.selectedKey = null;
      this.view.flxBothcircle.setVisibility(true);
  this.view.textareaComplaint.text.text="";    

  this.view.lblerror01.setVisibility(false);
  this.view.lblerror001.setVisibility(false);
  this.view.lblerror02.setVisibility(false);
  this.view.lblerror03.setVisibility(false);
  this.view.lblerror04.setVisibility(false);
  this.view.lblerror05.setVisibility(false);
//       this.view.imgRadioBtnClickedBoth.setVisibility(false);
      // Reset radio selection
      this.selectedRadio = "both";

      this.view.imgRadioBtnClicked.setVisibility(false);
      this.view.imgRadioBtnUnClicked.setVisibility(true);

      this.view.imgRadioBtnClickedEmail.setVisibility(false);
      this.view.imgRadioBtnUnClickedEmail.setVisibility(true);

      this.view.imgRadioBtnClickedBoth.setVisibility(false);
      this.view.imgRadioBtnUnClickedBoth.setVisibility(true);

      
    }
  },
  
  
  
    onRadioOptionClicked: function (selectedOption) {
  var options = {
    phone: {
      selImg  : this.view.imgRadioBtnClicked,
      unselImg: this.view.imgRadioBtnUnClicked,
      label   : this.view.lblPhone
    },
    email: {
      selImg  : this.view.imgRadioBtnClickedEmail ,
      unselImg: this.view.imgRadioBtnUnClickedEmail ,
      label   : this.view.lblEmail
    },
    both: {
      selImg  : this.view.imgRadioBtnClickedBoth,
      unselImg: this.view.imgRadioBtnUnClickedBoth,
      label   : this.view.lblBoth
    }
  };

    
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      var isSelected = (key === selectedOption);
      options[key].selImg.setVisibility(isSelected);
      options[key].unselImg.setVisibility(!isSelected);
//       options[key].label.skin = isSelected ? "lblSelected" : "lblUnselected";
    }
  }

  this.selectedRadio = selectedOption;
//   alert("Radio selected: " + selectedOption);
},

  

  
  
  invokeServiceForreportAnIssue: function () {
    
    var self=this;

    var name = self.view.txtName.text.trim();
    var lastname = self.view.txtLastname.text.trim();
    var email = self.view.txtEmail.text.trim();
    var phone = self.view.txtPhone.text.trim();
    var complaint = self.view.textareaComplaint.text.trim();
    var selectedContactOptionArray = self.view.contactOptions.selectedKeyValue;
    var selectedContactOptionText = selectedContactOptionArray[1]; 

    try {
      var request = new voltmx.net.HttpRequest(); 
      
      
      var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
        var url =baseURL+"services/ms_common/api/v1/contact-us";
    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);

//       request.open("POST", "https://dev-hcltx.et.ae:443/services/ms_common/api/v1/contact-us", true);
      request.open("POST", url , true);

      request.setRequestHeader("Content-Type", "application/json");
//       request.setRequestHeader("Authorization", "Basic MWZmNjNjNzQ2YTUzODVjYzM2NGM1NjNhZmQ4MGRmMDM6MWZkZGM1NTE4YjY1OWYwMDc5ZTdkMDJkMTg2ZTU1Y2Y=");
          request.setRequestHeader("Authorization", "Basic " + encodeVal);

      
      
      var payload = {
        "first_name": name,
        "last_name": lastname,
        "email": email,
        "mobile": phone,
        //     "contact_phone": "3456787654",
        "subject": "",
        "contact_method": self.selectedRadio || "both",
        "description": complaint,
        "service_type": self.service_type
      };

      voltmx.application.showLoadingScreen(
        "sknLoading",
        "Sending...",
        constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
        true,
        true,
        {}
      );

      request.onReadyStateChange = function () {
        if (request.readyState === 4) {
          voltmx.application.dismissLoadingScreen();
          
          if (request.status === -1 || request.status === 0) {
            self.view.flxError.setVisibility(true);
            return;
          }

          
          if (request.status === 200) {
            try {
              var response = JSON.parse(request.responseText);
              var responseString = request.responseText;

              //           if (response.status === "true") {
              //             alert(" Request submitted successfully!");
              //             alert(JSON.stringify(response));
              //           } else {
              //             alert(" Server error: " + response.message);
              //           }
           var parsedResponse = JSON.parse(responseString);
              

              if (parsedResponse.status === false ||
                  parsedResponse.error === true) {
//                 self.view.lblServiceError.text = parsedResponse.message 
//                 || "Service returned an error.";
//                 self.view.flxServiceError.setVisibility(true);
                
                self.view.flxServiceError.lblNetworkConnectionerror.text=
                  parsedResponse.message 
                || "Service returned an error.";
                  self.view.flxServiceError.setVisibility(true);
                
                return;
              }
              
//               alert("Parsed response: " + JSON.stringify(parsedResponse));
              var referenceId=parsedResponse.data.lead_id;
//               alert("responseString.data"+responseString.data);
            
//               alert("reference ID: "+referenceId);
//               alert("report submitted Successfully");
                 
              
//               self.view.lblReferenceID.text="Reference ID:"+referenceId;
//          self.view.flxPaymentSuccessPopup.setVisibility(true);  
              if (referenceId || !referenceId) {
                self.view.lblReferenceID.text = "Reference ID: " + referenceId;
                self.view.flxPaymentSuccessPopup.setVisibility(true);
              } else {
                // Data missing in response
//                 self.view.lblOops.text = "Response received, but missing reference ID.";
//                 self.view.flxOops.setVisibility(true);
//                 self.view.SmthngWentWrong.lblSomethingWentWrong.text =  "Response received, but missing reference ID.";
//                 self.view.SmthngWentWrong.setVisibility(true);
              }

            } 
            
            catch (e) {
//               alert(" Response parse error: " + e.message);
               self.view.lblOops.text = "Error parsing response: " + e.message;
              
               self.view.SmthngWentWrong.lblSomethingWentWrong.text = 
                 "Error parsing response: " + e.message
                self.view.SmthngWentWrong.setVisibility(true);
               
            }
          } else {
//             alert(" HTTP Error: " + request.status + " - " + request.responseText);
            
//              self.view.lblOops.text = "HTTP Error " + request.status + ": " + request.responseText;
            
               self.view.lblOops.text = 
                 "HTTP Error " + request.status + ": " + request.responseText;
              
               self.view.SmthngWentWrong.lblSomethingWentWrong.text = 
                 "Error parsing response: " + e.message
                self.view.SmthngWentWrong.setVisibility(true);
           
          }
        }
      };

      request.send(JSON.stringify(payload));

    } catch (err) {
      voltmx.application.dismissLoadingScreen();
      alert(" Exception: " + err.message);
    }

    // }




  },
  
  
  
  
    setData: function () {
      var self = this;
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
      this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

       this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
//     this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
//         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;
 
      if(isArabic)
        {
          self.view.flxBranchDownArrow.left = "";
    self.view.flxBranchDownArrow.right = "85%";
        self.view.flxBranchUparrow.left = "";
    self.view.flxBranchUparrow.right = "85%";
      self.view.flxBranchesNmae.left = "";
      self.view.flxBranchesNmae.right = "30dp";
        self.view.tbxBranchName.left = "";
          self.view.tbxBranchName.right = "6%";
        }
      else
        {
          self.view.flxBranchDownArrow.left = "85%";
    self.view.flxBranchDownArrow.right = "";
          self.view.flxBranchUparrow.left = "85%";
    self.view.flxBranchUparrow.right = "";
        self.view.flxBranchesNmae.left = "30dp";
      self.view.flxBranchesNmae.right = "";
           self.view.tbxBranchName.left = "6%";
          self.view.tbxBranchName.right = "";
        }
  
//   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  // List of label widget IDs to apply alignment
  var labelList = [
   "lblContactUs","lblContactOptions","lblContent","lblEmailUs","lblContent01",
    "lblLiveChat","lblContent02","lblNeedhelpfast","txtName","txtLastname","txtEmail",
    "txtPhone","textareaComplaint","tbxBranchName"
  ];

  // Apply alignment to labels
  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }

        if(isArabic)
         {
            var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;
         }
         else
           {
             this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
           }

  var flexList = [
    "flxContactUs",
  "flxImglbl","flxContent","flxImgLbl01","flxContent01","flxImglbl02",
    "flxImglbl03","flxContent03","flxImglbl04","flxRadioButton",
    "flxPhone","flxEmail","flxBoth"
    
    
  ];

  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

  this.view.lblThankYou.text = voltmx.i18n.getLocalizedString("Speak with Our Support Team");
//   this.view.lblContactYouShortly.text = voltmx.i18n.getLocalizedString("Contact Us");
  this.view.btnGoToHome.text = voltmx.i18n.getLocalizedString("closeCaps");
  this.view.lblContactUs.text=voltmx.i18n.getLocalizedString("Contact Us");
  this.view.lblContactOptions.text=voltmx.i18n.getLocalizedString("Contact Options");
  this.view.lblContent.text=voltmx.i18n.getLocalizedString("Availabletime");    
  this.view.lblEmailUs.text=voltmx.i18n.getLocalizedString("Email Us");
  this.view.lblContent01.text=voltmx.i18n.getLocalizedString("We usually reply within 1 business day");
  this.view.lblLiveChat.text=voltmx.i18n.getLocalizedString("live chat");   
      this.view.lblContent02.text=voltmx.i18n.getLocalizedString("We usually reply within 1 business day");
    this.view.lblNeedhelpfast.text=voltmx.i18n.getLocalizedString("need help fast?");
      this.view.lblContent03.text=voltmx.i18n.getLocalizedString("Check out our FAQ section for quick answers and self-service options.");
    this.view.lblreportAnIssue.text=voltmx.i18n.getLocalizedString("Report an Issue");
     this.view.txtName.placeholder=voltmx.i18n.getLocalizedString("First name");
     this.view.txtLastname.placeholder = voltmx.i18n.getLocalizedString("Last name");
   this.view.txtEmail.placeholder=voltmx.i18n.getLocalizedString("Email");
   this.view.txtPhone.placeholder=voltmx.i18n.getLocalizedString("phone");
   this.view.textareaComplaint.placeholder=voltmx.i18n.getLocalizedString("Enquiries"); 
      this.view.btnCallOurSupportTeam.text=voltmx.i18n.getLocalizedString("Call Our Support Team")
      this.view.lblPhone.text=voltmx.i18n.getLocalizedString("phone");
    this.view.lblEmail.text=voltmx.i18n.getLocalizedString("Email"); 
    this.view.lblBoth.text=voltmx.i18n.getLocalizedString("both"); 
      this.view.lblBranchname.text = voltmx.i18n.getLocalizedString("Topic");
      this.view.btnSubmit.text=voltmx.i18n.getLocalizedString("Submit").toUpperCase();
      
}

 

 });