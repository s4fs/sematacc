/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

Meteor.subscribe('Projects');

Meteor.autorun(function() {
    Meteor.subscribe('Concerns', Session.get('selectedProjectId'));
    Meteor.subscribe('Alphas', Session.get('selectedProjectId'));
    Meteor.subscribe('States', Session.get('selectedProjectId'));
});

Meteor.autorun(function() {
    if (Session.get('selectedProjectId')) {
        var project = Projects.findOne({
            _id: Session.get('selectedProjectId')
        });
        if (project) {
            Session.set('selectedProjectName', project.name);
            drawGraphs();
        }
    }
});

Meteor.autorun(function() {
    if (Session.get('message')) {
        $('div.message').text(Session.get('message'));
        setTimeout(function() {
            $('div.message').text('');
        }, 10000);
    }
});

Meteor.autorun(function() {
    if (Session.get('demoMode')) {
        var project = Projects.findOne({
            demo: true,
            userId: null
        });
        if (project) {
            Session.set('selectedProjectId', project._id);
        }
    }
})


$(window).resize(function() {
    if (Meteor.userId() && Session.get('selectedProjectId'))
        drawGraphs();
});
