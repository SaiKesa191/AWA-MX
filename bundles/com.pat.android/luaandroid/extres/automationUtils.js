_resolveAppName = function (formID) {
    var appName = "";
    /*Assuming composite app always have widgetpath with appname*/
    if (formID.split("/").length == 2) {
        appName = formID.split("/")[formID.split("/").length - 2];
    }
    else {
        /*For isolated app, appname will be current appname*/
        //appName=_voltmx.mvc.getCurrentAppName();
        appName = appConfig.appName;
    }
    return appName;
}

_resolveFormInfo = function (formID) {
    var formInfo = {};
    formInfo["formName"] = formID.split("/")[formID.split("/").length - 1];
    formInfo["appName"] = _resolveAppName(formID);
    return formInfo;
}


_getFormController = function (formFriendlyName) {
    var tmpController = null;
    var formInfo = _resolveFormInfo(formFriendlyName);
    var formID = formInfo["formName"];
    var appName = formInfo["appName"];
    var tmpFormName = voltmx.mvc.registry.get(formID, appName);
    if (null != tmpFormName) {
        formID = tmpFormName
    }
    if (formID in _voltmx.mvc.getViewName2viewIdMap(appName)) {
        formID = _voltmx.mvc.getViewName2viewIdMap(appName)[formID];
    }
    if (null != formID) {
        if (formID in _voltmx.mvc.getViewId2ControllerNameMap(appName)) {
            var ctrlName = _voltmx.mvc.getViewId2ControllerNameMap(appName)[formID];
            if (ctrlName in _voltmx.mvc.getControllerName2ControllerMap(appName)) {
                tmpController = _voltmx.mvc.getControllerName2ControllerMap(appName)[ctrlName];
            }
        }
    }
    return tmpController;
}

_getFormId = function (formID) {
    var formInfo = _resolveFormInfo(formID);
    formID = formInfo["formName"];
    var parentWidget = this[formID]; //free form condition.
    if (null == parentWidget || null == parentWidget._voltmxControllerName) {
        var tmpFormName = voltmx.mvc.registry.get(formID, formInfo["appName"]);
        if (null != tmpFormName) {
            formID = tmpFormName
        }
    }
    /*if Appgroups,splitting should be done to retrieve form ID*/
    return formID.split("/")[formID.split("/").length - 1];
}

_getWidgetInstance = function (parentIdentifiers) {
    var parentWidget = null;
    for (i = 0; i < parentIdentifiers.length; i++) {
        var parentIdentifier = parentIdentifiers[i] ,formID;
        if (i == 0) {
            if (typeof parentIdentifier === "string") {
                var currentForm = voltmx.application.getCurrentForm();
                if (!currentForm) {
                    /*current form widget is null.*/
                    return { exceptionType:"Jasmine", errorCode: 205, errorMsg: "Ensure that current form is rendered. Try using waitFor API before performing widget actions" };
                }
                formID =_getFormId(parentIdentifier);
                if (_resolveAppName(parentIdentifier) != currentForm.appName || formID != currentForm.id) {
                    /*parent form widget is not a current form widget.*/
                    return { exceptionType: "Jasmine", errorCode: 205, errorMsg: "Ensure that the form in the widgetpath matches the current form. Try using waitFor API before performing widget actions" };
                }
                parentWidget = this[formID]; //free form.
                if (null == parentWidget || null == parentWidget._voltmxControllerName) {
                    var tmpController = _getFormController(parentIdentifier, true);
                    if (null != tmpController) {
                        parentWidget = tmpController.view;
                    }
                }
            }
            else {
                parentWidget = parentIdentifier;
            }
        }
        else {
            var temp = null;
            if (parentIdentifier.indexOf("[") !== -1) {
                var widget = parentIdentifier.substr(0, parentIdentifier.indexOf("["));
                var index = parentIdentifier.slice(parentIdentifier.indexOf("[")+1, parentIdentifier.indexOf("]"));
                temp = parentWidget[widget];
                try {
                    if (index.length === 0) {
                        //no section or row index data is been passed
                        return {exceptionType:"Jasmine", errorCode: 207, errorMsg: "Invalid section or row info found." };
                    }
                    index = index.split(",").map(Number);
                    if(index.length > 2 || index.length < 1 ||
                        ((index.length == 2) && (Number.isNaN(index[0]) || Number.isNaN(index[1]))) || (index.length == 1 && Number.isNaN(index[0]))) {
                        //invalid type is sent to either section index or row index
                         return {exceptionType:"Jasmine", errorCode: 207, errorMsg: "Invalid section or row info found."};
                     }
                }catch(e) {
                   return {exceptionType:"Jasmine",errorCode: 207, errorMsg: "Invalid section or row info found."};
                }
                 temp = temp.getrowbyIndex(index);
            }
            else if(parentWidget && parentWidget.id==parentIdentifier)
            {
               temp=parentWidget;
            }
            else {
                temp = parentWidget[parentIdentifier];
            }

//            if (temp == null && Object.prototype.hasOwnProperty.call(parentWidget, "getView")) {
//                temp = parentWidget.getView()[parentIdentifier];
//            }
            parentWidget = temp;
            if(parentWidget==null)
               return parentWidget
        }
    }
    return parentWidget;

}



