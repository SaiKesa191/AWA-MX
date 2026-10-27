define(function() {
 
	return {
      init: function() {
        // Bind event here
        this.view.flxNotifications.onClick = this.onNotificationClick.bind(this);
        //this.view.btnChangeLang.onClick = this.chchangeApplicationCurrentLocale.bind(this);
      },
 
        onNotificationClick: function() {
//           var userId  = voltmx.store.setItem("userId", userId);
//        var userToken = voltmx.store.setItem("getUserAccesstoken", getUserAccesstoken);
          var isLogin = voltmx.store.getItem("isLogin");
          if(isLogin){
             new voltmx.mvc.Navigation("frmNotifiction22").navigate();
          }
          else{
            new voltmx.mvc.Navigation("frmLoginScreen").navigate();
          }
          
            },
      
      changeApplicationCurrentLocale: function() 
      { 
        var currentLocale = voltmx.i18n.getCurrentLocale();
      //var selectedLang= this.view.btnChangeLang.text;
       
//         alert("currentLocale :"+currentLocale);
      var currentLocalToSet;
      if(currentLocale === 'en_IN'){
       // this.view.btnChangeLang.text ="Eng";
        voltmx.store.setItem("currentLocale","ar");
        this.view.btnChangeLang.text = "EN";
        currentLocalToSet = 'ar_AE';
//         alert("currentLocalToSet :"+currentLocalToSet);
      }
      else{
        // this.view.btnChangeLang.text ="عربي";
        voltmx.store.setItem("currentLocale","en");
        currentLocalToSet = 'en_IN';
         this.view.btnChangeLang.text = "العربية";
        // alert("currentLocalToSet :"+currentLocalToSet);
      }
      voltmx.i18n.setCurrentLocaleAsync(currentLocalToSet, currentLocaleChangeSuccess, currentLocaleChangeFailure);
      function currentLocaleChangeSuccess () {
        var ntf = new voltmx.mvc.Navigation("frmLangChange");
        ntf.navigate();
      }
      function currentLocaleChangeFailure () {
//         alert("Error while changing the current application locale");
      }
    }
       
	};
});
 