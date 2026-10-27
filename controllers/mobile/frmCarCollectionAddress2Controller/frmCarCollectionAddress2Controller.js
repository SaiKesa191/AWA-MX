define({
   //navData: {},
  
  onNavigate: function () {
    //this.navData = data || {};
    this.setData();
    this.view.btnConfirnCollectionPoint.onClick = this.navToNextForm.bind(this);
  },
  
 navToNextForm: function()
  {
    var from = this.view.lblLoc1.text;
    var to = this.view.lblLoc2.text;
    var data = voltmx.store.getItem("pickupData");
    data.from = from;
    data.to = to;
    voltmx.store.setItem("pickupData", data);
    var navObj = new voltmx.mvc.Navigation("frmCarCollectionAddress3");
    navObj.navigate();
  },
  setData: function()
  {

    if(voltmx.i18n.getCurrentLocale() === "ar_AE")
    {
      this.view.lblTittle.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
      this.view.flxUnderLineContainer.reverseLayoutDirection = true; 
      
    }
    else
    {
      this.view.lblTittle.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
       this.view.flxUnderLineContainer.reverseLayoutDirection = false; 
      
     
    }

  }
  
  

});