_getProperty = function(widgetPath, property) {
    var _widget = _getWidgetInstance(widgetPath);
    if (_widget == null)
        return {
            exceptionType: "Jasmine",
            errorCode: 201,
            errorMsg: "The widget could not be found at the widgetpath. If the widgetpath is right, try using waitFor API before performing widget actions."
        }
    if (_widget.errorCode != undefined)
        return _widget;
    var ret = null;
    if (_widget != null) {
        ret = _widget[property];
        if (ret != undefined && ret != null && !((typeof ret === 'string') || (typeof ret === 'number') || (typeof ret === 'boolean'))) {
            try {
                var data = JSON.stringify(ret);
                ret = JSON.parse(data);
            } catch (e) {
                ret = null;
            }
        }
    }
    return ret;
}

/**
 * API call from platform
 * Returns a list of widget paths matching the given criteria
 * @param widgetPath Path of the target widget (container) as aray of strings
 * @param filters Array of objects defining the filters/criteria to be satisfied
 * @param searchableWidgets Array of widget constants defining on which the filters can apply.
 */
var _getWidgetsByFilter = function(widgetPath,filters,searchableWidgets) { //Exposed API
    var widgetModel = null, widgetsList=[];

    if(searchableWidgets === null)  //if searchablewidgets not provided, pass null from platform
        searchableWidgets=[];
    
    if(!Array.isArray(widgetPath) || !Array.isArray(filters) || !Array.isArray(searchableWidgets)) {
        return {
            exceptionType: "Jasmine",
            errorCode: 203,
            errorMsg: "Invalid type of arguments passed"
        }
    }
    widgetModel = _getWidgetInstance(widgetPath); //Platform Specific
    if(!widgetModel)
    {
        return {
            exceptionType: "Jasmine",
            errorCode: 201,
            errorMsg: "The widget could not be found at the widgetpath. If the widgetpath is right, try using waitFor API before performing widget actions."
        }
    }
    if(widgetModel.exceptionType && widgetModel.exceptionType === "Jasmine")
        return widgetModel;

    if (getwidgetType(widgetModel) === "Form" || getwidgetType(widgetModel) === "FlexContainer" || getwidgetType(widgetModel) === "FlexScrollContainer") {
        widgetsList = _getWidgetsRecursively(widgetModel,searchableWidgets,filters);
        if(widgetsList.length > 0 && widgetsList[0] === widgetModel)
            widgetsList.shift(); //removing the containerWidget.
    }

    
    return widgetsList; 
}
/**
 * Returns a list of widget models inside the given container widget (recursively)
 * @param parentWidget Parent Widget model for which the children are required
 */
var _getWidgetsRecursively = function (parentWidget,searchableWidgets, filters) {
    var widgetsList = [], validWidget = false, widgets = null;

    if(searchableWidgets.length>0) {
        if(searchableWidgets.includes(getwidgetType(parentWidget)) && _checkCriteria(parentWidget, filters))
            validWidget = true;
    }
    else if(_checkCriteria(parentWidget, filters)){
        validWidget = true;
    }

    if(validWidget) {
        widgetsList.push(parentWidget);
    } 

    if (typeof parentWidget.widgets === 'function')
        widgets = parentWidget.widgets();

    if (widgets && widgets.length > 0) {
        for (var i = 0; i < widgets.length; i++) {
            widgetsList = widgetsList.concat(_getWidgetsRecursively(widgets[i],searchableWidgets, filters));
        }
    }
    return widgetsList;
}
/**
 * Returns a list of widget models matching the given criteria
 * @param widgetsList List of the widget models which need to be filtered
 * @param filters Array of objects defining the filters/criteria to be satisfied
 */
