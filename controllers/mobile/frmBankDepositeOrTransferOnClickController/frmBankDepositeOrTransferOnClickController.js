define({
  onNavigate: function () {
    this.vehicleDetails();
   this.view.flxUploadSlip.onClick = this.uploadSlipOnClick.bind(this);
  },
uploadSlipOnClick: function(){
  var ntf = new voltmx.mvc.Navigation("frmBankTransferorDeposit");
  ntf.navigate();
},
  vehicleDetails: function () {
    var vehicleDetail = [
      {
        "imgDown"         : "dropdownimg.png",
        "lblSelectedValue": {
          "text": "Enter Required Bidding Limit",
          "skin": "sknlbl767676Dubai20px45"
        },
        "lbl01": {
          "text": "AED 7,500 for a buying limit of AED 150,000",
          "skin": "sknlbl000000Dubai18px45"
        },
        "lbl02": {
          "text": "AED 10,000 for a buying limit of AED 200,000",
          "skin": "sknlbl000000Dubai18px45"
        },
        "lbl03": {
          "text": "AED 50,000 for unlimited buying",
          "skin": "sknlbl000000Dubai18px45"
        },
        "flx01": {
          isVisible: true
        },
        "flxDropDown": {
          isVisible: true,
          "onClick": this.dropDownOnClick.bind(this)
        },
        "flx02": {
          isVisible: false,
          "onClick": this.updateSelectedValue.bind(this, "AED 7,500 for a buying limit of AED 150,000")
        },
        "flx03": {
          isVisible: false,
          "onClick": this.updateSelectedValue.bind(this, "AED 10,000 for a buying limit of AED 200,000")
        },
        "flx04": {
          isVisible: false,
          "onClick": this.updateSelectedValue.bind(this, "AED 50,000 for unlimited buying")
        }
      }
    ];

    this.view.segData.setData(vehicleDetail);
  },

  dropDownOnClick: function () {
    var selectedRow = this.view.segData.selectedRowItems;
    if (!selectedRow || selectedRow.length === 0) {
      voltmx.print("No row is selected");
      return;
    }

    var rowData = selectedRow[0];
    var rowIndex = this.view.segData.selectedRowIndex[1];
    
    rowData.lblSelectedValue.text = "Enter Required Bidding Limit";
    rowData.lblSelectedValue.skin = "sknlbl767676Dubai20px45";

    var isNowVisible = rowData.flx02.isVisible;
    rowData.flx02.isVisible = !isNowVisible;
    rowData.flx03.isVisible = !isNowVisible;
    rowData.flx04.isVisible = !isNowVisible;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(isNowVisible ? 0 : 180);

    rowData.imgDown = {
      "src"      : "dropdownimg.png",
      "transform": rotateTransform
    };

    this.view.segData.setDataAt(rowData, rowIndex);
  },

  updateSelectedValue: function (selectedValue) {
    var selectedRow = this.view.segData.selectedRowItems;
    var rowData = selectedRow[0];
    var rowIndex = this.view.segData.selectedRowIndex[1];

    rowData.lblSelectedValue.text = selectedValue;
    rowData.lblSelectedValue.skin = "sknlbl000000Dubai18px45";

    rowData.flx02.isVisible = false;
    rowData.flx03.isVisible = false;
    rowData.flx04.isVisible = false;

    var rotateTransform = voltmx.ui.makeAffineTransform();
    rotateTransform.rotate(0); // Reset the dropdown arrow

    rowData.imgDown = {
      "src"      : "dropdownimg.png",
      "transform": rotateTransform
    };

    this.view.segData.setDataAt(rowData, rowIndex);
  },

});
