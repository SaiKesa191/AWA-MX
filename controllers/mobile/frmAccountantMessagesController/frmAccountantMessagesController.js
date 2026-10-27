define({ 

 onNavigate: function(context)
  {
    
    if(context)
      {
        this.reference_id = context.reference_id;
      }
    
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxBack.onClick = () => {
      new voltmx.mvc.Navigation("frmNotifiction22").navigate();
    }
    this.view.btnClose.onClick = () =>{
      this.view.flxSendReply.setVisibility(false);
    }
    this.view.btnReply.onClick = this.callSendMessage.bind(this);
  },
  
  onPreShow: function()
  {
     this.view.lblNoRecords.setVisibility(false);
      this.view.segMessages.setVisibility(false);
    this.invokeGetMessages();
    this.view.flxSendReply.setVisibility(false);
  },
  
  invokeGetMessages: function()
{
    var self = this;
 voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
      shouldShowLabelInBottom: "true",
      separatorHeight: 45,
      progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
      progressIndicatorColor: "Gray"
    });
    function INVOKE_SERVICE_g9822a1bfef3468ea61cd0342d1cc2e7_Callback(status, get_messages) {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(get_messages);
      self.createsIntoSegment(get_messages);
    }
    if (get_messages_inputparam == undefined) {
        var get_messages_inputparam = {};
    }
   var userToken = voltmx.store.getItem("getUserAccesstoken");
   var userid = voltmx.store.getItem("userId");
    get_messages_inputparam["serviceID"] = "fry_int_common$get-messages";
 
get_messages_inputparam["module"] = "Accountant";
get_messages_inputparam["sub_module"] = "Buyer Invoice List";
get_messages_inputparam["reference_id"] = self.reference_id;
get_messages_inputparam["user_id"] = userid;
get_messages_inputparam["sender"] = "";
get_messages_inputparam["receiver"] = "";
get_messages_inputparam["message"] = "";
get_messages_inputparam["status"] = "";
get_messages_inputparam["read_at"] = "";
get_messages_inputparam["page"] = "1";
get_messages_inputparam["pageSize"] = "100";

  
    var get_messages_httpheaders = {
       "user_token": userToken
    };
    get_messages_inputparam["httpheaders"] = get_messages_httpheaders;
    var get_messages_httpconfigs = {};
    get_messages_inputparam["httpconfig"] = get_messages_httpconfigs;
    fry_int_common$get_messages = mfintegrationsecureinvokerasync(get_messages_inputparam, "fry_int_common", "get-messages", INVOKE_SERVICE_g9822a1bfef3468ea61cd0342d1cc2e7_Callback);

},
  
  
createsIntoSegment: function(messages) {
  var self = this;
  try {
    // Step 1: Define widgetDataMap
    this.view.segMessages.widgetDataMap = {
      lblID: "lblID",
      lblIDVal: "lblIDVal",
      lblSender: "lblSender",
      lblSenderName: "lblSenderName",
      lblReceiver: "lblReceiver",
      lblReceiverName: "lblReceiverName",
      lblMessages: "lblMessages",
      lblMessageValue: "lblMessageValue",
      lblStatus: "lblStatus",
      lblStatusValue: "lblStatusValue",
      lblReadAt: "lblReadAt",
      lblReadAtValue: "lblReadAtValue",
      btnReply: "btnReply"
    };

    // Step 2: Prepare data array
    var data = [];

    if (messages && messages.records && messages.records.length > 0) {
          self.view.lblNoRecords.setVisibility(false);
      self.view.segMessages.setVisibility(true);
      var userid = voltmx.store.getItem("userId");
      for (var i = 0; i < messages.records.length; i++) {
        var rec = messages.records[i];
        var isVisible;
        if(userid === rec.user_id_message_to)
          {
            isVisible = true;
          }
        data.push({
          lblID:  voltmx.i18n.getLocalizedString("ID"),
          lblIDVal: rec.message_id || "",
          lblSender: voltmx.i18n.getLocalizedString("Sender"),
          lblSenderName: rec.message_from || "",
          lblReceiver: voltmx.i18n.getLocalizedString("Receiver"),
          lblReceiverName: rec.message_to || "",
          lblMessages: voltmx.i18n.getLocalizedString("Message"),
          lblMessageValue: rec.message || "",
          lblStatus: voltmx.i18n.getLocalizedString("Status"),
          lblStatusValue: rec.status || "",
          lblReadAt: voltmx.i18n.getLocalizedString("Read At"),
          lblReadAtValue: convertUTCToFormattedLocalNotifications(rec.read_at), // static since it's not from service
          btnReply: {
            text: "Reply",
            "onClick": self.openReplyBox.bind(self,rec)
          } // button label
        });
      }
    } else {
      voltmx.print("No records found in messages response");
      self.view.lblNoRecords.setVisibility(true);
      self.view.segMessages.setVisibility(false);
    }

    // Step 3: Set data into segment
    this.view.segMessages.setData(data);
  } catch (e) {
    voltmx.print("Error in createsIntoSegment: " + e.message);
  }
},
  
  openReplyBox: function(rec)
  {
    this.view.flxSendReply.setVisibility(true);
    this.view.txtAreaMessages.text = "";
    this.view.lblMessages.text = "Responding to "+ rec.message;
    this.rec = rec;
  },
  
  callSendMessage: function()
  {
     var self = this;
      var reference_id = self.reference_id;
    var rec = self.rec;
    var userid = voltmx.store.getItem("userId");
    if (rec.user_id_message_from === userid) {

      alert("Sender and Receiver cannot be the same");
      return; // stop execution
  }
    
    if(this.view.txtAreaMessages && this.view.txtAreaMessages.text && this.view.txtAreaMessages.text.trim() !== "")
      {
    var msg  = self.view.txtAreaMessages.text;
  // ---- Call your service as before ----
  function INVOKE_SERVICE_Callback(status, save_message) {
    voltmx.print(save_message);
    if (save_message.httpStatusCode && save_message.httpStatusCode === 200) {
     new voltmx.mvc.Navigation("frmAccountantMessages").navigate(
       {
     reference_id: reference_id
     }
                                                               );
//       self.view.segMyBookingDetails.data[context.rowIndex].txtAreaMessages.text = "";
      self.onPreShow();
    }
    else
      {
        if(save_message && save_message.error && save_message.error.message)
          {
            alert(save_message.error.message);
          }
      }
  }

  var userToken = voltmx.store.getItem("getUserAccesstoken");
  var save_message_inputparam = {
    "serviceID": "ms_common$save-message",
    "message": msg,
    "sender_id": rec.user_id_message_to,
    "receiver_id": rec.user_id_message_from,
    "module": rec.module,
    "sub_module": rec.sub_module,
    "reference_id": rec.reference_id,
    "parent_id": rec.parent_id,
    "httpheaders": { "user_token": userToken },
    "httpconfig": {}
  };

  mfintegrationsecureinvokerasync(
    save_message_inputparam,
    "ms_common",
    "save-message",
    INVOKE_SERVICE_Callback
  );
      }
  }
  

 });