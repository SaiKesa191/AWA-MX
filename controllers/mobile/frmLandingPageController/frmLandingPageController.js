define({ 
onNavigate: function(){
  this.view.btnBuyer.onClick = this.BuyerLogin;
  this.view.btnSeller.onClick = this.sellerLogin;
    
},
  
  BuyerLogin: function(){
    var ntf = new voltmx.mvc.Navigation("frmScreen2Login");
    ntf.navigate();
  },
  sellerLogin: function(){
    var ntf = new voltmx.mvc.Navigation("frmScreen2Login");
    ntf.navigate();
  }

 });