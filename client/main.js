/**
 * Copyright (C) 2013  Daniel Graziotin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Meteor.startup(function() {
  resizeGraphDivs();
});

Meteor.autorun(function() {
  if (!Meteor.userId()) {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
  }
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
  'click a#pleaselogin': function(event){
    event.preventDefault();
    var loginButtonsSession = Accounts._loginButtonsSession;
    loginButtonsSession.set('dropdownVisible', true);
    Meteor.flush();
    correctDropdownZIndexes()
  }
});

 var correctDropdownZIndexes = function () {
    // IE <= 7 has a z-index bug that means we can't just give the
    // dropdown a z-index and expect it to stack above the rest of
    // the page even if nothing else has a z-index.  The nature of
    // the bug is that all positioned elements are considered to
    // have z-index:0 (not auto) and therefore start new stacking
    // contexts, with ties broken by page order.
    //
    // The fix, then is to give z-index:1 to all ancestors
    // of the dropdown having z-index:0.
    for(var n = document.getElementById('login-dropdown-list').parentNode;
        n.nodeName !== 'BODY';
        n = n.parentNode)
      if (n.style.zIndex === 0)
        n.style.zIndex = 1;
  };

  Template.analytics.created = function() {
    
    var ganalytics = '';

    if (ganalytics == '')
      return;

    if (!window._gaq)
      window._gaq = [];

    _gaq.push(['_setAccount', 'UA-5685155-8']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  };
