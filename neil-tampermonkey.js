// ==UserScript==
// @name         cdrxinfusion carecentrix quick grab
// @namespace    https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do
// @version      1.0
// @description  Grab that patient!
// @author       Darren DeLitizia ddgiants@gmail.com
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do?method1=selectTab&hideAdvanceSearchFlag=true&activeTab=Active*
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/notificationReferral.do*
// @grant        none

// ==/UserScript==

$(document).ready(function() {
  var loc = window.top.location.toString();

  refreshClick();
  function refreshClick() {
    var x = 1;

    // if a new patient drops click the view link
    var DDmatchingLinks = $( "a[href*='/ProviderPortal/referral/notificationReferral.do']" );

    // once the view link is clicked click the accept button
    if($("#btnAccept").length != 0) {
      $("#btnAccept").click();
      // once the accept button is clicked click the checkbox in the popup
      $("#OK").click();
      $("#SOC").click();// this is the checkbox
      $("#OK").click();
      $("#submitButton").click();
      setTimeout(function(){ window.location.href = "https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do"; }, 2000);
    }

    else if(DDmatchingLinks.length > 0) {
      $(DDmatchingLinks).each(function(index) {
        window.location.replace($(this).attr("href"));
      });
    }

    // if no new patients continue checking screen every second
    else {
      setTimeout(function(){ location.reload(); }, x*1000);
    }
  }
});
