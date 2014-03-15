/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * This file is responsible to handle all events triggered by the user
 * when using the Kernel
 */

Template.kernel.events({
    /**
     * Exit the Project view by unselecting the related Session variables
     */
    'click a#clearSelectedProjectId': function(event) {
        event.preventDefault();
        Session.set('selectedProjectId', null);
        Session.set('selectedProjectName', null);
        Meteor.Router.to('/p');
    },
    /**
     * Display the Concern name and description when hovering the mouse
     * on a Concern area (including Alphas and States)
     */
    'mouseenter .accordionlabel': function(event) {
        var project = Projects.findOne({_id: Session.get('selectedProjectId')});

        var concernName = project.kernel.concerns[this.value.concern].name;
        $('#message').html(concernName);
        $('.hints .hint').html('<h2>' + this.value.name + '</h2>' + this.value.description);
    },
    'mouseleave .accordionlabel': function(event) {},
    'mouseleave .ac-container': function(event) {

    },
    /**
     * Close the other Accordion Items when one is clicked
     */
    'click .accordionlabel': function(event) {
        $('input.accordionitem').prop('checked', false);
    },
    /**
     * A click on a non selected State sets the State as the active one.
     */
    'click li.selectable': function(event) {
        var project = Projects.findOne({_id : Session.get('selectedProjectId')});

        var concern = this.value.concern;
        var alphaName = this.value.alpha;
        var newStatePointer = this.value.order;

        var newStateName = this.value.name;

        Meteor.call('updateProject', project._id, concern, alphaName, newStatePointer, function(error, result) {
            if(error)
                console.log(error);
            else
                Meteor.call('log', Session.get('selectedProjectId'), alphaName + '.state', newStateName);
        });

        return;

    },
    /**
     * A click on an already selected State remove the state from the active set.
     */
    'click li.item.selected': function(event) {
        var project = Projects.findOne({_id : Session.get('selectedProjectId')});

        var concern = this.value.concern;
        var alphaName = this.value.alpha;
        var newStatePointer = null;

        Meteor.call('updateProject', project._id, concern, alphaName, newStatePointer, function(error, result) {
            if(error)
                console.log(error);
            else
                Meteor.call('log', Session.get('selectedProjectId'), alphaName + '.state', 'NULL');
        });

        return;
    },
    'mouseenter li.item.selected': function(event) {
        $(event.target).find('div').removeClass('icon-ok');
        $(event.target).find('div').addClass('icon-cancel');
    },
    'mouseleave li.item.selected': function(event) {
        $(event.target).find('div').removeClass('icon-cancel');
        $(event.target).find('div').addClass('icon-ok');
    },
    'mouseenter li.item.selectable': function(event) {
        $(event.target).find('div').addClass('icon-ok');
    },
    'mouseleave li.item.selectable': function(event) {
        $(event.target).find('div').removeClass('icon-ok');
    },
    'mouseenter li.item': function(event) {
        var description = '<h2>' + this.value.name + '</h2>' + this.value.description;
        $('.hints .hint').html(description);
        $('.hints .hint p br').after('<span class="icon-check"></span>');
        $('.hints .hint p').prepend('<span class="icon-check"></span>');
    },

});
