define(function() {
    return {
        isPlaceholderTimerActive: false, // Flag to track timer status

        updatePlaceholder: function() {
            var self = this; // Preserve `this` context

            // Prevent multiple timers by stopping the existing one
            if (self.isPlaceholderTimerActive) {
                voltmx.timer.cancel("placeholderTimer");
                self.isPlaceholderTimerActive = false;
            }

            // Define the array of placeholder texts
            self.placeholders = [
                "Brand",
                "Model",
                "Category",
                "Vehicle Type",
                "Body Type"         
            ];

            self.index = 0;
            self.view.tbxSearchByCategory.placeholder = "Search by " + self.placeholders[self.index];

            // Function to update placeholder text
            function updatePlaceholdercall() {
                self.index = (self.index + 1) % self.placeholders.length;
                self.view.tbxSearchByCategory.placeholder = "Search by " + self.placeholders[self.index];
            }

            // Start a timer to change placeholder every second
            voltmx.timer.schedule("placeholderTimer", updatePlaceholdercall, 1, true);

            // Mark timer as active
            self.isPlaceholderTimerActive = true;
        },

        stopPlaceholderTimer: function() {
            var self = this;

            // Stop the timer if it's running
            if (self.isPlaceholderTimerActive) {
                voltmx.timer.cancel("placeholderTimer");
                self.isPlaceholderTimerActive = false;
            }
        }
    };
});
