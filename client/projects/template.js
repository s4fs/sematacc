/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Handle the projects template.
 */

Template.projects.helpers({
    userProjects: function() {
        return Projects.find();
    },
    checkable: function(id) {
    	(id === Session.get('selectedProjectId')) ? 'checked' : 'false';
    }
});

Template.projects.rendered = function() {
    $('input#nameNewProject').watermark('Project Name');
    $('textarea#descriptionNewProject').watermark('Project Description');
};
