/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/***
 * Routing
 */

/*
Meteor.Router.beforeRouting = function() {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
    Session.set('message', null);
    Session.set('demoMode', null);
}
*/

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.layout('ApplicationLayout');
  this.render('home');
});

Router.route('/demo', function () {
    var id = this.params._id;
    if (Meteor.loggingIn() || Meteor.user()) {
        Session.set('demoMode', null);
        this.render('home');
    }
    this.wait(Meteor.subscribe('Projects', id));
    if (this.ready()) {
        Session.set('demoMode', true);
        this.render('kernel');
    } else {
        this.render('loading');
    }
});


Router.route('/p', {
  // this template will be rendered until the subscriptions are ready
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('Projects');
  },

  action: function () {
    this.render('projects');
  }
});

Router.route('/p/:_id', function () {
    var id = this.params._id;
    this.wait(Meteor.subscribe('Projects', id));
    if (this.ready()) {
        Session.set('selectedProjectId', id);
        this.render('kernel');
    } else {
        this.render('loading');
    }
});



