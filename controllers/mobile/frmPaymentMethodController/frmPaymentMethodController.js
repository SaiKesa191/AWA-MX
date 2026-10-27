define({ 

 //Type your controller code here 
  onNavigate: function(){
    this.view.btnSkip.onClick= this.btnSkipOnClickAction;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.btnPayNow.onClick = this.integratePayment.bind(this);
    this.view.btnClose.onClick = function() {
      this.view.flxBrowserOverlay.removeAll();
      this.view.flxBrowserOverlay.isVisible = false;
    }.bind(this);
//     this.view.flxBackAarrow.onClick = () => new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id).navigate();
  },
  
  btnSkipOnClickAction: function(){
    var ntf = new voltmx.mvc.Navigation("frmDashBoard");
    ntf.navigate();
  },
  onPreShow: function(){
    var previousForm = voltmx.application.getPreviousForm();
    if(previousForm){
      var id = previousForm.id;
      if(id === "frmRegister2"){
        voltmx.application.destroyForm("frmRegister2");
      }
    }
  },
  
integratePayment: function() {
  var selectedKey = this.view.radiobtnBidAmount.selectedKey;
  var amountValue = parseInt(selectedKey);

  
  var ev = "NjM0MWJkYzktMjQ4NS00OTU3LWEwZmYtZmQxZmI1M2NjZTI5OjkwMzUwODY5LTZkODgtNGExYi1hMDI3LWZkYWU3NGRiMDk1Mw==";
  var authUrl = "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";

  try {
    var request = new voltmx.net.HttpRequest();
    request.open("POST", authUrl);
    request.setRequestHeader("Authorization", "Basic " + ev);
    request.setRequestHeader("Content-Type", "application/vnd.ni-identity.v1+json");
    request.setRequestHeader("Accept", "application/vnd.ni-identity.v1+json");
     request.send();
    request.onReadyStateChange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var token = JSON.parse(request.responseText).access_token;
          // Now create the order
          createOrder(token, amountValue);
        } else {
          alert("❌ Auth failed. Status: " + request.status);
        }
      }
    };

   
  } catch (e) {
    alert("❌ Exception during Auth: " + e.message);
  }

  function createOrder(token, amount) {
    var orderUrl = "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/c054376c-125e-4f54-917d-0cf68fce1283/orders";

    var body = {
      "action": "PURCHASE",
      "amount": {
        "currencyCode": "AED",
        "value": amount
      },
      "merchantAttributes": {
        "redirectUrl": "https://yourdomain.com/success"
      }
    };

    try {
      var request1 = new voltmx.net.HttpRequest();
      request1.open("POST", orderUrl);
      request1.setRequestHeader("Authorization", "Bearer " + token);
      request1.setRequestHeader("Content-Type", "application/vnd.ni-payment.v2+json");
      request1.setRequestHeader("Accept", "application/vnd.ni-payment.v2+json");
      request1.send(JSON.stringify(body));
      request1.onReadyStateChange = function() {
        if (request1.readyState === 4) {
          if (request1.status === 201 || request1.status === 200) {
            var response = JSON.parse(request1.responseText);
            var link = response._links.payment.href;
            voltmx.store.setItem("linkdata", link);
            launchBrowser(link);
          } else {
            alert("❌ Order failed. Status: " + request1.status);
          }
        }
      };

      
    } catch (e) {
      alert("❌ Exception during Order: " + e.message);
    }
  }

  function launchBrowser(url) {
    var config = {
      URL: url,
      requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };

    var browser = new voltmx.ui.Browser({
      id: "browserID",
      isVisible: true,
      requestURLConfig: config,
      height: "100%",
      width: "100%"
    }, {
      height: "100%",
      width: "100%",
      top: "0dp",
      left: "0dp",
      zIndex: 10
    }, {});

    // Assuming you have flxBrowserOverlay or similar overlay Flex
    this.view.flxBrowserOverlay.removeAll();
    this.view.flxBrowserOverlay.add(browser);
    this.view.flxBrowserOverlay.isVisible = true;
  }
}

  
 });