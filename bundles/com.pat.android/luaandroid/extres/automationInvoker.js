var scriptsURL = undefined;
var scripts_name = "AutomationScripts";
var deviceFarm_tag="DeviceFarm";
//http request to get metaInfo.json file and check the automationWindowOpened flag, then proccesed to start automation web socket client.
function invokeJasmineAutomation() {
    if (!appConfig.testAutomation || !appConfig.testAutomation.scriptsURL || !appConfig.testAutomation.scriptsURL.startsWith("http")) {
        //invalid server automation server url.
        voltmx.print("invalid test automation configuration.")
        return;
    }
    var automationConfig=appConfig.testAutomation;
    if(!automationConfig.hasOwnProperty('disableScreenShotsForTestReports'))
        automationConfig['disableScreenShotsForTestReports']=false;

    if(!automationConfig.hasOwnProperty('fetchScriptsFromLocalStorage'))
        automationConfig['fetchScriptsFromLocalStorage']=false;

    /* Adding project name to the automationConfig. projectName is required for accessing the testplan or the test scripts
        in the deploy or deviceFarm respectively .
        Note : In appConfig object , projectName is given in appName property
    */
    automationConfig['projectName'] = appConfig.appName;

     /*Reading deviceFarm flag*/
    if(automationConfig.fetchScriptsFromLocalStorage) {
       var externalFilesDir = voltmx.io.FileSystem.getExternalFilesDir(null), externalFilesDirs;
       if (externalFilesDir != null) {
           voltmx.print(deviceFarm_tag + " Picking testScripts from " + externalFilesDir);
           unZipAndLoadAutomationFiles(externalFilesDir + "/JasmineTests/automationScripts.zip", automationConfig);
       } else {
           voltmx.print(deviceFarm_tag + " voltmx.io.FileSystem.getExternalFilesDir returned null.Checking getExternalFilesDirs API");
           externalFilesDirs = voltmx.io.FileSystem.getExternalFilesDirs(null);
           if (externalFilesDirs != null && Array.isArray(externalFilesDirs) && externalFilesDirs.length > 0) {
               voltmx.print(deviceFarm_tag + " Picking testScripts from " + externalFilesDirs[0]);
               unZipAndLoadAutomationFiles(externalFilesDirs[0] + "/JasmineTests/automationScripts.zip", automationConfig);
           } else {
               voltmx.print(deviceFarm_tag + " voltmx.io.FileSystem.getExternalFilesDirs returned null");
               voltmx.print(deviceFarm_tag + " Unable to pick testscripts from desired locations");
           }
        }
        return;
    }
    scriptsURL = appConfig.testAutomation.scriptsURL;
    try {
        var metaInfoURL = scriptsURL + getChannelName() + "metaInfo.json";
        var metaInfoRequest = new voltmx.net.HttpRequest();
        metaInfoRequest.timeout = 10 * 1000;//10 seconds
        metaInfoRequest.open(constants.HTTP_METHOD_GET, metaInfoURL, false);
        metaInfoRequest.onReadyStateChange = function () {
            if (metaInfoRequest.readyState == constants.HTTP_READY_STATE_DONE) {
                if (metaInfoRequest.status == 200) {
                    try {

                        var ipAddress = scriptsURL.split('://')[1].split(':')[0];
                        voltmx.print("request responseType:" + metaInfoRequest.responseType);
                        if (metaInfoRequest.responseText) {
                            var response = JSON.parse(metaInfoRequest.responseText);
                            if (response.automationWindowOpened) {
                                var portNumber = 9111;
                                if (isNaN(appConfig.testAutomation.webSocketPort)) {
                                    voltmx.print("invalid value provided for test automation web socket client port number. continuing with default port 9111.");
                                }
                                else {
                                    portNumber = parseInt(appConfig.testAutomation.webSocketPort);
                                }
                                //starting automation web socket client.
                                voltmx.automation.startAutomationClient(ipAddress, portNumber,automationConfig);
                            }
                            else {
                                if(response.enableJasmineJSDebuggingForAndroid)
                                    voltmx.automation.enableJSDebuggingInAutomationContext(true);
                                //starting with regular playback.
                                fetchAutomationScripts(automationConfig);
                            }
                        } else {
                            voltmx.print("Invalid meta information found.continuing with automation scripts playback.");
                        }
                    }
                    catch (e) {
                        voltmx.print("unable to read file metaInfo.json");
                        logError(e);
                    }
                }
                else if (metaInfoRequest.status == 404) {
                    voltmx.print("No meta information found.There are no automation scripts deployed.");
                }
                else {
                    voltmx.print("failed to start automation. request status:" + metaInfoRequest.statusText);
                }
            }
            else {
                voltmx.print("invoke jasmine automation request.readyState: " + metaInfoRequest.readyState
                    + " request status:" + metaInfoRequest.statusText);
            }
        };
        metaInfoRequest.send();
    } catch (e) {
        logError(e);
    }

}

function logError(e) {
    var err = voltmx.getError(e);
    if (err instanceof KonyError)
        voltmx.print("" + "\tMessage:" + err.Message);
}

