define({
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_ecfbc054001c45b6924343fa3a2f350a: function AS_AppEvents_ecfbc054001c45b6924343fa3a2f350a(eventobject) {
        var self = this;
        return splasscreen.call(this);
    },
    AS_AppEvents_hc34ca6ab2894a90b27e5a27ef6cdd80: function AS_AppEvents_hc34ca6ab2894a90b27e5a27ef6cdd80(eventobject) {
        var self = this;
        var currentLocale = voltmx.store.getItem("currentLocale");
        //  alert('lang changed');
        if (!currentLocale) {
            voltmx.store.setItem("currentLocale", "en");
            voltmx.i18n.setCurrentLocaleAsync("en", function() {
                voltmx.print("Default locale 'ar' applied.");
            }, function() {
                voltmx.print("Failed to apply default locale.");
            });
        } else {
            voltmx.i18n.setCurrentLocaleAsync(currentLocale, function() {
                voltmx.print("Existing locale '" + currentLocale + "' applied.");
            }, function() {
                voltmx.print("Failed to apply stored locale.");
            });
        }
        fetchClientProperties.call(this);
        setPushCallbacks.call(this);
    }
});