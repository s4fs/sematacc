/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/***
 * Routing
 */

Meteor.Router.beforeRouting = function() {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
    Session.set('message', null);
    Session.set('demoMode', null);
}

Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
        Session.set('demoMode', null);
      return page;
    } else {
      return 'home';
    }
  }
});

Meteor.Router.filter('checkLoggedIn', {only: ['projects', 'kernel'] });

Meteor.Router.add({
    '/': function() {
        return 'home';
    },
    '/p/:id': function(id) {
        Session.set('selectedProjectId', id);
        return 'kernel';
    },
    '/p': function() {
        return "projects";
    },
    '/demo': function() {
        if (Meteor.loggingIn() || Meteor.user()) {
            Session.set('demoMode', null);
            return "home";
        }
        Session.set('demoMode', true);
        return "kernel";
    }
});
