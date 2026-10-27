define({ 

onNavigate: function(){
  
  this.view.btnbackToContactUs.onClick= this.btnOnclick.bind(this);
  this.view.preShow = this.onPreShow.bind(this);
  this.setData();
},
  
  
  btnOnclick: function(){
    
  var goto=  new voltmx.mvc.Navigation("frmContactUS");
    goto.navigate();
    
    
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
  this.view.Footer2.flxHL5.setVisibility(true);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
   this.view.Footer2.lblSellCar.skin = "sknLblDubaid3243714pxBold"; 
    
       var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
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
  
  
  setData: function()
  {
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
    
    this.view.lbllivcChat.text = voltmx.i18n.getLocalizedString("livechatcoming");
     this.view.lblLiveChatComingSoon.text = voltmx.i18n.getLocalizedString("ourlivechatfeature");
    this.view.lblReachOut.text = voltmx.i18n.getLocalizedString("livechatcoming");
    this.view.lblEmail.text = voltmx.i18n.getLocalizedString("Email") + " : etcares@et.ae";
    this.view.lblPhone.text = voltmx.i18n.getLocalizedString("phone") + " : +971 8006006";
    this.view.btnbackToContactUs.text = voltmx.i18n.getLocalizedString("backToContactUs");
  }
  
  
  
 });


