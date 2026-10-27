define({
  carouselData: [
    {
      image: "carousel1.gif",
      title: "Wide Selection & Trusted Assets",
      description: "Find high-quality auctioned assets with confidence."
    },
    {
      image: "carousel2.gif",
      title: "Bid Smart, Win Big",
      description: "Easy bidding process with competitive pricing."
    },
    {
      image: "carousel3.gif",
      title: "Stay Updated, Pay Securely",
      description: "Real-time alerts & seamless transactions."
    },
    {
      image: "untitled_design__1_1.gif",
      title: "Join the Auction Now!",
      description: "Start bidding and selling today"
    }
  ],

  currentIndex: 0,
  carouselTimerName: "carouselAutoSlide",

  onNavigate: function () {
    var flx = this.view;

    flx.flxIntro.setVisibility(true);
    flx.flxBody.setVisibility(false);

    // Start second screen after 2s
    voltmx.timer.schedule("showSecondFlex", function () {
      try {
        var currentForm = voltmx.application.getCurrentForm();
        currentForm.flxIntro.setVisibility(false);
        currentForm.flxBody.setVisibility(true);
        voltmx.timer.cancel("showSecondFlex");

      
//         this.startCarouselTimer();
      } catch (err) {
        voltmx.print("Error in showSecondFlex: " + err.message);
      }
    }.bind(this), 10, false); // Use bind(this)

    this.currentIndex = 0;
    this.updateCarousel();
    this.addSwipeSupport();

    this.view.btnskip.onClick=this.btnSkipOrbtngetstartednowOnclick.bind(this);
    this.view.btngetstartednow.onClick=
      this.btnSkipOrbtngetstartednowOnclick.bind(this);


  },

  updateCarousel: function () {
    if (!this.carouselData || this.carouselData.length === 0) return;

    var data = this.carouselData[this.currentIndex];

    voltmx.print("Updating carousel index: " + this.currentIndex);

    this.view.imgCarousel.src = data.image;
    this.view.lblHeading.text = data.title;
    this.view.lblSubContent.text = data.description;

    for (var i = 0; i < this.carouselData.length; i++) {
      var dotId = "flx" + (i + 1);
      if (this.view[dotId]) {
        this.view[dotId].skin = (i === this.currentIndex)
          ? "sknflxBgFA7F35BorderFA7F3545"
        : "sknflxBgFA7F35BorderFA7F35Opacity3045";
      }
    }

    if (this.currentIndex === this.carouselData.length - 1) {
      this.view.btngetstartednow.setVisibility(true);
      this.view.btnskip.setVisibility(false);
    } else {
      this.view.btngetstartednow.setVisibility(false);
      this.view.btnskip.setVisibility(true);
    }
  },

  addSwipeSupport: function () {
    try {
      this.view.flxBody.removeGestureRecognizer(constants.GESTURE_TYPE_SWIPE);
    } catch (e) {}

    this.view.flxBody.addGestureRecognizer(
      constants.GESTURE_TYPE_SWIPE,
      {
        fingers       : 1,
        swipeDirection: [
          constants.GESTURE_DIRECTION_LEFT,
          constants.GESTURE_DIRECTION_RIGHT
        ]
      },
      this.swipeHandler.bind(this)
    );
  },

  swipeHandler: function (widgetRef, gestureInfo) {
    var direction = gestureInfo.swipeDirection;

    if (direction === 1 && this.currentIndex < this.carouselData.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    } else if (direction === 2 && this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  },

  startCarouselTimer: function () {
    var self = this;

    this.stopCarouselTimer(); // Avoid duplicate timers

    voltmx.print("Starting carousel timer");

    voltmx.timer.schedule(this.carouselTimerName, function () {
      try {
        voltmx.print("Auto slide triggered at index: " + self.currentIndex);
        if (self.currentIndex < self.carouselData.length - 1) {
          self.currentIndex++;
        } else {
          self.currentIndex = 0;
        }
        self.updateCarousel();
      } catch (err) {
        voltmx.print("Carousel timer error: " + err.message);
      }
    }, 2, true); // Repeat every 5 seconds
  },

  stopCarouselTimer: function () {
    try {
      voltmx.timer.cancel(this.carouselTimerName);
      voltmx.print("Carousel timer stopped");
    } catch (err) {
      voltmx.print("Error cancelling timer: " + err.message);
    }
  },


 btnSkipOrbtngetstartednowOnclick: function(widgetRef) {
  if (widgetRef.id === "btnskip") {
    this.currentIndex = 3;
    this.updateCarousel();
  } else if (widgetRef.id === "btngetstartednow") {
    var goTO = new voltmx.mvc.Navigation("frmDashBoard");
    goTO.navigate();
  }
}





});
