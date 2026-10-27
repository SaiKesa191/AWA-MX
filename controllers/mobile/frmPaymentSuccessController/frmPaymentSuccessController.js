define({ 

 onNavigate: function(){
   this.view.btnPreferences.onClick = () =>{
     new voltmx.mvc.Navigation("frmSelectPreferences").navigate();
   }
   //this.view.flxContactUs.onClick = this.navContactUs;
 },
  navContactUs: function(){
    var ntf = new voltmx.mvc.Navigation("frmContactUS");
    ntf.navigate();
  },
  

 });