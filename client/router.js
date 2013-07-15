/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/***
 * Routing
 */
Meteor.Router.add({
    '/': function () {
        Session.set('selectedProjectId', null);
        Session.set('selectedProjectName', null);
        return 'home';
    },
    '/about': function () {
        Session.set('selectedProjectId', null);
        Session.set('selectedProjectName', null);
        return 'about';
    },
    '/p' : function (){
        if (!Meteor.userId()) {
            return 'home';
        }else{
            Session.set('selectedProjectId', null);
            Session.set('selectedProjectName', null);
            return "projects";
        }
    },
    '/p/:_id': function (id) {
        var project = Projects.findOne({
            _id: id,
            userId: Meteor.userId()
        });
        if (project){
            Session.set('selectedProjectId', id);
            Session.set('selectedProjectName', project.name);
            drawGraphs();
            return 'kernel';
        }else{
            Session.set('selectedProjectId', null);
            Session.set('selectedProjectName', null);
            return 'home';
        }
    }
});