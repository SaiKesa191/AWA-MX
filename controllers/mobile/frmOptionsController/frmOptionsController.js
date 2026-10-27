define({ 

  onNavigate: function()
  {
    this.loadData();
     this.view.flxBack.onClick = function()
    {
      new voltmx.mvc.Navigation("frmDetails").navigate();
    }.bind(this);
    this.view.segData.onRowClick = this.onRowClickAction.bind(this);
  },
  loadData: function()
  {
    var rowData=[
      {
        "lbldata":
        {
          "text": "Air condition",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
      {
        "lbldata":
        {
          "text": "ABS",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Air Bags",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Xenon Light",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Central Lock",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Cruise Control",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Electric Seats",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
      {
        "lbldata":
        {
          "text": "Air condition",
          "skin": "sknlblCPReg000000Font54px"
        },
      },
      {
        "lbldata":
        {
          "text": "Leather Seats",
          "skin": "sknlblCPReg000000Font54px"
        },
      },
       {
        "lbldata":
        {
          "text": "Power Steering",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Power Windows",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
      {
        "lbldata":
        {
          "text": "Sunroof",
          "skin": "sknlblCPReg000000Font54px"
        },
      },
       {
        "lbldata":
        {
          "text": "CD Player",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Rear view camera",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Power Mirrors",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
       {
        "lbldata":
        {
          "text": "Automatic Gear",
          "skin": "sknlblCPReg000000Font54px"
        }
       },
    ];
 this.view.segData.setData(rowData);

  },
  
  onRowClickAction: function()
  {
    var selectedData = this.view.segData.selectedRowItems;
    new voltmx.mvc.Navigation("frmMyInformation").navigate();
  }

});
