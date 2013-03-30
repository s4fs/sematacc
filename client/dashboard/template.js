/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */
Template.dashboard.userProjects = function() {
   var projects = Projects.find({userId: Meteor.userId()});
   if (projects.count() === 0) {
      return null;
   } else {
      return projects;
   }
};

Template.dashboard.rendered = function() {
   $('input#nameNewProject').watermark('Project Name');
   $('textarea#descriptionNewProject').watermark('Project Description');
};
