/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * On startup (client connects)
 */
Meteor.startup(function() {
  resizeGraphDivs();
});

/**
 * Called every time a dependency changes.
 */
Deps.autorun(function() {
  // If no user logged id, then no Project is selected.
  if (!Meteor.userId()) {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
  }
});

/**
 * Re-draw the graph everytime an Alpha changes.
 */
//TODO optimize
Deps.autorun(function() {
  selectedProjectId = Session.get('selectedProjectId');
  if (!selectedProjectId) return;

  var query = Concerns.find({
    userId: Meteor.userId()
  });
  var handle = query.observe({
    changed: function(concern) {
      drawGraphs(Session.get('selectedProjectId'));
    }
  });
});

Handlebars.registerHelper('selectedProjectId', function(input) {
  var selectedProjectId = Session.get('selectedProjectId');
  return selectedProjectId;
});

Handlebars.registerHelper('selectedProjectName', function(input) {
  var selectedProjectName = Session.get('selectedProjectName');
  return selectedProjectName;
});


Template.pleaseLogin.events({
  'click a#pleaselogin': function(event) {
    event.preventDefault();
    var loginButtonsSession = Accounts._loginButtonsSession;
    loginButtonsSession.set('dropdownVisible', true);
    Meteor.flush();
    correctDropdownZIndexes();
  }
});

/**
 * Copied from Meteor login system.
 */
var correctDropdownZIndexes = function() {
  // IE <= 7 has a z-index bug that means we can't just give the
  // dropdown a z-index and expect it to stack above the rest of
  // the page even if nothing else has a z-index.  The nature of
  // the bug is that all positioned elements are considered to
  // have z-index:0 (not auto) and therefore start new stacking
  // contexts, with ties broken by page order.
  //
  // The fix, then is to give z-index:1 to all ancestors
  // of the dropdown having z-index:0.
  for (var n = document.getElementById('login-dropdown-list').parentNode;
  n.nodeName !== 'BODY';
  n = n.parentNode)
  if (n.style.zIndex === 0) n.style.zIndex = 1;
};

/**
 * Render Google Analytics template.
 */
Template.analytics.created = function() {
  var ganalytics = 'UA-5685155-8';
  if (ganalytics === '') return;

  if (!window._gaq) window._gaq = [];

  _gaq.push(['_setAccount', ganalytics]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  })();
};