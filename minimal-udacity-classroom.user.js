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
    // The discussions side bar shows up on each node change
    // even though the parent div gets removed, so we'll
    // manually remove it
    $("div[data-viewer-discussions]").parent().remove()
    // remove the right side bar
    $("div.col-xs-3[data-ng-controller=programmingQuizPanel]").remove()
    // make the viewer take up the full width
    $("div[data-ng-controller=viewerPlayer] div.col-xs-9").removeClass("col-xs-9").addClass("col-xs-12");
}, 500);
