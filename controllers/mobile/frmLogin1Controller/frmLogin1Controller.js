define({ 

 //Type your controller code here 
  onNavigate: function(){
    this.view.flxFooter.onClick = this.NavigateToSignUpForm;
    this.view.btnSubmit.onClick = this.loginAction;
  },
  NavigateToSignUpForm: function(){
    var ntf = new voltmx.mvc.Navigation("frmScreen3OTP1");
    ntf.navigate();
  },
loginAction: function(){
 var self = this;
    function INVOKE_SERVICE_Success(response) {
        var ntf = new voltmx.mvc.Navigation("frmScreen1DashBoard");
        ntf.navigate({
            "variable_email": email,
            "txtEmail_text":self.view.txtEmail.text,
            "_meta_": {
                "eventName": "onClick",
                "widgetId": "btnSubmit"
            }
        });
      
    }
    function INVOKE_SERVICE_Failure(error) {}

        var login_inputparam = login_inputparam|| {};
    
    login_inputparam["serviceID"] = "UserRepo$login";
    login_inputparam["operation"] = "login";
    login_inputparam["userid"] = self.view.txtEmail.text;
    login_inputparam["password"] = self.view.txtPassword.text;
    UserRepo$login = mfidentityserviceinvoker("UserRepo", login_inputparam, INVOKE_SERVICE_Success, INVOKE_SERVICE_Failure);
}

 });