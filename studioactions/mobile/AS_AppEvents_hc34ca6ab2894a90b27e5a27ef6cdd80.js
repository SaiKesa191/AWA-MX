function AS_AppEvents_hc34ca6ab2894a90b27e5a27ef6cdd80(eventobject) {
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