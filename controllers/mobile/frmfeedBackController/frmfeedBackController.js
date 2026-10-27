define({ 

 onNavigate: function()
  {
    
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxrating1.onClick=this.ratingOnClick01.bind(this);
    this.view.flxrating2.onClick=this.ratingOnClick02.bind(this);
     this.view.flxrating3.onClick=this.ratingOnClick03.bind(this);
     this.view.flxrating4.onClick=this.ratingOnClick04.bind(this);
     this.view.flxrating5.onClick=this.ratingOnClick05.bind(this);
  },
  
  onPreShow: function()
  {
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
  this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
   this.view.Footer2.lblSellCar.skin = "sknlblCPBoldCapt181818Font100"; 
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = "My Bids";
    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
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
  
  
  ratingOnClick01: function(){
     if(this.view.star01.isVisible===true){
       this.view.star01.setVisibility(false);
       this.view.starrated01.setVisibility(true);
     }
    else{
      this.view.star01.setVisibility(true);
       this.view.starrated01.setVisibility(false);
    }
  },
  
  
  ratingOnClick02: function(){
     if(this.view.star02.isVisible===true){
       this.view.star02.setVisibility(false);
       this.view.starrated02.setVisibility(true);
     }
    else{
      this.view.star02.setVisibility(true);
       this.view.starrated02.setVisibility(false);
    }
  },
  
  ratingOnClick03: function(){
     if(this.view.star03.isVisible===true){
       this.view.star03.setVisibility(false);
       this.view.starrated03.setVisibility(true);
     }
    else{
      this.view.star03.setVisibility(true);
       this.view.starrated03.setVisibility(false);
    }
  },
  
  ratingOnClick04: function(){
     if(this.view.star04.isVisible===true){
       this.view.star04.setVisibility(false);
       this.view.starrated04.setVisibility(true);
     }
    else{
      this.view.star04.setVisibility(true);
       this.view.starrated04.setVisibility(false);
    }
  },
  
  ratingOnClick05: function(){
     if(this.view.star05.isVisible===true){
       this.view.star05.setVisibility(false);
       this.view.starrated05.setVisibility(true);
     }
    else{
      this.view.star05.setVisibility(true);
       this.view.starrated05.setVisibility(false);
    }
  },

 });