define({ 

 onNavigate: function()
  {
    this.setData();
    
    
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmOpenHelp").navigate();
    }.bind(this);
    this.view.flxAddress1Direction.onClick = this.flxAddress1DirectionOnClick;
    this.view.flxAddress2Direction.onClick = this.flxAddress2DirectionOnClick;
  },
//   ===========================
    
//     var coords = null;

// if (item.location_map && item.location_map.includes(",")) {
//     coords = item.location_map.split(",");
// }

   
//   this.view.mapLocation.locationData = [
//   {
//     lat: coords && coords[0] ? coords[0].trim() : "25.2048",
//     lon: coords && coords[1] ? coords[1].trim() : "55.2708",
//     name: item.location || "",
//     desc: item.location || "",
//     showcallout: true
//   }
// ];
//   =======================
    
  onPreShow: function()
  {
    this.toggleFooterIcons();
    this.map1();
    this.map2();
    
  },
  map1: function(){
    
    this.view.map1.locationData = [{
// 25.3335516,55.3905231
        lat        : "25.3335516",
        lon        : "55.3905231",
        name       : "7JJC+FQ9 - Unnamed Road - Sharjah - United Arab Emirates",
        desc       : "Sharjah",
        showCallout: true,
       calloutData: {
        lbl1: "Sharjah Transport Solutions LLC", // ✅ Text shown in callout (can be any key mapped in widgetDataMap)
//             lbl2: "Open 9am–6pm", // optional second line
//         img1: "icon_location_pin.png" // optional image if you want
    }
    }];
    voltmx.print("MapData"+JSON.stringify( this.view.map1.locationData));
    voltmx.print("MapDataName"+JSON.stringify( this.view.map1.locationData[0].name));
    this.view.lblAddress1Text.text =  this.view.map1.locationData[0].name;
    this.view.lblAddress1.text =  this.view.map1.locationData[0].desc;
  },
  
  map2: function(){
    this.view.map2.locationData = [{
// 24.3547473,54.4582753
        lat        : "24.3547473",
        lon        : "54.4582753",
        name       : "14th St - Musaffah - Musaffah Industrial - Abu Dhabi - United Arab Emirates",
        desc       : "Abu Dhabi",
        showCallout: true,
       calloutData: {
        lbl1: "Abu Dhabi"
    }
    }];
    voltmx.print("MapData"+JSON.stringify( this.view.map2.locationData));
    voltmx.print("MapDataName"+JSON.stringify( this.view.map2.locationData[0].name));
    this.view.lblAddress2text.text =  this.view.map2.locationData[0].name;
    this.view.lblAddress2.text =  this.view.map2.locationData[0].desc;
  },
  
flxAddress1DirectionOnClick: function () {
  //Sharjah
  var lat = "25.3335516";
  var lon = "55.3905231";
  var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
  voltmx.application.openURL(url);
},
  
flxAddress2DirectionOnClick: function () {
  //Abu Dhabi
  var lat = "24.3547473";
  var lon = "54.4582753";
  var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
  voltmx.application.openURL(url);
},
  
  navToOpenHelp: function()
  {
    new voltmx.mvc.Navigation("frmOpenHelp").navigate();
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
  

   setData: function () {
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

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
  // Determine alignment and direction
  var alignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT :
  constants.CONTENT_ALIGN_MIDDLE_LEFT;
  var direction = isArabic;

  

  var labelList = [
      "lblFindBranch","lblAddress1","lblAddress1Text","lblDirection1",
    "lblAddress2","lblAddress2text","lblDirection2"
  ];


  for (var i = 0; i < labelList.length; i++) {
    if (this.view[labelList[i]]) {
      this.view[labelList[i]].contentAlignment = alignment;
    }
  }


  var flexList = [
    "flxAddress1Direction","flxAddress2Direction","flxFindBranch"
  ];


  for (var j = 0; j < flexList.length; j++) {
    if (this.view[flexList[j]]) {
      this.view[flexList[j]].reverseLayoutDirection = direction;
    }
  }

     this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");

     this.view.lblFindBranch.text=voltmx.i18n.getLocalizedString("Find Branches"); 
//      this.view.lblAddress1.text=voltmx.i18n.getLocalizedString("");
//      this.view.lblAddress1Text.text=voltmx.i18n.getLocalizedString("");
     this.view.lblDirection1.text=voltmx.i18n.getLocalizedString("Direction");
//      this.view.lblAddress2.text=voltmx.i18n.getLocalizedString("");
//      this.view.lblAddress2text.text=voltmx.i18n.getLocalizedString("");
     this.view.lblDirection2.text=voltmx.i18n.getLocalizedString("Direction");
     
     
}
  
 });