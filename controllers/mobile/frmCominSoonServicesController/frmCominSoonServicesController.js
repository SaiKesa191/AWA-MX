define({ 

  onNavigate: function()
  {
    this.setData();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnBrowseOtherCategories.onClick = this.auctionCatge;
//     alert('coming soon');
// alert("sucess");
  },
  
  onPreShow: function(){
    this.toggleFooterIcons();
  },
 
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(false);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
    
     this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
   this.view.Footer2.lblMyBids.skin = "sknLblDubai231f2014pxBold";
    
       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
    
    
    var isLogin =voltmx.store.getItem("isLogin");

    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
   auctionCatge: function(){
     var x = new voltmx.mvc.Navigation("frmDashBoard");
          x.navigate();
  },
  

    setData: function () {

  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
 
  // Determine alignment and direction
  this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

  var direction = isArabic;
 
  

//   this.view.lblChangeOfBuyer.contentAlignment= isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

  // List of label widget IDs to apply alignment

//   var labelList = [

//    ,"lblPara","lblSubHead"

//   ];
 
//   // Apply alignment to labels

//   for (var i = 0; i < labelList.length; i++) {

//     if (this.view[labelList[i]]) {

//       this.view[labelList[i]].contentAlignment = alignment;

//     }

//   }
 
  // List of Flex containers to reverse layout direction

//   var flexList = [
 
    

//   ];
 
// //   // Apply reverseLayoutDirection

//   for (var j = 0; j < flexList.length; j++) {

//     if (this.view[flexList[j]]) {

//       this.view[flexList[j]].reverseLayoutDirection = direction;

//     }

//   }
 
  

      this.view.lblComingSoon.text=voltmx.i18n.getLocalizedString("coming");
      this.view.lblSoon.text=voltmx.i18n.getLocalizedString("soon");

      this.view.lblSubHead.text=voltmx.i18n.getLocalizedString("EXITING THINGS ARE ON THE WAY!");

      this.view.lblPara.text=voltmx.i18n.getLocalizedString("Staytunedserivces");

      this.view.btnBrowseOtherCategories.text=voltmx.i18n.getLocalizedString("Gotodashboard");



 



}
 

 });