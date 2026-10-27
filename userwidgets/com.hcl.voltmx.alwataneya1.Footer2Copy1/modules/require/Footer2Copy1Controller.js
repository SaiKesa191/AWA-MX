define(function() {
    return {
        onNavigate: function() {
            if (this.view.flxSellCar ) {
                this.view.flxSellCar.onClick = this.SellCarNavigation.bind(this);
            }
//             if (this.view.flxHome) {
//                 this.view.flxHome.onClick = this.dashBoardNavigation.bind(this);
//             }
          return this.dashBoardNavigation.call(this);
        },

        SellCarNavigation: function() {
            // If User Exists Navigate to Sell Car List Page or Login Page
          var isLogin = voltmx.store.getItem("isLogin");
          alert("IsLogin :"+isLogin);
          if(isLogin === true){
                var ntf1 = new voltmx.mvc.Navigation("frmSellCarList12");
            ntf1.navigate();
          }
          else{
              var ntf2= new voltmx.mvc.Navigation("frmScreen2Login");
            ntf2.navigate();
          }
          
        },

        dashBoardNavigation: function() {
            var ntf = new voltmx.mvc.Navigation("frmDashBoard");
            ntf.navigate();
        }
    };
});
// function AS_FlexContainer_cf02184a4ef0446d9c75882b067988a6(eventobject) {
//     var self = this;
//     return self.dashBoardNavigation.call(this);
// }