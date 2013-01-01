/**
 * Copyright (C) 2013  Daniel Graziotin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
    event.preventDefault();
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
