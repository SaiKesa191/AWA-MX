define({ 

 onNavigate: function()
  {
    this.adjustRTLLayout();
   
    this.view.preShow = this.onPreShow.bind(this);
     this.view.flxBack.onClick=this.backNavigation.bind(this);
      

  },
  
  onPreShow: function()
  {
    this.toggleFooterIcons();
  },
  
  toggleFooterIcons: function()
  {
   this.view.Footer2.flxHL1.setVisibility(false);
  this.view.Footer2.flxHL2.setVisibility(false);
  this.view.Footer2.flxHL3.setVisibility(false);
  this.view.Footer2.flxHL4.setVisibility(false);
  this.view.Footer2.flxHL5.setVisibility(true);
    
  this.view.Footer2.imgHome.src = "homefooter.png";
  this.view.Footer2.lblHome.skin = "sknLblDubai231f2014pxBold";
  
  this.view.Footer2.imgMegaPhone.src = "auctionsfooter.png";
  this.view.Footer2.lblAuctions.skin = "sknLblDubai231f2014pxBold";
   this.view.Footer2.lblSellCar.skin = "sknLblDubaid3243714pxBold"; 
    
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
    this.view.Footer2.imgMyBids.src = "mylistings.png";
//     this.view.Footer2.lblMyBids.text = "Listings";
    }
    else{
        this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
//     this.view.Footer2.lblMyBids.text = "My Bids";
    }
  
    
    var isLogin = voltmx.store.getItem("isLogin");
//     alert("isLogin :"+isLogin);
    var isUserCreated = voltmx.store.getItem("isUserCreated");
    
   if(isLogin === true &&  isUserCreated === true){
    
      this.view.Footer2.imgSellCar.setVisibility(false);
      this.view.Footer2.flxProfile.setVisibility(true);
     this.view.Footer2.CopyimgProfile0e0b55f5e422d40.src = "profileactive.png";
    }
    else{
      this.view.Footer2.imgSellCar.setVisibility(true);
      this.view.Footer2.flxProfile.setVisibility(false);
    }
  },
  
  
  backNavigation: function() {
    var previousForm = voltmx.application.getPreviousForm();

    if (previousForm && previousForm.id === "frmSellCarList12") {
        new voltmx.mvc.Navigation("frmSellCarList12").navigate();
    }
   else  if (previousForm && previousForm.id === "frmRegister2") {
        new voltmx.mvc.Navigation("frmRegister2").navigate();
    }
   else if (previousForm && previousForm.id === "frmOpenSettings") {
        new voltmx.mvc.Navigation("frmOpenSettings").navigate();
    }
    else{
      new voltmx.mvc.Navigation("frmOpenSettings").navigate();
    }
},
  
    adjustRTLLayout: function() 
  {
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
   
    this.view.flxHeaderNew.btnChangeLang.text = voltmx.i18n.getLocalizedString("changeLang");
      this.view.Footer2.lblHome.text = voltmx.i18n.getLocalizedString("Home");
     this.view.Footer2.lblAuctions.text = voltmx.i18n.getLocalizedString("All Auctions");
     this.view.Footer2.lblSearch.text = voltmx.i18n.getLocalizedString("Search");
     this.view.Footer2.lblSellCar.text = voltmx.i18n.getLocalizedString("Profile");
      var mode = voltmx.store.getItem("mode") || "seller";
    if(mode === "seller"){
//     this.view.Footer2.imgMyBids.src = "mylistings.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("Listings");
    }
    else{
//         this.view.Footer2.imgMyBids.src = "mybidsfooter.png";
    this.view.Footer2.lblMyBids.text = voltmx.i18n.getLocalizedString("My Bids");
    }
    
    this.view.flxNotification.reverseLayoutDirection = isArabic;
    this.view.lblNotification.text = voltmx.i18n.getLocalizedString("Auction Guide");
    this.view.lblHeading01.text = voltmx.i18n.getLocalizedString("provisionsAndConditionsTermsAndConditions");
    this.view.lblInfo01.text = voltmx.i18n.getLocalizedString("theRulesProvisionsAndTextTermsAndConditions");
    this.view.lblHeading02.text =  voltmx.i18n.getLocalizedString("Provisions and responsibilities :");
    this.view.lblHeading03.text = voltmx.i18n.getLocalizedString("The integral part of the provision and rules governing and organizing the relationship between Al Wataneya Auctions and its clients.");
    this.view.lblinfo02.text = voltmx.i18n.getLocalizedString("theRulesProvisionsAndTextTermsAndConditions");
    this.view.richTextPoints.text = voltmx.i18n.getLocalizedString("auctionTermsAndConditionsRichtextnew");
    var htmltext = `<div class="terms-container">
  <p><strong>TERMS & CONDITIONS AGREEMENT</strong></p>
  <p>
    This Terms and Conditions Agreement (the “Agreement”) is entered into by and between:<br><br>
    <strong>(1)</strong> Emirates Public Transport & Services Company (“Emirates Transport” or “ET”) and<br>
    <strong>(2)</strong> National Auctions (“AWA”)<br><br>
    Together, referred to as the “Parties.”
  </p>

  <p>
    This Agreement governs participation in the National Auction (AWA) online platform, which operates under Emirates Transport (ET).
    Registration on the platform constitutes full acceptance of these Terms & Conditions.
  </p>

  <p>
    Any interpretation or ambiguity in this Agreement shall be based solely on written agreements duly signed by authorized representatives
    of National Auction (AWA) or Emirates Transport (ET). Any verbal or unsigned agreement is invalid and not binding.
  </p>

  <p><strong>1. Registration & Eligibility</strong></p>
  <p>- Only one account is permitted per bidder.</p>
  <p>- Users must be <strong>21 years or older</strong>.</p>
  <p>- AWA / ET may accept, reject, or cancel any registration at its sole discretion, without obligation to provide reasons or notice.</p>
  <p>- Accounts may be suspended or cancelled without notice if misused or violated.</p>
  <p>- Bidders are fully responsible for verifying and confirming their bid amounts before submission. Errors in amount or placement are the bidder’s sole responsibility.</p>

  <p><strong>2. Required Documents</strong></p>
  <p>- <strong>Companies:</strong> Valid Trade License + VAT Registration (if applicable).</p>
  <p>- <strong>Individuals:</strong> Valid Emirates ID, Passport, or UAE Driving License.</p>

  <p><strong>3. Vehicle Status, Information & Inspection</strong></p>
  <p>- All vehicles are sold <strong>“As-Is”</strong>, with all defects (known or unknown).</p>
  <p>- No warranty, refund, exchange, or repair is provided.</p>
  <p>- Only the chassis is guaranteed, subject to providing a <strong>FAILED</strong> traffic passing report due to chassis issues within <strong>72 hours</strong> of vehicle and document collection.</p>
  <p>- Vehicles are locked for security reasons. Only <strong>exterior inspection</strong> is permitted during the active auction period.</p>
  <p>- AWA / ET is not responsible for incorrect or misleading information on external websites.</p>
   <p>- Only the AWA / ET website and official UAE Traffic inspection reports are considered valid information sources.</p>

  <p><strong>4. Deposits & Financial Guarantees</strong></p>
  <p>- A security deposit must be paid before account activation.</p>
  <p>- Accepted methods: Bank Card, Bank Transfer, Cash Deposit to company account, Security Cheque, or Bank Guarantee.</p>
  <p> The amount of the security deposit allows bidding in accordance with the tables provided below</p>
  <p><strong>Deposit Limits:</strong></p>
  <p>- AED 5,000 → Maximum Bidding Limit:Upto 100,000</p>
  <p>- AED 7,500 → Maximum Bidding Limit:Upto 150,000</p>
  <p>- AED 10,000 → Maximum Bidding Limit:Upto 200,000</p>
  <p>- AED 50,000 → Unlimited</p>
  <p>- AWA / ET may request a higher deposit at its sole discretion without providing reasons.</p>
  <p>- The security cheque is issued in the name of <strong>Emirates Transport</strong>.</p>

  <p><strong>5. Auction Timing & Validity</strong></p>
   <p>- Auction start and end times are displayed on the website.</p>
  <p>- Vehicle inspection is allowed only during the active auction period.</p>
   <p>- No inspection is allowed after the auction ends or after award before payment.</p>

  <p><strong>6. Payment Terms</strong></p>
  <p>- Full payment must be completed within <strong>48 hours</strong> of results of the announcement.</p>
<p>- Late payments incur <strong>AED 100 per day per awarded vehicle</strong>.</p>
<p>- Failure to pay results in:</p>
<p>• Full confiscation of the security deposit</p>
<p>• Cancellation of sale</p>
<p>• Penalty of <strong>20%</strong> of the transaction value</p>
<p>- No vehicle will be released until <strong>all</strong> awarded vehicles are fully paid.</p>
<p>- If the depositor’s name differs from the buyer's name, ET may verify the relationship.</p>
<p>- The buyer must provide a signed authorization letter and depositor details.</p>
<p>- Only <strong>AED</strong> currency is accepted.</p>


  <p><strong>7. Vehicle Release & Collection</strong></p>
  <p>- Release hours: <strong>Monday–Friday, 08:00–16:00</strong>.</p>
<p>- Spare keys are not guaranteed.</p>
<p>- Vehicles are delivered <strong>without a number of plates</strong>.</p>
<p>- Kilometer readings are approximate.</p>
<p>- Vehicles cannot be released on the same day as payment.</p>
<p>- Collection date will be communicated by AWA / ET.</p>
<p>- Vehicles will only be released to the registered bidder or an authorized representative with an official authorization letter.</p>
<p>- Parking fees will be automatically applied daily to each vehicle not collected within 7 days as below:</p>
<p><strong>Vehicle Type</strong> &nbsp;&nbsp;&nbsp;&nbsp; <strong>Daily Parking Fees</strong></p>
<p>light vehicles &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AED 100</p>
<p>heavy vehicles & buses &nbsp; AED150</p>

<p>- The buyer is responsible for transportation and related costs.</p>
<p>- Only <strong>AWA / ET recovery vehicles</strong> are allowed for removal; external recovery is not permitted.</p>


  <p><strong>8. Deposit Refund Policy</strong></p>
  <p>Bank cash deposit & bank transfer: refundable within <strong>30 working days</strong> & might extend in some cases, subject to submitting the refund request form.</p>
<p>Credit card deposits: released after <strong>15 working days</strong> as per bank policy; customers must follow up with their bank directly.</p>
<p>All bank charges (local or international) are borne by the participant.</p>


  <p><strong>9. Notifications & Approval</strong></p>
  <p>Auction results will be sent via WhatsApp (Coming Soon)/ SMS / Email.</p>
<p>Customers should check their account on the company website to stay updated on all Auction results and all new developments and updates.</p>
<p>AWA / ET may accept or reject any bid or part of a bid without disclosing reasons.</p>
<p>All vehicles are subject to management approval within <strong>4–21 working days</strong>, extendable as needed.</p>


  <p><strong>10. Vehicle Sale Documents</strong></p>
  <p>Documents issued within <strong>25 working days</strong> & might extend in some cases after full payment of all awarded vehicles.</p>
<p>Documents are issued only in the registered bidder’s name.</p>
<p>The buyer is responsible for transferring ownership and paying all related fees, including inter-emirate transfer.</p>
<p>Buyers must complete the ownership transfer within <strong>7 days</strong> of receiving the documents.</p>


  <p><strong>11. Customer Support</strong></p>
  <p>- Support inquiries: <a href="mailto:etcares@et.ae">etcares@et.ae</a></p>
  <p>- Bidder is responsible for verifying bid amounts before submission. Price-related complaints will not be considered. </p>
  <p>- The Bidder shall verify and confirm all prices prior to submission of the bid and shall be solely responsible for any errors (in the price or where the price is written or in both). The Bidder shall also be responsible for ensuring full understanding and compliance with all Terms and Conditions.</p>
  
  <p><strong>12. Privacy Policy</strong></p>
  <p>- User information is confidential. Statistics may be collected to improve services.</p>

  <p><strong>13. Intellectual Property</strong></p>
  <p>- All logos, trademarks, service marks, and images belong to AWA / ET.</p>

  <p><strong>14. Auction Participation Steps</strong></p>
  <p>1. Access the website: <a href="https://www.alwataneya.ae">www.alwataneya.ae</a></p>
<p>2. Register: <a href="https://www.alwataneya.ae/sign-up">www.alwataneya.ae/sign-up</a></p>
<p>3. Pay the security deposit to activate bidding privileges.</p>
<p>4. Participate in the Auction: <a href="https://www.alwataneya.ae/seller-buyer/auctions/todays-auctions">www.alwataneya.ae/seller-buyer/auctions/todays-auctions</a></p>
<p>5. Review vehicles, images, and inspection reports (if available).<br>All vehicles are sold “AS IS,” without any warranties, express or implied.</p>
<p>6. Add vehicles to Favorites for tracking (optional).</p>
<p>7. Submit bids using the “Bid Now” button.</p>
<p> 1. In the Silent Auction, all bid prices are confidential and not visible to other participants.</p>
<p> 2. The bid amount excludes VAT and fees.</p>
<p>8. Monitor bids via “My Bids” (optional).</p>
<p>9. The bid price may be increased, but it cannot be decreased.</p>


  <p><strong>15. Auto-Bid Feature (Coming Soon)</strong></p>
  <p>- The bidder selects the maximum auto-bid value.</p>
  <p>- System bids automatically up to that limit.</p>
  <p>- Bidders are fully responsible for their selected auto-bid value.</p>

  <p><strong>16. Buyer Confirmation</strong></p>
  <p>- The buyer acknowledges that AWA / ET acts only as a broker or intermediary and is not responsible for car defects or disputes (e.g., meter tampering, chassis issues).</p>

  <p><strong>17. VAT</strong></p>
  <p>- All vehicles are subject to <strong>5% VAT</strong>.</p>

  <p><strong>18. Administrative Charges</strong></p>
  <p>The buyer is responsible for administrative expenses related to the purchased vehicle, which are as follows:</p>
  <p><strong>Vehicle Type</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Charge</strong></p>
<p>Light vehicles&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AED 750</p>
<p>Heavy vehicles & Buses&nbsp;&nbsp;AED 1000</p>

  <p>- AWA / ET may modify service charges at its discretion.</p>
  <p><strong>19. Bidder Cancellation</strong></p>
  <p>- If a bidder cancels any awarded vehicle, a penalty of <strong>20% of the total transaction value</strong> will be charged at ET / AWA’s discretion without prior notice or justification.</p>

  <p><strong>20. Vehicle Taken Before Ownership Issuance</strong></p>
  <p>- AWA / ET is not responsible for any expenses, repairs, or issues incurred by the buyer before receiving the official sale of documents. All associated costs are solely the buyer’s responsibility.</p>

  <p><strong>21. Limitation of Liability</strong></p>
  <p> AWA / ET shall not be responsible for:</p>
    <p>- Vehicle condition all vehicle sold AS It Is only the chassis guarantee</p>
      <p>- Hidden defects, mechanical issues, or missing parts</p>

  <p><strong>22. Governing Law & Dispute Resolution</strong></p>
  <p>- This Agreement is governed by the laws of the </strong>United Arab Emirates.</strong></p>
   <p>- Any disputes shall be subject to the </strong>exclusive jurisdiction of UAE courts.</strong></p>
   
  <p><strong>23. Increase in Non-Reimbursable Government Costs</strong></p>
  <p>- If new laws, regulations, directives, decisions, or notifications issued by local or federal government authorities result in an increase in non-reimbursable costs, <strong>all parties (sellers or buyers) shall be obligated to bear such costs</strong>.</p>

  <p><strong>24. User Acknowledgment of Awareness and Compliance with the Terms and Conditions</strong></p>
  <p>- Your acceptance of these terms and conditions constitutes a binding agreement to all that is stated herein and shall be deemed an explicit acknowledgment that you have read and understood them, thereby precluding any subsequent claim of lack of knowledge or awareness of their contents.</p>
</div>

`;
//     this.view.richTextPoints.text = htmltext;
    
this.view.lblNotification.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.lblHeading01.contentAlignment   = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.lblInfo01.contentAlignment      = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.lblHeading02.contentAlignment   = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.lblHeading03.contentAlignment   = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.lblinfo02.contentAlignment      = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
this.view.richTextPoints.contentAlignment      = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

     if (isArabic) {
      this.view.flxBack.left = null;
  this.view.flxBack.right = "5%";
    var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.imgArrow.transform = flipTransform;

     }
     else{
      this.view.flxBack.left = "5%";
  this.view.flxBack.right = null;
       this.view.imgArrow.transform = voltmx.ui.makeAffineTransform();
       

     }
  
    
    
  }


 });