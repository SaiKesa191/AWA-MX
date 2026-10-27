define({ 

 onNavigate: function()
  {
   this.userid = voltmx.store.getItem("userId");
   this.view.preShow = this.onPreShow.bind(this); 
   this.view.postShow = this.onPostShow.bind(this);
    this.view.flxCloseBidAmountSelection.onClick = this.closeBidAmountContainer.bind(this);
    this.view.flxRemoveBidSuccessPopup.onClick =  function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
    this.view.btnCloseBidSuccessPopUp.onClick = function() {
      this.view.flxBidSuccessPopup.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
  
   this.view.btnAutoBidCall.onClick = this.invokeAutoBidFunction.bind(this);
    
    this.view.flxCloseAutoBidAmountContainer.onClick = function()
    {
      this.view.flxAutoBidAmountContainer.setVisibility(false);
      this.view.flxOverLay.setVisibility(false);
    }.bind(this);
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
    }.bind(this);
    
  },
  
  onPreShow: function()
  {
     this.toggleFooterIcons();
    this.invokeLostBidsService();
      this.closeBidAmountContainer();
    
    
  },
  
  toggleFooterIcons: function(){
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
    
      var mode = voltmx.store.getItem("mode");
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
  
    onPostShow: function()
  {
    this.view.btn500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"500");
    this.view.btn1000AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1000");
    this.view.btn1500AED.onClick = this.selectBidAmountAddIntoTextBox.bind(this,"1500");
    this.view.btnBidNow.onClick = this.invokeFryWfAuctionBidding.bind(this);
    
    this.view.flxCheckBox.onClick = () => {
       
      if(this.view.imgCheck.isVisible)
        {
          this.view.imgCheck.setVisibility(false);
          this.view.btnBidNow.skin = "sknBtnBidcccccc8pxradius";
        }
      else{
        this.view.imgCheck.setVisibility(true);
          this.view.btnBidNow.skin = "sknBtnBid61B35C8pxradius";
        }
      };
       
    },
  
  insertIntoLostBidsSegment: function(records)
  {
    var self = this;
    this.view.segLostBids.widgetDataMap = {
      "lblObjID":"lblObjID",
      "lblAuctionID":"lblAuctionID",
      "imgCarPIcture":"imgCarPIcture",
      "lblCarname":"lblCarname",
      "lblTimerCount":"lblTimerCount",
      "lblLot":"lblLot",
      "lblLotNum":"lblLotNum",
      "lblTotalBids":"lblTotalBids",
      "lblTotalBidsCount":"lblTotalBidsCount",
      "lblLocation":"lblLocation",
      "lblLocationName":"lblLocationName",
      "flxLikeHeart":"flxLikeHeart",
      "imgHeart":"imgHeart",
      "lblCurrentBid":"lblCurrentBid",
      "lblPrice": "lblPrice",
      "btnBidNow":"btnBidNow",
      "flxAutoBid":"flxAutoBid",
      "imgAutoBidicon":"imgAutoBidicon",
      "lblAutoBid":"lblAutoBid"
    };
    
     var data = [];
    self.view.segLostBids.removeAll();
    if(records && records.length>0)
      {
        
        for(var i =0;i<records.length;i++){
            var item = records[i];
          var bidrateSkin = (item.winning_bidder === this.userid) ? "sknLblCronosProd0290512Bold22px" : "sknLblDubaid3243720pxbold";
          var objid = item.object_id;
          var aucid = item.auction_id;
          var price = item.max_bid;
          var highestbidder = item.winning_bidder;
          
           var isFavouriteskin = item.is_favourite === "true" 
        ? "sknFlxd32437custom120pxround" 
        : "sknFlx231f20custom120pxround";

        var whichImage = item.is_favourite === "true" 
        ? "heartlikerecommended.png" 
        : "imgdislikenew.png";
          
        data.push({
      "imgCarPIcture": item.file_url,
      "lblCarname": item.title,
      "lblObjID": item.object_id,
      "lblTimerCount": item.bid_close_date,
      "lblLot": "Lot #",
      "lblLotNum": item.lot_no,
      "lblTotalBids": "Total Bids",
      "lblTotalBidsCount": item.no_of_bids,
      "lblLocation": "Location",
      "lblLocationName": item.location,
      "lblAuctionID": item.auction_id,
      "flxLikeHeart": {
        "skin": isFavouriteskin,
         "onClick": this.addActiveToWishList.bind(this,objid,aucid)
       
      },
      "imgHeart": whichImage,
      "lblCurrentBid": "CURRENT BID",
      "lblPrice": {
        "text": "AED " +  item.max_bid,
        "skin": bidrateSkin
      },
      "flxAutoBid": {
        "onClick": this.enableAutoBid.bind(this, objid, aucid)
      },
      "imgAutoBidicon": "autobidnewone.png",
      "lblAutoBid": "AUTO BID",
      "btnBidNow": {
        "onClick": this.openBidAmountContainer.bind(this, objid, aucid, price, highestbidder)
      }
    });
        } 
     self.view.segLostBids.addAll(data);
      }
    else{
      alert('no favourites');
    }
    
  },
    addActiveToWishList: function(objid,aucid)
  {
    var self = this;
  var selectedRow = this.view.segLostBids.selectedRowItems;
  if (!selectedRow || selectedRow.length === 0) {
    voltmx.print("No row is selected");
    return;
  }

  var rowData = selectedRow[0];
  var rowIndex = this.view.segLostBids.selectedRowIndex[1];

  var isAlreadyLiked = rowData.imgHeart === "heartlikerecommended.png";

  var callback = function(success, message) {
    if (success) {
      // Update UI based on action
      if (isAlreadyLiked) {
        rowData.imgHeart = "imgdislikenew.png";
        rowData.flxLikeHeart.skin = "sknFlx231f20custom120pxround";
      } else {
        rowData.imgHeart = "heartlikerecommended.png";
        rowData.flxLikeHeart.skin = "sknFlxd32437custom120pxround";
      }

      self.view.segLostBids.setDataAt(rowData, rowIndex);
    } else {
      alert("Favorite toggle failed: " + message);
    }
  };

  if (isAlreadyLiked) {
    self.invokeRemoveTrackedObject(objid, aucid, callback);
  } else {
    self.invokeAddTrackedObject(objid, aucid, callback);
  }
    
  },
    
   invokeAddTrackedObject: function(objid,aucid,callback)
  {
    
    var usertoken = voltmx.store.getItem("getUserAccesstoken");

  var inputParam = {
    serviceID: "ms_buyer$add-tracked-object",
    auction_id: aucid,
    object_id: objid,
    type: "favorites",
    httpheaders: {
      user_token: usertoken
    },
    httpconfig: {}
  };

  function addCallBack(status, response) {
    voltmx.print("Add Favorite Response: " + JSON.stringify(response));

    if (response.opstatus === 0 && response.message === "Asset added to favorites list") {
      callback(true, response.message);
    } else {
      callback(false, response.message || "Unknown error");
    }
  }

  mfintegrationsecureinvokerasync(inputParam, "ms_buyer", "add-tracked-object", addCallBack);


    
  },
  
  invokeRemoveTrackedObject: function(objid, aucid, callback) {
  var usertoken = voltmx.store.getItem("getUserAccesstoken");

  var inputParam = {
    serviceID: "ms_buyer$remove-tracked-object",
    auction_id: aucid,
    object_id: objid,
    type: "favorites",
    httpheaders: {
      user_token: usertoken
    },
    httpconfig: {}
  };

  function removeCallBack(status, response) {
    voltmx.print("Remove Favorite Response: " + JSON.stringify(response));

    if (response.opstatus === 0 && response.message === "Asset removed to favorites list") {
      callback(true, response.message);
    } else {
      callback(false, response.message || "Unknown error");
    }
  }

  mfintegrationsecureinvokerasync(inputParam, "ms_buyer", "remove-tracked-object", removeCallBack);
},
  
     openBidAmountContainer: function(objid,aucid,price,highestbidder){
    var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin)
      {
        
        if(highestbidder !== this.userid){
        
     var selectedData = this.view.segLostBids.selectedRowItems[0];
//     this.currentAmount = price;
    this.objid = objid;
    this.aucid = aucid;
          
    
    var amountText = selectedData.lblPrice.text;  // "AED 23500.00"
    var amountOnly = amountText.replace("AED", "").trim();
    this.currentAmount = Number(amountOnly);
    this.view.flxBidAmountSelectionContainer.setVisibility(true);
    this.view.imgCheck.setVisibility(false);
    this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    this.view.tbxBidAmount.text = "";
    this.view.flxOverLay.setVisibility(true);
      }
        else{
          alert('You are already a highest bidder');
        }
      }
        
    else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },
  
   enableAutoBid: function(objid,aucid){
    var isLogin = voltmx.store.getItem("isLogin");
    if(isLogin){
    this.view.tbxAutoBidAmount.text = "";
    this.objIdForAutoBid = objid;
    this.aucIdForAutoBid = aucid;
   this.view.flxOverLay.setVisibility(true);
   this.view.flxAutoBidAmountContainer.setVisibility(true);
    }
     else{
      var x = new voltmx.mvc.Navigation("frmLoginScreen");
      x.navigate();
    }
  },
  
  closeBidAmountContainer: function(){
    this.view.flxBidAmountSelectionContainer.setVisibility(false);
    this.view.flxOverLay.setVisibility(false);
  },
   
  selectBidAmountAddIntoTextBox: function(amount){
    
    if(amount === "500"){
       this.view.btn500AED.skin = "sknBtnd32437DubaiFFFFFF20px";
      this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
      this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    }
    else if(amount === "1000"){
      this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
      this.view.btn1000AED.skin = "sknBtnd32437DubaiFFFFFF20px";
      this.view.btn1500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
    }
    else 
      {
        this.view.btn500AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
      this.view.btn1000AED.skin = "sknBtnCCCCCCBorderDubai75778620px";
      this.view.btn1500AED.skin = "sknBtnd32437DubaiFFFFFF20px";
      }
    
    this.view.tbxBidAmount.text = this.currentAmount + Number(amount) +" AED";
    this.vehicleHike = amount;
    
  },
  
   invokeAutoBidFunction: function()
  {
    
     if (this.view.tbxAutoBidAmount.text && this.view.tbxAutoBidAmount.text.trim() !== "") {
       
       var self = this;

       function invokeServiceCallBack(status, register_auto_bidding) {
         if (register_auto_bidding && register_auto_bidding.opstatus === 0 && register_auto_bidding.records && register_auto_bidding.records.length > 0){
           self.view.flxAutoBidAmountContainer.setVisibility(false);
          
           self.view.lblSuccessMsg.text = "Auto Bid Activated Successfully";
            self.view.flxBidSuccessPopup.setVisibility(true);
         }

    }
    if (register_auto_bidding_inputparam == undefined) {
        var register_auto_bidding_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var maxBidAmount = self.view.tbxAutoBidAmount.text;
    register_auto_bidding_inputparam["serviceID"] = "fry_int_auctions$auction-register-auto-bid";
    register_auto_bidding_inputparam["auction_id"] = this.aucIdForAutoBid;
    register_auto_bidding_inputparam["bid_by"] = userid;
    register_auto_bidding_inputparam["bid_max_amount"] = maxBidAmount;
//     register_auto_bidding_inputparam["bid_min_value"] = "200";
    register_auto_bidding_inputparam["object_id"] = this.objIdForAutoBid;
    var register_auto_bidding_httpheaders = {
      "user_token":""
    };
    register_auto_bidding_inputparam["httpheaders"] = register_auto_bidding_httpheaders;
    var register_auto_bidding_httpconfigs = {};
    register_auto_bidding_inputparam["httpconfig"] = register_auto_bidding_httpconfigs;
    fry_int_auctions$register_auto_bidding = mfintegrationsecureinvokerasync(register_auto_bidding_inputparam, "fry_int_auctions", "auction-register-auto-bid", invokeServiceCallBack);
       }
    else{
       alert('Enter Max. Bid Amount');
    }
  },
  
    invokeFryWfAuctionBidding: function()
  {
    if(this.view.tbxBidAmount.text.trim() !== "")

      
      {
        
        if(this.view.imgCheck.isVisible){
         var self = this;
     voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
   function invService(status, auction_bidding) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("Status: " + status);
        voltmx.print("Response: " + JSON.stringify(auction_bidding));

        // Check for successful HTTP response and opstatus
        if (
            auction_bidding &&
            auction_bidding.opstatus === 0 &&
            auction_bidding.httpresponse &&
            auction_bidding.httpresponse.responsecode === 200
        ) {
            var msg = auction_bidding.message;
            
            if (msg === "Your bid is valid and accepted.") {
              if( self.view.lblSuccessMsg){
                self.view.lblSuccessMsg.text = "Your Bid Has Been Placed Successfully";
              }
                self.closeBidAmountContainer();
                self.view.flxBidSuccessPopup.setVisibility(true);
                self.updateSegmentWithUpdatedBidRate();
            } else if (msg) {
                alert(msg);  // Show server-provided message
            } else {
                alert("Unknown response from server.");
            }
        } else {
            alert("Failed to place bid. Please check your connection or try again.");
        }
    }
    if (auction_bidding_inputparam == undefined) {
        var auction_bidding_inputparam = {};
    }
     var userid = voltmx.store.getItem("userId");
    auction_bidding_inputparam["serviceID"] = "fry_wf$manual-auction-bidding";
    auction_bidding_inputparam["user_id"] = userid;
    auction_bidding_inputparam["vehicle_amount"] = this.currentAmount;
    auction_bidding_inputparam["bid_hike"] = Number(this.vehicleHike);
        auction_bidding_inputparam["auction_id"] = this.aucid;
//         auction_bidding_inputparam["bid_type"] = "";
        auction_bidding_inputparam["object_id"] = this.objid;
    var auction_bidding_httpheaders = {
      "user_token": ""
    };
    auction_bidding_inputparam["httpheaders"] = auction_bidding_httpheaders;
    var auction_bidding_httpconfigs = {};
    auction_bidding_inputparam["httpconfig"] = auction_bidding_httpconfigs;
    fry_wf$auction_bidding = mfintegrationsecureinvokerasync(auction_bidding_inputparam, "fry_wf", "manual-auction-bidding", invService);
      }
        
       else{
         alert('select check box..!');
       } 
       
      }
    else{
      alert('text box should not be empty');
    }
  },
  
    updateSegmentWithUpdatedBidRate: function()
  {
    
    var selIndex = this.view.segLostBids.selectedRowIndex;
    var rowData = this.view.segLostBids.selectedRowItems[0];
    rowData.lblPrice = "AED " + (this.currentAmount + Number(this.vehicleHike));
    rowData.lblPrice = {
    "text": "AED " + (this.currentAmount + Number(this.vehicleHike)),
    "skin": "sknLblDubai02905120pxBold"
  };
//     rowData.lblTotalBidsCount = Number(rowData.lblTotalBidsCount) + 1;
    this.view.segLostBids.setDataAt(rowData, selIndex[1]);
  
  },
  
  invokeLostBidsService: function()
  {
    var self = this;

    function serviceCallBack(status, get_buyer_my_lost_bids) {
      voltmx.print(get_buyer_my_lost_bids);
      if (
        get_buyer_my_lost_bids &&
        get_buyer_my_lost_bids.opstatus === 0 &&
        get_buyer_my_lost_bids.httpresponse &&
        get_buyer_my_lost_bids.httpresponse.responsecode === 200 &&
        Array.isArray(get_buyer_my_lost_bids.records)
      ) {
        var records = get_buyer_my_lost_bids.records;
        // Now safe to pass to your segment function
        self.insertIntoLostBidsSegment(records);
      } else {
        voltmx.print("Invalid response or no records found.");
        alert("Failed to fetch lost bids. Please try again.");
      }

    }
    if (get_buyer_my_lost_bids_inputparam == undefined) {
      var get_buyer_my_lost_bids_inputparam = {};
    }
    var userid = voltmx.store.getItem("userId");
    var usertoken = voltmx.store.getItem("getUserAccesstoken");
    get_buyer_my_lost_bids_inputparam["serviceID"] = "fry_int_buyer$get-buyer-my-lost-bids";
    get_buyer_my_lost_bids_inputparam["user_id"] = userid;
     
    get_buyer_my_lost_bids_inputparam["page"] = "1";
    get_buyer_my_lost_bids_inputparam["pageSize"] = "10";
    var get_buyer_my_lost_bids_httpheaders = {
      "user_token": usertoken
    };
    get_buyer_my_lost_bids_inputparam["httpheaders"] = get_buyer_my_lost_bids_httpheaders;
    var get_buyer_my_lost_bids_httpconfigs = {};
    get_buyer_my_lost_bids_inputparam["httpconfig"] = get_buyer_my_lost_bids_httpconfigs;
    fry_int_buyer$get_buyer_my_lost_bids = mfintegrationsecureinvokerasync(get_buyer_my_lost_bids_inputparam, "fry_int_buyer", "get-buyer-my-lost-bids", serviceCallBack);

  },


  
  
 });