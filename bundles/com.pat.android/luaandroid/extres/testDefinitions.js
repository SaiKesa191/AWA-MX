featureSteps('Test:')

    .given('widget "(.*)" is loaded', async function(widget){
           return this.when('wait for "'+widget+'"')
    })
//TO verify
    .given('widget "(.*)" is loaded withinTimeout "(.*)"', async function(widget, timeout){
           return this.when('wait for "'+widget+'" withTimeout "'+timeout+'"');
    })
    .when('wait for "(.*)"', async function(widget){
          return await kony.automation.playback.waitFor(widget.split("."));
    })
//TO verify
    .when('wait for "(.*)" withTimeout "(.*)" ms', async function(widget, timeout){
          return await kony.automation.playback.waitFor(widget.split("."), parseInt(timeout));
    })

    .when('wait "(.*)" ms', async function(time){
          await kony.automation.playback.wait(parseInt(time));
    })
    .when('user scrolls to widget "(.*)"', async function(widgetPath){
          await kony.automation.scrollToWidget(widgetPath.split("."));
    })
    .when('user touches widget "(.*)" at startPoint "(.*)" movePoints "(.*)" and endPoint "(.*)"', async function(widgetPath, startPt, movePt, endPt){
          await kony.automation.widget.touch(widgetPath.split("."), JSON.parse(startPt), JSON.parse(movePt), JSON.parse(endPt));
    })

//TO verify    
    .when('user captures screen', async function(){
          kony.automation.capture();
    })
//TO verify    
    .when('on device back', async function(){
          kony.automation.device.deviceBack();
    })

    //widget definitions

    //alert for native channels alone
//TO verify
    .when('user clicks alert', async function(index){
          kony.automation.alert.click();
    })
    .when('user clicks alert atIndex "(.*)"', async function(index){
          kony.automation.alert.click(parseInt(index));
    })
    .when('user clicks button "(.*)"', async function(widgetPath){
          kony.automation.button.click(widgetPath.split("."));
    })
//TO verify    
    .when('user clicks box "(.*)"', async function(widgetPath){
          kony.automation.box.click(widgetPath.split("."));
    })
    .when('user selects date "(.*)" in "(.*)"', async function(date, widgetPath){
          kony.automation.calendar.selectDate(widgetPath.split("."), JSON.parse(date));
    })
    .when('user clicks checkbox "(.*)" in "(.*)"', async function(checkboxkey, widgetPath){
          kony.automation.checkboxgroup.click(widgetPath.split("."), checkboxkey);
    })
    .when('user selects listbox item "(.*)" in "(.*)"', async function(listboxkey, widgetPath){
          kony.automation.listbox.selectItem(widgetPath.split("."), listboxkey);
    })
    .when('user clicks radiobutton "(.*)" in "(.*)"', async function(radiobuttongroupkey, widgetPath){
          kony.automation.radiobuttongroup.click(widgetPath.split("."), radiobuttongroupkey);
    })
    .when('user clicks segment "(.*)" at "(.*)"', async function(widgetPath, index){
          var segmentpath = widgetPath + index;
          kony.automation.segmentedui.click(segmentpath.split("."));
    })
    .when('user pulls segment "(.*)"', async function(widgetPath){
          kony.automation.segmentedui.pull(widgetPath.split("."));
    })
    .when('user pushes segment "(.*)"', async function(widgetPath){
          kony.automation.segmentedui.push(widgetPath.split("."));
    })
    .when('user scrolls to row "(.*)" of segment "(.*)"', async function(index, widgetPath){
          var segmentpath = widgetPath + index;
          kony.automation.segmentedui.scrollToRow(segmentpath.split("."));
    })
    .when('user slides to "(.*)" in "(.*)"', async function(slidevalue, widgetPath){
          kony.automation.slider.slide(widgetPath.split("."), parseInt(slidevalue));//may be Number is not needed. It is validated in platform
    })
    .when('user toggles "(.*)"', async function(widgetPath){
          kony.automation.switch.toggle(widgetPath.split("."));
    })
    
    .when('user clicks tab "(.*)" in "(.*)"', async function(tabid, widgetPath){
          kony.automation.tabpane.click(widgetPath.split("."), tabid);
    })
    .when('user enters text "(.*)" in textbox "(.*)"', async function(text, widgetPath){
          kony.automation.textbox.enterText(widgetPath.split("."), text);
    })
    .when('user enters text "(.*)" in textarea "(.*)"', async function(text, widgetPath){
          kony.automation.textarea.enterText(widgetPath.split("."), text);
    })
    .when('user clicks flexcontainer "(.*)"', async function(widgetPath){
          kony.automation.flexcontainer.click(widgetPath.split("."));
    })
//TO verify    
    .when('user executes code "(.*)"', async function(data) {
                   let context=this;
    		       let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
    		       var f=new AsyncFunction('context',data)
                   await f(context);
                 //  eval ("(async () => {" + data + "})()");

    })
    .then('property "(.*)" of widget "(.*)" equals', async function(property, widgetPath, value){
          expect(kony.automation.widget.getWidgetProperty(widgetPath.split("."), property)).toBe(value);
    })
