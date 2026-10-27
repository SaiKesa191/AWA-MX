// define(function() {
//     return {
//         analyticsHost: "https://sampleapps.konycloud.com:443/services/data/v1/analytics/objects/log",
//         constructBody: function() {
//             try {
//                 var date = new Date();
//                 var deviceInfo = this.getDeviceOS();
//                 var body = {
//                     "deviceModel": deviceInfo.model,
//                     "Locale": voltmx.i18n.getCurrentDeviceLocale().language,
//                     "Platform": deviceInfo.name,
//                     "PlatformVersion": deviceInfo.version,
//                     "appId": appConfig.appId,
//                     "serviceUrl": appConfig.serviceUrl,
//                     "itemGuid": "i03e48e9459e441585289d44114c88fc",
//                     "assetName": "com.voltmxmp.browsefile",
//                     "assetVersion": "1.0.0",
//                     "releaseMode": !appConfig.isDebug,
//                     "konySdkVersion": voltmx.sdk.version,
//                     "date": date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(),
//                     "endpointId": this.generateUniqueId(),
//                     "deviceHeight": deviceInfo.deviceHeight,
//                     "deviceWidth": deviceInfo.deviceWidth,
//                     "kuid":"ufb9483195fb4d4da6ea025009ea56f7",
//                 };
//                 return body;
//             } catch (exception) {
//                 voltmx.print(JSON.stringify(exception));
//             }
//         },

//         notifyAnalytics: function() {
//             try {
//                 if (this.checkInternetConnectivity() && this.isItFirstTime()) {
//                     var httpclient = new voltmx.net.HttpRequest();
//                     httpclient.open(constants.HTTP_METHOD_POST, this.analyticsHost);
//                     httpclient.setRequestHeader("Content-Type", "application/json");
//                     httpclient.send(JSON.stringify(this.constructBody()));
//                 }
//             } catch (exception) {
//                 voltmx.print(JSON.stringify(exception));
//             }
//         },
//         getDeviceOS: function() {
//             try {
//                 return voltmx.os.deviceInfo();
//             } catch (exception) {
//                 voltmx.print(JSON.stringify(exception));
//             }

//         },
//         generateUniqueId: function() {
//             try {
//                 return voltmx.crypto.createHMacHash("SHA512", this.getDeviceOS().deviceid, "KonyAnalytics");
//             } catch (exception) {
//                 voltmx.print(JSON.stringify(exception));
//             }
//         },
//         isItFirstTime: function() {
//             var bodyDetails = this.constructBody();
//             var assetVersion = voltmx.store.getItem(bodyDetails.assetName + "Version");
//             if (voltmx.sdk.isNullOrUndefined(assetVersion) || assetVersion != bodyDetails.assetVersion) {
//                 voltmx.store.setItem(bodyDetails.assetName + "Version", bodyDetails.assetVersion);
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//         checkInternetConnectivity: function() {
//             return voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
//         }
//     };
// });
