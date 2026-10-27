define({ 

onNavigate: function(){
  var self = this;
  self.view.segNotifications.widgetDataMap = {
    
    "imgUser": "imgUser",
    "lblText": "lblText",
     "btnchat": "btnchat",
     "btndecline": "btndecline",
     "lblDayAndTime": "lblDayAndTime",
      "flxbuttons":"flxbuttons"
    
    
  };
  var notification = [
        {
            "imgUser":"avatar.png",
            "lblText": "Someone has placed a higher bid for the 2019 Audi Q7. You can place a new bid or watch the auction",
            "lblDayAndTime": "Yesterday at 9:42 AM",
            "btnchat": { "text": "Chat"},
           "btndecline": { "text": "Decline"},
         
          
        },
       {
            "imgUser":"avatar_01_1_.png",
             "lblText":"Someone has placed a higher bid for the 2019 Audi Q7. You can place a new bid or watch the auction",
            "lblDayAndTime": "Yesterday at 9:42 AM",
            "btnchat": { "text": "Chat"},
           "btndecline": { "text": "Decline"
                         },
           "flxbuttons":{"isVisible": false}
         
          
        },
{
            "imgUser":"avatar.png",
            "lblText": "Someone has placed a higher bid for the 2019 Audi Q7. You can place a new bid or watch the auction",
            "lblDayAndTime": "Yesterday at 9:42 AM",
            "btnchat": { "text": "Chat"},
           "btndecline": { "text": "Decline"},
         
          
        },
       {
            "imgUser":"avatar_01_1_.png",
            "lblText": "Someone has placed a higher bid for the 2019 Audi Q7. You can place a new bid or watch the auction",
            "lblDayAndTime": "Yesterday at 9:42 AM",
            "btnchat": { "text": "Chat"},
           "btndecline": { "text": "Decline"
                         },
         "flxbuttons":{"isVisible": false}
         
          
        }
      
     
      
      
    ];  
  self.view.segNotifications.setData(notification);
}
   
  
  
 });