define({ 

  //Type your controller code here 
  onNavigate: function(){
    
    this.view.imgCheck.setVisibility(false);
    this.view.imgCheckTerms.setVisibility(false);
   
    
    this.view.btnMultipleSubmit.setEnabled(false);
    this.view.btnMultipleSubmit.skin = "sknBtnececec8pxradius";
//     this.invokeUploadFleetDoc();
    this.view.flxClose.onClick = this.closeOnClickAction;
    this.view.btnMultipleSubmit.onClick = this.invokeCreateMulipleFleet.bind(this);
    this.view.flxDownArrowCategory.onClick = this.CategoryDownArrow;
    this.view.flxUpArrowCategory.onClick = this.CategoryUpArrow;
    this.view.flxsubcatageoryDownArrow.onClick = this.SubCategoryDownArrow;
    this.view.flxSubcatagryUparrow.onClick = this.SubCategoryUpArrow;
    this.view.flxBranchDownArrow.onClick = this.BranchDownArrow;
    this.view.flxBranchUparrow.onClick = this.BranchUpArrow;
    this.view.flxYearOfMakeDownArrow.onClick = this.YearOfMakeDownArrowAction;
    this.view.flxYearOfMakeUpArrow.onClick = this.YearOfMakeUpArrowAction;
    this.view.flxKeyDownArrow.onClick = this.flxKeyDownArrowAction;
    this.view.flxkeyUparrow.onClick = this.flxkeyUparrowAction;
    this.view.flxColorDownArrow.onClick = this.flxColorDownArrowAction;
    this.view.flxColorUpArrow.onClick = this.flxColorUpArrowAction;
    this.view.flxFuelUpArrow.onClick = this.flxFuelUpArrowAction;
    this.view.flxFuelDownArrow.onClick = this.flxFuelDownArrowAction;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.SegCatageoryList.onRowClick = this.segOnRowClickActionCategory;
    this.view.segSubcatageory.onRowClick = this.segOnRowClickSubCategoryAction;
    this.view.segYearOfMake.onRowClick = this.segYearOfMakeonRowClickAction;
    this.view.SegBranches.onRowClick = this.BranchesonRowClickAction;
    this.view.segKeys.onRowClick = this.keysonRowClickAction;
    this.view.segColor.onRowClick = this.colorOnRowClickAction.bind(this);
    this.view.btnSubmit.onClick = this.submitOnClickAction;
   this.view.segFuel.onRowClick=this.fuelTyperowclick;
    this.view.lbltermsAndConditions.onTouchEnd = ()=> {
      new voltmx.mvc.Navigation("frmTermsAnDConditions").navigate();
    };
    this.view.tbxMileagename.onTextChange = this.mileageTextChange.bind(this);
    this.view.tbxMinimumSellingPrice.onTextChange = this.minSellPriceTextChange.bind(this);
    this.view.tbxTargetSellingPrice.onTextChange = this.targetSellPriceTextChange.bind(this);
    this.view.tbxNumberPlate.onTextChange = this.numPlateTextChange.bind(this);
//     this.view.btnGoToHome.onClick = this.
    if (this.view.flxOverLay && this.view.flxBottomFileUpload) {
    this.view.flxOverLay.onClick = () => {
        this.view.flxBottomFileUpload.setVisibility(false);
        this.view.flxOverLay.setVisibility(false);
    };
      this.view.btnGoToHome.onClick = this.btnGoToHomeOnClick;
}
//     this.view.btnSubmitForUpload.onClick = () => this.view.flxBottomFileUpload.setVisibility(false);
    this.view.flxChooseFromLibrary.onClick = this.chooseFromLibrary.bind(this);
    this.view.tbxCatageory.onTextChange = this.searchJournel.bind(this,"category");
    this.view.tbxSubcatageory.onTextChange = this.searchJournel.bind(this,"subcategory");
    this.view.tbxYearOfMaking.onTextChange = this.searchJournel.bind(this,"year");
    this.view.tbxBranchName.onTextChange =this.searchJournel.bind(this,"Branch");
    this.view.tbxKeyInnername.onTextChange =this.searchJournel.bind(this,"keys");
    this.view.tbxColorInner.onTextChange =this.searchJournel.bind(this,"color");
    this.view.tbxFuelTypeInner.onTextChange=this.searchJournel.bind(this,"fuel");
    
    this.view.btnSellCar.onClick = this.btnSellCarOnClick;
    this.view.btnSellMultiple.onClick = this.btnSellMultipleOnClick;
//     this.view.flxUploadDocuments.onClick = this.uploadDocuments.bind(this);
    this.view.flxUploadDocuments.onClick = () => {
    this.view.flxBottomFileUpload.setVisibility(true);
     this.view.flxOverLay.setVisibility(true);
    }
//     this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#ifdef android
    this.view.flxChooseFromFile.onClick = this.pdfCheck.bind(this);
    //#endif
     //#ifdef iphone
    this.view.flxChooseFromFile.onClick = this.testPDFNFIIOS.bind(this);
    //#endif
 
    
    this.view.flxImportExcel.onClick = this.excelCheck.bind(this);
     this.view.cam.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
//     this.view.flxDownLoadImportTemplate.onClick = this.downloadDynamicFile.bind(this);
    this.view.flxDownLoadImportTemplate.onClick = this.onDownloadButtonClickOfTemplate.bind(this);
   this.view.flxCheckBoxPickup.onClick = () => {
    this.pickup = !this.pickup; // Toggle the flag

    if (this.pickup) {
      this.view.imgCheck.setVisibility(true);
    } else {
      this.view.imgCheck.setVisibility(false);
    }
  };
    this.view.flxCheckBoxDeliver.onClick = () => {
      this.deliver = !this.deliver;
      
      if(this.deliver){
        this.view.imgCheckDeliver.setVisibility(true);
      }
      else{
          this.view.imgCheckDeliver.setVisibility(false);
      }
    };
    
    this.view.flxCheckBoxTerms.onClick = () =>{
      this.terms = !this.terms;
      
      if(this.terms){
        this.view.imgCheckTerms.setVisibility(true);
        this.view.btnSubmit.setEnabled(true);
         this.view.btnSubmit.skin = "sknBtn61b35c20pxbold";
      }
      else{
          this.view.imgCheckTerms.setVisibility(false);
           this.view.btnSubmit.setEnabled(false);
         this.view.btnSubmit.skin = "sknBtnececec8pxradius";
      }
      
    };
    
    this.view.tbxChasisofNumber.onTextChange = this.validateChassisNumber;
    this.view.btnSellCarToggle.onClick = () =>{
      new voltmx.mvc.Navigation("frmSellCarList12").navigate();
    }
    
    this.view.btnSellNumberPlateToggle.onClick = () =>{
      this.view.btnSellCarToggle.skin = "sknbtnBGffffffFont231F20DubaiBold40px";
      new voltmx.mvc.Navigation("frmSellNumberPlate").navigate();
    }
    
    this.view.btnSellSparePartToggle.onClick = () =>{
      this.view.btnSellCarToggle.skin = "sknbtnBGffffffFont231F20DubaiBold40px";
     new voltmx.mvc.Navigation("frmSellSparePart").navigate();
    }
  },
  
 
  
  minSellPriceTextChange: function()
  {
    
    if(this.view.tbxMinimumSellingPrice.text.trim() === ""){
      this.view.lblMinselvalidation.setVisibility(true);
    }
    else{
      this.view.lblMinselvalidation.setVisibility(false);
    }
    
     var minPriceText = "";
    var targetPriceText = "";

    if (this.view.tbxMinimumSellingPrice && this.view.tbxMinimumSellingPrice.text) {
        minPriceText = this.view.tbxMinimumSellingPrice.text.trim();
    }

    if (this.view.tbxTargetSellingPrice && this.view.tbxTargetSellingPrice.text) {
        targetPriceText = this.view.tbxTargetSellingPrice.text.trim();
    }

    var minPrice = Number(minPriceText);
    var targetPrice = Number(targetPriceText);

    if (minPriceText === "") {
        this.view.lblMinselvalidation.setVisibility(true);
    } else {
        this.view.lblMinselvalidation.setVisibility(false);
    }

    if (targetPriceText !== "" && !isNaN(minPrice) && !isNaN(targetPrice)) {
        if (targetPrice < minPrice) {
            this.view.lblTargetValidation.setVisibility(true);
            this.view.lblTargetValidation.text = "Target selling price must be greater than or equal to minimum selling price";
            return;
        } else {
            this.view.lblTargetValidation.setVisibility(false);
        }
    }
    
  },
  
  targetSellPriceTextChange: function()
//   {
//     if(this.view.tbxTargetSellingPrice.text.trim() === ""){
//       this.view.lblTargetValidation.setVisibility(true);
//     }
//     else{
//       this.view.lblTargetValidation.setVisibility(false);
//     }
  {
    var minPriceText = "";
    var targetPriceText = "";

    if (this.view.tbxMinimumSellingPrice && this.view.tbxMinimumSellingPrice.text) {
        minPriceText = this.view.tbxMinimumSellingPrice.text.trim();
    }

    if (this.view.tbxTargetSellingPrice && this.view.tbxTargetSellingPrice.text) {
        targetPriceText = this.view.tbxTargetSellingPrice.text.trim();
    }

    var minPrice = Number(minPriceText);
    var targetPrice = Number(targetPriceText);

    if (targetPriceText === "") {
        this.view.lblTargetValidation.setVisibility(true);
        this.view.lblTargetValidation.text = "Target selling price is required";
        return;
    }

    if (minPriceText !== "" && !isNaN(minPrice) && !isNaN(targetPrice)) {
        if (targetPrice < minPrice) {
            this.view.lblTargetValidation.setVisibility(true);
            this.view.lblTargetValidation.text = "Target selling price must be greater than or equal to minimum selling price";
            return;
        }
    }

    this.view.lblTargetValidation.setVisibility(false);
    
  },
  
 
  
  validateChassisNumber: function() {
    
    var text = this.view.tbxChasisofNumber.text;
    this.view.tbxChasisofNumber.text = text.toUpperCase();
    
    var chassisNumber = this.view.tbxChasisofNumber.text;  // Replace with your actual textbox ID
    var errorLabel = this.view.lblChasiserrormsg;           // Replace with your error label ID

//     var pattern =  /^[A-HJ-NPR-Z0-9]{11,17}$/; // 11–17 chars, uppercase, no I, O, Q
        var pattern = /^[A-HJ-NPR-Z0-9]{11,17}$/i;
//     if (typeof chassisNumber !== "string" || !pattern.test(chassisNumber)) {
//         errorLabel.text = "Invalid chassis number. Must be 11–17 uppercase characters, excluding I, O, Q.";
//         errorLabel.setVisibility(true);
//         return false;
//     } else {
//         errorLabel.text = "";
//         errorLabel.setVisibility(false);
//         return true;
//     }
    
    if (!pattern.test(chassisNumber)) {
        errorLabel.text = "Invalid chassis number. Must be 11–17 alphanumeric characters, excluding I, O, Q.";
        errorLabel.setVisibility(true);
    } else {
        errorLabel.setVisibility(false);
    }
},
closeOnClickAction: function(){
     this.view.flxSellCarSuccess.setVisibility(false);
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate(); 
},
  
  btnGoToHomeOnClick: function(){
    this.view.flxSellCarSuccess.setVisibility(false);
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },
  onPreShow: function(){
    this.view.btnSellCarToggle.skin = "sknbtnBGD32437FontffffffDubaiBold45px";
    this.view.flxBottomFileUpload.setVisibility(false);
    this.view.btnSubmit.setEnabled(false);
    this.view.btnSubmit.skin = "sknBtnececec8pxradius";
    this.getCategories();
    this.getYearOfMake();
    this.emptyFunc();
    this.getColor();
    this.getFuelType();
    this.getBranches();
    this.toggleFooterIcons();
    this.getKeys();
    this.view.flxOverLay.setVisibility(false);
    if(!this.terms){
    this.view.btnSubmitForUpload.skin = "sknbtnBGc3c3c3DubaiMedFontffffffFont70px";
    }
    this.view.imgupload.setVisibility(true);
     this.view.lblfilename.text = "Upload Documents (Mulkhiya)";
  },
  btnSellCarOnClick: function(){
    this.view.btnSellCar.skin = "sknbtnBGD32437FontffffffDubaiBold45px"
    this.view.flxSellSingleCar.setVisibility(true);
    this.view.btnSellMultiple.skin = "sknbtnBGffffffFont231F20DubaiBold40px";
    this.view.flxSellMultipleCar.setVisibility(false);
  },
  btnSellMultipleOnClick: function(){
    this.view.btnSellMultiple.skin = "sknbtnBGD32437FontffffffDubaiBold45px"
    this.view.btnSellCar.skin ="sknbtnBGffffffFont231F20DubaiBold40px"
    this.view.flxSellMultipleCar.setVisibility(true);
    this.view.flxSellSingleCar.setVisibility(false);
    
    var arrows = [
  { down: this.view.flxDownArrowCategory, up: this.view.flxUpArrowCategory },
  { down: this.view.flxsubcatageoryDownArrow, up: this.view.flxSubcatagryUparrow },
  { down: this.view.flxYearOfMakeDownArrow, up: this.view.flxYearOfMakeUpArrow },
  { down: this.view.flxBranchDownArrow, up: this.view.flxBranchUparrow },
  { down: this.view.flxKeyDownArrow, up: this.view.flxkeyUparrow },
  { down: this.view.flxColorDownArrow, up: this.view.flxColorUpArrow },
  { down: this.view.flxFuelDownArrow, up: this.view.flxFuelUpArrow }
];

for (var i = 0; i < arrows.length; i++) {
  if (arrows[i].down) arrows[i].down.setVisibility(true);
  if (arrows[i].up) arrows[i].up.setVisibility(false);
}


  },
  toggleFooterIcons: function()
  {
    this.view.Footer2.flxHL1.setVisibility(false);
    this.view.Footer2.flxHL2.setVisibility(false);
    this.view.Footer2.flxHL3.setVisibility(false);
    this.view.Footer2.flxHL4.setVisibility(false);
    this.view.Footer2.flxHL5.setVisibility(false);
 
    this.view.Footer2.imgHome.src = "homefooter.png";
    this.view.Footer2.lblHome.skin = "sknlblCPBoldCapt181818Font100";
 
    this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
    this.view.Footer2.lblAuctions.skin = "sknlblCPBoldCapt181818Font100";
 
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

  CategoryDownArrow: function(){
    //     alert("+Down Aroow")
    this.view.flxDownArrowCategory.setVisibility(false);
    this.view.flxCatageryListDropdown.setVisibility(true);
    this.view.flxUpArrowCategory.setVisibility(true);

  },
  CategoryUpArrow: function(){
    //     alert("Up Aroow");
    this.view.flxCatageryListDropdown.setVisibility(false);
    this.view.flxUpArrowCategory.setVisibility(false);
    this.view.flxDownArrowCategory.setVisibility(true);
  },
  SubCategoryDownArrow: function(){
    this.view.flxsubcatageoryDownArrow.setVisibility(false);
    this.view.flxSubcatageoryDropdown.setVisibility(true);
    this.view.flxSubcatagryUparrow.setVisibility(true);
  },
  SubCategoryUpArrow: function(){
    this.view.flxSubcatagryUparrow.setVisibility(false);
    this.view.flxSubcatageoryDropdown.setVisibility(false);
    this.view.flxsubcatageoryDownArrow.setVisibility(true);

  },
  BranchDownArrow: function(){
    this.view.flxBranchDownArrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(true);
    this.view.flxBranchUparrow.setVisibility(true);
  },
  BranchUpArrow: function(){
    this.view.flxBranchUparrow.setVisibility(false);
    this.view.flxBranchDropdown.setVisibility(false);
    this.view.flxBranchDownArrow.setVisibility(true);
  },
  YearOfMakeDownArrowAction: function(){
    this.view.flxYearOfMakeDownArrow.setVisibility(false);
    this.view.flxYearMakeDropDownList.setVisibility(true);
    this.view.flxYearOfMakeUpArrow.setVisibility(true);
  },
  flxKeyDownArrowAction: function(){
    this.view.flxKeyDownArrow.setVisibility(false);
    this.view.flxKeydropdown.setVisibility(true);
    this.view.flxkeyUparrow.setVisibility(true);
  },
  YearOfMakeUpArrowAction: function(){
    this.view.flxYearOfMakeUpArrow.setVisibility(false);
    this.view.flxYearMakeDropDownList.setVisibility(false);
    this.view.flxYearOfMakeDownArrow.setVisibility(true);
  },
  flxkeyUparrowAction: function(){
    this.view.flxkeyUparrow.setVisibility(false);
    this.view.flxKeydropdown.setVisibility(false);
    this.view.flxKeyDownArrow.setVisibility(true);
  },
  
  flxColorUpArrowAction: function()
  {
    this.view.flxColorUpArrow.setVisibility(false);
    this.view.flxColorDown.setVisibility(false);
    this.view.flxColorDownArrow.setVisibility(true);
  },
  
  flxColorDownArrowAction: function()
  {
    this.view.flxColorUpArrow.setVisibility(true);
    this.view.flxColorDown.setVisibility(true);
    this.view.flxColorDownArrow.setVisibility(false);
  },
  
  flxFuelUpArrowAction: function()
  {
    this.view.flxFuelUpArrow.setVisibility(false);
    this.view.flxFuelDown.setVisibility(false);
    this.view.flxFuelDownArrow.setVisibility(true);
  },
  
  flxFuelDownArrowAction: function()
  {
   this.view.flxFuelUpArrow.setVisibility(true);
    this.view.flxFuelDown.setVisibility(true);
    this.view.flxFuelDownArrow.setVisibility(false);
  },
  
//     BranchDownArrow: function(){
//     this.view.flxBranchDownArrow.setVisibility(false);
//     this.view.flxBranchDropdown.setVisibility(true);
//     this.view.flxBranchUparrow.setVisibility(true);
//   },
//   BranchUpArrow: function(){
//     this.view.flxBranchUparrow.setVisibility(false);
//     this.view.flxBranchDropdown.setVisibility(false);
//     this.view.flxBranchDownArrow.setVisibility(true);
//   },
  
  searchJournel: function(type) {
    var item = [];
    var searchValue = "";
    var segLabelName = "";

    // Set the item array, search text, and label name based on type
    switch (type) {
      case "category":
        item = this.catarray;
        searchValue = this.view.tbxCatageory.text;
        segLabelName = "lblCatageyName";
        var catarr=voltmx.store.getItem("catArray");
        var catarr = voltmx.store.getItem("catArray");  // This should be an array
       var typeValue = searchValue;  // Or however you receive the type

// Ensure catarr is a valid array
if (Array.isArray(catarr) && catarr.length > 0) {
    var isTypePresent = catarr.includes(typeValue);

    if (isTypePresent) {
//         alert("Type is present in the array.");
      this.view.lblDropdownlisterror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblDropdownlisterror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}

        
        break;
      case "subcategory":
        item = this.subcatarray;
        searchValue = this.view.tbxSubcatageory.text;
        segLabelName = "lblBranchname";
          typeValue = searchValue;
        var subdata = voltmx.store.getItem("subcatdata");
        
        
        if (Array.isArray(subdata) && subdata.length > 0) {
    var isTypePresent1 = subdata.includes(typeValue);

    if (isTypePresent1) {
//         alert("Type is present in the array.");
      this.view.lblSubcaterror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblSubcaterror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}
        break;
      case "year":
        item = this.yeararray;
        searchValue = this.view.tbxYearOfMaking.text;
        segLabelName = "lblYearMake";
         typeValue = searchValue;
        var yeararr = voltmx.store.getItem("Yeararray");
         if (Array.isArray(yeararr) && yeararr.length > 0) {
    var isTypePresent2 = yeararr.includes(typeValue);

    if (isTypePresent2) {
//         alert("Type is present in the array.");
      this.view.lblerroryearofmake.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblerroryearofmake.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}

        break;
        
        case "Branch":
        item = this.branch_array;
        searchValue = this.view.tbxBranchName.text;
        segLabelName = "lblBranchname";
        typeValue = searchValue;
        var branchdata = voltmx.store.getItem("branchArray");
        
        if (Array.isArray(branchdata) && branchdata.length > 0) {
    var isTypePresent3 = branchdata.includes(typeValue);

    if (isTypePresent3) {
//         alert("Type is present in the array.");
      this.view.lblBrancherror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblBrancherror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}
        break;
        
        case "keys":
        item = this.keys_array;
        searchValue = this.view.tbxKeyInnername.text;
        segLabelName = "lblKeylist";
        typeValue = searchValue;
        var keyval = voltmx.store.getItem("keydata");
        
        if (Array.isArray(keyval) && keyval.length > 0) {
    var isTypePresent4 = keyval.includes(typeValue);

    if (isTypePresent4) {
//         alert("Type is present in the array.");
      this.view.lblkeyerror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblkeyerror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}
        break;
        
        
         case "color":
        item = this.color_array;
        searchValue = this.view.tbxColorInner.text;
        segLabelName = "lblKeylist";
        typeValue = searchValue;
        var colorval = voltmx.store.getItem("colorarray");
        
        if (Array.isArray(colorval) && colorval.length > 0) {
    var isTypePresentcolor = colorval.includes(typeValue);

    if (isTypePresentcolor) {
//         alert("Type is present in the array.");
      this.view.lblcolorerror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblcolorerror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}
        break;
        
        
        case "fuel":
        item = this.fuel_array;
        searchValue = this.view.tbxFuelTypeInner.text;
        segLabelName = "lblKeylist";
        typeValue = searchValue;
        var fuelval = voltmx.store.getItem("fuelarray");
        
        if (Array.isArray(fuelval) && fuelval.length > 0) {
    var isTypePresentfuelval = fuelval.includes(typeValue);

    if (isTypePresentfuelval) {
//         alert("Type is present in the array.");
      this.view.lblfuelerror.setVisibility(false);
    } else {
        //alert("The type '" + typeValue + "' is not found in the list.");
      this.view.lblfuelerror.setVisibility(true);
    }
} else {
//     alert("Category array is empty or invalid.");
}
        break;
        
        
      default:
        return false; // Invalid type
    }

    // Validate array and search input
    //commented 
//     if (!Array.isArray(item) || !searchValue) {
//       return false;
//     }

//     var sData = [];

//     var pattern = searchValue.trim().toUpperCase();

//     for (var i = 0; i < item.length; i++) {
//       var labelValue = item[i][segLabelName];
//       if (labelValue && labelValue.toUpperCase().includes(pattern)) {
//         sData.push(item[i]);
//       }
//     }
    
    // Validate array only, not searchValue
    //2nd commented to test
// if (!Array.isArray(item)) {
//   return false;
// }

// var sData = [];

// // Convert input to uppercase for case-insensitive match
// var pattern = searchValue ? searchValue.trim().toUpperCase() : "";

// // Filter only if user typed something
// if (pattern !== "") {
//   for (var i = 0; i < item.length; i++) {
//     var labelValue = item[i][segLabelName];
//     if (labelValue && labelValue.toUpperCase().includes(pattern)) {
//       sData.push(item[i]);
//     }
//   }

//   // If no matches found, fallback to full list
//   if (sData.length === 0) {
//     sData = item;
//   }
// } else {
//   // Empty input, show full list
//   sData = item;
// }

    // Validate array only
if (!Array.isArray(item)) {
  return false;
}

var sData = [];
var pattern = searchValue ? searchValue.trim().toUpperCase() : "";

// Case 1: If textbox is empty → show full list
if (pattern === "") {
  sData = item;
} else {
  // Case 2: If textbox has input → filter for matches
  for (var i = 0; i < item.length; i++) {
    var labelValue = item[i][segLabelName];
    if (labelValue && labelValue.toUpperCase().includes(pattern)) {
      sData.push(item[i]);
    }
  }
  // Case 3: If no matches, sData remains empty → segment will be empty
}


    // Update the corresponding segment
    switch (type) {
      case "category":
        this.view.SegCatageoryList.setData(sData);
        break;
      case "subcategory":
        this.view.segSubcatageory.setData(sData);
        break;
      case "year":
        this.view.segYearOfMake.setData(sData);
        break;
        
      case "Branch":
        this.view.SegBranches.setData(sData);
        break;
      case "keys":
        this.view.segKeys.setData(sData);
        break;
      case "color":
        this.view.segColor.setData(sData);
        break;
      case "fuel":
        this.view.segFuel.setData(sData);
        break;
    }
  },

  getCategories: function() {
    var self = this;
    //     alert("Entered into getCategories!!!!");

    var id = 1;
    var asset_name ="fleet";



    var AssetCategoriesMasterValues_inputparam = AssetCategoriesMasterValues_inputparam||{};

    AssetCategoriesMasterValues_inputparam["serviceID"] = "fry_int_fleet$asset-categories-master-values";
    AssetCategoriesMasterValues_inputparam["category_id"] = id;//what we need to pass here?
    AssetCategoriesMasterValues_inputparam["asset_name"] = asset_name;//what we need to pass here?
    var AssetCategoriesMasterValues_httpheaders = {};
    AssetCategoriesMasterValues_inputparam["httpheaders"] = AssetCategoriesMasterValues_httpheaders;
    var AssetCategoriesMasterValues_httpconfigs = {};
    AssetCategoriesMasterValues_inputparam["httpconfig"] = AssetCategoriesMasterValues_httpconfigs;
    fry_int_fleet$asset_categories_master_values = mfintegrationsecureinvokerasync(AssetCategoriesMasterValues_inputparam, "fry_int_fleet", "asset-categories-master-values", 
                                                                                   function(status, response) {

      voltmx.print("response: " + JSON.stringify(response));
      //       alert("response: " + JSON.stringify(response));

      //       alert("cat_name : "+response.records[0].cat_name);
      var cat_array = [];
      response.records.forEach(res=>{
        cat_array.push({
          "lblCatageyName": res.cat_name,
          "lblId": res.cat_id // Convert ID to string if needed
        });
      });

      self.view.SegCatageoryList.setData(cat_array);
      self.catarray = cat_array;
      voltmx.store.setItem("catArray", cat_array);
    });

  },

  segOnRowClickActionCategory: function(){
   var catSelectedRow = this.view.SegCatageoryList.selectedRowItems;

if (catSelectedRow && catSelectedRow.length > 0 && catSelectedRow[0]) {
    var selectedItem = catSelectedRow[0];

    if (selectedItem.lblCatageyName && selectedItem.lblId) {
        voltmx.store.setItem("categoriesSelectedRowName", selectedItem.lblCatageyName);
        voltmx.store.setItem("categoriesSelectedRowId", selectedItem.lblId);

        this.view.tbxCatageory.text = selectedItem.lblCatageyName;
        this.view.flxCatageryListDropdown.setVisibility(false);

        this.subCategoryData();
    } else {
        kony.print("Selected category row missing lblCatageyName or lblId");
    }
} else {
    kony.print("No item selected in SegCatageoryList");
}
     this.view.lblDropdownlisterror.setVisibility(false);
     
    this.view.flxUpArrowCategory.setVisibility(false);
    this.view.flxDownArrowCategory.setVisibility(true);

    //     this.view.tbxCatageory.text = this.view.tbxCatageory.text;
    // var id = 
    // var id = 
    // alert("selected row :"+catSelectedRow);
  },
  subCategoryData: function(){
    var self = this;
    //     alert("Entered into getCategories!!!!");


    var asset_name ="fleet";

    var gettedId = voltmx.store.getItem("categoriesSelectedRowId");
    var AssetCategoriesMasterValues_inputparam = AssetCategoriesMasterValues_inputparam||{};

    AssetCategoriesMasterValues_inputparam["serviceID"] = "fry_int_fleet$asset-categories-master-values";
    AssetCategoriesMasterValues_inputparam["category_id"] = gettedId;//what we need to pass here?
    AssetCategoriesMasterValues_inputparam["asset_name"] = asset_name;//what we need to pass here?
    var AssetCategoriesMasterValues_httpheaders = {};
    AssetCategoriesMasterValues_inputparam["httpheaders"] = AssetCategoriesMasterValues_httpheaders;
    var AssetCategoriesMasterValues_httpconfigs = {};
    AssetCategoriesMasterValues_inputparam["httpconfig"] = AssetCategoriesMasterValues_httpconfigs;
    fry_int_fleet$asset_categories_master_values = mfintegrationsecureinvokerasync(AssetCategoriesMasterValues_inputparam, "fry_int_fleet", "asset-categories-master-values", 
                                                                                   function(status, response) {

      //             voltmx.print("response from subCategory  dATA: " + JSON.stringify(response));
      //       alert("response from subCategory  dATA:" + JSON.stringify(response));


      var cat_array= [];
      response.records.forEach(res=>{

        cat_array.push({
          "lblBranchname": res.cat_name,
          "lblId"        : res.cat_id // Convert ID to string if needed

        });
      });
      //                 alert("second funciton ending!!!"+cat_array);
      //      alert("json cat_array sub cat:"+JSON.stringify(cat_array));
      self.view.segSubcatageory.setData(cat_array);
      self.subcatarray = cat_array;
      voltmx.store.setItem("subcatdata", cat_array);
    });


  }, 
  getYearOfMake: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "year_make";
     FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
      //       alert("Json REesponse for year mae:"+JSON.stringify(response));
      var year_of_make_id = response.data[0].year_make[0].id;
      //       alert("year_of_make_id :"+year_of_make_id);
      //       voltmx.store.setItem("yearOfMakeId", year_of_make_id);
      var year_array = [];

      var rawYearData = response.data[0].year_make;

      var sortedYears = rawYearData.sort((a, b) => Number(b.value) - Number(a.value));


      sortedYears.forEach(res=>{
        year_array.push({
          "lblYearMake"  : res.value,
          "lblYearMakeId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.segYearOfMake.setData(year_array);
      self.yeararray = year_array;
      voltmx.store.setItem("Yeararray", year_array);

    });
  },

  getKeys: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "keys";
    FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
//             alert("Json REesponse for keys:"+JSON.stringify(response));
      var year_of_make_id = response.data[0].keys[0].id;

      var keys_array = [];

      var rawYearData = response.data[0].keys;

      var sortedYears = rawYearData.sort((a, b) => Number(b.value) - Number(a.value));


      sortedYears.forEach(res=>{
        keys_array.push({
          "lblKeylist"  : res.value,
          "lblKeyId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.segKeys.setData(keys_array);
       self.keys_array = keys_array;
      voltmx.store.setItem("keydata", keys_array);

    });
  },
  
    getColor: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "color";
    FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
//             alert("Json REesponse for keys:"+JSON.stringify(response));
      var year_of_make_id = response.data[0].color[0].id;

      var color_array = [];

      var colorData = response.data[0].color;

      colorData.forEach(res=>{
        color_array.push({
          "lblKeylist"  : res.value,
          "lblKeyId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.segColor.setData(color_array);
       self.color_array = color_array;
      voltmx.store.setItem("colorarray", color_array);

    });
  },
  
     getFuelType: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "fuel_type";
    FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
//             alert("Json REesponse for keys:"+JSON.stringify(response));
//       var year_of_make_id = response.data[0].fuel_type[0].id;

      var fuel_array = [];

      var fuelData = response.data[0].fuel_type;

      fuelData.forEach(res=>{
        fuel_array.push({
          "lblKeylist"  : res.value,
          "lblKeyId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.segFuel.setData(fuel_array);
      self.fuel_array = fuel_array;
      voltmx.store.setItem("fuelarray", fuel_array);

    });
  },
  
  getBranches: function(){
    var self = this;
    //     alert("Entered into GetYearOf AMAKE");
    var FleetSpecMasterValues_inputparam = FleetSpecMasterValues_inputparam|| {};

    FleetSpecMasterValues_inputparam["serviceID"] = "fry_int_fleet$master-fleet-spec-values";
    FleetSpecMasterValues_inputparam["spec_list"] = "branch";
    FleetSpecMasterValues_inputparam["widget_name"] = "fleet_specs_details";
     FleetSpecMasterValues_inputparam["asset definitions"] = "true";
     FleetSpecMasterValues_inputparam["auction_types"] = "true";
    var FleetSpecMasterValues_httpheaders = {};
    FleetSpecMasterValues_inputparam["httpheaders"] = FleetSpecMasterValues_httpheaders;
    var FleetSpecMasterValues_httpconfigs = {};
    FleetSpecMasterValues_inputparam["httpconfig"] = FleetSpecMasterValues_httpconfigs;
    fry_int_fleet$master_fleet_spec_values = mfintegrationsecureinvokerasync(FleetSpecMasterValues_inputparam, "fry_int_fleet", "master-fleet-spec-values", function(status, response){
      //             alert("response : "+response);
//             alert("Json REesponse for keys:"+JSON.stringify(response));
//       var year_of_make_id = response.data[0].fuel_type[0].id;

      var branch_array = [];

      var branchData = response.data[0].branch;

      branchData.forEach(res=>{
        branch_array.push({
          "lblBranchName"  : res.value,
          "lblBranchId": res.id
        });
      });
      //       alert("year array :"+year_array);
      self.view.SegBranches.setData(branch_array);
       self.branch_array = branch_array;
      voltmx.store.setItem("branchArray", branch_array);

    });
  },
  

  pdfCheck: function() {
    var uploadOption = voltmx.store.setItem("uploadOption", "PDF");
    try {

      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
      var TestPdfNfi = java.import("com.example.pdfuploadnfitest.TestPdfNfi");
      TestPdfNfi.pdfCallback = this.pdfCallback.bind(this);
      var activityContext = VoltMXMain.getActivityContext();
      var Intent  = java.import("android.content.Intent");
      var intentObj =  new Intent(activityContext, TestPdfNfi.class);
      activityContext.startActivity(intentObj);
    } catch (e) {
      alert("Error: " + e.message);
    }
  },

  pdfCallback: function(data) {

//     voltmx.print( "selcted pdf callback data:::" + data) ;
//     alert("Filename selected :::"+data);

    this.pdfData = null;

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      try {
        const dataJsonStr = JSON.stringify(data);
        this.pdfData = JSON.parse(dataJsonStr);
        if(this.pdfData && this.pdfData.base64pdf){
          this.selectedPdfBase64 = this.pdfData.base64pdf;
          this.selectedPdfFileName = this.pdfData.fileName;
           this.view.lblfilename.text = this.pdfData.fileName;
      this.view.imgupload.setVisibility(false);
          this.view.flxBottomFileUpload.setVisibility(false);
          this.view.flxOverLay.setVisibility(false);
           this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
        }
        
//         alert(this.pdfData.fileName);
     
      } catch (error) {
        console.error("Failed to clone data:", error);
        this.pdfData = null;
      }    
    }
  },
  
  testPDFNFIIOS: function()
  {
    var self=this;

 voltmx.runOnMainThread(mainthread, []);

   function  mainthread() {   
  var PDFNFIUploadIOS = objc.import("PDFNFIUploadIOS");
    var ViewController = objc.import("ViewController");
    if (!ViewController) {
        voltmx.print("Error: Failed to import PDFNFIUploadIOS");
    }
  else{
	var ViewObject = ViewController.alloc().jsinit();
	ViewObject.pickPdfTapped();
// 	ViewObject.pdfCallback(function(pdfArrayObj){
//       voltmx.print("Received Callback Object: " +pdfArrayObj[0],pdfArrayObj[1]); 
//       var fileName = pdfArrayObj[0]; // Get the filename
//       var base64Data = pdfArrayObj[1];
      
//       self.selectedPdfFileName = fileName;
//       self.selectedPdfBase64 =base64Data;
     
//       alert("Selected value"+self.selectedPdfBase64);
//       alert("selected file"+self.selectedPdfFileName);
//       self.view.lblfilename.text = self.selectedPdfFileName;
//        self.view.imgupload.setVisibility(false);
//           self.view.flxBottomFileUpload.setVisibility(false);
//           self.view.flxOverLay.setVisibility(false);
         
//     });
    
    ViewObject.pdfCallback(function(pdfArrayObj){
  voltmx.print("Received Callback Object: " + pdfArrayObj[0] + ", " + pdfArrayObj[1]); 

  var fileName = pdfArrayObj[0];
  var base64Data = pdfArrayObj[1];

  self.selectedPdfFileName = fileName;
  self.selectedPdfBase64 = base64Data;

  voltmx.runOnMainThread(function () {
    self.view.lblfilename.text = self.selectedPdfFileName;
    self.view.imgupload.setVisibility(false);
    self.view.flxBottomFileUpload.setVisibility(false);
    self.view.flxOverLay.setVisibility(false);
  }, []);
});

        
      
  }
}
    
         
  },
  
 mileageTextChange: function() {
  var mileageText = this.view.tbxMileagename.text.trim();
  var mileageValue = parseFloat(mileageText);

  if (mileageText === "") {
    this.view.lblMileageValidation.text = "Mileage is a mandatory field";
    this.view.lblMileageValidation.setVisibility(true);
  } else if (isNaN(mileageValue) || mileageValue <= 0) {
    this.view.lblMileageValidation.text = "Mileage must be greater than zero";
    this.view.lblMileageValidation.setVisibility(true);
  } else {
    this.view.lblMileageValidation.setVisibility(false);
  }
},
  
//   camOnCaptureAction: function(){
// //             var uploadOption = voltmx.store.setItem("uploadOption", "Cam");

//     var rawBytes = this.view.cam.rawBytes;

//     if (rawBytes) {
//       // Convert raw bytes to base64
//        var testfilename = rawBytes.getResourcePath();
//         //        alert("testfilename"+testfilename);
//         var filename =  rawBytes.getResourcePath().substring(rawBytes.getResourcePath().lastIndexOf("/") + 1);

//         var base64Image = voltmx.convertToBase64(rawBytes);
        
//         var filetype =  detectFileType(base64Image);
//         //        alert("type"+filetype);
//         var filefullname = filename+filetype;
      
//         //        alert("fullname"+filefullname);
//         this.filenameCam =filefullname;
      
//       this.selectedPdfFileName = filefullname;
//       this.selectedPdfBase64 = base64Image;
//       this.view.lblfilename.text = filefullname;
//       this.view.imgupload.setVisibility(false);
//       this.view.flxBottomFileUpload.setVisibility(false);
//       this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
//       this.view.flxOverLay.setVisibility(false);
// //       var base64Image = kony.convertToBase64(rawBytes);
//       this.base64CamImage = base64Image;
     
//     } else {
//       kony.print("No image captured from camera.");
//     }
//   },
  
  
  camOnCaptureAction: function () {
  var self = this;

  var rawBytes = self.view.cam.rawBytes;

  if (rawBytes) {
    try {
      // Convert rawBytes to base64 (works on both iOS & Android)
      var base64Image = voltmx.convertToBase64(rawBytes);

      // Generate fallback filename for iOS (Android usually provides file path)
      var filename = "captured_image_" + new Date().getTime();
      var filetype = detectFileType(base64Image); // Example: ".jpg"
      var filefullname = filename + filetype;

      // Save the file metadata and base64
      self.filenameCam = filefullname;
      self.selectedPdfFileName = filefullname;
      self.selectedPdfBase64 = base64Image;
      self.base64CamImage = base64Image;

      // Update UI
      self.view.lblfilename.text = filefullname;
      self.view.imgupload.setVisibility(false);
      self.view.flxBottomFileUpload.setVisibility(false);
      self.view.btnSubmitForUpload.skin = "sknBtn61b35c20pxbold";
      self.view.flxOverLay.setVisibility(false);
      self.view.flxUploadedFrontview.setVisibility(true);
      self.view.imgFrontView.base64 = base64Image;

    } catch (err) {
      voltmx.print("Error while processing camera image: " + err.message);
      alert("Something went wrong while capturing the image.");
    }
  } else {
    voltmx.print("No image captured from camera.");
    alert("No image captured. Please try again.");
  }
},

  
//   chooseFromLibrary: function()
//   {
//    var self = this;

//     voltmx.phone.openMediaGallery(function(rawbytes) {
//       if (rawbytes) {
//         voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
//         var testfilename = rawbytes.getResourcePath();
//         //        alert("testfilename"+testfilename);
//         var filename =  rawbytes.getResourcePath().substring(rawbytes.getResourcePath().lastIndexOf("/") + 1);
//         //             this.view.flxUploadConfirmationinGsovtID.setVisibility(true);
//         //            .text = filename;

//         // Convert to Base64 and store based on file index
//         var base64Data = voltmx.convertToBase64(rawbytes);
//         var filetype =  detectFileType(base64Data);
//         //        alert("type"+filetype);
//         var filefullname = filename+filetype;
//         //        alert("fullname"+filefullname);
//         this.selectedPdfFileName = filefullname;
//       this.selectedPdfBase64 = base64Data;
//          this.view.lblfilename.text = filefullname;
//         this.view.lblfilename.left ="0%";
//       this.view.imgupload.setVisibility(false);
//         this.view.flxBottomFileUpload.setVisibility(false);
//         this.view.flxOverLay.setVisibility(false);
//       this.view.btnSubmitForUpload.skin= "sknBtn61b35c20pxbold";
      
       
       
//         voltmx.print("Base64 : "+base64Data);
//         //        this.view.flxUploadedBackView
       
//         //           self.createDamItems(type,filename,base64Data);
//       }  }.bind(this), {}, {
//       action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY, 
//       format: voltmx.phone.MEDIA_DOCUMENT_RAW,
//       mimetype: "image/*"  // Set the mime type for images
//       //       mimetype: "application/*" 

//     }
//                                  ); 
//   },
  
  
  chooseFromLibrary: function() {
  var self = this;

  voltmx.phone.openMediaGallery(function(rawbytes) {
    if (rawbytes) {
      voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));

      var filename = rawbytes.fileName || "uploaded_file"; // fallback if filename missing
      var base64Data = voltmx.convertToBase64(rawbytes);
      var filetype = detectFileType(base64Data);
      var filefullname = filename + filetype;

      self.selectedPdfFileName = filefullname;
      self.selectedPdfBase64 = base64Data;

      self.view.lblfilename.text = filefullname;
      self.view.lblfilename.left = "0%";
      self.view.imgupload.setVisibility(false);
      self.view.flxBottomFileUpload.setVisibility(false);
      self.view.flxOverLay.setVisibility(false);
      self.view.btnSubmitForUpload.skin = "sknBtn61b35c20pxbold";

      voltmx.print("Base64 : " + base64Data);
    }
  }.bind(this), {}, {
    action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
    format: voltmx.phone.MEDIA_DOCUMENT_RAW,
    mimetype: "image/*"  // or use "application/*" for other types
  });
},

  segOnRowClickSubCategoryAction: function(){
    var self = this;
    var selectedSubCategory = this.view.segSubcatageory.selectedRowItems;

if (selectedSubCategory && selectedSubCategory.length > 0 && selectedSubCategory[0]) {
    var selectedItem = selectedSubCategory[0];
     
    if (selectedItem.lblBranchname && selectedItem.lblId) {
        this.view.tbxSubcatageory.text = selectedItem.lblBranchname;
        this.view.flxSubcatageoryDropdown.setVisibility(false);

        voltmx.store.setItem("subCategorySelected", selectedItem.lblBranchname);
        voltmx.store.setItem("SubCategorySelectedRowId", selectedItem.lblId);
    } else {
        kony.print("Selected item does not contain expected keys: lblBranchname or lblId");
    }
} else {
    kony.print("No item selected in segSubcatageory");
}
 self.view.flxSubcatagryUparrow.setVisibility(false);
    self.view.flxsubcatageoryDownArrow.setVisibility(true);
this.view.lblSubcaterror.setVisibility(false);
  },
  segYearOfMakeonRowClickAction: function(){
    var self = this;
var selectedYearOfMake = this.view.segYearOfMake.selectedRowItems;

if (selectedYearOfMake && selectedYearOfMake.length > 0) {
    self.view.tbxYearOfMaking.text = selectedYearOfMake[0].lblYearMake;
    this.view.flxYearMakeDropDownList.setVisibility(false);
    voltmx.store.setItem("YearOfMakeSelected", selectedYearOfMake[0].lblYearMake);
    voltmx.store.setItem("yearOfMakeId", selectedYearOfMake[0].lblYearMakeId);
    this.view.lblerroryearofmake.setVisibility(false);
} else {
    // Optionally clear or reset if nothing selected
    this.view.lblerroryearofmake.setVisibility(false);
    // You may also want to log or handle this scenario based on your UX
}
     self.view.flxYearOfMakeUpArrow.setVisibility(false);
    self.view.flxYearOfMakeDownArrow.setVisibility(true);

  },
  BranchesonRowClickAction: function(){

var self = this;
var selectedBranch = this.view.SegBranches.selectedRowItems;

if (selectedBranch && selectedBranch.length > 0) {
    self.view.tbxBranchName.text = selectedBranch[0].lblBranchName;
    self.branchId = selectedBranch[0].lblBranchId;
    self.branchValue = selectedBranch[0].lblBranchName;
    self.view.flxBranchDropdown.setVisibility(false);
  self.view.flxBranchUparrow.setVisibility(false);
    self.view.flxBranchDownArrow.setVisibility(true);
  self.view.lblBrancherror.setVisibility(false);
}

//     voltmx.store.setItem("BranchesSelected", selectedBranch[0].lblBranchName);
  },
  fuelTyperowclick: function(){

   var self = this;
var selectedFueltype = self.view.segFuel.selectedRowItems;

if (selectedFueltype && selectedFueltype.length > 0) {
    self.view.tbxFuelTypeInner.text = selectedFueltype[0].lblKeylist;
    self.fuelId = selectedFueltype[0].lblKeyId;
    self.view.flxFuelDown.setVisibility(false);
  
     self.view.flxFuelUpArrow.setVisibility(false);
    self.view.flxFuelDownArrow.setVisibility(true);
     
  
    voltmx.store.setItem("fueltype", selectedFueltype[0].lblKeylist);
    this.view.lblfuelerror.setVisibility(false);
}

  },
  keysonRowClickAction: function(){
  var self = this;
var selectedKey = self.view.segKeys.selectedRowItems;

if (selectedKey && selectedKey.length > 0) {
    self.view.tbxKeyInnername.text = selectedKey[0].lblKeylist;
    self.keyId = selectedKey[0].lblKeyId;
    self.view.flxKeydropdown.setVisibility(false);
  
    self.view.flxkeyUparrow.setVisibility(false);
    self.view.flxKeyDownArrow.setVisibility(true);
  
    voltmx.store.setItem("KeysSelected", selectedKey[0].lblKeylist);
    self.view.lblkeyerror.setVisibility(false);
}

  },
  
  colorOnRowClickAction: function()
  {
   var self = this;
var selectedKey = self.view.segColor.selectedRowItems;

if (selectedKey && selectedKey.length > 0) {
    self.colorId = selectedKey[0].lblKeyId;
    var color = selectedKey[0].lblKeylist;
    self.view.tbxColorInner.text = selectedKey[0].lblKeylist;
    self.view.flxColorDown.setVisibility(false);
    self.colorValue = color;
    self.view.lblcolorerror.setVisibility(false);
    self.view.flxColorUpArrow.setVisibility(false);
    self.view.flxColorDownArrow.setVisibility(true);
  
}

    
  },
//   submitOnClickAction: function() {
//   var self = this;
//   var category_id = voltmx.store.getItem("categoriesSelectedRowId");
//   var sub_Category_id = voltmx.store.getItem("SubCategorySelectedRowId");
//   var year_Of_Make = voltmx.store.getItem("YearOfMakeSelected");
//   var keys = voltmx.store.getItem("KeysSelected");
//   var userObj = voltmx.store.getItem("userObject");
//   var UserObjJsonDataAccessToken = voltmx.store.getItem("getUserAccesstoken");

//     if (addAFleet_inputParam == undefined) {
//         var addAFleet_inputParam = {};
//     }
    
//   var addAFleet_inputParam = {
//     "category_id": voltmx.visualizer.toNumber(category_id),
//     "sub_category_id": voltmx.visualizer.toNumber(sub_Category_id),
//     "year_of_making": voltmx.visualizer.toNumber(year_Of_Make),
//     "branch": self.branchValue,
//     "no_of_keys": String(keys),
//     "target_selling_price": Number(self.view.tbxTargetSellingPrice.text),
//     "chassis_number": self.view.tbxChasisofNumber.text,
//     "minimum_selling_price": voltmx.visualizer.toNumber(self.view.tbxMinimumSellingPrice.text),
//     "previous_numberplate": self.view.tbxNumberPlate.text,
//     "color": self.colorValue,
//     "pickUpVehicle": self.pickup
//   };

//   // Headers go separately
    
  
//     addAFleet_inputParam["serviceID"] = "ms_fleet$addfleet";
//     var addAFleet_httpheaders = {
//     "user_token": UserObjJsonDataAccessToken
// //     ,
// //     "Content-Type": "application/json"
//   };
//     addAFleet_inputParam["httpheaders"] = addAFleet_httpheaders;
//     var addfleet_httpconfigs = {};
//     addAFleet_inputParam["httpconfig"] = addfleet_httpconfigs;

//   // Call without passing httpheaders in inputParam
//   ms_fleet$addfleet = mfintegrationsecureinvokerasync(
//     addAFleet_inputParam,
//     "ms_fleet",
//     "addfleet",
//     function(status, response) {
//       alert("status : "+status+ " and response : "+response+ " and response optstatus : "+response.opstatus);
//       if (response.opstatus === 0) {
//         alert("Fleet Has Been Created Successfully!");
//         var ntf = new voltmx.mvc.Navigation("frmDashBoard");
//         ntf.navigate();
//       } else {
//         alert("status: " + status + "\nError: " + JSON.stringify(response));
//       }
//     }
    
// //     ,
// //     addAFleet_httpheaders // pass headers here, not inside inputParam
//   );
// },
  
//  submitOnClickAction: function() {
//   var self = this;

//   // Fetch stored items
//   var category_id = voltmx.visualizer.toNumber(voltmx.store.getItem("categoriesSelectedRowId"));
//   var sub_Category_id = voltmx.visualizer.toNumber(voltmx.store.getItem("SubCategorySelectedRowId"));
//   var year_Of_Make = voltmx.visualizer.toNumber(voltmx.store.getItem("YearOfMakeSelected"));
//   var keys = String(voltmx.store.getItem("KeysSelected"));
//   var UserObjJsonDataAccessToken = voltmx.store.getItem("getUserAccesstoken");

//   // Construct payload
//   var parameters = {
//     "category_id": category_id,
//     "sub_category_id": sub_Category_id,
//     "year_of_making": year_Of_Make,
//     "branch": self.branchValue,
//     "no_of_keys": keys,
//     "target_selling_price": Number(self.view.tbxTargetSellingPrice.text),
//     "chassis_number": self.view.tbxChasisofNumber.text,
//     "minimum_selling_price": voltmx.visualizer.toNumber(self.view.tbxMinimumSellingPrice.text),
//     "previous_numberplate": self.view.tbxNumberPlate.text,
//     "color": self.colorValue,
//     "pickUpVehicle": self.pickup
//   };

//   // Headers
//   var headers = {
//     "user_token": UserObjJsonDataAccessToken,
//   };

//   // Get integration service reference
//   var serviceName = "ms_fleet"; // Your Foundry service
//   var integrationObj = VMXFoundry.getIntegrationService(serviceName);

//   // Invoke operation
//   integrationObj.invokeOperation({
//     operationID: "addfleet",
//     headers: headers,
//     data: parameters,
//     success: function(response) {
//       if (response.opstatus === 0) {
//         alert("Fleet has been created successfully!");
//         var ntf = new voltmx.mvc.Navigation("frmDashBoard");
//         ntf.navigate();
//       } else {
//         alert("Service failed with error: " + JSON.stringify(response));
//       }
//     },
//     error: function(error) {
//       alert("Integration failure:\n" + JSON.stringify(error));
//     }
//   });
// },
  
//   submitOnClickAction: function() {
//   var self = this;

//   // Gather values
//   var category_id = voltmx.store.getItem("categoriesSelectedRowId");
//   var sub_Category_id = voltmx.store.getItem("SubCategorySelectedRowId");
//   var year_Of_Make = voltmx.store.getItem("YearOfMakeSelected");
//   var keys = voltmx.store.getItem("KeysSelected");
//   var userToken = voltmx.store.getItem("getUserAccesstoken");

//   // Payload (params)
//  var params = {
//   "category_id": voltmx.visualizer.toNumber(category_id),
//   "sub_category_id": voltmx.visualizer.toNumber(sub_Category_id),
//   "year_of_making": voltmx.visualizer.toNumber(year_Of_Make),
//   "branch": self.branchValue,
//   "no_of_keys": String(keys),
//   "target_selling_price": Number(self.view.tbxTargetSellingPrice.text),
//   "chassis_number": self.view.tbxChasisofNumber.text,
//   "minimum_selling_price": voltmx.visualizer.toNumber(self.view.tbxMinimumSellingPrice.text),
//   "previous_numberplate": self.view.tbxNumberPlate.text,
//   "color": self.colorValue,
//   "pickUpVehicle": self.pickup
// };

//   // Headers for pass-through
//   var headers = {
//     "user_token": userToken,
//     "Content-Type": "application/json"
//   };

//   // Integration service setup
//   var serviceName = "ms_fleet"; // your integration service name
//   var operationName = "addfleet"; // your operation name
//   var client = voltmx.sdk.getCurrentInstance();
//   var integrationSvc = client.getIntegrationService(serviceName);
//  self.invokeUploadFleetDoc();
//   // Invoke operation with pass-through enabled
//   integrationSvc.invokeOperation(operationName, headers, params, function(response) {
   
//     voltmx.print("Integration Service Response is: " + JSON.stringify(response));
//     if (response.opstatus === 0) {
//       alert("Fleet Has Been Created Successfully!");
//       if(self.selectedPdfBase64){
//         self.invokeUploadFleetDoc();
//       }
//       var ntf = new voltmx.mvc.Navigation("frmDashBoard");
//       ntf.navigate();
//     } else {
//       alert("Error: " + JSON.stringify(response));
//     }
//   }, function(error) {
//     voltmx.print("Integration Service Failure: " + JSON.stringify(error));
//     alert("Service Failed: " + JSON.stringify(error));
//   }, {
//     passthrough: true
//   });
// },
  
  fleetDocUpload: function()
  {
     var self = this;
    var userobj = voltmx.store.getItem("userObject");
    var isorg = userobj.rawResponse.is_org;
    // Sample code to fetch the integration service details with passthrough 
var serviceName = "fry_collection";   
// Get an instance of SDK
var client = voltmx.sdk.getCurrentInstance();
var integrationSvc = client.getIntegrationService(serviceName);
var operationName = "upload-fleet-documents";
     var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    
var params = {
    "user_id": userid,
        "moduleName": "UploadFleetDocuments",
        "is_org": isorg,
        "category": "Possion_Letter",
        "object_id": self.objidforfleet,
        "file_details": [
            {
                "is_thumbnail": "true",
                "filename": self.selectedPdfFileName,
                "base64": self.selectedPdfBase64 // You need to encode file as base64 and insert it here
            }
        ],
        "user_token": userToken
};
var headers = {
//     "custom-header-key1": "custom-header-value1"
}; //If there are no headers, pass null
// options is an optional parameter that helps in configuring the network layer.
integrationSvc.invokeOperation(operationName, headers, params, function(response) {
    voltmx.print("Integration Service Response is: " + JSON.stringify(response));
  
}, function(error) {
    voltmx.print("Integration Service Failure: " + JSON.stringify(error));
}, {
    "passthrough": true
});
  },
  submitOnClickAction: function(){
     var self = this;
    checkTokenValidatity(function () {
  voltmx.application.showLoadingScreen(null, "Adding Fleet...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
const requiredFields = [
    self.view.tbxChasisofNumber,
    self.view.tbxCatageory,
    self.view.tbxSubcatageory,
    self.view.tbxYearOfMaking,
    self.view.tbxBranchName,
    self.view.tbxMinimumSellingPrice,
    self.view.tbxKeyInnername,
    self.view.tbxColorInner,
     self.view.tbxFuelTypeInner,
    self.view.tbxTargetSellingPrice
//     self.view.tbxNumberPlate
];

for (var field of requiredFields) {
    if (!field.text || field.text.trim() === "") {
        voltmx.application.dismissLoadingScreen();
        alert("Please fill in all required fields.");
        return;
    }
}
//   var verification_type = "Email";
  var baseURL = voltmx.store.getItem("BASE_URL");
      if(baseURL){
      if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
      }
      
    var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
   var endUrl = "services/ms_fleet/addfleet";
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var url = baseURL + endUrl;

  var request = new voltmx.net.HttpRequest();
  request.open("POST", url);
  var category_id = voltmx.store.getItem("categoriesSelectedRowId");
  var sub_Category_id = voltmx.store.getItem("SubCategorySelectedRowId");
  var year_Of_Make = voltmx.store.getItem("YearOfMakeSelected");
  var keys = voltmx.store.getItem("KeysSelected");
  var userToken = voltmx.store.getItem("getUserAccesstoken");
    var fuelType =voltmx.store.getItem("fueltype");
    var milage = self.view.tbxMileagename.text;
//     request.setRequestHeader("Content-Type", "application/json");
//   request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("user_token",usertoken);
//     request.setRequestHeader("user_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGViYWNkZmEtN2NlMS00NmVlLTlkNjMtYjA5ZjNkMjY2MTg3IiwibmFtZSI6IlJhamVzaCBNZWVzYXJhcHUiLCJncm91cHMiOlsic2VsbGVyO2J1eWVyIl0sImlzX2NvbnRyYWN0X3NpZ25lZCI6ZmFsc2UsImpvYl90aXRsZSI6InNlbGxlcjtidXllcjthZG1pbiIsInBlcm1pc3Npb25zIjp7IlNlbGxlcnMiOlsiUmVxdWVzdGVkIFNlcnZpY2VzIiwiUkVBRCAmIFdSSVRFIiwiQWRkIGEgbmV3IGNhciIsIk15IFZlaGljbGVzIiwiTXkgUmVjZWl2ZWQgVmVoaWNsZXMiLCJBY3RpdmUgYXVjdGlvbnMiLCJTb2xkIFVuIERlbGl2ZXJlZCIsIlVuc29sZCBWZWhpY2xlcyBVbiBEZWxpdmVyZWQiLCJNeSBpbnZvaWNlcyIsIk15IHBheW1lbnRzIiwiUHJvZmlsZSIsIlVuYXBwcm92ZWQgVmVoaWNsZSIsIkNvbXBsZXRlZCBSZXF1ZXN0cyJdLCJBZG1pbiI6WyJMb2NhdGlvbiBMaXN0IiwiU2VydmljZXMgTGlzdCIsIlJFQUQgJiBXUklURSIsIk1lc3NhZ2UgVGVtcGxhdGVzIiwiU2VydmljZSBsaXN0IiwiRXhwZW5zZSBsaXN0IiwiVXNlcnMgUGVybWlzc2lvbnMiLCJBZHMgTWFuYWdlbWVudCIsIkZlYXR1cmVzIE1hbmFnZW1lbnQiLCJNYWtlcyBhbmQgbW9kZWxzIE1hbmFnZW1lbnQiXSwiT3BlcmF0aW9ucyI6WyJTZXJ2aWNlcyBJbiBQcm9jZXNzIiwiQ29tcGxldGVkIFNQIFNlcnZpY2VzIiwiSHlicmlkIFVuc29sZCBWZWhpY2xlIiwiUkVBRCAmIFdSSVRFIiwiQnV5ZXIgQ2hhbmdlIiwiQ29tcGxldGVkIEluc3BlY3Rpb24gU2VydmljZXMiLCJDb21wbGV0ZWQgQi5DaCBTZXJ2aWNlcyIsIlVuc29sZCBWZWhpY2xlcyIsIkNvbXBsZXRlZCBSZXF1ZXN0cyIsIlNQIFJlcXVlc3RlZCBTZXJ2aWNlcyIsIkNhciBJbnNwZWN0aW9uIFNlcnZpY2VzIiwiVGVjaG5pY2FsIFRlc3QiLCJBY3RpdmUgQXVjdGlvbnMgRm9yIE1hcmtldGluZyIsIlJlcXVlc3QgVmVoaWNsZSIsIldhc2hlZCBWZWhpY2xlIiwiUGhvdG8gVmVoaWNsZSIsIkluYWN0aXZlIEF1Y3Rpb25zIiwiU29sZCBVbiBEZWxpdmVyZWQiLCJVbnNvbGQgRGVsaXZlcmVkIiwiQXdhcmRlZCBSZXBvcnQiLCJTb2xkIERlbGl2ZXJlZCIsIlVuc29sZCBhcmNoaXZlIiwiQWN0aXZlIEF1Y3Rpb25zIiwiQWRkIGEgbmV3IGNhciIsIkFkZCBuZXcgY2FyIGZyb20gRVJQIiwiVW5kZXIgYXBwcm92YWwgRGlyZWN0IFNhbGVzIiwiU3VibWl0dGVkIEJ5IFNlbGxlciIsIkFwcHJvdmVkIEJ5IFNlbGxlciIsIk1hcmtldGluZyIsIkFyY2hpdmVkIFZlaGljbGUiLCJPcGVyYXRpb24gTG9nIiwiVW5kZXIgQXBwcm92YWwiLCJWZWhpY2xlIGRlbGl2ZXJ5IHJlcG9ydCIsIlBlbmRpbmcgU2VydmljZXMiXSwiTWFuYWdlbWVudCI6WyJSRUFEICYgV1JJVEUiLCJJbmNvbWUgVG90YWxzIiwiTW9udGhseSBJbmNvbWUgVG90YWxzIiwiQWN0aXZlIGF1Y3Rpb25zIiwiU2FsZXMgSW52b2ljZSBkZXRhaWxzIiwiU2VsbGVycyByZXBvcnQiLCJTYWxlcyByZXBvcnQiLCJBdWN0aW9uIExpc3QiLCJQcm9maXRzIGRldGFpbHMiLCJNb250aGx5IHByb2ZpdHMiLCJDdXN0b21lciBsaXN0IiwiQXVjdGlvbiBCYXRjaCBsaXN0IiwiUXVhbGl0eSBBc3N1cmFuY2UiLCJFUlAgSW50ZWdyYXRpb24iLCJTZWxsZXIgTGlzdCJdLCJBY2NvdW50YW50IjpbIlJFQUQgJiBXUklURSIsIkNhciBJbnNwZWN0aW9uIEludm9pY2VzIiwiQnV5ZXIgQ2hhbmdlIEludm9pY2VzIiwiU29sZCB2ZWhpY2xlIiwiU2VsbGVyIEludm9pY2UgbGlzdCIsIkJ1eWVyIGludm9pY2UgbGlzdCIsIlNlbGxlciBQYXltZW50cyIsIkJ1eWVyIHBheW1lbnRzIiwiQ3VzdG9tZXJzIiwiU2VjdXJpdHkgRGVwb3NpdCIsIlRPIERPIExpc3QiLCJCYW5rIFN0YXRlbWVudCJdLCJSZXBvcnRzIjpbIlJFQUQgJiBXUklURSIsIkRlbGl2ZXJlZCBWZWhpY2xlcyIsIkF1Y3Rpb24gRW5kIiwiQWN0aXZlIGF1Y3Rpb25zIiwiU3RhdGlzdGljYWwgUmVwb3J0IiwiQ2FyIFByaWNlIFJlcG9ydCIsIkZlYXR1cmUgQ2FyIFByaWNlIFJlcG9ydCJdLCJIeWJyaWRBdWN0aW9ucyI6WyJPZmZsaW5lIGJpZCBQYWdlICIsIlNob3dzY3JlZW4gUGFnZSJdLCJEYXNoYm9hcmQiOlsiU2FsZXMgQ2hhcnQiLCJQdXJjaGFzZSBDaGFydCIsIlVzZXIgQ2hhcnQiXX0sInNlY3VyaXR5X2RlcG9zaXQiOjAsImFsbG93ZWRfYmlkZGluZyI6ZmFsc2UsImlhdCI6MTc1MDE2NTAwMywiZXhwIjoxNzUwMTY4NjAzLCJpc3MiOiJodHRwczovL2V0LmFlIn0.-iOEJ9N7LI5F3TWHZGCZ3TXk2q5Jq8J2lDaNoxQAZZI");

  request.setRequestHeader("Authorization","Basic "+encodeVal);
  request.setRequestHeader("Content-Type", "application/json");


  request.onReadyStateChange = function () {
    if (request.readyState === 4) {
        voltmx.application.dismissLoadingScreen();

        try {
            var response = JSON.parse(request.responseText);

            if (request.status === 200 && response.message === "Fleet created successfully") {
                self.objidforfleet = response.data.object_id;
                self.view.flxSellCarSuccess.setVisibility(true);

                if (self.selectedPdfBase64 && self.selectedPdfFileName) {
                    self.fleetDocUpload();
                }
            } else {
                var message = response.message || (response.error && response.error.message) || "Something went wrong.";
                var details = response.details || (response.error && response.error.details);

                if (details && typeof details === "object") {
                    for (var key in details) {
                        message += "\n" + key + ": " + details[key];
                    }
                }

                alert(message);
            }

        } catch (e) {
            alert("Failed to process the response. Please try again.");
        }
    }
}.bind(self);


var requestPayload = {
    category_id: Number(category_id),
    sub_category_id: Number(sub_Category_id),
    target_selling_price: Number(self.view.tbxTargetSellingPrice.text),
    year_of_making: Number(year_Of_Make),
    chassis_number: self.view.tbxChasisofNumber.text,
    branch: Number(self.branchId),
    minimum_selling_price: Number(self.view.tbxMinimumSellingPrice.text),
    no_of_keys: Number(self.keyId),
    color: Number(self.colorId),
    pickUpVehicle: self.pickup,
    fuel: Number(self.fuelId)
};
      
 var plate = self.view.tbxNumberPlate.text;
if (plate && plate.trim() !== "") {
    requestPayload.previous_numberplate = plate.trim();
}
      
  var requestData = JSON.stringify(requestPayload);    
  request.send(requestData);
//     this.emptyFunc();
     });
  },
 
//   submitOnClickAction: function () {
//   var self = this;

//   checkTokenValidatity(function () {
//     voltmx.application.showLoadingScreen(null, "Adding Fleet...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

//     const requiredFields = [
//       self.view.tbxChasisofNumber,
//       self.view.tbxCatageory,
//       self.view.tbxSubcatageory,
//       self.view.tbxYearOfMaking,
//       self.view.tbxBranchName,
//       self.view.tbxMinimumSellingPrice,
//       self.view.tbxKeyInnername,
//       self.view.tbxColorInner,
//       self.view.tbxFuelTypeInner,
//       self.view.tbxTargetSellingPrice
//     ];

//     for (var field of requiredFields) {
//       if (!field.text || field.text.trim() === "") {
//         voltmx.application.dismissLoadingScreen();
//         alert("Please fill in all required fields.");
//         return;
//       }
//     }

//     var category_id = voltmx.store.getItem("categoriesSelectedRowId");
//     var sub_Category_id = voltmx.store.getItem("SubCategorySelectedRowId");
//     var year_Of_Make = voltmx.store.getItem("YearOfMakeSelected");

//     var requestPayload = {
//       category_id: Number(category_id),
//       sub_category_id: Number(sub_Category_id),
//       target_selling_price: Number(self.view.tbxTargetSellingPrice.text),
//       year_of_making: Number(year_Of_Make),
//       chassis_number: self.view.tbxChasisofNumber.text,
//       branch: Number(self.branchId),
//       minimum_selling_price: Number(self.view.tbxMinimumSellingPrice.text),
//       no_of_keys: Number(self.keyId),
//       color: Number(self.colorId),
//       pickUpVehicle: self.pickup,
//       fuel: Number(self.fuelId)
//     };

//     var plate = self.view.tbxNumberPlate.text;
//     if (plate && plate.trim() !== "") {
//       requestPayload.previous_numberplate = plate.trim();
//     }
    
//     var headers = {
//       "user_token": voltmx.store.getItem("getUserAccesstoken"),
//       "Content-Type": "application/json"
//     };

//     // Replace these with your actual Foundry service & operation names
//     var serviceName = "ms_fleet";
//     var operationName = "addfleet";

//     var client = voltmx.sdk.getCurrentInstance();
//     var integrationSvc = client.getIntegrationService(serviceName);

//     integrationSvc.invokeOperation(
//       operationName,
//       headers,
//       requestPayload,
//       function (response) {
//         voltmx.application.dismissLoadingScreen();

//         if (response.message === "Fleet created successfully") {
//           self.objidforfleet = response.data.object_id;
//           self.view.flxSellCarSuccess.setVisibility(true);

//           if (self.selectedPdfBase64 && self.selectedPdfFileName) {
//             self.fleetDocUpload();
//           }
//         } else {
//           var message = response.message || "Something went wrong.";
//           var details = response.details || (response.error && response.error.details);
//           if (details && typeof details === "object") {
//             for (var key in details) {
//               message += "\n" + key + ": " + details[key];
//             }
//           }
//           alert(message);
//         }
//       },
//       function (error) {
//         voltmx.application.dismissLoadingScreen();
//         alert("Failed to submit fleet: " + JSON.stringify(error));
//       },
//       {
//         passthrough: true 
//       }
//     );
//   });
// },
  
 invokeUploadFleetDoc: function()
  {
  
    var self = this;
    // Sample code to fetch the integration service details with passthrough 
var serviceName = "fry_collection";   
// Get an instance of SDK
var client = voltmx.sdk.getCurrentInstance();
var integrationSvc = client.getIntegrationService(serviceName);
var operationName = "upload-fleet-documents";
     var userToken = voltmx.store.getItem("getUserAccesstoken");
    var userid = voltmx.store.getItem("userId");
    
var params = {
    "user_id": userid,
        "moduleName": "UploadFleetDocuments",
        "is_org": "0",
        "category": "Possion_Letter",
        "object_id": self.objidforfleet,
        "file_details": [
            {
                "filename": self.selectedPdfFileName,
                "base64": self.selectedPdfBase64 // You need to encode file as base64 and insert it here
            }
        ],
        "user_token": userToken
};
var headers = {
//     "custom-header-key1": "custom-header-value1"
}; //If there are no headers, pass null
// options is an optional parameter that helps in configuring the network layer.
integrationSvc.invokeOperation(operationName, headers, params, function(response) {
    voltmx.print("Integration Service Response is: " + JSON.stringify(response));
}, function(error) {
    voltmx.print("Integration Service Failure: " + JSON.stringify(error));
}, {
    "passthrough": true
});
  },
  
  
  
    downloadDynamicFile: async function () {
    alert("Entered downloadDynamicFile function");
 
    var fileSource = this.dynamicURL();
//     alert("Received file source: " + fileSource);
 
    var isBase64 = fileSource.startsWith("data:");
    var fileName = this.extractFileNameFromUrl(fileSource).replace(/[^a-zA-Z0-9_.-]/g, "_");
 
    // Ensure correct file extension
    if (!fileName.endsWith(".csv") && !fileName.endsWith(".xlsx")) {
      // Attempt to detect type
      if (fileSource.includes("base64") && fileSource.includes("csv")) {
        fileName += ".csv";
      } else {
        fileName += ".xlsx";  // Default to Excel
      }
    }
 
    var platform = voltmx.os.deviceInfo().name;
    var filePath;
 
    if (platform === "android") {
//       filePath = "/storage/emulated/0/Download/" + fileName;
      filePath = "All Files/Download/" + fileName;
    } else {
      var baseDir = voltmx.io.FileSystem.getDataDirectoryPath();
      filePath = baseDir + voltmx.io.FileSystem.separator + fileName;
    }
 
    var file = new voltmx.io.File(filePath);
    if (file.exists()) {
      file.remove();
    }
 
    file.createFile();
 
    try {
      if (isBase64) {
        var base64Content = fileSource.split(",")[1];
        var byteArray = voltmx.convertToRawBytes(base64Content);
 
        var success = file.write(byteArray);
        if (!success) {
//           alert("Failed to write Base64 file.");
          return;
        }
        alert("Base64 file saved to:\n" + filePath);
        voltmx.application.openURL("file://" + filePath);
 
      } else {
        var httpClient = new voltmx.net.HttpRequest();
        httpClient.responseType = constants.HTTP_RESPONSE_TYPE_ARRAYBUFFER;
 
        httpClient.onreadystatechange = function () {
          if (httpClient.readyState === 4) {
            if (httpClient.status === 200) {
              var fileData = httpClient.response;
              var success = file.write(fileData);
              if (!success) {
                alert("Failed to write downloaded file.");
                return;
              }
              alert("File downloaded to:\n" + filePath);
              voltmx.application.openURL("file://" + filePath);
            } else {
              alert("Failed to download file. Status: " + httpClient.status);
            }
          }
        };
 
        httpClient.open("GET", fileSource, true);
        httpClient.send();
      }
    } catch (e) {
      alert("Exception: " + JSON.stringify(e));
    }
 
//     alert("Exit downloadDynamicFile function");
  },
 
  dynamicURL: function () {
    // Put either .csv or .xlsx URL here
    return "https://dev-hcltx.et.ae/dx/api/dam/v1/collections/ff082e9d-0cc2-4dcd-83aa-14c7eee376e9/items/50a7582f-760c-4484-82a6-e1fd36e3ec12/renditions/2ef39f97-3deb-4136-ac7f-3257694ce7b3?binary=true";
    
//      return "https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv";
  },
 
  extractFileNameFromUrl: function (url) {
    try {
      if (url.startsWith("data:text/csv;base64,")) {
        return "Base64_" + Date.now() + ".csv";
      }
      if (url.startsWith("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,")) {
        return "Base64_" + Date.now() + ".xlsx";
      }
 
      var match = url.match(/[\?&]filename=([^&#]*)/i);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
 
      var path = url.split("?")[0];
      var parts = path.split("/");
      var last = parts.pop();
 
      // Add fallback extension
      if (!last.includes(".")) {
        last += ".xlsx";
      }
 
      return last || "Downloaded_" + Date.now();
    } catch (e) {
      return "Downloaded_" + Date.now() + ".xlsx";
    }
  },
  
    excelCheck: function() {
    try {

      
      
      var VoltMXMain = java.import("com.konylabs.android.KonyMain"); 
     var Testexcel = java.import("com.example.excelfileupload.Testexcel");
     Testexcel.pdfCallback = this.excelCallBack;
     var activityContext = VoltMXMain.getActivityContext();
     var Intent  = java.import("android.content.Intent");
     var intentObj =  new Intent(activityContext, Testexcel.class);
     activityContext.startActivity(intentObj);
 
    } catch (e) {
        alert("Error: " + e.message);
    }
 },
  
  
  excelCallBack: function (data) {
    

    voltmx.print( "selcted pdf callback data:::" + data) ;
//     alert("Filename selected :::"+data);
    
    let pdfData = null;

if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    try {
        const dataJsonStr = JSON.stringify(data);
        pdfData = JSON.parse(dataJsonStr);
//        this.view.Label0c87133cdd6494c.text =pdfData.fileName;
//     alert(pdfData.fileName);
//     this.view.Label0cef3722d379d40.text =  pdfData.pathname;
    
//     this.view.Label0f49ecbe269be4c.text= pdfData.base64pdf;
      

      
       var base64 = data.base64pdf;  // <-- define base64 here

  this.parseCSVBase64(base64);
      

    } 
    
    catch (error) {
        alert("Failed to clone data:", error);
        pdfData = null;
    }
}
    
 
    
    
  },
  
  
  
  
 

parseCSVBase64: function(base64) {
  var self = this;
  try {
    voltmx.print("Entered parseCSVBase64");

    var decoded = "";
    
     const userToken = voltmx.store.getItem("getUserAccesstoken");


    if (typeof atob === "function") {
      // Use atob if available
      decoded = atob(base64);
    } else {
      // Use Java Base64 decode (NFI)
      var Base64 = java.import("android.util.Base64");
      var decodedBytes = Base64.decode(base64, Base64.DEFAULT);
      for (var i = 0; i < decodedBytes.length; i++) {
        decoded += String.fromCharCode(decodedBytes[i]);
      }
    }

    voltmx.print("CSV Decoded: " + decoded);

    var lines = decoded.split("\n").filter(line => line.trim() !== "");
    var headers = lines[0].split(",");

    var jsonData = [];

    for (var i = 1; i < lines.length; i++) {
      var data = lines[i].split(",");
      if (data.length === headers.length) {
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = data[j].trim();
        }
        jsonData.push(row);
      }
    }
    voltmx.print(jsonData);
    self.jsonData = jsonData;
    self.view.btnMultipleSubmit.setEnabled(true);
    self.view.btnMultipleSubmit.skin = "sknBtn61b35cDubai45pxmedium";
//     self.invokeCreateMulipleFleet(jsonData);
    voltmx.print("Parsed JSON: " + JSON.stringify(jsonData));
//     alert("Parsed JSON:\n" + JSON.stringify(jsonData));
    
    
   
    
  } catch (ex) {
    alert("Error in parseCSVBase64: " + ex.message);
  }
},
  
  invokeCreateMulipleFleet: function() {
  var self = this;
    checkTokenValidatity(function () {
   voltmx.application.showLoadingScreen(null, "Adding Fleet...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

//   var verification_type = "Email";
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var userobj = voltmx.store.getItem("userObj");
  var nick = voltmx.store.getItem("username");
   
     var baseURL = voltmx.store.getItem("BASE_URL");
   var endURL = "services/ms_fleet/api/v1/create-fleet-batch";
       if(baseURL){
    if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
       }
      
       var appkey =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
   var appsecret =  voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    
    var encodeVal = base64Encode(appkey + ":" + appsecret);
  var usertoken = voltmx.store.getItem("getUserAccesstoken");
  var url = baseURL + endURL;

  var request = new voltmx.net.HttpRequest();
  request.open("POST", url);
 
    request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("user_token",usertoken);
    
    request.setRequestHeader("Authorization","Basic "+encodeVal);

  request.onReadyStateChange = function () {
    if (request.readyState === 4) {
      voltmx.application.dismissLoadingScreen();
    if (request.status === 200) {
    var response = JSON.parse(request.responseText);

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Check if all items have status === "Success"
        var allSuccess = response.data.every(item => item.status === "Success");

        if (allSuccess) {
            self.jsonData = "";
//             alert("All fleets added successfully!");
            self.view.flxSellCarSuccess.setVisibility(true);

        } else {
            self.jsonData = "";
            alert("Some fleets failed to add. Please check the response.");
            console.log("Fleet batch response:", response.data);
        }
    } else {
        alert("Unexpected response format.");
    }
}
 else {
        }
      } else {
      }
   
  }.bind(this);

 self.jsonData.forEach(function(item) {
    // Convert year_of_making to integer and rename to year_of_make
    if (item.year_of_making) {
        item.year_of_making = parseInt(item.year_of_making, 10);
        
    }
   
    if (item.target_selling_price) {
        item.target_selling_price = parseInt(item.target_selling_price, 10);
        
    }
   
   if (item.minimum_selling_price) {
        item.minimum_selling_price = parseInt(item.minimum_selling_price, 10);
        
    }
    item.client_user_id = nick;
    // Remove pickUpVehicle if it exists
    if ('pickUpVehicle' in item) {
        delete item.pickUpVehicle;
    }
});
    
  var requestData = JSON.stringify({
     "data": self.jsonData
  });

  request.send(requestData);
    });
 
},
  
  numPlateTextChange: function() {
  var plateText = this.view.tbxNumberPlate.text.trim();
  var regex = /^[A-Z]{1,2}\s?[1-9][0-9]{0,4}$/;
 
  if (plateText === "" || !regex.test(plateText)) {
    this.view.lblNumberplateValidation.setVisibility(true);
    
  } else {
    this.view.lblNumberplateValidation.setVisibility(false);
  }
},
//   invokeFleetService: function() {
//   try {
//     var serviceName = "ms_fleet";
//     var integrationObj = VMXFoundry.getIntegrationService(serviceName);
//     if (!integrationObj) {
//       kony.print("Integration service not found");
//       return;
//     }
//   var usertoken = voltmx.store.getItem("getUserAccesstoken");
//     var operationName = "addfleet";

//     // JSON body
//     var data = {
//       "category_id": 220,
//       "sub_category_id": 456,
//       "target_selling_price": 29000.10,
//       "year_of_making": 2023,
//       "chassis_number": "UAE2111345",
//       "branch": "Dubai",
//       "minimum_selling_price": 28000.00,
//       "previous_numberplate": "UAE 07K 2025",
//       "no_of_keys": "2",
//       "color": "black",
//       "pickUpVehicle": true
//     };

//     // Get token from VoltMX store
    
//     // Set headers
//     var headers = {
//       "user_token": usertoken,
//       "Content-Type": "application/json"
//     };

//     // Invoke the service operation
//     integrationObj.invokeOperation(operationName, headers, data,
//       function successCallback(res) {
//         kony.print("Success response: " + JSON.stringify(res));
//         // handle success here
//       },
//       function failureCallback(err) {
//         kony.print("Error response: " + JSON.stringify(err));
//         // handle failure here
//       }
//     );
//   } catch (e) {
//     kony.print("Exception in invokeFleetService: " + e.message);
//   }
// }
  
  getBase64CSV: function()
  {
    return "UEsDBBQAAAAAAHB/77+9Wu+/vWwj77+977+9GwAA77+9GwAAEgAAAEluZGV4L0RvY3VtZW50Lml3YQDvv70bAO+/vV/vv711OAgBEjQIARIDAQAFGO+/vQsiCwoFCgMIAREQAxgAKhvvv73vv70377+977+9N++/ve+/vTfdoTfvv73vv7033J4377+977+9N++/ve+/vTfvv73vv703CgQI3J43IgQI77+977+9NyoECO+/ve+/vTcyBAjvv73vv703Qu+/vQsK77+9CyIPZW5fSU5Acmc9aW56enp6OgQI77+977+9N0oPZW5fSU5AFRfvv71QAWAAeAHvv70BAe+/vQHvv70KCgczMzAyLjEwEglncmVnb3JpYW4aBGxhdG4iB0phbnVhcnkiCEZlYnJ1AQpcBU1hcmNoIgVBcHJpbCIDTWF5IgRKdW5lAQZobHkiBkF1Z3VzdCIJU2VwdGVtYmVyIgdPY3RvAQkMCE5vdgkTDAhEZWMFCgQqBwpiACoVYgAqCWIAKgliACoBYgAqBWIBBghseSoKYgAqGWIAKhFiACoVYgAqFWJMMgNKYW4yA0ZlYjIDTWFyMgNBcHIBChR5MgNKdW4BBWhsMgNBdWcyA1NlcDIDT2N0MgNOb3YyA0RlYzoBPAA6ATwAOgE8ADoBPAEKBHk6ATwBBQRsOgE8ADoBPAA6ATwAOgE8ADoBPCxCBlN1bmRheUIGTW8FCBAHVHVlcwEREAlXZWRuCQsQCFRodXIFFQwGRnJpAR0kCFNhdHVyZGF5SgpAAEoKQABKEUAAShlAAEoVQABKCkAAShVA77+9UgNTdW5SA01vblIDVHVlUgNXZWRSA1RodVIDRnJpUgNTYXRaA1N1bloBIwBaASMAWgEjAFoBIwBaASMAWgEjTGICQU1qAlBNcgFKcgFGcgFNcgFBBQYASgUSYEFyAVNyAU9yAU5yAUR6AUp6AUZ6AU16AUEFBgBKBRJwQXoBU3oBT3oBTnoBRO+/vQEBU++/vQEBTe+/vQEBVO+/vQEBVwoIAEYBGAjvv70BAQEEIE3vv70BAVTvv70BAVcKCABGARhM77+9AQsxc3QgcXVhcnRlcu+/vQELMm5kHQ4EM3IuDgAINHRoERwA77+9MjgAAO+/vTI4AATvv70BLjgABO+/vQEuOAAQ77+9AQJRMQEFADIBBQAzAQUENO+/vQEUAQUAMgEFADMBBe+/vUA077+9AQJCQ++/vQECQUTvv70BCkJlZm9yZSBDaHJpc3Tvv70BC0Fubm8gRG9taW5p77+9AQhkZC9NTS95ee+/vQEHZCBNTU0gee+/vQEIBQosTSB577+9AQ5FRUVFLCARETTvv70BCGg6bW3igK9h77+9AQsBCwg6c3MBDgjvv70BCh0OECB677+9ARAyEADvv71Penp677+9AgEu77+9AgEs77+9AgEu77+9AgEs77+9AgEr77+9AgEt77+9AgFF77+9AgEl77+9AgPigLDvv70CBCviiJ7vv70CA05hTu+/vQIMIywjIywjIzAuIyMj77+9AgMjRTDvv70CCSMsCRUcJe+/vQIPwqTCoBUlTDAw77+9AgNJTlLvv70DCQoDQVVEEgJBJAUMREJSTBICUiTvv70DCgoDQ0FEEgNDARksCwoDQ05ZEgRDTsKlBRscRVVSEgPigqwFNBhHQlASAsKjBRkYSEtEEgNISwlBCElMUwEmAO+/vQUaBElOBTME77+977+9AU4YSlBZEgRKUApOCEtSVwEoAO+/vQUoGE1YThIDTVgJQhhOWkQSA05aCQoIUEhQAScA77+9BScEVFcBGixUJO+/vQMICgNVU0QSAQklCFZORAElAO+/vQVnIFhBRhIERkNGQQUzVFhDRBIDRUMk77+9Aw4KA1hPRhIHRuKArwUeLAsKA1hQRhIEQ0ZQRgXvv708WFhYEgLCpBoCZW4iBAjvv73vv73vv73vv73vv73doTcyBAjvv73vv703QABiBAjvv73vv703cAB4AO+/vQEAWgZpc28tYTRiCgoA77+9FEQVAO+/vVJEEAEgDBIKCO+/ve+/vSUEABABORASCgjvv70E77+9NkgRCA8I77+9AQhYCFQIHggfCD4gAC3vv70bDBInCAIJIe+/vdCEASob77+9N++/ve+/vTfdnjfvv70377+9N++/vTfenjffnjfvv73vv703CgdTaGVldCAxEgQI77+9NxgBKAEwAT0AAO+/ve+/vUAAUhQKAADvv71CFQAA77+9Qh0AAO+/vUIlAADvv71CWAFgAW0AAO+/vUF1AADvv71B77+9AQQI3Z4377+9AQQI77+9N++/vQEECO+/vTfvv70BBAjvv70377+9AQQI3p4377+9AQQI354377+9AQQI77+977+9N++/vQEA77+9AQDvv70BBAjvv73vv70377+9AQHvv70BABAI3Z43EgoI77+9FxIDAQAFGAAYCO+/vTcSEgjvv70PEgMBAAUYQSoG77+977+9N++/ve+/vTcIARIE77+977+9VAoKCAgAEgQI77+977+9NzIICgYIABAAGAA6ERYU77+977+9N1ABchUYBO+/vQEVCwgYCO+/ve+/vVoAYloAAO+/ve+/vVoAYloAAO+/ve+/vVoAWloAIBsI3543EhUI77+9LWg8UioJ77+977+9N++/ve+/vTfvv73vv703CAESBCFrEBoD77+877+9cAEASjF8BO+/ve+/vV58AQAQARwMEgoI77+9Cm5ADwoCEAAQACIHZGVjaW1hbBhBHwQSEhXvv70IQSoGCe+/vRHvv73vv73vv70AWu+/vQEE77+9AQ4dCRQS77+9AQjvv71daRbvv71eAe+/vRQq77+9AcSVN++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703wpU3w5U377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9N++/ve+/vTfvv73vv70377+977+9N9KXN++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTcyBgcICAgICArvv70UGgVCbGFuayIECO+/ve+/vTdSGAgBHe+/ve+/vX8/JQAA77+9Py1177+9fz81AADvv70/YAFSGAgBHR0GVj8lHAZWPy0cBlY/NQAA77+9P2ABUhgIAR3vv73vv70SPyXvv73vv70SPy3vv73vv70SPzUAAO+/vT9gAVIYCAEdTO+/ve+/vT4lSu+/ve+/vT4tTO+/ve+/vT41AADvv70/YAFSGAgBHQAAAAAlAAAAAC0AAAAANQAA77+9ETQQAAAAACUBBQAtAQUANQEFCGABUgE0PO+/vdisPiV977+9QT8t77+977+9fz81ABnvv70cfe+/vSc6Je+/vTMiRhoAMOOStzQldu+/ve+/vT4t77+977+9OjI0ADAsNu+/vTolCD3vv70+LQEAADIaADBKae+/vT4lJe+/vX0/LXfvv71qMhoAMEXvv73vv709JdWkZz8tf++/vU8yGgAB77+9ICXvv73vv70rPy1f77+9DkYaACBE77+977+9Pi3HtO+/vT4u77+9ADDvv73vv70IPyXvv73vv716Py0GYu+/vTIaADDvv73vv73vv70+JVMnWT8tSCdZMhoANH/vv73vv709Je+/ve+/vTE/Le+/vRXvv706Lk4AMO+/ve+/ve+/vTslP++/ve+/vT4tPe+/ve+/vTIaACEpICXvv71IcT8t77+9X++/vTJOAAUaHBctWj8tUO+/vUgyGgAg77+9fj8ldzwuPzHvv71VCCDvv70Ecz8l77+9Re+/vT5CGgAFThzvv73vv70WPy3vv73vv70KMgQBIe+/vSAl77+9Bu+/vT4t77+9ce+/vTJoADTHn24/Je+/vRAKPi3vv73vv70+PS7vv70ANC9ONT8lCwnvv709LVLvv73vv70yLhoABWgcM2EVPy0K77+9SjJoAAUaHO+/vTrvv70+LVnvv70hMhoAMGNUVD8lb++/ve+/vT0t77+977+977+9Mu+/vQAw77+977+9Fz8l77+9Dlw9Le+/vXfvv70RGjDvv70G77+9DApeElwIABIkCmJ8AgAVIe+/vSHvv70APwomUm4CABUB77+9BSYF77+9ICAAKgUV77+9y5ZAMmAAUloCQmAALCDvv73vv700Je+/ve+/ve+/vT4t77+977+9FcaSYABSUgJCYABSRALvv71gADBBcHs/Je+/ve+/vWI/Le+/vStJMUZCYAAhCgwl77+977+9EzJWAu+/vWAAUkICQmAAUjQC77+9YAAw77+977+9fz8l77+977+9FT8tJ1NLUTpCYAAs77+9RRc/Je+/ve+/vV49LVR0VSxeYAAYEkoaSBACGkE+HO+/vTXvv70+Je+/ve+/vUEB77+9AO+/vQFeLAA/YAEiCgoAAO+/vUMVAQUYMgIICEABSgEsMO+/ve+/ve+/vT4l77+977+9ED8t77+977+9LwEsYXodTEIqAmpMADDvv73vv71oPiXvv73vv70iPy3vv73vv70XSkwAQhYCSkwAAAcK77+9EO+/ve+/ve+/vT4lAe+/vQwt77+977+977+9Me+/vR3vv71C77+9AUpMABHvv70BRyAl77+977+977+9Pi3vv73vv708SkwAQhYEakwAMO+/ve+/vSY/Je+/ve+/ve+/vT4t77+977+9VEpMADDvv70dTD8l77+9NSY+Le+/vS7vv70BIGpMADDvv73vv70VPyXvv73vv73vv70+Le+/ve+/ve+/vQEsIXwEGi/vv70CYe+/vTLvv70GARwQFQAA77+9QgEbCEAgBe+/vRAQPzABOAB6MQAANAExDO+/vUAgBO+/vTEACWIIQSAK77+9MQAFYgQAAAUxAEAJ77+9ADZ+77+9ABhdcCo/IA8tIe+/vSgwATgCUgUKeRnvv73vv73vv704AAExBTgFaQE4DO+/ve+/vSg+ejgAAADvv702EAAgHC0ACTgYAUoFFe+/ve+/vTHvv704ABQz77+9FkEgHi44ADQAAO+/vT4iBAjvv73vv703IgQI77+9BQYA77+9BQYA77+9BQYA77+9BQYE77+977+9DkcKAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGBO+/ve+/vQ5lChjvv73vv703OgQI77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYY77+977+9N0IECO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGOMOVN0oECMSVN++/vQbvv70BCgQOYQwQCgQI77+977+9AQYA77+9BQYA77+9BQYA77+9BXYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BXwA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BXwE77+977+9Ae+/vQDvv70FBgDvv70FBgDvv70FBgDvv70FBijvv73vv70377+9ByQKBAjvv73vv70B77+9AO+/vQUGBO+/ve+/vQEMAO+/vQUGAO+/vQUGEO+/ve+/vTfvv70MAScE77+9ARsE77+977+9AQYA77+9BQYA77+9BQYA77+9BQYo77+9N++/vQoSCgQI77+977+9ASEk77+977+9NxIECO+/ve+/vTcVATgQEg8I77+9LhY/CzQGKgPvv73vv703GgQI77+977+9N++/vQMBBmAS77+9Agjvv70wEgMCBAAY77+9ASIJCgMKASMQARgACQsAIhkLACEZCwAbGQsAGhkLABkZCwAYGQsAFxkLACAZCwAfGQsAHhkLAB0ZCwAcGQsAERkLABAZCwAPGQsADhkLAAoZCwAWGQsAFRkLABQZCwATGQsAEgEL77+9VSpR0ZY305Y31JY31ZY30pY377+977+9N++/ve+/vTfvv70377+9N9aWN9eWN9iWN9mWN9qWN9uWN9yWN92WN96WN9+WN++/ve+/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv703EicIJV0UAAAYRCobal8AEAoECO+/ve+/vSHvv70E77+977+9Ie+/vQDvv71lMADvv71lEgTSlmESBNOWYRIE1JZBVATVlkHvv71I0ZY3UgQI77+9N1oECO+/vTdgAGoEATIAcgUGAHoFBgTvv70BBQcA77+9CQcO77+9DwTWlhLvv70PQNeWN++/vQEECNiWN++/vQEECNmWNw7vv70PRNqWN++/vQEECO+/ve+/vTfvv70BBAjvv70377+9DhYQ77+9Ru+/vTfvv70BBAjvv70377+9AQQI77+9N++/vQEECNuWN++/vQEECNyWN++/vQEECN2WN++/vQEECN6WN++/vQIECN+WN++/vQIECO+/vTfvv70CBAjvv70377+9AgQI77+977+977+9AAXvv70AFWEBNu+/vQIA77+9Re+/vRDvv73vv70377+9AwEGBBLvv73vv73vv70C77+977+9Au+/ve+/vQLvv73vv70CWe+/vVBX77+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9Te+/ve+/vT7vv73vv70377+977+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9NxItCFnvv70AIe+/vWUAVe+/vQDvv71F77+9AO+/vV3vv70A77+9Re+/vQDvv71F77+9AO+/vUXvv70A77+9Re+/vQDvv71F77+9AO+/vUXvv70Y77+977+9N2ABagQBOAByBQYAegUGQe+/vQTvv73vv71F77+9BO+/ve+/vUXvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQTvv73vv71F77+9AO+/vUnvv70E77+977+9Re+/vQjvv73vv703Qe+/vQDvv73vv73vv71p77+977+977+9AAAV77+977+9Nu+/vQIA77+9Re+/vQDvv71F77+9BO+/ve+/ve+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQI277+9AjTvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9Mu+/vQLomZc377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9Ou+/vQLvv71lAGrvv70CBO+/ve+/ve+/ve+/vQTvv73vv73vv73vv70E77+977+977+977+9BO+/ve+/ve+/ve+/vQTvv73vv73vv73vv70E77+977+977+977+9EO+/ve+/vTdgAu+/ve+/vQIE77+977+977+977+9BO+/ve+/ve+/ve+/vQTvv73vv73vv73vv70E77+977+977+977+9BO+/ve+/ve+/ve+/vQTvv73vv73vv73vv70I77+977+9N++/ve+/vQTvv73vv73vv73vv70E77+977+977+977+9BO+/ve+/ve+/ve+/vQTvv73vv73vv73vv70E77+977+977+977+9CO+/ve+/vTfvv73vv70E77+977+9Re+/vQjvv73vv70377+977+9AO+/vUnvv70A77+9Se+/vQDvv71y77+9Au+/ve+/vQAAFQ7vv70INu+/vQIA77+9Re+/vQDvv71F77+9AO+/ve+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQI677+9AjDvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9Nu+/vQLos5c377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9Ou+/vQLvv71lAGrvv70CAO+/vUXvv70A77+9Re+/vQDvv71F77+9AO+/vUXvv70A77+9Re+/vQDvv71F77+9EO+/ve+/vTdgA++/ve+/vQIA77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vXLvv70C77+977+9AAAVDu+/vQs277+9AgDvv71F77+9EO+/ve+/vTfvv70DAQYEEu+/ve+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQgm77+9CDhU77+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vQ7vv70IAO+/vRJjC++/vT7NlzfOlzfvv73vv70377+977+9N++/ve+/vTfvv73vv703wpc3w5c3xJc3xZc3xpc3x5c3yJc3yZc3ypc3y5c3zJc3z5c30Jc30Zc3EioIJu+/vQgAHnZiAFXvv70WZgsA77+9Ku+/vQgA77+9Re+/vQDvv71F77+9AO+/vUXvv70A77+9Re+/vQDvv71F77+9AO+/vUXvv70Yzpc3YARqBAE4AHIFBgB6BQYO77+9CADvv70W77+9CADvv70W77+9CADvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQHvv70MAQQI77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71d77+977+977+9AAAVDk8ONu+/vQIA77+9Re+/vQDvv71F77+9BO+/ve+/ve+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQI277+9AkjTlzfVlzfWlzfXlzfUlzfvv73vv70377+9Re+/ve+/ve+/vTfvv7032Jc32Zc32pc325c33Jc33Zc33pc335c377+977+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9Ou+/vQJ2YgBV77+9AO+/vRJgCwDvv71F77+9AO+/vRI7DgDvv71F77+9AO+/vUXvv70A77+9Re+/vQDvv71F77+9AO+/vUXvv70A77+9Re+/vRjvv703YAVqBAE4AHIFBgB6BQZB77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDjqaoA77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71J77+9AO+/vUnvv70A77+9Se+/vQDvv71d77+977+977+9AATvv70BDmoRFBLvv70BCO+/vScWDBHvv73vv73vv70CKn7vv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTcKBAjvv73vv70O77+9DwTvv73vv70O77+9DwDvv70FBgTvv73vv70OQxME77+977+9DisTAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGBO+/ve+/vQ5jCgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBu+/ve+/ve+/vTc6EFtIXe+/vWHvv71IHe+/ve+/vVnvv70fWHwJ77+977+9BAYKBAjvv73vv70377+9AQ4KEz7vv70B7aCr7bWYN++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703wpg3w5g3xJg3xZg3xpg3x5g3yJg3yZg3ypg3y5g3zJg3zZg3zpg3z5g30Jg30Zg30pg305g31Jg31Zg31pg315g32Jg32Zg32pg325g33Jg33Zg33pg335g3CgQI77+977+9NxIECO+/ve+/vTcaBAjvv73vv703GgQI77+977+9NyIECO+/ve+/vSHvv70A77+9Je+/vQDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70F77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vSHvv708Ue+/vXrvv73vv73vv71N77+9czAZ77+9PW3vv70t77+9AO+/vSXvv70E77+977+9Qu+/vQHvv73vv73vv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTcKBAjvv70l77+9AO+/vWVGAO+/vQUGAO+/vWVMAO+/vSXvv70A77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9Be+/vQDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgTvv73vv71h77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGUO+/ve+/vTc6EO+/vUPvv71PPUhM77+977+9Wh8L77+91LM3Le+/vQTvv73vv71hTADvv71G77+9Ae2gqO29mTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9NwoECO+/ve+/vTcSBAjvv73vv703GgQI77+977+9NxoECO+/ve+/vTciBAjvv73vv71hTATvv73vv70BBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70F77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vSHvv70877+9Ezts77+9TzPvv73vv70IDy87Q++/vS3vv70A77+9Je+/vQDvv71G77+9Ae+/ve+/ve+/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N8KZN8OZN8WZN8aZN8eZN8iZN8mZN8qZN8uZN8yZN82ZN86ZN8+ZN9CZN9GZN9KZN9OZN9SZN9WZN9aZN9eZN9iZN9mZN9qZN9uZN9yZN92ZN96ZN9+ZN++/ve+/vTfvv70377+9N++/vTcKBAjvv70l77+9BO+/ve+/ve+/ve+/vQDvv70FBgTvv73vv73vv73vv70A77+9Je+/vQDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70F77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vSHvv708WW0e77+9Ge+/vUd677+977+9CEPvv73Npxwt77+9AO+/vSXvv70E77+977+9Qu+/vQTvv73vv73vv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTcKBAjvv70l77+9AO+/vSXvv70A77+9BQYA77+9Je+/vQDvv70l77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQXvv70A77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYE77+977+977+977+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQZQ77+977+9NzoQGe+/ve+/vUBV77+9Tnvvv70cKu+/vQJtUgot77+9DO+/ve+/vTcVDlEvDBIPCO+/vRp1KRAGKgPvv73vv70OYAkM77+977+9NxgBBQQSEhUcDAwqBu+/vRLvv70vEBIECO+/ve+/vUHvv70A77+9Di8bBO+/ve+/vTpBACDvv703GgQI77+9N1BLAwQUAAAAAAAH77+977+9Wu+/vUvvv715BAQAAAQEAAATAAAASW5kZXgvVmlld1N0YXRlLml3YQAABADvv70WdBUI3aE3Eg8I77+9ARIDAQAFGAYqA82mNwoECM2mN++/vQEBBhASLgjvv71dCR3vv71h77+9ASohzqY3z6Y30KY30aY30qY306Y31KY31aY31qY316Y377+9NxI3CAASC++/ve+/vQPvv73vv70D77+977+977+977+9Dxh8Kg/vv70377+9N++/vTfvv70377+9NzgAQgcLAO+/ve+/ve+/ve+/vQ9SAwoBHFoDAgAZEjcIAEI5ADDdpjfepjffpjfvv70377+9CTkECgEFVwRSA3I5ADDYpjfZpjfapjfbpjfvv70KOQAAOjkA77+9GAEIADAAcAF4AO+/vQEA77+9AQHvv70BAe+/vQEKCgAAOEMVAAA8Qu+/vQEKIO+/ve+/vUQVAEBgRO+/vQEKOADvv71EFQDvv711RO+/vQEeCgQI77+9JSoA77+9BQYA77+9BQYA77+9BQbvv73Spjfvv70BAO+/vQEA77+9AXkKFQjvv73vv73vv73vv73vv73vv73vv71BEO+/ve+/ve+/ve+/veqIs++/ve+/vQESYAoAAO+/vT8SCgrvv73vv70FbhwA77+9HQAAAAAqAX8IAAAVAQwQMAE4AEIBIRxFRBXvv73vv70YREodHAhQA1oB77+9AO+/vQVwAO+/vQUGAO+/vQUGAO+/vQUGRNemN++/vQEECO+/vTfvv70BAO+/vQIA77+9AgFR77+977+9AO+/ve+/vQAA77+9BX0A77+9BQYA77+9BQYA77+9BQYI77+9N++/vXwA77+9fAAA77+9BWoA77+9BQYA77+9BQYA77+9BQYA77+977+9fADvv718AADvv70FagDvv70FBgDvv70FBgDvv70FBgzcpjcQQSYMEgoI77+9bWEEABBBMQwSCgjvv71tVTAICgQI3J43EAAQCNCmARkE77+9F2luHAYKBAjvv703EEFVDBIKCO+/vREXABIFFwBIQWYQEkII77+9LwkuMO+/vQEiCQoDCgEJEAEYAAkLCAoQAxELAAwZCwALGQsACgELRCAGKgsKAgAKABIEEAoYAjIUCi4PABwSBQoBAAEAQi4UAABKBe+/ve+/vVIxCi8KFQjvv73vv73LtN6f77+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70kEhYI2rLvv73vv73vv73vv73Zm++/vQEQwqrvv73vv73Psu+/ve+/ve+/vQFaAGIvChZWHAAAElZLAARqL++/vTEAABBhFDZwAQDvv70lV0pwAQDvv70FGUJwAQDvv70FF0JwAQTXpu+/vXAB77+9cAHvv71wAe+/vXABTnABABHvv71lEBILCO+/vRhJ77+9eO+/vQEKGAgBHXfvv73vv709Je+/ve+/ve+/vT4tbe+/vXs/NQAA77+9P2ABEAAdAQkgJQAA77+9QC0AAAABGAgAQD0BFBRFAAAQQU0BChxVAADvv71BWABiYkYAAGoBGjQI77+977+9PiXvv73vv71YPy3vv73vv73vv70+CmAAcgEaMCPvv715PyXvv73vv71MPi3vv70RGgB6ARow77+977+9fD8lYO+/vVA/LX9qPBEaABDvv73vv702MAIA77+9RQBKMAIA77+9BRlCMAIA77+9BRdCMAIA77+977+9MALvv70wAu+/vTAC77+9MAJSMAIAEO+/vS02cAEA77+9JUBKcAEA77+9BRlCcAEA77+9BRdCcAEA77+977+9cAHvv71wAe+/vXAB77+9cAFacAEA77+9JS/dgADvv70FEUpwAQDvv70FGUJwAQDvv70FF0JwAQDvv73vv71wAe+/vXAB77+9cAHvv71wAVJwAVBLAwQUAAAAAAAH77+977+9Wljvv73vv71B77+9DgAA77+9DgAAIgAAAEluZGV4L0NhbGN1bGF0aW9uRW5naW5lLTkwNTA4OC5pd2EA77+9DgDvv70977+977+9SQjvv73vv703EkMI77+9HxIDAQAFGO+/vQMiCgoECgICBhABGAAqKt6hN++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70336E377+977+9NxLvv70DGu+/vQIKCggAEgkQ77+9BRgAIAAoAAocCAESGBDvv73vv73vv73vv70JGO+/ve+/ve+/ve+/vQog77+977+977+977+9Dyjvv73vv73vv73vv70DChwIAhIYEMSC77+977+9CRjvv73vv71GHgAYAxIYEMuC77+9Wh4AEAQSGBDvv71iHgAQBRIYEO+/vWIeABAGEhgQ77+9Yh4AEAcSGBDvv71iHgAQCBIYEO+/vWIeABAJEhgQ77+9Yh4AEAoSGBDvv71iHgDvv71JCxIYEO+/vdS477+9Dxjvv73vv73vv73vv70MIO+/ve+/ve+/ve+/vQUo77+977+977+977+9DgoaCAwSFhDcuu+/ve+/vQIY77+977+977+977+9CiDvv73vv73vv71LKNC377+9KigHMgQI3qE3MgQI77+977+9NzIECO+/ve+/vQEGBO+/ve+/vQEGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUG0I7vv703GgQI36E3MO+/ve+/ve+/ve+/ve+/ve+/ve+/vSI6AEnvv73vv71t2bcC77+9QVIMQXNpYS9Lb2xrYXRhagByBAjvv73vv703EQF4PBILCO+/vR8SAwMCChjvv70BChYIAe+/vRjvv73vv73ep++/vQEQAe+/vVTvv73vv73vv73vv73vv70BEAsYByIAKgAyDAoAEgAaAAEMUDoAOiwSFAjvv73vv70BEO+/ve+/ve+/ve+/vQcY77+977+9ASAFCgAaUhYAAELvv70uADBKAgoAUgBqAHIAegARIRod77+9EO+/vQEKFQgh77+9GO+/ve+/ve+/ve+/vQEQQe+/vSDvv73VtO+/vTQQChgJAe+/ve+/ve+/vQDvv73vv70ACGIVCGEmPu+/vQAJ77+9ABYh77+9BBIQNWYk77+9ASoD77+977+9NwoVCEFqPjQAdBAJGAgiMgoKCAAQADIECAAQAgoGCAEQADIACgYIAgoIAAMFCDAMCAcQADIGGAAgCygI77+977+9AcacAV7vv70AGAYKBAjvv73vv703Ie+/vQAQAQkMEgoI77+977+977+9HDgICRAAGAAiHe+/vQAiCu+/vQAiCu+/vQQiBgnvv70AIjLvv70AABZhED1EEO+/vQEqA++/vSVEYe+/vUJEAQgIGCPvv70HAu+/vQcCLgcCIRIA77+9MRIE77+977+9LhIBCAYICCESABFh77+9Pu+/vQLvv73vv71C77+9AAgHGAbvv73vv70A77+977+9AC7vv70Abe+/vQTvv73vv71C77+9AO+/ve+/vULvv70ACAYYBe+/ve+/vQDvv73vv70ASu+/vQAA77+9Ru+/vQDvv719Qu+/vQAIBRgK77+977+9AO+/ve+/vQBK77+9AADvv71G77+9AO+/vVlC77+9AAgEGAPvv73vv70A77+977+9AErvv70AAO+/vUbvv70ADjUIQu+/vQAIAxgL77+977+9AO+/ve+/vQBK77+9AADvv71G77+9AAjEgu+/vUbvv70ACAIYBO+/ve+/vQDvv73vv70AQu+/vQAAEA46CAQSCtWYBGsKVu+/vQYMEAEYAUrvv70ACBQSCO+/ve+/vSQYCiACGggIARABAQoAQlIWAO+/ve+/vRRaBAjvv70377+9MgAWDu+/vQjvv73vv71Q77+9ASoD77+977+9NwoFCO+/vQUQABAAGO+/vQEiGO+/vQUAAe+/vQUIAAoKAWMJDO+/ve+/vQbvv73vv70GFAUI77+9AxAA77+977+9AO+/ve+/ve+/vQDvv70y77+9BQAeJQrvv73vv70K77+9ACId77+9ABUO77+9CQwSDwjvv73vv70KMAYqA++/ve+/vTcKBAjvv73vv703EQEFDBILCO+/vQocCO+/vQUKWiwKQBozCi8KLQgk77+9AQQIAhAB77+9AQ4hCBgB77+9ARoKGBAO77+9CErvv70LBBAALjUAAATvv701AAABLjUAAAbvv701AAACLjUAAAjvv701AAADLjUAAArvv701AAAELjUAAAzvv701AAAFLjUAAA7vv701AAAGLjUAABDvv701AAAHLjUAABLvv701AAAILjUAABTvv701AAAJLjUAAAAJNQACfhICAApKNQAABH41AAgLFQgOKA4MDwjvv70xFm0OEF4qA++/ve+/vXHvv70AEkHvv70IABpJWkMEBBIE77+9Re+/vSoUCO+/vdip77+977+977+977+9NBDvv73vv73vv73vv73vv73vv73vv73vv70qMhQI77+977+977+977+977+977+977+977+9RxDvv73vv73vv73Uq++/ve+/ve+/vRIiBAjvv73vv703EQjvv73vv703EgsI77+9CnRg77+9CQoDYm13Eg55ZWFyX29mX21ha2luZxoKCRdoBBAKGAEaABpaCgZicmFuY2gSBBAHGAEaSgpIXu+/vQBoLwotChUI77+9xLnvv73vv73vv73Zju+/vQEQ77+977+977+977+977+977+977+977+9eBJS77+9ADQaEAoGYnVmb3JpEgQQDgVuXF4KC2NhdGVnb3J5X2lkEgQQAhgBGkkKR15zAAwuCiwKUu+/vQBacgBkYwoOY2hhc3Npc19udW1iZXISBBAGGAEaSwpibwFoMAouChYI77+977+977+977+977+90YTLpgEQ77+977+96Z+V77+977+977+977+9AVplABhYCgVjb2xvAVwAC++/ve+/vQBI77+977+977+977+9562J77+9SBDdl++/ve+/ve+/ve+/vcWPYlpaAGxpChVtaW5pbXVtX3NlbGxpbmdfcHJpY2USBBAI77+977+9AUzvv73vv73vv73vv73vv73Wh9yGARDvv73vv73ese+/ve+/ve+/vXNaawAQXwoKbm9BFxxrZXlzEgQQCu+/vSYBTO+/ve+/ve+/veK0ju+/ve+/ve+/vQEQwqbFu++/vd6877+9XiYBOGEKCnBpY2t1cHZlaGljbAHvv70ADO+/ve+/vQBM77+977+9y7Ten++/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+9JFrvv70AJGkKFHByZXZpb3Ux77+9DHBsYXQBagAJ77+977+9AEzOgO+/ve+/ve+/veSUiu+/vQEQ77+9wr3vv73Miu+/ve+/ve+/vV7vv70AGGMKD3N1Yl8277+9AgAD77+977+9AEjMquiZje+/ve+/ve+/vW8Q77+977+926nvv73vv73vv73vv71eZQAgaQoUdGFyZ2V0Qu+/vQEABO+/ve+/vQBM77+977+977+977+977+977+977+977+977+9ARDZge+/ve+/vduI77+977+9XmsABGMKOhgEDBIEEAXvv71lAEzvv73vv73vv73up7Dvv73vv70BEO+/ve+/ve+/ve+/vduy77+977+9WmUAAHYO77+9CBAScAjvv70u77+9BjDvv70BIgcKAwoBChgAIgkBCQgIEAMRCwAHGQsABQ7vv70TCSES77+9EwkL77+9FggAIggO77+9EwwBDBgBCnwKGAEqD++/vTfvv703254377+977+9N++/ve+/vTcKTwofCgoKAAAAABUBBTgSCgoA77+9CUQV77+9KG9CGAMlBRMcBAjcnjcaEgjvv73vv714JQAAQEEtAAAAPzAAKAA4AFIECO+/vTdaBAjvv703YABo77+977+9PNueNyIECO+/ve+/vTcqBAjvv73vv703Olbvv70QBEIVUu+/vQpUUAByHwodCgcIABXvv71BCgcIARXvv73vv70dCQgYCxABbDASCgjvv70YEgMKAQAYABAB77+9LhEABO+/vQMB77+9FBLvv70DCO+/vS4W77+9EgTvv70GKRoAVjkwAFUZCwBSJVEAESFnAEYFCxgG77+977+9N++/ve+/vTcJNABQGSkATxkLAE4ZCwBNGQsATBkLAEsZCwBKGQsASRkLAEgZCwBHGQsARRkLAEQZCwBDGQsAQhkLAEEZCwBAGQsAPxkLAD4ZCwA9GQsAPAULEu+/vRUEBBYdDAAVBQxFbgBRIQfvv73vv70BKu+/vQHvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N8SeN8aeN8eeN8ieN8meN8KeN8qeN++/ve+/vTfFnjfDnjfRljfYnjfZnjfanjfXnjfvv73vv70377+977+9N9aWN9eWN9iWN9mWN9qWN9uWN9yWN92WN96WN9+WN++/ve+/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9NwokNDA4MTQ2OTgtOTg5RC00MUQ4LTlGODctQjRGRUE5RDI0MjM0GgQI0ZY3In4KCAgBEgQI77+977+9NxIECO+/ve+/vTcaCggIABIECO+/ve+/vTcQ77+9AiIECO+/ve+/vTcqBAjvv73vv703MgQIxJ43OAFAAEoGCgQIABAAUgBaBAjKnjdiBAjGnjdwBO+/vQEECO+/ve+/vTfvv70BBAjHnjfvv70BBAjCnjfvv70BBAjInjfvv70BBAjJnjfvv70BBAjFnjfvv70BBAjDnjcwAzgLQhNjc3ZmaWxlbXVsaXRwbGVjYXJzSAFQAWgA77+9AQAAAAAQ77+9M0Dvv70BAAAAAAAASUDvv70BBAjXnjfvv70BBAjYnjfvv70BBAjZnjfvv70BBAjanjfvv70BAe+/vQEECO+/ve+/vTfvv70BBAjvv73vv70377+9AQQI77+977+9N++/vQEECO+/ve+/vTfvv70BBAjvv70377+9AQDvv70CAAAAAAAAAADvv70CBAjvv73vv70377+9AgQI77+977+9N++/vQIECO+/vTfvv70CGBDDgu+/vU7vv70LGO+/vQICCADvv70CDl0SNO+/ve+/vTfvv70CBAjvv73vv70377+9Ah4KYh0X77+9QxICEADvv70DBAjvv70377+9AwQI77+977+9N++/vQMECNaWN++/vQMECNeWN++/vQMECNiWN++/vQMECNmWN++/vQQECNqWN++/vQQECO+/ve+/vTfvv70EBAjvv73vv70377+9CQcA77+9CQcA77+9CQcM77+9BHYKVicEBBJdXhkACCEKFVLvv70PKBgAMABCBAjvv73vv703GgEjTk4PBBgBBSPvv71M77+977+9N++/vQQECNuWN++/vQQECNyWN++/vQQECN2WN++/vQQECN6WN++/vQQECN+WN++/vQQECO+/ve+/vTfvv70EBAjvv70377+9BAQI77+9N++/vQQECO+/vTfvv70FBAjvv70377+9BV4KEu+/vQoEElZa77+9FQwaCAoEFu+/vRUMMAA6BA7vv70TAELvv73vv70ESgRh77+9AFLvv71yNABaBBAEGABiBBAFGABqDu+/vQkQAHAI77+9AQ7vv70KCADvv70FIe+/vQ5TEkrvv70KIe+/vRDvv70FFwoVUu+/vRRw77+9BQQI77+977+9N++/vQUECO+/vTfvv70FBAjvv70377+9BQQI77+9NxAh77+9BBIKIjgODgYOXO+/ve+/ve+/ve+/vQ8Y77+9yKjvv70MIO+/ve+/vdeBBijvv73vv73vv70LEUEcEBILCO+/vTDJtwTvv70CVu+/vQoEChVS77+9CAQKFE7vv70JBAoVUu+/vQlaUAsEChZWaAcEChZW77+9CQQKFVJnCAAKWu+/vQoEChZW77+9CAgKFghSRAjvv70QABAKEAkQBhAFEAMQCBABEAQQBxACGAAYBxgKGAUYCBgEGAMYCRgGGAIYASJSCwzvv708IhYI2rLvv73vv73vv73vv73Zm++/vQEQwqrvv73vv73Psu+/ve+/ve+/vQEiFgjvv73Iju+/ve2uv+21ie+/vQEQ77+977+977+977+93Ivvv73vv70BKAAoAigBMAAwAjABEGF9DBIKCO+/vRrvv70MDu+/vRYMCxgDFSHvv70MEg8I77+9ERcMKgPvv73vv70OJhAM77+977+9NysBBQwSJQjvv70KHARdIu+/vQIAEe+/vQoAEgELDCoD77+977+9XlwY77+977+9AhgBBAjvv73vv703EAEFDBIKCO+/vQrvv711HAgQCO+/vRITEQDvv71NZRIgEhAgACgAEGHvv70EEgpOGQAA77+9BTIA77+9CjIEHApiMxwOPwgA77+9Qi0A77+9H0pUAwgYAEYO77+9CBASQAjvv70xFlkI0L8CKjPvv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9JXsc77+9NxJ+CggI77+977+9JO+/ve+/vTcSBAjvv73vv703GtGcQO+/vTcQ77+9AiIECO+/ve+/vTcqBAjvv73vv70O77+9GwDvv71K77+9Blzvv73vv703YgQI77+977+9N3AE77+9AQQI77+977+9N++/vQEECO+/ve+/vcWcOO+/ve+/vTfvv70BBAjvv73vv70377+9AQQI77+9yZwg77+977+9N++/vQEECO+/ve+/vQ7vv70bEO+/ve+/vTciFVLvv70aGCoECO+/ve+/vTdRDgMKFAAASUDvv70BCQoEAADvv70KAADvv70VPO+/vQoABO+/vQE+AwAM77+9AQAQAe+/vQQSCu+/vXcEABAB77+9DBIKCO+/vS3vv73vv73vv70M77+9NxUO77+9CgwSDwjvv70KFwwMKgPvv701fQgECO+/vUF1OO+/ve+/vTcSCgjvv70wEgMBAAUYAFBLAwQUAAAAAAAH77+977+9Wu+/ve+/vVfvv70BAQAAAQEAABwAAABJbmRleC9UYWJsZXMvVGlsZS05MDUwMjMuaXdhAO+/vQAA77+9C++/vRoI77+977+9NxIUCO+/vS4SAwEABRjvv70LIgcKAwoBBxgACAAQABgAIAEq77+9CwgAEAsa77+9AQQAAAARAu+/vQwA77+9DABkIu+/vQMAAAwAGAAkADAAPABIAFQAYABsAHgA77+977+9AQDvv70BAO+/vQEA77+9AQDvv70BAO+/vQEA77+9AQDvv70BABgoBTLvv70CBQNJ77+9MAgQAgABAAAABQAAAAIBCB0YBRBKGAABI04YAEHvv71OGAABFAEEBVABPQQAAAV4AAYBcEpgAAAHWhgAAAhaGAAACVoYAAAKWhgAAAsdGAA6YQ5MGAAwAEgAYAB4AO+/vQDvv70A77+9AO+/vQDvv70A77+9CgPvv70KA++/vQoD77+9CgPvv70KA++/vQoD77+9CgPvv70KAxDvv70wBTgBUEsDBBQAAAAAAAfvv73vv71aZO+/vXws77+9AAAA77+9AAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjQuaXdhAO+/vQAA77+9Au+/vREI77+977+9NxILCO+/vS4SAwEABRjvv70BCAEQFBoRCAEQARoLY2F0ZWdvcnlfaWQaFQgCEAEaD3N1Yl8uFwDvv70aCAMQARoUdGFyZ2V0X3NlbGxpbmdfcHJpY2UaFAgEEAEaDnllYXJfb2ZfbWFraW5nGhQIBQEW77+9Y2hhc3Npc19udW1iZXIaDAgGEAEaBmJyYW5jaBobCAcQARoVbWluaW11bTpXAAgaCAgBcxhwcmV2aW91EUI4cGxhdGUaEAgJEAEaCm5vAXHvv71rZXlzGgsIChABGgVjb2xvchoTCAsQARoKcGlja1VwVmVoaWNsZVBLAwQUAAAAAABtf++/vVpWOu+/ve+/vRsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjUuaXdhABcAABVQEAjvv73vv703EgoI77+9LhIDAQAFGAQIBBABUEsDBBQAAAAAAG1/77+9Wu+/vS8zEhsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjYuaXdhABcAABVQEAjCnjcSCgjvv70uEgMBAAUYBAgJEAFQSwMEFAAAAAAAB++/ve+/vVrvv73vv704PCgAAAAoAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjcuaXdhACQAACLvv70QCMOeNxIKCO+/vS4SAwMCChgRCAIQBRoJCAIQCzIDCO+/vQIoAVBLAwQUAAAAAABtf++/vVpp77+9eO+/vRsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjguaXdhABcAABVQEAjEnjcSCgjvv70uEgMBAAUYBAgDEAFQSwMEFAAAAAAAbX/vv71aJRIgPR0AAAAdAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjkuaXdhABkAABdYEAjFnjcSCgjvv70uEgMDAgoYBggMEAEoAVBLAwQUAAAAAABtf++/vVoq77+9Qe+/vRsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMzAuaXdhABcAABVQEAjGnjcSCgjvv70uEgMBAAUYBAgFEAFQSwMEFAAAAAAAbX/vv71aIe+/vXstGwAAABsAAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAzMS5pd2EAFwAAFVAQCMeeNxIKCO+/vS4SAwEABRgECAgQAVBLAwQUAAAAAABtf++/vVrvv73vv71gbRsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMzIuaXdhABcAABVQEAjInjcSCgjvv70uEgMBAAUYBAgKEAFQSwMEFAAAAAAAbX/vv71a77+9YEDvv70bAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDMzLml3YQAXAAAVUBAIyZ43EgoI77+9LhIDAQAFGAQICxABUEsDBBQAAAAAAG1/77+9Wu+/ve+/ve+/vRcbAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDM0Lml3YQAXAAAVUBAIyp43EgoI77+9LhIDAQAFGAQIAhABUEsDBBQAAAAAAG1/77+9Wu+/vWcm77+9LAAAACwAAAAcAAAASW5kZXgvVGFibGVzL1RpbGUtOTA1MDc1Lml3YQAoAAAm77+9GQjvv703EhMI77+9LhIDAQAFGAwiBwoDCgEHGAAIABAAGAAgADAFOAFQSwMEFAAAAAAAbX/vv71aGTg677+9GwAAABsAAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3Ni5pd2EAFwAAFVAQCO+/ve+/vTcSCgjvv70uEgMBAAUYBAgBEAFQSwMEFAAAAAAAbX/vv71a77+9ehNlGwAAABsAAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3Ny5pd2EAFwAAFVAQCO+/ve+/vTcSCgjvv70uEgMBAAUYBAgEEAFQSwMEFAAAAAAAbX/vv71aUG/vv73vv70bAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDc4Lml3YQAXAAAVUBAI77+977+9NxIKCO+/vS4SAwEABRgECAkQAVBLAwQUAAAAAABtf++/vVoK77+977+977+9HQAAAB0AAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3OS5pd2EAGQAAF1gQCO+/ve+/vTcSCgjvv70uEgMDAgoYBggCEAEoAVBLAwQUAAAAAABtf++/vVoQ77+9d1cbAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDgwLml3YQAXAAAVUBAI77+977+9NxIKCO+/vS4SAwEABRgECAMQAVBLAwQUAAAAAABtf++/vVrvv70oB++/vR0AAAAdAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODEuaXdhABkAABdYEAjvv73vv703EgoI77+9LhIDAwIKGAYIDBABKAFQSwMEFAAAAAAAbX/vv71aU++/vU4nGwAAABsAAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA4Mi5pd2EAFwAAFVAQCO+/ve+/vTcSCgjvv70uEgMBAAUYBAgFEAFQSwMEFAAAAAAAbX/vv71aWO+/vXTvv70bAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDgzLml3YQAXAAAVUBAI77+977+9NxIKCO+/vS4SAwEABRgECAgQAVBLAwQUAAAAAABtf++/vVp977+9zrEbAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDg0Lml3YQAXAAAVUBAI77+977+9NxIKCO+/vS4SAwEABRgECAoQAVBLAwQUAAAAAABtf++/vVoSIO+/vWcbAAAAGwAAACAAAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDg1Lml3YQAXAAAVUBAI77+977+9NxIKCO+/vS4SAwEABRgECAsQAVBLAwQUAAAAAABtf++/vVo077+9ae+/vRsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODYuaXdhABcAABVQEAjvv73vv703EgoI77+9LhIDAQAFGAQIAhABUEsDBBQAAAAAAAfvv73vv71a77+977+9Ve+/vXkAAAB5AAAAKwAAAEluZGV4L1RhYmxlcy9IZWFkZXJTdG9yYWdlQnVja2V0LTkwNTExMy5pd2EAdQAA77+9AXwRCO+/ve+/vTcSCwjvv70uEgMBAAUY77+9AQgBEgsIABUAAO+/vUIYACABChABFQAA77+9EQoQAhUAAO+/vREKEAMVAADvv70RCgQEFR0nEAUVAAAoERoQBhUAAO+/vREKEAcVAADvv70RChAIFQAAeBEKEAkVAAAIEQokChUAAO+/vUIYACABUEsDBBQAAAAAAAfvv73vv71a77+977+9LgsmAAAAJgAAACsAAABJbmRleC9UYWJsZXMvSGVhZGVyU3RvcmFnZUJ1Y2tldC05MDUxMTQuaXdhACIAACB8EAjvv73vv703EgoI77+9LhIDAQAFGA8IARILCAAVAAAAABgAIAtQSwMEFAAAAAAAbX/vv71a77+977+977+9dxsAAAAbAAAAIAAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUxMTUuaXdhABcAABVQEAjvv73vv703EgoI77+9LhIDAQAFGAQIBxABUEsDBBQAAAAAAG1/77+9WiTvv71I77+9GQAAABkAAAArAAAASW5kZXgvVGFibGVzL0hlYWRlclN0b3JhZ2VCdWNrZXQtOTA1MTI0Lml3YQAVAAATSBAI77+977+9NxIKCO+/vS4SAwEABRgCCAFQSwMEFAAAAAAAbX/vv71aZ3jvv70hGQAAABkAAAArAAAASW5kZXgvVGFibGVzL0hlYWRlclN0b3JhZ2VCdWNrZXQtOTA1MTI1Lml3YQAVAAATSBAI77+977+9NxIKCO+/vS4SAwEABRgCCAFQSwMEFAAAAAAAbX/vv71a77+9Ixt1GwAAABsAAAAgAAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTEyNi5pd2EAFwAAFVAQCO+/ve+/vTcSCgjvv70uEgMBAAUYBAgHEAFQSwMEFAAAAAAAB++/ve+/vVrvv70Y77+9YHDvv70AAHDvv70AABwAAABJbmRleC9Eb2N1bWVudFN0eWxlc2hlZXQuaXdhAHE1AO+/ve+/vQTvv70877+9DAjvv73vv703Eu+/vQsI77+9AxIDAQAFGO+/ve+/vQEiOwoDCgEHEAMYASIw77+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703RhgAEO+/ve+/vTciFwE9AAgFPRAM77+977+9N++/vQUD77+9Be+/ve+/vTcq77+9C++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703wpg3y5g3zJg3zZg3zpg3z5g30Jg30Zg30pg305g31Jg3w5g31Zg31pg315g32Jg32Zg32pg325g33Jg33Zg33pg3xJg3xZg3xpg3x5g3yJg3yZg3ypg335g377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv70377+9N++/vTfvv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfFmTfGmTfPmTfQmTfRmTfSmTfTmTfUmTfVmTfWmTfXmTfYmTfHmTfZmTfamTfbmTfcmTfdmTfemTffmTfvv73vv70377+9N++/vTfImTfJmTfKmTfLmTfMmTfNmTfOmTfvv70377+977+9N++/ve+/vTfvv73vv70377+977+9N8KZN8OZN++/ve+/vTfvv73vv70377+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv703xJU377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfClTfDlTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703xZU377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfGlTfvv73vv7030ZY377+9N++/ve+/vTfvv73vv70377+977+9N9OXN9KWN9aWN9eWN9iWN9mWN9qWN9WWN9SWN9OWN9uWN9yWN92WN96WN9+WN++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv70377+977+9N++/vTfvv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv703wpc377+977+9N++/ve+/vTfvv73vv703w5c3xJc3xZc3xpc3x5c30Jc3z5c30Zc31Jc32Jc32Zc32pc325c33Jc315c31pc31Zc33Zc33pc335c377+977+9N++/vTfvv70377+9N++/vTfvv73vv70377+9N++/vTfvv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N8iXN8mXN8qXN8uXN8yXN++/vTfvv70377+9N++/vTfvv70377+9N++/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfOlzfNlzfvv70377+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9N++/ve+/vTfvv73vv70377+977+9Yu+/vQUQCgQI77+977+9AQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYA77+9BQYE0ZYhXADvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgTvv73vv70hFADvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgTvv73vv71BcADvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgTvv73vv71B77+9AO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGBO+/ve+/vUXvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgDvv70FBgTvv73vv70B77+9BO+/ve+/vQEGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUGAO+/vQUG77+92p43EiwKJGNhcHRpb25zLTAtc2hhcGVzdHlsZS1PYmplY3QgQwkdBBIEAe+/vQwSKgoici4AGFRpdGxlEgQB77+9NBIhChljaGFyYWN0ZXItCVQoaHlwZXJsaW5rEgQOSwsMEhwKFD4jABRudWxsEgQObwsMEh4KFgEeTHQtMC1jYXRlZ29yeWF4aXNfMBIE77+9IQwSFQoKFSAUaGFydBIE77+9UAwSFgoOBQ8oLTAtbGVnZW5kEgTvv71iDBIgChgRGCRwYXJhZ3JhcGhTAe+/vQVRBO+/ve+/vW4iAAgxEgTvv71kEe+/vQFcOkQAADEB77+9BO+/ve+/vXIjAAFGAO+/vXYjAAgyEgTvv71uaQAIMxIE77+9biMACDQSBO+/ve+/vW4jAAA1IWV277+9AAA2Ie+/vXYjAAg3EgQOHAhuaQAIOBIEDjkIbiMACDkSBA5WCGrvv70BIRcA77+9cu+/vQAAMiHvv70A77+9diMAIe+/vQDvv712IwABaQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXIAAwHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70Y77+977+9NxIfChfvv70QLHJlZmVyZW5jZUxpbu+/vQ8Y77+977+9NxIYChARIRBzZXJpZe+/vXoA77+9UhoAQVsA77+9UhoAQVIA77+9UhoAIVUA77+9UhoAIU0A77+9UhoAIUUY77+977+9NxIbChMR77+9EHZhbHVl77+9GQDvv71eHQAB77+9BO+/ve+/ve+/vVYAMUZWBQTvv73vv73vv71WBDEtBWIEEgQO77+9C++/vVYAMe+/vVYA77+9LmgBADE+EgVh77+9AO+/vXIiAAHvv70A77+9Lu+/vQJCRADvv71WAO+/vXYjAAFGAO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAQe+/vQDvv712IwBB77+9AO+/vXYjAEHvv70A77+9diMAQe+/vQDvv71y77+9ASEXAO+/vXJFAO+/vVYA77+9diMAIe+/vQDvv712IwABaQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXLvv70BAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv70uVgUAMUpWBQDvv70u77+9BAAxLlYFAO+/vVIaAEFbAO+/vVIaAEFSAO+/vVIaACFVAO+/vVIaACFNAO+/vVIaACFFAO+/vS45BQAxOlYFAO+/vV4dAAHvv70A77+9LlYFADJGVgUA77+9LlYFADLvv71WBOGYvVYAMu+/vVYA77+9LmgBADJOVgUA77+9ciIAAe+/vQDvv70u77+9AkJEAO+/vVYA77+9diMAAUYA77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwBB77+9AO+/vXYjAEHvv70A77+9diMAQe+/vQDvv712IwBB77+9BO+/ve+/vSrvv70KQl4BIRcA77+9ckUA77+9VgTvv73vv70qFAtGRQAh77+9AO+/vXYjAAFpAO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9cu+/vQEB77+9AO+/vXIiAwHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vS5WBQAySlYFBO+/ve+/vSrvv70KADIuVgUA77+9Lu+/vQQVGkFbAO+/vVIaAEFSAO+/vVIaACFVAO+/vVIaACFNAO+/vVIaACFFAO+/vS45BQAyOlYFAO+/vV4dAAHvv70A77+9LlYFADNGVgUE77+977+9Ku+/vQoAM++/vVYE77+977+977+9VgAz77+9VgDvv70uNAIAM05WBQDvv71yIgAB77+9AO+/vS7vv70CQkQA77+9VgDvv712IwABRgDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjAEHvv70A77+9diMAQe+/vQDvv712IwBB77+9AO+/vXYjAEHvv70A77+9cu+/vQEhFwDvv71yRQDvv71WAO+/vXYjACHvv70A77+9diMAAWkA77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv71y77+9AQHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70E77+977+9KgIQADNKVgUA77+9LlYFADMuVgUA77+9UhoAQVsA77+9UhoAQVIA77+9UhoAIVUA77+9UhoAIU0A77+9UhoAIUUE77+977+9KgIQADM6VgUA77+9Xh0AAe+/vQTvv73vv70qAhAANEZWBQDvv70uVgUANO+/vVYA77+9LlYFADTvv71WAO+/vS5oAQA0TlYFAO+/vXIiAAHvv70A77+9Lu+/vQJCRADvv71WAO+/vXYjAAFGAO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAQe+/vQDvv712IwBB77+9AO+/vXYjAEHvv70A77+9diMAQe+/vQDvv71y77+9ASEXAO+/vXJFAO+/vVYA77+9diMAIe+/vQDvv712IwABaQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXLvv70BAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv70uVgUANEpWBQDvv70u77+9BAA0LlYFAO+/vVIaAEFbAO+/vVIaAEFSAO+/vVIaACFVAO+/vVIaACFNAO+/vVIaACFFAO+/vS45BQA0OlYFAO+/vV4dAAHvv70A77+9LlYFADVGVgUA77+9LlYFADXvv71WAO+/vS5WBQA177+9VgDvv70uaAEANU5WBQDvv71yIgAB77+9AO+/vS7vv70CQkQA77+9VgDvv712IwABRgDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9BO+/ve+/vSoxD0bvv70AQe+/vQDvv712IwBB77+9AO+/vXYjAEHvv70A77+9diMAQe+/vQTvv73vv70qAhBC77+9ACEXAO+/vXLvv70A77+9VgDvv71yaADvv71WAO+/vXYjAAFpAO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9diMAIe+/vQDvv712IwAh77+9AO+/vXYjACHvv70A77+9cu+/vQEB77+9AO+/vXIiAwHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vXIiAAHvv70A77+9ciIAAe+/vQDvv71yIgAB77+9AO+/vS5WBQA1SlYFBO+/ve+/vSoCEAA1LlYFAO+/vS7vv70EFRph77+9AO+/vVIaAEFSAO+/vVIaACFVAO+/vVIaACFNAO+/vVIaACFFAO+/vS45BQA1OlYFAO+/vV4dAAHvv71Q77+9NxImCh5kcmF3aW5nbGluZS0wLR0OEu+/vR8EEgQO77+9KhwSHQoVZXF1YQ7vv70gGC0wLWltYWcVHxjvv73vv703EhoKEgUUPhwABO+/ve+/vR0cADE2OAAA77+9LhwAADI2HAAA77+9LhwAADM2HAAA77+9LhwAADQ2HAAA77+9LhwAADU2HAAY77+977+9NxIZChEK77+9Ju+/vSEEEgQOUywVGwAxNhsAAO+/vR02ADI2GwAA77+9HRsAMzYbAADvv70dGwA0NhsAAO+/vR0bADU2GwAA77+9Ce+/vQxtb3ZpIUoFCDHvv70A77+9LhwAADE2HAAA77+9LhwAADI2HAAA77+9LhwAADM2HAAA77+9LhwAADQ2HAAA77+9LhwAADU2HAAEw5US77+9CiLvv70hGn4iFGRlZmF1bA7vv70cAO+/vQk9JWQy77+9IgwSBAjvv70uHAA6bQEA77+9LhwAOm4BAO+/vS4cADpvAQDvv70uHAA6cAEA77+9LhwAOnEBSO+/ve+/vTcSKQohc3RpY2t5Q29tbWVuMnsiFlYj77+9AMWWKwBh77+9BO+/ve+/ve+/vVYAYe+/vQDvv73vv70rAGHvv70A77+977+9KwDvv702AO+/ve+/vSsA77+9HQDvv73vv70rAO+/vQkA77+977+9KwAB77+9AO+/ve+/vSsAAe+/vRjvv73vv703EiIKGj7vv70BRTtR77+9BMaVElUPGHN2Z2ltcG8SHiQFICXvv70EEgQO77+9Je+/ve+/vQx0YWJsQW8FCBE8BNGWHRwAMTYcAADvv70uHAAAMjYcAATvv73vv70dOAAzNhwAAO+/vS4cAAA0NhwAAO+/vS4cAAA1NhwABNOX77+9SQXvv70oQ2VsbC0wLWJvZHkR77+9GNKWNxIlCh0uHwAe77+9JShMZXZlbDFSb3cSBA46MHInAAAyCScA77+9ek4AADMJJwDvv716JwAANAknAO+/vXonAAA1CScE2pYl77+9Lu+/vQAgZm9vdGVyUm93Ee+/vQDvv71GSwAsaGVhZGVyQ29sdW1uEScA77+9RksACScdSwDvv71GJAAQbGFiZWwuLwEA77+9biQALSwA77+9biQALSkA77+9biQALSYA77+9biQALSME35YS77+9Jy4jARRwaXZvdEJBChR1bW1hcnkpCQQSBA7vv70xDBInCh9uLAApeATvv70SaihCKQAASC5ZAQldBBIEDgoy77+977+9GS4AMTLvv70CAO+/vT7vv70BJu+/vSIuWQEA77+9eicALVwA77+9eicALV8A77+9eicALWIA77+9eicALWUA77+9Pu+/vQEAMUbvv70CAO+/vUZLAElhKX9R77+9AO+/vUZLAAknXe+/vQDvv71GJABC77+9AgDvv71uJAAtLADvv71uJAAtKQDvv71uJAAtJgDvv71uJAAtIwDvv70+77+9AgAxZu+/vQIE77+977+9Ou+/vQJGLABJ77+9BO+/ve+/vTrvv70CCilW77+9AgDvv70+EAUAMjLvv70CBO+/ve+/vTrvv70EJu+/vR8u77+9AgDvv716JwAtXADvv716JwAtXwDvv716JwAtYgDvv716JwAtZQTvv73vv706EAUAMkbvv70CAO+/vUZLAElhNu+/vQIA77+9RksACSdd77+9AO+/vUYkAELvv70CAO+/vW4kAC0sAO+/vW4kAC0pAO+/vW4kAC0mAO+/vW4kAC0jBO+/ve+/vToQBQAyZu+/vQIA77+9Pu+/vQJGLABJ77+9AO+/vT7vv70CCilW77+9AgDvv70+77+9AgAzMu+/vQIA77+9Pu+/vQEmLh0u77+9AgDvv716JwAtXADvv716JwAtXwDvv716JwAtYgDvv716JwAtZQDvv70+77+9AQAzRu+/vQIA77+9RksASWE277+9AgDvv71GSwAJJ13vv70A77+9RiQAQu+/vQIA77+9biQALSwA77+9biQALSkA77+9biQALSYA77+9biQALSMA77+9Pu+/vQIAM2bvv70CAO+/vT7vv70CRiwASe+/vQDvv70+77+9AgopVu+/vQIA77+9Pu+/vQIANDLvv70CAO+/vT7vv70BJmAaLu+/vQIA77+9eicALVwA77+9eicALV8A77+9eicALWIA77+9eicALWUA77+9Pu+/vQEANEbvv70CAO+/vUZLAElhNu+/vQIA77+9RksACSdd77+9AO+/vUYkAELvv70CAO+/vW4kAC0sAO+/vW4kAC0pAO+/vW4kAC0mAO+/vW4kAC0jAO+/vT7vv70CADRm77+9AgDvv70+77+9AkYsAEnvv70A77+9Pu+/vQIKKVbvv70CAO+/vT7vv70CADUy77+9AgDvv70+77+9ASbvv70XLu+/vQIA77+9eicALVwA77+9eicALV8A77+9eicALWIA77+9eicALWUA77+9Pu+/vQEANUbvv70CAO+/vUZLAElhNu+/vQIA77+9RksACSdd77+9AO+/vUYkAELvv70CAO+/vW4kAC0sAO+/vW4kAC0pAO+/vW4kAC0mAO+/vW4kAC0jAO+/vT7vv70CADVm77+9AgDvv70+77+9AkYsAEnvv70A77+9Pu+/vQIKKVbvv70CCO+/vTcO77+9FCLvv70MCFRleA7vv70RQjsBBO+/ve+/vXooAC0/AO+/vX4oAC1DAO+/vX4oAC1HAO+/vX4oAC1LAO+/vU4oAAAxRu+/vQAA77+9figACu+/vQDvv71+KAAK77+9AO+/vX4oAArvv70A77+9figACu+/vQDvv71OKAAAMkbvv70AAO+/vU7vv70BLigACu+/vQDvv71+KAAK77+9AO+/vX4oAArvv70A77+9figACu+/vQDvv71OKAAAM0bvv70AAO+/vX4oAArvv70A77+9figACu+/vQDvv71+KAAK77+9AO+/vX4oAArvv70A77+9TigAADRG77+9AADvv71+KAAK77+9AO+/vX4oAArvv70A77+9figACu+/vQDvv71+KAAK77+9AO+/vU4oAAA1Ru+/vQAA77+9figACu+/vQDvv71+KAAK77+9AO+/vX4oAArvv70A77+9figACu+/vQTvv70S77+9FO+/ve+/vQhOYW0O77+9FBLvv70UHksQBO+/vSZ4EQogDHRleHQRHwTvv706PwAaHhcRIADvv73vv73vv70FPwAxMj8AAO+/vT4/ABpBFxE/AO+/vT4/AAAyMj8AAO+/vT7vv70AGmQXET8A77+9Pj8AADMyPwAA77+9Pj8AGu+/vRcRPwDvv70+PwAANDI/AADvv70+PwAa77+9FxE/AO+/vT4/AAA1Mj8AAO+/vQof77+9IQhpc3QSHBYMLU5vbg4hFhjvv73vv703EiMKGwofAHAe77+9OgkkHlQ7AO+/vRbvv70YBSUEMS0ZRBBCdWxsZQ7vv70YCO+/ve+/vTfFjwFlKko1CUYMU3VidBrvv707GO+/ve+/vTcSJAocCSgAMD5vAABMDu+/vRQEEgQOM0cOfBgJJkJPAAUmDCBEYXIO77+9OwTvv73vv70WVhEFeSoYKwl6AFQO77+9FgAgJSkAIA7vv70bAO+/vS4uACrvv70lRi4ADu+/vRwA77+9Li4AKmofRi4ADu+/vRgA77+9Li4AADY+77+9AC7vv70ADgcYAO+/vS4uAAA3bi4ADu+/vRgA77+9Li4AADhuLgAO77+9GADvv70uLgAAOW4uAA4mHgDvv70WQhglQgAyPe+/vQBJDu+/vRwO77+9PADvv70W77+9EiFiKiwwKQUO77+9CAhpbmclXRjvv73vv703EisKIwkpQu+/vQEAQxbvv709ACAO77+9CA5GPBTvv703Ei4KJgktUlcAFGVyICYgRhIiFw5TPADvv70S77+9IQUwADMd77+9GExldHRlcmUSaT0dIwA0HSMMTnVtYgojAO+/vRbvv70aBUZC77+9ARHvv70AUgVOAO+/vV3vv71C77+9AQ7vv70WBe+/vQTvv73vv70SSj4BUQhib3g+77+9GyDvv73vv703IAAqDAoEEmsZAAQOTz8FDg7vv70YAAQOFT8FDg7vv70XAAQOHT8FDg7vv70XAAQOJT8FDg4RGAAEDi0/EDABOu+/vQIi77+9Su+/ve+/vT8E77+977+977+9Mxxkcm9wLWNhcELvv70cASAIFwoPASAZHw45OQjvv73vv703RhkAYT4A77+9ThkAYSkA77+9ThkAYRQA77+9ThkAQe+/vQDvv71OGQBB77+9BO+/ve+/vRJcGgxzaGVlDu+/vQoFCGXvv70AEhLvv71LDEJtCgQm77+9QEFCKhRAOu+/vQQ6cgIY77+977+9NxIvCifvv70wAO+/ve+/vQzvv73vv703FhJ6QAwQCO+/vQ8WB1IM77+9ASoDDkpBEO+/vQEKLBLvv73vv71AYCoECO+/ve+/vTdQDlrvv70BCgASUQoYCAEdAAAAACUBBQAtAQUcNQAA77+9P2ABFQEHCBgAIAEVGO+/vUAyJwgCFQEeABgJKgUvTgUAAB0BNwQiL25YACjvv73vv71DHQAA77+9QCABLQEteDAAOAAqADIAOgBQDloqCAAQACIECgIIATIUCgAA77+9QAHvv70AQAFWBEAlAQ8MOABSBCE7CFgANgEHDBIwCO+/vS0MLO+/vQIiCAoECgILKxgBChAvGAEiCgUUGC4QAxgBKgMOPk0IPgoOOu+/vUHvv73vv70BLTsMOVrvv70BAe+/vWgdAABAQSoTSGVsdmV0aWNhTmV1ZS1MaWdodDpiVQEoQAFQAFgAYABoAHUhTQB9AQUo77+9AQHvv70BAe+/vQEB77+9ASEPEO+/vQEB77+9AQEYDO+/vQEB77+9BRIs77+9AQDvv70CAO+/vQIB77+9Au+/vREBSAHvv70CAe+/vQIB77+9AgDvv70CAO+/vQIB77+9AhpmcwFE77+9AgBicAgCGgEuJQAAEEIoAT0BYBhAAUgAUABdAQskagBwAHgA77+9AQoKAQ4l77+9AO+/vQV7AO+/vQXvv70A77+9BQYA77+9BQYc77+9AQDvv70BAe+/vQEB77+9JA/vv70BAO+/vQEB77+9AgTvv70877+9AgHvv70CAe+/vQIA77+9AgDvv70CABEBFAwSCwjvv70t77+9FO+/vQIKIwoE77+977+9ABXvv73vv70O77+9QjLvv70HLV8IBFgAPgIAAGUB77+977+9BQAAbQEtAG0B77+9DG0AAO+/vQEFAO+/vQEFFBBDbQAANAEFAFgBBQB8AQUM77+9Q3IMQWQAPwXvv70EGAHvv70OAO+/vQ4AABYSHEQAEHXvv70M77+9ASoDDh5FEO+/vQEKKhLvv71dRC0y77+977+9A++/ve+/vQPvv73vv70DBO+/ve+/vWXvv70E77+977+9Lu+/vQMA77+977+9Awg9CgxtzKkl77+9TgUtOgg5Wu+/vX3vv70ACjLvv70D77+977+9A++/ve+/vQPvv73vv70D77+977+9A2Xvv70AEBLvv71GCAoI77+9be+/vRQvCicKBEwO77+9Rmbvv71GLVwUAVoCWAEQEu+/vUYZQAgkCiLvv70EUu+/vUYJOwAREu+/vUYMCwjvv70n77+977+9EO+/vQIKHhJa77+9RgkyEO+/ve+/vQTvv70CZe+/vQAa77+977+9EO+/vS45PyUBBQAtAQVe77+9Bu+/ve+/vQAA77+977+9BhgoADAbOBNN77+9VwBl77+977+9DHIA77+9AXZmAAAAMjgH77+9ZgDvv71wDO+/vQEA77+977+9XQBKXQAk77+9AQHvv70BAO+/vQEA77+977+9S1jvv70CAO+/vQIC77+9Ahvvv70CE++/vQIA77+9AgHvv73vv70EARESMkgICwjvv70tdxDvv70cChUSNlZINW4E77+9GyVuFBLvv70ECgdEGksmPO+/vQEKC0ZpbGwgQ2VudGVyEu+/vQAA77+9TR5iCAjvv70/GgEW77+9cQjvv70/HSFO77+977+9BD8iUhYAEC3vv73vv73vv70+EgYIGUcA77+9ATEgAAA4AUABShYKATcsIEEVAABwQR0AAO+/vUES77+9CCQS77+9AQoPRGlyZWMOAikUYWwgS2V577+9AArvv70MAABAP2bvv70AAFIB77+9NALvv73vv73vv70VKO+/vRHvv70dR2RI77+9Ce+/vQzvv70BCgolFgBSDhoI77+9AArvv70I77+977+9TO+/vRUBBO+/vULvv73vv70xeBgAABLvv70BCgkF77+9CExlZu+/ve+/vQAJ77+9BO+/vT1mDwEt77+9BO+/ve+/vTrvv70AKBrvv70ECgtNZWRpdW0J77+9Ae+/vQxUb3AgEjgJYh4BEO+/ve+/vVI/FQEFMjMCARE6FgBBM++/ve+/vQAAQEEzBO+/vUI9Hgzvv70BChAlHknvv70QIEhpZ2hi77+9ABxo77+9dD8V77+9PHg277+9AEoWAAwtZmZmajQCLSUASCElAO+/vQHvv70E77+9Qu+/vTQC77+9NAJJNAAgCu+/vWFJLhYBCExvd2IVAWHvv70AFQEFMu+/vQEBEToWAA5kDO+/vRUBCO+/vR0AMRUgIu+/vQQKClNvZnRNK++/vW4E77+9bgQAMEE7AEgu77+9ASEl77+9bgRObgQA77+977+9JQEu77+9AO+/vW4ESm4E77+977+9Be+/vW4E77+9bgRebgQAKu+/vTQC77+9NALvv700Au+/vTQC77+9NALvv700Au+/vTQC77+9NALvv700AgAy77+977+9CO+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70IEDrvv70ECgoa77+9CBY+CO+/ve+/vQZK77+9Bgjvv73vv73vv73vv73vv70JCEDvv70VDu+/vRIqCgsA77+977+9CgtSCgt277+9CDxaNgoUCgEB77+9QRXvv70AIEId77+9Iu+/vQs4FAoxXO+/vT4VJigU77+9HWvvv703FiALDB3vv73vv71MDu+/vRMEAADFvAxFZGdleioLCO+/vQ5mHlMIBO+/vX8ODgwSPwxKFgDvv70qCwBIDioLAO+/vSE1GgQVEu+/vQoF77+9cioLSnEABCIUThYA77+977+9AA4FCi7vv70AAFUOOwkIWgBiFmoODn0OEhwKDj4JYu+/vRXvv71qDghoAHIOeRQg77+9P++/vQEAACBB77+9AQZQQu+/vQEA77+9AQrvv70BDO+/vQEK77+9AgAA77+9QO+/vQcBdQ4ZDgAQEjNWCAoI77+9GhkODHgKFhI6V1YiGQ4QXAoAEBESAwoAKu+/ve+/vQDvv71cFgAxEu+/vVYAKyLvv70VAO+/ve+/vSYSCAogEmLvv71WCe+/ve+/vQQSBAXvv71NZwwtAe+/vX8eTBDvv73vv70V77+977+9FVJ2AA7vv70VAGzvv73vv70VZu+/vRUI77+9AgES77+9FQAAIu+/vRUAMRLvv71X77+9cgEtcgAx77+9cgEk77+977+9fz8l77+977+9fz8tAQUa77+9Ee+/vXIB77+9cgFSdgDvv71yAe+/vXIBDjlZOXIA77+977+977+9AgAhFu+/vRMOUhcichoS77+9GgRfMe+/ve+/vQJh77+9QmEE77+9cwHvv71zAVJ2AO+/vXMB77+9cwEO77+9Wu+/vXMBMXPvv73vv70CUu+/vQDvv71zAe+/vXMB77+9cwHvv71zAQjvv73vv70377+9cwE1cwAyRlkEBO+/vUHvv73vv70X77+977+9F++/ve+/vRfvv73vv70F77+977+9BQDvv73vv71zAT1zADNGcwEAQO+/vXMB77+9cwHvv71zAe+/vXMBSnMBAO+/ve+/vXMBPXMANO+/vXMB77+9cwHvv71zAe+/vXMB77+9cwEO77+9X++/ve+/vQXvv73vv70ANUZzAQAg77+977+9Au+/ve+/vQLvv73vv70C77+977+9Akrvv70CDhlh77+9cwExcwA2RnMBVlkEAAki77+9CwAD77+977+9C++/ve+/vQtSdgDvv73vv70IyrIIAO+/ve+/vVkE77+9WQA3RnMB77+977+9Au+/ve+/vQLvv73vv70C77+977+9Ak7vv70CAO+/ve+/vXMBPXMAOEZzAVbvv70C77+9JQrvv70lCu+/vSUK77+9JQoA77+977+9cwE9cwA5RnMBBABC77+9JQrvv70lCu+/vSUK77+9JQpGJQoOWmbvv73vv73vv71iEUrvv70LVu+/vQJS77+9EO+/vQoK77+9CgpSdgDvv73vv70F77+977+9BQ7vv71nOXLvv73vv70PADJK77+9D++/ve+/vQXvv73vv70F77+977+9Be+/ve+/vQVO77+9BQDvv73vv71YBO+/vVgAMkrvv70P77+9cwHvv71zAe+/vXMB77+9cwFOcwEOSWrvv73vv70CUe+/vUpZBO+/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ9O77+9Dw7vv71r77+9cwExc0rvv70P77+977+9Au+/ve+/vQLvv73vv70C77+977+9Ak7vv70CDu+/vWzvv71zATFzSu+/vQ/vv71zAe+/vXMB77+9cwHvv71zAU5zAQ45bu+/vXMBMXPvv73vv70P77+977+9D++/ve+/vQ/vv73vv70P77+977+9Dw7vv71v77+9cwExc++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ/vv73vv70PDu+/vXDvv71zATFz77+977+9D++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ8OKXLvv71zATFzSu+/vQ/vv73vv70F77+977+9Be+/ve+/vQXvv73vv70FTu+/vQUA77+977+977+9Cyrvv70LSu+/vQ/vv71zAe+/vXMB77+9cwHvv71zAU5zAQ7vv710We+/ve+/ve+/vQ9KJApW77+9D++/ve+/vRLvv73vv70S77+977+9Eu+/ve+/vRIA77+9Mu+/vQLvv71yAUojClZyAVLvv70Q77+9YhHvv71iEe+/vWIR77+9YhEOanfvv73vv70CTe+/vUoiClZyAe+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQIO77+9eO+/vXIBLXLvv70hClLvv70j77+977+9Au+/ve+/vQJSdgDvv71GFO+/vUYUDgp677+9cgEtckogClbvv70C77+9VgTvv71WBO+/vVYE77+9VgQOWnvvv71yAS1ySh8KVnIB77+9VgTvv71WBO+/vVYE77+9VgQO77+9fO+/vXIBLXJKHgpWcgHvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CABAS77+9fQgKCO+/vRrvv70rDH4KHxJeKH4WXhsQ77+977+9BFkKdu+/vSsE77+9Py5VQu+/ve+/vSwYEgAYDyAPERJwfggLCO+/vQrvv70Y77+9FwoYEhBjDu+/vQ7vv71EAGUW77+9fhXvv70o77+9Fgo2CiAKDggBEirvv71ADAoOCAIFEADvv70OWkIQAAAQABoBHiBAQBXvv73vv71M77+9KgQOc2IAEu+/vTgACBoAInbvv70AAO+/ve+/ve+/vQDvv71ILe+/vU8BADIWLEIcA++/vSc6Je+/vTMiDu+/vTcA77+9HmcrADpqHAAAQmocAABKahwAAFJqHAAAWmocAABiahwAAGpqHAAAcmocAAB6ahwABO+/vQFqHQAA77+9bh0ARO+/vQEB77+9ARDvv70BBO+/vQEF77+9AQDvv70BAiLvv71DNO+/vQED77+9AQ7vv70BBu+/vQEI77+9AXIZRQQAAg4ZRQzvv70/IAoO77+9LxQ/MAE4AO+/ve+/vTIABAAAHTIE77+9Au+/vWQAMjIAAO+/ve+/vTIADEBAIAUV77+9AO+/vXoyAADvv70O77+9OAVkCO+/ve+/vQwF77+9cO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQJpNTDvv73vv70SPyXvv73vv70SPy3vv73vv70SUe+/vQ7vv70yAEAuMQTvv70qMADvv70KVFIwBxLvv70677+9VAAA77+9ClRSNwNCVAABEu+/vVxABO+/vQMJ77+9YlQAMu+/vQDvv71UAADvv70KVO+/vVABLlABAO+/vQpUYu+/vQAyUAHvv73vv70AAO+/vX5UAO+/ve+/vQAA77+9ClTvv73vv70BLu+/vQEA77+9ClRe77+9ADbvv70C77+977+9AATvv70D77+9alJeCADvv70KHVJxAADvv70KHQDvv70i77+9JgB1Ju+/vSYA77+9Ch1SVwAA77+9bh0A77+977+9AwDvv70DAe+/vQMA77+9AwHvv70EAO+/vQQA77+9BADvv70EAO+/vQQA77+9BAHvv70E77+977+9f3/vv70FBgDvv70FBgDvv70FBgDvv70FBgTvv70EScWWcQLvv70hAQDvv70KVFIEAe+/vW0DAO+/vX5UAO+/vXECAO+/vQpU77+977+9AC7vv70AAO+/vQpUYu+/vQDKqAAE77+9BSnvv71eVADvv73vv70CBO+/vQUO77+9Ngzvv70FFe+/vQUJEO+/vQUZ77+9BXZ8Bu+/vRga77+9SwA+77+977+9AO+/vQrvv70ceXRNPiVU77+9NDLvv70IDj1C77+977+9AO+/ve+/vQUI77+9BQTvv70FBe+/vQUI77+9BQjvv70FBO+/vQUI77+9BQjvv70GCO+/vQYE77+9BgDvv70GAO+/vQYA77+9CCkTXiwE77+977+9RRzvv70JCe+/vQkK77+9Cmnvv71SbQEk77+9CgXvv70KBe+/vQoA77+9GikLUiYAQe+/ve+/ve+/vQAA77+9CnpSHgQc77+9CwDvv70LAO+/vQth77+9BO+/vQsJ77+977+9fQAufQAs77+9Cwjvv70LAe+/vQvvv73vv70ZPg44OADvv70SVUYOCu+/vXrvv70LGkMjBO+/ve+/ve+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNO+/ve+/ve+/vT4lUydZPy1IJ1k+Ghs3Gu+/vQtSHAAa77+9C1IcABrvv70LUhwAAFJJ77+9UhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAe77+9CwAH77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSAQLvv71kyrgKHu+/vQtiVADKuAXvv73vv70Lbu+/vQti77+9AO+/ve+/vQAe77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9Cwxebe+/vT4S77+9Twwt77+977+9fx7vv70I77+977+9C++/ve+/vQvvv73vv70LUm0BQu+/vQtSJgBB77+9yo8CwrQL77+9fQAufQBW77+9Cwjvv73vv703fu+/vQsa77+9Le+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUhwQGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgEC77+9ZMq4Ch7vv70LYlQAyrgF77+977+9C27vv70LYu+/vQDvv73vv70AHu+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQsw77+9RT8l77+9RT8t77+9RSplHe+/vWgX77+9aBfvv71oF1JtAULvv70LUiYAQe+/vcqPAsK0C++/vX0ALn0AVu+/vQsA77+977+977+9Cxrvv70t77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsc77+9YHk/Je+/vQg7Du+/vRoicVEa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0A77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSAQLvv71kyrgKHu+/vQtiVADKuAXvv73vv70Lbu+/vQti77+9AO+/ve+/vQAe77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9Cw5mIwwlAgBAMu+/vQjvv71oF++/vWgX77+9aBdSbQFC77+9C1ImAEHvv73KjwLCtAvvv719AC59AFbvv70LDtisehwjGu+/vTfvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CyDvv73vv71/PyXvv73vv70WPg7vv70sHiVdGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdABLvv70LBBrvv71WHCMAC++/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS4277+9LlIBAu+/vWTKuAoe77+9C2JUAMq4Be+/ve+/vQtu77+9C2Lvv70A77+977+9AB7vv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQsAHB7vv70uAB3vv73vv70uEu+/vQsE77+977+9Nu+/vQjvv73vv70L77+977+9C9q0CwASHu+/vS5SbQFC77+9C1ImAEHvv73KjwLCtAvvv719AC59AFbvv70LDnLvv71677+9CxolQu+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMGNUVD8lb++/ve+/vT0t77+977+977+9HkQmGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQsw77+977+9VD8l77+977+977+9PS3vv73vv73vv70R77+9Gu+/vQtSOAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAS77+9CwAQWu+/vQvvv73vv70677+977+9Ou+/ve+/vTrvv73vv70677+977+9Ou+/ve+/vTrvv73vv706Ou+/vTpSAQLvv71kyrgKHu+/vQtiVADKuAXvv73vv70Lbu+/vQti77+9AO+/ve+/vQAe77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Ah7vv70L77+977+9Og7vv706Eu+/vQscVyPvv709Le+/vVgP77+9HCPvv70cI++/vRwjIu+/vQtSbQFC77+9C1ImAEHvv73KjwLCtAvvv719AC59AFbvv70LDgnvv70mUO+/vRDvv70CChsSTjPvv70iO0YA77+9DmZCBO+/vT8a77+9RQ5D77+977+9Te+/vR5N77+9DDgTQA8Sc++/vQBtQW4IegDvv73vv73vv71K77+9Du+/ve+/vRTvv70/77+9AQDvv70KXV7vv70877+9MgcE77+9AQ7vv73vv70A77+9Eu+/ve+/vTjvv70CAO+/vQIA77+9AgPvv70CE++/vQIUIkjvv70OW8WGbwEm77+9O++/vW8Bam8BCBZAF++/vW8B77+9EgEA77+9Eirvv709b14wAu+/vVE+FO+/vQEB77+9AQA2bwEYAe+/vQIW77+9Ahg1bw7vv73vv705by4u77+9Jgrvv70AYRIt77+9Ve+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9Di7vv70A77+9EnEnTi7vv70AMRbWsjVu77+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv70OC++/vVIu77+9Hi/vv70iGQ7vv70u77+9ei7vv70Ocu+/ve+/vTBbKi7vv70WSu+/vRo7EO+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv71+Lu+/vQ7vv73vv73vv71yAS1yGh8T77+9cgFS77+9YO+/ve+/vWDvv73vv71g77+977+9YO+/ve+/vWAOEe+/vTly77+9PnVC77+9Au+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9DmHvv73vv71zATFz77+977+9AlLvv70W77+977+9Au+/ve+/vQJSdgDvv73vv71j77+977+9Yw7vv73vv73vv71zATFzGu+/vUcuWQQA77+977+91YDvv73VgO+/vdWA77+91YBK1YAOAe+/ve+/vXMBMXMaeT0ucwFWbmJScALvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CAO+/vTIaa++/ve+/vQUaODPvv71zAe+/vXMB77+9cwHvv71zAX5zAQ7vv73vv73vv73vv70CUe+/vRrvv70oLnMB77+9cm/vv71yb++/vXJv77+9cm9Ocm8O77+977+977+9cwExc++/vR1rUu+/ve+/ve+/vVkE77+9WQRSdgDvv70/B++/vT8HDkHvv73vv71zATFzSh5r77+977+9Au+/ve+/vQLvv73vv70C77+977+9Ak7vv70CDu+/ve+/ve+/vXMBMXPvv70fa++/vR9r77+9H2vvv70fa++/vR9rAO+/ve+/vT8H77+9P0oga++/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv71OLu+/vQ4y77+9We+/ve+/vXNCfg5K77+9CyBAQSoKSGVsdmUA77+9HADvv73vv70EbHRpY2FOZXVlOhgIAR0F77+9fz8lAADvv70/LQHvv71/PzUBCkRgAUABUABYAGAAaAB1AAAAAH0BBSjvv70BAe+/vQEB77+9AQHvv70BASUQ77+9AQHvv70BARgM77+9AQHvv70FEizvv70BAO+/vQIA77+9AgHvv70C77+9EQFMAe+/vQIB77+9AgHvv70CAO+/vQIA77+9AgHvv70CGgpidgBE77+9AgBibAgCGgEuJQAAEEIoAT0BYBhAAUgAUABdAQskagBwAHgA77+9AQoKAQ4AFQEFAO+/vQV7AO+/vQXvv70A77+9BQYA77+9BQYc77+9AQDvv70BAe+/vQEB77+977+9D++/vQEA77+9AQHvv70CAe+/vQIB77+9AgDvv70CAO+/vQIA77+9AgAxCNWYNxIrCO+/vQ8SAwEABRjvv70CIggKBAoCCysYAQoQLxgBIgoFFO+/vTwuEAMYAQohEhljaGFydC0xLXBhcmFncmFwaFN0eWxlXzIwKgQI77+977+9N1A5Wu+/vQEIABAAHQAAIEEqCkhlbHZlMnMBAe+/vQAlAQUALQEF77+9cwHvv71zAQFsQnYA77+9cwHvv71zAQDvv73vv71zAT1zBDEq77+9cwHvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zADJGcwEA77+977+977+9Au+/ve+/vQLvv73vv70C77+977+9Akrvv70CAO+/ve+/vXMBPXMAM0ZzAQAg77+9cwHvv71zAe+/vXMB77+9cwFKcwEA77+977+9cwE9cwA077+9cwHvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zADXvv71zAe+/vXMB77+9cwHvv71zAe+/vXMBAO+/ve+/vXMBPXMANkZzAQBAUlkEAAkiJQoAA++/vSUK77+9JQpSdgDvv73vv70IyrIIAO+/ve+/vXMBPXMAN0ZzAe+/ve+/vQXvv73vv70F77+977+9Be+/ve+/vQVO77+9BQDvv73vv71zAT1zADjvv71zAe+/vXMB77+9cwHvv71zAe+/vXMBAO+/ve+/vXMBPXMAOe+/vXMB77+9cwHvv71zAe+/vXMB77+9cwEA77+9MnMBBO+/vQIadA4AK2J+DgggEhhafg5KJApW77+9BVIHDu+/ve+/vQ/vv73vv70PUnYA77+977+9Be+/ve+/vQUA77+977+9cgE5ckojClZyAe+/vWIR77+9YhHvv71iEe+/vWIRAO+/ve+/vXIBOXJKIgpWcgFSbgLvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CAO+/ve+/vXIBOXLvv70hCiTvv73vv71/PyXvv73vv71/Py0BBe+/ve+/vRLvv73vv70SUnYA77+9VgTvv71WBADvv73vv71yATlySiAKVu+/vQLvv71WBO+/vVYE77+9VgTvv71WBADvv73vv71yATlySh8KVnIB77+9VgTvv71WBO+/vVYE77+9VgQA77+977+9cgE5ckoeClZyAe+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQIkEAjfmDcSCgjvv70nFu+/vRgQfgofEhce77+9CTRyZWZlcmVuY2VMaW5lXxp5GBTvv73vv70EWQpREl8ZUu+/vQJAFQAA77+9PxgAIAAtAADvv71AMicIARIIAAAYFhYYEhsYTgUAOBIAGA8gDxEI77+977+9NxILCO+/vQrvv70U77+9FwoYEhAR77+9FHNlcmllcx3vv70o77+9Fgo2CiAKDggBEirvv70ZDAoOCAIFEATvv71AEu+/vRkIEAAaAR40QEAV77+977+9TO+/vSoEbGluZRLvv704AAgaACJ277+9AADvv73vv73vv70AACrvv71TAEZTAAAyFgEbHO+/vdisPiV977+9QTIxBwA6ahwAAEJqHAAASmocAABSahwAAFpqHAAAYmocAABqahwAAHJqHAAAemocAATvv70Bah0AAO+/vW4dAETvv70BAe+/vQEQ77+9AQTvv70BBe+/vQEA77+9AQIi77+9HDjvv70BA++/vQEO77+9AQbvv70BCO+/vQEvchwDCAJDHQ7vv70cBCAKDu+/vRsUPzABOADvv73vv70yAAQAAB0yBO+/vQLvv71kADIyAADvv73vv70yAAxAQCAFFe+/vQDvv716MgAE77+9QmXvv70UIAot77+977+9DAXvv71w77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQIA77+9Aknvv70077+977+9Ej8l77+977+9Ej8t77+977+9Ej8a77+9CRAVAABAQC4xBAACZe+/vX4xBADvv70KVF7vv70ENu+/vQPvv71UAADvv70KVFI3AwAVIe+/vS7vv70AARLvv73vv70EBO+/vQMJ77+9YlQAMu+/vQDvv71UAADvv70KVO+/vVABLlABAO+/vQpUYu+/vQDvv73vv70AAO+/vX5UAO+/ve+/vQAA77+9ClTvv73vv70BLu+/vQEA77+9ClRe77+9ADbvv70C77+977+9AQTvv70D77+9alJeCADvv70KHVJxAADvv70KHQDvv70iDxcAdSYPFwDvv70KHVJXAADvv71uHQDvv73vv70DAO+/vQMB77+9AwDvv70DAe+/vQQA77+9BADvv70EAO+/vQQA77+9BADvv70EAe+/vQTvv73vv71/f++/vQUGAO+/vQUGAO+/vQUGAO+/vQUGBO+/vQRJ77+9LF7vv70SPyU877+9Ej8t1IZx77+9YVvvv70hAQDvv70KVFIEAe+/vW0DAO+/vX5UAO+/vXECAO+/vQpU77+977+9AC7vv70AAO+/vQpUYu+/vQDKqAAE77+9BSnvv71eVADOpAEE77+9Be+/ve+/vQzvv70FFe+/vQUJEO+/vQUZ77+9BXZ8Bu+/vRgIQCABDu+/vQkAPu+/ve+/vQDvv70K77+9HO+/ve+/vQk/JV7vv71UMu+/vQjvv73vv73vv73vv70A77+977+9BQjvv70FBO+/vQUF77+9BQjvv70FCO+/vQUE77+9BQjvv70FCO+/vQYI77+9BgTvv70GAO+/vQYA77+9BgDvv70IKRNeLAQAAO+/ve+/vQQc77+9CQnvv70JCu+/vQpp77+9Qm0BNAA/YAHvv70KBe+/vQoF77+9CgDvv70aKQtCJgAI77+9P2AB77+9Nu+/vQFhSe+/vVAGAO+/vQp6Uh4EHO+/vQsA77+9CwDvv70LYe+/vQTvv70LCe+/ve+/vX0AAe+/ve+/vX0AWO+/vQsI77+9CwDvv70L77+977+9GT7vv73vv70EAe+/ve+/vQQBEQjvv73vv73vv70LGkMjBO+/ve+/ve+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LIAPvv70nOiXvv70zIj9hQh4lCRrvv70LUhwAGu+/vQtSHAAa77+9C1IcAABSSe+/vVIcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0AHu+/vQsAB++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgEC77+9Rwge77+9C2JUAMqzBu+/ve+/vQtu77+9C2Lvv70A77+977+9Bh7vv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70C77+977+9Cy7vv70LHHl0TT4lVO+/vTQy77+9CO+/ve+/vQvvv73vv70L77+977+9C0JtAVLvv70LQiYA77+977+9C++/ve+/vQvvv719ACXvv73vv70pE1bvv70LAO+/ve+/ve+/vQsa77+9Le+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMOOStzQldu+/ve+/vT4t77+977+9Ojrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vUcIHu+/vQtiVADvv71HCO+/ve+/vQtu77+9C2Lvv70A77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9CzBx77+977+9NCUK77+9Fj8t77+977+9bR7vv70I77+977+9C++/ve+/vQvvv73vv70LQm0BUu+/vQtCJgDvv73vv70L77+977+9C++/vX0AJe+/vdq0CwDvv73vv73vv70LGu+/vS3vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzAsNu+/vTolCD3vv70+LQEAAHEoGmgXUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vUcIHu+/vQtiVADvv71HCO+/ve+/vQtu77+9C2Lvv70A77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9CzAKf++/vTolC++/ve+/vT4tNDMzHu+/vQjvv73vv70L77+977+9C++/ve+/vQtCbQFS77+9C0ImAO+/ve+/vQvvv73vv70L77+9fQAl77+92rQLAO+/ve+/ve+/vQsa77+9N++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNO+/vSTvv70zJVbvv71SPi1yNe+/vT4aQSwa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0AEu+/vQsEGu+/vVYcIwAL77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Ljbvv70uUgEC77+9Rwge77+9C2JUAO+/vUcI77+977+9C27vv70LYu+/vQDvv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70AAEDKqADvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv73vv70B77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQsAHB7vv70uAB3vv73vv70uMHtXMDQl77+9Au+/vT4t77+977+9Fe+/ve+/vQvvv73vv70L77+977+9CwASHu+/vS5CbQFS77+9C0ImAO+/ve+/vQvvv73vv70L77+9fQBhct60CwDvv73vv73vv70LGiVC77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsseu+/vTolR2Pvv709LSTvv71bPu+/vQtOHAAe77+9C04cAB7vv70LThwAHu+/vQtOHAAe77+9C04cAB7vv70LThwAHu+/vQtOHAAe77+9C04cAB7vv70LThwAIu+/vQtOHQAi77+9C04dABLvv70LABBa77+9C++/ve+/vTrvv73vv70677+977+9Ou+/ve+/vTrvv73vv70677+977+9Ou+/ve+/vTo677+9OlIBAu+/vUcIIu+/vQtOVQIBVO+/vUcI77+977+9C3Lvv70LXu+/vQDvv70LXlQA77+977+9AO+/ve+/vQty77+9C1rvv70A77+977+9CO+/ve+/vQtOcQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LTgQBYRnvv71xAiLvv70LXlQA77+9cQLvv73vv70Lcu+/vQvvv73vv70AHe+/vSLvv70LWlQA77+977+9Ah7vv70L77+977+9Og7vv706MO+/vTA0OyVz77+9Nz4t77+9NO+/vR7vv70I77+9aBfvv71oF++/vWgXJu+/vQs+bQFW77+9Cz4mAO+/ve+/vQvvv73vv70L77+9fQAl77+977+9aBcA77+9Eu+/vQsA77+9GjhGFO+/vQIKGxITHjhGHHZhbHVlYXhpLjtGAO+/vQ5uOwTvv70/Gu+/vUUQ77+9Ljk/JQEFAC0BBRpYFu+/vQAEDDgTQA8SSGAAbQ48PQx6AO+/vQEW77+9OwFaTmQAzoU8Du+/vWAU77+9P++/vQEA77+9Cl1e77+9PO+/ve+/vQQE77+9AQ5uYQTvv70BDu+/vWBE77+9AgDvv70CAO+/vQID77+9AhPvv70CFO+/vQIBDu+/vTsIEQjvv73vv71vAQAxFu+/vVME77+977+977+9bwFubwEIFkAX77+9bwHvv70SAQDvv70S77+9YT1v77+977+9AS7vv70BFO+/vQEB77+9AQA2bwEYAe+/vQIW77+9Ahg1bwDvv70ybwEU77+9AgoeEhZJ77+9JDItY2F0ZWdvcnk677+9Agjvv70CCkHvv70AGnZ9Au+/vQ4BGCgAMBs4E01BcwBlAWMIcgDvv71N77+977+9FwEuFwEWc2MM77+9AQDvv73vv71dAEpdACTvv70BAe+/vQEA77+9AQDvv70STmQw77+9AgDvv70CAu+/vQIb77+9AhPvv70O77+9Y03vv70A77+9JXcA77+977+9VRTvv70cChUSCjV3Du+/vWNV77+9BO+/vRslbnQS77+9BAoHRGVmYXVsdBLvv70BCgtGaWxsIENlbnRlchIUJlBkce+/vQjvv70/GgEWBO+/vT/vv71sEhpIEiZlACJSFgAULe+/ve+/ve+/vT4yARsAABbvv71kETEgAAA4AUABShYKARwsIEEVAABwQR0AAO+/vUESaktMEu+/vQEKD0RpcmVjdGlvbmFsIEtlee+/vQAK77+9DAAAQD9m77+9AABSAe+/vTQC77+977+977+9FSjvv70R77+9HUdkSO+/vQnvv70M77+9AQoKJRYQUmlnaHTvv70ACu+/vQjvv73vv71M77+9FQEE77+9Qu+/ve+/vSExAAAWf0wQEu+/vQEKCQXvv70ITGVm77+977+9AAnvv70E77+9PWYPAS3vv70E77+977+9Ou+/vQAoGu+/vQQKC01lZGl1bQnvv70B77+9EFRvcCBMch4BEO+/ve+/vVI/FQEFUQIA77+9QTMBEToWAEEz77+977+9AABAQTMA77+9Fu+/vUkp77+9DO+/vQEKECUeSe+/vRAgSGlnaGLvv70BHGjvv710PxXvv708eDbvv70AShYADC1mZmZqNAItJQBIISUA77+9Ae+/vQTvv71CCe+/ve+/vTQC77+9NAIAIArvv71hSS4WAQhMb3diFQHvv70a77+977+9AwgAAADvv70VAQjvv70dADEVICLvv70ECgpTb2Z0TSvvv71uBO+/vW4EADBBOwBILu+/vQEhJe+/vW4ETm4EAO+/ve+/vSUBLu+/vQDvv706Ako6Au+/ve+/vQXvv71uBO+/vW4EXm4EACrvv700Au+/vTQC77+9NALvv700Au+/vTQC77+9NALvv700Au+/vTQC77+9NAIAMu+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70I77+977+9CBA677+9BAoKGu+/vQgWPgjvv73vv70GSu+/vQYI77+977+977+977+977+9CQRA77+9DlxSLgoLAO+/ve+/vQoLUgoLdu+/vQg8WjYKFAoBAe+/vUEV77+9ACBCHe+/vSLvv70LOBQKMVzvv70+FSYoFO+/vR1r77+9NxYgCxAd77+977+9TEAm77+9CAxFZGdleioLCO+/vQ5mHmkIAO+/vRplcQQiFE4WAO+/vSoLAEgOKgsA77+9ITUuKgsF77+9cioL77+977+9AD7vv70ADgUKLu+/vQAAVQ5RCQhaAGIW77+9Dg59DiUmDj4JHu+/vXASbwnGolMIaAByDnxyIO+/vT/vv70BAAAgQe+/vQEGUELvv70BAO+/vQEK77+9AQzvv70BCu+/vQIAAO+/vUDvv70HAXUO77+9EAgQCO+/vRI1WQDvv70aGQ4QeAoWEg4SEA4gLTItbGVnZW5kIhkOEFwKABAREu+/vQvvv73vv71XDu+/vRLvv70LEwgxCO+/ve+/vTBbADI+WnIa77+9WQBQKlly77+9MFvvv70wW++/vTBb77+9MFtGMFsIMQjvv73vv71yATlyGh8T77+9cgFS77+9YO+/vWpi77+9amJSdgDvv73vv71g77+977+9YADvv70ycgHvv70+dULvv70CADHvv73vv70CYe+/vUJhBO+/vXMB77+9cwFSdgDvv71zAe+/vXMBAO+/ve+/vXMBPXPvv73vv70CUu+/vQDvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zGu+/vUcuWQQA77+9UnJv77+9cwHvv71zAe+/vXMB77+9cwEA77+977+9cwE9cxp5PS5zAVY+B++/vXMB77+9cwHvv71zAe+/vXMBAO+/ve+/vXMBPXMaODPvv71zAe+/vXMB77+9cwHvv71zAX5zAQDvv73vv71zAT1zGu+/vSgucwHvv71Ycu+/vVhy77+9WHLvv71Yck5YcgDvv73vv71zAT1z77+9HWtS77+9dO+/vT8H77+9PwdSdgDvv73vv70IyrIIAO+/ve+/vXMBPXNKHmvvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CTu+/vQIA77+977+9cwE9c++/vR9r77+9H2vvv70fa++/vR9r77+9H2sE77+977+977+9Se+/vUYLCkogawgAQirvv71J77+977+9Se+/ve+/vUnvv73vv71J77+9Qknvv70A77+9Mu+/vQLvv70+dUJzAUrvv70LViQKUu+/vWPvv73vv70F77+977+9BVJ2AO+/ve+/vQXvv73vv70FAO+/ve+/ve+/vQJZ77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv70A77+977+9cwE9c0rvv70P77+9Pgfvv70+B++/vT4H77+9PgdOPgcA77+977+9cwE9c0pZBO+/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ9O77+9DwDvv73vv71zAT1zSu+/vQ/vv73vv70C77+977+9Au+/ve+/vQLvv73vv70CTu+/vQIA77+977+9cwE9c0rvv70P77+9cwHvv71zAe+/vXMB77+9cwFOcwEA77+977+9cwE9c++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ/vv73vv70PAO+/ve+/vXMBPXPvv73vv70P77+977+9D++/ve+/vQ/vv73vv70P77+977+9DwDvv73vv71zAT1z77+977+9D++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ8A77+977+9cwE9c0rvv70P77+977+9Be+/ve+/vQXvv73vv70F77+977+9BU7vv70FAO+/ve+/vXMBPXNK77+9D++/vXMB77+9cwHvv71zAe+/vXMBTnMBAO+/ve+/ve+/vQ8m77+9D0okClbvv70P77+9FBrvv70UGu+/vRQa77+9FBoA77+977+9cgE5ckojClZyAVLvv70Q77+9YhHvv71iEe+/vWIR77+9YhEA77+977+9cgE5ckoiClZyAe+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQIA77+977+9cgE5cu+/vSEKUu+/vSPvv73vv70C77+977+9AlJ2AO+/vUYU77+9RhQA77+977+9cgE5ckogClbvv70C77+9VgTvv71WBO+/vVYE77+9VgQA77+977+9cgE5ckofClZyAe+/vVYE77+9VgTvv71WBO+/vVYEAO+/ve+/vXIBOXJKHgpWcgHvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CDBAI77+977+9Wi7vv70AMu+/vS7vv73vv70u77+9AO+/vRLvv706Hi7vv70A77+9Ki7vv70AMkYu77+9AO+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv71+Lu+/vTDvv73vv73vv70+JVMnWT8tSCdZHh5CGl5WUhwAGu+/vUpSHAAa77+9SlIcABrvv71KUhwAGu+/vUpSHAAa77+9SlIcABrvv71KUhwAGu+/vUpSHAAa77+9SlIcAB7vv71KUh0AHu+/vUpSHQAe77+9Su+/vS7vv73vv70u77+9Fu+/vX4O77+977+9Dlc5Du+/vX7vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv71SAQLajDEA77+9Gu+/ve+/vWJUAABA77+977+9Me+/ve+/vUpu77+9SmLvv70AyogyHnp5YlQA77+977+9AO+/ve+/vUpu77+9Sl7vv70A77+977+9R++/ve+/vUpScQDvv73vv71K77+977+9Smrvv71K77+977+977+9YSvvv73vv70zAO+/vRoy77+9UgQB77+9bQMe77+9SmJUAO+/vXECHu+/vUrvv73vv70ALu+/vQAeLu+/ve+/ve+/vQAu77+9AB7vv71KXlQA77+977+9Au+/ve+/vUou77+9Sgxebe+/vT4SC0QMLe+/ve+/vX8e77+9CA49QsqUAe+/vS7vv73vv70u77+9Gi7vv70AAEIU77+9XnkB77+9dQLvv70U77+977+9fQAufQBWYHkA54aaCxopIwTvv73vv73vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzAg77+977+9NCXvv73vv73vv70+Le+/ve+/ve+/vXEOGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdAB7vv70L77+9FO+/ve+/vRTvv73vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C8qaC1IBAu+/vS0IHu+/vQtiVADKmQbvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQsw77+9Hu+/vTQlKCwvPy1/77+9JyosVO+/ve+/vQvvv73vv70L77+977+9CyLvv70LXnkB77+9dQLCmgvvv719AC59AFbvv70LAOiGmgsaUC3vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzR/77+977+9PSXvv73vv70xPy3vv70V77+9Oho6Vxrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vS0IHu+/vQtiVADvv70tCO+/ve+/vQtu77+9C2Lvv70A77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9CzQzJxU+JRPvv71kPy3vv73vv70QOxrvv70I77+9NBfvv700F++/vTQXLjQXXnkB77+9dQLCmgvvv719AC59AFbvv70LAOmGmgsaUy3vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzBF77+977+9PSXVpGc/LX/vv71PHu+/vQ4a77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0A77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSAQLvv70tCB7vv70LYlQA77+9LQjvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQsM77+977+977+9PRbvv70iCDHvv71lHu+/vQjvv73vv70L77+977+9C++/ve+/vQsu77+9C155Ae+/vXUCwpoL77+9fQAufQBW77+9CwDqhpoLGns377+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsw77+977+977+9OyU/77+977+9Pi0977+977+9OjQXUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAS77+9C++/vcaE77+9xoTvv73vv70i77+977+9Iu+/ve+/vSLvv73vv70i77+977+9Iu+/ve+/vSJSAQLvv70tCB7vv70LYlQA77+9LQjvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQIe77+9C++/vcaEDsaEMALvv73vv707JVPvv70kPy3vv705Je+/vTQX77+9NBfvv700FwQS77+9SmguXnkB77+9dQLCmgvvv719AC59AFbvv70LAOuGmgsa77+9Qe+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMO+/ve+/vTQl77+977+9KD8t77+977+9HR7vv70OGjQXUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAS77+9C++/ve+/ve+/vc6s77+977+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvKmgtSAQLvv70tCB7vv70LYlQA77+9LQjvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQIe77+9C++/ve+/ve+/vQ7vv73vv70w77+9Z++/vTQl77+9Clw/LUNFTR7vv70I77+9NBfvv700F++/vTQXUu+/vQteeQHvv711AsKaC++/vX0ALn0AVu+/vQsA77+9Eu+/vQtO77+977+9ADLvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv71O77+977+9AO+/vW8BADEi77+9c++/vQHvv71qAe+/vQQWQO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQTvv73vv70O77+977+9Ue+/vS7vv73vv70AM++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vW7vv73vv70A77+9JXdO77+977+9BDMtEu+/vXZV77+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+9AO+/vRLvv71YSu+/ve+/vQAz77+977+977+977+977+977+9AO+/vTLvv71k77+9MHMAM++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vdqS77+9AO+/ve+/vXIBOXIaHxMu77+9e1YGXFLvv71f77+9XGDvv71cYO+/vVxg77+9XGAA77+9MnIB77+977+977+9Qu+/vQLvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70A77+977+9cwE9c++/ve+/vQLvv71eYO+/vV5g77+9XmDvv71eYADvv73vv71zAT1zGlJHLlkEAO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vUrvv73vv70A77+977+9cwE9cxorPS5zAVbvv70F77+977+9Alrvv70CAHYcAO+/ve+/vQQA77+9CQFwAe+/vQIB77+9AgHvv70CAO+/vQIA77+9AgHvv70CGgoYCAEdAAAAACUBBQAtAQVgNQAA77+9P2AB77+9AgBibAgCGgEuJQAAEEIoAT0BHRhAAUgAUABdAQskagBwAHgA77+9AQoKAQ4AFQEFBO+/vQEBPATvv70BAQwA77+9BQYA77+9BQYc77+9AQDvv70BAe+/vQEB77+977+9D++/vQEA77+9AQHvv70CAe+/vQIB77+9AgDvv70CAO+/vQIA77+9AgAxCO+/ve+/vTcSKwjvv70PEgMBAAUY77+9AiIICgQKAgsrGAEKEC8YASIKBRTvv71GLhADGAEKIRIZY2hhcnQtMy1wYXJhZ3JhcGhTdHlsZV8xNCoECO+/ve+/vTdQOVrvv70BCAAQAB0AAEBBKgpIZWx2ZXRpY2FOZXVlOhhe77+9AChAAVAAWABgAGgAdQHvv70AfQEFJO+/vQEB77+9AQHvv70BAe+/vQXvv70M77+9AQHvv70F77+9DO+/vQEB77+9BRIo77+9AQDvv70CAO+/vQIB77+9AgHvv70FAe+/vXMB77+9cwF+cwEA77+977+9cwE9cwQ1KkJzAQAg77+9cwHvv71zAe+/vXMB77+9cwFKcwEA77+977+9cwE9cwA2RnMBAEBScwEQCe+/vX8/JWHvv70QLQPvv71/P23vv73vv73vv70C77+977+9AlJ2AO+/vVkE77+9WQQA77+977+9cwE9cwA3RnMB77+977+9Au+/ve+/vQLvv73vv70C77+977+9Ak7vv70CAO+/ve+/vXMBPXMAOEZzAVbvv70C77+977+9Qu+/vQbvv73vv70C77+977+9AlJ2AO+/ve+/vQLvv73vv70CAO+/ve+/vXMBPXMAOUZzAQgAQirvv70/B++/vT8H77+9Pwfvv70/B0I/BwDvv70ycwEE77+9Ahrvv70IACti77+9CAggEhha77+9CAAyRnIBVu+/vQIABe+/ve+/vQAB77+977+9Be+/ve+/vQVSdgDvv73vv70C77+977+9AgDvv70ycgHvv70kCgQyMEZzAe+/ve+/vQXvv73vv70F77+977+9Be+/ve+/vQVO77+9BQDvv73vv71zAT1zADHvv71zAe+/vXMB77+9cwHvv71zAe+/vXMBAO+/ve+/vXMBPXNKWQQA77+9UiQKUu+/vQbvv70+B++/vT4H77+9Pgfvv70+BwDvv73vv71zAT1zADPvv73vv70C77+977+9Au+/ve+/vQLvv73vv70C77+977+9AgDvv73vv71zAT1zSu+/vQ/vv73vv70F77+977+9Be+/ve+/vQXvv73vv70FTu+/vQUA77+977+9cwE9c++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ/vv73vv70PAO+/ve+/vXMBPXPvv73vv70P77+977+9D++/ve+/vQ/vv73vv70P77+977+9DwDvv73vv71zAT1z77+977+9D++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ8A77+977+9cwE9c0rvv70P77+977+9Be+/ve+/vQXvv73vv70F77+977+9BU7vv70FAO+/ve+/vXMBPXNK77+9D++/vXMB77+9cwHvv71zAe+/vXMBTnMBAO+/vTJzAe+/ve+/vQ9KJApW77+9D++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsA77+977+9cgE5ckojClZyAVLvv70Q77+9CQrvv70JClJ2AO+/vWIR77+9YhEA77+977+9cgE5ckoiClZyAe+/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQIA77+977+9cgE5cu+/vSEKJO+/ve+/vX8/Je+/ve+/vX8/LQEF77+9ERrvv70RGlJ2AO+/ve+/vQLvv73vv70CAO+/ve+/vXIBOXJKIApW77+9AlLvv70D77+9VgTvv71WBO+/vVYE77+9VgQA77+977+9cgE5ckofClZyAe+/vVYE77+9VgTvv71WBO+/vVYEAO+/ve+/vXIBOXJKHgpWcgHvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CJBAI77+977+9NxIKCO+/vScW77+9IhB+Ch8SFx7vv70ZNHJlZmVyZW5jZUxpbmVfGnkYFO+/ve+/vQRZClFm77+9IxwVAADvv70/GAAgDu+/vSMQ77+9QDInCAESCAAAGBbvv70cEu+/vRxOBQA4EgAYDyAPEQjvv73vv703EgsI77+9Cu+/vRTvv70XChgSEBHvv70Uc2VyaWVzHe+/vSjvv70WCjYKIAoOCAESKu+/vSMMCg4IAgUQBO+/vUAS77+9IwgQABoBHjRAQBXvv73vv71M77+9KgRsaW5lEu+/vTgACBoAInbvv70AAO+/ve+/ve+/vQAAKu+/vVMARlMAADIWJSUg77+9YHk/Je+/vQg7Py4lJQA6ahwAAEJqHAAASmocAABSahwAAFpqHAAAYmocAABqahwAAHJqHAAAemocAATvv70Bah0AAO+/vW4dAETvv70BAe+/vQEQ77+9AQTvv70BBe+/vQEA77+9AQIiUyU477+9AQPvv70BDu+/vQEG77+9AQjvv70BL3IcAwgCQx0O77+9IgQgCiHvv70UPzABOADvv73vv70yAAQAAB0yBO+/vQLvv71kADIyAADvv73vv70yAAxAQCAFFe+/vQDvv716MgAE77+9QsWqFCAKLe+/ve+/vQwF77+9cO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQJJ77+9NO+/ve+/vRI/Je+/ve+/vRI/Le+/ve+/vRI/Gu+/vQkQFQAAQEAuMQQAAmXvv71+MQQA77+9ClRSMAcAFSFk77+9VAAA77+9ClRSNwNCVAABEu+/ve+/vQQE77+9Awnvv71iVAAy77+9AO+/vVQAAO+/vQpU77+9UAEuUAEA77+9ClRi77+9ADJQAe+/ve+/vQAA77+9flQA77+977+9AADvv70KVO+/ve+/vQEu77+9AQDvv70KVF7vv70ANu+/vQLvv73vv70ABO+/vQPvv71qUl4IAO+/vQodUnEAAO+/vQodAO+/vSI0IQB1JjQhAO+/vQodUlcAAO+/vW4dAO+/ve+/vQMA77+9AwHvv70DAO+/vQMB77+9BADvv70EAO+/vQQA77+9BADvv70EAO+/vQQB77+9BO+/ve+/vX9/77+9BQYA77+9BQYA77+9BQYA77+9BQYE77+9BEnFlnEC77+9IQEA77+9ClRSBAHvv71tAwDvv71+VADvv71xAgDvv70KVO+/ve+/vQAu77+9AADvv70KVGLvv70AyqgABO+/vQUp77+9XlQA77+977+9AgTvv70F77+9SQzvv70FFe+/vQUJEO+/vQUZ77+9BXZ8Bu+/vRgcQCABLQAA77+9Pu+/ve+/vQDvv70K77+9AUoMJQIAQDLvv70I77+977+977+977+9AO+/ve+/vQUI77+9BQTvv70FBe+/vQUI77+9BQjvv70FBO+/vQUI77+9BQjvv70GCO+/vQYE77+9BgDvv70GAO+/vQYA77+9CCkTXiwEAADvv73vv70EHO+/vQkJ77+9CQrvv70Kae+/vVJtASTvv70KBe+/vQoF77+9CgDvv70aKQtSJgBB77+977+977+9AADvv70KelIeBBzvv70LAO+/vQsA77+9C2Hvv70E77+9Cwnvv73vv719AC59AFjvv70LCO+/vQsB77+9C++/ve+/vRk+77+977+9BAHvv73vv70EAREI77+977+977+9CxpDIwTvv73vv73vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C2UoCO+/ve+/vRMyKAMa77+9C1IcABrvv70LUhwAGu+/vQtSHAAAUknvv71SHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdAB7vv70LAAfvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vWTvv73vv70FHu+/vQtiVADKuAXvv73vv70Lbu+/vQti77+9AO+/ve+/vQAe77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQtC77+9CyDvv73vv70pPy3vv73vv71MPibvv70R77+977+9C++/ve+/vQvvv70LUm0BQu+/vQtSJgBB77+9yo8CwrQL77+9fQAufQBW77+9CwDvv73vv73vv70LGu+/vS3vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9Cwzvv73vv70+DkAVHu+/vTwu77+9Cz4cAC7vv70LPhwALu+/vQs+HAAu77+9Cz4cAC7vv70LPhwALu+/vQs+HAAu77+9Cz4cAC7vv70LPhwALu+/vQs+HAAy77+9Cz4dADLvv70LPh0A77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C8K0Cz4BAu+/vWTKuAoy77+9C05UAMq4Be+/ve+/vQvvv73vv70LTu+/vQDvv73vv70AMu+/vQtOVADvv73vv70A77+977+9C++/ve+/vQtK77+9AO+/ve+/vQjvv73vv70LPnEA77+977+9C++/ve+/vQvvv73vv70LzrQLPgQB77+9bQMy77+9C05UAO+/vXEC77+977+9C++/ve+/vQvvv73vv70ACu+/vTLvv70LSlQA77+977+9Au+/ve+/vQtC77+9Cwwr77+977+9Pu+/ve+/vQvvv73vv70L77+977+9C0Lvv70LPm0BVu+/vQs+JgBB77+9yo8C1rQL77+9fQAKfVbvv70LAO+/ve+/ve+/vQsa77+9Le+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNMefbj8l77+9EAo+Le+/ve+/vT49Gu+/vQ4a77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0A77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSAQLvv71kyrgKHu+/vQtiVADKuAXvv73vv70Lbu+/vQti77+9AO+/ve+/vQAe77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQtC77+9Cxx2HhQ+LS3vv71MHu+/vQjvv70cI++/vRwj77+9HCNSbQFC77+9C1ImAEHvv73KjwLCtAvvv719AC59AFbvv70LAO+/ve+/ve+/vQsa77+9N++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNC9ONT8lCwnvv709LVLvv73vv70yNu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdABLvv70LBBrvv71WHCMAC++/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS4277+9LlIBAu+/vWTKuAoe77+9C2JUAMq4Be+/ve+/vQtu77+9C2Lvv70A77+977+9AB7vv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQsAHB7vv70uAB3vv73vv70uNGLvv71oPyV777+977+9PS1q77+9BDMa77+9CO+/ve+/vQvvv73vv70L2rQLABIe77+9LlJtAULvv70LUiYAQe+/vcqPAsK0C++/vX0ALn0AVu+/vQsA77+977+977+9CxolQu+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LIGTvv70JPyXvv70ScD1KHCNSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdABLvv70LABBa77+9C++/ve+/vTrvv73vv70677+977+9Ou+/ve+/vTrvv73vv70677+977+9Ou+/ve+/vTo677+9OlIBAu+/vWTKuAoe77+9C2JUAMq4Be+/ve+/vQtu77+9C2Lvv70A77+977+9AB7vv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQvvv73vv706Du+/vToc77+977+9PD8l77+977+977+9Mu+/vQjvv73vv70L77+977+9C++/ve+/vQtSbQFC77+9C1ImAEHvv73KjwLCtAvvv719AC59AFbvv70LAO+/vRLvv70LAO+/vRo4RhTvv70CChsSEx44Rhx2YWx1ZWF4aS47RgDvv70OZkIE77+9Pxrvv71FEO+/vS45PyUBBQAtAQUm77+9Cu+/vXEGDDgTQA8SbGoAbQ7vv70vDHoA77+9ARbvv707AVpOZADOhTwO77+9ahTvv70/77+9AQDvv70KXV7vv70877+977+9AATvv70BDh9qAO+/vRLvv71qRO+/vQIA77+9AgDvv70CA++/vQIT77+9AhTvv70CAQ7vv707CBEI77+977+9bwEm77+9O++/vW8Bam8BCBZAF++/vW8B77+9EgEA77+9EitrPW/vv73vv70BLu+/vQEU77+9AQHvv70BADZvARgB77+9Ahbvv70CGDVvAO+/vTJvARTvv70CCh4SFknvv70kNC1jYXRlZ29yeTrvv70CCO+/vQIKQe+/vQAadn0C77+9DgEYKAAwGzgTTUFzAGUBYwhyAO+/vU3vv73vv70XAS4XARbvv71tDO+/vQEA77+977+9XQBKXQAk77+9AQHvv70BAO+/vQEA77+9Eu+/vWww77+9AgDvv70CAu+/vQIb77+9AhPvv70O77+9bU3vv70A77+9JXcA77+977+9VRTvv70cChUSCjV3Du+/vW0WM18Q77+977+9BO+/vRslbngS77+9BAoHRGVmYXVsdBLvv70BCgtGaWxsIENlbnRlchIUCiEz77+9bgAAce+/vQjvv70/GgEWBO+/vT/vv73vv70APxbvv70zIVMAIlIWABQt77+977+977+9PjIBGwAAFUcA77+9DiJrIAAAOAFAAUoWCgEcLCBBFQAAcEEdAADvv71BEmpLTBLvv70BCg9EaXJlY3Rpb25hbCBLZXnvv70ACu+/vQwAAEA/Zu+/vQAAUgHvv700Au+/ve+/ve+/vRUo77+9Ee+/vR1HZEjvv70J77+9DO+/vQEKCiUWEFJpZ2h077+9AArvv70O77+9Nmbvv70ALRUE77+9QjJ4ARgAABLvv70BCgkF77+9CExlZu+/ve+/vQAJ77+9BO+/vT3vv73vv70AAO+/vTrvv70AKBrvv70ECgtNZWRpdW0J77+9Ae+/vRBUb3AgTHIeARDvv73vv71SPxUBBTIzAgEROhYAQTPvv73vv70AAEBBMwDvv70W77+9SSnvv70M77+9AQoQJR5J77+9ECBIaWdoYu+/vQEcaO+/vXQ/Fe+/vTx4Nu+/vQBKFgAMLWZmZmo0Ai3vv70ASCElAO+/vQHvv70E77+9Qgnvv73vv700Au+/vTQCACAK77+9YUkuFgEITG93YhUBYceW77+9AwgAAADvv70VAQjvv70dADEVICLvv70ECgpTb2Z0TSvvv71uBO+/vW4EADBBOwBILu+/vQEhJe+/vW4ETm4EAO+/ve+/vSUBLu+/vQDvv706Ako6Au+/ve+/vQXvv71uBO+/vW4EXm4EACrvv700Au+/vTQC77+9NALvv700Au+/vTQC77+9NALvv700Au+/vTQC77+9NAIAMu+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70I77+977+9CO+/ve+/vQjvv73vv70I77+977+9CBA677+9BAoKGu+/vQgWPgjvv73vv70GSu+/vQYI77+977+977+977+977+9CQRA77+9DlxSLgoLAO+/ve+/vQoLUgoLdu+/vQg8WjYKFAoBAe+/vUEV77+9ACBCHe+/vSLvv70LOBQKMVzvv70+FSYoFO+/vR1r77+9NxYgCxAd77+977+9TEAm77+9CAxFZGdleioLCO+/vQ5mHmkIAO+/vRowdwQiFE4WAO+/vSoLAEgOKgsA77+9ITUaYHsS77+9CgXvv71yKgvvv73vv70APu+/vQAOBQou77+9AABVDlEJCFoAYhbvv70ODkoKJSYOPgkecT8Sbwku77+9UwES77+977+9UwhoAHIOLXsg77+9P++/vQEAACBB77+9AQZQQu+/vQEA77+9AQrvv70BDO+/vQEK77+9AgAA77+9QO+/vQcBdQ7vv70QCBAI77+9EjVZAO+/vRoZDhB4ChYSDhIQDiAtNC1sZWdlbmQiGQ4QXAoAEBES77+9C++/ve+/vVcO77+9Eu+/ve+/vQAIMQjvv73vv70wWwA0Pn58Gu+/vVkAUO+/vX18UntS77+9FF7vv70UXu+/vRRe77+9FF4A77+977+9cgE5chofE++/vXIBUu+/vWDvv71yAe+/vXIBUnYA77+977+9YO+/ve+/vWAA77+9MnIB77+9PnVC77+9AgAx77+977+9AmHvv71CYQTvv71zAe+/vXMBUnYA77+9cwHvv71zAQDvv73vv71zAT1z77+977+9AlLvv70A77+9cwHvv71zAe+/vXMB77+9cwEA77+977+9cwE9cxrvv71HLlkEAO+/ve+/vT5177+9PnXvv70+de+/vT51Sj51AO+/ve+/vXMBPXMaeT0ucwFWbmLvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CAO+/ve+/vXMBPXMaODPvv71zAe+/vXMB77+9cwHvv71zAX5zAQDvv73vv71zAT1zGu+/vSgucwHvv71yb++/vXJv77+9cm/vv71yb05ybwDvv73vv71zAT1z77+9HWtS77+977+977+9Pwfvv70/B1J2AO+/ve+/vQjKsggA77+977+9cwE9c0oea++/ve+/vQLvv73vv70C77+977+9Au+/ve+/vQJO77+9AgDvv73vv71zAT1z77+9H2vvv70fa++/vR9r77+9H2vvv70fawDvv73vv71zAT1zSiBr77+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/vU4u77+9AO+/vTJzAe+/vT51Qn4OSu+/vQtWJArvv71iEe+/vWIR77+9YhHvv71iEQDvv70ycgHvv73vv70P77+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv70A77+977+9cwE9c0rvv70P77+9Pgfvv70+B++/vT4H77+9PgdOPgcA77+977+9cwE9c0pZBO+/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ9O77+9DwDvv73vv71zAT1zSu+/vQ/vv73vv70C77+977+9Au+/ve+/vQLvv73vv70CTu+/vQIA77+977+9cwE9c0rvv70P77+9cwHvv71zAe+/vXMB77+9cwFOcwEA77+977+9cwE9c++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ/vv73vv70PAO+/ve+/vXMBPXPvv73vv70P77+977+9D++/ve+/vQ/vv73vv70P77+977+9DwDvv73vv71zAT1z77+977+9D++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ8A77+977+9cwE9c0rvv70P77+977+9Be+/ve+/vQXvv73vv70F77+977+9BU7vv70FAO+/ve+/vXMBPXNK77+9D++/vXMB77+9cwHvv71zAe+/vXMBTnMBAO+/vTJzAe+/ve+/vQ9KJApW77+9D++/vRQa77+9FBrvv70UGu+/vRQaAO+/ve+/vXIBOXJKIwpWcgHvv71iEe+/vWIR77+9YhHvv71iEQDvv73vv71yATlySiIKVnIB77+977+9Au+/ve+/vQLvv73vv70C77+977+9AgDvv73vv71yATly77+9IQpS77+9I++/vREa77+9ERpSdgDvv70RGu+/vREaAO+/ve+/vXIBOXJKIApW77+9Au+/vVYE77+9VgTvv71WBO+/vVYEAO+/ve+/vXIBOXJKHwpWcgHvv71WBO+/vVYE77+9VgTvv71WBADvv73vv71yATlySh4KVnIB77+977+9Au+/ve+/vQLvv73vv70C77+977+9AggQCO+/vRLvv70rSi7vv70ANO+/vS7vv73vv70u77+9AO+/vRLvv706Ti7vv70ANO+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9MO+/vR1MPyXvv701Jj4t77+9Lu+/vR7vv71wGhJiUhwAGu+/vUpSHAAa77+9SlIcABrvv71KUhwAGu+/vUpSHAAa77+9SlIcABrvv71KUhwAGu+/vUpSHAAa77+9SlIcAB7vv71KUh0AHu+/vUpSHQAe77+9Su+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9UgEC2owxAO+/vRrvv73vv71iVAAAQO+/ve+/vTHvv73vv71Kbu+/vUpi77+9AMqIMh7vv71KYlQA77+977+9AO+/ve+/vUpu77+9Sl7vv70A77+977+9R++/ve+/vUpScQDvv73vv71K77+977+9Su+/ve+/vUrvv73vv71KUgQB77+9bQMe77+9SmJUAO+/vXEC77+977+9Sm7vv71K77+977+9AC7vv70AHu+/vUpeVADvv73vv70C77+977+9Si7vv71KMO+/vVB/PyXvv73vv71PPi3Slxoq77+9SO+/vXp577+9ennvv716eUJtAQgAP2BG77+9SkImAA7as0Hvv70y77+9Au+/vSI3wqpK77+9fQAB77+977+977+9NxLvv71KAAA+Lu+/vQDvv73vv73vv70LGkMj77+9Xlbvv71eVu+/vV5W77+9Xlbvv71eVjBU77+9Az8lS++/ve+/vT4t77+9ChFxKBrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAe77+9C++/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9UgEC77+9ZMq4Ch7vv70LYlQAMu+/vQUBZu+/vTsF77+977+9C27vv70LYu+/vQDvv73vv70AHu+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQsw77+9JzI/JUxV77+9Pi3vv71ARB7vv70IDu+/vU3KlAHvv73vv73vv73vv70i77+9Qm0BUu+/vQtCJgDvv73vv70L77+977+9C++/vX0AJe+/ve+/vVfvv71W77+9CwDvv73vv73vv70LGu+/vS3vv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzDvv70TcD8l24/vv70+Le+/ve+/vSdxKBrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vUcIHu+/vQtiVADKswbvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQsOVk4gJe+/vTPvv70+LVAgMx7vv70I77+977+9C++/ve+/vQvvv73vv70LQm0BUu+/vQtCJgDvv73vv70L77+977+9C++/vX0AJe+/vdq0CwTvv73vv71eSu+/vSIcIxrvv70t77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsw77+977+9HT8l77+9U++/vT4t77+9HUxxKBrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vUcIHu+/vQtiVADvv71HCO+/ve+/vQtu77+9C2Lvv70A77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9CyxhbkU/JUtMDD8t77+9UCIY77+977+977+9C++/ve+/vQvvv73vv70LQm0BUu+/vQtCJgDvv73vv70L77+977+9C++/vX0AJe+/vdq0CwDChu+/vQsa77+9N++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMAJ7GT8lH++/ve+/vT0t77+977+977+9Ou+/vS5SHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAHu+/vQtSHQAe77+9C1IdABLvv70L77+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv71SAQLvv71HCB7vv70LYlQA77+9Rwjvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQIe77+9C++/vS7vv70OLu+/vTA177+9TD8l77+977+9BT4t77+977+977+9Hu+/vQjvv73vv70L77+977+9C9q0CyIu77+9Qm0BUu+/vQtCJgDvv73vv70L77+977+9C++/vX0AJe+/vdq0CwDDhu+/vQsaJULvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9CzAH77+9Pz8l77+977+9Fj8tZ1hpOmgXUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAS77+9C++/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9UgEC77+9Rwge77+9C2JUAO+/vUcI77+977+9C27vv70LYu+/vQDvv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQvvv70u77+9Di7vv70cLG1SPyXvv71xJQ7vv73vv70A77+9Hu+/vQjvv73vv70L77+977+9C++/ve+/vQtCbQFS77+9C0ImAO+/ve+/vQvvv73vv70L77+9fQAl77+92rQLAO+/vRLvv70LTi7vv70ANO+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9Ti7vv70A77+977+9bwEm77+9O++/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9AO+/vTJvAS4u77+9ADXvv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/vW4u77+9AO+/vSV3Ti7vv70ENS0SHnciFXfvv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+977+9Lu+/ve+/vS7vv73vv70u77+9AO+/vR0A77+977+9BHjvv70AIEId77+9AO+/vUElAAAAABIUCjFc77+9PhUmKBTvv70da++/vTfvv70FFhAd77+977+9TEAFCkQS77+9AQoKRWRnZSBSaWdodBIUCgE2ABUBBQAdAQUwJQAA77+9PxoUCu+/vQ5mPxUBDBAdAO+/vX8/BRYAIlIWABQt77+977+9TD4yNkcAAO+/vQExIAAAOAFAAUoWCgEcGEhCFQAA77+9QRFjGAAAEu+/vQEKCQXvv70ITGVm77+977+9AO+/ve+/vQAA77+9Ou+/vQAAVQHvv70cWgBiUQoYCAEZ77+9AC0hCwA1ARwEYAElBggYACABFRDvv71AMicIARIIAAAYISsAAGYFABBoAHIAfQFCGO+/vQEAACBB77+9AQZQQu+/vQEA77+9AQrvv70BDO+/vQEK77+9AgAA77+9QO+/vQcBa++/ve+/vQQBEAjvv703EgoI77+9JxIDAQAFGHgKFhIOY2hhcnQtNS1sZWdlbmQqBAjvv73vv70377+977+9BFwKABARHQAA77+9Pyrvv73vv70AAAIl77+9fu+/vQAkMQjvv703EisI77+9Dwnvv70s77+9AiIICgQKAgsrGAEKEC8YASIKBRQgLhADGAEKIBIYEe+/vTxwYXJhZ3JhcGhTdHlsZV8wCe+/vRxQOVrvv70BCAAQQWVEQEEqCkhlbHZldGljYU5ldWU6IXwEBe+/vU1nEC0B77+9fz8tfChAAVAAWABgAGgAdSEnAH0BBSjvv70BAe+/vQEB77+9AQHvv70BIV8Q77+9AQHvv70BARgM77+9AQHvv70FEizvv70BAO+/vQIA77+9AgHvv70C77+9EQFIAe+/vQIB77+9AgHvv70CAO+/vQIA77+9AgHvv70CGiXvv71SdgBE77+9AgBibAgCGgEuJQAAEEIoAT0BYBhAAUgAUABdAQsgagBwAHgA77+9AQp5PQDvv70FewDvv70F77+9AO+/vQUGAO+/vQUGHO+/vQEA77+9AQHvv70BAe+/vWwP77+9AQDvv70BAe+/vQIB77+9AgHvv70CAO+/vQIA77+9AgDvv70CADEI77+977+9cgE5cgAx77+9cgEk77+977+9fz8l77+977+9fz8tAQXvv71yAe+/vXIBUnYA77+9cgHvv71yAQDvv70ycgEA77+977+977+9AgghEhla77+9AgAx77+977+9AkE977+977+9LmEE77+977+9Au+/ve+/vQJSdgDvv71zAe+/vXMBAO+/ve+/vXMBPXPvv73vv70CUu+/vQDvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zADJGWQQA77+9Uu+/vQXvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zADNGcwFWPgfvv71zAe+/vXMB77+9cwHvv71zAQDvv73vv71zAT1zADTvv71zAe+/vXMB77+9cwHvv71zAe+/vXMBBO+/ve+/vS4jCu+/vT8HADVGcwEAIO+/vVkE77+9WQTvv71ZBO+/vVkESlkEAO+/ve+/vXMBPXMANkZzAVZZBAAJIu+/vQsAA++/ve+/vQvvv73vv70LUnYA77+977+9CMqyCADvv73vv71zAT1zADdGcwHvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CTu+/vQIA77+977+9cwE9cwA4RnMBVu+/vQLvv70/B++/vT8H77+9Pwfvv70/BwDvv73vv71zAT1zADlGcwEEAEJO77+9D++/vXMB77+9cwHvv71zAe+/vXMBAO+/vTLvv70I77+9YhFK77+9C1bvv70CUu+/vRDvv70KCu+/vQoKUnYA77+977+9Be+/ve+/vQUA77+977+977+9Alnvv70AMkrvv70P77+977+9Be+/ve+/vQXvv73vv70F77+977+9BU7vv70FAO+/ve+/vXMBPXNK77+9D++/vXMB77+9cwHvv71zAe+/vXMBTnMBAO+/ve+/vXMBPXNKWQTvv73vv70P77+977+9D++/ve+/vQ/vv73vv70PTu+/vQ8A77+977+9cwE9c0rvv70P77+977+9Au+/ve+/vQLvv73vv70C77+977+9Ak7vv70CAO+/ve+/vXMBPXNK77+9D++/vXMB77+9cwHvv71zAe+/vXMBTnMBAO+/ve+/vXMBPXPvv73vv70P77+977+9D++/ve+/vQ/vv73vv70P77+977+9DwDvv73vv71zAT1z77+977+9D++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ8A77+977+9cwE9c++/ve+/vQ/vv73vv70P77+977+9D++/ve+/vQ/vv73vv70PAO+/ve+/vXMBPXNK77+9D++/ve+/vQXvv73vv70F77+977+9Be+/ve+/vQVO77+9BQDvv73vv71zAT1zSu+/vQ/vv71zAe+/vXMB77+9cwHvv71zAU5zAQDvv73vv73vv70PJu+/vQ9KJApW77+9D++/vWIR77+9YhHvv71iEe+/vWIRAO+/ve+/vXIBOXJKIwpWcgFS77+9EO+/vWIR77+9YhHvv71iEe+/vWIRAO+/ve+/vXIBOXJKIgpWcgHvv73vv70C77+977+9Au+/ve+/vQLvv73vv70CAO+/ve+/vXIBOXLvv70hClLvv70j77+977+9Au+/ve+/vQJSdgDvv71GFO+/vUYUAO+/ve+/vXIBOXJKIApW77+9Au+/vVYE77+9VgTvv71WBO+/vVYEAO+/ve+/vXIBOXJKHwpWcgHvv71WBO+/vVYE77+9VgTvv71WBADvv73vv71yATlySh4KVnIB77+977+9Au+/ve+/vQLvv73vv70C77+977+9AgwQCO+/ve+/vQ7vv70rAO+/vRrvv70rEH4KHxIXHmsoLHJlZmVyZW5jZUxpbiJOKxDvv73vv70EWQp277+9KwDvv73Ksyw4EgAYDyAPEQjvv703EgsI77+9Cu+/vRTvv70XChgSEBHvv70Uc2VyaWVzHu+/vSs077+977+9BO+/vRYKNgogCg4IARIqDysMCg4IAgUQBO+/vUASdCwIEAAaAR40QEAV77+977+9TO+/vSoEbGluZRLvv704AAgaACJ277+9AADvv73vv73vv70AACrvv71TAEZTAAAyFmMsNGJF77+9PiVmHO+/vT4tZAXvv70+GmcrADpqHAAAQmocAABKahwAAFJqHAAAWmocAABiahwAAGpqHAAAcmocAAB6ahwABO+/vQFqHQAA77+9bh0ARO+/vQEB77+9ARDvv70BBO+/vQEF77+9AQDvv70BAiIELjjvv70BA++/vQEO77+9AQbvv70BCO+/vQEvEu+/vS1S77+9BRAVAAACQxI7LwQgCg7vv70rFD8wATgA77+977+9MgAEAAAdMgTvv70C77+9ZAAyMgAA77+977+9MgAMQEAgBRXvv70A77+9ejIABO+/vUIF77+9FCAKLe+/ve+/vQwF77+9cO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQIA77+9AgDvv70CAO+/vQJJ77+9NO+/ve+/vRI/Je+/ve+/vRI/Le+/ve+/vRI/Te+/vRAVAABAQC7vv70w77+9KjAA77+9ClReaQE277+9A++/vVQAAO+/vQpUUjcD2owxBO+/vQMJ77+9YlQAMu+/vQABZu+/ve+/vTEA77+9ClTvv71QAS5QAQDvv70KVGLvv70A77+977+9BADvv71+VADvv73vv70AAO+/vQpU77+977+9AS7vv70BAO+/vQpUXu+/vQA277+9Au+/ve+/vQEE77+9A++/vWpSXggA77+9Ch1ScQAA77+9Ch0A77+9Iu+/vSYAdSbvv70mAO+/vQodUlcAAO+/vW4dAO+/ve+/vQMA77+9AwHvv70DAO+/vQMB77+9BADvv70EAO+/vQQA77+9BADvv70EAO+/vQQB77+9BO+/ve+/vX9/77+9BQYA77+9BQYA77+9BQYA77+9BQYE77+9BEnFlnEC77+9IQEA77+9ClRSBAHvv71tAwDvv71+VADvv71xAgDvv70KVO+/ve+/vQAu77+9AADvv70KVGLvv70AyqgABO+/vQUp77+9XlQA77+977+9AgTvv70FDu+/vTQM77+9BRXvv70FCRDvv70FGe+/vQV2fAbvv70YHEAgAS0AAO+/vT7vv73vv70A77+9Cu+/vSxu77+977+9PiXvv71GCD8t77+9NS7vv70FAADvv73vv70A77+977+9BQjvv70FBO+/vQUF77+9BQjvv70FCO+/vQUE77+9BQjvv70FCO+/vQYI77+9BgTvv70GAO+/vQYA77+9BgDvv70IKRNeLAQAAO+/ve+/vQRI77+9CQnvv70JCu+/vQoA77+9CgXvv70KBe+/vQoA77+9Gg8LXnkB77+977+9AQTvv70K77+9PlIEBBzvv70LAO+/vQsA77+9C2Hvv70E77+9Cwnvv73vv719AC59ACzvv70LCO+/vQsA77+9C++/ve+/vRk+Dh44GO+/ve+/vQQBEQjrhpoLGikj77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsw77+9He+/vT4l77+977+9AD8tDGEJHgsJGu+/vQtSHAAa77+9C1IcABrvv70LUhwAAFJJSVIcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0AHu+/vQsAB++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgEC77+9LQge77+9C2JUAMqZBu+/ve+/vQtu77+9C2Lvv70A77+977+9Bh7vv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70C77+977+9Cy7vv70LMO+/vSwmPyVa77+9MD8tP++/vTwe77+9CA47FcqUAe+/ve+/vQvvv73vv70LUu+/vQteeQHvv711AsKaC++/vX0ALn0AVu+/vQsA7IaaCxpQLe+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMO+/vTMnPyV/77+9Kz8t77+9Zy9xDhrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vS0IHu+/vQtiVADKmQbvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQLvv73vv70LLu+/vQswAAJYPyU477+9XT8t77+977+9Yh7vv70I77+977+9C++/ve+/vQvvv73vv70LLu+/vQteeQHvv711AsKaC++/vX0ALn0AVu+/vQsA7YaaCxpTLe+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNO+/ve+/ve+/vT0l77+977+977+9PS0x77+977+9PRo/IBrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IBAu+/vS0IHu+/vQtiVADvv70tCO+/ve+/vQtu77+9C2Lvv70A77+9C2JUAO+/ve+/vQDvv73vv70Lbu+/vQte77+9AO+/ve+/vQjvv73vv70LUnEA77+977+9C++/ve+/vQvvv73vv70L77+977+9C1IEAe+/vW0DHu+/vQtiVADvv71xAu+/ve+/vQtu77+9C++/ve+/vQAu77+9AB7vv70LXlQA77+977+9Au+/ve+/vQsu77+9CzAv77+9PiXvv73vv70+Le+/vdGiHlor77+977+9C++/ve+/vQvvv73vv70LLu+/vQteeQHvv711AsKaC++/vX0ALn0AVu+/vQsA7oaaCxp7N++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LMO+/vWEKPyUp77+9Ez8tS++/vR8e77+9Dhrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcAB7vv70LUh0AHu+/vQtSHQAS77+9CwQa77+9Vu+/vSIAC++/vWgu77+9aC7vv71oLu+/vWgu77+9aC7vv71oLu+/vWguNmguUgEC77+9LQge77+9C2JUAO+/vS0I77+977+9C27vv70LYu+/vQDvv70LYlQA77+977+9AO+/ve+/vQtu77+9C17vv70A77+977+9CO+/ve+/vQtScQDvv73vv70L77+977+9C++/ve+/vQvvv73vv70LUgQB77+9bQMe77+9C2JUAO+/vXEC77+977+9C27vv70L77+977+9AC7vv70AHu+/vQteVADvv73vv70CHu+/vQsAHB5oLgAd77+9aC4wyrM6PyXvv70rQz8tfu+/vVIe77+9CO+/ve+/vQvvv73vv70L2poLABJOaC5eeQHvv711AsKaC++/vX0ALn0AVu+/vQsA74aaCxrvv71B77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQsw77+977+9SD4lEu+/vUg+LUrvv71IHu+/vQ4a77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAa77+9C1IcABrvv70LUhwAGu+/vQtSHAAe77+9C1IdAB7vv70LUh0AEu+/vQsAEFrvv70LAAPvv73vv70L77+977+9C++/ve+/vQvvv73vv70L77+977+9C++/ve+/vQvvv73vv70LNu+/vQtSAQLvv70tCB7vv70LYlQA77+9LQjvv73vv70Lbu+/vQti77+9AO+/vQtiVADvv73vv70A77+977+9C27vv70LXu+/vQDvv73vv70I77+977+9C1JxAO+/ve+/vQvvv73vv70L77+977+9C++/ve+/vQtSBAHvv71tAx7vv70LYlQA77+9cQLvv73vv70Lbu+/vQvvv73vv70ALu+/vQAe77+9C15UAO+/ve+/vQIe77+9C++/vQI6DgI6MGnvv73vv70+Je+/ve+/ve+/vT4tCe+/ve+/vR7vv70I77+977+9C++/ve+/vQvvv73vv70LLu+/vQteeQHvv711AsKaC++/vX0ALn0AVu+/vQsA77+9Eu+/vQsA77+9Gu+/vUUU77+9AgobEhMe77+9RRx2YWx1ZWF4aS7vv71FAO+/vQ52QQTvv70/GjJFEO+/vS45PyUBBQAtAQUa77+9Ie+/ve+/vQMMOBNADxIOcQBtDu+/vTwMegDvv70BFgY7AVpOZADvv73vv707DlBxFO+/vT/vv70BAO+/vQpdXkY877+9GAcE77+9AQ40cgDvv70S77+9cUTvv70CAO+/vQIA77+9AgPvv70CE++/vQIU77+9AgEOdTsIEQjvv71vASZ0O++/vW8Bam8BCBZAF++/vW8B77+9EgEA77+9Eu+/vXI9b++/ve+/vQEu77+9ARTvv70BAe+/vQEANm8BGAHvv70CFu+/vQIYNW8ExJUOekgA77+9Gnl0PO+/vQEK77+9AQomEh5kcmF3aW5nDjVICC0wLR0OEmR0GnJkFAdaYgoAEknvv73vv70nAi4nAhIsRjwiACoAMgA6AFAHWgAQCO+/ve+/vQ7vv71JBO+/vRcWIHVMfwodEhVlcXVhdGlvbi0wLWltYWcy77+9AAgEWlwa77+9Pu+/ve+/vQBh77+977+977+9RGXvv70YGgAiABEI77+9JTcR77+9FO+/vQEKGhISBe+/vVbvv70ABO+/vQHvv73vv70AYu+/vQBy77+9QATvv73vv70OeUcA77+9Gu+/vUAMPzAAOAXvv70A77+9Mu+/vQAA77+9He+/vQAxTkwBDO+/vQEKY3Lvv71H77+9MzUcQhASCUhlYWRBYwBzJe+/vSlf77+977+9AADvv70y77+9AC7vv70BADJO77+9AO+/ve+/vQE277+9AO+/vR0Ccu+/vQAEADQOP0gMQEAgAyInQkFMAO+/vWLvv70AADNy77+9ADDvv70Y77+9PiXvv73vv70+Le+/ve+/ve+/vSpZCABAyrIM77+9fAEEAO+/vQHvv70M77+9PyACIi9JAe+/vQDvv70y77+9AADvv71dTAA0Tu+/vQAA77+9fgoD77+9fAFafAFOCgMABQ5NeAw/EQjvv70y77+9AADvv70d77+9ADVO77+9AAzvv70BCmfvv70PA0YPA1AUEgpGb3JtYWwgU2hhZG93He+/ve+/ve+/vT7vv73vv70BAO+/vWHvv70E77+9Pyp8RCAiABYI77+977+9NxIQ77+977+9NO+/vQEqA++/ve+/vTcK77+9AQoZEhFhcyAtMC1zaGFwZXMONHrvv73vv70MClrvv70B77+977+9BWrvv70FchwDSu+/vQHvv70AEApaHhAAEu+/vXwA77+9Du+/vU4E77+9QO+/vS0OW30g77+9QFIECO+/ve+/vTc2AQUEEjAiPnsAzoJaeFAqA++/ve+/vTcKKgoEQm9keRIcdGV4dC02Jkh7JRQALQEcACAaaAguTXsAMO+/vSlx77+9KXHvv70pcQxwCAQa77+9TXtKTXsoAe+/vQEB77+9AgQI77+977+9NxJRewABIlF7CBYI77+9fnICADHvv71yAu+/ve+/vQpBJAA/77+9cgJicgIIFgjvv71+77+9AAAy77+977+9AMqqD++/ve+/vQB+77+9AADvv71+77+9AAAz77+977+9ADYyC++/ve+/vQwAABgCDu+/vXth77+9CQUW77+9ewEUCQXvv73vv70Afu+/vQAA77+9fu+/vQAANHrvv70AMMefbj8l77+9EAo+Le+/ve+/vT4e77+9L++/ve+/vS7vv71PARLvv71yCu+/ve+/vQB+77+9AADvv71+77+9AAA1eu+/vQA0f++/ve+/vT0l77+977+9MT8t77+9Fe+/vTrvv73vv70O77+977+9AHbvv70ADBAI77+977+9LkQMAHMO77+9Cwxtb3Zp77+9CwUILu+/vQwIAVpT77+977+9C0rvv70LCBAI77+9Xu+/vQAAMe+/vQAJ77+977+9UwIIEQjvv70y77+9CADvv70S77+9CCUBBC0yRu+/vQAIAlrvv71+77+9CTbvv70D77+9Lgt6KQsAVBJrCghAIAYiawoIEAjvv70yOwEAejnvv70AM07vv70AAFrvv73vv70BSu+/vQEkIgUK77+977+977+9PhEI77+9MkIBAO+/vT1CADRG77+9AAgBWmXvv70/Cu+/vT8KCBEI77+9Mu+/vQAA77+9He+/vQA1Tu+/vQAAae+/ve+/vQrvv73vv70KHO+/vSgcPzYI77+977+9Lu+/vQkAzJrvv70JLCgKB0RlZmF1bHQSFyLvv70ALRbvv70JAGQJGRrvv70KKu+/ve+/ve+/vQnvv73vv70J77+977+9Ce+/ve+/vQle77+9CQDvv70y77+9BSDvv70BKgPvv73vv703Cu+/vUUmEgsMThMMCA5afBrvv71PUkkRABLvv73vv70R77+9GgTvv70GHu+/vQswDloqCAAQASIECgIIAVYFDCg4AFIECO+/ve+/vTdYADYBByoJDADWmmcCHCsKBUxhYmVsGgoMBDEwPgsMBR5VagDvv70qV++/vQAUMlfvv70YLU1lZGl1be+/vV7vv73vv71e77+9Tl7vv70AcB5e77+9ADgqXu+/vQAB77+9Xu+/vRJe77+9XhEMAO+/vUJxAgDvv706cQJKEgw6cQIMdxoiPw4tER46F++/vXEC77+9cQJVcQDvv71JcQDvv70y77+9BADvv73vv71xAgg1CgpFUxggRGFyaxIhEu+/vQ4EMTFSdgIFI++/vXsCUu+/vQPvv70xZO+/vTFkUnYACO+/vQIA77+9ewLvv717AgDvv73vv717Akrvv70KWXsw77+9MO+/vT4l77+977+9WT8tfu+/vVseWhPvv717Au+/vXsCNnsCCBYI77+9Qu+/vQA+77+9BUrvv70KGe+/vTBjLm4/Je+/vRsJPi3vv71JUx7vv70M77+977+9AO+/ve+/vQAV77+977+9CBYI77+9Qu+/vQA+QwRK77+9Chnvv70c77+9fj8ldzwu77+9QwQAABrvv70M77+977+9AO+/ve+/vQAV77+9QwgWCO+/vULvv70APu+/vQFK77+9Chnvv70wee+/vX8/Je+/vXLvv70+Le+/ve+/vSHvv70nBe+/vScFQicFJe+/vQg2CO+/vTInBQDNmicFQCkSIXN0aWNreUNvbW1lbnQtQu+/vQdOIu+/vVbvv71kUu+/vQTvv70UBe+/vRQF77+977+9E1Lvv70TDu+/vS7vv70HJu+/vQw2CO+/ve+/vS4cCe+/ve+/vQE977+9Gu+/vUEu77+9CwRQQe+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSQVWiQVbu+/vQEA77+977+977+9AV7vv70BGu+/vTcu77+9AQBg77+977+9Ae+/ve+/vQHvv73vv70B77+977+9AVrvv70BAO+/ve+/ve+/vQFe77+9ARrvv70tLu+/vQEAcO+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQFa77+9AQDvv73vv73vv70BXu+/vQFKVW8A77+977+977+9Ae+/ve+/vQHvv73vv70B77+977+9AVrvv70BAO+/ve+/ve+/vQFe77+9AUrvv71tAO+/ve+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQFa77+9AQDvv73vv73vv70BWu+/vQFOSu+/vQDvv73vv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BWu+/vQEA77+977+977+9AV7vv70BSu+/vQcA77+977+977+9Ae+/ve+/vQHvv73vv70B77+977+9AVrvv70BAO+/ve+/ve+/vQFe77+9AUrvv70EAO+/ve+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQFS77+9AQgWCO+/vTLvv70ONO+/vQEqA8WVNwrvv70BCiISGj7vv70KEjAWLjAbDA5a77+9ASIpFhLvv73vv70A77+9DnUPeu+/vRMOa2Xvv73vv70WKRZyVSIEAO+/vQ5IGgAAFu+/vW0A77+9Eu+/vWcaVSIIDloWDhzvv70aWBYAABJEFgDvv70O77+9ExgVCO+/ve+/vTcSDyI6IwBeFicXMC4KHhIWc3ZnaW1wb3IO77+9DiUCEu+/vRga77+9ExAMWgoKACLvv70WAAzvv73vv70WDBEI0ZYO77+9KQTvv70uFu+/vSgE77+9PQ7vv70aDHRhYmwO77+9FwUILmwBGD9a77+9PQgAEhbvv71kEO+/ve+/vXU/JQEFAC0BBRrvv70QAO+/vRLvv73vv70c77+9Au+/vR0IDxrvv71277+9GwwzM++/vT7GmR5yRRHvv71TAAAabkwY77+9UwAEID/vv73vv70A77+977+9AO+/ve+/vQDvv73vv70AAB/vv73vv70A77+977+9AO+/ve+/vQDvv73vv70AAC/vv73vv70A77+977+9AO+/ve+/vQDvv73vv70A77+977+9A++/ve+/vQPvv73vv70D77+977+9AwAB77+977+9Ae+/ve+/vQHvv73vv70B77+977+9AQAQ77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAC77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAE77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAg77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAI77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAT77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAs77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAD77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAM77+977+9AO+/ve+/vQDvv73vv70A77+977+9ABAw77+9AgHvv70Oe++/vQ5y77+9AO+/vRJ177+9BO+/vQI277+9AO+/vQ7vv73vv70UAe+/vQIB77+9Au+/vUJ9AEDKpy0eQn1SZR7avA4eQEPvv71UAC5UAB5AQ++/vVQALlQAHkJ977+9VAAuVAAe77+9cVZUAAAA0qQBAO+/vRrvv718VlQA77+9YBAeQn3vv71UAC5UAADvv71y77+9AO+/ve+/vQAA77+9clQA77+977+9AADvv73vv71UAEpUAADvv73vv71UAEpUAADvv73vv71UAEpUAADvv73vv71UAEpUAADvv73vv71UAEpUAADvv73vv71UAEpUAADvv71yVAAAADrvv70577+977+9MADvv73vv71UAEpUAADvv70abX5W77+9A9aoAADvv73vv71UAEpUAADvv73vv71UAEpUAADvv716VADvv73vv70GAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/vXJUANaUBQDvv73vv71UAEpUAADvv73vv71UAEpUAB5Z77+9Vu+/vQPvv73vv70AHlnvv73vv71UAC5UAB5XSVZUAAEWLjoZ77+977+9MB5XSQE+Eu+/vTgO77+9NB7vv70q77+9VAAeWe+/ve+/vVQALlQAHldJ77+9VAAuVAAA77+9GhXvv73vv71UAC5UAADvv716VAA277+9NjFiJXpiBQAA77+977+9VABKVAAA77+9elQADgo6Ju+/vUwCAO+/vXpUAO+/ve+/vQAe77+977+9Xu+/vQHvv71UAADvv71677+9AO+/ve+/vQAA77+9elQAzqgAAO+/ve+/vVQASlQAAO+/vXpUAO+/ve+/vQAA77+9flQA77+9RT4A77+9elQA77+9UAEIEQjvv71i77+9HgAxWu+/vR4AARrvv70eEO+/ve+/vXc/JQEFDC3vv73vv71277+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9HjDvv73vv70JPyXvv73vv70EPy3vv73vv73vv70e77+9QNqATB7vv70eEO+/ve+/vRI/JQEFAC0BBRpmLg7vv70U77+9LR8m77+9HkooMO+/vVQAJu+/vR7vv71UABlUHu+/vR4B77+977+977+9ABHvv70e77+9Hu+/ve+/vQEu77+9AR7vv70e77+977+9AC7vv70AHu+/vR7vv71UAC5UAB7vv70e77+977+9AC7vv70AHu+/vR7vv73vv70ALu+/vQAe77+9Hu+/vVQALlQAHu+/vR7vv71UAC5UAB7vv70e77+9VAAuVAAe77+9Hu+/vVQALlQAHu+/vR7vv71UAC5UAB7vv70e77+9VAAuVAAe77+9Hl7vv70C77+9VRUe77+9Hu+/vVQALlQAHu+/vR7vv71UAC5UAB7vv70e77+9VAAuVAAe77+9Hu+/vVQALlQAHu+/vR5eVADvv73vv70e77+9VAAuVAAe77+9Hu+/vVQALlQAHu+/vR7vv71UAC5UAB7vv70e77+9VAAuVAAe77+9Hu+/ve+/vQMu77+9Ax7vv70e77+9VAAuVAAe77+9Hu+/vVQALlQAHu+/vR7vv71UAC5UAB7vv70e77+9VAAuVADvv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70eXu+/vQHOkRse77+9Hu+/vVQALlQA77+977+9Hm7vv70e77+977+9AC7vv70AHu+/vR7vv71UAC5UAO+/ve+/vR5u77+9Hl7vv70F77+977+9ASbvv70eViAK77+9VADvv73vv70edu+/vR5W77+9AM6ECR7vv70e77+977+9AS7vv70BDBEI77+977+9Xu+/vT0AMu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9HgDvv71i77+9HgAz77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70eHu+/vR4AChoA77+977+9A0ggAC0AAO+/vUAyJwgBFQAAAAAYACUBB2IFACwgLxrvv70BClEKGAgBHRUpAC0BCjQ1AADvv70/YAEVMzPvv70+GADvv71YAAAS77+9UwBGUwAAGu+/vVMARlMABCAP77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAB77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAQ77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAC77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAE77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAg77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAI77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAT77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAs77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAD77+977+9AO+/ve+/vQDvv73vv70A77+977+9AAAM77+977+9AO+/ve+/vQDvv73vv70A77+977+9AO+/vTDvv70CAe+/vQIB77+9AgHvv70CAe+/vQIB77+9AgHvv70CCkhlbHZldGljYU5ldWXvv70CAe+/vQIB77+9AgHvv70CAO+/vQIWbgs077+977+9CT8l77+977+9BD8t77+977+977+9Ph4UDA4bDO+/vRQMBO+/vQIJVBDvv73vv70SPyUBBQAtAQUZVAAA77+9VAAE77+9AwlUAe+/vQAlAQUO77+9DO+/vVQAAO+/ve+/vVQASlQAAO+/vQpUAe+/ve+/ve+/vQAR77+9AO+/vQpU77+977+9AS7vv70BAO+/vQpU77+977+9AC7vv70AAO+/ve+/vVQASlQAAO+/vQpU77+977+9AC7vv70AAO+/vQpU77+977+9AC7vv70AAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/vQpUXu+/vQIEAEDvv71ABe+/vVQASlQABO+/vQTvv71A77+977+9AC7vv70AAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/vXpUAABAypAGAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/vQpU77+977+9BS7vv70FAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/ve+/vVQASlQAAO+/vQpUDjYWEmkWMkAWARYu77+9BAACChIFKmIFAADvv73vv71UAEpUAADvv73vv71UAEpUAATvv70F77+9QAHvv70F77+977+977+9AArvv70A77+977+9VABKVAAA77+9ClReSAMA77+977+977+9BADvv73vv71UAEpUAADvv70KVO+/vVABLlABAO+/vQpU77+977+9AC7vv70AAO+/ve+/vVQASlQAAO+/vQpU77+977+9AC7vv70AAO+/vQpUXu+/vQfvv73vv70BAO+/vQpUDm8KTnQK77+9VAAA77+9FVQAAO+/vUgDdUgA77+9FVQA77+9Uu+/vQDOhAkA77+9ClTvv71MAi5MAnQRCO+/ve+/vTcSCwjvv70uEgMBAAUY77+9PQoaEhJ0YWJsZS00LQUITFN0eWxlKgQI77+977+9N1A/Wu+/vT0IARIaEu+/vRsQ77+977+9dz8lAQUMLe+/ve+/vXYe77+9Dijvv70BAe+/vQEB77+9Au+/vR0I77+977+9Gu+/ve+/vRrvv73vv70a77+977+9GgA/77+977+9Ee+/ve+/vRHvv73vv70R77+977+9EQAf77+977+9AO+/ve+/vQDvv73vv70A77+977+9AO+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70eEu+/vR4A77+9Yu+/vR4ANXrvv70eMO+/ve+/vXQ/Je+/ve+/vXk/Le+/ve+/vXjvv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hu+/ve+/vR7vv73vv70e77+977+9Hl7vv70e77+9Ijce77+9PRDvv73vv73vv70+JQEFAC0BBSYGPgDvv73vv71uSh7vv709AUrvv71UABFUfu+/vT3vv73vv70Afu+/vT3vv71UAH7vv70977+9UAF+77+9Pe+/vVQA77+977+9Pc6yPe+/vVABfu+/vT3vv73vv70Afu+/vT3vv71UAH7vv70977+977+9AH7vv70977+9VAB+77+9Pe+/ve+/vQB+77+9Pe+/vVQA77+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3OnAN+77+9Pe+/vVQAfu+/vT3vv71UAH7vv70977+9VAB+77+9Pe+/vVQA77+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv70977+977+9Pe+/ve+/vT3vv73vv7093rI9YiAK77+977+9P++/ve+/vT1u77+9PV7vv70A77+977+9Pe+/ve+/vT0e77+9PSAQCNKWNxIKCO+/vRrvv709ED8KHRIVEu+/vT0oQ2VsbC0wLWJvZHku77+9PSwEWhwKABgBQABKFAoO77+9WQ5CTQBADkE/AEAOQT8MQBAI77+9MlAAEGEKJRIdLlAAQGNhdGVnb3J5TGV2ZWwxUm93Ggw+DARaNgoWCT4Q77+977+9Uz8lAQUALQEFGk8PBBgAZnIAANeqcgAAMk5yABAVHUs/JQEFAC0BBe+/vXIAANiqcgAAM05yABBXSEI/JQEFAC0BBe+/vXIAANmqcgAANE5yABDvv71zOT8lAQUALQEF77+9cgAA2qpyAAA1TnIAENqeMD8lAQUALQEF77+9cgAA77+9MnIAEEQKIhIaLjoCIGZvb3RlclJvd++/ve+/vQIA77+9MlUAQu+/vQIsaGVhZGVyQ29sdW1uNlgAUe+/vRDvv73vv71cPyUBBQAtAQUR77+9agEDAO+/vTJyAABePu+/vQAJckLvv70AEW8wcF0+PyXvv73vv71APy1VLUDvv71vAADvv712bwAQbGFiZWzvv71tA31tANyebwDvv71qA2lqAN2ebwDvv71nA2lnAN6ebwAANE7vv70CYVrvv71kAwDfnm8A77+9YQNpYQDvv70ybwAQZgoqEiIuYQMUcGl2b3RC77+977+9FHVtbWFyeWkWQu+/vQUQ77+977+9dT8lAQUALQEF77+9EQMA77+9MncAEGMKJxIfbncATloBEM+ZZD8lAQUALQEF77+9dAAA77+9MnQAEGgKLBIkQnQAAEgu77+9Awnvv71C77+9AADvv71S77+9Bmrvv70DAO+/vTJ5ADpPBwAx77+9TwcA77+9MlAAOu+/vQQAMe+/vU8HEO+/ve+/vXU/JQEFAC0BBTE7ak8HAO+/vXIAUu+/vQMQH++/vWs/JQEFAC0BBe+/vXIAAO+/vXIAUu+/vQMQ77+9R2E/JQEFAC0BBe+/vXIAAO+/vXIAUu+/vQMQPQpXPyUBBQAtAQXvv71yAADvv73vv71yAFLvv70DEO+/ve+/vUw/JQEFAC0BBe+/vXIAAO+/vTJyADrvv70GADFeTwfRiBDvv73vv71sPyUBBQwt77+977+9ahVvau+/vQIA77+9Mm8AAEc277+9CQAx77+977+977+9UzZpB3pQCgDvv70yWABC77+9AHpPBxLvv71KCO+/ve+/vSIyTldu77+9AADvv712bwB6TwdhY++/vW0DAO+/ve+/vW8A77+9agNpagDvv73vv71vAO+/vWcDaWcA77+977+9bwDvv71kA2lkAO+/ve+/vW8A77+9YQNpYQTvv73vv70uOgo6TwcAMe+/vU8HDu+/vUpC77+9Sm7vv70CAO+/vTJ3ADpPB0Z3AE5PBxBf77+9Zj8lAQUMLVvvv71l77+977+9AwDvv70ydAA6TwcKdO+/vU8HViADalYEAO+/vTJ5ADpPBwAy77+9TwcA77+9MlAAOk8HADLvv71PB05PBwDvv73vv71yAO+/ve+/vQNp77+9AO+/ve+/vXIA77+977+9A2nvv70A77+977+9cgDvv73vv70Dae+/vQDvv73vv71yAO+/ve+/vQNp77+9AO+/vTJyADrvv70GADLvv71PB0JPBwDvv70ybwA6TwcAMu+/ve+/ve+/vU8HAO+/vTJYAELvv70Aek8HHO+/ve+/ve+/vT0l77+977+9Me+/vU8AAB5Za27vv70DAO+/vXZvAO+/vU8HPk8HAO+/ve+/vW8A77+9agNpagDvv73vv71vAO+/vWcDaWcA77+977+9bwDvv71kA2lkAO+/ve+/vW8A77+9YQNpYQDvv70ybwA6TwcAMu+/vU8HYk8HAO+/vTJ3ADpPB0Z3AO+/vU8H77+9TwDvv70ydAA6TwcKdO+/vU8HUk8HAO+/vTJ5ADpPBwAz77+9TwcA77+9MlAAOk8HADPvv71PB05PBwDvv73vv71yAO+/ve+/vQNp77+9AO+/ve+/vXIA77+977+9A2nvv70A77+977+9cgDvv73vv70Dae+/vQDvv73vv71yAO+/ve+/vQNp77+9AO+/vTJyADrvv70GADPvv71PB0JPBwDvv70ybwA6TwcAM++/ve+/ve+/vU8HAO+/vTJYAELvv70Aek8HEnhYDO+/ve+/vRQ+Lmxbbk8HAO+/vXZvAO+/vU8HPk8HAO+/ve+/vW8A77+9agNpagDvv73vv71vAO+/vWcDaWcA77+977+9bwDvv71kA2lkAO+/ve+/vW8A77+9YQNpYQDvv70ybwA6TwcAM++/vU8HYk8HAO+/vTJ3ADpPB0Z3AO+/vU8H77+9TwDvv70ydAA6TwcKdO+/vU8HUk8HAO+/vTJ5ADpPBwA077+9TwcA77+9MlAAOk8HADTvv71PB05PBwDvv73vv71yAO+/ve+/vQNp77+9AO+/ve+/vXIA77+977+9A2nvv70A77+977+9cgDvv73vv70Dae+/vQDCqnIA77+977+9A2nvv70A77+9MnIAOu+/vQYANO+/vU8HQk8HAO+/vTJvADpPBwA077+977+977+9TwcA77+9MlgAQu+/vQB6Twcc77+977+9fT8l77+977+9Le+/ve+/vQ4A77+9dm8A77+9Twc+TwcAxJ5vAO+/vWoDaWoAxZ5vAO+/vWcDaWcAxp5vAO+/vWQDaWQAx55vAO+/vWEDaWEA77+9Mm8AOk8HADTvv71PB2JPBwDvv70ydwA6TwdGdwDvv71PB++/vU8A77+9MnQAOk8HCnTvv71PB1JPBwDvv70yeQA6TwcANe+/vU8HAO+/vTJQADpPBwA177+9TwdOTwcA2apyAO+/ve+/vQNp77+9ANqqcgDvv73vv70Dae+/vQDbqnIA77+977+9A2nvv70A3KpyAO+/ve+/vQNp77+9AO+/vTJyADrvv70kADVeTwd677+9HADvv70yVQA6NQcANe+/ve+/ve+/vTUHAO+/vTJYAELvv70AWjUHeu+/vQAA77+9MlUAOu+/vQcANe+/vRsHQhsHAN6ebwDvv702A2k2AN+ebwDvv70zA2kzAO+/ve+/vW8A77+9MANpMADvv71vAO+/vS0DaS0A77+9Mm8AOhsHADXvv70bB1InSW4MEQDvv70ydwA6GwdGdwBOGwcwVO+/vWM/JWZ6aD8tYu+/vWfvv70IHQDvv70ydAA6GwcKdO+/vRsHShsHJDYI77+977+9NxIwCO+/vQ8WWGks77+9AiIICgQKAgsrGAEKEC8YASIKBRQ0LhADGAEqA++/ve+/vTcKJhIeIu+/vSQUVGV4dC0wVu+/vQM4OVrvv70BCAAQAB0AACBBKhIyTHkULUJvbGQ6Ylbvv70oQAFQAFgAYABoAHUObCEAfQEFDO+/vQEB77+9Eu+/vWkE77+9AQ7vv70SEO+/vQEB77+9AQEYDO+/vQEB77+9BRIY77+9AQDvv70CAO+/vQ7vv715AO+/vREBDu+/vXk077+9AgHvv70CAO+/vQIA77+9AgHvv70CFg8sATlC77+9bkTvv70CAGJwCAQaAS4lAAAQQigBPQEnGEABSABQAF0BCyRqAHAAeADvv70BCgoBDhLvv71vAO+/vQV7AO+/vQXvv70A77+9BQYA77+9BQYc77+9AQDvv70BAe+/vQEB77+9PA/vv70BAO+/vQEB77+9AgQI77+977+9N++/vQIWR3okAO+/vQIA77+9AgA2CO+/ve+/ve+/vQFG77+9Ae+/ve+/ve+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BAO+/ve+/ve+/vQFG77+9Ae+/ve+/ve+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BAO+/ve+/ve+/vQFG77+9Ae+/ve+/ve+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BAO+/ve+/ve+/vQFG77+9ASoVCO+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BAO+/vTLvv70BAO+/vd6eBwAxXu+/vQcA77+977+977+9ABQ277+9BxRNZWRpdW3vv73vv70H77+977+9B3Lvv70HADjvv73vv70AAe+/ve+/vQdy77+9BwDvv73vv73vv70BRu+/vQEy77+9B++/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BAO+/ve+/ve+/vQFG77+9ATLvv70H77+977+9Ae+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQEA77+977+977+9AUbvv70BMu+/vQfvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70B77+977+9AQDvv73vv73vv70BRu+/vQEy77+9B++/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQHvv73vv70BBO+/ve+/vS5GD++/vQcAMu+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfvv73vv70HAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9AUbvv70B77+977+9B++/ve+/vQfvv73vv70H77+977+9B9KoBwDvv73vv73vv70BRu+/vQHvv73vv70H77+977+9B++/ve+/vQfvv73vv70H0qgHAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9ASnvv70AM++/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfvv73vv70HAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9AUbvv70B77+977+9B++/ve+/vQfvv73vv70H77+977+9B9KoBwDvv73vv73vv70BRu+/vQHvv73vv70H77+977+9B++/ve+/vQfvv73vv70H0qgHAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9ASnvv70ANO+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfvv73vv70HAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9AUbvv70B77+977+9B++/ve+/vQfvv73vv70H77+977+9B9KoBwDvv73vv73vv70BRu+/vQHvv73vv70H77+977+9B++/ve+/vQfvv73vv70H0qgHAO+/ve+/ve+/vQFG77+9Ae+/ve+/vQfvv73vv70H77+977+9B++/ve+/vQfSqAcA77+977+977+9ASnvv71a77+9KQA577+977+9GBDvv73vv71IPiUBBQAtAQUa77+9SO+/vUAm77+9QCYBbEJ2ADJAJu+/ve+/vR7vv73vv70eAO+/ve+/ve+/vQFG77+9AcqoB1ISAe+/ve+/vQHvv73vv70B77+977+9Ae+/ve+/vQEA77+977+977+9AUbvv70ByqgH77+977+9Ae+/ve+/vQHvv73vv70B77+9ASnvv70A77+977+977+9AUbvv70ByqgH77+977+9Ae+/ve+/vQHvv73vv70B77+9ASnvv70A77+977+977+9AUbvv70ByqgH77+977+9Ae+/ve+/vQHvv73vv70B77+977+9AQwRCO+/vQ4+77+9AO+/vRrvv70tHO+/vQEKdwoeEhYS77+9LShOYW1lLTAtc2hhcDJE77+9CANaU3Lvv73vv70O77+9Lca177+9GFADWhgQATJS77+9WQg2CO+/vTLvv70gANCa77+9JgwsCgpUDgrvv70cIFRpdGxlIDEaaFoK77+9DHRleHQuGFAIOVrvv70e77+9JghAQSo236fvv73vv70m77+977+9Jlbvv70mAALvv70uBO+/vUDvv73vv70uCBEI77+9Eu+/vXpmLgIAMe+/vS4C77+9LgJJLgDvv73vv70uAkIuAgAx77+9LgLvv70uAu+/vS4C77+9LgLvv70uAgDvv716LgIAMu+/vS4C77+9LgJJLgDvv70y77+9Bu+/vVwE77+9XAAy77+9LgLvv70uAu+/vS4C77+9LgLvv70uAgDvv716LgIAM++/vS4C77+9LgJJLgDvv73vv70uAkIuAgAz77+9LgLvv70uAu+/vS4C77+9LgLvv70uAgDvv716LgIANO+/vS4C77+9LgJJLgDvv73vv70uAkIuAgA077+9LgLvv70uAu+/vS4C77+9LgLvv70uAgDvv716LgIANe+/vS4C77+9LgJJLgDvv73vv70uAkIuAgA177+9LgLvv70uAu+/vS4C77+9LgLvv70uAgw2CO+/ve+/vS7vv70rANOabQwIKgoFEmcMBBIbDlkMMC0wLXBhcmFncmFwaHMO77+977+9AC0FHRrvv71fEu+/vTQAARLvv706AO+/ve+/ve+/vTpa77+9OgwK77+9I++/ve+/ve+/vTrvv73vv706AAHvv73vv706BEBB77+9cAwEAO+/vR7vv706DBEI77+977+9Du+/vQ4A77+9Gu+/vQ4077+9AgonCgZCdWxsZXQSFyVmFDEtbGlzdClhCRktYggFWAI+AgAAZQ7vv70O77+9BQAAbQ7vv707IG0AADBBbQAA77+9AQUEBEIBDwEFAFwBBQDvv70BBQDvv70BBQzvv71CcgwO77+9aAA/Eu+/vTsEGAHvv70OAO+/vQ4AFO+/vQED4oCi77+9BgAINgjvv70y77+9AgDUmu+/vQIYMAoIU3VidA5RDwQSHi3vv70677+9AhEgLe+/vSpYDwDvv73vv71YD++/vVgP77+9WA/vv73vv70977+977+9PVnvv70INgjvv70y77+9AQDkmosBADse77+9EBLvv70QDCAxEiQp77+9ADM+77+9ARYFEQomNe+/vQTvv70B77+977+977+977+9P++/ve+/vT/vv73vv70/77+977+9P3Lvv70/AO+/vTLvv70BAO+/vdabAQAyMe+/vQA0bu+/vQEAMjXvv70i77+9EgAg77+9MQPvv70xA++/vTED77+9MQNaMQMA77+9Mu+/vQHvv70xAwAzMe+/vQA1bu+/vQEAMzXvv73vv70xAwgH77+9fxow77+9CAHvv71/Hu+/vUPvv73vv70a77+977+9GlJ2ADJyHDbvv71C77+977+9BwAAxrJCAO+/vTLvv70BAO+/ve+/vTEDADQx77+9ADZu77+9AQA0Ne+/ve+/ve+/vTbvv73vv70277+977+9Nu+/ve+/vTbvv73vv702AO+/ve+/ve+/vQEh77+9ADUx77+9ADdu77+9AQA177+977+9Ae+/ve+/vQHvv73vv70B77+977+9AcKdAQDvv73vv73vv70BIe+/vQA2Me+/vQA4bu+/vQEANu+/ve+/vQHvv70pG++/vSkb77+9KRvvv70pGwg2CO+/vTLvv70B77+9CAgANzHvv70AOW7vv70BADc177+9AO+/vSrvv70JSu+/vRrvv73vv70B77+977+9AV7vv70BNm0G77+9H0lmH0kYHAjvv73vv703EhYiIQ4Q77+9AjIJDxEBKAolCgVJbWFnZRIWEhcLADIqKw4FGC1mCAVYAT4CAO+/vSUOBSjvv70qDgzvv71w77+9PiYqDu+/vQ4A77+9DgAY77+9AQQaAggP77+9BwAINgjvv70yBQPvv70zDgAHDu+/vUwQaW5nEh8t77+9OjIOCh8AICbvv70MVe+/vQDvv73vv70CC++/vQIL77+9Agvvv70CCwACahlMAO+/vTLvv70BAN6aZwksNAoHQ2FwdGlvbhIjKe+/vQAxPu+/vQEKIAAgDu+/vU1tIwg5Wu+/vSoaHwATNg9GEExpZ2h077+9IB/vv70gH++/vSAfTiAf77+977+9CgDvv70y77+9AQDsmpUBCD8KD2EBFGVyICYgRhJzeAQSJinvv70AMj7vv70BOigANe+/vSIxDu+/ve+/vSDvv73vv70g77+977+9IAB577+9YhEiYhEkCQoHCgAA77+9QxAC77+9UU8IEQjvv70yUxQ877+9AgorCghMZXR0ZXJlZBIZJXcAM++/vSoRGy1qCAZYAz4CABBlXXTvv70/77+9BQDvv70tAO+/vQ5SFAAQDj4UAFgBBQDvv70BBQDvv70BBQDvv70BBQDvv70BBQQQQ++/vUkU77+9SRQ2cAAEeAk+AgAI77+9AQBeAwAIEQjvv71KWAEMTnVtYj1YADQ9WBEb77+9WAHvv71YAe+/vVgB77+9WAEAAD4CAF5VARTvv70BADYI77+9MlMEANqaUwQINgoL77+9KyBpbmcgUmVkEiFF77+9Qn0SHSMt77+9Eu+/vRUW77+9GADvv71SeQc0x59uPyXvv70QCj4t77+977+9Pj3vv71SLe+/vVItUnYAau+/vRBGcwoYQO+/vRUAAEDvv73vv73vv71TPnkHJu+/vRUYFgjvv73vv703EhAiBCU077+9ASoD77+977+9Nwrvv70BChwSFCFnCGJveB42JxLvv70YLVoQDlrvv70BCnbvv73vv70O77+9GO+/vTknEu+/vWcEIi8S0r4AAFYC77+9JO+/ve+/vUMdAADvv71AIAES77+977+9NDAAOAAqADIAOgBQDloqDu+/vVUQIgQKAghafSc0OABSBAjvv73vv703WAAQCO+/ve+/vQ7vv710BO+/vU4WFFYAIA4rKCBkcm9wLWNhcC0F77+9GC1kZWZhdWwaOQgMEAjvv73vv70uMQAQUQoXEg8BMRkwADAtHzABWgBiMgowCAAQAxgAAe+/vQhQAVkB77+9AQEAYQEFAQEIae+/ve+/vQEBCO+/vT9xCQkg77+9PzEI77+977+9NxIrFe+/vQDvv70e77+9VmLvv71WRu+/vQAedQoIC1phQe+/vQAq77+977+9Vhjvv70BAe+/vQEB77+9EhrQjkNWCe+/vQgCGAHvv73vv70AAO+/ve+/ve+/vQAF77+9HlsW77+977+9AO+/ve+/vQAUBBgAMAE477+977+9AQDvv73vv73vv70ABe+/vR7vv70V77+977+9AO+/ve+/vQAAA++/ve+/vQEA77+977+977+9AAXvv70e77+9FO+/ve+/vQDvv73vv70ABO+/vT9y77+9AwDvv70y77+9AADvv73vv73vv70GRu+/vQMeORQIClpj77+977+9an9SAAVObRda77+9A1IsAO+/vUME77+9Ae+/vXcAAe+/vXcEck/vv73vv73vv70FACpqfFoMEAjvv73vv73vv71IBO+/vV7vv715IDwKGhISc2hlZQ5nIAUIEu+/vRvvv71LDBABGhwa2IYB77+9DiTvv70O77+9ZgDvv70e77+9GAgQCO+/vQVNAO+/vRpWHzAYChAKCEVtcGhhc2lzCUMgUAFaAggBEAjvv70yKQAoFgoOCgZJdGFsaWMZJxAQARAI77+9MicARB0KFQoKU3RyaWtldGhyb3VnaBkuEGABHAjvv70S77+9ERF+AEkuQ1wYCgwKBEdyZR4U77+9CAFaNxJYDlLSiB7vv71bUh0ACBAI77+9Mu+/vQAwGQoRCglVbmRlcmxpbi0oAe+/vSBYARUI1543Eg8i77+977+9JBYqA9KWNwoOGgQO77+977+9BCABGe+/vRAYABUI77+9PiwAAO+/vQosBNWWQiwAAO+/vT4sAADvv70KLADvv71GLAAA77+9PiwAAO+/vQosAO+/vT4sAFBLAwQUAAAAAABtf++/vVoGaUfvv70XAAAAFwAAACgAAABJbmRleC9Bbm5vdGF0aW9uQXV0aG9yU3RvcmFnZS05MDUwODcuaXdhABMAABFAEAjvv73vv703EgoI77+9ARIDAQAFGABQSwMEFAAAAAAAbX/vv71adRcfAU0AAABNAAAAGgAAAEluZGV4L0RvY3VtZW50TWV0YWRhdGEuaXdhAEkAAEbvv71FGQhHEhUI77+9VhIDAQAFGCwiCQoDCgEDEAMYAQgAGigKJgoU77+9CVQSNO+/ve+/vTYnJUxI77+9Me+/vURqPg4QARnvv73vv73vv71j77+977+977+9QSIDCgIDUEsDBBQAAAAAAAfvv73vv71aNO+/ve+/vR1PQgAAT0IAABIAAABJbmRleC9NZXRhZGF0YS5pd2EAS0IA77+977+9Ae+/ve+/vSAIAhIcCO+/vVUSAwEABRjTsAEiCQoDCgEKEAEYASoD77+9Nwjvv703EigSJEM1QzYzMkEyLTMwQzgtNDlGNC1BM0RELUUzMTdDNTY0QzQ2RRgAGiYIRxIQRG9jdW1lbnRNZXRhZGF0YSIDAgAAKgMCAABQAGDvv70E77+9AQEaNAjvv73vv703EgtUYWJsZXMvVGlsZRoSVGFibGVzL1RpbGUtOTA1MDIzIgMCAAAqAwIAAFAAYO+/vQQaPAjvv73vv703Eg9UYWJsZXMvRGF0YUxpc3QaFlRhYmxlcy9EYXRhTGlzdC05MDUwODIiAwIAACoDAgAAUABg77+9BBpSCO+/ve+/vTcSGlRhYgF0UEhlYWRlclN0b3JhZ2VCdWNrZXQaIQrvv71KHAAcLTkwNTExMyIu77+9ACTvv70EGlII77+977+9NxIaZjgA77+9VAAAND5UAAg8CO+/ve+/ve+/vQAAMko+AADvv73vv70+AAA4Nu+/vQAU77+9BBo8CO+/ve+/vT4ABDI1Mu+/vQAFPgDvv73vv70+AAA4Nu+/vQAFPgDvv73vv70+AEJ8ACDvv71uCO+/ve+/vTcSEkRNfSRTdHlsZXNoZWV0Ge+/ve+/vToKCA8SBgjvv73vv703EAlQAFocCO+/ve+/vTcSFgjvv73rhLvvv73GoO+/ve+/vQEQ77+95auDxLrlo5sBWhwI77+977+9AR7YgO+/vdSl77+977+94aKFARDvv73vv73Lku+/vdiFx64BWhsI77+977+9NxIVCO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+977+9xbDvv70nWhwI77+977+9ATtM77+9wrnvv73vv73bke+/ve+/vQEQ77+977+92Y7vv73vv73vv73vv70BOwDvv70FO1zvv73vv73vv73vv73vv73vv73uo4UBEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVZaHAjvv70F77+9TO+/ve+/ve+/ve+/vcSDyaHvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQHvv70E77+977+9AVnQl++/vd23z6Hvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQFaGgjvv73vv703EhQI4Z+h77+977+977+977+977+9IxDvv73vv73vv73vv73JhO+/vX5aGgjvv70FHFjvv73Qhe+/vcilbhDvv73vv73vv73vv73Eku+/ve+/vWlaGgjvv70FHFjvv73vv73vv73vv73vv73bo00Q77+977+977+91KXvv73Uug5aGgjvv70FHFjvv73au++/ve+/ve+/ve+/vWcQ77+977+977+92azvv73vv73vv70WWhoI77+9BRxY77+977+92Zbvv73Vge+/vS0Q77+977+977+977+91Ibvv71FWhsI77+9Be+/vVzvv73vv73YiO+/vcut77+9ZhDvv73vv73vv73vv73vv73vv73vv70BWhsI77+9CR1Y77+977+977+977+966CqARDvv73dr++/vdWT77+977+9X1ocCO+/vSUCTO+/vdOk77+92brXo++/vQEQ77+977+967St6rG477+9ATsA77+9BTtg77+977+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73vv70MWhoI77+977+9IQFY77+9zpDvv73vv73Wke+/vXQQ77+977+977+977+977+977+977+9JFocCO+/vQVXTO+/ve+/ve+/ve+/vcS477+977+977+9ARDvv73nhpbvv73vv73vv73vv73vv70hWQDvv70FHkzvv73vv73vv73vv73vv73vv73dpe+/vQEQ77+977+977+95bqI2b/vv70BdQDvv70FdUjvv73vv73vv73vv73vv73vv73vv73vv706EO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSF2AO+/vQV1WO+/ve+/ve6vq++/ve+/ve+/vXAQ77+977+977+977+977+977+977+977+9ZlocCO+/vQVXTNuT77+977+977+934bvv73vv70BEO+/ve+/ve+/ve+/vd+H77+977+977+9AToA77+9BTpY77+9yZvvv73vv73vv73vv73vv70+EO+/ve+/ve+/ve+/ve+/ve+/ve+/vTFaGwjvv70Fc1zvv73vv73vv73Nlu+/ve+/vQEQ77+977+977+977+977+977+977+977+9PVocCO+/vQVXTO+/ve+/ve+/ve+/ve+/vdqy77+977+9ARDvv73vv73RmO+/ve+/ve+/ve+/ve+/vQHvv70A77+9BTtI77+935/vv73vv73vv73vv73vv71jEO+/vduD3YHvv73vv73vv73vv70BHQDvv70FHUjvv73vv73vv73vv73vv73vv73Ro0cQ77+977+926nvv73moYrvv70BHQDvv70FHUjRq++/ve+/ve+/vc6n77+9VhDvv73vv73vv73TkO+/ve+/ve+/ve+/vSEjAO+/vQV1TO+/ve+/vc66zafvv73vv73vv70BEO+/ve+/ve+/veiPku+/ve+/ve+/vQE7AO+/vQU7YO+/ve+/vc6p77+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv71PWhoI77+9Ie+/vVzvv73vv73vv73Ps8Ww77+9FRDvv73vv73Igu+/ve+/ve+/ve+/vXBaHAjvv71B77+9TO+/ve+/vc+K4oqk77+9ARDvv73vv73vv73vv73Thu+/ve+/ve+/vQF1AO+/vQUeTO+/vemAvdOC4aa2ARDvv73vv73vv73WqO+/ve+/ve+/vQF1BM6XYe+/vVzCnO+/veicou+/ve+/ve+/vQEQ77+91brCh++/vceKbVocCO+/vQU7TNqWyo7vv73vv73Dpe+/vQEQ77+977+977+977+96oKH77+977+9AVkA77+9BR5M77+977+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70BHgDvv70FHkzvv73vv73vv73vv73vv73vv73Gp++/vQEQ77+9yZ7vv73vv73vv73hr7MBdwDvv70Fd2Dvv73Jt++/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+9zLrvv71GWhwI77+977+9Ae+/vUzvv73vv73vv73klZrvv73vv70BEO+/ve+/ve+/ve+/vd6Q77+977+977+9AVkA77+9BVlM77+977+977+977+977+977+91qHvv70BEO+/ve+/ve+/ve+/ve+/vcmr77+977+9AVkE77+9Ae+/vVzvv73vv73vv73vv73vv73pi6Tvv70BEO+/ve+/ve+/vc+wy5Lvv71NWhsI77+9BR1I77+977+977+977+977+977+93aTvv70BEO+/ve+/ve+/ve+/ve+/vee9iGHvv70A77+9KWJU77+977+9xZzvv73vv73vv708EO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vTRaGwjvv70F77+9XO+/ve+/vdiJ77+977+977+977+977+9ARDvv73HoO+/ve+/ve+/ve+/vVxaGwjvv70FHUjvv73vv73vv73vv73vv73vv71gEO+/ve+/ve+/ve+/ve+/ve+/vQHvv70A77+9BR1c77+95pmh77+977+91KLvv70BEO+/ve+/ve+/vcWT3rjvv702WhsI77+9BR1c77+977+977+91rvvv73Qo++/vQEQ77+977+944Wh77+977+977+9CVobCO+/vQUdXO+/ve+/ve+/ve+/veSype+/vQEQ77+917XSiu+/vdWoM1obCO+/vQUdSO+/ve+/ve+/ve+/veCtuO+/vSIQ77+917Tvv73toJntsa3vv70BdADvv70FHUjvv73vv73Wue+/veGOpgkQ77+977+977+977+977+977+92ZDvv70hPwDvv70lP0zvv73vv73Rp++/vcqn77+9ARDvv73vv73dve+/vdCAy4MBHgDvv70FHhjvv73vv73vv73Xo++/ve+/vSHvv70g77+9za7Hnu+/ve+/ve+/vQFZAO+/vQVZXO+/ve+/ve+/ve+/ve+/veSgoAEQ77+977+977+9zpHvv73vv73vv71qWhsI77+9BR1c77+977+977+977+92onvv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/vciRNVoaCO+/vSVdWO+/ve+/ve+/ve+/ve+/ve+/vSAQ77+977+914Pvv73vv73vv73vv701WhwI77+9BXRM77+977+977+977+977+977+95qG/ARDvv73vv73Qt++/ve+/ve+/ve+/vQF0AO+/vQVXXO+/ve+/ve+/ve+/vciO77+977+977+9ARDvv73vv73vv73dnO+/ve+/ve+/vUhaHAjvv70FO0zvv73vv73vv73vv73vv73Pp++/ve+/vQEQ77+927/vv73vv73vv73lrbAB77+9AO+/vQUeTOK/pO+/ve+/ve+/ve+/ve+/vQEQ77+977+915vvv73vv73vv73vv73vv73vv707AO+/vQXvv71Y77+977+934jomKXvv700EO+/ve+/vduSyp3PrB1aGwjvv70FdVzvv73vv73vv73Jpe+/vdqj77+9ARDvv73vv73vv73vv73Xgu+/ve+/vU9aGwjvv70FHUjvv73vv73hi6Hvv73vv73vv70CEO+/ve+/ve+/vdix77+977+977+977+9AVYE77+977+9Ye+/vUTvv73ok4Tvv73vv73vv73vv70MEO+/ve+/ve+/ve+/vca177+977+9QX8A77+9RX9I77+977+977+977+977+977+93qd8EO+/vc+Q5IGL77+977+977+9Ae+/vQDvv70FHUjvv73vv73Mte+/ve+/ve+/ve+/vVEQ77+977+9147vv73vv73vv73vv73vv70BHQDvv70FHRjvv73vv73vv73vv73vv73vv73vv70OMO+/ve+/ve+/vcmw77+977+9CFobCO+/vQUdRO+/vd2S77+977+977+977+977+9VxDvv73vv73vv73vv73vv73vv73Fhe+/vQDvv70FHUjbv++/ve+/veqOku+/vX0Q77+925Xpubzvv73vv73vv70BVwDvv70FHUzvv73vv73JjO+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+936Lvv70RQe+/vQUdSO+/veq9h8Ww77+977+9chDvv73vv73vv73vv73vv73vv73vv73vv70BOgDvv70FHUjvv73vv73vvqbvv73vv73vv71FEO+/vcWhw6vvv73vv73vv73vv70hBADvv70lBFjmk43vv73QtO+/vQcQ77+977+977+977+977+977+92IlGWhsI77+9JT1I77+977+977+977+977+9x6B3EO+/ve+/ve+/ve+/vdu816Pvv70BVgDvv70FHUjvv73vv73vv73vv73vv73vv73vv73vv70+EO+/ve+/ve+/vdaG77+93ITvv70BVgDvv70l77+9WO+/vcma77+9wpbvv73vv70jEO+/vdmz77+977+977+977+9I1oaCO+/vQUcWO+/ve+/ve+/ve+/vdWndhDvv73vv73vv73vv73vv73Gpu+/vXFaGgjvv70FHFjvv73vv73vv73vv73vv73ake+/vR0Q77+977+977+93rPvv73vv73vv70yWhsI77+9BXFc77+977+977+977+977+977+977+977+9ARDvv73TjO+/ve+/ve+/ve+/ve+/vTpaGgjvv70FOVjvv73vv73bpO+/ve+/ve+/ve+/vT4Q77+977+9ypPvv73kp4R5WhsI77+9BTlI77+977+977+9z6rvv73vv70jEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQHvv70A77+9BTlY77+92bDqp4bvv73vv70pEO+/vceQ77+977+977+977+977+9B1obCO+/vQU5SO+/ve+/ve+/ve+/ve+/ve+/vc2hDxDvv73vv73vv73vv73vv73vv70hAADvv70FHVzvv73vv73vv73vv73Oo++/ve+/ve+/vQEQ77+977+905jvv73vv73vv73vv71rWhsI77+9BR1c77+977+977+977+977+9z6bvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVNaGwjvv70FHUjvv73vv73vv73vv73fpu+/vQEQ77+977+977+977+977+977+93rIB77+9AO+/vQUdHNSj77+977+977+977+9zKXvv73vv70s77+977+977+977+977+977+977+9SVoaCO+/vQXvv71Y77+977+90Lnvv73vv73vv73vv713EO+/ve+/ve+/ve+/veuike+/vQpaGwjvv70FOVzvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/vc6Z77+9U1ocCO+/vWVeTO+/ve+/ve+/ve+/vdWM77+977+9ARDvv73vv73bm++/ve+/vcO/YXwA77+9BR5M77+977+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73CoyEiAO+/vQV1WO+/ve+/ve+/ve+/vdep77+9eRDvv73vv73vv73vv73vv73vv73vv73vv704WhsI77+9BXVc77+96ZSp3q/vv73vv73vv70BEO+/veWrne+/ve+/ve+/ve+/vQ9aGwjvv70FHVzvv73vv73vv73vv73Yol4Q77+977+977+977+977+977+977+977+977+9AVoaCO+/vQVWWO+/ve+/ve+/ve+/veG5pW0Q77+977+977+977+977+977+977+977+9bVobCO+/vQU5XO+/ve+/ve+/ve+/ve+/vcOn77+9ARDvv73vv73Nv++/ve+/vdWXfVoaCO+/vQU5WMSZ77+977+977+91q/vv70aEO+/ve+/ve+/vd6g77+977+977+9Y1obCO+/vQU5SO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vR8Q77+935Dvv73vv73vv73vv73vv73vv70h77+9AO+/vQUdXO+/ve+/ve+/vdWQ77+977+977+977+9ARDvv73vv73qoZ7vv73vv73vv719WhsI77+9BR1E77+977+977+977+977+977+977+9RRDvv73jn4Pvv73vv73vv70F77+9AO+/vQVzWO+/veiau++/ve+/ve+/vUQQ77+977+9zbvfr++/vQJaGwjvv70FOUjvv73vv73vv73vv73vv73kuKYfEO+/ve+/ve+/ve+/vcyg77+9xL0BcwDvv70FHVzMiO+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+9y4vvv73vv73vv73vv71EWhoI77+9BVZY77+924bvv73vv73ouqA5EO+/ve+/vdaK77+977+9xIh3WhsI77+9BTlc77+977+977+977+977+92abvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vUBaHAjvv70l77+9SO+/ve+/ve+/ve+/vcuo77+977+977+9ARDvv73vv73vv73SktSG77+9Be+/vQDvv70FO0jvv73vv73vv73Svu+/vd2iGhDvv73hj4vvv73vv73vv73vv73vv70B77+9AO+/vQUdSO+/ve+/ve+/ve+/ve61pO+/vUMQ77+977+95aGj7Z+n77+9QQcA77+9BVhM7aSS7b6U77+977+91aPvv70BEO+/ve+/ve+/ve+/ve+/ve+/vdiE77+9AR4A77+9BR5IwoPvv73vv73vv73vv73vv73vv70BEO+/vdeU77+977+977+9EhAJAO+/vQVZGO+/ve+/ve+/vc+R77+977+977+977+9MO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vUZaGgjvv70F77+9WO+/ve+/ve+/vd+j77+977+977+9GRDvv73vv73vv73hgJnamExaGgjvv70FHFjvv73vv73Xse+/ve+/ve+/ve+/vQUQ77+977+977+925nvv73vv73vv71wWhsI77+9BVVc77+977+977+91LDvv73vv73vv73vv70BEO+/ve+/vdaK77+977+977+977+9O1oaCO+/vQU5WO+/vd+06a2U77+977+9FRDvv73Jmu+/ve+/ve+/ve+/ve+/vRNaGgjvv70FHFjZh++/ve+/vd2l77+9WRDvv73vv73vv73vv73vv73vv73vv73vv71kWhsI77+9BVVc77+977+977+935rvv73Oo++/vQEQ77+977+977+977+977+926Hvv71xWhwI77+9Be+/vUzvv73pr4Tvv73Ftu+/ve+/vQEQ77+977+977+977+977+977+977+9xpshPgDvv70FO1zvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/vey+pu+/vWJaGwjvv70FHUjvv73vv73vv73vv73vv73Tj++/vW4Q77+977+9xrHZpu+/ve+/vQE6AO+/vQUdXO+/ve+/ve+/vda777+946eCARDvv73vv73vv73vv73vv73vv73vv73vv70UWhwI77+9BXVM77+977+977+935rvv73vv73vv70BEO+/ve+/vdqJ77+977+977+977+977+9ATsA77+9BTtI77+90I/vv73vv73vv73VoO+/vQEQ77+977+95LSC77+92Z5hRgDvv70F77+9WO+/ve+/ve+/ve+/ve+/vcmE77+9fhDvv73vv73vv73vv73vv73vv73vv71bWhwI77+9BVdM77+947Sb77+977+9w6Tvv70BEO+/ve+/ve+/veKqpO+/ve+/ve+/vQFXAO+/vQVXSO+/ve+/ve+/ve+/ve+/vcKs77+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70O77+9CgDvv70FO0zOge+/veC0q++/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+9QQoA77+9BR5M77+977+977+977+977+977+926Tvv70BEO+/ve+/ve+/vee0p++/ve+/ve+/vQHvv70A77+9Be+/vVjvv73vv73vv73IvO+/ve+/vT0Q77+9x4PJsO+/ve+/ve+/vTZaHAjvv70FOkzvv73vv73vv73vv73vv73vv73Moe+/vQEQ77+927Tvv73vv73YnO+/ve+/vQHvv70A77+9Be+/vUjvv73vv73vv73nhqjWoy4Q77+9y7Pvv73vv73vv73vv70BdQDvv70FO0zvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQF1AO+/vQV1WO+/ve+/vdSa77+977+977+9JRDvv73vv73MhO+/ve+/ve+/ve+/vXhaGgjvv70FHFjvv73vv73vv73OlNK277+9KhDvv73vv73Kg++/ve+/ve+/ve+/vV1aGwjvv70Fcxjvv73pgInvv73vv73vv70OUgsw77+977+977+977+977+977+977+977+9eFobCO+/vQUdSO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSkQ77+9y4bvv73vv73vv73vv73UiAHvv70A77+9BR1I77+977+92pfvv73vv73XpnMQ77+977+934Lvv73vv73vv73vv73vv70BHQDvv70FHVzvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/vdqK77+977+977+977+9DFobCO+/vQUdXO+/vcy477+977+966WwARDvv73vv73vv73vv73vv73vv73vv73vv70sWhsI77+9BR0Y77+977+977+977+977+977+977+9QQww77+977+977+977+977+97JqfVFoaCO+/ve+/vVjcte+/ve+/ve+/ve+/ve+/ve+/vSsQ77+977+977+9053vv73cuTVaGwjvv70FOVzKiO+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+95LScClocCO+/vSU9SO+/ve+/vcOA77+9zrnvv73vv70BEO+/vduq77+977+977+977+977+9EncIAO+/vQU7SOWDhe+/ve+/vdCR77+9ehDvv73Ntu+/vdax77+977+9IXgA77+9EgcKTO+/vdu077+9xKDvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEeAO+/vRLvv70LTO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+9zqnvv73poYwh77+9BO+/vQ5gCVjvv73Lju+/ve+/ve+/ve+/vWUQ77+977+977+977+92Y3vv73vv71eWhwI77+9BTpM77+97aiP7by277+91KLvv70BEO+/ve+/ve+/ve+/ve+/veaQtu+/vSFBBO+/vQ4aDGDfve+/ve+/ve+/ve+/vdmn77+9ARDvv73vv73vv73vv73vv73vv73vv73vv70DWhwI77+9DnMMTO+/ve+/ve+/vcOw77+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70BOwDvv70FO1zvv73Kl++/ve+/ve+/ve+/ve+/ve+/vQEQ77+9x5nvv73Gge+/ve+/vSVaHAjvv70FO0jvv73vv73HsO+/ve+/vdui77+9ARDvv73vv73vv73vv73vv73vv73vv73vv70SbQ8A77+9EikJXO+/ve+/ve+/vcyU77+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70YWhsI77+9BVhE77+93pjvv73vv73vv73vv73vv71eEO+/vcmk77+977+977+977+977+9BToA77+9BTpI77+977+977+935Xvv73vv73vv70tEO+/ve+/ve+/ve+/ve2lku21lu+/vQHvv70A77+9BTpI25nvv73vv73vv70DEO+/ve+/ve+/ve+/ve+/ve+/vdaY77+9IUIA77+9JQgY77+977+977+906Dvv73vv70OOgwg77+977+977+92rjJpu+/ve+/vSFCAO+/vSVCWO+/vdS/y6jkm6MyEO+/ve+/ve+/ve+/ve+/ve+/ve+/vWdaGwjvv70l77+9RO+/ve+/veuknu+/ve+/ve+/vRMQ77+977+92IDEqu+/ve+/vRJsDwTvv73vv70he1jvv73vv73vv73vv73vv73vv73UpFYQ77+977+97Yul77+9ypMjWhsI77+9Be+/vUjvv73vv73vv73vv73Cre+/ve+/ve+/vQEQ77+977+924/vv73vv73vv73vv73vv71dAO+/vSUiTO+/ve+/vdWI77+977+977+9ARDvv73vv73vv73vv73vv73vv70B77+9AO+/vUXvv71Y77+977+977+977+977+94KahaRDvv73vv73Gge+/vdig77+9dFobCO+/vQXvv70g77+977+9xp7YluSmo++/ve+/vSjvv73Qru+/ve+/ve+/vRhaHAjvv70F77+9TO+/ve+/ve+/vc+z77+977+977+9ARDvv73vv73vv73vv73Guu+/ve+/ve+/vQFXAO+/vQXvv71E77+977+945i+3KEtEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQDvv70FV0Tvv73vv73vv73vv73vv73fp3wQ77+977+977+977+977+977+977+9Eu+/vQkA77+9Be+/vUjvv73vv73vv73vv73vv73vv73NoHAQ77+977+977+977+977+977+92Ybvv70heADvv70FOlzvv73El++/vcWD77+977+977+9ARDvv73vv73vv73vv73Gs9+Ye1obCO+/vQU6XO+/ve+/ve+/ve+/ve+/ve+/vdKn77+9ARDvv73vv73jhqvvv73vv71bWhsI77+9BTpI77+977+977+977+977+95YSh77+9ARDvv73liqvvv73Uq++/vQ7vv70IAO+/vQU6SO+/ve+/ve+/ve+/ve+/ve+/vdOiHxDvv73vv73vv73vv73vv73vv73vv73vv70BdADvv70FOkjvv73vv73vv73vv73vv73Gse+/vQoQ77+977+91YHvv73anu+/ve+/vQHvv70A77+977+977+9SO+/veukk++/ve+/ve+/ve+/vTIQ77+977+977+977+977+977+977+977+9K++/ve+/vQDvv71B77+9TO+/veWFge+/vdCa77+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70277+977+9BR1I4bGC77+977+97pWjFxDvv73vv73vv73vv73vv73vv73vv73StEFCAO+/vRIlE0zvv73vv73vv73vv73Ku++/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+9Ae+/vQDvv70FO0jXku+/ve+/ve+/ve+/ve+/ve+/vVoQ77+977+977+977+977+977+977+977+977+9ATsA77+9BTtM77+977+977+977+977+977+9zqbvv70BEO+/ve+/vcWHzKXvv73vv73vv70BHgDvv70FHkzvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/vc+zAe+/vQDvv71FYljZhO+/ve+/ve+/ve+/ve+/vQoQ77+977+977+957ez77+977+9aFoaCO+/vQUcWO+/ve+/vdik0Yvvv70QEO+/ve+/ve+/ve+/ve+/vdeK77+9e1oaCO+/vUVDWO+/ve+Dlu+/ve+/vdCmXxDvv73vv73vv73vv73vv73vv73vv70qWhoI77+9BThY77+955qT77+977+93abvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/vWtaHAjvv71FQhjvv73vv73vv73vv73vv73OqUFCIO+/ve+/ve+/ve+/ve2tse27ue+/vQHvv70A77+9BTpY77+977+977+977+965GP77+9EhDvv73vv73vv73vv73vv73vv70VWhsI77+9Je+/vVzvv73vv73vv73vv73vv73ap++/ve+/vQEQ77+977+977+977+977+937ZZWhwI77+9BVdI77+977+977+977+977+977+9yKfvv70BEO+/vdul77+977+977+977+977+9JT4A77+9JT5c77+977+977+977+977+977+9xKHvv70BEO+/ve+/ve+/ve+/ve+/vdak77+9FlobCO+/vUUJSOKRuu+/ve+/ve+/ve+/ve+/vWsQ77+977+977+90pDvv73vv73vv73vv70hPQDvv70lPUzvv73vv73vv73vv73Mve+/ve+/vQEQ77+977+977+977+977+977+977+977+9Ae+/vQDvv70lBUTvv73vv73vv73vv73vv73Uhe+/vSoQ77+91Z/vv73vv73vv73vv73vv70BOgDvv70FOkzvv73vv73KoO+/ve+/vdmj77+9ARDvv73vv73vv73vv73vv73vv73Nme+/vSHvv70A77+9BXVI77+977+977+977+91ZTvv73vv717EO+/ve+/ve+/vdqN77+977+977+9AR0A77+9Be+/vUjvv73vv73vv73bue+/ve+/ve+/ve+/vQEQ77+977+977+9yYTvv73TvgFYAO+/vQXvv71I77+977+92Zjvv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vWAA77+9BXZI77+927rvv73vv73vv73vv73vv73vv70BEO+/vcmh77+977+977+977+977+9BTwA77+9BTwg77+977+977+977+977+9w6Lvv70OfAoU77+977+92aPvv70S77+9DgDvv70lYVzvv73phKjvv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/vd6aClobCO+/vQXvv71I77+977+977+977+977+977+977+977+9LxDvv73vv73vv73vv73Nue+/ve+/ve+/vSEIAO+/vWXvv71Y3I7vv73lornvv73vv70mEO+/vd2B77+977+90Izvv70XWhoI77+9JSRE77+977+977+977+977+977+977+9LhDvv73vv73iu6Lvv73vv73vv73vv70A77+9BXJc77+977+977+977+977+977+9zabvv70BEO+/ve+/ve2ise26hu+/ve+/vRhaGgjvv70FOUTvv73vv73vv73vv73vv73vv73RpR0Q77+977+977+977+91LDvv73vv70OGgoA77+9BXFY77+977+977+977+977+977+977+9bxDvv73vv73Qj++/ve+/vcunZlocCO+/vQXvv70Y77+91avvv73vv73vv73vv73vv70g77+977+977+977+977+977+95oOPIVwA77+9BXNc77+954S71orvv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vRdaGwjvv70FHUjvv73vv73vv73vv73Oou+/ve+/vWoQ77+977+977+977+977+977+977+977+9AToA77+9BR1c77+977+977+96aKt2qTvv70BEO+/ve+/ve+/ve+VsO+/ve+/vTpaHAjvv70FdUzvv73vv73vv73MgO+/vcSh77+9ARDvv73vv73vv73Ipe+/ve+/vdSAIe+/vQDmpY5I35TLn82477+977+977+9ARDvv73Nn++/ve+/ve+/ve+/ve+/vRLvv70IAO+/vSVbXM+h77+977+977+9y4nvv73vv70BEO+/ve+/veW+m++/ve+/vTxaHAjvv70FO0jvv73vv73vv73vv73vv73vv73Sou+/vQEQ77+9zbXvv73vv73vv73vv73vv70S77+9CwDvv70Fd0zvv73vv73vv73vv73vv73Dou+/vQEQ77+977+977+977+94LWJAe+/vQDvv70F77+9SO+/ve+/ve+/ve+/ve+/ve+/vcim77+9ARDvv73vv73vv73vv73ag++/ve+/vSHvv70A77+9JUNYxaPvv73vv73vv73vv73vv73vv70QEO+/ve+/ve+/vc2+77+977+9SFobCO+/vQU5SO+/ve+/ve+/ve+/vdCQyaN7EO+/ve+/ve+/ve+/veilr++/ve+/vQE5AO+/vQU5SO+/ve+/ve+/ve+/ve+/ve+/vcuidBDvv73vv73vv73vv73vv73vv73vv73vv70bDkcKBTlI77+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73aqu+/vdyBMwDvv70FOVjvv73Ite+/veqjtO+/vTQQ77+977+977+977+977+977+9R1obCO+/vQU5TO+/ve+/ve+/ve+/vcKr77+977+9ARDvv73vv73vv73VsO+/ve+/ve+/vQQORwoFHUjvv73vv73Lku+/vdC977+9HxDvv73vv73vv73tp4rttZbEngHvv70A77+9BR1I77+977+977+977+977+977+90qJqEO+/ve+/ve+/vcmz77+977+977+9Ae+/vQDvv71FRETkmo7vv73vv73vv73doWgQ77+977+977+977+927nvv73vv70OGAoA77+9BTlc77+9z6Lvv73vv73Moe+/vQEQ77+977+977+97rCk77+9QVobCO+/vQUdXO+/vcuox4TDoO+/ve+/vQEQ77+977+977+977+977+977+977+977+9O1obCO+/vQUdSO+/ve+/ve+/ve+/vcao77+977+977+9ARDvv73tmYHvv73vv73vv73vv70OexgA77+9Be+/vVjvv73vv73vv73vv73vv73vv73vv73vv71cEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vTVaGgjvv70FHFjvv73vv73Rq++/ve+/vdOhCxDvv73vv73vv73vv73vv73vv73vv73vv70lWhwI77+9Je+/vUzvv73nvZHvv73vv73vv73vv70BEO+/vcuF77+977+92ozvv73vv71BQgDvv70FHkzvv73vv73vv73vv73vv73vv70BEO+/veGouO+/ve+/ve+/ve+/ve+/vSEEAO+/vQXvv71c77+90Zjvv73ItO+/ve+/ve+/vQEQ77+975GU77+977+977+9P1obCO+/vUVfTNG077+977+977+977+93qLvv70BEO+/ve+/ve+/vdCy77+977+977+9WQ5yEgU6SO+/vemNru+/vdyA77+9PhDvv73vv73vv73vv73vv73vv73vv73vv73vv70BVwDvv70FOkjvv73vv73vv73vv73Ppe+/ve+/vTgQ77+977+977+977+977+977+977+977+977+9AR0A77+9BToY77+977+977+977+93L/vv70O77+9GTDvv73vv73Jk++/ve+/ve+/vRFaHAjvv71F77+9TO+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+977+9Ie+/vQDvv70lB1jvv73vv73vv73aqdujMxDvv73vv73vv73vv73vv73Itu+/vRpaGgjvv70l77+9WO+/ve+/ve+/ve+/ve+/vcWgBBDvv73vv73vv73vv73vv73vv73TlSlaGgjvv70FOETvv73vv73vv73vv73vv73vv73Sp0kQ77+977+977+977+977+977+977+977+977+9WADvv70lISDvv73UmO+/ve+/ve+/vdCi77+9Du+/vQoY5qy/77+977+977+977+9IT8A77+9BR5M77+977+977+977+977+977+97KOSARDvv73vv73Pj92hx77vv70BHgDvv70FHiDOpu+/ve+/vc+O77+977+977+9DkcZFO+/vcm977+977+977+977+977+9AO+/vQXvv71I77+977+977+97ZqkDxDvv73vv73vv73vv73vv73vv73vv73WiAE7AO+/vQU7TMu+77+977+97ZSy77+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70BHgDvv70FHhjvv73vv73vv73Klu+/vQ7vv70MIO+/ve+/ve+/ve+/ve+/ve+/vd2077+9AR4A77+9BR5I77+93KLvv73vv73vv73vv73vv73vv70BEO+/ve+/vc6T3Z3vv73vv70S77+9EwDvv70Fd0Tvv73vv73vv73vv73dpe+/ve+/vS4Q77+977+9xJnvv73vv73vv73vv70S77+9CgDvv70FOxjvv73vv73vv73vv73vv73vv73vv70OJhgg77+977+977+977+977+977+977+977+977+9AVkA77+9BR5M77+977+977+977+977+977+977+977+977+9ARDvv73vv73QsO+/ve+/ve+/vdypIe+/vQDvv70FWUjvv73vv73vv73vv73vv73jqaDvv70BEO+/ve+/ve+/vduZ77+9xYYOAhcA77+9BR1I77+977+977+977+977+977+926VqEO+/vc2P1YrPhe+/ve+/vSHvv70A77+9Je+/vVjvv73vv73vv73vv73vv73vv70rEO+/ve+/ve+/ve+/ve+/ve+/ve+/vV5aGwjvv70FOUjvv73eke+/ve+/ve+/ve+/vWcQ77+977+977+977+977+977+977+977+977+9ATkA77+9BTlY77+977+977+977+92YLvv73vv70dEO+/vduY77+977+925Xvv71uWhwI77+9Be+/vUzvv73vv73vv73vv73vv73vv73cpe+/vQEQ77+977+977+977+977+977+977+977+9AToA77+9BTpY77+977+977+977+977+977+977+977+9DBDvv73vv73vv73Yke+/vUJaHAjvv70FOkzvv73vv73vv73Tgu+/ve+/vQEQ77+977+977+977+977+977+977+977+977+9AToA77+9BTpE77+977+97aCi7b2t77+9AhDvv73vv73Qgu+/ve+/ve+/ve+/vQ4SFQDvv70F77+9SNiW77+977+977+977+92KPvv70BEO+/ve+/ve+/vdOd77+977+977+9Di8UAO+/vQUdRO+/ve6tsu+/ve+/ve+/ve+/vWYQ77+977+977+977+977+9xojvv70SLxUA77+9BR1c77+977+977+92aHUke+/ve+/vQEQ77+977+977+977+977+977+977+977+9H1ocCO+/vQXvv71M77+977+977+907nvv73Qp++/vQEQ77+977+977+977+9ybXvv73vv73vv70h77+9AO+/vQUeHO+/vcyx77+977+977+9yaMh77+9GO+/ve+/ve+/ve+/vdyH77+9Eu+/vQsA77+9Be+/vVjvv73vv73vv73vv73vv70CEO+/vcOD77+977+977+977+977+9fVocCO+/vQU6SO+/ve+/ve+/ve+/ve+/vc6H77+977+9ARDvv73vv73Cj++/ve+/ve+/vRI1DwDvv70FOkTvv73vv73vv73vv73vv73vv73vv73vv712EO+/ve+/vd6I77+977+977+977+9Du+/vRQA77+9Be+/vUzvv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/vc+K77+977+977+977+9Xw4+GAUdSO+/ve+/ve+/vdaD77+977+9KhDvv73vv73Zle+DvtGVIT8A77+9BVZY77+977+977+977+977+977+92qTvv70BEO+/ve+/ve+/ve+/vdqt77+9A1obCO+/vQU5GO+/vemps++/ve+/ve+/vQ5tCTDvv73vv73vv73vv73vv73vv71qWhoI77+9BTlE77+90JTvv73Zpe+/ve+/vSwQ77+977+977+977+977+977+977+977+9DkUIAO+/vQU5XO+/ve+/ve+/vc6x77+977+977+9ARDvv73vv73vv73vv73vv73vv73vv71RWhoI77+9BTlI77+9wpLvv73vv73vv73vv73vv70VEO+/ve+/ve+/vcqF77+977+977+9Cw57EgUcRO+/vdqEzJrvv73vv73vv70GEO+/ve+/ve+/ve+/ve+/vcub77+9DggKAO+/vQVVRMO977+977+977+966KkGRDvv73vv73vv73vv73vv73vv73vv70S77+9GgDvv70lO0zvv73vv73EmO+/ve+/vd2m77+9ARDvv73Dsu+/ve+/ve+/ve+/ve+/vWELAO+/vQU7SO+/ve+/ve+/ve+/ve+/ve+/vc+kdhDvv73vv73vv73vv73vv73vv73vv73vv70BHQDvv70FHUjvv73vv73Utu+/vdOF77+9IBDvv73vv73vv73vv73RvO+/ve+/ve+/vSHvv70A77+9BVhM77+9y4DRj8ep77+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv73vv70hPQDvv70F77+9RO+/vcOH77+977+977+93qB8EO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70PAO+/vQVXSOC/v9yn77+977+977+977+9ARDvv73vv73vv73vv73vv73Xs++/vQ7vv70ZAO+/vQUdSO+/ve+/ve+/ve+/ve+/ve+/vdGgBhDvv73vv73vv73vv73vv73vv73vv73vv73vv70BdADvv70FdEzvv73vv73vv73vv73vv73vsKXvv70BEO+/ve+/ve+/ve+/ve+/vdS077+977+9Ae+/vQDvv70FO0TVj++/ve+/ve+/ve+/vdaibRDvv73vv73vv73vv73vv73vv73vv73vv70SYwgA77+9BR1I77+977+977+977+977+9yL/vv70wEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQHvv70A77+9Be+/vUTvv73vv73vv73oibbvv73vv70QEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ4ODgDvv70FOUjvv73vv73vv73bs++/vdGlNxDvv73VmO+/ve+/ve+/ve+/ve+/vQFzAO+/vQUdYNam77+977+977+977+977+977+977+9ARDvv73vv73vv73vv73WsdeIUFobCO+/vQ4KCmDvv73vv73toJ7tu4LLoO+/vQEQ77+977+977+9xqrvv73dmEpaGgjvv70O77+9Dkjvv73QnO+/veiHre+/vS0Q77+977+977+977+977+966ieKQ7vv70YBTlc77+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70eWhsI77+9BR1I77+977+9xpDvv73Nm++/vSEQ77+9w4Pvv73vv73Enu+/ve+/vQHvv70A77+9BR1I77+977+977+977+977+977+9ERDvv73vv73Nle+/ve+/ve+/ve+/ve+/vQEdAO+/vQUdXMKd77+977+977+977+92KPvv70BEO+/ve+/ve+/ve+/vdeT77+9blobCO+/vQUdSO+/vdO677+977+977+977+977+9cBDvv73vv73asO+/ve+/ve+/vdadAToA77+9BR1c77+977+977+977+977+977+977+977+9ARDvv73vv73vv73Qp++/ve+/ve+/vRxaGwjvv70lBBjvv73vv73vv73vv73vv73vv73vv70OZAkc77+977+977+977+9xZLvv73vv70ODAgA77+9Be+/vVjFiO+/ve+/ve+/ve+/ve+/ve+/vVQQ77+977+977+977+92Zfvv73vv71lWhoI77+9BRxE77+977+9y5nIlO+/ve+/vXYQ77+977+977+977+917Xvv70O77+9CADvv70Fckjvv73vv73vv73vv73ipKTvv73vv70BEO+/ve+/vdC177+977+977+977+977+9BgDvv70FOVjvv73vv73EuO+/ve+/ve+/ve+/vTwQ77+926rXn++/ve+/ve+/vWhaGgjvv70FHEjvv73miI/vv73vv73JpBMQ77+977+97aWF7biF77+977+9FA7vv70LBVVI77+92Lzvv73Ite+/ve+/vQEQ77+977+977+97KWh77+977+9DgUKAO+/vQUdXO+/ve+/vd6e77+9y6rvv73vv70BEO+/vduj77+977+92YXvv70xWhoI77+9RSFc77+977+977+977+97aWz7bSiSRDvv73vv73vv73Jje+/ve+/ve+/vXtaHAjvv73vv70O77+9EUjmhJXvv73vv73vv73VoO+/vQEQ77+977+977+926fvv73vv73vv70SARIA77+9JR5I77+977+977+977+977+9xLDvv713EO+/ve2uoO2zju+/ve+/ve+/ve+/vUF4AO+/vQVXRO+/ve+/vei1ku+/ve+/ve+/vUgQ77+977+957uR77+977+977+9Dl0ZAO+/vQU5SO+/ve+/vc+R77+94oWl77+9ARDvv73vv73vv73vv73vv73vv73Ntw7vv70dAO+/vQUdSO+/ve+/ve+/ve+/ve+/ve+/vc2kGRDvv73vv73vv73vv73vv73vv73vv73KsCHvv70A77+9BR1c77+977+977+977+9xLLMp++/vQEQ77+977+905nvv73Ihe+/vVpaGgjvv70Fc1jvv73vv73vv73vv73vv73vv73Zpl4Q77+977+977+977+917jvv70TWhwI77+9Be+/vRjvv73vv73vv73flu+/ve+/vQ4uECDvv73vv73vv73vv73vv73SsO+/ve+/vQHvv70A77+9BTpE77+977+93IDvgKACEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ4THQTvv70hBEjvv73Osu+/ve+/ve+/ve+/ve+/ve+/vQEQ77+96Z+/77+977+977+977+9El4IAO+/vQVYTO+/ve+/ve+/vdqE27bvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vWHvv70A77+9BTxI77+96JSG77+977+92KLvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/vWViAO+/vSXvv71I1KPutpDYke+/ve+/vQEQ77+977+977+977+977+977+95Yyh77+9AO+/vQUdXM2m77+977+977+977+977+977+977+9ARDvv73vv73Fhu+/ve+/vd6lG1oaCO+/vUUKWNeZxZDap++/ve+/vXoQ77+977+977+977+977+977+977+977+9EFobCO+/vQU5XO+/ve+/ve+/ve+/ve+/ve+/vdim77+9ARDvv73vv73DldCo77+977+9ZloaCO+/vQU5SO+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+934jvv73vv73vv73vv73vv71tDhwSBTlI77+977+977+977+977+977+9w6Y5EO+/ve+/ve+/ve+/veatsO+/ve+/vSEiAO+/vQU5RO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vWUQ77+977+977+977+977+96LGuYSYA77+9BTlIy5rvv73ul5XYoe+/vQEQ77+977+977+9zoHSsO+/vQ5uDADvv70FHVzvv73vv73vv73vv73VhtWg77+9ARDvv73vv73vv73vv73vv73jg5UlWhsI77+9BR1I77+977+977+9xrHvv73vv73vv70OEO+/vc+Y77+977+977+977+9yJkh77+9AO+/vRLvv70hSO+/vdCC77+9yqnvv73vv73vv70BEO+/ve+/vcyo77+977+977+977+9IR8A77+9BTpM77+977+977+977+95qai77+977+9ARDvv73vv73vv73vv73vv73jvqktDnYIJXdM77+977+977+977+977+91Z/vv73vv70BEO+/ve+/ve+/vcam77+977+977+977+9AVgA77+9BVhI77+977+977+977+966aoARDvv73vv73vv73vv73vv73vv73vv73vv70OIwkA77+9BVgY77+977+977+977+977+977+977+9DhsMIO+/ve+/ve+/ve+/ve+/ve+/ve+/vSHvv71UBTpI77+977+977+977+977+977+977+9UhDvv73vv73vv73vv73vv73Dqu+/ve+/vSHvv70A77+9BXUg77+90p/vv73vv73vv73vv73vv73vv70O77+9IRjngozPlNmXAR4A77+9Eu+/vRUg77+977+977+977+977+977+977+977+977+9DjQLGO+/ve+/ve+/vcOs77+977+9Ae+/vQTanu+/vU9I77+915rvv73vv73vv70WEO+/ve+/vdGQ77+977+977+977+977+9ATsA77+9BVkg77+977+977+965ar77+977+9DjwfGO+/ve+/vc2777+977+9AR4A77+9BVlM77+977mC77+977+977+977+977+9ARDvv73Jte+/vdma77+977+977+9Ie+/vQTZnu+/ve+/vVjbpO+/ve+/ve+/ve+/vc6iTBDvv73vv73vv73GoO+/ve+/ve+/vUxaHAjvv70FWEzasMua77+977+977+977+977+9ARDvv73vv73vv73Lte+/ve+/ve+/vQHvv70A77+9Be+/vUTvv73vv73vv73vv73vv73vv73vv73vv71oEO+/ve+/ve+/ve+/ve+/veynuhJcHwDvv70F77+9RO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vRsQ77+977+977+977+91Lfvv71lEwTvv73vv71hMUzvv73vv73vv73vv73Hpe+/ve+/ve+/vQEQ77+977+977+90qjvv73Uje+/vQFYAO+/vQVYRO+/ve+/ve+/ve+/vc6G77+9YxDvv73vv73vv73vv73dpO+/ve+/ve+/ve+/vQDvv70FWEjKjO+/ve+/ve+/ve+/ve+/ve+/vSEQ77+977+977+977+977+977+9x5/vv70BOgDvv70l77+9RO+/ve+/ve+/ve+/ve+/ve+/ve+/vVEQ77+977+95bKj77+9xaIS77+9DADvv70FHVzvv73vv73vv73vv73Fkc+k77+9ARDvv73vv73Gke+/vdiT77+9YVocCO+/vSUkSO+/vdCc77+9z5vvv73vv73vv70BEO+/ve+/ve+/ve+/ve+0sO+/vRICFwDvv71F77+9SO+/ve+/ve+/veaYvcmhYBDvv73vv73vv73qtb3NnH4OcxwF77+9SO+/ve+/veqFl++/ve+/vQsQ77+916LCt++/ve+/ve+/ve+/vQHvv70A77+9BXRI77+9wp3vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/vcyQ77+977+977+9DgEXAO+/vQV0TOaquN+377+977+977+977+9ARDvv73vv73vv73vv73vv73vv73cgu+/vSHvv70A77+9BXRE77+977+977+90rjvv73vv73vv70sEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vWHvv70A77+9Eu+/vSVY77+9367vv73vv73vv70iEO+/ve+/ve+/ve+/vcaS77+977+9SVoaCO+/vQU4SO+/ve+/vd+r77+93azvv71XEO+/ve+/ve+/ve+/ve+/vQgOQRgFckjvv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/vcOo77+977+9EkwaAO+/vQXvv70Y77+977+977+977+977+977+977+9Du+/vSIw77+977+977+977+977+977+977+977+9IFobCO+/vQXvv71cxavvv73vv73NtuKmhAEQ77+977+977+977+977+977+977+977+9P1oaCO+/vQV0WMqT77+977+94Ymh77+9FBDvv73vv73vv73vv73vv73vv73vv71tWhoI77+9BRxE7LCT77+977+977+977+977+9PxDvv73vv73vv73vv73vv73Vh++/vQ5rCwDvv70FckTvv73vv73vv73vv73vv73aiO+/vRYQ77+9w4Pvv73vv73vv73vv73vv70S77+9JgDvv70FHUTvv73vv73vv73vv73vv73vlabvv70BEO+/ve+/vc+u77+977+977+9Eu+/vR4A77+9BR1I77+977+9zo7vv73vv73vv71hEO+/ve+/vcqw77+91IvWkiE7AO+/vQVzSNqz3q/avdOgYBDvv73vv73vv73vv73vv73vv73vv715Du+/vRhFeyDvv73vv73vv73vv73nq5fvv73vv70O77+9JBTvv73vv73vv73vv73vv73vv70SEQoA77+9BVdc47aI77+977+977+90Kfvv70BEO+/ve+/ve+/ve+/veOfg++/vQpaGgjvv70FV0jvv73vv73Spe+/ve+/vdWiIhDvv73vv73vv73vv73vv73Hi++/vUsO77+9GQUcWO+/ve+/vdKx77+9ypvvv70GEO+/vcel77+977+93ZgdWhoI77+9BRxI77+977+9z6PKo++/vQYQ77+977+9yoniqYA9Du+/vQ8FcUjvv73vv73vv73vv73vv73vv73vv73vv71eEO+/ve+/ve+/ve+/ve+/vee5lO+/vUE+AO+/vSV0SO+/ve+/ve+/vcqa77+92aEVEO+/ve+/ve+/ve+/ve+/vd+l77+977+9Ye+/vQDvv70F77+9TO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+977+9ATsA77+9BVhI15LOoe+/ve+/ve+/ve+/vS4Q77+977+977+92qfvv73vv73vv70BHQDvv70FWBjvv73vv73vv73vv73vv73aqQ5rIxzvv73vv73kuIXvv73vv73vv70OVykA77+9Be+/vUjIh++/ve+/ve+/ve+/ve+/ve+/vQYQ77+93YPvv73vv73vv73vv73vv71SDu+/vRUS77+9Fkjvv73vv73vv73vv73joJHvv70rEO+/ve+/ve+/ve+/vemgj++/vQYOAQ4S77+9FEjvv73vv73vv73Sk++/ve+/vWsQ77+9zZnvv73vv73vv73ZsO+/vSHvv70A77+9Re+/vVjvv73Ype+/ve+/ve+/ve+/vTMQ77+977+977+977+977+977+977+977+9YloaCO+/vQVxRO+/ve+/ve2poO2zvtChNxDvv73Hpe+/ve+/ve+/ve+/vQ7vv70aAO+/vRLvv70aSO+/ve+/vciK77+9yKDvv70BEO+/ve+/vcmx77+977+977+977+9Eu+/vR8A77+9Ei4WWO+/ve+/vd+s77+90KMzEO+/vcmy77+977+977+9dloaCO+/vQVyWO+/ve+/vd+s3obvv73vv71WEO+/ve+/vdOv77+977+977+9R1oaCO+/vQVySO+/ve+/ve+/ve+/ve+/ve+/ve+/vWwQ77+977+977+977+977+977+977+977+9RA7vv70pBe+/vUjvv73vv73Dm++/ve+/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+9Ie+/vQDvv70FVUTvv73vv73vv73vv73tpozts6FLEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70KAO+/vSVySO+/vc6277+977+977+93KRFEO+/ve+/ve+/vdaW77+977+9yr0hAADvv70FOVjvv73vv73vv73vv73vv73vv73vv73vv70zEO+/ve+/ve+/vdKS77+9y6A4WhwI77+9Je+/vUjvv73vv73vv73vv73vv73Ype+/ve+/vQEQ77+977+977+977+977+977+977+977+9Eu+/vRsA77+9Ze+/vUzvv73vv73vv73vv73Sk++/ve+/vQEQ77+915/vv73vv73vv73amu+/vQFYAO+/vQXvv71Y77+977+92qXvv73vv73vv73vv71IEO+/ve+/ve+/ve+/ve+/ve+/ve+/vVJaGwjvv70l77+9SNuX77+977+977+977+90adOEO+/veOxuc6E77+977+977+9QQMA77+9Be+/vUjvv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/vd+e06vvv70OGQ4A77+9BR1I77+977+92L7vv73Ftu+/ve+/vQEQ77+93Y7vv73vv73vv71B77+9AO+/vQUdSM+s77+977+977+935Tvv70EEO+/ve+/ve+/ve+/ve+/vc6d77+9Ae+/vQDvv70F77+9RO+/ve+/ve+/ve+/ve+/vciG77+9RxDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv70A77+9BTlI77+977+977+977+977+977+977+977+9IRDvv73vv73vv73vv73vv73vv73vv73IiQHvv70A77+9BR1E2prvv73vv73Vve+/vWEQ77+977+977+97aW37bqf77+9Eu+/vScA77+9Eu+/vQlI77+977+977+9x5fvv73WpiUQ77+91Yfvv73vv73vv73vv73vv70BOgDvv70FOlzvv73Ln8Wx77+977+977+977+9ARDvv73lmZ3Jte+/ve+/vQtaHAjvv70SfAlM77+977+93Kvmq6Dvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/vQE7AO+/vQU7SO+/ve+/ve+/vdqn77+977+9FBDvv73vv73otKPvv73vv73vv73vv70BHQDvv70FdSDvv73vv73VhtSh2KXvv73vv70s77+90qfvv73vv73vv71bWhoI77+977+977+9NUjvv73vv73vv73vv73Ove+/ve+/vSwQ77+977+977+977+977+977+977+977+9JWHvv70A77+9ARxY77+977+977+977+977+977+977+977+9GhDvv73vv73vv73vv73vv73vv73vv73vv70oWhoI77+9JSBA77+977+977+966yS0KBhEO+/ve+/ve+/vcWU77+977+9Eh4IAO+/vUUITO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+9yYHvv73vv73vv73JsgHvv70A77+9Be+/vUjvv73ehe+/ve+/ve+/ve+/vTAQ77+977+977+977+977+977+977+9y57vv70MAO+/vQU7SMye77+977+977+977+94KKJARDvv73vv73vv73vv73vv73vv73vv70S77+9EQDvv70FO0Tvv73vv73RkdyV77+977+9fhDvv73Dje+/ve+/ve+/vdGwRe+/vQDvv70F77+9RO+voe+/ve+/ve+UozgQ77+977+977+977+977+977+977+977+9QUIA77+9BTlI77+927bvv73vv73vv70XEO+/ve+/ve+/vdGd77+977+977+977+9AXQA77+9BXRI77+977+977+977+977+92KDvv70BEO+/ve+/vd6177+977+977+9ElQOAO+/vQVXRO+/ve+/ve+/ve+/ve+/ve+/vTMQ77+93arvv73Zt++/ve+/vQ56GwDvv70ld0Tvv73ouoHtlY3vv71GEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQDvv73vv73vv71I77+977+92rbvv73vv73vv73vv710EO+/veeIr++/ve+/ve+/ve+/vSEFAO+/vQUdXO+/ve+/ve+/ve+/vdWp77+977+977+9ARDvv73vv73Mr++/ve+/ve+/ve+/vU1aGgjvv70Fc0jvv73vv73vv73vv73vv73vv73vv73vv70REO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vS8OLC4FHEjvv73vv73vv73vv73vv73vv73vv73vv701EO+/ve+/ve+/ve+/ve+/ve+/ve+/vREOXhEA77+9Du+/vQhM77+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73Ok++/ve+/vUHvv70A77+9Eh8JRO+/ve+/ve+/ve+/ve+/ve+/ve+/vVIQ77+977+977+90rTvv73vv73vv70O77+9GgDvv70FVlzvv73vv73Pne+/ve+/ve+/ve+/vVkQ77+977+977+977+977+977+977+977+9TlobCNGWDu+/vQkY77+977+977+977+9yq3vv70OYikw77+977+977+977+977+977+977+9PVobCO+/vSVZGO+/ve+/ve+/ve6ik0Hvv70w77+977+977+97JKq77+977+9YFobCO+/vWXvv71A77+977+9yKjvv73vv73WpGkQ77+977+977+977+977+977+977+9SQgbCO+/vSUCSO+/veKck++/ve+/vcuvahDvv73vv73vv73vv73vv73vv73Oju+/vSHvv70A77+9Je+/vUzvv73vv73vv73di++/ve+/ve+/ve+/vQEQ77+977+977+977+977+977+977+977+977+9IT0A77+9BXVI3Izvv73vv73vv73vv73TolsQ77+977+977+977+977+977+977+934MBHQDvv70l77+9SO+/ve+/ve+/ve+/ve+/ve+/ve+/vU8Q77+9xa7vv73vv73vv73vv73vv73vv70hBADvv70lBFjvv73vv73vv73vv73vv73vv73vv73vv715EO+/vcWU77+9yrzvv73vv70qWhsI77+9BTkY4ZOB77+977+977+977+9Du+/vQkw77+977+977+977+977+977+977+977+9QloaCO+/vUXvv71Y77+91Ynvv73vv73vv73vv73vv70nEO+/ve+/ve+/ve+/ve+/ve+/vShaGwjvv70FOVzvv73vv73vv73vv73vv73vv73Ipe+/vQEQ77+977+977+977+977+977+977+9EVobCO+/vSUESO+/ve+/ve+/ve+/ve+/ve+/vd6iWRDvv73vv73vv73vv73vv73vv73vv73vv70B77+9AO+/vSV3WO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vXIQ77+977+977+91YrQru+/vXNaGwjvv70FVhjvv73vv73vv73vv73Wp++/vQ4RGTDvv73vv73vv73vv73vv73vv73vv70QWhoI77+9BTlE77+96KuD77+977+977+977+9NRDvv73vv73YrO+/ve+/ve+/ve+/vQ7vv70MAO+/vQU5RMye77+91pzvv73vv73vv701EO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vRJcEQDvv70FHUjvv73vv73vv73vv73vv73vv73vv73vv71qEO+/ve2rt+28su+/ve+/ve+/ve+/vSE7AO+/vQUdSO2oh+2+hu+/ve+/ve+/ve+/vQEQ77+977+92YLvv73vv73vv73vv70B77+9AO+/vQVzRO+/ve+/vdqn77+92YTvv706EO+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70WAO+/vSUeWO+/ve+/ve+/ve+/ve+/ve+/ve+/vSAQ77+977+977+977+977+9WFoaCO+/vQU4WNib77+977+91Zrvv73vv71FEO+/ve+/vdCr77+977+977+9GlobCO+/vQVxSO+/vd2c4pK03qPvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70aAO+/vQUdSO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEQ77+977+977+977+977+977+9DkMpAO+/vSVXSO+/ve+/ve+/ve+/vcex77+977+977+9ARDvv73vv73vv73vv73vv73vv73vv73vv70OGgkA77+9RT5M06Pvv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/vdSTAe+/vQTvv73vv71B77+9SO+/ve+/ve+/ve+/vcWD77+977+977+9ARDvv73vv73vv73vv73Mpu+/ve+/vUEFAO+/vRLvv70gSOO3tu+/ve+/ve+/vdCiChDvv73Tpc2J77+977+977+9IQMA77+977+9XO+/ve+/ve+/ve+/ve+/vdSN77+9WRDvv73vv73vv73vv73EkO+/ve+/vTlaGgjCle+/vSxY77+977+977+977+90pvfpgEQ77+977+977+977+95oWWLlobCO+/vQVySO+/ve+/ve+/ve+/ve+/ve+/vR8Q77+977+9zYLvv73vv73vv73vv71B77+9AO+/vQXvv71M77+977+977+977+977+977+977+9ARDvv73vv73LhO+/vdib77+977+9Ae+/vQDvv70FO0jvv73vv73vv73vv73MlO+/vQgQ77+977+977+977+977+977+977+977+977+9Ae+/vQDvv71F77+9RN+g77+977+977+9xqsFEO+/ve+/ve+/vcun77+977+977+9DjAVAO+/vQU5RO+/ve+/ve+/ve+/ve+/vcSx77+9HxDvv73vv73fru+/ve+/ve+/ve+/vRLvv70lAO+/vSXvv71E77+977+977+977+92Kbvv70VEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70gAO+/vWXvv71c77+90Lrvv73ira/vv70BEO+/ve+/ve+/ve+/ve+/ve+/vcScYVoaCO+/vQU5SO+/ve+/ve+/ve+/ve+/ve+/ve+/vUsQ77+977+9w6Pvv73Vk++/vRIONBYF77+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ5pGhjvv73vv73cve+/ve+/vQHvv70A77+977+977+9TMSL77+977+977+90rfvv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEeAO+/vRIcCEjvv73vv73vv73vv73vv73vv73vv70BEO+/ve+/vcyk77+977+977+9ElIWAO+/vQV2WNOG66Oq77+977+977+9JRDvv73vv73vv73vv73vv73vv73vv73vv71LWhsI77+9Be+/vUjvv73Nre+/ve+/vd6jSRDvv73vv73vv73vv73vv73vv73vv70hPgDShSlc2o3vv73QvO+/ve+/ve+/ve+/vQEQ77+977+977+977+9yLvvv73vv71XWhsI77+9BTpE77+977+977+977+93aTvv73vv71PEO+/ve+/ve+/ve+/ve+/ve+/vcuuEjgPAO+/vQU6RO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vUgQ77+977+977+977+977+977+9y5sSRxMA77+9JSNc77+977+93Zjvv73Puu+/ve+/vQEQ77+977+977+977+977+977+977+977+9FFobCO+/vQVXSO+/ve+/vcy5w6PdpWAQ77+977+977+91qLvv73Xue+/vQHvv70A77+9BR1I77+977+977+977+937Tvv73vv70BEO+/ve+/ve+/ve+/ve+/vcW/77+9Du+/vQwA77+9Re+/vVzvv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/vc2X77+977+9O1obCO+/vQU6SO+/ve+/vemujO+/ve+/vUQQ77+977+977+977+977+977+977+977+977+9AVcA77+9BR1I77+977+977+977+977+9zofvv71/EO+/ve+/ve+/ve+/vcKI77+977+977+9IVwA77+9EjoITO+/ve+/ve+/ve+/veilqwEQ77+977+977+977+977+977+977+977+977+9ATsA77+9Be+/vVzLv9Sn77+977+977+977+9ARDvv73vv73vv73vv73vv73vv70cWhwI77+9Je+/vUjXp++/ve+/ve+/veatoO+/vQEQ77+977+977+977+977+977+977+977+9Ej8dAO+/vUXvv71E77+977+977+977+97aad7baiORDvv73vv73vv73vv73vv73aue+/vQ7vv70KAO+/vSXvv71I77+9y7zvv73vv73vv73vv73vv70dEO+/ve+/vc2R77+977+977+977+9WQ7vv70rJVxc77+91Z3vv73vv73vv73SpO+/vQEQ77+977+977+977+9yIrvv73vv71xWhwI77+9BXNM77+977+9z7zvv73vv73VpO+/vQEQ77+977+95ZSD77+96Iq4Ae+/vQDvv70F77+9RMOf77+9zoTvv73QonoQ77+977+977+977+977+977+977+977+9EjcmAO+/vQVYRN+P77+977+977+977+977+977+9UBDvv73vv73vv73vv73vv73lj60S77+9GwDvv70F77+9WOihsu+/ve+/ve+/vd6mThDvv73vv73vv73ml4Xvv73vv71SWhwI77+9JSJIy7bvv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/vcSZ77+977+9Eu+/vSAA77+9Je+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vc2i77+9ARDvv73vv73vv73vv73vv73Osu+/vX5aGQjSmDcSEwjvv73vv73vv73vv73vv73vv73vv73vv70TEO+/ve+/vcKE77+977+977+9KGDvv70O77+9NwDDolI3CDI3Ijrvv704CDwI77+977+9PgAEODYyPgAA77+9AXwA77+977+9PgAAN0o+AADFoj4ABDI5RnwAAMSmPgAAOD4+ACA0CO+/vTcSC1RhEmY6FFRpbGUaEh0KDgo6CDA3NT42ABjvv70pCAESCEQafjgZHgQyCA7vv704DBDvv73vv703CgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgTvv73vv70R77+9AO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKBO+/ve+/vXF6AO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKBO+/vXHvv70A77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9FQoA77+9Fe+/vQTvv73vv70R77+9AO+/vRUUAO+/vRUUAO+/vRUyAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRXvv70A77+9Fe+/vQDvv70VHgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgTvv73vv71xUgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgTvv73vv70RUADvv70VFADvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70VCgDvv70V77+9AO+/vRUUAO+/vXUCAO+/vXUCAO+/vRUUAO+/vRUUAO+/vRUyAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vTUEAO+/vTUEAO+/vRUUAO+/vRUUAO+/vRUyAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vSLvv70KAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vRUKAO+/vSJaCgDvv70V77+9AO+/vRXvv70A77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FQoA77+9FW4A77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9FRQA77+9Fe+/vQDvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VZADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VCgDvv70VHgDvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VFADvv70VCgDvv70VHgDvv70VFADvv70VFADvv70VFADvv70VFADvv70VFBDWljcyBA7vv70RGu+/vREA77+9VRgA77+9FSQA77+9FTgA77+9FRQA77+9FSgA77+9FRQA77+977+9TBTvv73vv703EO+/vQFWBN2hEVYEwpcBEATvv73vv70READvv70FEEjvv73vv703OgoIBxIGCO+/ve+/vTcQAToKCAgKDHQFUABaGggBEhYI77+977+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73YpO+/ve+/vQ54FQDvv70S77+9Fkzvv73vv73JoO+/vcyM77+977+9ARDvv73vv73vv73Jhe+/ve+/ve+/ve+/vQ7vv70UAO+/vRJ4FVzvv73vv73vv73vv73vv73vv73vv71BEO+/ve+/ve+/ve+/veqIs++/ve+/vQFaGgjvv70S77+9F0Tvv73vv73vv73vv73lq6duEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQ7vv70hAO+/vQUcWO+/ve+/ve+/vc6p77+9bhDvv73vv73vv73vv73vv73vv73vv70qWhsI77+9Eu+/vRhI0JHvv73vv73vv73vv73vv73vv73vv70BEO+/ve+/veuFie+/ve+/ve+/vQ5CHgDvv70F77+9SO+/ve+/ve+/vcqk77+977+977+977+9ARDvv73vv73vv73vv73aou+/ve+/vRIWKADvv70FV0Tvv73vv73Smu+/ve+/ve+/vT4Q77+977+977+97I6q77+9DhopAO+/vRIEMUzvv73bl++/ve2rlu2whgEQ77+977+977+977+977+977+977+977+9Ae+/vQDvv70F77+9SO+/ve+/ve+/vdi/77+977+977+977+9ARDvv73vv73vv73HvO+/vcKRDu+/vRoA77+9Ej0VSO+/ve+/ve+/ve+/vdmp77+977+9ARDvv73vv73vv73vv73vv73vv73bgg4bKQDvv70FOkjWr++/ve+/ve+/ve+/ve+/ve+/vVoQ77+9x6Hvv73vv73vv73Tte+/vSE/BO+/ve+/vQ7vv70cTO+/ve+/ve+/ve+/vc+LwqHvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQEeAO+/vQUeTO+/ve+/ve+/vcWZ77+977+977+977+9ARDvv73vv73vv73vv73vv73vv73GvO+/vQHvv70A77+9JQhI77+977+977+977+977+977+977+977+9UBDvv73vv73vv73Fmu+/ve+/ve+/vQEdAO+/vRInFkTvv73vv73aje+/ve+/ve+/ve+/vUkQ77+977+95b2Q77+977+977+9Eu+/vTMA77+9BTpE77+977+977+977+977+977+977+977+9YxDvv73vv73Es++/ve+/ve+/ve+/vRIbRwDvv70SfhZI77+977+977+977+977+977+977+977+977+9ARDvv73vv73vv73vv73vv73vv73vv70OFSAA77+9BR1I77+977+977+906fvv73vv73vv70YEO+/vc+P77+92qntio8h77+9AO+/vRJKH0TSkO+/ve+/vcmj77+9WxDvv73vv73vv73FlO+/ve+/ve+/vQ7vv71GAO+/vRJ+Fkjvv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/vdax77+9BXQA77+9Eu+/vSFU77+977+977+977+977+977+9x6Dvv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vV9g77+9Du+/vRUA77+977+9axUEODAmFxUIUABgEiUWAMmiPgAEMzNGPgAAyKY+AAAyRj4AFO+/ve+/vTcSD1QW77+9FSREYXRhTGlzdBoWOhEADu+/vRUEMTJK77+9FgDvv73vv718AAA3Su+/vRYAx6I+AAQzMUbvv70AAO+/ve+/vT4AADdC77+9FhhSCO+/ve+/vTcSGgrvv71K77+9UAQaIWYcACkOQu+/vRYIPAjvv73vv73vv70AADhK77+9AADKoj4AADNKN1AAxqY+AErvv70CAO+/ve+/vT4AADc2IxkU77+9BBpSCO+/ve+/vUwBSu+/vQAAwqLvv70ARu+/vQIE77+9Be+/vUNQEhFDYWxjdWxhdGlvbkVuZ2luZRoYQhMAIe+/vSAwODgiAwMCCioBBSQyCAgBENyeNxgBBQoE77+9AQoIBAjvv73FqgDvv70FBgTvv73vv73vv73vv70A77+9BQYA77+9BRIA77+9BQYA77+9InQM77+9LgDvv70FFgDvv70VFg5KCwAEIe+/ve+/vUQObgsABGEGChAA77+977+9ZADvv70VMA7vv70LAATvv70eCiAO77+9CwAEIRoKEA7vv70LCAQI77+9BWYA77+9FTYO77+9CwgECO+/vQXvv70A77+9FRYO77+9CwAEDgsbCjwO77+9CwAEDu+/vRoKEA5kCwAEYe+/vQoQAO+/vRU6AO+/vRUKAO+/vRUKAO+/vRUKJu+/vQsm77+9CyZ4DCbvv70MJu+/vQwm77+9DCbvv70MJjwMJlAMJu+/vQwmBAoOGAoABA7vv70aBDIEQXYEMgRh77+9BDIEDmcbBDIEQe+/vQQyBO+/ve+/vQQyBO+/vR4EMgTvv73vv70EMgRh77+9BFAADkMy77+977+9SMi577+9xaPvv73Ipu+/vQEQ77+94ayO77+977+977+977+9DngrAO+/vQUdSO+/vdqr77+977+977+977+9OBDvv73vv73vv73vv73vv73Zh9Gr77+977+9AO+/ve+/vUjvv73vv73vv73vv73vv73msKTvv70BEO+/vc++067vv73vv73vv70SVCcA77+9BR7vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70BEO+/ve+/ve+/ve+/ve+/ve+/ve+/vd6aAWDvv70EaicKG1RTQ0VSZWR1Y2VDYWxjRUXvv70cTXNnU2l6ZRJBdQAaBQUAPCHvv73vv73vv70FADFC77+9BDw0CN2hNxIJVmlld1N0YXRl77+9MggyCggabQlN77+9Re+/vRhQAGDvv70EGkwOXgkYEhdBbm5vdGUqEEF1dGhvHhRWBBoeWhkAaTc+DATvv71GIl4ICBIUe++/ve+/vRnvv71Yfu+/ve+/vQPvv71Q77+9ElUiEnjvv71BGhd0aWxlX3BhcGVyX21lZGdyYXkuanBlZyIAKiJnaW5nZXIvMDBfdGhlbWUvRisA77+9RlIF77+9BgIYASJSCA8SFO+/vQlUEjTvv73vv702JyVMSO+/vTHvv71Eaj4OGhxidWxsZXRfY2lyY2xlLWJsay1yZXNpemUucGRmIgAqGGJ1bGxOIABsIlwIBxIU77+977+9RUA2C++/vUQSKe+/ve+/vW9TU++/vX3vv70E77+9GhYd77+9CGx0Zx3vv70AIWrvv70ACSoK77+977+9UyHvv704OgMOAQFA77+9BFIECO+/vTcZAQXvv70SEwjvv71WEgMBAAUYHCoHyI4377+9IO+/vSAKCAgPEgQIyI43CgcIBxIDCO+/vSAKBwgIEgMI77+9IBAIyI43EgoI77+9Vgk2KBoKGAgBHe+/ve+/vR0/JQEFAC0BBSw1AADvv70/YAEPCO+/vSASPioAMO+/ve+/vQU/Je+/ve+/vQY/Le+/ve+/vQcZKgDvv71GKgBQ77+977+977+9PiXvv73vv73vv70+Le+/ve+/ve+/vT41AADvv70/YAFQSwMEFAAAAAAAB++/ve+/vVpfJh8m77+9AQAA77+9AQAAGQAUAE1ldGFkYXRhL1Byb3BlcnRpZXMucGxpc3QBABAA77+9AQAAAAAAAO+/vQEAAAAAAABicGxpc3QwMO+/vQECAwQFBgcICQoLDAoODxBYcmV2aXNpb25cZG9jdW1lbnRVVUlEW3ZlcnNpb25VVUlEW3ByaXZhdGVVVUlEW2lzTXVsdGlQYWdlXxASc3RhYmxlRG9jdW1lbnRVVUlEXxARZmlsZUZvcm1hdFZlcnNpb25Zc2hhcmVVVUlEXxAnMDo6QzVDNjMyQTItMzBDOC00OUY0LUEzREQtRTMxN0M1NjRDNDZFXxAkOEJEODY0MUEtMDk2Ri00QjUyLTk2RDgtMTZDNDBBOTI0QTBFXxAkQzVDNjMyQTItMzBDOC00OUY0LUEzREQtRTMxN0M1NjRDNDZFXxAkMEYzMTMyNDktMkM0Ri00RENCLUE4NTMtOTJGM0EyNDFFRTg4CF8QJEI5NUJDODMyLTFENTUtNEI2Qi1CN0ZFLTk1NzhCQzMyNkQ5QVYxNC4xLjFfECQ4QkQ4NjQxQS0wOTZGLTRCNTItOTZEOC0xNkM0MEE5MjRBMEUACAAZACIALwA7AEcAUwBoAHwA77+9AO+/vQDvv70A77+9ASUBJgFNAVQAAAAAAAACAQAAAAAAAAARAAAAAAAAAAAAAAAAAAABe1BLAwQUAAAAAABtf++/vVrWre+/ve+/vSQAAAAkAAAAGwAUAE1ldGFkYXRhL0RvY3VtZW50SWRlbnRpZmllcgEAEAAkAAAAAAAAACQAAAAAAAAAOEJEODY0MUEtMDk2Ri00QjUyLTk2RDgtMTZDNDBBOTI0QTBFUEsDBBQAAAAAAG1/77+9Wsu377+977+977+9AAAA77+9AAAAIgAUAE1ldGFkYXRhL0J1aWxkVmVyc2lvbkhpc3RvcnkucGxpc3QBABAA77+9AAAAAAAAAO+/vQAAAAAAAAA8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJVVEYtOCI/Pgo8IURPQ1RZUEUgcGxpc3QgUFVCTElDICItLy9BcHBsZS8vRFREIFBMSVNUIDEuMC8vRU4iICJodHRwOi8vd3d3LmFwcGxlLmNvbS9EVERzL1Byb3BlcnR5TGlzdC0xLjAuZHRkIj4KPHBsaXN0IHZlcnNpb249IjEuMCI+CjxhcnJheT4KCTxzdHJpbmc+Y3N2PC9zdHJpbmc+Cgk8c3RyaW5nPk0xNC4xLTcwNDAuMC43My00PC9zdHJpbmc+CjwvYXJyYXk+CjwvcGxpc3Q+ClBLAwQUAAAAAAAH77+977+9Wu+/ve+/vV/vv71KAADvv71KAAALABQAcHJldmlldy5qcGcBABAA77+9SgAAAAAAAO+/vUoAAAAAAADvv73vv73vv73vv70AEEpGSUYAAQEAAEgASAAA77+977+9AEBFeGlmAABNTQAqAAAACAAB77+9aQAEAAAAAQAAABoAAAAAAALvv70CAAQAAAABAAAC0KADAAQAAAABAAACKAAAAADvv73vv70AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ77+9He+/vdmPAO+/vQTvv70J77+977+977+9Qn7vv73vv70AEQgCKALvv70DASIAAhEBAxEB77+977+9AB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC++/ve+/vQDvv70QAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQy77+977+977+9CCNC77+977+9FVLvv73vv70kM2Jy77+9CQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eu+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vQAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgvvv73vv70A77+9EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIy77+9CBRC77+977+977+977+9CSMzUu+/vRVicu+/vQoWJDTvv70l77+9FxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXrvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70AQwACAgICAgIDAgIDBAMDAwQFBAQEBAUHBQUFBQUHCAcHBwcHBwgICAgICAgICgoKCgoKCwsLCwsKCgoKCgoKCgoK77+977+9AEMBAgICAwMDBgMDBgoJBwkKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCu+/ve+/vQAEAC3vv73vv70ADAMBAAIRAxEAPwDvv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9ae+/ve+/ve+/ve+/vUvvv73vv70jaO+/vXot77+977+9b3QY77+977+977+977+9Gu+/vRo8Vjrvv73eq09x77+9JO+/ve+/ve+/ve+/vWtd77+9I++/vS7vv70F77+9GHfvv701fO+/ve+/vXhH77+977+977+9YO+/vR7vv73vv70KYu+/vVLvv73vv73vv73vv71M77+9W++/ve+/vWh1Bu+/ve+/vdGz77+9Vu+/ve+/vVfvv73vv70tFu+/ve+/ve+/vTot77+977+977+9ZO+/vTs077+9eHAP77+977+977+9R++/ve+/vdSk77+977+91axj77+977+977+9JO+/vWvvv73vv73vv71nZEjvv71GW3Dvv70aRFXvv73vv73vv70oHO+/ve+/ve+/ve+/vd2877+977+9Piho77+9Me+/ve+/ve+/vVDvv70677+977+9z4vvv73vv71S77+977+9AFXvv70+77+9Je+/vTp+77+977+977+977+977+9Ve+/ve+/vWfcse+/vdqLFVDvv73vv70g77+9cGBTa++/ve+/ve+/vQDamu+/ve+/ve+/vX/vv73vv71rX++/ve+/vV1GzbXvv70A77+977+9Zu+/vVd477+9bW47y4t777+9de+/ve+/vcW077+977+977+9du+/ve+/ve+/vRrvv71FdO+/ve+/vVZCQD9GKzk177+9Ikvvv73vv71L77+9Zu+/ve+/ve+/vXgE77+9ZFI2Agrvv70g77+9Nj7vv73Gv++/vRnvv71fwr4V77+977+9fATvv70a1K7vv73vv71J77+977+9AO+/vXRp77+977+9F++/vW1ubiTvv71uNO+/vUYdSe+/ve+/vV7vv70KQRXvv73vv71jFE7vv73vv70777+90IV8ee+/vXwF77+977+9aVbvv73vv73vv71I1a9nF++/vR3vv701CO+/ve+/vS3vv70vLzTvv73vv70ISXZ877+977+977+977+9P++/ve+/vWolGe+/vVXvv71jVwwc77+977+9A++/ve+/ve+/ve+/ve+/ve+/vTE177+977+977+9G0kcQe+/vWDvv71k77+977+9ce+/vSTvv73vv73dlVR1ZiAOSO+/vRXvv73vv73vv73vv70LfHPvv73ui6RqNu+/ve+/vSTvv73vv73vv71dOu+/vVbvv73vv71677+9N++/ve+/ve+/vTpv77+977+977+977+9W++/vT7dryR7WO+/ve+/ve+/vVvvv705PO+/vWMgMe+/vUnvv73vv70H77+9R++/vR/vv73vv73vv73vv73vv73vv70sZ++/vVbvv73vv73vv71Z77+9Z03vv71177+9dO+/vUrvv71RS0vvv73vv73vv73vv73vv73vv73vv73vv70977+977+9M0Tvv73vv70h2KVs77+9BO+/ve+/vQfvv70V77+977+977+9eC/vv73vv73vv73vv71m77+9bO+/ve+/ve+/vX3vv73vv73vv73vv71877+9a++/ve+/vVxFHu+/ve+/vc2977+9LO+/ve+/vUHvv70I77+977+977+977+9Fu+/ve+/vUhV77+977+977+9X3Hvv71X77+977+9AO+/ve+/vRXvv73vv70KWO+/ve+/ve+/vQhrO++/vS1u77+977+9XO+/vUbvv71b77+9CxES77+977+9dO+/vTHvv70mzI1lZyrvv73vv71877+9TO+/vSUAfXdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB++/ve+/ve+/ve+/ve+/ve+/vSgA77+977+9f1Tvv73vv73QtR1r77+977+977+9AO+/ve+/vSfvv73vv71s77+977+9Pu+/ve+/vTjvv70x77+9HHpW77+9cn4+77+9AO+/vRfvv71/77+9Ce+/ve+/vQDvv70PQB4/77+9AAvvv71Q77+9AO+/vXYf77+9GO+/ve+/vQAi77+977+9AAvvv71Q77+9AO+/vXYf77+9GO+/ve+/vQAi77+977+9HxN+K++/ve+/ve+/vT4z77+9PD/vv71o77+977+977+977+977+9Le+/ve+/vRPvv719I1zvv70477+977+977+9Re+/ve+/ve+/vSbvv70z77+9N++/vQLvv70jJVdz77+977+9EX7vv71/F++/ve+/ve+/ve+/vUMP77+9FO+/vVsKXjlsIe+/ve+/ve+/ve+/vUh077+9K++/vW3vv70DIO+/vWtPMu+/ve+/vS4hfhXvv71FCe+/vT9f77+977+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVo/77+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVrvv73vv73vv70A77+977+977+977+9N14f77+977+977+9bHA+77+977+9Se+/vR/vv70077+977+9be+/vW7vv71a77+9aSQR77+977+9JO+/vSzvv70x77+9QjPvv73vv717emfvv70R77+9X++/vUjvv70fB++/ve+/vVwLG++/vUHnna9g77+9Y2dlaXRs77+977+9Cu+/ve+/vVZb77+977+9cu+/vU3pu4Lvv70YB++/ve+/ve+/ve+/vQAL77+9UO+/vQDvv712H++/vRjvv73vv70AIu+/ve+/vQAL77+9UO+/vQDvv712H++/vRjvv73vv70AIu+/ve+/ve+/ve+/ve+/ve+/vS8S77+9Ae+/vT4raO+/vTNY77+9Xu+/vXF777+977+9Cu+/vV3vv73vv73vv71S77+9Vkli77+9BO+/ve+/vQTvv71877+9ADgc77+9Ne+/ve+/veKfju+/vX3vv703W9O177+9Re+/vXTvv70tMe+/vXp677+9Ku+/ve+/ve+/vXrvv73FuVnvv70k77+9O0EaOVjvv73HtdSB77+9ZgV2fu+/ve+/ve+/ve+/ve+/vXhj77+9PDsQWRQ4zqLvv73vv70M77+977+977+9Uu+/vQDvv73vv73vv70/77+9Xe+/ve+/vQAGLe+/vQDIte+/vT/vv73vv70A77+977+9JO+/vV3vv73vv71SfQNE77+92Y9T77+9YO+/vQFkeSPvv71VMCNU77+9Z3Lvv70AM0nvv712RSchfAte77+977+9PiRN77+977+9R0fvv73vv73vv73vv73vv73vv70rd2d277+9Ne+/vVvvv71g77+9OwgaVe+/vS3vv73vv71X77+9Ge+/vVDvv71277+9EHrvv73vv73vv73vv701D++/vRdh77+9AO+/ve+/vX/vv70tH++/vTUP77+9F2Hvv70A77+977+9f++/vS18N++/ve+/vQDvv73vv70k77+977+977+977+9C++/vVp277+977+977+977+9Eu+/ve+/vXcW77+9J3h077+9c27vv707XQto77+9YhJEWD5Uz5ki77+9K++/vX/vv73vv73vv73vv711d++/vWlaJ++/ve+/ve+/ve+/vQDvv71TT++/vXvvv71tbu+/vUjvv71dS03vv73vv71G77+9WOGYqe+/ve+/vUkDPBDvv73vv70ZZVbvv73vv70K77+977+9a++/vQDvv73vv71/0LsP77+9DFvvv70A77+9aO+/vQDvv73vv71/0LsP77+9DFvvv70A77+9a++/vWZv2rfvv71EOk7vv73vv71feBRpKWvvv71JbO+/vV7vv73vv70WJe+/ve+/ve+/veGgmjtk77+9Xzs2cce/Cu+/ve+/vRnvv70A77+9Zu+/vX/vv73vv73vv73vv73vv73vv71077+9BkEk77+9Ju+/vThh77+93a/Zje+/ve+/vWzvv73vv73vv70gKe+/vVwl77+977+977+9YyzKkDFg77+9Pu+/vXrvv73vv70f77+9NQ/vv70XYe+/vQDvv73vv71/77+9LR/vv701D++/vRdh77+9AO+/ve+/vX/vv70tfC/vv73vv73vv71377+9PH/vv73vv73vv71L77+9Du+/vW/vv71/77+9J3h0e++/ve+/vXdo77+9dSjlmaTvv70377+9AO+/vQ/vv70bWe+/ve+/ve+/vWcqce+/ve+/vRHvv73vv73vv70A77+9eu+/vTwt77+9K++/vTlsLe+/ve+/vQzvv73vv73vv71c77+9M13vv73vv73vv71W77+977+9UO+/vWsd77+9Vu+/ve+/vQwRbl3vv73vv71QCxDvv714K++/ve+/vUYv77+977+977+9IXXvv73vv71ABnTvv71Rbu+/ve+/vU/vv73vv73vv73vv73vv73vv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv70+LO+/ve+/ve+/vX4Q7aK57bWreFDErO+/vSfvv73vv711Bu+/ve+/ve+/vVV077+977+9FO+/ve+/vTBZcBhl77+977+9Z++/vQp877+9fu+/vT8WNe+/vS/vv73vv73vv70JA++/ve+/ve+/ve+/ve+/vQ/vv70177+9XmwWVu+/vVzvv73vv714V++/ve+/ve+/ve+/vQ/Pse+/vSnvv70aOu+/vVQPU++/ve+/ve+/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vS0f77+977+977+977+977+9a++/vXbvv73vv714Qh1GO++/vWpNKk1G77+9bmHvv73vv71V77+977+9ZEvvv73vv71kdEvvv73vv73vv73vv73vv73vv73vv71LSu+/ve+/veG/ih46T++/ve+/vX4iau+/ve+/vWo+K++/ve+/ve+/ve+/ve+/ve+/vWXvv71PPjvvv70TK8e3chjvv73vv71977+977+977+9yJlwCu+/ve+/vQjvv70A77+977+9f9C7D++/vQxb77+9AO+/vWjvv70A77+977+9f9C7D++/vQxb77+9AO+/vWvvv70PWO+/ve+/vX4v77+977+9dO+/vVoX77+97rSp77+90Y3vv71677+977+977+977+977+9OR/PihkE77+9JD5kYhxtdCzhhKw2Byzvv70AaC/vv706Ou+/ve+/ve+/vTfvv71l77+977+977+977+9I++/ve+/vRrvv70/K03vv73vv71BFAttbO+/vWXvv70oY++/vXfvv70Cdu+/vQPvv70OD1Pvv73vv73vv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv71f77+977+9HDXvv70a77+9U++/ve+/vQfvv73vv70wae+/ve+/vTDvv73vv71F77+9cO+/vSg077+9QSxjEjTvv73vv70Sfe+/vTbvv73vv73vv73vv70q77+977+977+9ZO+/vXrvv73vv70l77+9ATxT77+977+9c++/vV4Z77+977+9Wu+/vVl9HhLvv712Pu+/vVdT77+977+9Unvvv71YWjEc77+9eSPvv70s77+9XyHvv70MNwQDU++/vRvvv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv73vv73vv719CgdvDu+/vUFkTjUW77+977+9FH/Lr++/ve+/ve+/vQtf77+9E+Kuk211bXnhg6rvv71YQ++/vVzvv70S77+9du+/vXrvv71aXmrvv73vv70V77+977+9bFoVSFLvv70AfO+/vRnvv71ky7Pvv71p77+977+977+9R++/ve+/ve+/vQDvv73vv70D77+9xJ4i77+9Ru+/vXLaie+/vRFOUnjvv73vv70CTO+/vXPvv703TG9x77+9OGIoC++/ve+/vX/vv71fGu+/ve+/vQvvv73vv70A77+9xb/vv70W77+977+9Xxrvv73vv70L77+977+9AO+/vcW/77+9Fu+/vTZ+Knx+77+914Dvv71l77+977+9R0Hvv73vv73vv73vv71pemXvv73vv73vv73vv73vv71z77+977+9SR3vv71mAwPNiu+/vUdN77+9Cu+/vWXvv73vv714ec6z77+9WO+/vUzvv70h77+9aO+/vQReee+/ve+/vSbvv70+cT58du+/ve+/ve+/ve+/ve+/vQ5i77+977+9Ru+/ve+/vWQf77+977+977+9cu+/vXA1P1s/77+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVo/77+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVrvv73vv73HvjXvv71f77+977+9B2nvv71NZWVx77+977+9dWNpeu+/vRnvv73vv73vv71W77+9Ve+/vVvvv73Yhnbvv70Qcn5VJ++/vUrvv71I77+977+9CO+/ve+/ve+/vTfvv73vv73vv717V++/ve+/ve+/ve+/vdO0Z++/ve+/ve+/vQHvv73Llu+/vQbvv715DO+/vcaTOWJAAe+/ve+/vV3vv73vv73vv73vv70Fdn7vv71/77+977+977+9P++/vV3vv73vv70ABi3vv70AyLR/77+977+977+9P++/vV3vv73vv70ABi3vv70AyLXvv71fB++/vR/vv71mCu+/ve+/ve+/ve+/vW/vv73ooobvv73vv73vv71e77+977+9S++/ve+/vUMa77+9EO+/vV4377+9Ae+/vSrvv73vv73vv70q77+977+9Ne+/vX7vv73vv70AFu+/vW8Q77+977+9T++/vS10e++/ve+/ve+/ve+/ve+/ve+/ve+/vV7vv73vv73vv73FiO+/ve+/vSVE77+9Q++/ve+/vQLvv73vv73vv70C77+9a++/ve+/vXAPU++/ve+/ve+/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/ve+/ve+/vX0bxo3vv73YsysUGO+/vVvvv71S77+977+9AO+/ve+/vS1+TWnvv73vv73vv73Fux8K77+977+92qfvv73vv73vv70X77+977+977+977+9LhZxdi7vv73vv71J77+977+977+977+9OC3vv70zEh1CXe+/vQxq77+9YGDvv73vv710fTXvv73Hl++/vRLvv70K77+9eO+/vVHvv73vv73vv73vv719T1bvv71o77+9Eu+/ve+/vdOu77+9LO+/ve+/vcypKu+/ve+/vQBy77+977+977+977+9CBjvv70uz7Q/77+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVo/77+9fGof77+9Lu+/ve+/vQDvv70W77+9AO+/vVrvv73vv73vv71/77+9T++/vVceMe+/ve+/vX4S77+9LO+/ve+/ve+/ve+/vR3vv73vv73vv73vv70L77+9Jmtf77+9QRNNcO+/vdWt77+977+977+9OVnvv73vv70y77+9FT5d77+9O0Xvv71D77+9WHxI77+9by4vA++/vUnvv73vv73vv73vv73vv73vv73vv70Q3ptLW++/vQzvv71DeVnvv73vv71J77+9E++/vWczDEoiA1Pvv73vv73vv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv70XxqHvv70AQu+/vT/vv70xb++/vUXvv73vv70b77+977+9f++/vWbvv73vv73vv70277+9FO+/ve+/vTfvv71sF1Hvv71bQO+/ve+/vTl877+9EjFZ77+977+9FiZQVVgk77+9MD8s77+977+977+977+9D++/vT/vv73vv70i77+977+9J++/vSDvv70277+9NGk0W++/vRLvv71BHO+/vcm/ADTvv70l77+9IO+/vRlj77+9Swrvv70mVO+/vSvvv73vv73vv73vv71fGu+/ve+/vQvvv73vv70A77+9xb/vv70W77+977+9Xxrvv73vv70L77+977+9AO+/vcW/77+9Fu+/vSgT77+977+977+977+977+977+9UO+/vTfvv73vv71n77+9Bu+/vWpt77+977+9UGbvv73vv73vv73vv73vv73vv71B77+9ZEzvv73vv70sbe+/vQDvv71HUe+/ve+/vR/vv70D77+9be+/ve+/ve+/ve+/ve+/vUHvv73vv73vv70AJO+/vTd/aTbvv71baU7vv715ezfvv73vv70XC++/vd2RPnIbKA9T77+9C++/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/ve+/ve+/vX0EMk7vv70d77+977+9alzvv71RbO+/vUZ477+9AEXvv73Hrw9+77+9Hxls77+9Be+/vc+oeD3vv71F77+977+9XTBdajHvv70177+9LXc977+977+9S208bRQq77+9Zkjvv70fKDRj77+9UO+/ve+/vRUb77+9z4d+K++/vWfvv718Ie+/ve+/ve+/vSnvv70t77+917rvv73vv73vv73vv71tI0wt77+9bibvv70PP++/ve+/vQPvv71i77+9AmV277+9OTnvv701Pu+/ve+/vQDvv73vv71/0LsP77+9DFvvv70A77+9aO+/vQDvv73vv71/0LsP77+9DFvvv70A77+9a++/ve+/ve+/vU8d77+9G++/vdaR77+9aNaL77+9aO+/ve+/vX7vv70axaDvv73vv70177+91qbvv73vv73vv70m77+9JgJY77+977+977+977+9I++/ve+/ve+/vWPvv73Lr++/ve+/ve+/vVLvv71X06zvv71L77+9Q++/vTbvv71cau+/vR9NaktrYXRMBu+/ve+/ve+/ve+/vRjZpFRt77+977+977+977+9IFjvv70G77+9aXRg77+9YBrvv73vv70/77+9NQ/vv70XYe+/vQDvv73vv71/77+9LUUv77+977+977+9UDt4diILInHvv73vv71XYO+/ve+/vV19TX5mae+/vR9+J++/ve+/vRs/Cms+F++/ve+/ve+/vTrvv73vv70l77+9I1Dvv73vv73vv71cae+/ve+/vRjvv71lYTJHeu+/ve+/vSgR77+977+9KO+/ve+/vT7vv73vv71/77+977+977+9F++/ve+/vRHvv73vv73vv71d77+9cOqWum/vv70v77+977+9ce+/vSbvv73vv71RLO+/vXnvv73vv73vv71I77+9R0Pvv70sYCLvv70AAe+/vUDvv73vv70P77+9AO+/ve+/vX/Quw/vv70MW++/vQDvv71o77+9AO+/ve+/vX/Quw/vv70MW++/vQDvv71r77+9f++/vV/vv71/77+9Xhbvv71+77+977+9eFfvv70WWu+/ve+/ve+/vWXvv73vv73vv73vv71v77+9RO+/vW7vv71GOO+/vQrvv73vv70ARTbvv70HJklT77+9MO+/vQrvv73vv70H77+9alvvv71K77+9fDMk77+9fFfvv73vv71777+9cXkSahfvv73vv73vv70rbiPvv71YWS3vv73vv703JkVmKu+/vXFiQ1Aa77+977+977+977+9NQ/vv70XYe+/vQDvv73vv71/77+9LR/vv701D++/vRdh77+9AO+/ve+/vX/vv70tflDvv71377+977+977+977+9Pe+/ve+/vS3vv71g77+977+926Tvv70S77+977+977+977+977+9Le+/ve+/vUnvv70scCQiaX/vv70M77+9FVUA77+9T++/vQcJIO+/ve+/vX4j77+9diDvv70eDu+/ve+/ve+/vWMc77+9aXUd77+9ce+/vXcd77+977+9eXNv77+977+9FmR9OjhU77+977+977+9AE5wCBrvv73vv71f77+9NQ/vv70XYe+/vQDvv73vv71/77+9LR/vv701D++/vRdh77+9AO+/ve+/vX/vv70tfEHvv71f77+977+9LO+/vQfvv73vv71J77+977+977+9Re+/ve+/vVbQri5i77+977+9Fu+/ve+/vXQS77+9G++/ve+/ve+/vRHvv73vv73vv73vv71sSyEq77+977+9R++/ve+/ve+/vQDvv71H77+9bVLvv71K77+977+977+9HO+/vc+o77+977+9KW8RW++/vQ7vv70sZe+/ve+/ve+/vSzvv73vv71f77+9fe+/vVDvv70w77+9Mh9gF2fvv73vv70v77+9Q++/ve+/ve+/vX/vv71i77+977+977+9R++/vS/vv71D77+977+977+9f++/vWLvv73vv73vv71f77+977+9CO+/ve+/ve+/ve+/vVvvv70+77+9UO+/ve+/vVTvv73Unu+/ve+/vQrvv73vv73vv73vv73vv73vv73vv73vv73vv70077+9Z++/vVlP77+977+9Ez8OFxvvv73vv70BXu+/ve+/ve+/vSnvv73vv70ZeO+/vcOeE++/vXw3Bu+/ve+/ve+/vSLvv70c77+977+9z43GkO+/ve+/vcqO77+9LAYjMzQK77+977+977+977+9Ee+/vQBqfu+/vX/vv73vv73vv70/77+9Xe+/ve+/vQAGLe+/vQDItH/vv73vv73vv70/77+9Xe+/ve+/vQAGLe+/vQDIte+/ve+/ve+/vTfvv73vv73vv71/77+977+9Z++/vW8KeHfvv73vv73vv73vv73vv71s77+9eO+/ve+/ve+/vUtd77+9Tu+/vXHvv70JT++/vRtEIUlgSFxu77+9TO+/ve+/vTbvv73vv73vv71+NnxW07xVL++/vTXvv70a77+9fO+/ve+/vVt977+9ZO+/vXs/LW3vv73vv70Wdi1pYtKz77+977+977+9RXnVue+/ve+/ve+/vQHvv71BXe+/ve+/vRN8fe+/ve+/vRknfw7vv71WNS5x77+977+9cO+/vTx/77+91L/vv701D++/vRdh77+9AO+/ve+/vX/vv70tfn/vv70X77+977+977+977+9AO+/ve+/vSfvv70u77+9Ve+/vWl8M++/ve+/ve+/vSBJWO+/vSZU77+9zIJAScS277+9AHPvv73vv71477+9F++/vV8UPjV477+977+977+9ABHvv73vv70E77+9Te+/ve+/ve+/ve+/ve+/vTdvGe+/vUHvv73vv71d77+9C2Tvv70A77+9N++/vUxR77+977+977+9CBtjYe+/ve+/vSg777+977+9F++/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vS0f77+977+977+977+9z6ZYH++/vXB977+9Ve+/ve+/ve+/vXAi77+9Ou+/vV5rKe6jjO+/ve+/vV8pJEkE77+977+977+9Xl/vv73vv71F77+977+9X++/ve+/vcSU77+977+93YPvv70y77+9aVrvv73vv71td2Lvv73vv70z77+9e1hefXDvv73vv70W77+9cO+/vTfvv73vv73vv70m77+977+9NGnvv70BQ2RKBu+/ve+/ve+/vQDvv70v77+9Q++/ve+/ve+/vX/vv71i77+977+977+9R++/vS/vv71D77+977+977+9f++/vWLvv73vv73vv71f77+9Wu+/ve+/vT/jqKLvv73vv73vv73vv71b77+977+9dlDvv71Pc2l477+9Ce+/vVXvv73vv71L77+977+9SSFI77+9LO+/ve+/vU0hzJHvv70w77+977+9GhZ177+9S++/ve+/ve+/vSvvv73vv70/77+9fG3vv73vv73vv73vv73vv70r77+9EtmsLxZo77+91bVb77+9YO+/vUkUL++/vRIRIe+/ve+/ve+/vUdcc0Dvv73Pun/vv718ah/vv70u77+977+9AO+/vRbvv70A77+9Wj/vv718ah/vv70u77+977+9AO+/vRbvv70A77+9Wu+/ve+/ve+/ve+/ve+/ve+/ve+/vRbvv73vv70fBB/vv73vv73vv73vv73vv73Lu++/vRXvv70k77+9Mwk877+9BGvvv73vv70FHO+/vTsWBu+/ve+/vR/vv73vv70AGm0v77+9NO+/ve+/vSNP77+977+9LXJLWe+/ve+/ve+/ve+/ve+/ve+/ve+/vV/vv71YXDTvv73Qs++/vTN5STo0ZDLvv71X77+977+9Ae+/vX7vv73vv70A77+977+977+9P++/vV3vv73vv70ABi3vv70AyLR/77+977+977+9P++/vV3vv73vv70ABi3vv70AyLXvv709D++/vUvvv71m77+9Se+/ve+/veGstu+/vSbvv71heO+/ve+/vTzJme+/veGzk3k7PO+/vSPMuXh/77+9Blbvv70k77+977+9Gibvv73vv71E77+9U++/vVDvv73vv73dju+/vWvvv73vv70rXO+/vdOvLjTvv71ubloE77+977+9NO+/vVvvv71177+9B++/ve+/vXkF77+977+9x7Tvv70QRu+/vTkE77+9Bu+/ve+/vRfvv70v77+9Q++/ve+/ve+/vX/vv71i77+977+977+9UUvvv73vv73vv70UDu+/vR3vv73vv73InGot77+977+9KO+/vQDvv71fU1/vv73vv73vv73Uvxfvv73vv73vv73vv71Da++/vTHvv71LU++/ve+/ve+/vTFb77+977+9Mu+/vVHvv71bRRvvv70w77+977+9YyRk77+977+9KEHvv70cGO+/ve+/ve+/vQAL77+9be+/ve+/vUHvv70K77+977+9fEPvv71/ZF1LfO+/vQjvv73vv73vv73vv70K77+9RO+/vT5n77+9yKM4Du+/vRzvv71g77+9Ls+z77+9AO+/vXxqH++/vS7vv73vv70A77+9Fu+/vQDvv71aP++/vXxqH++/vS7vv73vv70A77+9Fu+/vQDvv71a77+977+977+977+977+977+9P++/ve+/vVnvv71p77+9L++/ve+/vVvvv70077+9be+/vTDvv73vv73vv71cXDbvv71177+977+9UO+/vTp5QktRA2NzFu+/vW0b77+9Vu+/vTwj77+9O++/vTrvv73vv71df++/vVcaKO+/ve+/ve+/vc6kLO+/ve+/vQTvv70e77+9LO+/ve+/vU9oJ0EoWe+/ve+/vWvvv71v77+9HBYY77+9K++/ve+/vR/vv71fGu+/ve+/vQvvv73vv70A77+9xb/vv70W77+977+9Xxrvv73vv70L77+977+9AO+/vcW/77+9Fu+/vTQ+H++/vVjvv73vv73vv73vv70A77+977+9G++/ve+/ve+/ve+/vU7vv73vv71F77+9SX0977+977+977+9Z++/ve+/ve+/ve+/vU0wbO+/ve+/vSXvv70k77+9XUJI77+9Xe+/veW2k++/vSoKVm/vv71+PHxM77+9V++/vR/vv70aMnhu77+9Wu+/vTTvv71L77+9ClEJ77+9O++/ve+/ve+/vSTvv73vv700SDPvv70177+977+9Ujzvv713IjRx77+977+977+9A++/vT9Qf++/vXxqH++/vS7vv73vv70A77+9Fu+/vQDvv71a77+977+9fe+/vRMsB8OxbnVnH++/vTFsYUrvv73vv70ALu+/ve+/vQrvv73vv73vv73vv73vv70+KE7vv71ifBEEeu+/ve+/vRXPiO+/vTTvv73vv70tYWzvv70W77+977+977+977+9ESTvv71JA++/veSvkTbvv73vv70p77+977+977+977+9We+/vS1H77+977+9EO+/ve+/vVvvv71YNu+/vXd9Be+/vdmU77+977+9Bc+SGALvv70277+9QO+/vVXvv70K77+9KO+/vTEC77+977+9E++/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vRfGoe+/vQBC77+9P++/vTFv77+9Re+/ve+/vRvvv73vv71b77+9Ne+/ve+/vXV/77+9AAjvv73vv71M77+9M++/ve+/vSR677+9azbvv70r77+9Wyvvv71Z77+9a++/ve+/ve+/vTjvv70w77+977+9aUbvv70Z77+9zotN77+977+977+9Kljvv73Zuu+/ve+/vWXvv73vv71O77+9cxwx77+977+9NHcvay7vv70l77+977+977+977+9B++/vU7vv71sBe+/ve+/vSt877+9YO+/ve+/ve+/vQHvv73vv73vv70v77+977+977+9UDt4diILInHvv73vv71XYO+/ve+/vV19TUvvv70AC++/vVDvv70A77+9dh/vv70Y77+977+9ACLvv73vv70fD3xB77+9bxbvv70577+9PFXvv73vv70bbTdR77+9IO+/ve+/vWs7Zu+/ve+/ve+/vS5MciRuZVVvMRXvv73vv70ABu+/vRnvv71fP++/vV3vv73vv718be+/vRLvv73vv73vv73vv70W77+9Fu+/vV0fTe+/ve+/vWs177+9TUlkfR7vv73vv70uUDQTWu+/vWhSIu+/vStuaVfvv708I++/vXZ+77+977+9AO+/ve+/ve+/vT/vv71d77+977+9AAYt77+9AMi0f++/ve+/ve+/vT/vv71d77+977+9AAYt77+9AMi177+9O++/ve+/vRvvv70MOnzvv73vv73vv718Me+/ve+/ve+/vS9d77+9PO+/vUXvv703Ju+/vVtYf++/vSMx3LzWgu+/vXzvv73vv73vv73vv71a77+9Qybvv70K77+977+977+977+977+977+977+977+9AO+/vWbvv71l77+977+9Fu+/vV1G77+9R++/vXXvv712aA7vv73vv73vv71zeGLvv73vv73vv71fWe+/ve+/ve+/ve+/vSHvv73vv73vv71Q77+977+977+92Y3vv70q77+9QGp+77+9f++/ve+/ve+/vT/vv71d77+977+9AAYt77+9AMi0f++/ve+/ve+/vT/vv71d77+977+9AAYt77+9AMi177+9I++/ve+/vWvvv73vv71dae+/ve+/vRfvv73vv73vv71X77+977+9Yu+/ve+/vU/vv70y77+977+977+977+9Ne+/ve+/ve+/ve+/ve+/ve+/vRZPLFnvv715Cyzvv73vv73vv73ajA/vv73vv71kP++/ve+/ve+/vT1dbXxHZe+/ve+/ve+/vU0+77+9V++/ve+/ve+/vW4SQ++/ve+/ve+/ve+/vWUo77+93LHvv73vv713Ae+/vVjvv73vv70HLe+/ve+/vUrvv70Aan7vv73vv70A77+977+977+9P++/vV3vv73vv70ABi3vv70AyLR/77+977+977+9P++/vV3vv73vv70ABi3vv70AyLXvv70x77+9H++/ve+/vRbvv73vv70577+9TTtM77+9GgpK77+9Te+/vTXGn3d5bTzvv73vv70zWu+/vWsx77+9Ne+/vXbvv70tau+/vWrvv71W77+977+9UO+/vSoHcu+/vTTvv73vv73vv73vv73vv73vjLx977+9LxLvv71r77+9Hhfvv71H77+977+977+9WOG7kO+/ve+/vTQ3DwLvv71f77+9eO+/vQTvv70QBGwA77+9YFdn656B77+9f25oWnbvv73vv715H++/vRbvv71deVvvv73vv73vv71fbu+/vQzvv70477+9Bn0rWu+/vT8A77+9AMiL77+977+977+9BO+/ve+/vQDohK7vv73vv73vv73vv70o77+9D++/ve+/ve+/ve+/ve+/ve+/vSgA77+9T++/ve+/ve+/vSLvv73vv73vv73vv70377+977+9Ieusrk/vv73vv73vv70i77+977+977+977+9N++/ve+/vSHvv70D77+9b++/vVc/FO+/vQDvv71u77+977+9AO+/vRPvv71f77+977+977+977+9Fe+/ve+/vT/vv70b77+9P++/vQDvv73vv73vv73vv70ALmvvv71o77+9LO+/ve+/vS8+B++/ve+/vVHWrO+/vUnvv71q77+9EO+/vdW077+9KWd/N++/ve+/ve+/ve+/vVs5EUzauXQHJyFI77+9a0rvv70A77+9T++/vU1W77+977+9TO+/vTxL77+977+9O++/ve+/vRvvv71777+9DO+/vUsM77+9SArvv706Nu+/vVXvv73vv73vv70EEEda77+9Fu+/vQLvv73Nke+/vRXvv71XFu+/ve+/vWs+Eknvv70RIu+/ve+/vXwpMHjvv73vv71tRUYa77+9VVV4ABAA77+9Vu+/ve+/vSvvv73vv71/77+9N3h/77+9AAnLr++/vVzXvO+/vUBY77+9f++/ve+/vQfvv70o77+977+977+934Xvv71k77+9M++/vSzvv71e77+9dO+/vUxbHwrvv71MYBfvv73vv73vv73vv70/77+9U37vv73vv713bF3vv73vv70HSu+/vX/vv71+Ke+/vQDvv73vv73vv73vv70A77+9Je+/ve+/ve+/vXle77+977+9Pe+/vQDvv70C77+9ae+/vQBifu+/ve+/vQDvv70QV++/ve+/vRY+LO+/ve+/ve+/ve+/vXNheTbvv71j77+977+9Cu+/ve+/vVxuM08X77+9J0lk77+9dzbvv71daDNl77+9OTzvv71rU++/vRnvv73vv73vv70P77+9H++/vQDvv71a77+977+9AO+/ve+/ve+/ve+/vRQF77+977+977+9Qe+/vSl477+9xZZL77+977+977+977+977+9Ee+/vW0SVe+/vWDvv708Gy3vv71LKu+/vRXvv71L77+9Mu+/vQDvv70cZGTvv73vv73vv73vv73vv70AFFFCJ++/ve+/vTzvv73vv70AB++/ve+/vUAAdh/vv70777+977+9aO+/vSx8OD9k77+9Ei3vv73Yl++/vR4KFu+/vXTvv70+SO+/vVzvv71f77+9Oe+/vSzvv71/77+9ce+/vUbvv70ZY++/vSbvv70x77+9PHxSUBV8ee+/ve+/vQcADwtdYA/vv70d77+977+9FFAHxL4f77+9Ee+/vUdS77+977+977+9fHHvv71EEu+/ve+/vQrvv73vv70XTe+/vW91LCXvv73vv73vv73vv71477+977+9Y++/ve+/vScZOu+/vT/vv73vv73Eq++/vWls77+9PHHvv73vv73vv73vv70aKWLvv73Cly7vv70j77+9Mu+/ve+/vWzvv73vv70OCDwRX014L++/vUDvv70f77+9Fu+/vX/vv73vv71zXWUBY++/vQvvv71Z77+977+977+977+977+9Ne+/vQppNhEWZO+/ve+/ve+/vXzvv73vv70pc++/vSI477+977+9UEnvv73vv71yakPvv70veO+/ve+/vUNaPi3vv73vv73vv73vv71377+9AAjvv73vv71477+9dn/vv73vv73vv73vv73vv71+Xu+/vTjvv71fae+/vUAfIH/vv70877+9U++/vQDvv73vv73vv73vv70A77+9S11/77+977+977+9Z++/ve+/vX/vv70+77+9f++/vQAJa++/ve+/vV5X77+977+9UBZH77+9Y++/vTzvv71W77+977+9UV1r77+9Iu+/vVPvv71Nezjvv71D77+977+9Mi5w77+9P++/ve+/ve+/vRhuOCxJGT7vv73vv73vv71+77+9Xj3vv71ga10b77+977+9F++/ve+/ve+/ve+/ve+/ve+/vXhGeFDvv73vv73vv70VTWgC77+9Ayfvv73vv71977+9RQB877+977+9AAzvv73vv71P77+977+977+9D++/vQDvv70tde+/vQDvv73vv73vv73vv70H77+977+977+9Om3vv71XCu+/vQJQ77+977+9EG0eGO+/vVwb77+977+977+9Cu+/ve+/ve+/ve+/ve+/ve+/vWMc77+9GRnvv73vv71q77+9Pxp/77+9Hu+/ve+/ve+/ve+/vTfvv73vv71t77+9Cx8tW++/ve+/vV4977+977+9bu+/vXtfF++/vV4b77+977+9Gu+/ve+/vUfvv70Z77+9e++/vQgrGO+/vUHvv70GcO+/ve+/ve+/ve+/ve+/vQ8V77+977+9AAzvv73vv71P77+977+977+9D++/vQDvv70tde+/vQDvv73vv73vv73vv73vv70C77+9xZB+77+977+9Oe+/ve+/ve+/vVXvv73vv71v77+9Ye+/ve+/vSJL77+977+9ITrvv73vv73vv70nc++/vWgx77+9Azk0al/vv73vv73vv71177+9GO+/vTxb77+9W++/vRZ877+9c++/vQnvv73Zuxnbv1o477+9BnHvv71fae+/vUAfIH/vv70877+9U++/vQDvv73vv73vv73vv70A77+9S11/77+977+977+9Z++/ve+/vX/vv70+77+9f++/vQAJa++/ve+/vV5X77+977+9UBZH77+9Ou+/ve+/ve+/ve+/ve+/vXNP77+9Sda8Y++/vULvv73vv70Mc++/vV14Snnvv73vv70PVXjvv71bKu+/ve+/vRBFYh/vv73vv73HvhgeH++/vXR/Fu+/vWbvv73vv71L77+977+977+977+977+977+977+977+9W++/ve+/ve+/vU3vv73Gmu+/vd2/77+9I2jvv73vv71nPGDvv73vv71c77+977+977+9AO+/vTHvv71v77+9C0vvv70A77+977+977+9AO+/ve+/ve+/vRnvv73vv73vv70P77+9H++/vQDvv71a77+977+9AO+/ve+/vX/vv70877+9U++/vQDvv73vv73vv73vv70A77+9S11/77+97aq77b+i77+977+9PkDvv70A77+9ee+/ve+/ve+/vQBD77+977+9AO+/ve+/vQDvv73vv71l77+9P++/ve+/ve+/vXXvv73vv73vv71vFu+/vVbvv73vv73vv70R77+977+977+977+977+9Yzt377+9Rxnvv73vv709BX3vv71FAWPvv70P77+9Z++/ve+/vX/vv70+77+9f++/vQAJa++/ve+/vV5R77+9AAzvv73vv71P77+977+977+9D++/vQDvv70tde+/vQDvv73vv73vv73vv73vv70C77+977+9A++/vRnvv73vv73vv70P77+9H++/vQDvv71a77+977+9AO+/ve+/ve+/ve+/vV/vv70fFHTvv70Oau+/ve+/ve+/ve+/vUDvv71s77+9JzHvv70MXSFxFGzvv71Df20277+977+9Ge+/vceh77+977+977+977+977+977+977+977+977+9I++/vQDvv71N77+977+977+9egLvv73Nn++/ve+/vT8U77+9AO+/vX3vv73vv70A77+9Eu+/vV/vv73vv73vv73vv70Z77+977+977+9D++/vR/vv70A77+9Wu+/ve+/vQDvv73vv73vv73vv70UBe+/ve+/vQfvv70z77+977+9P++/vR98P++/vQDvv73vv73vv73vv70ALysT77+9HwI+KO+/vRFcN++/vTQJQ++/ve+/vUHvv714Yu+/vXBuLu+/ve+/vTZ/77+977+977+93Yxz77+9ZGcj77+977+977+977+9ae+/vQAge3/vv70LaO+/ve+/vXHvv73vv70sfO+/ve+/vQAM77+977+9T++/ve+/ve+/vQ/vv70A77+9LXXvv70A77+977+9P++/vX4p77+9AO+/ve+/ve+/ve+/vQDvv70l77+977+977+9eV9f77+9QFkfIH/vv70877+9U++/vQDvv73vv73vv73vv70A77+9S11/77+977+977+9Z++/ve+/vX/vv70+77+9f++/vQAJa++/ve+/vV5X77+977+9UBZHxZdf77+977+977+9b++/vSHvv71vfFvvv71b77+977+9fe+/vUzvv73vv71Cd++/vT3vv71y77+9dtaLLhvvv73vv70wee+/vU/vv71n77+977+9f++/vT7vv71/77+9AAlr77+977+9Xlfvv73vv71QFj5A77+9AO+/vXnvv73vv73vv70AQ++/ve+/vQDvv73vv70A77+977+9cu+/vT/vv70e77+9e++/vc+v77+9a++/vQzvv71U77+977+9W++/vXsv77+977+9e++/vWFcERvvv71177+977+9aMKSQO+/ve+/ve+/ve+/ve+/vQLvv73vv706X++/ve+/vW0Q77+9dF8V77+9U083BUzvv73vv73vv73vv71D77+9FO+/vV3vv70177+93YBOM9K177+9AO+/vX4p77+9AO+/ve+/ve+/ve+/vQDvv70l77+977+977+9eV9f77+9QFjvv73vv73EvwI+KO+/vV4c77+9dUfvv73GgTLvv73vv71cTmMeGO+/vULvv70o2bbvv73vv73vv71t77+977+9M++/ve+/vUNX77+9AO+/vX4h77+977+977+977+977+9Z++/ve+/vRFubn/vv70T77+977+977+977+9e++/vQDvv73vv71s77+9d23vv70z77+9M19P77+977+977+9RF8R77+9AO+/vSbvv73vv70ARD1177+9Be+/ve+/vT/vv71+Ke+/vQDvv73vv73vv73vv70A77+9Je+/ve+/ve+/vXlH77+9M++/ve+/vT/vv70ffD/vv70A77+977+977+977+9AC8r77+977+9KAsj77+9D++/vWfvv73vv71/77+9Pu+/vX/vv70ACWvvv73vv71eVlxf77+977+977+9YO+/vR9W77+9xb4V77+977+9XO+/ve+/vU8ITu+/vTZ677+9Qe+/vW4577+9c19p77+9QFjvv70D77+9Ge+/ve+/ve+/vQ/vv70f77+9AO+/vVrvv73vv70A77+977+9f++/vTzvv71T77+9AO+/ve+/ve+/ve+/vQDvv71LXX/vv73tqrvtv6Lvv73vv70+QO+/vQDvv71577+977+977+9AEPvv73vv70A77+977+9AO+/ve+/vVPvv73vv73vv71+Ie+/ve+/vWHvv73vv73vv73vv70277+977+9Z++/ve+/ve+/ve+/ve+/vX5k77+9cu+/vT7vv71sbnY/ee+/vSfvv73vv73vv73vv70s77+977+9P++/vX4p77+9AO+/ve+/ve+/ve+/vQDvv70l77+977+977+9eVjvv70g77+9Ee+/vUdN77+977+977+9ce+/vUoe77+977+9Cu+/ve+/vRdL77+9cXUUIe+/ve+/ve+/ve+/vXTvv73vv71j77+9YyM5H21XJ++/vU/vv70D77+977+9AO+/vVtG77+9ANON77+9AWPvv73vv73vv71n77+977+9f++/vT7vv71/77+9AAlr77+977+9XlZd77+977+977+977+977+9O++/vRbvv71We++/vTbvv73vv70k77+977+977+9NHtJZe+/ve+/vVos77+9JO+/ve+/ve+/vTXvv73vv70UBe+/ve+/vS/vv71m77+977+977+977+977+9We+/vX4077+977+93bvvv71aKe+/vSdxIhIORlXvv73vv70ODyPvv71977+977+977+977+9Iu+/ve+/vSzvv718be+/vXgiGEjvv73vv73vv70i77+977+9Cu+/ve+/vQPvv70V77+9RRQF77+977+977+977+977+977+9e2/vv71ca1bvv70v77+9Wu+/ve+/vUcV77+977+9eEZ177+9aO+/vc+W77+9SDXvv73Mqe+/ve+/vRJA77+977+9Vu+/ve+/vUfvv70Y77+9R2Pvv73vv70caAXvv70s77+9ZxJ/77+9MXQC77+9JO+/vVLvv71/77+977+977+95oOc77+9be+/vXPvv73vv71V77+977+9f++/ve+/ve+/vX/vv70nVe+/vQDvv73vv70UBe+/ve+/vT/vv71+Ke+/vQDvv73vv73vv73vv70A77+9Je+/ve+/ve+/vXlH77+9M++/ve+/vT/vv70ffD/vv70A77+977+977+977+9AC8r77+977+9KAsj77+9XxB8CO+/ve+/ve+/ve+/vUVw77+9OO+/vSUPe2EG77+94Yul77+977+977+977+9EO+/ve+/ve+/vW/vv71fdjHvv70x77+977+977+977+9fu+/vT8Q77+977+977+9b++/ve+/vWfhmK5vChvvv73vv73vv713CyTvv7012p5jCm8v77+9eFzvv73vv73vv73vv73vv73vv71p77+9ACB7f++/vQto77+977+9ce+/ve+/ve+/ve+/ve+/ve+/vQfvv70z77+977+9P++/vR98P++/vQDvv73vv73vv73vv70ALyrvv73vv70A77+977+977+9F1Tvv73vv73vv701Pxp4au+/ve+/ve+/vSfvv73vv73vv71/Ce+/vUsU77+9SArvv706Nu+/vVXvv73vv73vv73vv71BBBwa77+9Ku+/vQLvv73vv73vv71/Z++/ve+/vSrvv71Xx54fAAwAPC10AAPvv73vv71077+977+9Z++/ve+/vX/vv70+77+9f++/vQAJa++/ve+/vV5X77+977+9UBZH77+9H++/ve+/vT8U77+9AO+/vX3vv73vv70A77+9Eu+/vV/vv73vv73vv73vv70Z77+977+977+9D++/vR/vv70A77+9Wu+/ve+/vQDvv73vv73vv73vv70UBe+/ve+/ve+/vQfvv71EXw5/77+9Ju+/ve+/vQBEJXXvv73vv73vv70H77+9RF8Of++/vSbvv73vv70ARCV177+9AFFFFAHvv73vv73vv73vv73vv73vv70oAO+/vU/vv73vv73vv70i77+977+977+977+9N++/ve+/vSHrrK5P77+977+977+9Iu+/ve+/ve+/ve+/vTfvv73vv70h77+9A++/vT7vv73vv70/77+977+977+977+9AO+/vSk/77+9Ku+/ve+/ve+/ve+/ve+/vX/vv73vv73vv70KT++/vUrvv73vv70oAxPvv73vv70j77+9AO+/ve+/vS/vv70C77+977+9AO+/ve+/ve+/vT/vv73vv70A77+977+977+977+9AADvv73vv70A77+926Lvv70xPu+/ve+/vT/vv73vv73vv73vv70A77+9KT/vv70q77+977+977+977+977+9f++/ve+/ve+/vQpP77+9Su+/ve+/vSgCb++/vVbvv70zb++/vV8OWu+/vVTvv70j77+977+9S0Mx77+977+9bO+/vTrvv73vv71h77+9Ge+/ve+/vQYgdSFUE++/vQdK77+977+977+977+977+977+977+977+9T++/vQrvv73vv70A77+977+977+9P2fvv73vv70gXwo/77+9T++/vX/vv70K77+977+9AO+/ve+/ve+/ve+/ve+/vQvvv70/77+9Ku+/ve+/vQDvv73vv73vv70f77+977+977+9L++/ve+/vQDvv71/77+9T++/ve+/ve+/vQDvv73vv73vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv73vv70A77+977+977+977+977+9C++/vT/vv70q77+977+9AO+/ve+/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+977+977+9AO+/ve+/vQjvv714zbTvv73Ntu+/ve+/vSJ/ae+/ve+/ve+/ve+/vWZz77+9X++/vQc5F++/ve+/vTZK77+9ZUEA77+9I3Hvv73vv73vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+9X++/ve+/ve+/vT/vv70t77+977+9AO+/ve+/ve+/ve+/vQDvv73vv73vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv73vv70A77+977+977+977+977+9C++/vT/vv70q77+977+9AO+/ve+/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+977+977+9AO+/ve+/ve+/ve+/ve+/vQvvv70/77+9Ku+/ve+/vQDvv73vv73vv70f77+977+977+9L++/ve+/vQDvv71/77+9T++/ve+/ve+/vQDvv73vv73vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+9de+/ve+/ve+/vUrvv73vv73vv71j77+977+977+977+9AE02ZDvvv73vv73vv71D77+9eu+/vStg77+977+9WAIBUncPU++/vU/Gn++/vQfvv73vv70A77+977+977+977+9AO+/vRtqAD7vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv73vv70A77+977+977+977+977+9C++/vT/vv70q77+977+9AO+/ve+/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+977+977+9AO+/ve+/ve+/ve+/ve+/vQvvv70/77+9Ku+/ve+/vQDvv73vv73vv70f77+977+977+9L++/ve+/vQDvv71/77+9T++/ve+/ve+/vQDvv73vv73vv73vv73vv70L77+9P++/vSrvv73vv70A77+977+977+977+9PGY1Xwrvv73vv71NMe+/ve+/vXII77+977+9KFfvv70F77+9Je+/ve+/vW3vv71u77+9VOSDnALvv73vv73vv73vv70f77+977+9PC3vv70AYWl/77+977+9e0AH77+977+9de+/vQBBfSfvv70ABVPvv70A77+9fR9j77+977+977+9Be+/ve+/ve+/vRVP77+9AO+/ve+/ve+/vVFAHO+/ve+/ve+/vXXvv70AQX0n77+9AAVT77+9AO+/vX0fY++/ve+/ve+/vQXvv73vv73vv70VT++/vQDvv73vv73vv71RQBzvv73vv73vv71177+9AEF9J++/vQAFU++/vQDvv719H2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+977+9UUAc77+977+977+9de+/vQBBfSfvv70ABVPvv70A77+9fXMeNu+/ve+/ve+/vTNea++/vVNM77+9Ee+/vV4ZEj02aN2T77+9fe+/vVjeuFJHQlXvv70877+977+977+9U++/vU/vv73vv73vv70i77+977+977+977+9N++/ve+/vSHvv70A77+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv71+Ou+/vQDvv73vv73vv73vv70A77+977+977+9AO+/vT7vv73vv70oA++/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+9Y++/vdaeM10qA3Pvv71p77+977+977+9ekgBNNmQ77+9N++/ve+/vQ5N77+9cO+/ve+/ve+/vRlgCAVJ77+9PU7vv70/Gn/vv70e77+977+977+977+9N++/ve+/vW3vv70A77+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv71+Ou+/vQDvv73vv73vv73vv70A77+977+977+9AO+/vT7vv73vv70oA++/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+977+9fjrvv70A77+977+977+977+9AO+/ve+/ve+/vQDvv70+77+977+9KAPvv73vv70f77+977+977+9L++/ve+/vQDvv71/77+9T++/ve+/vX4677+9AO+/ve+/ve+/ve+/vQDvv73vv73vv70A77+9Pu+/ve+/vSgD77+977+9H++/ve+/ve+/vS/vv73vv70A77+9f++/vU/vv73vv71+Ou+/vQDvv73vv73vv73vv70A77+977+977+9AO+/vT7vv73vv70oA++/ve+/vR/vv73vv73vv70v77+977+9AO+/vX/vv71P77+977+9fjrvv70A77+977+977+977+9AO+/ve+/ve+/vQDvv70+77+977+9KAPvv708bWnvv70177+9Zu+/ve+/vVrvv73vv70kI0zvv70yJHps0bsn77+977+977+977+977+9cO+/ve+/ve+/ve+/vQB577+977+9XT/vv73vv71177+9AEF9J++/vQAFU++/vQDvv719Hj7vv70A77+9F++/vX/vv70J77+977+9AO+/vQ9dZQByf2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+9fe+/ve+/vV/vv70X77+9f++/vVU/77+9ACfvv71ZRQByf2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+9fe+/ve+/vV/vv70X77+9f++/vVU/77+9ACfvv71ZRQByf2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+9fe+/ve+/vV/vv70X77+9f++/vVU/77+9ACfvv71ZRQByf2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+9fe+/ve+/vV/vv70X77+9f++/vVU/77+9ACfvv71ZRQByf2Pvv73vv73vv70F77+977+977+9FU/vv70A77+977+977+9eO+/ve+/ve+/vWvvv71AbnVNMe+/ve+/vU9JACbvv70yHe+/ve+/ve+/vSHJvW4V77+9WGMsAQDvv70777+977+977+9J++/vU/vv70D77+977+9AO+/vVtG77+9ANON77+9AB9j77+977+977+9Be+/ve+/ve+/vRVP77+9AO+/ve+/vX3vv73vv71f77+9F++/vX/vv71VP++/vQAn77+9WUUAcn9j77+977+977+9Be+/ve+/ve+/vRVP77+9AO+/ve+/vX3vv73vv71f77+9F++/vX/vv71VP++/vQAn77+9WUUAcn9j77+977+977+9Be+/ve+/ve+/vRVP77+9AO+/ve+/ve+/vV3vv71477+977+9Ez0tW1Tvv70M77+9TNSKOO+/vWYIEE1l77+9Fe+/vWkk77+9VwdwAAIIOQV9Tu+/vTvvv73vv70e77+977+977+9BO+/ve+/vT7CgA/vv73vv73vv73vv73vv73vv71P77+9Cu+/ve+/vQDvv73vv70+77+977+977+9C++/vT/vv70q77+977+9AO+/veusou+/vTzvv73vv73WnjNdKgNz77+9ae+/ve+/ve+/vXpIATTZkO+/vTfvv73vv70OTe+/vXDvv73vv73vv70ZYAgFSe+/vTp/77+977+977+977+977+977+9T++/vQrvv73vv70A77+977+9PGnvv70AIHt/77+9C2jvv73vv71x77+977+977+977+9OT/vv73vv73vv73vv73vv73vv71P77+9Cu+/ve+/vQDvv73vv70+77+977+977+9C++/vT/vv70q77+977+9AO+/veusou+/vTk/77+977+977+977+977+977+9T++/vQrvv73vv70A77+977+9Pu+/ve+/ve+/vQvvv70/77+9Ku+/ve+/vQDvv73rrKLvv705P++/ve+/ve+/ve+/ve+/ve+/vU/vv70K77+977+9AO+/ve+/vT7vv73vv73vv70L77+9P++/vSrvv73vv70A77+966yi77+9OT8A77+9AMiL77+977+977+9BO+/ve+/vQDohK7vv73vv70/AO+/vQDIi++/ve+/ve+/vQTvv73vv70A6ISu77+977+9Cijvv73vv70/77+977+977+977+977+977+9KADvv73vv71fTO+/vVrvv71vdHvvv71077+977+977+9W2kaMgPvv73vv70KMVJBAO+/vXjvv70jPe+/vUbvv70A77+9D++/vVXvv73vv70A77+9H9W/Ky/vv71E77+977+9FX3vv73vv70H77+9b++/ve+/ve+/vQDvv70r77+977+9DzDvv70A77+9X2/vv70AQe+/vVvvv73vv70A77+9Sj/vv71X77+977+9AO+/vX9W77+977+977+977+9Eu+/vT7vv70A77+9D++/vVXvv73vv70A77+9H9W/Ky/vv71E77+977+9FX3vv73vv70H77+9b++/ve+/ve+/vQDvv70r77+977+9Dzvvv73vv73vv73vv73tobjtsaZ4X0Dvv70W77+9a++/vWjvv71277+9FlBt77+977+9yrbvv73vv71i77+9N++/vWbvv73vv71RQO+/vTFj77+977+9TzXvv73vv70ACO+/ve+/vQBDTu+/ve+/vQB+77+977+977+9Qu+/ve+/ve+/vQDvv73vv70A77+9HO+/vT/vv71p1b/vv73Wne+/vQDvv71Uf++/vTnvv71/77+906t/360777+9AO+/ve+/ve+/ve+/ve+/vTk/77+9RzXvv73vv70adW/vv73vv73vv71/77+9FR/vv73vv71rH++/vTTvv73vv73vv73vv71O77+9AO+/vSrvv70o77+9Dk/vv70R77+9Y++/ve+/ve+/vVvvv73vv71p77+977+977+9R++/vSPvv73vv73vv70KOu+/ve+/ve+/vdO/77+9Cu+/ve+/vSgD77+977+977+9de+/ve+/vQtb77+977+977+9Vu+/vTfvv71p77+977+9YNmS77+9Ru+/vUPvv71mT++/ve+/ve+/vR0GcDAwKu+/ve+/vSPvv73vv73vv70KOu+/ve+/ve+/vdO/77+9Cu+/ve+/vSgD77+977+9AO+/vXNY77+9AO+/ve+/vVbvv70A77+9Wnfvv70AIVHvv70ACO+/ve+/vQBDTu+/ve+/vQB+77+977+977+9Qu+/ve+/ve+/vQDvv73vv70A77+9HO+/vT/vv71p1b/vv73Wne+/vQDvv71Uf++/vTnvv71/77+906t/360777+9AO+/ve+/ve+/ve+/ve+/vTk/77+9RzXvv73vv70adW/vv73vv73vv71/77+9FR/vv73vv71rH++/vTTvv73vv73vv73vv71O77+9AO+/vSrvv70o77+9Dk/vv70R77+9Y++/ve+/ve+/vVvvv73vv71p77+977+977+9VO+/vXwdfe+/vcK277+977+9JtWk77+9Ju+/vXA2WC4k77+977+9Ze+/ve+/vVnvv73vv70p77+9Q++/vRzvv73vv73vv70o77+9Dk/vv70R77+9Y++/ve+/ve+/vVvvv73vv71p77+977+977+9R++/vSPvv73vv73vv70KOu+/ve+/ve+/vdO/77+9Cu+/ve+/vSgD77+977+9AO+/vXNY77+9AO+/ve+/vVbvv70A77+9Wnfvv70AIVHvv70ACO+/ve+/vQBDTu+/ve+/vQB+77+977+977+9Qu+/ve+/ve+/vQDvv73vv70A77+9HO+/vT/vv71p1b/vv73Wne+/vQDvv71Uf++/vTnvv71/77+906t/360777+9AO+/ve+/ve+/ve+/ve+/vTk/77+9RzXvv73vv70adW/vv73vv73vv71/77+9FVPvv73vv71177+977+91rcXHibVnksp77+977+9He+/vQNk77+9G++/vU4F77+9B+SRhg5HOe+/vQEd77+9FAHvv73vv70A77+9Oe+/vX/vv73Tq3/frTvvv70A77+977+977+9AO+/vXNY77+9AO+/ve+/vVbvv70A77+9Wnfvv70AIVdZRQByf++/ve+/vWsf77+9NO+/ve+/ve+/ve+/vU7vv70A77+9Kj/vv70c77+9P++/vWnVv++/vdad77+9AO+/vVXvv71RQBzvv73vv70j77+977+977+9Cjrvv73vv73vv73Tv++/vQrvv73vv71HNe+/ve+/vRp1b++/ve+/ve+/vX/vv70Vde+/vVAHJ++/vQAI77+977+9AENO77+977+9AH7vv73vv73vv71C77+9d++/vQ7vv73vv70sLnTvv73vv70Tau+/ve+/vV3vv73vv71M77+9LBd0cilWGVswRkEjIO+/ve+/vV3vv70UAe+/ve+/vQDvv70577+9f++/vdOrf9+tO++/vQDvv73vv73vv70A77+9c1jvv70A77+977+9Vu+/vQDvv71ad++/vQAhV1lFAHJ/77+977+9ax/vv70077+977+977+977+9Tu+/vQDvv70q77+9e++/ve+/ve+/vUYV77+977+977+9Nu+/vSRpNDPvv73vv73vv71xJe+/ve+/vSxnIu+/vR/vv73vv71OOhxg77+9ZFdxRQByf++/ve+/vWsf77+9NO+/ve+/ve+/ve+/vU7vv70A77+9Kj/vv70c77+9P++/vWnVv++/vdad77+9AO+/vVXvv71RQBzvv73vv70j77+977+977+9Cjrvv73vv73vv73Tv++/vQrvv73vv71HNe+/ve+/vRp1b++/ve+/ve+/vX/vv70Vde+/vVAHJ++/vQAI77+977+9AENO77+977+9AH7vv73vv73vv71C77+977+9Ee+/vWPvv73vv73vv71b77+977+9ae+/ve+/ve+/vV1lFAHvv73vv70A77+9Oe+/vX/vv73Tq3/frTvvv70A77+977+977+9AO+/vXNY77+9AO+/ve+/vVbvv70A77+9Wnfvv70AIVdZRQByf++/ve+/vWsf77+9NO+/ve+/ve+/ve+/vU7vv70A77+9Kj/vv70c77+9P++/vWnVv++/vdad77+9AO+/vVXvv71RQBw977+9AO+/ve+/ve+/vUsL77+9Mu+/ve+/vdq077+977+9cO+/vRMm77+9Be+/vRzvv71V77+9Vu+/vRHvv71I77+9IO+/vVXvv73vv71HNe+/ve+/vRp1b++/ve+/ve+/vX/vv70Vde+/vVAHJ++/vQAI77+977+9AENO77+977+9AH7vv73vv73vv71C77+977+9Ee+/vWPvv73vv73vv71b77+977+9ae+/ve+/ve+/vV1lFAHvv73vv70A77+9Oe+/vX/vv73Tq3/frTvvv70A77+977+977+9AO+/vXNY77+9AO+/ve+/vVbvv70A77+9Wnfvv70AIVdZRQByf++/ve+/vWsf77+9NO+/ve+/ve+/ve+/vU7vv70A77+9Kj/vv70c77+9P++/vWnVv++/vdad77+9AO+/vVXvv71RQBzvv73vv70j77+977+977+9Cjrvv73vv73vv73Tv++/vQrvv73vv71HNe+/ve+/vRp1b++/ve+/ve+/vX/vv70Vde+/vVAHJ++/vQAI77+977+9AENO77+977+9AH7vv73vv73vv71C77+9d++/vQ7vv73vv71hW3vvv70Tau+/vUbvv71DOBssFxJbyLLvv71yLO+/ve+/vV0U77+977+9DkZFdxRQByfvv70ACO+/ve+/vQBDTu+/ve+/vQB+77+977+977+9Qu+/ve+/vRHvv71j77+977+977+9W++/ve+/vWnvv73vv73vv71dZRQB77+977+9AO+/vTnvv71/77+906t/360777+9AO+/ve+/ve+/vQDvv71zWO+/vQDvv73vv71W77+9AO+/vVp377+9ACFXWUUAcn/vv73vv71rH++/vTTvv73vv73vv73vv71O77+9AO+/vSrvv73vv70O77+977+977+9HU3vv71N77+9G++/vSHvv70I77+9Ze+/ve+/vRzvv70bOO+/ve+/ve+/vXJiQ++/vTIx77+9MnPvv71RQBzvv73vv70j77+977+977+9Cjrvv73vv73vv73Tv++/vQrvv73vv71HNe+/ve+/vRp1b++/ve+/ve+/vX/vv70Vde+/vVAHD3vvv73vv73vv71GFe+/ve+/ve+/vTbvv70kaTQz77+977+977+9cSXvv73vv70sZyLvv70f77+977+9TjocYO+/vWRV77+977+9RzXvv73vv70adW/vv73vv73vv71/77+9FXXvv71QByfvv70ACO+/ve+/vQBDTu+/ve+/vQB+77+977+977+9Qu+/ve+/vRHvv71j77+977+977+9W++/ve+/vWnvv73vv73vv71dZRQB77+977+9AO+/vTnvv71/77+906t/360777+9AO+/ve+/ve+/vQDvv71zWO+/vQDvv73vv71W77+9AO+/vVp377+9ACFXWUUAcn/vv73vv71rH++/vTTvv73vv73vv73vv71O77+9AO+/vSo/77+9HO+/vT/vv71p1b/vv73Wne+/vQDvv71V77+9UUAZ77+9Ru+/vQbvv73vv73vv71o77+977+977+9Cu+/ve+/vVbRtO+/vRcpCgRS77+9AAkgc++/vQZ7Vu+/vRRQAUUUUAfvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv71QSwMEFAAAAAAAB++/ve+/vVps77+977+977+9AwAA77+9AwAAEQAUAHByZXZpZXctbWljcm8uanBnAQAQAO+/vQMAAAAAAADvv70DAAAAAAAA77+977+977+977+9ABBKRklGAAEBAABIAEgAAO+/ve+/vQBARXhpZgAATU0AKgAAAAgAAe+/vWkABAAAAAEAAAAaAAAAAAAC77+9AgAEAAAAAQAAADXvv70DAAQAAAABAAAAKQAAAADvv73vv70AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ77+9He+/vdmPAO+/vQTvv70J77+977+977+9Qn7vv73vv70AEQgAKQA1AwEiAAIRAQMRAe+/ve+/vQAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgvvv73vv70A77+9EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMu+/ve+/ve+/vQgjQu+/ve+/vRVS77+977+9JDNicu+/vQkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXrvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70AHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL77+977+9AO+/vREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMu+/vQgUQu+/ve+/ve+/ve+/vQkjM1Lvv70VYnLvv70KFiQ077+9Je+/vRcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl677+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+9AEMAAgICAgICAwICAwQDAwMEBQQEBAQFBwUFBQUFBwgHBwcHBwcICAgICAgICAoKCgoKCgsLCwsLCgoKCgoKCgoKCu+/ve+/vQBDAQICAgMDAwYDAwYKCQcJCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgrvv73vv70ABAAE77+977+9AAwDAQACEQMRAD8A77+977+917xb77+977+9eu+/vXo+77+977+977+9AGgk77+977+9Ce+/ve+/ve+/ve+/vdif77+977+977+977+9HXPeou+/vQDvv73vv73vv70n77+977+9aDI677+9AO+/ve+/vT4/77+9FXodGBQB77+9xJ4377+9b++/vSE777+9E++/vUfvv70Axr0q77+977+977+9fiTvv70/0rw7ZSJg77+977+936oQfu+/vVhj77+9T3rvv70KKAPvv71/77+9JO+/ve+/vQ48LwZHb++/vVjvv70/77+977+90oPvv71fGu+/ve+/vRjvv73vv71x77+9ABM477+9f++/vRcV77+9WBRQBl7vv71377+977+92KTvv73vv73vv73vv71c77+977+977+9We+/ve+/vXB477+9wqg5HO+/ve+/vSjvv73vv70/77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KAPvv73vv73vv73vv73vv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oA++/ve+/vVBLAwQUAAAAAAAH77+977+9WtmYFFVuCwAAbgsAAA8AFABwcmV2aWV3LXdlYi5qcGcBABAAbgsAAAAAAABuCwAAAAAAAO+/ve+/ve+/ve+/vQAQSkZJRgABAQAASABIAADvv73vv70AQEV4aWYAAE1NACoAAAAIAAHvv71pAAQAAAABAAAAGgAAAAAAAu+/vQIABAAAAAEAAADvv70DAAQAAAABAAAA77+9AAAAAO+/ve+/vQA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDvv70d77+92Y8A77+9BO+/vQnvv73vv73vv71Cfu+/ve+/vQARCADvv70A77+9AwEiAAIRAQMRAe+/ve+/vQAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgvvv73vv70A77+9EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMu+/ve+/ve+/vQgjQu+/ve+/vRVS77+977+9JDNicu+/vQkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXrvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70AHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL77+977+9AO+/vREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMu+/vQgUQu+/ve+/ve+/ve+/vQkjM1Lvv70VYnLvv70KFiQ077+9Je+/vRcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl677+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+977+9AEMAAgICAgICAwICAwQDAwMEBQQEBAQFBwUFBQUFBwgHBwcHBwcICAgICAgICAoKCgoKCgsLCwsLCgoKCgoKCgoKCu+/ve+/vQBDAQICAgMDAwYDAwYKCQcJCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgrvv73vv70ABAAP77+977+9AAwDAQACEQMRAD8A77+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+977+9Emvvv73vv73vv70V77+9XTNQ77+9Sz7vv70nTu+/vU8w77+9S2Tvv71l77+9Zz1IFe+/ve+/ve+/vU7vv71L77+977+977+977+9R++/vSNY77+9UlFnGyPvv73vv73vv73vv73vv70Q77+977+9cu+/ve+/ve+/vT1u77+977+977+9Ll0077+9C++/vR/vv71jEgUMLBTvv70bZ2zvv73vv70wDg5H77+9Xu+/vU8LeO+/ve+/vVDvv70K77+9Hu+/ve+/ve+/vRVYNu+/vWwtxLvvv73vv73vv73DsSRs77+9BwcM77+977+977+9DsKKKO+/vQLvv70o77+9Au+/vSjvv70C77+9KO+/vQLvv70o77+9Au+/vSjvv70C77+9KO+/vQ/vv73vv73vv73vv73vv73vv70+M2nvv70X77+9dXrvv70D77+977+977+977+9fO+/ve+/vWhPO3Pvv73vv707QO+/ve+/vWjvv70P77+977+9QeePtu+/ve+/ve+/vU9pcu+/vSHvv71177+9Qu+/vUjvv71s77+9Kkfvv73vv73vv73vv73vv70AOgDvv70q77+9Ru+/ve+/ve+/ve+/ve+/vXl/Yifvv70SI3hU77+977+9be+/vUMQ16fvv71d77+977+9Hynvv70HPBB677+9XwXvv73vv71677+9xabvv73vv71PD++/vT5K77+9BO+/vWjvv73vv70vHO+/ve+/vV3vv71FMgzvv73vv71IAxzvv71e77+977+9K++/ve+/vV1/36/vv73vv71e77+977+9fFp4bggu77+9bi3vv70TXe+/vRvvv70pAe+/vSRgcGPvv70g77+9Pe+/vQB877+977+9AArvv73vv73vv70TAjUdKe+/vWbvv73vv73vv73vv71FAO+/ve+/vWofMScdcd+e77+977+977+977+977+977+9IO+/vRd3ECTvv73vv70YYRFI77+9Re+/vSwmbe+/vVkxbRjvv73vv73vv73vv70A77+9X++/vTbvv73vv70T77+977+977+9AO+/vVU777+977+9aW1K77+9MxDvv71k77+977+977+9Njjvv73vv73vv71T77+9AO+/ve+/ve+/ve+/ve+/vVjvv70577+977+977+9ZB5RWDzvv71TEu+/vRjvv71Ab++/vSrvv73vv73vv71IJGDvv70dKjtf77+9f++/vX3vv70x77+977+977+9b1Xvv71sAj7vv71jdkPvv71jbeybkV8F77+977+977+977+9bu+/vTXvv71H77+9be+/ve+/vSc377+9H++/vQAa77+977+9Nu+/ve+/vRPvv73vv73vv70A77+9UAfvv73vv73vv70ADu+/vQBpS2huI++/vW5tbmfvv70y77+9LRkQ77+9dxhm77+9KO+/vWvvv70B77+977+9Cu+/vd6n77+977+9N++/ve+/ve+/vRjvv73vv73vv73vv71ZRe+/vTvvv70kRBrvv71A77+9EFbvv73vv71r77+9Z++/ve+/vSFHAUnvv73Kuu+/vQbvv73Uru+/vTMF77+9JO+/vU4G77+9Ge+/vQBX77+9cVc+77+9be+/vQBBOe+/vSjvv70A77+977+9AHwpP++/vQ/vv73vv71077+9be+/ve+/vQjvv71UbxYU77+9Djfvv73vv70JAzgcDu+/ve+/vWjvv70fDu+/vWlr77+977+9Pu+/vXdpbW3vv70jRXXvv73vv73vv71CRO+/vR1v77+9OCw+Ue+/vQfvv70177+977+977+9be+/ve+/vSc377+9H++/vQAa77+9dhNA77+977+9W1Hvv71P77+9Ke+/vVjvv70F2IPvv71977+9NAHvv71o77+9ae+/vVHvv73vv70o77+977+9Ye+/ve+/vXcy77+9Vyjvv73vv712BU/vv73vv73vv70IbksQ77+977+9BjJfZe+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVnvv73vv73vv73vv710Me+/vUlv77+9ERTvv71xCihr77+977+9FAx877+9b07vv73vv73vv73vv71N77+977+9BO+/ve+/ve+/ve+/vQDvv71VSu+/vWgZ77+977+977+9MzbZgT8qcDbvv70/77+977+9A++/ve+/vX4cftOW77+9Jc6rf2ct77+9Le+/vU8d77+977+977+9eO+/vXzvv70d77+977+9KT1B77+9GB1577+977+977+977+977+977+9N1JJbe+/vVjvv70FyY4377+9MQvvv70V77+9agMnGO+/ve+/ve+/vVfvv73vv73vv73vv73vv703KO+/ve+/ve+/ve+/vRPvv73vv71jOSVPH++/ve+/vdW/77+977+9f++/vU5v77+9P++/vTVAHw9dfDPvv73vv73vv73vv71ILe+/ve+/vSDvv73vv73vv71L77+977+977+9YwXaqRnvv73vv71lIe+/ve+/vVgwI++/vRjvv71i77+9Ne+/ve+/ve+/vQYH77+904Tvv71c77+977+95Ji2D++/ve+/vW9ACu+/vWTvv73vv71G77+9fO+/ve+/ve+/vT7vv71t77+9AEE577+9KO+/vQDvv73vv70fae+/ve+/vQDvv73vv73flH/vv71q77+9Pibvv73vv73vv73vv70rJe+/vRbvv71XNnHvv71EXe+/ve+/ve+/ve+/ve+/ve+/vSI477+977+9KkAEOS5yeQB0Cu+/ve+/vWvvv71Q77+9I33vv73vv73vv71477+977+9Bu+/ve+/vWZSEO+/ve+/ve+/vQhGIO+/ve+/ve+/vRjvv70nI++/ve+/ve+/ve+/vV9cOe+/vWYK77+9EArvv70+ce+/vT/vv73PtVzvv71N77+977+9BO+/ve+/ve+/ve+/vQDvv71UAe+/ve+/ve+/vWPvv71X77+9DjU9N24IKe+/vWfvv70H77+9Rznvv73vv71z77+977+9Vu+/ve+/ve+/vT/vv73FnO+/ve+/ve+/vTvvv71b77+9Xj3vv73vv73vv73vv70ZLh3vv73vv73vv70177+9bkHvv70ZcAsMcjnvv73bv2nvv73vv70A77+977+935R/77+9au+/ve+/vU0DxIF1Ge+/ve+/ve+/vTgK77+9A++/vSfvv71fYe+/vQB8aO+/vQrvv71p77+977+9JO+/vVXvv73MkMyu77+9y7ZJ77+9PlPvv71r77+92pHvv71uQHLvv71977+9BxUd77+977+977+977+9YS3vv70t77+977+9bO+/ve+/vVw177+977+9He+/vSIjDzPvv71DfEsWUu+/vXDvv71p77+9XO+/ve+/ve+/ve+/vW3vv73vv70nN++/vR/vv70AGu+/vXJNAe+/ve+/vcajMVEc77+977+977+977+977+977+9H++/ve+/ve+/ve+/ve+/vQ/vv73vv73vv73vv73vv70nHu+/vSXvv73vv71W77+9au+/vW3vv71BVO+/vThU77+977+977+9fe+/ve+/vX5OMO+/vQce77+9y5Pvv71v77+9Zu+/vUR6xYID77+977+9Cu+/vTkEKB9uGRjvv70nOe+/ve+/ve+/vVnvv70377+9OO+/vWYhUlzvv73vv73vv73vv73vv71/77+9Pu+/vXPvv70277+977+9E++/ve+/ve+/vQDvv71QB8eeCu+/vX/vv71E77+977+9KNK1DxlqFu+/vVpEFxEb77+977+9FikI3rhgRe+/vQDvv71d77+977+9ce+/vVrvv73vv73vv73vv73vv71h77+9IO+/ve+/ve+/vTMZI++/vW1P77+977+9Xjjvv70f1rp6ACjvv73vv70A77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+977+977+977+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgA77+977+9KADvv73vv70oAO+/ve+/vSgD77+977+9UEsBAj4AFAAAAAAAcH/vv71a77+9bCPvv73vv70bAADvv70bAAASAAAAAAAAAAAAAAAAAAAAAABJbmRleC9Eb2N1bWVudC5pd2FQSwECPgAUAAAAAAAH77+977+9Wu+/vUvvv715BAQAAAQEAAATAAAAAAAAAAAAAAAAAAgcAABJbmRleC9WaWV3U3RhdGUuaXdhUEsBAj4AFAAAAAAAB++/ve+/vVpY77+977+9Qe+/vQ4AAO+/vQ4AACIAAAAAAAAAAAAAAAAAPSAAAEluZGV4L0NhbGN1bGF0aW9uRW5naW5lLTkwNTA4OC5pd2FQSwECPgAUAAAAAAAH77+977+9Wu+/ve+/vVfvv70BAQAAAQEAABwAAAAAAAAAAAAAAAAALS8AAEluZGV4L1RhYmxlcy9UaWxlLTkwNTAyMy5pd2FQSwECPgAUAAAAAAAH77+977+9WmTvv718LO+/vQAAAO+/vQAAACAAAAAAAAAAAAAAAAAAaDAAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjQuaXdhUEsBAj4AFAAAAAAAbX/vv71aVjrvv73vv70bAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9MQAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAyNS5pd2FQSwECPgAUAAAAAABtf++/vVrvv70vMxIbAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9MQAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAyNi5pd2FQSwECPgAUAAAAAAAH77+977+9Wu+/ve+/vTg8KAAAACgAAAAgAAAAAAAAAAAAAAAAAEcyAABJbmRleC9UYWJsZXMvRGF0YUxpc3QtOTA1MDI3Lml3YVBLAQI+ABQAAAAAAG1/77+9Wmnvv71477+9GwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTIAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMjguaXdhUEsBAj4AFAAAAAAAbX/vv71aJRIgPR0AAAAdAAAAIAAAAAAAAAAAAAAAAAAGMwAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAyOS5pd2FQSwECPgAUAAAAAABtf++/vVoq77+9Qe+/vRsAAAAbAAAAIAAAAAAAAAAAAAAAAABhMwAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAzMC5pd2FQSwECPgAUAAAAAABtf++/vVoh77+9ey0bAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9MwAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAzMS5pd2FQSwECPgAUAAAAAABtf++/vVrvv73vv71gbRsAAAAbAAAAIAAAAAAAAAAAAAAAAAATNAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAzMi5pd2FQSwECPgAUAAAAAABtf++/vVrvv71gQO+/vRsAAAAbAAAAIAAAAAAAAAAAAAAAAABsNAAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTAzMy5pd2FQSwECPgAUAAAAAABtf++/vVrvv73vv73vv70XGwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTQAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwMzQuaXdhUEsBAj4AFAAAAAAAbX/vv71a77+9Zybvv70sAAAALAAAABwAAAAAAAAAAAAAAAAAHjUAAEluZGV4L1RhYmxlcy9UaWxlLTkwNTA3NS5pd2FQSwECPgAUAAAAAABtf++/vVoZODrvv70bAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9NQAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3Ni5pd2FQSwECPgAUAAAAAABtf++/vVrvv716E2UbAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9NQAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3Ny5pd2FQSwECPgAUAAAAAABtf++/vVpQb++/ve+/vRsAAAAbAAAAIAAAAAAAAAAAAAAAAAA2NgAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA3OC5pd2FQSwECPgAUAAAAAABtf++/vVoK77+977+977+9HQAAAB0AAAAgAAAAAAAAAAAAAAAAAO+/vTYAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwNzkuaXdhUEsBAj4AFAAAAAAAbX/vv71aEO+/vXdXGwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTYAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODAuaXdhUEsBAj4AFAAAAAAAbX/vv71a77+9KAfvv70dAAAAHQAAACAAAAAAAAAAAAAAAAAAQzcAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODEuaXdhUEsBAj4AFAAAAAAAbX/vv71aU++/vU4nGwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTcAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODIuaXdhUEsBAj4AFAAAAAAAbX/vv71aWO+/vXTvv70bAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9NwAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTA4My5pd2FQSwECPgAUAAAAAABtf++/vVp977+9zrEbAAAAGwAAACAAAAAAAAAAAAAAAAAAUDgAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODQuaXdhUEsBAj4AFAAAAAAAbX/vv71aEiDvv71nGwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTgAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODUuaXdhUEsBAj4AFAAAAAAAbX/vv71aNO+/vWnvv70bAAAAGwAAACAAAAAAAAAAAAAAAAAAAjkAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUwODYuaXdhUEsBAj4AFAAAAAAAB++/ve+/vVrvv73vv71V77+9eQAAAHkAAAArAAAAAAAAAAAAAAAAAFs5AABJbmRleC9UYWJsZXMvSGVhZGVyU3RvcmFnZUJ1Y2tldC05MDUxMTMuaXdhUEsBAj4AFAAAAAAAB++/ve+/vVrvv73vv70uCyYAAAAmAAAAKwAAAAAAAAAAAAAAAAAdOgAASW5kZXgvVGFibGVzL0hlYWRlclN0b3JhZ2VCdWNrZXQtOTA1MTE0Lml3YVBLAQI+ABQAAAAAAG1/77+9Wu+/ve+/ve+/vXcbAAAAGwAAACAAAAAAAAAAAAAAAAAA77+9OgAASW5kZXgvVGFibGVzL0RhdGFMaXN0LTkwNTExNS5pd2FQSwECPgAUAAAAAABtf++/vVok77+9SO+/vRkAAAAZAAAAKwAAAAAAAAAAAAAAAADvv706AABJbmRleC9UYWJsZXMvSGVhZGVyU3RvcmFnZUJ1Y2tldC05MDUxMjQuaXdhUEsBAj4AFAAAAAAAbX/vv71aZ3jvv70hGQAAABkAAAArAAAAAAAAAAAAAAAAAEc7AABJbmRleC9UYWJsZXMvSGVhZGVyU3RvcmFnZUJ1Y2tldC05MDUxMjUuaXdhUEsBAj4AFAAAAAAAbX/vv71a77+9Ixt1GwAAABsAAAAgAAAAAAAAAAAAAAAAAO+/vTsAAEluZGV4L1RhYmxlcy9EYXRhTGlzdC05MDUxMjYuaXdhUEsBAj4AFAAAAAAAB++/ve+/vVrvv70Y77+9YHDvv70AAHDvv70AABwAAAAAAAAAAAAAAAAAAjwAAEluZGV4L0RvY3VtZW50U3R5bGVzaGVldC5pd2FQSwECPgAUAAAAAABtf++/vVoGaUfvv70XAAAAFwAAACgAAAAAAAAAAAAAAAAA77+977+9AABJbmRleC9Bbm5vdGF0aW9uQXV0aG9yU3RvcmFnZS05MDUwODcuaXdhUEsBAj4AFAAAAAAAbX/vv71adRcfAU0AAABNAAAAGgAAAAAAAAAAAAAAAAAJ77+9AABJbmRleC9Eb2N1bWVudE1ldGFkYXRhLml3YVBLAQI+ABQAAAAAAAfvv73vv71aNO+/ve+/vR1PQgAAT0IAABIAAAAAAAAAAAAAAAAA77+977+9AABJbmRleC9NZXRhZGF0YS5pd2FQSwECPgAUAAAAAAAH77+977+9Wl8mHybvv70BAADvv70BAAAZAAAAAAAAAAAAAAAAAAomAQBNZXRhZGF0YS9Qcm9wZXJ0aWVzLnBsaXN0UEsBAj4AFAAAAAAAbX/vv71a1q3vv73vv70kAAAAJAAAABsAAAAAAAAAAAAAAAAAFSgBAE1ldGFkYXRhL0RvY3VtZW50SWRlbnRpZmllclBLAQI+ABQAAAAAAG1/77+9Wsu377+977+977+9AAAA77+9AAAAIgAAAAAAAAAAAAAAAADvv70oAQBNZXRhZGF0YS9CdWlsZFZlcnNpb25IaXN0b3J5LnBsaXN0UEsBAj4AFAAAAAAAB++/ve+/vVrvv73vv71f77+9SgAA77+9SgAACwAAAAAAAAAAAAAAAADvv70pAQBwcmV2aWV3LmpwZ1BLAQI+ABQAAAAAAAfvv73vv71abO+/ve+/ve+/vQMAAO+/vQMAABEAAAAAAAAAAAAAAAAA77+9dAEAcHJldmlldy1taWNyby5qcGdQSwECPgAUAAAAAAAH77+977+9WtmYFFVuCwAAbgsAAA8AAAAAAAAAAAAAAAAA77+9eAEAcHJldmlldy13ZWIuanBnUEsFBgAAAAArACsA77+9DAAA77+977+9AQAAAA==";
  },
  
  emptyFunc: function(){
    var previousForm = voltmx.application.getPreviousForm();
    
  if (previousForm && previousForm.id !== "frmTermsAnDConditions") {

     this.selectedPdfBase64 = "";
    this.selectedPdfFileName = "";
    //     alert("Entered into on Navigate");
    this.pickup = false;
    this.deliver = false;
    this.terms = false;
    this.view.tbxChasisofNumber.text ="";
    this.view.tbxCatageory.text ="";
    this.view.tbxSubcatageory.text ="";
    this.view.tbxYearOfMaking.text ="";
    this.view.tbxBranchName.text ="";
    this.view.tbxMinimumSellingPrice.text ="";
    this.view.tbxKeyInnername.text ="";
    this.view.tbxColorInner.text ="";
    this.view.tbxTargetSellingPrice.text ="";
    this.view.tbxNumberPlate.text ="";
    this.view.tbxFuelTypeInner.text ="";
    this.view.tbxMileagename.text = "";
    if(this.view.lblerroryearofmake){
    this.view.lblerroryearofmake.setVisibility(false);
    }
    if(this.view.lblChasiserrormsg){
      this.view.lblChasiserrormsg.setVisibility(false);
    }
    if(this.view.lblDropdownlisterror){
      this.view.lblDropdownlisterror.setVisibility(false);
    }
    if(this.view.lblSubcaterror){
      this.view.lblSubcaterror.setVisibility(false);
    }
    if(this.view.lblBrancherror){
      this.view.lblBrancherror.setVisibility(false);
    }
    if(this.view.lblkeyerror){
      this.view.lblkeyerror.setVisibility(false);
    }
    if(this.view.lblcolorerror){
      this.view.lblcolorerror.setVisibility(false);
    }
    if(this.view.lblfuelerror){
      this.view.lblfuelerror.setVisibility(false);
    }
    
    if(this.view.lblMileageValidation){
      this.view.lblMileageValidation.setVisibility(false);
    }
    
    if(this.view.lblMinselvalidation){
      this.view.lblMinselvalidation.setVisibility(false);
    }
    
    if(this.view.lblTargetValidation){
      this.view.lblTargetValidation.setVisibility(false);
    }
    
    if(this.view.lblNumberplateValidation){
      this.view.lblNumberplateValidation.setVisibility(false);
    }
    
  }
  },
  
  onDownloadButtonClickOfTemplate: function () {
    try {
        var DownloadClass = java.import("com.example.base64download.FileDownloadHandler");
        var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();
 
//         var fileUrl = "https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2023-financial-year-provisional/Download-data/annual-enterprise-survey-2023-financial-year-provisional.csv";
      var fileUrl = "Y2F0ZWdvcnlfaWQsc3ViX2NhdGVnb3J5X2lkLHRhcmdldF9zZWxsaW5nX3ByaWNlLHllYXJfb2ZfbWFraW5nLGNoYXNzaXNfbnVtYmVyLGJyYW5jaCxtaW5pbXVtX3NlbGxpbmdfcHJpY2UscHJldmlvdXNfbnVtYmVycGxhdGUsbm9fb2Zfa2V5cyxjb2xvcixwaWNrVXBWZWhpY2xlDQo="; 
var timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
var fileName = "SellMultipleTemplate_" + timestamp + ".csv";
 
       // DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
       DownloadClass.saveBase64File(ActivityContext,fileUrl,fileName);
      
//         alert("Download started for " + fileName);
    } catch (e) {
        alert("Download error: " + e.message);
    }
}
 
    
    







});