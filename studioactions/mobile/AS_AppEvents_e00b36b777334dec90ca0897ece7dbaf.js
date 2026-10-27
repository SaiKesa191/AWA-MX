function AS_AppEvents_e00b36b777334dec90ca0897ece7dbaf(eventobject) {
    var self = this;
    var currentLocale = voltmx.store.getItem("currentLocale");
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
}