define(function() {

	return {
      onNavigate: function(){
        this.view.flxSellCar.onClick = this.SellCarNavigation.bind(this);
       this.view.flxHome.onClick = this.navigateToDashboard.bind(this);
        this.view.flxAuctions.onClick = this.navigateToAllAuctions.bind(this);
//         this.view.flxProfile.onClick = this.flxProfileOnClickAction.bind(this);
      },
         SellCarNavigation: function(){
           //If User Exists Navigate to sell Car List Page or Login Page!!x
//            alert(this.view.flxProfile.isVisible+"flxProfileIsVisisblre");
           var self = this;
           try{
           if(self.view.flxProfile && self.view.flxProfile.isVisible){
               var ntf= new voltmx.mvc.Navigation("frmProfile");
           ntf.navigate();
           }
           else if(self.view.imgSellCar.isVisible){
           var ntf2= new voltmx.mvc.Navigation("frmLoginScreen");
           ntf2.navigate();
           }
           }
           catch(e){
             voltmx.print(e);
           }
         },
      navigateToDashboard: function(){
        var x = new voltmx.mvc.Navigation("frmDashBoard");
        x.navigate();
      },
      navigateToAllAuctions: function()
      {
          var x = new voltmx.mvc.Navigation("frmAuctionCategories");
        x.navigate();
      },
      
     navigateToMyBidsPage: function()
      {
        if(voltmx.store.getItem("isLogin")){
          if(voltmx.store.getItem("mode") === "buyer"){
        var x = new voltmx.mvc.Navigation("frmMyBidsPage");
        x.navigate();
      }
         else{
           new voltmx.mvc.Navigation("frmMyListings").navigate();
       
        }
        }
       
      else{
      new voltmx.mvc.Navigation("frmLoginScreen").navigate();
    }
      },
      
   navigateToFilters: function()
      {
         var currentForm = voltmx.application.getCurrentForm().id;
         voltmx.store.setItem("filtersBackPage", currentForm);
        if(currentForm === "frmSealedAuctionsList")
          voltmx.store.setItem("isSilentFilter", true);
        else voltmx.store.setItem("isSilentFilter", false);
        
         new voltmx.mvc.Navigation("frmFiltersNew").navigate();
      }
      
      
//       flxProfileOnClickAction: function(){
//          var ntf3= new voltmx.mvc.Navigation("frmMenuBar");
//            ntf3.navigate();
//       }
	};
});