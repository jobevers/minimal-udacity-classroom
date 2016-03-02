// ==UserScript==
// @name         Minimal Udacity Classroom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes extraneous features from the classroom viewer
// @author       jobevers
// @match        https://www.udacity.com/course/viewer*
// @grant        none
// ==/UserScript==
// Your code here...

// the classroom is a single page app so we need to watch for changes.
// Doing the removal on hash change isn't good enough because that creates
// a race condition between the udacity code to add the item and this
// script to remove the item.
setInterval(function() {
    $("header").remove();
    // Removes the class name
    $("div[data-ng-controller=viewerExam]").remove();
    // removes the left-hand-nav (classroom / materials)
    $("div[left-hand-nav]").remove();
    // Both of these are necessary to remove the footer
    $("#footer-push").remove();
    $("footer").remove();
    // remove the right side bar, unless its the result of a quiz
    // Additionally, the right side bar
    var rightSideBar = $("div.viewer-player").children().eq(0).children().eq(1);
    var quizResults = getQuizResults(rightSideBar);
    if (quizResults) {
	// should style this better
	var notes = $("div.viewer-player").children().eq(0).children().eq(0).children().eq(-1);
	notes.before(quizResults);
    }
    // have to hide instead of remove because if we remove we sometimes lose the quiz result information
    rightSideBar.hide();
    // make the viewer take up the full width
    $("div[data-ng-controller=viewerPlayer] div.col-xs-9").removeClass("col-xs-9").addClass("col-xs-12");
}, 500);


function getQuizResults(rightSideBar) {
    var resultText = ['Correct!', 'Try again!', 'Error!'];
    for (var i=0; i < resultText.length; i++) {
	var text = resultText[i];
	var quizResult = rightSideBar.find("h3:contains('" + text + "')").parent();
	if (quizResult.length === 1) {
	    var isHidden = true;
	    $.each(quizResult.children(), function(idx, child) {
		if (!$(child).hasClass('ng-hide')) {
		    isHidden = false;
		    // return false to break out of the loop
		    return false;
		}
	    });
	    if (!isHidden) {
		return quizResult;
	    }
	}
    }
}
