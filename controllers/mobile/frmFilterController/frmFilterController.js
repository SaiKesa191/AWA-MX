define({ 

  //Type your controller code here 

  onNavigate: function(){
//     this.view.flxCategories.onClick = this.segDataVisibleOnClickAction;
    this.view.segFilter.onRowClick = this.segOnRowClickAction;
    this.view.flxVehicles.onClick = this.segDataVisibleOnClickAction
  },

  segDataVisibleOnClickAction: function(){
    this.view.segFilter.setVisibility(true);
  },
//   segOnRowClickAction: function(){
//     this.view.segFilter.rowFocusSkin = "segRowFocus";
//     var selectedRowItems =   this.view.segFilter.selectedRowItems;
// //     [{"lblVehicleName":"Vehicle Type"}]
//     alert("Selected Row Items name :"+  selectedRowItems[0].lblVehicleName);
//     alert("Selected Row Items : "+JSON.stringify(selectedRowItems));
//         selectedRowItems[0].lblVehicleName.skin = "sknlblCPRegEA4235Font100P";

//   }
  
  
  
  
  
  
  
//  ================================Way-2=========================================================
  
  
  
  
  
  
  
  
//   segOnRowClickAction: function() {
// //   this.view.segFilter.rowFocusSkin = "segRowFocus";

//   var selectedRowIndex = this.view.segFilter.selectedRowIndex; // [sectionIndex, rowIndex]
//   var selectedRowItems = this.view.segFilter.selectedRowItems;

//   if (selectedRowItems && selectedRowItems.length > 0) {
//     var sectionIndex = selectedRowIndex[0];
//     var rowIndex = selectedRowIndex[1];

//     // Change the skin of the label inside the row
//     selectedRowItems[0].lblVehicleName.skin = "sknlblCPRegEA4235Font100P";

//     // Update the row data to apply the skin change
//     this.view.segFilter.setDataAt(selectedRowItems[0], rowIndex, sectionIndex);
//   }

//   alert("Selected Row Items name: " + selectedRowItems[0].lblVehicleName);
//   alert("Selected Row Items: " + JSON.stringify(selectedRowItems));
    
//     var rowData = selectedRowItems[0];
// alert("Row Data : "+JSON.stringify(rowData));
// //     Row Data : {"lblVehicleName":"Body Type"}
// // Change the skin of the row flex (assuming flex container ID is 'flxRow')
// rowData.flxFilterSegRow.skin = "segRowFocus"; // Example skin name

// // Update the segment data
// this.view.segFilter.setDataAt(rowData, rowIndex, sectionIndex);

// }

// ===========================================================================================
segOnRowClickAction: function() {
  var selectedRowIndex = this.view.segFilter.selectedRowIndex; // [sectionIndex, rowIndex]
  var selectedRowItems = this.view.segFilter.selectedRowItems;

  if (selectedRowItems && selectedRowItems.length > 0) {
    var sectionIndex = selectedRowIndex[0]; // Section Index (typically 0 if no sections)
    var rowIndex = selectedRowIndex[1];     // Row Index

    // **Access the row widget via rowWidgets**
    var rowWidget = this.view.segFilter.rowWidgets[rowIndex]; // Access rowWidgets directly

    if (!rowWidget) {
      alert("Error: Unable to access row widget.");
    ("rowWidgets:", this.view.segFilter.rowWidgets);
      return;
    }

    // **Change the skin of the flex container**
    rowWidget.flxFilterSegRow.skin = "segRowFocus";

    // **Update the label skin in the row data**
    var rowData = selectedRowItems[0];
    rowData.lblVehicleName.skin = "sknlblCPRegEA4235Font100P";

    // **Update segment data**
    this.view.segFilter.setDataAt(rowData, rowIndex, sectionIndex);

    alert("Row and label skins updated successfully.");
  } else {
    alert("No row selected.");
  }
}

  
  
});