//Below function to write the data in files of data directory path of device.
function saveResponse(file, data, isRaw) {
    try {
        voltmx.print("data : " + data);
        if (file.exists()) {
            file.remove(true);
        }
        file.createFile();
        file.write(data, false);
        return file.fullPath;
    }
    catch (err) {
        voltmx.print("CATCH : saveResponse " + err);
    }
}
//Following function is to ensure the path and create files & directories in the data directory path of device.
function ensurePath(path) {
    try {
        voltmx.print("path" + path);
        var file = null;
        var bPath = voltmx.io.FileSystem.getDataDirectoryPath() + "\/";
        file = new voltmx.io.File(bPath + path);
        if (file.exists()) {
            file.remove();
            voltmx.print("removed existing scripts zip file.");
        }
        voltmx.print("file : " + file);
        return file;
    }
    catch (err) {
        voltmx.print("CATCH : ensurePath " + err);
    }
}
//download the automation scripts zip file, extracts zip file, invokes automation start
function fetchAutomationScripts(automationConfig) {
    try {
        var endUrl = scriptsURL + getChannelName() + getZipScriptsFileName();
        var request = new voltmx.net.HttpRequest();
        request.timeout = 10 * 1000;//10 seconds
        request.open(constants.HTTP_METHOD_GET, endUrl, false);
        request.onReadyStateChange = function () {

            if (request.readyState == constants.HTTP_READY_STATE_DONE) {
                if (request.status == 200) {
                    try {
                        voltmx.print("response: " + JSON.stringify(request.response));
                        var resulttable = request.response;
                        voltmx.print("typeof: " + typeof (resulttable));
                        voltmx.print("request.status : " + request.status);
                        var scripts_name = "AutomationScripts";

                        //save zip response
                        saveResponse(ensurePath(scripts_name + ".zip"), resulttable, true);


                        var bPath = voltmx.io.FileSystem.getDataDirectoryPath();
                        unZipAndLoadAutomationFiles(bPath + constants.FILE_PATH_SEPARATOR + scripts_name + ".zip",automationConfig);
                    }
                    catch (e) {
                        voltmx.print("automation scripts download request successful. and failed to start.");
                        logError(e);
                    }
                }
                else {
                    voltmx.print("fetch automation scripts request.status: " + request.statusText);
                }
            }
            else {
                voltmx.print("fetch automation scripts request.readyState: " + metaInfoRequest.readyState
                    + " request status:" + metaInfoRequest.statusText);
            }
        };
        request.send();
    }
    catch (e) {
        voltmx.print("fetch automation scripts download request failed.");
        logError(e);
    }
}

function unZipAndLoadAutomationFiles(zipFilePath,automationConfig) {
    var bPath = voltmx.io.FileSystem.getDataDirectoryPath();
    var extractedScriptsPath = bPath + constants.FILE_PATH_SEPARATOR + scripts_name;

    //remove existing AutomationScripts folder
    var folder = new voltmx.io.File(extractedScriptsPath);
    if (folder.exists()) {
        folder.remove(true);
    }

    //unzip now
    voltmx.io.unzip(zipFilePath, extractedScriptsPath);

    //remove zip file
    var file = new voltmx.io.File(zipFilePath);
    file.remove(true);
    //call native with sandbox memory folder path
    voltmx.automation.start(extractedScriptsPath,automationConfig);
}

function getChannelName() {
    var result;
    var deviceInfo = voltmx.os.deviceInfo();
    var platformName = (deviceInfo.name).toLowerCase();

    if (platformName == "windows10" || platformName == "windows8" || platformName.indexOf("ipad") !== -1) {
        result = "Tablet/";
    }
    else if (platformName == "windows10mobile" || platformName == "WindowsPhone" || platformName.indexOf("iphone") !== -1) {
        result = "Mobile/";
    }
    else if (platformName.indexOf("windows 10") !== -1 || platformName == "windows 7") {
        result = "Desktop/";
    }
    else if (platformName == "android") {
        result = "Mobile/";
        if ((deviceInfo.deviceHeight / (160 * deviceInfo.density)) > 6)
            result = "Tablet/";
    }
    else {
        voltmx.print("Failed to find the channel.")
    }
    return result;
}

function getZipScriptsFileName() {
    var deviceInfo = voltmx.os.deviceInfo();
    var platformName = (deviceInfo.name).toLowerCase();
    if (platformName.indexOf("ipad") !== -1 || platformName.indexOf("iphone") !== -1) {
        return "automationScripts.tar";
    }
    else {
        return "automationScripts.zip";
    }
}

function generateJasmineCodeCoverageReport(){
    if(typeof __coverage__ !== 'undefined' &&  __coverage__ !== null){
        voltmx.print("writing code coverage report from automationInvoker.js");
        var coverage = JSON.stringify(__coverage__);
        writeJasmineReport(coverage,"_coverage.json");
    }
}

function writeJasmineReport(data,fileName) {
    var externalFilesDir = voltmx.io.FileSystem.getExternalFilesDir(null);
    voltmx.print("path "+externalFilesDir);
    if(externalFilesDir == null){
        voltmx.print("externalFilesDir returned null");
        return;
    }
    var fileLocation = externalFilesDir + "/JasmineTestResults/" + appConfig.appName + fileName;
    voltmx.print(fileLocation);
    var myFile = new voltmx.io.File(fileLocation);
    if (myFile.exists())
      myFile.remove();
    myFile.createFile();
    try {
        voltmx.print("writing file to "+ myFile);
        var writing = myFile.write(data);
        if (writing)
            voltmx.print("Writing code coverage report is successfull");
        else
            voltmx.print("writing code coverage report is unsuccessfull");
    } catch (err) {
        voltmx.print("Exeception occuried while writing code coverage report in writeJasmineReport");
    }
}