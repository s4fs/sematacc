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

Handlebars.registerHelper('inProjects', function(input) {
    return Meteor.Router.page() == 'projects' || Meteor.Router.page() == 'kernel';
});

Handlebars.registerHelper('demoProject', function(input) {
    return Projects.findOne({
        demo: true,
        userId: null
    });
});

Handlebars.registerHelper('demoMode', function(input) {
    return Session.get('demoMode');
});

Handlebars.registerHelper('asArray',function(obj){
    var result = [];
    for (var key in obj){
        if (obj[key].hasOwnProperty('order'))
            result.push({name:key, value:obj[key], order:obj[key].order});
        else
            result.push({name:key, value:obj[key]});
    }

    if (result != null && result[0].hasOwnProperty('order'))
            return result.sort(function(a,b) { return parseFloat(a.order) - parseFloat(b.order) } );
        else
            return result;
});