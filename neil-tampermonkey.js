// ==UserScript==
// @name         cdrxinfusion carecentrix quick grab
// @namespace    https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do
// @version      1.0
// @description  Grab that patient!
// @author       Darren DeLitizia ddgiants@gmail.com
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do?method1=selectTab&hideAdvanceSearchFlag=true&activeTab=Active*
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/notificationReferral.do*
// @include      https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do?method=myReferralHome
// @grant        GM.xmlHttpRequest


// ==/UserScript==
var rejectBit = 0;
$(document).ready(function() {
  // get current location. If it includes submit - redirect to main page
  var loc = window.top.location.toString();

  checkPage();
  function checkPage() {
    var x = 1.5;

    // if a new patient drops set the link variable
    var matchingLinks = $( "a[href*='/ProviderPortal/referral/notificationReferral.do']" );

    // once the view link is clicked click the accept button
    // HCPC would be eq(2)
    // Diagnosis would be eq(6)
    if($("#htdBtnValue").length != 0) {
      var badHCPC = ["J3411","J2405","S9366","S9365","S9367"];
      var badDiagnosis = ["D509"];
      $(".myreferralviewassigndetails > table > tbody > tr").each(function() {
        var hcpc = $.trim($(this).find("td:eq(2)").html());
        if(hcpc != undefined) {
          if(badHCPC.includes(hcpc) == false) {
            var diagnosisTd = $(this).find("td:eq(6)");
            var diagnosis = $.trim($(diagnosisTd).find("div").html());
            if(diagnosis != undefined) {
              if(badDiagnosis.includes(diagnosis) == true) {
                rejectBit = 1;
              }
            }// if diagnosis is undefined
          }
          else {
            rejectBit = 1;
          }
        }// if hcpc is undefined
      });// end each tr
      if(rejectBit == 1) {
        refreshPage(x);
      }
      else {
        $("#btnAccept").click();
        // once the accept button is clicked click the checkbox in the popup
        $("#OK").click();
        $("#SOC").click();// this is the checkbox
        $("#OK").click();
        $("#submitButton").click();
      }
    }
    // if the view link exsists, click it

    else if(matchingLinks.length > 0) {
      var jsonLinks = JSON.stringify(matchingLinks);
      $(matchingLinks).each(function(index) {
        window.location.replace($(this).attr("href"));
      });
    }

    // if the accept but was clicked and we accepted the patient, then redirect to the main page
    else if(loc.indexOf('btnValue=acceptSubmit')!==-1){
      setTimeout(function(){ window.location.href = "https://www.carecentrixportal.com/ProviderPortal/referral/myReferral.do"; }, 3000);
      //window.top.location.replace(loc.replace(/\?btnValue=acceptSubmit/g,''));
    }

    // if no new patients continue checking screen every second
    else {
      refreshPage(x);
    }
  }// end function

  function refreshPage(x) {
    setTimeout(function(){ location.reload(); }, x*1000);
  }

});
