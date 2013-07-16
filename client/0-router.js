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
    '/p/:id': function (id) {
        if (Meteor.userId() || Session.get('demoMode')){
            Session.set('selectedProjectId', id);
            return 'kernel';
        }else{
            Session.set('message', 'Not found. Either the project does not exist or you do not have the permission ' +
                'to view it.');
            return 'home';
        }
    },
    '/p' : function (){
        Session.set('selectedProjectId', null);
        Session.set('selectedProjectName', null);

        if (!Meteor.userId()) {
            Meteor.Router.to('/');
        }else{
            return "projects";
        }
    },
    '/demo': function () {
        Session.set('demoMode', true);
        return "kernel";
    }
});

Meteor.Router.beforeRouting = function() {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
    Session.set('message', null);
    Session.set('demoMode', null);
}