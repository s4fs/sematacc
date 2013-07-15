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