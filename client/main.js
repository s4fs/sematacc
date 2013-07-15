/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * On startup (client connects)
 */
Meteor.startup(function () {
    resizeGraphDivs();
});

$(window).resize(function () {
    drawGraphs();
});

/**
 * Create a default empty project on user first login.
 */
var onProjectSubscription = function () {
    var projects = Projects.find({
        userId: Meteor.userId()
    }).count();
    if (projects === 0) {
        Meteor.call('newProject', 'Default Project', 'This is the default description of the project. Feel free to edit it.',

            function (error, result) {
                if (error) {
                    alert('Error when creating the default project: ' + error);
                }
            });
    }
};

Meteor.autosubscribe(function () {
    Meteor.subscribe('Projects', onProjectSubscription);
    Meteor.subscribe('Concerns');
    Meteor.subscribe('Alphas');
    Meteor.subscribe('States');
});

/**
 * Called every time a dependency changes.
 */
Deps.autorun(function () {
    // If no user logged id, then no Project is selected.
    if (!Meteor.userId()) {
        Session.set('selectedProjectId', null);
        Session.set('selectedProjectName', null);
    } else {
        Meteor.subscribe('Projects', onProjectSubscription);
    }
});