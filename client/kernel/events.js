/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */
var timeOut;
Template.kernel.events({
  'click a#clearSelectedProjectId': function(event) {
    event.preventDefault();
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
  },
  'mouseenter .accordionlabel': function(event) {
    var concern = Concerns.findOne(this.concernId);
    $('#message').html(concern.name);
    $('.hints .hint').html(this.description);
    //$('.hints .hint').html(this.description).prepend('<span class="icon-comment"></span>');
  },
  'mouseleave .accordionlabel': function(event) {},
  'mouseleave .ac-container': function(event) {
    $('#message').text('');
    $('.hints .hint').text('');
  },
  'click .accordionlabel': function(event) {
    if (!$('input#' + this._id).attr('checked')) {
      $('input.accordionitem').removeAttr('checked');
    } else {
      setTimeout(function() {
        $('input.accordionitem').removeAttr('checked');
      }, 100);
    }
  },
  'click li.selectable': function(event) {
    Alphas.update({
        _id: this.alphaId
      }, {
        $set: {
          currentStateId: this._id
        }
    });
    updateAlphasCompletions();
    updateConcernCompletions();
  },
  'click li.item.selected': function(event) { // a click on an already selected item removes it
    var alphaId = this.alphaId;
    Alphas.update({_id: alphaId, userId: Meteor.userId()}, { $set: { completion: 0, currentStateId: null }});
    updateConcernCompletions();
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
    var description = this.description;
    $('.hints .hint').html(description);
    $('.hints .hint p br').after('<span class="icon-check"></span>');
    $('.hints .hint p').prepend('<span class="icon-check"></span>');
  },
  'mouseleave li.item': function(event) {
    $('.hints .hint').text();
  },

  'click a#openNewproject': function(event) {
    event.preventDefault();
    $('.newproject').toggle('slow');
  },

  'click button#btnNewproject': function(event) {
    event.preventDefault();
  },

  'mouseenter li.project': function(event) {
    $('.description').toggle('slow');
  },

  'mouseleave li.project': function(event) {
    $('.description').toggle('slow');
  }
});
