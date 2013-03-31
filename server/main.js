/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */
Meteor.startup(function() {
  Meteor.methods({
    newProject: function(name, description, userId) {
      return newProject(name, description, userId);
    },
    updateAlphasCompletions: function() {
      return updateAlphasCompletions();
    },
    updateConcernCompletions: function() {
      return updateConcernCompletions();
    }
  });
});