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
        var concernName = Concerns.findOne(this.concernId).name;
        $('#message').html(concernName);
        $('.hints .hint').html('<h2>' + this.name + '</h2>' + this.description);
    },
    'mouseleave .accordionlabel': function(event) {},
    'mouseleave .ac-container': function(event) {
        //$('#message').text('');
        //$('.hints .hint').text('');
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
        Alphas.update({
            _id: this.alphaId
        }, {
            $set: {
                currentStateId: this._id
            }
        });
        alpha = Alphas.findOne(this.alphaId);
        state = States.findOne(this._id);
        Meteor.call('updateAlphasCompletions', Session.get('selectedProjectId'), function(error, result) {
            if (error){
                Session.set('message', error.message);
                return;
            }
            Meteor.call('updateConcernCompletions', Session.get('selectedProjectId'), function(error, result) {
                if (error){
                    Session.set('message', error.message);
                    return;
                }
                Meteor.call('log', Session.get('selectedProjectId'), alpha.name + '.state', state.name);
            });
        });
    },
    /**
     * A click on an already selected State remove the state from the active set.
     */
    'click li.item.selected': function(event) {
        var alphaId = this.alphaId;
        Alphas.update({
            _id: alphaId
        }, {
            $set: {
                completion: 0,
                currentStateId: null
            }
        });
        Meteor.call('updateAlphasCompletions', Session.get('selectedProjectId'), function(error, result) {
            Meteor.call('updateConcernCompletions', Session.get('selectedProjectId'), function(error, result) {
                Meteor.call('log', Session.get('selectedProjectId'), alpha.name + '.state', 'NULL');
            });
        });
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
        var description = '<h2>' + this.name + '</h2>' + this.description;
        $('.hints .hint').html(description);
        $('.hints .hint p br').after('<span class="icon-check"></span>');
        $('.hints .hint p').prepend('<span class="icon-check"></span>');
    },
    'mouseleave li.item': function(event) {
        //$('.hints .hint').text();
    }
});