var _checkCriteria = function(widget,filters) {
    var filter = null, criteria = 0, caseSensitive=true, validWidget = false, passed= false, propertyName = "", actualValue = "", valueToCompare = "";
    
    for(var i = 0; i < filters.length; i++) { 
        filter = filters[i];
        passed = false;

        if(!(filter.hasOwnProperty('property') && filter.hasOwnProperty('value')))
            continue;

        if(filter.hasOwnProperty('searchCriteria') && typeof criteria === 'number')
            criteria = filter['searchCriteria'];

        if(filter.hasOwnProperty('caseSensitive') && typeof filter['caseSensitive'] === 'boolean')
            caseSensitive = filter['caseSensitive']

        propertyName = filter['property'];
        actualValue = widget[propertyName];

        valueToCompare = filter['value'];

        if(actualValue === undefined)
            continue;

        switch (criteria) {
            case 0: {//voltmx.automation.SEARCH_CRITERIA_EQUAL
                if(typeof valueToCompare === 'string' && typeof actualValue === 'string' && !caseSensitive )
                {
                    if(valueToCompare.toLowerCase() === actualValue.toLowerCase())
                        passed = true;
                }
                else if (valueToCompare === actualValue) {
                    passed = true;
                }
                break;
            }
            case 1: {//voltmx.automation.SEARCH_CRITERIA_CONTAINS
                if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                {
                    if(caseSenitive) {
                        if(actualValue.includes(valueToCompare)) 
                            passed = true;
                    }
                    else if(actualValue.toLowerCase().includes(valueToCompare.toLowerCase()))
                    {
                        passed = true;
                    }
                }
                break;
            }
            case 2: {//voltmx.automation.SEARCH_CRITERIA_STARTSWITH
                if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                {
                    if(caseSensitive){
                        if(actualValue.startsWith(valueToCompare)) 
                            passed = true;
                    }
                    else if(actualValue.toLowerCase().startsWith(valueToCompare.toLowerCase()))
                    {
                        passed = true;
                    }

                }
                break;
            }
            case 3: {//voltmx.automation.SEARCH_CRITERIA_ENDSWITH
                if(typeof valueToCompare === 'string' && typeof actualValue === 'string' )
                {
                    if(caseSensitive){ 
                        if(actualValue.endsWith(valueToCompare)) 
                            passed = true;
                    }
                    else if(actualValue.toLowerCase().endsWith(valueToCompare.toLowerCase())) {
                        passed = true;
                    }

                }
                break;
            }
            case 4: {//voltmx.automation.SEARCH_CRITERIA_GREATER
                if(typeof valueToCompare === 'number' && typeof actualValue === 'number') {
                    if( actualValue > valueToCompare ) {
                        passed = true;
                    }
                }
                break;
            }
            case 5: {//voltmx.automation.SEARCH_CRITERIA_GREATER_EQUAL
                if(typeof valueToCompare === 'number' && typeof actualValue === 'number') {
                    if( actualValue >= valueToCompare ) {
                        passed = true;
                    }
                }
                break;
            }
            case 6: {//voltmx.automation.SEARCH_CRITERIA_LESSER
                if(typeof valueToCompare === 'number' && typeof actualValue === 'number') {
                    if( actualValue < valueToCompare ) {
                        passed = true;
                    }
                }
                break;
            }
            case 7: {//voltmx.automation.SEARCH_CRITERIA_LESSER_EQUAL
                if(typeof valueToCompare === 'number' && typeof actualValue === 'number') {
                    if( actualValue <= valueToCompare ) {
                        passed = true;
                    }
                }
                break;
            }
        }
        if(passed){
            validWidget = true;
        } else {
            return false;
        }
    };
    return validWidget;
}
/**
 * To get the model type of widget
 * platform dependant
 * @param widgetModel WidgetModel for which widgetType is required.
 */
var getwidgetType = function(widgetModel) {
    var type, widgetMap, widgetType;

    type = voltmx.type(widgetModel);
    widgetMap = {
        "voltmx.ui.Browser" : "Browser",
        "voltmx.ui.Button" : "Button",
        "voltmx.ui.Calendar" : "Calendar",
        "voltmx.ui.Camera" : "Camera",
        "voltmx.ui.LuaCanvas" : "Canvas",
        "voltmx.ui.CheckBoxGroup" : "CheckBoxGroup",
        "voltmx.ui.CollectionView" : "CollectionView",
        "voltmx.ui.KonyCustomWidget" : "CustomWidget",
        "voltmx.ui.DataGrid" : "DataGrid",
        "voltmx.ui.FlexContainer" : "FlexContainer",
        "voltmx.ui.FlexScrollContainer" : "FlexScrollContainer",
        "voltmx.ui.Form" : "Form",
        "voltmx.ui.Image2" : "Image",
        "voltmx.ui.Label"  : "Label",
        "voltmx.ui.ListBox" : "ListBox",
        "voltmx.ui.Map" : "Map",
        "voltmx.ui.PickerView" : "PickerView",
        "voltmx.ui.RadioButtonGroup" : "RadioButtonGroup",
        "voltmx.ui.ReactNativeContainer" : "ReactNativeContainer",
        "voltmx.ui.NativeContainer" : "NativeContainer",
        "voltmx.ui.RichText" : "RichText",
        "voltmx.ui.SegmentUI2" : "Segment",
        "voltmx.ui.Slider" : "Slider",
        "voltmx.ui.Switch" : "Switch",
        "voltmx.ui.TabPane" : "TabPane",
        "voltmx.ui.TextArea2" : "TextArea",
        "voltmx.ui.TextBox2" : "TextBox",
        "voltmx.ui.Video" : "Video",
        "voltmx.ui.BottomSheet" : "BottomSheet",
        "voltmx.ui.MLCamera"  :   "MLCamera"
    }

    widgetType = widgetMap[type];
    return widgetType;
}
