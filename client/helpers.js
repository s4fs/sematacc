/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Register handlebar helpers to display values in the templates.
 */
Handlebars.registerHelper('selectedProjectId', function(input) {
  var selectedProjectId = Session.get('selectedProjectId');
  return selectedProjectId;
});
Handlebars.registerHelper('selectedProjectName', function(input) {
  var selectedProjectName = Session.get('selectedProjectName');
  return selectedProjectName;
});
Handlebars.registerHelper('userAndSelectedProject', function(input) {
    return (Session.get('demoMode') || (Session.get('selectedProjectId') && Meteor.userId()));
});
Handlebars.registerHelper('currentURL', function(input) {
    return window.location.href;
});
Handlebars.registerHelper('message',function(input){
    return Session.get("message");
});
Handlebars.registerHelper('demoProject', function(input) {
    return Projects.findOne({demo: true, userId: null});
});
Handlebars.registerHelper('demoMode', function(input) {
    return Session.get('demoMode');
});